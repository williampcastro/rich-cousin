var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function r(t){t.forEach(e)}function o(t){return"function"==typeof t}function l(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,e){t.appendChild(e)}function s(t,e,n){t.insertBefore(e,n||null)}function i(t){t.parentNode.removeChild(t)}function a(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function u(t){return document.createElement(t)}function f(t){return document.createTextNode(t)}function d(){return f(" ")}function g(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function m(t,e,n,r){t.style.setProperty(e,n,r?"important":"")}let h;function p(t){h=t}const $=[],x=[],v=[],w=[],b=Promise.resolve();let y=!1;function _(t){v.push(t)}let k=!1;const j=new Set;function A(){if(!k){k=!0;do{for(let t=0;t<$.length;t+=1){const e=$[t];p(e),E(e.$$)}for($.length=0;x.length;)x.pop()();for(let t=0;t<v.length;t+=1){const e=v[t];j.has(e)||(j.add(e),e())}v.length=0}while($.length);for(;w.length;)w.pop()();y=!1,k=!1,j.clear()}}function E(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(_)}}const I=new Set;let R;function M(t,e){t&&t.i&&(I.delete(t),t.i(e))}function T(t,e,n,r){if(t&&t.o){if(I.has(t))return;I.add(t),R.c.push(()=>{I.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}}function C(t){t&&t.c()}function H(t,n,l){const{fragment:c,on_mount:s,on_destroy:i,after_update:a}=t.$$;c&&c.m(n,l),_(()=>{const n=s.map(e).filter(o);i?i.push(...n):r(n),t.$$.on_mount=[]}),a.forEach(_)}function L(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function P(t,e){-1===t.$$.dirty[0]&&($.push(t),y||(y=!0,b.then(A)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function V(e,o,l,c,s,a,u=[-1]){const f=h;p(e);const d=o.props||{},g=e.$$={fragment:null,ctx:null,props:a,update:t,not_equal:s,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(f?f.$$.context:[]),callbacks:n(),dirty:u};let m=!1;if(g.ctx=l?l(e,d,(t,n,...r)=>{const o=r.length?r[0]:n;return g.ctx&&s(g.ctx[t],g.ctx[t]=o)&&(g.bound[t]&&g.bound[t](o),m&&P(e,t)),n}):[],g.update(),m=!0,r(g.before_update),g.fragment=!!c&&c(g.ctx),o.target){if(o.hydrate){const t=($=o.target,Array.from($.childNodes));g.fragment&&g.fragment.l(t),t.forEach(i)}else g.fragment&&g.fragment.c();o.intro&&M(e.$$.fragment),H(e,o.target,o.anchor),A()}var $;p(f)}class B{$destroy(){L(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}function N(e){let n;return{c(){(n=u("header")).innerHTML='<div class="flex flex-row items-baseline font-Righteous text-rc-v2-orange"><div class="text-5xl md:text-10xl uppercase">21 days</div> \n        <div class="text-sm md:text-3xl lowercase">challange</div></div>',g(n,"class"," -m-2 flex justify-center items-center w-screen h-header md:h-2header bg-rc-v2-blue-dark shadow-bottom")},m(t,e){s(t,n,e)},p:t,i:t,o:t,d(t){t&&i(n)}}}class z extends B{constructor(t){super(),V(this,t,null,N,l,{})}}function D(t,e,n){const r=t.slice();return r[1]=e[n],r}function O(e){let n,r,o;return{c(){n=u("div"),r=u("div"),o=d(),g(r,"class","hover:shadow-2xl h-full"),m(r,"background-image","url("+q+e[1]+W+")"),m(r,"background-size","cover"),g(n,"class","m-4 justify-self-center shadow-bottom h-026 w-018")},m(t,e){s(t,n,e),c(n,r),c(n,o)},p:t,d(t){t&&i(n)}}}function S(e){let n,r=e[0],o=[];for(let t=0;t<r.length;t+=1)o[t]=O(D(e,r,t));return{c(){n=u("div");for(let t=0;t<o.length;t+=1)o[t].c();g(n,"class","grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 md:p-8")},m(t,e){s(t,n,e);for(let t=0;t<o.length;t+=1)o[t].m(n,null)},p(t,[e]){if(1&e){let l;for(r=t[0],l=0;l<r.length;l+=1){const c=D(t,r,l);o[l]?o[l].p(c,e):(o[l]=O(c),o[l].c(),o[l].m(n,null))}for(;l<o.length;l+=1)o[l].d(1);o.length=r.length}},i:t,o:t,d(t){t&&i(n),a(o,t)}}}let q="./images/images_challenge_VI/",W=".jpg";function F(t){return[[...Array(21).keys()]]}class G extends B{constructor(t){super(),V(this,t,F,S,l,{})}}function J(t,e,n){const r=t.slice();return r[1]=e[n],r}function K(e){let n,r,o;return{c(){n=u("div"),r=u("div"),o=d(),g(r,"class","hover:shadow-2xl h-full"),m(r,"background-image","url("+U+e[1]+X+")"),m(r,"background-size","cover"),g(n,"class","m-4 justify-self-center shadow-bottom h-026 w-018")},m(t,e){s(t,n,e),c(n,r),c(n,o)},p:t,d(t){t&&i(n)}}}function Q(e){let n,r=e[0],o=[];for(let t=0;t<r.length;t+=1)o[t]=K(J(e,r,t));return{c(){n=u("div");for(let t=0;t<o.length;t+=1)o[t].c();g(n,"class","grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 md:p-8")},m(t,e){s(t,n,e);for(let t=0;t<o.length;t+=1)o[t].m(n,null)},p(t,[e]){if(1&e){let l;for(r=t[0],l=0;l<r.length;l+=1){const c=J(t,r,l);o[l]?o[l].p(c,e):(o[l]=K(c),o[l].c(),o[l].m(n,null))}for(;l<o.length;l+=1)o[l].d(1);o.length=r.length}},i:t,o:t,d(t){t&&i(n),a(o,t)}}}let U="./images/images_challenge_VII/",X=".jpeg";function Y(t){return[[...Array(24).keys()]]}class Z extends B{constructor(t){super(),V(this,t,Y,Q,l,{})}}var tt="2.0.0";const et=[{name:"Dudu",linkedin:"https://www.linkedin.com/in/eduardo-rotundaro/",github:"https://github.com/EduardoRotundaro"},{name:"Will",linkedin:"https://www.linkedin.com/in/william-pinheiro-castro/",github:"https://github.com/williampcastro"}];function nt(e){let n,r,o,l,a,m,h,p,$,x,v,w,b,y,_,k,j,A=et[0].name+"",E=et[1].name+"";return{c(){n=u("footer"),r=u("div"),(o=u("div")).innerHTML='Powered By <a class="px-2" target="_blank" href="https://www.instagram.com/oprimo.rico/"> @Primo Rico </a>',l=d(),a=u("div"),m=f("Developed By\n            "),h=u("a"),p=f("@"),$=f(A),v=f("\n            And\n            "),w=u("a"),b=f("@"),y=f(E),k=f("\n            - v"),j=f(e[0]),g(h,"class","px-2"),g(h,"target","_blank"),g(h,"href",x=et[0].github),g(w,"class","px-2"),g(w,"target","_blank"),g(w,"href",_=et[1].github),g(r,"class","flex flex-col justify-center items-center"),g(n,"class","-m-2 inset-x-0 bottom-0 flex justify-center items-center h-12 bg-rc-v2-blue-dark font-Righteous  text-rc-v2-orange")},m(t,e){s(t,n,e),c(n,r),c(r,o),c(r,l),c(r,a),c(a,m),c(a,h),c(h,p),c(h,$),c(a,v),c(a,w),c(w,b),c(w,y),c(a,k),c(a,j)},p:t,i:t,o:t,d(t){t&&i(n)}}}function rt(t){return[tt]}class ot extends B{constructor(t){super(),V(this,t,rt,nt,l,{})}}function lt(e){let n,r,o,l,a,f,m,h,p;const $=new z({}),x=new G({}),v=new Z({}),w=new ot({});return{c(){C($.$$.fragment),n=d(),r=u("div"),(o=u("div")).innerHTML='<div class="text-2xl md:text-4xl uppercase">Challenge - VI</div>',l=d(),C(x.$$.fragment),a=d(),(f=u("div")).innerHTML='<div class="text-2xl md:text-4xl uppercase">Challenge - VII</div>',m=d(),C(v.$$.fragment),h=d(),C(w.$$.fragment),g(o,"class","flex flex-row items-center justify-center font-Righteous text-rc-v2-orange w-full mt-8"),g(f,"class","flex flex-row items-center justify-center font-Righteous text-rc-v2-orange w-full my-8"),g(r,"class","md:max-w-screen-lg max-w-screen-md contents")},m(t,e){H($,t,e),s(t,n,e),s(t,r,e),c(r,o),c(r,l),H(x,r,null),c(r,a),c(r,f),c(r,m),H(v,r,null),s(t,h,e),H(w,t,e),p=!0},p:t,i(t){p||(M($.$$.fragment,t),M(x.$$.fragment,t),M(v.$$.fragment,t),M(w.$$.fragment,t),p=!0)},o(t){T($.$$.fragment,t),T(x.$$.fragment,t),T(v.$$.fragment,t),T(w.$$.fragment,t),p=!1},d(t){L($,t),t&&i(n),t&&i(r),L(x),L(v),t&&i(h),L(w,t)}}}class ct extends B{constructor(t){super(),V(this,t,null,lt,l,{})}}function st(e){let n;const r=new ct({});return{c(){C(r.$$.fragment)},m(t,e){H(r,t,e),n=!0},p:t,i(t){n||(M(r.$$.fragment,t),n=!0)},o(t){T(r.$$.fragment,t),n=!1},d(t){L(r,t)}}}return new class extends B{constructor(t){super(),V(this,t,null,st,l,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
