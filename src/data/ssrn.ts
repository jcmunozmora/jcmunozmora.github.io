// SSRN records verified through Crossref (DOI 10.2139/ssrn.<id>) on 2026-09-26.
// SSRN itself blocks automated reads, so new papers are added here by hand.
export const SSRN_AUTHOR_PAGE = 'https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=6947263';

export const ssrnUrl = (id: string) => `https://papers.ssrn.com/sol3/papers.cfm?abstract_id=${id}`;

// SSRN ids for CV working papers whose CV entry links elsewhere (matched by title prefix).
export const ssrnByTitle: Record<string, string> = {};

// On SSRN but not (yet) in the CV. Everything verified on 2026-09-26 is now in the CV.
export const ssrnExtra: { id: string; title: string; coauthors: string[]; year: number }[] = [];
