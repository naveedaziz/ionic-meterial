(function(){var n;function aa(a,b){function c(){}
c.prototype=b.prototype;a.ha=b.prototype;a.prototype=new c;a.prototype.constructor=a;for(var d in b)if("prototype"!=d)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,d);e&&Object.defineProperty(a,d,e)}else a[d]=b[d]}
for(var ba="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},ca="function"==typeof Object.create?Object.create:function(a){function b(){}
b.prototype=a;return new b},da="undefined"!=typeof Reflect&&Reflect.construct||function(a,b,c){void 0===c&&(c=a);
c=ca(c.prototype||Object.prototype);return Function.prototype.apply.call(a,c,b)||c},ea="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this,fa=["Reflect",
"construct"],ha=0;ha<fa.length-1;ha++){var ia=fa[ha];ia in ea||(ea[ia]={});ea=ea[ia]}var ja=fa[fa.length-1],ka=ea[ja],la;la=ka||da;la!=ka&&null!=la&&ba(ea,ja,{configurable:!0,writable:!0,value:la});var p=this;function q(a){return"string"==typeof a}
function r(a,b){for(var c=a.split("."),d=b||p,e;e=c.shift();)if(null!=d[e])d=d[e];else return null;return d}
function ma(){}
function oa(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}
function v(a){return"array"==oa(a)}
function pa(a){var b=oa(a);return"array"==b||"object"==b&&"number"==typeof a.length}
function qa(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}
function ra(a,b,c){return a.call.apply(a.bind,arguments)}
function sa(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}
function w(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?w=ra:w=sa;return w.apply(null,arguments)}
var ta=Date.now||function(){return+new Date};
function x(a,b){var c=a.split("."),d=p;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d[e]&&d[e]!==Object.prototype[e]?d=d[e]:d=d[e]={}:d[e]=b}
function ua(a,b){function c(){}
c.prototype=b.prototype;a.ha=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.za=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}}
;function va(a){if(!a)return"";a=a.split("#")[0].split("?")[0];a=a.toLowerCase();0==a.indexOf("//")&&(a=window.location.protocol+a);/^[\w\-]*:\/\//.test(a)||(a=window.location.href);var b=a.substring(a.indexOf("://")+3),c=b.indexOf("/");-1!=c&&(b=b.substring(0,c));a=a.substring(0,a.indexOf("://"));if("http"!==a&&"https"!==a&&"chrome-extension"!==a&&"file"!==a&&"android-app"!==a&&"chrome-search"!==a)throw Error("Invalid URI scheme in origin");c="";var d=b.indexOf(":");if(-1!=d){var e=b.substring(d+
1);b=b.substring(0,d);if("http"===a&&"80"!==e||"https"===a&&"443"!==e)c=":"+e}return a+"://"+b+c}
;function wa(){function a(){e[0]=1732584193;e[1]=4023233417;e[2]=2562383102;e[3]=271733878;e[4]=3285377520;m=l=0}
function b(a){for(var b=g,c=0;64>c;c+=4)b[c/4]=a[c]<<24|a[c+1]<<16|a[c+2]<<8|a[c+3];for(c=16;80>c;c++)a=b[c-3]^b[c-8]^b[c-14]^b[c-16],b[c]=(a<<1|a>>>31)&4294967295;a=e[0];var d=e[1],f=e[2],h=e[3],k=e[4];for(c=0;80>c;c++){if(40>c)if(20>c){var l=h^d&(f^h);var m=1518500249}else l=d^f^h,m=1859775393;else 60>c?(l=d&f|h&(d|f),m=2400959708):(l=d^f^h,m=3395469782);l=((a<<5|a>>>27)&4294967295)+l+k+m+b[c]&4294967295;k=h;h=f;f=(d<<30|d>>>2)&4294967295;d=a;a=l}e[0]=e[0]+a&4294967295;e[1]=e[1]+d&4294967295;e[2]=
e[2]+f&4294967295;e[3]=e[3]+h&4294967295;e[4]=e[4]+k&4294967295}
function c(a,c){if("string"===typeof a){a=unescape(encodeURIComponent(a));for(var d=[],e=0,g=a.length;e<g;++e)d.push(a.charCodeAt(e));a=d}c||(c=a.length);d=0;if(0==l)for(;d+64<c;)b(a.slice(d,d+64)),d+=64,m+=64;for(;d<c;)if(f[l++]=a[d++],m++,64==l)for(l=0,b(f);d+64<c;)b(a.slice(d,d+64)),d+=64,m+=64}
function d(){var a=[],d=8*m;56>l?c(h,56-l):c(h,64-(l-56));for(var g=63;56<=g;g--)f[g]=d&255,d>>>=8;b(f);for(g=d=0;5>g;g++)for(var k=24;0<=k;k-=8)a[d++]=e[g]>>k&255;return a}
for(var e=[],f=[],g=[],h=[128],k=1;64>k;++k)h[k]=0;var l,m;a();return{reset:a,update:c,digest:d,qa:function(){for(var a=d(),b="",c=0;c<a.length;c++)b+="0123456789ABCDEF".charAt(Math.floor(a[c]/16))+"0123456789ABCDEF".charAt(a[c]%16);return b}}}
;function xa(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")}
var ya=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};
function za(a){if(!Aa.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(Ba,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(Ca,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(Da,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(Ea,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(Fa,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(Ga,"&#0;"));return a}
var Ba=/&/g,Ca=/</g,Da=/>/g,Ea=/"/g,Fa=/'/g,Ga=/\x00/g,Aa=/[\x00&<>"']/;function z(a){return-1!=a.indexOf("&")?"document"in p?Ha(a):Ia(a):a}
function Ha(a){var b={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"'};var c=p.document.createElement("div");return a.replace(Ja,function(a,e){var d=b[a];if(d)return d;if("#"==e.charAt(0)){var g=Number("0"+e.substr(1));isNaN(g)||(d=String.fromCharCode(g))}d||(c.innerHTML=a+" ",d=c.firstChild.nodeValue.slice(0,-1));return b[a]=d})}
function Ia(a){return a.replace(/&([^;]+);/g,function(a,c){switch(c){case "amp":return"&";case "lt":return"<";case "gt":return">";case "quot":return'"';default:if("#"==c.charAt(0)){var b=Number("0"+c.substr(1));if(!isNaN(b))return String.fromCharCode(b)}return a}})}
var Ja=/&([^;\s<&]+);?/g,Ka=String.prototype.repeat?function(a,b){return a.repeat(b)}:function(a,b){return Array(b+1).join(a)};
function La(a){a=String(a);var b=a.indexOf(".");-1==b&&(b=a.length);return Ka("0",Math.max(0,2-b))+a}
function Ma(a,b){return a<b?-1:a>b?1:0}
;var Na=Array.prototype.indexOf?function(a,b,c){return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;
if(q(a))return q(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},B=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Oa=Array.prototype.filter?function(a,b,c){return Array.prototype.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=q(a)?a.split(""):a,h=0;h<d;h++)if(h in g){var k=g[h];
b.call(c,k,h,a)&&(e[f++]=k)}return e},Pa=Array.prototype.map?function(a,b,c){return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=q(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));
return e};
function Qa(a,b){return 0<=Na(a,b)}
function Ra(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]}
function Sa(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(pa(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}}
function Ta(a){for(var b=Math.random,c=a.length-1;0<c;c--){var d=Math.floor(b()*(c+1)),e=a[c];a[c]=a[d];a[d]=e}}
;function Ua(a,b,c){var d=[],e=[];if(1==(v(c)?2:1))return e=[b,a],B(d,function(a){e.push(a)}),Va(e.join(" "));
var f=[],g=[];B(c,function(a){g.push(a.key);f.push(a.value)});
c=Math.floor((new Date).getTime()/1E3);e=0==f.length?[c,b,a]:[f.join(":"),c,b,a];B(d,function(a){e.push(a)});
a=Va(e.join(" "));a=[c,a];0==g.length||a.push(g.join(""));return a.join("_")}
function Va(a){var b=wa();b.update(a);return b.qa().toLowerCase()}
;function Wa(a){this.b=a||{cookie:""}}
n=Wa.prototype;n.isEnabled=function(){return navigator.cookieEnabled};
n.set=function(a,b,c,d,e,f){if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(b))throw Error('Invalid cookie value "'+b+'"');void 0!==c||(c=-1);e=e?";domain="+e:"";d=d?";path="+d:"";f=f?";secure":"";c=0>c?"":0==c?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(ta()+1E3*c)).toUTCString();this.b.cookie=a+"="+b+e+d+c+f};
n.get=function(a,b){for(var c=a+"=",d=(this.b.cookie||"").split(";"),e=0,f;e<d.length;e++){f=ya(d[e]);if(0==f.lastIndexOf(c,0))return f.substr(c.length);if(f==a)return""}return b};
n.remove=function(a,b,c){var d=void 0!==this.get(a);this.set(a,"",0,b,c);return d};
n.isEmpty=function(){return!this.b.cookie};
n.clear=function(){for(var a=(this.b.cookie||"").split(";"),b=[],c=[],d,e,f=0;f<a.length;f++)e=ya(a[f]),d=e.indexOf("="),-1==d?(b.push(""),c.push(e)):(b.push(e.substring(0,d)),c.push(e.substring(d+1)));for(a=b.length-1;0<=a;a--)this.remove(b[a])};function Xa(){var a=[],b=va(String(p.location.href)),c=p.__OVERRIDE_SID;null==c&&(c=(new Wa(document)).get("SID"));if(c&&(b=(c=0==b.indexOf("https:")||0==b.indexOf("chrome-extension:"))?p.__SAPISID:p.__APISID,null==b&&(b=(new Wa(document)).get(c?"SAPISID":"APISID")),b)){c=c?"SAPISIDHASH":"APISIDHASH";var d=String(p.location.href);return d&&b&&c?[c,Ua(va(d),b,a||null)].join(" "):null}return null}
;function Ya(a,b,c){this.i=c;this.g=a;this.j=b;this.f=0;this.b=null}
Ya.prototype.get=function(){if(0<this.f){this.f--;var a=this.b;this.b=a.next;a.next=null}else a=this.g();return a};var C;a:{var Za=p.navigator;if(Za){var $a=Za.userAgent;if($a){C=$a;break a}}C=""}function E(a){return-1!=C.indexOf(a)}
;function ab(a,b){for(var c in a)b.call(void 0,a[c],c,a)}
function bb(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}
function cb(a){var b=F,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}
function db(a){for(var b in a)return!1;return!0}
var eb="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function fb(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<eb.length;f++)c=eb[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}
;function gb(a){p.setTimeout(function(){throw a;},0)}
var hb;
function ib(){var a=p.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!E("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow;a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host;a=w(function(a){if(("*"==d||a.origin==d)&&a.data==
c)this.port1.onmessage()},this);
b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});
if("undefined"!==typeof a&&!E("Trident")&&!E("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var a=c.da;c.da=null;a()}};
return function(a){d.next={da:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?function(a){var b=document.createElement("SCRIPT");
b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};
document.documentElement.appendChild(b)}:function(a){p.setTimeout(a,0)}}
;function jb(){this.f=this.b=null}
var lb=new Ya(function(){return new kb},function(a){a.reset()},100);
jb.prototype.remove=function(){var a=null;this.b&&(a=this.b,this.b=this.b.next,this.b||(this.f=null),a.next=null);return a};
function kb(){this.next=this.scope=this.b=null}
kb.prototype.set=function(a,b){this.b=a;this.scope=b;this.next=null};
kb.prototype.reset=function(){this.next=this.scope=this.b=null};function mb(a){nb||ob();pb||(nb(),pb=!0);var b=qb,c=lb.get();c.set(a,void 0);b.f?b.f.next=c:b.b=c;b.f=c}
var nb;function ob(){if(-1!=String(p.Promise).indexOf("[native code]")){var a=p.Promise.resolve(void 0);nb=function(){a.then(rb)}}else nb=function(){var a=rb;
"function"!=oa(p.setImmediate)||p.Window&&p.Window.prototype&&!E("Edge")&&p.Window.prototype.setImmediate==p.setImmediate?(hb||(hb=ib()),hb(a)):p.setImmediate(a)}}
var pb=!1,qb=new jb;function rb(){for(var a;a=qb.remove();){try{a.b.call(a.scope)}catch(c){gb(c)}var b=lb;b.j(a);b.f<b.i&&(b.f++,a.next=b.b,b.b=a)}pb=!1}
;function sb(a,b){var c=tb;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)}
;var ub=E("Opera"),G=E("Trident")||E("MSIE"),vb=E("Edge"),wb=E("Gecko")&&!(-1!=C.toLowerCase().indexOf("webkit")&&!E("Edge"))&&!(E("Trident")||E("MSIE"))&&!E("Edge"),xb=-1!=C.toLowerCase().indexOf("webkit")&&!E("Edge");function yb(){var a=p.document;return a?a.documentMode:void 0}
var zb;a:{var Ab="",Bb=function(){var a=C;if(wb)return/rv\:([^\);]+)(\)|;)/.exec(a);if(vb)return/Edge\/([\d\.]+)/.exec(a);if(G)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(xb)return/WebKit\/(\S+)/.exec(a);if(ub)return/(?:Version)[ \/]?(\S+)/.exec(a)}();
Bb&&(Ab=Bb?Bb[1]:"");if(G){var Cb=yb();if(null!=Cb&&Cb>parseFloat(Ab)){zb=String(Cb);break a}}zb=Ab}var Db=zb,tb={};
function Eb(a){return sb(a,function(){for(var b=0,c=ya(String(Db)).split("."),d=ya(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",h=d[f]||"";do{g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];h=/(\d*)(\D*)(.*)/.exec(h)||["","","",""];if(0==g[0].length&&0==h[0].length)break;b=Ma(0==g[1].length?0:parseInt(g[1],10),0==h[1].length?0:parseInt(h[1],10))||Ma(0==g[2].length,0==h[2].length)||Ma(g[2],h[2]);g=g[3];h=h[3]}while(0==b)}return 0<=b})}
var Fb;var Gb=p.document;Fb=Gb&&G?yb()||("CSS1Compat"==Gb.compatMode?parseInt(Db,10):5):void 0;function H(){this.i=this.i;this.j=this.j}
H.prototype.i=!1;H.prototype.dispose=function(){this.i||(this.i=!0,this.M())};
H.prototype.M=function(){if(this.j)for(;this.j.length;)this.j.shift()()};var Hb=!G||9<=Number(Fb);!wb&&!G||G&&9<=Number(Fb)||wb&&Eb("1.9.1");G&&Eb("9");var Ib=G||ub||xb;function Jb(a){if(a.classList)return a.classList;a=a.className;return q(a)&&a.match(/\S+/g)||[]}
function Kb(a,b){return a.classList?a.classList.contains(b):Qa(Jb(a),b)}
function Lb(a,b){a.classList?a.classList.add(b):Kb(a,b)||(a.className+=0<a.className.length?" "+b:b)}
function Mb(a){a.classList?a.classList.remove("contains-mute-survey"):Kb(a,"contains-mute-survey")&&(a.className=Oa(Jb(a),function(a){return"contains-mute-survey"!=a}).join(" "))}
;var Nb={area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0};function I(){this.b=Ob}
I.prototype.w=!0;I.prototype.o=function(){return""};
I.prototype.toString=function(){return"Const{}"};
function Pb(a){return a instanceof I&&a.constructor===I&&a.b===Ob?"":"type_error:Const"}
var Ob={};function J(){this.b=Qb}
J.prototype.w=!0;J.prototype.o=function(){return""};
J.prototype.T=!0;J.prototype.G=function(){return 1};
var Qb={};function K(){this.b="";this.f=Rb}
K.prototype.w=!0;K.prototype.o=function(){return this.b};
K.prototype.T=!0;K.prototype.G=function(){return 1};
var Sb=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;function Tb(a){if(a instanceof K)return a;a=a.w?a.o():String(a);Sb.test(a)||(a="about:invalid#zClosurez");return Ub(a)}
var Rb={};function Ub(a){var b=new K;b.b=a;return b}
Ub("about:blank");function Vb(){this.b="";this.f=Wb}
Vb.prototype.w=!0;var Wb={};Vb.prototype.o=function(){return this.b};
function Xb(a){var b=new Vb;b.b=a;return b}
var Yb=Xb(""),Zb=/^[-,."'%_!# a-zA-Z0-9]+$/,$b=RegExp("\\b(url\\([ \t\n]*)('[ -&(-\\[\\]-~]*'|\"[ !#-\\[\\]-~]*\"|[!#-&*-\\[\\]-~]*)([ \t\n]*\\))","g"),ac=RegExp("\\b(hsl|hsla|rgb|rgba|(rotate|scale|translate)(X|Y|Z|3d)?)\\([-0-9a-z.%, ]+\\)","g");function bc(a){return a.replace($b,function(a,c,d,e){var b="";d=d.replace(/^(['"])(.*)\1$/,function(a,c,d){b=c;return d});
a=Tb(d).o();return c+b+a+b+e})}
;function L(){this.b="";this.g=cc;this.f=null}
L.prototype.T=!0;L.prototype.G=function(){return this.f};
L.prototype.w=!0;L.prototype.o=function(){return this.b};
function dc(a){return a instanceof L&&a.constructor===L&&a.g===cc?a.b:"type_error:SafeHtml"}
var ec=/^[a-zA-Z0-9-]+$/,fc={action:!0,cite:!0,data:!0,formaction:!0,href:!0,manifest:!0,poster:!0,src:!0},gc={APPLET:!0,BASE:!0,EMBED:!0,IFRAME:!0,LINK:!0,MATH:!0,META:!0,OBJECT:!0,SCRIPT:!0,STYLE:!0,SVG:!0,TEMPLATE:!0};
function hc(a,b,c){var d=String(a);if(!ec.test(d))throw Error("Invalid tag name <"+d+">.");if(d.toUpperCase()in gc)throw Error("Tag name <"+d+"> is not allowed for SafeHtml.");a=String(a);d=null;var e="<"+a,f="";if(b)for(t in b){if(!ec.test(t))throw Error('Invalid attribute name "'+t+'".');var g=b[t];if(null!=g){var h=a;var k=t;var l=g;if(l instanceof I)l=Pb(l);else if("style"==k.toLowerCase()){g=void 0;h=l;if(!qa(h))throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, '+
typeof h+" given: "+h);if(!(h instanceof Vb)){l="";for(g in h){if(!/^[-_a-zA-Z0-9]+$/.test(g))throw Error("Name allows only [-_a-zA-Z0-9], got: "+g);var m=h[g];if(null!=m){if(m instanceof I)m=Pb(m);else{m=String(m);var u=m.replace(ac,"$1").replace($b,"url");if(Zb.test(u)){for(var y=u=!0,D=0;D<m.length;D++){var A=m.charAt(D);"'"==A&&y?u=!u:'"'==A&&u&&(y=!y)}m=u&&y?bc(m):"zClosurez"}else m="zClosurez"}l+=g+":"+m+";"}}h=l?Xb(l):Yb}l=h instanceof Vb&&h.constructor===Vb&&h.f===Wb?h.b:"type_error:SafeStyle"}else{if(/^on/i.test(k))throw Error('Attribute "'+
k+'" requires goog.string.Const value, "'+l+'" given.');if(k.toLowerCase()in fc)if(l instanceof J)l=l instanceof J&&l.constructor===J&&l.b===Qb?"":"type_error:TrustedResourceUrl";else if(l instanceof K)l=l instanceof K&&l.constructor===K&&l.f===Rb?l.b:"type_error:SafeUrl";else if(q(l))l=Tb(l).o();else throw Error('Attribute "'+k+'" on tag "'+h+'" requires goog.html.SafeUrl, goog.string.Const, or string, value "'+l+'" given.');}l.w&&(l=l.o());k=k+'="'+za(String(l))+'"';f+=" "+k}}var t=e+f;null!=c?
v(c)||(c=[c]):c=[];!0===Nb[a.toLowerCase()]?t+=">":(c=ic(c),t+=">"+dc(c)+"</"+a+">",d=c.G());(b=b&&b.dir)&&(/^(ltr|rtl|auto)$/i.test(b)?d=0:d=null);return M(t,d)}
function ic(a){function b(a){if(v(a))B(a,b);else{if(a instanceof L)var e=a;else e=null,a.T&&(e=a.G()),a=za(a.w?a.o():String(a)),e=M(a,e);d+=dc(e);e=e.G();0==c?c=e:0!=e&&c!=e&&(c=null)}}
var c=0,d="";B(arguments,b);return M(d,c)}
var cc={};function M(a,b){var c=new L;c.b=a;c.f=b;return c}
M("<!DOCTYPE html>",0);var jc=M("",0);M("<br>",0);function kc(a,b){a.innerHTML=dc(b)}
;function lc(a){var b=document;return q(a)?b.getElementById(a):a}
function mc(a,b){var c=b||document;return c.querySelectorAll&&c.querySelector?c.querySelectorAll("."+a):nc(document,a,b)}
function N(a,b){var c=b||document;if(c.getElementsByClassName)c=c.getElementsByClassName(a)[0];else{c=document;var d=b||c;c=d.querySelectorAll&&d.querySelector&&a?d.querySelector(""+(a?"."+a:"")):nc(c,a,b)[0]||null}return c||null}
function nc(a,b,c){var d,e;a=c||a;if(a.querySelectorAll&&a.querySelector&&b)return a.querySelectorAll(""+(b?"."+b:""));if(b&&a.getElementsByClassName)return e=a.getElementsByClassName(b);e=a.getElementsByTagName("*");if(b){var f={};for(c=d=0;a=e[c];c++){var g=a.className;"function"==typeof g.split&&Qa(g.split(/\s+/),b)&&(f[d++]=a)}f.length=d;return f}return e}
function oc(a,b){ab(b,function(b,d){b&&b.w&&(b=b.o());"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:pc.hasOwnProperty(d)?a.setAttribute(pc[d],b):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,b):a[d]=b})}
var pc={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};
function O(a,b,c){var d=arguments,e=document,f=String(d[0]),g=d[1];if(!Hb&&g&&(g.name||g.type)){f=["<",f];g.name&&f.push(' name="',za(g.name),'"');if(g.type){f.push(' type="',za(g.type),'"');var h={};fb(h,g);delete h.type;g=h}f.push(">");f=f.join("")}f=e.createElement(f);g&&(q(g)?f.className=g:v(g)?f.className=g.join(" "):oc(f,g));2<d.length&&qc(e,f,d,2);return f}
function qc(a,b,c,d){function e(c){c&&b.appendChild(q(c)?a.createTextNode(c):c)}
for(;d<c.length;d++){var f=c[d];if(!pa(f)||qa(f)&&0<f.nodeType)e(f);else{a:{if(f&&"number"==typeof f.length){if(qa(f)){var g="function"==typeof f.item||"string"==typeof f.item;break a}if("function"==oa(f)){g="function"==typeof f.item;break a}}g=!1}B(g?Ra(f):f,e)}}}
function rc(a,b){qc(sc(a),a,arguments,1)}
function tc(a){for(var b;b=a.firstChild;)a.removeChild(b)}
function uc(a){a&&a.parentNode&&a.parentNode.removeChild(a)}
function vc(a){var b;if(Ib&&!(G&&Eb("9")&&!Eb("10")&&p.SVGElement&&a instanceof p.SVGElement)&&(b=a.parentElement))return b;b=a.parentNode;return qa(b)&&1==b.nodeType?b:null}
function sc(a){return 9==a.nodeType?a:a.ownerDocument||a.document}
function wc(a){var b=String.fromCharCode(215);if("textContent"in a)a.textContent=b;else if(3==a.nodeType)a.data=String(b);else if(a.firstChild&&3==a.firstChild.nodeType){for(;a.lastChild!=a.firstChild;)a.removeChild(a.lastChild);a.firstChild.data=String(b)}else tc(a),a.appendChild(sc(a).createTextNode(String(b)))}
function xc(a,b){for(var c=0;a;){if(b(a))return a;a=a.parentNode;c++}return null}
;var yc="StopIteration"in p?p.StopIteration:{message:"StopIteration",stack:""};function zc(){}
zc.prototype.next=function(){throw yc;};
zc.prototype.L=function(){return this};
function Ac(a){if(a instanceof zc)return a;if("function"==typeof a.L)return a.L(!1);if(pa(a)){var b=0,c=new zc;c.next=function(){for(;;){if(b>=a.length)throw yc;if(b in a)return a[b++];b++}};
return c}throw Error("Not implemented");}
function Bc(a,b){if(pa(a))try{B(a,b,void 0)}catch(c){if(c!==yc)throw c;}else{a=Ac(a);try{for(;;)b.call(void 0,a.next(),void 0,a)}catch(c){if(c!==yc)throw c;}}}
function Cc(a){if(pa(a))return Ra(a);a=Ac(a);var b=[];Bc(a,function(a){b.push(a)});
return b}
;var Dc={V:{1E3:{other:"0K"},1E4:{other:"00K"},1E5:{other:"000K"},1E6:{other:"0M"},1E7:{other:"00M"},1E8:{other:"000M"},1E9:{other:"0B"},1E10:{other:"00B"},1E11:{other:"000B"},1E12:{other:"0T"},1E13:{other:"00T"},1E14:{other:"000T"}},ia:{1E3:{other:"0 thousand"},1E4:{other:"00 thousand"},1E5:{other:"000 thousand"},1E6:{other:"0 million"},1E7:{other:"00 million"},1E8:{other:"000 million"},1E9:{other:"0 billion"},1E10:{other:"00 billion"},1E11:{other:"000 billion"},1E12:{other:"0 trillion"},1E13:{other:"00 trillion"},
1E14:{other:"000 trillion"}}},Ec=Dc;Ec=Dc;var Fc={AED:[2,"dh","\u062f.\u0625.","DH"],ALL:[0,"Lek","Lek"],AUD:[2,"$","AU$"],BDT:[2,"\u09f3","Tk"],BGN:[2,"lev","lev"],BRL:[2,"R$","R$"],CAD:[2,"$","C$"],CDF:[2,"FrCD","CDF"],CHF:[2,"CHF","CHF"],CLP:[0,"$","CL$"],CNY:[2,"\u00a5","RMB\u00a5"],COP:[32,"$","COL$"],CRC:[0,"\u20a1","CR\u20a1"],CZK:[50,"K\u010d","K\u010d"],DKK:[50,"kr.","kr."],DOP:[2,"RD$","RD$"],EGP:[2,"\u00a3","LE"],ETB:[2,"Birr","Birr"],EUR:[2,"\u20ac","\u20ac"],GBP:[2,"\u00a3","GB\u00a3"],HKD:[2,"$","HK$"],HRK:[2,"kn","kn"],HUF:[34,
"Ft","Ft"],IDR:[0,"Rp","Rp"],ILS:[34,"\u20aa","IL\u20aa"],INR:[2,"\u20b9","Rs"],IRR:[0,"Rial","IRR"],ISK:[0,"kr","kr"],JMD:[2,"$","JA$"],JPY:[0,"\u00a5","JP\u00a5"],KRW:[0,"\u20a9","KR\u20a9"],LKR:[2,"Rs","SLRs"],LTL:[2,"Lt","Lt"],MNT:[0,"\u20ae","MN\u20ae"],MVR:[2,"Rf","MVR"],MXN:[2,"$","Mex$"],MYR:[2,"RM","RM"],NOK:[50,"kr","NOkr"],PAB:[2,"B/.","B/."],PEN:[2,"S/.","S/."],PHP:[2,"\u20b1","PHP"],PKR:[0,"Rs","PKRs."],PLN:[50,"z\u0142","z\u0142"],RON:[2,"RON","RON"],RSD:[0,"din","RSD"],RUB:[50,"\u20bd",
"RUB"],SAR:[2,"Rial","Rial"],SEK:[50,"kr","kr"],SGD:[2,"$","S$"],THB:[2,"\u0e3f","THB"],TRY:[2,"TL","YTL"],TWD:[2,"NT$","NT$"],TZS:[0,"TSh","TSh"],UAH:[2,"\u0433\u0440\u043d.","UAH"],USD:[2,"$","US$"],UYU:[2,"$","$U"],VND:[48,"\u20ab","VN\u20ab"],YER:[0,"Rial","Rial"],ZAR:[2,"R","ZAR"]};var Gc={X:".",O:",",ba:"%",R:"0",oa:"+",la:"-",Y:"E",ca:"\u2030",P:"\u221e",ma:"NaN",W:"#,##0.###",pa:"#E0",na:"#,##0%",ja:"\u00a4#,##0.00",F:"USD"},P=Gc;P=Gc;function Hc(a,b,c){this.D=b;this.ka=c||0;this.H=40;this.f=1;this.J=0;this.i=3;this.I=this.g=0;this.aa=!1;this.B=this.m="";this.j="-";this.A="";this.b=1;this.l=!1;this.h=[];this.K=this.Z=!1;this.C=0;if("number"==typeof a)switch(a){case 1:Ic(this,P.W);break;case 2:Ic(this,P.pa);break;case 3:Ic(this,P.na);break;case 4:a=P.ja;b=["0"];c=Fc[this.D||P.F][0]&7;if(0<c){b.push(".");for(var d=0;d<c;d++)b.push("0")}a=a.replace(/0.00/g,b.join(""));Ic(this,a);break;case 5:Jc(this,1);break;case 6:Jc(this,2);break;
default:throw Error("Unsupported pattern type.");}else Ic(this,a)}
function Ic(a,b){b.replace(/ /g,"\u00a0");var c=[0];a.m=Kc(a,b,c);for(var d=c[0],e=-1,f=0,g=0,h=0,k=-1,l=b.length,m=!0;c[0]<l&&m;c[0]++)switch(b.charAt(c[0])){case "#":0<g?h++:f++;0<=k&&0>e&&k++;break;case "0":if(0<h)throw Error('Unexpected "0" in pattern "'+b+'"');g++;0<=k&&0>e&&k++;break;case ",":0<k&&a.h.push(k);k=0;break;case ".":if(0<=e)throw Error('Multiple decimal separators in pattern "'+b+'"');e=f+g+h;break;case "E":if(a.K)throw Error('Multiple exponential symbols in pattern "'+b+'"');a.K=
!0;a.I=0;c[0]+1<l&&"+"==b.charAt(c[0]+1)&&(c[0]++,a.aa=!0);for(;c[0]+1<l&&"0"==b.charAt(c[0]+1);)c[0]++,a.I++;if(1>f+g||1>a.I)throw Error('Malformed exponential pattern "'+b+'"');m=!1;break;default:c[0]--,m=!1}0==g&&0<f&&0<=e&&(g=e,0==g&&g++,h=f-g,f=g-1,g=1);if(0>e&&0<h||0<=e&&(e<f||e>f+g)||0==k)throw Error('Malformed pattern "'+b+'"');h=f+g+h;a.i=0<=e?h-e:0;0<=e&&(a.g=f+g-e,0>a.g&&(a.g=0));a.f=(0<=e?e:h)-f;a.K&&(a.H=f+a.f,0==a.i&&0==a.f&&(a.f=1));a.h.push(Math.max(0,k));a.Z=0==e||e==h;d=c[0]-d;a.B=
Kc(a,b,c);c[0]<b.length&&";"==b.charAt(c[0])?(c[0]++,1!=a.b&&(a.l=!0),a.j=Kc(a,b,c),c[0]+=d,a.A=Kc(a,b,c)):(a.j+=a.m,a.A+=a.B)}
function Jc(a,b){a.C=b;Ic(a,P.W);a.g=0;a.i=2;if(0<a.g)throw Error("Can't combine significant digits and minimum fraction digits");a.J=2}
Hc.prototype.parse=function(a,b){var c=b||[0];if(0!=this.C)throw Error("Parsing of compact numbers is unimplemented");a=a.replace(/ /g,"\u00a0");var d=a.indexOf(this.m,c[0])==c[0],e=a.indexOf(this.j,c[0])==c[0];d&&e&&(this.m.length>this.j.length?e=!1:this.m.length<this.j.length&&(d=!1));d?c[0]+=this.m.length:e&&(c[0]+=this.j.length);if(a.indexOf(P.P,c[0])==c[0]){c[0]+=P.P.length;var f=Infinity}else{f=a;var g=!1,h=!1,k=!1,l=-1,m=1,u=P.X,y=P.O,D=P.Y;if(0!=this.C)throw Error("Parsing of compact style numbers is not implemented");
for(var A="";c[0]<f.length;c[0]++){var t=f.charAt(c[0]),na=Lc(t);if(0<=na&&9>=na)A+=na,k=!0;else if(t==u.charAt(0)){if(g||h)break;A+=".";g=!0}else if(t==y.charAt(0)&&("\u00a0"!=y.charAt(0)||c[0]+1<f.length&&0<=Lc(f.charAt(c[0]+1)))){if(g||h)break}else if(t==D.charAt(0)){if(h)break;A+="E";h=!0;l=c[0]}else if("+"==t||"-"==t){if(k&&l!=c[0]-1)break;A+=t}else if(1==this.b&&t==P.ba.charAt(0)){if(1!=m)break;m=100;if(k){c[0]++;break}}else if(1==this.b&&t==P.ca.charAt(0)){if(1!=m)break;m=1E3;if(k){c[0]++;
break}}else break}1!=this.b&&(m=this.b);f=parseFloat(A)/m}if(d){if(a.indexOf(this.B,c[0])!=c[0])return NaN;c[0]+=this.B.length}else if(e){if(a.indexOf(this.A,c[0])!=c[0])return NaN;c[0]+=this.A.length}return e?-f:f};
Hc.prototype.format=function(a){if(isNaN(a))return P.ma;var b=[];var c=a;if(0==this.C)c=Mc;else{c=Math.abs(c);var d=Nc(this,1>=c?0:Oc(c)).S;c=Nc(this,d+Oc(Pc(this,c/Math.pow(10,d)).intValue))}a/=Math.pow(10,c.S);b.push(c.prefix);d=0>a||0==a&&0>1/a;b.push(d?this.j:this.m);if(isFinite(a))if(a=a*(d?-1:1)*this.b,this.K){var e=a;if(0==e)Qc(this,e,this.f,b),Rc(this,0,b);else{a=Math.floor(Math.log(e)/Math.log(10)+2E-15);var f=Math.pow(10,a);isFinite(f)&&0!==f?e/=f:(f=Math.pow(10,Math.floor(a/2)),e=e/f/f,
1==a%2&&(e=0<a?e/10:10*e));f=this.f;if(1<this.H&&this.H>this.f){for(;0!=a%this.H;)e*=10,a--;f=1}else 1>this.f?(a++,e/=10):(a-=this.f-1,e*=Math.pow(10,this.f-1));Qc(this,e,f,b);Rc(this,a,b)}}else Qc(this,a,this.f,b);else b.push(P.P);b.push(d?this.A:this.B);b.push(c.ga);return b.join("")};
function Pc(a,b){var c=Math.pow(10,a.i),d=0>=a.J?Math.round(b*c):Math.round(Sc(b*c,a.J,a.i));if(isFinite(d)){var e=Math.floor(d/c);c=Math.floor(d-e*c)}else e=b,c=0;return{intValue:e,ra:c}}
function Qc(a,b,c,d){if(a.g>a.i)throw Error("Min value must be less than max value");d||(d=[]);b=Pc(a,b);var e=b.intValue,f=b.ra,g=0<a.g||0<f||!1;b=a.g;g&&(b=a.g);for(var h="",k=e;1E20<k;)h="0"+h,k=Math.round(k/10);h=k+h;var l=P.X;k=P.R.charCodeAt(0);var m=h.length,u=0;if(0<e||0<c){for(e=m;e<c;e++)d.push(String.fromCharCode(k));if(2<=a.h.length)for(c=1;c<a.h.length;c++)u+=a.h[c];c=m-u;if(0<c){e=a.h;u=m=0;for(var y,D=P.O,A=h.length,t=0;t<A;t++)if(d.push(String.fromCharCode(k+1*Number(h.charAt(t)))),
1<A-t)if(y=e[u],t<c){var na=c-t;(1===y||0<y&&1===na%y)&&d.push(D)}else u<e.length&&(t===c?u+=1:y===t-c-m+1&&(d.push(D),m+=y,u+=1))}else{c=h;h=a.h;e=P.O;y=c.length;D=[];for(m=h.length-1;0<=m&&0<y;m--){u=h[m];for(A=0;A<u&&0<=y-A-1;A++)D.push(String.fromCharCode(k+1*Number(c.charAt(y-A-1))));y-=u;0<y&&D.push(e)}d.push.apply(d,D.reverse())}}else g||d.push(String.fromCharCode(k));(a.Z||g)&&d.push(l);f=String(f);g=f.split("e+");2==g.length&&(f=String(Sc(parseFloat(g[0]),a.J,1)),f=f.replace(".",""),f+=Ka("0",
parseInt(g[1],10)-f.length+1));a.i+1>f.length&&(f="1"+Ka("0",a.i-f.length)+f);for(a=f.length;"0"==f.charAt(a-1)&&a>b+1;)a--;for(e=1;e<a;e++)d.push(String.fromCharCode(k+1*Number(f.charAt(e))))}
function Rc(a,b,c){c.push(P.Y);0>b?(b=-b,c.push(P.la)):a.aa&&c.push(P.oa);b=""+b;for(var d=P.R,e=b.length;e<a.I;e++)c.push(d);c.push(b)}
function Lc(a){a=a.charCodeAt(0);if(48<=a&&58>a)return a-48;var b=P.R.charCodeAt(0);return b<=a&&a<b+10?a-b:-1}
function Kc(a,b,c){for(var d="",e=!1,f=b.length;c[0]<f;c[0]++){var g=b.charAt(c[0]);if("'"==g)c[0]+1<f&&"'"==b.charAt(c[0]+1)?(c[0]++,d+="'"):e=!e;else if(e)d+=g;else switch(g){case "#":case "0":case ",":case ".":case ";":return d;case "\u00a4":if(c[0]+1<f&&"\u00a4"==b.charAt(c[0]+1))c[0]++,d+=a.D||P.F;else switch(a.ka){case 0:d+=Fc[a.D||P.F][1];break;case 2:g=a.D||P.F;var h=Fc[g];d+=g==h[1]?g:g+" "+h[1];break;case 1:d+=Fc[a.D||P.F][2]}break;case "%":if(!a.l&&1!=a.b)throw Error("Too many percent/permill");
if(a.l&&100!=a.b)throw Error("Inconsistent use of percent/permill characters");a.b=100;a.l=!1;d+=P.ba;break;case "\u2030":if(!a.l&&1!=a.b)throw Error("Too many percent/permill");if(a.l&&1E3!=a.b)throw Error("Inconsistent use of percent/permill characters");a.b=1E3;a.l=!1;d+=P.ca;break;default:d+=g}}return d}
var Mc={prefix:"",ga:"",S:0};function Nc(a,b){var c=1==a.C?Ec.V:Ec.ia;null==c&&(c=Ec.V);if(3>b)return Mc;b=Math.min(14,b);for(var d=c[Math.pow(10,b)],e=b-1;!d&&3<=e;)d=c[Math.pow(10,e)],e--;if(!d)return Mc;c=d.other;return c&&"0"!=c?(c=/([^0]*)(0+)(.*)/.exec(c))?{prefix:c[1],ga:c[3],S:e+1-(c[2].length-1)}:Mc:Mc}
function Oc(a){if(!isFinite(a))return 0<a?a:0;for(var b=0;1<=(a/=10);)b++;return b}
function Sc(a,b,c){if(!a)return a;b=b-Oc(a)-1;if(b<-c)return c=Math.pow(10,c),Math.round(a/c)*c;c=Math.pow(10,b);return Math.round(a*c)/c}
;function Q(a){H.call(this);this.l=1;this.g=[];this.h=0;this.b=[];this.f={};this.m=!!a}
ua(Q,H);n=Q.prototype;n.subscribe=function(a,b,c){var d=this.f[a];d||(d=this.f[a]=[]);var e=this.l;this.b[e]=a;this.b[e+1]=b;this.b[e+2]=c;this.l=e+3;d.push(e);return e};
n.N=function(a){var b=this.b[a];if(b){var c=this.f[b];if(0!=this.h)this.g.push(a),this.b[a+1]=ma;else{if(c){var d=Na(c,a);0<=d&&Array.prototype.splice.call(c,d,1)}delete this.b[a];delete this.b[a+1];delete this.b[a+2]}}return!!b};
n.fa=function(a){var b=this.f[a];if(b){for(var c=Array(arguments.length-1),d=1,e=arguments.length;d<e;d++)c[d-1]=arguments[d];if(this.m)for(d=0;d<b.length;d++){var f=b[d];Tc(this.b[f+1],this.b[f+2],c)}else{this.h++;try{for(d=0,e=b.length;d<e;d++)f=b[d],this.b[f+1].apply(this.b[f+2],c)}finally{if(this.h--,0<this.g.length&&0==this.h)for(;f=this.g.pop();)this.N(f)}}return 0!=d}return!1};
function Tc(a,b,c){mb(function(){a.apply(b,c)})}
n.clear=function(a){if(a){var b=this.f[a];b&&(B(b,this.N,this),delete this.f[a])}else this.b.length=0,this.f={}};
n.M=function(){Q.ha.M.call(this);this.clear();this.g.length=0};function Uc(){}
;function Vc(){}
ua(Vc,Uc);Vc.prototype.clear=function(){var a=Cc(this.L(!0)),b=this;B(a,function(a){b.remove(a)})};function Wc(a){this.b=a}
ua(Wc,Vc);n=Wc.prototype;n.isAvailable=function(){if(!this.b)return!1;try{return this.b.setItem("__sak","1"),this.b.removeItem("__sak"),!0}catch(a){return!1}};
n.set=function(a,b){try{this.b.setItem(a,b)}catch(c){if(0==this.b.length)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};
n.get=function(a){a=this.b.getItem(a);if(!q(a)&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
n.remove=function(a){this.b.removeItem(a)};
n.L=function(a){var b=0,c=this.b,d=new zc;d.next=function(){if(b>=c.length)throw yc;var d=c.key(b++);if(a)return d;d=c.getItem(d);if(!q(d))throw"Storage mechanism: Invalid value was encountered";return d};
return d};
n.clear=function(){this.b.clear()};
n.key=function(a){return this.b.key(a)};function Xc(){var a=null;try{a=window.localStorage||null}catch(b){}this.b=a}
ua(Xc,Wc);function Yc(){var a=null;try{a=window.sessionStorage||null}catch(b){}this.b=a}
ua(Yc,Wc);var R=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function Zc(a){return a?decodeURI(a):a}
function $c(a,b,c){if(v(b))for(var d=0;d<b.length;d++)$c(a,String(b[d]),c);else null!=b&&c.push(a+(""===b?"":"="+encodeURIComponent(String(b))))}
function ad(a){var b=[],c;for(c in a)$c(c,a[c],b);return b.join("&")}
;var S=window.performance&&window.performance.timing&&window.performance.now?function(){return window.performance.timing.navigationStart+window.performance.now()}:function(){return(new Date).getTime()};var bd=window.yt&&window.yt.config_||window.ytcfg&&window.ytcfg.data_||{};x("yt.config_",bd);function cd(a){var b=arguments;if(1<b.length)bd[b[0]]=b[1];else{b=b[0];for(var c in b)bd[c]=b[c]}}
function T(a,b){return a in bd?bd[a]:b}
function U(a){return T(a,void 0)}
;ta();function dd(a,b,c,d,e){var f=r("yt.logging.errors.log");f?f(a,b,c,d,e):(f=T("ERRORS",[]),f.push([a,b,c,d,e]),cd("ERRORS",f))}
function ed(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){dd(b)}}:a}
;var fd=void 0!==XMLHttpRequest?function(){return new XMLHttpRequest}:void 0!==ActiveXObject?function(){return new ActiveXObject("Microsoft.XMLHTTP")}:null;
function gd(){if(!fd)return null;var a=fd();return"open"in a?a:null}
;function hd(a,b){"function"==oa(a)&&(a=ed(a));return window.setTimeout(a,b)}
;function id(a){"?"==a.charAt(0)&&(a=a.substr(1));a=a.split("&");for(var b={},c=0,d=a.length;c<d;c++){var e=a[c].split("=");if(1==e.length&&e[0]||2==e.length){var f=decodeURIComponent((e[0]||"").replace(/\+/g," "));e=decodeURIComponent((e[1]||"").replace(/\+/g," "));f in b?v(b[f])?Sa(b[f],e):b[f]=[b[f],e]:b[f]=e}}return b}
function jd(a,b){var c=a.split("#",2);a=c[0];c=1<c.length?"#"+c[1]:"";var d=a.split("?",2);a=d[0];var e=id(d[1]||"");for(f in b)e[f]=b[f];d=a;var f=ad(e);if(f){e=d.indexOf("#");0>e&&(e=d.length);var g=d.indexOf("?");if(0>g||g>e){g=e;var h=""}else h=d.substring(g+1,e);d=[d.substr(0,g),h,d.substr(e)];e=d[1];d[1]=f?e?e+"&"+f:f:e;f=d[0]+(d[1]?"?"+d[1]:"")+d[2]}else f=d;return f+c}
;var kd={"X-Goog-Visitor-Id":"SANDBOXED_VISITOR_ID","X-YouTube-Client-Name":"INNERTUBE_CONTEXT_CLIENT_NAME","X-YouTube-Client-Version":"INNERTUBE_CONTEXT_CLIENT_VERSION","X-Youtube-Identity-Token":"ID_TOKEN","X-YouTube-Page-CL":"PAGE_CL","X-YouTube-Page-Label":"PAGE_BUILD_LABEL","X-YouTube-Variants-Checksum":"VARIANTS_CHECKSUM"},ld=!1;
function md(a,b){b=void 0===b?{}:b;var c=void 0;c=window.location.href;var d=a.match(R)[1]||null,e=Zc(a.match(R)[3]||null);d&&e?(d=c,c=a.match(R),d=d.match(R),c=c[3]==d[3]&&c[1]==d[1]&&c[4]==d[4]):c=e?Zc(c.match(R)[3]||null)==e&&(Number(c.match(R)[4]||null)||null)==(Number(a.match(R)[4]||null)||null):!0;for(var f in kd){if((e=d=T(kd[f]))&&!(e=c)){var g=a;e=f;var h=T("CORS_HEADER_WHITELIST")||{};e=(g=Zc(g.match(R)[3]||null))?(h=h[g])?Qa(h,e):!1:!0}e&&(b[f]=d)}return b}
function nd(a,b){var c=T("XSRF_FIELD_NAME",void 0),d;b.headers&&(d=b.headers["Content-Type"]);return!b.Ba&&(!Zc(a.match(R)[3]||null)||b.withCredentials||Zc(a.match(R)[3]||null)==document.location.hostname)&&"POST"==b.method&&(!d||"application/x-www-form-urlencoded"==d)&&!(b.u&&b.u[c])}
function od(a,b){var c=b.format||"JSON";b.Ca&&(a=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")+a);var d=T("XSRF_FIELD_NAME",void 0),e=T("XSRF_TOKEN",void 0),f=b.xa;f&&(f[d]&&delete f[d],a=jd(a,f||{}));f=b.postBody||"";var g=b.u;nd(a,b)&&(g||(g={}),g[d]=e);g&&q(f)&&(d=id(f),fb(d,g),f=b.ea&&"JSON"==b.ea?JSON.stringify(d):ad(d));d=f||g&&!db(g);!ld&&d&&"POST"!=b.method&&(ld=!0,dd(Error("AJAX request with postData should use POST")));
var h=!1,k,l=pd(a,function(a){if(!h){h=!0;k&&window.clearTimeout(k);a:switch(a&&"status"in a?a.status:-1){case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:var d=!0;break a;default:d=!1}var e=null;if(d||400<=a.status&&500>a.status)e=qd(c,a,b.Aa);if(d)a:if(204==a.status)d=!0;else{switch(c){case "XML":d=0==parseInt(e&&e.return_code,10);break a;case "RAW":d=!0;break a}d=!!e}e=e||{};var f=b.context||p;d||b.onError&&b.onError.call(f,a,e);b.wa&&b.wa.call(f,a,e)}},b.method,f,b.headers,
b.responseType,b.withCredentials);
b.U&&0<b.timeout&&(k=hd(function(){h||(h=!0,l.abort(),window.clearTimeout(k),b.U.call(b.context||p,l))},b.timeout))}
function qd(a,b,c){var d=null;switch(a){case "JSON":a=b.responseText;b=b.getResponseHeader("Content-Type")||"";a&&0<=b.indexOf("json")&&(d=JSON.parse(a));break;case "XML":if(b=(b=b.responseXML)?rd(b):null)d={},B(b.getElementsByTagName("*"),function(a){d[a.tagName]=sd(a)})}c&&td(d);
return d}
function td(a){if(qa(a))for(var b in a){var c;(c="html_content"==b)||(c=b.length-5,c=0<=c&&b.indexOf("_html",c)==c);if(c){c=b;var d=M(a[b],null);a[c]=d}else td(a[b])}}
function rd(a){return a?(a=("responseXML"in a?a.responseXML:a).getElementsByTagName("root"))&&0<a.length?a[0]:null:null}
function sd(a){var b="";B(a.childNodes,function(a){b+=a.nodeValue});
return b}
function ud(a,b){b.method="POST";b.u||(b.u={});od(a,b)}
function pd(a,b,c,d,e,f,g){function h(){4==(k&&"readyState"in k?k.readyState:0)&&b&&ed(b)(k)}
c=void 0===c?"GET":c;d=void 0===d?"":d;var k=gd();if(!k)return null;"onloadend"in k?k.addEventListener("loadend",h,!1):k.onreadystatechange=h;k.open(c,a,!0);f&&(k.responseType=f);g&&(k.withCredentials=!0);c="POST"==c;if(e=md(a,e))for(var l in e)k.setRequestHeader(l,e[l]),"content-type"==l.toLowerCase()&&(c=!1);c&&k.setRequestHeader("Content-Type","application/x-www-form-urlencoded");k.send(d);return k}
;var vd={},wd=0;function V(a,b,c){a&&(c&&(c=C,c=!(c&&0<=c.toLowerCase().indexOf("cobalt"))),c?a&&(a=O("IFRAME",{src:'javascript:"data:text/html,<body><img src=\\"'+a+'\\"></body>"',style:"display:none"}),sc(a).body.appendChild(a)):T("USE_NET_AJAX_FOR_PING_TRANSPORT",!1)?pd(a,b):xd(a,b))}
function xd(a,b){var c=new Image,d=""+wd++;vd[d]=c;c.onload=c.onerror=function(){b&&vd[d]&&b();delete vd[d]};
c.src=a}
;var yd=/^https?:\/\/([^.]*\.moatads\.com\/|e[0-9]+\.yt\.srs\.doubleverify\.com|pagead2\.googlesyndication\.com\/pagead\/gen_204\?id=yt3p&sr=1&|pm\.adsafeprotected\.com\/youtube|pm\.test-adsafeprotected\.com\/youtube|youtube[0-9]+\.moatpixel\.com\/)/,zd=/^https?:\/\/(www\.google\.com\/pagead\/sul|www\.google\.com\/pagead\/xsul|www\.youtube\.com\/pagead\/psul|www\.youtube\.com\/pagead\/slav|www\.youtube\.com\/pagead\/sul)/,Ad=/^https?.*#ocr$|^https?:\/\/(aksecure\.imrworldwide\.com\/|cdn\.imrworldwide\.com\/|secure\-..\.imrworldwide\.com\/)/;function Bd(a,b,c,d){!a&&(void 0===c?0:c)&&dd(Error("Player URL validator detects invalid url. "+(void 0===d?"":d)+": "+b),"WARNING",void 0,void 0,void 0);return a}
;function Cd(a){if(a=lc(a))a.style.visibility="visible"}
;function Dd(a){this.f=a;this.b=null;a=Ed(this.f);a=xa("__%s__","("+a.join("|")+")");this.b=new RegExp(a,"g");this.g={}}
var Fd=/__([a-z]+(?:_[a-z]+)*)__/g;function Gd(a){a=lc(a).innerHTML;a=a.replace(/^\s*(\x3c!--\s*)?/,"");a=a.replace(/(\s*--\x3e)?\s*$/,"");return new Dd(a)}
function Ed(a){var b=[],c={};a.replace(Fd,function(a,e){e in c||(c[e]=!0,b.push(e))});
return b}
function Hd(a,b){var c=w(function(a,c){return b[c]||this.g[c]||""},a);
return a.f.replace(a.b,c)}
;var Id=0,Jd=r("ytDomDomGetNextId")||function(){return++Id};
x("ytDomDomGetNextId",Jd);function W(a){return T("EXPERIMENT_FLAGS",{})[a]}
;var Kd=0,Ld={};var Md=r("ytPubsubPubsubInstance")||new Q;Q.prototype.subscribe=Q.prototype.subscribe;Q.prototype.unsubscribeByKey=Q.prototype.N;Q.prototype.publish=Q.prototype.fa;Q.prototype.clear=Q.prototype.clear;x("ytPubsubPubsubInstance",Md);var Nd=r("ytPubsubPubsubSubscribedKeys")||{};x("ytPubsubPubsubSubscribedKeys",Nd);var Od=r("ytPubsubPubsubTopicToKeys")||{};x("ytPubsubPubsubTopicToKeys",Od);var Pd=r("ytPubsubPubsubIsSynchronous")||{};x("ytPubsubPubsubIsSynchronous",Pd);
function Qd(a,b){var c=r("ytPubsubPubsubInstance");if(c){var d=c.subscribe("dispose",function(){var c=arguments;var f=function(){Nd[d]&&a.apply(b||window,c)};
try{Pd.dispose?f():hd(f,0)}catch(g){dd(g)}},b);
Nd[d]=!0;Od.dispose||(Od.dispose=[]);Od.dispose.push(d);return d}return 0}
function Rd(a){var b=r("ytPubsubPubsubInstance");b&&("number"==typeof a?a=[a]:q(a)&&(a=[parseInt(a,10)]),B(a,function(a){b.unsubscribeByKey(a);delete Nd[a]}))}
function Sd(a,b){var c=Qd(function(d){a.apply(b,arguments);Rd(c)},b)}
;var Td={log_event:"events",log_event2:"events",log_interaction:"interactions"},Ud=Object.create(null);Ud.log_event="GENERIC_EVENT_LOGGING";Ud.log_event2="GENERIC_EVENT_LOGGING";Ud.log_interaction="INTERACTION_LOGGING";var Vd={},Wd={},Xd=0,X=r("ytLoggingTransportLogPayloadsQueue_")||{};x("ytLoggingTransportLogPayloadsQueue_",X);var Yd=r("ytLoggingTransportTokensToCttTargetIds_")||{};x("ytLoggingTransportTokensToCttTargetIds_",Yd);var Zd=r("ytLoggingTransportDispatchedStats_")||{};
x("ytLoggingTransportDispatchedStats_",Zd);var $d=r("ytLoggingTransportCapturedTime_")||{};x("ytytLoggingTransportCapturedTime_",$d);
function ae(){window.clearTimeout(Xd);if(!db(X)){for(var a in X){var b=Vd[a];if(!b){var c=Wd[a];if(!c)continue;b=new c;Vd[a]=b}c=void 0;var d=a,e=b,f=Td[d],g=Zd[d]||{};Zd[d]=g;b=Math.round(S());for(c in X[d]){var h=e.b;h={client:{hl:h.ua,gl:h.ta,clientName:h.sa,clientVersion:h.innertubeContextClientVersion}};T("DELEGATED_SESSION_ID")&&(h.user={onBehalfOfUser:T("DELEGATED_SESSION_ID")});h={context:h};h[f]=be(d,c);g.dispatchedEventCount=g.dispatchedEventCount||0;g.dispatchedEventCount+=h[f].length;
h.requestTimeMs=b;var k=Yd[c];if(k)a:{var l=h,m=c;if(k.videoId)var u="VIDEO";else if(k.playlistId)u="PLAYLIST";else break a;l.credentialTransferTokenTargetId=k;l.context=l.context||{};l.context.user=l.context.user||{};l.context.user.credentialTransferTokens=[{token:m,scope:u}]}delete Yd[c];ce(e,d,h)}c=g;d=b;c.previousDispatchMs&&(b=d-c.previousDispatchMs,e=c.diffCount||0,c.averageTimeBetweenDispatchesMs=e?(c.averageTimeBetweenDispatchesMs*e+b)/(e+1):b,c.diffCount=e+1);c.previousDispatchMs=d;delete X[a]}db(X)||
de()}}
function de(){window.clearTimeout(Xd);Xd=hd(ae,T("LOGGING_BATCH_TIMEOUT",1E4))}
function be(a,b){b||(b="");X[a]=X[a]||{};X[a][b]=X[a][b]||[];return X[a][b]}
;var ee={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,screenX:1,screenY:1,scale:1,rotation:1,webkitMovementX:1,webkitMovementY:1};
function fe(a){this.type="";this.state=this.source=this.data=this.currentTarget=this.relatedTarget=this.target=null;this.charCode=this.keyCode=0;this.shiftKey=this.ctrlKey=this.altKey=!1;this.clientY=this.clientX=0;this.changedTouches=this.touches=null;if(a=a||window.event){this.event=a;for(var b in a)b in ee||(this[b]=a[b]);(b=a.target||a.srcElement)&&3==b.nodeType&&(b=b.parentNode);this.target=b;if(b=a.relatedTarget)try{b=b.nodeName?b:null}catch(c){b=null}else"mouseover"==this.type?b=a.fromElement:
"mouseout"==this.type&&(b=a.toElement);this.relatedTarget=b;this.clientX=void 0!=a.clientX?a.clientX:a.pageX;this.clientY=void 0!=a.clientY?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||("keypress"==this.type?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey}}
fe.prototype.preventDefault=function(){this.event&&(this.event.returnValue=!1,this.event.preventDefault&&this.event.preventDefault())};
fe.prototype.stopPropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopPropagation&&this.event.stopPropagation())};
fe.prototype.stopImmediatePropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopImmediatePropagation&&this.event.stopImmediatePropagation())};var F=r("ytEventsEventsListeners")||{};x("ytEventsEventsListeners",F);var ge=r("ytEventsEventsCounter")||{count:0};x("ytEventsEventsCounter",ge);function he(a,b,c,d){d=void 0===d?!1:d;a.addEventListener&&("mouseenter"!=b||"onmouseenter"in document?"mouseleave"!=b||"onmouseenter"in document?"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"):b="mouseout":b="mouseover");return cb(function(e){return!!e.length&&e[0]==a&&e[1]==b&&e[2]==c&&e[4]==!!d})}
function ie(a){a&&("string"==typeof a&&(a=[a]),B(a,function(a){if(a in F){var b=F[a],d=b[0],e=b[1],f=b[3];b=b[4];d.removeEventListener?d.removeEventListener(e,f,b):d.detachEvent&&d.detachEvent("on"+e,f);delete F[a]}}))}
function je(a,b){var c="click";var d=void 0===d?!1:d;if(a&&(a.addEventListener||a.attachEvent)){var e=he(a,c,b,d);if(!e){e=++ge.count+"";var f=!("mouseenter"!=c&&"mouseleave"!=c||!a.addEventListener||"onmouseenter"in document);var g=f?function(d){d=new fe(d);if(!xc(d.relatedTarget,function(b){return b==a}))return d.currentTarget=a,d.type=c,b.call(a,d)}:function(c){c=new fe(c);
c.currentTarget=a;return b.call(a,c)};
g=ed(g);a.addEventListener?("mouseenter"==c&&f?c="mouseover":"mouseleave"==c&&f?c="mouseout":"mousewheel"==c&&"MozBoxSizing"in document.documentElement.style&&(c="MozMousePixelScroll"),a.addEventListener(c,g,d)):a.attachEvent("on"+c,g);F[e]=[a,c,b,g,d]}}}
function ke(a){a=a||window.event;a.cancelBubble=!0;a.stopPropagation&&a.stopPropagation()}
function le(a){for(var b in F)F[b][0]==a&&ie(b)}
;function me(a,b,c){var d=ne,e={};e.eventTimeMs=Math.round(c||S());e[a]=b;b=String;c?c=-1:(c=r("_lact",window),c=null==c?-1:Math.max(ta()-c,0));e.context={lastActivityMs:b(c)};a=W("web_system_health_gel2")&&"systemHealthCaptured"==a?"log_event2":"log_event";Wd[a]=d;d=be(a);d.push(e);e=W("web_logging_max_batch");d.length>=(Number(e||0)||20)?ae():de()}
;function oe(a,b,c){c.context&&c.context.capabilities&&(c=c.context.capabilities,c.snapshot||c.golden)&&(a="vix");return"/youtubei/"+a+"/"+b}
;function ne(a){a||(a={apiaryHost:U("APIARY_HOST"),ya:U("APIARY_HOST_FIRSTPARTY"),gapiHintOverride:!!T("GAPI_HINT_OVERRIDE",void 0),gapiHintParams:U("GAPI_HINT_PARAMS"),innertubeApiKey:U("INNERTUBE_API_KEY"),innertubeApiVersion:U("INNERTUBE_API_VERSION"),sa:T("INNERTUBE_CONTEXT_CLIENT_NAME","WEB"),innertubeContextClientVersion:U("INNERTUBE_CONTEXT_CLIENT_VERSION"),ua:U("INNERTUBE_CONTEXT_HL"),ta:U("INNERTUBE_CONTEXT_GL"),xhrApiaryHost:U("XHR_APIARY_HOST")||"",va:U("INNERTUBE_HOST_OVERRIDE")||""});
this.b=a}
function ce(a,b,c){var d={};!T("VISITOR_DATA")&&.01>Math.random()&&dd(Error("Missing VISITOR_DATA when sending innertube request."),"WARNING");var e={headers:{"Content-Type":"application/json","X-Goog-Visitor-Id":T("VISITOR_DATA","")},u:c,ea:"JSON",U:d.U,Da:function(){},
onError:function(a,b){if(d.onError)d.onError(b)},
timeout:d.timeout,withCredentials:!0},f=Xa();f&&(e.headers.Authorization=f,e.headers["X-Goog-AuthUser"]=T("SESSION_INDEX",0));var g="",h=a.b.va;h&&(g=h);f&&!g&&(e.headers["x-origin"]=window.location.origin);ud(""+g+oe(a.b.innertubeApiVersion,b,c)+"?alt=json&key="+a.b.innertubeApiKey,e)}
;function pe(){var a=qe,b=5E3;isNaN(b)&&(b=void 0);var c=r("yt.scheduler.instance.addJob");return c?c(a,0,b):void 0===b?(a(),NaN):hd(a,b||0)}
function re(a){if(!isNaN(a)){var b=r("yt.scheduler.instance.cancelJob");b?b(a):window.clearTimeout(a)}}
;var Y=r("ytLoggingLatencyUsageStats_")||{};x("ytLoggingLatencyUsageStats_",Y);var se=0;
function te(a){Y[a]=Y[a]||{count:0};var b=Y[a];b.count++;b.time=S();se||(se=pe());if(10<b.count){if(11==b.count){b=Error("CSI data exceeded logging limit with key: "+a);var c=void 0,d=void 0;c=void 0===c?"ERROR":c;d=void 0===d?!1:d;a={name:T("INNERTUBE_CONTEXT_CLIENT_NAME",1),version:U("INNERTUBE_CONTEXT_CLIENT_VERSION")};c=void 0===c?"ERROR":c;d=window&&window.yterr||(void 0===d?!1:d)||!1;if(b&&d&&!(5<=Kd)){d=b.stacktrace;var e=b.columnNumber;var f=r("window.location.href");if(q(b))b={message:b,
name:"Unknown error",lineNumber:"Not available",fileName:f,stack:"Not available"};else{var g=!1;try{var h=b.lineNumber||b.line||"Not available"}catch(u){h="Not available",g=!0}try{var k=b.fileName||b.filename||b.sourceURL||p.$googDebugFname||f}catch(u){k="Not available",g=!0}b=!g&&b.lineNumber&&b.fileName&&b.stack&&b.message&&b.name?b:{message:b.message||"Not available",name:b.name||"UnknownError",lineNumber:h,fileName:k,stack:b.stack||"Not available"}}d=d||b.stack;h=b.lineNumber.toString();isNaN(h)||
isNaN(e)||(h=h+":"+e);if(!(Ld[b.message]||0<=d.indexOf("/YouTubeCenter.js")||0<=d.indexOf("/mytube.js"))){k=b.fileName;h={xa:{a:"logerror",t:"jserror",type:b.name,msg:b.message.substr(0,1E3),line:h,level:c,"client.name":a.name},u:{url:T("PAGE_NAME",window.location.href),file:k},method:"POST"};a.version&&(h["client.version"]=a.version);d&&(h.u.stack=d);for(var l in a)h.u["client."+l]=a[l];if(l=T("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS",void 0))for(var m in l)h.u[m]=l[m];od("/error_204",h);Ld[b.message]=
!0;Kd++}}}return!0}return!1}
function qe(){var a=S(),b;for(b in Y)6E4<a-Y[b].time&&delete Y[b];se=0}
;(new Xc).isAvailable();(new Yc).isAvailable();function ue(a,b){this.version=a;this.args=b}
;function ve(a){this.topic=a}
ve.prototype.toString=function(){return this.topic};var we=r("ytPubsub2Pubsub2Instance")||new Q;Q.prototype.subscribe=Q.prototype.subscribe;Q.prototype.unsubscribeByKey=Q.prototype.N;Q.prototype.publish=Q.prototype.fa;Q.prototype.clear=Q.prototype.clear;x("ytPubsub2Pubsub2Instance",we);var xe=r("ytPubsub2Pubsub2SubscribedKeys")||{};x("ytPubsub2Pubsub2SubscribedKeys",xe);var ye=r("ytPubsub2Pubsub2TopicToKeys")||{};x("ytPubsub2Pubsub2TopicToKeys",ye);var ze=r("ytPubsub2Pubsub2IsAsync")||{};x("ytPubsub2Pubsub2IsAsync",ze);
x("ytPubsub2Pubsub2SkipSubKey",null);function Ae(a,b){var c=r("ytPubsub2Pubsub2Instance");c&&c.publish.call(c,a.toString(),a,b)}
;function Be(){var a=T("TIMING_TICK_EXPIRATION");a||(a={},cd("TIMING_TICK_EXPIRATION",a));return a}
function Ce(){var a=Be(),b;for(b in a)re(a[b]);cd("TIMING_TICK_EXPIRATION",{})}
;function De(a,b){ue.call(this,1,arguments)}
aa(De,ue);function Ee(a,b){ue.call(this,1,arguments)}
aa(Ee,ue);var Fe=new ve("aft-recorded"),Ge=new ve("timing-sent");var Z=window.performance||window.mozPerformance||window.msPerformance||window.webkitPerformance||{};var He=ta().toString();var Ie={vc:!0},Je={ad_at:"adType",ad_cpn:"adClientPlaybackNonce",ad_docid:"adVideoId",cpn:"clientPlaybackNonce",csn:"clientScreenNonce",docid:"videoId",is_nav:"isNavigation",yt_lt:"loadType",yt_ad:"isMonetized",plid:"videoId",fmt:"playerInfo.itag",yt_ad_pr:"prerollAllowed",yt_red:"isRedSubscriber",st:"serverTimeMs",vph:"viewportHeight",vpw:"viewportWidth",yt_vis:"isVisible"},Ke="ap c cver ei srt yt_fss yt_li GetBrowse_rid GetPlayer_rid GetSearch_rid GetWatchNext_rid ad_allowed ad_docid ba cmt ncnp nr p pa paused pc prerender psc rc start vpil vpni vps yt_abt yt_ad_an yt_eil yt_fn yt_fs yt_pft yt_pl yt_pre yt_pt yt_pvis yt_ref yt_sts".split(" "),
Le=["isNavigation","isMonetized","prerollAllowed","isRedSubscriber","isVisible"],Me=!1;
function Ne(a){if("_"!=a[0]){var b=a;Z.mark&&(0==b.lastIndexOf("mark_",0)||(b="mark_"+b),Z.mark(b))}b=Oe();var c=S();b[a]&&(b["_"+a]=b["_"+a]||[b[a]],b["_"+a].push(c));b[a]=c;b=Be();if(c=b[a])re(c),b[a]=0;Pe()["tick_"+a]=void 0;S();W("csi_on_gel")?(b=Qe(),"_start"==a?te("baseline_"+b)||me("latencyActionBaselined",{clientActionNonce:b},void 0):te("tick_"+a+"_"+b)||me("latencyActionTicked",{tickName:a,clientActionNonce:b},void 0),a=!0):a=!1;if(a=!a)a=!r("yt.timing.pingSent_");if(a&&(b=U("TIMING_ACTION"),
a=Oe(),r("ytglobal.timingready_")&&b&&a._start&&(b=Re()))){W("tighter_critical_section")&&!Me&&(Ae(Fe,new De(Math.round(b-a._start),void 0)),Me=!0);b=!0;c=T("TIMING_WAIT",[]);if(c.length)for(var d=0,e=c.length;d<e;++d)if(!(c[d]in a)){b=!1;break}b&&Se()}}
function Te(){var a=Ue().info.yt_lt="hot_bg";Pe().info_yt_lt=a;if(W("csi_on_gel"))if("yt_lt"in Je){var b={},c=Je.yt_lt.split(".");Qa(Le,c)&&(a=!!a);for(var d=b,e=0;e<c.length-1;e++)d[c[e]]=d[c[e]]||{},d=d[c[e]];b[c[c.length-1]]=a;a=Qe();c=Object.keys(b).join("");te("info_"+c+"_"+a)||(b.clientActionNonce=a,me("latencyActionInfo",b))}else Qa(Ke,"yt_lt")||dd(Error("Unknown label yt_lt logged with GEL CSI."))}
function Re(){var a=Oe();if(a.aft)return a.aft;for(var b=T("TIMING_AFT_KEYS",["ol"]),c=b.length,d=0;d<c;d++){var e=a[b[d]];if(e)return e}return NaN}
function Se(){Ce();if(!W("csi_on_gel")){var a=Oe(),b=Ue().info,c=a._start,d;for(d in a)if(0==d.lastIndexOf("_",0)&&v(a[d])){var e=d.slice(1);if(e in Ie){var f=Pa(a[d],function(a){return Math.round(a-c)});
b["all_"+e]=f.join()}delete a[d]}e=!!b.ap;if(f=r("ytglobal.timingReportbuilder_")){if(f=f(a,b,void 0))Ve(f,e),We(),Xe(),Ye(!1,void 0),T("TIMING_ACTION")&&cd("PREVIOUS_ACTION",T("TIMING_ACTION")),cd("TIMING_ACTION","")}else{var g=T("CSI_SERVICE_NAME","youtube");f={v:2,s:g,action:T("TIMING_ACTION",void 0)};var h=b.srt;void 0!==a.srt&&delete b.srt;if(b.h5jse){var k=window.location.protocol+r("ytplayer.config.assets.js");(k=Z.getEntriesByName?Z.getEntriesByName(k)[0]:null)?b.h5jse=Math.round(b.h5jse-
k.responseEnd):delete b.h5jse}a.aft=Re();Ze()&&"youtube"==g&&(Te(),g=a.vc,k=a.pbs,delete a.aft,b.aft=Math.round(k-g));for(var l in b)"_"!=l.charAt(0)&&(f[l]=b[l]);a.ps=S();b={};l=[];for(d in a)"_"!=d.charAt(0)&&(g=Math.round(a[d]-c),b[d]=g,l.push(d+"."+g));f.rt=l.join(",");(a=r("ytdebug.logTiming"))&&a(f,b);Ve(f,e,void 0);Ae(Ge,new Ee(b.aft+(h||0),void 0))}}}
var Xe=w(Z.clearResourceTimings||Z.webkitClearResourceTimings||Z.mozClearResourceTimings||Z.msClearResourceTimings||Z.oClearResourceTimings||ma,Z);
function Ve(a,b,c){if(W("debug_csi_data")){var d=r("yt.timing.csiData");d||(d=[],x("yt.timing.csiData",d));d.push({page:location.href,time:new Date,args:a})}d="";for(var e in a)d+="&"+e+"="+a[e];a="/csi_204?"+d.substring(1);if(window.navigator&&window.navigator.sendBeacon&&b)try{window.navigator&&window.navigator.sendBeacon&&window.navigator.sendBeacon(a,"")||V(a,void 0)}catch(f){V(a,void 0)}else V(a);Ye(!0,c)}
function Qe(){var a=Ue().nonce;if(!a){a:{if(window.crypto&&window.crypto.getRandomValues)try{var b=Array(16),c=new Uint8Array(16);window.crypto.getRandomValues(c);for(a=0;a<b.length;a++)b[a]=c[a];var d=b;break a}catch(e){}d=Array(16);for(b=0;16>b;b++){c=ta();for(a=0;a<c%23;a++)d[b]=Math.random();d[b]=Math.floor(256*Math.random())}if(He)for(b=1,c=0;c<He.length;c++)d[b%16]=d[b%16]^d[(b-1)%16]/4^He.charCodeAt(c),b++}b=[];for(c=0;c<d.length;c++)b.push("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_".charAt(d[c]&
63));a=b.join("");Ue().nonce=a}return a}
function Oe(){return Ue().tick}
function Pe(){var a=Ue();"gel"in a||(a.gel={});return a.gel}
function Ue(){return r("ytcsi.data_")||We()}
function We(){var a={tick:{},info:{}};x("ytcsi.data_",a);return a}
function Ye(a,b){x("yt.timing."+(b||"")+"pingSent_",a)}
function Ze(){var a=Oe(),b=a.pbr,c=a.vc;a=a.pbs;return b&&c&&a&&b<c&&c<a&&1==Ue().info.yt_pvis}
;function $e(a,b,c,d){H.call(this);this.h=a;this.f=b;this.A=c;this.l=d;this.g=O("DIV",{"class":"ads-mute-button"});wc(this.g);this.b=O("DIV");kc(this.b,af(this));this.m=N("ads-mute-undo",this.b);je(this.g,w(this.C,this));this.h.firstElementChild.appendChild(this.g);a=bb(this.f.mute_survey);Ta(a);B(a,function(a){var b=O("INPUT",{"class":"yt-uix-form-input-radio",type:"radio"}),c=O("SPAN",{"class":"yt-uix-form-input-radio-element"});b=O("SPAN",{"class":"yt-uix-form-input-radio-container"},b,c);b=O("LABEL",
"ads-mute-option",b,a);je(b,w(this.D,this,this.f.mute_survey[a]));this.b.firstChild.appendChild(b)},this);
je(this.b,ke);je(this.m,w(this.B,this));Sd(this.dispose,this)}
ua($e,H);function af(a){var b=a.f.mute_gone||jc,c=a.f.mute_question||jc;a=a.f.mute_undo||jc;return hc("div",{"class":"ads-mute-survey"},ic(hc("span",{"class":"ads-mute-check"}),hc("b",{},b)," ",c,hc("div",{"class":"ads-mute-undo"},a)))}
$e.prototype.M=function(){B(mc("ads-mute-option",this.b),function(a){le(a)});
le(this.g);uc(this.g);le(this.b);uc(this.b);le(this.m)};
$e.prototype.C=function(a){a.stopPropagation();a.preventDefault();this.l&&V(this.f.mute_url);this.h.firstElementChild.appendChild(this.b);Lb(vc(this.b),"contains-mute-survey")};
$e.prototype.B=function(a){a.stopPropagation();a.preventDefault();this.f.mute_undo_url&&this.l&&V(this.f.mute_undo_url);Mb(vc(this.b));uc(this.b)};
$e.prototype.D=function(a,b){b.stopPropagation();b.preventDefault();this.l&&V(a);uc(this.h);this.A();this.dispose()};var bf,cf,df=[];function ef(a,b){bf=Gd(a);cf=Gd(b)}
function ff(a){B(a,function(a){var b=a.media_template_data[0];a.line1=z(a.line1);a.line2=z(a.line2);a.line3=z(a.line3);a.url=z(a.url);b.imageUrl=z(b.imageUrl);a.display_name||"UC"!=b.channelName.substr(0,2)||(b.channelName="");b.channelName=z(a.display_name?a.display_name:b.channelName);b.imageUrl&&(b.imageUrl=b.imageUrl.replace(/http(s)?:/,""));b.imageUrl&&-1!=b.imageUrl.indexOf("/vi/")&&(b.imageUrl=b.imageUrl.replace(/([mh]q)?default\.jpg/,"mqdefault.jpg"),b.imageUrl=b.imageUrl.replace(/\/([mh]q)?([1-9])\.jpg/,
"/hq$2.jpg"));var d=a.duration/1E3;b=Math.floor(d/3600);var e=d%3600;d=Math.floor(e/60);e%=60;b=b?xa("%s:%s:%s",b.toString(),La(d),La(e)):xa("%s:%s",d.toString(),La(e));a.duration=b})}
function gf(a,b,c){var d=document.createElement("div"),e=a.media_template_data[0],f="";a.view_count&&(f=(new Hc(1)).format(a.view_count));d.innerHTML=Hd(bf,{title:a.line1,second_line:a.line2,third_line:a.line3,url:a.url,views:f,length_seconds:a.duration,video_id:e.videoId,channel_name:e.channelName,channel_url:"//"+a.visible_url,thumbnail_url:e.imageUrl});var g=N("yt-lockup-meta-info",d);f||(g.lastElementChild.style.display="none");e.channelName||(e=N("yt-lockup-byline",d),f=N("ad-badge-byline",e),
null!=e&&(tc(e),rc(e,f)));a.view_url&&V(a.view_url);b&&new $e(d,a,hf,c);return d}
function hf(){var a=N("pyv-afc-ads-container");0==mc("ads-mute-button",a).length&&uc(N("ad-info-container",a))}
function jf(a,b,c){var d=document.createElement("div"),e=a.media_template_data[0];d.innerHTML=Hd(cf,{title:a.line1,second_line:a.line2,third_line:a.line3,url:a.url,channel_name:e.channelName,channel_url:"//"+a.visible_url,thumbnail_url:e.imageUrl});b&&new $e(d,a,hf,c);return d}
function kf(a,b){ef(N("pyv-afc-ads-video-template",b),N("pyv-afc-ads-channel-template",b));var c=N("pyv-afc-ads-inner",b);B(a,function(a){var d=!T("SEARCH_PYV_DISABLE_MUTE")&&a.mute_url&&a.mute_survey,f=!T("SEARCH_PYV_DISABLE_MUTE_PINGS");d&&Lb(b,"pyv-afc-mute");a.media_template_data[0].videoId?c.appendChild(gf(a,d,f)):c.appendChild(jf(a,d,f));d=a.creative_view_url;/^[\s\xa0]*$/.test(null==d?"":String(d))||(a=z(a.creative_view_url),Qa(df,a)||df.push(a))})}
function lf(a){ff(a);var b=N("pyv-afc-ads-container");if(b){if("results"==b.parentNode.id){var c=N("branded-page-v2-subnav-container",b.parentNode);if(c){var d=O("LI");d.appendChild(b);c.parentNode&&c.parentNode.insertBefore(d,c.nextSibling)}}kf(a,b);Cd(b);B(df,function(a){var b=void 0===b?!1:b;if(!(b=Bd(yd.test(a),a,b,"Active View 3rd Party Integration URL"))){var c=void 0===c?!1:c;b=Bd(zd.test(a),a,c,"Google/YouTube Brand Lift URL")}if(!(c=b)){var d=void 0===d?!1:d;c=Bd(Ad.test(a),a,d,"Nielsen OCR URL")}V(a,
void 0,c)})}Cd("results")}
;x("yt.www.ads.pyvsearch.pyvSearchTopAfcCallback",function(a){var b=N("pyv-afc-ads-container");a.length&&b?(Ne("afcs"),lf(a)):Cd("results");Ne("afc")});}).call(this);
