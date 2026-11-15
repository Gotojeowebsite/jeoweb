import{r as t,w as i,a7 as e,Q as o,i as s,e as l,c as r,n,b as a,D as m,d}from"../../tag.const-v1.42.0.js";import{W as p}from"../../i18nMixin-v1.42.0.js";import"../divider/index-v1.42.0.js";import"../../util7-v1.42.0.js";const _="initial",h="var(--ds-theme-foreground-base-strong, #0e1726)",g="0",v="flex",y="1",b="column",S="var(--ds-spacing-2xs, 0.25rem)",c="1rem",$="1rem",f="0",u="0",w="var(--ds-spacing-xs, 0.50rem)",x="flex",E="center",D=s`
  :host {
    display: var(--ds-list-item-display, ${t("block")});
    width: var(--ds-list-item-width, ${t(_)});
  }

  :host .list-item__inner {
    align-items: var(
      --ds-list-item-inner-align-items,
      ${t(E)}
    );
    column-gap: var(
      --ds-list-item-inner-column-gap,
      ${t(w)}
    );
    display: var(--ds-list-item-inner-display, ${t(x)});
    padding-block-start: var(
      --ds-list-item-inner-padding-block-start,
      ${t(c)}
    );
    padding-block-end: var(
      --ds-list-item-inner-padding-block-end,
      ${t($)}
    );
    padding-inline-start: var(
      --ds-list-item-inner-padding-inline-start,
      ${t(f)}
    );
    padding-inline-end: var(
      --ds-list-item-inner-padding-inline-end,
      ${t(u)}
    );
  }

  :host .list-item__content {
    display: var(
      --ds-list-item-content-display,
      ${t(v)}
    );
    flex-grow: var(
      --ds-list-item-content-flex-grow,
      ${t(y)}
    );
    flex-direction: var(
      --ds-list-item-content-flex-direction,
      ${t(b)}
    );
    row-gap: var(
      --ds-list-item-content-row-gap,
      ${t(S)}
    );
  }

  :host .list-item__trailing {
    display: var(
      --ds-list-item-trailing-display,
      ${t("initial")}
    );
  }

  ::slotted([slot='list-item__eyebrow']) {
    font-size: var(
      --ds-list-item-eyebrow-font-size,
      ${t(i.fontSize)}
    ) !important;
    font-weight: var(
      --ds-list-item-eyebrow-font-weight,
      ${t(i.fontWeight)}
    ) !important;
    line-height: var(
      --ds-list-item-eyebrow-line-height,
      ${t(i.lineHeight)}
    ) !important;
    color: var(
      --ds-list-item-eyebrow-color,
      ${t("var(--ds-theme-foreground-base-highlight, #005597)")}
    ) !important;
    margin-bottom: var(
      --ds-list-item-eyebrow-margin-bottom,
      ${t(i.marginBottom)}
    ) !important;
  }

  ::slotted([slot='list-item__leading']) {
    color: var(
      --ds-list-item-leading-color,
      ${t(h)}
    ) !important;
    margin-bottom: var(
      --ds-list-item-leading-margin-bottom,
      ${t(g)}
    );
  }

  ::slotted([slot='list-item__title']) {
    font-size: var(
      --ds-list-item-title-font-size,
      ${t(e.fontSize)}
    ) !important;
    font-weight: var(
      --ds-list-item-title-font-weight,
      ${t(e.fontWeight)}
    ) !important;
    line-height: var(
      --ds-list-item-title-line-height,
      ${t(e.lineHeight)}
    ) !important;
    color: var(
      --ds-list-item-title-color,
      ${t("var(--ds-theme-foreground-base-strong, #0e1726)")}
    ) !important;
    margin-bottom: var(
      --ds-list-item-title-margin-bottom,
      ${t(e.marginBottom)}
    ) !important;
  }

  ::slotted([slot='list-item__subtext']) {
    font-size: var(
      --ds-list-item-subtext-font-size,
      ${t(o.fontSize)}
    ) !important;
    font-weight: var(
      --ds-list-item-subtext-font-weight,
      ${t(o.fontWeight)}
    ) !important;
    line-height: var(
      --ds-list-item-subtext-line-height,
      ${t(o.lineHeight)}
    ) !important;
    color: var(
      --ds-list-item-subtext-color,
      ${t("var(--ds-theme-foreground-base-subtle, #17253d)")}
    ) !important;
    margin-bottom: var(
      --ds-list-item-subtext-margin-bottom,
      ${t(o.marginBottom)}
    ) !important;
  }
`;var z=Object.defineProperty,O=Object.getOwnPropertyDescriptor,B=(t,i,e,o)=>{for(var s,l=o>1?void 0:o?O(i,e):i,r=t.length-1;r>=0;r--)(s=t[r])&&(l=(o?s(i,e,l):s(l))||l);return o&&l&&z(i,e,l),l};const j="store-list-item";let k=class extends p{constructor(){super(...arguments),this._firstSlotEmpty=!0,this._lastSlotEmpty=!0,this._leadingSlotEmpty=!0,this._eyebrowSlotEmpty=!0,this._titleSlotEmpty=!0,this._subtextSlotEmpty=!0,this.topDivider=!1,this.bottomDivider=!1,this.trailing=!1}_handleSlotChange(){this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length,this._leadingSlotEmpty=0===this._leadingSlot.length,this._eyebrowSlotEmpty=0===this._eyebrowSlot.length,this._titleSlotEmpty=0===this._titleSlot.length,this._subtextSlotEmpty=0===this._subtextSlot.length}_renderOptionalSlot(t,i){return a`
      <div part=${t} class=${t} style="${i?"display: none;":""}">
        <slot name=${t} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}_renderTopDividerSlot(){return this.topDivider?a`<slot name="list-item__top-divider"><store-divider></store-divider></slot>`:m}_renderBottomDividerSlot(){return this.bottomDivider?a`<slot name="list-item__bottom-divider"><store-divider></store-divider></slot>`:m}_renderTrailingSlot(){return a`
      <div
        part="list-item__trailing"
        class="list-item__trailing"
        style="${this.trailing?"":"display: none;"}"
      >
        <slot name="list-item__trailing">
          <store-icon
            icon="chevron-${"rtl"===this.dir?"left":"right"}"
            size="medium"
          ></store-icon>
        </slot>
      </div>
    `}render(){return a`
      ${this._renderTopDividerSlot()}
      <div part="list-item__inner" class="list-item__inner">
        ${this._renderOptionalSlot("list-item__first",this._firstSlotEmpty)}
        ${this._renderOptionalSlot("list-item__leading",this._leadingSlotEmpty)}
        <div part="list-item__content" class="list-item__content">
          ${this._renderOptionalSlot("list-item__eyebrow",this._eyebrowSlotEmpty)}
          ${this._renderOptionalSlot("list-item__title",this._titleSlotEmpty)}
          ${this._renderOptionalSlot("list-item__subtext",this._subtextSlotEmpty)}
        </div>
        ${this._renderTrailingSlot()}
        ${this._renderOptionalSlot("list-item__last",this._lastSlotEmpty)}
      </div>
      ${this._renderBottomDividerSlot()}
    `}};k.styles=[D],B([l({slot:"list-item__first"})],k.prototype,"_firstSlot",2),B([l({slot:"list-item__last"})],k.prototype,"_lastSlot",2),B([l({slot:"list-item__leading"})],k.prototype,"_leadingSlot",2),B([l({slot:"list-item__eyebrow"})],k.prototype,"_eyebrowSlot",2),B([l({slot:"list-item__title"})],k.prototype,"_titleSlot",2),B([l({slot:"list-item__subtext"})],k.prototype,"_subtextSlot",2),B([r()],k.prototype,"_firstSlotEmpty",2),B([r()],k.prototype,"_lastSlotEmpty",2),B([r()],k.prototype,"_leadingSlotEmpty",2),B([r()],k.prototype,"_eyebrowSlotEmpty",2),B([r()],k.prototype,"_titleSlotEmpty",2),B([r()],k.prototype,"_subtextSlotEmpty",2),B([n({type:Boolean,reflect:!0,attribute:"top-divider"})],k.prototype,"topDivider",2),B([n({type:Boolean,reflect:!0,attribute:"bottom-divider"})],k.prototype,"bottomDivider",2),B([n({type:Boolean,reflect:!0,attribute:"trailing"})],k.prototype,"trailing",2),k=B([d(j)],k);export{k as ListItem,j as name};
