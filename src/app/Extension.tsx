import {useMemo, useState} from 'react';
import type {FlyoutProps} from '../argocd/types';
import {categories, services, categoryLabel, type CatalogService} from '../features/catalog/data';
import '../styles/extension.css';
import project from '../../extension-project.json';

export function Extension({application}: FlyoutProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<CatalogService | null>(null);
  const filtered = useMemo(() => services.filter(service => {
    const categoryMatches = activeCategory === 'all' || service.category === activeCategory;
    const text = `${service.name} ${service.summary} ${service.tag} ${categoryLabel(service.category)}`.toLocaleLowerCase();
    return categoryMatches && text.includes(query.trim().toLocaleLowerCase());
  }), [activeCategory, query]);

  return <section className="svc-catalog" aria-label={project.registration.title}>
    <header className="svc-catalog__header">
      <p className="svc-catalog__eyebrow">Argo CD · Catálogo</p>
      <h1>{selected?.name ?? 'Serviços integrados'}</h1>
      <p className="svc-catalog__subtitle">{selected?.summary ?? 'Explore ferramentas que ampliam o fluxo GitOps e as aplicações Kubernetes.'}</p>
    </header>
    {selected ? <section className="svc-detail" aria-labelledby="svc-detail-title">
      <button className="svc-back" type="button" onClick={() => setSelected(null)}>← Voltar ao catálogo</button>
      <div className="svc-detail__identity">
        <span className="svc-icon svc-icon--large" aria-hidden="true">{selected.icon}</span>
        <div><h2 id="svc-detail-title">{selected.name}</h2><span className="svc-muted">{selected.tag} · {categoryLabel(selected.category)}</span></div>
      </div>
      <p className="svc-detail__description">{selected.description}</p>
      {application?.metadata?.name && <p className="svc-context">Aplicação atual: <strong>{application.metadata.name}</strong></p>}
      <a className="svc-documentation" href={selected.url} target="_blank" rel="noopener noreferrer">Abrir documentação ↗</a>
    </section> : <div className="svc-catalog__layout">
      <nav className="svc-categories" aria-label="Categorias do catálogo">
        <p className="svc-categories__heading">Categorias</p>
        {categories.map(category => <button
          key={category.id}
          type="button"
          className={`svc-category${activeCategory === category.id ? ' svc-category--active' : ''}`}
          onClick={() => setActiveCategory(category.id)}
          aria-current={activeCategory === category.id ? 'page' : undefined}
        >{category.label}</button>)}
      </nav>
      <main className="svc-content">
        <div className="svc-content__toolbar">
          <h2>{categoryLabel(activeCategory)}</h2>
          <span className="svc-muted">{filtered.length} {filtered.length === 1 ? 'serviço' : 'serviços'}</span>
          <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Buscar serviços" aria-label="Buscar serviços" />
        </div>
        <div className="svc-grid">
          {filtered.length ? filtered.map(service => <button key={service.id} className="svc-card" type="button" onClick={() => setSelected(service)} aria-label={`Ver ${service.name}`}>
            <span className="svc-card__identity"><span className="svc-icon" aria-hidden="true">{service.icon}</span><span><strong>{service.name}</strong><small>{service.tag}</small></span></span>
            <span className="svc-card__summary">{service.summary}</span>
            <span className="svc-card__link">Ver detalhes →</span>
          </button>) : <p className="svc-empty" role="status">Nenhum serviço encontrado. Ajuste a busca ou escolha outra categoria.</p>}
        </div>
      </main>
    </div>}
  </section>;
}
