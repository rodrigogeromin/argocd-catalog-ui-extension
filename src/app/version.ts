import packageJson from '../../package.json';

export const extensionVersion = typeof __EXTENSION_VERSION__ === 'undefined'
  ? `v${packageJson.version}`
  : __EXTENSION_VERSION__;
