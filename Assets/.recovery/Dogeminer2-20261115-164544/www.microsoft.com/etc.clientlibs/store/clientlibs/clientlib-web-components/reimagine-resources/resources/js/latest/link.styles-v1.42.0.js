import{r as t,o as i,w as e,ab as o,i as n}from"./tag.const-v1.42.0.js";import{l as s}from"./fill-color.mixin-v1.42.0.js";import{b as d}from"./utils-v1.42.0.js";const a={color:"var(--ds-theme-foreground-accent-subtle-normal, #2a446f)",underlineOffset:"0.3rem",underlineThickness:"from-font",gap:"var(--ds-spacing-xs)",display:"inline-flex",alignItems:"center",opacity:"1",cursor:"pointer",pointerEvents:"auto",outline:"0.1875rem dotted var(--ds-theme-foreground-accent-subtle-normal, #2a446f)",position:"initial",textDecoration:"underline",mediaWidth:"var(--ds-spacing-2xl, 3rem)",mediaOnlyWidth:"60px",mediaGap:"var(--ds-spacing-m, 1rem)",outlineOffset:"0",badgeBorderRadius:"var(--ds-radii-s, 0.5rem)",badgePaddingBlockStart:"7px",badgePaddingBlockEnd:"7px",badgePaddingInlineStart:"7px",badgePaddingInlineEnd:"7px",lightDOMWithButtonGap:"var(--ds-spacing-xs, 0.5rem)",lightDOMWithMediaGap:"var(--ds-spacing-m, 1rem)",lightDOMWithButtonPaddingInline:"var(--ds-spacing-xs, 0.5rem)",textFontSize:`${t(i.fontSize)}`,textFontWeight:`${t(i.fontWeight)}`,textLineHeight:`${t(i.lineHeight)}`},l=n`
  :host,
  :host button,
  ::slotted(button) {
    align-items: var(--ds-link-align-items, ${t(a.alignItems)});
    gap: var(--ds-link-gap, ${t(a.gap)});
    font-size: var(--ds-link-font-size, ${t(i.fontSize)});
    font-weight: var(--ds-link-font-weight, ${t(i.fontWeight)});
    line-height: var(--ds-link-line-height, ${t(i.lineHeight)});
    opacity: var(--ds-link-opacity, ${t(a.opacity)});
    cursor: var(--ds-link-cursor, ${t(a.cursor)});
    pointer-events: var(--ds-link-pointer-events, ${t(a.pointerEvents)});
    text-underline-offset: var(
      --ds-link-underline-offset,
      ${t(a.underlineOffset)}
    );
    text-decoration-thickness: var(
      --ds-link-underline-thickness,
      ${t(a.underlineThickness)}
    );
    position: var(--ds-link-position, ${t(a.position)});
  }

  :host a,
  :host,
  ::slotted(a) {
    display: var(--ds-link-display, ${t(a.display)});
  }

  :host a,
  ::slotted(a) {
    align-items: var(--ds-link-align-items, ${t(a.alignItems)});
    gap: var(--ds-link-gap, ${t(a.gap)});
    color: var(--ds-link-color, ${t(a.color)});
    outline: none;
    text-decoration: var(--ds-link-text-decoration, ${t(a.textDecoration)});
    text-decoration-thickness: var(
      --ds-link-underline-thickness,
      ${t(a.underlineThickness)}
    );
  }

  :host([configuration='default']) a,
  :host([configuration='default']) ::slotted(a) {
    padding-block-end: var(--ds-link-padding-block-end, 0);
  }

  :host([text-color]) {
    --ds-link-color: var(--ds-text-color-override, ${t(a.color)});
  }

  :host([text-color]:focus) {
    outline-color: inherit;
  }

  :host([text-color]:hover) a {
    --ds-link-color: hsl(from var(--ds-text-color-override) h 80% l / 100%);
  }

  :host(:focus),
  ::slotted(a:focus),
  ::slotted(button:focus),
  :host([light-dom][with-button]:focus-within) {
    outline: var(--ds-link-outline, ${t(a.outline)});
    outline-offset: var(--ds-link-outline-offset, ${t(a.outlineOffset)});
  }

  :host(:hover) a,
  ::slotted(a:hover) {
    --ds-link-color: var(--ds-theme-foreground-accent-subtle-hover, #dceef8);
  }

  :host(:active) a,
  :host(:active) button,
  ::slotted(a:active),
  ::slotted(button:active) {
    --ds-link-color: var(--ds-theme-foreground-accent-subtle-pressed);
  }

  :host([with-button]) {
    --ds-link-position: relative;
  }

  :host([with-button]) a,
  :host([with-button]) ::slotted(a) {
    ${s};
    padding-block-end: var(--ds-link-padding-block-end, 0);
  }

  :host([configuration='stacked']) a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: var(--ds-link-text-decoration, underline);

    --ds-surface-cursor: var(--ds-link-cursor, ${t(a.cursor)});
  }

  :host(:hover) ::slotted(store-button),
  ::slotted(button:hover) {
    --ds-button-background-color: var(--ds-theme-background-accent-strong-hover, #006dc1);
  }

  :host(:active) ::slotted(store-button),
  ::slotted(button:active) {
    --ds-button-background-color: var(--ds-theme-background-accent-strong-pressed, #004275);
    --ds-button-color: var(--ds-theme-foreground-accent-strong-pressed, #004275);
  }

  :host([disabled]) {
    --ds-link-opacity: 0.2;
    --ds-link-cursor: not-allowed;
    --ds-link-pointer-events: none;
  }

  :host([disabled]) ::slotted(store-button),
  :host([disabled]) ::slotted(button) {
    --ds-button-opacity: 1;
  }

  :host button,
  ::slotted(button) {
    letter-spacing: inherit;
    color: var(--ds-link-color, ${t(a.color)});
    outline: none;
    background: transparent;
    text-decoration: underline;
    box-shadow: none;

    ${d};
  }

  :host([with-button][as-button]) button,
  :host([with-button][as-button]) ::slotted(button) {
    display: inline-flex;
    align-items: center;
    padding-inline: 1px;
    text-decoration: none;
  }

  :host([disabled][as-button]) button,
  :host([disabled][as-button]) ::slotted(button) {
    opacity: var(--ds-button-opacity, ${t(a.opacity)});
  }

  @media (forced-colors: active) {
    :host button,
    ::slotted(button) {
      background-color: currentcolor;
    }
  }

  :host([with-badge]) {
    --ds-link-gap: 0;
    --ds-surface-cursor: pointer;

    border-radius: var(
      --ds-link-badge-border-radius,
      ${t(a.badgeBorderRadius)}
    );

    box-shadow: var(
      --ds-elevation-level-2,
      0 2px 4px rgba(0, 0, 0, 0.14),
      0 0 2px rgba(0, 0, 0, 0.12)
    );
  }

  :host([with-badge]:hover) {
    box-shadow: var(
      --ds-elevation-level-3,
      0 4px 8px rgba(0, 0, 0, 0.14),
      0 0 2px rgba(0, 0, 0, 0.12)
    );
  }

  :host([with-badge]) ::slotted(store-badge) {
    --ds-badge-padding-block-start: var(
      --ds-link-badge-padding-block-start,
      ${t(a.badgePaddingBlockStart)}
    );
    --ds-badge-padding-block-end: var(
      --ds-link-badge-padding-block-end,
      ${t(a.badgePaddingBlockEnd)}
    );
    --ds-badge-padding-inline-start: var(
      --ds-link-badge-padding-inline-start,
      ${t(a.badgePaddingInlineStart)}
    );
    --ds-badge-padding-inline-end: var(
      --ds-link-badge-padding-inline-end,
      ${t(a.badgePaddingInlineEnd)}
    );
  }

  :host([with-media]) {
    --ds-media-width: var(--ds-link-media-width, ${t(a.mediaWidth)});
    --ds-link-gap: var(--ds-link-media-gap, ${t(a.mediaGap)});
  }

  :host([with-media]:not([configuration])),
  :host([light-dom][media-only]) {
    --ds-media-width: var(--ds-link-media-only-width, ${t(a.mediaOnlyWidth)});
    --ds-link-gap: 0;
  }

  :host([light-dom]) {
    --ds-surface-cursor: pointer;
  }

  :host([configuration='default'][media-position='right']) a,
  :host([light-dom][with-button][icon-position='right']),
  :host([light-dom][with-button][icon-position='right']) ::slotted(a),
  :host([light-dom][with-media][media-position='right']) ::slotted(a) {
    flex-direction: row-reverse;
  }

  :host([configuration='default'][media-position='top']) a {
    flex-direction: column;
  }

  :host([light-dom]),
  :host([light-dom][configuration='default']) {
    --ds-link-gap: 0;
  }

  :host([light-dom][configuration='stacked']),
  :host([light-dom][configuration='stacked']) ::slotted(a) {
    --ds-link-display: flex;

    width: fit-content;
    flex-direction: column;
  }

  :host([light-dom][with-button][icon-position='left']) ::slotted(a) {
    padding-inline-start: var(
      --ds-link-light-dom-with-button-padding-inline,
      ${t(a.lightDOMWithButtonPaddingInline)}
    );
  }

  :host([light-dom][with-button][icon-position='right']) ::slotted(a) {
    padding-inline-end: var(
      --ds-link-light-dom-with-button-padding-inline,
      ${t(a.lightDOMWithButtonPaddingInline)}
    );
  }

  :host([light-dom][with-button][configuration='default']) ::slotted(a),
  :host([light-dom][configuration='stacked']) ::slotted(a) {
    --ds-link-gap: var(
      --ds-link-light-dom-with-button-gap,
      ${t(a.lightDOMWithButtonGap)}
    );
  }

  :host([light-dom][with-media]) ::slotted(a) {
    --ds-link-gap: var(
      --ds-link-light-dom-with-media-gap,
      ${t(a.lightDOMWithMediaGap)}
    );
  }

  :host([light-dom]) ::slotted(a) {
    color: var(--ds-link-color, ${t(a.color)}) !important;
    text-align: var(--ds-link-text-align, inherit);
  }

  :host([light-dom][with-button]:focus-within) ::slotted(a) {
    outline: none !important;
  }

  ::slotted([slot='link__text']) {
    display: var(--ds-link-text-display, initial);
    text-align: var(--ds-link-text-align, inherit);
    font-size: var(--ds-link-text-font-size, inherit);
    font-weight: var(--ds-link-text-font-weight, inherit);
    line-height: var(--ds-link-text-line-height, inherit);
  }

  :host([text-size]) {
    --ds-link-text-font-size: var(
      --ds-link-text-font-size,
      ${t(a.textFontSize)}
    );
    --ds-link-text-font-weight: var(
      --ds-link-text-font-weight,
      ${t(a.textFontWeight)}
    );
    --ds-link-text-line-height: var(
      --ds-link-text-line-height,
      ${t(a.textLineHeight)}
    );
  }

  :host([text-size='s']) {
    --ds-link-text-font-size: ${t(e.fontSize)};
    --ds-link-text-font-weight: ${t(e.fontWeight)};
    --ds-link-text-line-height: ${t(e.lineHeight)};
    --ds-link-underline-thickness: 2px;
  }

  :host([text-size='s']) a {
    text-decoration-thickness: 2px;
  }

  :host([text-size='m']) {
    --ds-link-text-font-size: ${t(i.fontSize)};
    --ds-link-text-font-weight: ${t(i.fontWeight)};
    --ds-link-text-line-height: ${t(i.lineHeight)};
    --ds-link-underline-thickness: 2px;
  }

  :host([text-size='m']) a {
    text-decoration-thickness: 2px;
  }

  :host([text-size='l']) {
    --ds-link-text-font-size: ${t(o.fontSize)};
    --ds-link-text-font-weight: ${t(o.fontWeight)};
    --ds-link-text-line-height: ${t(o.lineHeight)};
    --ds-link-underline-thickness: 2px;
  }

  :host([text-size='l']) a {
    text-decoration-thickness: 2px;
  }
`;export{l as s};
