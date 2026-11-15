import{r as t,w as e,x as o,K as i,a7 as s,al as l,i as n,e as a,c as r,n as d,F as c,am as h,b,d as _}from"../../tag.const-v1.42.0.js";import{n as p,a as g}from"../../util7-v1.42.0.js";import{S as x}from"../../secondary-nav-item.const-v1.42.0.js";const y="flex",m="flex-start",k="start",f="column",v="var(--ds-spacing-m, 1rem)",S="flex",$="flex-start",E="start",w="row",u="var(--ds-spacing-m, 1rem)",z="normal",O="flex",D="column",B="var(--ds-spacing-2xs, 0.25rem)",L="flex-start",H="flex",A="row",T="center",j="var(--ds-spacing-2xs, 0.25rem)",I="var(--ds-theme-foreground-neutral-subtle, #17253d)",C="0.7",W="flex",P="stretch",F="0.5rem",K="flex",N="column",q="flex-start",G="var(--ds-spacing-m, 1rem)",J="flex",M="column",Q="start",R="var(--ds-spacing-m, 1rem)",U=n`
  :host {
    display: var(--ds-text-block-display, ${t(y)});
    align-items: var(--ds-text-block-align-items, ${t(m)});
    text-align: var(--ds-text-block-text-align, ${t(k)});
    flex-direction: var(
      --ds-text-block-flex-direction,
      ${t(f)}
    );
    gap: var(--ds-text-block-gap, ${t(v)});
  }

  :host [part='text-block__header'] {
    display: var(--ds-text-block-header-display, ${t(S)});
    align-items: var(
      --ds-text-block-header-align-items,
      ${t($)}
    );
    text-align: var(
      --ds-text-block-header-text-align,
      ${t(E)}
    );
    flex-direction: var(
      --ds-text-block-header-flex-direction,
      ${t(w)}
    );
    gap: var(--ds-text-block-header-gap, ${t(u)});
  }

  :host [part='text-block__headings'] {
    display: var(
      --ds-text-block-headings-display,
      ${t(O)}
    );
    flex-direction: var(
      --ds-text-block-headings-flex-direction,
      ${t(D)}
    );
    gap: var(--ds-text-block-headings-gap, ${t(B)});
    align-items: var(
      --ds-text-block-headings-align-items,
      ${t(L)}
    );
    margin-block: auto;
  }

  :host [part='text-block__eyebrow'] {
    display: var(
      --ds-text-block-eyebrow-display,
      ${t(H)}
    );
    flex-direction: var(
      --ds-text-block-eyebrow-flex-direction,
      ${t(A)}
    );
    gap: var(--ds-text-block-eyebrow-gap, ${t(j)});
    align-items: var(
      --ds-text-block-eyebrow-gap,
      ${t(T)}
    );
  }

  :host [part='text-block__title-indicator'] {
    display: var(
      --ds-text-block-indicator-display,
      ${t(W)}
    );
    align-items: var(
      --ds-text-block-indicator-align-items,
      ${t(P)}
    );
    gap: var(--ds-text-block-indicator-gap, ${t(F)});
  }

  ::slotted([slot='text-block__eyebrow-label']) {
    color: var(
      --ds-text-block-eyebrow-label-color,
      ${t("var(--ds-theme-foreground-base-highlight, #005597)")}
    );
    font-weight: var(
      --ds-text-block-eyebrow-label-font-weight,
      ${t(e.fontWeight)}
    ) !important;
    font-size: var(
      --ds-text-block-eyebrow-label-font-size,
      ${t(e.fontSize)}
    ) !important;
    line-height: var(
      --ds-text-block-eyebrow-label-line-height,
      ${t(e.lineHeight)}
    ) !important;
  }

  ::slotted([slot='text-block__heading']) {
    color: var(--ds-text-block-heading-color, ${t("var(--ds-theme-foreground-base-strong, #0E1726)")});
    font-weight: var(
      --ds-text-block-heading-font-weight,
      ${t(o.fontWeight)}
    ) !important;
    font-size: var(
      --ds-text-block-heading-font-size,
      ${t(o.fontSize)}
    ) !important;
    word-break: var(
      --ds-text-block-heading-word-break,
      ${t(z)}
    );
    line-height: var(
      --ds-text-block-heading-line-height,
      ${t(o.lineHeight)}
    ) !important;
    margin-bottom: var(
      --ds-text-block-heading-margin-bottom,
      ${t(o.marginBottom)}
    ) !important;
    margin-top: var(
      --ds-text-block-heading-margin-top,
      ${t(o.marginTop)}
    ) !important;
  }

  /* Animation hooks — only active when the enable-animation attribute is set on the host
     (applied externally e.g. by store-card-promo when enable-animation-description is true) */
  :host([enable-animation]) ::slotted([slot='text-block__heading']) {
    transform: var(--ds-text-block-heading-transform, none);
    transition: var(--ds-text-block-heading-transition, none);
  }

  :host([enable-animation]) ::slotted([slot='text-block__content']) {
    opacity: var(--ds-text-block-content-opacity, 1);
    transition: var(--ds-text-block-content-transition, none);
  }

  ::slotted([slot='text-block__content']) {
    color: var(--ds-text-block-content-color, ${t("var(--ds-theme-foreground-base-subtle, #17253d)")});
    font-weight: var(
      --ds-text-block-content-font-weight,
      ${t(i.fontWeight)}
    ) !important;
    font-size: var(
      --ds-text-block-content-font-size,
      ${t(i.fontSize)}
    ) !important;
    line-height: var(
      --ds-text-block-content-line-height,
      ${t(s.lineHeight)}
    ) !important;
    letter-spacing: var(
      --ds-text-block-content-letter-spacing,
      ${t(l.letterSpacing)}
    );
    margin-top: var(
      --ds-text-block-content-margin-top,
      ${t(i.marginTop)}
    ) !important;
    margin-bottom: var(
      --ds-text-block-content-margin-bottom,
      ${t(i.marginBottom)}
    ) !important;
    overflow: var(--ds-text-block-content-overflow, initial);
    max-height: var(--ds-text-block-content-max-height, none);
  }

  ::slotted([slot='text-block__eyebrow-date']) {
    display: var(--ds-text-block-eyebrow-date-dispay, ${t(y)});
    font-weight: var(
      --ds-text-block-eyebrow-date-font-weight,
      ${t(e.fontWeight)}
    ) !important;
    font-size: var(
      --ds-text-block-eyebrow-date-font-size,
      ${t(e.fontSize)}
    ) !important;
    line-height: var(
      --ds-text-block-eyebrow-date-line-height,
      ${t(e.lineHeight)}
    ) !important;
    margin-bottom: var(
      --ds-text-block-eyebrow-date-margin-bottom,
      ${t(e.marginBottom)}
    ) !important;
    color: var(
      --ds-text-block-eyebrow-date-color,
      ${t(I)}
    );
    opacity: var(
      --ds-text-block-eyebrow-date-opacity,
      ${t(C)}
    );
    margin-top: var(
      --ds-text-block-eyebrow-date-margin-top,
      ${t(e.marginTop)}
    ) !important;
  }

  :host [part='text-block__body'] {
    display: var(--ds-text-block-body-display, ${t(K)});
    flex-direction: var(
      --ds-text-block-body-flex-direction,
      ${t(N)}
    );
    align-items: var(
      --ds-text-block-body-align-items,
      ${t(q)}
    );
    gap: var(--ds-text-block-body-gap, ${t(G)});
  }

  :host [part='text-block__footer'] {
    display: var(--ds-text-block-footer-display, ${t(J)});
    flex-direction: var(
      --ds-text-block-footer-flex-direction,
      ${t(M)}
    );
    align-items: var(
      --ds-text-block-footer-align-items,
      ${t(Q)}
    );
    gap: var(--ds-text-block-footer-gap, ${t(R)});
  }

  :host ::slotted([slot='text-block__title-indicator']) {
    --ds-indicator-height: auto;
  }

  :host([size='m']) [part='text-block__headings'],
  :host([size='s']) [part='text-block__headings'],
  :host([size='xs']) [part='text-block__headings'] {
    --ds-text-block-headings-gap: var(--ds-spacing-xs, 0.5rem);
  }

  :host([size='m']),
  :host([size='s']),
  :host([size='xs']),
  :host([size='2xs']),
  :host([configuration='list']),
  :host([configuration='stacked']) {
    --ds-text-block-gap: var(--ds-spacing-m, 1rem);
  }

  :host([size='3xs']) ::slotted([slot='text-block__content']),
  :host([size='4xs']) ::slotted([slot='text-block__content']),
  :host([configuration='default']) ::slotted([slot='text-block__content']),
  :host([configuration='stacked']) ::slotted([slot='text-block__content']),
  :host([configuration='list']) ::slotted([slot='text-block__content']) {
    --ds-text-block-content-font-size: var(--ds-body-xs-font-size);
    --ds-text-block-content-line-height: var(--ds-body-xs-line-height);
  }

  :host([size='4xs']) ::slotted([slot='text-block__heading']) {
    --ds-text-block-heading-font-size: 0.75rem;
    --ds-text-block-heading-line-height: 1rem;
    --ds-text-block-heading-font-weight: 400;
  }

  :host([size='2xs']) ::slotted([slot='text-block__content']),
  :host([size='xs']) ::slotted([slot='text-block__content']),
  :host([size='s']) ::slotted([slot='text-block__content']) {
    --ds-text-block-content-font-size: var(--ds-body-m-font-size);
    --ds-text-block-content-line-height: var(--ds-body-m-line-height);
  }

  :host([size='m']) ::slotted([slot='text-block__content']) {
    --ds-text-block-content-font-size: var(--ds-body-l-font-size, 1.25rem);
    --ds-text-block-content-line-height: var(--ds-body-l-line-height, 2rem);
  }

  :host([size='2xs']) ::slotted([slot='text-block__heading']) {
    --ds-text-block-heading-font-size: var(--ds-heading-2xs-font-size);
    --ds-text-block-heading-line-height: var(--ds-heading-2xs-line-height);
  }

  :host([size='xs']) ::slotted([slot='text-block__heading']) {
    --ds-text-block-heading-font-weight: var(--ds-heading-xs-font-weight);
    --ds-text-block-heading-font-size: var(--ds-heading-xs-font-size);
    --ds-text-block-heading-line-height: var(--ds-heading-xs-line-height);
  }

  :host([size='s']) ::slotted([slot='text-block__heading']) {
    --ds-text-block-heading-font-weight: var(--ds-heading-s-font-weight);
    --ds-text-block-heading-font-size: var(--ds-heading-s-font-size);
    --ds-text-block-heading-line-height: var(--ds-heading-s-line-height);
  }

  :host([size='m']) ::slotted([slot='text-block__heading']) {
    --ds-text-block-heading-font-weight: var(--ds-heading-m-font-weight);
    --ds-text-block-heading-font-size: var(--ds-heading-m-font-size);
    --ds-text-block-heading-line-height: var(--ds-heading-m-line-height);
  }

  :host([configuration='list']) {
    --ds-text-block-flex-direction: row;
  }

  /* Alignment styles */
  :host([alignment='center']) {
    --ds-text-block-align-items: center;
    --ds-text-block-text-align: center;
    --ds-text-block-body-align-items: center;
    --ds-text-block-headings-align-items: center;
    --ds-text-block-flex-direction: column;
  }

  :host([alignment='center']) [part='text-block__header'] {
    --ds-text-block-header-flex-direction: column;
    --ds-text-block-header-align-items: center;
  }
`;var V=Object.defineProperty,X=Object.getOwnPropertyDescriptor,Y=(t,e,o,i)=>{for(var s,l=i>1?void 0:i?X(e,o):e,n=t.length-1;n>=0;n--)(s=t[n])&&(l=(i?s(e,o,l):s(l))||l);return i&&l&&V(e,o,l),l};const Z="store-text-block";let tt=class extends x{constructor(){super(...arguments),this._eyebrowDateSlotEmpty=!0,this._firstSlotEmpty=!0,this._lastSlotEmpty=!0,this._contentSlotEmpty=!0,this._badgeSlotEmpty=!0,this._iconSlotEmpty=!0,this._headingSlotEmpty=!0,this._eyebrowLabelSlotEmpty=!0,this._footerSlotEmpty=!0,this._eyebrowEmpty=!0,this._headingsEmpty=!0,this._bodyEmpty=!0,this._headerEmpty=!0,this.indicator=!1}_handleSlotChange(){this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length,this._contentSlotEmpty=0===this._contentSlot.length,this._eyebrowDateSlotEmpty=0===this._eyebrowDateSlot.length,this._badgeSlotEmpty=0===this._badgeSlot.length,this._iconSlotEmpty=0===this._iconSlot.length,this._headingSlotEmpty=0===this._headingSlot.length,this._eyebrowLabelSlotEmpty=0===this._eyebrowLabelSlot.length,this._footerSlotEmpty=0===this._footerSlot.length,this._eyebrowEmpty=this._eyebrowLabelSlotEmpty&&this._eyebrowDateSlotEmpty,this._headingsEmpty=this._eyebrowEmpty&&this._headingSlotEmpty,this._bodyEmpty=this._contentSlotEmpty&&this._footerSlotEmpty,this._headerEmpty=this._badgeSlotEmpty&&this._iconSlotEmpty,this.configuration!==c.default&&(this._bodyEmpty=this._bodyEmpty&&this._headingsEmpty)}updated(t){if(t.has("_badgeSlotEmpty")&&!this._badgeSlotEmpty){const t=h[this.size]||h.default,e=this._badgeSlot[0];e.hasAttribute("size")||e.setAttribute("size",t)}if(t.has("_iconSlotEmpty")&&!this._iconSlotEmpty){const t=this._iconSlot[0];t.nodeName===p&&!t.hasAttribute("size")&&t.setAttribute("size",g.x2large)}}_renderOptionalSlot(t,e){return b`
      <div part=${t} class=${t} style="${e?"display: none;":""}">
        <slot name=${t} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}_renderEyebrow(){return b`
      <div
        part="text-block__eyebrow"
        class="text-block__eyebrow"
        style="${this._eyebrowEmpty?"display: none;":""}"
      >
        <slot name="text-block__eyebrow-label" @slotchange="${this._handleSlotChange}"></slot>
        ${this._renderOptionalSlot("text-block__eyebrow-date",this._eyebrowDateSlotEmpty)}
      </div>
    `}_renderTitleIndicator(){return b`
      <div part="text-block__title-indicator" class="text-block__title-indicator">
        ${"stacked"===this.configuration&&this.indicator?b`<slot name="text-block__indicator"></slot>`:""}
        <slot name="text-block__heading" @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}_renderBadge(){return b` ${this._renderOptionalSlot("text-block__badge",this._badgeSlotEmpty)} `}_renderIcon(){return b` ${this._renderOptionalSlot("text-block__icon",this._iconSlotEmpty)} `}_renderHeadings(){return b`
      <div
        part="text-block__headings"
        class="text-block__headings"
        style="${this._headingsEmpty?"display: none;":""}"
      >
        ${this._renderEyebrow()} ${this._renderTitleIndicator()}
      </div>
    `}_renderListStacked(){return b`
      ${this._renderOptionalSlot("text-block__first",this._firstSlotEmpty)}
      <div
        part="text-block__header"
        class="text-block__header"
        style="${this._headerEmpty?"display: none;":""}"
      >
        ${this._renderBadge()} ${this._renderIcon()}
      </div>

      <div
        part="text-block__body"
        class="text-block__body"
        style="${this._bodyEmpty?"display: none;":""}"
      >
        ${this._renderHeadings()}
        ${this._renderOptionalSlot("text-block__content",this._contentSlotEmpty)}
        ${this._renderOptionalSlot("text-block__footer",this._footerSlotEmpty)}
      </div>
      ${this._renderOptionalSlot("text-block__last",this._lastSlotEmpty)}
    `}_renderDefault(){return b`
      ${this._renderOptionalSlot("text-block__first",this._firstSlotEmpty)}
      <div part="text-block__header" class="text-block__header">
        ${this._renderBadge()} ${this._renderIcon()} ${this._renderHeadings()}
      </div>

      <div
        part="text-block__body"
        class="text-block__body"
        style="${this._bodyEmpty?"display: none;":""}"
      >
        ${this._renderOptionalSlot("text-block__content",this._contentSlotEmpty)}
        ${this._renderOptionalSlot("text-block__footer",this._footerSlotEmpty)}
      </div>
      ${this._renderOptionalSlot("text-block__last",this._lastSlotEmpty)}
    `}render(){return"list"===this.configuration||"stacked"===this.configuration?this._renderListStacked():this._renderDefault()}};tt.styles=[U],Y([a({slot:"text-block__eyebrow-date"})],tt.prototype,"_eyebrowDateSlot",2),Y([a({slot:"text-block__first"})],tt.prototype,"_firstSlot",2),Y([a({slot:"text-block__last"})],tt.prototype,"_lastSlot",2),Y([a({slot:"text-block__content"})],tt.prototype,"_contentSlot",2),Y([a({slot:"text-block__badge"})],tt.prototype,"_badgeSlot",2),Y([a({slot:"text-block__icon"})],tt.prototype,"_iconSlot",2),Y([a({slot:"text-block__heading"})],tt.prototype,"_headingSlot",2),Y([a({slot:"text-block__eyebrow-label"})],tt.prototype,"_eyebrowLabelSlot",2),Y([a({slot:"text-block__footer"})],tt.prototype,"_footerSlot",2),Y([r()],tt.prototype,"_eyebrowDateSlotEmpty",2),Y([r()],tt.prototype,"_firstSlotEmpty",2),Y([r()],tt.prototype,"_lastSlotEmpty",2),Y([r()],tt.prototype,"_contentSlotEmpty",2),Y([r()],tt.prototype,"_badgeSlotEmpty",2),Y([r()],tt.prototype,"_iconSlotEmpty",2),Y([r()],tt.prototype,"_headingSlotEmpty",2),Y([r()],tt.prototype,"_eyebrowLabelSlotEmpty",2),Y([r()],tt.prototype,"_footerSlotEmpty",2),Y([r()],tt.prototype,"_eyebrowEmpty",2),Y([r()],tt.prototype,"_headingsEmpty",2),Y([r()],tt.prototype,"_bodyEmpty",2),Y([r()],tt.prototype,"_headerEmpty",2),Y([d({reflect:!0})],tt.prototype,"configuration",2),Y([d({reflect:!0})],tt.prototype,"size",2),Y([d({type:Boolean,reflect:!0})],tt.prototype,"indicator",2),Y([d({reflect:!0})],tt.prototype,"alignment",2),tt=Y([_(Z)],tt);export{tt as TextBlock,Z as name};
