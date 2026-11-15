import{r as i,ab as t,i as e,L as o,a4 as n,b as s,R as a,n as l,d as r}from"./tag.const-v1.42.0.js";import{ListItem as d}from"./components/list-item/index-v1.42.0.js";import{c as h}from"./vfi-v1.42.0.js";import{C as g,s as c}from"./checkbox.styles-v1.42.0.js";import{a as m}from"./util7-v1.42.0.js";import"./util8-v1.42.0.js";const _={default:"default",link:"link",option:"option",optionHighlight:"option-highlight",checkmark:"checkmark",tab:"tab",heading:"heading"},p={small:"small",large:"large"},u="var(--ds-theme-foreground-base-strong, #0e1726)",f="var(--ds-spacing-xs, 0.5rem)",v="var(--ds-spacing-s, 0.75rem)",b="var(--ds-radii-s, 0.5rem)",$="var(--ds-theme-background-accent-subtle-hover, rgba(0, 85, 151, 0.4))",k="var(--ds-theme-background-accent-subtle-pressed, #54a5e2)",y="0",x=e`
  :host,
  a {
    display: var(--ds-menu-list-item-display, ${i("block")});
    color: var(--ds-menu-list-item-color, ${i(u)});
    border-radius: var(
      --ds-menu-list-item-border-radius,
      ${i(b)}
    );

    --ds-tab-justify-content: intital;
  }

  :host(:focus) a {
    ${h};
  }

  a {
    text-decoration: none;
  }

  :host .list-item__inner {
    --ds-list-item-inner-padding-block-start: var(
      --ds-menu-list-item-padding-block,
      ${i(v)}
    );
    --ds-list-item-inner-padding-block-end: var(
      --ds-menu-list-item-padding-block,
      ${i(v)}
    );
    --ds-list-item-inner-padding-inline-start: var(
      --ds-menu-list-item-padding-inline,
      ${i(f)}
    );
    --ds-list-item-inner-padding-inline-end: var(
      --ds-menu-list-item-padding-inline,
      ${i(f)}
    );

    border-radius: var(
      --ds-menu-list-item-border-radius,
      ${i(b)}
    );
  }

  :host(:hover) .list-item__inner,
  :host(:focus) .list-item__inner,
  a:hover .list-item__inner,
  a:focus .list-item__inner {
    background-color: var(
      --ds-menu-list-item-hover-background-color,
      ${i($)}
    );
  }

  :host([configuration='${i(_.optionHighlight)}']:hover)
    .list-item__inner,
  :host([configuration='${i(_.optionHighlight)}'])
    .option-highlight:hover
    .list-item__inner,
  :host([configuration='${i(_.optionHighlight)}'])
    .option-highlight:focus
    .list-item__inner {
    background-color: var(
      --ds-menu-list-item-hover-background-color,
      ${i($)}
    );
  }

  :host(:active) .list-item__inner {
    background-color: var(
      --ds-menu-list-item-active-background-color,
      ${i(k)}
    );
  }

  .list-item__leading {
    display: inline-flex;
    visibility: hidden;
    opacity: 0;
    transition: var(
      --ds-menu-list-item-leading-transition,
      ${i("opacity 0.2s ease")}
    );
    align-self: stretch;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  .list-item__trailing {
    --ds-list-item-trailing-display: inline-flex;
  }

  /* Default configuration */
  :host([configuration='${i(_.link)}']:hover) .list-item__leading,
  :host([configuration='${i(_.link)}']:focus) .list-item__leading,
  :host([configuration='${i(_.link)}']:active) .list-item__leading,
  :host([configuration='${i(_.link)}']) a:hover .list-item__leading,
  :host([configuration='${i(_.link)}']) a:focus .list-item__leading,
  :host([configuration='${i(_.default)}']:hover)
    .list-item__leading,
  :host([size='${i(p.large)}']:hover) .list-item__leading,
  :host([size='${i(p.large)}']:focus) .list-item__leading,
  :host([size='${i(p.large)}']:active) .list-item__leading,
  :host([active]:not([configuration='${i(_.optionHighlight)}']))
    .list-item__leading,
  :host([configuration='${i(_.tab)}']:hover) .list-item__leading,
  :host([configuration='${i(_.tab)}']:focus) .list-item__leading,
  :host([configuration='${i(_.tab)}']:active) .list-item__leading,
  :host([configuration='${i(_.tab)}']) a:hover .list-item__leading,
  :host([configuration='${i(_.tab)}']) a:focus .list-item__leading {
    visibility: visible;
    opacity: 1;
  }

  /* Size large */
  :host([size='${i(p.large)}']) ::slotted([slot='list-item__title']) {
    --ds-list-item-title-font-weight: ${i(t.fontWeight)};
    --ds-list-item-title-font-size: ${i(t.fontSize)};
    --ds-list-item-title-line-height: ${i(t.lineHeight)};
    --ds-list-item-title-margin-bottom: ${i(t.marginBottom)};
  }

  :host([configuration='${i(_.option)}'])
    ::slotted([slot='list-item__title']) {
    margin-top: ${i(y)};
  }

  :host([configuration='${i(_.optionHighlight)}'])
    ::slotted([slot='list-item__title']) {
    margin-top: ${i(y)};
  }

  /* Option highlight - show indicator on hover */
  :host([configuration='${i(_.optionHighlight)}']:hover)
    .list-item__leading,
  :host([configuration='${i(_.optionHighlight)}']:focus)
    .list-item__leading,
  :host([configuration='${i(_.optionHighlight)}']:active)
    .list-item__leading,
  :host([configuration='${i(_.optionHighlight)}'])
    .option-highlight:hover
    .list-item__leading,
  :host([configuration='${i(_.optionHighlight)}'])
    .option-highlight:focus
    .list-item__leading {
    visibility: visible;
    opacity: 1;
  }

  /* Disabled */
  :host([disabled]) {
    pointer-events: none;
    opacity: 0.2;
  }

  :host([configuration='${i(_.tab)}']:focus-within) {
    background-color: ${i($)};
  }

  :host([configuration='${i(_.tab)}']:focus-within)
    .list-item__leading {
    visibility: visible;
    opacity: 1;
  }

  :host([configuration='${i(_.tab)}']) .list-item__leading {
    align-self: center;
  }

  .heading-wrapper {
    padding-block-start: var(
      --ds-menu-list-item-padding-block,
      ${i(v)}
    );
    padding-block-end: var(
      --ds-menu-list-item-padding-block,
      ${i(v)}
    );
    padding-inline-start: var(
      --ds-menu-list-item-padding-inline,
      ${i(f)}
    );
    padding-inline-end: var(
      --ds-menu-list-item-padding-inline,
      ${i(f)}
    );
  }

  .option {
    cursor: pointer;
  }

  .option-highlight {
    cursor: pointer;
  }
`;var S=Object.defineProperty,H=Object.getOwnPropertyDescriptor,z=Object.getPrototypeOf,O=Reflect.get,j=(i,t,e,o)=>{for(var n,s=o>1?void 0:o?H(t,e):t,a=i.length-1;a>=0;a--)(n=i[a])&&(s=(o?n(t,e,s):n(s))||s);return o&&s&&S(t,e,s),s};const w="store-menu-list-item";let C=class extends(g(o(d))){constructor(){super(...arguments),this.configuration=_.default,this.disabled=!1,this.itemSize=p.small,this.active=!1,this.selectable=!1}_renderLeadingSlot(){return s`
      <div part="list-item__leading" class="list-item__leading">
        <slot name="list-item__leading">
          <store-indicator configuration="${n.rounded}"></store-indicator>
        </slot>
      </div>
    `}_renderTrailingSlot(){return s`
      <div
        part="list-item__trailing"
        class="list-item__trailing"
        style="${this.trailing?"":"display: none;"}"
      >
        <slot name="list-item__trailing">
          ${this.configuration===_.link?s`<store-icon
                icon="chevron-${"rtl"===this.dir?"left":"right"}"
                size="${m.medium}"
              ></store-icon>`:""}
          ${this.configuration===_.checkmark?this.renderCheckbox():""}
        </slot>
      </div>
    `}_renderContent(){return s`
      <div part="list-item__inner" class="list-item__inner">
        ${this._renderOptionalSlot("list-item__first",this._firstSlotEmpty)}
        ${this._renderLeadingSlot()}
        <div part="list-item__content" class="list-item__content">
          ${this._renderOptionalSlot("list-item__title",this._titleSlotEmpty)}
          ${this._renderOptionalSlot("list-item__subtext",this._subtextSlotEmpty)}
        </div>
        ${this._renderTrailingSlot()}
        ${this._renderOptionalSlot("list-item__last",this._lastSlotEmpty)}
      </div>
    `}_renderHeadingContent(){return s`
      <div part="heading-wrapper" class="heading-wrapper">
        <div part="text-block" class="text-block">
          <slot name="text-block"></slot>
        </div>
        <div part="divider" class="divider">
          <slot name="divider"></slot>
        </div>
      </div>
    `}updated(i){i.has("configuration")&&(this.trailing=this.configuration!==_.default),i.has("disabled")&&(this.ariaDisabled=this.disabled?"true":"false"),i.has("checked")&&this.configuration===_.checkmark&&this.setAttribute("aria-selected",this.checked?"true":"false")}render(){return this.size="small",this.configuration===_.checkmark?s` <label for=${this.checkboxId}> ${this._renderContent()} </label> `:this.configuration===_.heading?this._renderHeadingContent():this.configuration===_.option?s` <div part="option" class="option" tabindex="0">${this._renderContent()}</div> `:this.configuration===_.optionHighlight?s`
        <div part="option-highlight" class="option-highlight" tabindex="0">
          ${this._renderContent()}
        </div>
      `:this.selectable?this._renderContent():this.renderLink(this._renderContent())}};var L,B,D;C.shadowRootOptions={...a.shadowRootOptions,delegatesFocus:!0},C.styles=[...(L=C,B=C,D="styles",O(z(L),D,B)),c,x],j([l({reflect:!0})],C.prototype,"configuration",2),j([l({type:Boolean,reflect:!0})],C.prototype,"disabled",2),j([l({reflect:!0,attribute:"size"})],C.prototype,"itemSize",2),j([l({type:Boolean,reflect:!0})],C.prototype,"active",2),j([l({type:Boolean,reflect:!0})],C.prototype,"selectable",2),C=j([r(w)],C);export{C as M,_ as a,p as b,w as n};
