import{r,i as e,n as d,b as t,d as o}from"../../tag.const-v1.42.0.js";import{S as i}from"../../secondary-nav-item.const-v1.42.0.js";const s="solid",a="1px",n="100vh",v=e`
  :host {
    border: 0;
    margin: 0;
    border-color: var(--ds-divider-border-color, ${r("var(--ds-theme-border-base-fade, #CBE6F4)")});
    border-style: var(--ds-divider-border-style, ${r(s)});
    border-top-width: var(--ds-divider-border-width, ${r(a)});
    display: block;
  }

  /* Configuration Styles - Size */
  :host([size='s']) {
    --ds-divider-border-color: var(--ds-theme-border-base-strong, #002948);
    --ds-divider-border-width: 2px;
  }

  :host([size='m']) {
    --ds-divider-border-color: var(--ds-theme-border-base-strong, #002948);
    --ds-divider-border-width: 4px;
  }

  /* Configuration Styles - Orientation */
  :host([orientation='vertical']) {
    border-top: none;
    border-inline-start-width: var(
      --ds-divider-border-width,
      ${r(a)}
    );
    height: var(--ds-divider-vh, ${r(n)});
    width: 0;
  }
`;var b=Object.defineProperty,h=Object.getOwnPropertyDescriptor,l=(r,e,d,t)=>{for(var o,i=t>1?void 0:t?h(e,d):e,s=r.length-1;s>=0;s--)(o=r[s])&&(i=(t?o(e,d,i):o(i))||i);return t&&i&&b(e,d,i),i};const p="store-divider";let c=class extends i{render(){return t``}};c.styles=[v],l([d({type:String,reflect:!0})],c.prototype,"orientation",2),l([d({type:String,reflect:!0})],c.prototype,"size",2),c=l([o(p)],c);export{c as Divider,p as name};
