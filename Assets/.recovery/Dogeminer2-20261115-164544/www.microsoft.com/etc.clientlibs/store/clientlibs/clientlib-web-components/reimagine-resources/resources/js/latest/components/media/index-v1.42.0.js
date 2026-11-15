import{r as t,i as e,I as i,J as a,av as s,ag as d,e as r,c as o,n as l,s as n,g as h,f as p,X as m,k as g,b as v,t as c,d as u}from"../../tag.const-v1.42.0.js";import{b as _,s as b}from"../../surface.styles-v1.42.0.js";import{B as y}from"../../util1-v1.42.0.js";import{S as f}from"../../secondary-nav-item.const-v1.42.0.js";const k="initial",E="initial",$="initial",S="content-box",w="initial",P="initial",C="initial",T="initial",x="initial",R="initial",A="initial",O="initial",B="initial",L="flex",V="initial",z="fit-content",j="100%",G="auto",H="initial",D="initial",U="relative",Y="0rem",I="0rem",M="0rem",N="0rem",F="0rem",q="initial",K="initial",W="auto",J="initial",X="Canvas",Q="initial",Z="initial",tt="initial",et="initial",it="initial",at="initial",st="initial",dt="initial",rt="initial",ot="initial",lt="initial",nt="initial",ht="absolute",pt="0",mt="0",gt="0",vt="0",ct="100%",ut="100%",_t="var(--ds-media-asset-border-start-start-radius, 0)",bt="2",yt="absolute",ft="1",kt="2",Et="initial",$t="var(--ds-spacing-m, 1rem)",St="var(--ds-spacing-m, 1rem)",wt="var(--ds-spacing-m, 1rem)",Pt="var(--ds-spacing-m, 1rem)",Ct="50%",Tt="50%",xt="translate(-50%, -50%)",Rt="var(--ds-spacing-m, 1rem)",At="var(--ds-spacing-m, 1rem)",Ot="var(--ds-spacing-m, 1rem)",Bt="var(--ds-spacing-m, 1rem)",Lt=e`
  :host {
    aspect-ratio: var(--ds-media-aspect-ratio, ${t(k)});
    background: var(--ds-media-background, ${t(E)});
    backdrop-filter: var(--ds-media-backdrop-filter, ${t($)});
    border-style: var(--ds-media-border-style, ${t(P)});
    border-color: var(--ds-media-border-color, ${t(C)});
    border-width: var(--ds-media-border-width, ${t(T)});
    box-sizing: var(--ds-media-box-sizing, ${t(S)}) !important;
    box-shadow: var(--ds-media-box-shadow, ${t(w)});
    align-items: var(--ds-media-align-items, ${t(B)});
    display: var(--ds-media-display, ${t(L)});
    justify-content: var(--ds-media-justify-content, ${t(V)});
    width: var(--ds-media-width, ${t(z)});
    max-width: var(--ds-media-max-width, ${t(j)});
    height: var(--ds-media-height, ${t(G)});
    max-height: var(--ds-media-max-height, ${t(H)});
    object-fit: var(--ds-media-object-fit, ${t(D)});
    position: var(--ds-media-position, ${t(U)});
    overflow: var(--ds-media-overflow, ${t(K)});
    padding-inline-start: var(
      --ds-media-padding-inline-start,
      ${t(Y)}
    );
    padding-inline-end: var(
      --ds-media-padding-inline-end,
      ${t(I)}
    );
    padding-block-start: var(
      --ds-media-padding-block-start,
      ${t(M)}
    );
    padding-block-end: var(
      --ds-media-padding-block-end,
      ${t(N)}
    );
    z-index: var(--ds-media-zindex, ${t(q)});
    margin-block-start: var(
      --ds-media-margin-block-start,
      ${t(F)}
    );
  }

  :host .media__asset {
    background: var(
      --ds-media-asset-background,
      ${t(J)}
    );
    display: var(--ds-media-asset-display, ${t(Q)});
    overflow: var(--ds-media-asset-overflow, ${t(Z)});
    border-start-start-radius: var(
      --ds-media-asset-wrapper-border-start-start-radius,
      ${t(tt)}
    );
    border-start-end-radius: var(
      --ds-media-asset-wrapper-border-start-end-radius,
      ${t(et)}
    );
    border-end-end-radius: var(
      --ds-media-asset-wrapper-border-end-end-radius,
      ${t(it)}
    );
    border-end-start-radius: var(
      --ds-media-asset-wrapper-border-end-start-radius,
      ${t(at)}
    );
    width: var(--ds-media-asset-width, ${t(lt)});
    height: var(--ds-media-asset-height, ${t(nt)});
  }

  @media (forced-colors: active) {
    :host([enable-hcm]) .media__asset {
      background-color: var(
        --ds-media-asset-high-contrast-background-color,
        ${t(X)}
      );
    }
  }

  :host,
  :host([type='highlight--double-image']) ::slotted([slot='media__double-img']) {
    border-start-start-radius: var(
      --ds-media-border-start-start-radius,
      ${t(x)}
    );
    border-start-end-radius: var(
      --ds-media-border-start-end-radius,
      ${t(R)}
    );
    border-end-end-radius: var(
      --ds-media-border-end-end-radius,
      ${t(A)}
    );
    border-end-start-radius: var(
      --ds-media-border-end-start-radius,
      ${t(O)}
    );
  }

  :host([aspect-ratio='21-9']) {
    --ds-media-aspect-ratio: 21 / 9;
  }

  :host([aspect-ratio='16-9']) {
    --ds-media-aspect-ratio: 16 / 9;
  }

  :host([aspect-ratio='4-3']) {
    --ds-media-aspect-ratio: 4 / 3;
  }

  :host([aspect-ratio='1-1']) {
    --ds-media-aspect-ratio: 1 / 1;
  }

  :host([aspect-ratio='3-4']) {
    --ds-media-aspect-ratio: 3 / 4;
  }

  :host([aspect-ratio='2-3']) {
    --ds-media-aspect-ratio: 2 / 3;
  }

  :host([drop-shadow]) {
    --ds-media-box-shadow: var(
      --ds-elevation-level-6,
      0px 32px 64px rgba(0, 0, 0, 0.14) 0px 0px 8px rgba(0, 0, 0, 0.12)
    );
  }

  img,
  picture,
  ::slotted(img),
  ::slotted(picture) {
    --ds-media-asset-overflow: auto;

    aspect-ratio: var(--ds-media-aspect-ratio, ${t(k)});
    border-start-start-radius: var(
      --ds-media-asset-border-start-start-radius,
      ${t(st)}
    );
    border-start-end-radius: var(
      --ds-media-asset-border-start-end-radius,
      ${t(dt)}
    );
    border-end-end-radius: var(
      --ds-media-asset-border-end-end-radius,
      ${t(rt)}
    );
    border-end-start-radius: var(
      --ds-media-asset-border-end-start-radius,
      ${t(ot)}
    );
  }

  img,
  ::slotted(img) {
    display: var(--ds-media-display, flex);
    width: var(--ds-media-width, ${t(z)});
    max-width: var(--ds-media-max-width, ${t(j)});
    height: var(--ds-media-height, ${t(G)});
    max-height: var(--ds-media-max-height, ${t(H)});
    object-fit: var(--ds-media-object-fit, ${t(D)});
  }

  picture,
  ::slotted(picture) {
    display: var(--ds-media-picture-display, flex);
    width: var(
      --ds-media-picture-width,
      var(--ds-media-width, ${t(z)})
    );
    max-width: var(
      --ds-media-picture-max-width,
      var(--ds-media-max-width, ${t(j)})
    );
    height: var(
      --ds-media-picture-height,
      var(--ds-media-height, ${t(G)})
    );
  }

  /* border-width */
  :host([border-width='xs']) {
    --ds-media-asset-border-start-start-radius: var(--ds-radii-xs, 0.25rem);
    --ds-media-asset-border-start-end-radius: var(--ds-radii-xs, 0.25rem);
    --ds-media-asset-border-end-start-radius: var(--ds-radii-xs, 0.25rem);
    --ds-media-asset-border-end-end-radius: var(--ds-radii-xs, 0.25rem);
  }

  :host([border-width='m']) {
    --ds-media-asset-border-start-start-radius: var(--ds-radii-m, 1rem);
    --ds-media-asset-border-start-end-radius: var(--ds-radii-m, 1rem);
    --ds-media-asset-border-end-start-radius: var(--ds-radii-m, 1rem);
    --ds-media-asset-border-end-end-radius: var(--ds-radii-m, 1rem);
  }

  :host([border-width='l']) {
    --ds-media-asset-border-start-start-radius: var(--ds-radii-l, 1.5rem);
    --ds-media-asset-border-start-end-radius: var(--ds-radii-l, 1.5rem);
    --ds-media-asset-border-end-start-radius: var(--ds-radii-l, 1.5rem);
    --ds-media-asset-border-end-end-radius: var(--ds-radii-l, 1.5rem);
  }

  /* Object Fit */
  :host([object-fit='cover']) {
    --ds-media-object-fit: cover;
  }

  :host([object-fit='contain']) {
    --ds-media-object-fit: contain;
  }

  :host([object-fit='fill']) {
    --ds-media-object-fit: fill;
  }

  :host([object-fit='scale-down']) {
    --ds-media-object-fit: scale-down;
  }

  /* Highlight styles */
  :host([type^='highlight']) {
    --ds-media-border-start-start-radius: var(--ds-radii-l, 1.5rem);
    --ds-media-border-start-end-radius: var(--ds-radii-l, 1.5rem);
    --ds-media-border-end-start-radius: var(--ds-radii-l, 1.5rem);
    --ds-media-border-end-end-radius: var(--ds-radii-l, 1.5rem);
    --ds-media-padding-inline-start: var(--ds-spacing-3xl, 4.5rem);
    --ds-media-padding-inline-end: var(--ds-spacing-3xl, 4.5rem);
    --ds-media-padding-block-start: var(--ds-spacing-3xl, 4.5rem);
    --ds-media-padding-block-end: var(--ds-spacing-3xl, 4.5rem);
    --ds-media-asset-border-start-start-radius: var(--ds-radii-m, 1rem);
    --ds-media-asset-border-start-end-radius: var(--ds-radii-m, 1rem);
    --ds-media-asset-border-end-start-radius: var(--ds-radii-m, 1rem);
    --ds-media-asset-border-end-end-radius: var(--ds-radii-m, 1rem);
    --ds-media-asset-overflow: hidden;
  }

  /* Highlight + border-width */
  :host([type^='highlight'][border-width='xs']) {
    --ds-media-padding-inline-start: var(--ds-spacing-xs, 0.5rem);
    --ds-media-padding-inline-end: var(--ds-spacing-xs, 0.5rem);
    --ds-media-padding-block-start: var(--ds-spacing-xs, 0.5rem);
    --ds-media-padding-block-end: var(--ds-spacing-xs, 0.5rem);
  }

  :host([type^='highlight'][border-width='m']) {
    --ds-media-padding-inline-start: var(--ds-spacing-m, 1rem);
    --ds-media-padding-inline-end: var(--ds-spacing-m, 1rem);
    --ds-media-padding-block-start: var(--ds-spacing-m, 1rem);
    --ds-media-padding-block-end: var(--ds-spacing-m, 1rem);
  }

  /* Additional highlight */
  :host([type='highlight--double-image']) ::slotted([slot='media__double-img']) {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  :host([type='highlight--double-image']) ::slotted([slot='media__asset']) {
    position: relative;
    z-index: 1;
  }

  :host([surface]) {
    --ds-surface-border-radius: var(--ds-media-border-start-start-radius);
  }

  :host([type='highlight'][surface='glass']),
  :host([type='highlight'][surface='solid']) {
    --ds-surface-border-radius: var(--ds-media-border-start-start-radius);
  }

  :host([type='highlight'][surface='glass']),
  :host([type='highlight--glass']) {
    --ds-media-padding-inline-start: var(--ds-spacing-l);
    --ds-media-padding-inline-end: var(--ds-spacing-l);
    --ds-media-padding-block-start: var(--ds-spacing-l);
    --ds-media-padding-block-end: var(--ds-spacing-l);
    --ds-media-background: ${t(_.background)};
    --ds-media-border-width: ${t(_.borderWidth)};
    --ds-media-border-style: ${t(_.borderStyle)};
    --ds-media-border-color: ${t(_.borderColor)};
    --ds-media-backdrop-filter: ${t(_.backdropFilter)};
    --ds-surface-background: ${t(_.background)};
  }

  :host([type='highlight'][surface='solid']),
  :host([type='highlight--solid']) {
    --ds-media-padding-inline-start: var(--ds-spacing-m);
    --ds-media-padding-inline-end: var(--ds-spacing-m);
    --ds-media-padding-block-start: var(--ds-spacing-m);
    --ds-media-padding-block-end: var(--ds-spacing-m);
    --ds-media-background: ${t(b.background)};
    --ds-media-border-width: ${t(b.borderWidth)};
    --ds-media-border-style: ${t(b.borderStyle)};
    --ds-media-border-color: ${t(b.borderColor)};
    --ds-surface-background: ${t(b.background)};
  }

  :host([type='highlight']),
  :host([type='highlight'][surface='color']),
  :host([type='highlight--color']) {
    --ds-surface-background: var(--ds-theme-background-special-color, 'initial');
    --ds-media-background: var(--ds-theme-background-special-color, 'initial');
  }

  /* end additional highlight */

  :host([video])::part(media__asset) {
    display: flex;
    width: 100%;
  }

  :host([overlay])::part(media__asset) {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
  }

  :host([overlay])::part(media__asset__overlay) {
    position: var(
      --ds-media-overlay-position,
      ${t(ht)}
    );
    top: var(--ds-media-overlay-top, ${t(pt)});
    left: var(--ds-media-overlay-left, ${t(mt)});
    right: var(
      --ds-media-overlay-right,
      ${t(gt)}
    );
    bottom: var(
      --ds-media-overlay-bottom,
      ${t(vt)}
    );
    width: var(
      --ds-media-overlay-width,
      ${t(ct)}
    );
    height: var(
      --ds-media-overlay-height,
      ${t(ut)}
    );
    border-radius: ${t(_t)};
    z-index: var(
      --ds-media-overlay-zindex,
      ${t(bt)}
    );
  }

  :host([overlay]) .media__asset__overlay::after {
    content: '';
    position: absolute;
    top: inherit;
    left: inherit;
    right: inherit;
    bottom: inherit;
    border-radius: inherit;
    background: var(--ds-media-overlay-background, initial);
    transition: background 0.3s ease;
    pointer-events: none;
  }

  :host([overlay]) ::slotted([slot^='media__pos']) {
    --ds-media-slot-zindex: var(
      --ds-media-overlay-slot-zindex,
      ${t(kt)}
    );
  }

  :host([overlay='asset--fill']) {
    --ds-media-overlay-background: var(--ds-theme-background-video-overlay-fill);
  }

  :host([overlay='asset--top']) {
    --ds-media-overlay-background: var(--ds-theme-background-video-overlay-vertical);
  }

  :host([overlay='asset--bottom-1']) {
    --ds-media-overlay-background: var(--ds-theme-background-video-overlay-bottom-vertical);
  }

  :host([overlay='asset--bottom-2']) {
    --ds-media-overlay-background: var(--ds-theme-background-video-overlay-bottom-vertical-light);
  }

  :host([overlay='asset--bottom-3']) {
    --ds-media-overlay-background: var(--ds-theme-background-video-overlay-bottom-vertical-strong);
  }

  :host([overlay='bg--fill']) {
    --ds-media-overlay-background: var(--ds-theme-background-background-overlay-fill);
  }

  :host([overlay='bg--horizontal']) {
    --ds-media-overlay-background: var(--ds-theme-background-background-overlay-horizontal);
  }

  :host([overlay='bg--horizontal-faded']) {
    --ds-media-overlay-background: var(--ds-theme-background-background-overlay-horizontal-faded);
  }

  :host([overlay='bg--horizontal-right']) {
    --ds-media-overlay-background: var(
      --ds-theme-background-background-overlay-horizontal-right,
      linear-gradient(90deg, rgba(255, 255, 255, 0) 33.48%, white 66.52%)
    );
  }

  :host([overlay='bg--horizontal-faded-right']) {
    --ds-media-overlay-background: var(
      --ds-theme-background-background-overlay-horizontal-faded-right,
      linear-gradient(90deg, rgba(255, 255, 255, 0) 33.48%, rgba(255, 255, 255, 0.6) 66.52%)
    );
  }

  :host([overlay='bg--vertical']) {
    --ds-media-overlay-background: var(--ds-theme-background-background-overlay-vertical);
  }

  :host([overlay='bg--vertical-color']) {
    --ds-media-overlay-background: var(--ds-theme-background-background-overlay-vertical-color);
  }

  /* Card promo gradient overlay uses tint-authored defaults when no explicit
   * overlay token is selected. The start stop is controlled by the parent card. */
  :host([enable-hover-effects])::part(media__asset) {
    position: relative;
  }

  :host([enable-hover-effects])::part(media__asset__overlay) {
    position: var(
      --ds-media-overlay-position,
      ${t(ht)}
    );
    top: var(--ds-media-overlay-top, ${t(pt)});
    left: var(--ds-media-overlay-left, ${t(mt)});
    right: var(
      --ds-media-overlay-right,
      ${t(gt)}
    );
    bottom: var(
      --ds-media-overlay-bottom,
      ${t(vt)}
    );
    width: var(
      --ds-media-overlay-width,
      ${t(ct)}
    );
    height: var(
      --ds-media-overlay-height,
      ${t(ut)}
    );
    border-radius: ${t(_t)};
    z-index: var(
      --ds-media-overlay-zindex,
      ${t(bt)}
    );
  }

  :host([enable-hover-effects]) .media__asset__overlay::after {
    content: '';
    position: absolute;
    top: inherit;
    left: inherit;
    right: inherit;
    bottom: inherit;
    border-radius: inherit;
    background: var(
      --ds-media-card-promo-interaction-overlay-background,
      var(
        --ds-media-card-promo-default-overlay-background,
        var(--ds-media-default-overlay-background, var(--ds-media-overlay-background, initial))
      )
    );
    transition: background 0.3s ease;
    pointer-events: none;
  }

  @media (min-width: 860px) {
    :host([enable-hover-effects]):hover .media__asset__overlay::after {
      background: var(
        --ds-media-card-promo-hover-overlay-background,
        var(
          --ds-media-hover-overlay-background,
          var(
            --ds-media-card-promo-default-overlay-background,
            var(--ds-media-default-overlay-background, var(--ds-media-overlay-background, initial))
          )
        )
      );
    }
  }

  /* ========================================
   * Background Mode
   * When [background] is set, store-media acts as a full-bleed background
   * layer. Propagates 100% width/height through .media__asset and
   * ::slotted content so that nested players (e.g. store-media-player)
   * fill the parent container with cover behavior.
   * ======================================== */
  :host([background]) {
    width: 100%;
    height: 100%;
    max-height: none;
    overflow: hidden;
  }

  :host([background])::part(media__asset) {
    display: flex;
    width: 100%;
    height: 100%;
  }

  :host([background]) ::slotted([slot='media__asset']) {
    display: block;
    width: 100%;
    height: 100%;
  }

  :host([background]) img,
  :host([background]) ::slotted(img),
  :host([background]) picture,
  :host([background]) ::slotted(picture) {
    width: 100%;
    height: 100%;
    max-width: none;
    max-height: none;
    object-fit: var(--ds-media-object-fit, initial);
    object-position: var(--ds-media-object-position, center bottom);
  }

  :host([video]) {
    --ds-media-slot-zindex: 10;
    width: var(--ds-media-video-width, ${t("100%")});
  }

  :host([video]) ::slotted([slot='media__asset']) {
    --ds-media-ump-pointer-events: var(
      --ds-media-pointer-events,
      ${t(W)}
    );
    --ds-media-player-pointer-events: var(
      --ds-media-pointer-events,
      ${t(W)}
    );
    --ds-media-ump-visibility: visible;

    border-start-start-radius: var(--ds-media-asset-border-start-start-radius, initial);
    border-start-end-radius: var(--ds-media-asset-border-start-end-radius, initial);
    border-end-end-radius: var(--ds-media-asset-border-end-end-radius, initial);
    border-end-start-radius: var(--ds-media-asset-border-end-start-radius, initial);
    overflow: var(--ds-media-asset-overflow, initial);
  }

  :host([video])::part(media__pos-top-right),
  :host([video])::part(media__pos-top-left),
  :host([video])::part(media__pos-bottom-right),
  :host([video])::part(media__pos-bottom-left),
  :host([video])::part(media__pos-center-center) {
    max-width: var(--ds-media-slot-max-width, initial);
    top: var(--ds-media-slot-top, initial);
    margin-inline: var(--ds-media-slot-margin-inline, initial);
    padding-inline: var(--ds-media-slot-padding-inline, initial);
  }

  ::slotted([slot^='media__pos']) {
    position: var(--ds-media-slot-position, ${t(yt)});
    z-index: var(--ds-media-slot-zindex, ${t(ft)});
    padding-inline: var(
      --ds-media-slot-padding-inline,
      ${t(Et)}
    );
  }

  ::slotted([slot='media__pos-top-left']) {
    left: calc(
      var(--ds-media-slot-top-left-x, ${t($t)}) +
        var(--ds-media-padding-inline-start, ${t(Y)})
    );
    top: calc(
      var(--ds-media-slot-top-left-y, ${t(St)}) +
        var(--ds-media-padding-block-start, ${t(M)})
    );
  }

  ::slotted([slot='media__pos-top-right']) {
    right: calc(
      var(--ds-media-slot-top-right-x, ${t(wt)}) +
        var(--ds-media-padding-inline-end, ${t(I)})
    );
    top: calc(
      var(--ds-media-slot-top-right-y, ${t(Pt)}) +
        var(--ds-media-padding-block-start, ${t(M)})
    );
  }

  ::slotted([slot='media__pos-center-center']) {
    left: var(
      --ds-media-slot-center-center-x,
      ${t(Ct)}
    );
    top: var(
      --ds-media-slot-center-center-y,
      ${t(Tt)}
    );
    transform: var(
      --ds-media-slot-center-center-transform,
      ${t(xt)}
    );
  }

  ::slotted([slot='media__pos-bottom-left']) {
    left: calc(
      var(
          --ds-media-slot-bottom-left-x,
          ${t(Rt)}
        ) +
        var(--ds-media-padding-inline-start, ${t(Y)})
    );
    bottom: calc(
      var(
          --ds-media-slot-bottom-left-y,
          ${t(At)}
        ) +
        var(--ds-media-padding-block-end, ${t(N)})
    );
  }

  ::slotted([slot='media__pos-bottom-right']) {
    right: calc(
      var(
          --ds-media-slot-bottom-right-x,
          ${t(Ot)}
        ) +
        var(--ds-media-padding-inline-end, ${t(I)})
    );
    bottom: calc(
      var(
          --ds-media-slot-bottom-right-y,
          ${t(Bt)}
        ) +
        var(--ds-media-padding-block-end, ${t(N)})
    );
  }

  canvas {
    display: flex;
    width: 100%;
    height: inherit;
    object-fit: cover;
  }

  ::slotted(img[gif-paused]),
  ::slotted(picture[gif-paused]),
  [canvas-hidden] {
    display: none;
  }

  [canvas-visible] {
    display: var(--ds-media-display);
    object-fit: cover;
  }

  /* Shape circle */
  :host([shape='circle']) {
    --ds-media-border-start-start-radius: 50%;
    --ds-media-border-start-end-radius: 50%;
    --ds-media-border-end-end-radius: 50%;
    --ds-media-border-end-start-radius: 50%;
    --ds-media-asset-border-start-start-radius: 50%;
    --ds-media-asset-border-start-end-radius: 50%;
    --ds-media-asset-border-end-end-radius: 50%;
    --ds-media-asset-border-end-start-radius: 50%;
    overflow: hidden;
  }

  /* Highlight size */
  :host([highlight-size='none']) {
    --ds-media-padding-inline-start: 0;
    --ds-media-padding-inline-end: 0;
    --ds-media-padding-block-start: 0;
    --ds-media-padding-block-end: 0;
  }

  :host([highlight-size='3xs']) {
    --ds-media-padding-inline-start: var(--ds-spacing-3xs);
    --ds-media-padding-inline-end: var(--ds-spacing-3xs);
    --ds-media-padding-block-start: var(--ds-spacing-3xs);
    --ds-media-padding-block-end: var(--ds-spacing-3xs);
  }

  :host([highlight-size='2xs']) {
    --ds-media-padding-inline-start: var(--ds-spacing-2xs);
    --ds-media-padding-inline-end: var(--ds-spacing-2xs);
    --ds-media-padding-block-start: var(--ds-spacing-2xs);
    --ds-media-padding-block-end: var(--ds-spacing-2xs);
  }

  :host([highlight-size='xs']) {
    --ds-media-padding-inline-start: var(--ds-spacing-xs);
    --ds-media-padding-inline-end: var(--ds-spacing-xs);
    --ds-media-padding-block-start: var(--ds-spacing-xs);
    --ds-media-padding-block-end: var(--ds-spacing-xs);
  }

  :host([highlight-size='s']) {
    --ds-media-padding-inline-start: var(--ds-spacing-s);
    --ds-media-padding-inline-end: var(--ds-spacing-s);
    --ds-media-padding-block-start: var(--ds-spacing-s);
    --ds-media-padding-block-end: var(--ds-spacing-s);
  }

  :host([highlight-size='m']) {
    --ds-media-padding-inline-start: var(--ds-spacing-m);
    --ds-media-padding-inline-end: var(--ds-spacing-m);
    --ds-media-padding-block-start: var(--ds-spacing-m);
    --ds-media-padding-block-end: var(--ds-spacing-m);
  }

  :host([highlight-size='l']) {
    --ds-media-padding-inline-start: var(--ds-spacing-l);
    --ds-media-padding-inline-end: var(--ds-spacing-l);
    --ds-media-padding-block-start: var(--ds-spacing-l);
    --ds-media-padding-block-end: var(--ds-spacing-l);
  }
`;class Vt{constructor(t,e){if(this._isUniversalMediaPlayer=!1,this._isPaused=!1,this._userPaused=!1,this._isConnected=!1,this._videoControllerEvents=[],this._handleInternalVideoPlay=()=>{this._userPaused&&this._umpShadowRootElement?(this._umpShadowRootElement.pause(),this._onVideoPaused(!1)):this._videoTrigger&&"pause"!==this._videoTrigger.videoControl&&(this._videoTrigger.videoControl="pause",this._videoTrigger.buttonLabel=this._videoTrigger.pauseButtonLabel??"Pause video",this._isPaused=!1)},this._host=t,this._videoTrigger=e.videoTrigger||this._host.querySelector("store-button"),this._videoElement=e.videoElement||this._host.querySelector("universal-media-player"),this._videoElement){if("universal-media-player"===this._videoElement.nodeName.toLowerCase()){if(this._isUniversalMediaPlayer=!0,this._host.hasAttribute("aspect-ratio")){const t=this._host.getAttribute("aspect-ratio");this.updateAspectRatio(t)}this.umpShadowDomReady(this._videoElement).then(t=>{if(this._isConnected){if(this._umpShadowRootElement=t,t&&t.addEventListener("play",this._handleInternalVideoPlay),this._host.hasAttribute("video-fit")){const e=this._host.getAttribute("video-fit");this.updateVideoFit(t,e)}this.updateVideoPosition(t)}})}(this._host=t).addController(this)}}hostConnected(){var t;this._isConnected=!0,"play"===(null==(t=this._videoTrigger)?void 0:t.videoControl)&&(this._isPaused=!0),this._videoControllerEvents.push({el:this._videoElement,type:"ended",handler:this._handleVideoEnded.bind(this)},{el:this._videoElement,type:"playing",handler:this._handleVideoPlaying.bind(this)}),this._videoTrigger&&this._videoControllerEvents.push({el:this._videoTrigger,type:"click",handler:this._handleTriggerClick.bind(this)}),i(this._videoControllerEvents)}hostDisconnected(){var t;this._isConnected=!1,a(this._videoControllerEvents),null==(t=this._umpShadowRootElement)||t.removeEventListener("play",this._handleInternalVideoPlay)}hostUpdated(){if(this._host.hasAttribute("aspect-ratio")){const t=this._host.getAttribute("aspect-ratio");this.updateAspectRatio(t)}if(this._host.hasAttribute("video-fit")&&this._umpShadowRootElement){const t=this._host.getAttribute("video-fit");this.updateVideoFit(this._umpShadowRootElement,t)}this._umpShadowRootElement&&this.updateVideoPosition(this._umpShadowRootElement)}updateAspectRatio(t){var e,i;if(t&&this._isUniversalMediaPlayer){const a=t.replace("-","/")??"16/9";null==(i=null==(e=this._videoElement)?void 0:e.style)||i.setProperty("--ump-aspect-ratio",a)}}updateVideoFit(t,e){var i;e&&this._isUniversalMediaPlayer&&(null==(i=null==t?void 0:t.style)||i.setProperty("object-fit",e))}updateVideoPosition(t){const e=t??this._umpShadowRootElement;if(!e||!this._isUniversalMediaPlayer)return;const i=getComputedStyle(this._host).getPropertyValue("--ds-media-object-position").trim();i&&e.style.setProperty("object-position",i)}async umpShadowDomReady(t){return new Promise(e=>{const i=setInterval(()=>{var a,s;let d=null==(a=this._videoElement.shadowRoot)?void 0:a.querySelector("video");t&&(d=null==(s=null==t?void 0:t.shadowRoot)?void 0:s.querySelector("video")),d&&(clearInterval(i),e(d))},50)})}_handleVideoPlaying(){this.umpShadowDomReady(this._videoElement).then(()=>{var t;null==(t=this._videoElement)||t.classList.remove("visibility-hidden"),this._host.hasAttribute("overlay")&&this._host.getAttribute("video-configuration")===s.inline&&this._host.removeAttribute("overlay")})}_handleTriggerClick(){this._isUniversalMediaPlayer&&(this._isPaused?(this._userPaused=!1,this._videoElement.play(),this._onVideoPaused(!0)):(this._userPaused=!0,this._videoElement.pause(),this._onVideoPaused(!1)))}_handleVideoEnded(){this._userPaused=!1,this._onVideoPaused(!1)}_onVideoPaused(t){this._videoTrigger&&(t?(this._videoTrigger.videoControl="pause",this._videoTrigger.buttonLabel=this._videoTrigger.pauseButtonLabel??"Pause video",this._isPaused=!1):(this._videoTrigger.videoControl="play",this._videoTrigger.buttonLabel=this._videoTrigger.playButtonLabel??"Play video",this._isPaused=!0))}}class zt{constructor(t,e){var i;if(this._isPaused=!1,this._isReducedMotion=d(),this._buttonClick=this.handleButtonClick.bind(this),this._gifLoad=this.initCanvas.bind(this),this._host=t,this._gifElement=(null==e?void 0:e.gifElement)||this._host.querySelector('img[src*=".gif"]'),"picture"===(null==(i=this._gifElement.parentElement)?void 0:i.nodeName.toLowerCase())&&(this._gifPicture=this._gifElement.parentElement),this._buttonTrigger=(null==e?void 0:e.buttonTrigger)||this._host.querySelector("store-button"),this._gifElement){if(!this._buttonTrigger)return void console.warn("For accessibility support, a play/pause button is required.");(this._host=t).addController(this),this.init()}}hostConnected(){var t,e;null==(t=this._buttonTrigger)||t.addEventListener("click",this._buttonClick),null==(e=this._gifElement)||e.addEventListener("load",this._gifLoad)}hostDisconnected(){var t,e;null==(t=this._buttonTrigger)||t.removeEventListener("click",this._buttonClick),null==(e=this._gifElement)||e.removeEventListener("load",this._gifLoad)}init(){var t;this._isReducedMotion&&(null==(t=this._buttonTrigger)||t.setAttribute("video-control","play"),this._isPaused=!0)}createCanvas(){var t;if(this._gifElement&&null!=(t=this._gifElement)&&t.complete){const t=document.createElement("canvas"),e=t.getContext("2d");if(!e)return;const i=this._gifElement.getAttribute("alt")||"",a=""===i?"presentation":"";t.width=this._gifElement.naturalWidth,t.height=this._gifElement.naturalHeight,t.toggleAttribute("canvas-hidden",!this._isReducedMotion),t.toggleAttribute("aria-hidden",!this._isReducedMotion),""!==i&&t.setAttribute("aria-label",i),""!==a&&t.setAttribute("role",a),e.drawImage(this._gifElement,0,0),this._canvasElement=t}}appendCanvas(){var t,e,i,a;this._canvasElement&&(null==(t=this._gifElement)||t.toggleAttribute("gif-paused",this._isReducedMotion||this._isPaused),null!=(e=this._host.shadowRoot)&&e.querySelector("canvas")||null==(a=null==(i=this._host.shadowRoot)?void 0:i.querySelector(".media__asset"))||a.append(this._canvasElement))}initCanvas(){this.createCanvas(),this.appendCanvas()}handleButtonClick(){var t,e,i,a,s;this._isPaused=!this._isPaused,null==(t=this._gifElement)||t.toggleAttribute("gif-paused",this._isPaused),null==(e=this._gifElement)||e.toggleAttribute("aria-hidden",this._isPaused),this._gifPicture&&(this._gifPicture.toggleAttribute("gif-paused",this._isPaused),this._gifPicture.toggleAttribute("aria-hidden",this._isPaused)),null==(i=this._canvasElement)||i.toggleAttribute("canvas-hidden",!this._isPaused),null==(a=this._canvasElement)||a.toggleAttribute("aria-hidden",!this._isPaused),null==(s=this._buttonTrigger)||s.setAttribute("video-control",this._isPaused?"play":"pause")}}var jt=Object.defineProperty,Gt=Object.getOwnPropertyDescriptor,Ht=(t,e,i,a)=>{for(var s,d=a>1?void 0:a?Gt(e,i):e,r=t.length-1;r>=0;r--)(s=t[r])&&(d=(a?s(e,i,d):s(d))||d);return a&&d&&jt(e,i,d),d};const Dt="store-media";let Ut=class extends f{constructor(){super(...arguments),this.OVERLAY_BACKGROUND_PROPERTY="--ds-media-overlay-background",this.DEFAULT_OVERLAY_BACKGROUND_PROPERTY="--ds-media-default-overlay-background",this.HOVER_OVERLAY_BACKGROUND_PROPERTY="--ds-media-hover-overlay-background",this._firstSlotEmpty=!0,this._lastSlotEmpty=!0,this._doubleImageSlotEmpty=!0,this._captionSlotEmpty=!0,this._posTopLeftSlotEmpty=!0,this._posTopRightSlotEmpty=!0,this._posCenterCenterSlotEmpty=!0,this._posBottomLeftSlotEmpty=!0,this._posBottomRightSlotEmpty=!0,this._mediaAssetSlotEmpty=!0,this._defaultPlayPauseAttributes={size:"small",appearance:"button--primary",shape:"rounded","video-control":"pause"},this.video=!1,this.background=!1,this.dropShadow=!1,this.isGif=!1,this.enableHcm=!1,this.enableHoverEffects=!1,this.disableClicks=!1}async _handleSlotChange(t){if(this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length,this._doubleImageSlotEmpty=0===this._doubleImageSlot.length,this._captionSlotEmpty=0===this._captionSlot.length,this._posTopLeftSlotEmpty=0===this._posTopLeftSlot.length,this._posTopRightSlotEmpty=0===this._posTopRightSlot.length,this._posCenterCenterSlotEmpty=0===this._posCenterCenterSlot.length,this._posBottomLeftSlotEmpty=0===this._posBottomLeftSlot.length,this._posBottomRightSlotEmpty=0===this._posBottomRightSlot.length,this._mediaAssetSlotEmpty=0===this._mediaAssetSlot.length,this.video&&(!this._posTopLeftSlotEmpty||!this._posTopRightSlotEmpty||!this._posCenterCenterSlotEmpty||!this._posBottomLeftSlotEmpty||!this._posBottomRightSlotEmpty)&&this._updateVideoTrigger(t),this.video&&!this._mediaAssetSlotEmpty&&this._setVideoController(),!this._mediaAssetSlotEmpty){const t=this._mediaAssetSlot[0];"picture"===t.nodeName.toLowerCase()?t.querySelector('img[src*=".gif"]')&&(this.isGif=!0):"img"===t.nodeName.toLowerCase()&&t instanceof HTMLImageElement&&t.src.includes(".gif")&&(this.isGif=!0)}!this._mediaAssetSlotEmpty&&this.isGif&&(this._videoTrigger=this.querySelector("store-button"),n(this._videoTrigger,this._defaultPlayPauseAttributes),this._videoTrigger||this.append(this._createPlayPauseButton()),this._gifController instanceof zt||(this._gifController=new zt(this)))}_createPlayPauseButton(t="media__pos-top-right"){const e=new y,i={...this._defaultPlayPauseAttributes,slot:t};return n(e,i),e}_updateVideoTrigger(t){const e=t.target;this._videoTrigger=e.assignedElements()[0],this._videoTrigger instanceof y&&n(this._videoTrigger,this._defaultPlayPauseAttributes),this._updatePointerEvents()}_updatePointerEvents(){this.video&&(this.disableClicks||this._videoTrigger instanceof y)?this.style.setProperty("--ds-media-pointer-events","none"):this.style.removeProperty("--ds-media-pointer-events")}_setVideoController(){const t=this._mediaAssetSlot[0];let e=null;if("universal-media-player"===t.nodeName.toLowerCase()?e=t:"store-media-player"===t.nodeName.toLowerCase()&&(e=t.querySelector("universal-media-player")),e){this._videoElement=e,this._videoElement.classList.add("visibility-hidden");try{const i=e.getAttribute("options")||t.getAttribute("options");!1===(i?JSON.parse(i).autoplay:void 0)&&this._videoTrigger&&(this._videoTrigger.videoControl="play",this._videoTrigger.buttonLabel=this._videoTrigger.playButtonLabel??"Play video")}catch{}const i={videoTrigger:this._videoTrigger,videoElement:this._videoElement};new Vt(this,i)}}updated(t){if(super.updated(t),(t.has("overlay")||t.has("overlayTintColor")||t.has("enableHoverEffects"))&&this._setOverlayTint(),t.has("mediaHeight")&&this.mediaHeight){const t=this._sanitizeCSSMeasurement(this.mediaHeight);t&&(this.style.setProperty("--ds-media-height",t),this.style.setProperty("--ds-media-max-height",t))}(t.has("disableClicks")||t.has("video"))&&this._updatePointerEvents()}_sanitizeCSSMeasurement(t){if(!t||"string"!=typeof t)return null;const e=t.trim();return/^-?\d+(\.\d+)?(px|%)$/i.test(e)?e:null}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}_setOverlayTint(){const t=this._getOverlayTintBackground(this.overlay,this.overlayTintColor),e=this._getDefaultOverlayTintBackground(this.overlayTintColor),i=this._getHoverOverlayTintBackground(this.overlayTintColor);t?this.style.setProperty(this.OVERLAY_BACKGROUND_PROPERTY,t):this.style.removeProperty(this.OVERLAY_BACKGROUND_PROPERTY),e?this.style.setProperty(this.DEFAULT_OVERLAY_BACKGROUND_PROPERTY,e):this.style.removeProperty(this.DEFAULT_OVERLAY_BACKGROUND_PROPERTY),i?this.style.setProperty(this.HOVER_OVERLAY_BACKGROUND_PROPERTY,i):this.style.removeProperty(this.HOVER_OVERLAY_BACKGROUND_PROPERTY)}_getValidOverlayTintColor(t){const e=null==t?void 0:t.trim();if(!e)return null;const i=h(e);return i===p.invalid||i===p.linearGradient||i===p.var||i===p.rgba||i===p.hsla?null:e}_getDefaultOverlayTintBackground(t){if(!this.enableHoverEffects)return null;const e=this._getValidOverlayTintColor(t);return e?this._buildOverlayGradient("180deg",e,[{alpha:"0",stop:"var(--ds-media-default-overlay-start-stop, 40%)"},{alpha:"1",stop:"85%"}]):null}_getHoverOverlayTintBackground(t){if(!this.enableHoverEffects)return null;const e=this._getValidOverlayTintColor(t);return e?this._buildOverlayGradient("180deg",e,[{alpha:"0.5",stop:"var(--ds-media-hover-overlay-start-stop, 0%)"},{alpha:"1",stop:"85%"}]):null}_getOverlayTintBackground(t,e){const i=this._getValidOverlayTintColor(e);if(!t||!i)return null;switch(t){case m.overlayAssetFill:case m.overlayBgFill:return this._getTintColorWithAlpha(i,"0.6");case m.overlayAssetTop:return this._buildOverlayGradient("180deg",i,[{alpha:"0.8",stop:"0%"},{alpha:"0",stop:"50%"}]);case m.overlayAssetBottom1:return this._buildOverlayGradient("180deg",i,[{alpha:"0",stop:"50%"},{alpha:"0.8",stop:"100%"}]);case m.overlayAssetBottom2:return this._buildOverlayGradient("180deg",i,[{alpha:"0",stop:"0%"},{alpha:"0.8",stop:"100%"}]);case m.overlayAssetBottom3:return this._buildOverlayGradient("180deg",i,[{alpha:"0",stop:"0%"},{alpha:"0.75",stop:"48%"},{alpha:"0.9",stop:"100%"}]);case m.overlayBgHorizontal:return this._buildOverlayGradient("270deg",i,[{alpha:"0",stop:"33.48%"},{alpha:"1",stop:"66.52%"}]);case m.overlayBgHorizontalFaded:return this._buildOverlayGradient("270deg",i,[{alpha:"0",stop:"33.48%"},{alpha:"0.6",stop:"66.52%"}]);case m.overlayBgHorizontalRight:return this._buildOverlayGradient("90deg",i,[{alpha:"0",stop:"33.48%"},{alpha:"1",stop:"66.52%"}]);case m.overlayBgHorizontalFadedRight:return this._buildOverlayGradient("90deg",i,[{alpha:"0",stop:"33.48%"},{alpha:"0.6",stop:"66.52%"}]);case m.overlayBgVertical:return this._buildOverlayGradient("0deg",i,[{alpha:"0",stop:"0%"},{alpha:"1",stop:"100%"}]);case m.overlayBgVerticalColor:return this._buildOverlayGradient("180deg",i,[{alpha:"1",stop:"26.79%"},{alpha:"0",stop:"100%"}]);default:return null}}_buildOverlayGradient(t,e,i){const a=i.map(({alpha:t,stop:i})=>{const a=this._getTintColorWithAlpha(e,t);return a?`${a} ${i}`:null}).filter(Boolean);return a.length!==i.length?null:`linear-gradient(${t}, ${a.join(", ")})`}_getTintColorWithAlpha(t,e){return"1"===e||"100%"===e?t:"0"===e||"0%"===e?g(t,"0")??"transparent":g(t,e)??null}_renderOptionalSlot(t,e){return v`
      <div part=${t} class=${t} style="${e?"display: none;":""}">
        <slot name=${t} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}_renderDoubleImage(){if(this.type===c.highlightDoubleImage)return this._renderOptionalSlot("media__double-img",this._doubleImageSlotEmpty)}render(){return v`
      ${this._renderOptionalSlot("media__first",this._firstSlotEmpty)}
      <div part="media__asset" class="media__asset">
        <div class="media__asset__overlay" part="media__asset__overlay"></div>
        <slot name="media__asset" @slotchange="${this._handleSlotChange}"></slot>
      </div>
      ${this._renderDoubleImage()}
      ${this._renderOptionalSlot("media__caption",this._captionSlotEmpty)}
      ${this._renderOptionalSlot("media__pos-top-left",this._posTopLeftSlotEmpty)}
      ${this._renderOptionalSlot("media__pos-top-right",this._posTopRightSlotEmpty)}
      ${this._renderOptionalSlot("media__pos-center-center",this._posCenterCenterSlotEmpty)}
      ${this._renderOptionalSlot("media__pos-bottom-left",this._posBottomLeftSlotEmpty)}
      ${this._renderOptionalSlot("media__pos-bottom-right",this._posBottomRightSlotEmpty)}
      ${this._renderOptionalSlot("media__last",this._lastSlotEmpty)}
    `}};Ut.styles=[Lt],Ht([r({slot:"media__first"})],Ut.prototype,"_firstSlot",2),Ht([r({slot:"media__last"})],Ut.prototype,"_lastSlot",2),Ht([r({slot:"media__double-img"})],Ut.prototype,"_doubleImageSlot",2),Ht([r({slot:"media__caption"})],Ut.prototype,"_captionSlot",2),Ht([r({slot:"media__pos-top-left"})],Ut.prototype,"_posTopLeftSlot",2),Ht([r({slot:"media__pos-top-right"})],Ut.prototype,"_posTopRightSlot",2),Ht([r({slot:"media__pos-center-center"})],Ut.prototype,"_posCenterCenterSlot",2),Ht([r({slot:"media__pos-bottom-left"})],Ut.prototype,"_posBottomLeftSlot",2),Ht([r({slot:"media__pos-bottom-right"})],Ut.prototype,"_posBottomRightSlot",2),Ht([r({slot:"media__asset"})],Ut.prototype,"_mediaAssetSlot",2),Ht([o()],Ut.prototype,"_firstSlotEmpty",2),Ht([o()],Ut.prototype,"_lastSlotEmpty",2),Ht([o()],Ut.prototype,"_doubleImageSlotEmpty",2),Ht([o()],Ut.prototype,"_captionSlotEmpty",2),Ht([o()],Ut.prototype,"_posTopLeftSlotEmpty",2),Ht([o()],Ut.prototype,"_posTopRightSlotEmpty",2),Ht([o()],Ut.prototype,"_posCenterCenterSlotEmpty",2),Ht([o()],Ut.prototype,"_posBottomLeftSlotEmpty",2),Ht([o()],Ut.prototype,"_posBottomRightSlotEmpty",2),Ht([o()],Ut.prototype,"_mediaAssetSlotEmpty",2),Ht([o()],Ut.prototype,"_videoTrigger",2),Ht([o()],Ut.prototype,"_videoElement",2),Ht([o()],Ut.prototype,"_gifController",2),Ht([l({reflect:!0})],Ut.prototype,"theme",2),Ht([l({reflect:!0,attribute:"aspect-ratio"})],Ut.prototype,"aspectRatio",2),Ht([l({reflect:!0,attribute:"video-fit"})],Ut.prototype,"videoFit",2),Ht([l({reflect:!0,attribute:"object-fit"})],Ut.prototype,"objectFit",2),Ht([l({reflect:!0,attribute:"video-configuration"})],Ut.prototype,"videoConfiguration",2),Ht([l({type:Boolean,reflect:!0})],Ut.prototype,"video",2),Ht([l({type:Boolean,reflect:!0})],Ut.prototype,"background",2),Ht([l({type:Boolean,reflect:!0,attribute:"drop-shadow"})],Ut.prototype,"dropShadow",2),Ht([l({type:Boolean,reflect:!0,attribute:"is-gif"})],Ut.prototype,"isGif",2),Ht([l({reflect:!0})],Ut.prototype,"surface",2),Ht([l({reflect:!0,attribute:"border-width"})],Ut.prototype,"borderWidth",2),Ht([l({reflect:!0})],Ut.prototype,"type",2),Ht([l({reflect:!0})],Ut.prototype,"overlay",2),Ht([l({reflect:!0,attribute:"overlay-tint-color"})],Ut.prototype,"overlayTintColor",2),Ht([l({reflect:!0,attribute:"hover-overlay"})],Ut.prototype,"hoverOverlay",2),Ht([l({type:Boolean,reflect:!0,attribute:"enable-hcm"})],Ut.prototype,"enableHcm",2),Ht([l({type:Boolean,reflect:!0,attribute:"enable-hover-effects"})],Ut.prototype,"enableHoverEffects",2),Ht([l({type:Boolean,reflect:!0,attribute:"disable-clicks"})],Ut.prototype,"disableClicks",2),Ht([l({reflect:!0,attribute:"hover-scope"})],Ut.prototype,"hoverScope",2),Ht([l({reflect:!0,attribute:"media-height"})],Ut.prototype,"mediaHeight",2),Ht([l({reflect:!0})],Ut.prototype,"shape",2),Ht([l({reflect:!0,attribute:"highlight-size"})],Ut.prototype,"highlightSize",2),Ut=Ht([u(Dt)],Ut);export{Ut as Media,Dt as name};
