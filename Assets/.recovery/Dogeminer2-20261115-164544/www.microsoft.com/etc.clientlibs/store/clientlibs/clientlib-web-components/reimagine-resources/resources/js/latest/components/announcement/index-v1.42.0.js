import{r as e,N as t,i as o,_ as n,s,b as r,C as a,y as i,e as c,c as l,n as d,d as m}from"../../tag.const-v1.42.0.js";import{d as p}from"../../surface.styles-v1.42.0.js";import{s as h}from"../../dropdown-trigger.const-v1.42.0.js";import{v as _,S as u,B as g}from"../../secondary-nav-item.const-v1.42.0.js";import{B as v,c as y,b as f,S as b}from"../../pagination-item.const-v1.42.0.js";import{D as x,a as S}from"../../util7-v1.42.0.js";import"../../util1-v1.42.0.js";import"../text-block/index-v1.42.0.js";import{F as w}from"../../fill-color.mixin-v1.42.0.js";const $="flex",k="space-between",E="start",P="initial",C="var(--ds-spacing-xs, 0.5rem)",I="var(--ds-spacing-xs, 0.5rem)",j="var(--ds-spacing-xs, 0.5rem)",O="var(--ds-spacing-xs, 0.5rem)",T="var(--ds-spacing-xs, 0.5rem)",z="var(--ds-theme-foreground-base-strong, #0e1726)",B=o`
  .announcement__banner {
    background: var(
      --ds-fill-color-override,
      var(--ds-announcement-background, ${e(p.background)})
    );
    display: var(--ds-announcement-display, ${e($)});
    gap: var(--ds-announcement-gap, ${e(C)});
    position: var(--ds-announcement-position, ${e(P)});
    align-items: var(--ds-announcement-align-items, ${e(E)});
    padding-block-start: var(
      --ds-announcement-block-start,
      ${e(I)}
    );
    padding-block-end: var(
      --ds-announcement-padding-block-end,
      ${e(j)}
    );
    padding-inline-start: var(
      --ds-announcement-padding-inline-start,
      ${e(O)}
    );
    padding-inline-end: var(
      --ds-announcement-padding-inline-end,
      ${e(T)}
    );
    justify-content: var(
      --ds-announcement-justify-content,
      ${e(k)}
    );
  }

  .announcement__close-sr {
    ${h};
  }

  .announcement__center {
    display: var(--ds-announcement-center-display, flex);
    flex-direction: var(--ds-announcement-center-flex-direction, column);
    align-items: var(--ds-announcement-center-align-items, center);
    text-align: var(--ds-announcement-center-text-align, center);
    gap: var(
      --ds-announcement-center-gap,
      ${e("0")}
    );
    width: var(--ds-announcement-center-width, 100%);
  }

  :host ::slotted([slot='announcement__label']) {
    color: var(--ds-text-color-override, ${e(z)});
    font-weight: ${e(t.fontWeight)};
    font-size: ${e(t.fontSize)};
    line-height: ${e(t.lineHeight)};
    letter-spacing: ${e(t.letterSpacing)};
  }

  :host ::slotted([slot='announcement__link']) {
    --ds-link-color: var(--ds-text-color-override, ${e(z)});
  }

  :host([theme='night']) ::slotted([slot='announcement__link']) {
    --ds-theme-foreground-accent-subtle-hover: var(
      --ds-text-color-override,
      ${e(z)}
    );
    --ds-theme-foreground-accent-subtle-pressed: var(
      --ds-text-color-override,
      ${e(z)}
    );
  }

  :host([countdown]) {
    --ds-card-timer-number-font-size: var(--ds-body-m-font-size, 1rem);
    --ds-card-timer-separator-display: none;
    --ds-card-timer-base-child-display: flex;
    --ds-card-timer-base-child-gap: var(--ds-spacing-2xs, 0.25rem);
    --ds-card-timer-padding-block: 0;
    --ds-card-timer-padding-inline: 0;
    --ds-card-timer-number-line-height: 1.5;
    --ds-card-timer-gap: var(--ds-spacing-2xs, 0.25rem);
    --ds-card-timer-number-font-weight: 600;
    --ds-announcement-center-display: block;
    --ds-link-display: inline-block;
  }

  :host([countdown]) .announcement__center {
    --ds-announcement-center-gap: var(--ds-spacing-2xs, 0.25rem);
  }

  :host([countdown]) ::slotted([slot='announcement__label']),
  :host([countdown]) ::slotted([slot='announcement__expired-label']),
  :host([countdown]) ::slotted([slot='announcement__expired-post-label']),
  :host([countdown]) ::slotted([slot='announcement__post-label']) {
    display: inline;
    color: var(--ds-theme-foreground-base-strong, #0e1726);
  }

  :host([countdown]) ::slotted([slot='announcement__countdown']) {
    display: inline-flex;
  }

  /* Chooser Banner Variant Styles */
  :host([variant='chooser']) {
    --ds-text-block-gap: var(--ds-spacing-2xs, 0.25rem);
    --ds-text-block-flex-direction: row;
    --ds-text-block-align-items: center;
    --ds-text-block-headings-gap: 0;
    --ds-text-block-headings-align-items: baseline;
    --ds-text-block-heading-font-weight: 400;
    --ds-text-block-heading-color: #fff;
    --ds-text-block-heading-font-size: 0.75rem;
    --ds-text-block-heading-line-height: 1;
    --ds-text-block-heading-margin-top: 0;
    --ds-text-block-heading-margin-bottom: 0;
    --ds-text-block-heading-padding-top: 0;
    --ds-text-block-heading-padding-bottom: 0;
    --ds-link-color: #fff;
    --ds-link-text-decoration: underline;
    --ds-link-font-size: 0.75rem;
    --ds-link-font-weight: 400;
    --ds-link-display: inline;
    --ds-link-gap: 0;
    --ds-link-padding-top: 0;
    --ds-link-padding-bottom: 0;
    --ds-link-margin-top: 0;
    --ds-link-margin-bottom: 0;
    --ds-theme-foreground-accent-subtle-normal: #fff;
    --ds-theme-foreground-accent-subtle-hover: #fff;
    --ds-theme-foreground-accent-subtle-pressed: #fff;
  }

  :host([variant='chooser']) .announcement__banner {
    --ds-announcement-gap: var(--ds-spacing-m, 1rem);
    --ds-announcement-align-items: center;
    --ds-announcement-justify-content: center;
    --ds-announcement-block-start: var(--ds-spacing-xs, 0.5rem);
    --ds-announcement-padding-block-end: var(--ds-spacing-xs, 0.5rem);
    background-color: var(--ds-announcement-chooser-background-color, #006dc1);
    color: var(--ds-announcement-chooser-text-color, #fff);
  }

  :host([variant='chooser']) .announcement__center {
    --ds-announcement-center-flex-direction: row;
    --ds-announcement-center-gap: var(--ds-spacing-m, 1rem);
    --ds-announcement-center-width: auto;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }

  :host([variant='chooser']) .announcement__chooser-items {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--ds-announcement-chooser-items-gap, var(--ds-spacing-xl, 1.5rem));
    flex-wrap: nowrap;
    justify-content: center;
  }

  :host([variant='chooser']) .announcement__chooser-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0;
    flex-wrap: wrap;
  }

  :host([variant='chooser']) .announcement__chooser-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    gap: 0;
  }

  :host([variant='chooser']) .announcement__chooser-popover-1,
  :host([variant='chooser']) .announcement__chooser-popover-2 {
    margin-inline-end: var(--ds-announcement-chooser-group-gap, var(--ds-spacing-s, 0.5rem));
  }

  :host([variant='chooser']) .announcement__chooser-item-1,
  :host([variant='chooser']) .announcement__chooser-item-2,
  :host([variant='chooser']) .announcement__chooser-item-3,
  :host([variant='chooser']) .announcement__chooser-item-4 {
    display: flex;
    align-items: center;
  }

  :host([variant='chooser']) .announcement__chooser-divider {
    width: 1px;
    min-height: 1rem;
    align-self: stretch;
    background-color: var(--ds-announcement-chooser-text-color, #fff);
  }

  :host([variant='chooser']) ::slotted(store-text-block) {
    display: var(--ds-store-text-block-display, flex);
    align-items: var(--ds-store-text-block-align-items, center);
  }
`,A=o`
  @media (min-width: ${e(_.md)}) {
    :host {
      --ds-announcement-justify-content: center;
      --ds-announcement-align-items: center;
      --ds-announcement-position: relative;
      --ds-announcement-gap: var(--ds-spacing-s, 0.75rem);
      --ds-announcement-padding-block-start: var(--ds-spacing-xs, 0.5rem);
      --ds-announcement-padding-block-end: var(--ds-spacing-xs, 0.5rem);
      --ds-announcement-padding-inline-start: var(--ds-spacing-4xl, 6rem);
      --ds-announcement-padding-inline-end: var(--ds-spacing-4xl, 6rem);
    }

    .announcement__center {
      --ds-announcement-center-flex-direction: row;
      --ds-announcement-center-gap: var(--ds-spacing-xs, 0.5rem);
      --ds-announcement-center-width: auto;
    }

    .announcement__dismiss {
      position: absolute;
      inset-inline-end: var(--ds-spacing-m, 1rem);
      top: 50%;
      transform: translateY(-50%);
    }

    :host([variant='chooser'][popover-one-position='prefix']) .announcement__chooser-item-2,
    :host([variant='chooser'][popover-one-position='suffix']) .announcement__chooser-item-2 {
      margin-inline-start: var(--ds-announcement-chooser-group-gap, var(--ds-spacing-s, 0.5rem));
    }

    :host([variant='chooser'][popover-two-position='prefix']) .announcement__chooser-item-4,
    :host([variant='chooser'][popover-two-position='suffix']) .announcement__chooser-item-4 {
      margin-inline-start: var(--ds-announcement-chooser-group-gap, var(--ds-spacing-s, 0.5rem));
    }
  }

  @media (max-width: ${e(_.sm)}) {
    :host([countdown='active']) {
      --ds-card-timer-base-flex-wrap: wrap;
    }

    :host([variant='chooser']) .announcement__banner {
      --ds-announcement-padding-inline-start: var(--ds-spacing-m, 1rem);
      --ds-announcement-padding-inline-end: var(--ds-spacing-m, 1rem);
    }

    :host([variant='chooser']) .announcement__center {
      flex-wrap: nowrap;
    }

    :host([variant='chooser']) .announcement__dismiss {
      align-self: flex-start;
    }

    :host([variant='chooser']) .announcement__chooser-items {
      flex-direction: row;
      flex-wrap: nowrap;
      gap: var(--ds-spacing-m, 1rem);
      width: 100%;
      align-items: flex-start;
    }

    :host([variant='chooser']) .announcement__chooser-group {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      text-align: center;
      white-space: normal;
      max-width: 45%;
      gap: var(--ds-spacing-2xs, 0.25rem);
    }

    :host([variant='chooser']) .announcement__chooser-row {
      justify-content: center;
    }

    :host([variant='chooser']) .announcement__chooser-popover-1,
    :host([variant='chooser']) .announcement__chooser-popover-2 {
      margin-inline-end: 0;
    }

    :host([variant='chooser']) .announcement__chooser-divider {
      width: 1px;
      height: auto;
      align-self: stretch;
    }
  }

  /* Tablet view - keep side by side but allow wrapping within groups */
  @media (min-width: ${e(_.sm)}) and (max-width: ${e(_.md)}) {
    :host([variant='chooser']) .announcement__banner {
      --ds-announcement-position: relative;
    }

    :host([variant='chooser']) .announcement__dismiss {
      position: absolute;
      inset-inline-end: var(--ds-spacing-m, 1rem);
      top: var(--ds-spacing-xs, 0.5rem);
    }

    :host([variant='chooser']) .announcement__chooser-items {
      flex-wrap: nowrap;
      align-items: flex-start;
    }

    :host([variant='chooser']) .announcement__chooser-group {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      text-align: center;
      white-space: normal;
      max-width: 45%;
      gap: var(--ds-spacing-2xs, 0.25rem);
    }

    :host([variant='chooser']) .announcement__chooser-row {
      justify-content: center;
    }

    :host([variant='chooser']) .announcement__chooser-popover-1,
    :host([variant='chooser']) .announcement__chooser-popover-2 {
      margin-inline-end: 0;
    }

    :host([variant='chooser']) .announcement__chooser-divider {
      width: 1px;
      height: auto;
      align-self: stretch;
    }
  }
`,N="prefix",F="center",G="suffix";var L=Object.defineProperty,q=Object.getOwnPropertyDescriptor,D=(e,t,o,n)=>{for(var s,r=n>1?void 0:n?q(t,o):t,a=e.length-1;a>=0;a--)(s=e[a])&&(r=(n?s(t,o,r):s(r))||r);return n&&r&&L(t,o,r),r};const U="store-announcement";let H=class extends(w(n(u))){constructor(){super(...arguments),this._firstSlotEmpty=!0,this._chooserItem1SlotEmpty=!0,this._chooserPopover1SlotEmpty=!0,this._chooserItem2SlotEmpty=!0,this._chooserItem3SlotEmpty=!0,this._chooserPopover2SlotEmpty=!0,this._chooserItem4SlotEmpty=!0,this._lastSlotEmpty=!0,this._badgeSlotEmpty=!0,this._closed=!1}_getChooserPopoverPosition(e){const t=null==e?void 0:e.toLowerCase();return t===N||t===G||t===F?t:F}_setCountdownSurfaceAttributes(){const e=this.querySelector("store-card-timer");e&&s(e,{surface:b.transparent})}_handleSlotChange(){this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length,this._badgeSlotEmpty=0===this._badgeSlot.length,this._chooserItem1SlotEmpty=0===this._chooserItem1Slot.length,this._chooserPopover1SlotEmpty=0===this._chooserPopover1Slot.length,this._chooserItem2SlotEmpty=0===this._chooserItem2Slot.length,this._chooserItem3SlotEmpty=0===this._chooserItem3Slot.length,this._chooserPopover2SlotEmpty=0===this._chooserPopover2Slot.length,this._chooserItem4SlotEmpty=0===this._chooserItem4Slot.length,this._setChooserTextBlockStyles()}_handleCountdownSlotChange(){this._countdownSlot.forEach(e=>{const t=e;t._timerBound||(t.addEventListener("timer-expired",()=>{this.countdown="expired"}),t._timerBound=!0)})}_renderOptionalSlot(e,t){return r`
      <div part=${e} class=${e} style="${t?"display: none;":""}">
        <slot name=${e} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}_renderChooserGroup({itemOneSlotName:e,itemOneSlotEmpty:t,popoverSlotName:o,popoverSlotEmpty:n,itemTwoSlotName:s,itemTwoSlotEmpty:a,popoverPosition:i}){return r`
      <div part="announcement__chooser-group" class="announcement__chooser-group">
        <div part="announcement__chooser-row" class="announcement__chooser-row">
          ${i===N?this._renderOptionalSlot(o,n):""}
          ${this._renderOptionalSlot(e,t)}
          ${i===F?this._renderOptionalSlot(o,n):""}
        </div>
        ${this._renderOptionalSlot(s,a)}
        ${i===G?this._renderOptionalSlot(o,n):""}
      </div>
    `}close(e){e&&e.stopPropagation(),this._closed=!0}updated(){var e;this._badgeSlotEmpty||null==(e=this._badgeSlot[0])||e.setAttribute("size",g.xs),this._setChooserTextBlockStyles()}_setChooserTextBlockStyles(){"chooser"===this.variant&&(this.querySelectorAll("store-text-block store-link").forEach(e=>{e.style.setProperty("--ds-text-block-heading-font-weight","600"),e.style.setProperty("--ds-text-block-heading-color","#F4FAFD")}),this.querySelectorAll('store-text-block p[slot="text-block__heading"]').forEach(e=>{e.style.setProperty("--ds-text-block-heading-font-weight","400"),e.style.setProperty("--ds-text-block-heading-color","#F4FAFD")}),this.querySelectorAll("store-popover-trigger").forEach(e=>{e.style.setProperty("--ds-icon-color","#54A5E2")}))}firstUpdated(){super.firstUpdated(),new a(this),this._setCountdownSurfaceAttributes(),this._setChooserTextBlockStyles()}_renderCountdown(){return r`
      ${"expired"===this.countdown?r`<slot name="announcement__expired-label"></slot>`:""}
      ${"active"===this.countdown?r` <slot
              name="announcement__countdown"
              @slotchange=${this._handleCountdownSlotChange}
            ></slot>
            <slot name="announcement__post-label"></slot>`:""}
      ${"expired"===this.countdown?r`<slot name="announcement__expired-post-label"></slot>`:""}
    `}_renderChooserBanner(){const e=!this._chooserItem1SlotEmpty||!this._chooserItem2SlotEmpty,t=!this._chooserItem3SlotEmpty||!this._chooserItem4SlotEmpty,o=this._getChooserPopoverPosition(this.chooserPopover1Position),n=this._getChooserPopoverPosition(this.chooserPopover2Position);return r`
      ${this._renderOptionalSlot("announcement__first",this._firstSlotEmpty)}
      <div part="announcement__banner" class="announcement__banner">
        <slot name="announcement__badge" @slotchange="${this._handleSlotChange}"></slot>
        <div part="announcement__center" class="announcement__center">
          <div part="announcement__chooser-items" class="announcement__chooser-items">
            ${this._renderChooserGroup({itemOneSlotName:"announcement__chooser-item-1",itemOneSlotEmpty:this._chooserItem1SlotEmpty,popoverSlotName:"announcement__chooser-popover-1",popoverSlotEmpty:this._chooserPopover1SlotEmpty,itemTwoSlotName:"announcement__chooser-item-2",itemTwoSlotEmpty:this._chooserItem2SlotEmpty,popoverPosition:o})}
            ${e&&t?r`<div
                  part="announcement__chooser-divider"
                  class="announcement__chooser-divider"
                ></div>`:""}
            ${this._renderChooserGroup({itemOneSlotName:"announcement__chooser-item-3",itemOneSlotEmpty:this._chooserItem3SlotEmpty,popoverSlotName:"announcement__chooser-popover-2",popoverSlotEmpty:this._chooserPopover2SlotEmpty,itemTwoSlotName:"announcement__chooser-item-4",itemTwoSlotEmpty:this._chooserItem4SlotEmpty,popoverPosition:n})}
          </div>
        </div>
        <div part="announcement__dismiss" class="announcement__dismiss">
          <slot name="announcement__button" @slotchange="${this._handleSlotChange}">
            <store-button
              @click=${e=>this.close(e)}
              icon-only
              appearance=${v.buttonGhost}
              shape=${y.rounded}
              size=${f.small}
              button-label=${i(this.closeLabel)}
              button-title=${i(this.closeTitle)}
            >
              <store-icon
                filled
                icon=${x.name}
                size=${S.medium}
                role="presentation"
                aria-hidden="true"
                slot="button__icon"
              ></store-icon>
            </store-button>
          </slot>
        </div>
      </div>
      ${this._renderOptionalSlot("announcement__last",this._lastSlotEmpty)}
    `}render(){return this._closed?r`<span
        aria-live="polite"
        class="announcement__close-sr"
        part="announcement__close-sr"
        aria-atomic="true"
        sr-close-text="${i(this.srCloseText)}"
        >${i(this.srCloseText)}</span
      >`:"chooser"===this.variant?this._renderChooserBanner():r`
      ${this._renderOptionalSlot("announcement__first",this._firstSlotEmpty)}
      <div part="announcement__banner" class="announcement__banner">
        <slot name="announcement__badge" @slotchange="${this._handleSlotChange}"></slot>
        <div part="announcement__center" class="announcement__center">
          ${this.countdown&&"active"!==this.countdown?"":r`<slot name="announcement__label"></slot>`}
          ${this._renderCountdown()}
          <slot name="announcement__link"></slot>
        </div>
        <div part="announcement__dismiss" class="announcement__dismiss">
          <slot name="announcement__button" @slotchange="${this._handleSlotChange}">
            <store-button
              @click=${e=>this.close(e)}
              icon-only
              appearance=${v.buttonGhost}
              shape=${y.rounded}
              size=${f.small}
              button-label=${i(this.closeLabel)}
              button-title=${i(this.closeTitle)}
            >
              <store-icon
                filled
                icon=${x.name}
                size=${S.medium}
                role="presentation"
                aria-hidden="true"
                slot="button__icon"
              ></store-icon>
            </store-button>
          </slot>
        </div>
      </div>
      ${this._renderOptionalSlot("announcement__last",this._lastSlotEmpty)}
    `}};H.styles=[B,A],D([c({slot:"announcement__first"})],H.prototype,"_firstSlot",2),D([c({slot:"announcement__last"})],H.prototype,"_lastSlot",2),D([c({slot:"announcement__badge"})],H.prototype,"_badgeSlot",2),D([c({slot:"announcement__countdown"})],H.prototype,"_countdownSlot",2),D([c({slot:"announcement__chooser-item-1"})],H.prototype,"_chooserItem1Slot",2),D([c({slot:"announcement__chooser-popover-1"})],H.prototype,"_chooserPopover1Slot",2),D([c({slot:"announcement__chooser-item-2"})],H.prototype,"_chooserItem2Slot",2),D([c({slot:"announcement__chooser-item-3"})],H.prototype,"_chooserItem3Slot",2),D([c({slot:"announcement__chooser-popover-2"})],H.prototype,"_chooserPopover2Slot",2),D([c({slot:"announcement__chooser-item-4"})],H.prototype,"_chooserItem4Slot",2),D([l()],H.prototype,"_firstSlotEmpty",2),D([l()],H.prototype,"_chooserItem1SlotEmpty",2),D([l()],H.prototype,"_chooserPopover1SlotEmpty",2),D([l()],H.prototype,"_chooserItem2SlotEmpty",2),D([l()],H.prototype,"_chooserItem3SlotEmpty",2),D([l()],H.prototype,"_chooserPopover2SlotEmpty",2),D([l()],H.prototype,"_chooserItem4SlotEmpty",2),D([l()],H.prototype,"_lastSlotEmpty",2),D([l()],H.prototype,"_badgeSlotEmpty",2),D([l()],H.prototype,"_closed",2),D([d()],H.prototype,"countdown",2),D([d({attribute:"close-label"})],H.prototype,"closeLabel",2),D([d({attribute:"close-title"})],H.prototype,"closeTitle",2),D([d({attribute:"sr-close-text",reflect:!0})],H.prototype,"srCloseText",2),D([d({reflect:!0})],H.prototype,"variant",2),D([d({attribute:"popover-one-position",reflect:!0})],H.prototype,"chooserPopover1Position",2),D([d({attribute:"popover-two-position",reflect:!0})],H.prototype,"chooserPopover2Position",2),H=D([m(U)],H);export{H as Announcement,U as name};
