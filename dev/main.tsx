import {createRoot} from 'react-dom/client';
import {useState} from 'react';
import {CatalogAction} from '../src/app/CatalogAction';
import {Extension} from '../src/app/Extension';
import {validContext, absentContext} from './fixtures/context';
import project from '../extension-project.json';
import './preview.css';
const query = new URLSearchParams(location.search);
const element = document.getElementById('root');
if (!element) throw new Error('Missing preview root');
if (query.get('theme') === 'dark') document.documentElement.dataset.theme = 'dark';
function Preview() {
  const [open, setOpen] = useState(query.get('open') !== '0');
  const context = query.get('fixture') === 'absent' ? absentContext : validContext;
  return <div className="preview-shell" style={{width: query.get('width') ?? '100%', minHeight: query.get('height') ?? '100%'}}>
    <div className="preview-toolbar"><span className="preview-app">example-application</span>
      <button className="argo-button argo-button--base" type="button" onClick={() => setOpen(true)}>
        <i className={project.registration.icon} aria-hidden="true" />
        <span className="show-for-large"><CatalogAction /></span>
      </button>
    </div>
    {open ? <div className="preview-panel"><Extension {...context} /></div> : <p className="preview-hint">Use Catálogo para abrir o flyout.</p>}
  </div>;
}
createRoot(element).render(<Preview />);
