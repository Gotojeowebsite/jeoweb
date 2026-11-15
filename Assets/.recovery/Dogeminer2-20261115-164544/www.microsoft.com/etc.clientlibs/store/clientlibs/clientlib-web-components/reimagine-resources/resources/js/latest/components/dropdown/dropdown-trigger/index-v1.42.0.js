import{r as o,i as r,W as t,B as e,b as i,y as n,n as d,c as s,d as a}from"../../../tag.const-v1.42.0.js";import{D as p}from"../../../dropdown-trigger.const-v1.42.0.js";import{s as l}from"../../../surface.styles-v1.42.0.js";import{b as c}from"../../../utils-v1.42.0.js";import{c as g}from"../../../vfi-v1.42.0.js";import{t as u}from"../../../video-autoplay-controller-v1.42.0.js";import{B as b,c as v,b as h}from"../../../pagination-item.const-v1.42.0.js";import"../../input/input/index-v1.42.0.js";import"../../../util1-v1.42.0.js";import{S as f}from"../../../secondary-nav-item.const-v1.42.0.js";const w={display:"block",background:l.background,backdropFilter:l.backdropFilter,borderWidth:l.borderWidth,borderStyle:l.borderStyle,borderColor:l.borderColor,borderRadius:"var(--ds-radii-m, 0.5rem)",boxShadow:t["level-2"].value.join(", "),color:"var(--ds-theme-foreground-base-subtle, #17253d)",paddingInlineStart:"var(--ds-spacing-m, 1rem)",paddingInlineEnd:"var(--ds-spacing-s, 0.75rem)",paddingBlock:"var(--ds-spacing-s, 0.75rem)",gap:"var(--ds-spacing-xs, 0.5rem)",hoverBoxShadow:t["level-3"].value.join(", "),iconTransform:"rotate(0deg)",iconTransition:"transform 0.6s ease",vfiOutlineOffset:"0"},m=r`
  :host([configuration='${o(p.input)}']) {
    display: var(--ds-dropdown-trigger-display, ${o(w.display)});
  }

  :host([configuration='${o(p.buttonSelect)}']) {
    display: var(--ds-dropdown-trigger-display, inline-block);
  }

  button {
    ${c}

    display: flex;
    width: 100%;
    text-align: start;
    background: var(--ds-dropdown-trigger-background, ${o(w.background)});
    backdrop-filter: var(
      --ds-dropdown-trigger-backdrop-filter,
      ${o(w.backdropFilter)}
    );
    border-width: var(
      --ds-dropdown-trigger-border-width,
      ${o(w.borderWidth)}
    );
    border-style: var(
      --ds-dropdown-trigger-border-style,
      ${o(w.borderStyle)}
    );
    border-color: var(
      --ds-dropdown-trigger-border-color,
      ${o(w.borderColor)}
    );
    border-radius: var(
      --ds-dropdown-trigger-border-radius,
      ${o(w.borderRadius)}
    );
    box-shadow: var(--ds-dropdown-trigger-box-shadow, ${o(w.boxShadow)});
    color: var(--ds-dropdown-trigger-color, ${o(w.color)});
    padding-inline-start: var(
      --ds-dropdown-trigger-padding-inline-start,
      ${o(w.paddingInlineStart)}
    );
    padding-inline-end: var(
      --ds-dropdown-trigger-padding-inline-end,
      ${o(w.paddingInlineEnd)}
    );
    padding-block: var(
      --ds-dropdown-trigger-padding-block,
      ${o(w.paddingBlock)}
    );
    gap: var(--ds-dropdown-trigger-gap, ${o(w.gap)});
    outline: 2px solid transparent;
  }

  store-input {
    width: 100%;
  }

  store-input::part(input__trailing) {
    display: flex;
    align-self: flex-end;
  }

  :host(:hover) {
    cursor: pointer;
  }

  :host(:hover) button,
  :host(:focus) button {
    box-shadow: var(
      --ds-dropdown-trigger-hover-box-shadow,
      ${o(w.hoverBoxShadow)}
    );
  }

  :host(:focus) button {
    ${g}

    outline-offset: var(
      --ds-dropdown-trigger-vfi-outline-offset,
      ${o(w.vfiOutlineOffset)}
    );
  }

  :host([disabled]) {
    pointer-events: none;
  }

  :host([disabled][configuration='${o(p.input)}']) {
    opacity: 0.2;
  }

  .dropdown-trigger__icon {
    transform: var(
      --ds-dropdown-trigger-icon-transform,
      ${o(w.iconTransform)}
    );

    ${u(`var(--ds-dropdown-trigger-icon-transition, ${o(w.iconTransition)})`)}
  }
`;var $=Object.defineProperty,y=Object.getOwnPropertyDescriptor,_=(o,r,t,e)=>{for(var i,n=e>1?void 0:e?y(r,t):r,d=o.length-1;d>=0;d--)(i=o[d])&&(n=(e?i(r,t,n):i(n))||n);return e&&n&&$(r,t,n),n};const x="store-dropdown-trigger";let S=class extends(e(f)){constructor(){super(...arguments),this.configuration=p.input,this.buttonActive=!1,this.triggerLabel=null,this.buttonAppearance=b.buttonSecondary}_renderInput(){const o=this.iconColor?`--ds-icon-color: ${this.iconColor}`:"";return this.renderButton(i`
      <store-input>
        <slot name="dropdown-trigger__input-label" slot="input__control-label"></slot>
        <slot slot="input__control-input"></slot>
        <store-icon
          slot="input__trailing"
          icon="chevron-down"
          size="${this.iconSize||"medium"}"
          class="dropdown-trigger__icon"
          part="dropdown-trigger__icon"
          style="${o}"
        ></store-icon>
      </store-input>
    `)}_renderButtonSelect(){const o=this.iconColor?`--ds-icon-color: ${this.iconColor}`:"";return i`
      <store-button
        with-icon-append
        appearance=${this.buttonAppearance}
        ?disabled=${this.disabled}
        ?active=${this.buttonActive}
        shape=${v.rounded}
        size=${h.medium}
        button-label="${n(this.triggerLabel||void 0)}"
      >
        <slot slot="button__text"></slot>
        <store-icon
          slot="button__icon-append"
          icon="chevron-down"
          size="${this.iconSize||"medium"}"
          class="dropdown-trigger__icon"
          part="dropdown-trigger__icon"
          style="${o}"
        ></store-icon>
      </store-button>
    `}render(){return this.configuration===p.buttonSelect?this._renderButtonSelect():this._renderInput()}};S.shadowRootOptions={...f.shadowRootOptions,delegatesFocus:!0},S.styles=[m],_([d({reflect:!0})],S.prototype,"configuration",2),_([s()],S.prototype,"buttonActive",2),_([d()],S.prototype,"iconSize",2),_([d({attribute:"icon-color"})],S.prototype,"iconColor",2),_([d({reflect:!0,attribute:"trigger-label"})],S.prototype,"triggerLabel",2),_([s()],S.prototype,"buttonAppearance",2),S=_([a(x)],S);export{S as DropdownTrigger,x as name};
