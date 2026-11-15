import{r as e,x as t,i as d,n as a,e as s,c as r,b as i,y as o,d as l}from"../../tag.const-v1.42.0.js";import{S as g,f as n,j as h,B as b}from"../../secondary-nav-item.const-v1.42.0.js";import{a as m,b as c}from"../../surface.styles-v1.42.0.js";import{n as p,a as v}from"../../util7-v1.42.0.js";const u="center",y="0.5rem",f="var(--ds-surface-border-width, 1px)",x="var(--ds-surface-box-shadow, none)",$="inline-flex",_="2rem",w="2rem",S="center",z="2rem",k="2rem",E="var(--ds-body-m-font-weight, 400)",j="100%",A="inline-flex",B="auto",C="0.25rem",O="var(--ds-theme-foreground-base-strong, #0e1726)",I=d`
  :host {
    display: var(--ds-badge-host-display, inline-flex);
  }

  :host([surface]) {
    --ds-surface-border-radius: var(
      --ds-badge-border-radius,
      var(--ds-radii-s, ${e(y)})
    );

    background: none !important;
    backdrop-filter: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    border-width: 0 !important;
    border-style: none !important;
  }

  .badge {
    --ds-badge-img-width: ${e(j)};
    --ds-badge-img-display: ${e(A)};
    --ds-badge-img-height: ${e(B)};
    --ds-badge-img-radius: var(--ds-radii-xs, ${e(C)});

    display: var(--ds-badge-display, ${e($)});
    justify-content: var(--ds-badge-justify-content, ${e(S)});
    align-items: var(--ds-badge-align-items, ${e(u)});
    box-shadow: var(--ds-badge-box-shadow, ${e(x)});
    width: var(--ds-badge-width, ${e(w)});
    height: var(--ds-badge-height, ${e(_)});
    max-width: var(--ds-badge-max-width, ${e(z)});
    max-height: var(--ds-badge-max-height, ${e(k)});
    padding-block: var(
        --ds-badge-padding-block-start,
        calc(var(--ds-badge-max-height, ${e(_)}) / 4)
      )
      var(
        --ds-badge-padding-block-end,
        calc(var(--ds-badge-max-height, ${e(_)}) / 4)
      );
    padding-inline: var(
        --ds-badge-padding-inline-start,
        calc(var(--ds-badge-max-height, ${e(_)}) / 4)
      )
      var(
        --ds-badge-padding-inline-end,
        calc(var(--ds-badge-max-height, ${e(_)}) / 4)
      );

    background: var(
      --ds-badge-background,
      var(--ds-surface-background, ${e(m.background)})
    );
    border-width: var(--ds-badge-border-width, ${e(f)});
    border-style: var(
      --ds-badge-border-style,
      var(--ds-surface-border-style, ${e(m.borderStyle)})
    );
    border-color: var(
      --ds-badge-border-color,
      var(--ds-surface-border-color, ${e(m.borderColor)})
    );
    border-radius: var(
      --ds-surface-border-radius,
      var(--ds-radii-s, ${e(y)})
    );
    box-sizing: border-box;
  }

  ::slotted(store-icon) {
    --ds-icon-img-border-radius: var(
      --ds-radii-xs,
      ${e(C)}
    );
  }

  ::slotted(img) {
    width: var(--ds-badge-img-width);
    display: var(--ds-badge-img-display);
    height: var(--ds-badge-img-height);
    border-radius: var(--ds-badge-img-radius);
  }

  :host([size='xs']) ::slotted(img) {
    --ds-badge-img-width: 1.063rem;
    --ds-badge-img-height: 1.063rem;
  }

  :host([size='s']) ::slotted(img) {
    --ds-badge-img-width: 1.625rem;
    --ds-badge-img-height: 1.625rem;
  }

  :host([size='m']) ::slotted(img) {
    --ds-badge-img-width: 2.125rem;
    --ds-badge-img-height: 2.125rem;
  }

  :host([size='l']) ::slotted(img) {
    --ds-badge-img-width: 2.625rem;
    --ds-badge-img-height: 2.625rem;
  }

  :host([size='xl']) ::slotted(img) {
    --ds-badge-img-width: 4.25rem;
    --ds-badge-img-height: 4.25rem;
  }

  ::slotted(store-media) {
    --ds-media-asset-border-start-start-radius: var(--ds-radii-xs, 0.25rem);
    --ds-media-asset-border-start-end-radius: var(--ds-radii-xs, 0.25rem);
    --ds-media-asset-border-end-start-radius: var(--ds-radii-xs, 0.25rem);
    --ds-media-asset-border-end-end-radius: var(--ds-radii-xs, 0.25rem);
    --ds-media-asset-overflow: hidden;
  }

  :host([surface='glass']) {
    --ds-badge-background: ${e(c.background)};
    --ds-badge-border-width: ${e(c.borderWidth)};
    --ds-badge-border-style: ${e(c.borderStyle)};
    --ds-badge-border-color: ${e(c.borderColor)};
  }

  :host([shape='oval']) {
    --ds-badge-border-radius: var(--ds-radii-circle);
  }

  :host([shape='oval']) ::slotted(store-media) {
    --ds-media-asset-border-start-start-radius: var(--ds-radii-circle);
    --ds-media-asset-border-start-end-radius: var(--ds-radii-circle);
    --ds-media-asset-border-end-start-radius: var(--ds-radii-circle);
    --ds-media-asset-border-end-end-radius: var(--ds-radii-circle);
  }

  :host([shape='oval']) ::slotted(img) {
    border-radius: var(--ds-radii-circle);
  }

  :host([size='xs']) {
    --ds-badge-bg-color: var(--ds-theme-background-card-normal);
  }

  :host([size='s']) {
    --ds-badge-max-width: 3rem;
    --ds-badge-max-height: 3rem;
    --ds-badge-width: 3rem;
    --ds-badge-height: 3rem;
  }

  :host([size='m']) {
    --ds-badge-max-width: 4rem;
    --ds-badge-max-height: 4rem;
    --ds-badge-width: 4rem;
    --ds-badge-height: 4rem;
  }

  :host([size='l']) {
    --ds-badge-max-width: 5rem;
    --ds-badge-max-height: 5rem;
    --ds-badge-width: 5rem;
    --ds-badge-height: 5rem;
  }

  :host([size='xl']) {
    --ds-badge-max-width: 8rem;
    --ds-badge-max-height: 8rem;
    --ds-badge-width: 8rem;
    --ds-badge-height: 8rem;
  }

  :host([type='media']) {
    --ds-badge-padding-block-start: calc(
      var(--ds-badge-max-height, ${e(_)}) / 8
    );
    --ds-badge-padding-block-end: calc(
      var(--ds-badge-max-height, ${e(_)}) / 8
    );
    --ds-badge-padding-inline-start: calc(
      var(--ds-badge-max-height, ${e(_)}) / 8
    );
    --ds-badge-padding-inline-end: calc(
      var(--ds-badge-max-height, ${e(_)}) / 8
    );
  }

  :host([clickable]) {
    --ds-badge-box-shadow: var(--ds-elevation-level-1);
    cursor: pointer;
  }

  :host([clickable]:hover) {
    --ds-badge-box-shadow: var(--ds-elevation-level-2);
  }

  :host([clickable]:active) {
    --ds-badge-background: var(--ds-theme-background-card-pressed);
    --ds-badge-box-shadow: var(--ds-elevation-level-1);
  }

  :host([type='text']) {
    --ds-badge-max-width: fit-content;
    --ds-badge-width: fit-content;
    color: var(--ds-badge-text-color, ${e(O)});
    font-weight: var(--ds-badge-font-weight, ${e(E)});
  }

  :host([configuration='title']) {
    gap: var(--ds-badge-title-gap, var(--ds-spacing-xs, 0.25rem));
  }

  .content {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .tag {
    display: flex;
    margin-block-start: var(--ds-spacing-2xs, 0.125rem);
    margin-block-end: var(--ds-spacing-2xs, 0.125rem);
  }

  .title {
    font-weight: ${e(t.fontWeight)};
    font-size: ${e(t.fontSize)};
    line-height: ${e(t.lineHeight)};
    letter-spacing: ${e(t.letterSpacing)};
    margin-bottom: ${e(t.marginBottom)};
  }

  .label {
    font-size: var(--ds-body-xs-font-size, 0.75rem);
    line-height: var(--ds-body-xs-line-height, 1rem);
    letter-spacing: var(--ds-body-xs-letter-spacing, 0.033em);
    font-weight: var(--ds-body-xs-font-weight, 400);
    margin: 0;
  }

  .title,
  .label {
    color: var(--ds-badge-text-color, ${e(O)});
  }
`;var L=Object.defineProperty,N=Object.getOwnPropertyDescriptor,M=(e,t,d,a)=>{for(var s,r=a>1?void 0:a?N(t,d):t,i=e.length-1;i>=0;i--)(s=e[i])&&(r=(a?s(t,d,r):s(r))||r);return a&&r&&L(t,d,r),r};const P="store-badge",T=new Map([["default",v.medium],[b.xs,v.medium],[b.sm,v.large],[b.md,v.xlarge],[b.lg,v.x2large],[b.xl,v.x3large]]);let W=class extends g{constructor(){super(...arguments),this._defaultSlotEmpty=!1,this._titleEmpty=!0,this._labelEmpty=!0,this._tagEmpty=!0,this.surface=n.solidBorder}_handleSlotChange(){this._defaultSlotEmpty=0===this._defaultSlot.length,this._titleEmpty=0===this._titleSlot.length,this._labelEmpty=0===this._labelSlot.length,this._tagEmpty=0===this._tagSlot.length,this._defaultSlotEmpty||(this._icon=this._defaultSlot.find(e=>e.nodeName.toLowerCase()===p),this._setIconAttributes(),this._setTypeAttribute(),this._setBadgeAttributes())}_setTypeAttribute(){const e=this._defaultSlot.some(e=>e.nodeName.toLowerCase().includes("span")),t=this._defaultSlot.some(e=>e.nodeName.toLowerCase().includes("media"));e?this.type="text":t?this.type="media":this.removeAttribute("type")}_setIconAttributes(){this._icon&&(!this._icon.hasAttribute("size")||this.size)&&this._icon.setAttribute("size",T.get(this.size||"default"))}_setBadgeAttributes(){this.configuration===h.title&&!this.size&&(this.size=b.md)}updated(e){e.has("size")&&this._icon&&this._setIconAttributes()}_renderOptionalSlot(e,t){return i`
      <div part="${e}" class="${e}" style="${t?"display: none;":""}">
        <slot name="${e}" @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}render(){return i`
      <div
        part="badge"
        class="badge"
        surface="${o(this.configuration===h.title?o(this.surface):void 0)}"
      >
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
      <div
        part="content"
        class="content"
        style="${this._titleEmpty||this.configuration!==h.title?"display: none;":""}"
      >
        ${this._renderOptionalSlot("title",this._titleEmpty)}
        ${this._renderOptionalSlot("label",this._labelEmpty)}
        ${this._renderOptionalSlot("tag",this._tagEmpty)}
      </div>
    `}};W.styles=[I],M([a({reflect:!0})],W.prototype,"configuration",2),M([s({flatten:!0})],W.prototype,"_defaultSlot",2),M([s({slot:"title"})],W.prototype,"_titleSlot",2),M([s({slot:"label"})],W.prototype,"_labelSlot",2),M([s({slot:"tag"})],W.prototype,"_tagSlot",2),M([a({type:Boolean,reflect:!0})],W.prototype,"_defaultSlotEmpty",2),M([r()],W.prototype,"_titleEmpty",2),M([r()],W.prototype,"_labelEmpty",2),M([r()],W.prototype,"_tagEmpty",2),M([r()],W.prototype,"_icon",2),M([a({reflect:!0})],W.prototype,"type",2),M([a({reflect:!0})],W.prototype,"size",2),M([a({reflect:!0})],W.prototype,"surface",2),M([a({reflect:!0})],W.prototype,"shape",2),M([a({type:Boolean,reflect:!0})],W.prototype,"clickable",2),W=M([l(P)],W);export{W as Badge,T as BadgeIconSizeMap,P as name};
