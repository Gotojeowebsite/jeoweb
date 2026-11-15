import{r as a,i as t}from"./tag.const-v1.42.0.js";import{a as o}from"./vfi-v1.42.0.js";const s="var(--ds-density-vertical-default, 3rem)",d=0,i="auto",r="var(--ds-theme-background-card-normal, #fefefe)",e="var(--ds-theme-border-card-fade, #e6f2fb)",n="var(--ds-radii-circle, 12.5rem)",l="var(--ds-spacing-xs, 0.5rem)",b="var(--ds-spacing-xs, 0.5rem)",c="var(--ds-spacing-xs, 0.5rem)",p="var(--ds-spacing-xs, 0.5rem)",m=t`
  :host {
    display: var(--ds-tabs-display, ${a("block")});
    width: var(--ds-tabs-width, ${a("auto")});

    --ds-media-height: 100%;
  }

  :host::part(tabs__base) {
    margin-block-end: var(
      --ds-tabs-base-margin-block-end,
      ${a(s)}
    );
    margin-inline: var(
      --ds-tabs-base-margin-inline,
      ${a(d)}
    );
    display: var(--ds-tabs-base-display, inherit);
  }

  :host([configuration='pill']) {
    --ds-scrollslider-gap: 1rem;
    --ds-scrollslider-item-gap: 0.5rem;
    --ds-tab-white-space: nowrap;
  }

  :host([configuration='selector']) {
    --ds-scrollslider-item-gap: var(--ds-spacing-2xs, 0.25rem);
    --ds-pill-background-color: transparent;
    --ds-tab-white-space: nowrap;
  }

  /* Tab Item */
  :host([configuration='tab-item--vertical'])::part(tabs__base) {
    --ds-tab-display: block;
    display: flex;
    flex-direction: column;
    gap: var(--ds-spacing-m, 1rem);
  }

  :host([configuration='tab-item--horizontal'])::part(tabs__base) {
    --ds-tab-margin-inline: ${a(o)};
    --ds-tab-margin-block: ${a(o)};
    --ds-tab-display: flex;
    --ds-tab-item-content-width: 208px;
  }

  /* Tab Compound - Label */
  :host([configuration^='tab-compound--label'])::part(tabs__base) {
    --ds-tab-base-display: flex;
    --ds-tab-base-height: 100%;
    --ds-scrollslider-item-display: flex;
    --ds-scrollslider-item-height: 100%;
  }

  :host([configuration='tab-compound--label'])::part(tabs__base),
  :host([configuration='tab-compound--label-logo-21-9'])::part(tabs__base) {
    --ds-scrollslider-item-gap: 0;
  }

  :host([configuration='tab-compound--label'])::part(tabs__base) {
    --ds-tab-compound-width: 208px;
  }

  :host([configuration='tab-compound--label-logo-21-9'])::part(tabs__base) {
    --ds-tab-compound-width: 199px;
  }

  :host([configuration='tab-compound--label-logo-4-3'])::part(tabs__base) {
    --ds-tab-compound-width: 187px;
  }

  :host([configuration^='tab-compound--label']) ::slotted(store-scrollslider-item),
  :host([configuration='tab-compound--badge']) ::slotted(store-scrollslider-item) {
    padding-block-start: var(--ds-tabs-compound-padding-block-start, 0.25rem);
    padding-block-end: var(--ds-tabs-compound-padding-block-end, 0.75rem);
    padding-inline-start: var(--ds-tabs-compound-padding-inline-start, 0.1rem);
  }

  :host([configuration^='tab-compound--label'])
    ::slotted(store-scrollslider-item:first-of-type) {
    padding-inline-start: 0.25rem;
  }

  :host([configuration^='tab-compound--label']) ::slotted(.tabs__base__last) {
    padding-inline-end: 0.25rem;
  }

  :host([configuration='tab-compound--label']) ::slotted(store-scrollslider-item:first-of-type),
  :host([configuration='tab-compound--label-logo-21-9'])
    ::slotted(store-scrollslider-item:first-of-type) {
    --ds-tab-compound-border-start-start-radius: var(--ds-radii-m, 0.5rem);
    --ds-tab-compound-border-end-start-radius: var(--ds-radii-m, 0.5rem);
  }

  :host([configuration='tab-compound--label']) ::slotted(.tabs__base__last),
  :host([configuration='tab-compound--label-logo-21-9']) ::slotted(.tabs__base__last) {
    --ds-tab-compound-border-start-end-radius: var(--ds-radii-m, 0.5rem);
    --ds-tab-compound-border-end-end-radius: var(--ds-radii-m, 0.5rem);
  }

  :host([configuration='tab-compound--badge'])::part(tabs__base) {
    --ds-tab-compound-width: 124px;
  }

  :host([configuration='tab-compound--video']) {
    --ds-tab-compound-media-width: 50%;
    --ds-tab-compound-base-max-width: 160px;
    --ds-tab-compound-base-width: 50%;
    --ds-button-group-max-width: 267px;
    --ds-button-group-margin-inline: auto;
  }

  :host([configuration='tab-compound--video'])::part(scrollslider__base) {
    --ds-scrollslider-base-flex-direction: column;
  }

  :host([configuration^='tab-compound--video']) ::slotted(store-scrollslider-item) {
    display: none;
  }

  :host([configuration='tab-compound--video']) ::slotted(store-scrollslider-item) {
    padding-block: 0.25rem;
    padding-inline: 0.25rem;
  }

  :host([configuration='tab-compound--video'])::part(tabs__load-more) {
    display: block;
    margin-block-start: var(--ds-spacing-xl);
  }

  :host([configuration='selector']) .tabs__base {
    width: var(--ds-tabs-base-width, ${a(i)});
    max-width: 100%;
    background-color: var(
      --ds-tabs-base-background-color,
      ${a(r)}
    );
    border-color: var(
      --ds-tabs-base-border-color,
      ${a(e)}
    );
    border-radius: var(
      --ds-tabs-base-border-radius,
      ${a(n)}
    );
    padding-inline-start: var(
      --ds-tabs-base-padding-inline-start,
      ${a(l)}
    );
    padding-inline-end: var(
      --ds-tabs-base-padding-inline-end,
      ${a(b)}
    );
    padding-block-start: var(
      --ds-tabs-base-padding-block-start,
      ${a(c)}
    );
    padding-block-end: var(
      --ds-tabs-base-padding-block-end,
      ${a(p)}
    );
  }

  :host([configuration='selector']):has(store-scrollslider[hide-controls]) {
    --ds-tabs-base-width: min-content;
  }

  /* Center alignment for selector configuration */
  :host([configuration='selector'][alignment='center']) .tabs__base {
    --ds-tabs-base-width: fit-content;
    margin-inline: auto;
  }
`;export{m as s};
