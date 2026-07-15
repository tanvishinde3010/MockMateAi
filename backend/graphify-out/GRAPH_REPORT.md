# Graph Report - backend  (2026-07-11)

## Corpus Check
- 8 files · ~4,076 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 52 nodes · 47 edges · 9 communities (6 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3ac7d214`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 12 edges
2. `scripts` - 6 edges
3. `main` - 1 edges
4. `dev` - 1 edges
5. `build` - 1 edges
6. `prisma:generate` - 1 edges
7. `prisma:migrate` - 1 edges
8. `keywords` - 1 edges
9. `author` - 1 edges
10. `license` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (9 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.17
Nodes (12): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, lib, module, moduleResolution, outDir, resolveJsonModule (+4 more)

### Community 1 - "Community 1"
Cohesion: 0.25
Nodes (7): author, description, keywords, license, main, name, version

### Community 2 - "Community 2"
Cohesion: 0.29
Nodes (7): devDependencies, prisma, tsx, @types/cors, @types/express, @types/node, typescript

### Community 3 - "Community 3"
Cohesion: 0.33
Nodes (6): scripts, build, dev, prisma:generate, prisma:migrate, start

### Community 4 - "Community 4"
Cohesion: 0.33
Nodes (3): app, INTERVIEW_LIBRARY, prisma

### Community 5 - "Community 5"
Cohesion: 0.40
Nodes (5): dependencies, cors, dotenv, express, @prisma/client

## Knowledge Gaps
- **39 isolated node(s):** `name`, `version`, `description`, `main`, `dev` (+34 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Community 2` to `Community 1`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `scripts` connect `Community 3` to `Community 1`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 5` to `Community 1`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _39 weakly-connected nodes found - possible documentation gaps or missing edges._