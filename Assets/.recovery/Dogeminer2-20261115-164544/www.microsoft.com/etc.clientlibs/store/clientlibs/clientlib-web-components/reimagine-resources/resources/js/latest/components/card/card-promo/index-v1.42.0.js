import{r as t,h as e,x as o,aw as r,a6 as a,i,n,e as d,c as s,b as c,F as l,T as p,z as m,s as h,D as _,M as u,d as b}from"../../../tag.const-v1.42.0.js";import{SurfaceElement as y}from"../../../base/elements/surface-element/index-v1.42.0.js";import{c as g}from"../../../card-base.styles-v1.42.0.js";import{b as v,v as f}from"../../../secondary-nav-item.const-v1.42.0.js";import{S as x,b as w,c as S}from"../../../pagination-item.const-v1.42.0.js";import{name as k}from"../../text-block/index-v1.42.0.js";import{name as A}from"../../button-group/index-v1.42.0.js";import{n as E}from"../../../util1-v1.42.0.js";import{n as C,a as z}from"../../../util7-v1.42.0.js";import{name as M}from"../../media/index-v1.42.0.js";import"../../../util10-v1.42.0.js";const P="0",$="grid",L="1 / 1",B="flex",q="column",H="flex-end",F="var(--ds-card-padding-default, 2rem)",T="var(--ds-card-padding-default, 2rem)",D="var(--ds-card-padding-default, 2rem)",O="var(--ds-card-padding-default, 2rem)",j="1",N=i`
  :host {
    display: var(--ds-card-promo-display, ${t("grid")});
    aspect-ratio: var(--ds-card-promo-aspect-ratio, auto);
    min-height: var(--ds-card-promo-min-height, ${t(P)});
    overflow: hidden;

    --ds-media-zindex: 0;
  }

  :host([hero-card-aspect-ratio][has-video]) ::slotted([slot='card-promo__media']) {
    --ds-media-overflow: hidden;
  }

  :host::part(card-promo__media),
  :host::part(card-promo__body) {
    display: var(--ds-card-promo-media-display, ${t($)});
    grid-area: var(
      --ds-card-promo-media-grid-area,
      ${t(L)}
    );
  }

  :host::part(card-promo__media) {
    --ds-media-display: grid;
    --ds-media-width: 100%;
  }

  :host([configuration='horizontal'])::part(card-promo__media) {
    min-width: 0;
    max-width: 100%;
  }

  :host([configuration='horizontal']) ::slotted([slot='card-promo__media']) {
    display: block;
    min-width: 0;
    max-width: 100%;

    --ds-media-display: block;
    --ds-media-width: 100%;
    --ds-media-max-width: 100%;
    --ds-media-height: auto;
    --ds-media-asset-display: block;
    --ds-media-asset-width: 100%;
    --ds-media-asset-height: auto;
    --ds-media-asset-overflow: hidden;
  }

  /* Hover and focus-within: only on desktop (≥860px) */
  @media (min-width: 860px) {
    :host([enable-animation-description]:hover) ::slotted([slot='card-promo__media']),
    :host([enable-animation-description]:focus-within) ::slotted([slot='card-promo__media']),
    :host([enable-animation-description][data-card-promo-focus-active])
      ::slotted([slot='card-promo__media']) {
      --ds-media-card-promo-interaction-overlay-background: var(
        --ds-media-card-promo-hover-overlay-background,
        var(
          --ds-media-hover-overlay-background,
          var(
            --ds-media-card-promo-default-overlay-background,
            var(--ds-media-overlay-background, initial)
          )
        )
      );
    }
  }

  /* Description expanded (Read More clicked): applies at all viewport sizes */
  :host([enable-animation-description][description-expanded])
    ::slotted([slot='card-promo__media']) {
    --ds-media-card-promo-interaction-overlay-background: var(
      --ds-media-card-promo-hover-overlay-background,
      var(
        --ds-media-hover-overlay-background,
        var(
          --ds-media-card-promo-default-overlay-background,
          var(--ds-media-overlay-background, initial)
        )
      )
    );
  }

  :host::part(card-promo__safe-area) {
    height: var(--ds-card-promo-safe-area-height, 220px);
    display: var(--ds-card-promo-safe-area-display, block);
    padding: var(--ds-card-promo-safe-area-padding, var(--ds-spacing-l));
    box-sizing: border-box;
    pointer-events: none;
  }

  :host::part(card-promo__body) {
    display: var(--ds-card-promo-body-display, ${t(B)});
    flex-direction: var(
      --ds-card-promo-body-flex-direction,
      ${t(q)}
    );
    justify-content: var(
      --ds-card-promo-body-justify-content,
      ${t(H)}
    );
    padding-inline-start: var(
      --ds-card-promo-body-padding-inline-start,
      ${t(F)}
    );
    padding-inline-end: var(
      --ds-card-promo-body-padding-inline-end,
      ${t(T)}
    );
    padding-block-start: var(
      --ds-card-promo-body-padding-block-start,
      ${t(D)}
    );
    padding-block-end: var(
      --ds-card-promo-body-padding-block-end,
      ${t(O)}
    );
    z-index: var(--ds-card-promo-body-zindex, ${t(j)});
    pointer-events: none;
  }

  .card-promo__content-wrapper {
    pointer-events: auto;
  }

  :host::part(card-promo__content-secondary) {
    margin-block-start: var(
      --ds-card-promo-content-secondary-margin-block-start,
      var(--ds-spacing-xl, 2rem)
    );
  }

  :host(:not([configuration='vertical'])) ::slotted([slot='card-promo__content-secondary']) {
    justify-content: center;
  }

  :host([configuration^='horizontal'])::part(card-promo__body) {
    justify-content: center;
  }

  :host([configuration='horizontal']) {
    --ds-card-promo-min-height: 330px;
  }

  :host([configuration='horizontal'])::part(card-promo__body) {
    --ds-card-promo-body-padding-inline-start: var(--ds-card-padding-relaxed, 4.5rem);
    --ds-card-promo-body-padding-inline-end: var(--ds-card-padding-relaxed, 4.5rem);
    --ds-card-promo-body-padding-block-start: var(--ds-card-padding-relaxed, 4.5rem);
    --ds-card-promo-body-padding-block-end: var(--ds-card-padding-relaxed, 4.5rem);
  }

  :host([configuration='horizontal'])::part(card-promo__content-container),
  :host([configuration='horizontal'])::part(card-promo__content),
  :host([configuration='horizontal'])::part(card-promo__content-primary),
  :host([configuration='horizontal'])::part(card-promo__content-secondary) {
    margin-inline-start: var(--ds-spacing-4xl, 6rem);
    margin-inline-end: var(--ds-spacing-4xl, 6rem);
  }

  :host([configuration='horizontal--slim'])::part(card-promo__content-container),
  :host([configuration='horizontal--slim'])::part(card-promo__content),
  :host([configuration='horizontal--slim'])::part(card-promo__content-primary) {
    display: flex;
    flex-direction: column;
  }

  :host([configuration='horizontal--slim'])::part(card-promo__content-container),
  :host([configuration='horizontal--slim'])::part(card-promo__content) {
    justify-content: flex-start;
    align-items: flex-start;
  }

  :host([configuration='horizontal--slim'])::part(card-promo__content) {
    gap: var(--ds-spacing-s, 0.75rem);
  }

  :host([configuration='horizontal--slim'])::part(card-promo__content-leading) {
    display: flex;
    align-self: flex-start;
  }

  :host([configuration='horizontal--slim'])::part(card-promo__content-primary) {
    gap: var(--ds-spacing-2xs, 0.25rem);
  }

  :host([configuration='horizontal--slim'])::part(card-promo__content-secondary) {
    display: block;
    width: 100%;
  }

  :host([configuration='horizontal--slim']) ::slotted([slot='card-promo__content-secondary']) {
    justify-content: flex-start;
  }

  ::slotted([slot='card-promo__content-primary-text']) {
    font-size: var(
      --ds-card-promo-content-primary-text-font-size,
      ${t(e.fontSize)}
    );
    font-weight: var(--ds-card-promo-primary-text-font-weight, 500);
    line-height: var(
      --ds-card-promo-content-primary-text-line-height,
      ${t(e.lineHeight)}
    );
    color: var(--ds-theme-foreground-base-strong, #0e1726);
  }

  ::slotted([slot='card-promo__content-secondary-text']) {
    font-size: var(
      --ds-card-promo-content-secondary-text-font-size,
      ${t(o.fontSize)}
    );
    font-weight: var(
      --ds-card-promo-content-secondary-text-font-weight,
      ${t(o.fontWeight)}
    );
    line-height: var(
      --ds-card-promo-content-secondary-text-line-height,
      ${t(o.lineHeight)}
    );
    color: var(--ds-theme-foreground-base-subtle, #17253d);
  }

  ::slotted([slot='card-promo__content-footnote']) {
    font-size: var(
      --ds-card-promo-content-footnote-text-font-size,
      ${t(r.fontSize)}
    );
    font-weight: var(
      --ds-card-promo-content-footnote-text-font-weight,
      ${t(r.fontWeight)}
    );
    line-height: var(
      --ds-card-promo-content-footnote-text-line-height,
      ${t(r.lineHeight)}
    );
    color: var(--ds-theme-foreground-base-subtle, #17253d);
  }

  ::slotted([slot='card-promo__content-bottom']) {
    font-size: var(
      --ds-card-promo-content-bottom-text-font-size,
      ${t(a.fontSize)}
    );
    font-weight: var(
      --ds-card-promo-content-bottom-text-font-weight,
      ${t(a.fontWeight)}
    );
    line-height: var(
      --ds-card-promo-content-bottom-text-line-height,
      ${t(a.lineHeight)}
    );
    color: var(--ds-theme-foreground-base-subtle, #17253d);
  }

  :host(:not([configuration='horizontal--slim']))::part(card-promo__media) {
    --ds-card-promo-media-grid-area: 1 / 1 / -1 / auto;
  }

  :host(:not([configuration='horizontal--slim'])) .card-promo__first {
    grid-area: card-promo__first;
  }

  :host(:not([configuration='horizontal--slim'])) .card-promo__last {
    grid-area: card-promo__last;
  }

  :host(:not([configuration='horizontal--slim']))::part(card-promo__safe-area) {
    grid-area: card-promo__safe-area;
  }

  :host(:not([configuration='horizontal--slim']))::part(card-promo__body) {
    grid-area: card-promo__body;
  }

  :host(:not([configuration='horizontal--slim'])) {
    grid-template-areas:
      'card-promo__first'
      'card-promo__safe-area'
      'card-promo__body'
      'card-promo__last';
  }

  :host([configuration='vertical']):has(.card-promo__last[style*='display: none'])::part(
      card-promo__body
    ) {
    grid-row: 3/-1;
  }

  :host(.with-hover) .card-promo__content-secondary {
    --ds-button-group-align-items: center;
  }
  :host::part(card-promo__eyebrow-media) {
    margin-block-end: var(
      --ds-card-promo-eyebrow-media-margin-block-end,
      var(--ds-spacing-m, 1rem)
    );
  }

  /* Prevents inherited container values (e.g. carousel's 100%) from collapsing the eyebrow in Safari */
  :host ::slotted([slot='card-promo__eyebrow-media']) {
    --ds-media-height: auto;
  }

  :host::part(card-promo__badge) {
    margin-block-end: 16px;
  }

  :host::part(card-promo__tag) {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 16px;
    margin-block-end: var(--ds-card-promo-tag-margin-block-end, var(--ds-spacing-m, 1rem));
  }
  :host([enable-animation-description]) .card-promo__content-primary ::slotted(store-text-block) {
    --ds-text-block-gap: 1rem;
  }

  :host([enable-animation-description])
    .card-promo__content-secondary
    ::slotted(store-button-group) {
    --ds-button-group-row-gap: 1rem;
    --ds-button-group-column-gap: 1rem;
  }

  @media (min-width: 860px) {
    :host([enable-animation-description])::part(card-promo__content-secondary) {
      margin-block-start: var(--ds-card-promo-content-secondary-margin-block-start, 1rem);
    }

    :host([enable-animation-description]) .card-promo__body {
      overflow: var(--ds-card-promo-animation-body-overflow, hidden);
    }

    :host([enable-animation-description]) .card-promo__content-wrapper .card-promo__tag,
    :host([enable-animation-description]) .card-promo__content-wrapper .card-promo__badge,
    :host([enable-animation-description]) .card-promo__content-wrapper .card-promo__eyebrow-media {
      transform: translateY(var(--ds-card-promo-hover-translate-y, 60px));
      transition: transform var(--ds-card-promo-hover-duration, 0.4s) cubic-bezier(0.4, 0, 0.2, 1);
    }

    :host([enable-animation-description]:hover) .card-promo__content-wrapper .card-promo__tag,
    :host([enable-animation-description]:focus-within)
      .card-promo__content-wrapper
      .card-promo__tag,
    :host([enable-animation-description][data-card-promo-focus-active])
      .card-promo__content-wrapper
      .card-promo__tag,
    :host([enable-animation-description]:hover) .card-promo__content-wrapper .card-promo__badge,
    :host([enable-animation-description]:focus-within)
      .card-promo__content-wrapper
      .card-promo__badge,
    :host([enable-animation-description][data-card-promo-focus-active])
      .card-promo__content-wrapper
      .card-promo__badge,
    :host([enable-animation-description]:hover)
      .card-promo__content-wrapper
      .card-promo__eyebrow-media,
    :host([enable-animation-description]:focus-within)
      .card-promo__content-wrapper
      .card-promo__eyebrow-media,
    :host([enable-animation-description][data-card-promo-focus-active])
      .card-promo__content-wrapper
      .card-promo__eyebrow-media,
    :host([enable-animation-description][description-expanded])
      .card-promo__content-wrapper
      .card-promo__tag,
    :host([enable-animation-description][description-expanded])
      .card-promo__content-wrapper
      .card-promo__badge,
    :host([enable-animation-description][description-expanded])
      .card-promo__content-wrapper
      .card-promo__eyebrow-media {
      transform: translateY(0);
    }
  }

  .card-promo__read-more {
    display: none;

    --ds-link-color: var(--ds-color-neutral-white, #fff);
    --ds-icon-color: var(--ds-color-neutral-white, #fff);

    margin-block-start: var(--ds-spacing-l, 1.5rem);
  }

  .card-promo__read-more:focus {
    outline-color: var(--ds-color-neutral-white, #fff);
  }

  .card-promo__read-more:active {
    --ds-theme-foreground-accent-subtle-pressed: var(--ds-color-neutral-white, #fff) !important;
  }

  @media (min-width: 860px) and (max-width: 1083.98px) {
    :host([enable-animation-description])::part(card-promo__body) {
      padding-inline-start: var(--ds-card-promo-body-padding-inline-start, 1rem);
      padding-inline-end: var(--ds-card-promo-body-padding-inline-end, 1rem);
      padding-block-start: var(--ds-card-promo-body-padding-block-start, 1rem);
      padding-block-end: var(--ds-card-promo-body-padding-block-end, 1rem);
    }
  }

  @media (max-width: 859px) {
    :host([enable-animation-description]) .card-promo__read-more store-icon {
      vertical-align: middle;
    }
    :host(:not([mobile-button-visible])) .card-promo__content-secondary {
      display: none;
    }

    :host([mobile-button-visible]) .card-promo__content-secondary {
      display: block;
      margin-block-start: var(--ds-spacing-l, 1.5rem);
    }
    :host::part(card-promo__tag) {
      margin-block-end: var(--ds-card-promo-tag-margin-block-end, var(--ds-spacing-l, 1.5rem));
    }
  }
`,R=i`
  @media (max-width: ${t(v(f.md))}) {
    :host([mobile-button-visible]) .card-promo__content-secondary {
      --ds-button-group-flex-direction: column;
      --ds-button-group-button-width: auto;
      --ds-button-group-align-items: flex-start;
    }

    :host([show-first-button-only]) .card-promo__content-secondary {
      --ds-button-group-link-display: none;
      --ds-button-group-secondary-button-display: none;
    }

    :host([enable-animation-description])
      .card-promo__content-primary.is-collapsed
      ::slotted(store-text-block) {
      --ds-text-block-content-overflow: hidden;
      --ds-text-block-content-max-height: 0;
      --ds-text-block-gap: 0;
    }

    :host([enable-animation-description])
      .card-promo__content-primary:not(.is-collapsed)
      ::slotted(store-text-block) {
      --ds-text-block-gap: 1rem;
    }

    :host([enable-animation-description]) .card-promo__read-more {
      display: inline-block;
    }
  }

  @media (max-width: ${t(v(f.md))}) {
    :host([configuration='horizontal'])::part(card-promo__body) {
      --ds-card-promo-body-padding-inline-start: var(--ds-card-padding-relaxed, 2rem);
      --ds-card-promo-body-padding-inline-end: var(--ds-card-padding-relaxed, 2rem);
      --ds-card-promo-body-padding-block-start: var(--ds-card-padding-default, 1rem);
      --ds-card-promo-body-padding-block-end: var(--ds-spacing-3xl, 3rem);
    }

    :host([has-video][configuration='horizontal']) {
      --ds-card-promo-min-height: 0;
      --ds-card-promo-safe-area-height: auto;
    }
  }

  @media (min-width: ${t(f.md)}) {
    :host([configuration='horizontal'])::part(card-promo__safe-area) {
      --ds-card-promo-safe-area-display: none;
    }

    :host([configuration='horizontal'])::part(card-promo__body) {
      --ds-card-promo-body-padding-block-start: var(--ds-spacing-relaxed, 4.5rem);
    }

    :host([configuration='horizontal--slim'])::part(card-promo__content-container) {
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
    }

    :host([configuration='horizontal--slim'])::part(card-promo__content) {
      flex-direction: row;
    }

    :host([configuration='horizontal--slim'])::part(card-promo__content-leading) {
      align-self: center;
    }

    :host([configuration='horizontal--slim'])::part(card-promo__content-secondary) {
      width: auto;

      --ds-card-promo-content-secondary-margin-block-start: 0;
    }
  }

  /* Hero card aspect ratio: 3-4
     VP1/VP2 (default): 3XS — Headline 16px/24px, Body 12px/16px, CTA 15px */
  :host([hero-card-aspect-ratio='3-4']) {
    width: var(--ds-card-promo-hero-width, 272px);
    height: var(--ds-card-promo-hero-height, calc(272px * 4 / 3));
    flex-shrink: var(--ds-card-promo-hero-flex-shrink, 0);
    overflow: hidden;
    box-sizing: border-box;
    grid-template-rows: auto auto minmax(0, 1fr) auto;

    --ds-card-promo-safe-area-height: auto;
    --ds-card-promo-safe-area-padding: 0;
    --ds-heading-s-font-size: 1rem;
    --ds-heading-s-line-height: 1.5rem;
    --ds-body-m-font-size: 0.75rem;
    --ds-body-m-line-height: 1rem;
    --ds-button-font-size: 0.9375rem;
  }

  :host([hero-card-aspect-ratio='3-4'])::part(card-promo__body) {
    overflow: hidden;
    min-height: 0;
  }

  /* VP3 (860–1083px): 2XS — Headline 20px/25.4px, Body 12px/16px, CTA 14px */
  @media (min-width: ${t(f.md)}) {
    :host([hero-card-aspect-ratio='3-4']) {
      width: var(--ds-card-promo-hero-width, 300px);
      height: var(--ds-card-promo-hero-height, calc(300px * 4 / 3));

      --ds-heading-s-font-size: 1.25rem;
      --ds-heading-s-line-height: 1.5875rem;
      --ds-body-m-font-size: 0.75rem;
      --ds-body-m-line-height: 1rem;
      --ds-button-font-size: 0.875rem;
    }
  }

  /* VP4 (1084–1399px): S — Headline 24px/32px, Body 14px, CTA 15px */
  @media (min-width: 1084px) {
    :host([hero-card-aspect-ratio='3-4']) {
      width: var(--ds-card-promo-hero-width, 378px);
      height: var(--ds-card-promo-hero-height, calc(378px * 4 / 3));

      --ds-heading-s-font-size: 1.5rem;
      --ds-heading-s-line-height: 2rem;
      --ds-body-m-font-size: 0.875rem;
      --ds-body-m-line-height: 1.25rem;
      --ds-button-font-size: 0.9375rem;
    }
  }

  /* VP5/VP6 (1400px+): S — Headline 32px/40px, Body 16px, CTA 15px */
  @media (min-width: 1400px) {
    :host([hero-card-aspect-ratio='3-4']) {
      width: var(--ds-card-promo-hero-width, 426px);
      height: var(--ds-card-promo-hero-height, calc(426px * 4 / 3));

      --ds-heading-s-font-size: 2rem;
      --ds-heading-s-line-height: 2.5rem;
      --ds-body-m-font-size: 1rem;
      --ds-body-m-line-height: 1.5rem;
      --ds-button-font-size: 0.9375rem;
    }
  }
`,I="vertical",V="horizontal--slim";var Y=Object.defineProperty,Q=Object.getOwnPropertyDescriptor,W=(t,e,o,r)=>{for(var a,i=r>1?void 0:r?Q(e,o):e,n=t.length-1;n>=0;n--)(a=t[n])&&(i=(r?a(e,o,i):a(i))||i);return r&&i&&Y(e,o,i),i};const G="store-card-promo";let U=class extends y{constructor(){super(),this.configuration=I,this.enableAnimationDescription=!1,this.mobileButtonVisible=!1,this.showFirstButtonOnly=!1,this.enableHeadingAccordion=!1,this.enableEyebrowMedia=!1,this._eyebrowMediaSlotEmpty=!0,this._tagSlotEmpty=!0,this._badgeSlotEmpty=!0,this._firstSlotEmpty=!0,this._lastSlotEmpty=!0,this._contentPrimarySlotEmpty=!0,this._contentSecondarySlotEmpty=!0,this._contentLeadingSlotEmpty=!0,this._descriptionExpanded=!1,this._resizeObserver=null,this._isMobile=!1,this._mobileQuery=null,this._onMobileChange=t=>{this._isMobile=t.matches,this._updateHeadingAccordionButton(),this._updateHeadingChevron(),this._updateHeadlineTruncate(),this._updateShowFirstButtonOnlyClick(),this._updateClickableVideoMediaInteraction()},this._boundShowFirstButtonOnlyClick=null,this._onMobileClickGuard=t=>{this._isMobile&&this.enableAnimationDescription&&this.clickable&&(t.composedPath().some(t=>t!==this&&t instanceof HTMLElement&&!t.hasAttribute("data-accordion-heading")&&(t.tagName.toLowerCase()===E||"store-link"===t.tagName.toLowerCase()||"a"===t.tagName.toLowerCase()||"button"===t.tagName.toLowerCase()))||t.stopImmediatePropagation())},this._onComponentFocusIn=()=>{this.enableAnimationDescription&&this._setFocusProxyState(!0)},this._onComponentFocusOut=()=>{this.enableAnimationDescription&&requestAnimationFrame(()=>{this.matches(":focus-within")||this._setFocusProxyState(!1)})},this._onDocumentFocusIn=t=>{const e=t.target;if(!e||this.contains(e)||this===e)return;const o=this.parentElement;o&&o===e&&this._isFocusableWrapper(o)&&1===o.querySelectorAll(G).length?this.enableAnimationDescription&&this._setFocusProxyState(!0):requestAnimationFrame(()=>{const t=!!o&&document.activeElement===o&&this._isFocusableWrapper(o);this.matches(":focus-within")||t||(this._setFocusProxyState(!1),this._descriptionExpanded&&this._setDescriptionExpandedState(!1))})},this.surface=x.media,this._contentId="card-promo-content-"+U._instanceCount++,U._injectGlobalStyles()}_setDescriptionExpandedState(t){this._descriptionExpanded!==t&&(this._descriptionExpanded=t,this.toggleAttribute("description-expanded",t),this._contentPrimarySlot.forEach(e=>{const o=e;o.nodeName.toLowerCase()===k&&o.setAttribute("aria-expanded",String(t))}),this._updateHeadingAccordionButton(),this._updateReadMoreLabel())}_setFocusProxyState(t){this.toggleAttribute(U._focusProxyAttr,t)}_toggleDescription(t){t.stopPropagation(),this._setDescriptionExpandedState(!this._descriptionExpanded)}_updateHeadingChevron(){this._contentPrimarySlot.forEach(t=>{const e=t;if(e.nodeName.toLowerCase()!==k)return;const o=e.querySelector('[slot="text-block__heading"]');if(!o)return;const r=o.querySelector("store-icon[data-heading-chevron]");if(!this._isMobile&&this.enableAnimationDescription||this.enableHeadingAccordion&&this._isMobile){const t=o.querySelector("button[data-accordion-heading]"),e=t??o;if(e.style.display="inline-flex",e.style.alignItems="flex-end",e.style.gap="var(--ds-spacing-m, 1rem)",t&&(e.style.width="100%",e.style.justifyContent="space-between"),!r){const t=document.createElement(C);t.setAttribute("icon","chevron-down"),t.setAttribute("size",z.medium),t.setAttribute("data-heading-chevron",""),e.append(t)}}else if(r){r.remove(),o.style.removeProperty("display"),o.style.removeProperty("align-items"),o.style.removeProperty("gap");const t=o.querySelector("button[data-accordion-heading]");t&&(t.style.removeProperty("display"),t.style.removeProperty("align-items"),t.style.removeProperty("gap"),t.style.removeProperty("width"),t.style.removeProperty("justify-content"))}})}_updateHeadingAccordionButton(){this._contentPrimarySlot.forEach(t=>{const e=t;if(e.nodeName.toLowerCase()!==k)return;const o=e.querySelector('[slot="text-block__heading"]');if(!o)return;const r=o.querySelector("button[data-accordion-heading]");if(this.enableHeadingAccordion&&this._isMobile)if(r)r.setAttribute("aria-expanded",String(this._descriptionExpanded)),this._isMobile&&this.enableAnimationDescription?r.setAttribute("tabindex","-1"):r.removeAttribute("tabindex");else{const t=document.createElement("button");t.type="button",t.setAttribute("aria-expanded",String(this._descriptionExpanded)),t.setAttribute("aria-owns",this._contentId),t.setAttribute("data-accordion-heading",""),this._isMobile&&this.enableAnimationDescription&&t.setAttribute("tabindex","-1"),t.addEventListener("click",t=>{this.enableAnimationDescription||this._toggleDescription(t)}),Array.from(o.childNodes).forEach(e=>{e instanceof HTMLAnchorElement||e instanceof HTMLButtonElement||t.append(e)}),o.append(t),t.style.display="inline-flex",t.style.alignItems="flex-end",t.style.gap="var(--ds-spacing-m, 1rem)",t.style.width="100%",t.style.justifyContent="space-between",o.removeAttribute("tabindex")}else if(r){for(;r.firstChild;)o.insertBefore(r.firstChild,r);r.remove()}})}_updateHeadlineTruncate(){const t=this.enableAnimationDescription;this._contentPrimarySlot.forEach(e=>{const o=e;if(o.nodeName.toLowerCase()!==k)return;const r=o.querySelector('[slot="text-block__heading"]');if(!r)return;const a=r.querySelector("[data-headline-text]");if(t){if(!a){const t=document.createElement("span");t.setAttribute("data-headline-text","");const e=r.querySelector("button[data-accordion-heading]")??r;Array.from(e.childNodes).filter(t=>!(t instanceof Element&&t.hasAttribute("data-heading-chevron"))).forEach(e=>t.append(e)),e.insertBefore(t,e.firstChild)}}else if(a){const t=a.parentElement;for(;a.firstChild;)t.insertBefore(a.firstChild,a);a.remove()}})}_updateDescriptionTranslateY(){this.enableAnimationDescription&&this._contentPrimarySlot.forEach(t=>{const e=t;if(e.nodeName.toLowerCase()!==k)return;const o=e.querySelector('[slot="text-block__content"]');if(!o)return;const r=o.style.display;o.style.display="flex";const a=o.offsetHeight+16;o.style.display=r,a>0&&this.style.setProperty("--ds-card-promo-hover-translate-y",`${a}px`)})}_updateMediaOverlayStartStop(){const t=this.renderRoot.querySelector('slot[name="card-promo__media"]'),e=null==t?void 0:t.assignedElements().find(t=>t.nodeName.toLowerCase()===M);if(!e)return;if(!this.enableAnimationDescription||!e.hasAttribute("enable-hover-effects"))return e.style.removeProperty("--ds-media-card-promo-default-overlay-background"),e.style.removeProperty("--ds-media-card-promo-hover-overlay-background"),e.style.removeProperty("--ds-media-default-overlay-start-stop"),void e.style.removeProperty("--ds-media-hover-overlay-start-stop");const o=this.renderRoot.querySelector(".card-promo__content-wrapper");if(e.style.setProperty("--ds-media-card-promo-default-overlay-background","var(--ds-media-default-overlay-background, var(--ds-media-overlay-background, initial))"),e.style.setProperty("--ds-media-card-promo-hover-overlay-background","var(--ds-media-hover-overlay-background, var(--ds-media-default-overlay-background, var(--ds-media-overlay-background, initial)))"),!o)return e.style.removeProperty("--ds-media-default-overlay-start-stop"),void e.style.removeProperty("--ds-media-hover-overlay-start-stop");let r=1;this._contentPrimarySlot.forEach(t=>{const e=t;if(e.nodeName.toLowerCase()!==k)return;const o=e.querySelector('[slot="text-block__heading"]');if(!o)return;const a=o.querySelector("[data-headline-text]")??o,i=document.createRange();i.selectNodeContents(a);const n=Array.from(i.getClientRects()).filter(t=>t.height>0);if(n.length>0)return void(r=Math.max(r,n.length));const d=o.getBoundingClientRect(),s=window.getComputedStyle(o),c=parseFloat(s.lineHeight||"0");c>0&&d.height>0&&(r=Math.max(r,Math.round(d.height/c)))});let a=r>1?20:40,i=0;if(this._contentSecondarySlot.forEach(t=>{const e=t;e.nodeName.toLowerCase()===A?i+=e.querySelectorAll(E).length:e.nodeName.toLowerCase()===E&&(i+=1)}),r>1){let t=0;this._tagSlotEmpty||(t+=1),this._badgeSlotEmpty||(t+=1),this.enableEyebrowMedia&&!this._eyebrowMediaSlotEmpty&&(t+=1),i>1&&(t+=1),1===t?a=10:t>=2&&(a=0)}a=Math.max(0,Math.min(40,a)),e.style.setProperty("--ds-media-default-overlay-start-stop",`${a}%`),e.style.setProperty("--ds-media-hover-overlay-start-stop","0%")}_updateMediaTabFlow(t=!1){const e=this.renderRoot.querySelector('slot[name="card-promo__media"]'),o=(null==e?void 0:e.assignedElements())??[],r=!t&&this.enableAnimationDescription;o.forEach(t=>{t instanceof HTMLElement&&Array.from(t.querySelectorAll("universal-media-player, store-media-player")).forEach(t=>{r?t.hasAttribute("data-card-promo-media-inert")||(t.setAttribute("inert",""),t.setAttribute("data-card-promo-media-inert","")):t.hasAttribute("data-card-promo-media-inert")&&(t.removeAttribute("inert"),t.removeAttribute("data-card-promo-media-inert"))})})}_handleSlotChange(t){this._eyebrowMediaSlotEmpty=0===this._eyebrowMediaSlot.length,this._tagSlotEmpty=0===this._tagSlot.length,this._badgeSlotEmpty=0===this._badgeSlot.length,this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length,this._contentPrimarySlotEmpty=0===this._contentPrimarySlot.length,this._contentSecondarySlotEmpty=0===this._contentSecondarySlot.length,this._contentLeadingSlotEmpty=0===this._contentLeadingSlot.length;const e=t.target.getAttribute("name");"card-promo__media"===e&&(this._updateHasVideo(),this._updateMediaOverlayStartStop(),this._updateMediaTabFlow()),"card-promo__eyebrow-media"===e&&!this._eyebrowMediaSlotEmpty&&this._setMediaAttributes(),"card-promo__content-primary"===e&&!this._contentPrimarySlotEmpty&&(this._updateTextBlockAttributes(),this._updateDescriptionTranslateY(),this._updateHeadlineTruncate(),this._updateHeadingAccordionButton(),this._updateMediaOverlayStartStop(),this._updateReadMoreLabel()),"card-promo__content-secondary"===e&&!this._contentSecondarySlotEmpty&&(this._updateButtonAttributes(),this._updateShowFirstButtonOnlyClick(),this._updateMediaOverlayStartStop()),"card-promo__content-leading"===e&&!this._contentLeadingSlotEmpty&&this.configuration===V&&this._updateIconAttributes()}_updateHasVideo(){const t=this.renderRoot.querySelector('slot[name="card-promo__media"]'),e=((null==t?void 0:t.assignedElements())??[]).some(t=>t.nodeName.toLowerCase()===M&&t.hasAttribute("video"));this.toggleAttribute("has-video",e),this._updateClickableVideoMediaInteraction()}_removeReadMoreButtonPadding(){const t=this.renderRoot.querySelector(".card-promo__read-more");t&&t.updateComplete.then(()=>{var e;const o=null==(e=t.shadowRoot)?void 0:e.querySelector("button");o&&(o.style.padding="0")})}_getPrimaryHeadingText(){let t="";return this._contentPrimarySlot.forEach(e=>{const o=e;if(o.nodeName.toLowerCase()!==k)return;const r=o.querySelector('[slot="text-block__heading"]');r&&(t=(r.textContent??"").replaceAll(/\s+/g," ").trim())}),t}_getToggleAriaLabel(){const t=this._getPrimaryHeadingText();if(!t)return;const e=this._descriptionExpanded?"card-promo__read-less-label":"card-promo__read-more-label",o=this.querySelector(`[slot="${e}"]`),r=((null==o?void 0:o.textContent)??"").replaceAll(/\s+/g," ").trim();return r?`${r} ${t}`:void 0}_updateReadMoreLabel(){if(!this.enableAnimationDescription)return;const t=this.renderRoot.querySelector(".card-promo__read-more");t&&(t.linkLabel=this._getToggleAriaLabel()??null)}_updateClickableVideoMediaInteraction(){const t=this.renderRoot.querySelector('slot[name="card-promo__media"]');((null==t?void 0:t.assignedElements())??[]).forEach(t=>{var e,o,r,a;if(!(t instanceof HTMLElement)||t.nodeName.toLowerCase()!==M)return;const i=t.hasAttribute("video");if(this.clickable&&i&&!this._isMobile){t.style.pointerEvents="none",t.style.setProperty("--ds-media-pointer-events","none");const r=null==(e=t.shadowRoot)?void 0:e.querySelector(".media__asset__overlay");r&&(r.style.pointerEvents="none");const a=null==(o=t.shadowRoot)?void 0:o.querySelector(".media__asset");return a&&(a.style.pointerEvents="none"),t.querySelectorAll("video, universal-media-player, store-media-player").forEach(t=>{t.style.pointerEvents="none"}),void t.setAttribute(U._managedVideoPointerEventsAttr,"")}if(t.hasAttribute(U._managedVideoPointerEventsAttr)){t.style.removeProperty("pointer-events"),t.style.removeProperty("--ds-media-pointer-events");const e=null==(r=t.shadowRoot)?void 0:r.querySelector(".media__asset__overlay");e&&e.style.removeProperty("pointer-events");const o=null==(a=t.shadowRoot)?void 0:a.querySelector(".media__asset");o&&o.style.removeProperty("pointer-events"),t.querySelectorAll("video, universal-media-player, store-media-player").forEach(t=>{t.style.removeProperty("pointer-events")}),t.removeAttribute(U._managedVideoPointerEventsAttr)}})}_renderOptionalSlot(t,e){return c`
      <div part=${t} class=${t} style="${e?"display: none;":""}">
        <slot name=${t} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}_updateButton(t){t.hasAttribute("size")||t.setAttribute("size",w.medium),t.hasAttribute("shape")||t.setAttribute("shape",S.rounded)}_updateButtonAttributes(){this._contentSecondarySlot.forEach(t=>{const e=t;e.nodeName.toLowerCase()===A&&Array.from(e.querySelectorAll(E)).forEach((t,e)=>{this._updateButton(t),e>0?t.setAttribute("data-secondary",""):t.hasAttribute("data-secondary")||t.removeAttribute("data-secondary")}),e.nodeName.toLowerCase()===E&&this._updateButton(e)})}_updateTextBlockAttributes(){this._contentPrimarySlot.forEach(t=>{const e=t;if(e.nodeName.toLowerCase()===k){e.hasAttribute("configuration")||e.setAttribute("configuration",l.default),e.hasAttribute("size")||e.setAttribute("size",p["size-s"]),this.enableAnimationDescription?(e.setAttribute("enable-animation",""),e.setAttribute("aria-expanded",String(this._descriptionExpanded))):(e.removeAttribute("enable-animation"),e.removeAttribute("aria-expanded")),!e.hasAttribute("alignment")&&this.configuration!==I&&e.setAttribute("alignment",m.center);const t=e.querySelector('[slot="text-block__heading"]');t&&(t.querySelector('a[href], button:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])')||t.querySelector("button[data-accordion-heading]"))&&t.removeAttribute("tabindex")}}),this._updateHeadingChevron()}_setMediaAttributes(){this._eyebrowMediaSlot.filter(t=>t instanceof HTMLElement&&t.tagName.toLowerCase()===M).forEach(t=>{h(t,{"aspect-ratio":u.ratio21to9})})}_updateIconAttributes(){this._contentLeadingSlot.forEach(t=>{const e=t;e.nodeName.toLowerCase()===C&&!e.hasAttribute("size")&&e.setAttribute("size",z.xlarge)})}renderHorizontalSlimTemplate(){return c`
      <div part="card-promo__media" class="card-promo__media">
        <slot name="card-promo__media" @slotchange=${this._handleSlotChange}></slot>
      </div>
      <div part="card-promo__body" class="card-promo__body">
        <div
          part="card-promo__eyebrow-media"
          class="card-promo__eyebrow-media"
          style="${!this.enableEyebrowMedia||this._eyebrowMediaSlotEmpty?"display: none;":""}"
        >
          <slot name="card-promo__eyebrow-media" @slotchange=${this._handleSlotChange}></slot>
        </div>
        ${this._renderBadgeSlot()} ${this._renderTagSlot()}
        <div part="card-promo__content-container" class="card-promo__content-container">
          <div part="card-promo__content" class="card-promo__content">
            <div part="card-promo__content-leading" class="card-promo__content-leading">
              <slot name="card-promo__content-leading" @slotchange=${this._handleSlotChange}></slot>
            </div>

            <div part="card-promo__content-primary" class="card-promo__content-primary">
              <div part="card-promo__content-top" class="card-promo__content-top">
                <slot name="card-promo__content-primary-text"></slot>
                <slot name="card-promo__content-secondary-text"></slot>
                <sup>
                  <slot name="card-promo__content-footnote"></slot>
                </sup>
              </div>

              <div part="card-promo__content-bottom" class="card-promo__content-bottom">
                <slot name="card-promo__content-bottom"></slot>
              </div>
            </div>
          </div>

          <div part="card-promo__content-secondary" class="card-promo__content-secondary">
            <slot name="card-promo__content-secondary" @slotchange=${this._handleSlotChange}></slot>
          </div>
        </div>
      </div>
    `}renderDefaultTemplate(){return c`
      <div part="card-promo__media" class="card-promo__media">
        <slot name="card-promo__media" @slotchange=${this._handleSlotChange}></slot>
      </div>
      <div part="card-promo__safe-area" class="card-promo__safe-area"></div>
      <div part="card-promo__body" class="card-promo__body">
        <div class="card-promo__content-wrapper">
          <div
            part="card-promo__eyebrow-media"
            class="card-promo__eyebrow-media"
            style="${!this.enableEyebrowMedia||this._eyebrowMediaSlotEmpty?"display: none;":""}"
          >
            <slot name="card-promo__eyebrow-media" @slotchange="${this._handleSlotChange}"></slot>
          </div>
          ${this._renderBadgeSlot()} ${this._renderTagSlot()}
          <div
            id="${this._contentId}"
            part="card-promo__content-primary"
            class="card-promo__content-primary${this.enableAnimationDescription&&!this._descriptionExpanded?" is-collapsed":""}"
          >
            <slot name="card-promo__content-primary" @slotchange=${this._handleSlotChange}></slot>
          </div>
          ${this.enableAnimationDescription?c`
                <store-link
                  class="card-promo__read-more"
                  as-button
                  @click="${this._toggleDescription}"
                  aria-expanded="${this._descriptionExpanded}"
                  aria-controls="${this._contentId}"
                >
                  <span slot="link__text">
                    ${this._descriptionExpanded?c`<slot name="card-promo__read-less-label">Read less</slot>`:c`<slot name="card-promo__read-more-label">Read more</slot>`}
                  </span>
                  <store-icon
                    slot="link__last"
                    icon="${this._descriptionExpanded?"chevron-up":"chevron-down"}"
                    size="medium"
                  ></store-icon>
                </store-link>
              `:_}
          <div
            part="card-promo__content-secondary"
            class="card-promo__content-secondary"
            style="${this._contentSecondarySlotEmpty?"display: none;":""}"
          >
            <slot name="card-promo__content-secondary" @slotchange=${this._handleSlotChange}></slot>
          </div>
        </div>
      </div>
    `}_renderTagSlot(){return c`
      <div
        part="card-promo__tag"
        class="card-promo__tag"
        style="${this._tagSlotEmpty?"display: none;":""}"
      >
        <slot name="card-promo__tag" @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}_renderBadgeSlot(){return c`
      <div
        part="card-promo__badge"
        class="card-promo__badge"
        style="${this._badgeSlotEmpty?"display: none;":""}"
      >
        <slot name="card-promo__badge" @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}render(){return c`
      ${this._renderOptionalSlot("card-promo__first",this._firstSlotEmpty)}
      ${this.configuration===V?this.renderHorizontalSlimTemplate():this.renderDefaultTemplate()}
      ${this._renderOptionalSlot("card-promo__last",this._lastSlotEmpty)}
    `}static _injectGlobalStyles(){if(U._stylesInjected)return;U._stylesInjected=!0;const t=document.createElement("style");t.setAttribute("data-card-promo-accordion",""),t.textContent=["button[data-accordion-heading] {","  background: none;","  border: none;","  padding: 0;","  margin: 0;","  font: inherit;","  color: inherit;","  cursor: pointer;","  text-align: inherit;","  width: 100%;","  display: inline;","}","store-card-promo[enable-animation-description] store-text-block::part(text-block__header),","store-card-promo[enable-heading-accordion] store-text-block::part(text-block__header) {","  width: 100%;","}","store-card-promo[enable-animation-description] store-text-block::part(text-block__headings),","store-card-promo[enable-heading-accordion] store-text-block::part(text-block__headings) {","  width: 100%;","}","store-card-promo[enable-animation-description] store-text-block::part(text-block__title-indicator),","store-card-promo[enable-heading-accordion] store-text-block::part(text-block__title-indicator) {","  width: 100%;","}",'store-card-promo[enable-animation-description] [slot="text-block__heading"],','store-card-promo[enable-heading-accordion] [slot="text-block__heading"] {',"  display: flex;","  align-items: flex-end;","  gap: var(--ds-spacing-m, 1rem);","  width: 100%;","  justify-content: space-between;","}","[data-headline-text] {","  flex: 1;","  min-width: 0;","}","[data-headline-text] dynamic-price {","  margin-inline: 0.25em;","}","store-card-promo[enable-animation-description] store-icon[data-heading-chevron] {","  display: none;","}","@media (min-width: 860px) {","  store-card-promo[enable-animation-description] store-icon[data-heading-chevron] {","    display: flex;","    align-self: flex-end;","    margin-block: 8px;","    flex-shrink: 0;","    color: var(--ds-color-neutral-white, #fff);","    transform: rotate(0deg);","    transition: transform 0.4s ease;","    --ds-icon-size-default: 16.98px;","  }","  store-card-promo[enable-animation-description]:hover store-icon[data-heading-chevron],","  store-card-promo[enable-animation-description]:focus-within store-icon[data-heading-chevron],","  store-card-promo[enable-animation-description][data-card-promo-focus-active] store-icon[data-heading-chevron],","  store-card-promo[enable-animation-description][description-expanded] store-icon[data-heading-chevron] {","    transform: rotate(180deg);","  }","  /* Description animation: heading slides up, content fades in */",'  store-card-promo[enable-animation-description] [slot="text-block__heading"] {',"    transform: translateY(var(--ds-card-promo-hover-translate-y, 60px));","    transition: transform var(--ds-card-promo-hover-duration, 0.4s) cubic-bezier(0.4, 0, 0.2, 1);","  }",'  store-card-promo[enable-animation-description] [slot="text-block__content"] {',"    opacity: 0;","    transition: opacity var(--ds-card-promo-hover-duration, 0.4s) ease;","  }",'  store-card-promo[enable-animation-description]:hover [slot="text-block__heading"],','  store-card-promo[enable-animation-description]:focus-within [slot="text-block__heading"],','  store-card-promo[enable-animation-description][data-card-promo-focus-active] [slot="text-block__heading"],','  store-card-promo[enable-animation-description][description-expanded] [slot="text-block__heading"] {',"    transform: translateY(0);","  }",'  store-card-promo[enable-animation-description]:hover [slot="text-block__content"],','  store-card-promo[enable-animation-description]:focus-within [slot="text-block__content"],','  store-card-promo[enable-animation-description][data-card-promo-focus-active] [slot="text-block__content"],','  store-card-promo[enable-animation-description][description-expanded] [slot="text-block__content"] {',"    opacity: 1;","  }","}","@media (min-width: 1084px) {","  store-card-promo[enable-animation-description] store-icon[data-heading-chevron] {","    --ds-icon-size-default: 21.39px;","  }","}","@media (min-width: 1400px) {","  store-card-promo[enable-animation-description] store-icon[data-heading-chevron] {","    --ds-icon-size-default: 24.06px;","  }","}","/* Mobile: completely hide description until expanded */","@media (max-width: 859px) {",'  store-card-promo[enable-animation-description]:not([description-expanded]) [slot="text-block__content"] {',"    display: none;","  }","  store-card-promo[enable-animation-description]:hover:not([description-expanded]) [data-headline-text] {","    overflow: clip;","    display: -webkit-box;","    -webkit-line-clamp: 2;","    -webkit-box-orient: vertical;","  }","}","/* Suppress description on mobile via viewport styles reset */","@media (max-width: 859px) {",'  store-card-promo[enable-animation-description][description-expanded] [slot="text-block__content"] {',"    display: block;","  }","}","/* Headline truncation: clamp to 2 lines, expand on hover/description-expanded */","store-card-promo[enable-animation-description] [data-headline-text] {","  overflow: clip;","  display: -webkit-box;","  -webkit-line-clamp: 2;","  -webkit-box-orient: vertical;","}","/* Desktop only: unclamp headline on hover/focus */","@media (min-width: 860px) {","  store-card-promo[enable-animation-description]:hover [data-headline-text],","  store-card-promo[enable-animation-description]:focus-within [data-headline-text],","  store-card-promo[enable-animation-description][data-card-promo-focus-active] [data-headline-text] {","    -webkit-line-clamp: unset;","    overflow: visible;","    display: block;","  }","}","/* All viewports: unclamp headline when Read More is clicked */","store-card-promo[enable-animation-description][description-expanded] [data-headline-text] {","  -webkit-line-clamp: unset;","  overflow: visible;","  display: block;","}","@media (min-width: 860px) {","  store-card-promo[enable-animation-description] store-icon[data-heading-chevron] {","    color: var(--ds-icon-color, var(--ds-theme-foreground-base-icon, inherit));","  }","}"].join("\n"),document.head.append(t)}_updateShowFirstButtonOnlyClick(){if(this._boundShowFirstButtonOnlyClick&&(this.removeEventListener("click",this._boundShowFirstButtonOnlyClick),this._boundShowFirstButtonOnlyClick=null,this.style.removeProperty("cursor")),!this.showFirstButtonOnly||!this.clickable||!this._isMobile||this.enableAnimationDescription||this.querySelector("button[data-accordion-heading]")||this.renderRoot.querySelector(".card-promo__read-more")||1!==Array.from(this.querySelectorAll(E)).filter(t=>!t.hasAttribute("data-secondary")).length)return;const t=this.querySelector(`${E}:not([data-secondary])`)??this.querySelector(E);t&&(this._boundShowFirstButtonOnlyClick=e=>{var o;this.enableAnimationDescription||this.querySelector("button[data-accordion-heading]")||this.renderRoot.querySelector(".card-promo__read-more")||e.composedPath().some(t=>t!==this&&t instanceof HTMLElement&&(t.tagName.toLowerCase()===E||"store-link"===t.tagName.toLowerCase()||"a"===t.tagName.toLowerCase()||"button"===t.tagName.toLowerCase()))||((null==(o=t.shadowRoot)?void 0:o.querySelector("a"))??t.querySelector("a")??t).click()},this.addEventListener("click",this._boundShowFirstButtonOnlyClick),this.style.cursor="pointer")}_syncHostTabStop(){this.hasAttribute(U._managedHostTabindexAttr)&&(this.removeAttribute("tabindex"),this.removeAttribute(U._managedHostTabindexAttr))}firstUpdated(){this._syncHostTabStop(),super.firstUpdated(),this._updateMediaOverlayStartStop(),this.showFirstButtonOnly&&this.clickable||this._updateMediaTabFlow(),this._removeReadMoreButtonPadding(),this._updateReadMoreLabel()}updated(t){super.updated(t),t.has("clickable")&&this._updateClickableVideoMediaInteraction(),t.has("enableAnimationDescription")&&(this._updateHeadlineTruncate(),this._updateMediaTabFlow()),this._updateMediaOverlayStartStop()}_isFocusableWrapper(t){const e=t.getAttribute("tabindex");if(null===e)return!1;const o=Number(e);return Number.isFinite(o)&&o>=0}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this._onMobileClickGuard),this._resizeObserver=new ResizeObserver(()=>{this._updateDescriptionTranslateY(),this._updateMediaOverlayStartStop()}),this._resizeObserver.observe(this),this._mobileQuery=window.matchMedia(`(max-width: ${v(f.md)})`),this._isMobile=this._mobileQuery.matches,this._mobileQuery.addEventListener("change",this._onMobileChange),this.addEventListener("focusin",this._onComponentFocusIn),this.addEventListener("focusout",this._onComponentFocusOut),document.addEventListener("focusin",this._onDocumentFocusIn,!0)}disconnectedCallback(){var t,e;super.disconnectedCallback(),this._setFocusProxyState(!1),null==(t=this._resizeObserver)||t.disconnect(),this._resizeObserver=null,null==(e=this._mobileQuery)||e.removeEventListener("change",this._onMobileChange),this._mobileQuery=null,this.removeEventListener("click",this._onMobileClickGuard),this.removeEventListener("focusin",this._onComponentFocusIn),this.removeEventListener("focusout",this._onComponentFocusOut),document.removeEventListener("focusin",this._onDocumentFocusIn,!0),this._updateMediaTabFlow(!0),this._boundShowFirstButtonOnlyClick&&(this.removeEventListener("click",this._boundShowFirstButtonOnlyClick),this._boundShowFirstButtonOnlyClick=null,this.style.removeProperty("cursor"))}};U.styles=[g,N,R],U._managedVideoPointerEventsAttr="data-card-promo-managed-video-pointer-events",U._instanceCount=0,U._managedHostTabindexAttr="data-card-promo-host-tabindex",U._focusProxyAttr="data-card-promo-focus-active",U._stylesInjected=!1,W([n({reflect:!0})],U.prototype,"theme",2),W([n({reflect:!0})],U.prototype,"configuration",2),W([n({type:String,reflect:!0,attribute:"column-span"})],U.prototype,"columnSpan",2),W([n({type:Boolean,reflect:!0,attribute:"enable-animation-description"})],U.prototype,"enableAnimationDescription",2),W([n({type:Boolean,reflect:!0,attribute:"mobile-button-visible"})],U.prototype,"mobileButtonVisible",2),W([n({type:Boolean,reflect:!0,attribute:"show-first-button-only"})],U.prototype,"showFirstButtonOnly",2),W([n({type:Boolean,reflect:!0,attribute:"enable-heading-accordion"})],U.prototype,"enableHeadingAccordion",2),W([n({type:String,reflect:!0,attribute:"hero-card-aspect-ratio"})],U.prototype,"heroCardAspectRatio",2),W([n({type:Boolean,reflect:!0,attribute:"enable-eyebrow-media"})],U.prototype,"enableEyebrowMedia",2),W([d({slot:"card-promo__eyebrow-media"})],U.prototype,"_eyebrowMediaSlot",2),W([d({slot:"card-promo__tag"})],U.prototype,"_tagSlot",2),W([d({slot:"card-promo__badge"})],U.prototype,"_badgeSlot",2),W([d({slot:"card-promo__first"})],U.prototype,"_firstSlot",2),W([d({slot:"card-promo__last"})],U.prototype,"_lastSlot",2),W([d({slot:"card-promo__content-primary"})],U.prototype,"_contentPrimarySlot",2),W([d({slot:"card-promo__content-secondary"})],U.prototype,"_contentSecondarySlot",2),W([d({slot:"card-promo__content-leading"})],U.prototype,"_contentLeadingSlot",2),W([s()],U.prototype,"_eyebrowMediaSlotEmpty",2),W([s()],U.prototype,"_tagSlotEmpty",2),W([s()],U.prototype,"_badgeSlotEmpty",2),W([s()],U.prototype,"_firstSlotEmpty",2),W([s()],U.prototype,"_lastSlotEmpty",2),W([s()],U.prototype,"_contentPrimarySlotEmpty",2),W([s()],U.prototype,"_contentSecondarySlotEmpty",2),W([s()],U.prototype,"_contentLeadingSlotEmpty",2),W([s()],U.prototype,"_descriptionExpanded",2),U=W([b(G)],U);export{U as CardPromo,G as name};
