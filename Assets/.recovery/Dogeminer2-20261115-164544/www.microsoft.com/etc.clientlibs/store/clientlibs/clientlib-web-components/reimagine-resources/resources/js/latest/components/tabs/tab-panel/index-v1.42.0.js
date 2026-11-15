import{r as t,i as s,R as a,n as o,c as e,O as l,e as i,b as n,d as r}from"../../../tag.const-v1.42.0.js";import{o as b,e as h}from"../../../secondary-nav-item.const-v1.42.0.js";import{W as p}from"../../../i18nMixin-v1.42.0.js";import{f as d,r as c}from"../../../footnote.const-v1.42.0.js";import{c as _}from"../../../vfi-v1.42.0.js";import{s as u}from"../../../dropdown-trigger.const-v1.42.0.js";import"../../../util1-v1.42.0.js";const f=s`
  :host {
    color: var(--ds-tab-panel-color, ${t("var(--ds-theme-foreground-base-strong, #0e1726)")});
  }

  :host .tab-panel__base {
    display: var(--tab-panel-display, none);
    color: var(--ds-theme-foreground-base-subtle, #17253d);
  }

  :host([active]) .tab-panel__base {
    display: block;
    position: relative;
  }

  /* Prevents double VFI in Firefox */
  :host(:focus),
  .tab-panel__sr-button:focus {
    outline: none !important;
  }

  :host :focus {
    ${_}
  }

  .tab-panel__sr-button {
    --ds-button-background-color: var(--ds-theme-background-neutral-fade, #f7f7f7);

    position: absolute;
    z-index: 1;
  }

  .tab-panel__sr-button:not(:active):not(:focus) {
    ${u}
  }
`;var v=Object.defineProperty,y=Object.getOwnPropertyDescriptor,m=(t,s,a,o)=>{for(var e,l=o>1?void 0:o?y(s,a):s,i=t.length-1;i>=0;i--)(e=t[i])&&(l=(o?e(s,a,l):e(l))||l);return o&&l&&v(s,a,l),l};const g="store-tab-panel";let w=0,S=class extends p{constructor(){super(...arguments),this._attrId=++w,this._componentIdFallback=`tab${this._attrId}`,this._tabIdFallback=`${this._componentIdFallback}-tab`,this.active=!1,this.tabId=null,this.tabLabel=null,this.tab=null,this._show=!0,this._firstSlotEmpty=!0,this._lastSlotEmpty=!0}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tabpanel"),this.setAttribute("tabindex","0")}willUpdate(){var t;this.id=this.id.length>0?this.id:this._componentIdFallback;const s=this.getAttribute("aria-labelledby"),a=s?s.split(/\s+/)[0]:null;this.tabId=a||(this.tabId&&this.tabId.length>0?this.tabId:this._tabIdFallback),this.tab=d(this,`#${this.tabId}`),this.tabLabel=this.tabLabel&&this.tabLabel.length>0?this.tabLabel:null==(t=this.tab)?void 0:t.textContent}async updated(t){t.has("active")&&(await this.updateComplete,c(this.base),this._show=this.active)}_handleClick(t){var s;const a=this.closest("store-tabs");if(this.tab=d(this,`#${this.tabId}`),null==a?void 0:a.isMobileViewport){const t=null==(s=null==a?void 0:a.shadowRoot)?void 0:s.querySelector("store-dropdown-trigger");null==t||t.focus()}else this.tab&&this.tab.focus();t.preventDefault()}_handleKeydown(t){var s;if("Enter"===t.key||" "===t.key){t.preventDefault();const a=this.closest("store-tabs");if(this.tab=d(this,`#${this.tabId}`),null==a?void 0:a.isMobileViewport){const t=null==(s=null==a?void 0:a.shadowRoot)?void 0:s.querySelector("store-dropdown-trigger");null==t||t.focus()}else this.tab&&this.tab.focus()}}_handleSlotChange(){this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length}_renderOptionalSlot(t="tab-panel__first",s=this._firstSlotEmpty){return n`
      <div part=${t} class=${t} style="${s?"display: none;":""}">
        <slot name=${t} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}render(){const t={show:this._show};return n`
      ${this._renderOptionalSlot("tab-panel__first",this._firstSlotEmpty)}
      <div part="tab-panel__base" class="tab-panel__base ${h(t)}" tabindex="0">
        <slot></slot>
        <store-button
          class="tab-panel__sr-button"
          part="tab-panel__sr-button"
          appearance="button--ghost"
          shape="rounded"
          size="small"
          @click="${this._handleClick}"
          @keydown="${this._handleKeydown}"
        >
          <span slot="button__text"
            >${this.msg("back",{label:this.tabLabel||"tab"})||`Back to ${this.tabLabel||"tab"}`}</span
          >
        </store-button>
      </div>
      ${this._renderOptionalSlot("tab-panel__last",this._lastSlotEmpty)}
    `}};S.shadowRootOptions={...a.shadowRootOptions,delegatesFocus:!0},S.styles=[f],m([o({type:Boolean,reflect:!0})],S.prototype,"active",2),m([o({attribute:"tab-id"})],S.prototype,"tabId",2),m([o({attribute:"tab-label"})],S.prototype,"tabLabel",2),m([e()],S.prototype,"tab",2),m([e()],S.prototype,"_show",2),m([l(".tab-panel__base")],S.prototype,"base",2),m([b({flatten:!0})],S.prototype,"slotItems",2),m([i({slot:"tab-panel__first"})],S.prototype,"_firstSlot",2),m([i({slot:"tab-panel__last"})],S.prototype,"_lastSlot",2),m([e()],S.prototype,"_firstSlotEmpty",2),m([e()],S.prototype,"_lastSlotEmpty",2),S=m([r(g)],S);export{S as TabPanel,g as name};
