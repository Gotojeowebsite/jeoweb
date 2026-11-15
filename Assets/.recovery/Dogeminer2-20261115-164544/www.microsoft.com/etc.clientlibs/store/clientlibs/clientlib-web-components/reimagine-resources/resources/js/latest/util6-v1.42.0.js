import{r as t,A as e,w as o,a5 as i,as as n,Q as a,h as l,N as r,i as s,e as d,c as h,n as g,at as b,b as c,s as p,au as _,M as y,d as m}from"./tag.const-v1.42.0.js";import{b as k,v as x,S as f,f as w,B as v}from"./secondary-nav-item.const-v1.42.0.js";import{name as u}from"./components/badge/index-v1.42.0.js";import{name as E}from"./components/media/index-v1.42.0.js";const S="flex",$="column",z="center",T="center",L="var(--ds-spacing-xl, 2rem)",B="0",C="0",A="0",j="var(--ds-theme-foreground-base-highlight, #005597)",G="var(--ds-theme-foreground-neutral-subtle, #17253d)",M="0.7",D={headingColor:"var(--ds-theme-foreground-base-strong, #0e1726)",wordBreak:"initial",contentDisplay:"flex",contentFlexDirection:"column"},O="var(--ds-theme-foreground-base-subtle, #17253d)",N="var(--ds-spacing-l, 1rem)",W="var(--ds-theme-foreground-base-subtle, #17253d)",H="var(--ds-spacing-xl, 1.5rem)",P=s`
  :host {
    gap: var(--ds-heading-block-gap, ${t(L)});
    padding-inline-end: var(
      --ds-heading-block-copy-padding,
      ${t(B)}
    );
    padding-block-start: var(
      --ds-heading-padding-block-start,
      ${t(C)}
    );
    padding-block-end: var(
      --ds-heading-padding-block-end,
      ${t(A)}
    );
  }

  :host,
  :host [part='heading-block__header'],
  :host [part='heading-block__body'],
  :host [part='heading-block__footer'] {
    display: var(--ds-heading-block-display, ${t(S)});
    flex-direction: var(
      --ds-heading-block-flex-direction,
      ${t($)}
    );
  }

  :host [part='heading-block__header'] {
    gap: var(--ds-heading-block-head-gap, ${t("var(--ds-spacing-m, 1rem)")});
  }

  :host [part='heading-block__body'] {
    gap: var(--ds-heading-block-body-gap, ${t("var(--ds-spacing-2xl, 3rem)")});
  }

  :host [part='heading-block__footer'] {
    gap: var(--ds-heading-block-footer-gap, ${t(H)});
  }

  :host([alignment='center']) {
    text-align: var(--ds-heading-block-text-align, ${t(z)});
  }

  :host([alignment='left']) {
    text-align: var(--ds-heading-block-text-align, ${t("left")});
  }

  :host([alignment='right']) {
    text-align: var(--ds-heading-block-text-align, ${t("right")});
  }

  :host([alignment='justify']) {
    text-align: var(--ds-heading-block-text-align, ${t("justify")});
  }

  /* Add eyebrow group styling for inline layout */
  :host .heading-block__eyebrow-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--ds-spacing-2xs, 0.25rem);
  }

  /* Eyebrow button container layout */
  .heading-block__eyebrow-button-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  ::slotted([slot='heading-block__eyebrow-label']) {
    color: var(
      --ds-heading-block-eyebrow-label-color,
      ${t(j)}
    );
    font-size: var(
      --ds-heading-block-eyebrow-label-font-size,
      ${t(e.fontSize)}
    );
    font-weight: var(
      --ds-heading-block-eyebrow-label-font-weight,
      ${t(e.fontWeight)}
    );
    line-height: var(
      --ds-heading-block-eyebrow-label-line-height,
      ${t(e.lineHeight)}
    );
    letter-spacing: var(
      --ds-heading-block-eyebrow-label-letter-spacing,
      ${t(e.letterSpacing)}
    );
  }

  ::slotted([slot='heading-block__eyebrow-date']) {
    font-weight: var(
      --ds-heading-block-eyebrow-date-font-weight,
      ${t(o.fontWeight)}
    );
    font-size: var(
      --ds-heading-block-eyebrow-date-font-size,
      ${t(o.fontSize)}
    );
    line-height: var(
      --ds-heading-block-eyebrow-date-line-height,
      ${t(o.lineHeight)}
    );
    margin-bottom: var(
      --ds-heading-block-eyebrow-date-margin-bottom,
      ${t(o.marginBottom)}
    );
    color: var(
      --ds-heading-block-eyebrow-date-color,
      ${t(G)}
    );
    opacity: var(
      --ds-heading-block-eyebrow-date-opacity,
      ${t(M)}
    );
    margin-top: var(
      --ds-heading-block-eyebrow-date-margin-top,
      ${t(o.marginTop)}
    );
  }

  ::slotted([slot='heading-block__heading-text']) {
    overflow-wrap: break-word;
    color: var(
      --ds-heading-block-heading-text-color,
      ${t(D.headingColor)}
    );
    font-weight: var(
      --ds-heading-block-heading-text-font-weight,
      ${t(i.fontWeight)}
    ) !important;
    font-size: var(
      --ds-heading-block-heading-text-font-size,
      ${t(i.fontSize)}
    ) !important;
    line-height: var(
      --ds-heading-block-heading-text-line-height,
      ${t(i.lineHeight)}
    ) !important;
    word-break: var(
      --ds-heading-block-heading-text-word-break,
      ${t(D.wordBreak)}
    );
  }

  ::slotted([slot='heading-block__content-text']) {
    display: var(--ds-heading-block-content-text-display, flex);
    flex-direction: var(--ds-heading-block-content-text-flex-direction);
    justify-content: var(--ds-heading-block-content-text-justify-content, initial);
    row-gap: var(--ds-heading-block-content-text-row-gap);
    color: var(
      --ds-heading-block-content-text-color,
      ${t(O)}
    );
    font-weight: var(
      --ds-heading-block-content-text-font-weight,
      ${t(n.fontWeight)}
    );
    font-size: var(
      --ds-heading-block-content-text-font-size,
      ${t(n.fontSize)}
    );
    line-height: var(
      --ds-heading-block-content-text-line-height,
      ${t(n.lineHeight)}
    );
    letter-spacing: var(
      --ds-heading-block-content-text-letter-spacing,
      ${t(n.letterSpacing)}
    );
    padding-inline-end: var(
      --ds-heading-block-content-text-padding-inline-end,
      ${t(N)}
    );
    padding-inline-start: var(--ds-heading-block-content-text-padding-inline-start, 0);
  }

  ::slotted([slot='heading-block__footer-note']) {
    color: var(
      --ds-heading-block-footer-note-color,
      ${t(W)}
    );
    font-weight: var(
      --ds-heading-block-footer-note-font-weight,
      ${t(a.fontWeight)}
    ) !important;
    font-size: var(
      --ds-heading-block-footer-note-font-size,
      ${t(a.fontSize)}
    ) !important;
    line-height: var(
      --ds-heading-block-footer-note-line-height,
      ${t(a.lineHeight)}
    ) !important;
    letter-spacing: var(
      --ds-heading-block-footer-note-letter-spacing,
      ${t(a.letterSpacing)}
    ) !important;
  }

  /* Large label styling - label alignment with heading XS font size */
  ::slotted([slot='heading-block__eyebrow-large-label']) {
    color: var(
      --ds-heading-block-eyebrow-large-label-color,
      ${t(j)}
    );

    /* Use label properties for alignment and spacing */
    font-weight: var(
      --ds-heading-block-eyebrow-large-label-font-weight,
      ${t(e.fontWeight)}
    );
    line-height: var(
      --ds-heading-block-eyebrow-large-label-line-height,
      ${t(e.lineHeight)}
    );
    letter-spacing: var(
      --ds-heading-block-eyebrow-large-label-letter-spacing,
      ${t(e.letterSpacing)}
    );

    /* Use heading XS font size */
    font-size: var(
      --ds-heading-block-eyebrow-large-label-font-size,
      ${t(l.fontSize)}
    );
  }

  :host([size='3xl']) {
    --ds-heading-block-gap: var(--ds-spacing-xl, 1.5rem);
  }

  :host([size='3xl']) [part='heading-block__header'],
  :host([size='2xl-plus']) [part='heading-block__header'],
  :host([size='2xl']) [part='heading-block__header'],
  :host([size='xl']) [part='heading-block__header'] {
    --ds-heading-block-head-gap: var(--ds-spacing-m, 0.75rem);
  }

  :host([size='2xl-plus']) {
    --ds-heading-block-heading-text-font-size: 3.875rem;
    --ds-heading-block-heading-text-font-weight: 500;
    --ds-heading-block-heading-text-line-height: 4.5rem;
    --ds-heading-block-gap: var(--ds-spacing-l, 1rem);
  }

  :host([size='2xl']) {
    --ds-heading-block-heading-text-font-size: var(--ds-heading-2xl-font-size) !important;
    --ds-heading-block-heading-text-font-weight: var(--ds-heading-2xl-font-weight) !important;
    --ds-heading-block-heading-text-line-height: var(--ds-heading-2xl-line-height) !important;
    --ds-heading-block-gap: var(--ds-spacing-l, 1rem);
  }

  :host([size='xl']) {
    --ds-heading-block-heading-text-font-size: var(--ds-heading-xl-font-size) !important;
    --ds-heading-block-heading-text-font-weight: var(--ds-heading-xl-font-weight) !important;
    --ds-heading-block-heading-text-line-height: var(--ds-heading-xl-line-height) !important;
    --ds-heading-block-gap: var(--ds-spacing-m, 0.75rem);
  }

  :host([size='l']) {
    --ds-heading-block-heading-text-font-size: var(--ds-heading-l-font-size) !important;
    --ds-heading-block-heading-text-font-weight: var(--ds-heading-l-font-weight) !important;
    --ds-heading-block-heading-text-line-height: var(--ds-heading-l-line-height) !important;
    --ds-heading-block-gap: var(--ds-spacing-m, 0.75rem);
  }

  :host([size='l']) [part='heading-block__header'],
  :host([size='m']) [part='heading-block__header'],
  :host([size='s']) [part='heading-block__header'] {
    --ds-heading-block-head-gap: var(--ds-spacing-xs, 0.5rem);
  }

  :host([size='m']) {
    --ds-heading-block-heading-text-font-size: var(--ds-heading-m-font-size) !important;
    --ds-heading-block-heading-text-font-weight: var(--ds-heading-m-font-weight) !important;
    --ds-heading-block-heading-text-line-height: var(--ds-heading-m-line-height) !important;
    --ds-heading-block-gap: var(--ds-spacing-m, 0.75rem);
  }

  :host([size='s']) {
    --ds-heading-block-heading-text-font-size: var(--ds-heading-s-font-size) !important;
    --ds-heading-block-heading-text-font-weight: var(--ds-heading-s-font-weight) !important;
    --ds-heading-block-heading-text-line-height: var(--ds-heading-s-line-height) !important;
    --ds-heading-block-gap: var(--ds-spacing-m, 0.75rem);
  }

  :host([size='xs']) {
    --ds-heading-block-heading-text-font-size: var(--ds-heading-xs-font-size) !important;
    --ds-heading-block-heading-text-font-weight: var(--ds-heading-xs-font-weight) !important;
    --ds-heading-block-heading-text-line-height: var(--ds-heading-xs-line-height) !important;
  }

  :host([size='2xs']) {
    --ds-heading-block-heading-text-font-size: var(--ds-heading-2xs-font-size) !important;
    --ds-heading-block-heading-text-font-weight: var(--ds-heading-2xs-font-weight) !important;
    --ds-heading-block-heading-text-line-height: var(--ds-heading-2xs-line-height) !important;
  }

  :host([size='3xs']) {
    --ds-heading-block-heading-text-font-size: var(--ds-heading-3xs-font-size) !important;
    --ds-heading-block-heading-text-font-weight: var(--ds-heading-3xs-font-weight) !important;
    --ds-heading-block-heading-text-line-height: var(--ds-heading-3xs-line-height) !important;
  }

  .heading-block__rolling-text {
    --ds-rolling-text-font-size: var(--ds-heading-block-heading-text-font-size);
    --ds-rolling-text-font-weight: var(--ds-heading-block-heading-text-font-weight);
    --ds-rolling-text-line-height: var(--ds-heading-block-heading-text-line-height);
  }

  :host([size='xl']) ::slotted([slot='heading-block__content-text']),
  :host([size='l']) ::slotted([slot='heading-block__content-text']),
  :host([size='m']) ::slotted([slot='heading-block__content-text']),
  :host([size='s']) ::slotted([slot='heading-block__content-text']),
  :host([size='xs']) ::slotted([slot='heading-block__content-text']),
  :host([size='2xs']) ::slotted([slot='heading-block__content-text']),
  :host([size='3xs']) ::slotted([slot='heading-block__content-text']) {
    --ds-heading-block-content-text-font-size: ${t(r.fontSize)} !important;
    --ds-heading-block-content-text-font-weight: ${t(r.fontWeight)} !important;
    --ds-heading-block-content-text-line-height: ${t(r.lineHeight)} !important;
    --ds-heading-block-content-text-letter-spacing: ${t(r.letterSpacing)} !important;
  }

  :host([size='3xl']) [part='heading-block__body'] {
    --ds-heading-block-body-gap: var(--ds-spacing-2xl, 3rem);
  }

  :host([size='2xl-plus']) [part='heading-block__body'],
  :host([size='2xl']) [part='heading-block__body'],
  :host([size='xl']) [part='heading-block__body'],
  :host([size='l']) [part='heading-block__body'],
  :host([size='m']) [part='heading-block__body'],
  :host([size='s']) [part='heading-block__body'] {
    --ds-heading-block-body-gap: var(--ds-spacing-xl, 2rem);
  }

  :host([size='l']) [part='heading-block__footer'],
  :host([size='m']) [part='heading-block__footer'],
  :host([size='s']) [part='heading-block__footer'] {
    --ds-heading-block-footer-gap: var(--ds-spacing-l, 1.5rem);
  }

  /* Center Alignment css */

  :host([alignment='center']) ::slotted([slot='heading-block__footer-link']) {
    justify-content: var(
      --ds-heading-block-justify-content,
      ${t(T)}
    );
  }

  :host([alignment='center']) ::slotted([slot='heading-block__eyebrow-large-label']),
  :host([alignment='center']) ::slotted([slot='heading-block__eyebrow-badge']) {
    margin: 0 auto;
    display: block;
  }

  :host([alignment='center']) .heading-block__eyebrow-tag {
    display: flex;
    justify-content: center;
  }

  :host([alignment='center']) .heading-block__eyebrow-group {
    justify-content: center;
  }

  :host([alignment='center']) .heading-block__eyebrow-media-container {
    margin: 0 auto;
    display: block;
  }

  /* Center alignment for eyebrow-button container */
  :host([alignment='center']) .heading-block__eyebrow-button-container {
    position: relative;
  }

  .heading-block__eyebrow-wrapper {
    display: flex;
    align-items: center;
  }

  :host([alignment='center']) .heading-block__eyebrow-wrapper {
    position: absolute;
    left: 50%;
    transform: translateX(-50%) !important;
    text-align: center;
  }

  :host([alignment='center']) .heading-block__rolling-button {
    margin-left: auto;
    text-align: right;
  }

  :host([alignment='center']) ::slotted([slot='heading-block__content-text']) {
    --ds-heading-block-content-text-padding-inline-end: ${t(N)};
    --ds-heading-block-content-text-padding-inline-start: var(
      --ds-heading-block-content-text-padding-inline-end
    );
    --ds-heading-block-content-text-justify-content: center;
  }

  @media (max-width: ${t(k(x.md))}) {
    /* Mobile centering for heading-block when used in card banner body */
    :host([size='2xl-plus']) {
      --ds-heading-block-heading-text-font-size: 3rem !important;
      --ds-heading-block-heading-text-font-weight: 500;
      --ds-heading-block-heading-text-line-height: var(--ds-heading-xl-line-height) !important;
      --ds-heading-block-content-text-font-size: var(--ds-body-m-font-size);
      --ds-heading-block-content-text-font-weight: 400;
      --ds-heading-block-content-text-line-height: var(--ds-body-m-line-height);
    }
  }

  /* When a custom heading-gradient is provided, apply a gradient background
     to the main heading text. This uses the CSS custom property
     --ds-gradient-text-background, which is only set when authoring
     provides a value. No default is applied for this variable. */
  :host([heading-gradient]) ::slotted([slot='heading-block__heading-text']) {
    background-image: var(--ds-gradient-text-background) !important;
    color: transparent !important;
    background-clip: text;
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-background-clip: text;
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-text-fill-color: transparent;
  }

  :host([has-rolling-text]) {
    --ds-heading-block-gap: 0;
    .heading-block__rolling-text {
      --ds-rolling-text-padding-block-end: ${t(L)};
    }
  }

  :host .heading-block__eyebrow-media-container {
    width: 11.25rem;
    height: 4.8125rem;
    overflow: hidden;
    border-radius: 0;
  }
`,R=s`
  @media (min-width: ${t(x.md)}) {
    ::slotted([slot='heading-block__content-text']) {
      --ds-heading-block-content-text-padding-inline-end: var(--ds-spacing-2xl);
    }
  }
`;class q{constructor(t,e){if(this._buttonClick=this.handleButtonClick.bind(this),this._animationStateChange=this.handleAnimationStateChange.bind(this),this._host=t,this._rollingTextElement=(null==e?void 0:e.rollingTextElement)||this._host.querySelector("store-rolling-text"),this._buttonTrigger=(null==e?void 0:e.buttonTrigger)||this._host.querySelector("store-button[video-control]"),this._rollingTextElement){if(!this._buttonTrigger)return void console.warn("For accessibility support, a play/pause button is required.");(this._host=t).addController(this),this.init()}}hostConnected(){var t,e;null==(t=this._buttonTrigger)||t.addEventListener("click",this._buttonClick),null==(e=this._rollingTextElement)||e.addEventListener("rolling-animation-state-change",this._animationStateChange)}hostDisconnected(){var t,e;null==(t=this._buttonTrigger)||t.removeEventListener("click",this._buttonClick),null==(e=this._rollingTextElement)||e.removeEventListener("rolling-animation-state-change",this._animationStateChange)}init(){var t;const e=null==(t=this._rollingTextElement)?void 0:t.getAnimationState();this._updateButtonState("playing"===e)}_updateButtonState(t){var e;null==(e=this._buttonTrigger)||e.setAttribute("video-control",t?"pause":"play")}handleButtonClick(){if(!this._rollingTextElement)return;this._rollingTextElement.toggleAnimation();const t=this._rollingTextElement.getAnimationState();this._updateButtonState("playing"===t)}handleAnimationStateChange(t){const e="playing"===t.detail.state;this._updateButtonState(e)}}var X=Object.defineProperty,F=Object.getOwnPropertyDescriptor,U=(t,e,o,i)=>{for(var n,a=i>1?void 0:i?F(e,o):e,l=t.length-1;l>=0;l--)(n=t[l])&&(a=(i?n(e,o,a):n(a))||a);return i&&a&&X(e,o,a),a};const Q="store-heading-block";let I=class extends f{constructor(){super(...arguments),this._firstSlotEmpty=!0,this._lastSlotEmpty=!0,this._eyebrowLabelEmpty=!0,this._eyebrowDateEmpty=!0,this._eyebrowLargeLabelEmpty=!0,this._eyebrowMediaEmpty=!0,this._eyebrowBadgeEmpty=!0,this._eyebrowTagEmpty=!0,this._eyebrowEmpty=!0,this._headingTextEmpty=!0,this._contentTextEmpty=!0,this._footerLinkEmpty=!0,this._footerNoteEmpty=!0,this._bodyEmpty=!0,this._rollingTextEmpty=!0,this._rollingButtonEmpty=!0,this.hasRollingText=!1}updated(t){var e,o,i;if(super.updated(t),t.has("headingGap")&&(this.headingGap&&b[this.headingGap]?this.style.setProperty("--ds-heading-block-gap",b[this.headingGap]):this.style.removeProperty("--ds-heading-block-gap")),t.has("headingGradient")&&(this.headingGradient&&this.headingGradient.trim().length>0?(this.style.setProperty("--ds-gradient-text-background",this.headingGradient.trim()),this.hasAttribute("heading-gradient")||this.setAttribute("heading-gradient","")):(this.style.removeProperty("--ds-gradient-text-background"),this.hasAttribute("heading-gradient")&&this.removeAttribute("heading-gradient"))),t.has("paragraphTextColor")){const t=(null==(e=this.paragraphTextColor)?void 0:e.trim())??"",n=(null==(i=null==(o=globalThis.matchMedia)?void 0:o.call(globalThis,`(min-width: ${x.md})`))?void 0:i.matches)??!0;t.length>0&&n?(this.style.setProperty("--ds-heading-block-content-text-color",t),this.hasAttribute("paragraph-text-color")||this.setAttribute("paragraph-text-color",""),this.setAttribute("paragraph-text-color",t)):(this.style.removeProperty("--ds-heading-block-content-text-color"),this.hasAttribute("paragraph-text-color")&&this.removeAttribute("paragraph-text-color"))}}_handleSlotChange(){if(this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length,this._eyebrowLabelEmpty=0===this._eyebrowLabelSlot.length,this._eyebrowDateEmpty=0===this._eyebrowDateSlot.length,this._eyebrowLargeLabelEmpty=0===this._eyebrowLargeLabelSlot.length,this._eyebrowMediaEmpty=0===this._eyebrowMediaSlot.length,this._eyebrowBadgeEmpty=0===this._eyebrowBadgeSlot.length,this._eyebrowTagEmpty=0===this._eyebrowTagSlot.length,this._headingTextEmpty=0===this._headingTextSlot.length,this._contentTextEmpty=0===this._contentTextSlot.length,this._footerLinkEmpty=0===this._footerLinkSlot.length,this._footerNoteEmpty=0===this._footerNoteSlot.length,this._rollingTextEmpty=0===this._rollingTextSlot.length,this._rollingButtonEmpty=0===this._rollingButtonSlot.length,this._eyebrowEmpty=this._eyebrowLabelEmpty&&this._eyebrowDateEmpty&&this._eyebrowLargeLabelEmpty&&this._eyebrowMediaEmpty&&this._eyebrowBadgeEmpty&&this._eyebrowTagEmpty,this._bodyEmpty=this._contentTextEmpty&&this._footerLinkEmpty&&this._footerNoteEmpty,this._setBadgeAttributes(),this._setMediaAttributes(),this.hasRollingText&&!this._rollingTextEmpty&&!this._rollingTextController){this._rollingButtonEmpty||this._setRollingButtonAttributes();const t=this.querySelector("store-rolling-text"),e=this.querySelector("store-button[video-control]");t&&e&&(this._rollingTextController=new q(this,{rollingTextElement:t,buttonTrigger:e}))}}_renderOptionalSlot(t="heading-block__first",e=this._firstSlotEmpty){return c`
      <div part=${t} class=${t} style="${e?"display: none;":""}">
        <slot name=${t} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}_renderEyebrow(){return c`
      <div
        class="heading-block__eyebrow-group"
        style="${this._eyebrowLabelEmpty&&this._eyebrowDateEmpty?"display: none;":""}"
      >
        <slot
          name="heading-block__eyebrow-label"
          @slotchange="${this._handleSlotChange}"
          style="${this._eyebrowLabelEmpty?"display: none;":""}"
        ></slot>
        <slot
          name="heading-block__eyebrow-date"
          @slotchange="${this._handleSlotChange}"
          style="${this._eyebrowDateEmpty?"display: none;":""}"
        ></slot>
      </div>
      ${this._renderOptionalSlot("heading-block__eyebrow-large-label",this._eyebrowLargeLabelEmpty)}
      <div
        class="heading-block__eyebrow-media-container"
        style="${this._eyebrowMediaEmpty?"display: none;":""}"
      >
        <slot name="heading-block__eyebrow-media" @slotchange="${this._handleSlotChange}"></slot>
      </div>
      ${this._renderOptionalSlot("heading-block__eyebrow-badge",this._eyebrowBadgeEmpty)}
      ${this._renderOptionalSlot("heading-block__eyebrow-tag",this._eyebrowTagEmpty)}
    `}_renderEyebrowWithButton(){return c`<div
      class="heading-block__eyebrow-button-container"
      part="heading-block__eyebrow-button-container"
    >
      <div class="heading-block__eyebrow-wrapper" part="heading-block__eyebrow-wrapper">
        ${this._renderEyebrow()}
      </div>
      ${this._renderOptionalSlot("heading-block__rolling-button",this._rollingButtonEmpty)}
    </div> `}_setBadgeAttributes(){this._eyebrowBadgeSlot.filter(t=>t.tagName.toLowerCase()===u).forEach(t=>{const e={size:v.lg,surface:w.solidBorder};p(t,e)})}_setMediaAttributes(){this._eyebrowMediaSlot.filter(t=>t.tagName.toLowerCase()===E).forEach(t=>{const e={"aspect-ratio":y.ratio21to9};p(t,e)})}_setRollingButtonAttributes(){const t=this.querySelector("store-button[video-control]");t&&p(t,{appearance:"button--primary",shape:"rounded",size:"medium"})}render(){return c`
      ${this._renderOptionalSlot("heading-block__first",this._firstSlotEmpty)}
      <div
        class="heading-block__header"
        part="heading-block__header"
        style="${this._eyebrowEmpty&&this._headingTextEmpty?"display: none;":""}"
      >
        ${this.hasRollingText?this._renderEyebrowWithButton():this._renderEyebrow()}
        <div class="heading-block__heading-wrapper" part="heading-block__heading-wrapper">
          <slot name="heading-block__heading-text" @slotchange="${this._handleSlotChange}"></slot>
          ${this.hasRollingText?this._renderOptionalSlot("heading-block__rolling-text",this._rollingTextEmpty):""}
        </div>
      </div>
      <div
        class="heading-block__body"
        part="heading-block__body"
        style="${this._bodyEmpty?"display:none;":""}${this.bodyGap&&_[this.bodyGap]?`--ds-heading-block-body-gap: ${_[this.bodyGap]};`:""}"
      >
        ${this._renderOptionalSlot("heading-block__content-text",this._contentTextEmpty)}
        <div
          class="heading-block__footer"
          part="heading-block__footer"
          style="${this._footerLinkEmpty&&this._footerNoteEmpty?"display: none;":""}"
        >
          <slot name="heading-block__footer-link" @slotchange="${this._handleSlotChange}"></slot>
          <slot name="heading-block__footer-note" @slotchange="${this._handleSlotChange}"></slot>
        </div>
      </div>
      ${this._renderOptionalSlot("heading-block__last",this._lastSlotEmpty)}
    `}};I.styles=[P,R],U([d({slot:"heading-block__first"})],I.prototype,"_firstSlot",2),U([d({slot:"heading-block__last"})],I.prototype,"_lastSlot",2),U([d({slot:"heading-block__eyebrow-label"})],I.prototype,"_eyebrowLabelSlot",2),U([d({slot:"heading-block__eyebrow-date"})],I.prototype,"_eyebrowDateSlot",2),U([d({slot:"heading-block__eyebrow-large-label"})],I.prototype,"_eyebrowLargeLabelSlot",2),U([d({slot:"heading-block__eyebrow-media"})],I.prototype,"_eyebrowMediaSlot",2),U([d({slot:"heading-block__eyebrow-badge"})],I.prototype,"_eyebrowBadgeSlot",2),U([d({slot:"heading-block__eyebrow-tag"})],I.prototype,"_eyebrowTagSlot",2),U([d({slot:"heading-block__heading-text"})],I.prototype,"_headingTextSlot",2),U([d({slot:"heading-block__content-text"})],I.prototype,"_contentTextSlot",2),U([d({slot:"heading-block__footer-link"})],I.prototype,"_footerLinkSlot",2),U([d({slot:"heading-block__footer-note"})],I.prototype,"_footerNoteSlot",2),U([d({slot:"heading-block__rolling-text"})],I.prototype,"_rollingTextSlot",2),U([d({slot:"heading-block__rolling-button"})],I.prototype,"_rollingButtonSlot",2),U([h()],I.prototype,"_firstSlotEmpty",2),U([h()],I.prototype,"_lastSlotEmpty",2),U([h()],I.prototype,"_eyebrowLabelEmpty",2),U([h()],I.prototype,"_eyebrowDateEmpty",2),U([h()],I.prototype,"_eyebrowLargeLabelEmpty",2),U([h()],I.prototype,"_eyebrowMediaEmpty",2),U([h()],I.prototype,"_eyebrowBadgeEmpty",2),U([h()],I.prototype,"_eyebrowTagEmpty",2),U([h()],I.prototype,"_eyebrowEmpty",2),U([h()],I.prototype,"_headingTextEmpty",2),U([h()],I.prototype,"_contentTextEmpty",2),U([h()],I.prototype,"_footerLinkEmpty",2),U([h()],I.prototype,"_footerNoteEmpty",2),U([h()],I.prototype,"_bodyEmpty",2),U([h()],I.prototype,"_rollingTextEmpty",2),U([h()],I.prototype,"_rollingButtonEmpty",2),U([g({reflect:!0})],I.prototype,"size",2),U([g({reflect:!0})],I.prototype,"alignment",2),U([g({reflect:!0,attribute:"body-gap"})],I.prototype,"bodyGap",2),U([g({reflect:!0,attribute:"heading-gap"})],I.prototype,"headingGap",2),U([g({type:Boolean,attribute:"has-rolling-text"})],I.prototype,"hasRollingText",2),U([g({attribute:"heading-gradient"})],I.prototype,"headingGradient",2),U([g({attribute:"paragraph-text-color"})],I.prototype,"paragraphTextColor",2),I=U([m(Q)],I);export{I as H,D as c,Q as n};
