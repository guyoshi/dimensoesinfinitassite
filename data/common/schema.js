(() => {
  'use strict';

  const VERSION = '1.2.0';
  const COLLECTIONS = [
    'characters', 'relationships', 'families', 'organisations', 'dynasties', 'places', 'chapters', 'timeline',
    'mysteries', 'themes', 'fauna', 'flora', 'foods', 'concepts', 'gallery'
  ];
  const registry = window.JESED_BOOKS || Object.create(null);
  const drafts = window.JESED_BOOK_DRAFTS || Object.create(null);

  function slugify(value = '') {
    return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('pt-BR').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  const asArray = value => Array.isArray(value) ? value : [];
  const text = (value, fallback = '') => value == null ? fallback : String(value);
  function stableId(existing, type, value, bookId = '') {
    if (existing) return String(existing);
    const suffix = slugify(value) || 'sem-identificador';
    const localTypes = new Set(['chapter', 'event', 'mystery', 'theme', 'gallery', 'relationship']);
    const bookPart = localTypes.has(type) && bookId ? `${slugify(bookId)}-` : '';
    return `jesed-${type}-${bookPart}${suffix}`;
  }
  const stableSlug = (existing, value) => existing ? String(existing) : slugify(value);
  const cleanRoute = (route = '') => String(route).trim().replace(/^#\/?/, '').replace(/^\/+|\/+$/g, '');

  function startBook(config) {
    if (!config?.book?.id) throw new Error('JESED_COMMON.startBook exige book.id.');
    const bookId = String(config.book.id);
    const entities = Object.create(null);
    COLLECTIONS.forEach(name => { entities[name] = []; });
    drafts[bookId] = {
      book: { ...config.book }, entities,
      routes: { canonical: { ...(config.routes?.canonical || {}) }, legacyAliases: asArray(config.routes?.legacyAliases) },
      compatibility: { legacyDataPreserved: true, redirectsPrepared: true, redirectsActive: true, ...(config.compatibility || {}) },
      metadata: { ...(config.metadata || {}) }
    };
    return drafts[bookId];
  }

  function ensureDraft(bookId) {
    const draft = drafts[bookId];
    if (!draft) throw new Error(`Livro ainda não iniciado: ${bookId}`);
    return draft;
  }

  function setCollection(bookId, collectionName, items) {
    if (!COLLECTIONS.includes(collectionName)) throw new Error(`Coleção desconhecida: ${collectionName}`);
    ensureDraft(bookId).entities[collectionName] = asArray(items);
  }

  function normalizeEntity(entity, defaults = {}) {
    const source = entity && typeof entity === 'object' ? entity : {};
    return { ...defaults, ...source,
      id: text(source.id || defaults.id), slug: text(source.slug || defaults.slug),
      name: text(source.name || defaults.name), bookId: text(source.bookId || defaults.bookId),
      route: text(source.route || defaults.route), image: source.image || defaults.image || null,
      sourceRef: source.sourceRef || defaults.sourceRef || source
    };
  }

  function uniqueBy(items, field, warnings, collectionName) {
    const seen = new Set();
    return asArray(items).filter(item => {
      const value = item?.[field];
      if (!value) { warnings.push(`${collectionName}: item sem ${field}.`); return true; }
      if (seen.has(value)) { warnings.push(`${collectionName}: ${field} duplicado (${value}).`); return false; }
      seen.add(value); return true;
    });
  }

  function makeIndexes(entities) {
    const byId = Object.create(null), bySlug = Object.create(null);
    COLLECTIONS.forEach(name => {
      byId[name] = Object.create(null); bySlug[name] = Object.create(null);
      asArray(entities[name]).forEach(item => {
        if (item.id) byId[name][item.id] = item;
        if (item.slug) bySlug[name][item.slug] = item;
      });
    });
    return { byId, bySlug };
  }

  function validateReferences(model) {
    const warnings = [], { entities, indexes } = model;
    asArray(entities.relationships).forEach(relation => {
      ['fromId','toId'].forEach(key => {
        const value = relation[key];
        if (value && !indexes.byId.characters[value]) warnings.push(`relationships: personagem ausente em ${key} (${value}).`);
      });
    });
    asArray(entities.timeline).forEach(event => {
      asArray(event.characterIds).forEach(id => { if (!indexes.byId.characters[id]) warnings.push(`timeline: personagem ausente (${id}) em ${event.id}.`); });
      asArray(event.placeIds).forEach(id => { if (!indexes.byId.places[id]) warnings.push(`timeline: lugar ausente (${id}) em ${event.id}.`); });
      asArray(event.chapterIds).forEach(id => { if (!indexes.byId.chapters[id]) warnings.push(`timeline: capítulo ausente (${id}) em ${event.id}.`); });
      asArray(event.chapterLinks).forEach(link => { if (link?.chapterId && !indexes.byId.chapters[link.chapterId]) warnings.push(`timeline: capítulo ausente em chapterLinks (${link.chapterId}) em ${event.id}.`); });
      asArray(event.relatedEventIds).forEach(id => { if (!indexes.byId.timeline[id]) warnings.push(`timeline: acontecimento relacionado ausente (${id}) em ${event.id}.`); });
      if (!event.dateLabel) warnings.push(`timeline: data ausente em ${event.id}.`);
      if (!Number.isFinite(Number(event.sortKey))) warnings.push(`timeline: chave cronológica inválida em ${event.id}.`);
    });
    return warnings;
  }

  function registerBook(config) {
    const bookId = String(config.book.id), warnings = [], entities = Object.create(null);
    COLLECTIONS.forEach(name => {
      const normalized = asArray(config.entities?.[name]).map(item => normalizeEntity(item, { bookId }));
      entities[name] = uniqueBy(uniqueBy(normalized, 'id', warnings, name), 'slug', warnings, name);
    });
    const model = {
      schemaVersion: VERSION, book: { ...config.book }, entities,
      routes: { canonical: { ...(config.routes?.canonical || {}) }, legacyAliases: asArray(config.routes?.legacyAliases) },
      compatibility: { legacyDataPreserved: true, redirectsPrepared: true, redirectsActive: true, ...(config.compatibility || {}) },
      metadata: { ...(config.metadata || {}) }, warnings
    };
    model.indexes = makeIndexes(entities);
    model.warnings.push(...validateReferences(model));
    model.findById = (name,id) => model.indexes.byId[name]?.[id] || null;
    model.findBySlug = (name,slug) => model.indexes.bySlug[name]?.[slug] || null;
    registry[bookId] = model;
    try { window.dispatchEvent(new CustomEvent('jesed:book-data-ready', { detail: { bookId, model } })); } catch (_) {}
    if (model.warnings.length && window.console) console.warn(`[JESED_COMMON] ${bookId}: ${model.warnings.length} aviso(s).`, model.warnings);
    return model;
  }

  function finalizeBook(bookId) {
    const draft = ensureDraft(bookId);
    return registerBook(draft);
  }

  function resolveLegacyRoute(route, bookId) {
    const model = registry[bookId], original = cleanRoute(route);
    if (!model) return original;
    for (const alias of model.routes.legacyAliases) {
      if (alias?.from && cleanRoute(alias.from) === original) return cleanRoute(alias.to);
      if (alias?.fromPrefix && original.startsWith(cleanRoute(alias.fromPrefix))) {
        return `${cleanRoute(alias.toPrefix)}${original.slice(cleanRoute(alias.fromPrefix).length)}`;
      }
    }
    return original;
  }

  window.JESED_BOOKS = registry;
  window.JESED_BOOK_DRAFTS = drafts;
  window.JESED_COMMON = {
    VERSION, COLLECTIONS: [...COLLECTIONS], slugify, asArray, text, stableId, stableSlug,
    cleanRoute, startBook, setCollection, finalizeBook, registerBook, resolveLegacyRoute,
    getBook: id => registry[id] || null,
    getEntity: (bookId, collection, idOrSlug) => registry[bookId]?.findById(collection,idOrSlug) || registry[bookId]?.findBySlug(collection,idOrSlug) || null
  };
})();
