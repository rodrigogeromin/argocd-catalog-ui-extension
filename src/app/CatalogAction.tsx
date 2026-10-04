import type {TopBarActionProps} from '../argocd/types';
import '../styles/extension.css';

export function CatalogAction({openFlyout}: TopBarActionProps) {
  return <button className="svc-catalog-trigger" type="button" onClick={openFlyout} aria-label="Abrir catálogo de serviços">
    <span aria-hidden="true">▦</span> Catálogo
  </button>;
}
