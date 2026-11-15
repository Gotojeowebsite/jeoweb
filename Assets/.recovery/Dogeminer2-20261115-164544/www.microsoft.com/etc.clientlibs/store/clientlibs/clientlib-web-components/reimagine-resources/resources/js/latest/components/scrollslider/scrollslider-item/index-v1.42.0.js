import{r as t,i as e,n as i,e as s,c as r,R as l,$ as o,G as n,a0 as a,b as d,a1 as h,d as c}from"../../../tag.const-v1.42.0.js";const _="start",p="initial",v=e`
  :host {
    display: var(--ds-scrollslider-item-display, ${t("block")});
    max-width: 100%;
    height: var(--ds-scrollslider-item-default-height, 100%);
    scroll-snap-align: var(
      --ds-scrollslider-item-scroll-snap-align,
      ${t(_)}
    );
  }

  :host::part(scrollslider-item__base) {
    display: var(--ds-scrollslider-item-display, initial);
    height: var(--ds-scrollslider-item-height, ${t(p)});
  }

  :host(.hidden) {
    --ds-scrollslider-item-display: none;
  }
`;var m=Object.defineProperty,b=Object.getOwnPropertyDescriptor,y=(t,e,i,s)=>{for(var r,l=s>1?void 0:s?b(e,i):e,o=t.length-1;o>=0;o--)(r=t[o])&&(l=(s?r(e,i,l):r(l))||l);return s&&l&&m(e,i,l),l};const u="store-scrollslider-item";let g=class extends l{constructor(){super(...arguments),this.i18nManager=o(),this.partial=!1,this._firstSlotEmpty=!0,this._lastSlotEmpty=!0,this._checkWindowVisibility=()=>{const t=this.getBoundingClientRect(),e=t.left>=0&&t.right<=window.innerWidth;this.partial=!e,this._toggleListeners()},this._debouncedCheckWindowVisibility=n(60,this._checkWindowVisibility)}_findParentSlider(){return this.closest("store-scrollslider")||this.parentElement}_toggleListeners(){this.partial?(this.addEventListener("focusin",this._handleFocus),this.addEventListener("click",this._handleFocus)):(this.removeEventListener("focusin",this._handleFocus),this.removeEventListener("click",this._handleFocus))}_handleFocus(){var t;const e=(null==(t=this.i18nManager)?void 0:t.dir)||"ltr",i="rtl"===e?a.partialFocusNext:a.partialFocusPrev,s="rtl"===e?a.partialFocusPrev:a.partialFocusNext,r=this._findParentSlider();r&&this.getBoundingClientRect().left<r.getBoundingClientRect().left?this.dispatchEvent(new CustomEvent(i,{bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent(s,{bubbles:!0,composed:!0}))}_handleSlotChange(){this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length}_renderOptionalSlot(t="scrollslider-item__first",e=this._firstSlotEmpty){return d`
      <div part=${t} class=${t} style="${e?"display: none;":""}">
        <slot name=${t} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}_initWindowVisibilityTracking(){var t;window.addEventListener("resize",this._debouncedCheckWindowVisibility),window.addEventListener("load",this._checkWindowVisibility),this._parentSliderElement=this._findParentSlider(),null==(t=this._parentSliderElement)||t.addEventListener(h.scroll,this._debouncedCheckWindowVisibility),this._resizeObserver=new ResizeObserver(()=>this._checkWindowVisibility()),this._resizeObserver.observe(this),this._rafId=requestAnimationFrame(()=>{this._rafId=requestAnimationFrame(()=>this._checkWindowVisibility())})}_teardownWindowVisibilityTracking(){var t,e;window.removeEventListener("resize",this._debouncedCheckWindowVisibility),window.removeEventListener("load",this._checkWindowVisibility),null==(t=this._parentSliderElement)||t.removeEventListener(h.scroll,this._debouncedCheckWindowVisibility),null==(e=this._resizeObserver)||e.disconnect(),void 0!==this._rafId&&cancelAnimationFrame(this._rafId)}connectedCallback(){if(super.connectedCallback(),this.closest('[layout-configuration="left-aligned-overflow"]'))return void this._initWindowVisibilityTracking();const t={root:this._findParentSlider(),rootMargin:"0px",threshold:.99};this._observer=new IntersectionObserver(t=>{t.forEach(t=>{this.partial=!t.isIntersecting,this._toggleListeners()})},t),this._observer.observe(this)}disconnectedCallback(){var t;super.disconnectedCallback(),null==(t=this._observer)||t.disconnect(),this._teardownWindowVisibilityTracking()}updated(t){t.has("partial")&&this.dispatchEvent(new CustomEvent(a.partialChange,{bubbles:!0,composed:!0}))}render(){return d`
      ${this._renderOptionalSlot("scrollslider-item__first",this._firstSlotEmpty)}
      <div part="scrollslider-item__base" class="scrollslider-item__base">
        <slot></slot>
      </div>
      ${this._renderOptionalSlot("scrollslider-item__last",this._lastSlotEmpty)}
    `}};g.styles=[v],y([i({type:Boolean,reflect:!0})],g.prototype,"partial",2),y([i({reflect:!0})],g.prototype,"theme",2),y([s({slot:"scrollslider-item__first"})],g.prototype,"_firstSlot",2),y([s({slot:"scrollslider-item__last"})],g.prototype,"_lastSlot",2),y([r()],g.prototype,"_firstSlotEmpty",2),y([r()],g.prototype,"_lastSlotEmpty",2),y([r()],g.prototype,"_observer",2),y([r()],g.prototype,"_resizeObserver",2),y([r()],g.prototype,"_rafId",2),y([r()],g.prototype,"_parentSliderElement",2),g=y([c(u)],g);export{g as ScrollsliderItem,u as name};
