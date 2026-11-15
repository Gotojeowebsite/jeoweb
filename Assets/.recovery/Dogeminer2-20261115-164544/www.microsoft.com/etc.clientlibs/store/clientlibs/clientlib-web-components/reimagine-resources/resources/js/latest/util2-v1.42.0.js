import{r as t,ap as e,i as o,n as i,c as s,e as a,O as r,G as l,s as n,J as c,I as d,b as u,y as h,D as p,d as _}from"./tag.const-v1.42.0.js";import{C as b,l as m,v as y,b as f,o as g,V as v}from"./secondary-nav-item.const-v1.42.0.js";import{a as $,b as I,c as x}from"./vfi-v1.42.0.js";import{s as S}from"./dropdown-trigger.const-v1.42.0.js";import{a as C,n as w,M as E}from"./util11-v1.42.0.js";import{Scrollslider as k}from"./components/scrollslider/scrollslider/index-v1.42.0.js";import{a as B}from"./util9-v1.42.0.js";import{n as A,a as T}from"./util19-v1.42.0.js";import{b as P}from"./pagination-item.const-v1.42.0.js";import{n as O}from"./util7-v1.42.0.js";import{name as z}from"./components/carousel/carousel-indicator/index-v1.42.0.js";import"./util4-v1.42.0.js";const R="flex",V="column",L="var(--ds-spacing-xl, 2rem)",j="initial",M="var(--ds-spacing-xs, 0.5rem)",q="2",F="var(--ds-spacing-m, 1rem)",D="1",H="1rem",N="row",W=12,G=24,J="1fr",K="initial",Z="initial",U="initial",Q="initial",X="flex-start",Y="0",tt="auto",et="initial",ot="0",it="0",st="100%",at="auto",rt={indicatorsPosition:"static",indicatorsBottom:"auto",indicatorsLeft:"auto",indicatorsRight:"auto",indicatorsMarginInline:"0",indicatorsAlignItems:"stretch",indicatorsJustifyContent:"flex-start",indicatorsGap:"var(--ds-spacing-2xs, 0.25rem)",indicatorsZIndex:"3",indicatorsWidth:"auto",indicatorsDisplay:"flex"},lt="relative",nt="auto",ct="auto",dt="3",ut="var(--ds-spacing-2xs, 0.25rem)",ht="1",pt=o`
  :host {
    --ds-card-feature-top-flex: 0;
    --ds-media-height: 100%;
    position: relative;
    display: var(--ds-carousel-display, ${t(R)});
    flex-direction: var(--ds-carousel-flex-direction, ${t(V)});
    gap: var(--ds-carousel-gap, ${t(L)});
    justify-content: var(
      --ds-carousel-justify-content,
      ${t(j)}
    );
  }

  :host([indicator-configuration='${t(b.bars)}']) {
    --ds-carousel-indicator-align-items: center;
  }

  .carousel__controls {
    display: var(--ds-carousel-controls-display, ${t(R)});
    align-items: center;
    gap: var(--ds-scrollslider-controls-gap, ${t(M)});
    justify-content: var(
      --ds-carousel-controls-justify-content,
      ${t(X)}
    );
    padding-block: var(
      --ds-carousel-controls-padding-block,
      ${t(Y)}
    );
    z-index: var(
      --ds-carousel-controls-z-index,
      ${t(at)}
    );
  }

  .carousel__indicators-container {
    position: var(
      --ds-carousel-indicators-container-position,
      ${t(rt.indicatorsPosition)}
    );
    bottom: var(
      --ds-carousel-indicators-container-bottom,
      ${t(rt.indicatorsBottom)}
    );
    left: var(
      --ds-carousel-indicators-container-left,
      ${t(rt.indicatorsLeft)}
    );
    right: var(
      --ds-carousel-indicators-container-right,
      ${t(rt.indicatorsRight)}
    );
    margin-inline: var(
      --ds-carousel-indicators-container-margin-inline,
      ${t(rt.indicatorsMarginInline)}
    );
    align-items: var(
      --ds-carousel-indicators-container-align-items,
      ${t(rt.indicatorsAlignItems)}
    );
    justify-content: var(
      --ds-carousel-indicators-container-justify-content,
      ${t(rt.indicatorsJustifyContent)}
    );
    z-index: var(
      --ds-carousel-indicators-container-z-index,
      ${t(rt.indicatorsZIndex)}
    );
    width: var(
      --ds-carousel-indicators-container-width,
      ${t(rt.indicatorsWidth)}
    );
  }

  .carousel__controls-container {
    z-index: var(
      --ds-carousel-controls-container-z-index,
      ${t(tt)}
    );
  }

  .carousel__controls-container,
  .carousel__indicators-container {
    --ds-container-width: 100%;
  }

  :host([control-position^='bottom']) .carousel__controls,
  :host([control-position^='bottom']) .carousel__controls-container {
    order: var(--ds-carousel-controls-order, ${t(q)});
    margin-inline: var(
      --ds-carousel-controls-bottom-margin-inline,
      ${t(it)}
    );
  }

  :host([control-position$='end']) .carousel__controls,
  :host([control-position$='end']) .carousel__controls-container {
    justify-content: end;
  }

  :host([control-position='middle-justified']) .carousel__controls,
  :host([control-position='middle-justified']) .carousel__controls-container {
    position: absolute;
    pointer-events: none;
    height: 100%;
    width: var(
      --ds-carousel-controls-width,
      ${t(st)}
    );
    top: 0;
    justify-content: space-between;
    padding-inline: var(
      --ds-carousel-controls-padding-inline,
      ${t(ot)}
    );
    box-sizing: var(
      --ds-carousel-controls-box-sizing,
      ${t(et)}
    );
  }

  ::part(layout__base) {
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: none;
    scroll-behavior: smooth;
    column-gap: var(--ds-carousel-layout-column-gap, var(--ds-grid-column-gap));

    @media (prefers-reduced-motion: reduce) {
      scroll-behavior: auto;
    }
  }

  ::part(layout__base)::-webkit-scrollbar {
    display: none;
  }

  :host([full-bleed]) ::part(layout__base) {
    padding-inline: var(--ds-scrollslider-full-bleed-spacing);
    margin-inline: calc(var(--ds-scrollslider-full-bleed-spacing) * (-1));
    scroll-padding-inline: var(--ds-scrollslider-full-bleed-spacing);
    padding-top: 0.375rem;
    padding-bottom: 0.75rem;
  }

  :host(
      [enable-focus-outline-space][layout-configuration$='overflow']:not([full-bleed]):not(
          [full-bleed-mobile-tablet]
        )
    )
    ::part(layout__base) {
    padding-block: var(--ds-carousel-overflow-outline-space, 0.125rem);
    margin-block: calc(var(--ds-carousel-overflow-outline-space, 0.125rem) * (-1));
  }

  :host(
      [enable-focus-outline-space][layout-configuration$='overflow']:not([full-bleed]):not(
          [full-bleed-mobile-tablet]
        ):not([layout-configuration='left-aligned-overflow'])
    )
    ::part(layout__base) {
    box-sizing: border-box;
    padding-inline: var(--ds-carousel-overflow-outline-space, 0.125rem);
    scroll-padding-inline: var(--ds-carousel-overflow-outline-space, 0.125rem);
  }

  :host([staggered]) {
    --ds-layout-staggered-offset: var(--ds-carousel-staggered-offset, 2rem);
  }

  .carousel__indicators {
    order: var(--ds-carousel-indicators-order, ${t(D)});
    display: var(
      --ds-carousel-indicators-display,
      ${t(rt.indicatorsDisplay)}
    );
    flex-direction: var(
      --ds-carousel-indicators-flex-direction,
      ${t(N)}
    );
    overflow-x: scroll;
    scrollbar-width: none;
    scroll-behavior: smooth;
    scroll-snap-type: x proximity;
    gap: var(--ds-carousel-indicators-gap, ${t(F)});
    position: var(
      --ds-carousel-indicators-position,
      ${t(rt.indicatorsPosition)}
    );
    bottom: var(
      --ds-carousel-indicators-bottom,
      ${t(rt.indicatorsBottom)}
    );
    justify-content: var(
      --ds-carousel-indicators-justify-content,
      ${t(rt.indicatorsJustifyContent)}
    );
    width: var(
      --ds-carousel-indicators-width,
      ${t(rt.indicatorsWidth)}
    );
    height: var(--ds-carousel-indicators-height, auto);
    z-index: var(
      --ds-carousel-indicators-z-index,
      ${t(rt.indicatorsZIndex)}
    );
  }

  .play-button {
    order: var(
      --ds-carousel-play-button-order,
      ${t(ht)}
    );
    margin-inline-start: var(
      --ds-carousel-play-button-margin-inline-start,
      ${t(ut)}
    );
    z-index: var(
      --ds-carousel-play-button-z-index,
      ${t(dt)}
    );
    position: var(
      --ds-carousel-play-button-position,
      ${t(lt)}
    );
    bottom: var(
      --ds-carousel-play-button-bottom,
      ${t(nt)}
    );
    inset-inline-end: var(
      --ds-carousel-play-button-inset-inline-end,
      ${t(ct)}
    );
  }

  :host > .play-button {
    /* Only override properties that differ for direct child.
    This will target the play button not inside the indicator container */
    position: var(--ds-carousel-play-button-position, absolute);
    bottom: var(--ds-carousel-play-button-bottom, 0);
    inset-inline-end: var(--ds-carousel-play-button-inset-inline-end, 0);
  }

  .carousel__indicators::-webkit-scrollbar {
    display: none;
  }

  :host(
    [indicator-configuration='${t(b.mediaPlaylistVideo)}']
  ) {
    --ds-tab-compound-media-width: 50%;
    --ds-tab-compound-base-max-width: 160px;
    --ds-tab-compound-base-width: 50%;
    --ds-button-group-max-width: 267px;
    --ds-button-group-margin-inline: auto;
    --ds-carousel-indicators-flex-direction: column;
  }

  :host([indicator-configuration='${t(b.mediaPlaylistVideo)}'])
    .carousel__indicators
    ::slotted(store-scrollslider-item) {
    padding: ${t($)};
  }

  :host(
    [indicator-configuration='${t(b.mediaPlaylistVideo)}']
  ) {
    .carousel__indicators {
      position: absolute;
      left: 136px;
      right: 0;
      bottom: 48px;
      z-index: 12;
      transition: bottom 0.6s ease-in-out;
      max-width: 100%;
      padding: ${t($)};
      opacity: 1;
    }

    .carousel__indicators.hidden {
      bottom: -180px;
      opacity: 0;
    }
  }

  :host(
      [indicator-configuration='${t(b.mediaPlaylistVideo)}'][dir='rtl']
    )
    .carousel__indicators {
    left: 0;
    right: 136px;
  }

  :host(
    [indicator-configuration='${t(b.mediaPlaylistVideo)}']
  ) {
    .carousel__controls {
      position: absolute;
      bottom: 180px;
      left: 136px;
      z-index: 12;
      transition: bottom 0.6s ease-in-out;
      opacity: 1;
    }

    .carousel__controls.hidden {
      bottom: 0;
      opacity: 0;
    }
  }

  :host([indicator-configuration='${t(b.tabs)}'])
    .carousel__indicators {
    --ds-carousel-indicator-button-margin: ${$};
  }

  :host([indicator-configuration='${t(b.labels)}'])
    .carousel__indicators,
  :host([indicator-configuration='${t(b.media)}'])
    .carousel__indicators,
  :host([indicator-configuration='${t(b.badges)}'])
    .carousel__indicators,
  :host([indicator-configuration='${t(b.videos)}'])
    .carousel__indicators,
  :host([indicator-configuration='${t(b.verticalTabs)}'])
    .carousel__indicators {
    padding: var(--ds-carousel-indicator-padding, 1rem);
    margin: -1rem;
  }

  :host([indicator-configuration='${t(b.labels)}'])
    .carousel__indicators,
  :host([indicator-configuration='${t(b.media)}'])
    .carousel__indicators {
    --ds-carousel-indicator-outline-offset: ${I};
  }

  :host([indicator-configuration='${t(b.labels)}'])
    .carousel__indicators,
  :host([indicator-configuration='${t(b.labels)}'])
    .carousel__indicators-container,
  :host([indicator-configuration='${t(b.media)}'])
    .carousel__indicators,
  :host([indicator-configuration='${t(b.media)}'])
    .carousel__indicators-container,
  :host([indicator-configuration='${t(b.badges)}'])
    .carousel__indicators,
  :host([indicator-configuration='${t(b.badges)}'])
    .carousel__indicators-container {
    justify-content: var(--ds-carousel-indicator-justify-content, safe center);
  }

  :host([indicator-configuration='${t(b.bars)}'])
    .carousel__indicators {
    gap: var(
      --ds-carousel-indicators-gap,
      ${t(rt.indicatorsGap)}
    );
  }

  :host([indicator-configuration='${t(b.labels)}'])
    .carousel__indicators,
  :host([indicator-configuration='${t(b.media)}'])
    .carousel__indicators {
    --ds-carousel-indicators-gap: 0;
  }

  :host([indicator-configuration='${t(b.labels)}'])
    .carousel__indicators
    ::slotted(store-carousel-indicator:first-of-type),
  :host([indicator-configuration='${t(b.media)}'])
    .carousel__indicators
    ::slotted(store-carousel-indicator:first-of-type) {
    --ds-tab-compound-border-start-start-radius: var(--ds-radii-m, 0.5rem);
    --ds-tab-compound-border-end-start-radius: var(--ds-radii-m, 0.5rem);
  }

  :host([indicator-configuration='${t(b.labels)}'])
    .carousel__indicators
    ::slotted(store-carousel-indicator:last-of-type),
  :host([indicator-configuration='${t(b.media)}'])
    .carousel__indicators
    ::slotted(store-carousel-indicator:last-of-type) {
    --ds-tab-compound-border-start-end-radius: var(--ds-radii-m, 0.5rem);
    --ds-tab-compound-border-end-end-radius: var(--ds-radii-m, 0.5rem);
  }

  :host([enable-indicator-container]) {
    --ds-carousel-indicator-padding: calc(calc(var(--ds-vfi-outline-width, 0.1875rem) + 0.1875rem));
  }

  :host([enable-indicator-container]) .carousel__indicators-container {
    padding: var(
      --ds-carousel-indicator-container-padding,
      ${t(H)}
    );
    display: flex;
    gap: var(--ds-carousel-indicator-container-gap, var(--ds-spacing-2xs, 0.25rem));
    order: var(--ds-carousel-indicators-order, ${t(D)});
  }

  .carousel__screen-reader {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .sr-only {
    color: var(--ds-theme-foreground-neutral-strong, #0e1726);
    background-color: var(--ds-theme-background-neutral-fade, #f7f7f7);

    position: absolute;
    z-index: 1;
  }

  .sr-only:not(:active):not(:focus) {
    ${S};
  }

  .sr-only__anchor {
    ${x};

    // Style the native anchor element to look like the (button--ghost rounded small) component
    background-color: var(--ds-theme-background-neutral-fade, #f7f7f7);
    padding-inline: var(--ds-spacing-s, 0.75rem);
    padding-block: var(--ds-spacing-2xs, 0.25rem);
    text-decoration: none;
    outline-offset: -0.375rem;
    border-radius: var(--ds-radii-s, 0.5rem);
    font-weight: ${t(e.fontWeight)};
    font-size: ${t(e.fontSize)};
    line-height: ${t(e.lineHeight)};
    letter-spacing: ${t(e.letterSpacing)};
  }

  a[href='${t(m)}'].sr-only {
    top: var(--ds-skip-link-top-offset, -2rem);
  }

  :host([indicator-configuration='${t(b.media)}'])
    .carousel__indicators {
    display: none;
  }

  .carousel__base {
    margin-block-start: var(
      --ds-carousel-base-margin-block-start,
      ${t(K)}
    );
    margin-block-end: var(
      --ds-carousel-base-margin-block-end,
      ${t(Z)}
    );
    margin-inline-start: var(
      --ds-carousel-base-margin-inline-start,
      ${t(U)}
    );
    margin-inline-end: var(
      --ds-carousel-base-margin-inline-end,
      ${t(Q)}
    );
  }

  .carousel__load-more {
    display: none;
  }

  :host([layout-configuration='3-col-even-overflow']) {
    --ds-card-promo-hero-width: 100%;
    --ds-card-promo-hero-height: 100%;
    --ds-card-promo-hero-flex-shrink: 1;
  }

  :host([align-controls-on-carousel-start]) .carousel__controls-container {
    --ds-container-padding-inline-start: 0;
    --ds-container-padding-inline-end: 0;
    --ds-container-max-width: none;
    --ds-container-width: 100%;
  }
`,_t=o`
  /* Hide navigation controls on non-mobile views when mobile-controls-only is enabled */
  @media (min-width: ${t(y.md)}) {
    :host([mobile-controls-only]) .carousel__controls,
    :host([mobile-controls-only]) .scrollslider__controls {
      display: none !important;
    }
  }

  @media (min-width: ${t(y.sm)}) {
    :host([indicator-configuration='${t(b.videos)}'])
      .carousel__indicators,
    :host(
        [indicator-configuration='${t(b.mediaPlaylistVideo)}']
      )
      .carousel__indicators {
      --ds-media-max-width: auto;
    }
  }

  @media (max-width: ${t(f(y.sm))}) {
    :host([indicator-configuration='${t(b.videos)}'])
      .carousel__indicators {
      flex-direction: column;
      align-items: center;
    }

    :host(
        [indicator-configuration='${t(b.mediaPlaylistVideo)}']
      )
      .carousel__indicators {
      --ds-scrollslider-base-padding: ${t($)} var(--ds-spacing-l);
    }
  }

  @media (min-width: ${t(y.md)}) {
    :host([indicator-configuration='${t(b.media)}'])
      .carousel__indicators {
      display: flex;
    }

    :host([indicator-configuration='${t(b.verticalTabs)}']) {
      --ds-carousel-flex-direction: row-reverse;
      --ds-carousel-justify-content: space-between;
      --ds-tabs-base-margin-block-end: 0;
      --ds-carousel-indicator-display: block;
      --ds-carousel-display: grid;
      --ds-carousel-gap-size: 1rem;
      --ds-carousel-gap: calc(
        (var(--ds-carousel-column-total, ${t(W)}) - 1) *
          var(--ds-carousel-gap-size)
      );

      grid-auto-flow: column;
      grid-auto-columns: var(--ds-carousel-auto-columns, ${t(J)});

      .carousel__indicators {
        --ds-carousel-indicators-flex-direction: column;
        order: 1;
      }

      .carousel__base {
        order: 2;
      }

      .carousel__controls {
        --ds-carousel-controls-display: none;
      }
    }

    :host([in-tabs]) .carousel__controls-container {
      --ds-container-width: 100%;
    }
  }

  @media (min-width: ${t(y.lg)}) {
    :host([indicator-configuration='${t(b.verticalTabs)}']) {
      --ds-carousel-gap: calc(
        (
            var(
                --ds-carousel-column-total-viewports-large,
                ${t(G)}
              ) -
              1
          ) *
          var(--ds-carousel-gap-size)
      );
    }
    :host([in-tabs]) .carousel__controls-container {
      --ds-container-width: var(--ds-carousel-controls-container-width, 100%);
    }
  }

  @media (max-width: ${t(f(`${C}px`))}) {
    :host(
      [indicator-configuration='${t(b.mediaPlaylistVideo)}']
    ) {
      .carousel__indicators {
        --ds-carousel-indicators-flex-direction: column;
        --ds-density-vertical-default: 0;
        --ds-tab-compound-base-display: block;
        --ds-scrollslider-base-flex-direction: column;
        --ds-scrollslider-base-align-items: center;
        overflow-x: hidden;
        position: static;
        align-items: center;
      }

      .carousel__controls {
        display: none;
      }
    }
  }

  @media (max-width: ${t(f(y.md))}) {
    :host([full-bleed-mobile-tablet]) ::part(layout__base) {
      padding-inline: var(--ds-scrollslider-full-bleed-spacing);
      margin-inline: calc(var(--ds-scrollslider-full-bleed-spacing) * (-1));
      scroll-padding-inline: var(--ds-scrollslider-full-bleed-spacing);
      padding-top: 0.375rem;
      padding-bottom: 0.75rem;
    }
  }

  @media (min-width: ${t(f(y.md))}) {
    :host(
        [enable-focus-outline-space][layout-configuration$='overflow']:not(
            [full-bleed]
          )[full-bleed-mobile-tablet]
      )
      ::part(layout__base) {
      padding-block: var(--ds-carousel-overflow-outline-space, 0.125rem);
      margin-block: calc(var(--ds-carousel-overflow-outline-space, 0.125rem) * (-1));
    }

    :host(
        [enable-focus-outline-space][layout-configuration$='overflow']:not(
            [full-bleed]
          )[full-bleed-mobile-tablet]:not([layout-configuration='left-aligned-overflow'])
      )
      ::part(layout__base) {
      box-sizing: border-box;
      padding-inline: var(--ds-carousel-overflow-outline-space, 0.125rem);
      scroll-padding-inline: var(--ds-carousel-overflow-outline-space, 0.125rem);
    }
  }
`;class bt{constructor(t,e){this._active=!0,this._toggleAutoplay=()=>{this._active?this._pause():this._play()},this._host=t,this._playPauseButton=null==e?void 0:e.playPauseButton,this._interval=(null==e?void 0:e.interval)??3e3,this._getNextSlide=(null==e?void 0:e.getNextSlide)??(()=>{}),this._onAutoplayStateChange=null==e?void 0:e.onAutoplayStateChange,this._liveRegionId=`autoplay-controller-live-region-${Math.random().toString(36).slice(2)}`,t.addController(this)}hostConnected(){var t;if(null==(t=this._playPauseButton)||t.addEventListener("click",this._toggleAutoplay),this._playPauseButton&&this._playPauseButton.parentElement&&!document.querySelector(`#${this._liveRegionId}`)){const t=document.createElement("div");t.setAttribute("id",this._liveRegionId),t.setAttribute("aria-live","polite"),t.style.position="absolute",t.style.width="1px",t.style.height="1px",t.style.overflow="hidden",t.style.clip="rect(1px, 1px, 1px, 1px)",t.style.clipPath="inset(50%)",t.style.left="0",t.style.top="0",document.body.append(t),this._liveRegion=t}this._active&&this._start(),this._updateButton()}hostDisconnected(){var t;null==(t=this._playPauseButton)||t.removeEventListener("click",this._toggleAutoplay),this._clear(),this._liveRegion&&this._liveRegion.parentElement&&(this._liveRegion.remove(),this._liveRegion=void 0)}_play(){var t;this._active=!0,this._start(),this._updateButton(),null==(t=this._onAutoplayStateChange)||t.call(this,this._active)}_pause(){var t;this._active=!1,this._clear(),this._updateButton(),null==(t=this._onAutoplayStateChange)||t.call(this,this._active)}pauseAutoplay(){this._active&&this._pause()}_start(){this._clear(),this._timer=window.setInterval(()=>{this._getNextSlide()},this._interval)}_clear(){this._timer&&(clearInterval(this._timer),this._timer=void 0)}_updateButton(){if(this._playPauseButton){const t=this._playPauseButton.getAttribute("aria-pressed"),e=String(this._active);this._playPauseButton.setAttribute("aria-pressed",e);const o=this._playPauseButton.querySelector(O);o&&o.setAttribute("icon",this._active?"pause":"play");const i=this._host.playButtonLabel||"Play",s=this._host.pauseButtonLabel||"Pause",a=this._active?s:i;this._playPauseButton.setAttribute("button-title",a),this._playPauseButton.setAttribute("button-label",a);const r=null!==t&&t!==e;this._liveRegion&&r&&(this._liveRegion.textContent="",this._liveRegion.textContent=a)}}}var mt=Object.defineProperty,yt=Object.getOwnPropertyDescriptor,ft=Object.getPrototypeOf,gt=Reflect.get,vt=(t,e,o,i)=>{for(var s,a=i>1?void 0:i?yt(e,o):e,r=t.length-1;r>=0;r--)(s=t[r])&&(a=(i?s(e,o,a):s(a))||a);return i&&a&&mt(e,o,a),a};const $t="store-carousel";let It=class extends k{constructor(){super(),this.layoutConfiguration=B.col1evenOverflow,this.skipLabel="Skip Items",this.endLabel="End of items",this.playButtonLabel="Play",this.pauseButtonLabel="Pause",this.backToControlsLabel="Back to Next and Previous controls",this.enableIndicatorContainer=!1,this.enableBaseContainer=!1,this.enableFocusOutlineSpace=!1,this.staggered=!1,this.fullBleedMobileTablet=!1,this.alignControlsOnCarouselStart=!1,this.showControls=!1,this.mobileControlsOnly=!1,this.disableIndicatorClicks=!1,this.autoplay=!1,this.tabFocusForOverflowItems=!1,this.autoplayInterval=3e3,this._firstSlotEmpty=!0,this._indicatorOverflow=!1,this._lastSlotEmpty=!0,this._carouselIndicatorSlotEmpty=!0,this._carouselHeaderSlotEmpty=!0,this._playButtonSlotEmpty=!0,this._carouselEvents=[],this._firstVisibleIndex=0,this._lastVisibleIndex=0,this._isAutoplayActive=!1,this._debouncedSetStatusMessage=l(100,this._setStatusMessage.bind(this)),this._handleBackToControls=t=>{t.preventDefault(),!this._nextControlDisabled&&this._nextControlDefault.checkVisibility()?this._nextControlDefault.focus():!this._prevControlDisabled&&this._prevControlDefault.checkVisibility()?this._prevControlDefault.focus():this._carouselIndicators.length?this._carouselIndicators[this._carouselIndicators.length-1].focus():this._scrollsliderItems[this._scrollsliderItems.length-1].focus()},this._handleSkip=t=>{var e;t.preventDefault(),(null==(e=this.shadowRoot)?void 0:e.querySelector(m)).focus()},this._handleIndicatorClick=t=>{if(!this.disableIndicatorClicks)for(let e=0;e<this._carouselIndicators.length;e++){(this._carouselIndicators[e]===t.target||this._carouselIndicators[e].contains(t.target))&&(this._setIndicatorAttributes(e),setTimeout(()=>{this._scrollsliderItems[e].scrollIntoView({block:"nearest"})},0),this._scrollsliderItems[e].setAttribute("tabindex","-1"),this._scrollsliderItems[e].focus());const o=this._scrollsliderItems[e];if(o){const t=o.querySelector(w);t instanceof E&&t.pauseVideo()}}},this._handleIndicatorFocus=t=>{t.target.scrollIntoView({block:"nearest"})},this._handlePlayButtonClick=()=>{setTimeout(()=>{const t=this._playButtonSlot[0];if(!t||!this._screenReaderStatusElement)return;const e="true"===t.getAttribute("aria-pressed"),o=this._screenReaderStatusElement.querySelector("span.sr-only");e?(this._screenReaderStatusElement.removeAttribute("role"),o&&o.removeAttribute("aria-live")):(this._screenReaderStatusElement.setAttribute("role","status"),o&&o.setAttribute("aria-live","polite"))},0)},this._handleControlClick=()=>{this.autoplay&&this._autoplayController&&"function"==typeof this._autoplayController.pauseAutoplay&&this._autoplayController.pauseAutoplay()},this._handleTabKeyNavigation=t=>{if("Tab"!==t.key||!this.tabFocusForOverflowItems)return;const e=t.shiftKey,o=document.activeElement,i=this._scrollsliderItems.findIndex(t=>t.contains(o));if(-1===i)return;const s=this._scrollsliderItems[i];if(!e&&i===this._lastVisibleIndex&&i<this._scrollsliderItems.length-1){if(!this._isLastFocusableInItem(s,o))return;const e=this._scrollsliderItems[i+1];t.preventDefault(),e.hasAttribute("inert")&&e.removeAttribute("inert"),e.setAttribute("tabindex","0");const a=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.scrollIntoView({block:"nearest",behavior:a?"auto":"smooth"}),e.focus()}else if(e&&i===this._firstVisibleIndex&&i>0){if(!this._isFirstFocusableInItem(s,o))return;const e=this._scrollsliderItems[i-1];t.preventDefault(),e.hasAttribute("inert")&&e.removeAttribute("inert"),e.setAttribute("tabindex","0"),e.scrollIntoView({block:"nearest",behavior:"smooth"});const a=Array.from(e.querySelectorAll('a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), store-button, store-link')).filter(t=>!t.closest("[inert]")&&t.tabIndex>=0),r=a[a.length-1];r?r.focus():e.focus()}},this.scrollSliderRole="",this.scrollSliderItemRole="",this._viewportResizeObserver=new v(this,{callback:()=>this._handleViewportChange()})}_applyPlayButtonMargins(t=150,e=8,o=0){var i;const s=(null==(i=this._carouselIndicatorsElement)?void 0:i.offsetWidth)??0,a=this._playButtonSlot[0],r=(null==a?void 0:a.offsetWidth)??0;0!==s&&0!==r?(a.style.setProperty("margin-inline-start",`${s}px`),this._carouselIndicatorsElement.style.setProperty("margin-inline-start",-r+"px")):o<e&&(this._marginRetryTimeout=setTimeout(()=>this._applyPlayButtonMargins(t,e,o+1),t))}_checkIndicatorOverflow(){requestAnimationFrame(()=>{if(!this._carouselIndicatorsElement||!this._carouselControlsElement)return;const t=this._carouselIndicatorsElement.scrollWidth>this._carouselIndicatorsElement.clientWidth;this._indicatorOverflow=t,t||!this.hasAttribute("indicator-configuration")||this.showControls?this._carouselControlsElement.style.display="":this._carouselControlsElement.style.display="none"})}_setScrollsliderItems(){const t=[];this._windowSlot.forEach(e=>{const o=e.querySelector("store-carousel-item");o&&t.push(o)}),this._scrollsliderItems=t,this._scrollsliderItems.forEach((t,e)=>{t.setAttribute("role",this.scrollSliderItemRole);const o=e>=this._firstVisibleIndex&&e<=this._lastVisibleIndex;t.setAttribute("tabindex",o?"0":"-1")})}_setStatusMessage(){const t=[];!this._scrollsliderItems||0===this._scrollsliderItems.length||(this._scrollsliderItems.forEach((e,o)=>{e.hasAttribute("partial")||t.push(o)}),0!==t.length&&(this._firstVisibleIndex=t[0],this._lastVisibleIndex=t[t.length-1],this._scrollsliderItems.forEach((t,e)=>{const o=e>=this._firstVisibleIndex&&e<=this._lastVisibleIndex;t.setAttribute("tabindex",o?"0":"-1")}),void 0!==this._firstVisibleIndex&&this._setIndicatorAttributes(this._firstVisibleIndex)))}getVisibleSlides(){if(!this._scrollsliderItems||0===this._scrollsliderItems.length)return 1;const t=this._baseElement;if(!t)return 1;const e=t.getBoundingClientRect();let o=0;for(const t of this._scrollsliderItems){const i=t.getBoundingClientRect(),s=Math.max(i.left,e.left),a=Math.min(i.right,e.right),r=Math.max(0,a-s),l=i.width;l>0&&r/l>=.5&&o++}return o||1}_goToNextSlide(){if(!this._scrollsliderItems||0===this._scrollsliderItems.length)return;const t=this.getVisibleSlides();let e=this._firstVisibleIndex+t;e>=this._scrollsliderItems.length&&(e=0),this._setIndicatorAttributes(e,!1),setTimeout(()=>{const t=this._scrollsliderItems[e],o=this._scrollableElement||this._baseElement;if(o&&t){const e=t.offsetLeft;o.scrollTo({left:e,behavior:"smooth"})}},0)}_handleSlotChange(){this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length,this._carouselHeaderSlotEmpty=0===this._headerSlot.length,this._playButtonSlotEmpty=0===this._playButtonSlot.length,this.autoplay&&!this._playButtonSlotEmpty&&this._updateAutoplay()}_updateAutoplay(){var t;this._isAutoplayActive=!0;let e=!1,o=!1;o=(null==(t=this._viewportResizeObserver)?void 0:t.isDesktop())||!1,requestAnimationFrame(()=>{var t,i;e="none"===(null==(t=this._carouselControlsElement)?void 0:t.style.display),this.isInIndicatorContainer&&!e&&o&&(this.movePlayButton(),this.style.setProperty("--ds-carousel-play-button-order","0")),null!=(i=this._carouselControlsElement)&&i.contains(this._playButtonElement)&&o&&this._applyPlayButtonMargins()}),this._autoplayController instanceof bt||(this._autoplayController=new bt(this,{playPauseButton:this._playButtonSlot[0],interval:this.autoplayInterval,getNextSlide:this._goToNextSlide.bind(this),onAutoplayStateChange:t=>{this._isAutoplayActive=t}})),this._playButtonSlot.forEach(t=>{n(t,{"icon-only":"",appearance:"button--ghost",shape:"rounded",size:"small"})});const i=this.querySelector(O);i&&n(i,{size:"medium",filled:"",icon:"pause","aria-hidden":"true",role:"presentation"})}_handleBaseSlotChange(){if(super._handleBaseSlotChange(),this._carouselIndicatorSlotEmpty=0===this._carouselIndicators.length,requestAnimationFrame(()=>this._checkIndicatorOverflow()),this._scrollsliderItems.length>0&&this._debouncedSetStatusMessage(),!this._carouselIndicatorSlotEmpty&&this._scrollsliderItems.length>0){for(let t=0;t<this._carouselIndicators.length;t++)this._carouselEvents.push({el:this._carouselIndicators[t],type:"click",handler:this._handleIndicatorClick},{el:this._carouselIndicators[t],type:"focus",handler:this._handleIndicatorFocus}),this._carouselIndicators[t].setAttribute("role","listitem");c(this._carouselEvents),d(this._carouselEvents)}}_renderOptionalSlot(t,e){return u`
      <div part=${t} class=${t} style="${e?"display: none;":""}">
        <slot name=${t} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}_setIndicatorAttributes(t,e=!1){if(void 0!==t)for(let o=0;o<this._carouselIndicators.length;o++){let i=this._carouselIndicators[o];i&&i.tagName.toLocaleLowerCase()!==z&&(i=this._carouselIndicators[o].querySelector(z)),o===t?(i.setAttribute("aria-current","true"),i.setAttribute("active",""),e&&i.scrollIntoView({block:"nearest"})):(i.setAttribute("aria-current","false"),i.removeAttribute("active")),this.disableIndicatorClicks?i.setAttribute("disable-clicks",""):i.removeAttribute("disable-clicks")}}_onScroll(){super._onScroll(),void 0!==this._firstVisibleIndex&&this._setIndicatorAttributes(this._firstVisibleIndex,!1)}triggerPrev(){if(this.layoutConfiguration===B.colLeftAlignedOverflow&&this._scrollableElement){if(this._prevControlDisabled||Math.abs(this._scrollableElement.scrollLeft)<=1)return;const t="rtl"===this.dir?this._scrollRight():this._scrollLeft(),e=this._scrollableElement.scrollLeft+t,o=this._scrollableElement.querySelector(".layout__scroll-spacer");return e<(o?o.getBoundingClientRect().width:0)+(parseInt(getComputedStyle(this._scrollableElement).columnGap,10)||0)+5?void window.requestAnimationFrame(()=>{this._scrollableElement.scrollTo({left:0})}):void window.requestAnimationFrame(()=>{this._scrollableElement.scrollBy({left:t})})}super.triggerPrev()}_handleLayoutMount(){this._scrollableElement=this._layoutElement.renderRoot.querySelector(".layout__base"),this.mobileControlsOnly&&window.requestAnimationFrame(()=>{this._setButtonAttrs(),this._checkContainerOverflow()})}indicatorSliderTemplate(){const t=u`
      <store-scrollslider
        control-position="top-start"
        control-size="large"
        part="carousel__indicators"
        class="carousel__indicators"
        style="${this._carouselIndicatorSlotEmpty?"display: none":""}"
        prev-label="${h(this.prevLabel)}"
        next-label="${h(this.nextLabel)}"
      >
        <slot name="carousel__indicators" @slotchange="${this._handleBaseSlotChange}"></slot>
      </store-scrollslider>
    `;return this.enableIndicatorContainer?u`
        <store-container
          class="carousel__indicators-container"
          part="carousel__indicators-container"
          style="${this._carouselIndicatorSlotEmpty?"display: none":""}"
        >
          ${t}
        </store-container>
      `:t}skipTargetTemplate(){return u`<slot name="skip-target">
      ${this._skipLinkTemplate(this.endLabel,void 0,"end-of-carousel")}
    </slot>`}backToControlsTemplate(){return u`<slot name="back-to-controls">
      ${this.backToControlsLabel&&!this.hideControls?u`${this._skipLinkTemplate(this.backToControlsLabel,this._handleBackToControls,void 0,"#")}`:p}
    </slot>`}screenReaderTemplate(){const t=this._firstVisibleIndex+1,e=this._lastVisibleIndex+1,o=this._scrollsliderItems.length;let i="";return i=t===e?`Showing ${t} of ${o} items`:`Showing ${t} through ${e} of ${o} items`,u`
      <div part="carousel__screen-reader" class="carousel__screen-reader">
        <!-- Status -->
        <div
          part="carousel__screen-reader-status"
          class="carousel__screen-reader-status"
          role=${h(this._isAutoplayActive?void 0:"status")}
        >
          <span
            class="sr-only"
            aria-live=${h(this._isAutoplayActive?void 0:"polite")}
          >
            ${this.msg("status",{start:t,end:e,total:o})||i}
          </span>
        </div>
        <!-- Back to Controls  -->
        ${this.backToControlsTemplate()}
        <!-- Skip Target Template  -->
        ${this.skipTargetTemplate()}
      </div>
    `}indicatorTemplate(){const t=u`
      <div
        part="carousel__indicators"
        class="carousel__indicators"
        role="list"
        style="${this._carouselIndicatorSlotEmpty?"display: none":""}"
      >
        <slot name="carousel__indicators" @slotchange="${this._handleBaseSlotChange}"></slot>
      </div>
    `;return this.enableIndicatorContainer?u`
        <store-container
          class="carousel__indicators-container"
          part="carousel__indicators-container"
          style="${this._carouselIndicatorSlotEmpty?"display: none":""}"
        >
          ${t} ${this.autoplay?this.autoPlayButtonTemplate():p}
        </store-container>
      `:t}autoPlayButtonTemplate(){return this.autoplay?u`
      <div
        part="play-button"
        class="play-button"
        style="${this._playButtonSlotEmpty?"display: none;":""}"
      >
        <slot name="play-button" @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `:p}controlsTemplate(){var t;this.controlSize=null!=(t=this._viewportResizeObserver)&&t.isMobile()?P.small:P.large;const e=u`
      <div part="carousel__controls" class="carousel__controls">
        ${super.prevControlTemplate()} ${super.nextControlTemplate()}
      </div>
    `;return this.enableIndicatorContainer?u`
        <store-container class="carousel__controls-container" part="carousel__controls-container">
          ${e}
        </store-container>
      `:e}_skipLinkTemplate(t,e,o,i,s){return i||o?u`
        <a
          href=${h(i)}
          id=${h(o)}
          tabindex=${h(o?-1:void 0)}
          target=${h(s)}
          class="sr-only sr-only__anchor"
          @click=${e}
          >${t}</a
        >
      `:u`
      <store-button
        class="sr-only"
        appearance="button--ghost"
        shape="rounded"
        size="small"
        @click=${e}
      >
        <span slot="button__text">${t}</span>
      </store-button>
    `}_handleViewportChange(){var t,e,o;null!=(t=this._viewportResizeObserver)&&t.isDesktop()&&(this._checkIndicatorOverflow(),this.autoplay&&!this._playButtonSlotEmpty&&this._updateAutoplay()),this.indicatorConfiguration===b.verticalTabs&&(null!=(e=this._viewportResizeObserver)&&e.isMobile()&&"horizontal"!==this._tabItemConfig?this._updateTabItemHorizontal():null!=(o=this._viewportResizeObserver)&&o.isDesktop()&&"vertical"!==this._tabItemConfig&&this._updateTabItemVertical())}_getTabItems(){return this._carouselIndicators.filter(t=>t instanceof HTMLElement).flatMap(t=>{var e;return Array.from((null==(e=t.querySelectorAll)?void 0:e.call(t,A))??[])})}_updateTabItemHorizontal(){const t=this._getTabItems();if(this.indicatorConfiguration===b.verticalTabs)for(let e=0;e<this._carouselIndicators.length;e++){const o=this._carouselIndicators[e],i=t[e];null==o||o.setAttribute("configuration",T.tabItemHorizontal),null==i||i.setAttribute("configuration",T.tabItemHorizontal)}this._tabItemConfig="horizontal"}_updateTabItemVertical(){const t=this._getTabItems();if(this.indicatorConfiguration===b.verticalTabs)for(let e=0;e<this._carouselIndicators.length;e++){const o=this._carouselIndicators[e],i=t[e];null==o||o.setAttribute("configuration",T.tabItemVertical),null==i||i.setAttribute("configuration",T.tabItemVertical)}this._tabItemConfig="vertical"}updated(t){this._checkIndicatorOverflow(),this.mobileControlsOnly&&(t.has("mobileControlsOnly")||t.has("showControls")||t.has("layoutConfiguration"))&&window.requestAnimationFrame(()=>{this._setButtonAttrs(),this._checkContainerOverflow()})}baseSlotTemplate(){let t=u`
      <store-layout
        part="carousel__layout"
        class="carousel__layout"
        configuration=${this.layoutConfiguration}
        overflow-tab-index="0"
        @onMount="${this._handleLayoutMount}"
      >
        <slot
          name="carousel__window"
          @slotchange=${this._handleBaseSlotChange}
          @onPartialChange=${this._debouncedSetStatusMessage}
        ></slot>
      </store-layout>
    `;return this.enableBaseContainer&&(t=u`
        <store-container class="carousel__base-container" part="carousel__base-container">
          ${t}
        </store-container>
      `),u` <div
      part="carousel__base"
      class="carousel__base"
      tabindex="-1"
      @onScroll="${l(60,this._onScroll)}"
    >
      ${t}
    </div>`}firstUpdated(){if(super.firstUpdated(),this.autoplay){const t=this._playButtonSlot[0];if(t&&this._carouselEvents.push({el:t,type:"click",handler:this._handlePlayButtonClick}),this._prevControlElement){const t=this._prevControlElement.querySelector(".scrollslider__prev-control-default");t&&this._carouselEvents.push({el:t,type:"click",handler:this._handleControlClick})}if(this._nextControlElement){const t=this._nextControlElement.querySelector(".scrollslider__next-control-default");t&&this._carouselEvents.push({el:t,type:"click",handler:this._handleControlClick})}if(c(this._carouselEvents),d(this._carouselEvents),this._screenReaderStatusElement){this._screenReaderStatusElement.removeAttribute("role");const t=this._screenReaderStatusElement.querySelector("span.sr-only");t&&t.removeAttribute("aria-live")}}}_isFirstFocusableInItem(t,e){const o=Array.from(t.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), store-button, store-link')).filter(t=>!t.closest("[inert]"));return 0===o.length?e===t:e===o[0]}_isLastFocusableInItem(t,e){const o=Array.from(t.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), store-button, store-link')).filter(t=>!t.closest("[inert]"));return 0===o.length?e===t:e===o[o.length-1]}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",this._handleTabKeyNavigation),this.autoplay&&this.enableIndicatorContainer&&(this._visibilityObserver=new IntersectionObserver(t=>{var e;for(const o of t)o.isIntersecting&&!this._playButtonSlotEmpty&&(null!=(e=this._carouselControlsElement)&&e.contains(this._playButtonElement)?this._applyPlayButtonMargins():this.isInIndicatorContainer&&this._updateAutoplay())},{threshold:.01}),this._visibilityObserver.observe(this));const t=this.closest("store-tabs");this.toggleAttribute("in-tabs",!!t);const e=null==t?void 0:t.querySelectorAll("store-carousel");this.fullBleed&&t&&e&&e.length>0&&(this._resizeObserver=new ResizeObserver(()=>{e.forEach(t=>{const e=t;super._handleFullBleedResize(e)})}),this._resizeObserver.observe(t))}disconnectedCallback(){var t,e;super.disconnectedCallback(),this.removeEventListener("keydown",this._handleTabKeyNavigation),c(this._carouselEvents),null==(t=this._resizeObserver)||t.disconnect(),null==(e=this._visibilityObserver)||e.disconnect(),clearTimeout(this._marginRetryTimeout),this._carouselEvents=[]}render(){return u`
      <!-- Skip link -->
      ${this.skipLabel?this._skipLinkTemplate(this.skipLabel,this._handleSkip,void 0,m,"_self"):p}

      <!-- First slot -->
      ${this._renderOptionalSlot("carousel__first",this._firstSlotEmpty)}

      <!-- Header slot -->
      ${this._renderOptionalSlot("carousel__header",this._carouselHeaderSlotEmpty)}

      <!-- Indicator slot -->
      ${this.indicatorConfiguration===b.mediaPlaylistVideo?this.indicatorSliderTemplate():this.indicatorTemplate()}

      <!-- Controls -->
      ${this.controlsTemplate()}

      <!-- Render autoplay button outside indicator container if enabled -->
      ${!this.enableIndicatorContainer&&this.autoplay?this.autoPlayButtonTemplate():p}

      <!-- Base slot -->
      ${this.baseSlotTemplate()}

      <!-- Last Slot -->
      ${this._renderOptionalSlot("carousel__last",this._lastSlotEmpty)}

      <!-- Screen reader -->
      ${this.screenReaderTemplate()}
    `}get isInIndicatorContainer(){return!(!this.enableIndicatorContainer||this._playButtonSlotEmpty||!this._carouselIndicatorsContainerElement.contains(this._playButtonElement))}movePlayButton(){this._playButtonElement&&this._carouselControlsElement&&this._prevControlElement&&this._carouselControlsElement.insertBefore(this._playButtonElement,this._prevControlElement.nextSibling)}};var xt,St,Ct;It.styles=[...(xt=It,St=It,Ct="styles",gt(ft(xt),Ct,St)),pt,_t],vt([i({attribute:"layout-configuration",type:String,reflect:!0})],It.prototype,"layoutConfiguration",2),vt([i({attribute:"indicator-configuration",reflect:!0})],It.prototype,"indicatorConfiguration",2),vt([i({reflect:!0,attribute:"skip-label"})],It.prototype,"skipLabel",2),vt([i({reflect:!0,attribute:"end-label"})],It.prototype,"endLabel",2),vt([i({type:String,attribute:"play-button-label"})],It.prototype,"playButtonLabel",2),vt([i({type:String,attribute:"pause-button-label"})],It.prototype,"pauseButtonLabel",2),vt([i({reflect:!0,attribute:"back-to-controls-label"})],It.prototype,"backToControlsLabel",2),vt([i({type:Boolean,reflect:!0,attribute:"enable-indicator-container"})],It.prototype,"enableIndicatorContainer",2),vt([i({type:Boolean,reflect:!0,attribute:"enable-base-container"})],It.prototype,"enableBaseContainer",2),vt([i({type:Boolean,reflect:!0,attribute:"enable-focus-outline-space"})],It.prototype,"enableFocusOutlineSpace",2),vt([i({type:Boolean,reflect:!0,attribute:"staggered"})],It.prototype,"staggered",2),vt([i({type:Boolean,reflect:!0,attribute:"full-bleed-mobile-tablet"})],It.prototype,"fullBleedMobileTablet",2),vt([i({type:Boolean,reflect:!0,attribute:"align-controls-on-carousel-start"})],It.prototype,"alignControlsOnCarouselStart",2),vt([i({reflect:!0,attribute:"show-controls",converter:{fromAttribute:t=>null!==t&&"false"!==t}})],It.prototype,"showControls",2),vt([i({type:Boolean,reflect:!0,attribute:"mobile-controls-only"})],It.prototype,"mobileControlsOnly",2),vt([i({type:Boolean,reflect:!0,attribute:"disable-indicator-clicks"})],It.prototype,"disableIndicatorClicks",2),vt([i({type:Boolean,reflect:!0})],It.prototype,"autoplay",2),vt([i({type:Boolean,reflect:!0,attribute:"tab-focus-for-overflow-items"})],It.prototype,"tabFocusForOverflowItems",2),vt([i({type:Number,reflect:!0,attribute:"autoplay-interval"})],It.prototype,"autoplayInterval",2),vt([s()],It.prototype,"_autoplayController",2),vt([a({slot:"carousel__first"})],It.prototype,"_firstSlot",2),vt([a({slot:"carousel__last"})],It.prototype,"_lastSlot",2),vt([g({slot:"carousel__window"})],It.prototype,"_windowSlot",2),vt([g({slot:"carousel__indicators"})],It.prototype,"_carouselIndicators",2),vt([a({slot:"carousel__header"})],It.prototype,"_headerSlot",2),vt([a({slot:"play-button"})],It.prototype,"_playButtonSlot",2),vt([r(".carousel__base")],It.prototype,"_baseElement",2),vt([r(".carousel__layout")],It.prototype,"_layoutElement",2),vt([r(".carousel__indicators-container")],It.prototype,"_carouselIndicatorsContainerElement",2),vt([r(".carousel__indicators")],It.prototype,"_carouselIndicatorsElement",2),vt([r(".carousel__controls")],It.prototype,"_carouselControlsElement",2),vt([r(".play-button")],It.prototype,"_playButtonElement",2),vt([r(".scrollslider__prev-control")],It.prototype,"_prevControlElement",2),vt([r(".scrollslider__next-control")],It.prototype,"_nextControlElement",2),vt([r(".carousel__screen-reader-status")],It.prototype,"_screenReaderStatusElement",2),vt([s()],It.prototype,"_firstSlotEmpty",2),vt([s()],It.prototype,"_indicatorOverflow",2),vt([s()],It.prototype,"_lastSlotEmpty",2),vt([s()],It.prototype,"_carouselIndicatorSlotEmpty",2),vt([s()],It.prototype,"_carouselHeaderSlotEmpty",2),vt([s()],It.prototype,"_playButtonSlotEmpty",2),vt([s()],It.prototype,"_carouselEvents",2),vt([s()],It.prototype,"_firstVisibleIndex",2),vt([s()],It.prototype,"_lastVisibleIndex",2),vt([s()],It.prototype,"_scrollsliderSpacing",2),vt([s()],It.prototype,"_tabItemConfig",2),vt([s()],It.prototype,"_viewportResizeObserver",2),It=vt([_($t)],It);export{It as C,rt as c,$t as n};
