!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e._sentryModuleMetadata=e._sentryModuleMetadata||{},e._sentryModuleMetadata[(new e.Error).stack]=function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];if(null!=n)for(var r in n)n.hasOwnProperty(r)&&(e[r]=n[r])}return e}({},e._sentryModuleMetadata[(new e.Error).stack],{"_sentryBundlerPluginAppKey:crazygames-portal":!0});var t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="9adb3b7a-452e-4356-9790-64dbb28d4d51",e._sentryDebugIdIdentifier="sentry-dbid-9adb3b7a-452e-4356-9790-64dbb28d4d51")}catch(e){}}();"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[47465],{27598:(e,t,n)=>{n.d(t,{E:()=>l,A:()=>a});var r=n(96540);let i={},o=[];class l{constructor(){this.currentId=null,this.clear=()=>{null!==this.currentId&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new l}start(e,t){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,t()},e)}}function a(){var e;let t=function(e,t){let n=r.useRef(i);return n.current===i&&(n.current=e(void 0)),n}(l.create).current;return e=t.disposeEffect,r.useEffect(e,o),t}},47465:(e,t,n)=>{n.d(t,{A:()=>B});var r=n(58168),i=n(98587),o=n(96540),l=n(34164),a=n(75659),u=n(50752),s=n(50285),c=n(26748),d=n(66946),p=n(72070),h=n(16543),f=n(17437),m=n(27598),b=n(74848),v=n(38413);let y=(0,v.A)("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),g=["center","classes","className"],A=e=>e,E,x,M,R,w=(0,f.i7)(E||(E=A`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)),k=(0,f.i7)(x||(x=A`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)),T=(0,f.i7)(M||(M=A`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)),P=(0,u.Ay)("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),C=(0,u.Ay)(function(e){let{className:t,classes:n,pulsate:r=!1,rippleX:i,rippleY:a,rippleSize:u,in:s,onExited:c,timeout:d}=e,[p,h]=o.useState(!1),f=(0,l.A)(t,n.ripple,n.rippleVisible,r&&n.ripplePulsate),m=(0,l.A)(n.child,p&&n.childLeaving,r&&n.childPulsate);return s||p||h(!0),o.useEffect(()=>{if(!s&&null!=c){let e=setTimeout(c,d);return()=>{clearTimeout(e)}}},[c,s,d]),(0,b.jsx)("span",{className:f,style:{width:u,height:u,top:-(u/2)+a,left:-(u/2)+i},children:(0,b.jsx)("span",{className:m})})},{name:"MuiTouchRipple",slot:"Ripple"})(R||(R=A`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`),y.rippleVisible,w,550,e=>{let{theme:t}=e;return t.transitions.easing.easeInOut},y.ripplePulsate,e=>{let{theme:t}=e;return t.transitions.duration.shorter},y.child,y.childLeaving,k,550,e=>{let{theme:t}=e;return t.transitions.easing.easeInOut},y.childPulsate,T,e=>{let{theme:t}=e;return t.transitions.easing.easeInOut}),I=o.forwardRef(function(e,t){let n=(0,s.A)({props:e,name:"MuiTouchRipple"}),{center:a=!1,classes:u={},className:c}=n,d=(0,i.A)(n,g),[p,f]=o.useState([]),v=o.useRef(0),A=o.useRef(null);o.useEffect(()=>{A.current&&(A.current(),A.current=null)},[p]);let E=o.useRef(!1),x=(0,m.A)(),M=o.useRef(null),R=o.useRef(null),w=o.useCallback(e=>{let{pulsate:t,rippleX:n,rippleY:r,rippleSize:i,cb:o}=e;f(e=>[...e,(0,b.jsx)(C,{classes:{ripple:(0,l.A)(u.ripple,y.ripple),rippleVisible:(0,l.A)(u.rippleVisible,y.rippleVisible),ripplePulsate:(0,l.A)(u.ripplePulsate,y.ripplePulsate),child:(0,l.A)(u.child,y.child),childLeaving:(0,l.A)(u.childLeaving,y.childLeaving),childPulsate:(0,l.A)(u.childPulsate,y.childPulsate)},timeout:550,pulsate:t,rippleX:n,rippleY:r,rippleSize:i},v.current)]),v.current+=1,A.current=o},[u]),k=o.useCallback(function(){let e,t,n,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:()=>{},{pulsate:l=!1,center:u=a||i.pulsate,fakeElement:s=!1}=i;if((null==r?void 0:r.type)==="mousedown"&&E.current){E.current=!1;return}(null==r?void 0:r.type)==="touchstart"&&(E.current=!0);let c=s?null:R.current,d=c?c.getBoundingClientRect():{width:0,height:0,left:0,top:0};if(!u&&void 0!==r&&(0!==r.clientX||0!==r.clientY)&&(r.clientX||r.touches)){let{clientX:n,clientY:i}=r.touches&&r.touches.length>0?r.touches[0]:r;e=Math.round(n-d.left),t=Math.round(i-d.top)}else e=Math.round(d.width/2),t=Math.round(d.height/2);u?(n=Math.sqrt((2*d.width**2+d.height**2)/3))%2==0&&(n+=1):n=Math.sqrt((2*Math.max(Math.abs((c?c.clientWidth:0)-e),e)+2)**2+(2*Math.max(Math.abs((c?c.clientHeight:0)-t),t)+2)**2),null!=r&&r.touches?null===M.current&&(M.current=()=>{w({pulsate:l,rippleX:e,rippleY:t,rippleSize:n,cb:o})},x.start(80,()=>{M.current&&(M.current(),M.current=null)})):w({pulsate:l,rippleX:e,rippleY:t,rippleSize:n,cb:o})},[a,w,x]),T=o.useCallback(()=>{k({},{pulsate:!0})},[k]),I=o.useCallback((e,t)=>{if(x.clear(),(null==e?void 0:e.type)==="touchend"&&M.current){M.current(),M.current=null,x.start(0,()=>{I(e,t)});return}M.current=null,f(e=>e.length>0?e.slice(1):e),A.current=t},[x]);return o.useImperativeHandle(t,()=>({pulsate:T,start:k,stop:I}),[T,k,I]),(0,b.jsx)(P,(0,r.A)({className:(0,l.A)(y.root,u.root,c),ref:R},d,{children:(0,b.jsx)(h.A,{component:null,exit:!0,children:p})}))});var V=n(31609);function D(e){return(0,V.Ay)("MuiButtonBase",e)}let L=(0,v.A)("MuiButtonBase",["root","disabled","focusVisible"]),$=["action","centerRipple","children","className","component","disabled","disableRipple","disableTouchRipple","focusRipple","focusVisibleClassName","LinkComponent","onBlur","onClick","onContextMenu","onDragLeave","onFocus","onFocusVisible","onKeyDown","onKeyUp","onMouseDown","onMouseLeave","onMouseUp","onTouchEnd","onTouchMove","onTouchStart","tabIndex","TouchRippleProps","touchRippleRef","type"],S=e=>{let{disabled:t,focusVisible:n,focusVisibleClassName:r,classes:i}=e,o=(0,a.A)({root:["root",t&&"disabled",n&&"focusVisible"]},D,i);return n&&r&&(o.root+=` ${r}`),o},j=(0,u.Ay)("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${L.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),B=o.forwardRef(function(e,t){let n=(0,s.A)({props:e,name:"MuiButtonBase"}),{action:a,centerRipple:u=!1,children:h,className:f,component:m="button",disabled:v=!1,disableRipple:y=!1,disableTouchRipple:g=!1,focusRipple:A=!1,LinkComponent:E="a",onBlur:x,onClick:M,onContextMenu:R,onDragLeave:w,onFocus:k,onFocusVisible:T,onKeyDown:P,onKeyUp:C,onMouseDown:V,onMouseLeave:D,onMouseUp:L,onTouchEnd:B,onTouchMove:_,onTouchStart:N,tabIndex:O=0,TouchRippleProps:F,touchRippleRef:K,type:z}=n,U=(0,i.A)(n,$),H=o.useRef(null),W=o.useRef(null),X=(0,c.A)(W,K),{isFocusVisibleRef:q,onFocus:Y,onBlur:G,ref:J}=(0,p.A)(),[Q,Z]=o.useState(!1);v&&Q&&Z(!1),o.useImperativeHandle(a,()=>({focusVisible:()=>{Z(!0),H.current.focus()}}),[]);let[ee,et]=o.useState(!1);o.useEffect(()=>{et(!0)},[]);let en=ee&&!y&&!v;function er(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:g;return(0,d.A)(r=>(t&&t(r),!n&&W.current&&W.current[e](r),!0))}o.useEffect(()=>{Q&&A&&!y&&ee&&W.current.pulsate()},[y,A,Q,ee]);let ei=er("start",V),eo=er("stop",R),el=er("stop",w),ea=er("stop",L),eu=er("stop",e=>{Q&&e.preventDefault(),D&&D(e)}),es=er("start",N),ec=er("stop",B),ed=er("stop",_),ep=er("stop",e=>{G(e),!1===q.current&&Z(!1),x&&x(e)},!1),eh=(0,d.A)(e=>{H.current||(H.current=e.currentTarget),Y(e),!0===q.current&&(Z(!0),T&&T(e)),k&&k(e)}),ef=()=>{let e=H.current;return m&&"button"!==m&&!("A"===e.tagName&&e.href)},em=o.useRef(!1),eb=(0,d.A)(e=>{A&&!em.current&&Q&&W.current&&" "===e.key&&(em.current=!0,W.current.stop(e,()=>{W.current.start(e)})),e.target===e.currentTarget&&ef()&&" "===e.key&&e.preventDefault(),P&&P(e),e.target===e.currentTarget&&ef()&&"Enter"===e.key&&!v&&(e.preventDefault(),M&&M(e))}),ev=(0,d.A)(e=>{A&&" "===e.key&&W.current&&Q&&!e.defaultPrevented&&(em.current=!1,W.current.stop(e,()=>{W.current.pulsate(e)})),C&&C(e),M&&e.target===e.currentTarget&&ef()&&" "===e.key&&!e.defaultPrevented&&M(e)}),ey=m;"button"===ey&&(U.href||U.to)&&(ey=E);let eg={};"button"===ey?(eg.type=void 0===z?"button":z,eg.disabled=v):(U.href||U.to||(eg.role="button"),v&&(eg["aria-disabled"]=v));let eA=(0,c.A)(t,J,H),eE=(0,r.A)({},n,{centerRipple:u,component:m,disabled:v,disableRipple:y,disableTouchRipple:g,focusRipple:A,tabIndex:O,focusVisible:Q}),ex=S(eE);return(0,b.jsxs)(j,(0,r.A)({as:ey,className:(0,l.A)(ex.root,f),ownerState:eE,onBlur:ep,onClick:M,onContextMenu:eo,onFocus:eh,onKeyDown:eb,onKeyUp:ev,onMouseDown:ei,onMouseLeave:eu,onMouseUp:ea,onDragLeave:el,onTouchEnd:ec,onTouchMove:ed,onTouchStart:es,ref:eA,tabIndex:v?-1:O,type:z},eg,U,{children:[h,en?(0,b.jsx)(I,(0,r.A)({ref:X,center:u},F)):null]}))})},66946:(e,t,n)=>{n.d(t,{A:()=>r});let r=n(71547).A},72070:(e,t,n)=>{n.d(t,{A:()=>p});var r=n(96540),i=n(27598);let o=!0,l=!1,a=new i.E,u={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function s(e){e.metaKey||e.altKey||e.ctrlKey||(o=!0)}function c(){o=!1}function d(){"hidden"===this.visibilityState&&l&&(o=!0)}let p=function(){let e=r.useCallback(e=>{if(null!=e){var t;(t=e.ownerDocument).addEventListener("keydown",s,!0),t.addEventListener("mousedown",c,!0),t.addEventListener("pointerdown",c,!0),t.addEventListener("touchstart",c,!0),t.addEventListener("visibilitychange",d,!0)}},[]),t=r.useRef(!1);return{isFocusVisibleRef:t,onFocus:function(e){return!!function(e){let{target:t}=e;try{return t.matches(":focus-visible")}catch(e){}return o||function(e){let{type:t,tagName:n}=e;return"INPUT"===n&&!!u[t]&&!e.readOnly||"TEXTAREA"===n&&!e.readOnly||!!e.isContentEditable}(t)}(e)&&(t.current=!0,!0)},onBlur:function(){return!!t.current&&(l=!0,a.start(100,()=>{l=!1}),t.current=!1,!0)},ref:e}}},16543:(e,t,n)=>{n.d(t,{A:()=>p});var r=n(98587),i=n(58168),o=n(42892),l=n(96540),a=n(17241);function u(e,t){var n=Object.create(null);return e&&l.Children.map(e,function(e){return e}).forEach(function(e){n[e.key]=t&&(0,l.isValidElement)(e)?t(e):e}),n}function s(e,t,n){return null!=n[t]?n[t]:e.props[t]}var c=Object.values||function(e){return Object.keys(e).map(function(t){return e[t]})},d=function(e){function t(t,n){var r,i=(r=e.call(this,t,n)||this).handleExited.bind(function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(r));return r.state={contextValue:{isMounting:!0},handleExited:i,firstRender:!0},r}(0,o.A)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},n.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(e,t){var n,r,i=t.children,o=t.handleExited;return{children:t.firstRender?u(e.children,function(t){return(0,l.cloneElement)(t,{onExited:o.bind(null,t),in:!0,appear:s(t,"appear",e),enter:s(t,"enter",e),exit:s(t,"exit",e)})}):(Object.keys(r=function(e,t){function n(n){return n in t?t[n]:e[n]}e=e||{},t=t||{};var r,i=Object.create(null),o=[];for(var l in e)l in t?o.length&&(i[l]=o,o=[]):o.push(l);var a={};for(var u in t){if(i[u])for(r=0;r<i[u].length;r++){var s=i[u][r];a[i[u][r]]=n(s)}a[u]=n(u)}for(r=0;r<o.length;r++)a[o[r]]=n(o[r]);return a}(i,n=u(e.children))).forEach(function(t){var a=r[t];if((0,l.isValidElement)(a)){var u=t in i,c=t in n,d=i[t],p=(0,l.isValidElement)(d)&&!d.props.in;c&&(!u||p)?r[t]=(0,l.cloneElement)(a,{onExited:o.bind(null,a),in:!0,exit:s(a,"exit",e),enter:s(a,"enter",e)}):c||!u||p?c&&u&&(0,l.isValidElement)(d)&&(r[t]=(0,l.cloneElement)(a,{onExited:o.bind(null,a),in:d.props.in,exit:s(a,"exit",e),enter:s(a,"enter",e)})):r[t]=(0,l.cloneElement)(a,{in:!1})}}),r),firstRender:!1}},n.handleExited=function(e,t){var n=u(this.props.children);e.key in n||(e.props.onExited&&e.props.onExited(t),this.mounted&&this.setState(function(t){var n=(0,i.A)({},t.children);return delete n[e.key],{children:n}}))},n.render=function(){var e=this.props,t=e.component,n=e.childFactory,i=(0,r.A)(e,["component","childFactory"]),o=this.state.contextValue,u=c(this.state.children).map(n);return(delete i.appear,delete i.enter,delete i.exit,null===t)?l.createElement(a.A.Provider,{value:o},u):l.createElement(a.A.Provider,{value:o},l.createElement(t,i,u))},t}(l.Component);d.propTypes={},d.defaultProps={component:"div",childFactory:function(e){return e}};let p=d}}]);