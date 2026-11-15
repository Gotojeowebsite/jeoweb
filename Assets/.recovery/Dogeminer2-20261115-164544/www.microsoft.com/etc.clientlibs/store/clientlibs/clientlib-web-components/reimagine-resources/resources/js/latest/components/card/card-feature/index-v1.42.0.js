import{r as t,w as e,i as a,o as r,n as o,e as d,c as n,P as s,M as i,s as c,b as l,ak as f,V as p,d as h}from"../../../tag.const-v1.42.0.js";import{name as u}from"../../media/index-v1.42.0.js";import{name as m}from"../../button-group/index-v1.42.0.js";import{v as _}from"../../../secondary-nav-item.const-v1.42.0.js";import{S as g,B as y,c as b,b as v}from"../../../pagination-item.const-v1.42.0.js";import{c as S}from"../../../card-base.styles-v1.42.0.js";import{SurfaceElement as $}from"../../../base/elements/surface-element/index-v1.42.0.js";const E="column",x="0",k="initial",w="100%",j="var(--ds-spacing-xs)",z="var(--ds-spacing-xs)",C="var(--ds-spacing-xs)",A="0",B="1",O="block",T="var(--ds-theme-foreground-base-highlight)",N="var(--ds-spacing-xs)",P="flex",D="space-between",L="column",M="1",H="var(--ds-card-padding-default)",q="var(--ds-card-padding-default)",F="var(--ds-card-padding-default)",V="var(--ds-card-padding-default)",W="0",G="0",I="0",J="initial",K="0",Q="flex",R="var(--ds-spacing-s)",U="column",X="var(--ds-spacing-2xl)",Y="flex-start",Z=a`
  :host {
    display: var(--ds-card-feature-display, ${t("flex")});
    gap: var(--ds-card-feature-gap, ${t(x)});
    flex-direction: var(
      --ds-card-feature-flex-direction,
      ${t(E)}
    );
    justify-content: var(
      --ds-card-feature-justify-content,
      ${t(k)}
    );
    height: var(--ds-card-feature-height, ${t(w)});

    --ds-media-asset-border-start-start-radius: var(--ds-radii-m);
    --ds-media-asset-border-start-end-radius: var(--ds-radii-m);
    --ds-media-asset-border-end-end-radius: var(--ds-radii-m);
    --ds-media-asset-border-end-start-radius: var(--ds-radii-m);
    --ds-surface-border-radius: var(--ds-radii-l) !important;
    --ds-media-width: 100%;
    --ds-media-height: 100%;
    --ds-card-feature-flex-direction: column;
    --ds-badge-box-shadow: none;
    --ds-media-asset-width: 100%;
    --ds-media-asset-height: auto;
    --ds-card-base-overflow: visible;
  }

  ::slotted(store-tag) {
    margin-bottom: var(--ds-spacing-xs, 0.5rem);
  }

  :host::part(card-feature__media) {
    /* Padding for the top media section */
    padding-inline-start: var(
      --ds-card-feature-media-padding-inline-start,
      ${t(j)}
    );
    padding-inline-end: var(
      --ds-card-feature-media-padding-inline-end,
      ${t(z)}
    );
    padding-block-start: var(
      --ds-card-feature-media-padding-block-start,
      ${t(C)}
    );
    padding-block-end: var(
      --ds-card-feature-media-padding-block-end,
      ${t(A)}
    );
    flex: var(--ds-card-feature-top-flex, ${t(B)});
  }

  :host::part(card-feature__content) {
    /* Styles for the content section */
    display: var(
      --ds-card-feature-content-display,
      ${t(P)}
    );
    justify-content: var(
      --ds-card-feature-content-justify-content,
      ${t(D)}
    );
    flex-direction: var(
      --ds-card-feature-content-flex-direction,
      ${t(L)}
    );
    padding-inline-start: var(
      --ds-card-feature-content-padding-inline-start,
      ${t(H)}
    );
    padding-inline-end: var(
      --ds-card-feature-content-padding-inline-end,
      ${t(q)}
    );
    padding-block-start: var(
      --ds-card-feature-content-padding-block-start,
      ${t(F)}
    );
    padding-block-end: var(
      --ds-card-feature-content-padding-block-end,
      ${t(V)}
    );
    flex: var(--ds-card-feature-content-flex, ${t(M)});
  }

  :host::part(card-feature__content-header) {
    /* Styles for the content header text section */
    font-size: var(
      --ds-card-feature-label-font-size,
      ${t(e.fontSize)}
    );
    line-height: var(
      --ds-card-feature-label-line-height,
      ${t(e.lineHeight)}
    );
    color: var(--ds-feature-label-color, ${t(T)});
    font-weight: var(
      --ds-card-feature-label-font-weight,
      ${t(e.fontWeight)}
    );
    padding-block-end: var(
      --ds-card-feature-label-padding-block-end,
      ${t(N)}
    );
  }

  :host(:not([configuration='vertical']))::part(card-feature__content-header) {
    display: var(--ds-card-feature-label-display, ${t(O)});
  }

  :host(:not([configuration='vertical']))::part(card-feature__content-body) {
    flex-grow: 1;
  }

  :host([configuration='horizontal'])::part(card-feature__content-body),
  :host([configuration=''])::part(card-feature__content-body) {
    flex-grow: 0;
  }

  :host([theme='night'])::part(card-feature__content-header) {
    --ds-feature-label-color: var(--ds-color-sky-blue-50);
  }

  :host::part(card-feature__content-body) {
    /* Styles for the content body textblock section */
    flex-grow: 0;
    margin-inline-start: var(
      --ds-card-feature-content-body-margin-inline-start,
      ${t(W)}
    );
    margin-inline-end: var(
      --ds-card-feature-content-body-margin-inline-end,
      ${t(G)}
    );
    margin-block-start: var(
      --ds-card-feature-content-body-margin-block-start,
      ${t(I)}
    );
    margin-block-end: var(
      --ds-card-feature-content-body-margin-block-end,
      ${t(J)}
    );
  }

  :host([configuration='vertical'])::part(card-feature__content-body) {
    margin-block-end: var(
      --ds-card-feature-content-body-margin-block-end-vertical,
      ${t(K)}
    );
  }

  :host::part(card-feature__content-footer) {
    /* Styles for the content footer section */
    display: var(
      --ds-card-feature-content-footer-display,
      ${t(Q)}
    );
    gap: var(--ds-card-feature-content-footer-gap, ${t(R)});
    flex-direction: var(
      --ds-card-feature-content-footer-flex-direction,
      ${t(U)}
    );
    margin-block-start: var(
      --ds-card-feature-content-footer-margin-block-start,
      ${t(X)}
    );
  }

  :host([alignment='right'])::part(card-feature__content-footer-bottom) {
    align-items: var(
      --ds-card-feature-content-footer-bottom-align-items,
      ${t(Y)}
    );
  }
`,tt=a`
  :host {
    --ds-card-feature-flex-direction: column;
  }
  @media (min-width: ${t(_.md)}) {
    :host([configuration='horizontal']) {
      --ds-card-feature-display: flex;
      --ds-card-feature-justify-content: space-between;
      --ds-card-feature-flex-direction: row-reverse;
      --ds-card-feature-media-padding-inline-start: 0;
      --ds-card-feature-media-padding-block-end: var(--ds-spacing-xs);
    }

    :host([configuration='horizontal'])::part(card-feature__content-header) {
      --ds-card-feature-label-font-size: ${t(r.fontSize)};
      --ds-card-feature-label-line-height: ${t(r.lineHeight)};
    }

    :host([configuration='horizontal'])::part(card-feature__content) {
      --ds-card-feature-content-justify-content: space-between;
    }

    :host([configuration='horizontal'])::part(card-feature__content-header),
    :host([configuration='horizontal'])::part(card-feature__content-body),
    :host([configuration='horizontal'])::part(card-feature__content-footer) {
      padding-inline-end: var(--ds-card-padding-default);
    }
  }
`;var et=Object.defineProperty,at=Object.getOwnPropertyDescriptor,rt=(t,e,a,r)=>{for(var o,d=r>1?void 0:r?at(e,a):e,n=t.length-1;n>=0;n--)(o=t[n])&&(d=(r?o(e,a,d):o(d))||d);return r&&d&&et(e,a,d),d};const ot="store-card-feature";let dt=class extends ${constructor(){super(),this._firstSlotEmpty=!0,this._tagSlotEmpty=!0,this._mediaSlotEmpty=!0,this._headerSlotEmpty=!0,this._footerTopSlotEmpty=!0,this._footerBottomSlotEmpty=!0,this._footerContentEmpty=!0,this._lastSlotEmpty=!0,this.surface=g.solidBorder,this.themeDaySurface=g.solidBorder,this.themeNightSurface=g.glass}updated(t){super.updated(t),t.has("theme")&&this._updateSurface()}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}_updateSurface(){this.theme===s.day&&this.themeDaySurface?this.surface=this.themeDaySurface:this.theme===s.night&&this.themeNightSurface&&(this.surface=this.themeNightSurface)}_handleSlotChange(t){this._firstSlotEmpty=0===this._firstSlot.length,this._mediaSlotEmpty=0===this._mediaSlot.length,this._headerSlotEmpty=0===this._topSlot.length,this._footerTopSlotEmpty=0===this._footerTopSlot.length,this._footerBottomSlotEmpty=0===this._footerBottomSlot.length,this._lastSlotEmpty=0===this._lastSlot.length,this._tagSlotEmpty=0===this._tagSlot.length,this._footerContentEmpty=this._footerTopSlotEmpty&&this._footerBottomSlotEmpty;const e=t.target.name;"card-feature__media"===e&&!this._mediaSlotEmpty&&this._updateMediaAttributes(),"card-feature__content-footer-bottom"===e&&!this._footerBottomSlotEmpty&&this._updateButtonAttributes(),"tag"===e&&!this._tagSlotEmpty&&this._updateTagAttributes()}_updateMediaAttributes(){const t=this._mediaSlot.filter(t=>t.nodeName.toLowerCase()===u);t.length>0&&t.forEach(t=>{t.hasAttribute("aspect-ratio")||t.setAttribute("aspect-ratio","vertical"===this.configuration?i.ratio21to9:"initial")})}_updateTagAttributes(){const t=this._tagSlot.filter(t=>"store-tag"===t.nodeName.toLowerCase());t.length>0&&t.forEach(t=>{c(t,{size:p.small,appearance:f.new})})}_updateButtonAttributes(){const t=this._footerBottomSlot.filter(t=>t.nodeName.toLowerCase()===m);t.length>0&&t.forEach(t=>{const e=t.querySelector("store-button");e&&(e.hasAttribute("appearance")||e.setAttribute("appearance",y.buttonPrimary),e.hasAttribute("shape")||e.setAttribute("shape",b.rounded),e.hasAttribute("size")||e.setAttribute("size",v.medium))})}_renderOptionalSlot(t="card-feature__first",e=this._firstSlotEmpty){return l`
      <div part=${t} class=${t} style="${e?"display: none;":""}">
        <slot name=${t} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}_renderSlot(t){return l`
      <div part="${t}" class="${t}">
        <slot name="${t}" @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}render(){return l`
      ${this._renderOptionalSlot("card-feature__first",this._firstSlotEmpty)}
      ${this._renderSlot("card-feature__media")}
      <div class="card-feature__content" part="card-feature__content">
        ${this._renderOptionalSlot("tag",this._tagSlotEmpty)}
        ${this._renderOptionalSlot("card-feature__content-header",this._headerSlotEmpty)}
        ${this._renderSlot("card-feature__content-body")}
        <div
          class="card-feature__content-footer"
          part="card-feature__content-footer"
          style="${this._footerContentEmpty?"display: none;":""}"
        >
          ${this._renderOptionalSlot("card-feature__content-footer-top",this._footerTopSlotEmpty)}
          ${this._renderOptionalSlot("card-feature__content-footer-bottom",this._footerBottomSlotEmpty)}
        </div>
      </div>
      ${this._renderOptionalSlot("card-feature__last",this._lastSlotEmpty)}
    `}};dt.styles=[S,Z,tt],rt([o({reflect:!0})],dt.prototype,"theme",2),rt([o({type:String,reflect:!0})],dt.prototype,"configuration",2),rt([d({slot:"card-feature__first"})],dt.prototype,"_firstSlot",2),rt([d({slot:"tag"})],dt.prototype,"_tagSlot",2),rt([d({slot:"card-feature__media"})],dt.prototype,"_mediaSlot",2),rt([d({slot:"card-feature__content-header"})],dt.prototype,"_topSlot",2),rt([d({slot:"card-feature__content-footer-top"})],dt.prototype,"_footerTopSlot",2),rt([d({slot:"card-feature__content-footer-bottom"})],dt.prototype,"_footerBottomSlot",2),rt([d({slot:"card-feature__last"})],dt.prototype,"_lastSlot",2),rt([n()],dt.prototype,"_firstSlotEmpty",2),rt([n()],dt.prototype,"_tagSlotEmpty",2),rt([n()],dt.prototype,"_mediaSlotEmpty",2),rt([n()],dt.prototype,"_headerSlotEmpty",2),rt([n()],dt.prototype,"_footerTopSlotEmpty",2),rt([n()],dt.prototype,"_footerBottomSlotEmpty",2),rt([n()],dt.prototype,"_footerContentEmpty",2),rt([n()],dt.prototype,"_lastSlotEmpty",2),dt=rt([h(ot)],dt);export{dt as CardFeature,ot as name};
