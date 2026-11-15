import{r as t,i as e,n as s,c as o,I as r,J as i,b as n,d as a}from"../../tag.const-v1.42.0.js";import{S as c,V as l}from"../../secondary-nav-item.const-v1.42.0.js";import{h,d,e as b,g as u,i as v}from"../../pagination-item.const-v1.42.0.js";const m="var(--ds-neutral-neutral-black, #000)",g="var(--ds-neutral-neutral-white, #fff)",p="var(--ds-spacing-s, 0.75rem)",_="var(--ds-neutral-neutral-black, #000)",y="var(--ds-neutral-neutral-white, #fff)",k="501",f="40px",O="0.8",E="0.7",S="var(--ds-spacing-s, 0.75rem)",x=e`
  /* 
   * Hidden by default, shown when [visible] attribute is present
   */
  :host {
    --ds-button-gap: var(--ds-back-to-top-button-gap, ${t("var(--ds-spacing-xs, 0.5rem)")});

    display: none;
    position: fixed;
    bottom: var(--ds-back-to-top-bottom, ${t(S)});
    inset-inline-end: var(
      --ds-back-to-top-inset-inline-end,
      ${t(p)}
    );
    z-index: var(--ds-back-to-top-z-index, ${t(k)});
    box-shadow: var(
      --ds-elevation-level-4,
      0 8px 16px rgba(0, 0, 0, 0.14) 0 0 2px rgba(0, 0, 0, 0.12)
    );
    border-radius: var(--ds-radii-circle, 12.5rem);
  }

  :host(:not([on-theme-night])) {
    --ds-theme-foreground-accent-strong-normal: var(
      --ds-back-to-top-day-theme-color,
      ${t(g)}
    ) !important;
    --ds-theme-background-accent-strong-normal: var(
      --ds-back-to-top-background-color,
      ${t(m)}
    ) !important;
    --ds-theme-background-accent-strong-hover: var(
      --ds-back-to-top-background-color-hover,
      ${t(m)}
    ) !important;
    --ds-theme-background-accent-strong-pressed: var(
      --ds-back-to-top-background-color-pressed,
      ${t(m)}
    ) !important;
  }

  /* 
   * Night theme variant - Inverted colors for dark backgrounds
   */
  :host([on-theme-night]),
  :host([on-theme-night][theme='night']),
  :host([on-theme-night][theme='day']) {
    --ds-theme-foreground-accent-strong-normal: var(
      --ds-back-to-top-theme-night-color,
      ${t(_)}
    ) !important;
    --ds-theme-background-accent-strong-normal: var(
      --ds-back-to-top-theme-night-background-color,
      ${t(y)}
    ) !important;
    --ds-theme-background-accent-strong-hover: var(
      --ds-back-to-top-theme-night-background-color-hover,
      ${t(y)}
    ) !important;
    --ds-theme-background-accent-strong-pressed: var(
      --ds-back-to-top-theme-night-background-color-pressed,
      ${t(y)}
    ) !important;
  }

  /* 
   * Visible state - Component becomes visible when [visible] attribute is present
   */
  :host([visible]) {
    display: block;
  }

  /* 
   * Main button styling - Fixed positioned circular button
   */

  ::slotted(store-button) {
    --ds-button-padding-block-start: 0;
    --ds-button-padding-block-end: 0;
    --ds-button-min-height: var(--ds-back-to-top-min-height, ${t(f)});
    --ds-button-min-width: var(--ds-back-to-top-min-width, ${t(f)});
  }

  ::slotted(store-button:hover) {
    --ds-button-opacity: var(--ds-back-to-top-opacity-hover, ${t(O)});
  }

  ::slotted(store-button:active) {
    --ds-button-opacity: var(
      --ds-back-to-top-opacity-active,
      ${t(E)}
    );
  }

  /* High contrast mode support */
  @media (forced-colors: active) {
    :host {
      border: var(--ds-back-to-top-forced-border, 2px solid ButtonText);
    }
  }

  /* Support for Windows High Contrast themes */
  @media (prefers-contrast: high) {
    ::slotted(store-button) {
      --ds-button-border-width: var(--ds-back-to-top-high-contrast-border-width, 2px);
      --ds-button-border-color: var(--ds-back-to-top-high-contrast-border-color, currentColor);
    }
  }
`;var w=Object.defineProperty,T=Object.getOwnPropertyDescriptor,C=Object.getPrototypeOf,A=Reflect.get,B=(t,e,s,o)=>{for(var r,i=o>1?void 0:o?T(e,s):e,n=t.length-1;n>=0;n--)(r=t[n])&&(i=(o?r(e,s,i):r(i))||i);return o&&i&&w(e,s,i),i};const $="store-back-to-top",F=Object.values(h).join(", "),q="store-tab-panel, reimagine-tab-panel";let H=class extends c{constructor(){super(...arguments),this.scrollBehavior="smooth",this._backToTopEvents=[]}_resetHeadingTabIndex(){var t;return null==(t=this._headingElement)?void 0:t.removeAttribute("tabindex")}_scrollToTop(){try{window.scrollTo({top:0,behavior:this.scrollBehavior}),setTimeout(()=>{this._headingElement&&!this._headingElement.hasAttribute("tabindex")&&(this._headingElement.setAttribute("tabindex","-1"),this._headingElement.focus())},500)}catch{window.scrollTo(0,0)}}_createHeroObserver(){return new IntersectionObserver(([t])=>{t.isIntersecting||t.boundingClientRect.top>0?this.removeAttribute("visible"):this.setAttribute("visible","")},{root:null,rootMargin:"0px",threshold:0})}_isValidSentinel(t){const e=t.closest(q);return e?e.hasAttribute("active"):!t.querySelector(q)}_findHeroBlade(){if(document.querySelector(q)){const t=document.querySelectorAll(F);for(const e of Array.from(t))if(this._isValidSentinel(e))return e;return null}return document.querySelector(F)}_handleButtonVisibility(){if(this._heroObserver&&this._heroObserver.disconnect(),this._bladeElements||(this._bladeElements=Array.from(document.querySelectorAll("[is-blade]"))),document.querySelector(q)){const t=this._bladeElements.find(t=>this._isValidSentinel(t));if(t)return this._heroObserver=this._createHeroObserver(),void this._heroObserver.observe(t)}const t=this._bladeElements.length>0?this._bladeElements[0]:this._findHeroBlade();t?(this._heroObserver=this._createHeroObserver(),this._heroObserver.observe(t)):this.setAttribute("visible","")}_handleButtonTextVisibility(){var t;this._buttonElement&&(null!=(t=this._viewportResizeObserver)&&t.isMobile()?this._buttonElement.setAttribute("icon-only",""):this._buttonElement.removeAttribute("icon-only"))}_createBladeObserver(){return new IntersectionObserver(t=>{let e;for(let s=t.length-1;s>=0;s--)if(t[s].isIntersecting){e=t[s];break}e&&("night"===e.target.getAttribute("theme")?this.setAttribute("on-theme-night",""):this.removeAttribute("on-theme-night"))},{root:null,rootMargin:"0px",threshold:.08})}_handleButtonTheme(){this._bladeElements||(this._bladeElements=Array.from(document.querySelectorAll("[is-blade]"))),0!==this._bladeElements.length&&(this._bladeObserver&&this._bladeObserver.disconnect(),this._bladeObserver=this._createBladeObserver(),this._bladeElements.forEach(t=>{this._bladeObserver.observe(t)}))}_setSpacing(t){this.style.setProperty("--ds-back-to-top-bottom",`${t}px`)}getDynamicSpacing(){requestAnimationFrame(()=>{var t;let e=12;const s=Date.now();(!this._cachedFlyouts||s-this._cachedFlyouts.lastCheck>1e3)&&(this._cachedFlyouts={defaultFlyout:document.querySelector(b[0]),highlightFlyout:document.querySelector(d),lastCheck:s});const{defaultFlyout:o,highlightFlyout:r}=this._cachedFlyouts,i=o&&!o.classList.contains("is-hidden")?o:r&&!r.classList.contains("is-hidden")?r:null;if(i){const t=i===o?u:v,s=i.querySelector(t);if(s){const t=s.getBoundingClientRect().top;return e=window.innerHeight-t+12,void this._setSpacing(e)}}if(!this._combinedFixedSelector){const t=[...this.fixedElements??[],...b].flat();this._combinedFixedSelector=t.join(", ")}const n=document.querySelector(this._combinedFixedSelector);if(!n)return void this._setSpacing(e);const a=n.tagName.toLowerCase(),c=n.getBoundingClientRect().height,l=(null==(t=n.firstElementChild)?void 0:t.getBoundingClientRect().height)??0,h=b[0].slice(1),m=n.classList.contains(h);(a===b[2]||0===c)&&(e+=l),"div"===a&&(e+=m?c+12:c),this._setSpacing(e)})}_observeTabChanges(){var t;null==(t=this._tabObserver)||t.disconnect();const e=document.querySelectorAll(q);0!==e.length&&(this._tabObserver=new MutationObserver(()=>{this._bladeElements=void 0,requestAnimationFrame(()=>this._handleButtonVisibility())}),e.forEach(t=>{this._tabObserver.observe(t,{attributes:!0,attributeFilter:["active"]})}))}_observeSpacingChanges(){this._spacingObserver&&this._spacingObserver.disconnect(),this._spacingObserver=new MutationObserver(()=>{this.getDynamicSpacing()}),this._chatbotContainers||(this._chatbotContainers=document.querySelectorAll(`${b[0]}, ${d}`)),this._chatbotContainers.length>0?this._chatbotContainers.forEach(t=>{this._spacingObserver.observe(t,{attributes:!0,attributeFilter:["class"]})}):this._spacingObserver.observe(document.body,{childList:!0,subtree:!1,attributes:!1})}refreshBladeCache(){this._bladeElements=void 0,this._handleButtonTheme()}firstUpdated(){this._handleButtonVisibility(),this._handleButtonTheme(),this.getDynamicSpacing(),this._observeSpacingChanges(),this._observeTabChanges()}connectedCallback(){super.connectedCallback(),this._buttonElement=this.querySelector("store-button"),this._headingElement=document.querySelector('h1:not([class*="sb-nopreview"]):not(#error-message)'),this._viewportResizeObserver=new l(this,{callback:this._handleButtonTextVisibility.bind(this)}),this._backToTopEvents.push({el:this._headingElement,type:"blur",handler:this._resetHeadingTabIndex.bind(this)},{el:this._buttonElement,type:"click",handler:this._scrollToTop.bind(this)}),r(this._backToTopEvents)}disconnectedCallback(){var t,e,s,o;null==(t=this._heroObserver)||t.disconnect(),null==(e=this._bladeObserver)||e.disconnect(),null==(s=this._spacingObserver)||s.disconnect(),null==(o=this._tabObserver)||o.disconnect(),i(this._backToTopEvents),this._buttonElement=void 0,this._bladeElements=void 0,this._headingElement=void 0,this._cachedFlyouts=void 0,this._chatbotContainers=void 0,this._combinedFixedSelector=void 0,super.disconnectedCallback()}render(){return n` <slot></slot> `}};var V,j,I;H.styles=[...(V=H,j=H,I="styles",A(C(V),I,j)||[]),x],B([s({type:String,attribute:"scroll-behavior",reflect:!0})],H.prototype,"scrollBehavior",2),B([o()],H.prototype,"_backToTopEvents",2),B([o()],H.prototype,"_viewportResizeObserver",2),H=B([a($)],H);export{H as BackToTop,$ as name};
