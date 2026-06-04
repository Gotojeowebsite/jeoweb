
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ec75ea5a-4d49-51cb-9489-38b5f59ca9e5")}catch(e){}}();
import{a5 as o,C as R,an as b,e as C,ao as r,j as t,k as E,ap as L,ak as d}from"../../bundle.js";try{let s=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},e=new s.Error().stack;e&&(s._sentryDebugIds=s._sentryDebugIds||{},s._sentryDebugIds[e]="fc594edc-1d01-42e3-8874-80fffa4f8430",s._sentryDebugIdIdentifier="sentry-dbid-fc594edc-1d01-42e3-8874-80fffa4f8430")}catch{}{let s=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{};s._sentryModuleMetadata=s._sentryModuleMetadata||{},s._sentryModuleMetadata[new s.Error().stack]=Object.assign({},s._sentryModuleMetadata[new s.Error().stack],{"_sentryBundlerPluginAppKey:crazygames-gameframe":!0})}const c=12,T=o("div")(({theme:s})=>({fontSize:"14px",color:"#FFFFFF",display:"flex",gap:s.spacing(.5),height:40})),k=o("div")({fontWeight:700}),$=o("div")({fontWeight:400}),j=o("div")({height:c,borderRadius:c/2,backgroundColor:"black",position:"relative"}),z=o("div",{shouldForwardProp:s=>s!=="percentage"})(({percentage:s})=>({position:"absolute",backgroundColor:R.brand[100],left:0,top:0,bottom:0,borderRadius:c/2,width:`${s*100}%`})),G=b`
  0% { width: 5%; }
  100% { width: 100%; }
`,N=o("div")({backgroundColor:"#ffffff",position:"absolute",borderRadius:c/2,top:0,height:"100%",left:0,right:0,opacity:.3,animation:`${G} 1s infinite`}),O=b`
  0% {
    left:0%;
    right:100%;
    width:0%;
  }
  10% {
    left:0%;
    right:75%;
    width:25%;
  }
  90% {
    right:0%;
    left:75%;
    width:25%;
  }
  100% {
    left:100%;
    right:0%;
    width:0%;
  }
`,A=o("div")({position:"absolute",backgroundColor:R.brand[100],borderRadius:c/2,top:0,right:"100%",bottom:0,left:0,width:0,animation:`${O} 2s linear infinite`}),I=b`
  0% {
    opacity:0;
  }
  17% {
    opacity:1;
  }
  83% {
   opacity:1;
  }
  100% {
    opacity: 0;
  }
`,K=b`
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
`,W=o("div")({"& div":{position:"absolute",left:"50%",transform:"translate(-50%)",opacity:0,animation:`${I} 3s linear 1`},"& .msg0":{animation:`${I} 3s linear 1`},"& .msg1":{animationDelay:"3s"},"& .msg2":{animationDelay:"6s"},"& .msg3":{animationDelay:"9s"},"& .msg4":{animationDelay:"12s"},"& .msg5":{animationDelay:"15s"},"& .msg6":{animationDelay:"18s"},"& .msg7":{animationDelay:"21s"},"& .msg8":{animationDelay:"24s"},"& .msg9":{animationDelay:"27s"},"& .msg10":{animationDelay:"30s"},"& .msg11":{animationDelay:"33s"},"& .msg12":{animationDelay:"36s"},"& .msg13":{animationDelay:"39s"},"& .msg14":{animationDelay:"42s"},"& .msg15":{animationDelay:"45s"},"& .msg16":{animationDelay:"48s"},"& .msg17":{animationDelay:"51s"},"& .msg18":{animationDelay:"54s"},"& .msg19":{animationDelay:"57s"},"& .msg20":{animationDelay:"60s"},"& .msg21":{animationDelay:"63s"},"& .msg22":{animationDelay:"66s"},"& .msg23":{animation:`${K} 2s linear 1`,animationDelay:"69s",animationFillMode:"forwards"}}),w=()=>{const s=C.c(2);let e;if(s[0]===Symbol.for("react.memo_cache_sentinel")){const i=[r._("loadingBarScreen.message1"),r._("loadingBarScreen.message2"),r._("loadingBarScreen.message3"),r._("loadingBarScreen.message4"),r._("loadingBarScreen.message5"),r._("loadingBarScreen.message6"),r._("loadingBarScreen.message7"),r._("loadingBarScreen.message8")];e=[...i,...i,...i],s[0]=e}else e=s[0];const a=e;let n;return s[1]===Symbol.for("react.memo_cache_sentinel")?(n=t.jsx(W,{children:a.map(H)}),s[1]=n):n=s[1],n};function H(s,e){return t.jsx("div",{className:`msg${e}`,children:s},e)}const q=s=>{const e=C.c(17),{progress:a,showProgress:n}=s;let i;e[0]===Symbol.for("react.memo_cache_sentinel")?(i=E(),e[0]=i):i=e[0];const P=i,g=a<=.95,l=n&&!g||!n;let m;e[1]!==a?(m=()=>Math.round(a*100),e[1]=a,e[2]=m):m=e[2];const _=m;let f;e[3]!==l?(f=()=>t.jsxs(t.Fragment,{children:[t.jsx(j,{sx:{width:"80%"},children:t.jsx(A,{})}),t.jsx(k,{children:l?t.jsx(w,{}):r._("loadingBarScreen.message1")})]}),e[3]=l,e[4]=f):f=e[4];const S=f;let h;e[5]!==_||e[6]!==a||e[7]!==l||e[8]!==g?(h=()=>{const D=P.initialLoadSizeBytes||P.loadFileSize||P.totalSizeBytes,M=D?Math.round(D*1e-6):null;return t.jsxs(t.Fragment,{children:[t.jsx(j,{sx:{width:"80%"},children:t.jsx(z,{percentage:a,children:t.jsx(N,{})})}),t.jsxs(T,{children:[t.jsx(k,{children:g?`${_()}%`:l?t.jsx(w,{}):r._("loadingBarScreen.message1")}),g&&M&&t.jsxs($,{children:["(",Math.round(a*M)," / ",M," MB)"]})]})]})},e[5]=_,e[6]=a,e[7]=l,e[8]=g,e[9]=h):h=e[9];const B=h;let y;e[10]!==S||e[11]!==B||e[12]!==n?(y=()=>n?B():S(),e[10]=S,e[11]=B,e[12]=n,e[13]=y):y=e[13];const x=y;let p;e[14]===Symbol.for("react.memo_cache_sentinel")?(p={position:"fixed",inset:0,zIndex:2,background:R.black[90],touchAction:"pan-x pan-y"},e[14]=p):p=e[14];let u;return e[15]!==x?(u=t.jsx("div",{style:p,children:t.jsx(L,{children:x()})}),e[15]=x,e[16]=u):u=e[16],u},v=.01,F=.1;class J{lastReportedProgress;currentProgress=0;passedFirstIncrement=!1;reset(){this.lastReportedProgress=void 0,this.currentProgress=0,this.passedFirstIncrement=!1}trackLoadStarted(){d.trackProgress(0),this.lastReportedProgress=0,d.gameStartLoad()}trackProgress(e){if(e<=this.currentProgress)return this.currentProgress;this.currentProgress=e;const a=Math.floor(e*10)/10;return a!==1&&e>0&&(!this.passedFirstIncrement&&e>=v&&e<F?(this.passedFirstIncrement=!0,d.trackProgress(v),this.lastReportedProgress=e):(!this.lastReportedProgress&&e>F||this.lastReportedProgress&&e>this.lastReportedProgress+F)&&(d.trackProgress(a),this.lastReportedProgress=e)),e}trackLoadFinished(){this.lastReportedProgress!==1&&(this.lastReportedProgress=1,d.trackProgress(1),d.loadFinished())}}export{q as L,J as P};

//# debugId=ec75ea5a-4d49-51cb-9489-38b5f59ca9e5
