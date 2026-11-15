import{c as e,j as t}from"./pagination-item.const-v1.42.0.js";import{r as l,i as a,s as i,b as s,y as o,n as r,c as d,e as n,an as h,m as u,H as c}from"./tag.const-v1.42.0.js";import{b as m,v as b,k as p}from"./secondary-nav-item.const-v1.42.0.js";import{a as g}from"./util9-v1.42.0.js";import{n as v}from"./util6-v1.42.0.js";import{n as y}from"./util1-v1.42.0.js";import{name as S}from"./components/button-group/index-v1.42.0.js";import{name as f}from"./components/media/index-v1.42.0.js";import{n as k}from"./util20-v1.42.0.js";import"./util4-v1.42.0.js";import"./base/layout/layout-column/index-v1.42.0.js";import{F as $}from"./fill-color.mixin-v1.42.0.js";const B="flex",x="column",H="initial",w="initial",_="initial",C="initial",j="none",E="relative",U="0",M="var(--ds-breadth-vertical-default, 6rem)",L="var(--ds-breadth-vertical-default, 6rem)",z={contentRowGap:"var(--ds-density-vertical-default, 3rem)"},D="absolute",O="0",F="0",N="0",q="0",A="unset",G="hidden",R="-1",P="100%",I="inherit",J="100%",K="inherit",Q="0",T="0",V="flex",W="0.5rem",X="nowrap",Y="0",Z="wrap",ee="center",te="var(--ds-spacing-s, 0.75rem)",le="var(--ds-spacing-s, 0.75rem)",ae="initial",ie="initial",se="transparent",oe="var(--ds-theme-foreground-base-subtle, var(--ds-color-brilliant-blue-800, #17253d))",re=a`
  :host {
    display: var(--ds-ui-shell-display, ${l(B)});
    flex-direction: var(--ds-ui-shell-flex-direction, ${l(x)});
    gap: var(--ds-ui-shell-gap, ${l(z.contentRowGap)});
    padding-block-start: var(
      --ds-ui-shell-padding-block-start,
      ${l(M)}
    );
    padding-block-end: var(
      --ds-ui-shell-padding-block-end,
      ${l(L)}
    );
    z-index: var(--ds-ui-shell-z-index, 0);
    position: var(--ds-ui-shell-position, ${l(E)});

    height: var(--ds-ui-shell-height, ${l(H)});
    min-height: var(--ds-ui-shell-min-height, ${l(C)});
    max-height: var(--ds-ui-shell-max-height, ${l(j)});
    justify-content: var(
      --ds-ui-shell-justify-content,
      ${l(w)}
    );
    align-items: var(--ds-ui-shell-align-items, ${l(_)});
    padding-inline: var(--ds-ui-shell-padding-inline, ${l(U)});
  }

  :host ::slotted([slot='ui-shell-breadcrumbs']) {
    align-items: var(
      --ds-ui-shell-breadcrumbs-align-items,
      ${l(ee)}
    );
    gap: var(--ds-ui-shell-breadcrumbs-gap, ${l(W)});
    white-space: var(
      --ds-ui-shell-breadcrumbs-white-space,
      ${l(X)}
    );
    margin-block-start: var(
      --ds-ui-shell-breadcrumbs-margin-block-start,
      ${l(Y)}
    );
    display: var(
      --ds-ui-shell-breadcrumbs-display,
      ${l(V)}
    );
    flex-wrap: var(
      --ds-ui-shell-breadcrumbs-flex-wrap,
      ${l(Z)}
    );
    padding-block-start: var(
      --ds-ui-shell-breadcrumbs-padding-block-start,
      ${l(te)}
    );
    padding-block-end: var(
      --ds-ui-shell-breadcrumbs-padding-block-end,
      ${l(le)}
    );
    padding-inline-end: var(
      --ds-ui-shell-breadcrumbs-padding-inline-end,
      ${l(ae)}
    );
    padding-inline-start: var(
      --ds-ui-shell-breadcrumbs-padding-inline-start,
      ${l(ie)}
    );
    background-color: var(
      --ds-ui-shell-breadcrumbs-background-color,
      ${l(se)}
    );
    color: var(--ds-ui-shell-breadcrumbs-color, ${l(oe)});
  }

  .ui-shell-base {
    display: var(--ds-ui-shell-base-display, ${l(B)});
    flex-direction: var(--ds-ui-shell-base-flex-direction, column);
    row-gap: var(--ds-ui-shell-content-row-gap, ${l(z.contentRowGap)});
    width: 100%;
  }

  :host([base-content]) .ui-shell-base {
    padding-inline-start: var(--ds-child-container-padding-inline-start, 0);
    padding-inline-end: var(--ds-child-container-padding-inline-end, 0);
    width: var(--ds-child-container-width, 100%);
    max-width: var(--ds-child-container-max-width, none);
    margin-inline: var(--ds-child-container-margin-inline, initial);
    box-sizing: var(--ds-child-container-box-size, border-box);
  }

  .ui-shell-media {
    --ds-media-display: var(--ds-ui-shell-media-display, block);
    --ds-media-width: var(--ds-ui-shell-media-width, 100%);
    --ds-media-height: var(--ds-ui-shell-media-height, 100%);
    --ds-media-object-fit: var(--ds-ui-shell-media-object-fit, cover);
    --ds-media-picture-height: var(--ds-media-height, 100%);
    --ds-media-asset-display: var(--ds-media-display, block);
    --ds-media-asset-width: var(--ds-media-width, 100%);
    --ds-media-asset-height: var(--ds-media-height, 100%);
    --ds-media-ump-height: 100%;

    position: var(
      --ds-ui-shell-background-position,
      ${l(D)}
    );
    top: var(--ds-ui-shell-background-top, ${l(O)});
    right: var(--ds-ui-shell-background-right, ${l(F)});
    bottom: var(--ds-ui-shell-background-bottom, ${l(N)});
    left: var(--ds-ui-shell-background-left, ${l(q)});
    z-index: var(--ds-ui-shell-background-z-index, ${l(R)});
    height: var(--ds-ui-shell-background-height, ${l(J)});

    padding-block-start: var(
      --ds-ui-shell-background-padding-block-start,
      ${l(Q)}
    );
    padding-block-end: var(
      --ds-ui-shell-background-padding-block-end,
      ${l(T)}
    );
    overflow: var(
      --ds-ui-shell-background-overflow,
      ${l(G)}
    );
    transform: var(
      --ds-ui-shell-background-transform,
      ${l(A)}
    );
    width: var(--ds-ui-shell-background-width, ${l(P)});
    max-width: var(
      --ds-ui-shell-background-max-width,
      ${l(I)}
    );
    max-height: var(
      --ds-ui-shell-background-max-height,
      ${l(K)}
    );
  }

  .ui-shell-footer {
    display: none;
  }

  ::slotted(store-layout-column.ui-shell-header-button-column) {
    display: flex;
    justify-content: var(--ds-ui-shell-header-button-justify-content, flex-end);
  }

  :host([breadth='relaxed']) {
    --ds-ui-shell-padding-block-start: ${l(M)};
    --ds-ui-shell-padding-block-end: ${l(L)};
  }

  :host([breadth='comfortable']) {
    --ds-ui-shell-padding-block-start: var(--ds-breadth-vertical-comfortable, 4.5rem);
    --ds-ui-shell-padding-block-end: var(--ds-breadth-vertical-comfortable, 4.5rem);
  }

  :host([breadth='compact']) {
    --ds-ui-shell-padding-block-start: var(--ds-breadth-vertical-compact, 3rem);
    --ds-ui-shell-padding-block-end: var(--ds-breadth-vertical-compact, 3rem);
  }

  :host([breadth='none']),
  :host([base-content]) {
    --ds-ui-shell-padding-block-start: 0;
    --ds-ui-shell-padding-block-end: 0;
  }

  :host([top-breadth='relaxed']) {
    --ds-ui-shell-padding-block-start: ${l(M)};
  }

  :host([top-breadth='comfortable']) {
    --ds-ui-shell-padding-block-start: var(
      --ds-top-breadth-vertical-comfortable,
      var(--ds-breadth-vertical-comfortable)
    );
  }

  :host([top-breadth='compact']) {
    --ds-ui-shell-padding-block-start: var(
      --ds-top-breadth-vertical-compact,
      var(--ds-breadth-vertical-compact)
    );
  }

  :host([top-breadth='none']) {
    --ds-ui-shell-padding-block-start: 0;
  }

  :host([bottom-breadth='relaxed']) {
    --ds-ui-shell-padding-block-end: ${l(L)};
  }

  :host([bottom-breadth='comfortable']) {
    --ds-ui-shell-padding-block-end: var(
      --ds-bottom-breadth-vertical-comfortable,
      var(--ds-breadth-vertical-comfortable)
    );
  }

  :host([bottom-breadth='compact']) {
    --ds-ui-shell-padding-block-end: var(
      --ds-bottom-breadth-vertical-compact,
      var(--ds-breadth-vertical-compact)
    );
  }

  :host([bottom-breadth='none']) {
    --ds-ui-shell-padding-block-end: 0;
  }

  :host([density='compact']) {
    --ds-ui-shell-content-row-gap: var(--ds-density-vertical-compact, 2rem);
  }

  :host([density='none']) {
    --ds-ui-shell-content-row-gap: var(--ds-density-vertical-none, 0);
  }
`,de=a`
  @media (max-width: ${l(m(b.md))}) {
    :host([media-orientation='mobile-hide']) .ui-shell-media {
      display: none;
    }
  }

  @media (max-width: ${l(m(b.sm))}) {
    :host([media-orientation='mobile-stack']) .ui-shell-media ::slotted(store-media) {
      --ds-media-asset-height: auto;

      min-height: var(--ds-ui-shell-media-min-height, 203px);
    }

    .ui-shell-footer {
      --ds-container-width: 100%;
      --ds-button-min-width: 100%;
    }

    :host([disable-header-button-clone]) .ui-shell-header {
      --ds-button-host-display: grid;
      --ds-button-width: 100%;
    }
  }

  @media (max-width: ${l(m(b.md))}) {
    :host([media-orientation='mobile-stack']) {
      --ds-ui-shell-background-position: relative;
      --ds-ui-shell-background-z-index: 0;
      --ds-ui-shell-flex-direction: column;
      --ds-ui-shell-padding-block-start: 0;
    }

    ::slotted(store-layout-column.ui-shell-header-button-column) {
      --ds-ui-shell-header-button-justify-content: flex-start;
    }

    :host([media-orientation='mobile-stack']) .ui-shell-media ::slotted(store-media) {
      --ds-media-display: flex;
      --ds-media-overlay-background: none;
    }

    :host(:not([disable-header-button-clone]))
      ::slotted(store-layout-column.ui-shell-header-button-column) {
      display: none;
    }

    .ui-shell-footer {
      display: block;
    }
  }
`,ne={relaxed:"relaxed",comfortable:"comfortable",none:"none"},he={compact:"compact"},ue={col1even:g.col1even,col1boxed:g.col1boxed,col1staged:g.col1staged,col1focus:g.col1focus,col2even:g.col2even},ce={mobileStack:"mobile-stack"};var me=Object.defineProperty,be=(e,t,l,a)=>{for(var i,s=void 0,o=e.length-1;o>=0;o--)(i=e[o])&&(s=i(t,l,s)||s);return s&&me(t,l,s),s};const pe=t=>{const l=class extends t{constructor(){super(...arguments),this.isBlade=!0,this.uiShellMediaSlotEmpty=!0,this.baseContent=!1,this.disableHeaderButtonClone=!1,this._uiShellBreadcrumbsSlotEmpty=!0,this._uiShellBaseSlotEmpty=!0,this._uiShellHeaderSlotEmpty=!0}toggleDisplay(e){return e?"display: none;":""}handleUiShellBreadcrumbsSlotChange(){this._uiShellBreadcrumbsSlotEmpty=0===this._uiShellBreadcrumbsSlot.length}handleUiShellMediaSlotChange(){this.uiShellMediaSlotEmpty=0===this.uiShellMediaSlot.length,!this.uiShellMediaSlotEmpty&&(this.uiShellMedia=this.uiShellMediaSlot.find(e=>e.tagName.toLowerCase()===f),this.uiShellMedia&&(this.mediaOverlay&&i(this.uiShellMedia,{overlay:this.mediaOverlay}),this.uiShellMedia.hasAttribute("video")&&i(this.uiShellMedia,{"video-fit":h.cover})))}handleUiShellBaseSlotChange(){if(this._uiShellBaseSlotEmpty=0===this._uiShellBaseSlot.length,this._uiShellBaseSlotEmpty)return;const e=this._uiShellBaseSlot.find(e=>e.nodeName.toLowerCase()===k);i(e,{"enable-base-container":""})}handleUiShellHeaderSlotChange(e){var t,l;if(this._uiShellHeaderSlotEmpty=0===this._uiShellHeaderSlot.length,this._uiShellHeaderSlotEmpty)return;const a=(null==(t=e.target)?void 0:t.assignedElements())||[];if(!this._uiShellHeaderSlotEmpty){const[e,...t]=a;if(this._uiShellHeaderHeadingBlock=null==e?void 0:e.querySelector(v),this._uiShellHeaderHeadingBlock&&this.setHeaderHeadingBlockDefaults(this._uiShellHeaderHeadingBlock),t.length>0){const e=t[t.length-1];null==(l=null==e?void 0:e.classList)||l.add("ui-shell-header-button-column"),this._uiShellHeaderButton=(null==e?void 0:e.querySelector(S))||(null==e?void 0:e.querySelector(y))||void 0,this._uiShellHeaderButton&&(this.setHeaderButtonDefaults(this._uiShellHeaderButton),this.disableHeaderButtonClone||(this._uiShellFooterButton=this._uiShellHeaderButton.cloneNode(!0)))}2===a.length&&(this.headerLayoutConfiguration=this.headerLayoutConfiguration??ue.col2even)}}setHeaderHeadingBlockDefaults(e){i(e,{size:u["size-md"]}),(this.headerLayoutConfiguration===ue.col1focus||this.headerLayoutConfiguration===ue.col1boxed||this.headerLayoutConfiguration===ue.col1staged)&&i(e,{alignment:c.center})}setHeaderButtonDefaults(t){t.tagName.toLowerCase()===y&&i(t,{shape:e.rounded}),t.tagName.toLowerCase()===S&&i(Array.from(t.querySelectorAll(y)),{shape:e.rounded})}renderUiShellBreadcrumbs(){return s`
        <store-container
          class="ui-shell-breadcrumbs-container"
          part="ui-shell-breadcrumbs-container"
          style="${this.toggleDisplay(this._uiShellBreadcrumbsSlotEmpty)}"
        >
          <store-layout
            part="ui-shell-breadcrumbs"
            class="ui-shell-breadcrumbs"
            configuration="${g.col1even}"
          >
            <store-layout-column>
              <slot
                name="ui-shell-breadcrumbs"
                @slotchange="${this.handleUiShellBreadcrumbsSlotChange}"
              ></slot>
            </store-layout-column>
          </store-layout>
        </store-container>
      `}renderUiShellMediaSlot(){return s`
        <div
          part="ui-shell-media"
          class="ui-shell-media"
          style="${this.toggleDisplay(this.uiShellMediaSlotEmpty)}"
        >
          <slot name="ui-shell-media" @slotchange="${this.handleUiShellMediaSlotChange}"></slot>
        </div>
      `}renderUiShellHeader(){return s`
        <store-container
          part="ui-shell-header"
          class="ui-shell-header"
          style="${this.toggleDisplay(this._uiShellHeaderSlotEmpty)}"
        >
          <store-layout
            part="ui-shell-header-layout"
            class="ui-shell-header-layout"
            configuration="${o(this.headerLayoutConfiguration)}"
          >
            <slot name="ui-shell-header" @slotchange=${this.handleUiShellHeaderSlotChange}></slot>
          </store-layout>
        </store-container>
      `}renderUiShellBase(e,t=!1){return s`
        <div
          part="ui-shell-base"
          class="ui-shell-base"
          style="${t?this.toggleDisplay(this._uiShellBaseSlotEmpty):""}"
        >
          ${t?s`<slot @slotchange="${this.handleUiShellBaseSlotChange}"></slot>`:e}
        </div>
      `}renderUiShellFooter(){if(this._uiShellFooterButton)return s`
        <store-container class="ui-shell-footer" part="ui-shell-footer">
          <store-layout class="ui-shell-footer-layout" part="ui-shell-footer-layout">
            <store-layout-column>${this._uiShellFooterButton}</store-layout-column>
          </store-layout>
        </store-container>
      `}renderUiShell(e){return this.baseContent?this.renderUiShellBase(e):s`
        ${this.renderUiShellBreadcrumbs()} ${this.renderUiShellMediaSlot()}
        ${this.renderUiShellHeader()} ${this.renderUiShellBase(e)}
        ${this.renderUiShellFooter()}
      `}updated(e){e.has("mediaOverlay")&&this.mediaOverlay&&i(this.uiShellMedia,{overlay:this.mediaOverlay}),e.has("headerLayoutConfiguration")&&this.headerLayoutConfiguration&&this._uiShellHeaderHeadingBlock&&this.setHeaderHeadingBlockDefaults(this._uiShellHeaderHeadingBlock)}};l.styles=[t.styles??[],re,de];let a=l;return be([r({reflect:!0,attribute:"background"})],a.prototype,"background"),be([r({reflect:!0,attribute:"media-overlay"})],a.prototype,"mediaOverlay"),be([r({reflect:!0})],a.prototype,"breadth"),be([r({reflect:!0,attribute:"top-breadth"})],a.prototype,"topBreadth"),be([r({reflect:!0,attribute:"bottom-breadth"})],a.prototype,"bottomBreadth"),be([r({reflect:!0})],a.prototype,"density"),be([r({reflect:!0,attribute:"horizontal-density"})],a.prototype,"horizontalDensity"),be([r({reflect:!0,attribute:"header-layout-configuration"})],a.prototype,"headerLayoutConfiguration"),be([r({reflect:!0,attribute:"media-orientation"})],a.prototype,"mediaOrientation"),be([r({reflect:!0,type:Boolean,attribute:"is-blade"})],a.prototype,"isBlade"),be([d()],a.prototype,"uiShellMedia"),be([d()],a.prototype,"uiShellMediaSlotEmpty"),be([n({slot:"ui-shell-media"})],a.prototype,"uiShellMediaSlot"),be([r({type:Boolean,reflect:!0,attribute:"base-content"})],a.prototype,"baseContent"),be([r({type:Boolean,reflect:!0,attribute:"disable-header-button-clone"})],a.prototype,"disableHeaderButtonClone"),be([d()],a.prototype,"_uiShellHeaderButton"),be([d()],a.prototype,"_uiShellHeaderHeadingBlock"),be([d()],a.prototype,"_uiShellFooterButton"),be([n({slot:"ui-shell-breadcrumbs"})],a.prototype,"_uiShellBreadcrumbsSlot"),be([n({slot:"ui-shell-header"})],a.prototype,"_uiShellHeaderSlot"),be([n()],a.prototype,"_uiShellBaseSlot"),be([d()],a.prototype,"_uiShellBreadcrumbsSlotEmpty"),be([d()],a.prototype,"_uiShellBaseSlotEmpty"),be([d()],a.prototype,"_uiShellHeaderSlotEmpty"),a};class ge extends(p($(pe(t)))){}export{ge as S,ne as U,ue as a,ce as b,z as c,he as d};
