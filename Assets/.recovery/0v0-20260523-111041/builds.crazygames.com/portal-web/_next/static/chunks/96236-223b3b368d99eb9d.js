!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e._sentryModuleMetadata=e._sentryModuleMetadata||{},e._sentryModuleMetadata[(new e.Error).stack]=function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];if(null!=n)for(var r in n)n.hasOwnProperty(r)&&(e[r]=n[r])}return e}({},e._sentryModuleMetadata[(new e.Error).stack],{"_sentryBundlerPluginAppKey:crazygames-portal":!0});var t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="ebe15881-45ae-4a87-907b-12cf0aaf9d9e",e._sentryDebugIdIdentifier="sentry-dbid-ebe15881-45ae-4a87-907b-12cf0aaf9d9e")}catch(e){}}();"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[96236],{8763:(e,t,n)=>{n.d(t,{E:()=>l,A:()=>a});var r=n(14232);let i={},o=[];class l{constructor(){this.currentId=null,this.clear=()=>{null!==this.currentId&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new l}start(e,t){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,t()},e)}}function a(){var e;let t=function(e,t){let n=r.useRef(i);return n.current===i&&(n.current=e(void 0)),n}(l.create).current;return e=t.disposeEffect,r.useEffect(e,o),t}},57790:(e,t,n)=>{n.d(t,{A:()=>r});let r=n(7061).A},63487:(e,t,n)=>{n.d(t,{A:()=>p});var r=n(14232),i=n(8763);let o=!0,l=!1,a=new i.E,u={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function s(e){e.metaKey||e.altKey||e.ctrlKey||(o=!0)}function c(){o=!1}function d(){"hidden"===this.visibilityState&&l&&(o=!0)}let p=function(){let e=r.useCallback(e=>{var t;null!=e&&((t=e.ownerDocument).addEventListener("keydown",s,!0),t.addEventListener("mousedown",c,!0),t.addEventListener("pointerdown",c,!0),t.addEventListener("touchstart",c,!0),t.addEventListener("visibilitychange",d,!0))},[]),t=r.useRef(!1);return{isFocusVisibleRef:t,onFocus:function(e){return!!function(e){let{target:t}=e;try{return t.matches(":focus-visible")}catch(e){}return o||function(e){let{type:t,tagName:n}=e;return"INPUT"===n&&!!u[t]&&!e.readOnly||"TEXTAREA"===n&&!e.readOnly||!!e.isContentEditable}(t)}(e)&&(t.current=!0,!0)},onBlur:function(){return!!t.current&&(l=!0,a.start(100,()=>{l=!1}),t.current=!1,!0)},ref:e}}},96236:(e,t,n)=>{n.d(t,{A:()=>F});var r=n(44501),i=n(40670),o=n(14232),l=n(69241),a=n(4697),u=n(42622),s=n(62285),c=n(5668),d=n(57790),p=n(63487),h=n(16724),f=n(4073);function m(e,t){var n=Object.create(null);return e&&o.Children.map(e,function(e){return e}).forEach(function(e){n[e.key]=t&&(0,o.isValidElement)(e)?t(e):e}),n}function b(e,t,n){return null!=n[t]?n[t]:e.props[t]}var v=Object.values||function(e){return Object.keys(e).map(function(t){return e[t]})},y=function(e){function t(t,n){var r=e.call(this,t,n)||this,i=r.handleExited.bind(function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(r));return r.state={contextValue:{isMounting:!0},handleExited:i,firstRender:!0},r}(0,h.A)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},n.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(e,t){var n,r,i=t.children,l=t.handleExited;return{children:t.firstRender?m(e.children,function(t){return(0,o.cloneElement)(t,{onExited:l.bind(null,t),in:!0,appear:b(t,"appear",e),enter:b(t,"enter",e),exit:b(t,"exit",e)})}):(Object.keys(r=function(e,t){function n(n){return n in t?t[n]:e[n]}e=e||{},t=t||{};var r,i=Object.create(null),o=[];for(var l in e)l in t?o.length&&(i[l]=o,o=[]):o.push(l);var a={};for(var u in t){if(i[u])for(r=0;r<i[u].length;r++){var s=i[u][r];a[i[u][r]]=n(s)}a[u]=n(u)}for(r=0;r<o.length;r++)a[o[r]]=n(o[r]);return a}(i,n=m(e.children))).forEach(function(t){var a=r[t];if((0,o.isValidElement)(a)){var u=t in i,s=t in n,c=i[t],d=(0,o.isValidElement)(c)&&!c.props.in;s&&(!u||d)?r[t]=(0,o.cloneElement)(a,{onExited:l.bind(null,a),in:!0,exit:b(a,"exit",e),enter:b(a,"enter",e)}):s||!u||d?s&&u&&(0,o.isValidElement)(c)&&(r[t]=(0,o.cloneElement)(a,{onExited:l.bind(null,a),in:c.props.in,exit:b(a,"exit",e),enter:b(a,"enter",e)})):r[t]=(0,o.cloneElement)(a,{in:!1})}}),r),firstRender:!1}},n.handleExited=function(e,t){var n=m(this.props.children);e.key in n||(e.props.onExited&&e.props.onExited(t),this.mounted&&this.setState(function(t){var n=(0,r.A)({},t.children);return delete n[e.key],{children:n}}))},n.render=function(){var e=this.props,t=e.component,n=e.childFactory,r=(0,i.A)(e,["component","childFactory"]),l=this.state.contextValue,a=v(this.state.children).map(n);return(delete r.appear,delete r.enter,delete r.exit,null===t)?o.createElement(f.A.Provider,{value:l},a):o.createElement(f.A.Provider,{value:l},o.createElement(t,r,a))},t}(o.Component);y.propTypes={},y.defaultProps={component:"div",childFactory:function(e){return e}};var g=n(38993),A=n(8763),E=n(37876),x=n(47951);let M=(0,x.A)("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),R=["center","classes","className"],w=e=>e,k,T,P,C,I=(0,g.i7)(k||(k=w`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)),V=(0,g.i7)(T||(T=w`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)),D=(0,g.i7)(P||(P=w`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)),L=(0,u.Ay)("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),$=(0,u.Ay)(function(e){let{className:t,classes:n,pulsate:r=!1,rippleX:i,rippleY:a,rippleSize:u,in:s,onExited:c,timeout:d}=e,[p,h]=o.useState(!1),f=(0,l.A)(t,n.ripple,n.rippleVisible,r&&n.ripplePulsate),m=(0,l.A)(n.child,p&&n.childLeaving,r&&n.childPulsate);return s||p||h(!0),o.useEffect(()=>{if(!s&&null!=c){let e=setTimeout(c,d);return()=>{clearTimeout(e)}}},[c,s,d]),(0,E.jsx)("span",{className:f,style:{width:u,height:u,top:-(u/2)+a,left:-(u/2)+i},children:(0,E.jsx)("span",{className:m})})},{name:"MuiTouchRipple",slot:"Ripple"})(C||(C=w`
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
`),M.rippleVisible,I,550,e=>{let{theme:t}=e;return t.transitions.easing.easeInOut},M.ripplePulsate,e=>{let{theme:t}=e;return t.transitions.duration.shorter},M.child,M.childLeaving,V,550,e=>{let{theme:t}=e;return t.transitions.easing.easeInOut},M.childPulsate,D,e=>{let{theme:t}=e;return t.transitions.easing.easeInOut}),S=o.forwardRef(function(e,t){let n=(0,s.A)({props:e,name:"MuiTouchRipple"}),{center:a=!1,classes:u={},className:c}=n,d=(0,i.A)(n,R),[p,h]=o.useState([]),f=o.useRef(0),m=o.useRef(null);o.useEffect(()=>{m.current&&(m.current(),m.current=null)},[p]);let b=o.useRef(!1),v=(0,A.A)(),g=o.useRef(null),x=o.useRef(null),w=o.useCallback(e=>{let{pulsate:t,rippleX:n,rippleY:r,rippleSize:i,cb:o}=e;h(e=>[...e,(0,E.jsx)($,{classes:{ripple:(0,l.A)(u.ripple,M.ripple),rippleVisible:(0,l.A)(u.rippleVisible,M.rippleVisible),ripplePulsate:(0,l.A)(u.ripplePulsate,M.ripplePulsate),child:(0,l.A)(u.child,M.child),childLeaving:(0,l.A)(u.childLeaving,M.childLeaving),childPulsate:(0,l.A)(u.childPulsate,M.childPulsate)},timeout:550,pulsate:t,rippleX:n,rippleY:r,rippleSize:i},f.current)]),f.current+=1,m.current=o},[u]),k=o.useCallback(function(){let e,t,n,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:()=>{},{pulsate:l=!1,center:u=a||i.pulsate,fakeElement:s=!1}=i;if((null==r?void 0:r.type)==="mousedown"&&b.current){b.current=!1;return}(null==r?void 0:r.type)==="touchstart"&&(b.current=!0);let c=s?null:x.current,d=c?c.getBoundingClientRect():{width:0,height:0,left:0,top:0};if(!u&&void 0!==r&&(0!==r.clientX||0!==r.clientY)&&(r.clientX||r.touches)){let{clientX:n,clientY:i}=r.touches&&r.touches.length>0?r.touches[0]:r;e=Math.round(n-d.left),t=Math.round(i-d.top)}else e=Math.round(d.width/2),t=Math.round(d.height/2);u?(n=Math.sqrt((2*d.width**2+d.height**2)/3))%2==0&&(n+=1):n=Math.sqrt((2*Math.max(Math.abs((c?c.clientWidth:0)-e),e)+2)**2+(2*Math.max(Math.abs((c?c.clientHeight:0)-t),t)+2)**2),null!=r&&r.touches?null===g.current&&(g.current=()=>{w({pulsate:l,rippleX:e,rippleY:t,rippleSize:n,cb:o})},v.start(80,()=>{g.current&&(g.current(),g.current=null)})):w({pulsate:l,rippleX:e,rippleY:t,rippleSize:n,cb:o})},[a,w,v]),T=o.useCallback(()=>{k({},{pulsate:!0})},[k]),P=o.useCallback((e,t)=>{if(v.clear(),(null==e?void 0:e.type)==="touchend"&&g.current){g.current(),g.current=null,v.start(0,()=>{P(e,t)});return}g.current=null,h(e=>e.length>0?e.slice(1):e),m.current=t},[v]);return o.useImperativeHandle(t,()=>({pulsate:T,start:k,stop:P}),[T,k,P]),(0,E.jsx)(L,(0,r.A)({className:(0,l.A)(M.root,u.root,c),ref:x},d,{children:(0,E.jsx)(y,{component:null,exit:!0,children:p})}))});var j=n(45879);function B(e){return(0,j.Ay)("MuiButtonBase",e)}let _=(0,x.A)("MuiButtonBase",["root","disabled","focusVisible"]),N=["action","centerRipple","children","className","component","disabled","disableRipple","disableTouchRipple","focusRipple","focusVisibleClassName","LinkComponent","onBlur","onClick","onContextMenu","onDragLeave","onFocus","onFocusVisible","onKeyDown","onKeyUp","onMouseDown","onMouseLeave","onMouseUp","onTouchEnd","onTouchMove","onTouchStart","tabIndex","TouchRippleProps","touchRippleRef","type"],O=(0,u.Ay)("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${_.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),F=o.forwardRef(function(e,t){let n=(0,s.A)({props:e,name:"MuiButtonBase"}),{action:u,centerRipple:h=!1,children:f,className:m,component:b="button",disabled:v=!1,disableRipple:y=!1,disableTouchRipple:g=!1,focusRipple:A=!1,LinkComponent:x="a",onBlur:M,onClick:R,onContextMenu:w,onDragLeave:k,onFocus:T,onFocusVisible:P,onKeyDown:C,onKeyUp:I,onMouseDown:V,onMouseLeave:D,onMouseUp:L,onTouchEnd:$,onTouchMove:j,onTouchStart:_,tabIndex:F=0,TouchRippleProps:K,touchRippleRef:z,type:U}=n,H=(0,i.A)(n,N),W=o.useRef(null),X=o.useRef(null),q=(0,c.A)(X,z),{isFocusVisibleRef:Y,onFocus:G,onBlur:J,ref:Q}=(0,p.A)(),[Z,ee]=o.useState(!1);v&&Z&&ee(!1),o.useImperativeHandle(u,()=>({focusVisible:()=>{ee(!0),W.current.focus()}}),[]);let[et,en]=o.useState(!1);o.useEffect(()=>{en(!0)},[]);let er=et&&!y&&!v;function ei(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:g;return(0,d.A)(r=>(t&&t(r),!n&&X.current&&X.current[e](r),!0))}o.useEffect(()=>{Z&&A&&!y&&et&&X.current.pulsate()},[y,A,Z,et]);let eo=ei("start",V),el=ei("stop",w),ea=ei("stop",k),eu=ei("stop",L),es=ei("stop",e=>{Z&&e.preventDefault(),D&&D(e)}),ec=ei("start",_),ed=ei("stop",$),ep=ei("stop",j),eh=ei("stop",e=>{J(e),!1===Y.current&&ee(!1),M&&M(e)},!1),ef=(0,d.A)(e=>{W.current||(W.current=e.currentTarget),G(e),!0===Y.current&&(ee(!0),P&&P(e)),T&&T(e)}),em=()=>{let e=W.current;return b&&"button"!==b&&!("A"===e.tagName&&e.href)},eb=o.useRef(!1),ev=(0,d.A)(e=>{A&&!eb.current&&Z&&X.current&&" "===e.key&&(eb.current=!0,X.current.stop(e,()=>{X.current.start(e)})),e.target===e.currentTarget&&em()&&" "===e.key&&e.preventDefault(),C&&C(e),e.target===e.currentTarget&&em()&&"Enter"===e.key&&!v&&(e.preventDefault(),R&&R(e))}),ey=(0,d.A)(e=>{A&&" "===e.key&&X.current&&Z&&!e.defaultPrevented&&(eb.current=!1,X.current.stop(e,()=>{X.current.pulsate(e)})),I&&I(e),R&&e.target===e.currentTarget&&em()&&" "===e.key&&!e.defaultPrevented&&R(e)}),eg=b;"button"===eg&&(H.href||H.to)&&(eg=x);let eA={};"button"===eg?(eA.type=void 0===U?"button":U,eA.disabled=v):(H.href||H.to||(eA.role="button"),v&&(eA["aria-disabled"]=v));let eE=(0,c.A)(t,Q,W),ex=(0,r.A)({},n,{centerRipple:h,component:b,disabled:v,disableRipple:y,disableTouchRipple:g,focusRipple:A,tabIndex:F,focusVisible:Z}),eM=(e=>{let{disabled:t,focusVisible:n,focusVisibleClassName:r,classes:i}=e,o=(0,a.A)({root:["root",t&&"disabled",n&&"focusVisible"]},B,i);return n&&r&&(o.root+=` ${r}`),o})(ex);return(0,E.jsxs)(O,(0,r.A)({as:eg,className:(0,l.A)(eM.root,m),ownerState:ex,onBlur:eh,onClick:R,onContextMenu:el,onFocus:ef,onKeyDown:ev,onKeyUp:ey,onMouseDown:eo,onMouseLeave:es,onMouseUp:eu,onDragLeave:ea,onTouchEnd:ed,onTouchMove:ep,onTouchStart:ec,ref:eE,tabIndex:v?-1:F,type:U},eA,H,{children:[f,er?(0,E.jsx)(S,(0,r.A)({ref:q,center:h},K)):null]}))})}}]);