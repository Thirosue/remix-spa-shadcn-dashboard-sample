import{j as t,R as u,r as s}from"./jsx-runtime-BoP3Okkf.js";import{C as h}from"./input-ClZrOYka.js";import{c as l}from"./index-DSLhBl-f.js";import{q as d}from"./components-BEEcOc_s.js";import{_ as $}from"./button-CGLTyWrZ.js";import{$ as v}from"./index-UeDuXGR9.js";function z({items:e}){return t.jsxs("div",{className:"mb-4 flex items-center space-x-1 text-sm text-muted-foreground",children:[t.jsx(d,{to:"/dashboard/home",className:"overflow-hidden text-ellipsis whitespace-nowrap",children:"Dashboard"}),e==null?void 0:e.map((r,a)=>t.jsxs(u.Fragment,{children:[t.jsx(h,{className:"h-4 w-4"}),t.jsx(d,{to:r.link,className:l("font-medium",a===e.length-1?"pointer-events-none text-foreground":"text-muted-foreground"),children:r.title})]},r.title))]})}const k=({title:e,description:r})=>t.jsxs("div",{children:[t.jsx("h2",{className:"text-3xl font-bold tracking-tight",children:e}),t.jsx("p",{className:"text-sm text-muted-foreground",children:r})]}),c="horizontal",g=["horizontal","vertical"],f=s.forwardRef((e,r)=>{const{decorative:a,orientation:o=c,...n}=e,i=p(o)?o:c,x=a?{role:"none"}:{"aria-orientation":i==="vertical"?i:void 0,role:"separator"};return s.createElement(v.div,$({"data-orientation":i},x,n,{ref:r}))});f.propTypes={orientation(e,r,a){const o=e[r],n=String(o);return o&&!p(o)?new Error(N(n,a)):null}};function N(e,r){return`Invalid prop \`orientation\` of value \`${e}\` supplied to \`${r}\`, expected one of:
  - horizontal
  - vertical

Defaulting to \`${c}\`.`}function p(e){return g.includes(e)}const m=f,j=s.forwardRef(({className:e,orientation:r="horizontal",decorative:a=!0,...o},n)=>t.jsx(m,{ref:n,decorative:a,orientation:r,className:l("shrink-0 bg-border",r==="horizontal"?"h-[1px] w-full":"h-full w-[1px]",e),...o}));j.displayName=m.displayName;export{z as B,k as H,j as S};