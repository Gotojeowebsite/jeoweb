!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e._sentryModuleMetadata=e._sentryModuleMetadata||{},e._sentryModuleMetadata[(new e.Error).stack]=function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];if(null!=r)for(var i in r)r.hasOwnProperty(i)&&(e[i]=r[i])}return e}({},e._sentryModuleMetadata[(new e.Error).stack],{"_sentryBundlerPluginAppKey:crazygames-portal":!0});var t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="27bb3a4c-7d13-4f34-a5dc-18e12ff77e26",e._sentryDebugIdIdentifier="sentry-dbid-27bb3a4c-7d13-4f34-a5dc-18e12ff77e26")}catch(e){}}();"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[15115,27219,99029],{6995:(e,t,r)=>{r.d(t,{A:()=>s});var i,a=r(14232),n=r(99659),o=r(61401),l=r(11601);let d=(i||(i=r.t(a,2))).useSyncExternalStore;function s(e,t={}){let r=(0,l.A)(),i="undefined"!=typeof window&&void 0!==window.matchMedia,{defaultMatches:h=!1,matchMedia:u=i?window.matchMedia:null,ssrMatchMedia:c=null,noSsr:f=!1}=(0,o.A)({name:"MuiUseMediaQuery",props:t,theme:r}),p="function"==typeof e?e(r):e;return(void 0!==d?function(e,t,r,i,n){let o=a.useCallback(()=>t,[t]),l=a.useMemo(()=>{if(n&&r)return()=>r(e).matches;if(null!==i){let{matches:t}=i(e);return()=>t}return o},[o,e,i,n,r]),[s,h]=a.useMemo(()=>{if(null===r)return[o,()=>()=>{}];let t=r(e);return[()=>t.matches,e=>(t.addListener(e),()=>{t.removeListener(e)})]},[o,r,e]);return d(h,s,l)}:function(e,t,r,i,o){let[l,d]=a.useState(()=>o&&r?r(e).matches:i?i(e).matches:t);return(0,n.A)(()=>{let t=!0;if(!r)return;let i=r(e),a=()=>{t&&d(i.matches)};return a(),i.addListener(a),()=>{t=!1,i.removeListener(a)}},[e,r]),l})(p=p.replace(/^@media( ?)/m,""),h,u,c,f)}},15115:(e,t,r)=>{r.d(t,{A:()=>w});var i=r(40670),a=r(44501),n=r(14232),o=r(69241),l=r(4697),d=r(97613),s=r(42622),h=r(62285),u=r(47951),c=r(45879);function f(e){return(0,c.Ay)("MuiDivider",e)}(0,u.A)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);var p=r(37876);let g=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],v=(0,s.Ay)("div",{name:"MuiDivider",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,r.absolute&&t.absolute,t[r.variant],r.light&&t.light,"vertical"===r.orientation&&t.vertical,r.flexItem&&t.flexItem,r.children&&t.withChildren,r.children&&"vertical"===r.orientation&&t.withChildrenVertical,"right"===r.textAlign&&"vertical"!==r.orientation&&t.textAlignRight,"left"===r.textAlign&&"vertical"!==r.orientation&&t.textAlignLeft]}})(e=>{let{theme:t,ownerState:r}=e;return(0,a.A)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(t.vars||t).palette.divider,borderBottomWidth:"thin"},r.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},r.light&&{borderColor:t.vars?`rgba(${t.vars.palette.dividerChannel} / 0.08)`:(0,d.X4)(t.palette.divider,.08)},"inset"===r.variant&&{marginLeft:72},"middle"===r.variant&&"horizontal"===r.orientation&&{marginLeft:t.spacing(2),marginRight:t.spacing(2)},"middle"===r.variant&&"vertical"===r.orientation&&{marginTop:t.spacing(1),marginBottom:t.spacing(1)},"vertical"===r.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},r.flexItem&&{alignSelf:"stretch",height:"auto"})},e=>{let{ownerState:t}=e;return(0,a.A)({},t.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{content:'""',alignSelf:"center"}})},e=>{let{theme:t,ownerState:r}=e;return(0,a.A)({},r.children&&"vertical"!==r.orientation&&{"&::before, &::after":{width:"100%",borderTop:`thin solid ${(t.vars||t).palette.divider}`}})},e=>{let{theme:t,ownerState:r}=e;return(0,a.A)({},r.children&&"vertical"===r.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:`thin solid ${(t.vars||t).palette.divider}`}})},e=>{let{ownerState:t}=e;return(0,a.A)({},"right"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})}),m=(0,s.Ay)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.wrapper,"vertical"===r.orientation&&t.wrapperVertical]}})(e=>{let{theme:t,ownerState:r}=e;return(0,a.A)({display:"inline-block",paddingLeft:`calc(${t.spacing(1)} * 1.2)`,paddingRight:`calc(${t.spacing(1)} * 1.2)`},"vertical"===r.orientation&&{paddingTop:`calc(${t.spacing(1)} * 1.2)`,paddingBottom:`calc(${t.spacing(1)} * 1.2)`})}),b=n.forwardRef(function(e,t){let r=(0,h.A)({props:e,name:"MuiDivider"}),{absolute:n=!1,children:d,className:s,component:u=d?"div":"hr",flexItem:c=!1,light:b=!1,orientation:w="horizontal",role:A="hr"!==u?"separator":void 0,textAlign:y="center",variant:x="fullWidth"}=r,C=(0,i.A)(r,g),k=(0,a.A)({},r,{absolute:n,component:u,flexItem:c,light:b,orientation:w,role:A,textAlign:y,variant:x}),M=(e=>{let{absolute:t,children:r,classes:i,flexItem:a,light:n,orientation:o,textAlign:d,variant:s}=e;return(0,l.A)({root:["root",t&&"absolute",s,n&&"light","vertical"===o&&"vertical",a&&"flexItem",r&&"withChildren",r&&"vertical"===o&&"withChildrenVertical","right"===d&&"vertical"!==o&&"textAlignRight","left"===d&&"vertical"!==o&&"textAlignLeft"],wrapper:["wrapper","vertical"===o&&"wrapperVertical"]},f,i)})(k);return(0,p.jsx)(v,(0,a.A)({as:u,className:(0,o.A)(M.root,s),role:A,ref:t,ownerState:k},C,{children:d?(0,p.jsx)(m,{className:M.wrapper,ownerState:k,children:d}):null}))});b.muiSkipListHighlight=!0;let w=b},30475:(e,t,r)=>{r.d(t,{A:()=>M});var i=r(40670),a=r(44501),n=r(14232),o=r(69241),l=r(38993),d=r(4697),s=r(74441),h=r(42622),u=r(62285),c=r(47951),f=r(45879);function p(e){return(0,f.Ay)("MuiSkeleton",e)}(0,c.A)("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);var g=r(37876);let v=["animation","className","component","height","style","variant","width"],m=e=>e,b,w,A,y,x=(0,l.i7)(b||(b=m`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),C=(0,l.i7)(w||(w=m`
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
`)),k=(0,h.Ay)("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[r.variant],!1!==r.animation&&t[r.animation],r.hasChildren&&t.withChildren,r.hasChildren&&!r.width&&t.fitContent,r.hasChildren&&!r.height&&t.heightAuto]}})(e=>{let{theme:t,ownerState:r}=e,i=String(t.shape.borderRadius).match(/[\d.\-+]*\s*(.*)/)[1]||"px",n=parseFloat(t.shape.borderRadius);return(0,a.A)({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:(0,s.X4)(t.palette.text.primary,"light"===t.palette.mode?.11:.13),height:"1.2em"},"text"===r.variant&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${n}${i}/${Math.round(n/.6*10)/10}${i}`,"&:empty:before":{content:'"\\00a0"'}},"circular"===r.variant&&{borderRadius:"50%"},"rounded"===r.variant&&{borderRadius:(t.vars||t).shape.borderRadius},r.hasChildren&&{"& > *":{visibility:"hidden"}},r.hasChildren&&!r.width&&{maxWidth:"fit-content"},r.hasChildren&&!r.height&&{height:"auto"})},e=>{let{ownerState:t}=e;return"pulse"===t.animation&&(0,l.AH)(A||(A=m`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),x)},e=>{let{ownerState:t,theme:r}=e;return"wave"===t.animation&&(0,l.AH)(y||(y=m`
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
    `),C,(r.vars||r).palette.action.hover)}),M=n.forwardRef(function(e,t){let r=(0,u.A)({props:e,name:"MuiSkeleton"}),{animation:n="pulse",className:l,component:s="span",height:h,style:c,variant:f="text",width:m}=r,b=(0,i.A)(r,v),w=(0,a.A)({},r,{animation:n,component:s,variant:f,hasChildren:!!b.children}),A=(e=>{let{classes:t,variant:r,animation:i,hasChildren:a,width:n,height:o}=e;return(0,d.A)({root:["root",r,i,a&&"withChildren",a&&!n&&"fitContent",a&&!o&&"heightAuto"]},p,t)})(w);return(0,g.jsx)(k,(0,a.A)({as:s,ref:t,className:(0,o.A)(A.root,l),ownerState:w},b,{style:(0,a.A)({width:m,height:h},c)}))})},77945:(e,t,r)=>{r.d(t,{A:()=>o}),r(14232);var i=r(75452),a=r(59111),n=r(52905);function o(){let e=(0,i.A)(a.A);return e[n.A]||e}},99659:(e,t,r)=>{r.d(t,{A:()=>a});var i=r(14232);let a="undefined"!=typeof window?i.useLayoutEffect:i.useEffect}}]);