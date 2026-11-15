import{r as n,i}from"./tag.const-v1.42.0.js";import{m as a,a as t,p as r}from"./secondary-nav-item.const-v1.42.0.js";const e={containerBoxSizing:"border-box",containerDisplay:"block",containerMarginInlineStart:a.xs.marginInlineStart,containerMarginInlineEnd:a.xs.marginInlineStart,containerMarginBlockStart:"initial",containerMarginBlockEnd:"initial",containerMaxWidth:t.xs,containerPaddingInlineStart:r.xs.paddingInlineStart,containerPaddingInlineEnd:r.xs.paddingInlineEnd,containerPosition:"static",containerWidth:"100%",containerGap:"initial",containerFlexDirection:"initial",containerZIndex:0},o=i`
  :host {
    box-sizing: var(
      --ds-container-box-size,
      ${n(e.containerBoxSizing)}
    ) !important;
    display: var(--ds-container-display, ${n(e.containerDisplay)});
    margin-inline-start: var(
      --ds-container-margin-inline-start,
      ${n(e.containerMarginInlineStart)}
    );
    margin-inline-end: var(
      --ds-container-margin-inline-end,
      ${n(e.containerMarginInlineEnd)}
    );
    margin-block-start: var(
      --ds-container-margin-block-start,
      ${n(e.containerMarginBlockStart)}
    );
    margin-block-end: var(
      --ds-container-margin-block-end,
      ${n(e.containerMarginBlockEnd)}
    );
    max-width: var(--ds-container-max-width, ${n(e.containerMaxWidth)});
    padding-inline-start: var(
      --ds-container-padding-inline-start,
      ${n(e.containerPaddingInlineStart)}
    );
    padding-inline-end: var(
      --ds-container-padding-inline-end,
      ${n(e.containerPaddingInlineEnd)}
    );
    position: var(--ds-container-position, ${n(e.containerPosition)});
    width: var(--ds-container-width, ${n(e.containerWidth)});
    gap: var(--ds-container-gap, ${n(e.containerGap)});
    flex-direction: var(
      --ds-container-flex-direction,
      ${n(e.containerFlexDirection)}
    );
    z-index: var(--ds-container-z-index, ${n(e.containerZIndex)});
  }

  :host([hidden]) {
    display: none !important;
  }

  :host([full-width]) {
    --ds-container-width: 100%;
    --ds-container-max-width: none;
    --ds-container-padding-inline-start: 0;
    --ds-container-padding-inline-end: 0;
  }
`;export{e as c,o as s};
