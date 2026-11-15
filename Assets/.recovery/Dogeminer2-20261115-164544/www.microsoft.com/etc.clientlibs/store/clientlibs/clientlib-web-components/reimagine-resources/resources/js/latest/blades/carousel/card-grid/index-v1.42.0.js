import{i as e,r as a,n as s,s as r,b as t,d as o}from"../../../tag.const-v1.42.0.js";import{b as i}from"../../../vfi-v1.42.0.js";import{v as n,b as l,V as d,A as c}from"../../../secondary-nav-item.const-v1.42.0.js";import{n as u}from"../../../util2-v1.42.0.js";import{a as m}from"../../../util9-v1.42.0.js";import{S as g}from"../../../util21-v1.42.0.js";const b=e`
  :host {
    --ds-container-flex-direction: column;
    --ds-container-gap: var(--ds-density-vertical-compact);
    --ds-tab-panel-padding-top: var(--ds-spacing-2xl);
    --ds-container-display: block;
    --ds-card-banner-margin-block-end: var(--ds-spacing-2xl);
    --ds-card-feature-top-flex: 0;
    --ds-ui-shell-gap: var(--ds-density-vertical-compact, 2rem);
    --ds-tabs-base-margin-block-end: var(--ds-density-vertical-compact, 2rem);
    --ds-carousel-item-margin: var(--ds-spacing-2xs, 0.5rem);
    --ds-carousel-base-margin: calc(-1 * var(--ds-spacing-2xs, 0.5rem));
    --ds-carousel-item-margin-block-start: var(--ds-carousel-item-margin);
    --ds-carousel-item-margin-inline-start: var(--ds-carousel-item-margin);
    --ds-carousel-item-margin-block-end: var(--ds-carousel-item-margin);
    --ds-carousel-item-margin-inline-end: var(--ds-carousel-item-margin);
    --ds-carousel-base-margin-block-start: var(--ds-carousel-base-margin);
    --ds-carousel-base-margin-inline-start: var(--ds-carousel-base-margin);
    --ds-carousel-base-margin-block-end: var(--ds-carousel-base-margin);
    --ds-carousel-base-margin-inline-end: var(--ds-carousel-base-margin);
    --ds-scrollslider-item-default-height: calc(100% - 2 * var(--ds-spacing-2xs, 0.5rem));
    --ds-carousel-item-outline-offset: ${i};

    overflow-x: var(--ds-carousel-card-grid-overflow-x, hidden);
  }

  :host([base-content]) {
    container-type: inline-size;
  }

  :host([has-full-bleed-carousel]) {
    --ds-carousel-card-grid-overflow-x: visible;
  }

  :host([configuration='mobile-only-sign-in-hub']) {
    --ds-card-badge-min-height: 19rem;
    --ds-card-badge-height: 100%;
    --ds-card-badge-width: 100%;
    --ds-card-badge-padding-inline: var(--ds-spacing-xl, 2rem);
    --ds-card-badge-padding-block: var(--ds-spacing-l, 1.5rem);
    --ds-card-badge-gap: var(--ds-spacing-m, 1rem);
    --ds-surface-background: linear-gradient(180deg, #f4fafd 0%, #e6f2fb 100%);
    --ds-surface-border-width: 0;
    --ds-surface-border-color: var(--ds-theme-border-card-fade, #e6f2fb);
    --ds-surface-box-shadow:
      inset 0 0 0 1px var(--ds-theme-border-card-fade, #e6f2fb),
      var(
        --ds-elevation-level-2,
        0 0 0.125rem rgba(0, 0, 0, 0.12),
        0 0.125rem 0.25rem rgba(0, 0, 0, 0.14)
      );
    --ds-button-host-display: block;
    --ds-text-block-gap: var(--ds-spacing-m, 1rem);
    --ds-text-block-header-gap: var(--ds-spacing-m, 1rem);
    --ds-text-block-headings-gap: var(--ds-spacing-2xs, 0.25rem);
    --ds-text-block-heading-font-size: var(--ds-heading-s-font-size, 2rem);
    --ds-text-block-heading-line-height: var(--ds-heading-s-line-height, 2.5rem);
    --ds-text-block-content-font-size: var(--ds-body-l-font-size, 1.25rem);
    --ds-text-block-content-line-height: var(--ds-body-l-line-height, 1.75rem);
    --ds-layout-column-gap: var(--ds-spacing-s, 0.75rem);
    --ds-carousel-layout-column-gap: var(--ds-spacing-s, 0.75rem);
    --ds-layout-align-items: stretch;
    --ds-layout-column-display: flex;
    --ds-layout-column-flex-direction: column;
    --ds-carousel-item-margin-inline-start: 0;
    --ds-carousel-item-margin-inline-end: 0;
    --ds-carousel-item-margin-block-start: 0;
    --ds-carousel-item-margin-block-end: 0;
    --ds-carousel-base-margin-inline-start: 0;
    --ds-carousel-base-margin-inline-end: 0;
    --ds-carousel-base-margin-block-start: 0;
    --ds-carousel-base-margin-block-end: 0;
    --ds-scrollslider-item-default-height: 100%;
    --ds-card-feature-content-padding-block-start: 1.5rem;
    --ds-card-feature-content-padding-block-end: 1.5rem;
    --ds-card-feature-content-padding-inline-start: 2rem;
    --ds-card-feature-content-padding-inline-end: 2rem;
  }

  :host([configuration='mobile-only-sign-in-hub']) ::slotted([slot='carousel-card-grid__content']) {
    width: 100%;
  }

  :host([configuration='mobile-only-sign-in-hub']) store-carousel {
    --ds-layout-column-width: 100%;
    --ds-card-badge-width: 100%;
    --ds-carousel-item-base-display: flex;
    --ds-carousel-item-base-flex-direction: column;
  }

  :host([configuration='mobile-only-sign-in-hub']) store-carousel-item {
    height: 100%;
  }

  :host([configuration='mobile-only-sign-in-hub']) .ui-shell-header {
    --ds-container-width: 100%;
    --ds-container-max-width: none;
    --ds-container-padding-inline-start: 0;
    --ds-container-padding-inline-end: 0;
  }

  :host([configuration='mobile-only-sign-in-hub']) .ui-shell-header-layout {
    --ds-layout-justify-content: center;
    --ds-layout-column-flex-basis-override: 100%;
  }

  :host([configuration='mobile-only-sign-in-hub']) ::slotted([slot='ui-shell-header']) {
    width: 100%;
  }

  @media (max-width: 859.98px) {
    :host([configuration='mobile-only-sign-in-hub']) {
      --ds-carousel-item-padding-block: 0 var(--ds-spacing-xs, 0.5rem);
    }
  }

  @media (max-width: 539.98px) {
    :host([configuration='mobile-only-sign-in-hub']) {
      --ds-ui-shell-gap: var(--ds-spacing-m, 1rem);
      --ds-ui-shell-content-row-gap: var(--ds-spacing-m, 1rem);
      --ds-ui-shell-padding-block-start: 0;
      --ds-ui-shell-padding-block-end: var(--ds-spacing-xl, 2rem);
      --ds-card-badge-min-height: auto;
      --ds-card-badge-height: 100%;
      --ds-card-badge-padding-inline: var(--ds-spacing-l, 1.5rem);
      --ds-card-badge-padding-block: var(--ds-spacing-2xs, 0.25rem);
      --ds-card-badge-gap: var(--ds-spacing-xs, 0.5rem);
      --ds-card-badge-justify-content: flex-start;
      --ds-text-block-gap: var(--ds-spacing-2xs, 0.25rem);
      --ds-text-block-header-gap: var(--ds-spacing-2xs, 0.25rem);
      --ds-text-block-headings-gap: var(--ds-spacing-2xs, 0.25rem);
      --ds-text-block-heading-font-size: var(--ds-heading-3xs-font-size, 1.25rem);
      --ds-text-block-heading-line-height: var(--ds-heading-3xs-line-height, 1.5rem);
      --ds-text-block-content-font-size: var(--ds-body-s-font-size, 0.875rem);
      --ds-text-block-content-line-height: var(--ds-body-s-line-height, 1.25rem);
    }
  }
`,h=e`
  @media (min-width: ${a(n.md)}) {
    :host([configuration='mobile-only-sign-in-hub']) {
      --ds-carousel-layout-column-gap: var(--ds-carousel-card-grid-desktop-column-gap, 2.25rem);
    }

    /* Pin card flex-basis so 3 fit with the widened gap; set on the slotted wrapper so it doesn't leak up to the full-width layout columns. */
    :host([configuration='mobile-only-sign-in-hub'])
      ::slotted([slot='carousel-card-grid__content']) {
      --ds-layout-column-flex-basis-override: calc(
        (100% - 2 * var(--ds-carousel-card-grid-desktop-column-gap, 2.25rem)) / 3
      );
    }
  }

  @container (min-width: ${a(n.md)}) {
    :host([configuration='mobile-only-sign-in-hub'][base-content]) {
      --ds-carousel-layout-column-gap: var(--ds-carousel-card-grid-desktop-column-gap, 2.25rem);
    }

    /* Pin card flex-basis so 3 fit with the widened gap; set on the slotted wrapper so it doesn't leak up to the full-width layout columns. */
    :host([configuration='mobile-only-sign-in-hub'][base-content])
      ::slotted([slot='carousel-card-grid__content']) {
      --ds-layout-column-flex-basis-override: calc(
        (100% - 2 * var(--ds-carousel-card-grid-desktop-column-gap, 2.25rem)) / 3
      );
    }
  }

  @container (max-width: ${a(l(n.md))}) {
    :host([configuration='mobile-only-sign-in-hub'][base-content]) {
      --ds-carousel-layout-column-gap: var(--ds-spacing-s, 0.75rem);
    }
  }

  @media (max-width: ${a(n.md)}) {
    :host {
      --ds-carousel-item-margin: var(--ds-spacing-1, 0.125rem);
      --ds-carousel-base-margin: calc(-1 * var(--ds-spacing-1, 0.125rem));
      --ds-carousel-item-margin-block-start: var(--ds-carousel-item-margin);
      --ds-carousel-item-margin-inline-start: var(--ds-carousel-item-margin);
      --ds-carousel-item-margin-block-end: var(--ds-carousel-item-margin);
      --ds-carousel-item-margin-inline-end: var(--ds-carousel-item-margin);
      --ds-carousel-base-margin-block-start: var(--ds-carousel-base-margin);
      --ds-carousel-base-margin-inline-start: var(--ds-carousel-base-margin);
      --ds-carousel-base-margin-block-end: var(--ds-carousel-base-margin);
      --ds-carousel-base-margin-inline-end: var(--ds-carousel-base-margin);
      --ds-scrollslider-item-default-height: calc(100% - 2 * var(--ds-spacing-1, 0.125rem));
    }

    :host([configuration='mobile-only-sign-in-hub']) store-container {
      --ds-container-padding-inline-end: 0;
    }
  }
`,p="default",f="two-featured",v="three-featured",y="mobile-only-sign-in-hub",x="stacked",k="vertical",w="horizontal";var _=Object.defineProperty,O=Object.getOwnPropertyDescriptor,A=Object.getPrototypeOf,C=Reflect.get,z=(e,a,s,r)=>{for(var t,o=r>1?void 0:r?O(a,s):a,i=e.length-1;i>=0;i--)(t=e[i])&&(o=(r?t(a,s,o):t(o))||o);return r&&o&&_(a,s,o),o};const j="store-carousel-card-grid";let P=class extends g{constructor(){super(...arguments),this.configuration=p,this.mobileControlsOnly=!1,this._viewportResizeObserver=new d(this,{callback:()=>this._updateConfiguration()})}updated(e){super.updated(e),(e.has("configuration")||e.has("mobileControlsOnly"))&&this._updateConfiguration()}_updateConfiguration(){const e=Array.from(this.querySelectorAll("*")).filter(e=>e.nodeName.toLowerCase()===u);if(this.toggleAttribute("has-full-bleed-carousel",e.some(e=>e.hasAttribute("full-bleed"))),0===e.length)return;const a={[p]:{layout:m.col1evenOverflow,card:w},[f]:{layout:m.col2boxedOverflow,card:k},[v]:{layout:m.col3EvenOverflow,card:k},[y]:{layout:m.col3EvenOverflow,card:k},[x]:{layout:m.col3EvenOverflow,card:k}},{layout:s,card:t}=a[this.configuration]||a[p],o=this.mobileControlsOnly&&this.configuration===y,i=this.baseContent?this.clientWidth>=860:this._viewportResizeObserver.isDesktop(),n=o&&i?m.col3Even:s;e.forEach(e=>{let a=1;e.getAttribute("layout-configuration")!==n&&e.setAttribute("layout-configuration",n),this.mobileControlsOnly?(e.setAttribute("show-controls",""),e.setAttribute("mobile-controls-only","")):(e.removeAttribute("show-controls"),e.removeAttribute("mobile-controls-only")),e.hasAttribute("full-bleed")?(e.style.setProperty("--ds-carousel-base-margin-inline-start","0"),e.style.setProperty("--ds-carousel-base-margin-inline-end","0")):(e.style.removeProperty("--ds-carousel-base-margin-inline-start"),e.style.removeProperty("--ds-carousel-base-margin-inline-end")),e.querySelectorAll("store-card-feature").forEach(e=>{e.setAttribute("configuration",t),this.animationEnter===c.effect2&&r(e,{"animation-enter":c.slideInRight,"animation-view":"scroll","animation-delay":"delay-"+a%4}),a++})})}renderDefaultTemplate(){return t`
      <store-layout
        configuration="${m.col1even}"
        class="carousel-card-grid__layout"
        part="carousel-card-grid__layout"
      >
        <store-layout-column>
          <div part="carousel-card-grid__content" class="carousel-card-grid__content">
            <slot name="carousel-card-grid__content"></slot>
          </div>
        </store-layout-column>
      </store-layout>

      <!-- Default slot used exclusively for the pill bar variant -->
      <store-layout configuration="${m.col1even}">
        <store-layout-column>
          <slot></slot>
        </store-layout-column>
      </store-layout>
    `}_renderBlade(){const e=this.renderDefaultTemplate();return this.baseContent?t` <div>${e}</div> `:t` <store-container> ${e} </store-container> `}render(){return this.renderUiShell(this._renderBlade())}};var $,E,D;P.styles=[...($=P,E=P,D="styles",C(A($),D,E)||[]),b,h],z([s({reflect:!0})],P.prototype,"configuration",2),z([s({type:Boolean,reflect:!0,attribute:"mobile-controls-only"})],P.prototype,"mobileControlsOnly",2),P=z([o(j)],P);export{P as CarouselCardGrid,j as name};
