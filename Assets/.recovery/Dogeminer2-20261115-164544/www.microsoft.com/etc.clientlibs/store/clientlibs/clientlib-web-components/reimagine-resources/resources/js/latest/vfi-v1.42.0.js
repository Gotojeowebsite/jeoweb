import{i as e}from"./tag.const-v1.42.0.js";const o=e`var(--ds-vfi-outline-width, 0.1875rem)`,s=e`var(--ds-vfi-outline-style, dotted)`,t=e`var(--ds-vfi-outline-offset, 0.25rem)`,i=e`calc(calc(${o} + 0.1875rem) * -1)`,l=e`calc(calc(${o}) * -1)`,r=e`0.1875rem`,c=o=>e`
  /* https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible#selectively_showing_the_focus_indicator */

  /* Provide basic, default focus styles. */
  &:focus {
    ${o}
  }

  /* Remove default focus styles for mouse users ONLY if :focus-visible is supported. */
  &:focus:not(:focus-visible) {
    outline: 0;
  }

  /* If :focus-visible is supported, provide enhanced focus styles for keyboard focus. */
  &:focus-visible {
    ${o}
  }
`,a=e`var(--ds-vfi-text-color, currentcolor) ${s} ${o}`,f=e`
  outline: ${a};
`,d=e`
  outline: ${a} !important;
`,u=e`
  ${f}
  outline-offset: ${i};
`,n=e`
  ${f}
  outline-offset: ${t};
`,v=()=>e`
  ${c(f)}
`,p=()=>e`
  ${c(u)}
`,$=e`
  text-decoration: underline;
  text-decoration-thickness: 3px;
  text-underline-offset: 3px;
  text-decoration-color: Highlight;
`,h=e`
  border-color: CanvasText;
  border-style: solid;
  --ds-vfi-text-color: Highlight !important;
  --ds-vfi-outline-width: 5px;
`;export{r as a,i as b,f as c,a as d,l as e,d as f,u as g,n as h,$ as i,h as j,v as k,p as v};
