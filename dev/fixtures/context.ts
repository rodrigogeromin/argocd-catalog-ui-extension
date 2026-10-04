import type {FlyoutProps, TopBarActionProps} from '../../src/argocd/types';
export const validContext: FlyoutProps = {
  application: {metadata: {name: 'example-application', namespace: 'argocd'}, spec: {project: 'default'}},
  tree: {nodes: [{kind: 'Deployment', name: 'example-deployment', namespace: 'demo'}]},
};
export const absentContext: FlyoutProps = {};
export const validActionContext: TopBarActionProps = {...validContext, openFlyout: () => undefined};
