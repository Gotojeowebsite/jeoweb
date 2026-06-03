performance.mark("js-parse-end:2694-5ea6799e6f1e38dd.js");
"use strict";(globalThis.rspackChunk_github_ui_github_ui=globalThis.rspackChunk_github_ui_github_ui||[]).push([[2694],{275841(t,e,i){i.d(e,{XX:()=>s.XX,_3:()=>s._3,qy:()=>s.qy});var s=i(389997)},231733(t,e,i){i.d(e,{CN:()=>u,P$:()=>c,VJ:()=>h,dS:()=>d,k8:()=>r,m4:()=>l,nM:()=>n,o7:()=>s,qi:()=>a,yk:()=>o});let s={DIRECTORY:"Search in this directory",ORG:"Search in this organization",OWNER:"Search in this owner",REPO:"Search in this repository",ENTERPRISE:"Search in this enterprise",GITHUB:"Search all of GitHub",GENERAL:"Submit search",COMMAND:"Run command",COPILOT_CHAT:"Start a new Copilot thread",COPILOT_SEARCH:"Search with Copilot",EXPLORE:"Learn More",DEFAULT:"Jump to"},r="Autocomplete";class a extends Event{name;filter;value;description;inlineDescription=!1;action;priority;icon;avatar;constructor({filter:t,value:e,name:i="",description:s="",inlineDescription:r=!1,priority:a=1/0,icon:n,avatar:l,action:o}){super("filter-item"),this.filter=t,this.value=e,this.name=i,this.description=s,this.inlineDescription=r,this.priority=a,this.icon=n,this.avatar=l,this.action=o}}function n(t){return t instanceof Object}let l={Apps:"apps",Archived:"archived",Book:"book",Bookmark:"bookmark",Branch:"branch",Calendar:"calendar",Circle:"circle",Code:"code",CodeReview:"code-review",CodeSquare:"code-square",Comment:"comment",CommentDiscussion:"comment-discussion",Copilot:"copilot",CopilotError:"copilot-error",Codespaces:"codespaces",CreditCard:"credit-card",Default:"default",DeviceDesktop:"device-desktop",DeviceMobile:"device-mobile",Discussion:"discussion",Draft:"draft",FileCode:"file-code",Filter:"filter",Forbidden:"forbidden",Gift:"gift",Globe:"globe",Heart:"heart",History:"history",Issue:"issue",IssueOpened:"issue-opened",IssueClosed:"issueClosed",Iterations:"iterations",Mention:"mention",Merged:"merged",Milestone:"milestone",No:"no",Not:"not",Organization:"organization",Package:"package",Pencil:"pencil",Person:"person",Play:"play",PlusCircle:"plus-circle",Project:"project",PullRequest:"pullRequest",Question:"question",Reaction:"reaction",Repo:"repo",Rocket:"rocket",Search:"search",Server:"server",ShieldCheck:"shield-check",SingleSelect:"single-select",Sort:"sort",Tag:"tag",Team:"team",Telescope:"telescope",Trash:"trash",Workflow:"workflow"},o={Entity:"--color-prettylights-syntax-entity",Constant:"--color-prettylights-syntax-constant",Keyword:"--color-prettylights-syntax-keyword",Variable:"--color-prettylights-syntax-variable",String:"--color-prettylights-syntax-string"};class u extends Event{id;priority;value;action;description;icon;scope;prefixText;prefixColor;isFallbackSuggestion;constructor({id:t,priority:e,value:i,action:s,description:r="",icon:a,scope:n="DEFAULT",prefixText:l,prefixColor:o,isFallbackSuggestion:u,isUpdate:h}){super(h?"update-item":"search-item"),this.id=t,this.priority=e,this.value=i,this.prefixText=l,this.prefixColor=o,this.action=s,this.description=r,this.icon=a,this.scope=n,this.isFallbackSuggestion=u||!1}}let h={Normal:"normal",Entity:"entity",Constant:"constant",FilterValue:"filter-value"};class d extends Event{fetchPromise;constructor(t){super("fetch-data"),this.fetchPromise=t}}class c extends Event{parsedQuery;rawQuery;parsedMetadata;constructor(t,e,i){super("query"),this.parsedQuery=t,this.rawQuery=e,this.parsedMetadata=i}toString(){return this.rawQuery}}Event},903845(t,e,i){i.d(e,{CN:()=>o.CN,MK:()=>d,dS:()=>o.dS,m4:()=>o.m4,qi:()=>o.qi});var s=i(331635),r=i(651135),a=i(935908),n=i(258038),l=i(275841),o=i(231733);class u extends Event{key;text;data;constructor(t,e,i){super("query-builder-feedback",{bubbles:!0,cancelable:!0}),this.key=t,this.text=e,this.data=i}}let h=(t,e)=>t.priority-e.priority;class d extends HTMLElement{#t;#e=!1;#i=!1;#s={};#r=new Set;#a=null;#n=null;#l=new Map;#o=new Map;#u=new Set;#h=new Set;#d=new Map;#c;#p="QueryBuilder-focus";#m=new Map;#y=new Map;#f=0;#v=150;#g=3e3;#I=!1;#b=!1;#C=!1;parser={parse:this.#$.bind(this),flatten:t=>t};parsedMetadata=void 0;renderSingularItemNames=!1;#L=!1;lastParsedQuery=void 0;FOCUS_TIMEOUT_VALUE=100;minWidth=300;get input(){return(0,r.FB)(this,"input")}get styledInputContent(){return(0,r.FB)(this,"styledInputContent")}get styledInputContainer(){return(0,r.FB)(this,"styledInputContainer")}get styledInput(){return(0,r.FB)(this,"styledInput")}get overlay(){return(0,r.FB)(this,"overlay")}get sizer(){return(0,r.FB)(this,"sizer")}get clearButton(){return(0,r.FB)(this,"clearButton")}get resultsList(){return(0,r.FB)(this,"resultsList")}get screenReaderFeedback(){return(0,r.FB)(this,"screenReaderFeedback")}get query(){return this.input.value}get i18n(){return{suggestion:"suggestion",suggestions:"suggestions",clear_search:"Input cleared."}}#q(t){return t.ctrlKey||t.metaKey}#A(t,e){e&&this.#q(e)?window.open(t):window.location.href=t}navigate(t){let e=t?.target?.closest("li"),i=this.#E(e);i&&((0,n.BI)("query-builder-element.click",{url:i}),this.dispatchEvent(new CustomEvent("query-builder:navigate",{bubbles:!0,detail:{url:i}})),this.#A(i,t instanceof MouseEvent?t:void 0))}#E(t){if(!t)return;let e=t.getAttribute("id");if(e)return this.#y.get(e)}get closed(){return this.overlay&&this.overlay.hasAttribute("hidden")}set closed(t){if(t)this.closed||(this.overlay&&(this.overlay.hidden=!0),this.input.setAttribute("aria-expanded","false"),this.#t?.clearSelection(),this.screenReaderFeedback.hidden=!0);else{if(!this.closed)return;this.overlay&&(this.overlay.hidden=!1),this.input.setAttribute("aria-expanded","true"),this.screenReaderFeedback.hidden=!1}}show(){this.closed=!1,this.overlay?.scrollIntoView?.({behavior:"smooth",block:"nearest"})}hide(){"false"===this.resultsList.getAttribute("data-persist-list")&&(this.closed=!0)}initialize(t,e){for(let i of(this.parser=t,this.#L=!0,this.#b=!0,e))this.attachProvider(i);this.#b=!1,this.#s=e.reduce((t,e)=>({...t,[e.value]:e}),{})}elementDefinitionReadyForProviders=t=>{t.detail.id===this.#c&&(this.readyForRequestProviders(),t.stopImmediatePropagation())};detachElementDefinitionReadyForProviders(){this.removeEventListener("query-builder:ready-to-request-provider",this.elementDefinitionReadyForProviders)}connectedCallback(){this.#a?.abort();let{signal:t}=this.#a=new AbortController;t.addEventListener("abort",()=>{this.#s={}}),this.#c=this.input.getAttribute("id"),this.hasAttribute("defer-request-providers")||(document.addEventListener("query-builder:ready-to-request-provider",this.elementDefinitionReadyForProviders,!0),this.readyForRequestProviders())}readyForRequestProviders(){this.#F()>0&&this.#C||(this.#t||=new a.A(this.input,this.resultsList,{tabInsertsSuggestions:!1}),this.requestProviders())}async requestProviders(){this.#C=!0,await Promise.resolve(),this.#b=!0,this.dispatchEvent(new Event("query-builder:request-provider",{bubbles:!0})),this.#b=!1,this.#m=new Map;let t=this.parseInputValue();this.styleInputText(t),this.toggleClearButtonVisibility()}parseInputValue(){return this.parsedMetadata=this.parser.parse(this.input.value,this.input.selectionStart||0),this.parser.flatten(this.parsedMetadata)}attachProvider(t){if(!this.#a)return;let{signal:e}=this.#a;if(!this.#b)throw Error("Can't attach providers after the query builder has been connected");this.#s[t.value]||(this.#s[t.value]=t,"filter"===t.type?(this.#r.add(t.value),t.addEventListener("filter-item",e=>{this.#w(this.#d,t),this.#d.get(t)?.push(e),this.#R()},{signal:e}),t.addEventListener("show",()=>{this.#h.add(t),this.#R()},{signal:e}),t.addEventListener("fetch-data",async t=>{let e=new Promise(t=>setTimeout(t,this.#g));this.#I=Promise.race([Promise.all([this.#I,t.fetchPromise]),e]);let i=this.#I;try{await i}catch(t){if("AbortError"!==t.name)throw this.#I=!1,t}i===this.#I&&(this.#I=!1,this.#R(),this.updateVisibility())},{signal:e})):(t.addEventListener("fetch-data",async e=>{this.#u.delete(t),await e.fetchPromise,this.#l.set(t,this.#o.get(t)||[]),this.#o.delete(t),this.#R()}),t.addEventListener("search-item",e=>{this.#w(this.#l,t),this.#o.has(t)?this.#o.get(t)?.push(e):(this.#u.has(t)&&(this.#l.set(t,[]),this.#u.delete(t)),this.#l.get(t)?.push(e),this.#R())},{signal:e}),t.addEventListener("update-item",e=>{let i=this.#l.get(t);if(!i)return;let s=i.findIndex(t=>t.id===e.id);s<0||(i[s]=e,this.#R())},{signal:e})))}disconnectedCallback(){this.#a?.abort()}comboboxCommit(t){let e=t.target,i=e?.getAttribute("data-type"),s=e?.getAttribute("data-value")||"",r=e?.getAttribute("data-replace-query-with")||"",a=parseInt(e?.getAttribute("data-move-caret-to")||"0")||0,n=this.parseInputValue();if("url-result"===i);else if("filter-result"===i)n.pop(),n.push({type:"filter",filter:s,value:""});else if("command-result"===i){let t=e.getAttribute("data-command-name")||"",i=JSON.parse(e.getAttribute("data-command-payload")||"{}");this.dispatchEvent(new CustomEvent(t,{detail:i}))}else if("query-result"===i)if(r)this.input.value=r,this.input.focus(),n=void 0;else{let t=this.parser.flatten(this.parser.parse(s,0));n.push(...t),n.push({type:"text",value:""})}else"filter-item"===i&&(r?(this.input.value=r,this.input.focus(),n=void 0):this.addSelectedItemToFilter(s,n));if(this.parseQuery(n),r){let t=-1===a?this.input.value.length:a;this.input.setSelectionRange(t,t)}this.input.removeAttribute("aria-activedescendant")}addSelectedItemToFilter(t,e){let i=/\s/.test(t),s=e.pop();if(s?.type==="filter"){let r=s.value.split(",");r.pop(),r.push(i?`"${t}"`:t),e.push({type:"filter",filter:s?.filter,value:r.join(",")}),e.push({type:"text",value:""})}else s&&e.push(s)}async inputChange(){await this.parseQuery()}inputBlur(){if(clearTimeout(this.focusTimeout),this.#e){this.#e=!1;return}this.styledInput.classList.remove(this.#p),this.input.removeAttribute("aria-activedescendant"),this.hide()}resultsMousedown(){this.#e=!0}async inputFocus(){this.styledInput.classList.add(this.#p),this.readyForRequestProviders(),this.#t.start();let t=this.input.value;this.lastParsedQuery&&this.lastParsedQuery===this.input.value||await this.parseQuery(),this.closed&&this.input.value===t&&this.input.setSelectionRange(0,this.input.value.length),this.focusTimeout?clearTimeout(this.focusTimeout):this.focusTimeout=setTimeout(()=>{this.input.focus()},this.FOCUS_TIMEOUT_VALUE)}moveCaretToEndOfInput(){this.input.setSelectionRange(this.input.value.length,this.input.value.length)}hasFocus(){return this.styledInput.classList.contains(this.#p)}inputKeydown(t){let e=t.key;if("Escape"===e)this.hide();else if("Enter"===e){let e=this.resultsList.querySelector('[aria-selected="true"], [data-combobox-option-default="true"]');if(!e||"true"===e.getAttribute("aria-disabled"))return;let i=this.#E(e);if(!i)return;this.#A(i,t)}}inputSubmit(){this.hide()}clearButtonFocus(t){let e=t.relatedTarget;e&&e===this.input&&this.show()}clearButtonBlur(){this.hide()}toggleClearButtonVisibility(){if(this.clearButton)if(""!==this.input.value){if(!1===this.clearButton.hidden)return;this.clearButton.hidden=!1}else this.clearButton.hidden=!0}updateVisibility(){this.hasFocus()&&(this.#d.size>0||this.#l.size>0||this.#h.size>0?this.show():this.#I||this.hide())}#w=(t,e)=>{t.has(e)||t.set(e,[])};#S=!1;#R(){this.#S||(this.#S=!0,this.toggleClearButtonVisibility(),this.#S=!1,this.#x())}#P(){if(0!==this.#h.size)return(0,l.qy)`<li role="presentation" class="ActionList-sectionDivider">
      <h3 role="presentation" class="ActionList-sectionDivider-title p-2 text-left" aria-hidden="true">
        Suggested filters
      </h3>
      <ul role="presentation">
        ${[...this.#h].sort(h).map(t=>this.#k(t))}
      </ul>
    </li>`}#B(t,e=!1){let i=[],s=this.parseInputValue().at(-1);if("filter"===t.type?t.manuallyDetermineFilterEligibility?i=this.#d.get(t)?.sort(h).map(t=>this.#T(t))||[]:s?.type==="filter"&&(i=this.#d.get(t)?.filter(t=>t.filter===s.filter).sort(h).map(t=>this.#T(t))||[]):i=[...this.#l.get(t)||[]].filter(t=>t.isFallbackSuggestion===e).sort(h).map(t=>this.#M(t)),i.length)if(""===t.name)return(0,l.qy)`<li role="presentation" class="ActionList-sectionDivider">
        <ul role="presentation">
          ${i}
        </ul>
      </li>`;else return(0,l.qy)`<li role="presentation" class="ActionList-sectionDivider">
        <h3
          role="presentation"
          class="ActionList-sectionDivider-title QueryBuilder-sectionTitle p-2 text-left"
          aria-hidden="true"
        >
          ${t.name}
        </h3>
        <ul role="presentation">
          ${i}
        </ul>
      </li>`}#O(){this.#y.clear(),this.#f=0}#x(){let t;this.#O();let e=Object.values(this.#s).sort((t,e)=>t.priority-e.priority).map(t=>this.#B(t)).filter(t=>void 0!==t);this.#I||0!==e.length||(e=Object.values(this.#s).sort((t,e)=>t.priority-e.priority).map(t=>this.#B(t,!0)).filter(t=>void 0!==t));let i=this.#P();i&&e.push(i),0===e.length?this.#I||(this.resultsList.textContent="",(0,l.XX)((0,l.qy)``,this.resultsList)):(0,l.XX)((0,l.qy)`${e.map((t,i)=>i===e.length-1?t:(0,l.qy)`${t}
                <li aria-hidden="true" class="ActionList-sectionDivider"></li>`)}`,this.resultsList);let s=this.resultsList.querySelectorAll('[role="option"]').length,r=1===s?this.i18n.suggestion:this.i18n.suggestions;t=`${s} ${r}.`,this.#i&&(t=`${this.i18n.clear_search} ${t}`,this.#i=!1),this.screenReaderFeedback.textContent===t&&(t+="\xa0"),setTimeout(()=>this.updateScreenReaderFeedback(t),this.#v)}#V(t){if(t)return t.replace(/\s/g,"-").toLowerCase()}getLeadingVisual(t,e){if(e){let t="org"===e.type?"avatar avatar-1 avatar-small":"avatar avatar-1 avatar-small circle";return(0,l.qy)`<img src="${e.url}" alt="" role="presentation" class="${t}" />`}if(t&&(0,o.nM)(t))return(0,l.qy)([t.html]);let i=document.getElementById(`${t}-icon`);return(0,l.qy)([i?.innerHTML])}#M({value:t,prefixText:e,prefixColor:i,target:s,action:r,description:a,icon:n,scope:u}){let h=`${this.#c||"search-item"}-result-${this.#f++}`;if("url"in r){let d="GENERAL"===u?`${o.o7[u]}`:`jump to this ${s.singularItemName}`,c=a?`, ${a}`:"",p=`${e?`${e} `:""}${t}${c}, ${d}`;this.#y.set(h,r.url);let m=null;return e&&(m=(0,l.qy)`
          <span>
            <div class="d-inline-flex position-relative">
              <div
                class="position-absolute rounded-1 flex-items-stretch height-full width-full"
                style="opacity: 0.1; background-color: var(${i})"
              ></div>
              <div class="px-1" style="color: var(${i})">${e}</div>
            </div>
            ${this.#D(t)}
          </span>
        `),(0,l.qy)`<li
        role="option"
        class="ActionListItem"
        data-type="url-result"
        id="${h}"
        data-value="${t}"
        aria-label="${p}"
        data-href="${r.url}"
        data-action="click:query-builder#navigate"
      >
        <span class="QueryBuilder-ListItem-link ActionListContent ActionListContent--visual16 QueryBuilder-ListItem">
          ${n?(0,l.qy)`<span id="${h}--leading" class="ActionListItem-visual ActionListItem-visual--leading">
                ${this.getLeadingVisual(n)}
              </span>`:null}
          <span class="ActionListItem-descriptionWrap">
            <span class="ActionListItem-label text-normal"> ${m||this.#D(t)} </span>
            ${a?(0,l.qy)`<span class="ActionListItem-description">${a}</span>`:null}
          </span>

          <span aria-hidden="true" class="ActionListItem-description QueryBuilder-ListItem-trailing"
            >${o.o7[u]}</span
          >
        </span>
      </li>`}if("commandName"in r){let e=o.o7[u]||o.o7.COMMAND,i=a?`, ${a}`:"",s=`${t}${i}, ${e}`;return(0,l.qy)`<li
        role="option"
        class="ActionListItem"
        data-type="command-result"
        id="${h}"
        data-value="${t}"
        data-command-name="${r.commandName}"
        data-command-payload="${JSON.stringify(r.data)}"
        aria-label="${s}"
      >
        <span class="ActionListContent ActionListContent--visual16 QueryBuilder-ListItem">
          ${n?(0,l.qy)`<span id="${h}--leading" class="ActionListItem-visual ActionListItem-visual--leading">
                ${this.getLeadingVisual(n)}
              </span>`:null}
          <span class="ActionListItem-descriptionWrap">
            <span class="ActionListItem-label text-normal"> ${this.#D(t)} </span>
            ${a?(0,l.qy)`<span class="ActionListItem-description">${a}</span>`:null}
          </span>

          <span aria-hidden="true" class="ActionListItem-description QueryBuilder-ListItem-trailing"
            >${e}</span
          >
        </span>
      </li>`}{let e="",i=0;"replaceQueryWith"in r&&(e=r.replaceQueryWith,i=r.moveCaretTo);let s="query"in r?o.o7[u]:o.k8;return(0,l.qy)` <li
        role="option"
        class="ActionListItem"
        data-type="query-result"
        data-value="${t}"
        aria-label="${t}${a?`, ${a}`:""}"
        data-replace-query-with="${e}"
        data-move-caret-to="${i}"
        id="${h}"
      >
        <span class="ActionListContent ActionListContent--visual16 QueryBuilder-ListItem">
          ${n?(0,l.qy)`<span id="${h}--leading" class="ActionListItem-visual ActionListItem-visual--leading">
                ${this.getLeadingVisual(n)}
              </span>`:null}
          <span class="ActionListItem-descriptionWrap">
            <span class="ActionListItem-label text-normal">${this.#D(t)}</span>
            ${a?(0,l.qy)`<span class="ActionListItem-description">${a}</span>`:null}
          </span>

          ${this.#l.size>0?(0,l.qy)`<span aria-hidden="true" class="ActionListItem-description QueryBuilder-ListItem-trailing"
                >${s}</span
              >`:(0,l.qy)``}
        </span>
      </li>`}}#D(t){let e=this.parser.flatten(this.parser.parse(t,0)),i=!this.#L,s=[];for(let t of e)if("filter"===t.type)s.push((0,l.qy)`<span>${t.filter}:</span
            ><span data-type="filter-value">${t.value}${i?" ":""}</span>`);else{let e="";t.style===o.VJ.Constant?e="qb-constant":t.style===o.VJ.Entity?e="qb-entity":t.style===o.VJ.FilterValue&&(e="qb-filter-value"),s.push((0,l.qy)`<span class="${e}">${t.value}${i?" ":""}</span>`)}return s}#k({singularItemName:t,icon:e,description:i,value:s}){let r=i?`, ${i}`:"",a=`${this.renderSingularItemNames?t:s}${r}`;return(0,l.qy)` <li
      role="option"
      class="ActionListItem"
      data-type="filter-result"
      data-value="${s}"
      id="${this.#c||"filter"}-result-${this.#V(s)}"
      aria-label="${a}, filter"
    >
      <span class="ActionListContent ActionListContent--visual16 QueryBuilder-ListItem">
        ${e?(0,l.qy)`<span
              id="${this.#c||"filter"}-result-${this.#V(s)}--leading"
              class="ActionListItem-visual ActionListItem-visual--leading"
            >
              ${this.getLeadingVisual(e)}
            </span>`:null}
        <span class="ActionListItem-descriptionWrap">
          <span class="ActionListItem-label text-normal">
            ${this.renderSingularItemNames?t:`${s}:`}
          </span>
          ${i?(0,l.qy)`<span class="ActionListItem-description">${i}</span>`:null}
        </span>

        ${this.#l.size>0?(0,l.qy)`<span aria-hidden="true" class="ActionListItem-description QueryBuilder-ListItem-trailing"
              >${o.k8}</span
            >`:(0,l.qy)``}
      </span>
    </li>`}#T({name:t,value:e,target:i,icon:s,avatar:r,description:a,inlineDescription:n,action:u}){let h=t&&t.length>0?t:e,d=a?`, ${a}`:"",c=i.singularItemName?`${h}${d}, autocomplete this ${i.singularItemName}`:`${h}${d}, ${i.name}`,p="",m=0;return u&&"replaceQueryWith"in u&&(p=u.replaceQueryWith,m=u.moveCaretTo),(0,l.qy)` <li
      role="option"
      class="ActionListItem"
      data-type="filter-item"
      data-replace-query-with="${p}"
      data-move-caret-to="${m}"
      data-value="${e}"
      id="${this.#c||"filter-item"}-result-${this.#V(e)}"
      aria-label="${c}"
    >
      <span class="ActionListContent ActionListContent--visual16 QueryBuilder-ListItem">
        ${s?(0,l.qy)`<span
              id="${this.#c||"filter-item"}-result-${this.#V(e)}--leading"
              class="ActionListItem-visual ActionListItem-visual--leading"
            >
              ${this.getLeadingVisual(s,r)}
            </span>`:null}
        <span class="${n?"ActionListItem-descriptionWrap-inline":"ActionListItem-descriptionWrap"}">
          <span class="ActionListItem-label text-normal">${h}</span>
          ${a?(0,l.qy)`<span class="ActionListItem-description">${a}</span>`:null}
        </span>

        ${this.#l.size>0?(0,l.qy)`<span aria-hidden="true" class="ActionListItem-description QueryBuilder-ListItem-trailing"
              >${o.k8}</span
            >`:(0,l.qy)``}
      </span>
    </li>`}updateScreenReaderFeedback(t){let e=new u("NEW_RESULTS",t,{});this.dispatchEvent(e),this.screenReaderFeedback.textContent=e.text}async clear(){this.dispatchEvent(new CustomEvent("query-builder:clear",{bubbles:!0,cancelable:!0}))&&await this.clearInput()}async clearInput({focusInput:t=!0}={}){await this.parseQuery([],t),this.#i=!0}async parseQuery(t,e=!0){this.#n?.abort();let{signal:i}=this.#n=new AbortController;if(t){let e=t.map(t=>"filter"===t.type?`${t.filter}:${t.value}`:t.value).join(this.#L?"":" "),i=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.input),"value")?.set;i?i?.call(this.input,e):this.input.value=e,this.input.dispatchEvent(new Event("change",{bubbles:!0}))}else t=this.parseInputValue();if(this.lastParsedQuery=this.input.value,await new Promise(t=>requestAnimationFrame(t)),i.aborted||(this.styleInputText(t),e&&this.input.focus(),await new Promise(t=>setTimeout(t,100)),i.aborted))return;for(let t of this.#l.keys())this.#u.add(t);this.#d.clear(),this.#h.clear();let s=new o.P$(t,this.input.value,this.parsedMetadata);this.dispatchEvent(s);let r=!1;for(let t of this.#u.keys())this.#l.delete(t),this.#u.delete(t),r=!0;r&&this.#R(),this.updateVisibility()}#$(t){let e=this.#m.get(t);if(e)return e.slice();{let e=[];for(let i of t.split(/\s(?=(?:[^"]*"[^"]*")*[^"]*$)/g)){let t=i.indexOf(this.filterKey);if(t>0){let s=i.substring(0,t),r=i.substring(t+1);e.push(this.#r.has(s)?{type:"filter",filter:s,value:r}:{type:"text",value:i})}else e.push({type:"text",value:i})}return this.#m.set(t,[...e]),e}}styleInputText(t){this.#Q(this.input.value);let e=document.createDocumentFragment();for(let i of t){let t=document.createElement("span"),s=document.createElement("span");s.textContent=" ";let r=!this.#L;if("filter"===i.type){let{filter:e,value:a}=i,n=document.createElement("span");t.setAttribute("data-type","filter-expression"),n.setAttribute("data-type","filter"),n.textContent=e;let l=document.createElement("span");l.textContent=this.filterKey;let o=document.createElement("span");o.setAttribute("data-type","filter-value"),o.textContent=a,t.appendChild(n),t.appendChild(l),t.appendChild(o),r&&t.appendChild(s)}else r?t.textContent=`${i.value} `:t.textContent=i.value,i.style===o.VJ.Constant?t.classList.add("qb-constant"):i.style===o.VJ.Entity?t.classList.add("qb-entity"):i.style===o.VJ.FilterValue&&t.classList.add("qb-filter-value");e.append(t),this.#N()}this.styledInputContent.replaceChildren(e)}#Q(t){if(this.sizer.textContent="",null!==this.input.selectionStart&&this.input.selectionStart===this.input.selectionEnd){let e=this.input.selectionStart,i=document.createElement("span");this.sizer.append(t.substring(0,e),i,t.substring(e))}else this.sizer.textContent=t}#N(){let t=this.minWidth;requestAnimationFrame(()=>{let e=this.sizer.querySelector("span");e&&(e.offsetLeft<this.styledInputContainer.scrollLeft?this.styledInputContainer.scrollLeft=e.offsetLeft-t:e.offsetLeft>this.styledInputContainer.scrollLeft+this.styledInputContainer.clientWidth&&(this.styledInputContainer.scrollLeft=e.offsetLeft-this.styledInputContainer.clientWidth+t));let i=Math.max(this.sizer.scrollWidth+2,2*(""===this.input.value),t);this.input.style.width=`${i}px`})}#F(){return Object.keys(this.#s).length}}(0,s.Cg)([r.CF],d.prototype,"filterKey",void 0),(0,s.Cg)([r.CF],d.prototype,"minWidth",void 0),d=(0,s.Cg)([(0,r.p_)("query-builder")],d)}}]);
//# sourceMappingURL=2694-5ea6799e6f1e38dd-e18ec76d1f1b6dbf.js.map