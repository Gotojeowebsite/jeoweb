import{r as t,i as o,s as e,y as n,b as s,n as i,e as a,c as l,d as r}from"../../../tag.const-v1.42.0.js";import{S as d,a as c}from"../../../util21-v1.42.0.js";import{S as h}from"../../../show-more-show-less.mixin-v1.42.0.js";import{v as u}from"../../../secondary-nav-item.const-v1.42.0.js";import{a as p}from"../../../util9-v1.42.0.js";const m=o`
  :host {
    --ds-card-feature-top-flex: 0;
  }

  :host([remove-padding-inline]) {
    --ds-child-container-padding-inline-start: 1rem;
    --ds-child-container-padding-inline-end: 1rem;
    --ds-child-container-max-width: 83rem;
    --ds-child-container-width: 100%;
    --ds-child-container-margin-inline: auto;
    --ds-child-container-box-size: border-box;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: var(--ds-card-grid-container-gap, ${t("var(--ds-spacing-m, 1rem)")});
  }

  ::slotted(store-layout-column.top-button-column) {
    --ds-layout-column-flex-direction: column;
    --ds-button-min-width: 100%;

    display: flex;
  }

  ::slotted(store-layout-column[slot='button']) {
    display: flex;
    justify-content: center;
  }

  :host([configuration='4-col-even-1']) ::slotted(store-layout-column) {
    min-width: 0;
  }

  ::slotted(store-tabs) {
    --ds-tabs-width: 100%;
  }
`,g=o`
  @media (min-width: ${t(u.sm)}) {
    ::slotted(store-layout-column.top-button-column) {
      --ds-layout-column-flex-direction: row;
    }

    :host([remove-padding-inline]) {
      --ds-child-container-padding-inline-start: 4rem;
      --ds-child-container-padding-inline-end: 4rem;
    }
  }

  @media (min-width: ${t(u.md)}) {
    ::slotted(store-layout-column.top-button-column) {
      justify-content: flex-end;
    }

    :host([remove-padding-inline]) {
      --ds-child-container-padding-inline-start: 3.5rem;
      --ds-child-container-padding-inline-end: 3.5rem;
      --ds-child-container-max-width: 100%;
    }
  }

  @media (min-width: ${t(u.lg)}) {
    :host([remove-padding-inline]) {
      --ds-child-container-padding-inline-start: 5%;
      --ds-child-container-padding-inline-end: 5%;
      --ds-child-container-width: 90%;
      --ds-child-container-box-size: content-box;
      --ds-child-container-max-width: 83rem;
    }
  }
`,y=p.col3Even;var b=Object.defineProperty,f=Object.getOwnPropertyDescriptor,S=Object.getPrototypeOf,w=Reflect.get,v=(t,o,e,n)=>{for(var s,i=n>1?void 0:n?f(o,e):o,a=t.length-1;a>=0;a--)(s=t[a])&&(i=(n?s(o,e,i):s(i))||i);return n&&i&&b(o,e,i),i};const $="store-featured";let _=class extends(h(d)){constructor(){super(...arguments),this.enableShowMoreShowLess=!1,this.removePaddingInline=!1,this._topSlotEmpty=!0,this._buttonSlotEmpty=!0}handleTopSlotChange(){this._topSlotEmpty=0===this._topSlot.length,!this._topSlotEmpty&&this._topSlot.length>0&&(this._topSlot.forEach((t,o)=>{const n=t,s=n.querySelector("store-heading-block");if(e(s,{size:"s"}),1===o){n.classList.add("top-button-column");const t=n.querySelector("store-button");e(t,{size:"large",shape:"rounded",appearance:"button--secondary"})}}),2===this._topSlot.length&&(this.topLayoutConfiguration=this.topLayoutConfiguration??c.col2even))}handleButtonSlotChange(){this._buttonSlotEmpty=0===this._buttonSlot.length,!this._buttonSlotEmpty&&this._buttonSlot.length>0&&this._buttonSlot.forEach(t=>{var o;let n=null;"store-layout-column"===(null==(o=t.tagName)?void 0:o.toLowerCase())&&(n=t.querySelector("store-button")),n&&e(n,{shape:"rounded",appearance:"button--secondary"})})}handleBaseSlotChange(t){t.target.assignedElements({flatten:!0}).forEach(t=>{var o;if("store-layout-column"===(null==(o=t.tagName)?void 0:o.toLowerCase())){const o=t.querySelector("store-card-promo");if(o){o.style.height="100%";const e=o.getAttribute("column-span");e&&t.classList.add(`column-span-${e}`)}}})}_renderBlade(){const t="container",o=this.removePaddingInline?"--ds-container-padding-inline-start: 0; --ds-container-padding-inline-end: 0;--ds-container-width: 100%;--ds-container-max-width: auto;":void 0,e=s`
      <store-layout
        class="top"
        part="top"
        style="${this.toggleDisplay(this._topSlotEmpty)}"
        configuration=${n(this.topLayoutConfiguration)}
      >
        <slot name="top" @slotchange=${this.handleTopSlotChange}></slot>
      </store-layout>
      <store-layout
        part="base"
        class="base"
        configuration=${this.configuration||y}
        ?show-more-show-less-container=${this.enableShowMoreShowLess}
      >
        <slot @slotchange=${this.handleBaseSlotChange}></slot>
      </store-layout>
      <store-layout
        class="button"
        part="button"
        style="${this.toggleDisplay(this._buttonSlotEmpty)}"
      >
        <slot name="button" @slotchange=${this.handleButtonSlotChange}></slot>
      </store-layout>
      <store-layout
        class="show-more"
        part="show-more"
        style="${this.toggleDisplay(this._showMoreButtonSlotEmpty)}"
      >
        <slot name="show-more-button" @slotchange=${this.handleShowMoreButtonSlotChange}></slot>
      </store-layout>
    `;return this.baseContent?s` <div class=${t} part=${t}>${e}</div> `:s`
      <store-container
        class=${t}
        part=${t}
        style=${n(o)}
      >
        ${e}
      </store-container>
    `}render(){return this.renderUiShell(this._renderBlade())}};var x,E,C;_.styles=[...(x=_,E=_,C="styles",w(S(x),C,E)||[]),m,g],v([i({attribute:"configuration",reflect:!0})],_.prototype,"configuration",2),v([i({attribute:"top-layout-configuration",reflect:!0})],_.prototype,"topLayoutConfiguration",2),v([i({type:Boolean,reflect:!0,attribute:"enable-show-more-show-less"})],_.prototype,"enableShowMoreShowLess",2),v([i({type:Boolean,reflect:!0,attribute:"remove-padding-inline"})],_.prototype,"removePaddingInline",2),v([a({slot:"top"})],_.prototype,"_topSlot",2),v([a({slot:"button"})],_.prototype,"_buttonSlot",2),v([l()],_.prototype,"_topSlotEmpty",2),v([l()],_.prototype,"_buttonSlotEmpty",2),_=v([r($)],_);export{_ as Featured,$ as name};
