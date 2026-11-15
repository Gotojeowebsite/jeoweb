import{r as t,i as o,n as e,e as s,c as a,b as n,d as r}from"../../../tag.const-v1.42.0.js";import{c as l,S as i}from"../../../util21-v1.42.0.js";import{a as p}from"../../../util9-v1.42.0.js";import{n as c}from"../../../util6-v1.42.0.js";const d=o`
  .container {
    display: var(--ds-ui-shell-content-display, flex);
    flex-direction: var(--ds-ui-shell-content-flex-direction, column);
    row-gap: var(--ds-ui-shell-content-row-gap, ${t({rowGap:l.contentRowGap}.rowGap)});
  }

  :host([alignment='center']) .body {
    --ds-scrollslider-justify-content: center;
  }

  :host {
    --ds-stat-body-gap: var(--ds-spacing-xs, 0.5rem);
  }

  @media (max-width: 767px) {
    :host([disable-container-padding]) .container {
      padding: 0;
    }
  }
`,u="center";var y=Object.defineProperty,h=Object.getOwnPropertyDescriptor,g=Object.getPrototypeOf,m=Reflect.get,f=(t,o,e,s)=>{for(var a,n=s>1?void 0:s?h(o,e):o,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(o,e,n):a(n))||n);return s&&n&&y(o,e,n),n};const v="store-banner-featured";let b=class extends i{constructor(){super(...arguments),this.disableContainerPadding=!1,this._topSlotEmpty=!0,this.topSlotLayoutConfiguration=p.col1even}handleTopSlotChange(){if(this._topSlotEmpty=0===this._topSlot.length,!this._topSlotEmpty){const t=this._topSlot.filter(t=>t.nodeName.toLowerCase()===c);this.alignment!==u&&t.length>0&&(this.topSlotLayoutConfiguration=p.col2even)}}_renderBlade(){const t="container",o=n`
      <store-layout
        configuration=${this.topSlotLayoutConfiguration}
        style="${this.toggleDisplay(this._topSlotEmpty)}"
      >
        <store-layout-column class="top-text" part="top-text">
          <slot name="top-text" @slotchange=${this.handleTopSlotChange}></slot>
        </store-layout-column>
      </store-layout>
      <store-layout>
        <store-layout-column class="body" part="body">
          <slot></slot>
        </store-layout-column>
      </store-layout>
    `;return this.baseContent?n` <div class=${t} part=${t}>${o}</div> `:n`
      <store-container part=${t} class=${t}> ${o} </store-container>
    `}render(){return this.renderUiShell(this._renderBlade())}};var S,x,$;b.styles=[...(S=b,x=b,$="styles",m(g(S),$,x)||[]),d],f([e({reflect:!0})],b.prototype,"alignment",2),f([e({type:Boolean,attribute:"disable-container-padding",reflect:!0})],b.prototype,"disableContainerPadding",2),f([s({slot:"top-text"})],b.prototype,"_topSlot",2),f([a()],b.prototype,"_topSlotEmpty",2),b=f([r(v)],b);export{b as BannerFeatured,v as name};
