import{u as D,a as F,b as P,c as R,d as W,r as _,e as a,o as q,f as z,w as n,g as y,h as o,i as e,j as f,V as k,k as c,t as A,p as M,l as T}from"./index-08ec7c8f.js";import{_ as G}from"./_plugin-vue_export-helper-c27b6911.js";const g=d=>(M("data-v-c57e08df"),d=d(),T(),d),H=g(()=>c("div",{class:"mb-1 text-body-2 text-medium-emphasis font-weight-bold"},"Email or Username",-1)),J=g(()=>c("div",{class:"mb-1 text-body-2 text-medium-emphasis font-weight-bold"},"Password",-1)),K=g(()=>c("p",{class:"text-info text-subtitle-1 font-weight-bold pb-2"},"Notification",-1)),O={class:"text-caption"},Q={class:"text-blue text-decoration-none",href:"#",rel:"noopener noreferrer",target:"_blank"},X={__name:"LoginView",setup(d){const{name:x}=D(),v=F(),V=P(),S=R(),C=W(),w=_(360);x.value!=="xs"&&(w.value=460);const I=()=>{const m=y({username:"admin",password:"admin"}),t=_(!1),p=_('Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.'),i=y({password:!1,alert:!0,snackbar:!1,timeout:_(3e3)});return{form:m,message:p,loading:t,visible:i,login:async()=>{if(t.value=!0,await v.userLogin(m.username,m.password),v.userinfo.id){const r=C.query.redirect;S.push({path:r||"/"}),x.value!=="xs"&&(V.settings.showLayoutMsg=!0)}else p.value=v.message,i.alert=!0,i.snackbar=!0,console.log(k);t.value=!1}}},{form:u,message:b,loading:L,visible:s,login:$}=I();return(m,t)=>{const p=a("v-img"),i=a("v-text-field"),h=a("v-alert"),r=a("v-btn"),N=a("v-icon"),U=a("v-card-text"),B=a("v-card"),E=a("v-form"),j=a("v-container");return q(),z(j,{class:"fill-height container"},{default:n(()=>[o(E,{class:"mx-auto"},{default:n(()=>[o(B,{class:"mx-auto pa-12 pb-8",elevation:"8",width:w.value},{default:n(()=>[o(p,{class:"mx-auto my-6","max-width":"228",src:"https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"}),H,o(i,{density:"compact",placeholder:"Email address","prepend-inner-icon":"mdi-email-outline",variant:"outlined",modelValue:e(u).username,"onUpdate:modelValue":t[0]||(t[0]=l=>e(u).username=l)},null,8,["modelValue"]),J,o(i,{"append-inner-icon":e(s).password?"mdi-eye-off":"mdi-eye",type:e(s).password?"text":"password",density:"compact","single-line":"",flat:"",placeholder:"Enter your password","prepend-inner-icon":"mdi-lock-outline",variant:"outlined","onClick:appendInner":t[1]||(t[1]=l=>e(s).password=!e(s).password),modelValue:e(u).password,"onUpdate:modelValue":t[2]||(t[2]=l=>e(u).password=l)},null,8,["append-inner-icon","type","modelValue"]),o(h,{class:"text-medium-emphasis text-caption mb-8","model-value":e(s).alert,text:e(b),density:"compact",closable:"","onClick:close":t[3]||(t[3]=l=>e(s).alert=!1)},null,8,["model-value","text"]),o(r,{block:"",class:"mb-2 font-weight-bold",color:"blue",variant:"tonal",onClick:e($),loading:e(L)},{default:n(()=>[f(" Log In ")]),_:1},8,["onClick","loading"]),o(r,{class:"text-blue text-caption",size:"small",variant:"text"},{default:n(()=>[f("Forgot your password?")]),_:1}),o(e(k),{modelValue:e(s).snackbar,"onUpdate:modelValue":t[5]||(t[5]=l=>e(s).snackbar=l),timeout:e(s).timeout,location:"top",vertical:""},{actions:n(()=>[o(r,{class:"font-weight-bold",color:"red",variant:"text",onClick:t[4]||(t[4]=l=>e(s).snackbar=!1)},{default:n(()=>[f(" Close ")]),_:1})]),default:n(()=>[K,c("p",O,A(e(b)),1)]),_:1},8,["modelValue","timeout"]),o(U,{class:"text-center"},{default:n(()=>[c("a",Q,[f(" Sign up now "),o(N,{icon:"mdi-chevron-right"})])]),_:1})]),_:1},8,["width"])]),_:1})]),_:1})}}},ee=G(X,[["__scopeId","data-v-c57e08df"]]);export{ee as default};