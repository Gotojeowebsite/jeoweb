import{r as t,i as e,e as i,c as a,O as o,n as s,R as l,m as r,H as n,b as d,y as h,d as u}from"../../../tag.const-v1.42.0.js";import{b as c,v as b,o as p}from"../../../secondary-nav-item.const-v1.42.0.js";import{k as g}from"../../../spacing-tokens.const-v1.42.0.js";import"../../../util4-v1.42.0.js";import{a as _}from"../../../util9-v1.42.0.js";import"../../../base/layout/layout-column/index-v1.42.0.js";import{n as m}from"../../../util6-v1.42.0.js";import{n as f}from"../../../util1-v1.42.0.js";import{b as v,c as y,B as k}from"../../../pagination-item.const-v1.42.0.js";import{n as S}from"../../../util20-v1.42.0.js";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let C=class extends Event{constructor(t,e,i,a){super("context-request",{bubbles:!0,composed:!0}),this.context=t,this.contextTarget=e,this.callback=i,this.subscribe=a??!1}};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class j{get value(){return this.o}set value(t){this.setValue(t)}setValue(t,e=!1){const i=e||!Object.is(t,this.o);this.o=t,i&&this.updateObservers()}constructor(t){this.subscriptions=new Map,this.updateObservers=()=>{for(const[t,{disposer:e}]of this.subscriptions)t(this.o,e)},void 0!==t&&(this.value=t)}addCallback(t,e,i){if(!i)return void t(this.value);this.subscriptions.has(t)||this.subscriptions.set(t,{disposer:()=>{this.subscriptions.delete(t)},consumerHost:e});const{disposer:a}=this.subscriptions.get(t);t(this.value,a)}clearCallbacks(){this.subscriptions.clear()}}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let O=class extends Event{constructor(t,e){super("context-provider",{bubbles:!0,composed:!0}),this.context=t,this.contextTarget=e}};class x extends j{constructor(t,e,i){var a,o;super(void 0!==e.context?e.initialValue:i),this.onContextRequest=t=>{if(t.context!==this.context)return;const e=t.contextTarget??t.composedPath()[0];e!==this.host&&(t.stopPropagation(),this.addCallback(t.callback,e,t.subscribe))},this.onProviderRequest=t=>{if(t.context!==this.context||(t.contextTarget??t.composedPath()[0])===this.host)return;const e=new Set;for(const[t,{consumerHost:i}]of this.subscriptions)e.has(t)||(e.add(t),i.dispatchEvent(new C(this.context,i,t,!0)));t.stopPropagation()},this.host=t,void 0!==e.context?this.context=e.context:this.context=e,this.attachListeners(),null==(o=(a=this.host).addController)||o.call(a,this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new O(this.context,this.host))}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B="flex",$="row",A="initial",M="initial",w="center",E="initial",L="none",T="relative",z="var(--ds-breadth-vertical-default, 6rem)",H="var(--ds-breadth-vertical-default, 6rem)",P="flex",V="column",q="var(--ds-density-vertical-default, 3rem)",F="100%",U="absolute",R="0",N="0",D="0",W="0",I="unset",G="hidden",J="-1",K="100%",Q="0",X="0",Y=e`
  :host {
    display: var(--ds-ui-shell-display, ${t(B)});
    flex-direction: var(--ds-ui-shell-flex-direction, ${t($)});
    position: var(--ds-ui-shell-position, ${t(T)});
    height: var(--ds-ui-shell-height, ${t(A)});
    min-height: var(--ds-ui-shell-min-height, ${t(E)});
    max-height: var(--ds-ui-shell-max-height, ${t(L)});
    padding-block-start: var(
      --ds-ui-shell-padding-block-start,
      ${t(z)}
    );
    padding-block-end: var(
      --ds-ui-shell-padding-block-end,
      ${t(H)}
    );
    justify-content: var(
      --ds-ui-shell-justify-content,
      ${t(M)}
    );
    align-items: var(--ds-ui-shell-align-items, ${t(w)});
    z-index: var(--ds-ui-shell-z-index, 0);
  }

  .ui-shell__header {
    display: block;
  }

  .ui-shell__base {
    display: var(--ds-ui-shell-base-display, ${t(B)});
    flex-direction: var(--ds-ui-shell-base-flex-direction, column);
    row-gap: var(--ds-ui-shell-content-row-gap, ${t(q)});
    width: 100%;
  }

  .ui-shell__header-layout ::slotted(store-layout-column:nth-of-type(2)) {
    display: flex;
    justify-content: flex-end;
  }

  .ui-shell__content {
    --ds-tabs-base-margin-block-end: var(
      --ds-ui-shell-content-row-gap,
      ${t(q)}
    );

    display: var(
      --ds-ui-shell-content-display,
      ${t(P)}
    );
    flex-direction: var(
      --ds-ui-shell-content-flex-direction,
      ${t(V)}
    );
    row-gap: var(--ds-ui-shell-content-row-gap, ${t(q)});
    width: var(--ds-ui-shell-content-width, ${t(F)});
    justify-content: var(--ds-ui-shell-justify-content, initial);
    align-items: var(--ds-ui-shell-justify-content, initial);
  }

  .ui-shell__footer-container {
    --ds-container-width: 100%;
    --ds-button-min-width: 100%;
  }

  :host([breadth='relaxed']) {
    --ds-ui-shell-padding-block-start: ${t(z)};
    --ds-ui-shell-padding-block-end: ${t(H)};
  }

  :host([breadth='comfortable']) {
    --ds-ui-shell-padding-block-start: var(--ds-breadth-vertical-comfortable, 4.5rem);
    --ds-ui-shell-padding-block-end: var(--ds-breadth-vertical-comfortable, 4.5rem);
  }

  :host([breadth='compact']) {
    --ds-ui-shell-padding-block-start: var(--ds-breadth-vertical-compact, 3rem);
    --ds-ui-shell-padding-block-end: var(--ds-breadth-vertical-compact, 3rem);
  }

  :host([breadth='none']) {
    --ds-ui-shell-padding-block-start: 0;
    --ds-ui-shell-padding-block-end: 0;
  }

  :host([top-breadth='relaxed']) {
    --ds-ui-shell-padding-block-start: ${t(z)};
  }

  :host([top-breadth='comfortable']) {
    --ds-ui-shell-padding-block-start: var(
      --ds-top-breadth-vertical-comfortable,
      var(--ds-breadth-vertical-comfortable)
    );
  }

  :host([top-breadth='compact']) {
    --ds-ui-shell-padding-block-start: var(
      --ds-top-breadth-vertical-compact,
      var(--ds-breadth-vertical-compact)
    );
  }

  :host([top-breadth='none']) {
    --ds-ui-shell-padding-block-start: 0;
  }

  :host([bottom-breadth='relaxed']) {
    --ds-ui-shell-padding-block-end: ${t(H)};
  }

  :host([bottom-breadth='comfortable']) {
    --ds-ui-shell-padding-block-end: var(
      --ds-bottom-breadth-vertical-comfortable,
      var(--ds-breadth-vertical-comfortable)
    );
  }

  :host([bottom-breadth='compact']) {
    --ds-ui-shell-padding-block-end: var(
      --ds-bottom-breadth-vertical-compact,
      var(--ds-breadth-vertical-compact)
    );
  }

  :host([bottom-breadth='none']) {
    --ds-ui-shell-padding-block-end: 0;
  }

  :host([density='default']) {
    --ds-ui-shell-content-row-gap: ${t(q)};
  }

  :host([density='compact']) {
    --ds-ui-shell-content-row-gap: var(--ds-density-vertical-compact, 2rem);
  }

  :host([density='none']) {
    --ds-ui-shell-content-row-gap: var(--ds-density-vertical-none, 0);
  }

  :host([horizontal-align='left']) {
    --ds-ui-shell-justify-content: flex-start;
  }

  :host([horizontal-align='center']) {
    --ds-ui-shell-justify-content: center;
  }

  :host([horizontal-align='right']) {
    --ds-ui-shell-justify-content: flex-end;
  }

  :host([vertical-align='top']) {
    --ds-ui-shell-align-items: flex-start;
  }

  :host([vertical-align='center']) {
    --ds-ui-shell-align-items: center;
  }

  :host([vertical-align='bottom']) {
    --ds-ui-shell-align-items: flex-end;
  }

  .ui-shell__background {
    position: var(
      --ds-ui-shell-background-position,
      ${t(U)}
    );
    top: var(--ds-ui-shell-background-top, ${t(R)});
    right: var(--ds-ui-shell-background-right, ${t(N)});
    bottom: var(--ds-ui-shell-background-bottom, ${t(D)});
    left: var(--ds-ui-shell-background-left, ${t(W)});
    transform: var(
      --ds-ui-shell-background-transform,
      ${t(I)}
    );
    overflow: var(
      --ds-ui-shell-background-overflow,
      ${t(G)}
    );
    padding-block-start: var(
      --ds-ui-shell-background-padding-block-start,
      ${t(Q)}
    );
    padding-block-end: var(
      --ds-ui-shell-background-padding-block-end,
      ${t(X)}
    );
    width: var(--ds-ui-shell-background-width, ${t(K)});
    z-index: var(--ds-ui-shell-background-z-index, ${t(J)});
  }

  .ui-shell__background-media {
    --ds-media-display: block;
    --ds-media-width: 100%;
    --ds-media-height: 100%;
    --ds-media-object-fit: cover;
    --ds-media-picture-height: 100%;
    --ds-media-asset-display: block;
    --ds-media-asset-width: 100%;
    --ds-media-asset-height: 100%;
    height: 100%;
  }
`,Z=e`
  @media (max-width: ${t(c(b.sm))}) {
    .ui-shell__header-layout ::slotted(store-layout-column:nth-of-type(2)) {
      display: none;
    }
  }

  @media (max-width: ${t(c(b.md))}) {
    :host([media-appearance='stack-mobile']),
    :host([media-appearance='stack-mobile-reverse']) {
      --ds-ui-shell-background-position: relative;
      --ds-ui-shell-background-z-index: 0;
    }

    :host([media-appearance='stack-mobile']) {
      --ds-ui-shell-flex-direction: column;
      --ds-ui-shell-padding-block-start: 0;
      --ds-ui-shell-background-padding-block-end: var(
        --ds-ui-shell-content-row-gap,
        var(--ds-density-vertical-default, 3rem)
      );
    }

    :host([media-appearance='stack-mobile-reverse']) {
      --ds-ui-shell-flex-direction: column-reverse;
      --ds-ui-shell-padding-block-end: 0;
      --ds-ui-shell-background-padding-block-start: var(
        --ds-ui-shell-content-row-gap,
        var(--ds-density-vertical-default, 3rem)
      );
    }

    .ui-shell__background-foreground {
      --ds-ui-shell-background-overflow: visible;
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: center;
      margin-block-end: var(--ds-ui-shell-background-padding-block-end);
    }

    .ui-shell__background-foreground .ui-shell__background-media {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .ui-shell__background-foreground .ui-shell__foreground-media {
      display: flex;
      padding-block-start: var(--ds-ui-shell-background-padding-block-end);
      padding-inline: ${t(g.default.value)};
      z-index: 2;
    }

    .ui-shell__background-foreground picture img {
      width: 100%;
    }

    .ui-shell__header-layout ::slotted(store-layout-column:nth-of-type(2)) {
      justify-content: flex-start;
    }
  }

  @media (min-width: ${t(b.sm)}) {
    .ui-shell__footer-container {
      display: none;
    }
  }
`,tt="uiShellContextUpdate",et=Symbol.for("ui-shell-context");var it=Object.defineProperty,at=Object.getOwnPropertyDescriptor,ot=(t,e,i,a)=>{for(var o,s=a>1?void 0:a?at(e,i):e,l=t.length-1;l>=0;l--)(o=t[l])&&(s=(a?o(e,i,s):o(s))||s);return a&&s&&it(e,i,s),s};const st="store-ui-shell";let lt=class extends l{constructor(){super(...arguments),this._firstSlotEmpty=!0,this._lastSlotEmpty=!0,this._defaultSlotEmpty=!0,this._backgroundMediaSlotEmpty=!0,this._headerLayoutSlotEmpty=!0,this._tabs=[],this._backgroundForegroundClass="ui-shell__background-foreground",this._foregroundMediaClass="ui-shell__foreground-media-target",this._foregroundMediaCloneClass="ui-shell__foreground-media-clone",this.enableTabsBaseContainer=!1,this.enableTabsPanelContainer=!1,this.backgroundVideo=!1,this.uiShellObject={theme:"",background:"",breadth:"",topBreadth:"",bottomBreadth:"",density:"",mediaAppearance:"",mediaOverlay:"",horizontalAlign:"",verticalAlign:"",foregroundMedia:void 0,headerLayoutConfiguration:"",headerAlignmentConfiguration:"",headerHeadingBlock:void 0,headerButton:void 0,enableTabsBaseContainer:!1,enableTabsPanelContainer:!1}}_handleSlotChange(){this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length,this._defaultSlotEmpty=0===this._defaultSlot.length,this._defaultSlotEmpty||(this._tabs=this._defaultSlot.filter(t=>t.tagName.toLowerCase()===S),this._tabs.length>0&&this._updateTabsBaseContainer())}_handleMediaSlotChange(){this._backgroundMediaSlotEmpty=0===this._backgroundMediaSlot.length,this._backgroundMediaSlotEmpty||(this._backgroundMedia=this._backgroundMediaSlot[0],"store-media"===this._backgroundMedia.nodeName.toLowerCase()&&(this.mediaOverlay&&!this._backgroundMedia.hasAttribute("overlay")&&this._backgroundMedia.setAttribute("overlay",this.mediaOverlay),this.backgroundVideo&&(this._backgroundMedia.hasAttribute("video")||this._backgroundMedia.setAttribute("video",""),this._backgroundMedia.hasAttribute("video-fit")||this._backgroundMedia.setAttribute("video-fit","cover"))))}_handleHeaderSlotChange(){this._headerLayoutSlotEmpty=0===this._headerLayoutSlot.length,this._headerLayoutSlotEmpty||this._headerLayoutSlot.forEach((t,e)=>{const i=t.querySelector(m);if(i&&!this._headerHeadingBlock&&(this._headerHeadingBlock=i,this._headerHeadingBlock.hasAttribute("size")||this._headerHeadingBlock.setAttribute("size",r["size-md"]),this._headerHeadingBlock.hasAttribute("alignment")||(this.headerAlignmentConfiguration?this._headerHeadingBlock.setAttribute("alignment",this.headerAlignmentConfiguration):this._headerHeadingBlock.setAttribute("alignment",n.left))),1===e){const e=t.querySelector(f);e&&!this._headerButton&&(this._headerButton=e,this._headerButton.hasAttribute("size")||this._headerButton.setAttribute("size",v.large),this._headerButton.hasAttribute("shape")||this._headerButton.setAttribute("shape",y.rounded),this._headerButton.hasAttribute("appearance")||this._headerButton.setAttribute("appearance",k.buttonSecondary),this._footerButton=this._headerButton.cloneNode(!0))}})}_renderOptionalSlot(t="ui-shell__first",e=this._firstSlotEmpty){return d`
      <div part=${t} class=${t} style="${e?"display: none;":""}">
        <slot name=${t} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}_updateAttrByContext(){""!==this.uiShellObject.theme&&(this.theme=this.uiShellObject.theme),""!==this.uiShellObject.background&&(this.background=this.uiShellObject.background),""!==this.uiShellObject.breadth&&(this.breadth=this.uiShellObject.breadth),""!==this.uiShellObject.topBreadth&&(this.topBreadth=this.uiShellObject.topBreadth),""!==this.uiShellObject.bottomBreadth&&(this.bottomBreadth=this.uiShellObject.bottomBreadth),""!==this.uiShellObject.density&&(this.density=this.uiShellObject.density),""!==this.uiShellObject.mediaAppearance&&(this.mediaAppearance=this.uiShellObject.mediaAppearance),""!==this.uiShellObject.mediaOverlay&&(this.mediaOverlay=this.uiShellObject.mediaOverlay),""!==this.uiShellObject.horizontalAlign&&(this.horizontalAlign=this.uiShellObject.horizontalAlign),""!==this.uiShellObject.verticalAlign&&(this.verticalAlign=this.uiShellObject.verticalAlign),void 0!==this.uiShellObject.foregroundMedia&&(this._foregroundMedia=this.uiShellObject.foregroundMedia,this._replicateMediaElement()),""!==this.uiShellObject.headerLayoutConfiguration&&(this.headerLayoutConfiguration=this.uiShellObject.headerLayoutConfiguration),""!==this.uiShellObject.headerAlignmentConfiguration&&(this.headerAlignmentConfiguration=this.uiShellObject.headerAlignmentConfiguration),void 0!==this.uiShellObject.headerHeadingBlock&&(this._headerHeadingBlock=this.uiShellObject.headerHeadingBlock),void 0!==this.uiShellObject.headerButton&&(this._headerButton=this.uiShellObject.headerButton),void 0!==this.uiShellObject.enableTabsBaseContainer&&(this.enableTabsBaseContainer=this.uiShellObject.enableTabsBaseContainer),void 0!==this.uiShellObject.enableTabsPanelContainer&&(this.enableTabsPanelContainer=this.uiShellObject.enableTabsPanelContainer)}_updateContextByAttr(){this.uiShellObject&&(this.uiShellObject.background=this.background||"",this.uiShellObject.breadth=this.breadth||"",this.uiShellObject.topBreadth=this.topBreadth||"",this.uiShellObject.bottomBreadth=this.bottomBreadth||"",this.uiShellObject.density=this.density||"",this.uiShellObject.mediaAppearance=this.mediaAppearance||"",this.uiShellObject.mediaOverlay=this.mediaOverlay||"",this.uiShellObject.horizontalAlign=this.horizontalAlign||"",this.uiShellObject.verticalAlign=this.verticalAlign||"",this.uiShellObject.headerLayoutConfiguration=this.headerLayoutConfiguration||"",this.uiShellObject.headerAlignmentConfiguration=this.headerAlignmentConfiguration||"",this.uiShellObject.headerHeadingBlock=this._headerHeadingBlock||void 0,this.uiShellObject.headerButton=this._headerButton||void 0,this.uiShellObject.enableTabsBaseContainer=this.enableTabsBaseContainer||!1,this.uiShellObject.enableTabsPanelContainer=this.enableTabsPanelContainer||!1)}_updateTabsBaseContainer(){this._tabs.forEach(t=>{t.hasAttribute("enable-tabs-base-container")||(this.enableTabsBaseContainer=!0),t.enableBaseContainer=this.enableTabsBaseContainer,t.enablePanelContainer=this.enableTabsPanelContainer})}_renderMediaSlot(){return d`
      <div
        part="ui-shell__background"
        class="ui-shell__background"
        style="${this._backgroundMediaSlotEmpty?"display: none;":""}"
      >
        <div part="ui-shell__background-media" class="ui-shell__background-media">
          <slot
            name="ui-shell__background-media"
            @slotchange="${this._handleMediaSlotChange}"
          ></slot>
        </div>

        <div class="ui-shell__background-overlay"></div>
        <div class="ui-shell__foreground-media" part="ui-shell__foreground-media"></div>
      </div>
    `}_renderContentSlot(){return d`
      <div part="ui-shell__content" class="ui-shell__content">
        <slot @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}_replicateMediaElement(){var t,e,i;const a=this.uiShellObject.foregroundMedia||this.querySelector(`.${this._foregroundMediaClass}`)||void 0;if(this._foregroundMediaContainer&&a){const i=a.cloneNode(!0);i.classList.add(this._foregroundMediaCloneClass),i.classList.remove(this._foregroundMediaClass),i.style.display="",this._foregroundMedia=i,this._foregroundMediaContainer.innerHTML="",null==(t=this._foregroundMediaContainer)||t.append(this._foregroundMedia),null==(e=this._backgroundMediaContainer)||e.classList.add(this._backgroundForegroundClass)}else null==(i=this._backgroundMediaContainer)||i.classList.remove(this._backgroundForegroundClass)}_renderHeader(){return d`
      <div
        class="ui-shell__header"
        part="ui-shell__header"
        style="${this._headerLayoutSlotEmpty?"display: none;":""}"
      >
        <store-container class="ui-shell__header-container" part="ui-shell__header-container">
          <store-layout
            class="ui-shell__header-layout"
            part="ui-shell__header-layout"
            configuration="${"center"===this.headerAlignmentConfiguration?_.col1even:h(this.headerLayoutConfiguration)}"
          >
            <slot name="ui-shell__header-layout" @slotchange=${this._handleHeaderSlotChange}></slot>
          </store-layout>
        </store-container>
      </div>
    `}_renderFooterButton(){if(this._footerButton)return d`
      <store-container class="ui-shell__footer-container" part="ui-shell__footer-container">
        <store-layout
          class="ui-shell__footer-layout"
          part="ui-shell__footer-layout"
          configuration="${_.col1even}"
        >
          <store-layout-column> ${this._footerButton} </store-layout-column>
        </store-layout>
      </store-container>
    `}_updateUiShellContext(t){this.uiShellObject={...this.uiShellObject,...t.detail},this._updateAttrByContext()}firstUpdated(){this._replicateMediaElement()}updated(t){this._updateContextByAttr(),t.has("enableTabsBaseContainer")&&this._updateTabsBaseContainer()}connectedCallback(){super.connectedCallback(),this.addEventListener(tt,this._updateUiShellContext)}disconnectedCallback(){this.removeEventListener(tt,this._updateUiShellContext),super.disconnectedCallback()}render(){return d`
      ${this._renderOptionalSlot("ui-shell__first",this._firstSlotEmpty)}
      ${this._renderMediaSlot()}
      <div class="ui-shell__base" part="ui-shell__base">
        ${this._renderHeader()} ${this._renderContentSlot()} ${this._renderFooterButton()}
      </div>

      ${this._renderOptionalSlot("ui-shell__last",this._lastSlotEmpty)}
    `}};lt.styles=[Y,Z],ot([i({slot:"ui-shell__first"})],lt.prototype,"_firstSlot",2),ot([i({slot:"ui-shell__last"})],lt.prototype,"_lastSlot",2),ot([p({flatten:!0})],lt.prototype,"_defaultSlot",2),ot([i({slot:"ui-shell__background-media"})],lt.prototype,"_backgroundMediaSlot",2),ot([i({slot:"ui-shell__header-layout"})],lt.prototype,"_headerLayoutSlot",2),ot([a()],lt.prototype,"_firstSlotEmpty",2),ot([a()],lt.prototype,"_lastSlotEmpty",2),ot([a()],lt.prototype,"_defaultSlotEmpty",2),ot([a()],lt.prototype,"_backgroundMediaSlotEmpty",2),ot([a()],lt.prototype,"_headerLayoutSlotEmpty",2),ot([o(".ui-shell__background")],lt.prototype,"_backgroundMediaContainer",2),ot([o(".ui-shell__foreground-media")],lt.prototype,"_foregroundMediaContainer",2),ot([a()],lt.prototype,"_backgroundMedia",2),ot([a()],lt.prototype,"_headerHeadingBlock",2),ot([a()],lt.prototype,"_headerButton",2),ot([a()],lt.prototype,"_footerButton",2),ot([a()],lt.prototype,"_tabs",2),ot([s({reflect:!1})],lt.prototype,"_backgroundForegroundClass",2),ot([s({reflect:!1})],lt.prototype,"_foregroundMediaClass",2),ot([s({reflect:!1})],lt.prototype,"_foregroundMediaCloneClass",2),ot([s({reflect:!1,attribute:!1})],lt.prototype,"_foregroundMedia",2),ot([s({reflect:!0})],lt.prototype,"theme",2),ot([s({reflect:!0})],lt.prototype,"background",2),ot([s({reflect:!0})],lt.prototype,"breadth",2),ot([s({reflect:!0,attribute:"top-breadth"})],lt.prototype,"topBreadth",2),ot([s({reflect:!0,attribute:"bottom-breadth"})],lt.prototype,"bottomBreadth",2),ot([s({reflect:!0})],lt.prototype,"density",2),ot([s({reflect:!0,attribute:"media-appearance"})],lt.prototype,"mediaAppearance",2),ot([s({reflect:!0,attribute:"media-overlay"})],lt.prototype,"mediaOverlay",2),ot([s({reflect:!0,attribute:"horizontal-align"})],lt.prototype,"horizontalAlign",2),ot([s({reflect:!0,attribute:"vertical-align"})],lt.prototype,"verticalAlign",2),ot([s({reflect:!0,attribute:"header-layout-configuration"})],lt.prototype,"headerLayoutConfiguration",2),ot([s({reflect:!0,attribute:"header-align"})],lt.prototype,"headerAlignmentConfiguration",2),ot([s({type:Boolean,reflect:!0,attribute:"enable-tabs-base-container"})],lt.prototype,"enableTabsBaseContainer",2),ot([s({type:Boolean,reflect:!0,attribute:"enable-tabs-panel-container"})],lt.prototype,"enableTabsPanelContainer",2),ot([s({type:Boolean,reflect:!0,attribute:"background-video"})],lt.prototype,"backgroundVideo",2),ot([function({context:t}){return(e,i)=>{const a=new WeakMap;if("object"==typeof i)return{get(){return e.get.call(this)},set(t){return a.get(this).setValue(t),e.set.call(this,t)},init(e){return a.set(this,new x(this,{context:t,initialValue:e})),e}};{e.constructor.addInitializer(e=>{a.set(e,new x(e,{context:t}))});const o=Object.getOwnPropertyDescriptor(e,i);let s;if(void 0===o){const t=new WeakMap;s={get(){return t.get(this)},set(e){a.get(this).setValue(e),t.set(this,e)},configurable:!0,enumerable:!0}}else{const t=o.set;s={...o,set(e){a.get(this).setValue(e),null==t||t.call(this,e)}}}return void Object.defineProperty(e,i,s)}}}({context:et}),s({attribute:!1})],lt.prototype,"uiShellObject",2),lt=ot([u(st)],lt);export{lt as UiShell,st as name};
