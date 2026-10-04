import type {ComponentType} from 'react';
import type {FlyoutProps, TopBarActionProps} from './types';
import project from '../../extension-project.json';
export function register(component: ComponentType<TopBarActionProps>, flyout: ComponentType<FlyoutProps>): void {
  if (!window.extensionsAPI) throw new Error('Argo CD extensionsAPI is unavailable; use npm run dev for preview');
  window.extensionsAPI.registerTopBarActionMenuExt(
    component,
    project.registration.title,
    project.registration.id,
    flyout,
    () => true,
    project.registration.iconClassName,
    project.registration.isMiddle,
  );
}
