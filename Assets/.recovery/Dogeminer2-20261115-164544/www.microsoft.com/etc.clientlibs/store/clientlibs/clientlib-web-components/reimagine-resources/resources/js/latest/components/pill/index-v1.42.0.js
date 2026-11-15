import{r as t,i as l,B as e,b as r,e as s,c as o,n as i,d as a}from"../../tag.const-v1.42.0.js";import{g as d}from"../../vfi-v1.42.0.js";import{b as n}from"../../utils-v1.42.0.js";import"../../util7-v1.42.0.js";import{S as p}from"../../secondary-nav-item.const-v1.42.0.js";const c="inline-flex",h="var(--ds-spacing-l, 1.5rem)",v="var(--ds-spacing-l, 1.5rem)",g="var(--ds-spacing-xs, 0.5rem)",u="transparent",b="solid",m="var(--ds-border-width-xs, 0.0625rem)",f="var(--ds-radii-circle, 12.5rem)",y="var(--ds-theme-foreground-accent-subtle-normal, #2a446f)",$="var(--ds-theme-background-accent-subtle-normal, #0078d4)",_="var(--ds-theme-foreground-accent-subtle-hover, #263e65)",S="var(--ds-theme-background-accent-subtle-hover, rgba(0, 85, 151, 0.4))",k="var(--ds-theme-foreground-accent-subtle-pressed, #0e1726)",w="var(--ds-theme-background-accent-subtle-pressed, #54a5e2)",x="var(--ds-theme-foreground-accent-subtle-selected, #ffffff)",B="var(--ds-theme-background-accent-subtle-selected, #005597)",E="-0.3px",j="center",O="600",z="0.9375rem",C="var(--ds-spacing-xs, 0.5rem)",P="auto",A=l`
  :host {
    ${n};

    display: var(--ds-pill-display, ${t(c)});
    text-align: var(--ds-pill-text-align, ${t(j)});
    letter-spacing: var(--ds-pill-letter-spacing, ${t(E)});
    font-weight: var(--ds-pill-font-weight, ${t(O)});
    font-size: var(--ds-pill-font-size, ${t(z)});
    gap: var(--ds-pill-gap, ${t(C)});
    padding-block: var(--ds-spacing-xs, ${t(g)});
    padding-inline-start: var(
      --ds-pill-padding-inline-start,
      ${t(h)}
    );
    padding-inline-end: var(
      --ds-pill-padding-inline-end,
      ${t(v)}
    );
    border-style: var(--ds-pill-border-style, ${t(b)});
    border-width: var(--ds-pill-border-width, ${t(m)});
    border-color: var(--ds-pill-border-color, ${t(u)});
    border-radius: var(--ds-pill-border-radius, ${t(f)});
    color: var(--ds-pill-color, ${t(y)});
    background-color: var(
      --ds-pill-background-color,
      ${t($)}
    );
    width: var(--ds-pill-width, ${t(P)});
  }

  :host button {
    ${n};
    background-color: transparent;
    color: inherit;
    text-align: inherit;
    letter-spacing: inherit;
    font-weight: inherit;
    font-size: inherit !important;
    gap: inherit;
    padding-block: 0;
    padding-inline-start: 0;
    padding-inline-end: 0;
    outline: none;
  }

  /* Apply the outer dotted line effect */
  :host([delegate-outline]:focus) {
    ${d};
  }

  :host:hover {
    --ds-pill-color: var(--ds-pill-hover-color, ${t(_)});
    --ds-pill-background-color: var(
      --ds-pill-hover-background-color,
      ${t(S)}
    );
  }

  :host:active {
    --ds-pill-color: var(--ds-pill-pressed-color, ${t(k)});
    --ds-pill-background-color: var(
      --ds-pill-pressed-background-color,
      ${t(w)}
    );
  }

  :host([disabled]) button {
    opacity: 0.2;
    pointer-events: none;
    cursor: pointer;
  }

  :host([active]) {
    --ds-pill-color: var(--ds-pill-active-color, ${t(x)});
    --ds-pill-background-color: var(
      --ds-pill-active-background-color,
      ${t(B)}
    );
  }

  @media (forced-colors: active) {
    :host([active]) {
      --ds-pill-background-color: highlight;
    }
  }

  :host([multi-select][active]) {
    --ds-pill-border-color: var(--ds-pill-multi-select-active-border-color, #2a446f);
    --ds-pill-padding-inline-end: var(--ds-spacing-xs, 0.5rem);
    --ds-pill-color: var(--ds-pill-color, ${t(y)});
    --ds-pill-background-color: var(
      --ds-pill-background-color,
      ${t($)}
    );
  }

  :host([multi-select])::part(pill_wrapper) {
    display: var(--ds-pill-wrapper-display, ${t(c)});
    gap: var(--ds-pill-wrapper-gap, ${t(C)});
  }
`;var D=Object.defineProperty,q=Object.getOwnPropertyDescriptor,F=(t,l,e,r)=>{for(var s,o=r>1?void 0:r?q(l,e):l,i=t.length-1;i>=0;i--)(s=t[i])&&(o=(r?s(l,e,o):s(o))||o);return r&&o&&D(l,e,o),o};const G="store-pill";let H=class extends(e(p)){constructor(){super(...arguments),this._firstSlotEmpty=!0,this._lastSlotEmpty=!0,this.active=!1,this.disabled=!1,this.multiSelect=!1,this.delegateOutline=!1,this.asButton=!1}_handleSlotChange(){this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length}render(){const t=r`
      <span
        part="pill__first"
        class="pill__first"
        style="${this._firstSlotEmpty?"display: none":""}"
      >
        <slot name="pill__first" @slotchange="${this._handleSlotChange}"></slot>
      </span>
      <slot></slot>
      ${this.active&&this.multiSelect?r`<store-icon icon="dismiss-circle" filled size="large"></store-icon>`:""}
      <span
        part="pill__last"
        class="pill__last"
        style="${this._lastSlotEmpty?"display: none":""}"
      >
        <slot name="pill__last" @slotchange="${this._handleSlotChange}"></slot>
      </span>
    `;return this.asButton?this.renderButton(t):r`<div part="pill_wrapper" class="pill_wrapper">${t}</div>`}};H.styles=[A],F([s({slot:"pill__first"})],H.prototype,"_firstSlot",2),F([s({slot:"pill__last"})],H.prototype,"_lastSlot",2),F([o()],H.prototype,"_firstSlotEmpty",2),F([o()],H.prototype,"_lastSlotEmpty",2),F([i({reflect:!0,type:Boolean})],H.prototype,"active",2),F([i({reflect:!0,type:Boolean})],H.prototype,"disabled",2),F([i({reflect:!0,type:Boolean,attribute:"multi-select"})],H.prototype,"multiSelect",2),F([i({type:Boolean,reflect:!0,attribute:"delegate-outline"})],H.prototype,"delegateOutline",2),F([i({reflect:!0,type:Boolean,attribute:"as-button"})],H.prototype,"asButton",2),H=F([a(G)],H);export{H as Pill,G as name};
