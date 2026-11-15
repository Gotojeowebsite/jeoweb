import{r as t,ap as o,i as e,_ as r,B as n,L as a,b as d,n as s,d as i}from"./tag.const-v1.42.0.js";import{b as l}from"./utils-v1.42.0.js";import{l as b,F as u}from"./fill-color.mixin-v1.42.0.js";import{d as c,s as p,h,i as g,j as m}from"./spacing-tokens.const-v1.42.0.js";import{k as v}from"./pagination-item.const-v1.42.0.js";import"./util7-v1.42.0.js";import{S as f}from"./secondary-nav-item.const-v1.42.0.js";const y={display:"inline-flex",justifyContent:"center",alignItems:"center",backgroundColor:"var(--ds-theme-background-accent-strong-normal, #0067b8)",minWidth:"3rem",minHeight:"3rem",maxHeight:"none",borderColor:"var(--ds-color-transparent, transparent)",borderStyle:"solid",color:"var(--ds-theme-foreground-accent-strong-normal, #fff)",textDecoration:"none",borderWidth:"0",gap:"0.75rem",boxShadow:"var(--ds-depth-none, 0 0 0 0 rgba(0, 0, 0, 0.12), 0 0 0 0 rgba(0, 0, 0, 0.12))",borderRadius:"var(--ds-radii-xs, 0.25rem)",outline:"0.1875rem dotted currentcolor",outlineOffset:"-0.375rem",opacity:"1",cursor:"pointer",pointerEvents:"auto",paddingInlineEnd:`${t(p)}`,paddingInlineStart:`${t(p)}`,paddingBlockEnd:`${t(c)}`,paddingBlockStart:`${t(c)}`,boxSizing:"border-box",width:"auto",wordBreak:"initial",overflow:"initial",overflowClipMargin:"initial",textOverflow:"initial",whiteSpace:"initial",textAlign:"center"},$=e`
  button,
  ::slotted(button) {
    ${l};
  }

  a,
  ::slotted(a) {
    ${b};
  }

  :host,
  ::slotted(button),
  ::slotted(a) {
    display: var(--ds-button-host-display, initial);
    width: var(--ds-button-width, ${t(y.width)});
  }

  :host button,
  :host a,
  :host span,
  :host div,
  ::slotted(button),
  ::slotted(a) {
    justify-content: var(--ds-button-justify-content, ${t(y.justifyContent)});
    align-items: var(--ds-button-align-items, ${t(y.alignItems)});
    display: var(--ds-button-display, ${t(y.display)});
    border-style: var(--ds-button-border-style-solid, ${t(y.borderStyle)});
    text-decoration: var(--ds-button-text-decoration, ${t(y.textDecoration)});
    border-width: var(--ds-button-border-width, ${t(y.borderWidth)});
    box-sizing: var(--ds-button-box-sizing, ${t(y.boxSizing)});
    min-width: var(--ds-button-min-width, ${t(y.minWidth)});
    min-height: var(--ds-button-min-height, ${t(y.minHeight)});
    max-height: var(--ds-button-max-height, ${t(y.maxHeight)});
    gap: var(--ds-button-gap, ${t(y.gap)});
    box-shadow: var(--ds-button-box-shadow, ${t(y.boxShadow)});
    font-weight: var(--ds-button-font-weight, ${t(o.fontWeight)});
    font-size: var(--ds-button-font-size, ${t(o.fontSize)});
    line-height: var(--ds-button-line-height, ${t(o.lineHeight)});
    letter-spacing: var(
      --ds-button-letter-spacing,
      ${t(o.letterSpacing)}
    );
    word-break: var(--ds-button-word-break, ${t(y.wordBreak)});
    padding-inline-start: var(
      --ds-button-padding-inline-start,
      calc(${t(y.paddingInlineStart)} + 1px)
    );
    padding-inline-end: var(
      --ds-button-padding-inline-end,
      calc(${t(y.paddingInlineEnd)} + 1px)
    );
    padding-block-start: var(
      --ds-button-padding-block-start,
      ${t(y.paddingBlockStart)}
    );
    padding-block-end: var(
      --ds-button-padding-block-end,
      ${t(y.paddingBlockEnd)}
    );
    background-color: var(
      --ds-button-background-color,
      ${t(y.backgroundColor)}
    );
    color: var(
      --ds-text-color-override,
      var(--ds-button-color, ${t(y.color)})
    ) !important;
    border-color: var(--ds-button-border-color, ${t(y.borderColor)});
    border-radius: var(--ds-button-border-radius, ${t(y.borderRadius)});
    cursor: var(--ds-button-cursor, ${t(y.cursor)});
    pointer-events: var(--ds-button-pointer-events, ${t(y.pointerEvents)});
    opacity: var(--ds-button-opacity, ${t(y.opacity)});
    width: var(--ds-button-width, ${t(y.width)});
    overflow: var(--ds-button-overflow, ${t(y.overflow)});
    overflow-clip-margin: var(
      --ds-button-overflow-clip-margin,
      ${t(y.overflowClipMargin)}
    );
    text-overflow: var(--ds-button-text-overflow, ${t(y.textOverflow)});
    white-space: var(--ds-button-white-space, ${t(y.whiteSpace)});
    text-align: var(--ds-button-text-align, ${t(y.textAlign)});

    --ds-icon-color: var(--ds-button-icon-color, var(--ds-button-color));
  }

  :host([full-width]) {
    width: 100%;
  }

  :host([full-width]) button,
  :host([full-width]) a,
  :host([full-width]) span,
  :host([full-width]) div,
  :host([full-width]) ::slotted(button),
  :host([full-width]) ::slotted(a) {
    width: 100%;
  }

  :host(:focus) button,
  :host(:focus) a,
  ::slotted(button:focus),
  ::slotted(a:focus) {
    outline: var(--ds-button-outline, ${t(y.outline)});
    outline-offset: var(--ds-button-outline-offset, ${t(y.outlineOffset)});
  }

  :host([appearance='button--primary']) {
    --ds-button-color: var(--ds-theme-foreground-accent-strong-normal, #fff) !important;
    --ds-button-background-color: var(--ds-theme-background-accent-strong-normal, #0067b8);
    --ds-button-border-color: var(--ds-color-transparent, transparent);
  }

  :host([appearance='button--primary']:hover:not([disabled])) {
    --ds-button-background-color: var(--ds-theme-background-accent-strong-hover, #006dc1);
  }

  :host([appearance='button--primary']:active:not([disabled])),
  :host([appearance='button--primary'][active]:not([disabled])) {
    --ds-button-background-color: var(--ds-theme-background-accent-strong-pressed, #004275);
  }

  :host([appearance='button--secondary']) {
    --ds-button-border-width: 0.125rem;
    --ds-button-background-color: var(--ds-color-transparent, transparent);
    --ds-button-color: var(--ds-theme-foreground-accent-subtle-normal, #2a446f) !important;
    --ds-button-border-color: var(--ds-theme-border-accent-subtle-normal, #2a446f);
    --ds-button-padding-inline-start: calc(
      ${t(y.paddingInlineStart)} - calc(var(--ds-button-border-width) / 2)
    );
    --ds-button-padding-inline-end: calc(
      ${t(y.paddingInlineEnd)} - calc(var(--ds-button-border-width) / 2)
    );
    --ds-button-padding-block-start: calc(
      ${t(y.paddingBlockStart)} - calc(var(--ds-button-border-width) / 2)
    );
    --ds-button-padding-block-end: calc(
      ${t(y.paddingBlockStart)} - calc(var(--ds-button-border-width) / 2)
    );
  }

  :host([appearance='button--secondary']:active),
  :host([appearance='button--secondary'][active]) {
    --ds-button-color: var(--ds-theme-foreground-accent-subtle-pressed, #17253d) !important;
    --ds-button-border-color: var(--ds-theme-border-accent-subtle-pressed, #17253d);
  }

  :host([appearance='button--tertiary']) {
    --ds-button-background-color: var(--ds-color-neutral-bright-lime, #89c402);
    --ds-button-color: var(--ds-color-neutral-black, #000) !important;
    --ds-button-border-color: transparent;
  }

  :host([appearance='button--tertiary']:hover) {
    --ds-button-background-color: rgba(137, 196, 2, 0.8);
  }

  :host([appearance='button--tertiary']:active),
  :host([appearance='button--tertiary'][active]) {
    --ds-button-background-color: rgba(137, 196, 2, 0.5);
  }

  :host([appearance='button--ghost']) {
    --ds-button-background-color: transparent;
    --ds-button-color: var(
      --ds-button-ghost-color,
      var(--ds-theme-foreground-accent-subtle-normal, #2a446f)
    ) !important;
    --ds-button-border-color: transparent;
  }

  :host([appearance='button--ghost']:hover) {
    --ds-button-background-color: var(
      --ds-button-ghost-hover-background-color,
      var(--ds-theme-background-accent-subtle-normal, rgba(0, 85, 151, 0.15))
    );
    --ds-button-color: var(
      --ds-button-ghost-hover-color,
      var(--ds-theme-foreground-accent-subtle-hover, #263e65)
    ) !important;
  }

  :host([appearance='button--ghost']:active),
  :host([appearance='button--ghost'][active]) {
    --ds-button-color: var(
      --ds-button-ghost-pressed-color,
      var(--ds-theme-foreground-accent-subtle-pressed, #17253d)
    ) !important;
  }

  :host([disabled]) {
    --ds-button-opacity: 0.2;
    --ds-button-pointer-events: none;
    --ds-button-cursor: pointer;
  }

  :host([size='medium']) {
    --ds-button-min-height: 2.5rem;
    --ds-button-gap: var(--ds-button-medium-gap, ${t(h)});
    --ds-button-padding-inline-start: var(
      --ds-button-medium-padding-inline-start,
      ${t(p)}
    );
    --ds-button-padding-inline-end: var(
      --ds-button-medium-padding-inline-end,
      ${t(p)}
    );
    --ds-button-padding-block-start: var(
      --ds-button-medium-padding-block-start,
      ${t(h)}
    );
    --ds-button-padding-block-end: var(
      --ds-button-medium-padding-block-end,
      ${t(h)}
    );
  }

  :host([appearance='button--secondary'][size='medium']) {
    --ds-button-padding-inline-start: calc(
      ${t(p)} - calc(var(--ds-button-border-width) / 2)
    );
    --ds-button-padding-inline-end: calc(
      ${t(p)} - calc(var(--ds-button-border-width) / 2)
    );
    --ds-button-padding-block-start: calc(
      ${t(h)} - calc(var(--ds-button-border-width) / 2)
    );
    --ds-button-padding-block-end: calc(
      ${t(h)} - calc(var(--ds-button-border-width) / 2)
    );
  }

  :host([size='medium']) button,
  :host([size='medium']) a,
  :host([size='medium']) span,
  :host([size='medium']) div,
  :host([size='medium']) ::slotted(button),
  :host([size='medium']) ::slotted(a) {
    --ds-button-min-width: 2.5rem;
  }

  :host([size='small']) {
    --ds-button-min-height: 2rem;
    --ds-button-gap: ${t(g)};
    --ds-button-padding-inline-start: ${t(c)};
    --ds-button-padding-inline-end: ${t(c)};
    --ds-button-padding-block-start: ${t(g)};
    --ds-button-padding-block-end: ${t(g)};
  }

  :host([appearance='button--secondary'][size='small']) {
    --ds-button-padding-inline-start: calc(
      ${t(c)} - calc(var(--ds-button-border-width) / 2)
    );
    --ds-button-padding-inline-end: calc(
      ${t(c)} - calc(var(--ds-button-border-width) / 2)
    );
    --ds-button-padding-block-start: calc(
      ${t(g)} - calc(var(--ds-button-border-width) / 2)
    );
    --ds-button-padding-block-end: calc(
      ${t(g)} - calc(var(--ds-button-border-width) / 2)
    );
  }

  :host([size='small']) button,
  :host([size='small']) a,
  :host([size='small']) span,
  :host([size='small']) div,
  :host([size='small']) ::slotted(button),
  :host([size='small']) ::slotted(a) {
    --ds-button-min-width: 2rem;
  }

  :host([shape='rounded']) {
    --ds-button-border-radius: var(--ds-radii-s, 0.5rem) !important;
  }

  :host([shape='circle']) {
    --ds-button-border-radius: var(--ds-radii-circle, 12.5rem) !important;
  }

  :host([appearance='button--tag']) {
    --ds-button-min-height: 1.875rem;
    --ds-button-background-color: var(
      --ds-theme-background-accent-subtle-normal,
      rgba(0, 85, 151, 0.15)
    );
    --ds-button-color: var(--ds-theme-foreground-accent-subtle-normal, #2a446f) !important;
    --ds-button-border-color: transparent;
    --ds-button-border-radius: var(--ds-radii-xs);
    --ds-button-padding-inline-start: ${t(p)};
    --ds-button-padding-inline-end: ${t(p)};
    --ds-button-padding-block-start: ${t(g)};
    --ds-button-padding-block-end: ${t(g)};
    --ds-button-font-size: var(--ds-label-m-font-size, 0.875rem);
    --ds-button-font-weight: var(--ds-label-m-font-weight, 600);
    --ds-button-line-height: var(--ds-label-m-line-height, 1.25rem);
  }

  :host([appearance='button--tag'][size='small']) {
    --ds-button-min-height: 1.25rem;
    --ds-button-padding-inline-start: ${t(g)};
    --ds-button-padding-inline-end: ${t(g)};
    --ds-button-padding-block-start: ${t(m)};
    --ds-button-padding-block-end: ${t(m)};
    --ds-button-font-size: var(--ds-label-s-font-size, 0.75rem);
    --ds-button-font-weight: var(--ds-label-s-font-weight, 600);
    --ds-button-line-height: var(--ds-label-s-line-height, 1rem);
  }

  :host([appearance='button--tag']:hover) {
    --ds-button-background-color: var(
      --ds-theme-background-accent-subtle-hover,
      rgba(0, 85, 151, 0.4)
    );
    --ds-button-color: var(--ds-theme-foreground-accent-subtle-hover, #263e65) !important;
    --ds-button-text-decoration: underline;
  }

  :host([appearance='button--tag']:active),
  :host([appearance='button--tag'][active]) {
    --ds-button-background-color: var(--ds-theme-background-accent-strong-pressed, #004275);
    --ds-button-color: var(--ds-theme-foreground-accent-strong-pressed, #fff) !important;
  }

  :host([icon-only]),
  :host([shape='circle']) {
    --ds-button-padding-inline-start: 0.75rem;
    --ds-button-padding-inline-end: 0.75rem;
    --ds-button-padding-block-start: 0.875rem;
    --ds-button-padding-block-end: 0.875rem;
  }

  :host([icon-only]) {
    --ds-button-max-height: 3rem;
  }

  :host([icon-only][size='medium']) {
    --ds-button-max-height: 2.5rem;
    --ds-button-padding-inline-start: 0.5rem;
    --ds-button-padding-inline-end: 0.5rem;
    --ds-button-padding-block-start: 0.75rem;
    --ds-button-padding-block-end: 0.75rem;
  }

  :host([icon-only][size='small']) {
    --ds-button-max-height: 2rem;
    --ds-button-padding-inline-start: 0.25rem;
    --ds-button-padding-inline-end: 0.25rem;
    --ds-button-padding-block-start: 0.5rem;
    --ds-button-padding-block-end: 0.5rem;
  }

  :host([icon-only]) ::slotted([slot='button__text']) {
    position: absolute;
    overflow: hidden;
    width: 1rem;
    height: 1rem;
    clip: rect(1px, 1px, 1px, 1px);
  }

  :host([fill-color]) {
    --ds-button-background-color: var(
      --ds-fill-color-override,
      ${t(y.backgroundColor)}
    );
    border-radius: var(--ds-button-border-radius, ${t(y.borderRadius)});
  }

  :host([fill-color]:hover),
  :host([appearance][fill-color]:hover) {
    --ds-button-background-color: hsl(from var(--ds-fill-color-override) h 80% l / 100%);
  }

  :host([fill-color]:active),
  :host([appearance][fill-color]:active) {
    --ds-button-background-color: hsl(from var(--ds-fill-color-override) h s 30% / 100%);
  }

  /* High contrast mode */
  @media (forced-colors: active) {
    /* All buttons get borders by default */
    :host button,
    :host a,
    :host span,
    :host div {
      border: var(--ds-border-width-s, 0.125rem) solid;
    }

    /* Secondary buttons get dotted borders */
    :host([appearance='button--secondary']) button,
    :host([appearance='button--secondary']) a,
    :host([appearance='button--secondary']) span,
    :host([appearance='button--secondary']) div,
    :host([appearance='button--secondary']) ::slotted(button),
    :host([appearance='button--secondary']) ::slotted(a) {
      border: var(--ds-border-width-s, 0.125rem) dotted;
    }
  }

  :host([light-dom]) ::slotted(a),
  :host([light-dom]) ::slotted(button) {
    color: var(
      --ds-text-color-override,
      var(--ds-button-color, ${t(y.color)})
    ) !important;
    border-radius: var(
      --ds-button-border-radius,
      ${t(y.borderRadius)}
    ) !important;
  }
`;function w(t){return Array.from(t.children).find(t=>{var o;const e=null==(o=t.tagName)?void 0:o.toLowerCase();return"button"===e||"a"===e})}function k(t,o){const e=t.target instanceof HTMLSlotElement?t.target:null;if(!e)return;const r=e.assignedElements({flatten:!0})[0];r&&(o.hasAttribute("aria-disabled")&&r.setAttribute("aria-disabled",""),o.hasAttribute("aria-expanded")&&r.setAttribute("aria-expanded",""),o.ariaLabel&&r.setAttribute("aria-label",o.ariaLabel),o.title&&r.setAttribute("title",o.title),o.disabled&&r.setAttribute("disabled",""),"button"===r.tagName.toLowerCase()&&(o.ariaControls&&r.setAttribute("aria-controls",o.ariaControls),o.ariaHasPopup&&r.setAttribute("aria-haspopup",o.ariaHasPopup),void 0!==o.ariaPressed&&null!==o.ariaPressed&&r.setAttribute("aria-pressed",o.ariaPressed),o.autoFocus?r.setAttribute("autofocus",""):r.removeAttribute("autofocus"),o.form&&r.setAttribute("form",o.form),o.formAction&&r.setAttribute("formaction",o.formAction),o.formEncType&&r.setAttribute("formenctype",o.formEncType),o.formMethod&&r.setAttribute("formmethod",o.formMethod),o.formNoValidate?r.setAttribute("formnovalidate",""):r.removeAttribute("formnovalidate"),o.formTarget&&r.setAttribute("formtarget",o.formTarget),o.name&&r.setAttribute("name",o.name),o.popovertarget&&r.setAttribute("popovertarget",o.popovertarget),o.popovertargetaction&&r.setAttribute("popovertargetaction",o.popovertargetaction),o.value&&r.setAttribute("value",o.value),o.type&&r.setAttribute("type",o.type)),"a"===r.tagName.toLowerCase()&&(o.download&&r.setAttribute("download",o.download),o.href&&r.setAttribute("href",o.href),o.hreflang&&r.setAttribute("hreflang",o.hreflang),o.lang?r.setAttribute("lang",o.lang):r.removeAttribute("lang"),o.ping&&r.setAttribute("ping",o.ping),o.referrerpolicy&&r.setAttribute("referrerpolicy",o.referrerpolicy),o.rel&&r.setAttribute("rel",o.rel),o.target&&r.setAttribute("target",o.target),o.type&&"button"!==o.type&&r.setAttribute("type",o.type)))}var x=Object.defineProperty,A=Object.getOwnPropertyDescriptor,z=(t,o,e,r)=>{for(var n,a=r>1?void 0:r?A(o,e):o,d=t.length-1;d>=0;d--)(n=t[d])&&(a=(r?n(o,e,a):n(a))||a);return r&&a&&x(o,e,a),a};const B="store-button";let C=class extends(u(r(n(a(f))))){constructor(){super(...arguments),this.lightDOM=!1,this.active=!1,this.disabled=!1,this.fullWidth=!1,this.buttonLabel=null,this.iconFilled=!1}_buildButtonMarkup(){const t=this.iconOnly?d`<slot name="button__icon"></slot>`:"",o=this.withIconPrepend?d`<slot name="button__icon-prepend"></slot>`:"",e=this.withIconAppend?d`<slot name="button__icon-append"></slot>`:"",r=d`<slot name="button__text"></slot>`,n=this.videoControl===v.play?d`<store-icon icon="play" ?filled=${this.iconFilled}></store-icon>`:"",a=this.videoControl===v.pause?d`<store-icon icon="pause" ?filled=${this.iconFilled}></store-icon>`:"";let s;return s=this.withIconPrepend&&this.withIconAppend?d`${o}${r}${e}`:this.withIconPrepend?d`${o}${r}`:this.withIconAppend?d`${r}${e}`:this.videoControl===v.play?d`${n}${r}`:this.videoControl===v.pause?d`${a}${r}`:this.iconOnly?d`${t}${r}`:r,s}_renderCustomElement(){return"div"===this.element?d`<div>${this._buildButtonMarkup()}</div>`:d`<span>${this._buildButtonMarkup()}</span>`}willUpdate(){if(this.videoControl){this.iconOnly=!0;const t=this.querySelector('store-icon[slot="button__icon"]');this.iconFilled=!(null==t||!t.hasAttribute("filled")),this.videoControl===v.play&&(this.buttonLabel=this.playButtonLabel||"Play video"),this.videoControl===v.pause&&(this.buttonLabel=this.pauseButtonLabel||"Pause video")}this.ariaLabel=this.buttonLabel,this.title=this.buttonLabel||this.buttonTitle||""}render(){if(w(this))return this.lightDOM=!0,d`<slot @slotchange=${t=>k(t,this)}></slot>`;const t=this._buildButtonMarkup();let o;return o=this.element&&""!==this.element?d`${this._renderCustomElement()}`:this.href?this.renderLink(t):this.renderButton(t),o}};C.shadowRootOptions={...f.shadowRootOptions,delegatesFocus:!0},C.styles=[$],z([s({type:Boolean,reflect:!0,attribute:"light-dom"})],C.prototype,"lightDOM",2),z([s({type:Boolean,reflect:!0})],C.prototype,"active",2),z([s({reflect:!0})],C.prototype,"appearance",2),z([s({reflect:!0})],C.prototype,"size",2),z([s({reflect:!0})],C.prototype,"shape",2),z([s({type:Boolean,reflect:!0,attribute:"icon-only"})],C.prototype,"iconOnly",2),z([s({type:Boolean,reflect:!0,attribute:"with-icon-prepend"})],C.prototype,"withIconPrepend",2),z([s({type:Boolean,reflect:!0,attribute:"with-icon-append"})],C.prototype,"withIconAppend",2),z([s({type:Boolean,reflect:!0})],C.prototype,"disabled",2),z([s({type:Boolean,reflect:!0,attribute:"full-width"})],C.prototype,"fullWidth",2),z([s({reflect:!0})],C.prototype,"element",2),z([s({reflect:!0,attribute:"button-label"})],C.prototype,"buttonLabel",2),z([s({reflect:!0,attribute:"video-control"})],C.prototype,"videoControl",2),z([s({reflect:!0,attribute:"play-button-label"})],C.prototype,"playButtonLabel",2),z([s({reflect:!0,attribute:"pause-button-label"})],C.prototype,"pauseButtonLabel",2),z([s({type:Boolean,reflect:!0,attribute:"icon-filled"})],C.prototype,"iconFilled",2),z([s({reflect:!0,attribute:"button-title"})],C.prototype,"buttonTitle",2),C=z([i(B)],C);export{C as B,w as d,k as h,B as n};
