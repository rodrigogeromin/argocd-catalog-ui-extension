import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import {Extension} from '../src/app/Extension';
import {CatalogAction} from '../src/app/CatalogAction';
import {register} from '../src/argocd/register';
import {validContext, absentContext, validActionContext} from './fixtures/context';
import project from '../extension-project.json';

test('filters by category and search, opens details and returns to the catalog', () => {
  render(<Extension {...validContext} />);
  expect(screen.getByRole('heading', {name: 'Serviços integrados'})).toBeInTheDocument();
  expect(screen.getByText('6 serviços')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', {name: 'Automação'}));
  expect(screen.getByText('2 serviços')).toBeInTheDocument();
  fireEvent.change(screen.getByRole('searchbox', {name: 'Buscar serviços'}), {target: {value: 'Workflows'}});
  fireEvent.click(screen.getByRole('button', {name: 'Ver Argo Workflows'}));
  expect(screen.getByRole('heading', {name: 'Argo Workflows', level: 2})).toBeInTheDocument();
  expect(screen.getByText('Aplicação atual:')).toHaveTextContent('example-application');
  fireEvent.click(screen.getByRole('button', {name: '← Voltar ao catálogo'}));
  expect(screen.getByRole('heading', {name: 'Automação'})).toBeInTheDocument();
});

test('renders with absent optional host context', () => {
  render(<Extension {...absentContext} />);
  expect(screen.getByText('6 serviços')).toBeInTheDocument();
});

test('toolbar action opens the flyout', () => {
  const openFlyout = jest.fn();
  render(<CatalogAction {...validActionContext} openFlyout={openFlyout} />);
  fireEvent.click(screen.getByRole('button', {name: 'Abrir catálogo de serviços'}));
  expect(openFlyout).toHaveBeenCalledTimes(1);
});

test('registers the same component using the host contract', () => {
  const fn = jest.fn();
  window.extensionsAPI = {registerTopBarActionMenuExt: fn};
  register(CatalogAction, Extension);
  expect(fn).toHaveBeenCalledWith(CatalogAction, project.registration.title, project.registration.id, Extension, expect.any(Function), project.registration.iconClassName, project.registration.isMiddle);
  delete window.extensionsAPI;
  expect(() => register(CatalogAction, Extension)).toThrow('extensionsAPI');
});
