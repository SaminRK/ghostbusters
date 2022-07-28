(this.webpackJsonpghostbusters=this.webpackJsonpghostbusters||[]).push([[0],{16:function(t,e,s){},27:function(t,e,s){},28:function(t,e,s){},29:function(t,e,s){},53:function(t,e,s){"use strict";s.r(e);var i=s(2),r=s.n(i),o=s(17),a=s.n(o),n=(s(27),s(20)),c=(s(28),s.p+"static/media/ghost.b9434479.png"),h=(s(29),s(0));var l=function(t){return Object(h.jsx)("img",{src:c,className:"leftGhostImage",style:{left:t.horizontalPosition,top:50,height:t.size}})},d=s(3);var u=function(t){for(var e="",s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i=0;i<t;i++)e+=s.charAt(Math.floor(Math.random()*s.length));return e},b=s(18),f=s(19),g=s(4),v=s(22),j=s(21);s(16);var m=function(){return Object(h.jsxs)("div",{className:"centraliser credit",children:["This game is a web-version of the ghostbusters game from the course CS188:Intro to AI at UC Berkeley\xa0",Object(h.jsx)("a",{href:"https://inst.eecs.berkeley.edu/~cs188/",children:"visit to know more"})]})},G=function(t){Object(v.a)(s,t);var e=Object(j.a)(s);function s(t){var i;return Object(b.a)(this,s),(i=e.call(this,t)).state={rows:10,columns:10,grid:i.getInitialGameGrid(10,10),move:[[1,30,1],[30,1,30],[1,30,1]],pos:i.getInitialPosition(10,10),colorGrid:i.getInitialColorGrid(10,10),bustMode:!1,hitGrid:i.getInitialHitGrid(10,10),busted:!1,bustsLeft:3},i.advanceTime=i.advanceTime.bind(Object(g.a)(i)),i.toggleBustMode=i.toggleBustMode.bind(Object(g.a)(i)),i.resetGame=i.resetGame.bind(Object(g.a)(i)),i}return Object(f.a)(s,[{key:"resetGame",value:function(){console.log("reset"),this.setState({grid:this.getInitialGameGrid(10,10),pos:this.getInitialPosition(10,10),colorGrid:this.getInitialColorGrid(10,10),bustMode:!1,hitGrid:this.getInitialHitGrid(10,10),busted:!1,bustsLeft:3})}},{key:"getInitialHitGrid",value:function(t,e){for(var s=new Array(t),i=0;i<t;++i){s[i]=[];for(var r=0;r<e;++r)s[i][r]=-1}return s}},{key:"getInitialGameGrid",value:function(t,e){for(var s=new Array(t),i=0;i<t;++i){s[i]=[];for(var r=0;r<e;++r)s[i][r]=1/(t*e)}return s}},{key:"getInitialPosition",value:function(t,e){var s=Math.floor(Math.random()*t),i=Math.floor(Math.random()*e);return console.log({row:s,col:i}),[s,i]}},{key:"getColor",value:function(t){return"r"===t?"red":"o"===t?"orange":"y"===t?"yellow":"g"===t?"green":"black"}},{key:"getInitialColorGrid",value:function(t,e){for(var s=new Array(t),i=0;i<t;++i){s[i]=[];for(var r=0;r<e;++r)s[i][r]=" "}return s}},{key:"getBoxBgColor",value:function(t){var e,s,i,r=this.state.rows,o=this.state.columns;return i=r*o*t<=1?Math.max(150,Math.min(255,Math.floor(r*o*t*256))):t<.5?Math.min(255,Math.floor(256*(1-t))):0,(e=Math.min(255,Math.floor(t*o*256)))+i>255?(s=.3*Math.min(i,e),i*=.85,e*=.6):s=Math.min(i,e),"rgb(".concat(e,", ").concat(s,", ").concat(i,")")}},{key:"toggleBustMode",value:function(){if(0!==this.state.bustsLeft){var t=!this.state.bustMode;this.setState({bustMode:t})}}},{key:"setGridAfterSensor",value:function(t,e){var s=this.state.pos[0],i=this.state.pos[1],r=this.state.rows,o=this.state.columns,a=Math.abs(e-i)+Math.abs(t-s),n="g";a<=1?n="r":a<=2?n="o":a<=4&&(n="y");var c=this.state.colorGrid;c[t][e]=n;var h,l,d=new Array(r),u=new Array(r);for(h=0;h<r;++h)for(d[h]=[],u[h]=[],l=0;l<o;++l)d[h][l]=0,u[h][l]=0;for(h=0;h<r;++h)for(l=0;l<o;++l){var b=Math.abs(t-h)+Math.abs(e-l);b<=1?"r"===n&&(u[h][l]=1):b<=2?"o"===n&&(u[h][l]=1):b<=4?"y"===n&&(u[h][l]=1):"g"===n&&(u[h][l]=1)}var f=0;for(h=0;h<r;++h)for(l=0;l<r;++l)d[h][l]=u[h][l]*this.state.grid[h][l],f+=d[h][l];if(!(f<1e-18)){for(h=0;h<r;++h)for(l=0;l<r;++l)d[h][l]/=f;this.setState({grid:d,colorGrid:c})}}},{key:"bust",value:function(t,e){var s,i,r=this.state.hitGrid,o=this.state.rows,a=this.state.columns,n=this.state.grid;if(t===this.state.pos[0]&&e===this.state.pos[1]){for(s=0;s<o;++s)for(i=0;i<a;++i)n[s][i]=0;(r=this.state.hitGrid)[t][e]=1,this.setState({hitGrid:r}),n[t][e]=1}else(r=this.state.hitGrid)[t][e]=0,this.setState({hitGrid:r}),n[t][e]=0;var c=0;for(s=0;s<o;++s)for(i=0;i<a;++i)c+=n[s][i];if(c>1e-18)for(s=0;s<o;++s)for(i=0;i<a;++i)n[s][i]/=c;var h=this.state.bustsLeft-1;this.setState({hitGrid:r,bustMode:!1,bustsLeft:h,grid:n,busted:!0})}},{key:"handleClick",value:function(t,e){this.state.bustMode?this.bust(t,e):this.setGridAfterSensor(t,e),this.props.optimizely.track("box_click")}},{key:"advanceTime",value:function(){var t,e,s,i,r=this.state.rows,o=this.state.columns,a=this.state.move,n=this.state.pos[0],c=this.state.pos[1],h=0;for(s=n-1;s<=n+1;++s)for(i=c-1;i<=c+1;++i)s>=0&&s<r&&i>=0&&i<o&&(h+=a[s-n+1][i-c+1]);var l=Math.floor(Math.random()*h),d=0,u=r-1,b=o-1;for(s=n-1;s<=n+1;++s)for(i=c-1;i<=c+1;++i)if(s>=0&&s<r&&i>=0&&i<o&&(d+=a[s-n+1][i-c+1])>l){u=s,b=i,s=n+100;break}var f=new Array(r);for(t=0;t<r;++t)for(f[t]=[],e=0;e<o;++e)f[t][e]=0;for(t=0;t<r;++t)for(e=0;e<o;++e){for(h=0,s=t-1;s<=t+1;++s)for(i=e-1;i<=e+1;++i)s>=0&&s<r&&i>=0&&i<o&&(h+=a[s-t+1][i-e+1]);for(s=t-1;s<=t+1;++s)for(i=e-1;i<=e+1;++i)s>=0&&s<r&&i>=0&&i<o&&(f[s][i]+=this.state.grid[t][e]*a[s-t+1][i-e+1]/h)}var g=this.getInitialColorGrid(r,o);this.state.busted?this.setState({grid:f,colorGrid:g,pos:[u,b],bustMode:!1,hitGrid:this.getInitialHitGrid(r,o),busted:!1}):this.setState({grid:f,colorGrid:g,pos:[u,b],bustMode:!1})}},{key:"render",value:function(){var t=this,e={width:"".concat(75*this.state.columns,"px"),margin:"auto"};return Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{className:"gameGrid",children:this.state.grid.map((function(s,i){return Object(h.jsx)("div",{style:e,children:s.map((function(e,s){var r=e.toFixed(3),o={background:t.getBoxBgColor(t.state.grid[i][s])};return" "!==t.state.colorGrid[i][s]&&(o.border="4px solid ".concat(t.getColor(t.state.colorGrid[i][s]))),0===t.state.hitGrid[i][s]?(o.background="green",r="MISS"):t.state.hitGrid[i][s]>=1&&(o.background="red",r="HIT",t.state.hitGrid[i][s]>1&&(r+="".concat(t.state.hitGrid[i][s]))),Object(h.jsx)("button",{className:"boxes",onClick:t.handleClick.bind(t,i,s),style:o,children:r},i*t.state.columns+s)}))},i)}))}),Object(h.jsxs)("div",{children:[Object(h.jsxs)("div",{className:"centraliser",children:[Object(h.jsx)("button",{className:"control-buttons",onClick:this.advanceTime,children:"TIME+1"}),Object(h.jsx)("button",{className:"control-buttons bustButton"+(this.state.bustMode?"Red":""),onClick:this.toggleBustMode,children:"BUST"}),Object(h.jsx)("button",{className:"control-buttons",onClick:this.resetGame,children:"RESET"})]}),Object(h.jsx)("div",{className:"centraliser",children:"POSITION: (".concat(this.state.pos[0],", ").concat(this.state.pos[1],")")}),Object(h.jsx)("div",{className:"centraliser",children:"BUSTS LEFT X ".concat(this.state.bustsLeft)}),Object(h.jsx)(m,{})]})]})}}]),s}(r.a.Component),O=Object(d.withOptimizely)(G),M=Object(d.createInstance)({sdkKey:"KaL3fPyXBeciBoAn3hGhu"});function y(){var t=Object(d.useDecision)("ghost_in_bkg"),e=Object(n.a)(t,1)[0],s=e.variables.show_ghost_in_bkg,i=e.variables.ghost_size;return Object(h.jsx)(h.Fragment,{children:e&&e.enabled&&s&&Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(l,{horizontalPosition:0,size:i}),Object(h.jsx)(l,{horizontalPosition:1200,size:i})]})})}var k=function(){var t=u(6);return console.log(t),Object(h.jsxs)(d.OptimizelyProvider,{optimizely:M,user:{id:t,attributes:{is_just_starting:!0}},children:[Object(h.jsx)(y,{}),Object(h.jsx)(O,{})]})},p=function(t){t&&t instanceof Function&&s.e(3).then(s.bind(null,54)).then((function(e){var s=e.getCLS,i=e.getFID,r=e.getFCP,o=e.getLCP,a=e.getTTFB;s(t),i(t),r(t),o(t),a(t)}))};a.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(k,{})}),document.getElementById("root")),p()}},[[53,1,2]]]);
//# sourceMappingURL=main.f3b9230b.chunk.js.map