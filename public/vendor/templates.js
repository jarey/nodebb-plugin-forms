"use strict";!function(e){function n(e,n,r,s){$++,$>B&&($=0),n=t(n),N.postMessage({template:e,object:n,block:r,signature:$}),D[$]=function(e){s(e),delete D[$]}}function t(e){for(var n in e)e.hasOwnProperty(n)&&"function"!=typeof e[n]||delete e[n];return e}function r(e,t,r,i){N?n(e,t,r,i):i(s(r,e,t))}function s(e,n,t){return e=e?k.getBlock(n,e):n,n=x(e,t),m(n,n,t)}function i(e,n,t){var r=require("fs"),s=e.replace(n.settings.views+"/","");return n._locals=null,k.cache[s]?t(null,k.parse(k.cache[s],n)):void r.readFile(e,function(e,r){return k.cache[s]=(r||"").toString(),t(e,k.parse(k.cache[s],n))})}function a(e,n,t){return e.replace(n,t.toString().replace(R.backReferenceFix,"$$$"))}function o(e,n,t){var r=c(n);return a(e,new RegExp("{"+r+"}","g"),t)}function c(e){var n="";"!"===e.substring(0,1)&&(n="!",e=e.substring(1));for(var t=e.split("."),r=t.pop(),s=[];t.length;)s.push(t.join(".")+"."),t.shift();return s=s?"("+s.join("|")+")?"+r:r,n+s}function l(e,n){return n="("+n+")?",new RegExp("[\\t ]*<!--[\\s]*BEGIN "+n+e+"[\\s]*-->[\\s\\S]*?<!--[\\s]*END "+n+e+"[\\s]*-->")}function u(e,n){return n="("+n+")?",new RegExp("([\\t ]*<!--[\\s]*BEGIN "+n+e+"[\\s]*-->[\\r\\n?|\\n]?)|(<!--[\\s]*END "+n+e+"[\\s]*-->)","g")}function f(e){var n=c(e);return new RegExp("<!--[\\s]*IF "+n+"[\\s]*-->([\\s\\S]*?)<!--[\\s]*ENDIF "+n.split(",")[0]+"[\\s]*-->","g")}function p(e){var n=c(e);return new RegExp("(<!--[\\s]*IF "+n+"[\\s]*-->)|(<!--[\\s]*ENDIF "+n.split(",")[0]+"[\\s]*-->)","g")}function g(e){for(var n in k.globals)k.globals.hasOwnProperty(n)&&(e[n]=e[n]||k.globals[n]);return e}function d(e,n,t,r){return h(h(e,"!"+n,!t,r),n,t,r)}function h(e,n,t){var r=e.match(f(n));if(null!==r)for(var s=0,i=r.length;i>s;s++){var o=p(n),c=r[s].match(R.nestedConditionals),l=a(r[s].replace(o,""),R.nestedConditionals,"<!-- NESTED -->"),u=l.split(R.conditionalBlock);if(e=u[1]?a(e,r[s],a(u[t?0:1],R.removeWhitespace,"")):a(e,r[s],t?a(l,R.removeWhitespace,""):""),c)for(var g=0,d=c.length;d>g;g++)e=a(e,"<!-- NESTED -->",c[g])}return e}function v(e,n){for(var t,r;null!==(t=e.match(R.conditionalHelper));){var s=t[1].trim(),i=s.split(/[ ]*,[ ]*/);r=i[0],F[r]?(i.shift(),i.unshift(n),e=d(e,"function."+s,F[r].apply(null,i),"dev")):e=e.replace(f("function."+s))}return e}function E(e,n){return e.apply(k,n)}function m(e,n,t){var r=e.match(/{function.*?}/gi,"");if(!r)return n;for(var s=0,i=r.length;i>s;++s){var o=r[s],c=r[s].replace("{function.","").split("}").shift().split(/[ ]*,[ ]*/),l=c.shift(),u=[];if(c.length)for(var f=0,p=c.length;p>f;f++)u.push(t[c[f]]);else u=[t];F[l]&&(n=a(n,new RegExp(o,"gi"),E(F[l],u)))}return n}function y(e,n,t,r,s){e=d(e,r+t+".length",n[t].length);var i,o,c=l(t,r);if(!n[t].length&&!s)return e.replace(c,"");for(;null!==(i=e.match(c));)i=i[0].replace(u(t,r),""),o=b(e,i,n[t],r+t+".",s),e=a(e,c,o.replace(R.removeWhitespace,""));return e}function b(e,n,t,r,s){var i=t.length-1,a="";for(var o in t)t.hasOwnProperty(o)&&(s||(o=parseInt(o,10)),a+=x(n,t[o],r),s||(a=d(a,"@first",0===o),a=d(a,"@last",o===i)),a=a.replace(R.removeTabspace,""),a=s?a.replace("@key",o).replace("@value",t[o]):a.replace("@index",o),a=m(n,a,t[o]));return a}function w(e,n,t){return e=d(e,n,t),o(e,n,t)}function x(e,n,t){t=t||"";for(var r in n)if(n.hasOwnProperty(r)){if("undefined"==typeof n[r]||"function"==typeof n[r])continue;null===n[r]?e=o(e,t+r,""):n[r].constructor===Array?(e=o(e,t+r+".length",n[r].length),e=y(e,n,r,t)):n[r]instanceof Object?(e=d(e,r,n[r]),e=x(e,n[r],t+r+".")):e=w(e,t+r,n[r])}return t?(e=e.replace(new RegExp("{"+t+"\\.[\\s\\S]*?}","g"),""),t=""):(e=v(e,n),e=S(e)),e}function S(e){var n;e=e.replace(R.cleanupEmptyLoops,"");for(var t=e;null!==(n=R.cleanupMissingKeys.exec(e));)t="/"!==n[0].substr(0,1)?t.replace(n[0],""):t.replace(n[0],n[0].slice(1));e=t;for(var r,s,i={};null!==(r=R.getUndefinedKeys.exec(e));)i[r[1]]=!1,s=!0;return s?x(e,i,""):e}var I,N,k={cache:{},globals:{}},F={},R={nestedConditionals:/(?!^)<!-- IF([\s\S]*?)ENDIF[ a-zA-Z0-9\._:]*-->(?!$)/gi,conditionalBlock:/[\r\n?\n]*?<!-- ELSE -->[\r\n?\n]*?/,conditionalHelper:/<!-- IF function.([\s\S]*?)-->/i,removeTabspace:/^\t*?|^\r\n?\t*?|\t?$|\r\n?\t*?$/g,removeWhitespace:/(^[\r\n?|\n]*)|([\r\n\t]*$)/g,cleanupEmptyLoops:/\s*<!-- BEGIN([\s\S]*?)END ([\s\S]*?)-->/gi,cleanupMissingKeys:/[\r\n]*?[\/]?\{[a-zA-Z0-9\.]+[\r\n]*?\}/g,getUndefinedKeys:/<!-- IF[\s!]*([\s\S]*?)[\s]*-->/gi,backReferenceFix:/\$+/g};"undefined"!=typeof self&&self.addEventListener&&self.addEventListener("message",function(e){var n=e.data;self.postMessage({result:n.block?k.parse(n.template,n.block,n.object):k.parse(n.template,n.object),signature:n.signature})},!1);var D={},$=0,B=Math.pow(2,53)-1;k.setupWebWorker=function(e){try{N=new Worker(e),N.addEventListener("message",function(e){D[e.data.signature]&&D[e.data.signature](e.data.result)},!1)}catch(n){}},k.parse=function(e,n,t,i){if("string"!=typeof n&&(i=t,t=n,n=!1),!e)return i?i(""):"";if(t=g(t||{}),I&&i)k.cache[e]?r(k.cache[e],t,n,i):I(e,function(s){k.cache[e]=s,r(s,t,n,i)});else{if(!i)return s(n,e,t);r(e,t,n,i)}},k.registerHelper=function(e,n){F[e]=n},k.registerLoader=function(e){I=e},k.setGlobal=function(e,n){k.globals[e]=n},k.getBlock=function(e,n){return e.replace(new RegExp("[\\s\\S]*(<!--[\\s]*BEGIN "+n+"[\\s]*-->[\\s\\S]*?<!--[\\s]*END "+n+"[\\s]*-->)[\\s\\S]*","g"),"$1")},k.flush=function(){k.cache={}},e.exports=k,e.exports.__express=i,"undefined"!=typeof window&&(window.templates=e.exports)}("undefined"==typeof module?{module:{exports:{}}}:module);