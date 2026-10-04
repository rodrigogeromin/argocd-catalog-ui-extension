# Argo CD host contract and evidence

This project adapts the local `argocd-ui-extension` skill template for the accessible Argo CD **v3.5.1** host and the `top-bar-action-menu` profile. The registration contract is:

```ts
registerTopBarActionMenuExt(
  component, title, id, flyout, shouldDisplay?, iconClassName?, isMiddle?
)
```

The action component receives `application`, `tree`, and `openFlyout`; the flyout receives `application` and `tree`. The production entry registers a toolbar action that opens the catalog flyout. The extension returns React elements and uses the host-provided `React`, `ReactDOM`, and `ReactJSXRuntime` globals.

Primary host sources:

- [extensions-service.ts at v3.5.1](https://github.com/argoproj/argo-cd/blob/v3.5.1/ui/src/app/shared/services/extensions-service.ts)
- [UI entrypoint at v3.5.1](https://github.com/argoproj/argo-cd/blob/v3.5.1/ui/src/app/index.tsx)
- [UI extension guide](https://argo-cd.readthedocs.io/en/stable/developer-guide/extensions/ui-extensions/)

## Evidence boundary

The local validation suite checks types, lint, navigation behavior, bundle externals, package contents, and a simulated host registration/render. A cluster smoke test confirmed the bundle appears in `/extensions.js` on the accessible v3.5.1 host; the temporary file was removed. No browser session has yet verified the real toolbar click, flyout rendering, scrolling, or dark theme in Argo CD. Keep `compatibility.integrated` empty until those checks are completed against the actual host.

The generated local evidence report binds source, bundle, package, template and toolchain hashes. Any source/build/package change invalidates it until `npm run validate` and `npm run evidence:check` pass again. Preview and harness output are simulated evidence, not host certification.
