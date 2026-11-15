import{r as t,i,n as e,b as n,d}from"./tag.const-v1.42.0.js";import{s as a}from"./container.styles-v1.42.0.js";import{b as s,v as o,p as r,S as l}from"./secondary-nav-item.const-v1.42.0.js";const h=i`
  @media (max-width: ${t(s(o.sm))}) {
    :host([mobile-fullwidth]) {
      --ds-container-width: 100%;
      --ds-container-max-width: none;
      --ds-container-padding-inline-start: 0;
      --ds-container-padding-inline-end: 0;
    }
  }

  @media (min-width: ${t(o.sm)}) {
    :host {
      --ds-container-padding-inline-start: ${t(r.sm.paddingInlineStart)};
      --ds-container-padding-inline-end: ${t(r.sm.paddingInlineEnd)};
    }
  }
  @media (min-width: ${t(o.md)}) {
    :host {
      --ds-container-max-width: 100vw;
      --ds-container-padding-inline-start: ${t(r.md.paddingInlineStart)};
      --ds-container-padding-inline-end: ${t(r.md.paddingInlineEnd)};
    }
  }
  @media (min-width: ${t(o.lg)}) {
    :host {
      --ds-container-width: 90%;
      --ds-container-box-size: content-box;
      --ds-container-padding-inline-start: ${t(r.lg.paddingInlineStart)};
      --ds-container-padding-inline-end: ${t(r.lg.paddingInlineEnd)};
      --ds-container-max-width: 1328px;
    }
  }
`;function c(){const t=function(){if(!(typeof window>"u"))return window.msauth}();if(!t)return{isSignedIn:!1,userType:""};const i=String(t.userType??t.Type??"").toLowerCase(),e=String(t.AuthTicketEx??""),n=String(t.AuthTicket??""),d=String(t.Cid??""),a=String(t.EmailAddress??"");return{authTicket:n||void 0,authTicketEx:e||void 0,isSignedIn:!!(d||a||n||e),userType:i}}function u(){const t={},{authTicket:i,authTicketEx:e,userType:n}=c();return"aad"===n&&e?(t.Authorization=`Bearer ${e}`,t):(i&&(t.compactTicket=i),t)}var p=Object.defineProperty,g=Object.getOwnPropertyDescriptor,m=(t,i,e,n)=>{for(var d,a=n>1?void 0:n?g(i,e):i,s=t.length-1;s>=0;s--)(d=t[s])&&(a=(n?d(i,e,a):d(a))||a);return n&&a&&p(i,e,a),a};const b="store-container";let y=class extends l{constructor(){super(...arguments),this.fullWidth=!1,this.mobileFullwidth=!1,this.hideOnSignedIn=!1,this.hideOnSignedOut=!1,this._boundUpdateAuthVisibility=()=>this._updateAuthVisibility()}_updateAuthVisibility(){const{isSignedIn:t}=c(),i=this.hideOnSignedIn&&t||this.hideOnSignedOut&&!t;this.hidden!==i&&(this.hidden=i)}connectedCallback(){super.connectedCallback(),this._updateAuthVisibility(),"loading"===document.readyState&&document.addEventListener("DOMContentLoaded",this._boundUpdateAuthVisibility,{once:!0}),"complete"!==document.readyState&&window.addEventListener("load",this._boundUpdateAuthVisibility,{once:!0})}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("DOMContentLoaded",this._boundUpdateAuthVisibility),window.removeEventListener("load",this._boundUpdateAuthVisibility)}updated(t){super.updated(t),(t.has("hideOnSignedIn")||t.has("hideOnSignedOut"))&&this._updateAuthVisibility()}render(){return n`<slot></slot>`}};y.styles=[a,h],m([e({type:Boolean,reflect:!0,attribute:"full-width"})],y.prototype,"fullWidth",2),m([e({type:Boolean,reflect:!0,attribute:"mobile-fullwidth"})],y.prototype,"mobileFullwidth",2),m([e({type:Boolean,reflect:!0,attribute:"hide-on-signed-in"})],y.prototype,"hideOnSignedIn",2),m([e({type:Boolean,reflect:!0,attribute:"hide-on-signed-out"})],y.prototype,"hideOnSignedOut",2),y=m([d(b)],y);export{y as C,u as g,b as n};
