import{i as t,R as e,n as r,y as o,b as s}from"./tag.const-v1.42.0.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function a(t){return(e,r)=>{const o="function"==typeof e?e:e[r];Object.assign(o,t)}}const n=t`
  :host,
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  [hidden] {
    display: none !important;
  }

  :host([hidden]) {
    display: none !important;
  }

  input,
  button,
  select,
  textarea {
    margin: 0;
    padding: 0;
    letter-spacing: inherit;
    font-size: inherit;
    font-family: inherit;
  }
`;var i=Object.defineProperty,d=Object.getOwnPropertyDescriptor,l=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?d(e,r):e,n=t.length-1;n>=0;n--)(s=t[n])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&i(e,r,a),a};const c=class extends e{get dir(){return this._dir&&"auto"!==this._dir?this._dir:getComputedStyle(this).direction}set dir(t){this._dir=t,this.requestUpdate("dir")}firstUpdated(){this.dispatchEvent(new CustomEvent("ready",{bubbles:!0,composed:!0}))}};c.styles=[n];let h=c;l([r({reflect:!0})],h.prototype,"theme",2),l([r()],h.prototype,"dir",1);const u={buttonPrimary:"button--primary",buttonSecondary:"button--secondary",buttonGhost:"button--ghost"},p={small:"small",medium:"medium",large:"large"},b={circle:"circle",rounded:"rounded"},m={play:"play",pause:"pause"},f={solid:"solid",glass:"glass",transparent:"transparent",solidBorder:"solid-border",special:"special",media:"media"},y={aiSearch:"store-hero-ai-search",article:"store-hero-article",category:"store-hero-category",featuredXlVideo:"store-hero-featured-xl-video",featured:"store-hero-featured",featuredSlider:"store-hero-featured-slider",product:"store-hero-product",search:"store-hero-search"},g=[".sa-default-entry-container",".ai-chat-button","store-ai-powered-assistant"],v=["store-checkbox","store-dropdown","store-dropdown-bar","store-dropdown-trigger","store-link","store-button","store-input","store-pill","store-radiobutton","input","select","textarea","a[href]","button",'[tabindex]:not([tabindex="-1"])'],x=".sa-highlight-entry-container",w=".sa-highlight-entry-content",_=".sa-default-entry-button",S="submit",E="input";var j=Object.defineProperty,C=Object.getOwnPropertyDescriptor,O=(t,e,r,o)=>{for(var s,a=o>1?void 0:o?C(e,r):e,n=t.length-1;n>=0;n--)(s=t[n])&&(a=(o?s(e,r,a):s(a))||a);return o&&a&&j(e,r,a),a};const $=t=>{class e extends t{constructor(){super(...arguments),this.action="",this.id="",this.role=null}_handleSubmit(t){this.dispatchEvent(new CustomEvent(S,{cancelable:!0,bubbles:!0}))||t.preventDefault()}async _handleReset(t){await this.updateComplete;const e=this.renderRoot.querySelector("form");e instanceof HTMLFormElement&&e.reset(),this.dispatchEvent(new CustomEvent(E,{cancelable:!0,bubbles:!0}))||t.preventDefault()}renderFormElement(t){return s`
        <form
          role=${o(this.role)}
          method=${o(this.method)}
          id=${o(this.id)}
          action=${o(this.action)}
          @submit=${this._handleSubmit}
          @reset=${this._handleReset}
        >
          ${t}
        </form>
      `}}return O([r()],e.prototype,"action",2),O([r()],e.prototype,"method",2),O([r()],e.prototype,"id",2),O([r()],e.prototype,"role",2),O([a({capture:!0})],e.prototype,"_handleSubmit",1),O([a({capture:!0})],e.prototype,"_handleReset",1),e},P={default:"default",comfortable:"comfortable"},D={horizontal:"horizontal"},R={dots:"dots",numbers:"numbers"},z=5,k={change:"onChange"};export{u as B,D as C,P as D,$ as F,z as M,R as P,f as S,k as a,p as b,b as c,x as d,g as e,v as f,_ as g,y as h,w as i,h as j,m as k};
