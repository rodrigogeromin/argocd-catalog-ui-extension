# Argo CD Service Catalog

An Argo CD UI extension that adds a **Catálogo** action to an Application’s top action bar. Selecting it opens a flyout with category navigation, search, service cards, and a details view. The initial six entries are examples; edit `src/features/catalog/data.ts` to add or change services.

The project was generated from the local `argocd-ui-extension` skill template, then adapted from its resource-tab profile to the host’s `registerTopBarActionMenuExt` API. Its exact contract targets the accessible Argo CD **3.5.1** cluster; details and source references are in `references/host-and-evidence.md` and `extension-project.json`.

## Develop and validate

```sh
npm ci
npm run dev
npm run validate
npm run evidence:check
```

Preview the flyout at `http://127.0.0.1:8080/?width=360px&height=640px` and `?width=1000px&height=700px&theme=dark`. `?fixture=absent` checks how the catalog behaves without Application context. The local preview simulates Argo CD and does not certify host integration.

`npm run build` emits one `dist/resources/extension-service-catalog.js` file with scoped CSS. Argo CD’s React, ReactDOM and JSX runtime remain external. `npm run package` creates `dist/service-catalog.tar.gz`, containing only `resources/extension-service-catalog.js`.

## Publish and install

Push a commit to `develop` to run `.github/workflows/release.yml`. GitHub Actions validates, builds and packages the extension, then creates a GitHub prerelease with a friendly version such as `v0.1.0-dev.3` and attaches `argocd-service-catalog-0.1.0-dev.3.tar.gz`. The base version comes from `package.json`; the sequence is the workflow run number.

The bundle was smoke-tested on the accessible v3.5.1 cluster by briefly placing it in `/tmp/extensions` and confirming `/extensions.js` served it; that temporary file was removed. Browser interaction in Argo CD and persistent cluster installation have not been verified. Follow the Argo CD UI extension guide to choose a persistent installer for your environment.
