import{c as t,b as o,n as l,e as s,d as r}from"../../../tag.const-v1.42.0.js";import{S as e}from"../../../secondary-nav-item.const-v1.42.0.js";var a=Object.defineProperty,n=Object.getOwnPropertyDescriptor,i=(t,o,l,s)=>{for(var r,e=s>1?void 0:s?n(o,l):o,i=t.length-1;i>=0;i--)(r=t[i])&&(e=(s?r(o,l,e):r(e))||e);return s&&e&&a(o,l,e),e};const p="store-layout-column";let y=class extends e{constructor(){super(...arguments),this._firstSlotEmpty=!0,this._lastSlotEmpty=!0}_handleSlotChange(){this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length}_renderOptionalSlot(t,l){return o`
      <div part=${t} class=${t} style="${l?"display: none;":""}">
        <slot name=${t} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}render(){return o`
      ${this._renderOptionalSlot("layout-column__first",this._firstSlotEmpty)}
      <slot></slot>
      ${this._renderOptionalSlot("layout-column__last",this._lastSlotEmpty)}
    `}};i([l({type:String,reflect:!0,attribute:"column-span"})],y.prototype,"columnSpan",2),i([s({slot:"layout-column__first"})],y.prototype,"_firstSlot",2),i([s({slot:"layout-column__last"})],y.prototype,"_lastSlot",2),i([t()],y.prototype,"_firstSlotEmpty",2),i([t()],y.prototype,"_lastSlotEmpty",2),y=i([r(p)],y);export{y as LayoutColumn,p as name};
