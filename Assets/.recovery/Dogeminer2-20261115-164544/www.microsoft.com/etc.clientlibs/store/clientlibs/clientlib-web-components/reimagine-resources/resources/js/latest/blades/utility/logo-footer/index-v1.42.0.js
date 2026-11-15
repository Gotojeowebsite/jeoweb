import{r as t,i as o,n as e,e as s,c as r,b as a,d as l}from"../../../tag.const-v1.42.0.js";import{a as i}from"../../../util9-v1.42.0.js";import{S as n}from"../../../util21-v1.42.0.js";const d="var(--ds-spacing-s, 0.5rem)",p="var(--ds-spacing-m, 1rem)",g="var(--ds-spacing-l, 1.5rem)",h="var(--ds-spacing-xl, 2rem)",y="var(--ds-spacing-l, 1.5rem)",c=o`
  :host {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .header ::slotted(store-text-block),
  .header ::slotted(store-heading-block) {
    --ds-heading-xs-font-size: var(--ds-heading-3xs-font-size, 1rem);
    --ds-heading-xs-font-weight: var(--ds-heading-3xs-font-weight, 600);
  }

  .body {
    display: flex;
    margin-inline: auto;
    gap: var(--ds-utility-logo-footer-body-gap, ${t("var(--ds-spacing-m, 1rem)")});
  }

  :host([gap-size='s']) .body {
    gap: var(--ds-utility-logo-footer-body-gap-s, ${t(d)});
  }

  :host([gap-size='m']) .body {
    gap: var(--ds-utility-logo-footer-body-gap-m, ${t(p)});
  }

  :host([gap-size='l']) .body {
    gap: var(--ds-utility-logo-footer-body-gap-l, ${t(g)});
  }

  :host([gap-size='xl']) .body {
    gap: var(--ds-utility-logo-footer-body-gap-xl, ${t(h)});
  }

  .footer {
    text-align: center;
  }

  .content store-layout-column {
    display: flex;
    flex-direction: column;
    gap: var(--ds-utility-logo-footer-content-gap, ${t(y)});
  }
`,f="m";var m=Object.defineProperty,v=Object.getOwnPropertyDescriptor,u=Object.getPrototypeOf,b=Reflect.get,S=(t,o,e,s)=>{for(var r,a=s>1?void 0:s?v(o,e):o,l=t.length-1;l>=0;l--)(r=t[l])&&(a=(s?r(o,e,a):r(a))||a);return s&&a&&m(o,e,a),a};const x="store-logo-footer";let $=class extends n{constructor(){super(...arguments),this.gapSize=f,this._headerSlotEmpty=!0,this._footerSlotEmpty=!0}_handleSlotChange(){this._headerSlotEmpty=0===this._headerSlot.length,this._footerSlotEmpty=0===this._footerSlot.length}_renderBlade(){const t="base",o=a`
      <store-layout configuration=${i.col1focus} part="content" class="content">
        <store-layout-column>
          <div part="header" class="header" style="${this.toggleDisplay(this._headerSlotEmpty)}">
            <slot name="header" @slotchange=${this._handleSlotChange}></slot>
          </div>
          <div part="body" class="body">
            <slot></slot>
          </div>
          <div part="footer" class="footer" style="${this.toggleDisplay(this._footerSlotEmpty)}">
            <slot name="footer" @slotchange=${this._handleSlotChange}></slot>
          </div>
        </store-layout-column>
      </store-layout>
    `;return this.baseContent?a`<div class=${t} part=${t}>${o}</div>`:a`
          <store-container part=${t} class="${t}">
            ${o}
          </store-container>
        `}render(){return this.renderUiShell(this._renderBlade())}};var _,z,E;$.styles=[...(_=$,z=$,E="styles",b(u(_),E,z)||[]),c],S([e({type:String,reflect:!0,attribute:"gap-size"})],$.prototype,"gapSize",2),S([s({slot:"header"})],$.prototype,"_headerSlot",2),S([s({slot:"footer"})],$.prototype,"_footerSlot",2),S([r()],$.prototype,"_headerSlotEmpty",2),S([r()],$.prototype,"_footerSlotEmpty",2),$=S([l(x)],$);export{$ as LogoFooter,x as name};
