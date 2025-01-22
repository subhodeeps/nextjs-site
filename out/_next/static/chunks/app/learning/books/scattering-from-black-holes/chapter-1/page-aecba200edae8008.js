(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[434],{9059:(e,t,r)=>{Promise.resolve().then(r.bind(r,7513))},7513:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>p});var s=r(5155),a=r(1030);function l(e){let t={h1:"h1",h2:"h2",h3:"h3",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{children:"Chapter 1"}),"\n",(0,s.jsx)(t.h2,{children:"Notes & Takeaways"}),"\n",(0,s.jsx)(t.h3,{children:"Other takeaways"})]})}function n(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}var o=r(8618),i=r(4885),d=r(6137),c=r(7786),m=r(5762),x=r(6885);function p(){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.A,{size:"md",paddingX:"md",paddingY:"lg",children:(0,s.jsxs)(d.xs,{gap:"md",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsx)(c.DynamicBreadcrumb,{items:[{href:"/",label:"Home",emoji:"\uD83D\uDC7E"},{href:"/learning",label:"Learning"},{href:"/learning/books",label:"STEM Books"},{href:"/learning/books/scattering-from-black-holes",label:"Scattering from Black Holes by Futterman"},{label:"Chapter 1"}]}),(0,s.jsx)(m.ThemeToggle,{})]}),(0,s.jsx)("div",{className:"prose dark:prose-invert max-w-none",children:(0,s.jsx)(n,{components:o.o})})]})}),(0,s.jsx)(x._,{parentPageName:"BH Scattering Book",showToTop:!1})]})}},6743:(e,t,r)=>{"use strict";r.d(t,{B8:()=>m,ck:()=>x});var s=r(5155),a=r(1277);r(6137);var l=r(7252);let n=r.n(l)().className,o={xs:"text-[10px] sm:text-xs md:text-xs",sm:"text-xs sm:text-sm md:text-sm",md:"text-sm sm:text-base md:text-base",base:"text-sm sm:text-base md:text-base",lg:"text-base sm:text-lg md:text-lg",xl:"text-lg sm:text-xl md:text-xl","2xl":"text-xl sm:text-2xl md:text-2xl"},i={tight:"space-y-0.5 sm:space-y-1",normal:"space-y-1 sm:space-y-2",relaxed:"space-y-2 sm:space-y-3"},d={disc:"list-disc",circle:"list-circle",square:"list-square",decimal:"list-decimal",none:"list-none"},c={sm:"pl-1 sm:pl-2",md:"pl-2 sm:pl-4",lg:"pl-4 sm:pl-6",xs:"pl-0.5 sm:pl-1",none:"pl-0"};function m(e){let{children:t,className:r,type:l="unordered",variant:m="default",marker:x="disc",spacing:p="normal",fontSize:u="sm",paddingLeft:h="md"}=e;return(0,s.jsx)("ordered"===l?"ol":"ul",{className:(0,a.cn)("ml-4 sm:ml-6",d[x],i[p],"compact"===m&&"text-sm",n,o[u],c[h],r),children:t})}function x(e){let{children:t,className:r}=e;return(0,s.jsx)("li",{className:(0,a.cn)("pl-1 sm:pl-2","marker:text-muted-foreground dark:marker:text-gray-400",n,r),children:t})}},9961:(e,t,r)=>{"use strict";r.d(t,{A:()=>c});var s=r(5155),a=r(1277);let l={thin:"border-[0.5px]",normal:"border-[1px]",slightlyThick:"border-[1.5px]",thick:"border-[2px]",heavy:"border-[4px]"},n={default:"border-border",muted:"border-muted",purple:"border-purple-300",gray:"border-gray-300",white:"border-white",colorless:"border-transparent"},o={none:"!mt-0",sm:"!mt-2 sm:!mt-2",md:"!mt-4 sm:!mt-4",lg:"!mt-8 sm:!mt-8"},i={none:"!mb-0",sm:"!mb-2 sm:!mb-2",md:"!mb-4 sm:!mb-4",lg:"!mb-8 sm:!mb-8"},d={none:"mx-0",sm:"mx-2",md:"mx-4",lg:"mx-8"};function c(e){let{className:t,orientation:r="horizontal",weight:c="normal",color:m="gray",marginTop:x="md",marginBottom:p="md",fullWidth:u=!0}=e,h="horizontal"===r;return(0,s.jsx)("div",{className:(0,a.cn)("border-0",h?"w-full border-t":"h-full border-l",l[c],n[m],h?[o[x],i[p]]:d[x],!u&&"w-1/2 mx-auto","transition-colors duration-200",t),role:"separator","aria-orientation":r})}},8618:(e,t,r)=>{"use strict";r.d(t,{o:()=>g});var s=r(5155),a=r(6479),l=r(817),n=r(6743),o=r(9961),i=r(1277),d=r(7252),c=r.n(d),m=r(5662),x=r(7113),p=r(2115);let u=e=>{let{code:t,language:r}=e,[a,l]=(0,p.useState)(!1),{theme:n}=(0,x.D)(),o="dark"===n||!n&&window.matchMedia("(prefers-color-scheme: dark)").matches,d=async()=>{await navigator.clipboard.writeText(t),l(!0),setTimeout(()=>l(!1),2e3)};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("button",{onClick:d,className:(0,i.cn)("absolute top-3 right-3","p-1.5 rounded-md","transition-all duration-300 ease-in-out","hover:bg-purple-500/10","z-10",a?o?"text-purple-400":"text-[#8839ef]":"text-gray-400 hover:text-purple-400"),"aria-label":"Copy code",children:(0,s.jsxs)("div",{className:"relative w-3.5 h-3.5 sm:w-4 sm:h-4",children:[(0,s.jsx)("div",{className:(0,i.cn)("absolute inset-0 transform transition-all duration-300",a?"opacity-0 rotate-45 scale-0":"opacity-100 rotate-0 scale-100"),children:(0,s.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,s.jsx)("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2",ry:"2"}),(0,s.jsx)("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"})]})}),(0,s.jsx)("div",{className:(0,i.cn)("absolute inset-0 transform transition-all duration-300",a?"opacity-100 rotate-0 scale-100":"opacity-0 -rotate-45 scale-0"),children:(0,s.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,s.jsx)("polyline",{points:"20 6 9 17 4 12"})})})]})}),(0,s.jsxs)("div",{className:"absolute top-3 right-3 flex items-center",children:[r&&(0,s.jsx)("div",{className:(0,i.cn)("px-2 py-1.5 rounded-md mr-8","text-[10px] sm:text-xs font-medium uppercase tracking-wider","transition-all duration-300",a?"opacity-0 translate-x-4":"opacity-100 translate-x-0",o?"text-gray-400":"text-gray-500"),children:r}),(0,s.jsx)("div",{className:(0,i.cn)("absolute right-8","text-[10px] sm:text-xs","transition-all duration-300","pointer-events-none",o?"text-purple-400":"text-[#8839ef]",a?"opacity-100 translate-x-0":"opacity-0 translate-x-4"),children:"COPIED!"})]})]})},h=e=>({plain:{backgroundColor:"transparent",color:e?"#cdd6f4":"#4c4f69"},styles:[{types:["keyword","builtin"],style:{color:e?"#cba6f7":"#8839ef"}},{types:["comment"],style:{color:e?"#6c7086":"#8c8fa1",fontStyle:"italic"}},{types:["class-name","function"],style:{color:e?"#89b4fa":"#1e66f5"}},{types:["string","attr-value"],style:{color:e?"#a6e3a1":"#40a02b"}},{types:["punctuation","operator"],style:{color:e?"#89dceb":"#04a5e5"}},{types:["number","constant"],style:{color:e?"#fab387":"#fe640b"}},{types:["variable"],style:{color:e?"#f5c2e7":"#ea76cb"}}]});function b(e){let{code:t,language:r,className:a}=e,{theme:l}=(0,x.D)(),n="dark"===l||!l&&window.matchMedia("(prefers-color-scheme: dark)").matches;return(0,s.jsxs)("div",{className:(0,i.cn)("relative my-4","rounded-lg overflow-hidden","border w-full",n?"bg-[#1e1e2e] border-[#313244]":"bg-[#f8f9fc] border-[#e6e9ef]",a),children:[(0,s.jsx)(m.f4,{theme:h(n),code:t,language:r,children:e=>{let{className:t,style:r,tokens:a,getLineProps:l,getTokenProps:o}=e;return(0,s.jsx)("pre",{className:(0,i.cn)(t,c().className,"overflow-x-auto whitespace-pre-wrap break-words","transition-colors duration-200","p-4","text-[13px] sm:text-sm",n?"bg-[#1e1e2e]":"bg-[#f8f9fc]"),style:r,children:a.slice(0,-1).map((e,t)=>(0,s.jsx)("div",{...l({line:e,className:"leading-6 sm:leading-7"}),children:e.map((e,t)=>(0,s.jsx)("span",{...o({token:e})},t))},t))})}}),(0,s.jsx)(u,{code:t,language:r})]})}let g={h1:e=>{let{children:t}=e;return(0,s.jsx)(a.A,{as:"h1",weight:"bold",className:"mt-8 mb-4",children:t})},h2:e=>{let{children:t}=e;return(0,s.jsx)(a.A,{as:"h2",weight:"bold",className:"mt-6 mb-3",children:t})},h3:e=>{let{children:t}=e;return(0,s.jsx)(a.A,{as:"h3",weight:"medium",className:"mt-4 mb-2",children:t})},h4:e=>{let{children:t}=e;return(0,s.jsx)(a.A,{as:"h4",weight:"medium",className:"mt-3 mb-2",children:t})},p:e=>{let{children:t}=e;return(0,s.jsx)(l.A,{className:"mb-4 text-foreground dark:text-foreground",children:t})},ul:e=>{let{children:t}=e;return(0,s.jsx)(n.B8,{className:"mb-4",children:t})},ol:e=>{let{children:t}=e;return(0,s.jsx)(n.B8,{type:"ordered",className:"mb-4",children:t})},li:e=>{let{children:t}=e;return(0,s.jsx)(n.ck,{children:t})},strong:e=>{let{children:t}=e;return(0,s.jsx)("span",{className:"font-bold text-foreground dark:text-foreground",children:t})},em:e=>{let{children:t}=e;return(0,s.jsx)("span",{className:"italic text-muted-foreground dark:text-muted-foreground",children:t})},code:e=>{let{children:t,className:r}=e,a=/language-(\w+)/.exec(r||""),l=a?a[1]:"";return l?(0,s.jsx)(b,{code:t,language:l}):(0,s.jsx)("code",{className:(0,i.cn)(c().className,"px-1.5 py-0.5 mx-0.5 my-0.5","text-inherit","bg-purple-100/80 dark:bg-purple-900/50","text-purple-800 dark:text-purple-200","rounded-md","inline-block leading-normal"),children:t})},blockquote:e=>{let{children:t}=e;return(0,s.jsx)("blockquote",{className:(0,i.cn)("pl-4 border-l-2 border-purple-500/50","my-4 italic","text-muted-foreground/90 dark:text-muted-foreground/90"),children:t})},hr:()=>(0,s.jsx)(o.A,{color:"gray",marginTop:"md",marginBottom:"md"}),a:e=>{let{href:t,children:r}=e;return(0,s.jsx)("a",{href:t,className:(0,i.cn)("text-purple-600 dark:text-purple-300","hover:text-purple-700 dark:hover:text-purple-200","transition-colors duration-200","underline underline-offset-4","decoration-purple-300/50 dark:decoration-purple-500/50","hover:decoration-purple-400 dark:hover:decoration-purple-400"),target:(null==t?void 0:t.startsWith("http"))?"_blank":void 0,rel:(null==t?void 0:t.startsWith("http"))?"noopener noreferrer":void 0,children:r})}}}},e=>{var t=t=>e(e.s=t);e.O(0,[984,362,532,635,375,441,517,358],()=>t(9059)),_N_E=e.O()}]);