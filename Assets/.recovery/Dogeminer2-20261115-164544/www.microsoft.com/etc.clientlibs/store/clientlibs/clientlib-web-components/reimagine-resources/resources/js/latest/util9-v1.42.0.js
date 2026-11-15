import{r as o,i as t,n as l,e as a,c as s,b as u,y as n,d as e}from"./tag.const-v1.42.0.js";import{f as c}from"./vfi-v1.42.0.js";import{v as i,S as r}from"./secondary-nav-item.const-v1.42.0.js";const d={col1even:"1-col-even",col1boxed:"1-col-boxed",col1staged:"1-col-staged",col1focus:"1-col-focus",col2even:"2-col-even",col2focus:"2-col-focus",col2offsetRight:"2-col-offset-right",col2offsetLeft:"2-col-offset-left",col2editorial:"2-col-editorial",col2sidebar:"2-col-sidebar",col3Even:"3-col-even",col3OffsetStack:"3-col-offset-stack",col4even1:"4-col-even-1",col5Even:"5-col-even",col6Even:"6-col-even",col1evenOverflow:"1-col-even-overflow",col2boxedOverflow:"2-col-boxed-overflow",col3EvenOverflow:"3-col-even-overflow",col4evenOverflow:"4-col-even-overflow",col1evenFullOverflow:"1-col-even-full-overflow",colLeftAlignedOverflow:"left-aligned-overflow"},m={relaxed:"relaxed"},y="onScroll",f="onMount",_="flex",g="0.5rem",h="0.5rem",v="row",b="wrap",p="flex-start",w="100%",x="initial",$="initial",k="initial",S="block",E="initial",j="0",O="0",P="initial",L="initial",V="initial",X="initial",C="100%",M="initial",D=t`
  :host {
    display: block;
  }

  .layout__base {
    --ds-grid-column-total: ${o("6")};
    --ds-grid-column-gap: ${o(g)};
    --ds-grid-column-gap-total: calc((var(--ds-grid-column-total) - 1) * var(--ds-grid-column-gap));
    --ds-grid-available-width: calc(100% - var(--ds-grid-column-gap-total));
    --ds-grid-column-width: calc(var(--ds-grid-available-width) / var(--ds-grid-column-total));
    --ds-layout-column-amount: var(--ds-grid-column-total);

    display: var(--ds-layout-display, ${o(_)});
    flex-wrap: var(--ds-layout-flex-wrap, ${o(b)});
    flex-direction: var(--ds-layout-flex-direction, ${o(v)});
    column-gap: var(--ds-layout-column-gap, ${o(g)});
    row-gap: var(--ds-layout-row-gap, ${o(h)});
    justify-content: var(--ds-layout-justify-content, ${o(p)});
    width: var(--ds-layout-width, ${o(w)});
    padding-inline-start: var(
      --ds-layout-padding-inline-start,
      ${o(x)}
    );
    overflow: var(--ds-layout-overflow, ${o($)});
    margin-inline: var(--ds-layout-margin-inline, ${o(k)});
  }

  .layout__base:focus {
    ${c};
  }

  .layout__base ::slotted(store-layout-column) {
    --ds-layout-column-flex-basis: var(
      --ds-layout-column-flex-basis-override,
      calc(
        var(--ds-grid-column-width) * var(--ds-layout-column-amount) +
          (var(--ds-grid-column-gap) * (var(--ds-layout-column-amount) - 1))
      )
    );

    display: var(--ds-layout-column-display, ${o(S)});
    flex-direction: var(
      --ds-layout-column-flex-direction,
      ${o(E)}
    );
    flex-grow: var(
      --ds-layout-column-flex-grow,
      ${o(j)}
    );
    flex-shrink: var(
      --ds-layout-column-flex-shrink,
      ${o(O)}
    );
    flex-basis: var(--ds-layout-column-flex-basis);
    row-gap: var(--ds-layout-column-row-gap, ${o(P)});
    column-gap: var(
      --ds-layout-column-column-gap,
      ${o(L)}
    );
    align-items: var(
      --ds-layout-column-align-items,
      ${o(V)}
    );
    justify-content: var(
      --ds-layout-column-justify-content,
      ${o(X)}
    );
    margin-block-end: var(
      --ds-layout-column-margin-block-end,
      ${o(M)}
    );
    width: var(--ds-layout-column-width, ${o(C)});
  }

  :host([configuration='left-aligned-overflow']) .layout__base {
    --ds-grid-available-width: auto;
  }

  :host([configuration='left-aligned-overflow']) .layout__base ::slotted(store-layout-column) {
    width: auto;
  }

  :host([configuration$='overflow']) .layout__base,
  :host([configuration$='full-overflow']) .layout__base,
  :host([configuration='4-col-even-1-responsive']) .layout__base {
    --ds-layout-overflow: scroll;
    --ds-layout-flex-wrap: nowrap;
  }

  :host([configuration$='overflow']) .layout__base ::slotted(*),
  :host([configuration='4-col-even-1-responsive']) .layout__base ::slotted(*) {
    min-width: 0;
  }

  :host([configuration$='overflow']) .layout__base {
    --ds-layout-column-amount: 5;
  }

  :host([configuration='4-col-even-1-responsive']) .layout__base {
    --ds-layout-column-amount: 4.5;
  }

  @media (max-width: 768px) {
    :host([configuration$='overflow']) .layout__base {
      --ds-layout-column-amount: 4;
    }

    :host([configuration='4-col-even-1-responsive']) .layout__base {
      --ds-layout-column-amount: 4.5;
    }
  }

  :host([configuration$='full-overflow']) .layout__base {
    --ds-layout-column-amount: 6;
  }

  .layout__base ::slotted(*:nth-child(odd)) {
    margin-block-start: var(--ds-layout-staggered-offset, 0);
  }

  .layout__base ::slotted(*:nth-child(even)) {
    margin-block-end: var(--ds-layout-staggered-offset, 0);
  }
`,I=t`
  /* VP1 (XS): 320-539px — 1 card + sliver peek */
  :host([configuration='left-aligned-overflow']) .layout__base {
    --ds-layout-column-amount: calc(var(--ds-grid-column-total) / 1.15);
    --ds-layout-column-gap: 0.75rem;
    --ds-carousel-layout-column-gap: 0.75rem;
    column-gap: 0.75rem;
  }

  @media (min-width: ${o(i.sm)}) {
    :host([configuration='4-col-even-2']) .layout__base,
    :host([configuration='6-col-even']) .layout__base {
      --ds-layout-column-amount: 3;
    }

    :host([configuration$='overflow']) .layout__base {
      --ds-layout-column-amount: 4;
    }

    :host([configuration='multi-card-overflow']) .layout__base {
      --ds-layout-column-amount: 3;
    }

    /* VP2 (SM): 540-859px — 1 card + partial 2nd */
    :host([configuration='left-aligned-overflow']) .layout__base {
      --ds-layout-column-amount: calc(var(--ds-grid-column-total) / 1.5);
      --ds-layout-column-gap: 0.75rem;
      --ds-carousel-layout-column-gap: 0.75rem;
      column-gap: 0.75rem;
    }
  }

  @media (min-width: ${o(i.md)}) {
    .layout__base {
      --ds-grid-column-total: 12;
      --ds-grid-column-gap: 1rem;
      --ds-layout-column-gap: 1rem;
      --ds-layout-row-gap: 1rem;
    }

    :host([configuration='1-col-even']) .layout__base,
    :host([configuration='1-col-boxed']) .layout__base,
    :host([configuration='1-col-staged']) .layout__base {
      --ds-layout-column-amount: 12;
    }

    :host([configuration='1-col-focus']) .layout__base {
      --ds-layout-justify-content: center;
      --ds-layout-column-amount: 10;
    }

    :host([configuration='2-col-even']) .layout__base ::slotted(store-layout-column) {
      --ds-layout-column-amount: 6;
    }

    :host([configuration='2-col-focus']) .layout__base {
      --ds-layout-justify-content: center;
    }

    :host([configuration='2-col-focus']) .layout__base ::slotted(store-layout-column) {
      --ds-layout-column-amount: 5;
    }

    :host([configuration='2-col-gapped']) .layout__base {
      --ds-layout-justify-content: space-between;
    }

    :host([configuration='2-col-gapped']) .layout__base ::slotted(store-layout-column) {
      --ds-layout-column-amount: 5;
    }

    :host([configuration='2-col-offset-right'])
      .layout__base
      ::slotted(store-layout-column:first-child),
    :host([configuration='2-col-offset-left'])
      .layout__base
      ::slotted(store-layout-column:last-child) {
      --ds-layout-column-amount: 4;
    }

    :host([configuration='2-col-offset-right'])
      .layout__base
      ::slotted(store-layout-column:last-child),
    :host([configuration='2-col-offset-left'])
      .layout__base
      ::slotted(store-layout-column:first-child) {
      --ds-layout-column-amount: 8;
    }

    :host([configuration='2-col-editorial']) .layout__base {
      --ds-layout-column-gap: calc(var(--ds-grid-column-width) + (var(--ds-grid-column-gap) * 2));
    }

    :host([configuration='2-col-editorial'])
      .layout__base
      ::slotted(store-layout-column:first-child) {
      --ds-layout-column-amount: 4;
    }

    :host([configuration='2-col-editorial'])
      .layout__base
      ::slotted(store-layout-column:last-child) {
      --ds-layout-column-amount: 6;
    }

    :host([configuration='2-col-sidebar'])
      .layout__base
      ::slotted(store-layout-column:first-child) {
      --ds-layout-column-amount: 4;
    }

    :host([configuration='2-col-sidebar']) .layout__base ::slotted(store-layout-column:last-child) {
      --ds-layout-column-amount: 8;
    }

    :host([configuration='3-col-even']) .layout__base {
      --ds-layout-column-amount: 4;
    }

    :host([configuration='3-col-even']) .layout__base ::slotted(store-layout-column.column-span-2) {
      --ds-layout-column-amount: 8;
    }

    :host([configuration='3-col-offset-stack'])
      .layout__base
      ::slotted(store-layout-column:nth-child(2)),
    :host([configuration='3-col-offset-stack'])
      .layout__base
      ::slotted(store-layout-column:nth-child(7)) {
      --ds-layout-column-amount: 8;
    }

    :host([configuration='3-col-offset-stack'])
      .layout__base
      ::slotted(store-layout-column:nth-child(3)),
    :host([configuration='3-col-offset-stack'])
      .layout__base
      ::slotted(store-layout-column:nth-child(6)) {
      --ds-layout-column-amount: 4;
    }

    :host([configuration='3-col-offset-stack'])
      .layout__base
      ::slotted(store-layout-column:nth-child(4)),
    :host([configuration='3-col-offset-stack'])
      .layout__base
      ::slotted(store-layout-column:nth-child(5)) {
      --ds-layout-column-amount: 6;
    }

    :host([configuration='3-col-offset-right']) .layout__base {
      --ds-layout-column-amount: 3;
    }

    :host([configuration='3-col-offset-right'])
      .layout__base
      ::slotted(store-layout-column:last-child) {
      --ds-layout-column-amount: 6;
    }

    :host([configuration='4-col-even-1']) .layout__base {
      --ds-layout-column-amount: 3;
    }

    :host([configuration='4-col-even-1'])
      .layout__base
      ::slotted(store-layout-column.column-span-2) {
      --ds-layout-column-amount: 6;
    }

    :host([configuration='4-col-even-1-responsive']) .layout__base {
      --ds-layout-column-amount: 3;
      --ds-layout-overflow: initial;
      --ds-layout-flex-wrap: wrap;
    }

    :host([configuration='4-col-even-2']) .layout__base,
    :host([configuration='5-col-even']) .layout__base {
      --ds-layout-column-amount: 6;
    }

    :host([configuration='6-col-even']) .layout__base {
      --ds-layout-column-amount: 4;
    }

    :host([configuration='1-col-even-overflow']) .layout__base,
    :host([configuration='1-col-boxed-overflow']) .layout__base,
    :host([configuration='1-col-even-full-overflow']) .layout__base {
      --ds-layout-column-amount: 12;
    }

    :host([configuration='2-col-even-overflow']) .layout__base {
      --ds-layout-column-amount: 6;
    }

    :host([configuration='3-col-even-overflow']) .layout__base,
    :host([configuration='4-col-even-overflow']) .layout__base,
    :host([configuration='multi-card-overflow']) .layout__base {
      --ds-layout-column-amount: 4;
    }

    /* VP3 (MD): 860-1083px — 2 cards + ~1/2 of 3rd */
    :host([configuration='left-aligned-overflow']) .layout__base {
      --ds-layout-column-amount: calc(var(--ds-grid-column-total) / 2.5);
      --ds-layout-column-gap: 1rem;
      --ds-carousel-layout-column-gap: 1rem;
      column-gap: 1rem;
    }
  }

  /* VP4 (LG): 1084-1399px — 2 cards + ~1/2 of 3rd, bigger cards/gaps */
  @media (min-width: 1084px) {
    :host([configuration='left-aligned-overflow']) .layout__base {
      --ds-layout-column-amount: calc(var(--ds-grid-column-total) / 2.5);
      --ds-layout-column-gap: 1.5rem;
      --ds-carousel-layout-column-gap: 1.5rem;
      column-gap: 1.5rem;
    }
  }

  /* VP5 (XL): 1400-1599px — 3 cards + sneak peek of 4th */
  @media (min-width: 1400px) {
    :host([configuration='left-aligned-overflow']) .layout__base {
      --ds-layout-column-amount: calc(var(--ds-grid-column-total) / 3.2);
      --ds-layout-column-gap: 1.5rem;
      --ds-carousel-layout-column-gap: 1.5rem;
      column-gap: 1.5rem;
    }
  }

  @media (min-width: ${o(i.lg)}) {
    .layout__base {
      --ds-grid-column-total: 24;
    }

    /* VP5 (XL) continued at lg breakpoint */
    :host([configuration='left-aligned-overflow']) .layout__base {
      --ds-layout-column-amount: calc(var(--ds-grid-column-total) / 3.2);
    }

    :host([configuration='1-col-even']) .layout__base {
      --ds-layout-column-amount: var(--ds-grid-column-total);
    }

    :host([configuration='1-col-boxed']) .layout__base,
    :host([configuration='1-col-staged']) .layout__base,
    :host([configuration='1-col-focus']) .layout__base {
      --ds-layout-justify-content: center;
    }

    :host([configuration='1-col-boxed']) .layout__base {
      --ds-layout-column-amount: 20;
    }

    :host([configuration='1-col-staged']) .layout__base {
      --ds-layout-column-amount: 16;
    }

    :host([configuration='1-col-focus']) .layout__base {
      --ds-layout-column-amount: 14;
    }

    :host([configuration='2-col-even']) .layout__base ::slotted(store-layout-column) {
      --ds-layout-column-amount: 12;
    }

    :host([configuration='2-col-focus']) .layout__base ::slotted(store-layout-column) {
      --ds-layout-column-amount: 7;
    }

    :host([configuration='2-col-gapped']) .layout__base ::slotted(store-layout-column) {
      --ds-layout-column-amount: 10;
    }

    :host([configuration='2-col-offset-right'])
      .layout__base
      ::slotted(store-layout-column:first-child),
    :host([configuration='2-col-offset-left'])
      .layout__base
      ::slotted(store-layout-column:last-child) {
      --ds-layout-column-amount: 8;
    }

    :host([configuration='2-col-offset-right'])
      .layout__base
      ::slotted(store-layout-column:last-child),
    :host([configuration='2-col-offset-left'])
      .layout__base
      ::slotted(store-layout-column:first-child) {
      --ds-layout-column-amount: 16;
    }

    :host([configuration='2-col-editorial'])
      .layout__base
      ::slotted(store-layout-column:first-child) {
      --ds-layout-column-amount: 5;
    }

    :host([configuration='2-col-editorial'])
      .layout__base
      ::slotted(store-layout-column:last-child) {
      --ds-layout-column-amount: 12;
    }

    :host([configuration='2-col-sidebar'])
      .layout__base
      ::slotted(store-layout-column:first-child) {
      --ds-layout-column-amount: 6;
    }

    :host([configuration='2-col-sidebar']) .layout__base ::slotted(store-layout-column:last-child) {
      --ds-layout-column-amount: 18;
    }

    :host([configuration='3-col-even']) .layout__base {
      --ds-layout-column-amount: 8;
    }

    :host([configuration='3-col-even']) .layout__base ::slotted(store-layout-column.column-span-2) {
      --ds-layout-column-amount: 16;
    }

    :host([configuration='3-col-offset-stack'])
      .layout__base
      ::slotted(store-layout-column:nth-child(n)) {
      --ds-layout-column-amount: 6;
    }

    :host([configuration='3-col-offset-stack'])
      .layout__base
      ::slotted(store-layout-column:nth-child(2)) {
      --ds-layout-column-amount: 12;
    }

    :host([configuration='3-col-offset-stack'])
      .layout__base
      ::slotted(store-layout-column:first-child) {
      --ds-layout-column-amount: 12;
    }

    :host([configuration='3-col-offset-stack'])
      .layout__base
      ::slotted(store-layout-column:nth-child(7)) {
      --ds-layout-column-amount: 12;
    }

    :host([configuration='3-col-offset-right']) .layout__base ::slotted(store-layout-column) {
      --ds-layout-column-amount: 6;
    }

    :host([configuration='3-col-offset-right'])
      .layout__base
      ::slotted(store-layout-column:last-child) {
      --ds-layout-column-amount: 12;
    }

    :host([configuration='4-col-even-1']) .layout__base,
    :host([configuration='4-col-even-2']) .layout__base,
    :host([configuration='4-col-even-1-responsive']) .layout__base {
      --ds-layout-column-amount: 6;
    }

    :host([configuration='4-col-even-1'])
      .layout__base
      ::slotted(store-layout-column.column-span-2) {
      --ds-layout-column-amount: 12;
    }

    :host([configuration='5-col-even']) .layout__base {
      --ds-layout-column-amount: calc(var(--ds-grid-column-total) / 5);
    }

    :host([configuration='6-col-even']) .layout__base {
      --ds-layout-column-amount: 4;
    }

    :host([configuration='1-col-boxed-overflow']) .layout__base {
      --ds-layout-column-amount: 20;
    }

    :host([configuration='1-col-even-overflow']) .layout__base,
    :host([configuration='1-col-even-full-overflow']) .layout__base {
      --ds-layout-column-amount: 24;
    }

    :host([configuration='2-col-boxed-overflow']) .layout__base {
      --ds-layout-column-amount: 10;
    }

    :host([configuration='2-col-even-overflow']) .layout__base {
      --ds-layout-column-amount: 12;
    }

    :host([configuration='3-col-even-overflow']) .layout__base {
      --ds-layout-column-amount: 8;
    }

    :host([configuration='4-col-even-overflow']) .layout__base {
      --ds-layout-column-amount: 6;
    }

    :host([configuration='multi-card-overflow']) .layout__base {
      --ds-layout-column-amount: calc(var(--ds-grid-column-total) / 5);
    }

    :host([density='comfortable']) .layout__base {
      --ds-layout-column-gap: var(--ds-spacing-2xl);
      --ds-layout-columns-in-row: calc(
        var(--ds-grid-column-total) / var(--ds-layout-column-amount) - 1
      );
      --ds-grid-available-width: calc(
        100% - var(--ds-grid-column-gap-total) -
          (var(--ds-layout-column-gap) * (var(--ds-layout-columns-in-row))) +
          (var(--ds-grid-column-gap) * (var(--ds-layout-columns-in-row)))
      );
    }

    :host([density='comfortable'][configuration='2-col-even']) .layout__base,
    :host([density='comfortable'][configuration='2-col-offset-right']) .layout__base,
    :host([density='comfortable'][configuration='2-col-offset-left']) .layout__base,
    :host([density='comfortable'][configuration='2-col-sidebar']) .layout__base {
      --ds-layout-columns-in-row: calc(
        var(--ds-grid-column-total) / var(--ds-layout-column-amount)
      );
    }

    :host([density='relaxed']) .layout__base {
      --ds-layout-column-gap: var(--ds-breadth-vertical-default, var(--ds-spacing-4xl));
      --ds-layout-columns-in-row: calc(
        var(--ds-grid-column-total) / var(--ds-layout-column-amount) - 1
      );
      --ds-grid-available-width: calc(
        100% - var(--ds-grid-column-gap-total) -
          (var(--ds-layout-column-gap) * (var(--ds-layout-columns-in-row))) +
          (var(--ds-grid-column-gap) * (var(--ds-layout-columns-in-row)))
      );
    }

    :host([density='relaxed'][configuration='2-col-even']) .layout__base,
    :host([density='relaxed'][configuration='2-col-offset-right']) .layout__base,
    :host([density='relaxed'][configuration='2-col-offset-left']) .layout__base,
    :host([density='relaxed'][configuration='2-col-sidebar']) .layout__base {
      --ds-layout-columns-in-row: calc(
        var(--ds-grid-column-total) / var(--ds-layout-column-amount)
      );
    }
  }

  /* VP6 (XXL): 1600px+ — 3+ cards, aligned with 1328px content container */
  @media (min-width: 1600px) {
    :host([configuration='left-aligned-overflow']) .layout__base {
      --ds-layout-column-amount: calc(var(--ds-grid-column-total) / 3.5);
      --ds-layout-column-gap: 1.5rem;
      --ds-carousel-layout-column-gap: 1.5rem;
      column-gap: 1.5rem;
    }
  }
`;var T=Object.defineProperty,A=Object.getOwnPropertyDescriptor,F=(o,t,l,a)=>{for(var s,u=a>1?void 0:a?A(t,l):t,n=o.length-1;n>=0;n--)(s=o[n])&&(u=(a?s(t,l,u):s(u))||u);return a&&u&&T(t,l,u),u};const G="store-layout";let N=class extends r{constructor(){super(...arguments),this.configuration=d.col1even,this._firstSlotEmpty=!0,this._lastSlotEmpty=!0}_renderOptionalSlot(o,t){return u`
      <div part=${o} class=${o} style="${t?"display: none;":""}">
        <slot name=${o} @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `}_handleSlotChange(){this._firstSlotEmpty=0===this._firstSlot.length,this._lastSlotEmpty=0===this._lastSlot.length}_onScroll(){(this.configuration.includes("overflow")||this.configuration.includes("responsive"))&&this.dispatchEvent(new CustomEvent(y,{bubbles:!0,composed:!0}))}firstUpdated(){this.dispatchEvent(new CustomEvent(f,{bubbles:!0,composed:!0}))}render(){return u`
      ${this._renderOptionalSlot("layout__first",this._firstSlotEmpty)}
      <div
        class="layout__base"
        part="layout__base"
        tabindex="${n(this.overflowTabIndex)}"
        @scroll="${this._onScroll}"
      >
        <slot></slot>
      </div>
      ${this._renderOptionalSlot("layout__first",this._lastSlotEmpty)}
    `}};N.styles=[D,I],F([l({reflect:!0})],N.prototype,"configuration",2),F([l({reflect:!0})],N.prototype,"density",2),F([l({type:Number,reflect:!0,attribute:"overflow-tab-index"})],N.prototype,"overflowTabIndex",2),F([a({slot:"layout__first"})],N.prototype,"_firstSlot",2),F([a({slot:"layout__last"})],N.prototype,"_lastSlot",2),F([s()],N.prototype,"_firstSlotEmpty",2),F([s()],N.prototype,"_lastSlotEmpty",2),N=F([e(G)],N);export{N as L,d as a,m as b,G as n};
