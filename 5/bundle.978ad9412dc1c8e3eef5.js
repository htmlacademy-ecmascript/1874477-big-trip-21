!function(){var t={10:function(t,e,n){"use strict";var i=n(537),s=n.n(i),r=n(645),o=n.n(r)()(s());o.push([t.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]),e.Z=o},645:function(t){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",i=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),i&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),i&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,i,s,r){"string"==typeof t&&(t=[[null,t,void 0]]);var o={};if(i)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(o[l]=!0)}for(var c=0;c<t.length;c++){var u=[].concat(t[c]);i&&o[u[0]]||(void 0!==r&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=r),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),s&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=s):u[4]="".concat(s)),e.push(u))}},e}},537:function(t){"use strict";t.exports=function(t){var e=t[1],n=t[3];if(!n)return e;if("function"==typeof btoa){var i=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),r="/*# ".concat(s," */");return[e].concat([r]).join("\n")}return[e].join("\n")}},484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",o="day",a="week",l="month",c="quarter",u="year",d="date",p="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},_={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,l),r=n-s<0,o=e.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-o:o-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:u,w:a,d:o,D:d,h:r,m:s,s:i,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",b={};b[y]=v;var $=function(t){return t instanceof w},g=function t(e,n,i){var s;if(!e)return y;if("string"==typeof e){var r=e.toLowerCase();b[r]&&(s=r),n&&(b[r]=n,s=r);var o=e.split("-");if(!s&&o.length>1)return t(o[0])}else{var a=e.name;b[a]=e,s=a}return!i&&s&&(y=s),s||!i&&y},M=function(t,e){if($(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new w(n)},D=_;D.l=g,D.i=$,D.w=function(t,e){return M(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var w=function(){function v(t){this.$L=g(t.locale,null,!0),this.parse(t)}var m=v.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(D.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(f);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return D},m.isValid=function(){return!(this.$d.toString()===p)},m.isSame=function(t,e){var n=M(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return M(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<M(t)},m.$g=function(t,e,n){return D.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,c=!!D.u(e)||e,p=D.p(t),f=function(t,e){var i=D.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?i:i.endOf(o)},h=function(t,e){return D.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,m=this.$M,_=this.$D,y="set"+(this.$u?"UTC":"");switch(p){case u:return c?f(1,0):f(31,11);case l:return c?f(1,m):f(0,m+1);case a:var b=this.$locale().weekStart||0,$=(v<b?v+7:v)-b;return f(c?_-$:_+(6-$),m);case o:case d:return h(y+"Hours",0);case r:return h(y+"Minutes",1);case s:return h(y+"Seconds",2);case i:return h(y+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var a,c=D.p(t),p="set"+(this.$u?"UTC":""),f=(a={},a[o]=p+"Date",a[d]=p+"Date",a[l]=p+"Month",a[u]=p+"FullYear",a[r]=p+"Hours",a[s]=p+"Minutes",a[i]=p+"Seconds",a[n]=p+"Milliseconds",a)[c],h=c===o?this.$D+(e-this.$W):e;if(c===l||c===u){var v=this.clone().set(d,1);v.$d[f](h),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else f&&this.$d[f](h);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[D.p(t)]()},m.add=function(n,c){var d,p=this;n=Number(n);var f=D.p(c),h=function(t){var e=M(p);return D.w(e.date(e.date()+Math.round(t*n)),p)};if(f===l)return this.set(l,this.$M+n);if(f===u)return this.set(u,this.$y+n);if(f===o)return h(1);if(f===a)return h(7);var v=(d={},d[s]=t,d[r]=e,d[i]=1e3,d)[f]||1,m=this.$d.getTime()+n*v;return D.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=D.z(this),r=this.$H,o=this.$m,a=this.$M,l=n.weekdays,c=n.months,u=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},d=function(t){return D.s(r%12||12,t,"0")},f=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:D.s(a+1,2,"0"),MMM:u(n.monthsShort,a,c,3),MMMM:u(c,a),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:u(n.weekdaysMin,this.$W,l,2),ddd:u(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:D.s(r,2,"0"),h:d(1),hh:d(2),a:f(r,o,!0),A:f(r,o,!1),m:String(o),mm:D.s(o,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:s};return i.replace(h,(function(t,e){return e||v[t]||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,d,p){var f,h=D.p(d),v=M(n),m=(v.utcOffset()-this.utcOffset())*t,_=this-v,y=D.m(this,v);return y=(f={},f[u]=y/12,f[l]=y,f[c]=y/3,f[a]=(_-m)/6048e5,f[o]=(_-m)/864e5,f[r]=_/e,f[s]=_/t,f[i]=_/1e3,f)[h]||_,p?y:D.a(y)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return b[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=g(t,e,!0);return i&&(n.$L=i),n},m.clone=function(){return D.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),S=w.prototype;return M.prototype=S,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",o],["$M",l],["$y",u],["$D",d]].forEach((function(t){S[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),M.extend=function(t,e){return t.$i||(t(e,w,M),t.$i=!0),M},M.locale=g,M.isDayjs=$,M.unix=function(t){return M(1e3*t)},M.en=b[y],M.Ls=b,M.p={},M}()},646:function(t){t.exports=function(){"use strict";var t,e,n=1e3,i=6e4,s=36e5,r=864e5,o=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,a=31536e6,l=2592e6,c=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,u={years:a,months:l,days:r,hours:s,minutes:i,seconds:n,milliseconds:1,weeks:6048e5},d=function(t){return t instanceof y},p=function(t,e,n){return new y(t,n,e.$l)},f=function(t){return e.p(t)+"s"},h=function(t){return t<0},v=function(t){return h(t)?Math.ceil(t):Math.floor(t)},m=function(t){return Math.abs(t)},_=function(t,e){return t?h(t)?{negative:!0,format:""+m(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},y=function(){function h(t,e,n){var i=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return p(t*u[f(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(e){i.$d[f(e)]=t[e]})),this.calMilliseconds(),this;if("string"==typeof t){var s=t.match(c);if(s){var r=s.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var m=h.prototype;return m.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(e,n){return e+(t.$d[n]||0)*u[n]}),0)},m.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=v(t/a),t%=a,this.$d.months=v(t/l),t%=l,this.$d.days=v(t/r),t%=r,this.$d.hours=v(t/s),t%=s,this.$d.minutes=v(t/i),t%=i,this.$d.seconds=v(t/n),t%=n,this.$d.milliseconds=t},m.toISOString=function(){var t=_(this.$d.years,"Y"),e=_(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var i=_(n,"D"),s=_(this.$d.hours,"H"),r=_(this.$d.minutes,"M"),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3);var a=_(o,"S"),l=t.negative||e.negative||i.negative||s.negative||r.negative||a.negative,c=s.format||r.format||a.format?"T":"",u=(l?"-":"")+"P"+t.format+e.format+i.format+c+s.format+r.format+a.format;return"P"===u||"-P"===u?"P0D":u},m.toJSON=function(){return this.toISOString()},m.format=function(t){var n=t||"YYYY-MM-DDTHH:mm:ss",i={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return n.replace(o,(function(t,e){return e||String(i[t])}))},m.as=function(t){return this.$ms/u[f(t)]},m.get=function(t){var e=this.$ms,n=f(t);return"milliseconds"===n?e%=1e3:e="weeks"===n?v(e/u[n]):this.$d[n],0===e?0:e},m.add=function(t,e,n){var i;return i=e?t*u[f(e)]:d(t)?t.$ms:p(t,this).$ms,p(this.$ms+i*(n?-1:1),this)},m.subtract=function(t,e){return this.add(t,e,!0)},m.locale=function(t){var e=this.clone();return e.$l=t,e},m.clone=function(){return p(this.$ms,this)},m.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},m.milliseconds=function(){return this.get("milliseconds")},m.asMilliseconds=function(){return this.as("milliseconds")},m.seconds=function(){return this.get("seconds")},m.asSeconds=function(){return this.as("seconds")},m.minutes=function(){return this.get("minutes")},m.asMinutes=function(){return this.as("minutes")},m.hours=function(){return this.get("hours")},m.asHours=function(){return this.as("hours")},m.days=function(){return this.get("days")},m.asDays=function(){return this.as("days")},m.weeks=function(){return this.get("weeks")},m.asWeeks=function(){return this.as("weeks")},m.months=function(){return this.get("months")},m.asMonths=function(){return this.as("months")},m.years=function(){return this.get("years")},m.asYears=function(){return this.as("years")},h}();return function(n,i,s){t=s,e=s().$utils(),s.duration=function(t,e){var n=s.locale();return p(t,{$l:n},e)},s.isDuration=d;var r=i.prototype.add,o=i.prototype.subtract;i.prototype.add=function(t,e){return d(t)&&(t=t.asMilliseconds()),r.bind(this)(t,e)},i.prototype.subtract=function(t,e){return d(t)&&(t=t.asMilliseconds()),o.bind(this)(t,e)}}}()},379:function(t){"use strict";var e=[];function n(t){for(var n=-1,i=0;i<e.length;i++)if(e[i].identifier===t){n=i;break}return n}function i(t,i){for(var r={},o=[],a=0;a<t.length;a++){var l=t[a],c=i.base?l[0]+i.base:l[0],u=r[c]||0,d="".concat(c," ").concat(u);r[c]=u+1;var p=n(d),f={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==p)e[p].references++,e[p].updater(f);else{var h=s(f,i);i.byIndex=a,e.splice(a,0,{identifier:d,updater:h,references:1})}o.push(d)}return o}function s(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,s){var r=i(t=t||[],s=s||{});return function(t){t=t||[];for(var o=0;o<r.length;o++){var a=n(r[o]);e[a].references--}for(var l=i(t,s),c=0;c<r.length;c++){var u=n(r[c]);0===e[u].references&&(e[u].updater(),e.splice(u,1))}r=l}}},569:function(t){"use strict";var e={};t.exports=function(t,n){var i=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:function(t){"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:function(t,e,n){"use strict";t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:function(t){"use strict";t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,s&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(i,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:function(t){"use strict";t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={id:i,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.nc=void 0,function(){"use strict";function t(t,e,n="beforeend"){if(!(t instanceof y))throw new Error("Can render only components");if(null===e)throw new Error("Container element doesn't exist");e.insertAdjacentElement(n,t.element)}function e(t,e){if(!(t instanceof y&&e instanceof y))throw new Error("Can replace only components");const n=t.element,i=e.element,s=i.parentElement;if(null===s)throw new Error("Parent element doesn't exist");s.replaceChild(n,i)}var i=n(379),s=n.n(i),r=n(795),o=n.n(r),a=n(569),l=n.n(a),c=n(565),u=n.n(c),d=n(216),p=n.n(d),f=n(589),h=n.n(f),v=n(10),m={};m.styleTagTransform=h(),m.setAttributes=u(),m.insert=l().bind(null,"head"),m.domAPI=o(),m.insertStyleElement=p(),s()(v.Z,m),v.Z&&v.Z.locals&&v.Z.locals;const _="shake";class y{#t=null;constructor(){if(new.target===y)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#t||(this.#t=function(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}(this.template)),this.#t}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#t=null}shake(t){this.element.classList.add(_),setTimeout((()=>{this.element.classList.remove(_),t?.()}),600)}}class b extends y{constructor(){super()}get template(){return'<form class="trip-filters" action="#" method="get">\n        <div class="trip-filters__filter">\n          <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n          <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n        </div>\n\n        <div class="trip-filters__filter">\n          <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n          <label class="trip-filters__filter-label" for="filter-future">Future</label>\n        </div>\n\n        <div class="trip-filters__filter">\n          <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n          <label class="trip-filters__filter-label" for="filter-present">Present</label>\n        </div>\n\n        <div class="trip-filters__filter">\n          <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n          <label class="trip-filters__filter-label" for="filter-past">Past</label>\n        </div>\n\n        <button class="visually-hidden" type="submit">Accept filter</button>\n      </form>'}}var $=n(484),g=n.n($),M=n(646),D=n.n(M);g().extend(D());class w extends y{#e;constructor(t){super(),this.#e=t}get template(){return function(t){const e=t.length,n=function(t){const e=t.filter((t=>t&&""!==t.trim())),n=e.length;return 0===n?"":1===n?e[0]:n<=3?e.join(" — "):`${e[0]} — ${e[n-1]}`}(t.map((t=>t.destination.name)));let i="",s="";if(e>=1){const n=t[0].dateFrom,r=t[e-1].dateTo;i=g()(n).format("D MMM"),s=g()(r).format("D MMM")}const r=i&&s?`${i} — ${s}`:"",o=e>0?t.reduce(((t,e)=>t+e.cost),0):"";return`<section class="trip-main__trip-info  trip-info">\n    <div class="trip-info__main">\n      <h1 class="trip-info__title">${n}</h1>\n      <p class="trip-info__dates">${r}</p>\n    </div>\n\n    <p class="trip-info__cost">\n      ${""!==o?`Total: &euro;&nbsp;<span class="trip-info__cost-value">${o}</span>`:""}\n    </p>\n  </section>`}(this.#e)}}class S extends y{constructor(){super()}get template(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n    <div class="trip-sort__item  trip-sort__item--day">\n      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n      <label class="trip-sort__btn" for="sort-day">Day</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--event">\n      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n      <label class="trip-sort__btn" for="sort-event">Event</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--time">\n      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n      <label class="trip-sort__btn" for="sort-time">Time</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--price">\n      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n      <label class="trip-sort__btn" for="sort-price">Price</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--offer">\n      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n      <label class="trip-sort__btn" for="sort-offer">Offers</label>\n    </div>\n  </form>'}}class k extends y{#n;#i;constructor({point:t,onEditClick:e}){super(),this.#n=t,this.#i=e;const n=this.element.querySelector(".event__rollup-btn");n&&n.addEventListener("click",this.#s)}get template(){return function({type:t,destination:e,dateFrom:n,dateTo:i,offers:s,cost:r,isFavorite:o}){const a=function(t){return t?t.filter((t=>t.checked)).map((t=>`\n      <li class="event__offer">\n        <span class="event__offer-title">${t.name}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${t.cost}</span>\n      </li>`)).join(""):""}(s),l=new Date(n),c=new Date(i),u=g()(l).format("MMM DD"),d=g()(l).format("HH:mm"),p=g()(c).format("HH:mm");return`\n    <li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime="${u}">${u}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${t.toLowerCase()}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${t} ${e?e.name:""}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime="${d}">${d}</time>\n            &mdash;\n            <time class="event__end-time" datetime="${p}">${p}</time>\n          </p>\n          <p class="event__duration">${function(t,e){const n=Math.abs(g()(e).diff(t));return g().duration(n).format("DD[D] HH[H] mm[M]").split(" ").filter((t=>!/^00/.test(t))).join(" ")}(l,c)}</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${r}</span>\n        </p>\n        \x3c!-- Если у точки есть доп. услуги - выводим их --\x3e\n        ${a?`\n          <h4 class="visually-hidden">Offers:</h4>\n          <ul class="event__selected-offers">\n            ${a}\n          </ul>`:""}\n        <button class="event__favorite-btn ${o?"event__favorite-btn--active":""}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>`}(this.#n)}#s=t=>{t.preventDefault(),this.#i()}}const E=["Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa amet dignissimos quae\n  placeat aut ipsum, labore facere cum nulla maxime repudiandae voluptate modi harum hic\n  adipisci nobis molestiae impedit dicta eligendi officia corrupti quibusdam, eaque alias.\n  Facere dolorum esse, tempora quo non consequatur officiis repellat ratione. Facilis\n  incidunt quae odit accusantium commodi perferendis vero voluptates quidem officia qui\n  sint, consectetur consequatur soluta error. Porro quisquam eligendi assumenda incidunt\n  eveniet laboriosam veritatis iusto iure adipisci ut dolores debitis, eum voluptatum.\n  Tempore debitis alias iste quia temporibus beatae quasi illo rerum, error aliquid dolorem ab.\n  Sequi facilis laudantium temporibus dicta ratione delectus?"],C=[{id:crypto.randomUUID(),name:"Kiev",description:E[0],photos:[{src:"img/photos/1.jpg",alt:"Event photo 1"}]},{id:crypto.randomUUID(),name:"London",description:E[0].slice(100),photos:[{src:"img/photos/2.jpg",alt:"Event photo 2"}]},{id:crypto.randomUUID(),name:"Amsterdam",description:E[0].slice(50,80),photos:[]},{id:crypto.randomUUID(),name:"Paris",description:E[0],photos:[{src:"img/photos/1.jpg",alt:"Event photo 1"}]},{id:crypto.randomUUID(),name:"Dubai",description:E[0].slice(50,120),photos:[{src:"img/photos/1.jpg",alt:"Event photo 1"},{src:"img/photos/2.jpg",alt:"Event photo 2"},{src:"img/photos/3.jpg",alt:"Event photo 3"}]},{id:crypto.randomUUID(),name:"Sharm",description:E[0].slice(50,120),photos:[{src:"img/photos/1.jpg",alt:"Event photo 1"},{src:"img/photos/2.jpg",alt:"Event photo 2"},{src:"img/photos/3.jpg",alt:"Event photo 3"}]}],x={Taxi:[{id:crypto.randomUUID(),name:"Transfer",cost:80,checked:!0},{id:crypto.randomUUID(),name:"Meet in Airport",cost:100,checked:!1}],Flight:[{id:crypto.randomUUID(),name:"Extra Luggage",cost:150,checked:!1},{id:crypto.randomUUID(),name:"Eat in travel",cost:12200,checked:!0}],"Check-in":[{id:crypto.randomUUID(),name:"Lunch",cost:320,checked:!0},{id:crypto.randomUUID(),name:"Dinner",cost:320,checked:!1}],Train:[{id:crypto.randomUUID(),name:"Switch to comfort",cost:80,checked:!1},{id:crypto.randomUUID(),name:"Switch place",cost:82230,checked:!0},{id:crypto.randomUUID(),name:"Switch bus",cost:820,checked:!0}]},A=[{id:crypto.randomUUID(),type:"Flight",destination:C[2],dateFrom:"2019-03-18T10:30",dateTo:"2019-03-20T10:50",offers:x.Flight,cost:5e3,isFavorite:!0},{id:crypto.randomUUID(),type:"Ship",destination:{id:"",name:"",description:"",photos:[]},dateFrom:"2023-08-10T10:30",dateTo:"2023-08-10T14:00",offers:x.Ship,cost:1e3,isFavorite:!1},{id:crypto.randomUUID(),type:"Check-in",destination:C[5],dateFrom:"2023-02-01T03:04",dateTo:"2023-10-01T17:30",offers:x["Check-in"],cost:400,isFavorite:!1},{id:crypto.randomUUID(),type:"taxi",destination:C[3],dateFrom:"2023-11-25T05:03",dateTo:"2023-09-20T13:17",offers:x.taxi,cost:800,isFavorite:!0},{id:crypto.randomUUID(),type:"Bus",destination:C[5],dateFrom:"2023-07-24T00:22",dateTo:"2023-08-11T09:20",offers:x.Bus,cost:450,isFavorite:!1},{id:crypto.randomUUID(),type:"Ship",destination:C[1],dateFrom:"2023-08-10T10:30",dateTo:"2023-08-10T14:00",offers:x.Ship,cost:1e3,isFavorite:!1}];function T(){return(t=A)[Math.floor(Math.random()*t.length)];var t}const U={id:"",type:"Flight",destination:{id:"",name:"",description:"",photos:[]},dateFrom:"",dateTo:"",offers:[],cost:0,isFavorite:!1};class F extends y{#n;#r;constructor({point:t=U,onFormSubmit:e}){super(),this.#n=t,this.#r=e;const n=this.element.querySelector("form");n&&n.addEventListener("submit",this.#o)}get template(){return function({type:t,destination:e,dateFrom:n,dateTo:i,offers:s,cost:r}){const o=s?function(t){return t.map((t=>{const e=t.name,n=e.toLowerCase();return`\n      <div class="event__offer-selector">\n      <input\n      class="event__offer-checkbox visually-hidden"\n      type="checkbox"\n      id="${n}"\n      name="${n}"\n      ${t.checked?"checked":""}\n    >\n        <label class="event__offer-label" for="${n}">\n          <span class="event__offer-title">${e}</span>\n          +\n          €&nbsp;<span class="event__offer__price">${t.cost}</span>\n        </label>\n      </div>\n    `})).join("")}(s):"",a=function(t){return t.map((t=>`<option value="${t.name}"></option>`)).join("")}(C),l=e.photos?function(t){const e=Array.isArray(t)?t:[];return 0===e.length?"":`\n    <div class="event__photos-container">\n      <div class="event__photos-tape">\n        ${e.map((t=>`<img class="event__photo" src="${t.src}" alt="${t.alt}">`)).join("")}\n      </div>\n    </div>`}(e.photos):"",c=n?g()(n).format("DD/MM/YY HH:mm"):"",u=i?g()(i).format("DD/MM/YY HH:mm"):"";return`\n    <li class="trip-events__item">\n      <form class="event event--edit" action="#" method="post">\n        <header class="event__header">\n          <div class="event__type-wrapper">\n            <label class="event__type  event__type-btn" for="event-type-toggle-1">\n              <span class="visually-hidden">Choose event type</span>\n              <img class="event__type-icon" width="17" height="17" src="img/icons/${t.toLowerCase()}.png" alt="Event type icon">\n            </label>\n            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n            <div class="event__type-list">\n              <fieldset class="event__type-group">\n                <legend class="visually-hidden">Event type</legend>\n                <div class="event__type-item">\n    <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">\n    <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>\n  </div>\n\n  <div class="event__type-item">\n    <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">\n    <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>\n  </div>\n\n  <div class="event__type-item">\n    <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">\n    <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>\n  </div>\n\n  <div class="event__type-item">\n    <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">\n    <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>\n  </div>\n\n  <div class="event__type-item">\n    <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">\n    <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>\n  </div>\n\n  <div class="event__type-item">\n    <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>\n    <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>\n  </div>\n\n  <div class="event__type-item">\n    <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">\n    <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>\n  </div>\n\n  <div class="event__type-item">\n    <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">\n    <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>\n  </div>\n\n  <div class="event__type-item">\n    <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">\n    <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>\n  </div>\n       \n              </fieldset>\n            </div>\n          </div>\n\n          <div class="event__field-group  event__field-group--destination">\n            <label class="event__label  event__type-output" for="event-destination-1">\n              ${t}\n            </label>\n            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${e?e.name:""}" list="destination-list-1">\n            <datalist id="destination-list-1">\n              ${a}\n            </datalist>\n          </div>\n\n          <div class="event__field-group  event__field-group--time">\n            <label class="visually-hidden" for="event-start-time-1">From</label>\n            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${c}">\n            &mdash;\n            <label class="visually-hidden" for="event-end-time-1">To</label>\n            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${u}">\n          </div>\n\n          <div class="event__field-group  event__field-group--price">\n            <label class="event__label" for="event-price-1">\n              <span class="visually-hidden">Price</span>\n              &euro;\n            </label>\n            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${r}">\n          </div>\n\n          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n          <button class="event__reset-btn" type="reset">Delete</button>\n          <button class="event__rollup-btn" type="button">\n            <span class="visually-hidden">Open event</span>\n          </button>\n        </header>\n        ${o?`\n        <section class="event__details">\n            <section class="event__section  event__section--offers">\n              <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n              <div class="event__available-offers">\n                ${o}\n              </div>\n            </section>`:""}\n\n            ${e&&""!==e.description?`\n            <section class="event__section  event__section--destination">\n              <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n              <p class="event__destination-description">${e.description}</p>\n              ${l}\n            </section>`:""}\n        </section>\n      </form>\n    </li>`}(this.#n)}#o=t=>{t.preventDefault(),this.#r()}}class I{#a;constructor(t){this.#a=t}renderPoint(n){const i=t=>{"Escape"===t.key&&(t.preventDefault(),o(),document.removeEventListener("keydown",i))},s=new k({point:n,onEditClick:()=>{e(r,s),document.addEventListener("keydown",i)}}),r=new F({point:n,onFormSubmit:()=>{o(),document.removeEventListener("keydown",i)}});function o(){e(s,r)}t(s,this.#a)}}class H extends y{constructor(){super()}get template(){return'<ul class="trip-events__list"></ul>'}}const O=document.querySelector(".trip-main"),Y=document.querySelector(".trip-controls__filters"),L=document.querySelector(".trip-events"),j=new class{#e=Array.from({length:5},T);get points(){return this.#e}getById(t){return this.#e.find((e=>e.id===t))}},q=new class{#l=new H;#c;#u;#e=[];constructor({tripContainer:t,pointsModel:e}){this.#c=t,this.#u=e}init(){this.#e=[...this.#u.points],t(new S,this.#c),t(this.#l,this.#c);for(let t=0;t<this.#e.length;t++)this.#d(this.#e[t]);O&&Y&&(t(new w(this.#e),O,"afterbegin"),t(new b,Y))}#d(t){new I(this.#l.element).renderPoint(t)}}({tripContainer:L,pointsModel:j});q.init()}()}();
//# sourceMappingURL=bundle.978ad9412dc1c8e3eef5.js.map