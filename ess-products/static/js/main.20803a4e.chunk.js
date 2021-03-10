(this["webpackJsonpess-products"]=this["webpackJsonpess-products"]||[]).push([[0],{100:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(14),c=a.n(o),i=(a(70),a(71),a(39)),l=a.n(i),s=a(59),u=a(13),h=a(60),m=a.n(h),d=a(23),p=a.n(d),f=a(10),g=a(32),b=a(17),v=a(12),y=a(15),E=a(21),w=a(20),k=a(111),z=a(112),j=a(61),O=a(40),C=a.n(O),S=a(101),x=a(102),P=a(103),A=a(104),T=a(105),q=a(106),N=a(107),F=a(108),B=a(109),_=a(3),L=a.n(_),D=function(e){var t=e.Item,a=e.itemCount,o=e.height,c=e.childHeight,i=e.renderAhead,l=void 0===i?20:i,s=function(){var e=Object(n.useState)(0),t=Object(u.a)(e,2),a=t[0],r=t[1],o=Object(n.useRef)(),c=function(e){return requestAnimationFrame((function(){r(e.target.scrollTop)}))};return Object(n.useEffect)((function(){var e=o.current;return r(e.scrollTop),e.addEventListener("scroll",c),function(){return e.removeEventListener("scroll",c)}}),[]),[a,o]}(),h=Object(u.a)(s,2),m=h[0],d=h[1],p=a*c,f=Math.floor(m/c)-l;f=Math.max(0,f);var g=Math.ceil(o/c)+2*l;g=Math.min(a-f,g),g=Math.max(0,g),g=Math.min(Math.pow(32,2)-1,g);var b=f*c,v=Object(n.useMemo)((function(){return new Array(g).fill(null).map((function(e,a){return r.a.createElement(t,{key:a.toString()+f,index:a+f})}))}),[f,g]);return r.a.createElement("div",{style:{height:o,overflow:"auto"},ref:d},r.a.createElement("div",{className:"viewport",style:{overflow:"hidden",willChange:"transform",height:p,position:"relative"}},r.a.createElement("div",{style:{willChange:"transform",transform:"translateY(".concat(b,"px)")}},v)))};D.defaultProps={renderAhead:20};var M=Object(n.memo)(D),R=function(e){Object(E.a)(a,e);var t=Object(w.a)(a);function a(e){var n;return Object(b.a)(this,a),(n=t.call(this,e)).state={activeTab:"1",height:0},n.updateWindowDimensions=n.updateWindowDimensions.bind(Object(v.a)(n)),n.toggle=function(e){n.activeTab!==e&&n.setState({activeTab:e})},n.clearProd=function(){n.inputProd.value="",window.history.replaceState({},document.title,"/products")},n.clearBuzz=function(){n.inputBuzz.value="",window.history.replaceState({},document.title,"/products")},n.clear=function(){n.clearProd(),n.clearBuzz()},n}return Object(y.a)(a,[{key:"componentDidMount",value:function(){var e=this.props,t=e.onProductChange,a=e.onBuzzwordsChange;this.updateWindowDimensions(),window.addEventListener("resize",this.updateWindowDimensions);var n=new URL(document.location).searchParams,r=C()(n.get("p")),o=C()(n.get("b"));r?(this.inputProd.value=r,setTimeout((function(){return t(r)}),666)):o&&(this.toggle("2"),this.inputBuzz.value=o,setTimeout((function(){return a(o)}),666))}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateWindowDimensions)}},{key:"updateWindowDimensions",value:function(){this.setState({height:window.innerHeight})}},{key:"render",value:function(){var e=this,t=this.props,a=t.onBuzzwordsChange,o=t.onProductChange,c=t.onResult,i=t.filtered,l=this.state,s=l.activeTab,u=l.height,h=Object(n.memo)((function(e){var t=e.index;return r.a.createElement(S.a,{key:t,style:{height:"70px",color:"black",fontSize:"16px"},className:"highlightStyle",onClick:function(){return c(i[t])},tag:"button",action:!0},i[t].ref)}));return h.displayName="Item",r.a.createElement(r.a.Fragment,null,r.a.createElement(x.a,{tabs:!0,style:{color:"#ADC5CC",border:"transparent"}},r.a.createElement(P.a,null,r.a.createElement(A.a,{style:{cursor:"pointer"},className:L()({active:"1"===s}),onClick:function(){o(""),e.clearBuzz(),e.toggle("1")}},"Product")),r.a.createElement(P.a,null,r.a.createElement(A.a,{style:{cursor:"pointer"},className:L()({active:"2"===s}),onClick:function(){a(""),e.clearProd(),e.toggle("2")}},"Buzzwords"))),r.a.createElement(T.a,{activeTab:s},r.a.createElement(q.a,{tabId:"1"},r.a.createElement(N.a,{style:{height:"82px"},body:!0},r.a.createElement(F.a,{innerRef:function(t){e.inputProd=t},type:"search",name:"searchProduct",className:"input",id:"productInput",style:{height:"40px",background:"#F7F9FA"},onChange:function(e){return o(e.target.value.replace(/[^a-zA-Z ]/g," "))},placeholder:"Search by Product"}))),r.a.createElement(q.a,{tabId:"2"},r.a.createElement(N.a,{style:{height:"82px"},body:!0},r.a.createElement(F.a,{innerRef:function(t){e.inputBuzz=t},type:"search",name:"searchBuzzwords",className:"input",id:"buzzwordsInput",style:{height:"40px",background:"#F7F9FA"},onChange:function(e){return a(e.target.value.replace(/[^a-zA-Z ]/g," "))},placeholder:"Search by Buzzwords"})))),r.a.createElement(B.a,null,r.a.createElement(M,{itemCount:i.length,height:.6*u,childHeight:70,Item:h})))}}]),a}(r.a.Component);R.defaultProps={index:void 0};var W=R,Q=a(110),I=a(64),K=function(e){Object(E.a)(a,e);var t=Object(w.a)(a);function a(){return Object(b.a)(this,a),t.apply(this,arguments)}return Object(y.a)(a,[{key:"clear",value:function(){this.inputTech.state.value={value:"Any",label:"Any"}}},{key:"render",value:function(){var e=this,t=this.props,a=t.techList,n=t.onTechnologyChange,o={control:function(e){return Object(f.a)(Object(f.a)({},e),{},{backgroundColor:"#F7F9FA",cursor:"pointer",boxShadow:"none",minHeight:"40px",height:"40px"})},menu:function(e){return Object(f.a)(Object(f.a)({},e),{},{marginTop:"21.5px",left:"-20px",width:"calc(100% + 40px)",boxShadow:"0.5px 0.5px 0.5px 0.5px lightgray",minHeight:"fit-content",minWidth:"fit-content"})},option:function(e,t){var a=t.isFocused;return Object(f.a)(Object(f.a)({},e),{},{backgroundColor:a?"#bfdcae":"white",":active":Object(f.a)(Object(f.a)({},e[":active"]),{},{backgroundColor:"#5cb85c"}),color:"black",cursor:"pointer",minHeight:"fit-content",minWidth:"fit-content",paddingTop:"6px",paddingBottom:"6px",fontSize:"16px"})}},c=[{value:"Any",label:"Any"}].concat(Object(g.a)(a.map((function(e){return{value:e,label:e}}))));return r.a.createElement(r.a.Fragment,null,r.a.createElement(Q.a,{style:{marginBottom:"13px"},for:"exampleSelect"},"Technology"),r.a.createElement(N.a,{style:{height:"82px"},body:!0},r.a.createElement(I.a,{ref:function(t){e.inputTech=t},defaultValue:c[0],label:"Select Technology",options:c,styles:o,onChange:function(e){return n(e.value)}})))}}]),a}(r.a.Component),H=function(e){var t=e.results,a={color:"#5cb85c"};return r.a.createElement(r.a.Fragment,null,t.product?r.a.createElement(r.a.Fragment,null,r.a.createElement(Q.a,{style:{marginBottom:"13px"},for:"res"},"Results"),r.a.createElement(B.a,{id:"res"},r.a.createElement(S.a,null,r.a.createElement("b",null,"Product: "),t.product),r.a.createElement(S.a,null,r.a.createElement("b",null,"Queue: "),t.visibleQueue),r.a.createElement(S.a,null,r.a.createElement("b",null,"Support Method: "),t.supportMethod),t.url?r.a.createElement(S.a,null,r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",style:a,href:t.url},r.a.createElement("b",null,"Reference"))):"",t.email?r.a.createElement(S.a,null,r.a.createElement("b",null,"Contact: "),r.a.createElement("a",{style:a,href:"mailto:".concat(t.email)},t.email)):"",t.visibleQueue.includes("Data")?r.a.createElement(S.a,null,"Please review"," ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",style:a,href:"https://esri.lightning.force.com/lightning/r/Knowledge__kav/ka15x0000008f0KAAQ/view"},"this documentation")," ","before transferring to Data Management."):"",t.visibleQueue.includes("SDK")?r.a.createElement(S.a,null,"Please review"," ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",style:a,href:"https://esri.lightning.force.com/lightning/r/Knowledge__kav/ka15x0000008kIXAAY/view"},"this documentation")," ","before transferring to Developer Products."):"")):"")},Y=function(e){Object(E.a)(a,e);var t=Object(w.a)(a);function a(e){var n;return Object(b.a)(this,a),(n=t.call(this,e)).state={hasError:!1},n.resetComponentState=n.resetComponentState.bind(Object(v.a)(n)),n}return Object(y.a)(a,[{key:"componentDidCatch",value:function(e,t){console.log(e,t)}},{key:"resetComponentState",value:function(){var e=this.props.resetState;e?e():document.location.reload(),this.setState({hasError:!1})}},{key:"render",value:function(){var e=this.state.hasError,t=this.props,a=t.children,n=t.buttonClass,o=t.buttonText;return e?r.a.createElement("div",{className:"d-flex justify-content-center m-4"},r.a.createElement("button",{type:"button",className:n,onClick:this.resetComponentState},o)):a}}],[{key:"getDerivedStateFromError",value:function(){return{hasError:!0}}}]),a}(r.a.Component);Y.defaultProps={resetState:null,buttonClass:"btn btn-outline-secondary btn-sm m-2",buttonText:"Something Went Wrong, Click To Reset."};var $=Y,J=function(e){Object(E.a)(a,e);var t=Object(w.a)(a);function a(e){var n;return Object(b.a)(this,a),(n=t.call(this,e)).state={filtered:[],query:{product:"",technology:"Any",buzzwords:""},results:{}},n.handleProductChange=n.handleProductChange.bind(Object(v.a)(n)),n.handleBuzzwordsChange=n.handleBuzzwordsChange.bind(Object(v.a)(n)),n.handleTechnologyChange=n.handleTechnologyChange.bind(Object(v.a)(n)),n.handleFilterClick=n.handleFilterClick.bind(Object(v.a)(n)),n.clear=n.clear.bind(Object(v.a)(n)),n.resetState=n.resetState.bind(Object(v.a)(n)),n}return Object(y.a)(a,null,[{key:"createSearchString",value:function(e){var t=e.query,a=e.techList,n="",r=!1;if(t.product&&""!==t.product)r=!0,t.product.split(" ").forEach((function(e){n+=" +product:*".concat(e,"*")})),"Any"!==t.technology&&(n+=" +technology:".concat(t.technology));else if(t.buzzwords&&""!==t.buzzwords){r=!0;var o=t.buzzwords.split(" ");"Any"!==t.technology?(n+=" +technology:".concat(t.technology),o.forEach((function(e){n+=" +b_".concat(t.technology.replace(/\s/g,""),":*").concat(e,"*")}))):a.forEach((function(e){o.forEach((function(t){n+=" b_".concat(e.replace(/\s/g,""),":*").concat(t,"*")}))}))}else""===t.buzzwords&&""===t.buzzwords&&"Any"!==t.technology&&(r=!0,n+="+technology:".concat(t.technology));return r?n:null}},{key:"findResult",value:function(e){var t=e.item,a=e.query,n=e.prod,r=e.tech,o=n.find((function(e){return t.ref===e.product})),c=o.queue.split(",").map((function(e){return e.trim()}));if(o.visibleQueue=Object(g.a)(o.queue),c.length>1){var i="";if("Any"!==a.technology&&(c.forEach((function(e){r[a.technology.replace(/\s/g,"")].includes(e.trim())&&(i+=e.trim())})),o.visibleQueue=i),a.buzzwords&&"Any"===a.technology){var l=new Set;Object.values(t.matchData.metadata).forEach((function(e){Object.keys(e).forEach((function(e){l.add(e.substr(2))}))})),c.forEach((function(e){l.forEach((function(t){r[t].includes(e.trim())&&(i+="".concat(e.trim(),", "))}))})),o.visibleQueue=i.replace(/(^[,\s]+)|([,\s]+$)/g,"")}}return o}}]),Object(y.a)(a,[{key:"doSearch",value:function(){var e=this.props,t=e.prod,n=e.tech,r=e.techList,o=e.index,c=this.state.query,i=a.createSearchString({query:c,techList:r});if(i){var l=o.search(i);if(this.setState({filtered:l}),1===l.length){var s=l[0],u=a.findResult({item:s,query:c,prod:t,tech:n});this.setState({results:u})}}}},{key:"handleProductChange",value:function(e){var t=this;this.setState((function(t){return{query:Object(f.a)(Object(f.a)({},t.query),{},{product:e,buzzwords:""}),filtered:[],results:{}}}),(function(){t.doSearch()}))}},{key:"handleBuzzwordsChange",value:function(e){var t=this;this.setState((function(t){return{query:Object(f.a)(Object(f.a)({},t.query),{},{buzzwords:e,product:""}),filtered:[],results:{}}}),(function(){t.doSearch()}))}},{key:"handleTechnologyChange",value:function(e){var t=this,a=this.state.results,n=this.props.tech;this.setState((function(t){return{query:Object(f.a)(Object(f.a)({},t.query),{},{technology:e})}}),(function(){if(a.product){var r=Object(f.a)({},a);if(r.technology.split(",").map((function(e){return e.trim()})).includes(e)){var o="";r.queue.split(",").forEach((function(t){n[e.replace(/\s/g,"")].includes(t.trim())&&(o+=t.trim())})),r.visibleQueue=o,t.setState({results:r})}else"Any"===e?r.visibleQueue=r.queue:t.setState({filtered:[],results:{}})}else t.setState({filtered:[],results:{}});t.doSearch()}))}},{key:"handleFilterClick",value:function(e){var t=this.props,n=t.prod,r=t.tech,o=this.state.query,c=a.findResult({item:e,query:o,prod:n,tech:r});this.setState({results:c})}},{key:"clear",value:function(){this.resetState(),this.inputProd.clear(),this.inputTech.clear()}},{key:"resetState",value:function(){window.history.replaceState({},document.title,"/products"),this.setState({filtered:[],query:{product:"",technology:"Any",buzzwords:""},results:{}})}},{key:"render",value:function(){var e=this,t=this.state,a=t.query,n=t.results,o=t.filtered,c=this.props,i=c.techList,l=c.isMobile,s=!(a.product||a.buzzwords||"Any"!==a.technology||n.length>0);return r.a.createElement($,{resetState:this.resetState},r.a.createElement(k.a,{className:"mt-2 mr-1"},r.a.createElement(z.a,{md:{size:1,offset:11}},r.a.createElement(j.a,{className:"float-right",outline:!0,color:"success",size:"sm",disabled:s,onClick:this.clear},"clear"))),l?r.a.createElement(k.a,{className:"justify-content-md-center ml-2 mr-2"},r.a.createElement(z.a,{className:"mb-2 mt-1",md:{size:4,offset:0}},r.a.createElement(H,{results:n})),r.a.createElement(z.a,{className:"mb-2 mt-1",md:{size:3,offset:0}},r.a.createElement(K,{ref:function(t){e.inputTech=t},onTechnologyChange:this.handleTechnologyChange,techList:i})),r.a.createElement(z.a,{className:"mb-1",md:{size:5,offset:0}},r.a.createElement(W,{ref:function(t){e.inputProd=t},filtered:o,onProductChange:this.handleProductChange,onBuzzwordsChange:this.handleBuzzwordsChange,onResult:this.handleFilterClick}))):r.a.createElement(k.a,{className:"justify-content-md-center ml-2 mr-2"},r.a.createElement(z.a,{className:"mb-1",md:{size:5,offset:0}},r.a.createElement(W,{ref:function(t){e.inputProd=t},filtered:o,onProductChange:this.handleProductChange,onBuzzwordsChange:this.handleBuzzwordsChange,onResult:this.handleFilterClick})),r.a.createElement(z.a,{className:"mb-2 mt-1",md:{size:3,offset:0}},r.a.createElement(K,{ref:function(t){e.inputTech=t},onTechnologyChange:this.handleTechnologyChange,techList:i})),r.a.createElement(z.a,{className:"mb-2 mt-1",md:{size:4,offset:0}},r.a.createElement(H,{results:n}))))}}]),a}(r.a.Component);J.defaultProps={index:null};var U=J,X=a(116),Z=a(117),V=a(118),G=a(119),ee=a(122),te=a(123),ae=a(124),ne=a(120),re=a(121),oe=a(113),ce=a(114),ie=a(115),le=function(e){var t=e.buttonLabel,a=e.className,o=Object(n.useState)(!1),c=Object(u.a)(o,2),i=c[0],l=c[1],s=function(){return l(!i)};return r.a.createElement(r.a.Fragment,null,r.a.createElement(A.a,{color:"link",onClick:s,style:{cursor:"pointer"}},t),r.a.createElement(re.a,{isOpen:i,toggle:s,className:a},r.a.createElement(oe.a,{toggle:s},"About"),r.a.createElement(ce.a,null,r.a.createElement("p",null,"The Product to Queue app is a browser-based tool which helps determine the appropriate team/queue to route a case based on product names or buzzwords."),r.a.createElement("ul",null,r.a.createElement("li",null,"To use the app, fill in the product name or buzzword in the search field and click on a product."),r.a.createElement("li",null,"The results will be returned on the right of the web page."),r.a.createElement("li",null,"You can filter the queues further by selecting a specific Technology from the dropdown."),r.a.createElement("li",null,"You can reset the search field and technology by clicking the",r.a.createElement("i",null," clear "),"button on the top-right corner."),r.a.createElement("li",null,"Please make sure to review the transfer resources before transferring a case.")),r.a.createElement("p",null,"If you have any questions about the products or queues, feel free to contact the"," ",r.a.createElement("a",{style:{color:"#5cb85c"},href:"mailto:supt-readinessleads@esri.com?subject=Product%20Supportability%20Question"},"Readiness Leads"),". Additionally, please report any issues or bugs to the"," ",r.a.createElement("a",{style:{color:"#5cb85c"},href:"mailto:lxie@esri.com?cc=belan@esri.com&subject=Product%20App%20Issue"},"Developers"),".")),r.a.createElement(ie.a,null,r.a.createElement(j.a,{color:"success",outline:!0,onClick:s},"Okay"))))};le.defaultProps={className:void 0};var se=le,ue=function(){var e=Object(n.useState)(!1),t=Object(u.a)(e,2),a=t[0],o=t[1],c={color:"black",fontSize:"16px",padding:0,margin:0,marginLeft:-15,marginRight:-15};return r.a.createElement(X.a,{dark:!0,style:{backgroundColor:"#206a5d"},expand:"md"},r.a.createElement(Z.a,{style:{cursor:"default"}}," ",r.a.createElement("img",{src:"".concat(".","/esri.png"),style:{width:25,height:25},alt:""})," ","Product to Queue"),r.a.createElement(V.a,{onClick:function(){return o(!a)}}),r.a.createElement(G.a,{isOpen:a,navbar:!0},r.a.createElement(x.a,{className:"mr-auto",navbar:!0},r.a.createElement(P.a,null,r.a.createElement(se,{buttonLabel:"About"})),r.a.createElement(ee.a,{nav:!0,inNavbar:!0},r.a.createElement(te.a,{nav:!0,caret:!0},"Transfer Resources"),r.a.createElement(ae.a,{style:{top:35,left:8,padding:0,margin:-2}},r.a.createElement(ne.a,{className:"highlightStyle"},r.a.createElement(A.a,{style:c,target:"_blank",rel:"noopener noreferrer",href:"https://esri.lightning.force.com/lightning/r/Knowledge__kav/ka15x0000008f0KAAQ/view"},"Data Management")),r.a.createElement(ne.a,{className:"highlightStyle"},r.a.createElement(A.a,{style:c,target:"_blank",rel:"noopener noreferrer",href:"https://esri.lightning.force.com/lightning/r/Knowledge__kav/ka15x0000008kIXAAY/view"},"Developer Products")))))))},he=function(){var e=Object(n.useState)(null),t=Object(u.a)(e,2),a=t[0],o=t[1],c=Object(n.useState)([]),i=Object(u.a)(c,2),h=i[0],d=i[1],f=Object(n.useState)({}),g=Object(u.a)(f,2),b=g[0],v=g[1],y=Object(n.useState)([]),E=Object(u.a)(y,2),w=E[0],k=E[1],z=Object(n.useState)(!1),j=Object(u.a)(z,2),O=j[0],C=j[1],S=function(e){return new Promise((function(t,a){m.a.parse(e,{download:!0,complete:function(e){t(e)},error:function(e){a(e)}})}))},x=function(e){for(var t=[],a={},n=[],r=e[0],o=r.length-1,c=1;c<o-2;c+=2){var i=r[c].replace(/\s/g,"");a[i]=[],n.push(r[c])}return e.forEach((function(e,n){if(0!==n){for(var c={product:e[0]},i="",l="",s=1;s<o-2;s+=2)e[s]&&(l+="".concat(e[s],", "),i+="".concat(r[s],", "),c["b_".concat(r[s].replace(/\s/g,""))]=e[s+1],a[r[s].replace(/\s/g,"")].includes(e[s])||a[r[s].replace(/\s/g,"")].push(e[s]));var u=i.replace(/(^[,\s]+)|([,\s]+$)/g,""),h=l.replace(/(^[,\s]+)|([,\s]+$)/g,"");c.technology=u,c.queue=h,c.supportMethod=e[o-1],e[o]&&e[o].includes("@")?c.email=e[o]:c.url=e[o],t.push(c)}})),{prod:t,tech:a,techList:n}},P=function(e,t){return p()((function(){var a=this;this.pipeline.remove(p.a.stemmer),this.pipeline.remove(p.a.trimmer),this.pipeline.remove(p.a.stopWordFilter),this.searchPipeline.remove(p.a.stemmer),this.searchPipeline.remove(p.a.trimmer),this.searchPipeline.remove(p.a.stopWordFilter),this.ref("product"),this.field("product"),this.field("technology"),t.forEach((function(e){a.field("b_".concat(e.replace(/\s/g,"")))})),e.forEach((function(e){a.add(e)}),this)}))};return Object(n.useEffect)((function(){Object(s.a)(l.a.mark((function e(){var t,a,n,r,c,i,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S("./data/product_queue.csv");case 2:t=e.sent,a=x(t.data),n=a.prod,r=a.tech,c=a.techList,i=P(n,c),s=!(!/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)&&!/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw(n|u)|c55\/|capi|ccwa|cdm|cell|chtm|cldc|cmd|co(mp|nd)|craw|da(it|ll|ng)|dbte|dcs|devi|dica|dmob|do(c|p)o|ds(12|d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(|_)|g1 u|g560|gene|gf5|gmo|go(\.w|od)|gr(ad|un)|haie|hcit|hd(m|p|t)|hei|hi(pt|ta)|hp( i|ip)|hsc|ht(c(| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i(20|go|ma)|i230|iac( ||\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|[a-w])|libw|lynx|m1w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|mcr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|([1-8]|c))|phil|pire|pl(ay|uc)|pn2|po(ck|rt|se)|prox|psio|ptg|qaa|qc(07|12|21|32|60|[2-7]|i)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h|oo|p)|sdk\/|se(c(|0|1)|47|mc|nd|ri)|sgh|shar|sie(|m)|sk0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h|v|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl|tdg|tel(i|m)|tim|tmo|to(pl|sh)|ts(70|m|m3|m5)|tx9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas|your|zeto|zte/i.test(navigator.userAgent.substr(0,4))),v(r),d(n),k(c),o(i),C(s);case 11:case"end":return e.stop()}}),e)})))()}),[]),r.a.createElement($,{buttonClass:"btn btn-success btn-sm ml-2"},r.a.createElement(ue,null),r.a.createElement(U,{index:a,prod:h,tech:b,techList:w,isMobile:O}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(he,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},65:function(e,t,a){e.exports=a(100)},71:function(e,t,a){}},[[65,1,2]]]);
//# sourceMappingURL=main.20803a4e.chunk.js.map