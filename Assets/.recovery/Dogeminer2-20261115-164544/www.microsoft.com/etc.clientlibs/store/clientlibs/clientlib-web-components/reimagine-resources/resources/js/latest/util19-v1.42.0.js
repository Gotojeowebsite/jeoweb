import{r as t,a3 as e,o as i,i as n,e as o,c as a,n as r,b as s,a4 as c,d}from"./tag.const-v1.42.0.js";import{W as l}from"./i18nMixin-v1.42.0.js";import{c as m}from"./util8-v1.42.0.js";import{a as b}from"./util7-v1.42.0.js";import"./components/divider/index-v1.42.0.js";const h={tabItemHorizontal:"tab-item--horizontal",tabItemVertical:"tab-item--vertical"},p="inline-flex",_="flex",v="column",g="var(--ds-spacing-m, 1rem)",f="auto",y={contentDisplay:"flex",contentFlexDirection:"row",contentGap:"var(--ds-spacing-2xl, 2rem)",contentAlignItems:"center",contentMaxWidth:"100%",contentFontSize:e.fontSize,contentFontWeight:e.fontWeight,contentLineHeight:e.lineHeight,contentLetterSpacing:e.letterSpacing,contentColor:"var(--ds-theme-foreground-accent-subtle-normal, #2a446f)",contentWidth:"100%",contentLeadingTransition:"opacity 0.2s ease"},$=n`
  :host {
    display: var(--ds-tab-item-display, ${t(p)});
  }

  :host::part(tab-item__base) {
    display: var(--ds-tab-item-base-display, ${t(_)});
    flex-direction: var(
      --ds-tab-item-base-flex-direction,
      ${t(v)}
    );
    row-gap: var(--ds-tab-item-base-row-gap, ${t(g)});
    width: var(--ds-tab-item-base-width, ${t(f)});
  }

  :host::part(tab-item__content) {
    display: var(
      --ds-tab-item-content-display,
      ${t(y.contentDisplay)}
    );
    flex-direction: var(
      --ds-tab-item-content-flex-direction,
      ${t(y.contentFlexDirection)}
    );
    gap: var(--ds-tab-item-content-gap, ${t(y.contentGap)});
    align-items: var(
      --ds-tab-item-content-align-items,
      ${t(y.contentAlignItems)}
    );
    width: var(--ds-tab-item-content-width, ${t(y.contentWidth)});
    max-width: var(
      --ds-tab-item-content-max-width,
      ${t(y.contentMaxWidth)}
    );
    font-size: var(
      --ds-tab-item-content-font-size,
      ${t(y.contentFontSize)}
    );
    font-weight: var(
      --ds-tab-item-content-font-weight,
      ${t(y.contentFontWeight)}
    );
    line-height: var(
      --ds-tab-item-content-line-height,
      ${t(y.contentLineHeight)}
    );
    letter-spacing: var(
      --ds-tab-item-content-letter-spacing,
      ${t(y.contentLetterSpacing)}
    );
    color: var(--ds-tab-item-content-color, ${t(y.contentColor)});
    transition: var(
      --ds-tab-item-content-transition,
      ${t(y.contentLeadingTransition)}
    );
  }

  .tab-item__content-indicator {
    visibility: none;
    opacity: 0;
    transition: var(
      --ds-tab-item-indicator-transition,
      ${t(y.contentLeadingTransition)}
    );
  }

  .tab-item__content-icon {
    margin-inline-start: calc(
      var(--ds-spacing-xs) - ${t(y.contentGap)}
    );
    display: none;
  }

  :host([active]) .tab-item__content-icon {
    display: block;
  }

  @media (forced-colors: active) {
    :host([active]) .tab-item__content-indicator {
      --ds-indicator-border: var(--ds-border-width-m) solid;
    }
  }

  .tab-item__content-divider {
    margin-inline-start: calc(
      ${t(y.contentGap)} + ${t(m.width)}
    );
  }

  :host(:hover) .tab-item__content-indicator,
  :host([active]) .tab-item__content-indicator {
    visibility: visible;
    opacity: 1;
  }

  :host(:hover) .tab-item__content-indicator {
    --ds-indicator-background-color: var(--ds-theme-background-accent-subtle-hover);
  }

  :host(:active) .tab-item__content-indicator {
    --ds-indicator-background-color: var(--ds-theme-background-accent-subtle-pressed);
  }

  :host([active]) .tab-item__content-indicator {
    --ds-indicator-background-color: var(--ds-theme-background-accent-subtle-selected);
  }

  :host(:hover)::part(tab-item__content) {
    --ds-tab-item-content-color: var(--ds-theme-foreground-accent-subtle-hover);
  }

  :host(:active)::part(tab-item__content),
  :host([active])::part(tab-item__content) {
    --ds-tab-item-content-color: var(--ds-theme-foreground-accent-subtle-pressed);
  }

  :host([configuration='tab-item--horizontal'])::part(tab-item__content) {
    --ds-tab-item-content-flex-direction: column;
    --ds-tab-item-content-align-items: flex-start;
    --ds-tab-item-content-gap: var(--ds-spacing-m, 1rem);
    --ds-tab-item-content-font-size: ${t(i.fontSize)};
    --ds-tab-item-content-font-weight: ${t(i.fontWeight)};
    --ds-tab-item-content-line-height: ${t(i.lineHeight)};
  }

  :host([configuration='tab-item--horizontal']) .tab-item__content-indicator {
    --ds-indicator-width: 100%;
    opacity: 1;
  }
`;var u=Object.defineProperty,S=Object.getOwnPropertyDescriptor,x=(t,e,i,n)=>{for(var o,a=n>1?void 0:n?S(e,i):e,r=t.length-1;r>=0;r--)(o=t[r])&&(a=(n?o(e,i,a):o(a))||a);return n&&a&&u(e,i,a),a};const w="store-tab-item";let z=class extends l{constructor(){super(...arguments),this._firstSlotEmpty=!0,this._lastSlotEmpty=!0,this.active=!1,this.configuration=h.tabItemVertical}_handleSlotChange(){this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length}_renderOptionalSlot(t="tab-item__first",e=this._firstSlotEmpty){return s`
      <div part=${t} class=${t} style="${e?"display: none;":""}">
        <slot name=${t} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}_renderTemplate(){const t=this.configuration===h.tabItemVertical;return s`
      <div part="tab-item__base" class="tab-item__base">
        <div part="tab-item__content" class="tab-item__content">
          <store-indicator
            class="tab-item__content-indicator"
            orientation="${t?"vertical":"horizontal"}"
            configuration="${c.rounded}"
            clickable
          >
          </store-indicator>
          <slot></slot>
          ${t?s` <store-icon
                class="tab-item__content-icon"
                icon="chevron-${"rtl"===this.dir?"left":"right"}"
                size="${b.medium}"
              >
              </store-icon>`:""}
        </div>
        ${t?s`<store-divider class="tab-item__content-divider"></store-divider>`:""}
      </div>
    `}render(){return s`
      ${this._renderOptionalSlot("tab-item__first",this._firstSlotEmpty)} ${this._renderTemplate()}
      ${this._renderOptionalSlot("tab-item__last",this._lastSlotEmpty)}
    `}};z.styles=[$],x([o({slot:"tab-item__first"})],z.prototype,"_firstSlot",2),x([o({slot:"tab-item__last"})],z.prototype,"_lastSlot",2),x([a()],z.prototype,"_firstSlotEmpty",2),x([a()],z.prototype,"_lastSlotEmpty",2),x([r({type:Boolean,reflect:!0})],z.prototype,"active",2),x([r({reflect:!0})],z.prototype,"theme",2),x([r({type:String,reflect:!0})],z.prototype,"configuration",2),z=x([d(w)],z);export{z as T,h as a,w as n};
