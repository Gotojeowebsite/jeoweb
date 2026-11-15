import{i as t}from"./tag.const-v1.42.0.js";const i=t`
  /**
 * Remove the default button styles
 */
  border-radius: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  display: inline-flex;
  align-items: center;
  border: 0 solid transparent;
  cursor: pointer;
`;function n(t){if(t.length>0){const i=t.map(t=>t.getBoundingClientRect().top),n=Math.max(...i);t.forEach((t,e)=>{const a=n-i[e];if(a>0){const i=parseFloat(t.dataset.originalMargin||window.getComputedStyle(t).marginTop)||0;t.dataset.originalMargin||(t.dataset.originalMargin=i.toString()),t.style.marginTop=`${i+a}px`}})}}export{n as a,i as b};
