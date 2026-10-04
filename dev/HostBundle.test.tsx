import '@testing-library/jest-dom';
import React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactJSXRuntime from 'react/jsx-runtime';
import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import {readFileSync} from 'node:fs';
import type {FlyoutProps, TopBarActionProps} from '../src/argocd/types';
import {validContext, validActionContext} from './fixtures/context';
import project from '../extension-project.json';
// Executed only after production build by npm run harness. Uses the host's globals.
test('production bundle registers and renders against simulated host globals', () => {
  let component: React.ComponentType<TopBarActionProps> | undefined;
  let flyout: React.ComponentType<FlyoutProps> | undefined;
  const globals = window as unknown as Record<string, unknown>;
  globals.React = React;
  globals.ReactDOM = ReactDOM;
  globals.ReactJSXRuntime = ReactJSXRuntime;
  const register = jest.fn((c: React.ComponentType<TopBarActionProps>, _title: string, _id: string, f: React.ComponentType<FlyoutProps>) => {component = c; flyout = f;});
  window.extensionsAPI = {registerTopBarActionMenuExt: register};
  const openFlyout = jest.fn();
  const frozen = {...JSON.parse(JSON.stringify(validActionContext)), openFlyout} as TopBarActionProps;
  function freeze(value: unknown) {
    if (value && typeof value === 'object') {
      Object.freeze(value);
      Object.values(value).forEach(freeze);
    }
  }
  freeze(frozen);
  // Indirect eval models the host loading extension JS; this is not Argo CD integration.
  (0, eval)(readFileSync(`dist/resources/extension-${project.name}.js`, 'utf8'));
  expect(register).toHaveBeenCalledWith(expect.any(Function), project.registration.title, project.registration.id, expect.any(Function), expect.any(Function), project.registration.iconClassName, false);
  if (!component || !flyout) throw new Error('No host registration');
  const Component = component;
  const Flyout = flyout;
  render(<button className="argo-button argo-button--base" type="button" onClick={openFlyout}>
    <i className={project.registration.iconClassName} aria-hidden="true" />
    <span className="show-for-large"><Component {...frozen} /></span>
  </button>);
  fireEvent.click(screen.getByRole('button', {name: 'Catálogo'}));
  expect(openFlyout).toHaveBeenCalled();
  expect(document.querySelectorAll('i.fa')).toHaveLength(1);
  expect(document.querySelector('button button')).not.toBeInTheDocument();
  cleanup();
  render(<Flyout {...validContext} />);
  expect(screen.getByText('6 serviços')).toBeInTheDocument();
  expect(globals.React).toBe(React);
  expect(globals.ReactDOM).toBe(ReactDOM);
  expect(globals.ReactJSXRuntime).toBe(ReactJSXRuntime);
  delete window.extensionsAPI;
});
