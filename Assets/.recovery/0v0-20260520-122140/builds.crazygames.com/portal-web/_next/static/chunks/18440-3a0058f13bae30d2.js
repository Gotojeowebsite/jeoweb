!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e._sentryModuleMetadata=e._sentryModuleMetadata||{},e._sentryModuleMetadata[(new e.Error).stack]=function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];if(null!=r)for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n])}return e}({},e._sentryModuleMetadata[(new e.Error).stack],{"_sentryBundlerPluginAppKey:crazygames-portal":!0});var t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="c2378acb-cb72-472a-b865-914e813b15e5",e._sentryDebugIdIdentifier="sentry-dbid-c2378acb-cb72-472a-b865-914e813b15e5")}catch(e){}}();"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[18440],{4319:(e,t,r)=>{r.d(t,{eh:()=>n});let n=e=>(t,r,n)=>{let a=n.subscribe;return n.subscribe=(e,t,r)=>{let i=e;if(t){let a=(null==r?void 0:r.equalityFn)||Object.is,o=e(n.getState());i=r=>{let n=e(r);if(!a(o,n)){let e=o;t(o=n,e)}},(null==r?void 0:r.fireImmediately)&&t(o,o)}return a(i)},e(t,r,n)}},6995:(e,t,r)=>{r.d(t,{A:()=>u});var n,a=r(14232),i=r(99659),o=r(61401),l=r(11601);let s=(n||(n=r.t(a,2))).useSyncExternalStore;function u(e,t={}){let r=(0,l.A)(),n="undefined"!=typeof window&&void 0!==window.matchMedia,{defaultMatches:d=!1,matchMedia:h=n?window.matchMedia:null,ssrMatchMedia:c=null,noSsr:f=!1}=(0,o.A)({name:"MuiUseMediaQuery",props:t,theme:r}),b="function"==typeof e?e(r):e;return(void 0!==s?function(e,t,r,n,i){let o=a.useCallback(()=>t,[t]),l=a.useMemo(()=>{if(i&&r)return()=>r(e).matches;if(null!==n){let{matches:t}=n(e);return()=>t}return o},[o,e,n,i,r]),[u,d]=a.useMemo(()=>{if(null===r)return[o,()=>()=>{}];let t=r(e);return[()=>t.matches,e=>(t.addListener(e),()=>{t.removeListener(e)})]},[o,r,e]);return s(d,u,l)}:function(e,t,r,n,o){let[l,s]=a.useState(()=>o&&r?r(e).matches:n?n(e).matches:t);return(0,i.A)(()=>{let t=!0;if(!r)return;let n=r(e),a=()=>{t&&s(n.matches)};return a(),n.addListener(a),()=>{t=!1,n.removeListener(a)}},[e,r]),l})(b=b.replace(/^@media( ?)/m,""),d,h,c,f)}},10621:(e,t,r)=>{r.d(t,{p:()=>a});var n=r(32748);function a(e,t){return 1===(0,n.a)(e,t?.in).getDay()}},30475:(e,t,r)=>{r.d(t,{A:()=>S});var n=r(40670),a=r(44501),i=r(14232),o=r(69241),l=r(38993),s=r(4697),u=r(74441),d=r(42622),h=r(62285),c=r(47951),f=r(45879);function b(e){return(0,f.Ay)("MuiSkeleton",e)}(0,c.A)("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);var p=r(37876);let m=["animation","className","component","height","style","variant","width"],g=e=>e,y,v,w,A,k=(0,l.i7)(y||(y=g`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),C=(0,l.i7)(v||(v=g`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),M=(0,d.Ay)("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[r.variant],!1!==r.animation&&t[r.animation],r.hasChildren&&t.withChildren,r.hasChildren&&!r.width&&t.fitContent,r.hasChildren&&!r.height&&t.heightAuto]}})(e=>{let{theme:t,ownerState:r}=e,n=String(t.shape.borderRadius).match(/[\d.\-+]*\s*(.*)/)[1]||"px",i=parseFloat(t.shape.borderRadius);return(0,a.A)({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:(0,u.X4)(t.palette.text.primary,"light"===t.palette.mode?.11:.13),height:"1.2em"},"text"===r.variant&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${i}${n}/${Math.round(i/.6*10)/10}${n}`,"&:empty:before":{content:'"\\00a0"'}},"circular"===r.variant&&{borderRadius:"50%"},"rounded"===r.variant&&{borderRadius:(t.vars||t).shape.borderRadius},r.hasChildren&&{"& > *":{visibility:"hidden"}},r.hasChildren&&!r.width&&{maxWidth:"fit-content"},r.hasChildren&&!r.height&&{height:"auto"})},e=>{let{ownerState:t}=e;return"pulse"===t.animation&&(0,l.AH)(w||(w=g`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),k)},e=>{let{ownerState:t,theme:r}=e;return"wave"===t.animation&&(0,l.AH)(A||(A=g`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),C,(r.vars||r).palette.action.hover)}),S=i.forwardRef(function(e,t){let r=(0,h.A)({props:e,name:"MuiSkeleton"}),{animation:i="pulse",className:l,component:u="span",height:d,style:c,variant:f="text",width:g}=r,y=(0,n.A)(r,m),v=(0,a.A)({},r,{animation:i,component:u,variant:f,hasChildren:!!y.children}),w=(e=>{let{classes:t,variant:r,animation:n,hasChildren:a,width:i,height:o}=e;return(0,s.A)({root:["root",r,n,a&&"withChildren",a&&!i&&"fitContent",a&&!o&&"heightAuto"]},b,t)})(v);return(0,p.jsx)(M,(0,a.A)({as:u,ref:t,className:(0,o.A)(w.root,l),ownerState:v},y,{style:(0,a.A)({width:g,height:d},c)}))})},73022:(e,t,r)=>{r.d(t,{P:()=>o,v:()=>s});var n=r(14232),a=r(94390);let i=e=>e;function o(e,t=i){let r=n.useSyncExternalStore(e.subscribe,n.useCallback(()=>t(e.getState()),[e,t]),n.useCallback(()=>t(e.getInitialState()),[e,t]));return n.useDebugValue(r),r}let l=e=>{let t=(0,a.y)(e),r=e=>o(t,e);return Object.assign(r,t),r},s=e=>e?l(e):l},77945:(e,t,r)=>{r.d(t,{A:()=>o}),r(14232);var n=r(75452),a=r(59111),i=r(52905);function o(){let e=(0,n.A)(a.A);return e[i.A]||e}},99659:(e,t,r)=>{r.d(t,{A:()=>a});var n=r(14232);let a="undefined"!=typeof window?n.useLayoutEffect:n.useEffect}}]);