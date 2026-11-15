import{r as d,i as a}from"./tag.const-v1.42.0.js";import{v as i}from"./secondary-nav-item.const-v1.42.0.js";import{g as t}from"./vfi-v1.42.0.js";import{D as o}from"./video-autoplay-controller-v1.42.0.js";const s="flex",r="initial",n="initial",e="initial",m="initial",c="hidden",p="var(--ds-spacing-l, 1.5rem)",b="var(--ds-spacing-l, 1.5rem)",u="var(--ds-spacing-m, 1rem)",v="var(--ds-spacing-m, 1rem)",l="relative",g="100%",h="initial",$="initial",f="initial",w="initial",k="var(--ds-spacing-m, 1rem)",x="var(--ds-spacing-m, 1rem)",y="var(--ds-spacing-m, 1rem)",_="var(--ds-spacing-m, 1rem)",j="initial",W="160px",D={width:"initial",maxWidth:"initial",transition:`max-width ${o.d300} ease, opacity ${o.d100} ease`},X="0",q="translateX(15%)",z="hidden",A="0",B=a`
  :host {
    --ds-list-item-inner-padding-block-start: 0;
    --ds-list-item-inner-padding-block-end: 0;
    --ds-surface-cursor: pointer;

    display: var(--ds-tab-compound-display, ${d(s)});
    border-start-start-radius: var(
      --ds-tab-compound-border-start-start-radius,
      ${d(r)}
    ) !important;
    border-start-end-radius: var(
      --ds-tab-compound-border-start-end-radius,
      ${d(n)}
    ) !important;
    border-end-start-radius: var(
      --ds-tab-compound-border-end-start-radius,
      ${d(e)}
    ) !important;
    border-end-end-radius: var(
      --ds-tab-compound-border-end-end-radius,
      ${d(m)}
    ) !important;
    overflow: var(--ds-tab-compound-overflow, ${d(c)});
    padding-block-start: var(
      --ds-tab-compound-padding-block-start,
      ${d(p)}
    );
    padding-block-end: var(
      --ds-tab-compound-padding-block-end,
      ${d(b)}
    );
    padding-inline-start: var(
      --ds-tab-compound-padding-inline-start,
      ${d(u)}
    );
    padding-inline-end: var(
      --ds-tab-compound-padding-inline-end,
      ${d(v)}
    );
    position: var(--ds-tab-compound-position, ${d(l)});
    width: var(--ds-tab-compound-width, ${d(g)});
    align-items: var(--ds-tab-compound-align-items, ${d(h)});
    flex-direction: var(
      --ds-tab-compound-flex-direction,
      ${d($)}
    );
    gap: var(--ds-tab-compound-gap, ${d(f)});
    text-align: var(--ds-tab-compound-text-align, ${d(w)});
  }

  :host(:focus) {
    ${t};
  }

  store-indicator {
    --ds-indicator-width: 100%;

    position: absolute;
    bottom: 0;
    left: 0;
    visibility: var(
      --ds-indicator-visibility,
      ${d("hidden")}
    );
  }

  :host::part(tab-compound__media) {
    padding-block-start: var(
      --ds-tab-compound-media-padding-block-start,
      ${d(k)}
    );
    padding-block-end: var(
      --ds-tab-compound-media-padding-block-end,
      ${d(x)}
    );
    padding-inline-start: var(
      --ds-tab-compound-media-padding-inline-start,
      ${d(y)}
    );
    padding-inline-end: var(
      --ds-tab-compound-media-padding-inline-end,
      ${d(_)}
    );
  }

  :host([configuration='tab-compound--label-logo-21-9']),
  :host([configuration='tab-compound--label-logo-4-3']) {
    --ds-tab-compound-padding-block-start: var(--ds-spacing-m, 1rem);
    --ds-tab-compound-padding-block-end: var(--ds-spacing-m, 1rem);
  }

  :host([configuration='tab-compound--label-logo-4-3']) {
    --ds-tab-compound-border-start-start-radius: var(--ds-radii-m, 0.5rem);
    --ds-tab-compound-border-start-end-radius: var(--ds-radii-m, 0.5rem);
    --ds-tab-compound-border-end-start-radius: var(--ds-radii-m, 0.5rem);
    --ds-tab-compound-border-end-end-radius: var(--ds-radii-m, 0.5rem);
  }

  :host([configuration='tab-compound--badge']) {
    --ds-tab-compound-padding-inline-start: var(--ds-spacing-xs);
    --ds-tab-compound-padding-inline-end: var(--ds-spacing-xs);
    --ds-tab-compound-padding-block-start: var(--ds-spacing-l);
    --ds-tab-compound-padding-block-end: var(--ds-spacing-l);
    --ds-tab-compound-border-start-start-radius: var(--ds-radii-s, 0.5rem);
    --ds-tab-compound-border-start-end-radius: var(--ds-radii-s, 0.5rem);
    --ds-tab-compound-border-end-start-radius: var(--ds-radii-s, 0.5rem);
    --ds-tab-compound-border-end-end-radius: var(--ds-radii-s, 0.5rem);
    --ds-tab-compound-align-items: center;
    --ds-tab-compound-flex-direction: column;
    --ds-tab-compound-gap: var(--ds-spacing-m);
    --ds-tab-compound-text-align: center;
  }

  :host([configuration='tab-compound--video']) {
    --ds-tab-compound-align-items: center;
    --ds-tab-compound-gap: var(--ds-spacing-l);
    --ds-tab-compound-border-start-start-radius: var(--ds-radii-m, 0.5rem);
    --ds-tab-compound-border-start-end-radius: var(--ds-radii-m, 0.5rem);
    --ds-tab-compound-border-end-start-radius: var(--ds-radii-m, 0.5rem);
    --ds-tab-compound-border-end-end-radius: var(--ds-radii-m, 0.5rem);
    --ds-tab-compound-padding-block-start: var(--ds-spacing-m, 1rem);
    --ds-tab-compound-padding-block-end: var(--ds-spacing-m, 1rem);
    --ds-tab-compound-padding-inline-start: var(--ds-spacing-m, 1rem);
    --ds-tab-compound-padding-inline-end: var(--ds-spacing-m, 1rem);
    --ds-media-asset-border-start-start-radius: var(--ds-radii-s);
    --ds-media-asset-border-start-end-radius: var(--ds-radii-s);
    --ds-media-asset-border-end-start-radius: var(--ds-radii-s);
    --ds-media-asset-border-end-end-radius: var(--ds-radii-s);
    --ds-media-asset-overflow: hidden;
    --ds-media-width: initial;
  }

  :host([configuration='tab-compound--video'])::part(tab-compound__base) {
    width: var(--ds-tab-compound-base-width, ${d(D.width)});
    max-width: var(--ds-tab-compound-base-max-width, ${d(D.maxWidth)});
  }

  :host([configuration='tab-compound--video'])::part(tab-compound__media) {
    --ds-tab-compound-media-padding-block-start: 0;
    --ds-tab-compound-media-padding-block-end: 0;
    --ds-tab-compound-media-padding-inline-start: 0;
    --ds-tab-compound-media-padding-inline-end: 0;

    width: var(--ds-tab-compound-media-width, ${d(j)});
    max-width: var(--ds-tab-compound-media-max-width, ${d(W)});
  }

  :host([active]) {
    --ds-indicator-visibility: visible;
  }

  :host([active][surface='glass']) {
    --ds-surface-background: var(--ds-theme-background-glass-selected) !important;
  }

  :host([configuration='tab-compound--badge'][active][surface='solid']) {
    --ds-surface-background: var(--ds-theme-background-base-neutral) !important;
  }
`,C=a`
  @media (min-width: ${d(i.md)}) {
    :host([configuration='tab-compound--video']) {
      --ds-media-width: 160px;
      --ds-list-item-width: 160px;
    }

    :host([configuration='tab-compound--video'])::part(tab-compound__base) {
      transition: var(
        --ds-tab-compound-base-transition,
        ${d(D.transition)}
      );
      visibility: visible;
      pointer-events: auto;
    }

    :host([configuration='tab-compound--video'][active]) {
      --ds-tab-compound-gap: var(
        --ds-tab-compound-active-gap,
        ${d(A)}
      );
    }

    :host([configuration='tab-compound--video'][active])::part(tab-compound__base) {
      max-width: var(
        --ds-tab-compound-base-active-max-width,
        ${d(X)}
      );
      visibility: var(
        --ds-tab-compound-base-active-visibility,
        ${d(z)}
      );
      pointer-events: auto;
      transform: var(
        --ds-tab-compound-base-active-transform,
        ${d(q)}
      );
    }
  }
`;export{B as s,C as v};
