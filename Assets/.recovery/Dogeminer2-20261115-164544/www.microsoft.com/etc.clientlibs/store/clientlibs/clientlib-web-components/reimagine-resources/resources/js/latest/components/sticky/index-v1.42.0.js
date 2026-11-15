import{r as t,i as e,n as s,e as i,c as o,af as r,I as n,J as h,b as l,d as c}from"../../tag.const-v1.42.0.js";import{o as a,S as d}from"../../secondary-nav-item.const-v1.42.0.js";import{d as _}from"../../footnote.const-v1.42.0.js";const p="500",g="block",u=e`
  :host {
    position: sticky;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-self: flex-start;
    background-color: var(
      --ds-sticky-background-color,
      ${t("var(--ds-theme-background-neutral-fade, #f7f7f7)")}
    );
    box-sizing: border-box;
    z-index: var(--ds-sticky-z-index, ${t(p)});
  }

  :host([direction='top']) {
    top: 0;
  }

  :host([direction='bottom']) {
    bottom: 0;
  }

  :host(:not(.stuck)) ::slotted(.show-stuck) {
    display: none;
  }

  :host(.stuck) ::slotted(.hide-stuck) {
    display: none;
  }

  .sticky__base {
    display: var(--ds-sticky-base-display, ${t(g)});
  }
`,y="size-aware",b="always",v="off",k="stuck",S="get-height",m="top",f="bottom",w="onSticky",x="onStatic";var O=Object.defineProperty,H=Object.getOwnPropertyDescriptor,E=(t,e,s,i)=>{for(var o,r=i>1?void 0:i?H(e,s):e,n=t.length-1;n>=0;n--)(o=t[n])&&(r=(i?o(e,s,r):o(r))||r);return i&&r&&O(e,s,r),r};const P="store-sticky";let C=class extends d{constructor(){super(),this.direction=m,this.observerBehavior=y,this.extraScrollPadding=12,this._firstSlotEmpty=!0,this._lastSlotEmpty=!0,this._isStuck=!1,this._enableObserver=!0,this._observer=null,this._looseWidth=this._calculateLooseWidth(),this._observedWindowDimensions={width:window.innerWidth,height:window.innerHeight},this._stickyEvents=[],this._onResize=()=>{this._setVw(),window.innerHeight!==this._observedWindowDimensions.height&&this._setUp()},this._setVw(),this._resizeObserver=new ResizeObserver(()=>{requestAnimationFrame(()=>{const t={width:window.innerWidth,height:window.innerHeight};this._looseWidth=this._calculateLooseWidth(),this._setUp(JSON.stringify(t)===JSON.stringify(this._observedWindowDimensions)),this._observedWindowDimensions=t})})}connectedCallback(){super.connectedCallback(),this._stickyEvents.push({el:window,type:"resize",handler:r(200,this._onResize.bind(this))}),n(this._stickyEvents)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver&&this._resizeObserver.disconnect(),h(this._stickyEvents),this._updateScrollPadding(!0)}updated(t){(t.has("extraScrollPadding")||t.has("direction"))&&this._updateScrollPadding(!0),t.has("observerBehavior")&&this._setUp()}_handleSlotChange(){this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length}_handleBaseSlotChange(){this._defaultSlot.forEach(t=>{this._resizeObserver.observe(t)}),this._setUp()}_updateScrollPadding(t=!1){const e=document.documentElement,s=this.getBoundingClientRect().height;t&&(e.style.removeProperty("scroll-padding-top"),e.style.removeProperty("scroll-padding-bottom")),this.direction===m?e.style.scrollPaddingTop=s+this.extraScrollPadding+"px":this.direction===f&&(e.style.scrollPaddingBottom=s+this.extraScrollPadding+"px")}_setUp(t=!1){this._calculateHeights()&&this._createObserver(),t?this._setObserverStatus(this._enableObserver):this.setObserver()}_calculateHeights(){const t=this._stuckHeight,e=this._looseHeight,s={cssSelectors:["margin"]};return this._setStickyHeight(!0),this.classList.contains(k)?(this._stuckHeight=_(this,s),this.classList.remove(k),this._looseHeight=_(this,s),this.classList.add(k)):(this._looseHeight=_(this,s),this.classList.add(S),this.classList.add(k),this._stuckHeight=_(this,s),this.classList.remove(k),this.classList.remove(S)),this._heightDif=this._looseHeight-this._stuckHeight,this._setStickyHeight(),t!==this._stuckHeight||e!==this._looseHeight}_setStickyHeight(t=!1){let e=null,s=null;if(this.style.setProperty("margin-top",s),!t){e=`${this._stuckHeight}px`;const{marginTop:t}=getComputedStyle(this);s=`${this._heightDif+parseInt(t,10)}px`}this.style.setProperty("height",e),s&&this.style.setProperty("margin-top",s)}_calculateLooseWidth(){let t=this.getBoundingClientRect().width;return this.classList.contains(k)&&(this.classList.remove(k),t=this.getBoundingClientRect().width,this.classList.add(k)),t}_setVw(){const t=document.documentElement.clientWidth;this.style.setProperty("--vw",`${t}px`)}_hasPrevOrNextSibling(){return this.direction===f?this.nextElementSibling:this.previousElementSibling}_createObserver(){this._observer&&this._observer.disconnect();const t=(document.documentElement.clientWidth-this._looseWidth)/2,e=this._hasPrevOrNextSibling()?-1:-2,s=this._hasPrevOrNextSibling()?document:this.parentElement,i={root:s,rootMargin:`${e}px ${t}px ${e}px ${t}px`,threshold:[.99,.995,.999,1]};this._observer=new IntersectionObserver(([t])=>{if(this._enableObserver){const i=this._isStuck;if(s===document){let s=Math.ceil(t.intersectionRect.top)===-e;this.direction===f&&(s=Math.floor(t.intersectionRect.bottom)===document.documentElement.clientHeight+e),this._isStuck=t.intersectionRatio<1&&s}else this._isStuck=t.isIntersecting;if(this.direction===f&&Math.floor(this.getBoundingClientRect().bottom)===window.innerHeight&&(this._isStuck=!0),void 0!==i&&i!==this._isStuck)if(this._onStickyChange(),this._isStuck){const t=new CustomEvent(w,{bubbles:!0});this.dispatchEvent(t)}else{const t=new CustomEvent(x,{bubbles:!0});this.dispatchEvent(t)}}},i),this._observer.observe(this)}_stickyExceedsAcceptedHeight(){return this._stuckHeight>window.innerHeight/3}setObserver(){switch(this.observerBehavior){case v:this._setObserverStatus(!1);break;case b:this._setObserverStatus(!0);break;default:this._stickyExceedsAcceptedHeight()?this._setObserverStatus(!1):this._setObserverStatus(!0)}}_setObserverStatus(t){this._enableObserver=t;let e=null;t||(e="initial",this._isStuck=!1),this.style.setProperty("position",e),this._setIsStuck(),this._onStickyChange()}_setIsStuck(){if(this._enableObserver){const t=this.direction===f&&this.getBoundingClientRect().bottom===window.innerHeight,e=this.direction===m&&0===this.getBoundingClientRect().top;(t||e)&&(this._isStuck=!0)}}_onStickyChange(){this.classList.toggle(k,this._isStuck),this._updateScrollPadding()}getStuckHeight(){return this._stuckHeight}render(){return l`
      <div
        part="sticky__first"
        class="sticky__first"
        style="${this._firstSlotEmpty?"display: none;":""}"
      >
        <slot name="sticky__first" @slotchange="${this._handleSlotChange}"></slot>
      </div>
      <div part="sticky__base" class="sticky__base">
        <slot @slotchange="${this._handleBaseSlotChange}"></slot>
      </div>
      <div
        part="sticky__last"
        class="sticky__last"
        style="${this._lastSlotEmpty?"display: none":""}"
      >
        <slot name="sticky__last" @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}};C.styles=[u],E([s({reflect:!0})],C.prototype,"direction",2),E([s({attribute:"observer-behavior"})],C.prototype,"observerBehavior",2),E([s({type:Number,attribute:"extra-scroll-padding"})],C.prototype,"extraScrollPadding",2),E([i({slot:"sticky__first"})],C.prototype,"_firstSlot",2),E([i({slot:"sticky__last"})],C.prototype,"_lastSlot",2),E([o()],C.prototype,"_firstSlotEmpty",2),E([o()],C.prototype,"_lastSlotEmpty",2),E([o()],C.prototype,"_isStuck",2),E([o()],C.prototype,"_enableObserver",2),E([o()],C.prototype,"_observer",2),E([o()],C.prototype,"_stuckHeight",2),E([o()],C.prototype,"_looseHeight",2),E([o()],C.prototype,"_looseWidth",2),E([o()],C.prototype,"_heightDif",2),E([o()],C.prototype,"_resizeObserver",2),E([o()],C.prototype,"_observedWindowDimensions",2),E([o()],C.prototype,"_stickyEvents",2),E([a()],C.prototype,"_defaultSlot",2),C=E([c(P)],C);export{C as Sticky,P as name};
