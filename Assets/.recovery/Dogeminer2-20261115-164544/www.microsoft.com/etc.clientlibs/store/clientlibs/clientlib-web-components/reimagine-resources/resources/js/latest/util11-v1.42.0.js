import{r as t,i as e,e as o,O as n,c as i,n as s,l,s as a,J as r,I as d,y as h,b as u,M as p,H as m,m as g,X as y,d as v}from"./tag.const-v1.42.0.js";import{S as _}from"./util21-v1.42.0.js";import{b as c,v as b,V as E}from"./secondary-nav-item.const-v1.42.0.js";import{f as B}from"./vfi-v1.42.0.js";import{name as C}from"./components/media/index-v1.42.0.js";import{n as w}from"./util6-v1.42.0.js";import{B as f}from"./pagination-item.const-v1.42.0.js";const x=1280,S=4,O=4,P={toggleOverlay:"toggle-overlay"},V=()=>window.matchMedia("(min-width: 1280px)").matches,M="12",$=e`
  :host {
    --ds-big-play-button-padding: 14px;
    --ds-big-play-button-width: 48px;
    --ds-big-play-button-height: 48px;
    --ds-big-play-button-border: none;
    --ds-big-play-button-icon-width: 20px;
    --ds-big-play-button-icon-height: 20px;
    display: flex;
    flex-direction: column;
    position: relative;
    outline: var(--ds-media-playlist-video-item-outline, none);
    outline-offset: var(--ds-media-playlist-video-item-outline-offset, 0);
  }

  .overlay-content-container {
    padding: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: var(
      --media-playlist-video-overlay-bottom-spacing,
      ${t("250px")}
    );
    width: 100%;
    max-width: 1328px;
    text-align: center;
    z-index: var(
      --media-playlist-video-overlay-z-index,
      ${t(M)}
    );
    overflow: hidden;
    transition: bottom 0.5s ease-in-out;
  }

  .overlay-content-container.overlay-hidden {
    --media-playlist-video-overlay-bottom-spacing: 55px;
  }

  .hidden {
    display: none;
  }

  .toggle-button-container {
    margin-bottom: var(--ds-spacing-m);
  }
`,L=e`
  @media (max-width: ${t(c("1280px"))}) {
    :host {
      --ds-big-play-button-padding: 12px;
      --ds-big-play-button-width: 40px;
      --ds-big-play-button-height: 40px;
      --ds-big-play-button-icon-width: 14px;
      --ds-big-play-button-icon-height: 14px;
    }

    .overlay-content-container {
      position: static;
      padding-top: var(--ds-spacing-l, 1.5rem);
      padding-inline: var(--ds-spacing-l, 1.5rem);
      transform: none;
      left: revert;
      width: 100%;
      order: 1;
    }

    .toggle-button {
      display: none;
    }
  }

  @media (max-width: ${t(c(b.sm))}) {
    .overlay-content-container {
      padding-inline: var(--ds-spacing-l, 1.5rem);
    }
  }
`,T="universal-media-player",U="video",A="ump-controls",j="ump-control-bar",D="ump-big-play-button",R=".controls";var z=Object.defineProperty,k=Object.getOwnPropertyDescriptor,I=Object.getPrototypeOf,N=Reflect.get,H=(t,e,o,n)=>{for(var i,s=n>1?void 0:n?k(e,o):e,l=t.length-1;l>=0;l--)(i=t[l])&&(s=(n?i(e,o,s):i(s))||s);return n&&s&&z(e,o,s),s};const q="store-media-playlist-video-item";let G=class extends _{constructor(){super(),this._overlayContentSlotEmpty=!0,this._mediaSlotEmpty=!0,this._toggleDownButtonAriaLabel="Hide overlay content",this._toggleUpButtonAriaLabel="Show overlay content",this._overlayContentZIndex=11,this.events=[],this.umpEvents=[],this._styleInjected=!1,this._viewportResizeObserver=new E(this,{callback:()=>this._handleViewportChange()}),this.baseContent=!0}pauseVideo(){this._umpVideoElement&&this._umpVideoElement.pause instanceof Function&&this._umpVideoElement.pause()}isVideoPaused(){return!this._umpVideoElement||this._umpVideoElement.paused}_getUMPElements(){!this._umpElement||!this._umpElement.shadowRoot||(this._umpVideoElement=this._umpElement.shadowRoot.querySelector(U),this._umpControl=this._umpElement.shadowRoot.querySelector(A),this._umpControl&&this._umpControl.shadowRoot&&(this._umpControlElement=this._umpControl.shadowRoot.querySelector(R),this._umpControlBar=this._umpControl.shadowRoot.querySelector(j),this._umpVideoBigPlayButton=this._umpControl.shadowRoot.querySelector(D)))}_handleViewportChange(){var t;const e=V();this._mediaElement&&null!=(t=this._viewportResizeObserver)&&t.isXsmall()?l(this._mediaElement,["aspect-ratio"]):a(this._mediaElement,{"aspect-ratio":`${p.ratio16to9}`}),this._updateUMPVideoElementStyle();const o=this.isVideoPaused();e?(this._toggleOverlayContentHeading(o),this._toggleMediaOverlay(o),this._toggleOverlayToggleButtons(o,!1),this._toggleButtonGroup(!this._umpVideoBigPlayButton)):(this._toggleOverlayContentHeading(!0),this._toggleMediaOverlay(!1),this._toggleButtonGroup(!1))}_overlayContentSlotChange(){if(this._overlayContentSlotEmpty=0===this._overlayContentSlot.length,this._overlayContentSlotEmpty)return;const t=this._overlayContentSlot[0];t instanceof HTMLElement&&t.tagName.toLowerCase()===w&&a(t,{size:g["size-sm"],alignment:m.center}),this._bindToggleButtonEvents(),this._toggleButtonGroup(!1)}_mediaSlotChange(){if(this._mediaSlotEmpty=0===this._mediaSlot.length,this._mediaSlotEmpty)return;const t=V(),e=this._mediaSlot[0];e instanceof HTMLElement&&e.tagName.toLowerCase()===C&&(this._mediaElement=e,this._umpElement=this._mediaElement.querySelector(T),t&&a(this._mediaElement,{overlay:`${y.overlayAssetBottom3}`}),a(this._mediaElement,{"aspect-ratio":`${p.ratio16to9}`})),this._umpElement&&requestAnimationFrame(()=>{this._bindUMPEvents()})}_bindUMPEvents(){this._umpElement&&(r(this.umpEvents),this.umpEvents.push({el:this._umpElement,type:"ready",handler:()=>{this._getUMPElements(),this._updateUMPVideoElementStyle(),this._observeUMPState();const t=this.isVideoPaused()&&V();this._toggleMediaOverlay(t),this._toggleButtonGroup(!this._umpVideoBigPlayButton)}},{el:this._umpElement,type:"play",handler:this._handleToggleButtonClick.bind(this,!1,!1)})),d(this.umpEvents)}_bindToggleButtonEvents(){r(this.events),this.events.push({el:this._toggleButtonUp,type:"click",handler:this._handleToggleButtonClick.bind(this,!0,!0)},{el:this._toggleButtonDown,type:"click",handler:this._handleToggleButtonClick.bind(this,!1,!0)}),d(this.events)}_removeAllEvents(){this.events.length>0&&(r(this.events),this.events=[]),this.umpEvents.length>0&&(r(this.umpEvents),this.umpEvents=[])}_handleToggleButtonClick(t,e=!0){var o;V()&&(this._toggleMediaOverlay(t),this._toggleOverlayContentHeading(t),this._toggleOverlayToggleButtons(t,e),t&&(null==(o=this._umpVideoElement)||o.pause()),this.dispatchEvent(new CustomEvent("toggle-overlay",{bubbles:!0,detail:{isOverlayContentVisible:t,byClick:e}})))}_toggleOverlayToggleButtons(t,e=!0){this._toggleButtonDown.classList.toggle("hidden",!t),this._toggleButtonUp.classList.toggle("hidden",t),this._overlayContentContainer.classList.toggle("overlay-hidden",!t),e&&(t?this._toggleButtonDown.focus():this._toggleButtonUp.focus())}_toggleOverlayContentHeading(t){this._overlayContentElement&&(t?this._overlayContentElement.classList.remove("hidden"):this._overlayContentElement.classList.add("hidden"))}_toggleMediaOverlay(t){var e,o;this._mediaElement&&(t?(a(this._mediaElement,{overlay:`${y.overlayAssetBottom3}`}),this._mediaElement.style.setProperty("--ds-media-overlay-zindex",`${this._overlayContentZIndex}`),null==(e=this._umpControlBar)||e.setAttribute("tabindex","-1")):(l(this._mediaElement,["overlay"]),this._mediaElement.style.removeProperty("--ds-media-overlay-zindex"),null==(o=this._umpControlBar)||o.removeAttribute("tabindex")))}_toggleButtonGroup(t){this._toggleButtonsContainer&&this._toggleButtonsContainer.classList.toggle("hidden",!t)}_updateUMPVideoElementStyle(){if(!this._umpElement)return;const t="rtl"===this.dir,e=V();if(this._overlayContentZIndex=this._umpVideoBigPlayButton?10:11,this._umpVideoBigPlayButton){if(e){const e=`top: 40px; ${t?" right: 40px; left: revert; transform: translate(50%, -50%)":"left: 40px;"} `;this._umpVideoBigPlayButton.setAttribute("style",e)}else this._viewportResizeObserver.isXsmall()?this._umpVideoBigPlayButton.setAttribute("style","transform: translate(-50%, -50%);"):this._umpVideoBigPlayButton.removeAttribute("style");if(!this._styleInjected&&this._umpVideoBigPlayButton.shadowRoot){const t=document.createElement("style");t.textContent=`\n        button {\n          padding: var(--ds-big-play-button-padding) !important;\n          width: var(--ds-big-play-button-width) !important;\n          height: var(--ds-big-play-button-height) !important;\n          border: var(--ds-big-play-button-border) !important;\n        }\n        button:focus, button:focus-visible {\n          ${B}\n        }\n        svg {\n          width: var(--ds-big-play-button-icon-width) !important;\n          height: var(--ds-big-play-button-icon-height) !important;\n        }\n      `,this._umpVideoBigPlayButton.shadowRoot.append(t),this._styleInjected=!0}}}_observeUMPState(){!this._umpElement||!this._umpControlElement||(this._cleanupMutationObserver(),this._mutationObserver=new MutationObserver(t=>{var e;for(const o of t){if("attributes"===o.type&&"class"===o.attributeName){const t=null==(e=this._umpControlElement)?void 0:e.classList.contains("hidden");this._toggleButtonGroup(!t)}"childList"===o.type&&o.removedNodes.length>0&&(this._getUMPElements(),o.removedNodes.forEach(t=>{var e;t.nodeType===Node.ELEMENT_NODE&&t.nodeName.toLowerCase()===D&&(this._overlayContentZIndex=11,null==(e=this._mediaElement)||e.style.setProperty("--ds-media-overlay-zindex",`${this._overlayContentZIndex}`))}))}}),this._mutationObserver.observe(this._umpControlElement,{attributes:!0,childList:!0,attributeOldValue:!0}))}_cleanupMutationObserver(){this._mutationObserver&&(this._mutationObserver.disconnect(),this._mutationObserver=void 0)}_renderOverlayToggleButton(){return u`
      <store-button
        icon-only
        button-label="${this._toggleUpButtonAriaLabel}"
        button-title="${h(this._toggleUpButtonTitle)}"
        shape="rounded"
        appearance=${f.buttonPrimary}
        class="toggle-button-up hidden"
      >
        <store-icon
          icon="chevron-up"
          slot="button__icon"
          role="presentation"
          aria-hidden="true"
          size="medium"
        ></store-icon>
      </store-button>
      <store-button
        shape="rounded"
        icon-only
        button-label="${this._toggleDownButtonAriaLabel}"
        button-title="${h(this._toggleDownButtonTitle)}"
        appearance=${f.buttonPrimary}
        class="toggle-button-down"
      >
        <store-icon
          icon="chevron-down"
          slot="button__icon"
          role="presentation"
          aria-hidden="true"
          size="medium"
        ></store-icon>
      </store-button>
    `}_renderDefaultTemplate(){return u`
      <slot name="media" @slotchange="${this._mediaSlotChange}"></slot>
      <div
        class="overlay-content-container"
        part="overlay-content-container"
        style="${this._overlayContentSlotEmpty?"display: none;":""}"
      >
        <div class="toggle-button-container">${this._renderOverlayToggleButton()}</div>
        <slot
          name="overlay-content"
          class="overlay-content"
          @slotchange=${this._overlayContentSlotChange}
        ></slot>
      </div>
    `}_renderBlade(){return u` ${this._renderDefaultTemplate()} `}render(){return this.renderUiShell(this._renderBlade())}disconnectedCallback(){super.disconnectedCallback(),this._removeAllEvents(),this._cleanupMutationObserver()}};var Z,X,F;G.styles=[...(Z=G,X=G,F="styles",N(I(Z),F,X)||[]),$,L],H([o({slot:"overlay-content"})],G.prototype,"_overlayContentSlot",2),H([o({slot:"media"})],G.prototype,"_mediaSlot",2),H([n(".toggle-button-up")],G.prototype,"_toggleButtonUp",2),H([n(".toggle-button-down")],G.prototype,"_toggleButtonDown",2),H([n(".overlay-content-container")],G.prototype,"_overlayContentContainer",2),H([n(".overlay-content")],G.prototype,"_overlayContentElement",2),H([n(".toggle-button-container")],G.prototype,"_toggleButtonsContainer",2),H([i()],G.prototype,"_overlayContentSlotEmpty",2),H([i()],G.prototype,"_mediaSlotEmpty",2),H([s({type:String,reflect:!0,attribute:"toggle-down-button-aria-label"})],G.prototype,"_toggleDownButtonAriaLabel",2),H([s({type:String,reflect:!0,attribute:"toggle-down-button-title"})],G.prototype,"_toggleDownButtonTitle",2),H([s({type:String,reflect:!0,attribute:"toggle-up-button-aria-label"})],G.prototype,"_toggleUpButtonAriaLabel",2),H([s({type:String,reflect:!0,attribute:"toggle-up-button-title"})],G.prototype,"_toggleUpButtonTitle",2),G=H([v(q)],G);export{P as C,S as I,O as L,G as M,x as a,V as b,q as n};
