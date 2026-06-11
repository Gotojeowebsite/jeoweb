(function(){'use strict';var d=class{constructor(a){this.body=a}dispatchEvent(a,b){this.body.dispatchEvent(new CustomEvent(a,{detail:b}))}};function e(a){if(a.i.offsetWidth<=1||a.i.offsetHeight<=1)return!1;a.g.remove();a.context.dispatchEvent("spanReady");return!0}
var k=class{constructor(a){this.context=a;this.config={u:!1,o:100};this.i=document.createElement("span");this.g=document.createElement("div");this.i.style.fontSize="6px";this.i.textContent="go";this.g.style.position="absolute";this.g.style.top="100%";this.g.style.left="100%";this.g.style.width="1px";this.g.style.height="0";this.g.style.overflow="hidden";this.g.style.visibility="hidden";this.g.appendChild(this.i)}wait(){if(!this.config.u&&(this.context.dispatchEvent("spanStart"),this.context.body.appendChild(this.g),
!e(this)))return new Promise(a=>{var b=setInterval(()=>{e(this)&&(clearInterval(b),a())},this.config.o)})}};/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
function l(a,b){if(a.l===1){a.dispatchEvent("overallStart");var c;let h;(c=a.m)==null||(h=c.b0)==null||h.call(c)}c=(new k(a.context)).wait();a.dispatchEvent("browserStart");var f,g;(f=a.m)==null||(g=f.b1)==null||g.call(f);a.dispatchEvent("browserStartEnd");c?c.then(()=>{m(a,b)}):m(a,b)}
function m(a,b){if(a.l===b){a.dispatchEvent("browserReady");var c,f;(c=a.m)==null||(f=c.b2)==null||f.call(c);a.dispatchEvent("browserReadyEnd");a.dispatchEvent("overallReady");a.dispatchEvent("browserQuiet");var g,h;(g=a.m)==null||(h=g.b3)==null||h.call(g);a.dispatchEvent("browserQuietEnd");a.l===1&&a.dispatchEvent("overallQuiet")}}
for(var n=class{constructor(a,b){this.body=b;this.l=0;this.context=new d(b)}r(a){this.m=a;this.body.addEventListener("browserRender",()=>{++this.l;l(this,this.l)})}dispatchEvent(a){this.body.dispatchEvent(new CustomEvent(a))}},p=["mys","Engine"],q=this||self,r;p.length&&(r=p.shift());)p.length||n===void 0?q[r]&&q[r]!==Object.prototype[r]?q=q[r]:q=q[r]={}:q[r]=n;}).call(this);
