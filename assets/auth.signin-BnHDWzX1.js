import{r as l,j as e}from"./jsx-runtime-BoP3Okkf.js";import{C as b,a as S,b as y,d as v,e as N}from"./card-B-ZFW_dU.js";import{S as I}from"./shell-CcRgEtuu.js";import{u as k,b as C,F,d,e as m,f as p,g as u,h,t as E,i as P}from"./auth-Djbxpo_t.js";import{B as x}from"./button-CGLTyWrZ.js";import{I as D}from"./icons-j5Z6QLy3.js";import{I as g,E as T,c as R}from"./input-ClZrOYka.js";import{c as $}from"./index-DSLhBl-f.js";import{p as z,l as U}from"./logger-B_ZFLNfA.js";import{u as M}from"./use-toast-dkzHwJmT.js";import{u as B}from"./session-provider-Coaomt64.js";import{c as H}from"./index-DCc76cjq.js";import{q as f}from"./components-BEEcOc_s.js";import"./QueryClientProvider-BOd6oaUp.js";import"./x-tycdnnMh.js";import"./trash-C6rcx_Kb.js";import"./index-UeDuXGR9.js";import"./router-miLWBQYb.js";const j=l.forwardRef(({className:a,...s},n)=>{const[r,o]=l.useState(!1);return e.jsxs("div",{className:"relative",children:[e.jsx(g,{type:r?"text":"password",className:$("pr-10",a),ref:n,autoComplete:"current-password",...s}),e.jsxs(x,{type:"button",variant:"ghost",size:"sm",className:"absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent",onClick:()=>o(i=>!i),disabled:s.value===""||s.disabled,children:[r?e.jsx(T,{className:"size-4","aria-hidden":"true"}):e.jsx(R,{className:"size-4","aria-hidden":"true"}),e.jsx("span",{className:"sr-only",children:r?"Hide password":"Show password"})]})]})});j.displayName="PasswordInput";class c extends Error{}c.prototype.name="InvalidTokenError";function J(a){return decodeURIComponent(atob(a).replace(/(.)/g,(s,n)=>{let r=n.charCodeAt(0).toString(16).toUpperCase();return r.length<2&&(r="0"+r),"%"+r}))}function L(a){let s=a.replace(/-/g,"+").replace(/_/g,"/");switch(s.length%4){case 0:break;case 2:s+="==";break;case 3:s+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return J(s)}catch{return atob(s)}}function O(a,s){if(typeof a!="string")throw new c("Invalid token specified: must be a string");s||(s={});const n=s.header===!0?0:1,r=a.split(".")[n];if(typeof r!="string")throw new c(`Invalid token specified: missing part #${n+1}`);let o;try{o=L(r)}catch(i){throw new c(`Invalid token specified: invalid base64 for part #${n+1} (${i.message})`)}try{return JSON.parse(o)}catch(i){throw new c(`Invalid token specified: invalid json for part #${n+1} (${i.message})`)}}function q(){const a=H(),{toast:s}=M(),{updateSession:n}=B(),r=k({resolver:E(P),defaultValues:{id:"",password:""}}),o=C({mutationFn:t=>z("/api/auth",t),onSuccess:t=>{const w=O(t.token);n({name:"John Doe",email:w.payload.user,image:"https://avatars.githubusercontent.com/u/14899056?v=4",token:t.token,refreshToken:t.refreshToken}),a("/dashboard/home"),s({description:"Sign in successful! 🎉"})}});async function i(t){U({message:"Sign in form submitted",object:t}),o.mutate(t)}return e.jsx(F,{...r,children:e.jsxs("form",{className:"grid gap-4",onSubmit:r.handleSubmit(i),children:[e.jsx(d,{control:r.control,name:"id",render:({field:t})=>e.jsxs(m,{children:[e.jsx(p,{children:"Email"}),e.jsx(u,{children:e.jsx(g,{type:"text",placeholder:"rodneymullen180@gmail.com",autoComplete:"username",...t})}),e.jsx(h,{})]})}),e.jsx(d,{control:r.control,name:"password",render:({field:t})=>e.jsxs(m,{children:[e.jsx(p,{children:"Password"}),e.jsx(u,{children:e.jsx(j,{placeholder:"**********",...t})}),e.jsx(h,{})]})}),e.jsxs(x,{type:"submit",disabled:o.isPending,children:[o.isPending&&e.jsx(D.spinner,{className:"mr-2 size-4 animate-spin","aria-hidden":"true"}),"Sign in",e.jsx("span",{className:"sr-only",children:"Sign in"})]})]})})}const ce=()=>[{title:"Sign In"},{name:"description",content:"Sign in to your account"}];function le(){return e.jsx(I,{className:"max-w-lg",children:e.jsxs(b,{children:[e.jsx(S,{className:"space-y-1",children:e.jsx(y,{className:"text-2xl",children:"Sign in"})}),e.jsx(v,{className:"grid gap-4",children:e.jsx(q,{})}),e.jsxs(N,{className:"flex flex-wrap items-center justify-between gap-2",children:[e.jsxs("div",{className:"text-sm text-muted-foreground",children:[e.jsx("span",{className:"mr-1 hidden sm:inline-block",children:"Don't have an account?"}),e.jsx(f,{"aria-label":"Sign up",to:"/auth/signup",className:"text-primary underline-offset-4 transition-colors hover:underline",children:"Sign up"})]}),e.jsx(f,{"aria-label":"Reset password",to:"/auth/signin/reset-password",className:"text-sm text-primary underline-offset-4 transition-colors hover:underline",children:"Reset password"})]})]})})}export{le as default,ce as meta};