import{r as e,i as t}from"./tag.const-v1.42.0.js";const r="auto",a=t`
  :host {
    width: var(--ds-media-player-width, ${e("100%")});
    pointer-events: var(
      --ds-media-player-pointer-events,
      ${e(r)}
    );
  }

  /* When the host receives full height (e.g. inside store-media[background]),
   * propagate 100% height through .media-player and into the slotted UMP
   * so the video can fill the background layer.
   * overflow:hidden clips UMP fluid layout which may exceed the container
   * height based on aspect ratio. */
  .media-player {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  ::slotted([slot='media-player']) {
    display: block;
    width: 100%;
    height: 100%;
  }
`,o=t`
  .media-player {
    position: relative;
  }

  :host([poster-first-frame-pending]) .media-player::after {
    position: absolute;
    z-index: 1;
    inset: 0;
    background-image: var(--ds-media-player-poster-first-frame);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    content: '';
    pointer-events: none;
  }
`,i="poster-first-frame-pending",n="--ds-media-player-poster-first-frame",s=new WeakMap,l=new Set;function d(){return o}function c({host:e,options:t,initializeUmp:r=()=>{}}){if(s.has(e))return void r();const a=e.querySelector('universal-media-player[slot="media-player"]'),o=t.poster;if(!t.autoplay||!o||!a)return void r();const d=a;!function(e){const t=new URL(e,document.baseURI).href;if(l.has(t)||(l.add(t),Array.from(document.head.querySelectorAll('link[rel="preload"][as="image"]')).some(e=>e.href===t)))return;const r=document.createElement("link");r.rel="preload",r.as="image",r.href=t,r.fetchPriority="high",document.head.append(r)}(o);const c=e.style.getPropertyValue(n),p=e.style.getPropertyPriority(n),h=e.hasAttribute(i);let u,m,y=!1;const f=()=>{c?e.style.setProperty(n,c,p):e.style.removeProperty(n),h||e.removeAttribute(i)},g=()=>{void 0!==m&&null!=u&&u.cancelVideoFrameCallback&&u.cancelVideoFrameCallback(m),d.removeEventListener("playing",b)};function v(){y||(y=!0,g(),f())}function b(){var e;if(y)return;const t=null==(e=d.shadowRoot)?void 0:e.querySelector("video");t&&(u=t,d.removeEventListener("playing",b),t.requestVideoFrameCallback?m=t.requestVideoFrameCallback(v):v())}e.style.setProperty(n,`url(${JSON.stringify(o)})`),e.setAttribute(i,""),s.set(e,()=>{y=!0,g(),f()}),d.addEventListener("playing",b),b(),r()}function p(e){var t;null==(t=s.get(e))||t(),s.delete(e)}export{c as a,p as d,d as g,a as s};
