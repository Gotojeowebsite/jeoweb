import{r as t,i as s,B as o,b as e,n as i,e as r,c as a,d as n}from"../../../tag.const-v1.42.0.js";import{S as l,o as c}from"../../../secondary-nav-item.const-v1.42.0.js";import{b as d}from"../../../utils-v1.42.0.js";import{c as h}from"../../../vfi-v1.42.0.js";import{s as p}from"../../../tabs.styles-v1.42.0.js";import{v as u}from"../../../tab-compound.viewport.styles-v1.42.0.js";const _="stretch",b="0",m="var(--ds-theme-foreground-base-strong, #0e1726)",v="0",f="inherit",g="inherit",y="100%",S=s`
  :host {
    --ds-tab-item-base-width: 100%;

    display: var(--ds-carousel-indicator-display, ${t("inline-flex")});
    align-items: var(--ds-carousel-indicator-align-items, ${t(_)});
  }

  :host(.hidden) {
    --ds-carousel-indicator-display: none;
  }

  :host::part(tabs__base) {
    margin-block-end: var(
      --ds-carousel-indicator-margin-block-end,
      ${t(g)}
    );
    width: var(--ds-carousel-indicator-width, ${t(y)});
  }

  button {
    ${d};
    background: none;
    padding: 0;
    margin: var(--ds-carousel-indicator-button-margin, ${t(b)});
    width: 100%;
  }

  button:focus {
    outline: 0;
  }

  button:focus ::slotted(*) {
    ${h};
    color: var(--ds-carousel-indicator-focus-color, ${t(m)});
    outline-offset: var(
      --ds-carousel-indicator-outline-offset,
      ${t(v)}
    );
  }

  .carousel-indicator__base {
    line-height: var(--ds-carousel-indicator-line-height, ${t(f)});
  }
`;var $=Object.defineProperty,C=Object.getOwnPropertyDescriptor,j=(t,s,o,e)=>{for(var i,r=e>1?void 0:e?C(s,o):s,a=t.length-1;a>=0;a--)(i=t[a])&&(r=(e?i(s,o,r):i(r))||r);return e&&r&&$(s,o,r),r};const w="store-carousel-indicator";let E=class extends(o(l)){constructor(){super(...arguments),this.active=!1,this.disableClicks=!1,this._firstSlotEmpty=!0,this._lastSlotEmpty=!0}_handleSlotChange(){this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length,this._slot.length>0&&this._slot[0].hasAttribute("configuration")&&this.setAttribute("configuration",this._slot[0].getAttribute("configuration")||"")}_renderOptionalSlot(t,s){return e`
      <div part=${t} class=${t} style="${s?"display: none;":""}">
        <slot name=${t} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}updated(t){this._slot.length>0&&(t.has("active")&&this.active?this._slot[0].setAttribute("active",""):this._slot[0].removeAttribute("active"))}_renderIndicatorContent(){return e`
      ${this._renderOptionalSlot("carousel-indicator__first",this._firstSlotEmpty)}
      <div part="carousel-indicator__base tabs__base" class="carousel-indicator__base">
        <slot @slotchange="${this._handleSlotChange}"></slot>
      </div>
      ${this._renderOptionalSlot("carousel-indicator__last",this._lastSlotEmpty)}
    `}render(){return this.disableClicks?this._renderIndicatorContent():this.renderButton(this._renderIndicatorContent())}};E.shadowRootOptions={...l.shadowRootOptions,delegatesFocus:!0},E.styles=[p,u,S],j([i({type:Boolean,reflect:!0})],E.prototype,"active",2),j([i({type:Boolean,reflect:!0,attribute:"disable-clicks"})],E.prototype,"disableClicks",2),j([r({slot:"carousel-indicator__first"})],E.prototype,"_firstSlot",2),j([r({slot:"carousel-indicator__last"})],E.prototype,"_lastSlot",2),j([c()],E.prototype,"_slot",2),j([a()],E.prototype,"_firstSlotEmpty",2),j([a()],E.prototype,"_lastSlotEmpty",2),E=j([n(w)],E);export{E as CarouselIndicator,w as name};
