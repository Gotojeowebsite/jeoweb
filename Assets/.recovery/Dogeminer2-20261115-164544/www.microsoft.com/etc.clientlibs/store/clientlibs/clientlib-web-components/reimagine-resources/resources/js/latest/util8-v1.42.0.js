import{r as t,i as o,e as r,c as i,n as e,b as a,d as s}from"./tag.const-v1.42.0.js";import{S as d}from"./secondary-nav-item.const-v1.42.0.js";import{f as n}from"./vfi-v1.42.0.js";const c={alignSelf:"stretch",backgroundColor:"var(--ds-theme-foreground-base-highlight)",width:"0.25rem",height:"auto",display:"inline-block",borderRadius:"initial",border:"none"},l=o`
  :host {
    display: var(--ds-indicator-display, ${t(c.display)});
    background-color: var(
      --ds-indicator-background-color,
      var(--ds-theme-foreground-base-highlight, ${t(c.backgroundColor)})
    );
    background-image: var(--ds-indicator-background-image, none);
    height: var(--ds-indicator-height, ${t(c.height)});
    width: var(--ds-indicator-width, ${t(c.width)});
    border: var(--ds-indicator-border, ${t(c.border)});
    border-radius: var(--ds-indicator-border-radius, ${t(c.borderRadius)});
    flex-shrink: 0;
    align-self: var(--ds-indicator-align-self, ${t(c.alignSelf)});
  }

  @media (forced-colors: active) {
    :host {
      background-color: highlight;
    }
  }

  :host([clickable]) {
    cursor: pointer;

    --ds-indicator-background-color: var(--ds-theme-background-accent-subtle-normal);
  }

  :host([decorative]) {
    --ds-indicator-background-color: var(--ds-theme-background-accent-subtle-normal);
  }

  :host([clickable]:hover) {
    --ds-indicator-background-color: var(--ds-theme-background-accent-subtle-hover);
  }

  :host([clickable]:focus) {
    ${n};
  }

  :host([clickable]:active) {
    --ds-indicator-background-color: var(--ds-theme-background-accent-subtle-pressed);
  }

  :host([clickable][active]),
  :host([decorative][active]) {
    --ds-indicator-background-color: var(--ds-theme-background-accent-subtle-selected);
  }

  :host([configuration='sharp']) {
    --ds-indicator-border-radius: 0;
  }

  :host([configuration='rounded']) {
    --ds-indicator-border-radius: 12.5rem;
  }

  :host([indicator-style='subtle']) {
    --ds-indicator-width: 0.125rem;
  }

  :host([indicator-style='strong']) {
    --ds-indicator-width: 0.5rem;
  }

  :host([orientation='horizontal']) {
    --ds-indicator-height: 0.25rem;
    --ds-indicator-width: var(--ds-indicator-horizontal-width, 1.5rem);
  }

  :host([orientation='horizontal'][indicator-style='subtle']) {
    --ds-indicator-height: 0.125rem;
  }

  :host([orientation='horizontal'][indicator-style='strong']) {
    --ds-indicator-height: 0.5rem;
  }
`;var h=Object.defineProperty,g=Object.getOwnPropertyDescriptor,p=(t,o,r,i)=>{for(var e,a=i>1?void 0:i?g(o,r):o,s=t.length-1;s>=0;s--)(e=t[s])&&(a=(i?e(o,r,a):e(a))||a);return i&&a&&h(o,r,a),a};const b="store-indicator";let u=class extends d{constructor(){super(...arguments),this._firstSlotEmpty=!0,this._lastSlotEmpty=!0,this.clickable=!1,this.active=!1}_handleSlotChange(){this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length}updated(t){super.updated(t),t.has("color")&&(this.color?(this.style.setProperty("--ds-indicator-background-color",this.color),this.style.setProperty("--ds-indicator-background-image","none")):(this.style.removeProperty("--ds-indicator-background-color"),this.style.removeProperty("--ds-indicator-background-image")))}_renderOptionalSlot(t,o){return a`
      <div part=${t} class=${t} style="${o?"display: none;":""}">
        <slot name=${t} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}render(){return a`
      ${this._renderOptionalSlot("indicator__first",this._firstSlotEmpty)}
      <slot></slot>
      ${this._renderOptionalSlot("indicator__last",this._lastSlotEmpty)}
    `}};u.styles=[l],p([r({slot:"indicator__first"})],u.prototype,"_firstSlot",2),p([r({slot:"indicator__last"})],u.prototype,"_lastSlot",2),p([i()],u.prototype,"_firstSlotEmpty",2),p([i()],u.prototype,"_lastSlotEmpty",2),p([e({type:Boolean})],u.prototype,"clickable",2),p([e({type:Boolean})],u.prototype,"active",2),p([e({type:String,reflect:!0})],u.prototype,"configuration",2),p([e({type:String,reflect:!0})],u.prototype,"orientation",2),p([e({type:String,reflect:!0,attribute:"indicator-style"})],u.prototype,"indicatorStyle",2),p([e({type:String,reflect:!0})],u.prototype,"color",2),u=p([s(b)],u);export{u as I,c,b as n};
