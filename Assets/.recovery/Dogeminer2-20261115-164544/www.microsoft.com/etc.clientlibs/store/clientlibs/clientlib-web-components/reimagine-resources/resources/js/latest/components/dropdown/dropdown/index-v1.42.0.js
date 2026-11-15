import{r as t,i as e,n as o,e as r,c as s,O as i,ae as n,b as l,I as a,J as d,y as h,d as p}from"../../../tag.const-v1.42.0.js";import{S as c,o as u}from"../../../secondary-nav-item.const-v1.42.0.js";import{b as _}from"../../../footnote.const-v1.42.0.js";import{a as g}from"../../../util5-v1.42.0.js";import{a as m,n as f}from"../../../util12-v1.42.0.js";import{name as w}from"../dropdown-trigger/index-v1.42.0.js";import{D as y}from"../../../dropdown-trigger.const-v1.42.0.js";import{B as v}from"../../../pagination-item.const-v1.42.0.js";const b="relative",S="initial",I="initial",$=e`
  :host {
    display: var(--ds-dropdown-display, ${t("block")});
    position: var(--ds-dropdown-position, ${t(b)});
    gap: var(--ds-dropdown-gap, ${t(S)});
    align-items: var(--ds-dropdown-align-items, ${t(I)});

    --ds-input-control-input-overflow: hidden;
  }

  store-flyout {
    width: var(--ds-flyout-width, 100%);
    max-width: 100%;

    --ds-flyout-border-width: 0;
    --ds-flyout-bg-color: transparent;
  }

  :host([open]) {
    --ds-dropdown-trigger-icon-transform: rotate(-180deg);
  }
`;var T=Object.defineProperty,A=Object.getOwnPropertyDescriptor,k=(t,e,o,r)=>{for(var s,i=r>1?void 0:r?A(e,o):e,n=t.length-1;n>=0;n--)(s=t[n])&&(i=(r?s(e,o,i):s(i))||i);return r&&i&&T(e,o,i),i};const E="store-dropdown";let x=0,D=class extends c{constructor(){super(...arguments),this._componentId=++x,this._anchorIdFallback=`anchor${this._componentId}`,this.noReflow=!1,this.offset=5,this.open=!1,this.placement=g.bottomStart,this.selectable=!1,this._firstSlotEmpty=!0,this._lastSlotEmpty=!0,this._dropdownItems=[],this._dropdownEvents=[],this._initialPlaceHolderText="Placeholder Text",this._menuListItems=[],this._placeholderTextNode=null}clearCheckboxes(){var t;if(this._trigger.length>0){const e=null==(t=this._trigger[0].shadowRoot)?void 0:t.querySelector("store-button");e&&e.hasAttribute("active")&&(e.click(),e.click())}this._dropdownItems.forEach(t=>{var e;const o=null==(e=t.shadowRoot)?void 0:e.querySelector('input[type="checkbox"]');null!=o&&o.checked&&o.click()})}_updatePlaceholderTextForSingleSelect(t){var e;const o=null==(e=null==t?void 0:t.textContent)?void 0:e.trim();return this.hide(),o}_updatePlaceholderTextForMultiSelect(){var t;this._menuListItems=this._dropdownItems.filter(t=>t.hasAttribute("checked")).map(t=>t);let e=this._menuListItems.map(t=>{var e;return null==(e=t.textContent)?void 0:e.trim()}),o="";e.length>3?(o=`${e.slice(0,3).join(", ")} and ${e.length-3} more`,e=e.slice(0,3),e.push("...")):o=e.join(", ");const r=this._menuListItems.length;return null==(t=this._dropdownTrigger)||t.setAttribute("aria-label",`${r} item${r>1?"s":""} selected: ${o}`),e.join(",")}_handleDropdownItemClick(t){var e;if(!(this.selectable&&t.target instanceof HTMLElement))return;let o=t.target;if(!(o.matches("store-dropdown-trigger")||o.matches("store-menu-list")||o.matches("store-dropdown"))&&(["store-menu-list-item","li",'[role="listitem"]','[role="option"]','[role="group"]','[configuration="heading"]'].some(t=>o.matches(t))||(o=o.closest('store-menu-list-item, li, [role="listitem"], [role="option"], [role="group"], [configuration="heading"]')),o)){if(o.getAttribute("configuration")===m.heading)return;let t;const r=(null==(e=this._menuList)?void 0:e.configuration)??"";t=[m.default,m.heading,m.tab].includes(r)?this._updatePlaceholderTextForSingleSelect(o):this._updatePlaceholderTextForMultiSelect(),this._placeholderTextNode&&(this._placeholderTextNode.textContent=t||this._initialPlaceHolderText),this.dispatchEvent(new CustomEvent("dropdown-selection-changed",{detail:{value:o.getAttribute("value")||""},bubbles:!0,composed:!0}))}}_handleSlotChange(){this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length,this._menuList=this._defaultSlot[0],this._dropdownTrigger=this._trigger[0],this._dropdownItems=[...this._defaultSlot[0].querySelectorAll(f)],this._trigger[0].setAttribute("id",this.anchorId),this._placeholderTextNode=Array.from(this._trigger[0].childNodes).find(t=>{var e;return t.nodeType===Node.TEXT_NODE&&(null==(e=t.textContent)?void 0:e.trim().length)})??null,this.selectable&&this._menuList.setAttribute("selectable","")}_handleOnHide(){this.hide(),this._trigger[0].removeAttribute("active"),this._updateTriggerAppearance()}_handleOnShow(){var t;this.show(),null==(t=this._menuList)||t.updateScrollbarVisible(),this._trigger[0].setAttribute("active",""),this._updateTriggerAppearance()}_updateTriggerAppearance(){if(this._trigger[0].tagName===w.toUpperCase()){const t=this._trigger[0];if(t.configuration===y.buttonSelect){const e=this._dropdownItems.some(t=>t.hasAttribute("checked"));this.open||e?(t.buttonAppearance=v.buttonPrimary,t.buttonActive=!0):(t.buttonAppearance=v.buttonSecondary,t.buttonActive=!1)}}}_handleCloseFlyout(t,e){t.preventDefault(),this._flyout.removeAttribute("open"),null==e||e.focus()}_handleTriggerKeyDown(t){var e;if(this._dropdownItems.length>0&&t.key===n.ARROW_DOWN){t.preventDefault();const o=this._menuList._focusableItems;if(o&&o.length>0)return void(null==(e=this._menuList)||e._focusFirstItem());this._dropdownItems[0].focus()}}_handleKeyDown(t){const e=t.target,o=[...this._dropdownItems,..._(this._menuList)],r=this._trigger[0],s=o[0],i=o[o.length-1];switch(t.key){case n.TAB:(t.shiftKey&&e===s||!t.shiftKey&&e===i)&&this._handleCloseFlyout(t,r);break;case n.ARROW_DOWN:t.preventDefault(),this._handleArrowDownKey(e);break;case n.ARROW_UP:{t.preventDefault();const o=e.previousElementSibling;if(e===s)return e.focus(),void t.preventDefault();o&&o instanceof HTMLElement&&o.focus();break}case n.HOME:{t.preventDefault();const e=o[0];e&&e instanceof HTMLElement&&e.focus();break}case n.END:{t.preventDefault();const e=o[o.length-1];e&&e instanceof HTMLElement&&e.focus();break}}}_handleArrowDownKey(t){const e=t.nextElementSibling;if(e){if(e.getAttribute("configuration")===m.heading)return void this._handleArrowDownKey(e);e.focus()}}_renderOptionalSlot(t="dropdown__first",e=this._firstSlotEmpty){return l`
      <div part=${t} class=${t} style="${e?"display: none;":""}">
        <slot name=${t} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}connectedCallback(){super.connectedCallback(),this._dropdownEvents.push({el:this,type:"click",handler:this._handleDropdownItemClick.bind(this)}),a(this._dropdownEvents)}disconnectedCallback(){d(this._dropdownEvents),super.disconnectedCallback()}willUpdate(){this.anchorId=this.anchorId&&this.anchorId.length>0?this.anchorId:this._anchorIdFallback}hide(){this.open=!1}show(){this.open=!0}toggle(){this.open=!this.open}render(){return l`
      <div
        part="dropdown__trigger"
        class="dropdown__trigger"
        aria-controls="dropdown__flyout"
        id="${h(this.anchorId)}"
        @keydown="${this._handleTriggerKeyDown}"
      >
        <slot name="dropdown__trigger" @slotchange="${this._handleSlotChange}"></slot>
      </div>

      <store-flyout
        id="dropdown__flyout"
        anchor="${h(this.anchorId)}"
        part="dropdown__flyout"
        class="dropdown__flyout"
        placement="${this.placement}"
        ?reflow="${!this.noReflow}"
        offset="${this.offset}"
        ?open="${this.open}"
        @keydown="${this._handleKeyDown}"
        @onHide="${this._handleOnHide}"
        @onShow="${this._handleOnShow}"
      >
        ${this._renderOptionalSlot("dropdown__first",this._firstSlotEmpty)}
        <div
          aria-labelledby="${h(this.anchorId)}"
          part="dropdown__base"
          class="dropdown__base"
        >
          <slot @slotchange="${this._handleSlotChange}"></slot>
        </div>
        ${this._renderOptionalSlot("dropdown__last",this._lastSlotEmpty)}
      </store-flyout>
    `}};D.shadowRootOptions={...c.shadowRootOptions,delegatesFocus:!0},D.styles=[$],k([o({attribute:"anchor-id"})],D.prototype,"anchorId",2),k([o({type:Boolean,attribute:"no-reflow"})],D.prototype,"noReflow",2),k([o({type:Number})],D.prototype,"offset",2),k([o({type:Boolean,reflect:!0})],D.prototype,"open",2),k([o()],D.prototype,"placement",2),k([o({type:Boolean,reflect:!0})],D.prototype,"selectable",2),k([r({slot:"dropdown__first"})],D.prototype,"_firstSlot",2),k([r({slot:"dropdown__last"})],D.prototype,"_lastSlot",2),k([s()],D.prototype,"_firstSlotEmpty",2),k([s()],D.prototype,"_lastSlotEmpty",2),k([i("store-flyout")],D.prototype,"_flyout",2),k([u()],D.prototype,"_defaultSlot",2),k([u({slot:"dropdown__trigger"})],D.prototype,"_trigger",2),k([s()],D.prototype,"_menuList",2),k([s()],D.prototype,"_dropdownTrigger",2),k([s()],D.prototype,"_dropdownItems",2),k([s()],D.prototype,"_dropdownEvents",2),k([s()],D.prototype,"_initialPlaceHolderText",2),k([s()],D.prototype,"_menuListItems",2),k([s()],D.prototype,"_placeholderTextNode",2),D=k([p(E)],D);export{D as Dropdown,E as name};
