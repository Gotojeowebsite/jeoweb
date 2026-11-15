import{r as t,o as e,A as a,i as s,_ as r,L as o,b as n,n as d,d as i}from"../../../tag.const-v1.42.0.js";import{s as l}from"../../../link.styles-v1.42.0.js";import{l as c,F as g}from"../../../fill-color.mixin-v1.42.0.js";import{d as p,b}from"../../../vfi-v1.42.0.js";import{W as u}from"../../../i18nMixin-v1.42.0.js";const h="inline-flex",v="center",f="var(--ds-theme-background-accent-subtle-badge-subtle, var(--ds-theme-background-special-color))",m="var(--ds-theme-foreground-accent-subtle-badge-subtle, var(--ds-theme-foreground-special-strong))",k="var(--ds-spacing-m, 1rem)",$="var(--ds-spacing-m, 1rem)",y="var(--ds-spacing-2xs, 0.75rem)",x="var(--ds-spacing-2xs, 0.75rem)",w="border-box",z="var(--ds-radii-xs)",j=s`
  a {
    ${c};
  }
  :host {
    justify-content: var(--ds-tag-justify-content, ${t("center")});
    align-items: var(--ds-tag-align-items, ${t(v)});
    display: var(--ds-tag-display, ${t(h)});
    box-sizing: var(--ds-tag-box-sizing, ${t(w)});
    background: var(--ds-tag-background, ${t(f)});
    color: var(--ds-tag-color, ${t(m)});
    border-color: transparent;
    border-radius: var(--ds-tag-border-radius, ${t(z)});
    padding-inline-start: var(
      --ds-tag-padding-inline-start,
      ${t($)}
    );
    padding-inline-end: var(
      --ds-tag-padding-inline-end,
      ${t(k)}
    );
    padding-block-start: var(
      --ds-tag-padding-block-start,
      ${t(x)}
    );
    padding-block-end: var(
      --ds-tag-padding-block-end,
      ${t(y)}
    );
    font-weight: var(--ds-tag-font-weight, ${t(e.fontWeight)});
    font-size: var(--ds-tag-font-size, ${t(e.fontSize)});
    line-height: var(
      --ds-tag-line-height,
      ${t(e.lineHeight)}
    ) !important;

    letter-spacing: var(
      --ds-tag-item-spacing,
      ${t(e.letterSpacing)}
    ) !important;

    --ds-link-cursor: default;
    --ds-link-text-decoration: none;

    ::slotted(span) {
      padding-block-end: var(--ds-spacing-3xs, 0.125rem);
    }
  }
  :host([size='medium']) {
    --ds-tag-font-weight: ${t(e.fontWeight)};
    --ds-tag-font-size: ${t(e.fontSize)};
    --ds-tag-line-height: ${t(e.lineHeight)};
    --ds-tag-letter-spacing: ${t(e.letterSpacing)};
  }

  :host([full-width]) {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  :host([full-width]) a,
  :host([full-width]) span,
  :host([full-width]) ::slotted(span),
  :host([full-width]) ::slotted(a) {
    width: 100%;
    text-align: center;
  }

  :host([size='small']) {
    --ds-tag-font-weight: ${t(a.fontWeight)};
    --ds-tag-font-size: ${t(a.fontSize)};
    --ds-tag-line-height: ${t(a.lineHeight)};
    --ds-tag-letter-spacing: ${t(a.letterSpacing)};
    --ds-tag-padding-inline-start: var(--ds-spacing-2xs);
    --ds-tag-padding-inline-end: var(--ds-spacing-2xs);
    --ds-tag-padding-block-start: var(--ds-spacing-3xs);
    --ds-tag-padding-block-end: var(--ds-spacing-3xs);

    ::slotted(span) {
      padding-block-end: 0.0625rem;
    }
  }

  :host([clickable]) {
    --ds-link-cursor: pointer;
    --ds-tag-background: var(--ds-theme-background-accent-subtle-normal, rgba(0, 85, 151, 0.15));
    --ds-link-color: var(--ds-theme-foreground-accent-subtle-normal);
  }

  :host([clickable]:focus) {
    outline: var(--ds-tag-outline, ${t(p)});
    outline-offset: var(--ds-tag-outline-offset, ${t(b)});
  }

  :host([clickable]:hover) {
    --ds-tag-background: var(--ds-theme-background-accent-subtle-hover);
    --ds-link-color: var(--ds-theme-foreground-accent-subtle-hover) !important;
  }

  :host([clickable]:active) {
    --ds-tag-background: var(--ds-theme-background-accent-subtle-pressed);
    --ds-link-color: var(--ds-theme-foreground-accent-subtle-pressed);
  }
  :host([clickable][active]) {
    --ds-tag-background: var(--ds-theme-background-accent-subtle-selected);
    --ds-link-color: var(--ds-theme-foreground-accent-subtle-selected);
  }
  :host([clickable][active]:hover) a {
    --ds-tag-background: var(--ds-theme-background-accent-subtle-selected);
    --ds-link-color: var(--ds-theme-foreground-accent-subtle-selected);
  }

  :host([appearance='new']) {
    --ds-tag-background: var(
      --ds-theme-background-accent-subtle-badge-subtle,
      var(--ds-color-info-200)
    );
    --ds-tag-color: var(
      --ds-theme-foreground-accent-subtle-badge-subtle,
      var(--ds-color-blue-black-900)
    );
  }

  :host([appearance='new'][theme='night']) {
    --ds-tag-background: var(
      --ds-theme-background-accent-subtle-badge-subtle,
      var(--ds-color-info-500)
    );
    --ds-tag-color: var(
      --ds-theme-foreground-accent-subtle-badge-subtle,
      var(--ds-color-alpha-900)
    );
  }
`;var S=Object.defineProperty,W=Object.getOwnPropertyDescriptor,B=(t,e,a,s)=>{for(var r,o=s>1?void 0:s?W(e,a):e,n=t.length-1;n>=0;n--)(r=t[n])&&(o=(s?r(e,a,o):r(o))||o);return s&&o&&S(e,a,o),o};const H="store-tag";let O=class extends(g(r(o(u)))){constructor(){super(...arguments),this.clickable=!1,this.active=!1,this.fullWidth=!1}render(){return this.clickable?this.renderLink(n`<slot></slot>`):n`<slot></slot>`}};O.styles=[l,j],B([d({reflect:!0,attribute:"theme"})],O.prototype,"theme",2),B([d({type:Boolean,reflect:!0,attribute:"clickable"})],O.prototype,"clickable",2),B([d({type:String,reflect:!0,attribute:"target"})],O.prototype,"target",2),B([d({type:String,reflect:!0,attribute:"href"})],O.prototype,"href",2),B([d({type:Boolean,reflect:!0,attribute:"active"})],O.prototype,"active",2),B([d({type:Boolean,reflect:!0,attribute:"full-width"})],O.prototype,"fullWidth",2),B([d({reflect:!0,attribute:"size"})],O.prototype,"size",2),B([d({type:String,reflect:!0})],O.prototype,"appearance",2),O=B([i(H)],O);export{O as Tag,H as name};
