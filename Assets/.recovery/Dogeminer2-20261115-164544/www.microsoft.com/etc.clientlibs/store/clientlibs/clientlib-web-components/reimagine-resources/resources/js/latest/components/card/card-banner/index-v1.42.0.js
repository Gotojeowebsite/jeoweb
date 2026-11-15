import{r as t,w as e,i as n,o as a,n as r,e as o,c as i,M as d,s,T as l,b as c,F as h,d as b}from"../../../tag.const-v1.42.0.js";import{name as p}from"../../media/index-v1.42.0.js";import{name as m}from"../../text-block/index-v1.42.0.js";import{name as g}from"../../button-group/index-v1.42.0.js";import{v as u,b as _}from"../../../secondary-nav-item.const-v1.42.0.js";import{B as v,c as f,b as y,S as x}from"../../../pagination-item.const-v1.42.0.js";import{c as k}from"../../../card-base.styles-v1.42.0.js";import{SurfaceElement as w}from"../../../base/elements/surface-element/index-v1.42.0.js";const S="column",E="0",$="auto",T="initial",A="initial",I="initial",B="initial",C="initial",j="var(--ds-spacing-xs)",z="var(--ds-spacing-xs)",R="var(--ds-spacing-xs)",F="0",P="0 0 auto",O="var(--ds-theme-foreground-base-highlight)",H="var(--ds-spacing-xs)",V="flex",L="initial",M="initial",N="column",q="1",D="var(--ds-card-padding-default)",U="var(--ds-card-padding-default)",W="var(--ds-card-padding-default)",K="var(--ds-card-padding-default)",Y="0",G="0",J="0",Q="var(--ds-spacing-4xl)",X="1",Z="flex",tt="var(--ds-spacing-s)",et="column",nt=n`
  :host {
    display: var(--ds-card-banner-display, ${t("flex")});
    gap: var(--ds-card-banner-gap, ${t(E)});
    height: var(--ds-card-banner-height, ${t($)});
    flex-direction: var(
      --ds-card-banner-flex-direction,
      ${t(S)}
    );
    justify-content: var(
      --ds-card-banner-justify-content,
      ${t(T)}
    );
    margin-block-start: var(
      --ds-card-banner-margin-block-start,
      ${t(A)}
    );
    margin-block-end: var(
      --ds-card-banner-margin-block-end,
      ${t(I)}
    );
    margin-inline-start: var(
      --ds-card-banner-margin-inline-start,
      ${t(B)}
    );
    margin-inline-end: var(
      --ds-card-banner-margin-inline-end,
      ${t(C)}
    );

    --ds-media-asset-border-start-start-radius: var(--ds-radii-m);
    --ds-media-asset-border-start-end-radius: var(--ds-radii-m);
    --ds-media-asset-border-end-end-radius: var(--ds-radii-m);
    --ds-media-asset-border-end-start-radius: var(--ds-radii-m);
    --ds-surface-border-radius: var(--ds-radii-l) !important;
    --ds-media-width: 100%;
    --ds-media-height: 100%;
    --ds-badge-box-shadow: none;
    --ds-media-asset-width: 100%;
    --ds-media-asset-height: auto;
  }

  :host([rectangle-border]) {
    /* Keep media corners rounded; only the card surface is rectangular */
    --ds-surface-border-radius: 0 !important;
  }
  :host([full-height]) {
    height: var(--ds-card-banner-full-height, 100%);
  }
  :host::part(card-banner__media),
  :host::part(card-banner__content) {
    min-width: 0;
  }
  :host::part(card-banner__media) {
    /* Padding for the top media section */
    padding-inline-start: var(
      --ds-card-banner-media-padding-inline-start,
      ${t(j)}
    );
    padding-inline-end: var(
      --ds-card-banner-media-padding-inline-end,
      ${t(z)}
    );
    padding-block-start: var(
      --ds-card-banner-media-padding-block-start,
      ${t(R)}
    );
    padding-block-end: var(
      --ds-card-banner-media-padding-block-end,
      ${t(F)}
    );
    flex: var(--ds-card-banner-top-flex, ${t(P)});
    display: flex;
  }

  :host::part(card-banner__content-header) {
    /* Styles for the content header text section */
    font-size: var(--ds-card-banner-label-font-size, ${t(e.fontSize)});
    line-height: var(
      --ds-card-banner-label-line-height,
      ${t(e.lineHeight)}
    );
    color: var(--ds-banner-label-color, ${t(O)});
    font-weight: var(
      --ds-card-banner-label-font-weight,
      ${t(e.fontWeight)}
    );
    padding-block-end: var(
      --ds-card-banner-label-padding-block-end,
      ${t(H)}
    );
  }

  ::slotted([slot='card-banner__media']) {
    height: auto;
  }

  :host([theme='night'])::part(card-banner__content-header) {
    --ds-banner-label-color: var(--ds-color-sky-blue-50);
  }

  :host::part(card-banner__content) {
    /* Styles for the content section */
    display: var(
      --ds-card-banner-content-display,
      ${t(V)}
    );
    gap: var(--ds-card-banner-content-gap, ${t(L)});
    justify-content: var(
      --ds-card-banner-content-justify-content,
      ${t(M)}
    );
    flex-direction: var(
      --ds-card-banner-content-flex-direction,
      ${t(N)}
    );
    padding-inline-start: var(
      --ds-card-banner-content-padding-inline-start,
      ${t(D)}
    );
    padding-inline-end: var(
      --ds-card-banner-content-padding-inline-end,
      ${t(U)}
    );
    padding-block-start: var(
      --ds-card-banner-content-padding-block-start,
      ${t(W)}
    );
    padding-block-end: var(
      --ds-card-banner-content-padding-block-end,
      ${t(K)}
    );
    flex: var(--ds-card-banner-content-flex, ${t(q)});
  }

  /* When a custom content-background-color is provided, apply a
      background image/color to the main content area. This uses the CSS
      custom property --ds-card-banner-content-background, which is only
      set when authoring provides a value. No default is applied for this
      variable. */
  :host([content-background-color]) {
    background: var(--ds-card-banner-content-background) !important;
  }

  :host::part(card-banner__content-body) {
    /* Styles for the content body textblock section */
    margin-inline-start: var(
      --ds-card-banner-content-body-margin-inline-start,
      ${t(Y)}
    );
    margin-inline-end: var(
      --ds-card-banner-content-body-margin-inline-end,
      ${t(G)}
    );
    margin-block-start: var(
      --ds-card-banner-content-body-margin-block-start,
      ${t(J)}
    );
    margin-block-end: var(
      --ds-card-banner-content-body-margin-block-end,
      ${t(Q)}
    );
    flex-grow: var(
      --ds-card-banner-content-body-flex-grow,
      ${t(X)}
    );
    min-height: 0;
  }

  :host::part(card-banner__content-footer) {
    /* Styles for the content footer section */
    display: var(
      --ds-card-banner-content-footer-display,
      ${t(Z)}
    );
    gap: var(--ds-card-banner-content-footer-gap, ${t(tt)});
    flex-direction: var(
      --ds-card-banner-content-footer-flex-direction,
      ${t(et)}
    );
  }
`,at=n`
  /* Intro media always fills its box with cover (no letterbox); shared by every
     intro state (fullscreen, desktop split, mobile overlay/stacked). */
  :host([enable-intro-animation]) ::slotted([slot='card-banner__media']) {
    width: 100%;
    height: 100%;

    --ds-media-video-fit: cover;
    --ds-media-object-fit: cover;
  }

  /* Intro tokens — single source for the intro's timing + sizing values so the
     numbers below aren't scattered magic values. */
  :host([enable-intro-animation]) {
    --ds-card-banner-intro-transition: var(--ds-card-banner-intro-duration, 900ms)
      cubic-bezier(0.4, 0, 0.2, 1);
    --ds-card-banner-mobile-full-height: 793px;
    --ds-card-banner-mobile-video-height: 694px;
    --ds-card-banner-overlay-height: 669px;
    --ds-card-banner-stacked-height: 232px;
    --ds-card-banner-media-gap: 16px;
    --ds-card-banner-media-inset: 8px;
    --ds-card-banner-content-reveal-max: 1000px;

    /* Content reveal is gated to AFTER the media shrink */
    --ds-card-banner-content-reveal-duration: 300ms;
    --ds-card-banner-content-reveal-delay: var(--ds-card-banner-intro-duration, 900ms);
  }

  /* Fullscreen intro-active: square, edge-to-edge media (desktop + mobile). */
  :host([enable-intro-animation][intro-active]) {
    overflow: hidden;

    --ds-surface-border-radius: 0 !important;
    --ds-media-height: 100%;
    --ds-media-asset-height: 100%;
    --ds-media-asset-border-start-start-radius: 0;
    --ds-media-asset-border-start-end-radius: 0;
    --ds-media-asset-border-end-end-radius: 0;
    --ds-media-asset-border-end-start-radius: 0;
  }

  @media (min-width: ${t(u.md)}) {
    :host {
      --ds-card-banner-display: flex;
      --ds-card-banner-justify-content: space-between;
      --ds-card-banner-flex-direction: row-reverse;
      --ds-card-banner-media-padding-inline-start: 0;
      --ds-card-banner-media-padding-block-end: var(--ds-spacing-xs);
      --ds-card-banner-top-flex: 1 1 0%;
    }

    :host::part(card-banner__content-header) {
      --ds-card-banner-label-font-size: ${t(a.fontSize)};
      --ds-card-banner-label-line-height: ${t(a.lineHeight)};
      --ds-card-banner-label-padding-block-end: 0;
    }

    :host::part(card-banner__content) {
      --ds-card-banner-content-justify-content: space-between;
      gap: var(--ds-card-banner-content-gap, var(--ds-spacing-l));
    }

    :host([rectangle-border]) {
      --ds-card-banner-content-padding-block-start: calc(
        var(--ds-card-padding-default) + (var(--ds-card-padding-default) * 2 / 3)
      );
      --ds-card-banner-content-padding-inline-start: calc(
        (var(--ds-card-padding-default) * 3) + (var(--ds-card-padding-default) / 3)
      );
    }

    :host::part(card-banner__content-body) {
      --ds-card-banner-content-body-margin-block-end: 0;
      align-content: center;
    }

    :host::part(card-banner__content-header),
    :host::part(card-banner__content-body),
    :host::part(card-banner__content-footer) {
      padding-inline-end: var(--ds-card-padding-default);
    }

    /* Desktop intro surface for the fullscreen→split transition. Resting height =
       Figma 580/1600 ratio of the JS-published --ds-card-banner-width so it
       animates px→px; released to aspect-ratio once the intro completes. */
    :host([enable-intro-animation]) {
      /* width:100% keeps width definite so aspect-ratio only ever drives height.
         Without it, the fullscreen height (892-ratio) makes aspect-ratio infer a
         width of height*1600/580, overflowing horizontally and janking the shrink. */
      width: 100%;
      box-sizing: border-box;
      aspect-ratio: 1600 / 580;
      height: calc(var(--ds-card-banner-width, 100vw) * 580 / 1600);
    }

    :host([enable-intro-animation][intro-complete]) {
      /* Resting: release the fixed ratio so tall content isn't clipped at 860–1023px; ratio height becomes a min-height floor. */
      aspect-ratio: auto;
      height: auto;
      min-height: calc(var(--ds-card-banner-width, 100vw) * 580 / 1600);
    }

    :host([enable-intro-animation])::part(card-banner__media) {
      align-self: stretch;
      min-width: 0;
      box-sizing: border-box;
      overflow: hidden;
    }

    :host([enable-intro-animation])::part(card-banner__content) {
      flex: 1 1 0;
      min-width: 0;
      box-sizing: border-box;
      overflow: hidden;
    }

    @media (prefers-reduced-motion: no-preference) {
      :host([enable-intro-animation]) {
        transition: height var(--ds-card-banner-intro-transition);
      }

      :host([enable-intro-animation])::part(card-banner__media) {
        transition: flex-basis var(--ds-card-banner-intro-transition),
          margin var(--ds-card-banner-intro-transition),
          border-radius var(--ds-card-banner-intro-transition);
      }

      :host([enable-intro-animation])::part(card-banner__content) {
        /* padding still tracks the shrink; opacity is delayed until the shrink
           finishes so the text only reveals once the box is at its final width. */
        transition: padding var(--ds-card-banner-intro-transition),
          opacity var(--ds-card-banner-content-reveal-duration, 300ms) ease-out
            var(--ds-card-banner-content-reveal-delay, 900ms);
      }
    }

    /* Fullscreen (intro-active): media full width, content collapsed. Height =
       Figma 892/1600 ratio of the banner width, capped at the viewport. */
    :host([enable-intro-animation][intro-active]) {
      height: min(100vh, calc(var(--ds-card-banner-width, 100vw) * 892 / 1600));
    }

    :host([enable-intro-animation][intro-active])::part(card-banner__media) {
      flex: 0 0 100%;
      margin: 0;
      padding: 0;
      border-radius: 0;
    }

    :host([enable-intro-animation][intro-active])::part(card-banner__content) {
      padding: 0;
      opacity: 0;
      pointer-events: none;
    }

    /* Resting split: media ~48.5% (inset subtracted so its margin can't overflow),
       content flexes to fill the rest. */
    :host([enable-intro-animation]:not([intro-active]))::part(card-banner__media) {
      flex: 0 0 calc(48.5% - var(--ds-card-banner-media-inset));
      margin: var(--ds-card-banner-media-inset) var(--ds-card-banner-media-inset)
        var(--ds-card-banner-media-inset) 0;
      padding: 0;
      border-radius: 16px;
    }

    :host([enable-intro-animation]:not([intro-active]))::part(card-banner__content) {
      padding: 40px 80px;
      opacity: 1;
    }
  }

  @media (max-width: ${t(_(u.md))}) {
    :host {
      --ds-card-banner-content-justify-content: space-between;
    }
    :host([rectangle-border]) {
      --ds-card-banner-media-padding-inline-start: 1rem;
      --ds-card-banner-media-padding-inline-end: 1rem;
      --ds-card-banner-media-padding-block-start: 1rem;
      --ds-card-banner-content-padding-inline-start: 1rem;
      --ds-card-banner-content-padding-inline-end: 1rem;
      --ds-card-banner-content-padding-block-start: 1rem;
      --ds-card-banner-content-padding-block-end: 1.5rem;
    }

    :host([rectangle-border]) ::slotted(store-text-block[slot='card-banner__content-body']) {
      --ds-text-block-align-items: center;
      --ds-text-block-text-align: center;
      --ds-text-block-header-align-items: center;
      --ds-text-block-header-text-align: center;
      --ds-text-block-headings-align-items: center;
      --ds-text-block-body-align-items: center;
      --ds-text-block-heading-font-size: var(--ds-heading-xl-font-size);
      --ds-text-block-heading-font-weight: 500;
      --ds-text-block-heading-line-height: var(--ds-heading-xl-line-height);
      --ds-text-block-content-font-size: var(--ds-body-m-font-size);
      --ds-text-block-content-font-weight: 400;
      --ds-text-block-content-line-height: var(--ds-body-m-line-height);
    }

    /* Mobile centering for store-heading-block used in card banner body */
    :host([rectangle-border]) ::slotted(store-heading-block[slot='card-banner__content-body']) {
      text-align: center;

      /* Center nested button-group CTA inside heading-block on mobile */
      --ds-button-group-align-items: center;
      --ds-button-group-justify-content: center;
      --ds-button-group-link-justify-content: center;
    }

    /* Intro-only: center the heading-block body flex row (and balance its inline padding) so text-align alone doesn't leave it left at 540–859px. */
    :host([enable-intro-animation]) ::slotted(store-heading-block[slot='card-banner__content-body']) {
      --ds-heading-block-content-text-justify-content: center;
      --ds-heading-block-content-text-padding-inline-start: var(
        --ds-heading-block-content-text-padding-inline-end
      );
    }

    :host([rectangle-border])
      ::slotted(store-button-group[slot='card-banner__content-footer-bottom']) {
      --ds-button-group-width: 100%;
      --ds-button-group-flex-direction: column;
      --ds-button-group-align-items: center;
      --ds-button-group-justify-content: center;
      --ds-button-group-link-justify-content: center;
      --ds-button-width: 100%;
      --ds-button-host-display: block;
    }

    /* Mobile fullscreen (load) state, shared by both views. The authored
       background shows through the host padding as a top/bottom border.
       !important defeats the SurfaceElement's own border/shadow tokens. */
    :host([enable-intro-animation][intro-active]) {
      height: min(var(--ds-card-banner-mobile-full-height), 100vh);
      box-sizing: border-box;
      padding-block: 50px 49px;

      --ds-surface-border-width: 0 !important;
      --ds-surface-box-shadow: none !important;
    }

    :host([enable-intro-animation][intro-active])::part(card-banner__media) {
      flex: 1 1 auto;
      height: 100%;
      padding: 0;
      box-sizing: border-box;
    }

    :host([enable-intro-animation][intro-active])::part(card-banner__content) {
      max-height: 0;
      padding: 0;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
    }

    /* ===== Mobile resting views (video on top, text below) =====
       Both views share everything except the video container height. */

    /* --- Shared --- */
    :host([enable-intro-animation][mobile-intro-view]:not([intro-active])) {
      /* !important defeats the SurfaceElement's own border/shadow tokens. */
      --ds-surface-border-width: 0 !important;
      --ds-surface-box-shadow: none !important;
    }

    :host([enable-intro-animation][mobile-intro-view]:not([intro-active]))::part(card-banner__media) {
      flex: 0 0 auto;
      box-sizing: border-box;
      min-height: 0;
      padding: var(--ds-card-banner-media-gap);
      overflow: hidden;
    }

    /* --- Overlay (Portrait Video): large video --- */
    :host([enable-intro-animation][mobile-intro-view='overlay']:not([intro-active]))::part(card-banner__media) {
      height: min(var(--ds-card-banner-overlay-height), 100vh);
    }

    /* --- Stacked (Landscape Video): small video --- */
    :host([enable-intro-animation][mobile-intro-view='stacked']:not([intro-active]))::part(card-banner__media) {
      height: min(var(--ds-card-banner-stacked-height), 100vh);
    }

    :host([enable-intro-animation][mobile-intro-view]:not([intro-active]))
      ::slotted([slot='card-banner__media']) {
      overflow: hidden;
      border-radius: var(--ds-radii-l, 12px);
    }

    :host([enable-intro-animation][mobile-intro-view]:not([intro-active]))::part(card-banner__content) {
      box-sizing: border-box;
      min-height: 0;

      /* Generous cap the content never reaches; a transitionable stand-in for
         auto height so the reveal can animate. */
      max-height: var(--ds-card-banner-content-reveal-max);
      padding: var(--ds-card-banner-media-gap);
      opacity: 1;
      text-align: center;

      --ds-card-banner-content-body-margin-block-end: 0;
      --ds-text-block-text-align: center;
      --ds-text-block-align-items: center;
      --ds-text-block-header-align-items: center;
      --ds-text-block-header-text-align: center;
      --ds-text-block-headings-align-items: center;
      --ds-text-block-body-align-items: center;
      --ds-button-group-align-items: center;
      --ds-button-group-justify-content: center;
      --ds-button-group-link-justify-content: center;
    }

    /* --- Stacked override: left-aligned heading + body --- */
    :host([enable-intro-animation][mobile-intro-view='stacked']:not([intro-active]))::part(card-banner__content) {
      text-align: left;

      --ds-text-block-text-align: start;
      --ds-text-block-align-items: start;
      --ds-text-block-header-align-items: start;
      --ds-text-block-header-text-align: start;
      --ds-text-block-headings-align-items: start;
      --ds-text-block-body-align-items: start;
    }

    /* Typography: size='s' text-block feeds its heading from --ds-heading-s-*,
       so we override those tokens (xl heading + medium body). */
    :host([enable-intro-animation][mobile-intro-view]:not([intro-active]))
      ::slotted(store-text-block[slot='card-banner__content-body']) {
      letter-spacing: -1.2px;

      --ds-heading-s-font-size: var(--ds-heading-xl-font-size, 3rem);
      --ds-heading-s-line-height: var(--ds-heading-xl-line-height, 3.5rem);
      --ds-heading-s-font-weight: 500;
      --ds-text-block-content-font-weight: 400;
      --ds-text-block-content-letter-spacing: -0.03em;
    }

    /* CTA: full-width button. */
    :host([enable-intro-animation][mobile-intro-view]:not([intro-active]))
      ::slotted(store-button-group[slot='card-banner__content-footer-bottom']) {
      --ds-button-group-width: 100%;
      --ds-button-group-flex-direction: column;
      --ds-button-group-align-items: stretch;
      --ds-button-width: 100%;
      --ds-button-host-display: block;
    }

    /* Explicit fullscreen media height so the shrink animates cleanly (avoids
       circular % sizing). */
    :host([enable-intro-animation][mobile-intro-view][intro-active])::part(card-banner__media) {
      height: var(--ds-card-banner-mobile-video-height);
    }

    /* Shrink transition (both views): video shrinks/moves up while the text
       reveals below. Fires on the intro timer or a manual scroll. */
    @media (prefers-reduced-motion: no-preference) {
      :host([enable-intro-animation][mobile-intro-view]) {
        transition: padding var(--ds-card-banner-intro-transition);
      }

      :host([enable-intro-animation][mobile-intro-view])::part(card-banner__media) {
        transition: height var(--ds-card-banner-intro-transition),
          padding var(--ds-card-banner-intro-transition);
      }

      :host([enable-intro-animation][mobile-intro-view])::part(card-banner__content) {
        transition: max-height var(--ds-card-banner-intro-transition),
          padding var(--ds-card-banner-intro-transition),
          opacity var(--ds-card-banner-intro-transition);
      }
    }
  }

  @media (max-width: ${t(_(u.sm))}) {
    :host {
      --ds-button-group-link-justify-content: start;
    }

    :host([rectangle-border]) {
      --ds-button-group-link-justify-content: center;
    }
  }
`;var rt=Object.defineProperty,ot=Object.getOwnPropertyDescriptor,it=(t,e,n,a)=>{for(var r,o=a>1?void 0:a?ot(e,n):e,i=t.length-1;i>=0;i--)(r=t[i])&&(o=(a?r(e,n,o):r(o))||o);return a&&o&&rt(e,n,o),o};const dt="store-card-banner",st=[["width","100%"],["height","100%"],["max-height","none"],["aspect-ratio","auto"],["object-fit","cover"]];let lt=class extends w{constructor(){super(...arguments),this.rectangleBorder=!1,this.fullHeight=!1,this.noContentPadding=!1,this.enableIntroAnimation=!1,this.mobileIntroView="overlay",this.introDelay=5e3,this.introDuration=900,this._firstSlotEmpty=!0,this._mediaSlotEmpty=!0,this._headerSlotEmpty=!0,this._bodySlotEmpty=!0,this._footerTopSlotEmpty=!0,this._footerBottomSlotEmpty=!0,this._lastSlotEmpty=!0,this._umpForcedPlay=!1,this._umpFindAttempts=0,this._introCompleted=!1}_handleSlotChange(t){this._firstSlotEmpty=0===this._firstSlot.length,this._mediaSlotEmpty=0===this._mediaSlot.length,this._headerSlotEmpty=0===this._topSlot.length,this._bodySlotEmpty=0===this._middleSlot.length,this._footerTopSlotEmpty=0===this._footerTopSlot.length,this._footerBottomSlotEmpty=0===this._footerBottomSlot.length,this._lastSlotEmpty=0===this._lastSlot.length;const e=t.target.name;"card-banner__media"===e&&!this._mediaSlotEmpty&&(this._updateMediaAttributes(),this._clearUmpBackground()),"card-banner__content-body"===e&&!this._bodySlotEmpty&&this._updateTextBlockAttributes(),"card-banner__content-footer-bottom"===e&&!this._footerBottomSlotEmpty&&this._updateButtonAttributes()}_updateMediaAttributes(){const t=this._mediaSlot.filter(t=>t.nodeName.toLowerCase()===p);t.length>0&&t.forEach(t=>{t.hasAttribute("aspect-ratio")||t.setAttribute("aspect-ratio","slim"===this.configuration?d.ratio21to9:d.ratio4to3)})}_clearUmpBackground(){if(!this.hasAttribute("enable-intro-animation"))return;const t=this._findUmpElement();t&&(t.style.backgroundColor="transparent")}_updateTextBlockAttributes(){const t=this._middleSlot.filter(t=>t.nodeName.toLowerCase()===m);0!==t.length&&s(t,{configuration:h.default,size:"slim"===this.configuration?l["size-xs"]:l["size-s"]})}_updateButtonAttributes(){const t=this._footerBottomSlot.filter(t=>t.nodeName.toLowerCase()===g);t.length>0&&t.forEach(t=>{const e=t.querySelector("store-button");e&&(e.hasAttribute("appearance")||e.setAttribute("appearance",v.buttonPrimary),e.hasAttribute("shape")||e.setAttribute("shape",f.rounded),e.hasAttribute("size")||e.setAttribute("size",y.medium))})}_renderOptionalSlot(t="card-banner__first",e=this._firstSlotEmpty){return c`
      <div part=${t} class=${t} style="${e?"display: none;":""}">
        <slot name=${t} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}_renderSlot(t){return c`
      <div part="${t}" class="${t}">
        <slot name="${t}" @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}firstUpdated(){super.firstUpdated(),this.surface||(this.surface=x.solidBorder),this._clearUmpBackground()}updated(t){if(super.updated(t),t.has("contentBackgroundColor"))if(this.contentBackgroundColor&&this.contentBackgroundColor.trim().length>0){const t=this.contentBackgroundColor.trim();this.style.setProperty("--ds-card-banner-content-background",t),this.hasAttribute("content-background-color")||this.setAttribute("content-background-color",t)}else this.style.removeProperty("--ds-card-banner-content-background"),this.hasAttribute("content-background-color")&&this.removeAttribute("content-background-color");t.has("noContentPadding")&&this.noContentPadding&&this.style.setProperty("--ds-card-banner-margin-block-end","0")}connectedCallback(){super.connectedCallback(),this._shouldRunIntro()&&!this._introCompleted&&(this.setAttribute("intro-active",""),this.updateComplete.then(()=>{this.hasAttribute("intro-active")&&!this._introTimeout&&this._startIntroAnimation()}).catch(()=>{}))}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._introTimeout),clearTimeout(this._introEndTimeout),clearTimeout(this._introVideoRetry),clearInterval(this._introFitInterval),this._introTimeout=void 0,this._introEndTimeout=void 0,this._introVideoRetry=void 0,this._introFitInterval=void 0,this._removeIntroScrollListener(),this._umpEl&&this._umpReadyHandler&&(this._umpEl.removeEventListener("ready",this._umpReadyHandler),this._umpReadyHandler=void 0)}_shouldRunIntro(){return!(!this.hasAttribute("enable-intro-animation")||typeof globalThis>"u"||!globalThis.matchMedia||globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches)}_startIntroAnimation(){this.style.setProperty("--ds-card-banner-intro-duration",`${this.introDuration}ms`),this._publishBannerWidth(),this._enableMediaBackground(),this._playIntroVideo(),this._applyIntroVideoFit(),this._introFitInterval=setInterval(()=>this._applyIntroVideoFit(),300),this._introTimeout=setTimeout(()=>{this._endIntroAnimation()},this.introDelay);const t=globalThis.scrollY;this._introScrollHandler=()=>{globalThis.scrollY>t&&this._endIntroAnimation()},globalThis.addEventListener("scroll",this._introScrollHandler,{passive:!0})}_removeIntroScrollListener(){this._introScrollHandler&&(globalThis.removeEventListener("scroll",this._introScrollHandler),this._introScrollHandler=void 0)}_enableMediaBackground(){if(globalThis.innerWidth>=lt.INTRO_MOBILE_BREAKPOINT)return;const t=this.querySelector("store-media");t&&!t.hasAttribute("background")&&t.setAttribute("background","")}_publishBannerWidth(){const{width:t}=this.getBoundingClientRect();t>0&&this.style.setProperty("--ds-card-banner-width",`${t}px`)}_playIntroVideo(){if(this._umpForcedPlay)return;const t=this._findUmpElement();if(!t)return void(this._umpFindAttempts<20&&(this._umpFindAttempts++,this._introVideoRetry=setTimeout(()=>this._playIntroVideo(),100)));this._umpForcedPlay=!0,this._umpEl=t;const e=()=>{try{const e=t.play;"function"==typeof e&&e.call(t)}catch{}};e(),this._umpReadyHandler=()=>{e(),this._umpReadyHandler=void 0},t.addEventListener("ready",this._umpReadyHandler,{once:!0})}_findUmpElement(){return this.querySelector("universal-media-player")||this.querySelector("store-media universal-media-player, store-media-player universal-media-player")}_applyIntroVideoFit(){const t=this._findIntroVideo();if(!t)return;const e=this.querySelector("store-media"),n=globalThis.innerWidth>=lt.INTRO_MOBILE_BREAKPOINT;let a=t;for(;a&&(a!==e||!n);){for(const[t,e]of st)a.style.setProperty(t,e);if(a===e)break;const t=a.getRootNode(),n=t instanceof ShadowRoot?t.host:null;a=a.parentElement??n}}_findIntroVideo(){var t;const e=this.querySelector("store-media")??this,n=e.querySelector("video");if(n)return n;const a=[e],r=new WeakSet;for(;a.length;){const e=a.pop();if(e&&!r.has(e)){if(r.add(e),e instanceof HTMLVideoElement)return e;if(e.shadowRoot){const t=e.shadowRoot.querySelector("video");if(t)return t;e.shadowRoot.querySelectorAll("*").forEach(t=>a.push(t))}null==(t=e.querySelectorAll)||t.call(e,"*").forEach(t=>a.push(t))}}return null}_endIntroAnimation(){this.hasAttribute("intro-active")&&(clearTimeout(this._introTimeout),this._introTimeout=void 0,this._removeIntroScrollListener(),this._introCompleted=!0,this.removeAttribute("intro-active"),this._introEndTimeout=setTimeout(()=>{this._introEndTimeout=void 0,clearInterval(this._introFitInterval),this._introFitInterval=void 0,this._applyIntroVideoFit(),this.style.removeProperty("--ds-card-banner-intro-duration"),this.setAttribute("intro-complete","")},this.introDuration))}render(){return c`
      ${this._renderOptionalSlot("card-banner__first",this._firstSlotEmpty)}
      ${this._renderSlot("card-banner__media")}
      <div class="card-banner__content" part="card-banner__content">
        ${this._renderOptionalSlot("card-banner__content-header",this._headerSlotEmpty)}
        ${this._renderSlot("card-banner__content-body")}
        <div class="card-banner__content-footer" part="card-banner__content-footer">
          ${this._renderOptionalSlot("card-banner__content-footer-top",this._footerTopSlotEmpty)}
          ${this._renderOptionalSlot("card-banner__content-footer-bottom",this._footerBottomSlotEmpty)}
        </div>
      </div>
      ${this._renderOptionalSlot("card-banner__last",this._lastSlotEmpty)}
    `}};lt.styles=[k,nt,at],lt.INTRO_MOBILE_BREAKPOINT=parseInt(u.md,10),it([r({reflect:!0})],lt.prototype,"theme",2),it([r({type:String,reflect:!0})],lt.prototype,"configuration",2),it([r({attribute:"content-background-color"})],lt.prototype,"contentBackgroundColor",2),it([r({type:Boolean,reflect:!0,attribute:"rectangle-border"})],lt.prototype,"rectangleBorder",2),it([r({type:Boolean,reflect:!0,attribute:"full-height"})],lt.prototype,"fullHeight",2),it([r({type:Boolean,reflect:!0,attribute:"no-content-padding"})],lt.prototype,"noContentPadding",2),it([r({type:Boolean,reflect:!0,attribute:"enable-intro-animation"})],lt.prototype,"enableIntroAnimation",2),it([r({reflect:!0,attribute:"mobile-intro-view"})],lt.prototype,"mobileIntroView",2),it([r({type:Number,attribute:"intro-delay"})],lt.prototype,"introDelay",2),it([r({type:Number,attribute:"intro-duration"})],lt.prototype,"introDuration",2),it([o({slot:"card-banner__first"})],lt.prototype,"_firstSlot",2),it([o({slot:"card-banner__media"})],lt.prototype,"_mediaSlot",2),it([o({slot:"card-banner__content-header"})],lt.prototype,"_topSlot",2),it([o({slot:"card-banner__content-body"})],lt.prototype,"_middleSlot",2),it([o({slot:"card-banner__content-footer-top"})],lt.prototype,"_footerTopSlot",2),it([o({slot:"card-banner__content-footer-bottom"})],lt.prototype,"_footerBottomSlot",2),it([o({slot:"card-banner__last"})],lt.prototype,"_lastSlot",2),it([i()],lt.prototype,"_firstSlotEmpty",2),it([i()],lt.prototype,"_mediaSlotEmpty",2),it([i()],lt.prototype,"_headerSlotEmpty",2),it([i()],lt.prototype,"_bodySlotEmpty",2),it([i()],lt.prototype,"_footerTopSlotEmpty",2),it([i()],lt.prototype,"_footerBottomSlotEmpty",2),it([i()],lt.prototype,"_lastSlotEmpty",2),lt=it([b(dt)],lt);export{lt as CardBanner,dt as name};
