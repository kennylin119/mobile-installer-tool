(this["webpackJsonpchat-app"]=this["webpackJsonpchat-app"]||[]).push([[0],{45:function(e,t,a){},92:function(e,t,a){},93:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),c=a(17),r=a.n(c),l=(a(45),a(5)),i=a(10),o=a(9),d=a(95),m=a(96),u=a(1),j=function(e){var t=Object(s.useState)(""),a=Object(o.a)(t,2),n=a[0],c=a[1],r=e.chatId,l=e.creds;function j(e){e.preventDefault();var t=n.trim();t.length>0&&(Object(i.o)(l,r,{text:t}),c(""))}return Object(u.jsxs)("form",{className:"message-form",onSubmit:j,children:[Object(u.jsx)("input",{className:"message-input",placeholder:"Send a message",value:n,onChange:function(t){c(t.target.value),Object(i.l)(e,r)},onSubmit:j}),Object(u.jsx)("label",{htmlFor:"upload-button",children:Object(u.jsx)("span",{className:"image-button",children:Object(u.jsx)(d.a,{className:"picture-icon"})})}),Object(u.jsx)("input",{type:"file",multiple:!1,id:"upload-button",style:{display:"none"},onChange:function(e){Object(i.o)(l,r,{files:e.target.files,text:""})}}),Object(u.jsx)("button",{type:"submit",className:"send-button",children:Object(u.jsx)(m.a,{className:"send-icon"})})]})},g=function(e){var t,a=e.message;return(null===a||void 0===a||null===(t=a.attachments)||void 0===t?void 0:t.length)>0?Object(u.jsx)("img",{src:a.attachments[0].file,alt:"message-attachment",className:"message-image",style:{float:"right"}}):Object(u.jsx)("div",{className:"message",style:{float:"right",marginRight:"18px",color:"white",backgroundColor:"#3B2A50"},children:a.text})},b=function(e){var t,a,s=e.lastMessage,n=e.message,c=!s||s.sender.username!=n.sender.username;return Object(u.jsxs)("div",{className:"message-row",children:[c&&Object(u.jsx)("div",{className:"message-avatar",style:{backgroundImage:"url(".concat(null===n||void 0===n||null===(t=n.sender)||void 0===t?void 0:t.avatar,")")}}),(null===n||void 0===n||null===(a=n.attachments)||void 0===a?void 0:a.length)>0?Object(u.jsx)("img",{src:n.attachments[0].file,alt:"message-attachment",className:"message-image",style:{marginleft:c?"4px":"48px"}}):Object(u.jsx)("div",{className:"message",style:{float:"left",marginRight:"18px",backgroundColor:"#CABCDC",marginleft:c?"4px":"48px"},children:n.text})]})},h=function(e){var t=e.chats,a=e.activeChat,s=e.userName,n=e.messages,c=t&&t[a];function r(e,t){return c.people.map((function(a,s){var n;return a.last_read===e.id&&Object(u.jsx)("div",{className:"read-receipt",style:{float:t?"right":"left",backgroundImage:"url(".concat(null===a||void 0===a||null===(n=a.person)||void 0===n?void 0:n.avatar,")")}},"read_".concat(s))}))}return console.log(c,s,n),c?Object(u.jsxs)("div",{className:"chat-feed",children:[Object(u.jsxs)("div",{className:"chat-title-container",children:[Object(u.jsx)("div",{className:"chat-title",children:null===c||void 0===c?void 0:c.title}),Object(u.jsx)("div",{className:"chat-subttitle",children:c.people.map((function(e){return" ".concat(e.person.username)}))})]}),Object.keys(n).map((function(e,t){var a=n[e],c=0===t?null:e[t-1],l=s===a.sender.username;return Object(u.jsxs)("div",{style:{width:"100%"},children:[Object(u.jsx)("div",{className:"message-block",children:l?Object(u.jsx)(g,{message:a}):Object(u.jsx)(b,{message:a,lastMessage:n[c]})}),Object(u.jsx)("div",{className:"read-receipts",style:{marginRight:l?"18px":"0px",marginLeft:l?"0px":"68px"},children:r(a,l)})]},"msg_".concat(t))})),Object(u.jsx)("div",{style:{height:"100px"}}),Object(u.jsx)("div",{className:"message-form-container",children:Object(u.jsx)(j,Object(l.a)(Object(l.a)({},e),{},{chatId:a}))})]}):"Loading..."};a(92);var f=function(){return Object(u.jsx)(i.d,{height:"100vh",projectID:"b2b42d80-4e19-49bd-ad10-20b4fdee9ab0",userName:"default_user",userSecret:"123123",renderChatFeed:function(e){return Object(u.jsx)(h,Object(l.a)({},e))}})},p={modes:{mfe:"MFE",standalone:"STANDALONE"}},x=function(e){console.log("%c\ud83d\udc03 [".concat(performance.now()," ms]\n\n").concat(e),"color: #fefefe; background-color: #34f; font-size: 24px;")},v=document.getElementById("chat-app"),O=document.getElementById("root"),N=v?p.modes.mfe:p.modes.standalone,y=v||O;x("setting final render target, it looks like we're running in ".concat(N," mode"));var k=function(){return r.a.render(Object(u.jsx)(n.a.StrictMode,{children:Object(u.jsx)(f,{})}),y)};x("setting window.renderTestMfe equal to the React render function"),N===p.modes.standalone?k():(x("We're running in ".concat(N," mode, so there's no need to call renderFn() here!")),window.renderTestMfe=k)}},[[93,1,2]]]);
//# sourceMappingURL=main.c4abbab5.chunk.js.map