import{r as t,i as e,n as a,e as o,c as i,b as n,ao as s,a4 as r,y as d,D as c,d as l}from"../../../tag.const-v1.42.0.js";import{k as m}from"../../../vfi-v1.42.0.js";import{h as v}from"../../../secondary-nav-item.const-v1.42.0.js";import{SurfaceElement as h}from"../../../base/elements/surface-element/index-v1.42.0.js";import{S as p}from"../../../pagination-item.const-v1.42.0.js";import{b as y}from"../../../util10-v1.42.0.js";import{name as u}from"../../badge/index-v1.42.0.js";import"../../divider/index-v1.42.0.js";import{n as g}from"../../../util7-v1.42.0.js";import"../../../util8-v1.42.0.js";import{name as f}from"../../media/index-v1.42.0.js";const b="var(--ds-theme-foreground-base-strong, #0e1726)",_="flex",k="var(--ds-spacing-sm, .75rem)",S="var(--ds-spacing-2xs, 0.25rem)",$="var(--ds-body-m-letter-spacing, -0.03em)",w="var(--ds-spacing-m, 1rem)",x="var(--ds-body-xs-font-size, 0.75rem)",I="var(--ds-radii-s, 0.5rem)",z="var(--ds-theme-background-accent-subtle-hover, rgba(0, 85, 151, 0.4))",N="var(--ds-theme-background-accent-subtle-pressed, #54a5e2)",E="var(--ds-elevation-level-2, 0px 2px 4px rgba(0, 0, 0, 0.14) 0px 0px 2px rgba(0, 0, 0, 0.12))",j="var(--ds-spacing-xs, 0.5rem)",A="0.375rem",C="var(--ds-radii-s, 0.5rem)",M="var(--ds-spacing-2xs, 0.25rem)",q="var(--ds-spacing-xs, 0.5rem)",L="var(--ds-spacing-2xs, .25rem)",D="var(--ds-spacing-xs, .5rem)",O="var(--ds-spacing-s, .75rem)",Q="var(--ds-spacing-3xs, .125rem)",T="var(--ds-radii-s, 0.5rem)",B="fit-content",P="var(--ds-radii-s, 0.5rem)",H="var(--ds-spacing-xs, 0.5rem)",J="var(--ds-radii-xs, 0.25rem)",F="var(--ds-radii-xs, 0.25rem)",U="2rem",G="2rem",K="initial",R=e`
  :host {
    --ds-badge-host-display: inline;

    position: relative;
    display: var(--ds-secondary-nav-item-display, ${t("block")});
    width: fit-content;
    list-style: none;
    white-space: var(--ds-secondary-nav-item-white-space, ${t(K)});
  }

  :host,
  :host a {
    border-radius: var(
      --ds-secondary-nav-item-border-radius,
      ${t(I)}
    );
  }

  /** Navigation (variant) */
  :host a {
    text-decoration: none;
    display: var(--ds-secondary-nav-item-link-display, ${t(_)});
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-block: var(
      --ds-secondary-nav-item-padding-block,
      ${t(k)}
    );
    color: var(--ds-secondary-nav-item-label-color, ${t(b)});
  }

  :host([configuration='navigation']) {
    --ds-secondary-nav-item-white-space: nowrap;
    padding-block: var(
      --ds-secondary-nav-item-navigation-padding-block,
      ${t(A)}
    );
  }

  :host([configuration='navigation']) ::slotted([slot='secondary-nav-item__description']),
  :host([configuration='dropdown']) ::slotted([slot='secondary-nav-item__description']) {
    display: none;
  }

  a:focus-visible {
    ${m()};

    border-radius: 0;
  }

  :host(:not([active])) store-indicator {
    display: none;
  }

  :host store-icon {
    display: var(--ds-secondary-nav-icon, none);
  }

  :host([active]) store-indicator {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: block;
  }

  /** Jumplink (horizontal) */
  :host([configuration='horizontal']) {
    --ds-secondary-nav-item-link-flex-direction: row;
    --ds-secondary-nav-item-body-align-items: start;
    --ds-secondary-nav-item-jumplink-padding-block: 0.5rem;
    --ds-secondary-nav-item-padding-inline: 0.5rem 1.5rem;
    --ds-secondary-nav-item-badge-margin-block-end: 0;
    --ds-secondary-nav-item-body-margin-block: 0.3125rem;
    --ds-secondary-nav-item-body-margin-inline: 1rem 0.5rem;
    --ds-secondary-nav-item-description-text-align: start;
    --ds-secondary-nav-jumplinks-gap: 0.5rem;
    --ds-surface-border-radius: var(
      --ds-secondary-nav-item-jumplink-border-radius,
      ${t(P)}
    );

    width: 100%;
  }

  /** Jumplink (vertical) */
  :host([configuration='vertical']) {
    --ds-surface-border-radius: var(
      --ds-secondary-nav-item-jumplink-border-radius,
      ${t(T)}
    );

    min-width: var(--ds-secondary-nav-item-jumplink-width, 7.75rem);
    height: var(
      --ds-secondary-nav-item-jumplink-vertical-height,
      ${t(B)}
    );
  }

  :host([configuration='horizontal']) a,
  :host([configuration='vertical']) a {
    --ds-secondary-nav-item-padding-block: var(
      --ds-secondary-nav-item-jumplink-padding-block,
      1.5rem
    );
    display: var(--ds-secondary-nav-item-jumplink-display, flex);
    box-shadow: var(
      --ds-secondary-nav-item-jumplink-box-shadow,
      ${t(E)}
    );
    padding-inline: var(
      --ds-secondary-nav-item-padding-inline,
      ${t(H)}
    );
    flex-direction: var(--ds-secondary-nav-item-link-flex-direction, column);
    border-radius: var(
      --ds-secondary-nav-item-link-border-radius,
      ${t(I)}
    );
  }

  :host([active][configuration='horizontal']) store-indicator,
  :host([active][configuration='vertical']) store-indicator {
    border-end-end-radius: var(
      --ds-secondary-nav-indicator-border-bottom-right-radius,
      ${t(J)}
    );
    border-end-start-radius: var(
      --ds-secondary-nav-indicator-border-bottom-left-radius,
      ${t(F)}
    );
  }

  :host([configuration='horizontal']) a:hover,
  :host([configuration='vertical']) a:hover {
    --ds-secondary-nav-item-jumplink-box-shadow: var(
      --ds-elevation-level-3,
      0px 4px 8px rgba(0, 0, 0, 0.14) 0px 0px 2px rgba(0, 0, 0, 0.12)
    );

    background-color: var(--ds-theme-background-card-pressed, #17253d);
  }

  :host([configuration='horizontal']:active) a,
  :host([configuration='vertical']:active) a {
    background-color: var(--ds-theme-background-neutral-color, #1e304f);
  }

  :host([configuration='horizontal'][active]) a,
  :host([configuration='vertical'][active]) a,
  :host([configuration='quicklink'][disabled]) {
    background-color: var(--ds-theme-background-card-selected, #fefefe);
  }

  :host([configuration='horizontal'][disabled]),
  :host([configuration='vertical'][disabled]),
  :host([configuration='quicklink'][disabled]) {
    opacity: 0.2;
    pointer-events: none;
    cursor: not-allowed;
  }

  :host([configuration='horizontal'][disabled]) a:focus-visible,
  :host([configuration='vertical'][disabled]) a:focus-visible {
    outline: none;
  }

  :host([configuration='dropdown']) {
    --ds-surface-border-radius: var(
      --ds-secondary-nav-item-dropdown-border-radius,
      ${t(C)}
    );

    width: auto;
    margin-block: var(
      --ds-secondary-nav-item-dropdown-margin-block,
      ${t(L)}
    );
  }

  :host([configuration='dropdown']) a {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    width: auto;
    height: auto;
    padding-inline: var(
      --ds-secondary-nav-item-dropdown-padding-inline,
      ${t(O)}
    );
    padding-block: var(
      --ds-secondary-nav-item-dropdown-padding-inline,
      ${t(D)}
    );
  }

  :host([configuration='dropdown']) store-indicator {
    position: relative;
    visibility: hidden;
    display: block;
    width: var(
      --ds-secondary-nav-item-dropdown-indicator-width,
      ${t(M)}
    );
  }

  :host([configuration='dropdown']) a:active {
    background-color: var(
      --ds-secondary-nav-item-dropdown-active-background-color,
      ${t(N)}
    ) !important;
  }

  :host([configuration='dropdown'][active]) a,
  :host([configuration='dropdown']) a:focus-visible,
  :host([configuration='dropdown']) a:hover {
    background-color: var(
      --ds-secondary-nav-item-dropdown-hover-background-color,
      ${t(z)}
    );
    border-radius: var(
      --ds-secondary-nav-item-dropdown-focus-border-radius,
      ${t(C)}
    );
  }

  :host([configuration='dropdown'][active]) store-indicator,
  :host([configuration='dropdown']) a:focus-visible store-indicator,
  :host([configuration='dropdown']) a:hover store-indicator {
    visibility: visible;
  }

  :host([configuration='dropdown']) .secondary-nav-item__label {
    padding-inline-start: var(
      --ds-secondary-nav-item-dropdown-label-padding-inline-start,
      ${t(q)}
    );
  }

  :host([configuration='horizontal']) store-icon,
  :host([configuration='vertical']) store-icon {
    display: flex;
  }

  /* Badge */
  :host([configuration='horizontal']) store-badge,
  :host([configuration='vertical']) store-badge {
    --ds-secondary-nav-item-badge-display: flex;

    margin-block-end: var(
      --ds-secondary-nav-item-badge-margin-block-end,
      ${t(w)}
    );
  }

  /* Badge icon */
  :host([configuration='horizontal']) store-badge store-icon,
  :host([configuration='vertical']) store-badge store-icon {
    margin-block-start: 0;
    margin-inline-start: 0;
  }

  :host([configuration='vertical']) store-icon {
    margin-block-start: var(
      --ds-secondary-nav-item-padding-block-start,
      ${t(j)}
    );
  }

  :host([configuration='horizontal']) store-icon {
    margin-inline-start: auto;
  }

  :host([configuration='horizontal']) .secondary-nav-item__label,
  :host([configuration='vertical']) .secondary-nav-item__label {
    line-height: 1;
  }

  :host([configuration='horizontal']) a:focus-visible,
  :host([configuration='vertical']) a:focus-visible {
    outline-offset: var(
      --ds-secondary-nav-item-jumplink-outline-offset,
      ${t(Q)}
    );
  }

  :host ::slotted([slot='secondary-nav-item__description']) {
    text-align: var(--ds-secondary-nav-item-description-text-align, center);
    margin-block: var(
      --ds-secondary-nav-item-description-margin-block,
      ${t(S)}
    );
    font-size: var(
      --ds-secondary-nav-item-description-font-size,
      ${t(x)}
    );
    color: var(--ds-theme-foreground-base-subtle, #0e1726);
    font-weight: var(--ds-body-xs-font-weight, 400);
    line-height: var(--ds-body-xs-line-height, 1rem);
    letter-spacing: var(
      --ds-secondary-nav-item-description-letter-spacing,
      ${t($)}
    );
  }

  .secondary-nav-item__body {
    display: flex;
    flex-direction: column;
    align-items: var(--ds-secondary-nav-item-body-align-items, center);
    font-weight: var(--ds-label-m-font-weight, 600);
    font-size: var(--ds-label-m-font-size, 0.875rem);
    line-height: var(--ds-label-m-line-height, 1.25rem);
    margin-inline: var(--ds-secondary-nav-item-body-margin-inline, 0);
    margin-block: var(--ds-secondary-nav-item-body-margin-block, 0);
  }

  :host ::slotted([slot='secondary-nav-item__asset']) {
    min-width: var(
      --ds-secondary-nav-item-quicklink-width,
      ${t(U)}
    );
    height: var(
      --ds-secondary-nav-item-quicklink-height,
      ${t(G)}
    );
    width: var(
      --ds-secondary-nav-item-quicklink-width,
      ${t(U)}
    );
    min-height: var(
      --ds-secondary-nav-item-quicklink-height,
      ${t(G)}
    );
  }

  @media (forced-colors: active) {
    :host([configuration='quicklink']) {
      --ds-secondary-nav-item-label-color: LinkText;
    }

    :host([configuration='quicklink']) .secondary-nav-item__asset,
    :host([configuration='quicklink'])
      ::slotted(.secondary-nav-item__asset-mask[slot='secondary-nav-item__asset']) {
      color: CanvasText;
    }

    :host([configuration='quicklink'])
      ::slotted(.secondary-nav-item__asset-mask[slot='secondary-nav-item__asset']) {
      display: none;
    }

    :host([configuration='quicklink'][has-asset-image-mask])
      ::slotted(:not(.secondary-nav-item__asset-mask)[slot='secondary-nav-item__asset']) {
      display: none;
    }

    :host([configuration='quicklink'][has-asset-image-mask])
      ::slotted(.secondary-nav-item__asset-mask[slot='secondary-nav-item__asset']) {
      display: inline-block;
      inline-size: var(
        --ds-secondary-nav-item-quicklink-width,
        ${t(U)}
      );
      block-size: var(
        --ds-secondary-nav-item-quicklink-height,
        ${t(G)}
      );
      background-color: CanvasText;
      /* stylelint-disable property-no-vendor-prefix */
      -webkit-mask-image: var(--ds-secondary-nav-item-asset-mask-url);
      mask-image: var(--ds-secondary-nav-item-asset-mask-url);
      -webkit-mask-position: center;
      mask-position: center;
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-size: contain;
      mask-size: contain;
      /* stylelint-enable property-no-vendor-prefix */
      vertical-align: middle;
    }
  }
`;var V=Object.defineProperty,W=Object.getOwnPropertyDescriptor,X=(t,e,a,o)=>{for(var i,n=o>1?void 0:o?W(e,a):e,s=t.length-1;s>=0;s--)(i=t[s])&&(n=(o?i(e,a,n):i(n))||n);return o&&n&&V(e,a,n),n};const Y="store-secondary-nav-item",Z="has-asset-image-mask",tt="--ds-secondary-nav-item-asset-mask-url",et="secondary-nav-item__asset-mask";let at=class extends h{constructor(){super(...arguments),this.active=!1,this.disabled=!1,this.href="",this.ariaLabel=null,this.icon="",this._firstSecondaryNavItemSlotEmpty=!0,this._lastSecondaryNavItemSlotEmpty=!0,this._secondaryNavItemDescriptionSlotEmpty=!0,this._assetSlotEmpty=!0,this._handleForcedColorsChange=()=>{this._syncAssetImageMaskState()}}_clearAssetImageMaskState(){this.querySelectorAll(`.${et}[slot='secondary-nav-item__asset']`).forEach(t=>{t.remove()}),this.removeAttribute(Z),this.style.removeProperty(tt)}_getAssetImageNode(){for(const t of this._assetSlot){if(t instanceof HTMLImageElement&&"secondary-nav-item__asset"===t.slot&&!t.classList.contains(et))return t;if(t instanceof HTMLElement&&!t.classList.contains(et)){const e=t.querySelector("img");if(e instanceof HTMLImageElement)return e}}}_ensureAssetImageMaskElement(){const t=this.querySelector(`.${et}[slot='secondary-nav-item__asset']`);if(t instanceof HTMLSpanElement)return t;const e=this._getAssetImageNode();if(!e)return;const a=document.createElement("span");return a.className=et,a.slot="secondary-nav-item__asset",a.setAttribute("aria-hidden","true"),e.parentElement===this?(e.after(a),a):(this.append(a),a)}_syncAssetImageMaskState(){var t;if(this.configuration!==v.quicklink||this._assetSlotEmpty||null==(t=this._forcedColorsMediaQuery)||!t.matches)return void this._clearAssetImageMaskState();const e=this._getAssetImageNode(),a=(null==e?void 0:e.currentSrc)||(null==e?void 0:e.src)||(null==e?void 0:e.getAttribute("src"))||void 0;if(!a)return void this._clearAssetImageMaskState();const o=this._ensureAssetImageMaskElement();o?(this.setAttribute(Z,""),this.style.setProperty(tt,`url(${JSON.stringify(a)})`),o.style.setProperty(tt,`url(${JSON.stringify(a)})`)):this._clearAssetImageMaskState()}_handleSecondaryNavItemSlotChange(){this._firstSecondaryNavItemSlotEmpty=0===this._firstSecondaryNavItemSlot.length,this._lastSecondaryNavItemSlotEmpty=0===this._lastSecondaryNavItemSlot.length,this._secondaryNavItemDescriptionSlotEmpty=0===this._secondaryNavItemDescriptionSlot.length,this._assetSlotEmpty=0===this._assetSlot.length,this._assetSlotEmpty||this._updateAssetsSlotAttributes(),this._syncAssetImageMaskState()}_updateAssetsSlotAttributes(){const t={[f]:{attr:"aspect-ratio",value:"1-1"},[g]:{attr:"size",value:"xlarge"},[u]:{attr:"size",value:"xs"}};this._assetSlot.forEach(e=>{const a=e.nodeName.toLowerCase(),o=t[a];if(o){const t=e;t.hasAttribute(o.attr)||t.setAttribute(o.attr,o.value)}})}_renderOptionalSlot(t,e){return n`
      <div part=${t} class=${t} style="${e?"display: none;":""}">
        <slot name=${t} @slotchange="${this._handleSecondaryNavItemSlotChange}"></slot>
      </div>
    `}_renderDropdownIndicator(){if(this.configuration===v.dropdown)return n`
        <store-indicator
          orientation=${s.vertical}
          configuration=${r.rounded}
        ></store-indicator>
      `}_renderBadge(){if(this.configuration===v.horizontal||this.configuration===v.vertical)return n` <store-badge>
        <store-icon icon=${d(this.icon)} aria-hidden="true" role="presentation">
        </store-icon>
      </store-badge>`}_renderIndicator(){return this.configuration===v.horizontal||this.configuration===v.vertical?n`<store-indicator
        orientation=${s.horizontal}
      ></store-indicator>`:this.configuration===v.navigation?n`
        <store-indicator
          orientation=${s.horizontal}
          configuration=${r.rounded}
        ></store-indicator>
      `:void 0}_renderIcon(){if(this.configuration===v.horizontal||this.configuration===v.vertical)return n`<store-icon icon="arrow-down" size="medium"></store-icon>`}_renderQuicklink(){return n` <store-link
      class="secondary-nav-item__link"
      part="secondary-nav-item__link"
      configuration="${y.stacked}"
      text-size=${d(this.textSize)}
      href=${d(this.href)}
      aria-label=${d(d(this.ariaLabel))}
      aria-disabled=${d(this.disabled?"true":void 0)}
    >
      <span slot="link__asset" class="secondary-nav-item__asset" part="secondary-nav-item__asset">
        <slot
          name="secondary-nav-item__asset"
          @slotchange="${this._handleSecondaryNavItemSlotChange}"
        ></slot>
      </span>
      <span slot="link__text" class="secondary-nav-item__label" part="secondary-nav-item__label">
        <slot @slotchange="${this._handleSecondaryNavItemSlotChange}"></slot>
      </span>
    </store-link>`}firstUpdated(){this._syncAssetImageMaskState()}render(){return this.configuration===v.quicklink?this._renderQuicklink():n`
      ${this._renderOptionalSlot("secondary-nav-item__first",this._firstSecondaryNavItemSlotEmpty)}
      <a
        href=${d(this.href)}
        class="secondary-nav-item__link"
        part="secondary-nav-item__link"
        aria-current=${this.active?"true":c}
      >
        ${this._renderDropdownIndicator()} ${this.icon&&this._renderBadge()}
        <span class="secondary-nav-item__body" part="secondary-nav-item__body">
          <span class="secondary-nav-item__label" part="secondary-nav-item__label">
            <slot></slot>
          </span>
          ${this._renderOptionalSlot("secondary-nav-item__description",this._secondaryNavItemDescriptionSlotEmpty)}
        </span>
        ${this._renderIcon()}
      </a>
      ${this._renderOptionalSlot("secondary-nav-item__last",this._lastSecondaryNavItemSlotEmpty)}
      ${this._renderIndicator()}
    `}connectedCallback(){super.connectedCallback(),typeof window<"u"&&"function"==typeof window.matchMedia&&(this._forcedColorsMediaQuery=window.matchMedia("(forced-colors: active)"),this._forcedColorsMediaQuery.addEventListener("change",this._handleForcedColorsChange)),this.configuration===v.quicklink||this.configuration===v.navigation?this.surface=p.transparent:this.surface=p.solid}disconnectedCallback(){var t;null==(t=this._forcedColorsMediaQuery)||t.removeEventListener("change",this._handleForcedColorsChange),this._forcedColorsMediaQuery=void 0,this._clearAssetImageMaskState(),super.disconnectedCallback()}};at.styles=[R],X([a({reflect:!0,type:Boolean})],at.prototype,"active",2),X([a({reflect:!0})],at.prototype,"configuration",2),X([a({reflect:!0,type:Boolean})],at.prototype,"disabled",2),X([a({reflect:!0})],at.prototype,"href",2),X([a({attribute:"aria-label"})],at.prototype,"ariaLabel",2),X([a({reflect:!0})],at.prototype,"icon",2),X([a({reflect:!0})],at.prototype,"theme",2),X([a({type:String,reflect:!0,attribute:"text-size"})],at.prototype,"textSize",2),X([o({slot:"secondary-nav-item__first"})],at.prototype,"_firstSecondaryNavItemSlot",2),X([o({slot:"secondary-nav-item__last"})],at.prototype,"_lastSecondaryNavItemSlot",2),X([o({slot:"secondary-nav-item__description"})],at.prototype,"_secondaryNavItemDescriptionSlot",2),X([o({slot:"secondary-nav-item__asset"})],at.prototype,"_assetSlot",2),X([i()],at.prototype,"_firstSecondaryNavItemSlotEmpty",2),X([i()],at.prototype,"_lastSecondaryNavItemSlotEmpty",2),X([i()],at.prototype,"_secondaryNavItemDescriptionSlotEmpty",2),X([i()],at.prototype,"_assetSlotEmpty",2),at=X([l(Y)],at);export{at as SecondaryNavItem,Y as name};
