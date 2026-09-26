#!/bin/bash
# Guardian of jcmunozmora.co (/sanson-web), run by launchd
# (~/Library/LaunchAgents/co.jcmunozmora.site-sync.plist) every day at 7:30 and whenever a source
# file changes: the CV .tex files, the slides hub (slides.yml) or the LinkedIn posts folder.
#
# Pulls every automatic source (CV, LinkedIn posts, slides hub, Notion, covers), rebuilds, and
# publishes only the generated data. It never commits hand-edited files and never pushes commits
# that were already waiting for approval. Each run leaves its verdict in reports/guardian.json and
# raises a macOS notification when something needs JC (scripts/guardian-report.mjs).
set -euo pipefail
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/Library/TeX/texbin"
cd "$(dirname "$0")/.."

CV_DIR="${CV_DIR:-$HOME/Library/CloudStorage/Dropbox/Apps/Overleaf/CV - JC}"
SLIDES_DIR="${SLIDES_DIR:-$HOME/github_repositories/slides}"
LI_DIR="${JC_LINKEDIN_DIR:-$HOME/github_repositories/jc-linkedin}/drafts/linkedin"
GENERATED=(src/data/cv.json src/data/talks.json src/data/notion.json src/content/activity/linkedin src/assets/covers public/cv)
QUIET_MIN=10   # Overleaf and Dropbox save in bursts: wait until the sources are still this long
LOCK=reports/.guardian.lock

log() { printf '%s %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"; }
report() { node scripts/guardian-report.mjs "$@" || true; }
newest_source() {
  { stat -f %m "$CV_DIR"/CV-MunozMora-{EN,ES}.tex "$SLIDES_DIR/slides.yml" "$LI_DIR" "$LI_DIR"/*.md 2>/dev/null || true; echo 0; } | sort -n | tail -1
}

TRIGGER=daily
[ "${1:-}" = "--manual" ] && TRIGGER=manual
mkdir -p reports
# One run at a time; a lock older than two hours is from a run that died.
if ! mkdir "$LOCK" 2>/dev/null; then
  if [ -n "$(find "$LOCK" -maxdepth 0 -mmin +120 2>/dev/null)" ]; then rm -rf "$LOCK"; mkdir "$LOCK"
  else log "skip: another guardian run is in progress"; exit 0; fi
fi
trap 'rm -rf "$LOCK"' EXIT
trap 'log "failed at line $LINENO"; report failed "$TRIGGER" "error en la línea $LINENO de auto-update.sh"' ERR

# What woke us: a source newer than the previous run, or the daily schedule.
last_run=$(node -e 'try{console.log(Math.floor(new Date(require("./reports/guardian.json").run)/1000))}catch{console.log(0)}')
if [ "$TRIGGER" = daily ] && [ "$(newest_source)" -gt "$last_run" ] && [ "$(( $(date +%s) - $(newest_source) ))" -lt 3600 ]; then
  TRIGGER=source
fi

log "start ($TRIGGER)"
waited=0
while [ "$(( $(date +%s) - $(newest_source) ))" -lt $(( QUIET_MIN * 60 )) ] && [ "$waited" -lt 60 ]; do
  [ "$waited" = 0 ] && log "a source is still being edited; waiting until it has been still for $QUIET_MIN min"
  sleep 60; waited=$((waited + 1))
done

# Hand edits are JC's work in progress: the guardian does not touch or publish them.
exclude=(':!reports'); for p in "${GENERATED[@]}"; do exclude+=(":!$p"); done
if [ -n "$(git status --porcelain -- . "${exclude[@]}")" ]; then
  log "skip: uncommitted hand edits in the repo"
  report blocked "$TRIGGER" "Cambios manuales sin commit en el repo del sitio: el guardián no publica hasta que se cierren (/sanson-web)"
  exit 0
fi

git fetch -q origin
git merge -q --ff-only origin/master 2>/dev/null || log "note: local branch has diverged from origin/master"
waiting=$(git rev-list --count origin/master..HEAD)

npm run -s sync
npm run -s pending || log "note: pending check failed (network?)"
npm run -s check
npm run -s build >/dev/null

result=ok; message="sin cambios en las fuentes"
if [ -n "$(git status --porcelain -- "${GENERATED[@]}")" ]; then
  git add -- "${GENERATED[@]}"
  git commit -q -m "auto: sync CV, activity, talks, Notion and covers ($(date +%F))"
  if [ "$waiting" -gt 0 ]; then
    # Pushing now would also publish commits JC has not approved.
    result=held; message="$waiting commit(s) manuales esperan aprobación; los datos nuevos quedan listos sin publicar (/sanson-web publicar)"
    log "held: $message"
  else
    git push -q origin HEAD:master
    result=published; message="$(git log -1 --format='%h'), $(git show --name-only --format= HEAD | grep -c .) archivo(s) generados"
    log "published: $(git log -1 --format='%h %s')"
  fi
elif [ "$waiting" -gt 0 ]; then
  result=held; message="$waiting commit(s) manuales sin publicar esperan aprobación (/sanson-web publicar)"
  log "held: $message"
else
  log "no source changes; nothing to publish"
fi

doctor_out=$(npm run -s doctor 2>&1) || true
printf '%s\n' "$doctor_out"
findings=$(printf '%s\n' "$doctor_out" | grep -c '✗' || true)
# The doctor counts unpublished commits too; a held run already reports them.
[ "$result" = held ] && findings=$(printf '%s\n' "$doctor_out" | grep '✗' | grep -vc 'not pushed' || true)
report "$result" "$TRIGGER" "$message" "$findings"
log "done"
