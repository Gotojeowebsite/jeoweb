
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="59d5f615-0d31-501b-8647-4fd8b010a4e0")}catch(e){}}();
try{let e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},s=(new e.Error).stack;s&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[s]="a7134b18-290c-4ca8-9263-e41260564b94",e._sentryDebugIdIdentifier="sentry-dbid-a7134b18-290c-4ca8-9263-e41260564b94")}catch(e){}{let e="undefined"!==typeof window?window:"undefined"!==typeof global?global:"undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:{};e._sentryModuleMetadata=e._sentryModuleMetadata||{},e._sentryModuleMetadata[(new e.Error).stack]=Object.assign({},e._sentryModuleMetadata[(new e.Error).stack],{"_sentryBundlerPluginAppKey:crazygames-gameframe":!0})}(globalThis.webpackChunk_crazygames_gameframe=globalThis.webpackChunk_crazygames_gameframe||[]).push([[9422],{6580:(e,s,t)=>{t.d(s,{A:()=>R});var a=t(8451),i=t(5293),r=(t(5043),t(8073)),o=t(4535),n=t(3290),d=t(1517);const l=(0,o.Ay)("div")(e=>{let{theme:s}=e;return{fontSize:"14px",color:"#FFFFFF",display:"flex",gap:s.spacing(.5),height:40}}),g=(0,o.Ay)("div")({fontWeight:700}),c=(0,o.Ay)("div")({fontWeight:400}),h=(0,o.Ay)("div")({height:12,borderRadius:6,backgroundColor:"black",position:"relative"}),m=(0,o.Ay)("div",{shouldForwardProp:e=>"percentage"!==e})(e=>{let{percentage:s}=e;return{position:"absolute",backgroundColor:d.l.brand[100],left:0,top:0,bottom:0,borderRadius:6,width:100*s+"%"}}),p=n.i7`
  0% { width: 5%; }
  100% { width: 100%; }
`,u=(0,o.Ay)("div")({backgroundColor:"#ffffff",position:"absolute",borderRadius:6,top:0,height:"100%",left:0,right:0,opacity:.3,animation:`${p} 1s infinite`}),y=n.i7`
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
`,f=(0,o.Ay)("div")({position:"absolute",backgroundColor:d.l.brand[100],borderRadius:6,top:0,right:"100%",bottom:0,left:0,width:0,animation:`${y} 2s linear infinite`}),b=n.i7`
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
`,D=n.i7`
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
`,w=(0,o.Ay)("div")({"& div":{position:"absolute",left:"50%",transform:"translate(-50%)",opacity:0,animation:`${b} 3s linear 1`},"& .msg0":{animation:`${b} 3s linear 1`},"& .msg1":{animationDelay:"3s"},"& .msg2":{animationDelay:"6s"},"& .msg3":{animationDelay:"9s"},"& .msg4":{animationDelay:"12s"},"& .msg5":{animationDelay:"15s"},"& .msg6":{animationDelay:"18s"},"& .msg7":{animationDelay:"21s"},"& .msg8":{animationDelay:"24s"},"& .msg9":{animationDelay:"27s"},"& .msg10":{animationDelay:"30s"},"& .msg11":{animationDelay:"33s"},"& .msg12":{animationDelay:"36s"},"& .msg13":{animationDelay:"39s"},"& .msg14":{animationDelay:"42s"},"& .msg15":{animationDelay:"45s"},"& .msg16":{animationDelay:"48s"},"& .msg17":{animationDelay:"51s"},"& .msg18":{animationDelay:"54s"},"& .msg19":{animationDelay:"57s"},"& .msg20":{animationDelay:"60s"},"& .msg21":{animationDelay:"63s"},"& .msg22":{animationDelay:"66s"},"& .msg23":{animation:`${D} 2s linear 1`,animationDelay:"69s",animationFillMode:"forwards"}});var k=t(579);const _=()=>{const e=(0,a.c)(2);let s;if(e[0]===Symbol.for("react.memo_cache_sentinel")){const t=[i.Ru._("loadingBarScreen.message1"),i.Ru._("loadingBarScreen.message2"),i.Ru._("loadingBarScreen.message3"),i.Ru._("loadingBarScreen.message4"),i.Ru._("loadingBarScreen.message5"),i.Ru._("loadingBarScreen.message6"),i.Ru._("loadingBarScreen.message7"),i.Ru._("loadingBarScreen.message8")];s=[...t,...t,...t],e[0]=s}else s=e[0];const t=s;let r;return e[1]===Symbol.for("react.memo_cache_sentinel")?(r=(0,k.jsx)(w,{children:t.map(P)}),e[1]=r):r=e[1],r};function P(e,s){return(0,k.jsx)("div",{className:`msg${s}`,children:e},s)}var x=t(6035);const R=e=>{const s=(0,a.c)(17),{progress:t,showProgress:o}=e;let n;s[0]===Symbol.for("react.memo_cache_sentinel")?(n=(0,r.lZ)(),s[0]=n):n=s[0];const p=n,y=t<=.95,b=o&&!y||!o;let D;s[1]!==t?(D=()=>Math.round(100*t),s[1]=t,s[2]=D):D=s[2];const w=D;let P;s[3]!==b?(P=()=>(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(h,{sx:{width:"80%"},children:(0,k.jsx)(f,{})}),(0,k.jsx)(g,{children:b?(0,k.jsx)(_,{}):i.Ru._("loadingBarScreen.message1")})]}),s[3]=b,s[4]=P):P=s[4];const R=P;let S;s[5]!==w||s[6]!==t||s[7]!==b||s[8]!==y?(S=()=>{const e=p.initialLoadSizeBytes||p.loadFileSize||p.totalSizeBytes,s=e?Math.round(1e-6*e):null;return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(h,{sx:{width:"80%"},children:(0,k.jsx)(m,{percentage:t,children:(0,k.jsx)(u,{})})}),(0,k.jsxs)(l,{children:[(0,k.jsx)(g,{children:y?`${w()}%`:b?(0,k.jsx)(_,{}):i.Ru._("loadingBarScreen.message1")}),y&&s&&(0,k.jsxs)(c,{children:["(",Math.round(t*s)," / ",s," MB)"]})]})]})},s[5]=w,s[6]=t,s[7]=b,s[8]=y,s[9]=S):S=s[9];const v=S;let F;s[10]!==R||s[11]!==v||s[12]!==o?(F=()=>o?v():R(),s[10]=R,s[11]=v,s[12]=o,s[13]=F):F=s[13];const A=F;let j,L;return s[14]===Symbol.for("react.memo_cache_sentinel")?(j={position:"fixed",inset:0,zIndex:2,background:d.l.black[90],touchAction:"pan-x pan-y"},s[14]=j):j=s[14],s[15]!==A?(L=(0,k.jsx)("div",{style:j,children:(0,k.jsx)(x.A,{children:A()})}),s[15]=A,s[16]=L):L=s[16],L}},6808:(e,s,t)=>{t.d(s,{Ay:()=>i});var a=t(2404);const i=class{constructor(){this.lastReportedProgress=void 0,this.currentProgress=0,this.passedFirstIncrement=!1}reset(){this.lastReportedProgress=void 0,this.currentProgress=0,this.passedFirstIncrement=!1}trackLoadStarted(){a.A.trackProgress(0),this.lastReportedProgress=0,a.A.gameStartLoad()}trackProgress(e){if(e<=this.currentProgress)return this.currentProgress;this.currentProgress=e;const s=Math.floor(10*e)/10;return 1!==s&&e>0&&(!this.passedFirstIncrement&&e>=.01&&e<.1?(this.passedFirstIncrement=!0,a.A.trackProgress(.01),this.lastReportedProgress=e):(!this.lastReportedProgress&&e>.1||this.lastReportedProgress&&e>this.lastReportedProgress+.1)&&(a.A.trackProgress(s),this.lastReportedProgress=e)),e}trackLoadFinished(){1!==this.lastReportedProgress&&(this.lastReportedProgress=1,a.A.trackProgress(1),a.A.loadFinished())}}},9422:(e,s,t)=>{t.r(s),t.d(s,{default:()=>g});var a=t(8616),i=t(5043),r=t(8073),o=t(6580),n=t(6808),d=t(579);class l extends i.Component{constructor(e){super(e),this.progressTracker=void 0,this.config=void 0,this.options=void 0,this.cacheDisabled=void 0,this.progressTracker=new n.Ay,this.state={state:"loading",progress:0},this.config=(0,r.lZ)(),this.options=this.config.loaderOptions,this.cacheDisabled=!1}componentDidMount(){this.setState({state:"loading"}),this.load()}render(){const{state:e}=this.state;switch(e){case"loading":return this.renderLoading();case"loaded":return this.renderLoaded();default:throw new Error(`[FakeLoader] Unexpected state ${e}`)}}renderLoading(){const{progress:e}=this.state;return(0,d.jsx)(d.Fragment,{children:(0,d.jsx)(o.A,{progress:e,showProgress:!0})})}renderLoaded(){return null}load(){this.progressTracker.trackLoadStarted(),this.options.simulateLoadingFail||(this.options.skipLoading&&!this.isCacheDisabled()?(this.onProgress(1),this.finishedLoading()):this.progressLoop(0))}finishedLoading(){this.props.onLoadFinished(),this.progressTracker.trackLoadFinished(),this.setState({state:"loaded"})}onProgress(e){const s=this.progressTracker.trackProgress(e);this.setState({progress:s})}progressLoop(e){e>1?(this.onProgress(1),this.finishedLoading()):setTimeout(()=>{this.onProgress(e),this.progressLoop(e+.01)},this.options.progressDelay)}isCacheDisabled(){return!!this.options.allowDisableCache&&!this.cacheDisabled}}const g=(0,a.p)(l)}}]);
//# debugId=59d5f615-0d31-501b-8647-4fd8b010a4e0
