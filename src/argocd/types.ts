import type {ComponentType} from 'react';

// Readonly subset of Argo CD v3.5.1 TopBarActionMenuExtComponentProps and models.
export interface Metadata {readonly name?: string; readonly namespace?: string; readonly labels?: Readonly<Record<string, string>>}
export interface Application {readonly metadata?: Metadata; readonly spec?: {readonly project?: string}}
export interface ResourceNode {readonly group?: string; readonly kind?: string; readonly name?: string; readonly namespace?: string}
export interface ApplicationTree {readonly nodes?: readonly ResourceNode[]}
export interface TopBarActionProps {readonly application?: Application; readonly tree?: ApplicationTree; readonly openFlyout: () => unknown}
export interface FlyoutProps {readonly application?: Application; readonly tree?: ApplicationTree}
export interface ExtensionsAPI {
  registerTopBarActionMenuExt(
    component: ComponentType<TopBarActionProps>,
    title: string,
    id: string,
    flyout: ComponentType<FlyoutProps>,
    shouldDisplay?: (application?: Application) => boolean,
    iconClassName?: string,
    isMiddle?: boolean,
  ): void;
}
declare global {interface Window {extensionsAPI?: ExtensionsAPI}}
