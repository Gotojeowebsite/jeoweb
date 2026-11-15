import{r as t,i as o,n,b as e,d as s}from"../../tag.const-v1.42.0.js";import{v as r,b as i,S as a}from"../../secondary-nav-item.const-v1.42.0.js";const l="flex-start",u="column",d="var(--ds-spacing-xs, 0.5rem)",g="var(--ds-spacing-xs, 0.5rem)",p="initial",c="initial",m="center",h="wrap",f="initial",b=o`
  :host {
    display: var(--ds-button-group-display, ${t("flex")});
    row-gap: var(--ds-button-group-row-gap, ${t(d)});
    column-gap: var(--ds-button-group-column-gap, ${t(g)});
    flex-direction: var(
      --ds-button-group-flex-direction,
      ${t(u)}
    );
    width: var(--ds-button-group-width, ${t(c)});
    max-width: var(--ds-button-group-max-width, ${t(p)});
    margin-inline: var(--ds-button-group-margin-inline, initial);
    justify-content: var(
      --ds-button-group-justify-content,
      ${t(l)}
    );
    flex-wrap: var(--ds-button-group-flex-wrap, ${t(h)});
    align-items: var(--ds-button-group-align-items, ${t(f)});
  }

  :host ::slotted(store-button) {
    display: grid;
  }

  :host ::slotted(store-button[data-secondary]) {
    display: var(--ds-button-group-secondary-button-display, grid);
  }

  :host ::slotted(store-link) {
    display: var(--ds-button-group-link-display, inline-flex);
    justify-content: var(
      --ds-button-group-link-justify-content,
      ${t(m)}
    );
  }

  :host([with-link]) {
    --ds-button-group-row-gap: var(--ds-spacing-m, 1rem);
    --ds-button-group-column-gap: var(--ds-spacing-m, 1rem);
  }

  :host([alignment='left']) {
    --ds-button-group-justify-content: flex-start;
  }

  :host([alignment='center']) {
    --ds-button-group-justify-content: center;
  }

  :host([alignment='right']) {
    --ds-button-group-justify-content: flex-end;
  }

  :host([configuration='stacked']) {
    --ds-button-group-flex-direction: column;
    --ds-button-group-align-items: flex-start;
  }

  :host([configuration='stacked'][alignment='left']) {
    --ds-button-group-align-items: flex-start;
  }

  :host([configuration='stacked'][alignment='center']) {
    --ds-button-group-align-items: center;
  }

  :host([configuration='stacked'][alignment='right']) {
    --ds-button-group-align-items: flex-end;
  }
`,v=o`
  @media (min-width: ${t(r.sm)}) {
    :host {
      flex-direction: var(
        --ds-button-group-flex-direction,
        ${t("row")}
      );
    }
  }

  @media (max-width: ${t(i(r.sm))}) {
    :host {
      --ds-button-group-flex-direction: column;
    }

    :host ::slotted(store-button),
    :host ::slotted(store-link) {
      width: var(--ds-button-group-button-width, 100%);
    }

    :host([alignment='left']) ::slotted(store-link) {
      --ds-button-group-link-justify-content: flex-start;
    }

    :host([alignment='center']) {
      --ds-button-group-link-justify-content: center;
    }

    :host([alignment='right']) {
      --ds-button-group-link-justify-content: flex-end;
    }
  }
`;var y=Object.defineProperty,x=Object.getOwnPropertyDescriptor,w=(t,o,n,e)=>{for(var s,r=e>1?void 0:e?x(o,n):o,i=t.length-1;i>=0;i--)(s=t[i])&&(r=(e?s(o,n,r):s(r))||r);return e&&r&&y(o,n,r),r};const k="store-button-group";let j=class extends a{_handleSlotChange(){var t;const o=null==(t=this.shadowRoot)?void 0:t.querySelector("slot");((null==o?void 0:o.assignedElements({flatten:!0}))||[]).some(t=>"store-link"===t.tagName.toLowerCase())?this.setAttribute("with-link",""):this.removeAttribute("with-link")}render(){return e` <slot @slotchange=${this._handleSlotChange}></slot> `}};j.styles=[b,v],w([n({reflect:!0})],j.prototype,"configuration",2),w([n({reflect:!0})],j.prototype,"alignment",2),j=w([s(k)],j);export{j as ButtonGroup,k as name};
