import{r as a,i as r}from"./tag.const-v1.42.0.js";const s={borderRadius:"var(--ds-radii-l, 1.5rem)",overflow:"auto"},o=r`
  /* Base styles for all card base variants */
  :host([surface]) {
    --ds-surface-border-radius: ${a(s.borderRadius)};
    --ds-media-asset-overflow: auto;
    --ds-surface-box-shadow: var(
      --ds-elevation-level-2,
      0px 2px 4px rgba(0, 0, 0, 0.14),
      0px 0px 2px rgba(0, 0, 0, 0.12)
    );
    --ds-surface-solid-border-box-shadow: var(
      --ds-elevation-level-2,
      0px 2px 4px rgba(0, 0, 0, 0.14),
      0px 0px 2px rgba(0, 0, 0, 0.12)
    );

    overflow: var(--ds-card-base-overflow, ${a(s.overflow)});
  }

  :host([surface='transparent']) {
    --ds-surface-box-shadow: none;
  }
`;export{s as a,o as c};
