import{i as t,r as e,W as s,n as i,e as o,O as n,c as r,b as a,s as l,I as c,J as d,y as u,d as h}from"../../../tag.const-v1.42.0.js";import{o as m,S as b,e as _}from"../../../secondary-nav-item.const-v1.42.0.js";import{s as f}from"../../../surface.styles-v1.42.0.js";import{c as p}from"../../../vfi-v1.42.0.js";import{a as v,b as g,n as y}from"../../../util12-v1.42.0.js";import"../../divider/index-v1.42.0.js";const k=t`
  scrollbar-width: ${t`thin`};
  scrollbar-color: ${t`var(--ds-theme-background-base-color, #dceef8)`} ${t`rgba(0, 0, 0, 0)`};

  &::-webkit-scrollbar-thumb {
    border-radius: ${t`var(--ds-radii-circle)`};
  }
`,I={display:"block",background:f.background,backdropFilter:f.backdropFilter,borderWidth:f.borderWidth,borderStyle:f.borderStyle,borderColor:f.borderColor,borderRadius:"var(--ds-radii-m, 0.5rem)",boxShadow:s["level-1"].value.join(", "),padding:"var(--ds-spacing-xs, 0.5rem)",gap:"var(--ds-spacing-s, 0.75rem)",contentMaxHeight:"22rem",contentOverflow:"auto"},S=t`
  :host {
    display: var(--ds-menu-list-display, ${e(I.display)});

    --ds-indicator-height: 1.5rem;
  }

  .menu-list {
    display: flex;
    flex-direction: column;
    background: var(--ds-menu-list-background, ${e(I.background)});
    backdrop-filter: var(
      --ds-menu-list-backdrop-filter,
      ${e(I.backdropFilter)}
    );
    border-width: var(--ds-menu-list-border-width, ${e(I.borderWidth)});
    border-style: var(--ds-menu-list-border-style, ${e(I.borderStyle)});
    border-color: var(--ds-menu-list-border-color, ${e(I.borderColor)});
    border-radius: var(--ds-menu-list-border-radius, ${e(I.borderRadius)});
    box-shadow: var(--ds-menu-list-box-shadow, ${e(I.boxShadow)});
    padding: var(--ds-menu-list-padding, ${e(I.padding)});
    gap: var(--ds-menu-list-gap, ${e(I.gap)});
    outline: 2px solid transparent;
  }

  .menu-list__content {
    max-height: var(
      --ds-menu-list-content-max-height,
      ${e(I.contentMaxHeight)}
    );
    overflow: var(--ds-menu-list-content-overflow, ${e(I.contentOverflow)});
  }

  :host(:focus) .menu-list__content {
    ${p};
  }

  .menu-list__content-scrolling {
    overflow: var(--ds-menu-list-content-overflow, ${e(I.contentOverflow)});
    padding-block: var(--ds-vfi-outline-width, 0.1875rem);
    padding-inline-start: var(--ds-vfi-outline-width, 0.1875rem);
    padding-inline-end: var(--ds-spacing-xs, 0.5rem);

    ${k};
  }

  .menu-list__content-margin {
    margin-bottom: var(--ds-spacing-xs, 0.5rem);
  }
`;let $="unknown",w=!1,E=0;function L(){$="mouse"}function x(){$="keyboard"}function A(){$="touch"}class C{constructor(t){(this.host=t).addController(this)}hostConnected(){E++,w||(w=!0,document.addEventListener("mousedown",L,!0),document.addEventListener("keydown",x,!0),document.addEventListener("touchstart",A,!0))}hostDisconnected(){E--,E<=0&&(E=0,w&&(document.removeEventListener("mousedown",L,!0),document.removeEventListener("keydown",x,!0),document.removeEventListener("touchstart",A,!0),w=!1))}isInitialized(){return"unknown"!==$}isKeyboard(){return"keyboard"===$}getLastInteraction(){return $}}var D=Object.defineProperty,M=Object.getOwnPropertyDescriptor,O=(t,e,s,i)=>{for(var o,n=i>1?void 0:i?M(e,s):e,r=t.length-1;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&D(e,s,n),n};const j="store-menu-list";let F=class extends b{constructor(){super(...arguments),this.configuration=v.default,this.size=g.small,this.selectable=!1,this.label="Menu options",this._firstSlotEmpty=!0,this._lastSlotEmpty=!0,this.__buttonSlotEmpty=!0,this._scrollbarVisible=!1,this._menuListEvents=[],this._activeDescendant=null,this._focusableItems=[],this.inputMethodController=new C(this),this._handleKeyDown=t=>{const e=t;switch(e.key){case" ":e.preventDefault(),this._handleClick(e,!0);break;case"Enter":this._handleClick(e,!0);break;case"ArrowDown":this._focusNextItem();break;case"ArrowUp":this._focusPreviousItem();break;case"Home":this._focusFirstItem();break;case"End":this._focusLastItem()}},this._handleFocusInKeyboard=t=>{if(!this.inputMethodController.isKeyboard())return;const e=t.relatedTarget;if(!e||!this.contains(e)){const t=this._focusableItems.find(t=>t.hasAttribute("active")||"true"===t.getAttribute("aria-selected"));t?(t.focus(),this._activeDescendant=t.id):this._focusableItems.length>0&&this._focusFirstItem()}}}get _listItems(){let t=this._defaultSlot;return 1===t.length&&t[0]instanceof HTMLSlotElement&&(t=t[0].assignedElements().map(t=>{if(t.tagName.toLowerCase()!==y){return t.querySelector(y)||t}return t})),t}_handleClick(t,e=!1){var s;const i=t.target,o=this._listItems.find(t=>t.contains(i));if((null==o?void 0:o.getAttribute("configuration"))===v.heading)return;if(o&&this.configuration===v.default&&(this._listItems.forEach(t=>{t!==o&&(t.removeAttribute("active"),t.removeAttribute("aria-selected"))}),o.hasAttribute("active")?(o.removeAttribute("active"),o.removeAttribute("aria-selected"),this._activeDescendant=null):(o.setAttribute("active",""),o.setAttribute("aria-selected","true"),this._activeDescendant=o.id)),o&&(null==o?void 0:o.getAttribute("configuration"))===v.checkmark){const t=null==(s=o.shadowRoot)?void 0:s.querySelector('input[type="checkbox"]');if(t&&this.configuration===v.checkmark){e&&t.click();const s=t.checked;o.setAttribute("aria-checked",s.toString()),s?o.setAttribute("checked",""):o.removeAttribute("checked")}}const n=this._focusableItems.find(t=>t.id===this._activeDescendant);n&&(null==n?void 0:n.getAttribute("configuration"))===v.option&&(null==n||n.click())}_focusNextItem(){if(0===this._focusableItems.length)return;const t=(this._focusableItems.findIndex(t=>t.id===this._activeDescendant)+1)%this._focusableItems.length;this._focusItemInList(this._focusableItems,t)}_focusPreviousItem(){if(0===this._focusableItems.length)return;const t=this._focusableItems.findIndex(t=>t.id===this._activeDescendant),e=Math.max(t-1,0);this._focusItemInList(this._focusableItems,e)}_focusFirstItem(){0!==this._focusableItems.length&&this._focusItemInList(this._focusableItems,0)}_focusLastItem(){0!==this._focusableItems.length&&this._focusItemInList(this._focusableItems,this._focusableItems.length-1)}_focusItemInList(t,e){const s=t[e];s&&(this._activeDescendant=s.id,s.focus())}_setMenuListRole(){return this.selectable&&(this.configuration===v.default||this.configuration===v.link||this.configuration===v.heading)||this.configuration===v.checkmark?"listbox":"list"}_handleSlotChange(){this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length,this.__buttonSlotEmpty=0===this._buttonSlot.length;let t=0;this._listItems.forEach(e=>{!e.id&&e.getAttribute("configuration")!==v.heading&&(e.id=`menu-item-${t}`,t++)}),this._focusableItems=this._listItems.filter(t=>t.getAttribute("configuration")!==v.heading),this.selectable&&this._focusableItems.forEach(t=>{t.hasAttribute("selectable")||t.setAttribute("selectable","")}),this.updateScrollbarVisible()}_renderOptionalSlot(t,e){return a`
      <div part=${t} class=${t} style="${e?"display: none;":""}">
        <slot name=${t} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}updated(t){if(t.has("configuration")&&this.configuration!==v.heading&&l(this._listItems,{configuration:this.configuration}),t.has("size")&&l(this._listItems,{size:this.size}),t.has("label")&&this._menuListContent.setAttribute("aria-label",this.label||""),t.has("selectable")){const t=!this.selectable||this.configuration!==v.default&&this.configuration!==v.link?"listitem":"option";this._listItems.forEach(e=>{const s=e.getAttribute("configuration"),i=s===v.heading?"group":s===v.option||s===v.checkmark?"option":t;e.setAttribute("role",i)})}}updateScrollbarVisible(){this._scrollbarVisible=this._menuListContent.scrollHeight>this._menuListContent.clientHeight}connectedCallback(){super.connectedCallback(),this._menuListEvents.push({el:this,type:"click",handler:this._handleClick},{el:this,type:"keydown",handler:this._handleKeyDown},{el:this,type:"focusin",handler:this._handleFocusInKeyboard}),c(this._menuListEvents)}disconnectedCallback(){d(this._menuListEvents),super.disconnectedCallback()}render(){const t={"menu-list__content-scrolling":this._scrollbarVisible,"menu-list__content-margin":!this.__buttonSlotEmpty};return a`
      <div class="menu-list" part="menu-list">
        ${this._renderOptionalSlot("menu-list__first",this._firstSlotEmpty)}
        <div
          class="menu-list__content ${_(t)}"
          part="menu-list__content"
          aria-label=${u(this.label||void 0)}
          role=${this._setMenuListRole()}
          aria-activedescendant=${u("listbox"===this._setMenuListRole()&&this._activeDescendant?this._activeDescendant:void 0)}
        >
          <slot @slotchange="${this._handleSlotChange}"></slot>
        </div>
        ${this._lastSlotEmpty?"":a`<store-divider></store-divider>`}
        ${this._renderOptionalSlot("menu-list__last",this._lastSlotEmpty)}
        ${this.__buttonSlotEmpty?"":a`<store-divider></store-divider>`}
        ${this._renderOptionalSlot("menu-list__buttons",this.__buttonSlotEmpty)}
      </div>
    `}};F.styles=[S],O([i({reflect:!0})],F.prototype,"configuration",2),O([i({reflect:!0,attribute:"size"})],F.prototype,"size",2),O([i({type:Boolean,reflect:!0})],F.prototype,"selectable",2),O([i({type:String,reflect:!0})],F.prototype,"label",2),O([o({slot:"menu-list__first"})],F.prototype,"_firstSlot",2),O([o({slot:"menu-list__last"})],F.prototype,"_lastSlot",2),O([o({slot:"menu-list__buttons"})],F.prototype,"_buttonSlot",2),O([m()],F.prototype,"_defaultSlot",2),O([n(".menu-list__content")],F.prototype,"_menuListContent",2),O([r()],F.prototype,"_firstSlotEmpty",2),O([r()],F.prototype,"_lastSlotEmpty",2),O([r()],F.prototype,"__buttonSlotEmpty",2),O([r()],F.prototype,"_scrollbarVisible",2),O([r()],F.prototype,"_menuListEvents",2),O([r()],F.prototype,"_activeDescendant",2),F=O([h(j)],F);export{F as MenuList,j as name};
