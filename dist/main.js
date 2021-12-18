(()=>{"use strict";function e(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function t(t){return e(1,arguments),t instanceof Date||"object"==typeof t&&"[object Date]"===Object.prototype.toString.call(t)}function n(t){e(1,arguments);var n=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===n?new Date(t.getTime()):"number"==typeof t||"[object Number]"===n?new Date(t):("string"!=typeof t&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function r(r){if(e(1,arguments),!t(r)&&"number"!=typeof r)return!1;var a=n(r);return!isNaN(Number(a))}var a={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function o(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.width?String(t.width):e.defaultWidth,r=e.formats[n]||e.formats[e.defaultWidth];return r}}var i,u={date:o({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:o({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:o({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},d={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function s(e){return function(t,n){var r,a=n||{};if("formatting"===(a.context?String(a.context):"standalone")&&e.formattingValues){var o=e.defaultFormattingWidth||e.defaultWidth,i=a.width?String(a.width):o;r=e.formattingValues[i]||e.formattingValues[o]}else{var u=e.defaultWidth,d=a.width?String(a.width):e.defaultWidth;r=e.values[d]||e.values[u]}return r[e.argumentCallback?e.argumentCallback(t):t]}}function c(e){return function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.width,a=r&&e.matchPatterns[r]||e.matchPatterns[e.defaultMatchWidth],o=t.match(a);if(!o)return null;var i,u=o[0],d=r&&e.parsePatterns[r]||e.parsePatterns[e.defaultParseWidth],s=Array.isArray(d)?h(d,(function(e){return e.test(u)})):l(d,(function(e){return e.test(u)}));i=e.valueCallback?e.valueCallback(s):s,i=n.valueCallback?n.valueCallback(i):i;var c=t.slice(u.length);return{value:i,rest:c}}}function l(e,t){for(var n in e)if(e.hasOwnProperty(n)&&t(e[n]))return n}function h(e,t){for(var n=0;n<e.length;n++)if(t(e[n]))return n}const f={code:"en-US",formatDistance:function(e,t,n){var r,o=a[e];return r="string"==typeof o?o:1===t?o.one:o.other.replace("{{count}}",t.toString()),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r},formatLong:u,formatRelative:function(e,t,n,r){return d[e]},localize:{ordinalNumber:function(e,t){var n=Number(e),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:s({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:s({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:s({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:s({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:s({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(i={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.match(i.matchPattern);if(!n)return null;var r=n[0],a=e.match(i.parsePattern);if(!a)return null;var o=i.valueCallback?i.valueCallback(a[0]):a[0];o=t.valueCallback?t.valueCallback(o):o;var u=e.slice(r.length);return{value:o,rest:u}}),era:c({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:c({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:c({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:c({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:c({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function m(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function g(t,r){e(2,arguments);var a=n(t).getTime(),o=m(r);return new Date(a+o)}function w(t,n){e(2,arguments);var r=m(n);return g(t,-r)}function v(e,t){for(var n=e<0?"-":"",r=Math.abs(e).toString();r.length<t;)r="0"+r;return n+r}const y=function(e,t){var n=e.getUTCFullYear(),r=n>0?n:1-n;return v("yy"===t?r%100:r,t.length)},p=function(e,t){var n=e.getUTCMonth();return"M"===t?String(n+1):v(n+1,2)},b=function(e,t){return v(e.getUTCDate(),t.length)},T=function(e,t){return v(e.getUTCHours()%12||12,t.length)},C=function(e,t){return v(e.getUTCHours(),t.length)},D=function(e,t){return v(e.getUTCMinutes(),t.length)},M=function(e,t){return v(e.getUTCSeconds(),t.length)},k=function(e,t){var n=t.length,r=e.getUTCMilliseconds();return v(Math.floor(r*Math.pow(10,n-3)),t.length)};var x=864e5;function S(t){e(1,arguments);var r=1,a=n(t),o=a.getUTCDay(),i=(o<r?7:0)+o-r;return a.setUTCDate(a.getUTCDate()-i),a.setUTCHours(0,0,0,0),a}function P(t){e(1,arguments);var r=n(t),a=r.getUTCFullYear(),o=new Date(0);o.setUTCFullYear(a+1,0,4),o.setUTCHours(0,0,0,0);var i=S(o),u=new Date(0);u.setUTCFullYear(a,0,4),u.setUTCHours(0,0,0,0);var d=S(u);return r.getTime()>=i.getTime()?a+1:r.getTime()>=d.getTime()?a:a-1}function E(t){e(1,arguments);var n=P(t),r=new Date(0);r.setUTCFullYear(n,0,4),r.setUTCHours(0,0,0,0);var a=S(r);return a}var U=6048e5;function W(t,r){e(1,arguments);var a=r||{},o=a.locale,i=o&&o.options&&o.options.weekStartsOn,u=null==i?0:m(i),d=null==a.weekStartsOn?u:m(a.weekStartsOn);if(!(d>=0&&d<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var s=n(t),c=s.getUTCDay(),l=(c<d?7:0)+c-d;return s.setUTCDate(s.getUTCDate()-l),s.setUTCHours(0,0,0,0),s}function Y(t,r){e(1,arguments);var a=n(t),o=a.getUTCFullYear(),i=r||{},u=i.locale,d=u&&u.options&&u.options.firstWeekContainsDate,s=null==d?1:m(d),c=null==i.firstWeekContainsDate?s:m(i.firstWeekContainsDate);if(!(c>=1&&c<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var l=new Date(0);l.setUTCFullYear(o+1,0,c),l.setUTCHours(0,0,0,0);var h=W(l,r),f=new Date(0);f.setUTCFullYear(o,0,c),f.setUTCHours(0,0,0,0);var g=W(f,r);return a.getTime()>=h.getTime()?o+1:a.getTime()>=g.getTime()?o:o-1}function q(t,n){e(1,arguments);var r=n||{},a=r.locale,o=a&&a.options&&a.options.firstWeekContainsDate,i=null==o?1:m(o),u=null==r.firstWeekContainsDate?i:m(r.firstWeekContainsDate),d=Y(t,n),s=new Date(0);s.setUTCFullYear(d,0,u),s.setUTCHours(0,0,0,0);var c=W(s,n);return c}var N=6048e5;function O(e,t){var n=e>0?"-":"+",r=Math.abs(e),a=Math.floor(r/60),o=r%60;return 0===o?n+String(a):n+String(a)+t+v(o,2)}function j(e,t){return e%60==0?(e>0?"-":"+")+v(Math.abs(e)/60,2):L(e,t)}function L(e,t){var n=t||"",r=e>0?"-":"+",a=Math.abs(e);return r+v(Math.floor(a/60),2)+n+v(a%60,2)}const F={G:function(e,t,n){var r=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});default:return n.era(r,{width:"wide"})}},y:function(e,t,n){if("yo"===t){var r=e.getUTCFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return y(e,t)},Y:function(e,t,n,r){var a=Y(e,r),o=a>0?a:1-a;return"YY"===t?v(o%100,2):"Yo"===t?n.ordinalNumber(o,{unit:"year"}):v(o,t.length)},R:function(e,t){return v(P(e),t.length)},u:function(e,t){return v(e.getUTCFullYear(),t.length)},Q:function(e,t,n){var r=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(r);case"QQ":return v(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(e,t,n){var r=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(r);case"qq":return v(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(e,t,n){var r=e.getUTCMonth();switch(t){case"M":case"MM":return p(e,t);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(e,t,n){var r=e.getUTCMonth();switch(t){case"L":return String(r+1);case"LL":return v(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(t,r,a,o){var i=function(t,r){e(1,arguments);var a=n(t),o=W(a,r).getTime()-q(a,r).getTime();return Math.round(o/N)+1}(t,o);return"wo"===r?a.ordinalNumber(i,{unit:"week"}):v(i,r.length)},I:function(t,r,a){var o=function(t){e(1,arguments);var r=n(t),a=S(r).getTime()-E(r).getTime();return Math.round(a/U)+1}(t);return"Io"===r?a.ordinalNumber(o,{unit:"week"}):v(o,r.length)},d:function(e,t,n){return"do"===t?n.ordinalNumber(e.getUTCDate(),{unit:"date"}):b(e,t)},D:function(t,r,a){var o=function(t){e(1,arguments);var r=n(t),a=r.getTime();r.setUTCMonth(0,1),r.setUTCHours(0,0,0,0);var o=r.getTime(),i=a-o;return Math.floor(i/x)+1}(t);return"Do"===r?a.ordinalNumber(o,{unit:"dayOfYear"}):v(o,r.length)},E:function(e,t,n){var r=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(e,t,n,r){var a=e.getUTCDay(),o=(a-r.weekStartsOn+8)%7||7;switch(t){case"e":return String(o);case"ee":return v(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(e,t,n,r){var a=e.getUTCDay(),o=(a-r.weekStartsOn+8)%7||7;switch(t){case"c":return String(o);case"cc":return v(o,t.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(e,t,n){var r=e.getUTCDay(),a=0===r?7:r;switch(t){case"i":return String(a);case"ii":return v(a,t.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(e,t,n){var r=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(e,t,n){var r,a=e.getUTCHours();switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",t){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(e,t,n){var r,a=e.getUTCHours();switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",t){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(e,t,n){if("ho"===t){var r=e.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return T(e,t)},H:function(e,t,n){return"Ho"===t?n.ordinalNumber(e.getUTCHours(),{unit:"hour"}):C(e,t)},K:function(e,t,n){var r=e.getUTCHours()%12;return"Ko"===t?n.ordinalNumber(r,{unit:"hour"}):v(r,t.length)},k:function(e,t,n){var r=e.getUTCHours();return 0===r&&(r=24),"ko"===t?n.ordinalNumber(r,{unit:"hour"}):v(r,t.length)},m:function(e,t,n){return"mo"===t?n.ordinalNumber(e.getUTCMinutes(),{unit:"minute"}):D(e,t)},s:function(e,t,n){return"so"===t?n.ordinalNumber(e.getUTCSeconds(),{unit:"second"}):M(e,t)},S:function(e,t){return k(e,t)},X:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();if(0===a)return"Z";switch(t){case"X":return j(a);case"XXXX":case"XX":return L(a);default:return L(a,":")}},x:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"x":return j(a);case"xxxx":case"xx":return L(a);default:return L(a,":")}},O:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+O(a,":");default:return"GMT"+L(a,":")}},z:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+O(a,":");default:return"GMT"+L(a,":")}},t:function(e,t,n,r){var a=r._originalDate||e;return v(Math.floor(a.getTime()/1e3),t.length)},T:function(e,t,n,r){return v((r._originalDate||e).getTime(),t.length)}};function H(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});default:return t.date({width:"full"})}}function z(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});default:return t.time({width:"full"})}}var A={p:z,P:function(e,t){var n,r=e.match(/(P+)(p+)?/)||[],a=r[1],o=r[2];if(!o)return H(e,t);switch(a){case"P":n=t.dateTime({width:"short"});break;case"PP":n=t.dateTime({width:"medium"});break;case"PPP":n=t.dateTime({width:"long"});break;default:n=t.dateTime({width:"full"})}return n.replace("{{date}}",H(a,t)).replace("{{time}}",z(o,t))}};const Q=A;function R(e){var t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),e.getTime()-t.getTime()}var B=["D","DD"],G=["YY","YYYY"];function X(e){return-1!==B.indexOf(e)}function $(e){return-1!==G.indexOf(e)}function I(e,t,n){if("YYYY"===e)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===e)throw new RangeError("Use `yy` instead of `YY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===e)throw new RangeError("Use `d` instead of `D` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===e)throw new RangeError("Use `dd` instead of `DD` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var J=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,_=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,V=/^'([^]*?)'?$/,K=/''/g,Z=/[a-zA-Z]/;function ee(t,a,o){e(2,arguments);var i=String(a),u=o||{},d=u.locale||f,s=d.options&&d.options.firstWeekContainsDate,c=null==s?1:m(s),l=null==u.firstWeekContainsDate?c:m(u.firstWeekContainsDate);if(!(l>=1&&l<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var h=d.options&&d.options.weekStartsOn,g=null==h?0:m(h),v=null==u.weekStartsOn?g:m(u.weekStartsOn);if(!(v>=0&&v<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!d.localize)throw new RangeError("locale must contain localize property");if(!d.formatLong)throw new RangeError("locale must contain formatLong property");var y=n(t);if(!r(y))throw new RangeError("Invalid time value");var p=R(y),b=w(y,p),T={firstWeekContainsDate:l,weekStartsOn:v,locale:d,_originalDate:y},C=i.match(_).map((function(e){var t=e[0];return"p"===t||"P"===t?(0,Q[t])(e,d.formatLong,T):e})).join("").match(J).map((function(e){if("''"===e)return"'";var n=e[0];if("'"===n)return te(e);var r=F[n];if(r)return!u.useAdditionalWeekYearTokens&&$(e)&&I(e,a,t),!u.useAdditionalDayOfYearTokens&&X(e)&&I(e,a,t),r(b,e,d.localize,T);if(n.match(Z))throw new RangeError("Format string contains an unescaped latin alphabet character `"+n+"`");return e})).join("");return C}function te(e){return e.match(V)[1].replace(K,"'")}function ne(t,r){e(2,arguments);var a=n(t),o=n(r),i=a.getTime()-o.getTime();return i<0?-1:i>0?1:i}function re(e){return function(e,t){if(null==e)throw new TypeError("assign requires that input parameter not be null or undefined");for(var n in t=t||{})Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}({},e)}var ae=6e4,oe=1440,ie=43200,ue=525600;function de(t,r){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};e(2,arguments);var o=a.locale||f;if(!o.formatDistance)throw new RangeError("locale must contain localize.formatDistance property");var i=ne(t,r);if(isNaN(i))throw new RangeError("Invalid time value");var u,d,s=re(a);s.addSuffix=Boolean(a.addSuffix),s.comparison=i,i>0?(u=n(r),d=n(t)):(u=n(t),d=n(r));var c,l=null==a.roundingMethod?"round":String(a.roundingMethod);if("floor"===l)c=Math.floor;else if("ceil"===l)c=Math.ceil;else{if("round"!==l)throw new RangeError("roundingMethod must be 'floor', 'ceil' or 'round'");c=Math.round}var h,m=d.getTime()-u.getTime(),g=m/ae,w=R(d)-R(u),v=(m-w)/ae;if("second"===(h=null==a.unit?g<1?"second":g<60?"minute":g<oe?"hour":v<ie?"day":v<ue?"month":"year":String(a.unit))){var y=c(m/1e3);return o.formatDistance("xSeconds",y,s)}if("minute"===h){var p=c(g);return o.formatDistance("xMinutes",p,s)}if("hour"===h){var b=c(g/60);return o.formatDistance("xHours",b,s)}if("day"===h){var T=c(v/oe);return o.formatDistance("xDays",T,s)}if("month"===h){var C=c(v/ie);return 12===C&&"month"!==a.unit?o.formatDistance("xYears",1,s):o.formatDistance("xMonths",C,s)}if("year"===h){var D=c(v/ue);return o.formatDistance("xYears",D,s)}throw new RangeError("unit must be 'second', 'minute', 'hour', 'day', 'month' or 'year'")}let se=[le("temptodo","TEmp todo for testing","12/11/2022","12:12",void 0)],ce=[he("Today","To-Dos that are due today.",void 0,void 0,void 0),he("7 Days","To-Dos that are due in 7 days.",void 0,void 0,void 0),he("29 Days","To-Dos that are due in 30 days.",void 0,void 0,void 0),he("29+ Days","To-Dos that are due after 30 days.",void 0,void 0,void 0),he("Misc","Miscellaneous todos",void 0,void 0,void 0)];function le(e,t,n,r,a){let o="";return o=""===n&&""===r?"whenever":""===r?new Date(Date.parse(`${n} 00:00`)):""===n?new Date(Date.parse(`${ee(new Date,"yyyy/MM/dd")} ${r}`)):new Date(Date.parse(`${n} ${r}`)),{title:e,desc:t,datedue:o,priority:a}}function he(e,t,n,r,a,o){let i="";return i=""===n&&""===r?"whenever":""===r?new Date(Date.parse(`${n} 00:00`)):""===n?new Date(Date.parse(`${ee(new Date,"yyyy/MM/dd")} ${r}`)):new Date(Date.parse(`${n} ${r}`)),{title:e,desc:t,datedue:i,priority:a,todos:[],number:o}}const fe=(()=>{function e(e){let t=document.querySelector("#dateinput"),n=document.querySelector("#datelabel"),r=document.querySelector("#timeinput"),a=document.querySelector("#timelabel");"Whenever"==e?(t.style.display="none",n.style.display="none",r.style.display="none",a.style.display="none"):(t.style.display="block",n.style.display="block",r.style.display="block",a.style.display="block")}function t(e){e.srcElement.parentNode.remove()}function n(){for(let e=0;e<5;e++)ce[e].todos=[];for(let e=0;e<se.length;e++){let t=[];try{switch(t=de(new Date,se[e].datedue).split(" "),t[1]){case"seconds":case"minutes":case"hours":ce[0].todos.push(se[e]);break;case"days":parseInt(t[0])<=7?ce[1].todos.push(se[e]):ce[2].todos.push(se[e]);break;default:ce[3].todos.push(se[e])}}catch{ce[4].todos.push(se[e])}}}return{appendForm:function(r){let a=document.querySelector("#content"),o=function(t){let n=document.createElement("form");n.id="todoform";let r=["title","desc","date","date","pickdate","picktime","important"],a=["text","text","radio","radio","date","time","checkbox","button","button"],o=["Enter The Name","To-Do Description","Whenever","Specific date","Pick a date","Pick a time","Important?","Close","Create"];!0===t&&(o[1]="Project Description");for(let i=0;i<a.length;i++)if(i<a.length-2){let u=document.createElement("input"),d=document.createElement("label");if(u.name=r[i],d.for=r[i],d.textContent=o[i],u.type=a[i],2==i){let e=document.createElement("p");e.textContent=t?"when does the project need finishing?":"when does the to-do need finishing?",u.checked=!0,n.appendChild(e)}i>1&&i<4?(u.label=o[i],u.addEventListener("change",(t=>{e(t.originalTarget.label)})),n.appendChild(u),n.appendChild(d)):4==i?(u.id="dateinput",d.id="datelabel",u.min=ee(new Date,"yyyy-MM-dd"),u.style.display="none",d.style.display="none",n.appendChild(d),n.appendChild(u)):5==i?(u.id="timeinput",d.id="timelabel",u.min=ee(new Date,"hh:mm"),u.style.display="none",d.style.display="none",n.appendChild(d),n.appendChild(u)):(n.appendChild(d),n.appendChild(u))}else{let e=document.createElement("button");e.type=a[i],e.textContent=o[i],n.appendChild(e)}return n}(r);!function(){let e=document.querySelector("#todoform");null!=e&&e.remove()}(),function(e,r){e[e.length-2].addEventListener("click",(e=>{t(e)})),e[e.length-1].addEventListener("click",(e=>{!function(e){let t=document.querySelector("#todoform");if(!0===e)ce.push(he(t[0].value,t[1].value,t[4].value,t[5].value,t[6].checked)),n();else if(!1===e)se.push(le(t[0].value,t[1].value,t[4].value,t[5].value,t[6].checked)),n();else{let r=le(t[0].value,t[1].value,t[4].value,t[5].value,t[6].checked);ce[e].todos.push(r),se.push(r),n(),me.makeProjectSpace(e)}}(r),me.appendProjects(),t(e)}))}(o,r),a.appendChild(o)}}})(),me=(()=>{function e(e){let n=ce[e].todos,r=document.querySelector("#projecttodos"),a=document.createElement("button");a.textContent="Add To-Do to Project",a.addEventListener("click",(()=>{fe.appendForm(e)})),r.innerHTML="",r.appendChild(a),r.appendChild(t(n))}function t(e){let t=document.createElement("div");for(let n=0;n<e.length;n++){let r=document.createElement("div");r.textContent=e[n].title,r.number=n,t.appendChild(r)}return t}return{appendProjects:function(){let n=document.querySelector("#projectsarea"),r=t(ce);n.innerHTML="",function(t){for(let n=0;n<t.children.length;n++)t.children[n].addEventListener("click",(t=>{e(t.srcElement.number)}))}(r),n.appendChild(r)},makeProjectSpace:e}})();let ge=fe.appendForm,we=document.querySelector("#todobtn"),ve=document.querySelector("#probtn");document.querySelector("#projectsbtn"),we.addEventListener("click",(()=>{ge(!1)})),ve.addEventListener("click",(()=>{ge(!0)}))})();