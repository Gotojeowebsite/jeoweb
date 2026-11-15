import{r as t,aa as e,i as l,n as s,O as r,e as i,c as o,aq as n,ar as a,ae as d,b as c,G as h,a0 as _,I as p,J as b,a1 as m,d as g}from"../../../tag.const-v1.42.0.js";import{o as u,e as f}from"../../../secondary-nav-item.const-v1.42.0.js";import{W as v}from"../../../i18nMixin-v1.42.0.js";import{h as y}from"../../../footnote.const-v1.42.0.js";import{b as x,B as S,c as $}from"../../../pagination-item.const-v1.42.0.js";import{a as w}from"../../../util7-v1.42.0.js";import"../../../util1-v1.42.0.js";const C="var(--ds-spacing-xl, 2rem)",E="var(--ds-spacing-xs, 0.5rem)",I="var(--ds-spacing-m, 1rem)",A="initial",B="initial",R="100vw",k="0",L="row",O="start",z="var(--ds-scrollslider-full-bleed-spacing, 0)",F="hidden",P="12rem",T=l`
  :host {
    position: relative;
    display: flex;
    flex-direction: var(
      --ds-scrollslider-base-flex-direction,
      ${t("column")}
    );
    gap: var(--ds-scrollslider-gap, ${t(C)});
    align-items: var(--ds-scrollslider-align-items, ${t(A)});
    justify-content: var(
      --ds-scrollslider-justify-content,
      ${t(B)}
    );
  }

  .scrollslider__controls {
    display: flex;
    align-items: center;
    gap: var(--ds-scrollslider-controls-gap, ${t(E)});
  }

  .scrollslider__base {
    display: flex;
    flex-direction: var(
      --ds-scrollslider-base-flex-direction,
      ${t(L)}
    );
    overflow-x: scroll;
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: none;
    gap: var(--ds-scrollslider-item-gap, ${t(I)});
    scroll-behavior: smooth;
    padding: var(--ds-scrollslider-base-padding, ${t(k)});
    justify-content: var(
      --ds-scrollslider-base-justify-content,
      ${t(O)}
    );
    align-items: var(--ds-scrollslider-base-align-items, ${t(A)});
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-mask-image: none;
    mask-image: none;
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;

    @media (prefers-reduced-motion: reduce) {
      scroll-behavior: auto;
    }
  }

  /* show left fade */
  :host([gradient-fade].show-start-fade) .scrollslider__base,
  :host(:dir(rtl)[gradient-fade].show-end-fade) .scrollslider__base {
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1)
        calc(
          var(
            --ds-scrollslider-gradient-fade-width,
            ${t(P)}
          )
        ),
      rgba(0, 0, 0, 1) 100%
    );
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1)
        calc(
          var(
            --ds-scrollslider-gradient-fade-width,
            ${t(P)}
          )
        ),
      rgba(0, 0, 0, 1) 100%
    );
  }

  /* show right fade */
  :host([gradient-fade].show-end-fade) .scrollslider__base,
  :host(:dir(rtl)[gradient-fade].show-start-fade) .scrollslider__base {
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-mask-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1)
        calc(
          var(
            --ds-scrollslider-gradient-fade-width,
            ${t(P)}
          )
        ),
      rgba(0, 0, 0, 1) 100%
    );
    mask-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1)
        calc(
          var(
            --ds-scrollslider-gradient-fade-width,
            ${t(P)}
          )
        ),
      rgba(0, 0, 0, 1) 100%
    );
  }

  /* show left and right fade */
  :host([gradient-fade].show-start-fade.show-end-fade) .scrollslider__base {
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1)
        calc(
          var(
            --ds-scrollslider-gradient-fade-width,
            ${t(P)}
          )
        ),
      rgba(0, 0, 0, 1)
        calc(
          100% - var(
              --ds-scrollslider-gradient-fade-width,
              ${t(P)}
            )
        ),
      rgba(0, 0, 0, 0) 100%
    );
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1)
        calc(
          var(
            --ds-scrollslider-gradient-fade-width,
            ${t(P)}
          )
        ),
      rgba(0, 0, 0, 1)
        calc(
          100% - var(
              --ds-scrollslider-gradient-fade-width,
              ${t(P)}
            )
        ),
      rgba(0, 0, 0, 0) 100%
    );
  }

  .scrollslider__base::-webkit-scrollbar {
    display: none;
  }

  :host([hide-controls]) .scrollslider__controls {
    display: none;
  }

  :host([alignment='center'][hide-controls]) .scrollslider__base {
    justify-content: center;
  }

  :host([control-position^='middle']) {
    --ds-scrollslider-base-flex-direction: row;
  }

  :host([control-position='${t(e.middleJustified)}'])
    .scrollslider__controls {
    position: absolute;
    pointer-events: none;
    height: 100%;
    width: 100%;
    top: 0;
    z-index: 1;
    justify-content: space-between;
  }

  :host([control-position='${t(e.middleJustified)}'])
    .scrollslider__prev-control-default,
  :host([control-position='${t(e.middleJustified)}'])
    .scrollslider__next-control-default,
  :host([control-position='${t(e.middleJustified)}'])
    [slot='scrollslider__prev-control']::slotted(*),
  :host([control-position='${t(e.middleJustified)}'])
    [slot='scrollslider__next-control']::slotted(*) {
    pointer-events: visible;
  }

  :host([control-position='${t(e.middleJustified)}'])
    .scrollslider__prev-control-disabled,
  :host([control-position='${t(e.middleJustified)}'])
    .scrollslider__next-control-disabled {
    visibility: var(
      --ds-scrollslider-controls-visibility,
      ${t(F)}
    );
  }

  :host([control-position='${t(e.middleJustified)}'])
    .scrollslider__prev-control,
  :host([control-position='${t(e.middleJustified)}'])
    .scrollslider__next-control {
    height: 100%;
    display: flex;
    align-items: center;
  }

  :host([control-position='${t(e.middleJustified)}'])
    .scrollslider__next-control {
    justify-content: end;
  }

  :host([control-position='${t(e.middleEnd)}'])
    .scrollslider__controls {
    order: 4;
  }

  :host([control-position^='bottom']) .scrollslider__controls {
    order: 4;
  }

  :host([control-position='${t(e.bottomJustified)}'])
    .scrollslider__controls {
    justify-content: space-between;
  }

  :host([control-position='${t(e.bottomEnd)}'])
    .scrollslider__controls {
    justify-content: end;
  }

  :host([full-bleed]) .scrollslider__base {
    width: calc(
      var(--ds-scrollslider-vw, ${t(R)}) -
        (
          var(
              --ds-scrollslider-base-full-bleed-spacing,
              ${t(z)}px
            ) *
            2
        )
    );
    padding-inline: var(
      --ds-scrollslider-base-full-bleed-spacing,
      ${t(z)}
    );
    margin-inline: calc(
      var(
          --ds-scrollslider-base-full-bleed-spacing,
          ${t(z)}
        ) *
        (-1)
    );
    scroll-padding-inline: var(
      --ds-scrollslider-base-full-bleed-spacing,
      ${t(z)}
    );
  }

  :host(
    [full-bleed][control-position='${t(e.middleJustified)}']
  ) {
    .scrollslider__prev-control {
      margin-inline-start: calc(
        var(
            --ds-scrollslider-base-full-bleed-spacing,
            ${t(z)}
          ) *
          (-1)
      );
    }

    .scrollslider__prev-control-default {
      padding-inline-start: var(
        --ds-scrollslider-base-full-bleed-spacing,
        ${t(z)}
      );
    }

    .scrollslider__next-control {
      margin-inline-end: calc(
        var(
            --ds-scrollslider-base-full-bleed-spacing,
            ${t(z)}
          ) *
          (-1)
      );
    }

    .scrollslider__next-control-default {
      padding-inline-end: var(
        --ds-scrollslider-base-full-bleed-spacing,
        ${t(z)}
      );
    }
  }
  @media (forced-colors: active) {
    .scrollslider__prev-control,
    .scrollslider__next-control {
      background-color: currentcolor;
    }
  }
`;var j=Object.defineProperty,D=Object.getOwnPropertyDescriptor,J=(t,e,l,s)=>{for(var r,i=s>1?void 0:s?D(e,l):e,o=t.length-1;o>=0;o--)(r=t[o])&&(i=(s?r(e,l,i):r(i))||i);return s&&i&&j(e,l,i),i};const W="store-scrollslider";let N=class extends v{constructor(){super(...arguments),this.alignment=n.start,this.controlPosition=e.bottomStart,this.controlSize=x.large,this.fullBleed=!1,this.scrollSliderRole="list",this.scrollSliderItemRole="listitem",this.hideControls=!1,this.enableGradientFade=!1,this._scrollsliderItems=[],this._first=0,this._last=0,this._prevControlDisabled=!1,this._nextControlDisabled=!1,this._scrollsliderEvents=[],this._controlIconSize=w.medium,this._firstSlotEmpty=!0,this._lastSlotEmpty=!0}get itemVisibilityThreshold(){return.99}get showsFractionalItems(){return!1}_handleBaseSlotChange(){this._setScrollsliderItems(),this._setButtonAttrs(),this._checkContainerOverflow()}_handleSlotChange(){this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length}_handleControlSlotChange(){this._setButtonAttrs()}_checkContainerOverflow(){this._scrollableElement.scrollWidth>this._scrollableElement.clientWidth+2?this.hideControls=!1:this.hideControls=!0}_onScroll(){var t;const e=new CustomEvent(m.scroll,{cancelable:!0,bubbles:!0});this.dispatchEvent(e),!e.defaultPrevented&&(this._setButtonAttrs(),this.showsFractionalItems&&null!=(t=this._scrollsliderItems)&&t.length&&this._startObservingScrollsliderItems(this._scrollsliderItems))}_setScrollsliderItems(){const t=this._findAttributeBasedItems();if(t.length>0)this._scrollsliderItems=t,this._startObservingScrollsliderItems(this._scrollsliderItems);else{if(1===this._slot.length&&"slot"===this._slot[0].tagName.toLowerCase()){const t=this._slot[0].assignedElements();this._scrollsliderItems=t}else this._scrollsliderItems=this._slot;this._scrollsliderItems.forEach(t=>{t.setAttribute("role",this.scrollSliderItemRole)})}}_atBeginning(){return Math.abs(this._scrollableElement.scrollLeft)<=1}_atEnd(){return Math.abs(this._scrollableElement.scrollLeft)+1>=this._scrollableElement.scrollWidth-this._scrollableElement.clientWidth}_isLeftAlignedOverflow(){return"left-aligned-overflow"===this.getAttribute("layout-configuration")}_isFirstItemFullyVisible(){const t=this._scrollsliderItems[0];return!!t&&!t.hasAttribute("partial")}_isLastItemFullyVisible(){const t=this._scrollsliderItems.at(-1);return!(!t||null!=t&&t.hasAttribute("partial"))}_findAttributeBasedItems(){return this._slot.flatMap(t=>t.hasAttribute("scrollslider-item")?[t]:Array.from(t.querySelectorAll("[scrollslider-item]"))).filter(t=>t instanceof HTMLElement)}_startObservingScrollsliderItems(t){this._itemObserver&&(this._itemObserver.disconnect(),this._itemObserver=void 0);const e={root:this,rootMargin:"0px",threshold:this.itemVisibilityThreshold},l=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting?t.target.removeAttribute("partial"):t.target.setAttribute("partial","")})},e);t.forEach(t=>{l.observe(t)}),this._itemObserver=l}_setButtonAttrs(){const t=this._prevControlSlot.length>0?this._prevControlSlot[0]:this._prevControlDefault,e=this._nextControlSlot.length>0?this._nextControlSlot[0]:this._nextControlDefault;if(!t||!e)return;t.removeAttribute("disabled"),e.removeAttribute("disabled"),this.classList.add(a.showStart,a.showEnd),this._prevControlDisabled=!1,this._nextControlDisabled=!1;const l=this._isLeftAlignedOverflow(),s=l?this._isFirstItemFullyVisible():this._atBeginning(),r=l?this._isLastItemFullyVisible():this._atEnd();s&&(t.matches(":focus")&&requestAnimationFrame(()=>{e.focus()}),t.setAttribute("disabled",""),this._prevControlDisabled=!0,this.classList.remove(a.showStart)),r&&(e.matches(":focus")&&requestAnimationFrame(()=>{t.focus()}),e.setAttribute("disabled",""),this._nextControlDisabled=!0,this.classList.remove(a.showEnd))}_handleFullBleedResize(t){setTimeout(()=>{const e=document.documentElement.clientWidth;this.style.setProperty("--ds-scrollslider-vw",`${e}px`),this._scrollsliderSpacing=Math.abs(t.getBoundingClientRect().left),t.style.setProperty("--ds-scrollslider-full-bleed-spacing",`${this._scrollsliderSpacing}px`)},100)}_scrollToNextItem(t){t.stopPropagation();const l=t.target;if(l===this._scrollsliderItems[this._scrollsliderItems.length-1]){const t="ltr"===this.dir?this._scrollableElement.scrollWidth:-1*this._scrollableElement.scrollWidth;window.requestAnimationFrame(()=>{this._scrollableElement.scroll({left:t})})}else this.controlPosition===e.middleJustified?l.scrollIntoView({block:"nearest",inline:"center"}):this.triggerNext()}_scrollToPrevItem(t){t.stopPropagation();const l=t.target;l===this._scrollsliderItems[0]?window.requestAnimationFrame(()=>{this._scrollableElement.scroll({left:0})}):this.controlPosition===e.middleJustified?l.scrollIntoView({block:"nearest",inline:"center"}):this.triggerPrev()}_handleLeftRight(t){const e=t;(e.key===d.ARROW_LEFT||e.key===d.ARROW_RIGHT)&&e.preventDefault()}_scrollLeft(){const t=this.fullBleed?this:this._scrollableElement,e=[],l=parseInt(getComputedStyle(this._scrollableElement).columnGap,10);let s=0;if(this._scrollsliderItems.forEach(l=>{("ltr"===this.dir&&l.getBoundingClientRect().left<t.getBoundingClientRect().left||"rtl"===this.dir&&l.getBoundingClientRect().right<=t.getBoundingClientRect().right)&&e.push(l)}),e.length>0){let r=null,i=null,o=null;"ltr"===this.dir?(r=e.length-1,i=r+1,o=r):(r=0,i=r-1,o=r),s="left-aligned-overflow"!==this.getAttribute("layout-configuration")&&e[r].hasAttribute("partial")?e[r].getBoundingClientRect().left-t.getBoundingClientRect().left:-1*(e[r].getBoundingClientRect().width+l),this.dispatchEvent(new CustomEvent("slide-changed",{bubbles:!0,detail:{previousIndex:i,currentIndex:o}}))}return s}_scrollRight(){const t=this.fullBleed?this:this._scrollableElement,e=[],l=parseInt(getComputedStyle(this._scrollableElement).columnGap,10);let s=0,r=null,i=null;if(this._scrollsliderItems.forEach((l,s)=>{let o=null;("ltr"===this.dir&&l.getBoundingClientRect().left>=t.getBoundingClientRect().left||"rtl"===this.dir&&l.getBoundingClientRect().right>t.getBoundingClientRect().right)&&(o=l),o&&(e.push(l),null===r&&(r=s),i=s)}),e.length>0){y(null!==r),y(null!==i);let o=null,n=null,a=null;"ltr"===this.dir?(o=0,n=r,a=r+1):(o=e.length-1,n=i+1,a=i),this.dispatchEvent(new CustomEvent("slide-changed",{bubbles:!0,detail:{previousIndex:n,currentIndex:a}})),s="left-aligned-overflow"!==this.getAttribute("layout-configuration")&&e[o].hasAttribute("partial")?e[o].getBoundingClientRect().right-t.getBoundingClientRect().right:e[o].getBoundingClientRect().width+l}return s}_renderOptionalSlot(t,e){return c`
      <div part=${t} class=${t} style="${e?"display: none;":""}">
        <slot name=${t} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}prevControlTemplate(){const t={"scrollslider__prev-control-disabled":this._prevControlDisabled};return c`
      <div
        part="scrollslider__prev-control"
        class="scrollslider__prev-control ${f(t)}"
      >
        <slot
          name="scrollslider__prev-control"
          @slotchange="${this._handleControlSlotChange}"
          @click=${h(200,this.triggerPrev,{atBegin:!0})}
        >
          <store-button
            class="scrollslider__prev-control-default"
            icon-only
            appearance=${S.buttonSecondary}
            size=${this.controlSize}
            shape=${$.circle}
            aria-label=${this.prevLabel||this.msg("prev")||"Previous slide"}
            button-label=${this.prevLabel||this.msg("prev")||"Previous slide"}
            button-title=${this.prevLabel||this.msg("prev")||"Previous slide"}
          >
            <store-icon
              icon="arrow-${"rtl"===this.dir?"right":"left"}"
              size=${this._controlIconSize}
              aria-hidden="true"
              role="presentation"
              filled
              slot="button__icon"
            ></store-icon>
          </store-button>
        </slot>
      </div>
    `}nextControlTemplate(){const t={"scrollslider__next-control-disabled":this._nextControlDisabled};return c`
      <div
        part="scrollslider__next-control"
        class="scrollslider__next-control ${f(t)}"
      >
        <slot
          name="scrollslider__next-control"
          @slotchange="${this._handleControlSlotChange}"
          @click=${h(200,this.triggerNext,{atBegin:!0})}
        >
          <store-button
            class="scrollslider__next-control-default"
            icon-only
            appearance=${S.buttonSecondary}
            size=${this.controlSize}
            shape=${$.circle}
            aria-label=${this.nextLabel||this.msg("next")||"Next slide"}
            button-label=${this.nextLabel||this.msg("next")||"Next slide"}
            button-title=${this.nextLabel||this.msg("next")||"Next slide"}
          >
            <store-icon
              icon="arrow-${"rtl"===this.dir?"left":"right"}"
              size=${this._controlIconSize}
              aria-hidden="true"
              role="presentation"
              filled
              slot="button__icon"
            ></store-icon>
          </store-button>
        </slot>
      </div>
    `}controlsTemplate(){return c`
      <div part="scrollslider__controls" class="scrollslider__controls">
        ${this.prevControlTemplate()} ${this.nextControlTemplate()}
      </div>
    `}baseSlotTemplate(){return c`
      <div
        part="scrollslider__base"
        class="scrollslider__base"
        tabindex="-1"
        @scroll="${h(60,this._onScroll)}"
      >
        <slot @slotchange=${this._handleBaseSlotChange} role="presentation"></slot>
      </div>
    `}setScrollsliderItems(t){this._scrollsliderItems=t}setControlSize(t){this.controlSize=t,(this.controlSize===x.small||this.controlSize===x.medium)&&(this._controlIconSize=w.small),this.controlSize===x.large&&(this._controlIconSize=w.medium)}firstUpdated(){this._baseElement.setAttribute("role",this.scrollSliderRole),this._scrollableElement=this._baseElement}updated(t){var e;t.has("scrollSliderRole")&&this._baseElement.setAttribute("role",this.scrollSliderRole),t.has("scrollSliderAriaLabel")&&null!=(e=this.scrollSliderAriaLabel)&&e.trim()&&this._baseElement.setAttribute("aria-label",this.scrollSliderAriaLabel)}connectedCallback(){super.connectedCallback(),this._resizeObserver=new ResizeObserver(()=>{var t;this._setButtonAttrs(),this._checkContainerOverflow(),(this.fullBleed||this.hasAttribute("full-bleed-mobile-tablet"))&&this._handleFullBleedResize(this),this.showsFractionalItems&&null!=(t=this._scrollsliderItems)&&t.length&&this._startObservingScrollsliderItems(this._scrollsliderItems)}),this._resizeObserver.observe(this),this._scrollsliderEvents.push({el:this,type:_.partialFocusNext,handler:this._scrollToNextItem},{el:this,type:_.partialFocusPrev,handler:this._scrollToPrevItem},{el:this,type:"keydown",handler:this._handleLeftRight}),this._isLeftAlignedOverflow()&&this._scrollsliderEvents.push({el:this,type:_.partialChange,handler:this._setButtonAttrs}),p(this._scrollsliderEvents),this.controlPosition===e.middleJustified&&(this.enableGradientFade=!0)}disconnectedCallback(){var t,e;super.disconnectedCallback(),null==(t=this._resizeObserver)||t.disconnect(),null==(e=this._itemObserver)||e.disconnect(),b(this._scrollsliderEvents)}triggerPrev(){if(this._isLeftAlignedOverflow()&&this._prevControlDisabled||this._atBeginning())return;const t="rtl"===this.dir?this._scrollRight():this._scrollLeft();window.requestAnimationFrame(()=>{this._scrollableElement.scrollBy({left:t})})}triggerNext(){if(this._isLeftAlignedOverflow()&&this._nextControlDisabled)return;const t="rtl"===this.dir?this._scrollLeft():this._scrollRight();if(0!==t)window.requestAnimationFrame(()=>{this._scrollableElement.scrollBy({left:t})});else if(!this._atEnd()){const t=this._scrollableElement.scrollWidth-this._scrollableElement.clientWidth;window.requestAnimationFrame(()=>{this._scrollableElement.scrollTo({left:t})})}}render(){return c`
      ${this._renderOptionalSlot("scrollslider__first",this._firstSlotEmpty)}
      ${this.controlsTemplate()} ${this.baseSlotTemplate()}
      ${this._renderOptionalSlot("scrollslider__last",this._lastSlotEmpty)}
    `}};N.styles=[T],J([s({reflect:!0})],N.prototype,"alignment",2),J([s({attribute:"prev-label"})],N.prototype,"prevLabel",2),J([s({attribute:"next-label"})],N.prototype,"nextLabel",2),J([s({attribute:"control-position",reflect:!0})],N.prototype,"controlPosition",2),J([s({attribute:"control-size",reflect:!0})],N.prototype,"controlSize",2),J([s({attribute:"full-bleed",reflect:!0,type:Boolean})],N.prototype,"fullBleed",2),J([s({attribute:"scrollslider-role"})],N.prototype,"scrollSliderRole",2),J([s({attribute:"scrollslider-item-role"})],N.prototype,"scrollSliderItemRole",2),J([s({attribute:"scrollslider-arialabel"})],N.prototype,"scrollSliderAriaLabel",2),J([s({attribute:"hide-controls",type:Boolean,reflect:!0})],N.prototype,"hideControls",2),J([s({attribute:"gradient-fade",type:Boolean,reflect:!0})],N.prototype,"enableGradientFade",2),J([s({reflect:!0})],N.prototype,"theme",2),J([r(".scrollslider__prev-control store-button")],N.prototype,"_prevControlDefault",2),J([r(".scrollslider__next-control store-button")],N.prototype,"_nextControlDefault",2),J([u({slot:"scrollslider__prev-control"})],N.prototype,"_prevControlSlot",2),J([u({slot:"scrollslider__next-control"})],N.prototype,"_nextControlSlot",2),J([u()],N.prototype,"_slot",2),J([u({selector:"[scrollslider-item]",flatten:!0})],N.prototype,"attributeBasedScrollSliderItems",2),J([i({slot:"scrollslider__first"})],N.prototype,"_firstSlot",2),J([i({slot:"scrollslider__last"})],N.prototype,"_lastSlot",2),J([r(".scrollslider__base")],N.prototype,"_baseElement",2),J([o()],N.prototype,"_scrollableElement",2),J([o()],N.prototype,"_scrollsliderItems",2),J([o()],N.prototype,"_resizeObserver",2),J([o()],N.prototype,"_scrollsliderSpacing",2),J([o()],N.prototype,"_first",2),J([o()],N.prototype,"_last",2),J([o()],N.prototype,"_prevControlDisabled",2),J([o()],N.prototype,"_nextControlDisabled",2),J([o()],N.prototype,"_scrollsliderEvents",2),J([o()],N.prototype,"_controlIconSize",2),J([o()],N.prototype,"_firstSlotEmpty",2),J([o()],N.prototype,"_lastSlotEmpty",2),N=J([g(W)],N);export{N as Scrollslider,W as name};
