import{r as t,i as e,e as i,c as s,b as l,d as o}from"../../../tag.const-v1.42.0.js";import{ScrollsliderItem as r}from"../../scrollslider/scrollslider-item/index-v1.42.0.js";import{d as a,b as n,e as d}from"../../../vfi-v1.42.0.js";const m="initial",c="initial",u="initial",p="initial",h="initial",_="initial",f="initial",v="0",g=e`
  :host {
    padding-block: var(
      --ds-carousel-item-padding-block,
      ${t("initial")}
    );
    padding-inline: var(
      --ds-carousel-item-padding-inline,
      ${t(_)}
    );
  }

  :host([tabindex]:focus) {
    --ds-vfi-text-color: var(--ds-theme-border-accent-subtle-normal);
    --ds-hero-featured-slider-item-outline: ${a};
    --ds-hero-featured-slider-item-outline-offset: ${n};
    --ds-media-playlist-video-item-outline: ${a};
    --ds-media-playlist-video-item-outline-offset: ${d};
    --ds-hero-media-carousel-item-outline: ${a};
    --ds-hero-media-carousel-item-outline-offset: ${n};
    outline: var(--ds-carousel-item-outline, ${a}) !important;
    outline-offset: var(
      --ds-carousel-item-outline-offset,
      ${t(v)}
    );
  }

  .carousel-item__base {
    display: var(
      --ds-carousel-item-base-display,
      flow-root
    ); /* Prevents clipping of slotted elements with margins */
    flex-direction: var(--ds-carousel-item-base-flex-direction, initial);
    height: 100%;
    margin-block-end: var(
      --ds-carousel-item-margin-block-end,
      ${t(u)}
    );
    margin-inline-end: var(
      --ds-carousel-item-margin-inline-end,
      ${t(p)}
    );
    margin-block-start: var(
      --ds-carousel-item-margin-block-start,
      ${t(m)}
    );
    margin-inline-start: var(
      --ds-carousel-item-margin-inline-start,
      ${t(c)}
    );
    padding: var(--ds-carousel-item-padding, ${t(h)});
    box-sizing: var(--ds-carousel-item-box-sizing, ${t(f)});
  }
`;var b=Object.defineProperty,$=Object.getOwnPropertyDescriptor,y=Object.getPrototypeOf,S=Reflect.get,x=(t,e,i,s)=>{for(var l,o=s>1?void 0:s?$(e,i):e,r=t.length-1;r>=0;r--)(l=t[r])&&(o=(s?l(e,i,o):l(o))||o);return s&&o&&b(e,i,o),o};const E="store-carousel-item";let k=0,O=class extends r{constructor(){super(...arguments),this._componentId=++k,this._componentIdFallback=`carousel-item-${this._componentId}`,this._firstSlotEmpty=!0,this._lastSlotEmpty=!0}_handleSlotChange(){this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length}_renderOptionalSlot(t,e){return l`
      <div part=${t} class=${t} style="${e?"display: none;":""}">
        <slot name=${t} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}_findParentSlider(){return this.closest("store-carousel")||this.parentElement}_isFocused(){return this===document.activeElement}willUpdate(t){this.id=this.id.length>0?this.id:this._componentIdFallback,t.has("partial")&&(this.partial?(this.setAttribute("inert",""),this.setAttribute("tabindex","-1")):(this.removeAttribute("inert"),this._isFocused()||this.setAttribute("tabindex","0")))}render(){return l`
      ${this._renderOptionalSlot("carousel-item__first",this._firstSlotEmpty)}
      <div part="carousel-item__base" class="carousel-item__base">
        <slot></slot>
      </div>
      ${this._renderOptionalSlot("carousel-item__last",this._lastSlotEmpty)}
    `}};var j,I,P;O.styles=[...(j=O,I=O,P="styles",S(y(j),P,I)),g],x([i({slot:"carousel-item__first"})],O.prototype,"_firstSlot",2),x([i({slot:"carousel-item__last"})],O.prototype,"_lastSlot",2),x([s()],O.prototype,"_firstSlotEmpty",2),x([s()],O.prototype,"_lastSlotEmpty",2),O=x([o(E)],O);export{O as CarouselItem,E as name};
