import{r as t,o as n,ac as o,i,n as e,e as l,c as s,b as r,I as a,J as p,y as d,a9 as u,d as c}from"../../../tag.const-v1.42.0.js";import{S as h}from"../../../secondary-nav-item.const-v1.42.0.js";import{s as _}from"../../../dropdown-trigger.const-v1.42.0.js";import{s as v}from"../../../surface.styles-v1.42.0.js";import{b,B as g,c as y}from"../../../pagination-item.const-v1.42.0.js";import{a as m}from"../../../util7-v1.42.0.js";import"../../../util1-v1.42.0.js";const f="center",S="space-between",$="var(--ds-spacing-xs)",E="var(--ds-spacing-s)",k="var(--ds-spacing-m)",w="var(--ds-spacing-s)",x="var(--ds-spacing-s)",z="var(--ds-radii-m)",C="var(--ds-elevation-level-2)",j="flex",O="column",L="var(--ds-spacing-3xs)",B="1",D="flex",H="column",P="var(--ds-theme-foreground-base-highlight)",q="none",A="24px",I="0.8",K="var(--ds-theme-foreground-base-subtle, #17253d)",M="0rem",W="0rem",J="0rem",R="0rem",F="0rem",G=i`
  :host {
    display: var(--ds-input-display, ${t("flex")});
    align-items: var(--ds-input-align-items, ${t(f)});
    gap: var(--ds-input-gap, ${t($)});
    justify-content: var(--ds-input-justify-content, ${t(S)});
  }

  :host([contained]) {
    background: var(--ds-input-contained-background, ${t(v.background)});
    border-style: var(
      --ds-input-contained-border-style,
      ${t(v.borderStyle)}
    );
    border-color: var(
      --ds-input-contained-border-color,
      ${t(v.borderColor)}
    );
    padding-inline-start: var(
      --ds-input-contained-padding-inline-start,
      ${t(k)}
    );
    padding-inline-end: var(
      --ds-input-contained-padding-inline-end,
      ${t(E)}
    );
    padding-block-start: var(
      --ds-input-contained-padding-block-start,
      ${t(x)}
    );
    padding-block-end: var(
      --ds-input-contained-padding-block-end,
      ${t(w)}
    );
    border-radius: var(
      --ds-input-contained-border-radius,
      ${t(z)}
    );
    box-shadow: var(
      --ds-input-contained-box-shadow,
      ${t(C)}
    );
  }

  :host(:focus) {
    outline: none !important;
  }

  :host::part(input__control) {
    display: var(--ds-input-control-display, ${t(j)});
    flex-direction: var(
      --ds-input-control-flex-direction,
      ${t(O)}
    );
    gap: var(--ds-input-control-gap, ${t(L)});
    flex-grow: var(
      --ds-input-control-flex-grow,
      ${t(B)}
    );
  }

  .input__control-label,
  ::slotted([slot='input__control-label']) {
    display: var(
      --ds-input-control-label-display,
      ${t(D)}
    );
    flex-direction: var(
      --ds-input-control-label-flex-direction,
      ${t(H)}
    );
    color: var(--ds-input-control-label-color, ${t(P)});
    font-size: var(
      --ds-input-label-font-size,
      ${t(n.fontSize)}
    ) !important;
    font-weight: var(
      --ds-input-label-font-weight,
      ${t(n.fontWeight)}
    );
    line-height: var(
      --ds-input-label-line-height,
      ${t(n.lineHeight)}
    );
  }

  .input__control-input,
  ::slotted([slot='input__control-input']) {
    display: var(--ds-input-control-input-displ, 'flex');
    width: var(--ds-input-control-input-width, 100%);
    overflow: var(--ds-input-control-input-overflow, initial);
    text-overflow: var(--ds-input-control-input-text-overflow, ellipsis);
    border: var(
      --ds-input-control-input-border,
      ${t(q)}
    );
    background: var(--ds-input-control-input-background, 'none');
    color: var(
      --ds-input-control-input-color,
      ${t(K)}
    );
    font-size: var(
      --ds-input-control-input-font-size,
      ${t(o.fontSize)}
    );
    font-weight: var(
      --ds-input-control-input-font-weight,
      ${t(o.fontWeight)}
    );
    line-height: var(
      --ds-input-control-input-line-height,
      ${t(o.lineHeight)}
    );
    height: var(
      --ds-input-control-input-height,
      ${t(A)}
    );
    padding-inline-start: var(
      --ds-input-control-input-inline-start,
      ${t(M)}
    );
    padding-inline-end: var(
      --ds-input-control-input-inline-end,
      ${t(W)}
    );
    padding-block-start: var(
      --ds-input-control-input-block-start,
      ${t(J)}
    );
    padding-block-end: var(
      --ds-input-control-input-block-end,
      ${t(R)}
    );
    outline-offset: var(
      --ds-input-control-input-outline-offset,
      ${t(F)}
    );
  }

  ::slotted([slot='input__control-input'])::placeholder {
    color: var(--ds-input-control-input-color);
    opacity: var(
      --ds-input-control-input-opacity,
      ${t(I)}
    );
  }

  :host(:focus) ::slotted([slot='input__control-input'])::placeholder,
  :host(:active) ::slotted([slot='input__control-input'])::placeholder,
  :host(:hover) ::slotted([slot='input__control-input'])::placeholder {
    --ds-input-control-input-opacity: 1;
  }

  :host([label-hidden]) ::slotted([slot='input__control-label']) {
    ${_};
  }

  :host([disabled]) {
    opacity: 0.2;
    cursor: not-allowed;
    pointer-events: none;
  }
`;var N=Object.defineProperty,Q=Object.getOwnPropertyDescriptor,T=(t,n,o,i)=>{for(var e,l=i>1?void 0:i?Q(n,o):n,s=t.length-1;s>=0;s--)(e=t[s])&&(l=(i?e(n,o,l):e(l))||l);return i&&l&&N(n,o,l),l};const U="store-input";let V=class extends h{constructor(){super(...arguments),this.buttonSize=b.small,this._firstSlotEmpty=!0,this._lastSlotEmpty=!0,this._leadingSlotEmpty=!0,this._inputLabelSlotEmpty=!0,this._inputElementSlotEmpty=!0,this._inputEvents=[],this._handleClick=()=>{const t=this._inputElementSlot[0].value,n=new CustomEvent(u.submit,{detail:{value:t}});this.dispatchEvent(n)},this._handleKeyDown=t=>{"Enter"===t.key&&this._handleClick()}}_handleSlotChange(){this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length,this._leadingSlotEmpty=0===this._leadingSlot.length,this._inputLabelSlotEmpty=0===this._inputLabelSlot.length,this._inputElementSlotEmpty=0===this._inputElementSlot.length}updated(t){var n,o;this._leadingSlotEmpty||this._leadingSlot[0].setAttribute("size","xs"),t.has("size")&&(null==(o=null==(n=this.shadowRoot)?void 0:n.querySelector("store-button"))||o.setAttribute("size",this.buttonSize))}_renderOptionalSlot(t,n){return r`
      <div part=${t} class=${t} style="${n?"display: none;":""}">
        <slot name=${t} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}connectedCallback(){super.connectedCallback();const t=this.querySelector("store-button");this._inputEvents.push({el:t??this,type:"click",handler:this._handleClick},{el:this,type:"keydown",handler:this._handleKeyDown}),a(this._inputEvents)}disconnectedCallback(){super.disconnectedCallback(),p(this._inputEvents)}_buildMarkup(){return r`
      ${this._renderOptionalSlot("input__first",this._firstSlotEmpty)}
      ${this._renderOptionalSlot("input__leading",this._leadingSlotEmpty)}

      <div class="input__control" part="input__control">
        <slot></slot>
        ${this._renderOptionalSlot("input__control-label",this._inputLabelSlotEmpty)}
        ${this._renderOptionalSlot("input__control-input",this._inputElementSlotEmpty)}
      </div>

      <div part="input__trailing" class="input__trailing" @slotchange="${this._handleSlotChange}">
        <slot name="input__trailing">
          <store-button
            size="${this.buttonSize}"
            appearance="${g.buttonPrimary}"
            shape="${y.rounded}"
            icon-only
            button-label="${d(this.inputButtonLabel)}"
          >
            <store-icon
              slot="button__icon"
              size="${m.medium}"
              icon="search"
              role="presentation"
              aria-hidden="true"
            >
            </store-icon>
          </store-button>
        </slot>
      </div>

      ${this._renderOptionalSlot("input__last",this._lastSlotEmpty)}
    `}render(){return this._buildMarkup()}};V.styles=[G],T([e({reflect:!0,attribute:"input-button-label"})],V.prototype,"inputButtonLabel",2),T([e({reflect:!0,attribute:"label-hidden"})],V.prototype,"labelHidden",2),T([e({reflect:!0})],V.prototype,"contained",2),T([e({reflect:!0,attribute:"button-size"})],V.prototype,"buttonSize",2),T([l({slot:"input__first"})],V.prototype,"_firstSlot",2),T([l({slot:"input__last"})],V.prototype,"_lastSlot",2),T([l({slot:"input__leading"})],V.prototype,"_leadingSlot",2),T([l({slot:"input__control-label"})],V.prototype,"_inputLabelSlot",2),T([l({slot:"input__control-input"})],V.prototype,"_inputElementSlot",2),T([s()],V.prototype,"_firstSlotEmpty",2),T([s()],V.prototype,"_lastSlotEmpty",2),T([s()],V.prototype,"_leadingSlotEmpty",2),T([s()],V.prototype,"_inputLabelSlotEmpty",2),T([s()],V.prototype,"_inputElementSlotEmpty",2),T([s()],V.prototype,"_inputEvents",2),V=T([c(U)],V);export{V as Input,U as name};
