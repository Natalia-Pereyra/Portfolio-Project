if (self.CavalryLogger) { CavalryLogger.start_js(["Pc8YGhj"]); }

__d("MAjaxifyFormTypes",[],(function(a,b,c,d,e,f){e.exports={PAGELOAD:"pageload",NOCACHE:"nocache",CACHE:"cache"}}),null);
__d("MAjaxify",["CSS","DOM","ErrorUtils","LoadingIndicator","MAjaxifyFormTypes","MHistory","MLegacyDataStore","MPageCache","MPageControllerPath","MRequest","MRequestTypes","Stratcom","URI"],(function(a,b,c,d,e,f){var g,h,i={postprocess:function(a){b("MPageCache").addCachedIUIResponse(b("MPageControllerPath").getRequestPath(),a.response)}};function j(a,b){return(" "+a.className+" ").indexOf(" "+b+" ")>-1}function k(a,b){while(a&&!j(a,b))a=a.parentNode;return a}function l(a,c,d,e,f){e=e||"async_elem";a&&(a.preventDefault(),a.stopPropagation());if(c){var g=k(c,e)||c,h=e+"_saving";if(j(g,h))return!1;b("CSS").conditionClass(g,e+"_preprocess",!0);a=function(a){b("CSS").conditionClass(g,e,!a),b("CSS").conditionClass(g,h,a),b("Stratcom").invoke(a?"m:ajax:saving:start":"m:ajax:saving:complete",null,g)};d.listen("start",a.bind(null,!0));d.listen("finally",a.bind(null,!1))}d.setType(b("MRequestTypes").INDEPENDENT);for(var c=0,a=f.length;c<a;c++){var i=f[c];for(var l in i)d.listen(l,i[l])}d.send();return!1}var m=["input","textarea","select","button","object"];function n(a,c){for(var d=0;d<m.length;d++){var e=b("DOM").scry(a,m[d]);for(var f=0;f<e.length;f++){var g=b("MLegacyDataStore").get(e[f]);c?(g.wasDisabled=e[f].disabled,e[f].disabled=!0):e[f].disabled=g.wasDisabled}}}function o(a,c,d){this.start=function(){if(d)return;n(a,!0)},this.process=function(b){if(d)return;n(a,!1);a.reset();if(document.createEvent&&a.dispatchEvent){b=document.createEvent("HTMLEvents");b.initEvent("reset",!0,!0);a.dispatchEvent(b)}},this.error=this.fail=function(d){n(a,!1),c==b("MAjaxifyFormTypes").PAGELOAD&&b("LoadingIndicator").hide()},this.postprocess=function(a){c==b("MAjaxifyFormTypes").PAGELOAD&&b("LoadingIndicator").hide(),c==b("MAjaxifyFormTypes").CACHE&&i.postprocess(a),b("Stratcom").invoke("m:ajax:complete")}}var p=null;document.addEventListener("click",function(a){a=a.target;(a.tagName==="INPUT"||a.tagName==="BUTTON")&&a.type=="submit"&&(p=a)},!0);function q(a,b,c,d,e){return l(a,b,c,d,e?[i].concat(e):[i])}function a(a,c,d,e){return!c||(a.which||a.button)>=2?!0:q(a,a.target,new(b("MRequest"))(c),d,e)}function c(a,c,d,e,f,i,j,k,m){m===void 0&&(m=!1);return(g||(g=b("ErrorUtils"))).guard(function(){if(!c||!c.hasAttribute("action")||c.getAttribute("action")==="")return!0;var g=b("DOM").convertFormToDictionary(c);p&&(g[p.name]=p.value,p=null);var k=new(b("MRequest"))(c.getAttribute("action"));k.processResponseAfterPageTransitions=m;k.addData(g);k.setMethod(c.method||"POST");var n=null;if(e===b("MAjaxifyFormTypes").PAGELOAD){if(c.method.toUpperCase()==="GET"){g=new(h||(h=b("URI")))(c.getAttribute("action")).qualify().addQueryData(g);b("MHistory").pushState(g)}b("LoadingIndicator").show()}else n=i?null:f||c;j||(j=[]);j.push(new o(c,e,i));b("Stratcom").invoke("MAjaxify.form.ajax.start","",k);return l(a,n,k,d,j)},"MAjaxify.form")()}f.ajaxify=q;f.form=c;f.link=a}),null);
__d("legacy:m-ajaxify-js",["MAjaxify"],(function(a,b,c,d,e,f){a.MAjaxify=b("MAjaxify")}),3);
__d("InitMAjaxify",["MAjaxify","MLegacyDataStore","MLinkHack","MRequest","Stratcom"],(function(a,b,c,d,e,f){var g={};function h(a){g[a]=g[a]||new RegExp("(^|\\s+)"+a+"(\\s+|$)");return g[a]}function a(a,b){a=a.className||"";return a.match(h(b))}b("Stratcom").listen("click","ajaxify",function(a){a.prevent();var c=a.getNode("ajaxify"),d=c.getAttribute("data-ajaxify-class"),e=c.getAttribute("data-confirm-text");if(e&&!confirm(e))return;var f=b("MLegacyDataStore").get(c);if(f.loading)return;f.loading=!0;e=function(){f&&(f.loading=f.request=null),f=null};var g=function(){b("Stratcom").invoke("m:ajax:complete")};e={"finally":e,postprocess:g};g=b("MLinkHack").remove(c);var h=c.getAttribute("data-ajaxify-href")||c.getAttribute("href");if(c.getAttribute("data-method")==="post"){var i=new(b("MRequest"))(h);i.setAutoRetry(!0);f.request=i;b("MAjaxify").ajaxify(a.getRawEvent(),c,i,d,null)}else b("MAjaxify").link(a.getRawEvent(),h,d,e);g&&b("MLinkHack").add(c)})}),null);
__d("Clipboard",["Promise","UserAgent"],(function(a,b,c,d,e,f,g){function a(){return window.document&&window.document.queryCommandSupported instanceof Function&&window.document.queryCommandSupported("copy")&&!(c("UserAgent").isBrowser("Firefox < 41")||c("UserAgent").isPlatform("iOS < 10.3"))||c("UserAgent").isBrowser("Chrome >= 43")}function h(a,b){b=b||document.body;if(!b)return!1;var d=document.activeElement,e=!0,f=document.createElement("textarea");b.appendChild(f);f.value=a;if(c("UserAgent").isPlatform("iOS >= 10.3")){a=document.createRange();a.selectNodeContents(f);var g=window.getSelection();g.removeAllRanges();g.addRange(a);f.setSelectionRange(0,999999)}else f.select();try{e=document.execCommand("copy")}catch(a){e=!1}b.removeChild(f);d!=null&&d.focus();return e}function d(a){var c=window.navigator;if(c&&c.clipboard&&typeof c.clipboard.writeText==="function")return c.clipboard.writeText(a);return h(a)?b("Promise").resolve():b("Promise").reject()}g.isSupported=a;g.copy=h;g.copyAsync=d}),98);
__d("PlatformLoginModuleWebOauthDialogLoginQPLEvent",["cr:1968"],(function(a,b,c,d,e,f,g){"use strict";g["default"]=b("cr:1968")}),98);
__d("createQPLEvent_DO_NOT_USE",[],(function(a,b,c,d,e,f){"use strict";function a(a,b){return{config:b,markerId:a}}f["default"]=a}),66);
__d("createLegacyQPLEvent_DO_NOT_USE",["QuickLogConfig","createQPLEvent_DO_NOT_USE"],(function(a,b,c,d,e,f,g){"use strict";function a(a){var b=c("QuickLogConfig").qpl_events[a];return c("createQPLEvent_DO_NOT_USE")(a,{r:b==null?void 0:b.sampleRate,m:(a=b==null?void 0:b.samplingMethod)!=null?a:1})}g["default"]=a}),98);
__d("PlatformLoginModuleWebOauthDialogLoginQPLEvent.legacy",["createLegacyQPLEvent_DO_NOT_USE"],(function(a,b,c,d,e,f,g){"use strict";a=c("createLegacyQPLEvent_DO_NOT_USE")(195562276);g["default"]=a}),98);
__d("StoriesModuleStoryViewerLoadTtiWwwQPLEvent",["cr:3987"],(function(a,b,c,d,e,f,g){"use strict";g["default"]=b("cr:3987")}),98);
__d("StoriesModuleStoryViewerLoadTtiWwwQPLEvent.legacy",["createLegacyQPLEvent_DO_NOT_USE"],(function(a,b,c,d,e,f,g){"use strict";a=c("createLegacyQPLEvent_DO_NOT_USE")(13238313);g["default"]=a}),98);
__d("QPLEvent",[],(function(a,b,c,d,e,f){"use strict";function a(a){return a.markerId}function b(a){return(a=(a=a.config)==null?void 0:a.r)!=null?a:0}function c(a){return(a=(a=a.config)==null?void 0:a.m)!=null?a:1}f.getMarkerId=a;f.getSampleRate=b;f.getSamplingMethod=c}),66);