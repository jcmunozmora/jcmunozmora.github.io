#!/bin/bash
# Weekly unattended update of jcmunozmora.co, run by launchd
# (~/Library/LaunchAgents/co.jcmunozmora.site-sync.plist).
#
# Pulls every automatic source (CV, LinkedIn posts, slides hub, Notion, covers), rebuilds, and
# publishes only if the generated data changed. It never commits hand-edited files: only the
# paths below are staged, and it stops if the tree has other uncommitted changes.
set -euo pipefail
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/Library/TeX/texbin"
cd "$(dirname "$0")/.."

log() { printf '%s %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"; }
GENERATED=(src/data/cv.json src/data/talks.json src/data/notion.json src/content/activity/linkedin src/assets/covers public/cv)

log "start"
if [ -n "$(git status --porcelain -- . ':!reports')" ]; then
  log "skip: uncommitted hand edits in the repo; commit or stash them first"
  exit 0
fi

git fetch -q origin
git merge -q --ff-only origin/master 2>/dev/null || log "note: local branch is ahead of origin/master"

npm run -s sync
npm run -s pending || log "note: pending check failed (network?)"
npm run -s check
npm run -s build >/dev/null

if [ -z "$(git status --porcelain -- "${GENERATED[@]}")" ]; then
  log "no source changes; nothing to publish"
else
  git add -- "${GENERATED[@]}"
  git commit -q -m "auto: sync CV, activity, talks, Notion and covers ($(date +%F))"
  git push -q origin HEAD:master
  log "published: $(git log -1 --format='%h %s')"
fi

npm run -s doctor || true
log "done"
