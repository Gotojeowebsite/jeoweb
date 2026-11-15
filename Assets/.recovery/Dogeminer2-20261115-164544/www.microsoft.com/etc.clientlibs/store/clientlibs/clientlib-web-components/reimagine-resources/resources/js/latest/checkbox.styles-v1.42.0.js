import{c as e,b as t,n as o,e as c,r,ab as l,i as s}from"./tag.const-v1.42.0.js";import"./util7-v1.42.0.js";import{s as a}from"./dropdown-trigger.const-v1.42.0.js";import{c as h}from"./vfi-v1.42.0.js";var i=Object.defineProperty,n=(e,t,o,c)=>{for(var r,l=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(l=r(t,o,l)||l);return l&&i(t,o,l),l};const b=r=>{class l extends r{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.indeterminate=!1,this.size="medium",this.checkboxId="default-checkbox-id",this.name=void 0,this.form=void 0,this.value=void 0,this.required=!1,this.ariaChecked="false",this.leadingLabel=!1,this.labelText=null,this._checkboxLabelSlotEmpty=!0,this._checkboxLabelBeforeSlotEmpty=!0,this._checkboxLabelAfterSlotEmpty=!0}_handleClick(e){if(this.disabled)return;this.checked=!this.checked,this.indeterminate=!1;const t=new CustomEvent(e.type,{bubbles:!0,composed:!0});this.dispatchEvent(t)}_getIconName(){return this.indeterminate?"subtract":this.checked?"checkmark":""}handleCheckboxSlotChange(){this._checkboxLabelSlotEmpty=0===this._checkboxLabelSlot.length,this._checkboxLabelBeforeSlotEmpty=0===this._checkboxLabelBeforeSlot.length,this._checkboxLabelAfterSlotEmpty=0===this._checkboxLabelAfterSlot.length}renderCheckboxLabelSlot(){return t`
        <div
          part="checkbox__label-before"
          class="checkbox__label-before"
          style=${this._checkboxLabelBeforeSlotEmpty?"display: none;":""}
        >
          <slot name="checkbox__label-before" @slotchange=${this.handleCheckboxSlotChange}></slot>
        </div>
        <span
          part="checkbox__label-text"
          class="checkbox__label-text"
          style=${this._checkboxLabelSlotEmpty?"display: none;":""}
        >
          <slot name="checkbox__label-text" @slotchange=${this.handleCheckboxSlotChange}></slot>
        </span>
        <div
          part="checkbox__label-after"
          class="checkbox__label-after"
          style=${this._checkboxLabelAfterSlotEmpty?"display: none;":""}
        >
          <slot name="checkbox__label-after" @slotchange=${this.handleCheckboxSlotChange}></slot>
        </div>
      `}renderCheckbox(){var e;const o=this._getIconName();this.indeterminate||this.removeAttribute("indeterminate"),this.labelText=null==(e=this.querySelector('[slot="checkbox__label-text"]'))?void 0:e.textContent;const c=this.value||this.labelText;return t`
        <label class="checkbox__label" for=${this.checkboxId}>
          ${this.leadingLabel?this.renderCheckboxLabelSlot():""}
          <input
            type="checkbox"
            class="checkbox__input"
            id=${this.checkboxId}
            @click=${this._handleClick}
            name=${this.name}
            .value=${c}
            ?checked=${this.checked}
            ?disabled=${this.disabled}
            ?required=${this.required}
            aria-checked=${this.checked}
          />
          <span class="checkbox__control">
            ${o&&t`<store-icon icon=${o} filled size=${this.size}></store-icon>`||""}
          </span>
          ${this.leadingLabel?"":this.renderCheckboxLabelSlot()}
        </label>
      `}}return n([o({type:Boolean,reflect:!0})],l.prototype,"checked"),n([o({type:Boolean})],l.prototype,"disabled"),n([o({type:Boolean})],l.prototype,"indeterminate"),n([o({type:String})],l.prototype,"size"),n([o({type:String,attribute:"id"})],l.prototype,"checkboxId"),n([o({type:String})],l.prototype,"name"),n([o({type:String})],l.prototype,"form"),n([o({type:String})],l.prototype,"value"),n([o({type:Boolean})],l.prototype,"required"),n([o({type:String,attribute:"aria-checked"})],l.prototype,"ariaChecked"),n([o({type:Boolean,attribute:"leading-label"})],l.prototype,"leadingLabel"),n([o({reflect:!1})],l.prototype,"labelText"),n([c({slot:"checkbox__label-text"})],l.prototype,"_checkboxLabelSlot"),n([e()],l.prototype,"_checkboxLabelSlotEmpty"),n([c({slot:"checkbox__label-before"})],l.prototype,"_checkboxLabelBeforeSlot"),n([e()],l.prototype,"_checkboxLabelBeforeSlotEmpty"),n([c({slot:"checkbox__label-after"})],l.prototype,"_checkboxLabelAfterSlot"),n([e()],l.prototype,"_checkboxLabelAfterSlotEmpty"),l},d="flex",k="var(--ds-spacing-s, 0.75rem)",x="304px",p="32px",_="var(--ds-spacing-xs, 0.5rem)",m="inline-flex",g="center",y="var(--ds-spacing-s, 0.75rem)",v="relative",f="inline-flex",u="center",$="center",S="var(--ds-theme-foreground-accent-subtle-normal, #2a446f)",L="var(--ds-radii-xs, var(--ds-spacing-2, 0.25rem))",C="var(--ds-border-width-s, 0.125rem)",w="solid",E="initial",B="2rem",z="2rem",A=s`
  /**
   * Default styles for the host element
   */
  :host {
    display: var(--ds-checkbox-display, ${r("flex")});
  }

  :host([appearance='filter-item']) {
    display: var(
      --ds-checkbox-filter-item-display,
      ${r(d)}
    );
    gap: var(--ds-checkbox-filter-item-gap, ${r(k)});
    width: var(--ds-checkbox-filter-item-width, ${r(x)});
    min-height: var(
      --ds-checkbox-filter-item-min-height,
      ${r(p)}
    );
    padding-inline-start: var(
      --ds-checkbox-filter-item-padding-inline-start,
      ${r(_)}
    );
  }

  /**
   * Styles for the label element
   */
  :host .checkbox__label {
    display: var(--ds-checkbox-label-display, ${r(m)});
    position: var(--ds-checkbox-label-position, ${r(v)});
    align-items: var(
      --ds-checkbox-label-align-items,
      ${r(g)}
    );
    gap: var(--ds-checkbox-label-gap, ${r(y)});
    font-weight: var(
      --ds-checkbox-label-font-weight,
      ${r(l.fontWeight)}
    );
    font-size: var(--ds-checkbox-label-font-size, ${r(l.fontSize)});
    line-height: var(
      --ds-checkbox-label-line-height,
      ${r(l.lineHeight)}
    );
    color: var(--ds-theme-foreground-base-subtle);
  }

  /**
   * Styles for the input element (visually hidden)
   */
  :host .checkbox__input {
    ${a};
  }

  /**
   * Styles for the checkbox control element
   */
  :host .checkbox__control {
    display: var(
      --ds-checkbox-control-display,
      ${r(f)}
    );
    align-items: var(
      --ds-checkbox-control-align-items,
      ${r(u)}
    );
    justify-content: var(
      --ds-checkbox-control-justify-content,
      ${r($)}
    );
    border-color: var(
      --ds-checkbox-control-border-color,
      ${r(S)}
    );
    width: var(
      --ds-checkbox-control-width,
      calc(
        ${r(B)} - calc(
            ${r(C)} * 2
          )
      )
    );
    height: var(
      --ds-checkbox-control-height,
      calc(
        ${r(z)} - calc(
            ${r(C)} * 2
          )
      )
    );
    border-style: var(
      --ds-checkbox-control-border-style,
      ${r(w)}
    );
    border-radius: var(
      --ds-checkbox-control-border-radius,
      ${r(L)}
    );
    border-width: var(
      --ds-checkbox-control-border-width,
      ${r(C)}
    );
    background-color: var(
      --ds-checkbox-control-background-color,
      ${r(E)}
    );
  }

  /**
   * Styles for checked and indeterminate states
   */
  :host([checked]) .checkbox__control,
  :host([indeterminate]) .checkbox__control {
    --ds-checkbox-control-background-color: var(--ds-theme-background-accent-strong-normal);
    --ds-checkbox-control-border-color: var(--ds-theme-background-accent-strong-normal);
  }

  /**
   * Icon color styling for checked and indeterminate states
   */
  :host([checked]) .checkbox__control store-icon,
  :host([indeterminate]) .checkbox__control store-icon {
    --ds-checkbox-control-background-color: var(--ds-theme-background-accent-strong-normal);
    --ds-icon-color: var(--ds-theme-background-base-neutral);
  }

  /**
   * Hover state styling for the checkbox control
   */
  :host .checkbox__control:hover {
    --ds-checkbox-control-border-color: var(--ds-theme-foreground-accent-subtle-hover);
  }

  /**
   * Hover state styling when checked or indeterminate
   */
  :host([checked]) .checkbox__control:hover,
  :host([indeterminate]) .checkbox__control:hover {
    --ds-checkbox-control-border-color: var(--ds-theme-background-accent-strong-normal);
  }

  /**
   * Small size adjustments for the checkbox control
   */
  :host([size='small']) .checkbox__control {
    --ds-checkbox-control-width: calc(
      1.5rem - calc(
          var(
              --ds-checkbox-control-border-width,
              ${r(C)}
            ) *
            2
        )
    );
    --ds-checkbox-control-height: calc(
      1.5rem - calc(
          var(
              --ds-checkbox-control-border-width,
              ${r(C)}
            ) *
            2
        )
    );
  }

  /**
   * Disabled state styles
   */
  :host([disabled]) .checkbox__control,
  :host([disabled]) ::slotted([slot='checkbox__label-text']) {
    opacity: 0.2;
  }

  :host([disabled]) .checkbox__control {
    cursor: not-allowed;
  }

  /**
   * Active state styling for the checkbox control
   */
  :host .checkbox__input:not([disabled]):active + .checkbox__control {
    --ds-checkbox-control-border-color: var(--ds-theme-border-accent-subtle-pressed);
  }

  /**
   * Active state styling for checked or indeterminate checkboxes
   */
  :host([checked]) .checkbox__input:not([disabled]):active + .checkbox__control,
  :host([indeterminate]) .checkbox__input:not([disabled]):active + .checkbox__control {
    --ds-checkbox-control-background-color: var(--ds-theme-background-accent-strong-pressed);
    --ds-checkbox-control-border-color: var(--ds-theme-background-accent-strong-pressed);
  }

  /**
   * Hidden label styling for accessibility (screen readers only)
   */
  :host([label-hidden]) {
    --ds-checkbox-label-gap: 0;
  }

  :host([label-hidden]) ::slotted([slot='checkbox__label-text']) {
    ${a};
  }

  /**
   * Focus state styling for the checkbox control
   */
  :host .checkbox__input:focus + .checkbox__control {
    ${h};
  }
`;export{b as C,A as s};
