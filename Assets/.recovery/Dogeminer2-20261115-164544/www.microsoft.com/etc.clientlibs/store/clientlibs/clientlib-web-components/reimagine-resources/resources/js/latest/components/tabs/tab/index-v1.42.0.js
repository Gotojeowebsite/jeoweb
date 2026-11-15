import{r as t,i as e,n as a,e as s,c as i,b as l,d as o}from"../../../tag.const-v1.42.0.js";import{o as r,S as n}from"../../../secondary-nav-item.const-v1.42.0.js";import{f as b,g as d}from"../../../vfi-v1.42.0.js";import{n as h}from"../../../util18-v1.42.0.js";import{name as p}from"../../pill/index-v1.42.0.js";const c="0",_="0",m="var(--ds-theme-foreground-base-strong)",g="1",u="pointer",v="auto",f="normal",y=e`
  :host {
    color: var(--ds-tab-color, ${t("var(--ds-theme-foreground-base-strong, #0e1726)")});
    display: var(--ds-tab-display, inline-flex);
    align-items: var(--ds-tab-align-items, center);
    justify-content: var(--ds-tab-justify-content, center);
    cursor: var(--ds-tab-cursor, ${t(u)});
    width: var(--ds-tab-width, 100%);
    max-width: var(--ds-tab-max-width, 100%);
    margin-inline: var(--ds-tab-margin-inline, ${t(c)});
    margin-block: var(--ds-tab-margin-block, ${t(_)});
    opacity: var(--ds-tab-opacity, ${t(g)});
    pointer-events: var(--ds-tab-pointer-events, ${t(v)});
    white-space: var(--ds-tab-white-space, ${t(f)});
  }

  /* Disabled state styles */
  :host([disabled]) {
    --ds-tab-opacity: 0.2;
    pointer-events: none;
    cursor: not-allowed;
  }

  :host(:focus) {
    ${b};
  }

  :host([delegate-outline]:focus) {
    outline: none !important;
  }

  :host([delegate-outline]:focus) .tab__base ::slotted(*) {
    ${d};
    outline-color: var(--ds-tab-vfi-outline, ${t(m)}) !important;
  }

  :host([delegate-outline]:focus) .tab__base ::slotted(store-pill[active]) {
    ${d};
    --ds-tab-vfi-outline: var(--ds-theme-foreground-accent-subtle, #fff) !important;
  }

  :host([delegate-outline]:focus) .tab__base ::slotted(store-pill) {
    ${d};
    --ds-tab-vfi-outline: var(--ds-theme-foreground-accent-subtle-normal, #2a446f) !important;
  }

  :host::part(tab__base) {
    display: var(--ds-tab-base-display, initial);
    height: var(--ds-tab-base-height, initial);
  }
`;var S=Object.defineProperty,A=Object.getOwnPropertyDescriptor,$=(t,e,a,s)=>{for(var i,l=s>1?void 0:s?A(e,a):e,o=t.length-1;o>=0;o--)(i=t[o])&&(l=(s?i(e,a,l):i(l))||l);return s&&l&&S(e,a,l),l};const w="store-tab";let I=0,E=class extends n{constructor(){super(...arguments),this._componentId=++I,this._panelIdFallback=`tab${this._componentId}`,this._componentIdFallback=`${this._panelIdFallback}-tab`,this.active=!1,this.disabled=!1,this.delegateOutline=!1,this.tabPanelId=null,this._firstSlotEmpty=!0,this._lastSlotEmpty=!0,this._baseSlotEmpty=!0}_getAccessibleName(){var t,e;return(null==(e=null==(t=this._baseSlot[0])?void 0:t.textContent)?void 0:e.trim())||""}_syncAccessibleName(){if(this.hasAttribute("aria-labelledby"))return void(this._generatedAriaLabel&&this.getAttribute("aria-label")===this._generatedAriaLabel&&(this.removeAttribute("aria-label"),this._generatedAriaLabel=void 0));const t=this.getAttribute("aria-label");if(t&&t!==this._generatedAriaLabel)return;const e=this.tabPanelId||this._getAccessibleName()||"";e?(this.setAttribute("aria-label",e),this._generatedAriaLabel=e):this._generatedAriaLabel&&(this.removeAttribute("aria-label"),this._generatedAriaLabel=void 0)}willUpdate(){this.id=this.id.length>0?this.id:this._componentIdFallback,this.tabPanelId=this.tabPanelId&&this.tabPanelId.length>0?this.tabPanelId:this._panelIdFallback,this.setAttribute("tabindex",this.active?"0":"-1"),this._toggleActiveState(),this._syncAccessibleName()}_handleSlotChange(){this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length,this._baseSlotEmpty=0===this._baseSlot.length,this._syncAccessibleName(),!this._baseSlotEmpty&&(this._baseSlot[0].tagName.toLowerCase()===h||this._baseSlot[0].tagName.toLowerCase()===p)&&(this.delegateOutline=!0)}_toggleActiveState(){if(!this._baseSlotEmpty){let t=this._baseSlot[0];this._baseSlot[0].tagName.toLowerCase().includes("tab")||this._baseSlot[0].tagName.toLowerCase().includes("store-pill")?t=this._baseSlot[0]:(t=this._baseSlot.flatMap(t=>Array.from(t.children)).find(t=>t.tagName.toLowerCase().includes("tab")),t||(t=this._baseSlot.flatMap(t=>Array.from(t.children)).find(t=>t.tagName.toLowerCase().includes("store-pill")))),t&&(this.active?t.setAttribute("active",""):t.removeAttribute("active"))}}updated(t){t.has("active")&&this._toggleActiveState(),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}render(){return l`
      <span
        part="tab__first"
        class="tab__first"
        style="${this._firstSlotEmpty?"display: none":""}"
      >
        <slot name="tab__first" @slotchange=${this._handleSlotChange}></slot>
      </span>
      <span part="tab__base" class="tab__base">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </span>
      <span
        part="tab__last"
        class="tab__last"
        style="${this._lastSlotEmpty?"display: none":""}"
      >
        <slot name="tab__last" @slotchange=${this._handleSlotChange}></slot>
      </span>
    `}};E.styles=[y],$([a({type:Boolean,reflect:!0})],E.prototype,"active",2),$([a({type:Boolean,reflect:!0})],E.prototype,"disabled",2),$([a({type:Boolean,reflect:!0,attribute:"delegate-outline"})],E.prototype,"delegateOutline",2),$([a({attribute:"tab-panel-id"})],E.prototype,"tabPanelId",2),$([s({slot:"tab__first"})],E.prototype,"_firstSlot",2),$([s({slot:"tab__last"})],E.prototype,"_lastSlot",2),$([r()],E.prototype,"_baseSlot",2),$([i()],E.prototype,"_firstSlotEmpty",2),$([i()],E.prototype,"_lastSlotEmpty",2),$([i()],E.prototype,"_baseSlotEmpty",2),E=$([o(w)],E);export{E as Tab,w as name};
