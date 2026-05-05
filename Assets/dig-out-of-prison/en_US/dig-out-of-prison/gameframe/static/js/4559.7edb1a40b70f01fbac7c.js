
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="5d742c57-ae0a-5923-beb2-1caab4afd6a7")}catch(e){}}();
try{let e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="d4abc304-428d-4a3f-b897-c0b1fdc1dc48",e._sentryDebugIdIdentifier="sentry-dbid-d4abc304-428d-4a3f-b897-c0b1fdc1dc48")}catch(e){}{let e="undefined"!==typeof window?window:"undefined"!==typeof global?global:"undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:{};e._sentryModuleMetadata=e._sentryModuleMetadata||{},e._sentryModuleMetadata[(new e.Error).stack]=Object.assign({},e._sentryModuleMetadata[(new e.Error).stack],{"_sentryBundlerPluginAppKey:crazygames-gameframe":!0})}(globalThis.webpackChunk_crazygames_gameframe=globalThis.webpackChunk_crazygames_gameframe||[]).push([[4559],{4559:(e,t,s)=>{s.r(t),s.d(t,{default:()=>f});var a=s(5043),i=s(6808),r=s(1350),o=s(8073),n=s(2688),l=s(428),d=s(8616),c=s(4990),m=s(6580),h=s(579);class g extends a.Component{constructor(e){super(e),this.progressTracker=void 0,this.config=void 0,this.iframe=null,this.disableIframe=()=>{this.iframe&&(this.iframe.remove(),this.iframe=null)},this.restartGame=()=>{window.location.reload()},this.onIframeLoad=()=>{this.onLoad(),this.progressTracker.trackLoadFinished(),this.focusOnIframe()},this.onLoad=()=>{this.props.onLoadFinished()},this.progressTracker=new i.Ay,this.config=(0,o.lZ)(),this.state={state:"loading"},this.onRuffleLoaded=this.onRuffleLoaded.bind(this)}async componentDidMount(){window.addEventListener("message",this.onRuffleLoaded,!1),await this.startLoading()}componentWillUnmount(){window.removeEventListener("message",this.onRuffleLoaded,!1)}componentDidUpdate(e){e.isFullscreen!==this.props.isFullscreen&&this.focusOnIframe(),!e.isGameDisabled&&this.props.isGameDisabled?this.disableIframe():e.isGameDisabled&&!this.props.isGameDisabled&&this.restartGame()}render(){return"loaded"===this.state.state?null:(0,h.jsx)(m.A,{showProgress:!1})}async startLoading(){try{await l.A.Instance.waitForAPS()}catch{}finally{this.progressTracker.trackLoadStarted(),this.loadIframe()}}loadIframe(){if(this.props.isGameDisabled)return;const e=document.createElement("iframe");e.src=this.getIframeUrl(),e.onload=this.onIframeLoad,e.style.border="0",e.style.backgroundColor="#fff",e.style.width="10px",e.style.height="10px",e.style.minWidth="100%",e.style.minHeight="100%",e.setAttribute("allow",`accelerometer; gyroscope; gamepad; autoplay; payment; fullscreen; microphone; clipboard-read; clipboard-write 'self' ${this.getIframeUrl()}`),e.setAttribute("webkitallowfullscreen","true"),e.setAttribute("mozallowfullscreen","true"),e.setAttribute("msallowfullscreen","true"),e.setAttribute("allowfullscreen","true"),e.setAttribute("sandbox",""),e.sandbox.add(...c.n9),this.iframe=e;(0,r.yu)().appendChild(e)}getIframeUrl(){const e=this.config.loaderOptions,t=e.swfLocation.slice(0,-4),s=new URL(`${t}.html`),a=`https://${this.config.gameSlug}.${c.yM}`,i=new URL(`/ruffle${s.pathname}`,a),r="ruffle";return new URLSearchParams(window.location.search).forEach((e,t)=>{t!==r&&i.searchParams.append(t,e)}),e.loaderLocation&&i.searchParams.set(r,e.loaderLocation),i.toString()}focusOnIframe(){this.iframe&&this.iframe.contentWindow&&this.iframe.contentWindow.focus()}onRuffleLoaded(e){var t;"ruffleready"===(null===(t=e.data)||void 0===t?void 0:t.type)&&this.setState({state:"loaded"})}}const f=(0,n.A)((0,d.v)((0,d.p)(g)))},6580:(e,t,s)=>{s.d(t,{A:()=>k});var a=s(8451),i=s(5293),r=(s(5043),s(8073)),o=s(4535),n=s(3290),l=s(1517);const d=(0,o.Ay)("div")(e=>{let{theme:t}=e;return{fontSize:"14px",color:"#FFFFFF",display:"flex",gap:t.spacing(.5),height:40}}),c=(0,o.Ay)("div")({fontWeight:700}),m=(0,o.Ay)("div")({fontWeight:400}),h=(0,o.Ay)("div")({height:12,borderRadius:6,backgroundColor:"black",position:"relative"}),g=(0,o.Ay)("div",{shouldForwardProp:e=>"percentage"!==e})(e=>{let{percentage:t}=e;return{position:"absolute",backgroundColor:l.l.brand[100],left:0,top:0,bottom:0,borderRadius:6,width:100*t+"%"}}),f=n.i7`
  0% { width: 5%; }
  100% { width: 100%; }
`,u=(0,o.Ay)("div")({backgroundColor:"#ffffff",position:"absolute",borderRadius:6,top:0,height:"100%",left:0,right:0,opacity:.3,animation:`${f} 1s infinite`}),p=n.i7`
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
`,y=(0,o.Ay)("div")({position:"absolute",backgroundColor:l.l.brand[100],borderRadius:6,top:0,right:"100%",bottom:0,left:0,width:0,animation:`${p} 2s linear infinite`}),b=n.i7`
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
`,w=n.i7`
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
`,D=(0,o.Ay)("div")({"& div":{position:"absolute",left:"50%",transform:"translate(-50%)",opacity:0,animation:`${b} 3s linear 1`},"& .msg0":{animation:`${b} 3s linear 1`},"& .msg1":{animationDelay:"3s"},"& .msg2":{animationDelay:"6s"},"& .msg3":{animationDelay:"9s"},"& .msg4":{animationDelay:"12s"},"& .msg5":{animationDelay:"15s"},"& .msg6":{animationDelay:"18s"},"& .msg7":{animationDelay:"21s"},"& .msg8":{animationDelay:"24s"},"& .msg9":{animationDelay:"27s"},"& .msg10":{animationDelay:"30s"},"& .msg11":{animationDelay:"33s"},"& .msg12":{animationDelay:"36s"},"& .msg13":{animationDelay:"39s"},"& .msg14":{animationDelay:"42s"},"& .msg15":{animationDelay:"45s"},"& .msg16":{animationDelay:"48s"},"& .msg17":{animationDelay:"51s"},"& .msg18":{animationDelay:"54s"},"& .msg19":{animationDelay:"57s"},"& .msg20":{animationDelay:"60s"},"& .msg21":{animationDelay:"63s"},"& .msg22":{animationDelay:"66s"},"& .msg23":{animation:`${w} 2s linear 1`,animationDelay:"69s",animationFillMode:"forwards"}});var R=s(579);const _=()=>{const e=(0,a.c)(2);let t;if(e[0]===Symbol.for("react.memo_cache_sentinel")){const s=[i.Ru._("loadingBarScreen.message1"),i.Ru._("loadingBarScreen.message2"),i.Ru._("loadingBarScreen.message3"),i.Ru._("loadingBarScreen.message4"),i.Ru._("loadingBarScreen.message5"),i.Ru._("loadingBarScreen.message6"),i.Ru._("loadingBarScreen.message7"),i.Ru._("loadingBarScreen.message8")];t=[...s,...s,...s],e[0]=t}else t=e[0];const s=t;let r;return e[1]===Symbol.for("react.memo_cache_sentinel")?(r=(0,R.jsx)(D,{children:s.map(x)}),e[1]=r):r=e[1],r};function x(e,t){return(0,R.jsx)("div",{className:`msg${t}`,children:e},t)}var A=s(6035);const k=e=>{const t=(0,a.c)(17),{progress:s,showProgress:o}=e;let n;t[0]===Symbol.for("react.memo_cache_sentinel")?(n=(0,r.lZ)(),t[0]=n):n=t[0];const f=n,p=s<=.95,b=o&&!p||!o;let w;t[1]!==s?(w=()=>Math.round(100*s),t[1]=s,t[2]=w):w=t[2];const D=w;let x;t[3]!==b?(x=()=>(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)(h,{sx:{width:"80%"},children:(0,R.jsx)(y,{})}),(0,R.jsx)(c,{children:b?(0,R.jsx)(_,{}):i.Ru._("loadingBarScreen.message1")})]}),t[3]=b,t[4]=x):x=t[4];const k=x;let v;t[5]!==D||t[6]!==s||t[7]!==b||t[8]!==p?(v=()=>{const e=f.initialLoadSizeBytes||f.loadFileSize||f.totalSizeBytes,t=e?Math.round(1e-6*e):null;return(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)(h,{sx:{width:"80%"},children:(0,R.jsx)(g,{percentage:s,children:(0,R.jsx)(u,{})})}),(0,R.jsxs)(d,{children:[(0,R.jsx)(c,{children:p?`${D()}%`:b?(0,R.jsx)(_,{}):i.Ru._("loadingBarScreen.message1")}),p&&t&&(0,R.jsxs)(m,{children:["(",Math.round(s*t)," / ",t," MB)"]})]})]})},t[5]=D,t[6]=s,t[7]=b,t[8]=p,t[9]=v):v=t[9];const P=v;let L;t[10]!==k||t[11]!==P||t[12]!==o?(L=()=>o?P():k(),t[10]=k,t[11]=P,t[12]=o,t[13]=L):L=t[13];const S=L;let I,F;return t[14]===Symbol.for("react.memo_cache_sentinel")?(I={position:"fixed",inset:0,zIndex:2,background:l.l.black[90],touchAction:"pan-x pan-y"},t[14]=I):I=t[14],t[15]!==S?(F=(0,R.jsx)("div",{style:I,children:(0,R.jsx)(A.A,{children:S()})}),t[15]=S,t[16]=F):F=t[16],F}},6808:(e,t,s)=>{s.d(t,{Ay:()=>i});var a=s(2404);const i=class{constructor(){this.lastReportedProgress=void 0,this.currentProgress=0,this.passedFirstIncrement=!1}reset(){this.lastReportedProgress=void 0,this.currentProgress=0,this.passedFirstIncrement=!1}trackLoadStarted(){a.A.trackProgress(0),this.lastReportedProgress=0,a.A.gameStartLoad()}trackProgress(e){if(e<=this.currentProgress)return this.currentProgress;this.currentProgress=e;const t=Math.floor(10*e)/10;return 1!==t&&e>0&&(!this.passedFirstIncrement&&e>=.01&&e<.1?(this.passedFirstIncrement=!0,a.A.trackProgress(.01),this.lastReportedProgress=e):(!this.lastReportedProgress&&e>.1||this.lastReportedProgress&&e>this.lastReportedProgress+.1)&&(a.A.trackProgress(t),this.lastReportedProgress=e)),e}trackLoadFinished(){1!==this.lastReportedProgress&&(this.lastReportedProgress=1,a.A.trackProgress(1),a.A.loadFinished())}}}}]);
//# debugId=5d742c57-ae0a-5923-beb2-1caab4afd6a7
