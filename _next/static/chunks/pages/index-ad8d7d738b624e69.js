(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{7650:function(t,n,e){"use strict";e.a(t,(async function(r,i){try{e.d(n,{bL:function(){return T},K8:function(){return S},Ih:function(){return L},yq:function(){return k},gk:function(){return M},ug:function(){return D},j7:function(){return H},yG:function(){return N},hC:function(){return F},Id:function(){return W},Wl:function(){return j},jJ:function(){return R},h6:function(){return O},eY:function(){return C},Ns:function(){return A},Y2:function(){return P},IS:function(){return $},bf:function(){return z},Z4:function(){return G},tL:function(){return K},Qu:function(){return Z},EB:function(){return Y},Yc:function(){return B},XP:function(){return U},rf:function(){return q},Ts:function(){return J},Mz:function(){return V},Zu:function(){return X},_G:function(){return Q},kC:function(){return tt},m_:function(){return nt},Or:function(){return et},oH:function(){return rt}});var o=e(4361);t=e.hmd(t);var c=r([o]);o=(c.then?(await c)():c)[0];const u=new Array(32).fill(void 0);function a(t){return u[t]}u.push(void 0,null,!0,!1);let f=u.length;function s(t){t<36||(u[t]=f,f=t)}function _(t){const n=a(t);return s(t),n}function l(t){f===u.length&&u.push(u.length+1);const n=f;return f=u[n],u[n]=t,n}let g=new("undefined"===typeof TextDecoder?(0,t.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});g.decode();let d=null;function m(){return null!==d&&d.buffer===o.memory.buffer||(d=new Uint8Array(o.memory.buffer)),d}function h(t,n){return g.decode(m().subarray(t,t+n))}let b=0;let y=new("undefined"===typeof TextEncoder?(0,t.require)("util").TextEncoder:TextEncoder)("utf-8");const w="function"===typeof y.encodeInto?function(t,n){return y.encodeInto(t,n)}:function(t,n){const e=y.encode(t);return n.set(e),{read:t.length,written:e.length}};function p(t,n,e){if(void 0===e){const e=y.encode(t),r=n(e.length);return m().subarray(r,r+e.length).set(e),b=e.length,r}let r=t.length,i=n(r);const o=m();let c=0;for(;c<r;c++){const n=t.charCodeAt(c);if(n>127)break;o[i+c]=n}if(c!==r){0!==c&&(t=t.slice(c)),i=e(i,r,r=c+3*t.length);const n=m().subarray(i+c,i+r);c+=w(t,n).written}return b=c,i}let v=null;function x(){return null!==v&&v.buffer===o.memory.buffer||(v=new Int32Array(o.memory.buffer)),v}function E(t,n){try{return t.apply(this,n)}catch(e){o.__wbindgen_exn_store(l(e))}}function I(t,n){return m().subarray(t/1,t/1+n)}const T=Object.freeze({Empty:0,0:"Empty",Tetrion:1,1:"Tetrion",IMino:2,2:"IMino",JMino:3,3:"JMino",LMino:4,4:"LMino",OMino:5,5:"OMino",SMino:6,6:"SMino",TMino:7,7:"TMino",ZMino:8,8:"ZMino"});class S{static __wrap(t){const n=Object.create(S.prototype);return n.ptr=t,n}__destroy_into_raw(){const t=this.ptr;return this.ptr=0,t}free(){const t=this.__destroy_into_raw();o.__wbg_gameio_free(t)}static new(){var t=o.gameio_new();return S.__wrap(t)}width(){return o.gameio_width(this.ptr)>>>0}height(){return o.gameio_height(this.ptr)>>>0}cells_ptr(){return o.gameio_cells_ptr(this.ptr)}get_index(t,n){return o.gameio_get_index(this.ptr,t,n)>>>0}run(){o.gameio_run(this.ptr)}restart(){o.gameio_restart(this.ptr)}update(){o.gameio_update(this.ptr)}is_gameover(){return 0!==o.gameio_is_gameover(this.ptr)}is_pause(){return 0!==o.gameio_is_pause(this.ptr)}is_startup(){return 0!==o.gameio_is_startup(this.ptr)}is_running(){return 0!==o.gameio_is_running(this.ptr)}toggle_pause(){o.gameio_toggle_pause(this.ptr)}move_left(){o.gameio_move_left(this.ptr)}move_right(){o.gameio_move_right(this.ptr)}soft_drop(){o.gameio_soft_drop(this.ptr)}rotate_left(){o.gameio_rotate_left(this.ptr)}rotate_right(){o.gameio_rotate_right(this.ptr)}}function L(){return l(new Error)}function k(t,n){var e=p(a(n).stack,o.__wbindgen_malloc,o.__wbindgen_realloc),r=b;x()[t/4+1]=r,x()[t/4+0]=e}function M(t,n){try{console.error(h(t,n))}finally{o.__wbindgen_free(t,n)}}function D(t){_(t)}function H(){return E((function(t,n){a(t).getRandomValues(a(n))}),arguments)}function N(){return E((function(t,n,e){a(t).randomFillSync(I(n,e))}),arguments)}function F(){return l(t)}function W(t){return l(a(t).process)}function j(t){const n=a(t);return"object"===typeof n&&null!==n}function R(t){return l(a(t).versions)}function O(t){return l(a(t).node)}function C(t){return"string"===typeof a(t)}function A(){return E((function(t,n,e){return l(a(t).require(h(n,e)))}),arguments)}function P(t){return l(a(t).crypto)}function $(t){return l(a(t).msCrypto)}function z(t,n){return l(new Function(h(t,n)))}function G(){return E((function(t,n){return l(a(t).call(a(n)))}),arguments)}function K(){return E((function(){return l(self.self)}),arguments)}function Z(){return E((function(){return l(window.window)}),arguments)}function Y(){return E((function(){return l(globalThis.globalThis)}),arguments)}function B(){return E((function(){return l(e.g.global)}),arguments)}function U(t){return void 0===a(t)}function q(t){return l(a(t).buffer)}function J(t){return l(new Uint8Array(a(t)))}function V(t,n,e){a(t).set(a(n),e>>>0)}function X(t){return a(t).length}function Q(t){return l(new Uint8Array(t>>>0))}function tt(t,n,e){return l(a(t).subarray(n>>>0,e>>>0))}function nt(t){return l(a(t))}function et(t,n){throw new Error(h(t,n))}function rt(){return l(o.memory)}i()}catch(u){i(u)}}))},5301:function(t,n,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return e(441)}])},5990:function(t,n,e){"use strict";e.a(t,(async function(t,r){try{e.d(n,{m:function(){return i.m}});var i=e(2792),o=t([i]);i=(o.then?(await o)():o)[0],r()}catch(c){r(c)}}))},2792:function(t,n,e){"use strict";e.a(t,(async function(t,r){try{e.d(n,{m:function(){return _}});var i=e(5893),o=e(7294),c=e(6735),u=e(2737),a=e.n(u),f=t([c]);c=(f.then?(await f)():f)[0];var s={MAIN:"___canvas_main",SCREEN:"___canvas_screen"},_=function(){return(0,c.iD)(),o.useEffect((function(){if(document){var t=document.getElementById(s.MAIN);if(t){var n=t.getContext("2d");if(n)if(document.getElementById(s.SCREEN)){var e=t.getContext("2d");if(e){setInterval((function(){(0,c.mq)((function(t){(0,c.f_)({game:t,ctxMainLayer:n,ctxScreenLayer:e})}))}),c.zD)}}}}}),[]),o.useEffect((function(){if(window){var t=function(t){(0,c.$y)(t.code)},n=function(t){(0,c.T4)(t.code)};return window.addEventListener("keydown",t),window.addEventListener("keyup",n),function(){window.removeEventListener("keydown",t),window.removeEventListener("keyup",n)}}}),[]),(0,i.jsx)("div",{className:a().root,children:(0,i.jsxs)("div",{className:a().container,children:[(0,i.jsx)("canvas",{id:s.MAIN,className:a().canvas,width:c.Wk.WIDTH,height:c.Wk.HEIGHT}),(0,i.jsx)("canvas",{id:s.SCREEN,className:a().canvas,width:c.Wk.WIDTH,height:c.Wk.HEIGHT})]})})};r()}catch(l){r(l)}}))},7251:function(t,n,e){"use strict";e.a(t,(async function(t,r){try{e.d(n,{U:function(){return i.U}});var i=e(5980),o=t([i]);i=(o.then?(await o)():o)[0],r()}catch(c){r(c)}}))},5980:function(t,n,e){"use strict";e.a(t,(async function(t,r){try{e.d(n,{U:function(){return s}});var i=e(5893),o=(e(7294),e(9008)),c=e(5990),u=e(3381),a=e.n(u),f=t([c]);c=(f.then?(await f)():f)[0];var s=function(){return(0,i.jsxs)("div",{className:a().root,children:[(0,i.jsxs)(o.default,{children:[(0,i.jsx)("title",{children:"WASM-de-TETRIS"}),(0,i.jsx)("meta",{name:"description",content:"WASM de TETRIS"}),(0,i.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,i.jsx)("header",{className:a().header,children:"WASM-de-TETRIS"}),(0,i.jsx)("main",{className:a().main,children:(0,i.jsx)(c.m,{})}),(0,i.jsx)("footer",{className:a().footer,children:"\xa9 2022 waien"})]})};r()}catch(_){r(_)}}))},4515:function(t,n,e){"use strict";e.a(t,(async function(t,r){try{e.d(n,{U:function(){return o.U}});var i=e(5990),o=e(7251),c=t([i,o]);[i,o]=c.then?(await c)():c,r()}catch(u){r(u)}}))},3895:function(t,n,e){"use strict";e.d(n,{Wk:function(){return r},nb:function(){return i},r$:function(){return o},bM:function(){return c},zD:function(){return u}});var r={WIDTH:205,HEIGHT:392},i={SMALL_SIZE:18,SIZE:36,LINE_HEIGHT:40,STYLE:function(t){return"".concat(t,'px "Press Start 2p"')}},o={GRID:"#CCCCCC",EMPTY:"#DDDDDD",FILLER:"#000000",FONT:"#FFFFFF",I:"#00F0F0",J:"#0000FF",L:"#FF8800",O:"#FFFF00",S:"#88FF00",T:"#FF00FF",Z:"#FF0000"},c=16,u=1e3/60},3862:function(t,n,e){"use strict";e.d(n,{mq:function(){return a},iD:function(){return f}});var r,i=e(4051),o=e.n(i),c=e(7294);function u(t,n,e,r,i,o,c){try{var u=t[o](c),a=u.value}catch(f){return void e(f)}u.done?n(a):Promise.resolve(a).then(r,i)}var a=function(t){if(r)return t(r)},f=function(){c.useEffect((function(){var t=function(){var t,n=(t=o().mark((function t(){var n,i,c;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(304).then(e.bind(e,2304));case 2:n=t.sent,n,i=n.GameIO,c=i.new(),r=c;case 7:case"end":return t.stop()}}),t)})),function(){var n=this,e=arguments;return new Promise((function(r,i){var o=t.apply(n,e);function c(t){u(o,r,i,c,a,"next",t)}function a(t){u(o,r,i,c,a,"throw",t)}c(void 0)}))});return function(){return n.apply(this,arguments)}}();t()}),[])}},1469:function(t,n,e){"use strict";e.a(t,(async function(t,r){try{e.d(n,{f:function(){return _}});var i=e(7650),o=e(4361),c=e(3895),u=e(8325),a=t([o,i]);[o,i]=a.then?(await a)():a;var f=function(t,n,e){return t.get_index(n,e)},s=function(t){!function(t){t.ctx.beginPath(),t.ctx.strokeStyle=c.r$.GRID;for(var n=t.game.width(),e=t.game.height(),r=0;r<=n;r++)t.ctx.moveTo(r*(t.cellSize+1)+1,0),t.ctx.lineTo(r*(t.cellSize+1)+1,(t.cellSize+1)*e+1);for(var i=0;i<=e;i++)t.ctx.moveTo(0,i*(t.cellSize+1)+1),t.ctx.lineTo((t.cellSize+1)*n+1,i*(t.cellSize+1)+1);t.ctx.stroke()}({game:t.game,ctx:t.ctxMainLayer,cellSize:c.bM}),function(t){var n=t.game.cells_ptr(),e=t.game.width(),r=t.game.height(),u=t.game.is_gameover(),a=new Uint8Array(o.memory.buffer,n,e*r);t.ctx.beginPath();for(var s=0;s<r;s++){for(var _=0;_<e;_++){var l=f(t.game,s,_);if(u)a[l]===i.bL.Empty?t.ctx.fillStyle=c.r$.EMPTY:t.ctx.fillStyle=c.r$.FILLER;else switch(a[l]){case i.bL.Tetrion:t.ctx.fillStyle=c.r$.FILLER;break;case i.bL.IMino:t.ctx.fillStyle=c.r$.I;break;case i.bL.JMino:t.ctx.fillStyle=c.r$.J;break;case i.bL.LMino:t.ctx.fillStyle=c.r$.L;break;case i.bL.OMino:t.ctx.fillStyle=c.r$.O;break;case i.bL.SMino:t.ctx.fillStyle=c.r$.S;break;case i.bL.TMino:t.ctx.fillStyle=c.r$.T;break;case i.bL.ZMino:t.ctx.fillStyle=c.r$.Z;break;default:t.ctx.fillStyle=c.r$.EMPTY}t.ctx.fillRect(_*(t.cellSize+1)+1,s*(t.cellSize+1)+1,t.cellSize,t.cellSize)}t.ctx.stroke()}}({game:t.game,ctx:t.ctxMainLayer,cellSize:c.bM}),function(t){if(t.game.is_startup()){t.ctx.beginPath(),t.ctx.fillStyle="rgba("+[0,0,0,1]+")",t.ctx.fillRect(0,0,c.Wk.WIDTH,c.Wk.HEIGHT);var n=c.nb.SMALL_SIZE,e=c.Wk.WIDTH/2-3*n/2,r=c.Wk.WIDTH/2-7*n/2,i=c.Wk.HEIGHT/2;t.ctx.font=c.nb.STYLE(n),t.ctx.fillStyle=c.r$.FONT,t.ctx.fillText("HIT",e,i),t.ctx.fillText("ANY KEY",r,i+c.nb.LINE_HEIGHT)}}({game:t.game,ctx:t.ctxScreenLayer}),function(t){if(t.game.is_pause()){t.ctx.beginPath(),t.ctx.fillStyle="rgba("+[0,0,0,.5]+")",t.ctx.fillRect(0,0,c.Wk.WIDTH,c.Wk.HEIGHT);var n=c.nb.SIZE,e=c.Wk.WIDTH/2-5*n/2,r=c.Wk.HEIGHT/2;t.ctx.font=c.nb.STYLE(n),t.ctx.fillStyle=c.r$.FONT,t.ctx.fillText("PAUSE",e,r)}}({game:t.game,ctx:t.ctxScreenLayer}),function(t){if(t.game.is_gameover()){var n=c.nb.SIZE,e=c.Wk.WIDTH/2-4*n/2,r=c.Wk.HEIGHT/2;t.ctx.font=c.nb.STYLE(n),t.ctx.fillStyle=c.r$.FONT,t.ctx.fillText("GAME",e,r),t.ctx.fillText("OVER",e,r+c.nb.LINE_HEIGHT)}}({game:t.game,ctx:t.ctxScreenLayer})},_=function(t){!function(t){(0,u.Zk)({game:t.game}),t.game.update()}({game:t.game}),s(t)};r()}catch(l){r(l)}}))},6735:function(t,n,e){"use strict";e.a(t,(async function(t,r){try{e.d(n,{Wk:function(){return i.Wk},zD:function(){return i.zD},iD:function(){return o.iD},mq:function(){return o.mq},f_:function(){return c.f},$y:function(){return u.$y},T4:function(){return u.T4}});var i=e(3895),o=e(3862),c=e(1469),u=e(8325),a=t([c]);c=(a.then?(await a)():a)[0],r()}catch(f){r(f)}}))},8325:function(t,n,e){"use strict";function r(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}e.d(n,{Zk:function(){return c},$y:function(){return u},T4:function(){return f}});var i=function(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},i=Object.keys(e);"function"===typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(e).filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})))),i.forEach((function(n){r(t,n,e[n])}))}return t}({},{moveLeft:{frame:0,isInputed:!1,holdBehavior:"ACCEL"},moveRight:{frame:0,isInputed:!1,holdBehavior:"ACCEL"},rotateLeft:{frame:0,isInputed:!1,holdBehavior:"NEVER"},rotateRight:{frame:0,isInputed:!1,holdBehavior:"NEVER"},softDrop:{frame:0,isInputed:!1,holdBehavior:"SMOOTH"},togglePause:{frame:0,isInputed:!1,holdBehavior:"NEVER"},anyKeys:{frame:0,isInputed:!1,holdBehavior:"NEVER"}}),o=function(t,n){var e=i[t].holdBehavior;if(i[t].isInputed){switch(e){case"ACCEL":(0===i[t].frame||i[t].frame>10&&i[t].frame%5===0)&&n();break;case"NEVER":0===i[t].frame&&n();break;default:n()}i[t].frame+=1}},c=function(t){o("moveLeft",(function(){return t.game.move_left()})),o("moveRight",(function(){return t.game.move_right()})),o("softDrop",(function(){return t.game.soft_drop()})),o("rotateLeft",(function(){return t.game.rotate_left()})),o("rotateRight",(function(){return t.game.rotate_right()})),o("togglePause",(function(){return t.game.toggle_pause()})),t.game.is_startup()&&o("anyKeys",(function(){return t.game.run()})),t.game.is_gameover()&&setTimeout((function(){o("anyKeys",(function(){return t.game.restart()}))}),1e3)},u=function(t){"KeyA"===t&&(i.moveLeft.isInputed=!0),"KeyD"===t&&(i.moveRight.isInputed=!0),"KeyS"===t&&(i.softDrop.isInputed=!0),"KeyJ"===t&&(i.rotateLeft.isInputed=!0),"KeyK"===t&&(i.rotateRight.isInputed=!0),"Escape"===t&&(i.togglePause.isInputed=!0),i.anyKeys.isInputed=!0},a=function(t){i[t].frame=0,i[t].isInputed=!1},f=function(t){"KeyA"===t&&a("moveLeft"),"KeyD"===t&&a("moveRight"),"KeyS"===t&&a("softDrop"),"KeyJ"===t&&a("rotateLeft"),"KeyK"===t&&a("rotateRight"),"Escape"===t&&a("togglePause"),a("anyKeys")}},441:function(t,n,e){"use strict";e.a(t,(async function(t,r){try{e.r(n);var i=e(5893),o=e(4515),c=t([o]);o=(c.then?(await c)():c)[0];n.default=function(){return(0,i.jsx)(o.U,{})},r()}catch(u){r(u)}}))},2737:function(t){t.exports={root:"main_root__hlW79",container:"main_container__7vjRS",canvas:"main_canvas__ytx_c"}},3381:function(t){t.exports={root:"main_root__tJV_f",header:"main_header__V2m_c",footer:"main_footer__3i_DA",main:"main_main__Pad4p"}},9008:function(t,n,e){t.exports=e(5443)},4361:function(t,n,e){"use strict";e.a(t,(async function(r,i){try{var o,c=r([o=e(7650)]),[o]=c.then?(await c)():c;await e.v(n,t.id,"8cbf8e7989a1bfc6",{"./wasm_bg.js":{__wbg_new_693216e109162396:o.Ih,__wbg_stack_0ddaca5d1abfb52f:o.yq,__wbg_error_09919627ac0992f5:o.gk,__wbindgen_object_drop_ref:o.ug,__wbg_getRandomValues_99bbe8a65f4aef87:o.j7,__wbg_randomFillSync_378e02b85af41ab6:o.yG,__wbg_static_accessor_NODE_MODULE_bdc5ca9096c68aeb:o.hC,__wbg_process_5729605ce9d34ea8:o.Id,__wbindgen_is_object:o.Wl,__wbg_versions_531e16e1a776ee97:o.jJ,__wbg_node_18b58a160b60d170:o.h6,__wbindgen_is_string:o.eY,__wbg_require_edfaedd93e302925:o.Ns,__wbg_crypto_2bc4d5b05161de5b:o.Y2,__wbg_msCrypto_d003eebe62c636a9:o.IS,__wbg_newnoargs_f579424187aa1717:o.bf,__wbg_call_89558c3e96703ca1:o.Z4,__wbg_self_e23d74ae45fb17d1:o.tL,__wbg_window_b4be7f48b24ac56e:o.Qu,__wbg_globalThis_d61b1f48a57191ae:o.EB,__wbg_global_e7669da72fd7f239:o.Yc,__wbindgen_is_undefined:o.XP,__wbg_buffer_5e74a88a1424a2e0:o.rf,__wbg_new_e3b800e570795b3c:o.Ts,__wbg_set_5b8081e9d002f0df:o.Mz,__wbg_length_30803400a8f15c59:o.Zu,__wbg_newwithlength_5f4ce114a24dfe1e:o._G,__wbg_subarray_a68f835ca2af506f:o.kC,__wbindgen_object_clone_ref:o.m_,__wbindgen_throw:o.Or,__wbindgen_memory:o.oH}}),i()}catch(u){i(u)}}),1)}},function(t){t.O(0,[774,888,179],(function(){return n=5301,t(t.s=n);var n}));var n=t.O();_N_E=n}]);