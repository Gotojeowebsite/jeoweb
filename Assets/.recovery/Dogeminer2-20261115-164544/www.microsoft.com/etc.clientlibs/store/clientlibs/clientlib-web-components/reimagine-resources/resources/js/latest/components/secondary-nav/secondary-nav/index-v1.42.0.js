import{r as t,i as o,n as i,e as n,c as e,ae as r,b as s,D as a,ao as l,y as d,af as c,I as h,J as u,d as p}from"../../../tag.const-v1.42.0.js";import{v,b as g,o as m,S as y,h as f,e as b}from"../../../secondary-nav-item.const-v1.42.0.js";import{name as _}from"../secondary-nav-item/index-v1.42.0.js";import{n as w,a as k}from"../../../util14-v1.42.0.js";import"../../../util4-v1.42.0.js";import"../../divider/index-v1.42.0.js";import"../../../util1-v1.42.0.js";import"../../button-group/index-v1.42.0.js";import"../../dropdown/dropdown/index-v1.42.0.js";import"../../dropdown/dropdown-trigger/index-v1.42.0.js";import"../../../util8-v1.42.0.js";import"../../menu-list/menu-list/index-v1.42.0.js";import"../../scrollslider/scrollslider/index-v1.42.0.js";import"../../sticky/index-v1.42.0.js";import{f as S}from"../../../footnote.const-v1.42.0.js";const x="dropdown",$="jumplinks",E="quicklinks",A="jumplinks--horizontal",j="navigation",N="flex",C="center",q="var(--ds-elevation-level-2, 0px 2px 4px rgba(0, 0, 0, 0.14) 0px 0px 2px rgba(0, 0, 0, 0.12))",D="var(--ds-theme-foreground-base-strong, #0e1726)",L="flex",z="var(--ds-spacing-l, 1.5rem)",R="flex",W="center",O="var(--ds-label-l-line-height, 1.5rem)",T="var(--ds-label-l-font-size, 1rem)",G="var(--ds-label-l-font-weight, 600)",I="var(--ds-spacing-m, 1rem)",Q="var(--ds-spacing-s, 0.75rem)",J="var(--ds-spacing-xl, 0.5rem)",K="0.5rem",U="var(--ds-spacing-l, 1.5rem)",B="var(--ds-spacing-m, 1rem)",P="var(--ds-spacing-3xs, 0.125rem)",H="1px",M="var(--ds-label-s-font-size)",F=o`
  /** Navigation (variant) */
  :host {
    --ds-secondary-nav-item-badge-display: none;
    flex-direction: row;
    background-color: var(
      --ds-secondary-nav-background-color,
      ${t("var(--ds-theme-background-card-normal, #fefefe)")}
    );
    display: var(--ds-secondary-nav-display, ${t(L)});
    box-shadow: var(--ds-secondary-nav-box-shadow, ${t(q)});
  }

  :host ::slotted([slot='secondary-nav__label']) {
    color: var(--ds-secondary-nav-label-color, ${t(D)});
    display: var(--ds-secondary-nav-label-display, ${t(R)});
    place-items: var(
      --ds-secondary-nav-label-align-items,
      ${t(W)}
    );
    line-height: var(
      --ds-secondary-nav-label-line-height,
      ${t(O)}
    );
    font-size: var(--ds-secondary-nav-label-font-size, ${t(T)});
    font-weight: var(
      --ds-secondary-nav-label-font-weight,
      ${t(G)}
    );
  }

  store-container {
    display: flex;
    width: 100%;
    gap: var(--ds-secondary-nav-gap, ${t(z)});
  }

  store-scroll-spy {
    width: 100%;
  }

  .secondary-nav__label {
    display: flex;
    flex-shrink: 0;
  }

  :host ::slotted([slot='secondary-nav__button-group']) {
    display: var(
      --ds-secondary-nav-button-group-display,
      ${t(N)}
    );
    align-items: var(
      --ds-secondary-nav-button-group-align-items,
      ${t(C)}
    );
  }

  store-divider {
    height: auto;
    margin-block: var(--ds-spacing-s, 0.75rem);
  }

  /** Navigation (variant) */
  :host([configuration='navigation']) {
    --ds-secondary-nav-item-badge-display: none;
    --ds-secondary-nav-icon: none;
    --ds-secondary-nav-item-indicator-display: block;
    --ds-scrollslider-item-gap: var(--ds-spacing-2xl, 3rem);
    --ds-secondary-nav-display: flex;
  }

  :host([configuration='navigation']) .secondary-nav__nav {
    flex-grow: 1;
    min-width: 0;
  }

  :host([configuration='navigation']) store-scrollslider::part(scrollslider__base) {
    padding-inline: var(
      --ds-secondary-nav-scrollslider-padding-inline,
      ${t(K)}
    );
    margin-inline-start: var(--ds-secondary-nav-margin-inline-start, 0);
  }

  :host([configuration='navigation']) store-scrollslider.no-label::part(scrollslider__base) {
    --ds-secondary-nav-margin-inline-start: ${t(`-${K}`)};
  }

  /** Dropdown (variant) */
  :host([configuration='dropdown']) {
    --ds-dropdown-position: static;
    --ds-dropdown-trigger-box-shadow: none;

    padding-block-end: var(
      --ds-secondary-nav-dropdown-padding-block-end,
      ${t(P)}
    );
    position: relative;
  }

  :host([configuration='dropdown']) .secondary-nav__nav {
    width: 100%;
  }

  :host([configuration='dropdown']) store-dropdown-trigger:hover,
  :host([configuration='dropdown']) store-dropdown-trigger:focus {
    --ds-dropdown-trigger-hover-box-shadow: none;
  }

  :host([configuration='dropdown']) store-indicator {
    width: 100%;
    position: absolute;
    bottom: 0;
  }

  .secondary-nav__container {
    display: flex;
    flex-grow: 1;
    position: relative;
  }

  :host([configuration='dropdown']) store-dropdown {
    --ds-dropdown-trigger-border-radius: 0;
    --ds-flyout-border-radius: var(--ds-radii-s, 0.5rem);

    width: 100%;
  }

  :host([configuration='dropdown']) ::slotted(store-secondary-nav-item) {
    margin-inline-start: var(
      --ds-secondary-nav-slotted-item-margin-inline-start,
      ${t(H)}
    );
  }

  :host([configuration='dropdown']) store-dropdown-trigger:focus {
    --ds-dropdown-trigger-vfi-outline-offset: -0.3125rem;
  }

  :host([configuration='dropdown']) store-menu-list {
    --ds-menu-list-border-radius: var(
      --ds-radii-s,
      0.5rem
    ); /* This variable overrides the --ds-radii-m of the host element */

    position: relative;
    box-shadow: var(--ds-elevation-level-2);
    border-radius: var(
      --ds-radii-s,
      0.5rem
    ); /* This border radius applies styles to the menu-list div */
  }

  /** Jumplink (both variants) */
  :host([configuration='jumplinks']),
  :host([configuration='jumplinks--horizontal']) {
    --ds-secondary-nav-item-badge-display: flex;
    --ds-secondary-nav-icon: flex;
    --ds-secondary-nav-background-color: transparent;
    --ds-secondary-nav-box-shadow: none;
    --ds-secondary-nav-item-indicator-display: none;
    --ds-secondary-nav-padding-inline: 0;
  }

  /** Jumplink (variant) */
  :host([configuration='jumplinks']) {
    --ds-secondary-nav-gap: var(
      --ds-secondary-nav-jumplinks-gap,
      ${t(I)}
    );
    --ds-scrollslider-base-padding: 5px;

    flex-direction: row;
  }

  :host([configuration='jumplinks']) store-scrollslider {
    width: 100%;
  }

  :host([configuration='jumplinks']) store-scrollslider::part(scrollslider__base) {
    width: 100%;
    justify-content: center;
    padding-block: var(
      --ds-secondary-nav-jumplink-padding-block,
      ${t(J)}
    );
  }

  :host([configuration='jumplinks'])
    store-scrollslider:not([hide-controls])::part(scrollslider__base) {
    justify-content: start;
  }

  /** Jumplink Horizontal (variant) */
  :host([configuration='jumplinks--horizontal']) {
    gap: var(
      --ds-secondary-nav-jumplinks-gap,
      ${t(Q)}
    );
    flex-direction: column;
  }

  :host([configuration='quicklinks']) .secondary-nav__quick-links-list {
    justify-content: center;
    text-align: center;
    flex-wrap: wrap;
    display: flex;
    padding: 0;
    list-style: none;
    width: 100%;
  }

  :host([configuration='quicklinks']) ::slotted(store-secondary-nav-item) {
    --ds-link-font-size: var(
      --ds-secondary-nav-quicklinks-link-font-size,
      ${t(M)}
    );
  }

  :host([configuration='quicklinks']) ::slotted(*) {
    margin-inline-start: var(
      --ds-secondary-nav-list-margin-inline-start,
      ${t(U)}
    );
    margin-inline-end: var(
      --ds-secondary-nav-list-margin-inline-end,
      ${t(U)}
    );
    margin-block-end: var(
      --ds-secondary-nav-list-margin-block-end,
      ${t(B)}
    );
    margin-block-start: var(
      --ds-secondary-nav-list-margin-block-start,
      ${t(B)}
    );
    align-items: center;
    display: flex;
  }

  :host([configuration='quicklinks']) {
    --ds-secondary-nav-background-color: transparent;
    --ds-secondary-nav-box-shadow: none;
    width: 100%;
    flex-direction: column;
  }

  @media (forced-colors: active) {
    :host([configuration='quicklinks']) {
      background-color: Canvas;
    }
  }
`,V=o`
  @media (min-width: ${t(v.md)}) {
    .secondary-nav__button-group {
      display: flex;
      flex-shrink: 0;
    }
  }

  @media (max-width: ${t(g(v.md))}) {
    :host([configuration='dropdown']) ::slotted([slot='secondary-nav__label']) {
      padding-inline: var(--ds-spacing-s, 0.75rem);
    }
  }
  @media (max-width: ${t(g(v.md))}) {
    :host([configuration='quicklinks']) ul {
      gap: 1rem;
    }

    :host([configuration='quicklinks']) ::slotted(*) {
      margin-left: 0;
      margin-right: 0;
      justify-content: center;
      flex: 1 1 calc(50% - 0.5rem);
      box-sizing: border-box;
    }
  }
`;var X=Object.defineProperty,Y=Object.getOwnPropertyDescriptor,Z=(t,o,i,n)=>{for(var e,r=n>1?void 0:n?Y(o,i):o,s=t.length-1;s>=0;s--)(e=t[s])&&(r=(n?e(o,i,r):e(r))||r);return n&&r&&X(o,i,r),r};const tt="store-secondary-nav";let ot=class extends y{constructor(){super(...arguments),this.hideDivider=!1,this._labelSlotEmpty=!0,this._buttonGroupSlotEmpty=!0,this._secondaryNavEvents=[],this._activeDropdownLink=""}_handleKeyDown(t){var o,i,n,e,s,a,l,d;const c=t.target,h=this.children[1];let u=this.children[this.children.length-1];if("store-button-group"===u.tagName.toLowerCase()&&(u=u.children[u.children.length-1]),(t.key===r.TAB&&!t.shiftKey&&c===u||t.key===r.TAB&&t.shiftKey&&c===h)&&setTimeout(()=>{var t,o,i,n;null==(o=null==(t=this.shadowRoot)?void 0:t.querySelector("store-dropdown"))||o.removeAttribute("open"),null==(n=null==(i=this.shadowRoot)?void 0:i.querySelector("store-dropdown-trigger"))||n.focus()}),t.key===r.ARROW_DOWN){const r=c.nextElementSibling,s=null==(o=r.shadowRoot)?void 0:o.querySelector("a"),a=null==(i=h.shadowRoot)?void 0:i.querySelector("a");"store-menu-list"===r.tagName.toLowerCase()&&(t.preventDefault(),null==(e=null==(n=this.shadowRoot)?void 0:n.querySelector("store-dropdown"))||e.setAttribute("open",""),setTimeout(()=>{a.focus()})),("store-secondary-nav-item"===r.tagName.toLowerCase()||"store-button"===r.tagName.toLowerCase())&&s.focus()}if(t.key===r.ARROW_UP){const t=c.previousElementSibling,o=null==(s=t.shadowRoot)?void 0:s.querySelector("a");"store-secondary-nav-item"===t.tagName.toLowerCase()&&o.focus()}if(t.key===r.HOME){const t=null==(a=h.shadowRoot)?void 0:a.querySelector("a");t&&t.focus()}t.key===r.END&&u&&("store-button"===u.tagName.toLowerCase()?u.focus():null==(d=null==(l=u.shadowRoot)?void 0:l.querySelector("a"))||d.focus())}_renderDivider(){return s`<store-divider orientation="vertical"></store-divider>`}_handleSlotChange(){this._labelSlotEmpty=0===this._labelSlot.length,this._buttonGroupSlotEmpty=0===this._buttonGroupSlot.length,this.configuration===E&&this._handleQuickLinksSlotChange()}_handleQuickLinksSlotChange(){this.configuration===E&&this._setQuickLinksAttributes(!0)}_setQuickLinksAttributes(t=!0){this._defaultSlot.forEach(o=>{const i=o.tagName.toLowerCase()===_;(t||i)&&!o.hasAttribute("role")&&o.setAttribute("role","listitem"),i&&o.setAttribute("configuration",f.quicklink)})}_renderOptionalSlot(t,o,i){return s`
      <div part=${t} class=${t} style="${o?"display: none;":""}">
        <slot
          name=${t}
          @slotchange="${this._handleSlotChange}"
          id="${i?t:""}"
        ></slot>
      </div>
    `}dropdownTemplate(){if(this.configuration===x)return s`
        <span class="secondary-nav__container" part="secondary-nav__container">
          ${this._renderOptionalSlot("secondary-nav__label",this._labelSlotEmpty,!0)}
          ${this.hideDivider?"":this._renderDivider()}
          <nav
            aria-label="${this.label&&this._labelSlotEmpty?this.label:a}"
            aria-labelledby="${this._labelSlotEmpty?a:"secondary-nav__label"}"
            class="secondary-nav__nav"
            part="secondary-nav__nav"
          >
            <store-dropdown @keydown="${this._handleKeyDown}">
              <store-dropdown-trigger slot="dropdown__trigger" configuration="input">
                ${this._activeDropdownLink}
              </store-dropdown-trigger>
              <store-menu-list>
                <slot @click=${this._handleNavItemClick} role="presentation"></slot>
                ${d(this._buttonGroupSlotEmpty?a:s`<store-divider orientation="horizontal"></store-divider>`)}
                ${this._renderOptionalSlot("secondary-nav__button-group",this._buttonGroupSlotEmpty)}
              </store-menu-list>
            </store-dropdown>
          </nav>
        </span>
        <store-indicator orientation=${l.horizontal}></store-indicator>
      `}navTemplate(){const t={"no-label":this._labelSlotEmpty};return this.configuration===$?s`<store-scrollslider
        control-position="middle-start"
        control-size="small"
        class="${b(t)}"
      >
        <slot @click=${this._handleNavItemClick} role="presentation"></slot>
      </store-scrollslider>`:this.configuration===A?s`<slot @click=${this._handleNavItemClick} role="presentation"></slot>`:this.configuration===E?s` <div
        aria-label="${this.label&&this._labelSlotEmpty?this.label:a}"
        aria-labelledby="${this._labelSlotEmpty?a:"secondary-nav__label"}"
        class="secondary-nav__quick-links"
        part="secondary-nav__quick-links"
      >
        <ul
          class="secondary-nav__quick-links-list"
          part="secondary-nav__quick-links-list"
          role="list"
        >
          <slot
            @click=${this._handleNavItemClick}
            @slotchange=${this._handleQuickLinksSlotChange}
            role="presentation"
          ></slot>
        </ul>
      </div>`:this.configuration!==j&&this.configuration?void 0:s`
        <store-container>
          ${this._renderOptionalSlot("secondary-nav__label",this._labelSlotEmpty,!0)}
          ${this.hideDivider?a:this._renderDivider()}
          <nav
            aria-label="${this.label&&this._labelSlotEmpty?this.label:a}"
            aria-labelledby="${this._labelSlotEmpty?a:"secondary-nav__label"}"
            class="secondary-nav__nav"
            part="secondary-nav__nav"
          >
            <store-scrollslider
              control-position="middle-start"
              control-size="small"
              class="${b(t)}"
            >
              <slot @click=${this._handleNavItemClick} role="presentation"></slot>
            </store-scrollslider>
          </nav>
          ${this._renderOptionalSlot("secondary-nav__button-group",this._buttonGroupSlotEmpty)}
        </store-container>
      `}_handleNavItemClick(t){var o;const i=t.target,n="span"===i.tagName.toLowerCase();this._activeDropdownLink=String(i.textContent),Array.from(this.children).forEach(t=>t.removeAttribute("active")),n?null==(o=i.parentElement)||o.setAttribute("active",""):null==i||i.setAttribute("active","")}_handleResize(){const t=this._defaultSlot.map(t=>t.hasAttribute("active")),o=Number(v.md.slice(0,3));t.forEach((t,o)=>{if(t){const t=this._defaultSlot[o];this._activeDropdownLink=t.textContent}}),window.innerWidth>=o&&(this.configuration===x&&(this.setAttribute("configuration",j),this._defaultSlot.forEach(t=>{t.setAttribute("configuration",j)})),this.configuration===A&&(this.setAttribute("configuration",$),this._defaultSlot.forEach(t=>{t.setAttribute("configuration",f.vertical)}))),window.innerWidth<o&&(this.configuration===j&&(this.setAttribute("configuration",x),this._defaultSlot.forEach(t=>{t.setAttribute("configuration",x)})),this.configuration===$&&(this.setAttribute("configuration",A),this._defaultSlot.forEach(t=>{t.setAttribute("configuration",f.horizontal)})))}_handleUpdateDropdownTrigger(){var t,o;const i=Number(v.md.slice(0,3));if(this.configuration===x||window.innerWidth<i&&this.configuration===j){const i=null==(o=null==(t=this._defaultSlot)?void 0:t.find(t=>t.hasAttribute("active")))?void 0:o.textContent;i&&i!==this._activeDropdownLink&&(this._activeDropdownLink=i)}}connectedCallback(){super.connectedCallback(),this._secondaryNavEvents.push({el:window,type:"resize",handler:c(100,this._handleResize.bind(this))});const t=S(this,w);if(t){const o={el:t,type:k.change,handler:this._handleUpdateDropdownTrigger.bind(this)};this._secondaryNavEvents.push(o)}h(this._secondaryNavEvents)}disconnectedCallback(){u(this._secondaryNavEvents)}firstUpdated(){const t=Number(v.md.slice(0,3));window.innerWidth<t&&this.configuration===j&&(this.configuration=x),window.innerWidth<t&&this.configuration===$&&(this.configuration=A),window.innerWidth<t&&this.configuration===A&&this._defaultSlot.forEach(t=>{t.setAttribute("configuration",f.horizontal)}),window.innerWidth<t&&this.configuration===x&&this._defaultSlot.forEach(t=>{t.setAttribute("configuration",x)}),this.configuration===E&&this._setQuickLinksAttributes(!0),Array.from(this.children).forEach(t=>{t.hasAttribute("active")&&(this._activeDropdownLink=String(t.textContent))})}updated(){const t=Number(v.md.slice(0,3));this.configuration===j&&(window.innerWidth>t?this._buttonGroupSlotEmpty||this._buttonGroupSlot[0].removeAttribute("style"):window.innerWidth<t&&(this.configuration=x)),this.configuration===E&&this._setQuickLinksAttributes(!1),window.innerWidth<t&&this.configuration===x?this.querySelectorAll("store-button").forEach(t=>{t.setAttribute("size","large"),t.style.width="100%"}):this.querySelectorAll("store-button").forEach(t=>{t.setAttribute("size","small"),t.removeAttribute("style")})}render(){return s`
      ${this.configuration===x?this.dropdownTemplate():this.navTemplate()}
    `}};ot.styles=[F,V],Z([i({reflect:!0})],ot.prototype,"configuration",2),Z([i({type:Boolean,attribute:"hide-divider"})],ot.prototype,"hideDivider",2),Z([i()],ot.prototype,"label",2),Z([i({reflect:!0})],ot.prototype,"theme",2),Z([n({slot:"secondary-nav__label"})],ot.prototype,"_labelSlot",2),Z([m()],ot.prototype,"_defaultSlot",2),Z([m({slot:"secondary-nav__button-group"})],ot.prototype,"_buttonGroupSlot",2),Z([e()],ot.prototype,"_labelSlotEmpty",2),Z([e()],ot.prototype,"_buttonGroupSlotEmpty",2),Z([e()],ot.prototype,"_secondaryNavEvents",2),Z([e()],ot.prototype,"_activeDropdownLink",2),ot=Z([p(tt)],ot);export{ot as SecondaryNav,tt as name};
