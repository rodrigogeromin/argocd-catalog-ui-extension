# Repository Guidelines

## Project Structure

This repository builds an Argo CD UI extension for a service catalog flyout. Keep the production entrypoint in `src/index.tsx`; host API adapters and readonly Argo CD types belong in `src/argocd/`. Place catalog navigation and data in `src/app/` and `src/features/catalog/`, with scoped UI rules in `src/styles/extension.css`. `dev/` contains the local preview, fixtures, UI tests, and simulated host harness. Project compatibility metadata lives in `extension-project.json`; the API contract is documented in `references/`.

## Build, Preview, and Validation

Run `npm ci` after changing the lockfile. `npm run dev` starts a localhost-only preview; try `http://127.0.0.1:8080/?width=360px&height=640px` and `?width=1100px&height=700px&fixture=absent`. Run `npm run validate` for typechecking, lint, tests, production build, package inspection, and host harness. Then run `npm run evidence:check` to verify the recorded source and artifact hashes. `npm run package` creates `dist/service-catalog.tar.gz` with only the deployable extension bundle.

## Code and Test Conventions

Use TypeScript and React with two-space indentation. Name React components in PascalCase and catalog IDs in kebab-case. Keep Argo CD host access in `src/argocd/`, treat host props as readonly, and never bundle another React runtime. Add interaction tests in `dev/*.test.tsx` using Jest and React Testing Library; include the production bundle harness when changing registration or host globals.

## Releases and Security

The GitHub Actions workflow runs on pushes to `develop` and publishes a prerelease tagged with the commit SHA, with the packaged archive attached. Pull requests should describe behavior changes, list validation, and include narrow and wide preview screenshots for UI changes. The extension archive excludes development dependencies and credentials. At the last registry audit, four high advisories remained in the preview-only `webpack-dev-server` dependency chain through `braces` 3.0.3; the registry had no newer `braces` version. Keep preview bound to localhost and recheck the audit before changing or publishing the toolchain.

## Commits

The branch has no commit history yet, so no established message convention is available. Use concise imperative subjects; `feat:`, `fix:`, and `docs:` prefixes are recommended.
