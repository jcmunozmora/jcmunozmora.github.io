// Checks that every project in the CV has a classification rule in src/lib/profile.ts (kind of
// work, kind of organization and places). A project without a rule is missing from the Projects
// filters, the globe and the counters. Prints JSON for doctor.mjs; exit 1 when something is missing.
//
//   npx tsx scripts/projects-check.ts
import { counters, unclassified } from '../src/lib/profile';

const missing = unclassified();
const c = counters();
console.log(JSON.stringify({ projects: c.projects, countries: c.countries, organizations: c.organizations, missing }));
process.exit(missing.length ? 1 : 0);
