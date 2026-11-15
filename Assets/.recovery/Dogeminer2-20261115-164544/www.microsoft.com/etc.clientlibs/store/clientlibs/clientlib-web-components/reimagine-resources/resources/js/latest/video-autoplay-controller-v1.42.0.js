import{i as t,r as e}from"./tag.const-v1.42.0.js";const s={d100:"100ms",d300:"300ms",d600:"600ms",d800:"800ms"},i={custom:"cubic-bezier(0.19, 1, 0.22, 1)"},a=s=>t`
    ${e(`transition: ${s};`)};

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  `,o=s=>t`
    ${e(`animation: ${s};`)}

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `,n=e=>t`
  .collapse {
    ${a(`var(--ds-transition-collapse, ${e})`)};
  }

  .collapse:not(.show) {
    display: none;
  }
`,r=t`
  ${a("var(--ds-transition-fade, opacity 0.15s linear)")};
`,d=100;class l{constructor(t,e={}){this._syncAttempts=0,this._autoplayStarted=!1,this._playPending=!1,this._host=t,this._canPlay=e.canPlay??(()=>!0),t.addController(this)}hostConnected(){this._syncAttempts=0,this._autoplayStarted=!1,this._observeVideoPlayer(),this.sync()}hostDisconnected(){var t;null==(t=this._videoObserver)||t.disconnect(),window.clearTimeout(this._syncTimeout),this._syncAttempts=0,this._autoplayStarted=!1,this._playPending=!1}sync(t=0){window.clearTimeout(this._syncTimeout),this._host.isConnected&&this._hasVideoPlayer()&&!this._autoplayStarted&&!(this._syncAttempts>=100)&&(this._syncTimeout=window.setTimeout(()=>{this._syncAutoplay().catch(()=>{this.sync(d)})},t))}_getAuthoredAutoplay(t){const e=t.closest("store-media-player"),s=[null==e?void 0:e.getAttribute("options"),t.getAttribute("options")];for(const t of s)if(t)try{const e=JSON.parse(t);if("boolean"==typeof e.autoplay)return e.autoplay}catch{}}_hasVideoPlayer(){return!!this._host.querySelector("store-media-player, universal-media-player")}_observeVideoPlayer(){var t;null==(t=this._videoObserver)||t.disconnect(),this._videoObserver=new MutationObserver(()=>{this._hasVideoPlayer()&&this.sync()}),this._videoObserver.observe(this._host,{attributes:!0,attributeFilter:["options"],childList:!0,subtree:!0})}async _syncAutoplay(){var t;if(!this._canPlay()||this._playPending)return;this._syncAttempts+=1;const e=this._host.querySelector("universal-media-player"),s=e?this._getAuthoredAutoplay(e):void 0;if(!e||void 0===s)return void this.sync(d);if(!s)return;const i=null==(t=e.shadowRoot)?void 0:t.querySelector("video");if(i)if(i.paused||i.ended){this._playPending=!0;try{await(e.play?e.play():i.play()),!i.paused&&!i.ended&&this._markAutoplayStarted()}finally{this._playPending=!1}this._autoplayStarted||this.sync(d)}else this._markAutoplayStarted();else this.sync(d)}_markAutoplayStarted(){var t;this._autoplayStarted=!0,null==(t=this._videoObserver)||t.disconnect(),window.clearTimeout(this._syncTimeout)}}export{s as D,i as T,l as V,o as a,n as c,r as f,a as t};
