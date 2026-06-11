(()=>{var Ie=Object.defineProperty;var ge=c=>{throw TypeError(c)};var Ce=(c,t,e)=>t in c?Ie(c,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):c[t]=e;var U=(c,t,e)=>Ce(c,typeof t!="symbol"?t+"":t,e),ke=(c,t,e)=>t.has(c)||ge("Cannot "+e);var ue=(c,t,e)=>t.has(c)?ge("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(c):t.set(c,e);var W=(c,t,e)=>(ke(c,t,"access private method"),e);typeof Map>"u"&&(window.Map=function(){this._keys=[],this._values=[]},window.Map.prototype.set=function(c,t){var e=this._keys.indexOf(c);return e>=0?this._values[e]=t:(this._keys.push(c),this._values.push(t)),this},window.Map.prototype.get=function(c){var t=this._keys.indexOf(c);return t>=0?this._values[t]:void 0},window.Map.prototype.has=function(c){return this._keys.indexOf(c)>=0},window.Map.prototype.delete=function(c){var t=this._keys.indexOf(c);return t>=0?(this._keys.splice(t,1),this._values.splice(t,1),!0):!1},window.Map.prototype.clear=function(){this._keys=[],this._values=[]},Object.defineProperty(window.Map.prototype,"size",{get:function(){return this._keys.length}}));String.prototype.includes||(String.prototype.includes=function(c,t){"use strict";return typeof t!="number"&&(t=0),t+c.length>this.length?!1:this.indexOf(c,t)!==-1});String.prototype.startsWith||(String.prototype.startsWith=function(c,t){return t=t||0,this.substr(t,c.length)===c});String.prototype.endsWith||(String.prototype.endsWith=function(c,t){var e=this.toString();(typeof t!="number"||!isFinite(t)||Math.floor(t)!==t||t>e.length)&&(t=e.length),t-=c.length;var s=e.indexOf(c,t);return s!==-1&&s===t});Array.from||(Array.from=function(c){for(var t=Object(c),e=parseInt(t.length)||0,s=new Array(e),i=0;i<e;)s[i]=t[i],i++;return s});Object.entries||(Object.entries=function(c){for(var t=Object.keys(c),e=t.length,s=new Array(e);e--;)s[e]=[t[e],c[t[e]]];return s});Object.values||(Object.values=function(c){var t=[];for(var e in c)Object.prototype.hasOwnProperty.call(c,e)&&t.push(c[e]);return t});Element.prototype.closest||(Element.prototype.closest=function(c){for(var t=this;t&&t.nodeType===1;){if(t.matches(c))return t;t=t.parentElement||t.parentNode}return null});Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(c){for(var t=(this.document||this.ownerDocument).querySelectorAll(c),e=t.length;--e>=0&&t.item(e)!==this;);return e>-1});(function(){if(typeof window.CustomEvent=="function")return!1;function c(t,e){e=e||{bubbles:!1,cancelable:!1,detail:null};var s=document.createEvent("CustomEvent");return s.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),s}c.prototype=window.Event.prototype,window.CustomEvent=c})();Promise.prototype.finally||(Promise.prototype.finally=function(c){var t=this.constructor;return this.then(function(e){return t.resolve(c()).then(function(){return e})},function(e){return t.resolve(c()).then(function(){throw e})})});function pe(){return`tab_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function A(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768&&window.innerHeight<=1024||"ontouchstart"in window||navigator.maxTouchPoints>0}function Te(c){let t=document.cookie.split(";");for(let e=0;e<t.length;e++){let s=t[e].trim();if(s.startsWith(c+"="))return s.substring(c.length+1)}return null}function Y(c,t,e={}){let{days:s,minutes:i}=e,n="";s?n=`; expires=${new Date(Date.now()+s*864e5).toUTCString()}`:i&&(n=`; expires=${new Date(Date.now()+i*6e4).toUTCString()}`);let o=window.location.protocol==="https:"?"; Secure":"";document.cookie=`${c}=${t||""}${n}; path=/; SameSite=Lax${o}`}function G(c){document.cookie=`${c}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`}function Q(c){return Te(c)}function me(c,t,e=7){t&&Y(c,t,{days:e})}function fe(c){G(c)}function be(c,t){return`ctm_chat_reconnect_${c}_${t}`}function Z(c,t){try{let e=sessionStorage.getItem(be(c,t));if(e){let s=JSON.parse(e);return Date.now()-s.timestamp>3e5?0:s.attempts||0}}catch{}return 0}function X(c,t,e){try{sessionStorage.setItem(be(c,t),JSON.stringify({attempts:e,timestamp:Date.now()}))}catch{}}function ee(c){let t=c.getHours(),e=c.getMinutes(),s=t>=12?"PM":"AM",i=t%12||12,n=e<10?"0"+e:e;return`${i}:${n} ${s}`}function ye(c){if(!c)return c;let t=document.createElement("div");t.innerHTML=c;let e=0,s=!1;for(let i of t.children)i.tagName==="OL"?(s&&i.setAttribute("start",String(e+1)),e+=i.querySelectorAll(":scope > li").length,s=!0):i.tagName==="UL"||(s=!1,e=0);return t.innerHTML}var z=class{constructor(t,e){this.config=t,this.logger=e||console,this.webSocket=null,this.reconnectAttempts=0,this.reconnectTimeout=null,this.connectionStatus="disconnected",this.heartbeatInterval=null,this.heartbeatTimeout=null,this.HEARTBEAT_INTERVAL_MS=3e4,this.HEARTBEAT_TIMEOUT_MS=1e4,this.lastPingTime=null,this.listeners={open:[],message:[],close:[],error:[],statusChange:[]}}on(t,e){this.listeners[t]&&this.listeners[t].push(e)}off(t,e){this.listeners[t]&&(this.listeners[t]=this.listeners[t].filter(s=>s!==e))}emit(t,e){this.listeners[t]&&this.listeners[t].forEach(s=>s(e))}connect(t){if(this.webSocket&&this.webSocket.readyState===WebSocket.OPEN)return this.logger.debug("WebSocket: Already open."),Promise.resolve();if(this.webSocket&&this.webSocket.readyState===WebSocket.CONNECTING)return this.logger.debug("WebSocket: Already connecting."),this.connectionPromise||Promise.resolve();this.reconnectAttempts===0&&t.chatId&&t.tabId&&(this.reconnectAttempts=Z(t.chatId,t.tabId)),this.setStatus("connecting");let e=`${t.baseWsUrl}/websocket`;if(!t.baseWsUrl||!t.chatId)return this.logger.error("WebSocket: Cannot connect, missing WS URL or Widget ID."),this.setStatus("error"),this.emit("error",{message:"Cannot connect, missing configuration"}),Promise.reject(new Error("Missing configuration"));let s=t.sessionId||"init",i=`${e}?region=${t.region}&id=${t.chatId}&accountId=${t.accountId}&sessionId=${encodeURIComponent(s)}`;return this.connectionPromise=new Promise((n,o)=>{try{this.webSocket=new WebSocket(i),this.webSocket.onopen=()=>{let a=this.reconnectAttempts>0;this.reconnectAttempts=0,t.chatId&&t.tabId&&X(t.chatId,t.tabId,0),this.setStatus("connected"),this.startHeartbeat(),this.emit("open",{wasReconnecting:a}),this.connectionPromise=null,n()},this.webSocket.onmessage=a=>{try{let r=JSON.parse(a.data);if(r.type==="pong"){this.handlePong(r);return}this.emit("message",r)}catch(r){this.logger.error("WebSocket: Error parsing message:",r),this.emit("error",{message:"Error parsing message",error:r})}},this.webSocket.onerror=a=>{this.logger.error("WebSocket: Connection error:",a),this.emit("error",{message:"Connection error",error:a}),this.connectionPromise&&(this.connectionPromise=null,o(new Error("WebSocket connection error")))},this.webSocket.onclose=a=>{this.logger.info(`WebSocket: Connection closed. Code: ${a.code}, Reason: ${a.reason}`),this.stopHeartbeat(),this.webSocket=null;let r=a.code===1e3||a.code===1001;this.emit("close",{code:a.code,reason:a.reason,wasClean:r}),this.connectionPromise&&(this.connectionPromise=null,o(new Error(`WebSocket closed during connection: ${a.reason}`))),!r&&a.code!==1008?this.scheduleReconnect(t):this.setStatus("closed")}}catch(a){this.logger.error("WebSocket: Failed to create connection:",a),this.emit("error",{message:"Failed to create connection",error:a}),this.scheduleReconnect(t),this.connectionPromise=null,o(a)}}),this.connectionPromise}disconnect(t=1e3,e="Client disconnect"){this.stopHeartbeat(),clearTimeout(this.reconnectTimeout),this.webSocket&&(this.webSocket.onopen=null,this.webSocket.onmessage=null,this.webSocket.onerror=null,this.webSocket.onclose=null,this.webSocket.close(t,e),this.webSocket=null),this.setStatus("disconnected")}send(t){if(this.webSocket&&this.webSocket.readyState===WebSocket.OPEN)try{let e=typeof t=="string"?t:JSON.stringify(t);return this.webSocket.send(e),!0}catch(e){return this.logger.error("WebSocket: Error sending message:",e),this.emit("error",{message:"Error sending message",error:e}),!1}return!1}scheduleReconnect(t){if(this.connectionStatus==="disconnected"||this.connectionStatus==="ended")return;clearTimeout(this.reconnectTimeout);let e=t.chatId&&t.tabId?Z(t.chatId,t.tabId):0;if(this.reconnectAttempts>=this.config.maxReconnectAttempts){this.logger.error(`WebSocket: Max reconnect attempts (${this.config.maxReconnectAttempts}) reached.`),this.setStatus("error"),this.emit("error",{message:"Max reconnect attempts reached"});return}this.reconnectAttempts++,t.chatId&&t.tabId&&X(t.chatId,t.tabId,this.reconnectAttempts);let s=Math.min(this.config.reconnectDelayMs*Math.pow(2,this.reconnectAttempts-1),3e4),n=s*.2*(2*Math.random()-1),o=Math.round(s+n),a=e>3?(e-3)*1e3:0,r=o+a;this.logger.debug(`WebSocket: Reconnecting in ${r}ms (attempt ${this.reconnectAttempts}/${this.config.maxReconnectAttempts})...`),this.setStatus("reconnecting"),this.emit("statusChange",{status:"reconnecting",attempt:this.reconnectAttempts,maxAttempts:this.config.maxReconnectAttempts,delay:r}),this.reconnectTimeout=setTimeout(()=>{this.connect(t)},r)}startHeartbeat(){this.stopHeartbeat(),this.heartbeatInterval=setInterval(()=>{this.webSocket&&this.webSocket.readyState===WebSocket.OPEN&&this.sendPing()},this.HEARTBEAT_INTERVAL_MS)}stopHeartbeat(){this.heartbeatInterval&&(clearInterval(this.heartbeatInterval),this.heartbeatInterval=null),this.heartbeatTimeout&&(clearTimeout(this.heartbeatTimeout),this.heartbeatTimeout=null)}sendPing(){!this.webSocket||this.webSocket.readyState!==WebSocket.OPEN||(this.lastPingTime=Date.now(),this.send({type:"ping",timestamp:this.lastPingTime}),this.heartbeatTimeout=setTimeout(()=>{this.logger.error("WebSocket: Pong timeout - no response to ping"),this.webSocket&&this.webSocket.close(1008,"Ping timeout")},this.HEARTBEAT_TIMEOUT_MS))}handlePong(t){if(this.heartbeatTimeout&&(clearTimeout(this.heartbeatTimeout),this.heartbeatTimeout=null),this.lastPingTime&&t.timestamp){let e=Date.now()-t.timestamp;this.logger.debug(`WebSocket: Pong received (latency: ${e}ms)`)}}setStatus(t){this.connectionStatus!==t&&(this.connectionStatus=t,this.emit("statusChange",{status:t}))}getStatus(){return this.connectionStatus}isConnected(){return this.webSocket&&this.webSocket.readyState===WebSocket.OPEN}};var F=class{constructor(t={},e){this.logger=e||console,this.messages=[],this.messagesContainerEl=null,this.currentAIMessageElement=null,this.currentAIMessageId=null,this.typingIndicatorEl=null,this.aiStatusIndicatorEl=null,this.onScrollToBottom=t.onScrollToBottom||(()=>{}),this.onUpdateActiveStatus=t.onUpdateActiveStatus||(()=>{}),this.onDispatchEvent=t.onDispatchEvent||(()=>{}),this.onRenderMarkdown=t.onRenderMarkdown||(s=>s),this.onPlaySound=t.onPlaySound||(()=>{}),this.onFormLoad=t.onFormLoad||(()=>{}),this.onAdjustWindowHeight=t.onAdjustWindowHeight||(()=>{}),this.onUpdateUIBasedOnState=t.onUpdateUIBasedOnState||(()=>{}),this.onSanitizeHTML=t.onSanitizeHTML||(s=>s),this.onFetchFreshMediaUrl=t.onFetchFreshMediaUrl||(()=>Promise.reject("Not implemented")),this.sessionId=null,this.durableObjectId=null}setMessagesContainer(t){this.messagesContainerEl=t}setSessionInfo(t,e){this.sessionId=t,this.durableObjectId=e}addMessage(t,{silent:e=!1}={}){let s=!this.messages.filter(a=>a.type!=="system"&&a.type!=="status").length;if(!this.messagesContainerEl){this.logger.debug("no message container yet");return}if(t.id&&t.id===this.currentAIMessageId){this.logger.debug("message is streaming");return}if(this.messages.slice(-5).some(a=>t.type==="system"&&a.type==="system"?a.content===t.content:a.type===t.type&&a.content===t.content?t.timestamp&&a.timestamp?Math.abs(new Date(t.timestamp)-new Date(a.timestamp))<2e3:!0:!1)){this.logger.debug("duplicate message");return}if(!t.content&&t.type!=="form"){this.logger.debug("no content in message, skipping");return}this.messages.push(t),this.renderSingleMessage(t,{silent:e}),this.onScrollToBottom(),this.onUpdateActiveStatus();let o=t.type==="ai"||t.type==="agent"||t.type==="user";s&&o&&this.onDispatchEvent("start",{sessionId:this.sessionId,durableObjectId:this.durableObjectId,isNewSession:!this.sessionId}),(t.type==="ai"||t.type==="agent")&&this.onDispatchEvent("received",{messageType:t.type,content:t.content,messageId:t.id,hasMedia:!!t.mediaUrl,timestamp:t.timestamp||Date.now()})}renderSingleMessage(t,{silent:e=!1}={}){var a,r;if(!this.messagesContainerEl)return;let s=t.type;if(!s&&t.role&&(t.role==="assistant"?s="ai":t.role==="user"?s="user":s=t.role),t.content&&t.content.startsWith("ping client:")||s==="system"&&t.clientVisible===!1)return;s!=="ai_chunk"&&s!=="ai_message_start"&&(this.showTypingIndicator(!1),(a=this.messagesContainerEl.querySelector(".ai-status-indicator"))==null||a.remove(),(r=this.messagesContainerEl.querySelector(".typing-indicator"))==null||r.remove());let i=document.createElement("div");i.classList.add("message");let n=s==="user"?"user":s==="ai"||s==="agent"?"other":s==="system"?"system":s==="status"?"status":s==="form"?"form":"other";i.classList.add(n),t.welcome&&i.classList.add("welcome");let o=s==="agent"?"agent":s==="ai"?"ai":n;if(i.setAttribute("part",`message message-${o}`),i.setAttribute("data-message-id",t.id||""),t.timestamp&&s!=="system"&&s!=="status"){let l=document.createElement("div");l.classList.add("timestamp"),l.textContent=ee(new Date(t.timestamp)),i.appendChild(l)}if(s==="form"&&t.form)this.renderFormInMessage(i,t);else if(s==="user"||s==="agent"){let l=document.createElement("div");l.classList.add("text"),l.textContent=t.content,i.appendChild(l)}else if(s==="ai"){let l=document.createElement("div");l.classList.add("text"),l.innerHTML=this.onRenderMarkdown(t.content),i.appendChild(l)}else s==="system"||s==="status"?(i.textContent=t.content,t.temporary&&i.classList.add("temporary")):s!=="form"&&(i.textContent=t.content||"");if(t.file&&(t.file.url||t.file.preview)){let l=document.createElement("div");l.style.display="flex",l.style.flexDirection="column",l.style.gap="8px";let h=document.createElement("div");if(h.textContent=t.content||`Uploaded: ${t.file.name}`,l.appendChild(h),!t.file.type||t.file.type.startsWith("image/")){let d=document.createElement("img"),u=t.file.secureUrl||t.file.url||t.file.preview;d.src=u,d.style.maxWidth="200px",d.style.maxHeight="200px",d.style.borderRadius="8px",d.style.cursor="pointer",d.onclick=()=>{window.open(t.file.secureUrl||t.file.publicUrl||t.file.url||t.file.preview,"_blank")},l.appendChild(d)}i.appendChild(l)}else if(t.media&&t.media.length>0)this.renderMediaAttachments(i,t);else if(t.mediaUrl){let l=document.createElement("div");l.classList.add("media-container");let h=document.createElement("a");h.href=t.mediaUrl,h.target="_blank",h.rel="noopener noreferrer";let d=document.createElement("img");d.src=t.mediaUrl,d.alt="Uploaded image",d.style.maxWidth="200px",d.style.maxHeight="200px",d.style.borderRadius="8px",d.style.cursor="pointer",h.appendChild(d),l.appendChild(h),i.appendChild(l)}i.parentNode||this.messagesContainerEl.appendChild(i),this.aiStatusIndicatorEl&&!this.aiStatusIndicatorEl.classList.contains("hidden")&&this.messagesContainerEl.appendChild(this.aiStatusIndicatorEl),this.typingIndicatorEl&&!this.typingIndicatorEl.classList.contains("hidden")&&this.messagesContainerEl.appendChild(this.typingIndicatorEl),!e&&(s==="ai"||s==="agent")&&this.onPlaySound&&this.onPlaySound()}renderFormInMessage(t,e){var d,u,p;let s=e.form,i=document.createElement("div");i.style.paddingTop="12px";let n=document.createElement("iframe");n.className="ctm-call-widget",n.src=s.url,n.style.width="100%",n.style.border="none";let o=(d=this.messagesContainerEl)==null?void 0:d.getRootNode(),a=((p=(u=o==null?void 0:o.querySelector)==null?void 0:u.call(o,".header"))==null?void 0:p.offsetHeight)||48,l=window.innerHeight-a-80;n.style.height=`${Math.max(l,400)}px`,n.style.minHeight="400px",n.style.maxHeight="100%",i.appendChild(n),t.appendChild(i);let h=s.url.split("/").pop().split(".").shift();if(this.onFormLoad(h,{div:t,origin:new URL(s.url).origin,send_to_ai:e.send_to_ai||!1,formConfig:e.formConfig}),setTimeout(()=>{this.onAdjustWindowHeight(),this.onUpdateUIBasedOnState(),i.scrollIntoView({behavior:"smooth"}),setTimeout(()=>{this.onAdjustWindowHeight(),i.scrollIntoView({behavior:"smooth"})},1e3)},100),!window.__ctm_loader_run){let f=document.createElement("script");f.src=s.script,t.appendChild(f)}}renderMessages(){this.messagesContainerEl&&(this.messagesContainerEl.innerHTML="",this.messages.forEach(t=>{this.renderSingleMessage(t,{silent:!0})}),this.onScrollToBottom())}createNewAIMessageElement(t){var n;if(!this.messagesContainerEl)return;(n=this.currentAIMessageElement)==null||n.remove(),this.showTypingIndicator(!1);let e=document.createElement("div");e.classList.add("message","ai","streaming"),e.setAttribute("data-message-id",t);let s=document.createElement("div");s.classList.add("timestamp"),s.textContent=ee(new Date),e.appendChild(s);let i=document.createElement("div");i.classList.add("text"),e.appendChild(i),e.parentNode||this.messagesContainerEl.appendChild(e),this.currentAIMessageElement=e,this.currentAIMessageId=t,this.aiStatusIndicatorEl||(this.aiStatusIndicatorEl=document.createElement("div"),this.aiStatusIndicatorEl.classList.add("ai-status-indicator"),this.aiStatusIndicatorEl.innerHTML='<span class="dot"></span><span class="dot"></span><span class="dot"></span>'),this.messagesContainerEl.appendChild(this.aiStatusIndicatorEl),this.onScrollToBottom()}updateAIMessage(t){if(!this.currentAIMessageElement)return;let e=this.currentAIMessageElement.querySelector(".text");if(e){let i=(e.getAttribute("data-raw-content")||"")+t;e.setAttribute("data-raw-content",i),e.textContent=i,this.onScrollToBottom()}}finalizeAIMessage(t,e){var i;if(!this.currentAIMessageElement||this.currentAIMessageId!==e)return;let s=this.currentAIMessageElement.querySelector(".text");if(s&&t&&(s.innerHTML=this.onRenderMarkdown(t)),this.currentAIMessageElement.classList.remove("streaming"),(i=this.aiStatusIndicatorEl)==null||i.remove(),t){let n={type:"ai",role:"assistant",content:t,id:e,timestamp:Date.now()};this.messages.push(n),this.onUpdateActiveStatus(),this.onDispatchEvent("received",{messageType:"ai",content:t,messageId:e,timestamp:n.timestamp})}this.currentAIMessageElement=null,this.currentAIMessageId=null,this.onScrollToBottom()}showTypingIndicator(t=!0,e=null){var s;if(t){if(!this.typingIndicatorEl){this.typingIndicatorEl=document.createElement("div"),this.typingIndicatorEl.classList.add("typing-indicator");let i=document.createElement("div");i.classList.add("typing-bubble"),i.innerHTML="<span></span><span></span><span></span>",this.typingIndicatorEl.appendChild(i)}if(e){let i=document.createElement("span");i.classList.add("typing-message"),i.textContent=e,this.typingIndicatorEl.appendChild(i)}!this.typingIndicatorEl.parentNode&&this.messagesContainerEl&&(this.messagesContainerEl.appendChild(this.typingIndicatorEl),this.onScrollToBottom())}else(s=this.typingIndicatorEl)==null||s.remove(),this.typingIndicatorEl=null}clearMessages(){this.messages=[],this.typingIndicatorEl=null,this.messagesContainerEl&&(this.messagesContainerEl.innerHTML="")}getMessages(){return this.messages}filterMessages(t){this.messages=this.messages.filter(t),this.renderMessages()}renderMediaAttachments(t,e){let s=document.createElement("div");if(s.style.display="flex",s.style.flexDirection="column",s.style.gap="8px",e.content){let i=document.createElement("div");i.textContent=e.content,s.appendChild(i)}e.media.forEach(i=>{let n=typeof i=="string"?i:i.url,o=typeof i=="object"?i.contentType:"image/jpeg",a=typeof i=="object"?i.filename:"attachment";if(o&&o.startsWith("image/")){let r=document.createElement("img");r.src=n,r.style.maxWidth="200px",r.style.maxHeight="200px",r.style.borderRadius="8px",r.style.cursor="pointer",r.style.marginTop="8px",r.title=a,r.onclick=()=>{window.open(n,"_blank")},r.onerror=async()=>{if(n.includes("twilio.com")&&i.sid)try{let h=await this.onFetchFreshMediaUrl(i.sid);if(h){r.src=h,r.onclick=()=>{window.open(h,"_blank")};return}}catch(h){this.logger.error("Failed to fetch fresh media URL:",h)}let l=document.createElement("a");l.href=n,l.target="_blank",l.textContent=`View ${a}`,l.style.color="#3b82f6",r.replaceWith(l)},s.appendChild(r)}else{let r=document.createElement("a");r.href=n,r.target="_blank",r.textContent=`\u{1F4CE} ${a}`,r.style.color="#3b82f6",r.style.display="block",r.style.marginTop="8px",s.appendChild(r)}}),t.appendChild(s)}};var R=class{static get(){return`
        :host {
          all: initial; /* Prevent inheriting styles from host page */
          position: fixed;
          bottom: var(--ctm-chat-bottom-offset, 24px);
          right: var(--ctm-chat-right-offset, 24px);
          z-index: var(--ctm-chat-z-index, 9999);
          font-family: var(--ctm-chat-font-family, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif);
          font-size: 16px;
          line-height: 1.5;
          transition: opacity 0.3s ease, transform 0.3s ease;
          /* Start hidden to prevent flicker before schedule check */
          opacity: 0;
          pointer-events: none;
           --primary-color: var(--ctm-chat-primary-color, var(--ctm-chat-primary-color-default));
           --primary-color-dark: var(--ctm-chat-primary-color-dark, var(--ctm-chat-primary-color-dark-default));
           --text-color: var(--ctm-chat-text-color, #333);
           --bg-color: var(--ctm-chat-bg-color, #ffffff);
           --bubble-size: var(--ctm-chat-bubble-size, var(--ctm-chat-bubble-size-default));
           --bubble-icon-size: var(--ctm-chat-bubble-icon-size, var(--ctm-chat-bubble-icon-size-default));
           --window-width: var(--ctm-chat-window-width, var(--ctm-chat-window-width-default));
           --window-height: var(--ctm-chat-window-height, var(--ctm-chat-height-width-default));
           --window-max-height: var(--ctm-chat-window-max-height, 80vh); /* Max height relative to viewport */
           --header-height: 50px;
           --input-area-height: 50px;
        }
        
        /* Show widget after initialization */
        :host(.initialized) {
          opacity: 1;
          pointer-events: auto;
          position: fixed;
          bottom: var(--ctm-chat-bottom-offset, 24px);
          right: var(--ctm-chat-right-offset, 24px);
        }
        
        /* Hide widget when schedule is not active */
        :host(.schedule-hidden) {
          opacity: 0;
          transform: scale(0.8);
          pointer-events: none;
        }
        
        /* Keep widget visible if there's an active chat */
        :host(.schedule-hidden.has-active-chat) {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
        }
        .connection-status {
           width: 12px;
           height: 12px;
           border-radius: 50%;
           background-color: #f87171; /* Default: Red/Error */
           margin-left: 8px;
           transition: background-color 0.3s ease;
           flex-shrink: 0; /* Prevent shrinking */
           box-shadow: 0 0 3px rgba(0,0,0,0.2);
        }
        .connection-status.connecting {
           background-color: #fbbf24;
           animation: pulse 1.5s infinite ease-in-out;
        }
        .connection-status.connected {
           background-color: #34d399;
        }
        .connection-status.disconnected, .connection-status.closed {
           background-color: #9ca3af;
        }
        .connection-status.ended {
           background-color: #ef4444;
        }
        .connection-status.error {
           background-color: #ef4444;
           animation: pulse 1.5s infinite ease-in-out;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* AI Status Indicator (similar to typing, but distinct) */
        .ai-status-indicator {
          display: flex;
          align-items: center;
          padding: 5px 10px;
          align-self: flex-start;
          margin-bottom: 10px;
          font-size: 13px;
          font-style: italic;
          color: #666;
          gap: 5px; /* Space between icon and text */
        }
        .ai-status-indicator svg {
          width: 14px;
          height: 14px;
          animation: spin 1s linear infinite;
          fill: #666;
          display: none; /* Hidden by default */
        }
        .ai-status-indicator.thinking svg, .ai-status-indicator.responding svg, .ai-status-indicator.searching svg {
          display: inline-block;
        }
        .ai-status-indicator.hidden { display: none; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        /* --- Bubble --- */
        .bubble {
          width: var(--bubble-size);
          height: var(--bubble-size);
          background: var(--ctm-chat-bubble-background, linear-gradient(135deg, var(--primary-color), var(--primary-color-dark)));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 16px rgba(0,0,0,0.2);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative; /* For icon positioning */
          overflow: hidden; /* Ensure icons stay within bounds during transition */
        }
        
        /* Pill mode when custom text is present */
        .bubble.pill-mode:not(.open) {
          width: auto;
          height: 62px;
          border-radius: 24px;
          padding: 0 24px;
          min-width: 120px;
        }
        .bubble:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.5); /* Use primary color alpha */
        }
        .bubble.open {
          /* No separate open style needed for bubble itself now with icon transition */
        }
        .bubble svg {
          position: absolute;
          width: var(--bubble-icon-size);
          height: var(--bubble-icon-size);
          fill: var(--ctm-chat-bubble-icon-color, white);
          transition: transform 0.3s ease-out, opacity 0.3s ease-out;
        }
        .bubble-custom-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: absolute;
          width: 100%;
          height: 100%;
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }
        
        /* Horizontal layout for pill mode */
        .bubble.pill-mode:not(.open) .bubble-custom-content {
          flex-direction: row;
          gap: 8px;
          position: relative;
        }
        
        .bubble-custom-icon {
          width: var(--bubble-icon-size);
          height: var(--bubble-icon-size);
          fill: var(--ctm-chat-bubble-icon-color, white);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Larger icon in pill mode */
        .bubble.pill-mode:not(.open) .bubble-custom-icon {
          width: 24px;
          height: 24px;
        }
        
        /* Ensure SVGs inside custom icon are properly sized */
        .bubble-custom-icon svg,
        .bubble-custom-icon img {
          width: 32px;
          height: 32px;
          display: block;
        }
        
        .bubble-custom-text {
          font-size: 11px;
          font-weight: 600;
          color: var(--ctm-chat-bubble-icon-color, white);
          margin-top: 2px;
          line-height: 1;
          text-align: center;
        }
        
        /* Better text styling in pill mode */
        .bubble.pill-mode:not(.open) .bubble-custom-text {
          font-size: 16px;
          font-weight: 500;
          margin-top: 0;
          white-space: nowrap;
        }
        .bubble.open .bubble-custom-content {
          opacity: 0;
          transform: rotate(90deg) scale(0.8);
        }
        
        /* Hide default icons in pill mode */
        .bubble.pill-mode:not(.open) .bubble-icon-open,
        .bubble.pill-mode:not(.open) .bubble-icon-close {
          display: none;
        }
        
        /* Ensure pill mode reverts to circle when open */
        /*.bubble.pill-mode.open {
          width: var(--bubble-size);
          height: var(--bubble-size);
          border-radius: 50%;
          padding: 0;
        }*/
        .bubble-icon-open {
          opacity: 1;
          transform: rotate(0deg) scale(1);
        }
        .bubble-icon-close {
          opacity: 0;
          transform: rotate(-90deg) scale(0.8);
        }
        .bubble.open .bubble-icon-open {
          opacity: 0;
          transform: rotate(90deg) scale(0.8);
        }
        .bubble.open .bubble-icon-close {
          opacity: 1;
          transform: rotate(0deg) scale(1);
        }

        .engage {
          position: absolute;
          bottom: calc(var(--bubble-size) + 12px); /* Position above bubble */
          right: 0;
          background: var(--ctm-chat-engage-bg, var(--bg-color));
          color: var(--ctm-chat-engage-text-color, var(--primary-color-dark));
          font-size: 14px;
          padding: 10px 14px;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          opacity: 0;
          transform: translateY(10px) scale(0.95);
          pointer-events: none;
          transition: opacity 0.4s ease, transform 0.4s ease, box-shadow 0.2s ease;
          max-width: 260px;
          width: max-content;
          white-space: normal;
          line-height: 1.4;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .engage:hover {
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }
        
        /* Enhanced engage message with icon */
        .engage.has-icon {
          padding: 16px 20px;
          max-width: 340px;
        }
        
        .engage-icon {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          display: none;
          align-items: center;
          justify-content: center;
          background: var(--ctm-chat-engage-icon-bg, rgba(59, 130, 246, 0.1));
          border-radius: 50%;
          overflow: hidden;
          fill: var(--ctm-chat-engage-icon-color, var(--primary-color));
        }

        .engage.has-icon .engage-icon {
          display: flex;
        }

        .engage-icon svg {
          width: 28px;
          height: 28px;
        }

        .engage-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .engage-text {
          flex: 1;
          text-align: left;
        }
        
        /* When no icon, text takes full width */
        .engage:not(.has-icon) .engage-text {
          text-align: center;
        }
        
        /* Close button styling */
        .engage-close {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 20px;
          height: 20px;
          padding: 0;
          margin: 0;
          background: rgba(0, 0, 0, 0.1);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s ease, background 0.2s ease;
          fill: currentColor;
        }
        
        .engage:hover .engage-close {
          opacity: 1;
        }
        
        .engage-close:hover {
          background: rgba(0, 0, 0, 0.2);
        }
        
        .engage-close:active {
          background: rgba(0, 0, 0, 0.3);
        }
        .engage::after { /* Arrow */
          content: '';
          position: absolute;
          bottom: -8px;
          right: calc(var(--bubble-size) / 2 - 8px); /* Center arrow below bubble */
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid var(--ctm-chat-engage-bg, var(--bg-color));
        }
        .engage.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .chat-window {
          position: absolute;
          bottom: calc(var(--bubble-size) + 12px); /* Position above bubble */
          right: 0;
          width: var(--window-width);
          height: var(--window-height);
          max-height: var(--window-max-height);
          background: var(--bg-color);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: translateY(20px) scale(0.95);
          pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease;
          color: var(--text-color);
        }
        .chat-window.open {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .header {
          background: var(--ctm-chat-header-bg, var(--primary-color-dark));
          color: var(--ctm-chat-header-text-color, white);
          padding: 0 16px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: var(--header-height);
          flex-shrink: 0; /* Prevent shrinking */
          box-sizing: border-box;
        }
        .header-title-container {
          display: flex;
          align-items: center;
          overflow: hidden; /* Prevent long titles from pushing controls */
          flex-grow: 1; /* Allow title container to take space */
          margin-right: 10px; /* Space between title/status and controls */
        }
        .header-nav-btn {
          background: none;
          border: none;
          color: inherit;
          padding: 4px;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s;
          margin-right: 6px;
          flex-shrink: 0;
        }
        .header-nav-btn:hover {
          opacity: 1;
        }
        .header-nav-btn svg {
          width: 18px;
          height: 18px;
          display: block;
        }
        .header-title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .header-controls {
          display: flex;
          align-items: center;
          position: relative;
        }
        
        /* Hide mobile close button on desktop */
        @media (min-width: 481px) {
          .mobile-only {
            display: none !important;
          }
        }
        
        /* Show mobile close button on mobile when chat is open */
        @media (max-width: 480px) {
          :host([open="true"]) .mobile-only {
            display: block !important;
          }
        }
        
        .header-controls button {
          background: none;
          border: none;
          color: inherit;
          padding: 4px;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s;
        }
        .header-controls button:hover {
          opacity: 1;
        }
        .header-controls svg {
          width: 18px;
          height: 18px;
          display: block;
        }
        .options-menu {
          position: absolute;
          top: calc(var(--header-height) - 5px);
          right: 5px;
          background: var(--bg-color);
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          padding: 8px 0;
          z-index: 10;
          list-style: none;
          margin: 0;
          min-width: 150px;
          opacity: 0;
          transform: translateY(-10px);
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .options-menu.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .options-menu li button {
          display: block;
          width: 100%;
          text-align: left;
          padding: 8px 16px;
          background: none;
          border: none;
          color: var(--text-color);
          font-size: 14px;
          cursor: pointer;
        }
        .options-menu li button:hover {
          background-color: rgba(0,0,0,0.05);
        }

        .messages-container {
          flex: 1; /* Take remaining space */
          overflow-y: auto;
          padding: 12px 16px;
          display: flex;
          flex-direction: column;
          background-color: var(--ctm-chat-messages-bg, #f9f9f9);
          transition: border-radius 0.3s ease, background-color 0.3s ease;
          position: relative;
        }
        .messages-container.drag-over {
          background-color: #e8f4f8;
          border: 2px dashed #3b82f6;
        }
        .messages-container.drag-over::after {
          content: "Drop images here to upload";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 18px;
          color: #3b82f6;
          font-weight: bold;
          pointer-events: none;
        }
        /* Apply rounded bottom corners when input area is hidden */
        .chat-window.input-hidden .messages-container {
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
          /* Hide messages when AI is disabled to give full space to suggestions */
          display: none;
        }
        /* Show messages container when there are actual messages */
        .chat-window.input-hidden .messages-container:has(.message) {
          display: flex;
        }
        .message {
          margin-bottom: 10px;
          max-width: 85%;
          padding: 10px 14px;
          border-radius: 18px;
          line-height: 1.4;
          word-wrap: break-word;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
          position: relative;
        }
        .message .timestamp {
          display:none;
        }
        .message.user {
          background: var(--ctm-chat-user-message-bg, var(--primary-color));
          color: var(--ctm-chat-user-message-text-color, white);
          align-self: flex-end;
          border-bottom-right-radius: 6px;
        }

        .message.form {
          background: var(--ctm-chat-other-message-bg, var(--bg-color));
          color: var(--ctm-chat-other-message-text-color, var(--text-color));
          align-self: flex-start;
          border-bottom-left-radius: 6px;
          border: 1px solid #eee;
          padding: 0;
          max-width: 100%;
          width: 100%;
          box-sizing: border-box;
        }
        .message.ai,
        .message.other { /* Agent, AI, System */
          background: var(--ctm-chat-other-message-bg, var(--bg-color));
          color: var(--ctm-chat-other-message-text-color, var(--text-color));
          align-self: flex-start;
          border-bottom-left-radius: 6px;
          border: 1px solid #eee;
        }
        .message.ai, .message.other .timestamp {
          float:left;
        }
        .message.status {
          font-style: italic;
          font-size: 13px;
          color: #666;
          background: transparent;
          align-self: center;
          text-align: center;
          max-width: 100%;
          padding: 4px 0;
          box-shadow: none;
          border: none;
        }
        .message.status.welcome {
          max-height: 100px;
          font-size: 16px;
          font-style: normal;
        }
        .message.system {
          font-style: italic;
          font-size: 13px;
          color: #888;
          background: #f5f5f5;
          align-self: center;
          text-align: center;
          max-width: 80%;
          padding: 8px 16px;
          box-shadow: none;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          margin: 15px auto;
        }
        
        .message.other h1, .message.other h2, .message.other h3, .message.other h4, .message.other h5, .message.other h6 {
          margin: 16px 0 8px 0;
          font-weight: 600;
          line-height: 1.25;
        }
        .message.other h1 { font-size: 1.5em; }
        .message.other h2 { font-size: 1.3em; }
        .message.other h3 { font-size: 1.1em; }
        .message.other h4 { font-size: 1em; }
        .message.other h5 { font-size: 0.9em; }
        .message.other h6 { font-size: 0.85em; }
        
        .message.other p, .message.other ul, .message.other ol, .message.other pre, .message.other blockquote, .message.other hr, .message.other table {
          margin: 8px 0;
        }
        .message.other ul, .message.other ol {
          padding-left: 20px;
        }
        .message.other li {
          margin: 4px 0;
        }
        .message.other code {
          background: rgba(0, 0, 0, 0.05);
          padding: 2px 4px;
          border-radius: 3px;
          font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
          font-size: 0.9em;
        }
        .message.other pre {
          background: rgba(0, 0, 0, 0.05);
          padding: 12px;
          border-radius: 6px;
          overflow-x: auto;
        }
        .message.other pre code {
          background: none;
          padding: 0;
        }
        .message.other blockquote {
          border-left: 4px solid #ddd;
          padding-left: 16px;
          color: #666;
        }
        .message.other a {
          color: var(--primary-color);
          text-decoration: underline;
        }
        .message.other a:hover {
          text-decoration: none;
        }
        .message.other strong {
          font-weight: 600;
        }
        .message.other em {
          font-style: italic;
        }
        .message.other hr {
          border: none;
          border-top: 1px solid #ddd;
        }
        
        /* Citation styling */
        .message.other .citation {
          color: var(--primary-color);
          text-decoration: none;
          border-bottom: 1px solid var(--primary-color);
          transition: opacity 0.2s;
          display: inline-block;
          margin: 2px 0;
        }
        
        .message.other .citation:hover {
          opacity: 0.8;
          border-bottom-width: 2px;
        }
        
        .message.other table {
          border-collapse: collapse;
          width: 100%;
        }
        
        .message.other th,
        .message.other td {
          border: 1px solid #ddd;
          padding: 6px 12px;
          text-align: left;
        }
        
        .message.other th {
          background: rgba(0, 0, 0, 0.05);
          font-weight: 600;
        }
        .typing-indicator {
          display: flex;
          align-items: center;
          padding: 5px 10px;
          align-self: flex-start; /* Show on the 'other' side */
          margin-bottom: 10px;
        }
        .typing-indicator span {
          height: 8px;
          width: 8px;
          margin: 0 2px;
          background-color: #aaa;
          border-radius: 50%;
          display: inline-block;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
        .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
        .typing-indicator.hidden { display: none; }

        .suggestion-buttons {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: var(--ctm-chat-suggestions-gap, 12px);
          padding: var(--ctm-chat-suggestions-padding, 16px 20px);
          border-top: 1px solid #f0f0f0;
          background: var(--ctm-chat-suggestions-bg, var(--bg-color));
          flex-shrink: 0; /* Prevent shrinking */
          max-height: var(
            --ctm-chat-suggestions-max-height,
            calc(var(--window-height) - var(--header-height) - var(--input-area-height) - 20px)
          );
          overflow-y: auto; /* Scroll if too many buttons */
          transition: border-radius 0.3s ease;
          box-sizing: border-box;
        }
        .chat-window.suggestions-expanded .messages-container {
          flex-grow: 0;
          flex-basis: auto;
        }
        .chat-window.suggestions-expanded .suggestion-buttons {
          flex-grow: 1;
          min-height: var(--ctm-chat-suggestions-expanded-min-height, 220px);
          max-height: var(
            --ctm-chat-suggestions-expanded-max-height,
            calc(var(--window-height) - var(--header-height) - var(--input-area-height) - 20px)
          );
        }
        /* Apply rounded bottom corners when input area is hidden */
        .chat-window.input-hidden .suggestion-buttons {
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
          /* Center suggestions vertically when AI is disabled */
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          flex: 1;
          min-height: var(--ctm-chat-suggestions-centered-min-height, 200px);
          max-height: none;
          gap: var(--ctm-chat-suggestions-centered-gap, 15px);
          padding: var(--ctm-chat-suggestions-centered-padding, 30px 20px);
          background-color: var(--ctm-chat-messages-bg, #f9f9f9);
        }
        /* Ensure buttons have consistent width when in grid layout */
        .chat-window.input-hidden .suggestion-buttons button {
          width: var(--ctm-chat-suggestion-btn-centered-width, 90%);
          max-width: var(--ctm-chat-suggestion-btn-centered-max-width, 300px);
          padding: var(--ctm-chat-suggestion-btn-centered-padding, 16px 24px);
          font-size: var(--ctm-chat-suggestion-btn-centered-font-size, 15px);
          background-color: var(--bg-color);
          border: 1px solid #e0e0e0;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          transition: all 0.2s ease-in-out;
          box-sizing: border-box;
        }
        .chat-window.input-hidden .suggestion-buttons button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.1);
        }
        .suggestion-buttons button {
          width: 100%;
          padding: var(--ctm-chat-suggestion-btn-padding, 12px 18px);
          font-size: 14px;
          border: 1px solid var(--ctm-chat-suggestion-btn-border-color, #e0e0e0);
          border-radius: 24px;
          background: var(--ctm-chat-suggestion-btn-bg, var(--bg-color));
          color: var(--ctm-chat-suggestion-btn-text-color, var(--primary-color));
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: background 0.2s ease, border-color 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-sizing: border-box;
        }
        .suggestion-buttons button:hover {
          background: var(--ctm-chat-suggestion-btn-hover-bg, #f9f9f9);
          border-color: var(--ctm-chat-suggestion-btn-hover-border-color, var(--primary-color));
        }

        .chat-input-area {
          display: flex;
          border-top: 1px solid #ddd;
          flex-shrink: 0; /* Prevent shrinking */
          height: var(--input-area-height);
          box-sizing: border-box;
          background: var(--bg-color);
          transition: all 0.3s ease;
        }
        .chat-input-area.hidden {
          display: none;
        }
        .chat-input-area input[type="text"] {
          flex: 1;
          border: none;
          padding: 0 16px;
          font-size: 14px;
          background: transparent;
          color: var(--text-color);
        }
        .chat-input-area input[type="text"]:focus {
          outline: none;
          box-shadow: none;
        }
        .chat-input-area input[type="text"]::placeholder {
          color: #999;
        }
        .chat-input-area input[type="text"]:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
          color: #999;
        }
        .chat-input-area input[type="text"]:disabled::placeholder {
          color: #666;
          font-style: italic;
        }
        .chat-input-area button {
          background: var(--primary-color);
          border: none;
          color: white;
          padding: 0 18px;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chat-input-area button:hover {
          background: var(--primary-color-dark);
        }
        .chat-input-area button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        .chat-input-area button svg {
          width: 20px;
          height: 20px;
          fill: currentColor;
        }

        /* --- Responsive Adjustments --- */
        
        /* Tablet devices */
        @media (max-width: 768px) {
          :host {
            --window-width: min(400px, calc(100vw - 48px));
            --window-height: min(600px, calc(100vh - 120px));
            --ctm-chat-right-offset: 20px;
            --ctm-chat-bottom-offset: 20px;
          }
          
          .chat-window {
            font-size: 15px; /* Slightly smaller font for better fit */
          }
          
          .message {
            max-width: 90%; /* More width for messages */
          }
        }
        
        /* Mobile landscape */
        @media (max-width: 667px) and (orientation: landscape) {
          :host {
            --window-height: calc(100vh - 80px); /* Use more vertical space */
            --window-max-height: calc(100vh - 80px);
          }
          
          .chat-window {
            bottom: 8px; /* Reduce spacing in landscape */
          }
          
          .messages-container {
            padding: 8px 12px; /* Reduce padding */
          }
        }
        
        /* Small mobile devices */
        @media (max-width: 480px) {
          :host {
            --window-width: 100vw;
            --window-height: 100vh;
            --window-max-height: 100vh;
            --ctm-chat-right-offset: 0;
            --ctm-chat-bottom-offset: 0;
            --bubble-size: 56px;
            --bubble-icon-size: 24px;
          }
          
          /* Full screen chat window on mobile */
          .chat-window {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100vw;
            height: 100vh;
            max-height: 100vh;
            border-radius: 0;
            box-shadow: none;
          }
          
          /* Adjust bubble position on mobile */
          .bubble {
            bottom: 20px;
            right: 20px;
            z-index: 10000;
          }
          
          /* Show engage message on mobile devices */
          .engage {
            display: block !important;
            bottom: calc(56px + 32px); /* Position above mobile bubble */
            right: 20px;
            max-width: calc(100vw - 40px);
            font-size: 14px;
          }
          
          .engage::after {
            right: 28px; /* Align arrow with bubble center on mobile */
          }
          
          /* Mobile-optimized header */
          .header {
            padding: 0 12px;
            height: 48px;
            --header-height: 48px;
          }
          
          .header-title {
            font-size: 16px;
          }
          
          /* Mobile-optimized messages */
          .messages-container {
            padding: 10px 12px;
            /* Add safe area padding for devices with notches */
            padding-left: max(12px, env(safe-area-inset-left));
            padding-right: max(12px, env(safe-area-inset-right));
          }
          
          .message {
            max-width: 85%;
            font-size: 15px;
            padding: 8px 12px;
          }
          
          /* Full width for form messages on mobile */
          .message.form {
            max-width: 100%;
            margin: 0;
            padding: 0;
          }
          
          /* When form is present and keyboard is active, adjust layout */
          .chat-window.keyboard-active .messages-container:has(.message.form) {
            padding-bottom: 20px;
          }
          
          /* When form is displayed, ensure messages container uses full height */
          .chat-window .messages-container:has(.message.form) {
            height: calc(100vh - var(--header-height));
            max-height: calc(100vh - var(--header-height));
            overflow-y: auto;
            padding: 0;
          }
          
          /* Hide input area when form is present on mobile */
          .chat-window:has(.message.form) .chat-input-area {
            display: none;
          }
          
          /* Optimize suggestion buttons for mobile */
          .suggestion-buttons {
            padding: 8px 12px;
            gap: 6px;
            max-height: 100px;
            /* Ensure they're scrollable with touch */
            -webkit-overflow-scrolling: touch;
            overflow-x: auto;
            overflow-y: hidden;
          }
          
          /* When input is hidden on mobile, adjust suggestion buttons to avoid widget overlap */
          .chat-window.input-hidden .suggestion-buttons {
            /* Override the centered layout for mobile */
            padding-bottom: calc(56px + 40px); /* Account for bubble size + spacing */
            min-height: auto;
            flex: 1;
            border-radius: 0; /* Remove rounded corners on full screen mobile */
            overflow: hidden; /* Prevent scroll within suggestions container */
            position: relative;
          }
          
          /* Prevent scrolling issues on mobile when input is hidden */
          .chat-window.input-hidden {
            overflow: hidden;
          }
          
          /* Show messages container only if it has any messages */
          .chat-window.input-hidden .messages-container {
            display: none !important;
          }
          
          /* But show it if there are any messages */
          .chat-window.input-hidden .messages-container:has(.message) {
            display: flex !important;
            flex: 1; /* Allow it to grow to fill space */
            padding: 12px 16px;
            background-color: transparent;
            border-bottom: none;
          }
          
          .suggestion-buttons button {
            font-size: 13px;
            padding: 6px 12px;
            white-space: nowrap;
            flex-shrink: 0;
          }
          
          /* Mobile-optimized input area */
          .chat-input-area {
            height: 52px;
            --input-area-height: 52px;
            padding: 0;
            /* Add safe area padding for devices with notches */
            padding-bottom: env(safe-area-inset-bottom);
          }
          
          .chat-input-area input[type="text"] {
            font-size: 16px; /* Prevent zoom on iOS */
            padding: 0 12px;
          }
          
          .chat-input-area button {
            padding: 0 16px;
            min-width: 52px;
          }
          
          /* Optimize dropdowns for mobile */
          .options-menu {
            right: 10px;
            top: 45px;
            min-width: 140px;
          }
        }
        
        /* Very small devices */
        @media (max-width: 400px) {
          :host {
             --window-width: calc(100vw - 32px); /* Adjust width on small screens */
             --ctm-chat-right-offset: 16px;
             --ctm-chat-bottom-offset: 16px;
             --bubble-size: 56px;
             --bubble-icon-size: 24px;
          }
        }
        
        /* Keyboard active state for mobile */
        .chat-window.keyboard-active {
          transition: height 0.3s ease-out, top 0.3s ease-out;
        }
        
        .chat-window.keyboard-active .messages-container {
          transition: height 0.3s ease-out;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        
        /* Touch-friendly adjustments */
        @media (hover: none) and (pointer: coarse) {
          /* Increase touch targets */
          .bubble {
            --bubble-size: 60px;
          }
          
          .header-controls button {
            padding: 8px;
            min-width: 44px;
            min-height: 44px;
          }
          
          .suggestion-buttons button {
            min-height: 44px;
            padding: 10px 16px;
          }
          
          .chat-input-area button {
            min-width: 56px;
          }
          
          /* Remove hover effects on touch devices */
          .bubble:hover {
            transform: none;
            box-shadow: 0 6px 16px rgba(0,0,0,0.2);
          }
          
          .suggestion-buttons button:hover {
            background: var(--ctm-chat-suggestion-btn-bg, var(--bg-color));
            border-color: var(--ctm-chat-suggestion-btn-border-color, #e0e0e0);
          }
          
          /* Add active states for better touch feedback */
          .bubble:active {
            transform: scale(0.95);
          }
          
          .suggestion-buttons button:active {
            background: var(--ctm-chat-suggestion-btn-hover-bg, #f9f9f9);
            transform: scale(0.95);
          }
          
          .chat-input-area button:active {
            transform: scale(0.95);
          }
          
          /* Improve scrolling performance */
          .messages-container {
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
          }
        }
        
        /* Accessibility improvements for mobile */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
    `}};var D=class{constructor(t,e,s){this.widget=t,this.root=e,this.logger=s||console,this.stateUnsubscribers=[]}render(){this.root.innerHTML=`
        <style>${R.get()}</style>
        <div class="engage" id="engage-message" part="engage-message-bubble">
          <div class="engage-icon" id="engage-icon"></div>
          <div class="engage-text" id="engage-text"></div>
          <button class="engage-close" id="engage-close" aria-label="Dismiss">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        <div class="bubble" id="chat-toggle" part="bubble-container">
          <svg class="bubble-icon-open" viewBox="0 0 24 24" part="bubble-icon-open">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
          <svg class="bubble-icon-close" viewBox="0 0 24 24" part="bubble-icon-close">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
          <div class="bubble-custom-content" id="bubble-custom-content" style="display: none;">
            <div class="bubble-custom-icon" id="bubble-custom-icon"></div>
            <div class="bubble-custom-text" id="bubble-custom-text"></div>
          </div>
        </div>

        <div class="chat-window" id="chat-window" part="chat-window-container">
          <div class="header" part="header-bar">
            <div class="header-title-container">
              <button id="back-btn" class="header-nav-btn" title="Back" aria-label="Back" style="display: none;">
                <svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
              </button>
              <span class="header-title" id="header-title"></span>
              <div class="connection-status" id="connection-status" title="Connection Status"></div>
            </div>
            <div class="header-controls">
              <button id="options-toggle-btn" title="Options">
                <svg viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
              </button>
              <ul class="options-menu" id="options-menu" part="options-menu">
                <!--<li><button id="email-transcript-btn">Email Transcript</button></li>-->
                <div id="menu-suggestions-container"></div>
                <li class="menu-divider" id="menu-divider" style="display: none; border-top: 1px solid #eee; margin: 4px 0;"></li>
                <li id="copy-eval-item" style="display: none;"><button id="copy-eval-btn">Copy as Eval</button></li>
                <li id="end-chat-item"><button id="end-chat-btn">End Chat</button></li>
              </ul>
              <button id="header-close-btn" title="Close" aria-label="Close" style="display: none;">
                <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              </button>
              <button id="mobile-close-btn" title="Close" class="mobile-only">
                <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              </button>
            </div>
          </div>
          <div class="messages-container" id="messages-container" part="message-list">
            <div class="ai-status-indicator hidden" id="ai-status-indicator" part="ai-status-indicator">
              <svg viewBox="0 0 24 24">
                <path d="M12 4V1c.6 0 1.1.4 1.1.9v.1c0 .5-.5 1-1.1 1zm0 18v3c-.6 0-1.1-.4-1.1-1v-.1c0-.5.5-1 1.1-1zm8.5-8.5h3c.6 0 1.1-.4 1.1-1h-.1c0-.5-.4-1-1-1zm-17 0H1c-.6 0-1 .4-1 1h.1c0 .5.4 1 1 1zm15.1-6.7L22 4.9c.4-.4.4-1.1 0-1.5l-.1-.1c-.4-.4-1.1-.4-1.5 0zm-12.8 12.8L3 20.8c-.4.4-.4 1.1 0 1.5l.1.1c.4.4 1.1.4 1.5 0zm0-12.8L4.9 3.4c-.4-.4-1.1-.4-1.5 0l-.1.1c-.4.4-.4 1.1 0 1.5zm12.8 12.8l1.5 1.5c.4.4 1.1.4 1.5 0l.1-.1c.4-.4.4-1.1 0-1.5z"/>
              </svg>
              <span class="status-text">Thinking...</span>
           </div>
           <div class="typing-indicator hidden" id="typing-indicator" part="typing-indicator">
              <span></span><span></span><span></span>
          </div>
        </div>

        <div class="suggestion-buttons" id="suggestion-buttons" part="suggestion-buttons-area"></div>

        <div class="chat-input-area hidden" part="input-area-container">
          <input type="file" id="file-input" accept="image/*" multiple style="display: none;" />
          <button id="attach-button" title="Attach File" part="attach-button-element" style="display: none;">
            <svg viewBox="0 0 24 24"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5a2.5 2.5 0 0 1 5 0v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5a2.5 2.5 0 0 0 5 0V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg>
          </button>
          <input type="text" id="chat-input" placeholder="Type a message..." part="input-field-element" autocomplete="off" />
          <button id="send-button" title="Send Message" part="send-button-element">
            <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>
   `,this.updateStyles()}update(){this.updateStyles(),this.updateBubbleIcon(),this.updateEngageMessage(),this.updateUIBasedOnState()}updateStyles(){this.widget.style.setProperty("--ctm-chat-primary-color-default",this.widget.config.chatPrimaryColor),this.widget.style.setProperty("--ctm-chat-primary-color-dark-default",this.widget.config.chatPrimaryColorDark),this.widget.style.setProperty("--ctm-chat-bubble-size-default",this.widget.config.chatBubbleSize),this.widget.style.setProperty("--ctm-chat-bubble-icon-size-default",this.widget.config.chatBubbleIconSize),this.widget.style.setProperty("--ctm-chat-window-width-default",this.widget.config.chatWindowWidth),this.widget.style.setProperty("--ctm-chat-height-width-default",this.widget.config.chatWindowHeight)}updateBubbleIcon(){let t=window.location.href,e=this.widget.config.iconText,s=this.widget.config.iconImage;if(this.widget.config.iconTexts&&Array.isArray(this.widget.config.iconTexts)){for(let l of this.widget.config.iconTexts)if(!l.conditions||l.conditions.length===0||this.widget.evaluateConditions(l.conditions)){e=l.text;break}}if(this.widget.config.iconImages&&Array.isArray(this.widget.config.iconImages)){for(let l of this.widget.config.iconImages)if(!l.conditions||l.conditions.length===0||this.widget.evaluateConditions(l.conditions)){s=l.image;break}}let i=this.root.querySelector(".bubble-icon-open"),n=this.root.querySelector(".bubble-icon-close"),o=this.root.getElementById("bubble-custom-content"),a=this.root.getElementById("bubble-custom-icon"),r=this.root.getElementById("bubble-custom-text");s||e?(i&&(i.style.display="none"),o&&(o.style.display="flex"),e&&this.widget.bubbleEl&&this.widget.bubbleEl.classList.add("pill-mode"),s&&a?s.startsWith("<svg")?a.innerHTML=s:s.startsWith("data:")||s.startsWith("http")?a.innerHTML=`<img src="${s}" />`:a.innerHTML=`<svg viewBox="0 0 24 24">${s}</svg>`:e&&a?a.innerHTML='<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>':a&&(a.style.display="none"),e&&r?(r.textContent=e,r.style.display="block"):r&&(r.style.display="none")):(i&&(i.style.display=""),o&&(o.style.display="none"),this.widget.bubbleEl&&this.widget.bubbleEl.classList.remove("pill-mode"))}updateEngageMessage(){let t=this.widget.config.engageMessage,e=this.widget.config.engageMessageIcon||null;if(this.widget.config.engageMessages&&Array.isArray(this.widget.config.engageMessages)){let s=!1;for(let i of this.widget.config.engageMessages)if(!i.conditions||i.conditions.length===0||this.widget.evaluateConditions(i.conditions)){t=i.message,e=i.icon||e,s=!0;break}}this.widget.engageMessageEl&&this.widget.engageTextEl&&(this.widget.engageTextEl.textContent=t||"",e&&this.widget.engageIconEl?(this.widget.engageMessageEl.classList.add("has-icon"),e.startsWith("<svg")?this.widget.engageIconEl.innerHTML=e:e.startsWith("data:")||e.startsWith("http")?this.widget.engageIconEl.innerHTML=`<img src="${e}" />`:e.startsWith("<path")?this.widget.engageIconEl.innerHTML=`<svg viewBox="0 0 24 24">${e}</svg>`:this.widget.engageIconEl.innerHTML=e):(this.widget.engageMessageEl.classList.remove("has-icon"),this.widget.engageIconEl&&(this.widget.engageIconEl.innerHTML="")))}updateUIBasedOnState(){var u,p,f,v,M,b,E,C;let t=((u=this.widget.stateManager)==null?void 0:u.get("connectionStatus"))||"disconnected",e=t==="connected",s=t==="connecting",i=t==="ended",n=this.widget.chatWindowEl||this.root.getElementById("chat-window"),o=(p=this.widget.stateManager)==null?void 0:p.get("aiEnabled"),a=!!((f=this.widget.stateManager)!=null&&f.get("waitingForAgent")),r=((v=this.widget.messageHandler)==null?void 0:v.getMessages())||[],l=r.some(y=>y.type==="form"),h=typeof this.widget.hasActiveConversation=="function"?this.widget.hasActiveConversation():((M=this.widget.stateManager)==null?void 0:M.get("callId"))||((b=this.widget.stateManager)==null?void 0:b.get("waitingForAgent"))||r.some(y=>["user","ai","agent"].includes(y.type)||y.role==="user"||y.role==="assistant"||y.twilioMessage),d=l&&!h;if(this.updateInputState(),this.widget.optionsToggleBtn){let y=this.widget.currentSuggestions&&this.widget.currentSuggestions.length>0,x=this.widget.copyEvalItemEl&&this.widget.copyEvalItemEl.style.display!=="none",w=y||x||h;this.widget.optionsToggleBtn.style.display=d||!w?"none":"",this.widget.optionsToggleBtn.disabled=!1,(d||!w)&&((E=this.widget.optionsMenuEl)==null||E.classList.remove("visible"))}if(this.widget.backBtnEl&&(this.widget.backBtnEl.style.display=d?"":"none"),this.widget.headerCloseBtnEl&&(this.widget.headerCloseBtnEl.style.display=d?"":"none"),this.widget.mobileCloseBtn&&(this.widget.mobileCloseBtn.style.display=d?"none":""),this.widget.endChatItemEl&&(this.widget.endChatItemEl.style.display=h?"":"none"),this.widget.connectionStatusEl){this.widget.connectionStatusEl.classList.remove("connected","connecting","disconnected","closed","error","ended");let y=t==="error"?"error":t;this.widget.connectionStatusEl.classList.add(y);let x=`Status: ${t.charAt(0).toUpperCase()+t.slice(1)}`,w=r.length>0?r[r.length-1]:null;t==="error"&&(w==null?void 0:w.type)==="system"&&w.content.startsWith("Error:")||(t==="disconnected"||t==="closed")&&(w==null?void 0:w.type)==="system"&&w.content.includes("disconnected")?x=w.content:t==="error"&&this.widget.reconnectAttempts>0&&(x+=` (Attempt ${this.widget.reconnectAttempts}/${this.widget.config.maxReconnectAttempts})`),this.widget.connectionStatusEl.title=x}if(this.widget.suggestionsContainerEl){let y=(C=this.widget.stateManager)==null?void 0:C.get("callId"),x=!1;y||l||a||h&&o?this.widget.suggestionsContainerEl.style.display="none":this.widget.suggestionsContainerEl.querySelectorAll("button").length>0?(this.widget.suggestionsContainerEl.style.display="",x=r.filter(_=>!["system","form"].includes(_.type)).length<=1):this.widget.suggestionsContainerEl.style.display="none",n&&n.classList.toggle("suggestions-expanded",x)}}updateAIStatusIndicator(t,e=!1){if(!this.widget.aiStatusIndicatorEl||!this.widget.messagesContainerEl)return;let s=this.widget.aiStatusIndicatorEl.querySelector(".status-text"),i=this.widget.aiStatusIndicatorEl.querySelector("svg");if(e||t==="idle"||t==="completed"||!t){this.widget.aiStatusIndicatorEl.classList.add("hidden"),this.widget.aiStatusIndicatorEl.remove();return}this.widget.aiStatusIndicatorEl.parentNode||this.widget.messagesContainerEl.appendChild(this.widget.aiStatusIndicatorEl),this.widget.aiStatusIndicatorEl.classList.remove("hidden"),this.widget.aiStatusIndicatorEl.classList.remove("thinking","responding","searching","error","incomplete");let n="",o=!1,a="";switch(t){case"thinking":n="Thinking...",o=!0,a="thinking";break;case"responding":n="Responding...",o=!0,a="responding";break;case"searching_files":case"searching_web":n="Searching...",o=!0,a="searching";break;case"processing_tools":n="Processing request...",o=!0,a="processing";break;case"error":n="Error occurred",o=!1,a="error";break;case"incomplete":n="Response incomplete",o=!1,a="incomplete";break;default:n=t;break}s&&(s.textContent=n),i&&(i.style.display=o?"inline-block":"none"),a&&this.widget.aiStatusIndicatorEl.classList.add(a),this.widget.scrollToBottom()}listenForStateChanges(t){let e=t.subscribe("connectionStatus",()=>{this.updateUIBasedOnState(),this.updateInputState()});this.stateUnsubscribers.push(e);let s=t.subscribe("aiEnabled",()=>{this.updateUIBasedOnState(),this.updateInputState()});this.stateUnsubscribers.push(s);let i=t.subscribe("callId",()=>{this.updateUIBasedOnState()});this.stateUnsubscribers.push(i);let n=t.subscribe("waitingForAgent",()=>{this.updateUIBasedOnState(),this.updateInputState()});this.stateUnsubscribers.push(n);let o=t.subscribe("attachmentsEnabled",a=>{this.setAttachmentButtonVisibility(a)});this.stateUnsubscribers.push(o)}cleanup(){this.stateUnsubscribers.forEach(t=>t()),this.stateUnsubscribers=[]}updateInputState(){var v,M,b,E,C;let t=this.root.querySelector(".chat-input-area"),e=this.root.getElementById("chat-input"),s=this.root.getElementById("send-button"),i=this.root.getElementById("chat-window"),n=this.widget.stateManager.get("connectionStatus"),o=n==="connected",a=n==="ended",r=this.widget.stateManager.get("aiEnabled"),l=!!this.widget.stateManager.get("callId"),h=!!this.widget.stateManager.get("waitingForAgent"),d=Array.isArray(this.widget.currentSuggestions)&&this.widget.currentSuggestions.length>0||((v=this.widget.suggestionsContainerEl)==null?void 0:v.querySelectorAll("button").length)>0,u=!r&&!l&&!h&&!d,p=a&&r,f=o&&!h&&(r||l||u)||p;if(e&&(e.disabled=!f,p?e.placeholder="Start a new chat...":o?h?e.placeholder="Connecting you to an agent...":l&&!r?e.placeholder="Type your message to the agent...":r||u?e.placeholder="Type your message...":e.placeholder="Please select a suggestion to start":e.placeholder="Connecting..."),t&&(!r&&!l&&!p&&d?(t.classList.add("hidden"),i==null||i.classList.add("input-hidden")):(t.classList.remove("hidden"),i==null||i.classList.remove("input-hidden"))),s&&e){let y=((M=e.value)==null?void 0:M.trim().length)===0,x=this.widget.stateManager.isConnected()&&!h&&(r||l||u)||p;s.disabled=y||!x}this.logger.debug("[CTM Chat] updateInputState",{connectionStatus:n,aiEnabled:r,hasSuggestions:d,allowFreeText:u,canType:f,isEnded:a,hasActiveCall:l,waitingForAgent:h,canResumeWithText:p,inputHidden:((b=t==null?void 0:t.classList)==null?void 0:b.contains("hidden"))||!1,currentSuggestions:(E=this.widget.currentSuggestions)==null?void 0:E.length,domButtons:(C=this.widget.suggestionsContainerEl)==null?void 0:C.querySelectorAll("button").length}),this.adjustWindowHeight()}scrollToBottom(){requestAnimationFrame(()=>{let t=this.root.getElementById("messages-container");t&&(t.scrollTop=t.scrollHeight)})}adjustWindowHeight(){let t=this.root.getElementById("chat-window"),e=this.widget.stateManager.get("isOpen");!t||!e||(t.style.height="100dvh")}updateHeaderText(t){let e=this.root.getElementById("header-title");e&&(e.textContent=t)}hideEngageMessage(){let t=this.root.getElementById("engage-message");t&&(t.classList.remove("visible"),setTimeout(()=>{t.style.pointerEvents="none"},400))}showEngageMessage(){let t=this.root.getElementById("engage-message");t&&!this.widget.stateManager.get("engageMessageDismissed")&&(t.style.pointerEvents="auto",t.classList.add("visible"),this.widget.gtmTracker&&this.widget.gtmTracker.trackEngagement("displayed"))}focusInput(){let t=this.root.getElementById("chat-input");t&&t.focus()}clearInput(){let t=this.root.getElementById("chat-input");t&&(t.value="")}getInputValue(){let t=this.root.getElementById("chat-input");return t?t.value.trim():""}setAttachmentButtonVisibility(t){let e=this.root.getElementById("attach-button");e&&(e.style.display=t?"block":"none")}};var P=class{constructor(t){this.logger=t||console,this.agentAvailability={},this.config={headerText:"Chat with Us",welcomeMessage:"\u{1F4AC} Hey! How can we help you today?",engageMessage:"\u{1F4AC} Need help with anything?",suggestions:["Talk to support","Ask about pricing","Learn more"],chatId:null,baseApiUrl:null,baseWsUrl:null,host:null,protocol:"https:",maxReconnectAttempts:5,reconnectDelayMs:3e3,chatPrimaryColor:"#3b82f6",chatPrimaryColorDark:"#1e40af",chatBubbleSize:"64px",chatBubbleIconSize:"28px",chatWindowWidth:"340px",chatWindowHeight:"500px",iconText:null,iconImage:null,iconTexts:[],iconImages:[],engageMessageIcon:null,engageMessageTimer:8,attachmentsEnabled:!1,aiEnabled:!1,singleButtonDefault:!0,schedules:{},welcomeMessages:[]}}get(){return this.config}updateFromToken(t){return this.config.host=t.h,this.config.protocol=t.p,this.config.chatId=`${t.r}.${t.a}.${t.i}`,this.config.accountId=t.a,this.config.id=t.i,this.config.region=t.r,this.updateBaseUrls(),this.config}updateBaseUrls(){if(!this.config.host){this.config.baseApiUrl=null,this.config.baseWsUrl=null;return}try{let t=this.config.protocol||window.location.protocol,e=this.config.host.toLowerCase();!e.startsWith("http://")&&!e.startsWith("https://")?this.config.baseApiUrl=`${t}//${this.config.host}`:this.config.baseApiUrl=this.config.host;let s=new URL(this.config.baseApiUrl),i=s.protocol==="https:"?"wss:":"ws:";this.config.baseWsUrl=`${i}//${s.host}`}catch(t){this.logger.error("Error deriving base URLs from host:",t),this.config.baseApiUrl=null,this.config.baseWsUrl=null}}merge(t,e=["chatId","host"]){let s={};return e.forEach(i=>{this.config[i]&&(s[i]=this.config[i])}),this.config={...this.config,...t},Object.assign(this.config,s),this.config}async fetch(){if(!this.config.chatId||!this.config.baseApiUrl)throw new Error("Configuration ID or Host missing.");let t=`${this.config.baseApiUrl}/api/chat-config/${encodeURIComponent(this.config.chatId)}`;try{let e=await fetch(t,{mode:"cors"});if(!e.ok)throw e.status===404?new Error("Configuration not found for this widget ID."):new Error(`Failed to fetch configuration (HTTP ${e.status}).`);let s=await e.json();if(s._scheduleVisibility){let i=s._scheduleVisibility;return delete s._scheduleVisibility,{config:s,scheduleVisibility:i}}return{config:s,scheduleVisibility:null}}catch(e){throw this.logger.error("Error fetching configuration:",e),e}}evaluateScheduleCondition(t){var l;let e=(l=this.config.schedules)==null?void 0:l[t];if(!e)return!1;let s=new Date,i=e.timezone||"UTC",n=e.timezone_offset||0,o=new Date(s.getTime()+n*1e3),a=o.getDay(),r=o.getHours()*60+o.getMinutes();for(let h of e.times||[]){let{start_time:d,end_time:u,days:p}=h;if(p[a]&&r>=d&&r<=u)return!0}return!1}evaluateUrlContainsCondition(t){return window.location.href.toLowerCase().includes(t.toLowerCase())}setAgentAvailability(t){this.agentAvailability=t||{}}getAgentAvailability(t=null){return!this.agentAvailability||Object.keys(this.agentAvailability).length===0?{available:!0}:t&&this.agentAvailability[t]?this.agentAvailability[t]:Object.values(this.agentAvailability)[0]||{available:!0}}evaluateAgentAvailableCondition(t){let e=t.queue_id||null,s=this.getAgentAvailability(e);if(!s.available)return!1;let i=t.min_available_minutes||0;if(i>0&&s.available_since){let n=Date.now(),o=s.available_since*1e3;return(n-o)/6e4>=i}return!0}evaluateAgentUnavailableCondition(t){let e=t.queue_id||null,s=this.getAgentAvailability(e);if(s.available)return!1;let i=t.min_unavailable_minutes||0;if(i>0&&s.unavailable_since){let n=Date.now(),o=s.unavailable_since*1e3;return(n-o)/6e4>=i}return!0}evaluateConditions(t){if(!t||!Array.isArray(t)||t.length===0)return!0;for(let e of t){let s=!1;switch(e.type){case"schedule":s=!0,this.logger.debug("Schedule condition found on client - should have been filtered by server");break;case"url_contains":s=this.evaluateUrlContainsCondition(e.value);break;case"agent_available":s=this.evaluateAgentAvailableCondition(e);break;case"agent_unavailable":s=this.evaluateAgentUnavailableCondition(e);break;default:s=!0}if(!s)return!1}return!0}isWithinSchedule(t){let e=new Date,s=t.timezone_offset;if(typeof s=="number"){let o=e.getTime()+e.getTimezoneOffset()*6e4;e.setTime(o+s*1e3)}if(t.exceptions&&Array.isArray(t.exceptions)){let o=e.getTime();for(let a of t.exceptions)if(typeof a=="number"&&new Date(a*1e3).toDateString()===e.toDateString())return!1}let i=e.getDay(),n=e.getHours()*60+e.getMinutes();if(t.times&&Array.isArray(t.times))for(let o of t.times){let{start_time:a,end_time:r,days:l}=o;if(l&&l[i]&&n>=a&&n<=r)return!0}return!1}evaluateWelcomeMessage(){if(this.config.welcomeMessages&&Array.isArray(this.config.welcomeMessages)){for(let t of this.config.welcomeMessages)if(!t.conditions||t.conditions.length===0||this.evaluateConditions(t.conditions))return t.message}return this.config.welcomeMessage||"Welcome!"}filterSuggestions(t){return t.filter(e=>typeof e=="string"?!0:typeof e=="object"&&e.label?!e.conditions||this.evaluateConditions(e.conditions):!1)}};var $=class{constructor(t){this.logger=t||console,this.audioContext=null,this.soundBuffers=new Map,this.isInitialized=!1}async initialize(){if(this.isInitialized)return!0;try{return window.AudioContext?(this.audioContext=new AudioContext,this.isInitialized=!0,this.audioContext.state==="suspended"&&await this.audioContext.resume(),!0):(this.logger.warn("AudioContext not supported in this browser"),!1)}catch(t){return this.logger.error("Failed to initialize AudioContext:",t),!1}}async loadSound(t,e){if(!e||!this.audioContext&&!await this.initialize())return!1;try{let s=await fetch(e);if(!s.ok)throw new Error(`Failed to fetch sound: ${s.status}`);let i=await s.arrayBuffer(),n=await this.audioContext.decodeAudioData(i);return this.soundBuffers.set(t,n),this.logger.debug(`Sound loaded: ${t}`),!0}catch(s){return this.logger.error(`Error loading sound ${t}:`,s),!1}}async playSound(t){let e=this.soundBuffers.get(t);(!e||!this.audioContext)&&this.initialize();try{this.audioContext.state==="suspended"&&await this.audioContext.resume();let s=this.audioContext.createBufferSource();return s.buffer=e,s.connect(this.audioContext.destination),s.start(0),!0}catch(s){return this.logger.error(`Error playing sound ${t}:`,s),!1}}async playSoundBuffer(t){if(!t||!this.audioContext)return this.logger.warn("Cannot play sound: no buffer or audio not initialized"),!1;try{this.audioContext.state==="suspended"&&await this.audioContext.resume();let e=this.audioContext.createBufferSource();return e.buffer=t,e.connect(this.audioContext.destination),e.start(0),!0}catch(e){return this.logger.error("Error playing sound buffer:",e),!1}}hasSound(t){return this.soundBuffers.has(t)}getSoundBuffer(t){return this.soundBuffers.get(t)}async cleanup(){if(this.audioContext){try{await this.audioContext.close()}catch(t){this.logger.warn("Error closing AudioContext:",t)}this.audioContext=null}this.soundBuffers.clear(),this.isInitialized=!1}getState(){var t;return{initialized:this.isInitialized,contextState:((t=this.audioContext)==null?void 0:t.state)||"closed",loadedSounds:Array.from(this.soundBuffers.keys())}}};var V=class{constructor(){this.formScriptOrigins=new Map,this.currentFormConfig=null,this.messageHandler=null,this.onFormSubmit=null,this.onFormResize=null,this.onSendMessage=null,this.onDispatchEvent=null,this.handleWindowMessage=this.handleWindowMessage.bind(this)}initialize(t={}){this.messageHandler=t.messageHandler,this.onFormSubmit=t.onFormSubmit||(()=>{}),this.onFormResize=t.onFormResize||(()=>{}),this.onSendMessage=t.onSendMessage||(()=>{}),this.onDispatchEvent=t.onDispatchEvent||(()=>{}),window.addEventListener("message",this.handleWindowMessage)}cleanup(){window.removeEventListener("message",this.handleWindowMessage),this.formScriptOrigins.clear(),this.currentFormConfig=null}registerForm(t,e){this.formScriptOrigins.set(t,e)}handleWindowMessage(t){var s,i;if(!this.formScriptOrigins.has((s=t.data)==null?void 0:s.id))return;let e=this.formScriptOrigins.get(t.data.id);switch((i=t.data)==null?void 0:i.action){case"resize":this.handleFormResize(e,t.data.height);break;case"success":this.handleFormSubmission(t.data.id,t.data.formData);break}}handleFormResize(t,e){let s=t.div.querySelector("iframe");s&&(s.style.height=e+"px"),this.onFormResize&&this.onFormResize()}handleFormSubmission(t,e){let s=this.formScriptOrigins.get(t);this.onDispatchEvent&&this.onDispatchEvent("action",{actionType:"formSubmission",formId:t,submittedData:e,timestamp:Date.now()}),this.onFormSubmit&&this.onFormSubmit({formId:t,submittedData:e,formConfig:s}),s.send_to_ai?this.handleFormSubmissionWithAI(s,e):this.handleFormSubmissionWithoutAI(s,e)}handleFormSubmissionWithAI(t,e){let s={type:"user",content:`Form submitted: ${JSON.stringify(e)}`,timestamp:Date.now(),isFormSubmission:!0,formData:e};this.onSendMessage&&(t.aiEnabled||!1?this.onSendMessage(s):this.onSendMessage({type:"activateAI",content:s.content,formData:e})),this.messageHandler&&this.messageHandler.addMessage({type:"status",content:"Thank you for submitting the form. Processing your request..."})}handleFormSubmissionWithoutAI(t){this.messageHandler&&this.messageHandler.addMessage({type:"status",content:"Thank you for submitting the form. Your information has been received."})}setCurrentFormConfig(t){this.currentFormConfig=t}getCurrentFormConfig(){return this.currentFormConfig}isFormScriptLoaded(){return window.__ctm_loader_run}createFormMessage(t){return{type:"form",form:t.form,send_to_ai:t.send_to_ai||!1,formConfig:t}}extractFormId(t){return t.split("/").pop().split(".").shift()}getFormOrigin(t){return new URL(t).origin}};var k=class{constructor(t){this.logger=t||console,this.state={isOpen:!1,keyboardOpen:!1,ready:!1,connectionStatus:"disconnected",initialConnectionAttempted:!1,sessionId:null,sessionAssignmentReceived:!1,sessionToken:null,sessionTokenExpiry:null,durableObjectId:null,aiEnabled:!1,waitingForAgent:!1,callId:null,didEndChat:!1,attachmentsEnabled:!1,scheduleVisibility:{isVisible:!0,hasSchedule:!1,nextTransition:null,checkInterval:null},agentAvailability:{}},this.listeners=new Map}get(t){let e=t.split("."),s=this.state;for(let i of e)if(s&&typeof s=="object"&&i in s)s=s[i];else return;return s}set(t,e){let s=t.split("."),i=s.pop(),n=this.state;for(let a of s)(!n[a]||typeof n[a]!="object")&&(n[a]={}),n=n[a];let o=n[i];o!==e&&(n[i]=e,this.notifyListeners(t,e,o))}update(t){Object.entries(t).forEach(([e,s])=>{this.set(e,s)})}subscribe(t,e){return this.listeners.has(t)||this.listeners.set(t,new Set),this.listeners.get(t).add(e),()=>{let s=this.listeners.get(t);s&&(s.delete(e),s.size===0&&this.listeners.delete(t))}}notifyListeners(t,e,s){let i=this.listeners.get(t);i&&i.forEach(o=>{try{o(e,s,t)}catch(a){this.logger.error(`Error in state listener for ${t}:`,a)}});let n=t.split(".");for(let o=n.length-1;o>0;o--){let r=n.slice(0,o).join(".")+".*",l=this.listeners.get(r);l&&l.forEach(h=>{try{h(e,s,t)}catch(d){this.logger.error(`Error in wildcard state listener for ${r}:`,d)}})}}isConnected(){return this.state.connectionStatus==="connected"}isConnecting(){return this.state.connectionStatus==="connecting"}isDisconnected(){return this.state.connectionStatus==="disconnected"||this.state.connectionStatus==="closed"||this.state.connectionStatus==="error"}isChatEnded(){return this.state.connectionStatus==="ended"}hasSession(){return!!this.state.sessionId}hasActiveCall(){return!!this.state.callId}canSendMessages(){return this.isConnected()&&this.state.aiEnabled&&!this.state.waitingForAgent&&!this.isChatEnded()}canShowSuggestions(){return!this.hasActiveCall()||this.state.waitingForAgent}isWidgetVisible(){return this.state.scheduleVisibility.isVisible}hasSchedule(){return this.state.scheduleVisibility.hasSchedule}getAgentAvailability(t=null){let e=this.state.agentAvailability;return!e||Object.keys(e).length===0?{available:!0}:t&&e[t]?e[t]:Object.values(e)[0]||{available:!0}}isAgentAvailable(t=null){return this.getAgentAvailability(t).available!==!1}setAgentAvailability(t){this.set("agentAvailability",t)}reset(){this.update({isOpen:!1,keyboardOpen:!1,connectionStatus:"disconnected",sessionId:null,sessionAssignmentReceived:!1,sessionToken:null,sessionTokenExpiry:null,durableObjectId:null,aiEnabled:!1,waitingForAgent:!1,callId:null,didEndChat:!1,attachmentsEnabled:!1})}getSnapshot(){return JSON.parse(JSON.stringify(this.state))}debug(){this.logger.debug("Current Widget State:",this.getSnapshot())}};U(k,"SESSION_COOKIE_NAME","_ccs_");var N=class{constructor(t){this.logger=t||console,this.initialized=!1,this.initializeDataLayer()}initializeDataLayer(){typeof window<"u"&&(window.dataLayer=window.dataLayer||[],this.initialized=!0)}pushEvent(t,e={}){if(this.initialized||this.initializeDataLayer(),typeof window<"u"&&window.dataLayer)try{let s=t.replace(/-/g,"_");window.dataLayer.push({event:s,ctmChat:{...e,timestamp:new Date().toISOString()}})}catch(s){this.logger.warn("Failed to push event to dataLayer:",s)}}trackWidgetInit(t={}){this.pushEvent("ctm-chat-init",{action:"widget_initialized",widgetToken:t.token||"unknown",sessionId:t.sessionId||null})}trackChatToggle(t){this.pushEvent(t?"ctm-chat-open":"ctm-chat-close",{action:t?"chat_opened":"chat_closed",state:t?"open":"closed"})}trackMessageSent(t,e={}){let s=e.isFirstMessage||!1;this.pushEvent(s?"ctm-chat-sent-first":"ctm-chat-sent",{action:"message_sent",messageType:t,hasAttachment:e.hasAttachment||!1,messageLength:e.messageLength||0})}trackSuggestionClick(t){let e=typeof t=="string"?t:t.label;this.pushEvent("ctm-chat-action-suggestion",{actionType:"suggestion",suggestionText:e,suggestionType:typeof t=="object"?t.type:"text"})}trackChatEnd(t="user"){this.pushEvent("ctm-chat-end",{action:"chat_ended",endedBy:t})}trackFileUpload(t,e){this.pushEvent("ctm-chat-file-upload",{action:"file_uploaded",fileType:t,fileSize:e})}trackConnectionStatus(t){this.pushEvent("ctm-chat-connection",{action:"connection_status_changed",status:t})}trackFormInteraction(t,e={}){t==="displayed"?this.pushEvent("ctm-chat-action-formDisplay",{actionType:"formDisplay",formId:e.formId||null,formType:e.formType||null}):t==="submitted"?this.pushEvent("ctm-chat-action-formSubmission",{actionType:"formSubmission",formId:e.formId||null,formType:e.formType||null}):this.pushEvent("ctm-chat-form",{action:`form_${t}`,formId:e.formId||null,formType:e.formType||null})}trackEngagement(t){this.pushEvent("ctm-chat-engagement",{action:`engagement_${t}`})}trackError(t,e){this.pushEvent("ctm-chat-error",{action:"error_occurred",errorType:t,errorMessage:e})}trackSessionStart(t,e=!1){this.pushEvent("ctm-chat-session-start",{action:e?"session_reconnected":"session_started",sessionId:t})}trackAgentHandoff(t){this.pushEvent("ctm-chat-agent-handoff",{action:"agent_handoff",agentType:t})}trackMessageReceived(t,e={}){this.pushEvent("ctm-chat-received",{action:"message_received",messageType:t,messageLength:e.messageLength||0})}trackAction(t,e={}){let s=t.charAt(0).toLowerCase()+t.slice(1);this.pushEvent(`ctm-chat-action-${s}`,{actionType:t,...e})}};var H={error:0,warn:1,info:2,debug:3},j="[CTM Chat]",q=class{constructor(t="warn"){var e;this.level=(e=H[t])!=null?e:H.warn}setLevel(t){var e;this.level=(e=H[t])!=null?e:H.warn}error(t,...e){this.level>=H.error&&console.error(j,t,...e)}warn(t,...e){this.level>=H.warn&&console.warn(j,t,...e)}info(t,...e){this.level>=H.info&&console.log(j,t,...e)}debug(t,...e){this.level>=H.debug&&console.log(j,"[debug]",t,...e)}};var L,se,we,O=class O extends HTMLElement{constructor(){super();ue(this,L);this.logger=new q("warn"),this.attachShadow({mode:"open"}),this._viewportHandler=null,this.messageHandler=null,this.marked=null,this.DOMPurify=null,this.style.visibility="hidden",this.configManager=new P(this.logger),this.config=this.configManager.get(),this.stateManager=new k(this.logger),this.audioManager=new $(this.logger),this.formManager=new V,this.gtmTracker=new N(this.logger),this.wsManager=null,this.tabId=pe(),this.pendingFiles=[],this.debounceResize=null,this.suggestionReevaluationTimer=null,this.currentSuggestions=[],this.debugClickCount=0,this.debugClickTimer=null,this.layout=new D(this,this.shadowRoot,this.logger),this.layout.render()}async connectedCallback(){console.log(`[CTM Chat] v${O.VERSION}`),(this.hasAttribute("debug")||this.getAttribute("debug")==="true")&&this.logger.setLevel("debug"),this.ensureMobileViewport(),this.setupKeyboardDetection(),await this.loadMarkdownLibrary(),await this.initWidget()}disconnectedCallback(){var s,i,n,o,a,r,l,h,d,u,p,f,v,M;this.teardownKeyboardDetection(),this.style.visibility="hidden";let e=this.stateManager.get("scheduleVisibility");e!=null&&e.checkInterval&&clearTimeout(e.checkInterval),(s=this.bubbleEl)==null||s.removeEventListener("click",this.toggleChat),(i=this.sendBtnEl)==null||i.removeEventListener("click",this.handleSendMessage),(n=this.inputEl)==null||n.removeEventListener("keypress",this.handleInputKeypress),(o=this.inputEl)==null||o.removeEventListener("input",this.handleInput),(a=this.optionsToggleBtn)==null||a.removeEventListener("click",this.toggleOptionsMenu),(r=this.mobileCloseBtn)==null||r.removeEventListener("click",this.toggleChat),(l=this.endChatBtn)==null||l.removeEventListener("click",this.handleEndChat),(h=this.copyEvalBtn)==null||h.removeEventListener("click",this.copyAsEval),(d=this.attachBtnEl)==null||d.removeEventListener("click",this.handleAttachClick),(u=this.fileInputEl)==null||u.removeEventListener("change",this.handleFileSelect),(p=this.messagesContainerEl)==null||p.removeEventListener("dragover",this.handleDragOver),(f=this.messagesContainerEl)==null||f.removeEventListener("drop",this.handleDrop),document.removeEventListener("click",this.handleOutsideClick),window.removeEventListener("resize",this.handleResize),clearTimeout(this.timerShowEngage),clearTimeout(this.timerHideEngage),clearTimeout(this.debounceResize),clearTimeout(this.suggestionReevaluationTimer),this.wsManager&&this.wsManager.disconnect(1e3,"Widget disconnected"),this.stateManager.set("connectionStatus","disconnected"),(v=this.audioManager)==null||v.cleanup().catch(b=>this.logger.warn("Error cleaning up audio",b)),(M=this.formManager)==null||M.cleanup()}attributeChangedCallback(e,s,i){let n=!1;switch(e){case"token":this.config.token!==i&&(this.updateToken(),n=!0);break;case"debug":this.logger.setLevel(i==="false"?"warn":"debug");break}this.stateManager.get("ready")&&n&&this.fetchConfig()}updateToken(){let e=this.getAttribute("token");this.token=W(this,L,we).call(this,e),this.configManager.updateFromToken(this.token),this.config=this.configManager.get(),this.region=this.token.r,this.accountId=this.config.accountId}async initWidget(){var s,i;let e=Q(k.SESSION_COOKIE_NAME);if(this.stateManager.set("sessionId",e),this.updateToken(),this.gtmTracker.trackWidgetInit({token:this.getAttribute("token"),sessionId:e}),this.wsManager||(this.wsManager=new z({maxReconnectAttempts:this.config.maxReconnectAttempts,reconnectDelayMs:this.config.reconnectDelayMs},this.logger),this.setupWebSocketListeners()),this.messageHandler||(this.messageHandler=new F({onScrollToBottom:()=>this.layout.scrollToBottom(),onUpdateActiveStatus:()=>this.updateActiveStatus(),onDispatchEvent:(n,o)=>this.dispatchCustomEvent(n,o),onRenderMarkdown:n=>this.renderMarkdownContent(n),onPlaySound:()=>this.playNewMessageSound(),onFormLoad:(n,o)=>this.formManager.registerForm(n,o),onAdjustWindowHeight:()=>this.layout.adjustWindowHeight(),onUpdateUIBasedOnState:()=>this.layout.updateUIBasedOnState(),onSanitizeHTML:n=>this.sanitizeHTML(n),onFetchFreshMediaUrl:n=>this.fetchFreshMediaUrl(n)},this.logger)),this.formManager.messageHandler||this.formManager.initialize({messageHandler:this.messageHandler,onFormSubmit:n=>this.handleFormSubmit(n),onFormResize:()=>this.layout.adjustWindowHeight(),onSendMessage:n=>this.sendMessageToServer(n),onDispatchEvent:(n,o)=>this.dispatchCustomEvent(n,o)}),!this.config.host){this.messageHandler&&this.messageHandler.addMessage({type:"system",content:"Error: Widget is not configured correctly (missing host)."});return}if(this.updateBaseUrlsFromHost(),!this.config.baseApiUrl||!this.config.baseWsUrl){(s=this.messageHandler)==null||s.addMessage({type:"system",content:"Error: Cannot determine backend location."});return}this.bindElements(),this.config.chatId?await this.fetchConfig():(i=this.messageHandler)==null||i.addMessage({type:"system",content:"Error: Widget is not configured correctly (missing ID)."}),this.addEventListeners(),this.layout.adjustWindowHeight(),this.initAudio(),this.layout.listenForStateChanges(this.stateManager),this.stateManager.set("ready",!0)}dispatchCustomEvent(e,s={}){this.startTracking||(this.startTracking=!0,this.initTracking());let i={...s,timestamp:new Date().toISOString(),sessionId:this.stateManager.get("sessionId"),chatId:this.config.chatId,isAIEnabled:this.stateManager.get("aiEnabled"),connectionStatus:this.stateManager.get("connectionStatus")},n=!0,o=!0,a=new CustomEvent(e,{detail:i,bubbles:n,composed:o});this.dispatchEvent(a),i.target=this,window.dispatchEvent(new CustomEvent(`ctm-chat-${e}`,{detail:i,bubbles:n,composed:o}))}initTracking(){let e="https://cdn.lgrckt-in.com/LogRocket.min.js",s=document.createElement("script");s.src=e,s.async=!0,s.crossOrigin="anonymous",s.onload=()=>{window.LogRocket&&window.LogRocket.init("ctm-mwsas/chataiv2")},this.appendChild(s)}ensureMobileViewport(){if(!A())return;let e=document.querySelector('meta[name="viewport"]');if(!e)e=document.createElement("meta"),e.name="viewport",e.content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",document.head.appendChild(e);else{let s=e.content;s.includes("width=device-width")||(e.content=s+", width=device-width"),s.includes("initial-scale=1")||(e.content=e.content+", initial-scale=1.0")}}setupKeyboardDetection(){var i,n;if(!A()||this._viewportHandler)return;let e=120,s=()=>{let{height:o,offsetTop:a}=window.visualViewport,l=window.innerHeight-(o+a)>e;l!==this.stateManager.get("keyboardOpen")&&(this.stateManager.set("keyboardOpen",l),l?this.adjustForMobileKeyboard():this.resetMobileKeyboardAdjustment())};window.visualViewport?(window.visualViewport.addEventListener("resize",s),window.visualViewport.addEventListener("scroll",s),this._viewportHandler=s):((i=this.inputEl)==null||i.addEventListener("focus",()=>{this.stateManager.set("keyboardOpen",!0),this.adjustForMobileKeyboard()}),(n=this.inputEl)==null||n.addEventListener("blur",()=>{this.stateManager.set("keyboardOpen",!1),setTimeout(()=>this.resetMobileKeyboardAdjustment(),150)}))}teardownKeyboardDetection(){this._viewportHandler&&window.visualViewport&&(window.visualViewport.removeEventListener("resize",this._viewportHandler),window.visualViewport.removeEventListener("scroll",this._viewportHandler)),this._viewportHandler=null}async loadMarkdownLibrary(){var e,s;try{let i=window.marked,n=window.DOMPurify;if(i)this.marked=window.marked;else{let a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/marked@15.0.12/lib/marked.umd.min.js",a.async=!0,await new Promise((r,l)=>{a.onload=()=>{this.marked=window.marked,r()},a.onerror=()=>{this.logger.error("Failed to load marked library"),l()},document.head.appendChild(a)})}if(n)this.DOMPurify=window.DOMPurify;else{let a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/dompurify@3.0.6/dist/purify.min.js",a.async=!0,await new Promise((r,l)=>{a.onload=()=>{this.DOMPurify=window.DOMPurify,r()},a.onerror=()=>{this.logger.error("Failed to load DOMPurify library"),l()},document.head.appendChild(a)})}(((e=this.messageHandler)==null?void 0:e.getMessages())||[]).length>0&&((s=this.messageHandler)==null||s.renderMessages())}catch(i){this.logger.error("Error loading markdown/sanitization libraries:",i)}}sanitizeHTML(e){return this.DOMPurify?this.DOMPurify.sanitize(e,{ALLOWED_TAGS:["p","br","strong","em","u","code","pre","blockquote","ul","ol","li","a","h1","h2","h3","h4","h5","h6","table","thead","tbody","tr","th","td","hr","del","ins"],ALLOWED_ATTR:["href","title","target","rel"],ALLOW_DATA_ATTR:!1,ADD_TAGS:[],ADD_ATTR:["target"],FORCE_BODY:!0,SANITIZE_DOM:!0}):""}updateBaseUrlsFromHost(){this.configManager.updateBaseUrls(),this.config=this.configManager.get()}bindElements(){if(this.bubbleEl=this.shadowRoot.getElementById("chat-toggle"),this.chatWindowEl=this.shadowRoot.getElementById("chat-window"),this.messagesContainerEl=this.shadowRoot.getElementById("messages-container"),this.inputEl=this.shadowRoot.getElementById("chat-input"),this.sendBtnEl=this.shadowRoot.getElementById("send-button"),this.suggestionsContainerEl=this.shadowRoot.getElementById("suggestion-buttons"),this.engageMessageEl=this.shadowRoot.getElementById("engage-message"),this.engageIconEl=this.shadowRoot.getElementById("engage-icon"),this.engageTextEl=this.shadowRoot.getElementById("engage-text"),this.engageCloseEl=this.shadowRoot.getElementById("engage-close"),this.messageHandler&&this.messageHandler.setMessagesContainer(this.messagesContainerEl),this.headerTitleEl=this.shadowRoot.getElementById("header-title"),this.header=this.shadowRoot.querySelector(".header"),this.optionsMenuEl=this.shadowRoot.getElementById("options-menu"),this.optionsToggleBtn=this.shadowRoot.getElementById("options-toggle-btn"),this.backBtnEl=this.shadowRoot.getElementById("back-btn"),this.headerCloseBtnEl=this.shadowRoot.getElementById("header-close-btn"),this.endChatBtn=this.shadowRoot.getElementById("end-chat-btn"),this.endChatItemEl=this.shadowRoot.getElementById("end-chat-item"),this.copyEvalBtn=this.shadowRoot.getElementById("copy-eval-btn"),this.copyEvalItemEl=this.shadowRoot.getElementById("copy-eval-item"),this.mobileCloseBtn=this.shadowRoot.getElementById("mobile-close-btn"),this.copyEvalItemEl){let e=window.location.hostname,s=e==="calltrackingmetrics.com"||e.endsWith(".calltrackingmetrics.com")||e==="ctmdev.us"||e.endsWith(".ctmdev.us");this.copyEvalItemEl.style.display=s?"":"none"}this.typingIndicatorEl=this.shadowRoot.getElementById("typing-indicator"),this.aiStatusIndicatorEl=this.shadowRoot.getElementById("ai-status-indicator"),this.connectionStatusEl=this.shadowRoot.getElementById("connection-status"),this.fileInputEl=this.shadowRoot.getElementById("file-input"),this.attachBtnEl=this.shadowRoot.getElementById("attach-button"),this.layout.updateInputState()}applyInitialConfig(){this.updateToken(),this.config.aiEnabled!==void 0&&this.stateManager.set("aiEnabled",this.config.aiEnabled),this.config.singleButtonDefault!==void 0&&this.stateManager.set("singleButtonDefault",this.config.singleButtonDefault),this.headerTitleEl&&(this.headerTitleEl.textContent=this.config.headerText),this.setSuggestions(this.config.suggestions),this.layout.update(),this.config.attachmentsEnabled&&this.enableAttachments(),this.applyScheduleVisibility()}addEventListeners(){var e,s,i,n,o,a,r,l,h,d,u,p,f,v,M,b,E,C,y,x,w;this.toggleChat=this.toggleChat.bind(this),this.handleSendMessage=this.handleSendMessage.bind(this),this.handleInputKeypress=this.handleInputKeypress.bind(this),this.handleInput=this.handleInput.bind(this),this.toggleOptionsMenu=this.toggleOptionsMenu.bind(this),this.handleOutsideClick=this.handleOutsideClick.bind(this),this.handleResize=this.handleResize.bind(this),this.handleSuggestionClick=this.handleSuggestionClick.bind(this),this.handleEndChat=this.handleEndChat.bind(this),this.handleBackToMenu=this.handleBackToMenu.bind(this),this.handleHeaderClose=this.handleHeaderClose.bind(this),this.handleAttachClick=this.handleAttachClick.bind(this),this.handleFileSelect=this.handleFileSelect.bind(this),this.handleDragOver=this.handleDragOver.bind(this),this.handleDrop=this.handleDrop.bind(this),this.handleTouchStart=this.handleTouchStart.bind(this),this.handleTouchEnd=this.handleTouchEnd.bind(this),this.handleVisibilityChange=this.handleVisibilityChange.bind(this),this.handleEngageClick=this.handleEngageClick.bind(this),this.handleEngageClose=this.handleEngageClose.bind(this),this.handleDebugClick=this.handleDebugClick.bind(this),(e=this.headerTitleEl)==null||e.addEventListener("click",this.handleDebugClick),this.header.addEventListener("click",this.toggleChat),this.header.addEventListener("touchstart",this.handleTouchStart,{passive:!0}),this.header.addEventListener("touchend",this.handleTouchEnd),(s=this.bubbleEl)==null||s.addEventListener("click",this.toggleChat),(i=this.bubbleEl)==null||i.addEventListener("touchstart",this.handleTouchStart,{passive:!0}),(n=this.bubbleEl)==null||n.addEventListener("touchend",this.handleTouchEnd),(o=this.engageMessageEl)==null||o.addEventListener("click",this.handleEngageClick),(a=this.engageCloseEl)==null||a.addEventListener("click",this.handleEngageClose),(r=this.sendBtnEl)==null||r.addEventListener("click",this.handleSendMessage),(l=this.inputEl)==null||l.addEventListener("keypress",this.handleInputKeypress),(h=this.inputEl)==null||h.addEventListener("input",this.handleInput),A()&&((d=this.inputEl)==null||d.addEventListener("focus",()=>{this.keyboardExpected=!0,this.adjustForMobileKeyboard(),setTimeout(()=>{this.adjustForMobileKeyboard()},300),window.visualViewport||setTimeout(()=>{if(this.chatWindowEl&&this.inputEl){let T=this.shadowRoot.getElementById("chat-input");T&&T.scrollIntoView({behavior:"smooth",block:"end"})}},500)}),(u=this.inputEl)==null||u.addEventListener("blur",()=>{this.keyboardExpected=!1,setTimeout(()=>{this.keyboardExpected||this.resetMobileKeyboardAdjustment()},100)})),(p=this.optionsToggleBtn)==null||p.addEventListener("click",this.toggleOptionsMenu),(f=this.backBtnEl)==null||f.addEventListener("click",this.handleBackToMenu),(v=this.headerCloseBtnEl)==null||v.addEventListener("click",this.handleHeaderClose),(M=this.mobileCloseBtn)==null||M.addEventListener("click",T=>{T.stopPropagation(),this.toggleChat(T)}),(b=this.endChatBtn)==null||b.addEventListener("click",this.handleEndChat),(E=this.copyEvalBtn)==null||E.addEventListener("click",()=>this.copyAsEval()),(C=this.attachBtnEl)==null||C.addEventListener("click",this.handleAttachClick),(y=this.fileInputEl)==null||y.addEventListener("change",this.handleFileSelect),A()||((x=this.messagesContainerEl)==null||x.addEventListener("dragover",this.handleDragOver),(w=this.messagesContainerEl)==null||w.addEventListener("drop",this.handleDrop)),document.addEventListener("click",this.handleOutsideClick,!0),window.addEventListener("resize",this.handleResize),window.addEventListener("orientationchange",this.handleResize),document.addEventListener("visibilitychange",this.handleVisibilityChange)}async fetchConfig(){var e;try{let s=await this.configManager.fetch();if(s.scheduleVisibility){let i=this.stateManager.get("scheduleVisibility")||{};this.stateManager.set("scheduleVisibility",{...i,...s.scheduleVisibility});let n=this.stateManager.get("scheduleVisibility");n!=null&&n.isVisible||this.hideWidget(),n!=null&&n.hasSchedule&&(n!=null&&n.nextTransition)&&this.scheduleNextVisibilityCheck()}this.configManager.merge(s.config),this.config=this.configManager.get(),this.applyInitialConfig(),this.config.baseWsUrl&&this.config.chatId&&!this.initialConnectionAttempted?this.connectWebSocket():this.config.baseWsUrl&&this.config.chatId&&this.stateManager.get("connectionStatus")!=="connected"&&this.connectWebSocket()}catch(s){throw(e=this.messageHandler)==null||e.addMessage({type:"system",content:s.message}),s}}initAudio(){try{this.audioManager&&!this.audioManager.hasSound("newMessage")&&this.audioManager.loadSound("newMessage",`${this.config.baseApiUrl}/newMessage.mp3`)}catch(e){this.logger.error("Error initializing AudioContext:",e)}}setupWebSocketListeners(){this.wsManager.on("open",({wasReconnecting:e})=>{var n,o,a;let i=(((n=this.messageHandler)==null?void 0:n.getMessages())||[]).some(r=>r.temporary);(o=this.messageHandler)==null||o.filterMessages(r=>!r.temporary),i&&e&&((a=this.messageHandler)==null||a.addMessage({type:"system",content:"Reconnected!",temporary:!0}),setTimeout(()=>{var r;(r=this.messageHandler)==null||r.filterMessages(l=>l.content!=="Reconnected!")},2e3)),this.updateActiveStatus(),this.stateManager.get("isOpen")&&this.sendMessageToServer({type:"widgetState",state:"open"},!1),this.stateManager.set("initialConnectionAttempted",!0)}),this.wsManager.on("message",e=>{this.handleWebSocketMessage(e)}),this.wsManager.on("close",({code:e,reason:s,wasClean:i})=>{var n;e===1008&&((n=this.messageHandler)==null||n.filterMessages(o=>!o.temporary),this.endChat()),this.layout.updateUIBasedOnState()}),this.wsManager.on("error",({message:e})=>{this.logger.error(`WebSocket Error: ${e}`)}),this.wsManager.on("statusChange",({status:e})=>{var s,i,n;this.stateManager.get("connectionStatus")!=="ended"&&(this.stateManager.set("connectionStatus",e),this.gtmTracker.trackConnectionStatus(e),(e==="disconnected"||e==="closed"||e==="error"||e==="reconnecting")&&((s=this.messageHandler)==null||s.showTypingIndicator(!1),this.layout.updateAIStatusIndicator("idle"),clearTimeout(this._aiStatusTimeout),this._aiStatusTimeout=null),e==="reconnecting"?(i=this.messageHandler)==null||i.addMessage({type:"system",content:"Connection lost. Reconnecting...",temporary:!0}):e==="error"&&((n=this.messageHandler)==null||n.addMessage({type:"system",content:"Connection failed permanently."})))})}connectWebSocket(){if(!this.wsManager||!this.config.baseWsUrl||!this.config.chatId)return Promise.resolve();this.stateManager.set("sessionAssignmentReceived",!1),this.stateManager.set("initialConnectionAttempted",!0);let e=Q(k.SESSION_COOKIE_NAME);return this.stateManager.set("sessionId",e),this.wsManager.connect({baseWsUrl:this.config.baseWsUrl,chatId:this.config.chatId,accountId:this.config.accountId,region:this.token.r,sessionId:this.stateManager.get("sessionId"),tabId:this.tabId})}sendMessageToServer(e,s=!0){var i;if(this.wsManager&&this.wsManager.isConnected()){let n=this.wsManager.send(e);if(n&&s){let o=this.stateManager.get("aiEnabled"),a=!!this.stateManager.get("callId"),r=!!this.stateManager.get("waitingForAgent"),l=!!(e!=null&&e.isSuggestion),h=(e==null?void 0:e.type)==="activateAI"||(e==null?void 0:e.type)==="activateHumanAgent";(o||a||r||l||h)&&this.setSuggestions([])}return n}else return s&&((i=this.messageHandler)==null||i.addMessage({type:"system",content:"Cannot send message. Not connected."})),!1}handleWebSocketMessage(e){var i,n,o,a,r,l,h,d,u,p,f,v,M,b,E,C,y,x,w,T,K,_,ie,ne,ae,oe,re;let s=(o=(n=(i=e.payload)==null?void 0:i.payload)!=null?n:e.payload)!=null?o:e;switch(e.type){case"sessionAssigned":let ve=this.stateManager.get("sessionAssignmentReceived");if(e.sessionId&&!ve){me(k.SESSION_COOKIE_NAME,e.sessionId),this.stateManager.set("sessionId",e.sessionId),this.stateManager.set("sessionAssignmentReceived",!0),this.gtmTracker.trackSessionStart(e.sessionId,!1),e.durableObjectId&&this.stateManager.set("durableObjectId",e.durableObjectId);let m=this.stateManager.get("sessionId"),g=this.stateManager.get("durableObjectId");(a=this.messageHandler)==null||a.setSessionInfo(m,g)}typeof s.aiEnabled<"u"&&(this.stateManager.set("aiEnabled",s.aiEnabled),this.layout.updateInputState()),typeof s.singleButtonDefault<"u"&&(this.stateManager.set("singleButtonDefault",s.singleButtonDefault),this.layout.updateUIBasedOnState()),s.callId&&(this.stateManager.set("callId",s.callId),this.layout.updateUIBasedOnState(),this.updateActiveStatus());break;case"widgetState":let Ee=this.stateManager.get("isOpen");s.state==="open"&&!Ee&&this.toggleChat();break;case"widgetConfig":s&&(s.agentAvailability&&(this.configManager.setAgentAvailability(s.agentAvailability),this.stateManager.setAgentAvailability(s.agentAvailability)),this.configManager.merge(s),this.config=this.configManager.get(),this.applyInitialConfig(),this.layout.update(),this._configUpdateHandler&&(this._configUpdateHandler(e),this._configUpdateHandler=null));break;case"agentAvailabilityChanged":s&&(this.configManager.setAgentAvailability(s),this.stateManager.setAgentAvailability(s),this.config.suggestions&&this.setSuggestions(this.config.suggestions),this.layout.update());break;case"history":let le=(s==null?void 0:s.messages)||[];if(le.length>0?((r=this.messageHandler)==null||r.filterMessages(g=>g.type==="system"&&g.content.startsWith("Error:")),le.map(g=>{let I="user";g.role==="assistant"||g.twilioMessage?I=g.author&&(g.author.includes("bot@")||g.author.includes("-bot@"))?"ai":"agent":g.role==="user"?I="user":g.type&&(I=g.type);let J=this.decorateFileMetadata(g.file);return{type:I,content:g.content,role:g.role,author:g.author,timestamp:g.timestamp,media:g.media,file:J,twilioMessage:g.twilioMessage,...g.welcome&&{welcome:g.welcome}}}).forEach(g=>{var I;return(I=this.messageHandler)==null?void 0:I.addMessage(g,{silent:!0})})):(((l=this.messageHandler)==null?void 0:l.getMessages())||[]).length,this._pendingResumeMessage){let m=this._pendingResumeMessage;this._pendingResumeMessage=null;let g={type:"user",content:m,timestamp:Date.now()};(h=this.messageHandler)==null||h.addMessage(g),this.sendMessageToServer(g)}(d=this.messageHandler)==null||d.renderMessages(),this.updateActiveStatus();let ce=((u=this.messageHandler)==null?void 0:u.getMessages())||[],he=ce.some(m=>m.type==="user"||m.role=="user"||m.type==="ai"||m.type==="agent"||m.type==="assistant"||m.role==="assistant"),xe=ce.some(m=>m.welcome);!he&&!xe&&((p=this.messageHandler)==null||p.addMessage({type:"status",welcome:!0,content:this.evaluateWelcomeMessage()}));let Me=this.stateManager.get("callId");!he&&Me&&this.suggestionsContainerEl&&this.suggestionsContainerEl.querySelectorAll("button").length>0&&(this.suggestionsContainerEl.style.display=""),this.layout.updateUIBasedOnState(),this.layout.scrollToBottom();break;case"ai_status":{let m=s==null?void 0:s.status;this.layout.updateAIStatusIndicator(m),clearTimeout(this._aiStatusTimeout),this._aiStatusTimeout=null,m&&m!=="idle"&&m!=="completed"&&m!=="error"&&(this._aiStatusTimeout=setTimeout(()=>{this.logger.debug("AI status timeout - auto-hiding indicator"),this.layout.updateAIStatusIndicator("idle"),this._aiStatusTimeout=null},6e4));break}case"ai_message_start":(f=this.messageHandler)==null||f.showTypingIndicator(!1),this.layout.updateAIStatusIndicator("responding"),(v=this.messageHandler)==null||v.createNewAIMessageElement(s==null?void 0:s.id);break;case"ai_chunk":s!=null&&s.id&&(s!=null&&s.delta)&&((M=this.messageHandler)==null||M.updateAIMessage(s.delta));break;case"ai_message_end":if(s!=null&&s.id){let m=(b=this.messagesContainerEl)==null?void 0:b.querySelector(`[data-message-id="${s.id}"]`),g=m==null?void 0:m.querySelector(".text"),I=(g==null?void 0:g.getAttribute("data-raw-content"))||(g==null?void 0:g.textContent)||"";(E=this.messageHandler)==null||E.finalizeAIMessage(I,s.id),this.layout.updateAIStatusIndicator("idle")}break;case"ai":case"agent":case"system":case"user":case"message":(C=this.messageHandler)==null||C.showTypingIndicator(!1),this.layout.updateAIStatusIndicator("idle");let S={type:(s==null?void 0:s.type)||e.type,content:(s==null?void 0:s.content)||s,role:s==null?void 0:s.role,id:s==null?void 0:s.id,clientVisible:e.clientVisible,agentVisible:e.agentVisible,...(s==null?void 0:s.name)&&{name:s.name},...(s==null?void 0:s.timestamp)&&{timestamp:s.timestamp}};(S.content||e.hasMedia)&&(S.type==="system"&&typeof S.content=="string"&&S.content.includes("User Attachments has been enabled")&&this.enableAttachments(),e.media&&e.media.length>0&&(S.media=e.media,S.hasMedia=!0),(y=this.messageHandler)==null||y.addMessage(S),S.type==="ai"||S.type==="assistant"?this.gtmTracker.trackMessageReceived("ai",{messageLength:((x=S.content)==null?void 0:x.length)||0}):S.type==="agent"&&this.gtmTracker.trackMessageReceived("agent",{messageLength:((w=S.content)==null?void 0:w.length)||0}),S.type=="agent"&&((T=this.audioManager)==null||T.playSound("newMessage")));break;case"typing":{let m=s==null?void 0:s.mode,g=!!(s!=null&&s.isTyping),I=(s==null?void 0:s.participant)||"",J=(s==null?void 0:s.participantRole)||"";if(m==="AGENT"){if(!(J==="agent"||I.startsWith("agent_")&&!I.includes("bot@")))break;g?((K=this.messageHandler)==null||K.showTypingIndicator(!0),clearTimeout(this._typingHideTimer),this._typingHideTimer=setTimeout(()=>{var de;(de=this.messageHandler)==null||de.showTypingIndicator(!1),this._typingHideTimer=null},4e3)):((_=this.messageHandler)==null||_.showTypingIndicator(!1),clearTimeout(this._typingHideTimer),this._typingHideTimer=null)}break}case"callIdAssigned":s.callId&&(this.stateManager.set("callId",s.callId),this.layout.updateUIBasedOnState(),this.updateActiveStatus(),this.logger.debug("[Widget] callIdAssigned:",s.callId,"state:",this.stateManager.getSnapshot()));break;case"suggestions":this.setSuggestions((s==null?void 0:s.suggestions)||[]);break;case"updateHeader":this.headerTitleEl&&(this.headerTitleEl.textContent=(s==null?void 0:s.text)||this.config.headerText);break;case"error":break;case"form":break;case"aiStateChanged":this.logger.debug("[Widget] aiStateChanged payload:",s),this.stateManager.set("aiEnabled",s.aiEnabled),this.stateManager.set("singleButtonDefault",s.singleButtonDefault),this.layout.updateInputState(),s.callId&&(this.stateManager.set("callId",s.callId),this.updateActiveStatus()),this.logger.debug("[Widget] state after aiStateChanged",this.stateManager.getSnapshot());break;case"chatEnded":this.handleChatEnded(s);break;case"chatResumed":this.handleChatResumed(s);break;case"agentConnected":this.gtmTracker.trackAgentHandoff("human"),this.handleAgentConnected(s),this.logger.debug("[Widget] agentConnected:",s,"state:",this.stateManager.getSnapshot());break;case"agentConnectionFailed":this.handleAgentConnectionFailed();break;case"waitingForAgent":this.handleWaitingForAgent(s);break;case"fileUploaded":this.handleFileUploaded(s);break;case"fileUploadError":this.handleFileUploadError(s);break;case"twilioMessage":(ie=this.messageHandler)==null||ie.showTypingIndicator(!1),this.layout.updateAIStatusIndicator("idle");let B="agent";e.author&&(e.author.includes("bot@")||e.author.includes("-bot@"))?B="ai":e.author==="system"?B="system":e.author&&e.author.includes("@")&&!e.author.startsWith("client:")&&(B="agent");let Se={type:B,content:e.content||"",author:e.author,timestamp:e.timestamp||Date.now(),...e.media&&{media:e.media,hasMedia:!0}};(ne=this.messageHandler)==null||ne.addMessage(Se),B==="agent"&&((ae=this.audioManager)==null||ae.playSound("newMessage"));break;case"agentJoined":this.handleAgentJoined(s);break;case"mode":(s.mode==="AGENT"||s.mode==="agent")&&(this.stateManager.set("waitingForAgent",!1),this.layout.updateInputState(),this.logger.debug("[Widget] mode switched to AGENT, state:",this.stateManager.getSnapshot()));break;case"status":(oe=this.messageHandler)==null||oe.addMessage({type:"status",content:(s==null?void 0:s.content)||e.content||""});break;default:(re=this.messageHandler)==null||re.showTypingIndicator(!1),this.layout.updateAIStatusIndicator("idle")}}handleEngageClick(e){e.target.closest(".engage-close")||(this.gtmTracker.trackEngagement("clicked"),this.hideEngageMessage(),this.stateManager.get("isOpen")||this.toggleChat())}handleEngageClose(e){e.stopPropagation(),this.gtmTracker.trackEngagement("closed"),this.hideEngageMessage(),this.stateManager.set("engageMessageDismissed",!0)}handleDebugClick(e){e.stopPropagation(),this.debugClickTimer&&clearTimeout(this.debugClickTimer),this.debugClickCount++,this.debugClickTimer=setTimeout(()=>{this.debugClickCount=0},1e3),this.debugClickCount>=5&&(this.debugClickCount=0,clearTimeout(this.debugClickTimer),this.copyDebugConfig())}async copyDebugConfig(){var s,i;let e={config:this.configManager.get(),state:{sessionId:this.stateManager.get("sessionId"),connectionStatus:this.stateManager.get("connectionStatus"),aiEnabled:this.stateManager.get("aiEnabled"),isOpen:this.stateManager.get("isOpen"),chatMode:this.stateManager.get("chatMode"),messageCount:((i=(s=this.messageHandler)==null?void 0:s.getMessages())==null?void 0:i.length)||0},agentAvailability:this.configManager.agentAvailability,timestamp:new Date().toISOString()};try{await navigator.clipboard.writeText(JSON.stringify(e,null,2));let n=this.headerTitleEl.textContent;this.headerTitleEl.textContent="Copied!",setTimeout(()=>{this.headerTitleEl.textContent=n},1e3)}catch(n){this.logger.error("Failed to copy debug config:",n)}}async copyAsEval(){var n,o;let e=((n=this.messageHandler)==null?void 0:n.getMessages())||[],s=0;for(let a=e.length-1;a>=0;a--)if(e[a].chatEnded){s=a+1;break}let i=e.slice(s).filter(a=>a.type==="user"||a.type==="ai"||a.type==="agent").map(a=>({role:a.type==="user"?"user":"assistant",content:a.content}));try{await navigator.clipboard.writeText(JSON.stringify({type:"ctm-eval-import",messages:i},null,2));let a=this.headerTitleEl.textContent;this.headerTitleEl.textContent="Copied!",setTimeout(()=>{this.headerTitleEl.textContent=a},1e3)}catch(a){this.logger.error("Failed to copy eval:",a)}(o=this.optionsMenuEl)==null||o.classList.remove("visible")}hideEngageMessage(){this.layout.hideEngageMessage(),this.engageTimer&&(clearTimeout(this.engageTimer),this.engageTimer=null)}endChat(){this.handleEndChat()}handleEndChat(){var s,i,n,o,a;this.stateManager.set("didEndChat",!0),this.gtmTracker.trackAction("endChat",{timestamp:Date.now()}),this.gtmTracker.trackChatEnd("user"),this.dispatchCustomEvent("action",{actionType:"endChat",timestamp:Date.now()});let e={type:"endChat",sessionId:this.stateManager.get("sessionId")};if(this.stateManager.set("connectionStatus","ended"),this.wsManager&&this.wsManager.send(e),this.suggestionsContainerEl){let r=Array.isArray((s=this.config)==null?void 0:s.suggestions)?this.config.suggestions:[];this.setSuggestions(r)}this.layout.updateUIBasedOnState(),(i=this.optionsMenuEl)==null||i.classList.remove("visible"),(n=this.aiStatusIndicatorEl)==null||n.remove(),(o=this.typingIndicatorEl)==null||o.remove(),this.dispatchCustomEvent("end",{sessionEndedBy:"user",messagesCount:(((a=this.messageHandler)==null?void 0:a.getMessages())||[]).length})}startNewChat(e){var s;this.layout.clearInput(),this.stateManager.set("connectionStatus","connecting"),this.stateManager.set("didEndChat",!1),this.stateManager.set("callId",null),this.stateManager.set("sessionId",null),this.stateManager.set("firstUserMessageSent",!1),fe(k.SESSION_COOKIE_NAME),(s=this.messageHandler)==null||s.clearMessages(),this.layout.updateUIBasedOnState(),this.connectWebSocket().then(()=>{var n;this.stateManager.set("connectionStatus","connected"),this.layout.updateUIBasedOnState(),this.layout.updateInputState();let i={type:"user",content:e,timestamp:Date.now()};(n=this.messageHandler)==null||n.addMessage(i),this.sendMessageToServer(i),this.stateManager.set("firstUserMessageSent",!0),this.gtmTracker.trackMessageSent("user",{messageLength:e.length,hasAttachment:!1,isFirstMessage:!0}),this.dispatchCustomEvent("sent-first",{content:e,timestamp:i.timestamp}),this.dispatchCustomEvent("sent",{content:e,timestamp:i.timestamp})}).catch(i=>{var n;this.logger.error("Failed to start new chat:",i),(n=this.messageHandler)==null||n.addMessage({type:"system",content:"Failed to start new chat. Please try again."})})}refresh(){return this.logger.info("Refreshing configuration..."),new Promise(async(e,s)=>{let i=o=>{o.type==="widgetConfig"&&(clearTimeout(n),this.logger.info("Config refresh completed"),e(o.payload))};this._configUpdateHandler=i;let n=setTimeout(()=>{this._configUpdateHandler=null,s(new Error("Config refresh timed out after 5 seconds"))},5e3);if(this.wsManager&&this.wsManager.isConnected())this.sendMessageToServer({type:"refreshConfig"},!1),this.logger.debug("Sent refresh request to server");else if(this.logger.warn("WebSocket not connected, cannot refresh config"),this.config.baseWsUrl&&this.config.chatId){this.logger.debug("Attempting to connect WebSocket for refresh...");try{await this.connectWebSocket(),await new Promise(setTimeout(()=>{},500)),this.wsManager&&this.wsManager.isConnected()?(this.sendMessageToServer({type:"refreshConfig"},!1),this.logger.debug("Sent refresh request after reconnection")):(clearTimeout(n),this._configUpdateHandler=null,s(new Error("Failed to connect WebSocket")))}catch(o){clearTimeout(n),this._configUpdateHandler=null,s(o)}}else clearTimeout(n),this._configUpdateHandler=null,s(new Error("WebSocket not configured"))})}toggleChat(){var i,n,o,a;let s=!this.stateManager.get("isOpen");if(this.stateManager.set("isOpen",s),this.gtmTracker.trackChatToggle(s),(i=this.chatWindowEl)==null||i.classList.toggle("open",s),(n=this.bubbleEl)==null||n.classList.toggle("open",s),this.updateActiveStatus(),s?(this.wsManager&&!this.wsManager.isConnected()&&this.stateManager.get("connectionStatus")!=="connecting"&&this.config.baseWsUrl&&this.connectWebSocket(),this.layout.hideEngageMessage(),clearTimeout(this.timerHideEngage),this.layout.focusInput(),this.layout.scrollToBottom(),(o=this.optionsMenuEl)==null||o.classList.remove("visible")):(this.isFormOnlyMode()&&this.resetToMainMenu(),clearTimeout(this.timerShowEngage)),this.sendMessageToServer({type:"widgetState",state:s?"open":"closed"},!1),A()&&(s?this.bubbleEl.style.display="none":this.bubbleEl.style.display=""),this.dispatchCustomEvent(s?"open":"close",{hasActiveSession:!!this.stateManager.get("sessionId"),messagesCount:(((a=this.messageHandler)==null?void 0:a.getMessages())||[]).length,trigger:"user"}),s&&this.stateManager.get("singleButtonDefault")){let r=this.suggestionsContainerEl.querySelectorAll("button");r.length===1&&r[0].click()}}hasFormDisplayed(){var s;return(((s=this.messageHandler)==null?void 0:s.getMessages())||[]).some(i=>i.type==="form")}hasActiveConversation(){var s;return this.stateManager.get("callId")||this.stateManager.get("waitingForAgent")?!0:(((s=this.messageHandler)==null?void 0:s.getMessages())||[]).some(i=>i.type==="user"||i.type==="ai"||i.type==="agent"||i.role==="user"||i.role==="assistant"||i.twilioMessage)}isFormOnlyMode(){return this.hasFormDisplayed()&&!this.hasActiveConversation()}clearFormMessages(){var i,n,o;return(((i=this.messageHandler)==null?void 0:i.getMessages())||[]).some(a=>a.type==="form")?((n=this.messageHandler)==null||n.filterMessages(a=>a.type!=="form"),(o=this.formManager)==null||o.setCurrentFormConfig(null),!0):!1}resetToMainMenu(){var e;(e=this.optionsMenuEl)==null||e.classList.remove("visible"),this.clearFormMessages(),this.updateHeaderText(this.config.headerText),this.layout.updateUIBasedOnState(),this.layout.updateInputState()}handleBackToMenu(e){var s;(s=e==null?void 0:e.stopPropagation)==null||s.call(e),this.resetToMainMenu()}handleHeaderClose(e){var s;(s=e==null?void 0:e.stopPropagation)==null||s.call(e),this.stateManager.get("isOpen")&&this.toggleChat()}handleSendMessage(){var n,o;let e=this.layout.getInputValue();if(!e)return;if(this.stateManager.get("connectionStatus")==="ended"){this.resumeChatWithMessage(e);return}if(!((n=this.wsManager)!=null&&n.isConnected())){this.logger.warn("handleSendMessage called while disconnected");return}let s={type:"user",content:e,timestamp:Date.now()},i=!this.stateManager.get("firstUserMessageSent");this.gtmTracker.trackMessageSent("user",{messageLength:e.length,hasAttachment:this.pendingFiles.length>0,isFirstMessage:i}),(o=this.messageHandler)==null||o.addMessage(s),this.sendMessageToServer(s),this.layout.clearInput(),this.layout.focusInput(),this.handleInput(),this.stateManager.get("firstUserMessageSent")||(this.stateManager.set("firstUserMessageSent",!0),this.dispatchCustomEvent("sent-first",{content:e,timestamp:s.timestamp})),this.dispatchCustomEvent("sent",{content:e,timestamp:s.timestamp})}handleInputKeypress(e){e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),this.handleSendMessage())}handleInput(){this.layout.updateInputState(),this.sendActivitySignal(),this.sendTypingSignal()}sendActivitySignal(){var s;let e=Date.now();e-(this._lastActivitySignal||0)<3e4||(this._lastActivitySignal=e,(s=this.wsManager)!=null&&s.isConnected()&&this.sendMessageToServer({type:"activity"},!1))}sendTypingSignal(){var s;if(this.stateManager.get("connectionStatus")==="ended")return;let e=Date.now();e-(this._lastTypingSignal||0)<3e3||(this._lastTypingSignal=e,(s=this.wsManager)!=null&&s.isConnected()&&this.sendMessageToServer({type:"typing"},!1))}toggleOptionsMenu(e){var i,n;e.stopPropagation();let s=!((i=this.optionsMenuEl)!=null&&i.classList.contains("visible"));(n=this.optionsMenuEl)==null||n.classList.toggle("visible"),s&&this.populateMenuSuggestions()}populateMenuSuggestions(){let e=this.shadowRoot.getElementById("menu-suggestions-container"),s=this.shadowRoot.getElementById("menu-divider");if(!e||!this.currentSuggestions)return;e.innerHTML="";let i=this.currentSuggestions.filter(o=>typeof o=="string"?!0:typeof o=="object"&&o.label?!(o.conditions&&!this.shouldShowConditionalSuggestion(o)):!1),n=this.hasActiveConversation();i.length>0?(i.forEach(o=>{let a=document.createElement("li"),r=document.createElement("button");r.textContent=typeof o=="string"?o:o.label,r.addEventListener("click",l=>{var h;l.stopPropagation(),this.handleSuggestionClick(o),(h=this.optionsMenuEl)==null||h.classList.remove("visible")}),a.appendChild(r),e.appendChild(a)}),s.style.display=n?"block":"none"):s.style.display="none"}handleOutsideClick(e){var s;if((s=this.optionsMenuEl)!=null&&s.classList.contains("visible")){let i=this.optionsMenuEl.contains(e.target),n=this.optionsToggleBtn.contains(e.target);!i&&!n&&this.optionsMenuEl.classList.remove("visible")}}handleResize(){clearTimeout(this.debounceResize),this.debounceResize=setTimeout(()=>{this.layout.adjustWindowHeight(),A()&&this.inputEl===document.activeElement&&this.adjustForMobileKeyboard()},150)}handleTouchStart(e){this.touchStartTime=Date.now(),this.touchStartY=e.touches[0].clientY}handleTouchEnd(e){let s=Date.now()-this.touchStartTime,i=e.changedTouches[0].clientY,n=Math.abs(i-this.touchStartY);(s>=200||n>=10)&&e.preventDefault()}adjustForMobileKeyboard(){var o,a;let e=this.stateManager.get("isOpen");if(!this.chatWindowEl||!e||!A())return;let s=this.shadowRoot.querySelector(".chat-input-area");if(!this.inputEl||!s)return;let i=window.getComputedStyle(s);if(i.display==="none"||i.visibility==="hidden")return;let n=window.visualViewport;if(n&&window.innerHeight-n.height>50){let l=this.messagesContainerEl,h=l&&l.scrollHeight-l.scrollTop-l.clientHeight<50,d=n.offsetTop||0;if(this.chatWindowEl.classList.add("keyboard-active"),this.chatWindowEl.style.position="fixed",this.chatWindowEl.style.top=`${d}px`,this.chatWindowEl.style.height=`${n.height}px`,this.chatWindowEl.style.maxHeight=`${n.height}px`,this.chatWindowEl.style.transform="translateZ(0)",l){let u=((o=this.shadowRoot.querySelector(".header"))==null?void 0:o.offsetHeight)||56,p=((a=this.shadowRoot.querySelector(".chat-input-area"))==null?void 0:a.offsetHeight)||56,f=n.height-u-p;l.style.maxHeight=`${f}px`,l.style.height=`${f}px`}h&&setTimeout(()=>this.layout.scrollToBottom(),100)}}resetMobileKeyboardAdjustment(){let e=this.stateManager.get("isOpen");!this.chatWindowEl||!e||!A()||(this.chatWindowEl.classList.remove("keyboard-active"),this.chatWindowEl.style.position="",this.chatWindowEl.style.top="",this.chatWindowEl.style.height="",this.chatWindowEl.style.maxHeight="",this.chatWindowEl.style.transform="",this.chatWindowEl.style.width="",this.messagesContainerEl&&(this.messagesContainerEl.style.height="",this.messagesContainerEl.style.maxHeight=""),setTimeout(()=>{this.layout.adjustWindowHeight()},50),setTimeout(()=>this.layout.scrollToBottom(),100))}handleVisibilityChange(){document.hidden?this.heartbeatInterval&&(clearInterval(this.heartbeatInterval),this.heartbeatInterval=null):this.stateManager.get("isOpen")&&this.sendActivitySignal()}_handleFormSuggestion(e){var i;this.gtmTracker.trackFormInteraction("displayed",{formId:e.value,formType:e.form_type||"embedded"}),this.formManager.setCurrentFormConfig({...e,send_to_ai:e.send_to_ai||!1,aiEnabled:this.stateManager.get("aiEnabled")});let s=this.formManager.createFormMessage(e);s.type="form",s.form=e.form,s.formConfig=e,(i=this.messageHandler)==null||i.addMessage(s),this.suggestionsContainerEl.style.display="none",this.dispatchCustomEvent("action",{actionType:"formDisplay",formPayload:e,timestamp:Date.now()})}_handleQueueSuggestion(e,s){var i;(i=this.messageHandler)==null||i.addMessage({type:"system",content:"Connecting you to a human agent..."}),this.stateManager.set("waitingForAgent",!0),this.layout.updateInputState(),this.sendMessageToServer({type:"activateHumanAgent",route:e.value,content:s}),this.updateHeaderText("Connecting to Agent...")}handleSuggestionClick(e){var o;let s=typeof e=="object"?`${e.label} - ${e.value}`:e,i=!0;if(this.gtmTracker.trackSuggestionClick(e),this.dispatchCustomEvent("action",{actionType:"suggestion",suggestionText:s,suggestionPayload:e,timestamp:Date.now()}),!this.wsManager||!this.wsManager.isConnected()){(o=this.messageHandler)==null||o.addMessage({type:"system",content:"Cannot send suggestion, not connected."});return}let n={type:"user",content:s,timestamp:Date.now(),isSuggestion:!0};if(typeof e=="object"&&e.type){if(e.type==="form"){this._handleFormSuggestion(e);return}else if(e.type=="url")window.location=e.value,i=!1;else if(e.type==="queue"){this._handleQueueSuggestion(e,s);return}}i&&this._handleAISuggestion(n)}_handleAISuggestion(e){var s,i;if(!this.stateManager.get("aiEnabled")){(s=this.messageHandler)==null||s.addMessage(e),this.gtmTracker.trackAction("chatAI",{trigger:"ai_activation_suggestion",timestamp:Date.now()}),this.sendMessageToServer({type:"activateAI",content:e.content}),setTimeout(()=>{if(this.layout.focusInput(),"ontouchstart"in window||navigator.maxTouchPoints>0){let n=this.shadowRoot.getElementById("chat-input");n==null||n.click(),this.layout.scrollToBottom()}},100),this.handleInput();return}(i=this.messageHandler)==null||i.addMessage(e),this.sendMessageToServer(e),setTimeout(()=>{if(this.layout.focusInput(),"ontouchstart"in window||navigator.maxTouchPoints>0){let n=this.shadowRoot.getElementById("chat-input");n==null||n.click()}},100),this.handleInput()}addMessage(e){var s;(s=this.messageHandler)==null||s.addMessage(e)}renderSingleMessage(e){var s;(s=this.messageHandler)==null||s.renderSingleMessage(e)}renderMessages(){var e;(e=this.messageHandler)==null||e.renderMessages()}evaluateScheduleCondition(e){return this.configManager.evaluateScheduleCondition(e)}evaluateUrlContainsCondition(e){return this.configManager.evaluateUrlContainsCondition(e)}evaluateConditions(e){return this.configManager.evaluateConditions(e)}setSuggestions(e=[]){if(!this.suggestionsContainerEl)return;let s=this.configManager.filterSuggestions(e);JSON.stringify(this.currentSuggestions)!==JSON.stringify(s)&&(this.currentSuggestions=s,this.suggestionsContainerEl.innerHTML="",Array.isArray(s)&&s.length>0?s.forEach(i=>{let n=typeof i;if(n==="string"&&i.trim()){let o=document.createElement("button");o.textContent=i,o.setAttribute("part","suggestion-button"),o.addEventListener("click",()=>this.handleSuggestionClick(i)),this.suggestionsContainerEl.appendChild(o)}else if(n==="object"&&i.label&&i.type&&i.value){let o=i.label.trim(),a=document.createElement("button");a.textContent=o,a.setAttribute("part","suggestion-button"),a.addEventListener("click",()=>this.handleSuggestionClick(i)),this.suggestionsContainerEl.appendChild(a)}}):this.suggestionsContainerEl.style.display="none",this.layout.adjustWindowHeight(),this.layout.updateInputState()),this.scheduleConditionReevaluation()}scheduleConditionReevaluation(){this.suggestionReevaluationTimer&&clearTimeout(this.suggestionReevaluationTimer),this.currentSuggestions.some(s=>{var i;return(i=s.conditions)==null?void 0:i.some(n=>n.type==="schedule")})&&(this.suggestionReevaluationTimer=setTimeout(()=>{this.setSuggestions(this.currentSuggestions)},6e4))}renderMarkdownContent(e){if(!e)return e;if(this.marked)try{let s={breaks:!0,gfm:!0},i=this.marked.parse(e,s),n=this.sanitizeHTML(i);return ye(n)||e}catch(s){return this.logger.error("Error parsing markdown:",s),e}return e}playNewMessageSound(){var e;(e=this.audioManager)==null||e.playSound("newMessage")}handleFormSubmit(e){this.gtmTracker.trackFormInteraction("submitted",{formId:e.formId||null,formType:e.formType||"embedded"}),this.stateManager.get("callId")}showTypingIndicator(e=!0,s=null){var i;(i=this.messageHandler)==null||i.showTypingIndicator(e,s)}scrollToBottom(){requestAnimationFrame(()=>{this.messagesContainerEl&&(this.messagesContainerEl.scrollTop=this.messagesContainerEl.scrollHeight)})}adjustWindowHeight(){let e=this.stateManager.get("isOpen");!this.chatWindowEl||!e||(this.chatWindowEl.style.height="100dvh")}handleChatEnded(e){var s,i,n,o,a,r;if((s=this.messageHandler)==null||s.showTypingIndicator(!1),this.layout.updateAIStatusIndicator("idle"),clearTimeout(this._aiStatusTimeout),this._aiStatusTimeout=null,clearTimeout(this._typingHideTimer),this._typingHideTimer=null,this.stateManager.set("connectionStatus","ended"),this.stateManager.set("callId",null),this.updateActiveStatus(),e.canResume&&Y(`${k.SESSION_COOKIE_NAME}_ended`,"true",{minutes:10}),e.source==="previous_session"){if(!this._pendingResumeMessage){let l=!!((i=this.config)!=null&&i.aiEnabled);this.stateManager.set("aiEnabled",l),l?(n=this.messageHandler)==null||n.addMessage({type:"status",content:"Chat ended",chatEnded:!0}):(o=this.messageHandler)==null||o.clearMessages()}}else(a=this.messageHandler)==null||a.addMessage({type:"status",content:e.reason||"Session ended",chatEnded:!0});if(this.suggestionsContainerEl){let l=Array.isArray((r=this.config)==null?void 0:r.suggestions)?this.config.suggestions:[];this.setSuggestions(l)}this.layout.updateUIBasedOnState()}handleChatResumed(e){var s,i;G(`${k.SESSION_COOKIE_NAME}_ended`),e.success?(this.stateManager.set("connectionStatus","connected"),this.updateActiveStatus(),(s=this.messageHandler)==null||s.addMessage({type:"status",content:"Chat resumed successfully"}),this.hideResumeButton(),this.layout.updateUIBasedOnState()):(i=this.messageHandler)==null||i.addMessage({type:"system",content:`Failed to resume chat: ${e.error||"Unknown error"}`})}showResumeButton(){this.hideResumeButton();let e=document.createElement("div");e.id="resume-container",e.style.cssText=`
      padding: 15px;
      text-align: center;
      background: #f0f0f0;
      border-top: 1px solid #ddd;
    `;let s=document.createElement("button");s.textContent="Resume Chat",s.style.cssText=`
      background: var(--primary-color);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 20px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
    `,s.addEventListener("click",()=>{this.resumeChat()}),e.appendChild(s);let i=this.shadowRoot.querySelector(".chat-input-area");i&&i.parentNode.insertBefore(e,i)}hideResumeButton(){let e=this.shadowRoot.getElementById("resume-container");e&&e.remove()}resumeChat(){if(this.stateManager.set("didEndChat",!1),this.stateManager.set("connectionStatus","connecting"),this.hideResumeButton(),!this.wsManager||!this.wsManager.isConnected()){this.connectWebSocket();let e=setInterval(()=>{this.wsManager&&this.wsManager.isConnected()&&(clearInterval(e),this.sendMessageToServer({type:"resumeChat"},!1))},100);setTimeout(()=>{clearInterval(e)},5e3)}else this.sendMessageToServer({type:"resumeChat"},!1)}resumeChatWithMessage(e){var i;this.layout.clearInput(),this.stateManager.set("didEndChat",!1),this.stateManager.set("connectionStatus","connecting"),this.layout.updateUIBasedOnState();let s={type:"user",content:e,timestamp:Date.now()};!this.wsManager||!this.wsManager.isConnected()?(this._pendingResumeMessage=e,this.connectWebSocket().then(()=>{this.stateManager.set("connectionStatus","connected"),this.layout.updateUIBasedOnState(),this.layout.updateInputState(),this.sendMessageToServer({type:"resumeChat"},!1)})):(this.stateManager.set("connectionStatus","connected"),this.layout.updateUIBasedOnState(),this.layout.updateInputState(),this.sendMessageToServer({type:"resumeChat"},!1),(i=this.messageHandler)==null||i.addMessage(s),this.sendMessageToServer(s))}handleAgentConnected(e){var s;this.stateManager.set("waitingForAgent",!1),this.layout.updateInputState(),this.layout.updateUIBasedOnState(),this.updateActiveStatus(),(s=this.audioManager)==null||s.playSound("newMessage")}updateHeaderText(e){this.layout.updateHeaderText(e)}handleAgentConnectionFailed(){this.stateManager.set("waitingForAgent",!1),this.layout.updateInputState(),this.updateHeaderText(this.config.headerText),this.layout.updateUIBasedOnState()}handleAgentJoined(e){var i,n;this.stateManager.set("waitingForAgent",!1),this.layout.updateInputState();let s=((i=e.agent)==null?void 0:i.name)||"Agent";this.updateHeaderText(`Chat with ${s}`),this.layout.updateUIBasedOnState(),(n=this.audioManager)==null||n.playSound("newMessage")}handleWaitingForAgent(e){e.waiting?(this.stateManager.set("waitingForAgent",!0),this.layout.updateInputState(),this.layout.updateAIStatusIndicator("idle")):(this.stateManager.set("waitingForAgent",!1),this.layout.updateInputState())}resetConnection(){var e;this.stateManager.set("initialConnectionAttempted",!1),this.stateManager.set("connectionStatus","disconnected"),this.wsManager&&this.wsManager.disconnect(1e3,"Connection reset"),(e=this.messageHandler)==null||e.clearMessages(),this.layout.updateUIBasedOnState()}enableAttachments(){this.stateManager.set("attachmentsEnabled",!0)}disableAttachments(){this.stateManager.set("attachmentsEnabled",!1)}handleAttachClick(){this.fileInputEl&&this.fileInputEl.click()}handleFileSelect(e){let s=Array.from(e.target.files);s.length>0&&this.handleFiles(s),e.target.value=""}handleDragOver(e){e.preventDefault(),e.stopPropagation(),e.dataTransfer.dropEffect="copy",this.messagesContainerEl.classList.add("drag-over")}handleDrop(e){e.preventDefault(),e.stopPropagation(),this.messagesContainerEl.classList.remove("drag-over");let i=Array.from(e.dataTransfer.files).filter(n=>n.type.startsWith("image/"));i.length>0&&this.handleFiles(i)}async handleFiles(e){var s,i,n,o,a;for(let r of e){if(r.size>10*1024*1024){(s=this.messageHandler)==null||s.addMessage({type:"system",content:`File "${r.name}" is too large. Maximum size is 10MB.`});continue}this.gtmTracker.trackFileUpload(r.type,r.size);try{let l=`file_${Date.now()}_${Math.random()}`,h=URL.createObjectURL(r);(i=this.messageHandler)==null||i.addMessage({id:l,type:"user",content:`[Uploading image: ${r.name}]`,file:{name:r.name,type:r.type,size:r.size,preview:h}});let d=await this.getSessionToken(),u=new FormData;u.append("file",r),u.append("sessionId",this.stateManager.get("sessionId")),u.append("doId",this.getDurableObjectId());let p=await fetch(`${this.config.baseApiUrl}/api/upload`,{method:"POST",headers:{Authorization:`Bearer ${d}`},body:u});if(!p.ok){let E=await p.json();throw new Error(E.error||"Upload failed")}let{url:f,securePath:v}=await p.json(),b=(((n=this.messageHandler)==null?void 0:n.getMessages())||[]).find(E=>E.id===l);if(b){b.content=`[Image: ${r.name}]`;let E=v?this.buildSecureMediaUrl(v):null;b.file=b.file||{},b.file.publicUrl=f,b.file.securePath=v,b.file.secureUrl=E,b.file.url=E||f,URL.revokeObjectURL(h),(o=this.messageHandler)==null||o.renderMessages()}}catch(l){this.logger.error("Error uploading file:",l),(a=this.messageHandler)==null||a.addMessage({type:"system",content:`Failed to upload "${r.name}": ${l.message}`})}}}async fetchFreshMediaUrl(e){try{let s=this.config.chatId,i=this.accountId,n=this.region,o=this.stateManager.get("sessionId");if(!s||!i||!n||!o)return this.logger.error("Missing required parameters for media fetch"),null;let a=`${this.config.baseApiUrl}/api/media/${o}/${e}?chatId=${s}&accountId=${i}&region=${n}`,r=await fetch(a);return r.ok?(await r.json()).url:(this.logger.error("Failed to fetch media URL:",r.status),null)}catch(s){return this.logger.error("Error fetching fresh media URL:",s),null}}getDurableObjectId(){let e=this.stateManager.get("durableObjectId");if(e)return e;let s=this.config.region||"useast",i=this.config.chatId,n=this.config.accountId,o=this.stateManager.get("sessionId"),a=`${s}.${i}.${n}.${o}`;return this.logger.warn(`Using generated DO ID (may not match server): ${a}`),a}async getSessionToken(){let e=this.stateManager.get("sessionToken"),s=this.stateManager.get("sessionTokenExpiry");if(e&&s>Date.now())return e;try{let i=await fetch(`${this.config.baseApiUrl}/api/auth/session`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sessionId:this.stateManager.get("sessionId"),widgetId:this.config.chatId})});if(!i.ok)throw new Error("Failed to get session token");let{token:n}=await i.json();return this.stateManager.set("sessionToken",n),this.stateManager.set("sessionTokenExpiry",Date.now()+3300*1e3),n}catch(i){throw this.logger.error("Error getting session token:",i),i}}fileToBase64(e){return new Promise((s,i)=>{let n=new FileReader;n.onload=()=>s(n.result),n.onerror=i,n.readAsDataURL(e)})}buildSecureMediaUrl(e){var r,l,h;if(!e)return null;let s=((r=this.config)==null?void 0:r.baseApiUrl)||"",i=s.endsWith("/")?s.slice(0,-1):s,n=e.startsWith("/")?e:`/${e}`,o=i?`${i}${n}`:n,a=(l=this.stateManager)==null?void 0:l.get("sessionToken");if(!a&&n.startsWith("/api/media/")&&!this.pendingMediaTokenPromise&&(this.pendingMediaTokenPromise=(h=this.getSessionToken)==null?void 0:h.call(this).catch(()=>null).finally(()=>{var d;this.pendingMediaTokenPromise=null,(d=this.messageHandler)==null||d.renderMessages()})),a&&n.startsWith("/api/media/"))try{let d=new URL(o,typeof window<"u"?window.location.origin:"https://dummy");return d.searchParams.set("token",a),d.toString()}catch{let u=o.includes("?")?"&":"?";return`${o}${u}token=${encodeURIComponent(a)}`}return o}decorateFileMetadata(e){if(!e)return null;let s={...e};return s.securePath&&!s.secureUrl&&(s.secureUrl=this.buildSecureMediaUrl(s.securePath)),s.secureUrl&&(s.publicUrl=s.publicUrl||s.url,s.url=s.secureUrl),s}handleFileUploaded(e){var o,a,r;let s=e.securePath?this.buildSecureMediaUrl(e.securePath):null,i=((o=this.messageHandler)==null?void 0:o.getMessages())||[],n=e.messageId?i.find(l=>l.id===e.messageId):null;if(!n){let l=e.messageId||`file_${Date.now()}`,h=e.fileName?`[Image: ${e.fileName}]`:"File uploaded";(a=this.messageHandler)==null||a.addMessage({id:l,type:"user",content:h,timestamp:Date.now(),file:{name:e.fileName,publicUrl:e.url,securePath:e.securePath,secureUrl:s,url:s||e.url}});return}n.file=n.file||{},n.file.name=n.file.name||e.fileName,n.file.publicUrl=e.url,n.file.securePath=e.securePath,n.file.secureUrl=s,n.file.url=s||e.url,(r=this.messageHandler)==null||r.renderMessages()}handleFileUploadError(e){var n;let i=(((n=this.messageHandler)==null?void 0:n.getMessages())||[]).find(o=>o.id===e.messageId);if(i){let o=this.messagesContainerEl.querySelector(`[data-message-id="${e.messageId}"]`);o&&(o.innerHTML="",o.textContent=`Failed to upload ${i.file.name}: ${e.error}`,o.style.color="#dc2626")}}applyScheduleVisibility(){if(!this.config._scheduleVisibility){this.showWidget();return}let e=this.config._scheduleVisibility;this.stateManager.update({"scheduleVisibility.hasSchedule":e.hasSchedule,"scheduleVisibility.nextTransition":e.nextTransition}),e.hasSchedule?(this.stateManager.set("scheduleVisibility.isVisible",e.isVisible),!e.isVisible&&!this.hasActiveChat()?this.hideWidget():this.showWidget(),e.nextTransition&&this.scheduleNextVisibilityCheck()):this.showWidget()}hasActiveChat(){var r;if(this.stateManager.get("isOpen")||(((r=this.messageHandler)==null?void 0:r.getMessages())||[]).some(l=>l.type==="user"||l.type==="agent"||l.type==="ai"&&!l.welcome))return!0;let n=this.stateManager.get("connectionStatus"),o=this.stateManager.get("callId");return!!(n==="connected"&&o||this.stateManager.get("waitingForAgent"))}hideWidget(){this.classList.add("schedule-hidden"),this.timerShowEngage&&(clearTimeout(this.timerShowEngage),this.timerShowEngage=null),this.engageMessageEl&&this.engageMessageEl.classList.contains("visible")&&this.engageMessageEl.classList.remove("visible"),this.stateManager.get("isOpen")&&!this.hasActiveChat()&&this.toggleChat()}showWidget(){this.classList.add("initialized"),this.classList.remove("schedule-hidden"),this.style.visibility="visible",!this.stateManager.get("isOpen")&&this.engageMessageEl&&(this.timerShowEngage&&clearTimeout(this.timerShowEngage),this.stateManager.get("engageMessageDismissed")||(this.timerShowEngage=setTimeout(()=>{!this.stateManager.get("isOpen")&&this.engageMessageEl&&!this.stateManager.get("engageMessageDismissed")&&(this.engageMessageEl.classList.add("visible"),this.engageMessageEl.style.pointerEvents="auto")},(this.config.engageMessageTimer||8)*1e3)))}scheduleNextVisibilityCheck(){let e=this.stateManager.get("scheduleVisibility.checkInterval");e&&clearTimeout(e);let s=this.stateManager.get("scheduleVisibility.nextTransition");if(!s)return;let i=Date.now(),o=s-i;if(o>0){let a=setTimeout(()=>{this.fetchConfig().catch(r=>{this.logger.error("Failed to refetch config for schedule update:",r);let l=setTimeout(()=>{this.fetchConfig()},300*1e3);this.stateManager.set("scheduleVisibility.checkInterval",l)})},o);this.stateManager.set("scheduleVisibility.checkInterval",a)}else this.fetchConfig()}updateActiveStatus(){this.hasActiveChat()?this.classList.add("has-active-chat"):this.classList.remove("has-active-chat")}evaluateWelcomeMessage(){return this.configManager.evaluateWelcomeMessage()}isWithinSchedule(e){return this.configManager.isWithinSchedule(e)}};L=new WeakSet,se=function(e){for(e=e.replace(/-/g,"+").replace(/_/g,"/");e.length%4;)e+="=";return atob(e)},we=function(e){let[s,i]=e.split("."),n=JSON.parse(W(this,L,se).call(this,s));return JSON.parse(W(this,L,se).call(this,i))},U(O,"VERSION","1.0.6"),U(O,"observedAttributes",["token","debug"]);var te=O;customElements.define("ctm-chat",te);})();
//# sourceMappingURL=chat.js.map
