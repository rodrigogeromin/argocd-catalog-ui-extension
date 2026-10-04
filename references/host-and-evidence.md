# Argo CD host contract and evidence

This project adapts the local `argocd-ui-extension` skill template for the accessible Argo CD **v3.5.1** host and the `top-bar-action` profile. The registration contract is:

```ts
registerTopBarActionMenuExt(
  component, title, id, flyout, shouldDisplay?, iconClassName?, isMiddle?
)
```

The action component receives `application`, `tree`, and `openFlyout`; the flyout receives `application` and `tree`. The production entry registers a toolbar action that opens the catalog flyout. The extension returns React elements and uses the host-provided `React`, `ReactDOM`, and `ReactJSXRuntime` globals.

Primary host sources:

- [extensions-service.ts at v3.5.1](https://github.com/argoproj/argo-cd/blob/v3.5.1/ui/src/app/shared/services/extensions-service.ts)
- [UI entrypoint at v3.5.1](https://github.com/argoproj/argo-cd/blob/v3.5.1/ui/src/app/index.tsx)
- [UI package manifest at v3.5.1](https://github.com/argoproj/argo-cd/blob/v3.5.1/ui/package.json)
- [UI lockfile at v3.5.1](https://github.com/argoproj/argo-cd/blob/v3.5.1/ui/pnpm-lock.yaml)
- [Application details consumer at v3.5.1](https://github.com/argoproj/argo-cd/blob/v3.5.1/ui/src/app/applications/components/application-details/application-details.tsx)
- [UI extension guide](https://argo-cd.readthedocs.io/en/stable/developer-guide/extensions/ui-extensions/)

## Evidence boundary

The local validation suite checks types, lint, navigation behavior, bundle externals, package contents, and a simulated host registration/render. The earlier temporary smoke test has been superseded by the persistent Deployment installation recorded below. No browser session has yet verified the real toolbar click, flyout rendering, scrolling, or dark theme in Argo CD. Keep `compatibility.integrated` empty until those checks are completed against the actual host.

The generated local evidence report binds source, bundle, package, template and toolchain hashes. Any source/build/package change invalidates it until `npm run validate` and `npm run evidence:check` pass again. Preview and harness output are simulated evidence, not host certification.

## Manifest migration

The manifest uses schema v2, canonical profile `top-bar-action`, and an explicit hostContract with the exact v3.5.1 source URLs, signature, argument map, main/flyout props, host globals, JSX mode and resolved React runtime. `references/host-contract.json` contains the same contract. The original `templateVersion: "1.0.0"`, template hash and adaptation history are retained; the migration record identifies validator template 2.2.1. The schema field `registration.icon` maps to the upstream API argument `iconClassName`; the API method and signature are unchanged.

## Observed persistent deployment

Read-only inspection on 2026-10-04 established:

- Deployment: `argocd/argocd-server`, one replica, image `quay.io/argoproj/argocd:v3.5.1`.
- Init container: `argocd-extension-installer-service-catalog`.
- Installer image: `quay.io/argoprojlabs/argocd-extension-installer:v1.1.0@sha256:8c1fd0dc98b6339354ab50b0cbaf331d28019e5eec7f2c257e5fb5985c3e5664`.
- Installed release: `v0.1.0-dev.4`, from [the release archive](https://github.com/rodrigogeromin/argocd-catalog-ui-extension/releases/download/v0.1.0-dev.4/argocd-service-catalog-0.1.0-dev.4.tar.gz).
- Shared volume: `tmp`, `emptyDir`, mounted at `/tmp` in the installer and server. The init container restores the bundle when a new pod is created.
- Observed pod: `argocd-server-5fbbb6b584-w66fp`, Running; installer completed with exit code 0 at `2026-10-04T02:37:34Z`.
- Bundle path: `/tmp/extensions/resources/extension-service-catalog.js`.
- Installed bundle SHA-256: `a3f74674f51a17ede5e4f4504971836f16c903c8771d2c3e1e9c0e16ef91cff6`, read directly from the running server.

This confirms installation persistence through the Deployment configuration, not browser interaction or deployment of the newly migrated source. Local validation regenerates evidence for new local artifacts; it does not replace the installed release or certify its UI. Keep `compatibility.integrated` empty until actual interaction is recorded for the exact target and bundle.
