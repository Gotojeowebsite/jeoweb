import{L as t,_ as i,B as e,b as o,y as s,I as r,J as n,e as l,c as a,n as h,d as p}from"./tag.const-v1.42.0.js";import{s as c}from"./link.styles-v1.42.0.js";import{W as u}from"./i18nMixin-v1.42.0.js";import{d,h as _}from"./util1-v1.42.0.js";import"./util7-v1.42.0.js";const y={left:"left",right:"right"},g="left",b="right",f="up",k="down",m={default:"default",stacked:"stacked"};var S=Object.defineProperty,M=Object.getOwnPropertyDescriptor,v=(t,i,e,o)=>{for(var s,r=o>1?void 0:o?M(i,e):i,n=t.length-1;n>=0;n--)(s=t[n])&&(r=(o?s(i,e,r):s(r))||r);return o&&r&&S(i,e,r),r};const $="store-link";let w=class extends(t(i(e(u)))){constructor(){super(...arguments),this._firstSlotEmpty=!0,this._lastSlotEmpty=!0,this._assetSlotEmpty=!0,this._lightDOMEvents=[],this.lightDOM=!1,this.withButton=!1,this.iconPosition=y.left,this.withMedia=!1,this.withBadge=!1,this.mediaPosition=g,this.iconDirection=b,this.asButton=!1,this.configuration=m.default,this.linkLabel=null}_handleSlotChange(){this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length,this._assetSlotEmpty=0===this._assetSlot.length}_renderOptionalSlot(t,i){return o`
      <div part=${t} class=${t} style="${i?"display: none;":""}">
        <slot name=${t} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}_getIconType(){return this.buttonIcon?this.buttonIcon:this.iconDirection===f||this.iconDirection===k?`chevron-${this.iconDirection}`:`chevron-${"rtl"===this.dir?y.left:y.right}`}_getIconMarkup(t){return this.withButton?o` <store-button
          size="small"
          appearance="button--primary"
          element="div"
          shape="rounded"
          icon-only
          tabindex="-1"
          fill-color=${s(this.textColor)}
        >
          <store-icon icon="${t}" slot="button__icon"></store-icon>
        </store-button>`:""}_getTextMarkup(){return o`
      <div part="link__text" class="link__text">
        <slot name="link__text"></slot>
      </div>
    `}_buildLinkMarkup(){const t=this._getIconType(),i=this._getIconMarkup(t),e=this._getTextMarkup();return o`
      ${this._renderOptionalSlot("link__first",this._firstSlotEmpty)}
      ${this.iconPosition===y.right?o`${e} ${i}`:o`${i} ${e}`}
      ${this._renderOptionalSlot("link__last",this._lastSlotEmpty)}
    `}_renderSlotableMarkup(){const t=this._getTextMarkup();return o` ${this._renderOptionalSlot("link__asset",this._assetSlotEmpty)} ${t}`}firstUpdated(t){if(super.firstUpdated(t),this.lightDOM&&this.withButton){const t=this.querySelector("a");t&&(this._lightDOMEvents.push({el:this,type:"click",handler:i=>{i.target!==t&&!t.contains(i.target)&&t.click()}}),r(this._lightDOMEvents))}}render(){this.ariaLabel=this.linkLabel;const t=this.configuration===m.stacked||this.withMedia||this.withBadge;return d(this)?(this.lightDOM=!0,o`
        ${t?this._renderSlotableMarkup():null} ${this._buildLinkMarkup()}
        <slot @slotchange=${t=>_(t,this)}></slot>
      `):t?this.renderLink(o`${this._renderSlotableMarkup()}`):this.asButton?this.renderButton(o`${this._buildLinkMarkup()}`):this.renderLink(o`${this._buildLinkMarkup()}`)}updated(t){super.updated(t),this.withMedia?(this.removeAttribute("icon-position"),this.removeAttribute("icon-direction")):this.removeAttribute("media-position"),this.withMedia&&0===this._linkTextSlot.length&&!this.lightDOM&&(this.removeAttribute("configuration"),this.removeAttribute("media-position"))}disconnectedCallback(){super.disconnectedCallback(),n(this._lightDOMEvents)}};w.styles=[c],v([l({slot:"link__first"})],w.prototype,"_firstSlot",2),v([l({slot:"link__last"})],w.prototype,"_lastSlot",2),v([l({slot:"link__asset"})],w.prototype,"_assetSlot",2),v([l({slot:"link__text"})],w.prototype,"_linkTextSlot",2),v([a()],w.prototype,"_firstSlotEmpty",2),v([a()],w.prototype,"_lastSlotEmpty",2),v([a()],w.prototype,"_assetSlotEmpty",2),v([h({type:Boolean,reflect:!0,attribute:"light-dom"})],w.prototype,"lightDOM",2),v([h({type:Boolean,reflect:!0,attribute:"with-button"})],w.prototype,"withButton",2),v([h({type:String,reflect:!0,attribute:"icon-position"})],w.prototype,"iconPosition",2),v([h({type:Boolean,reflect:!0,attribute:"with-media"})],w.prototype,"withMedia",2),v([h({type:Boolean,reflect:!0,attribute:"with-badge"})],w.prototype,"withBadge",2),v([h({type:String,reflect:!0,attribute:"media-position"})],w.prototype,"mediaPosition",2),v([h({type:String,reflect:!0,attribute:"icon-direction"})],w.prototype,"iconDirection",2),v([h({type:String,reflect:!0,attribute:"button-icon"})],w.prototype,"buttonIcon",2),v([h({type:Boolean,reflect:!0,attribute:"as-button"})],w.prototype,"asButton",2),v([h({type:String,reflect:!0,attribute:"configuration"})],w.prototype,"configuration",2),v([h({reflect:!0,attribute:"link-label"})],w.prototype,"linkLabel",2),v([h({type:String,reflect:!0})],w.prototype,"theme",2),w=v([p($)],w);export{w as L,y as a,m as b,$ as n};
