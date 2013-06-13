 /* 2238:minified:js/librarything.js */ 

var LibraryThing=LibraryThing||{};LibraryThing.namespace=function(namespace){var spaces=namespace.split('.');var currentSpace=LibraryThing;var i;for(i=0;i<spaces.length;i++)
{currentSpace[spaces[i]]=currentSpace[spaces[i]]||{};currentSpace=currentSpace[spaces[i]];}};LibraryThing.namespace("utils");LibraryThing.utils.loadScript=function(script,onLoaded){if(typeof LibraryThing.utils.loadScript.head==='undefined')
{LibraryThing.utils.loadScript.head=document.getElementsByTagName("head")[0];}
var s=document.createElement("script");s.type="text/javascript";s.src=script;if(typeof onLoaded!=='undefined')
{s.onloadDone=false;s.onload=function(){s.onloadDone=true;try{onLoaded();}catch(err){}};s.onreadystatechange=function(){if(s.readyState==='loaded'&&!s.onloadDone){s.onloadDone=true;onLoaded();};};}
LibraryThing.utils.loadScript.head.appendChild(s);}; 
 /* 2238:minified:js/widget_wrapper.js */ 

LibraryThing.namespace("bookAPI.wrapper");LibraryThing.bookAPI.wrapper.addGlobalStyle=function(cssInput)
{var styleElement=document.createElement('style');styleElement.setAttribute('type','text/css');if(styleElement.styleSheet)
{styleElement.styleSheet.cssText=cssInput;}
else
{var textNode=document.createTextNode(cssInput);styleElement.appendChild(textNode);}
document.getElementsByTagName('head')[0].appendChild(styleElement);};LibraryThing.bookAPI.wrapper.showLightbox=function(bookID,widgetID,localDomain)
{var params={width:600,height:400,modal:false};if(typeof LibraryThing.bookArea!=='undefined'&&typeof LibraryThing.bookArea.kiosk!=='undefined')
{LibraryThing.bookArea.kiosk.pause();params.callbackFailure=function(){LibraryThing.bookArea.kiosk.unpause();};}
LibraryThing.lightbox.iframe('http://'+localDomain+'/widget_work.php?book='+bookID+'&id='+widgetID,params);};LibraryThing.bookAPI.wrapper.makeWidgetWrapper=function(ltdata,theDiv)
{LibraryThing.namespace("activeWidgets");LibraryThing.activeWidgets.all=LibraryThing.activeWidgets.all||{};LibraryThing.activeWidgets.info=LibraryThing.activeWidgets.info||{};LibraryThing.activeWidgets.info.animatedCount=LibraryThing.activeWidgets.info.animatedCount||0;if(typeof LibraryThing.activeWidgets.all[theDiv]==='undefined')
{var widgetType=ltdata.showWhat;LibraryThing.activeWidgets.all[theDiv]=widgetType;if(widgetType==='covers')
{LibraryThing.activeWidgets.info.animatedCount++;}}
else
{alert('You can only have one of the same widget on any given page.');return;}
var theDestination=document.getElementById(theDiv);LibraryThing.bookAPI.wrapper.addGlobalStyle(ltdata.style);if(ltdata.title!=="")
{var titleDiv=document.createElement("div");titleDiv.className='LT_header';var mainLink=document.createElement("a");if(ltdata.titleLink=='library')
{mainLink.setAttribute('href','http://www.librarything.com/catalog/'+ltdata.theuser);}
else
{mainLink.setAttribute('href','http://www.librarything.com/profile/'+ltdata.theuser);}
mainLink.setAttribute('target','_top');mainLink.innerHTML=ltdata.title;titleDiv.appendChild(mainLink);theDestination.appendChild(titleDiv);}
var contentDiv=document.createElement("div");contentDiv.className="LT_content";contentDiv.setAttribute("id",theDiv+"LT_Content");var preloadDiv=document.createElement("div");preloadDiv.setAttribute("id",theDiv+"preload");preloadDiv.className="LT_Preload";var preloadImg=document.createElement("img");preloadImg.setAttribute("src",ltdata.preloader);preloadDiv.appendChild(preloadImg);contentDiv.appendChild(preloadDiv);theDestination.appendChild(contentDiv);var poweredDiv=document.createElement("div");poweredDiv.setAttribute('style','vertical-align: middle;');var poweredImage=document.createElement("img");var poweredLink=document.createElement("a");var poweredImgLink=document.createElement("a");poweredDiv.className='LT_powered';poweredImage.className="favicon";poweredImage.setAttribute('src',"http://www.librarything.com/favicon.ico");poweredImage.setAttribute('width','16px');poweredImage.setAttribute('height','16px');poweredLink.setAttribute('href','http://www.librarything.com')
poweredLink.setAttribute('target','_top');poweredLink.innerHTML='Powered <span style="white-space: nowrap;">by LibraryThing</span>';poweredImgLink.setAttribute('href','http://www.librarything.com')
poweredImgLink.setAttribute('target','_top');poweredImgLink.appendChild(poweredImage);poweredDiv.appendChild(poweredImgLink);poweredDiv.appendChild(poweredLink);theDestination.appendChild(poweredDiv);return true;}; 
 /* 2238:minified:js/lt_lightbox_widget.js */ 

LibraryThing.lightbox={active:0,yPos:0,xPos:0,css_url:'/css/lt_lightbox.css',ie:(navigator.appName=="Microsoft Internet Explorer"?true:false),dochead:document.getElementsByTagName('head')[0],initialized:false,div_lightbox:null,div_overlay:null,div_content:null,div_loading:null,lb_width:400,lb_height:300,inline_container:null,params:null,hasiframe:false,unload:function(){this.active=false;},init:function()
{this.active=true;try
{if(!this.initialized)
{var body=document.getElementsByTagName('body')[0];this.div_overlay=document.createElement('div');this.div_overlay.id='LT_LB_overlay';this.div_lightbox=document.createElement('div');this.div_lightbox.id='LT_LB';this.div_lightbox.style.display="none";this.div_content=document.createElement('div');this.div_content.id='LT_LB_content';this.div_content.className='LT_LB_content';this.div_content.style.display="none";this.div_loading=document.createElement('div');this.div_loading.id='LT_LB_loading';this.div_loading.style.display="none";this.div_loading.innerHTML="Loading...";this.div_close=document.createElement('div');this.div_close.id='LT_LB_close';body.appendChild(this.div_overlay);body.appendChild(this.div_lightbox);body.appendChild(this.div_close);this.div_lightbox.appendChild(this.div_loading);this.div_lightbox.appendChild(this.div_content);this.params={};this.initialized=true;}}
catch(e)
{this.initialized=false;}},setParams:function(inparams)
{if(inparams)
{this.init();this.params={};for(pp in inparams)
{this.params[pp]=inparams[pp];if(pp=='content_class')
{this.div_content.className=inparams[pp];}
else
{this.div_content.className='LT_LB_content';}}}},setPosition:function()
{var iw=this.params.width;var ih=this.params.height;var iwp=(iw)?iw:this.lb_width;var ihp=(ih)?ih:this.lb_width;var winWidth=0,winHeight=0;var workingLeft=0,workingTop=0;if(typeof(window.innerWidth)=='number')
{winWidth=window.innerWidth;winHeight=window.innerHeight;}
else if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight))
{winWidth=document.documentElement.clientWidth;winHeight=document.documentElement.clientHeight+20;}
else if(document.body&&(document.body.clientWidth||document.body.clientHeight))
{winWidth=document.body.clientWidth;winHeight=document.body.clientHeight;}
if(iwp>winWidth)
{iwp=winWidth;}
if(ihp>winHeight)
{ihp=winHeight;}
this.div_overlay.style.height=winHeight+'px';workingLeft=winWidth-iwp;workingTop=winHeight-ihp;if(workingLeft)
{workingLeft=Math.floor((winWidth-iwp)/2);}
else
{if(this.ie)
{iwp=iwp-40;}}
if(workingTop)
{workingTop=Math.floor((winHeight-ihp)/2);}
else
{if(this.ie)
{ihp=ihp-44;}}
if(this.params.absolute==true)
{this.div_lightbox.style.position='absolute';}
this.div_lightbox.style.width=iwp+'px';this.div_lightbox.style.height=ihp+'px';{this.getScroll();this.prepareIE('100%','hidden');this.setScroll(0,0);this.div_lightbox.style.position='absolute';this.div_lightbox.style.overflow='auto';}
this.div_lightbox.style.top=workingTop+'px';this.div_lightbox.style.left=workingLeft+'px';},iframe:function(contentURL,params)
{if(contentURL)
{if(typeof(window.parent.LibraryThing.lightbox)!='undefined'&&LibraryThing.lightbox.hasiframe==false&&window.parent.LibraryThing.lightbox.hasiframe==true)
{window.parent.LibraryThing.lightbox.iframe(contentURL,params);return false;}
this.init();if(params)
{this.setParams(params);}
this.setPosition();if(this.ie){this.getScroll();this.prepareIE('100%','hidden');this.setScroll(0,0);this.hideSelects('hidden');}
var wasShowing=this.isShowing('LT_LB');var uid=0;var ajaxparams={};if(params)
{if(params['ajaxparams'])
{ajaxparams=params['ajaxparams'];}}
ajaxparams.uid=uid;var lightbox=document.getElementById('LT_LB');var lightbox_content=document.getElementById('LT_LB_content');var lightbox_overlay=document.getElementById('LT_LB_overlay');lightbox_content.innerHTML='';lightbox.style.display='block';var currentWidth=lightbox.offsetWidth-4;var currentHeight=lightbox.offsetHeight-5;var iframeS="<iframe id='LT_iframe' src='"+contentURL;iframeS+="' frameborder='0' scrolling='auto' width='"+currentWidth;iframeS+="' height='"+currentHeight+"'></iframe>";lightbox_content.innerHTML=iframeS;lightbox_overlay.style.display='block';lightbox_content.style.display='block';this.div_close.style.position='absolute';this.div_close.style.padding='0px';this.div_close.style.margin='0px';this.div_close.style.top=lightbox.offsetTop+8+'px';this.div_close.style.left=lightbox.offsetLeft+530+'px';this.div_close.style.zIndex=100000;this.div_close.style.color="#FFFFFF";this.div_close.style.cursor="pointer";this.div_close.innerHTML='<span style="padding: 0px; margin: 0px; font-size:14px; font-family:Verdana,Arial,Helvetica,sans-serif; " onclick="LibraryThing.lightbox.off();">(close)</span>';this.div_close.style.display='inline';LibraryThing.lightbox.ready();this.unload=function(){lightbox_content.innerHTML='';};this.modalCheck();}},off:function(success){this.unload();{this.setScroll(0,this.yPos);this.prepareIE("auto","auto");this.hideSelects("visible");}
if(this.params.absolute)
{this.prepareIE("auto","auto");this.setScroll(0,this.yPos+1);}
this.showhide('LT_LB_overlay',false);this.showhide('LT_LB',false);this.showhide('LT_LB_close',false);if(success)
{if(this.params&&this.params.callbackSuccess)
{LibraryThing.lightbox.cbRun(this.params.callbackSuccess,this.params.callbackParams);this.params.callbackSuccess=null;}}
else
{if(this.params&&this.params.callbackFailure)
{LibraryThing.lightbox.cbRun(this.params.callbackFailure,this.params.callbackParams);this.params.callbackFailure=null;}}},cbRun:function(f,p)
{if(typeof f==='function')
{f(p);}
else if(typeof f!=='undefined')
{var fstring=f+'(';if(p)
{fstring+='p';}
fstring+=')';eval(fbstring);}},ready:function()
{if(this.params&&this.params.callbackReady)
{LibraryThing.lightbox.cbRun(this.params.callbackReady);}},modalCheck:function()
{var overlay=document.getElementById('LT_LB_overlay');if(this.params)
{if(this.params.modal==true)
{overlay.style.cursor='default';}
else
{if(typeof LibraryThing.lightbox.overlayInit==='undefined')
{this.addEvent(overlay,'click',function(event){event.cancelBubble=true;if(event.stopPropagation)
{event.stopPropagation();}
LibraryThing.lightbox.off();});LibraryThing.lightbox.overlayInit=true;}
overlay.style.cursor='default';}}
else
{if(typeof LibraryThing.lightbox.overlayInit==='undefined')
{this.addEvent(overlay,'click',function(event){event.cancelBubble=true;if(event.stopPropagation)
{event.stopPropagation();}
LibraryThing.lightbox.off();});LibraryThing.lightbox.overlayInit=true;}
overlay.style.cursor='hand';}},addEvent:function(elt,evt,func)
{if(typeof elt=='string'){elt=document.getElementById(elt);}
if(elt.addEventListener){elt.addEventListener(evt,func,false);}
else{elt.attachEvent("on"+evt,func);}},removeEvent:function(elt,evt,func)
{if(typeof elt=='string'){elt=document.getElementById(elt);}
if(elt.removeEventListener){elt.removeEventListener(evt,func,false);}
else{elt.detachEvent("on"+evt,elt[evt+func]);elt[evt+func]=null;elt['e'+evt+func]=null;}},showhide:function(elt_id,bool)
{var elt=document.getElementById(elt_id);if(elt)
{elt.style.display=bool?'block':'none';}},isShowing:function(elt_id)
{var elt=document.getElementById(elt_id);if(elt.style.display=='none')
{return false;}
return true;},prepareIE:function(height,overflow)
{var htm=document.getElementsByTagName('html')[0];htm.style.height=height;htm.style.overflow=overflow;htm.style.display='block';},hideSelects:function(visibility){var selects=document.getElementsByTagName('select');for(var i=0;i<selects.length;i++){selects[i].style.visibility=visibility;}},getScroll:function(){if(self.pageYOffset){this.yPos=self.pageYOffset;}else if(document.documentElement&&document.documentElement.scrollTop){this.yPos=document.documentElement.scrollTop;}else if(document.body){this.yPos=document.body.scrollTop;}},setScroll:function(x,y){window.scrollTo(x,y);},addScriptURL:function(url){var script=document.createElement('script');script.type='text/javascript';script.src=url;this.dochead.appendChild(script);},load:function(response,container){container=container||"LT_LB_content";var lb=document.getElementById(container);lb.innerHTML=response;LibraryThing.showhide('LT_LB_loading',false);LibraryThing.showhide('LT_LB_content',true);LibraryThing.showhide('LT_LB_close',true);},parseQuery:function(query){var Params={};if(!query){return Params;}
var Pairs=query.split(/[;&]/);for(var i=0;i<Pairs.length;i++){var KeyVal=Pairs[i].split('=');if(!KeyVal||KeyVal.length!=2){continue;}
var key=unescape(KeyVal[0]);var val=unescape(KeyVal[1]);val=val.replace(/\+/g,' ');Params[key]=val;}
return Params;}}; 
 /* 2238:minified:js/widget_bookswithtext.js */ 

if(!LibraryThing)
{var LibraryThing={};}
if(!LibraryThing.bookAPI)
{LibraryThing.bookAPI={};}
if(typeof(LibraryThing.bookAPI.textWidget)=="undefined"){if(!LibraryThing.bookAPI.textWidget)
{LibraryThing.bookAPI.textWidget={};}
LibraryThing.bookAPI.textWidget.bookLinkAA=new Array();LibraryThing.bookAPI.textWidget.AuthorLinkPattern='/author/MAGICNUMBER';LibraryThing.bookAPI.textWidget.AuthorLinkField='author_code';LibraryThing.bookAPI.textWidget.AuthorLinkString=function(book,widgetSettings)
{var link='http://'+widgetSettings.domain+LibraryThing.bookAPI.textWidget.AuthorLinkPattern;link=link.replace('MAGICNUMBER',book.author_code);return link;}
LibraryThing.bookAPI.textWidget.makeCoverimage=function(book,coverHeight,coverWidth,widgetSettings)
{if(book.cover)
{var coverimage=document.createElement("img");coverimage.className='LT_cover';coverimage.setAttribute('src',book.cover);coverimage.onclick=function getLightbox(){LibraryThing.bookAPI.wrapper.showLightbox(book.book_id,widgetSettings.uniqueKey,widgetSettings.domain);}
if(coverWidth==''){coverimage.setAttribute('height',coverHeight);}
else
{coverimage.setAttribute('width',coverWidth);}
coverimage.setAttribute('title',book.title);return coverimage;}
else
{return null;}}
LibraryThing.bookAPI.textWidget.makeTags=function(book,widgetSettings)
{if(widgetSettings.textsnippets.Tagged==undefined)
{var tagged_wording="Tagged";}
else
{var tagged_wording=widgetSettings.textsnippets.Tagged;}
var tagList=" "+tagged_wording+": "
var theTag=document.createElement("span");theTag.className='LT_tags';var count=0;if(book.tags)
{var tagdisplayA=new Array();for(count=0;count<book.tags.length;count++)
{tagdisplayA.push('<a href="/catalog/'+encodeURI(widgetSettings.theuser)+'&tag='+encodeURI(book.tags[count])+'" target="_top">'+book.tags[count]+'</a>');}
tagList=tagList+tagdisplayA.join(', ');theTag.innerHTML=tagList;return theTag;}
else
{return null;}}
LibraryThing.bookAPI.textWidget.makeTitleandauthorlink=function(book,showTitle,showAuthor,widgetSettings)
{if(widgetSettings.textsnippets.Tagged==undefined)
{var by_wording="by";}
else
{var by_wording=widgetSettings.textsnippets.by;}
var titleandauthorlink=document.createElement("span");titleandauthorlink.className='LT_titleandauthor';var theTitle=document.createElement("span");theTitle.className='LT_title';var theAuthor=document.createElement("span");theAuthor.className='LT_author';if(showTitle==1)
{if(book.title)
{theTitle.innerHTML=book.title;theTitle.onclick=function getLightbox(){LibraryThing.bookAPI.wrapper.showLightbox(book.book_id,widgetSettings.uniqueKey,widgetSettings.domain);}
titleandauthorlink.appendChild(theTitle);}}
if(showAuthor==1&&book.author_fl)
{if(LibraryThing.bookAPI.textWidget.AuthorLinkPattern)
{var byspan=document.createElement("span");byspan.className='by';if(showTitle==1)
{var byText='&nbsp;'+by_wording+' ';byspan.innerHTML=byText;}
theAuthor.appendChild(byspan);var authorlink=document.createElement("a");authorlink.setAttribute('href',LibraryThing.bookAPI.textWidget.AuthorLinkString(book,widgetSettings));authorlink.setAttribute('target','_top');authorlink.innerHTML=book.author_fl;theAuthor.appendChild(authorlink);titleandauthorlink.appendChild(theAuthor);}}
return titleandauthorlink;}
LibraryThing.bookAPI.textWidget.makeBookreview=function(book,widgetSettings)
{if(widgetSettings.textsnippets.readreview==undefined)
{var wording="read review";}
else
{var wording=widgetSettings.textsnippets.readreview;}
if(book.bookreview)
{var bookreview=document.createElement('div');bookreview.className='LT_bookreview';bookreview.innerHTML=book.bookreview;var bookreviewlink=document.createElement("span");bookreviewlink.innerHTML=" (<a href='http://"+widgetSettings.domain+"/review/"+book.book_id+"' target='_top'>"+wording+"</a>)";bookreview.appendChild(bookreviewlink);return bookreview;}
else
{return null;}}
LibraryThing.bookAPI.textWidget.makeBookreviewlink=function(book)
{if(book.hasreview&&book.hasreview==1)
{var bookreviewlink=document.createElement("span");bookreviewlink.className='LT_reviewlink';var readreviewlink=' (<a class="LT_reviewlink" href="http://www.librarything.com/review/'+book.book_id+'" target="_top" >'+'read review'+'</a>)';bookreviewlink.innerHTML=readreviewlink;return bookreviewlink;}
else
{return null;}}
LibraryThing.bookAPI.textWidget.makeRatingimage=function(book,widgetSettings)
{if(book.rating)
{var ratingimage=document.createElement("img");ratingimage.className='LT_rating';var url='http://static.librarything.com/pics/ss'+(book.rating*2)+'.gif';ratingimage.setAttribute('src',url);ratingimage.setAttribute('title',book.rating+widgetSettings.textsnippets.Tagged);return ratingimage;}
else
{return null;}}
LibraryThing.bookAPI.textWidget.makeBasicwidget=function(ltdata,theDiv,onDone){var count=0;var theDestination=document.getElementById(theDiv);var widgetSettings=ltdata.settings;for(i in ltdata.books)
{var book=ltdata.books[i];if(book.book_id)
{var itemdiv=document.createElement("div");if(i==ltdata.books.length-1){itemdiv.className='LT_item';}
else
{itemdiv.className='LT_itemLast';}
itemdiv.setAttribute('id',ltdata.settings.uniqueKey+book.book_id+'LT_item');if(ltdata.settings.show.showCovers)
{if(book.cover)
{itemdiv.appendChild(LibraryThing.bookAPI.textWidget.makeCoverimage(book,ltdata.settings.coverheight,ltdata.settings.coverwidth,widgetSettings));}}
var titleandauthor=LibraryThing.bookAPI.textWidget.makeTitleandauthorlink(book,ltdata.settings.show.showTitles,ltdata.settings.show.showAuthors,widgetSettings);titleandauthor.id=ltdata.settings.uniqueKey+book.book_id;itemdiv.appendChild(titleandauthor);if(ltdata.settings.show.showRatings==1)
{theRatings=LibraryThing.bookAPI.textWidget.makeRatingimage(book,widgetSettings);if(theRatings){itemdiv.appendChild(theRatings)}}
if(ltdata.settings.show.showTags==1)
{theTags=LibraryThing.bookAPI.textWidget.makeTags(book,widgetSettings);if(theTags){itemdiv.appendChild(theTags)}}
if(ltdata.settings.show.showReviews==1)
{theReviews=LibraryThing.bookAPI.textWidget.makeBookreview(book,widgetSettings);if(theReviews){itemdiv.appendChild(theReviews)}}
var theTable=document.getElementById("iframeTable");var clearOut=document.createElement("div");clearOut.className="clearer";itemdiv.appendChild(clearOut);theDestination.appendChild(itemdiv);count++;}}
var booklinksdiv=document.createElement("div");booklinksdiv.id='LT_booklinksdiv';booklinksdiv.className='LT_booklinks';booklinksdiv.style.display='none';booklinksdiv.style.position='absolute';theDestination.appendChild(booklinksdiv);if(typeof onDone!=='undefined')
{var maxImageHeight=parseInt(widgetSettings.coverwidth.substr(0,(widgetSettings.coverwidth.length-2)));onDone(Math.floor(maxImageHeight*0.7*count));}}} 
 /* 2238:minified:js2/mmlog.js */ 

var mmlogging=true;var mmgrouping=mmlogging?true:false;var mmlog=function(msg,type){if(mmlogging===false){return;}
type=type||'log';if(window.console&&(window.console!=undefined)){if((type==='dir')&&WebKitDetect.isWebKit()){type='log';}
if(typeof console[type]==='function'){console[type](msg);}}}
var mmgroup=function(title,collapsed){if(!mmgrouping||mmlogging===false||WebKitDetect.isWebKit()){mmlog(title,'info');return;}
if(window.console&&(window.console!=undefined)){if(typeof console.group=='function'){if(collapsed&&!(WebKitDetect.isWebKit())){console.groupCollapsed(title);}
else{console.group(title);}}}}
var mmgroupend=function(){if(!mmgrouping||mmlogging===false||WebKitDetect.isWebKit()){return;}
if(window.console&&(window.console!=undefined)){if(typeof console.groupEnd=='function'){console.groupEnd();}}}
var mmtime=function(name){if(mmlogging===false||WebKitDetect.isWebKit()){return;}
if(window.console&&(window.console!=undefined)){if(typeof console.time=='function'){console.time(name);}}}
var mmtimeend=function(name){if(mmlogging===false||WebKitDetect.isWebKit()){return;}
if(window.console&&(window.console!=undefined)){if(typeof console.timeEnd=='function'){console.timeEnd(name);}}}
var mmprofile=function(name){if(mmlogging===false||WebKitDetect.isWebKit()){return;}
if(window.console&&(window.console!=undefined)){if(typeof console.profile=='function'){console.profile(name);}}};var mmprofileend=function(name){if(mmlogging===false||WebKitDetect.isWebKit()){return;}
if(window.console&&(window.console!=undefined)){if(typeof console.profileEnd=='function'){console.profileEnd(name);}}};var mmtrace=function(){if(mmlogging===false||WebKitDetect.isWebKit()){return;}
if(window.console&&(window.console!=undefined)){if(typeof console.trace=='function'){console.trace();}}};function print_rr(ob,indent){indent=indent||1;var out="";if(typeof ob==='undefined'){out+='undefined';return out;}
if(typeof ob==='string'){out+=ob;return out;}
if(typeof ob==='number'){out+=ob;return out;}
if(typeof ob==='boolean'){if(ob){out+='TRUE';}
else{out+='FALSE';}
return out;}
if(typeof ob==='object'){var open='{';var closed='}';var t='Object';if(ob.length){open='[';closed=']';t='Array';}
out+=t+"\n";for(i=0;i<(indent-1);i++){out+="\t";}
out+=open;$.each(ob,function(k,v){out+="\n";for(i=0;i<indent;i++){out+="\t";}
out+=print_rr(k,(indent))+' : '+print_rr(v,(indent+1));});out+="\n";for(i=0;i<(indent-1);i++){out+="\t";}
out+=closed;return out;}
if(typeof ob==='function'){out+='function();';return out;}
return(typeof ob);};var w588a78173c8fafe30783c4f58f6dd760widgetStructure = {"amazonchoice":{"name":"Amazon.com","country":"USA","pattern":"http:\/\/www.amazon.com\/exec\/obidos\/ASIN\/MAGICNUMBER\/ref=nosim\/librarythin08-20"},"show":{"showCovers":"1","showAuthors":"1","showTitles":"1","showRatings":"1","showDates":null,"showReviews":"1","showTags":"1"},"style":"\n\ndiv#w588a78173c8fafe30783c4f58f6dd760\n{\nline-height:130%;\nborder: 0px solid #E5D8D0;width: 150px;background-color: ;\n-moz-border-radius: 12px;\n\t\t\t-webkit-border-radius: 12px;font-family: Verdana, Sans-serif; font-weight: normal;\ncolor: #000000;\nfont-size: 12px;\ntext-decoration:none;\nposition: relative;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 a:link\n{\ncolor: #000000;\ntext-decoration:none;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 a:visited\n{\ncolor: #000000;\ntext-decoration:none;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 a:active\n{\ncolor: #000000;\ntext-decoration:none;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 a:hover\n{\ncolor: #000000;\ntext-decoration:underline;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 div.LT_content\n{\npadding: 0px;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 div.LT_header\n{\nmargin: 2px 0 0 0;\nfont-family: Verdana, Sans-serif; font-weight: bold;\ncolor: #966446;\nfont-size: 12px;\nline-height:130%;\npadding: 5px 1em; \ntext-align: center; \nborder-bottom: 0px solid #E5D8D0;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 div.LT_header a:link\n{\ncolor: #966446;\ntext-decoration:none;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 div.LT_header a:visited\n{\ncolor: #966446;\ntext-decoration:none;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 div.LT_header a:active\n{\ncolor: #966446;\ntext-decoration:none;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 div.LT_header a:hover\n{\ncolor: #966446;\ntext-decoration:underline;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 .LT_body\n{\n\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 .LT_title\n{\ncursor:pointer;\n}\n\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 div.LT_bookreview\n{\nfont-family: Verdana, Sans-serif; font-weight: normal;\ncolor: #000000;\nfont-size: 10px;\nmargin-top: 5px;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 div.LT_bookreview a:link\n{\ncolor: #000000;\ntext-decoration:none;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 div.LT_bookreview a:visited\n{\ncolor: #000000;\ntext-decoration:none;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 div.LT_bookreview a:active\n{\ncolor: #000000;\ntext-decoration:none;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 div.LT_bookreview a:hover\n{\ncolor: #000000;\ntext-decoration:underline;\n}\n\n\n\n\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 .LT_tags\n{\ndisplay: block;\nfont-size: 9px;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 .LT_powered\n{\npadding: 5px 0px 5px 0px;\nfont-family: Verdana, Sans-serif; font-weight: bold;\ncolor: #966446;\nfont-size: 10px;\ntext-align: center; \nfont-size: px;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 .LT_powered a:link\n{\ncolor: #966446;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 .LT_powered a:visited\n{\ncolor: #966446;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 .LT_powered a:active\n{\ncolor: #966446;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 .LT_powered a:hover\n{\ncolor: #966446;\n}\n\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 .LT_powered img\n{\nborder: 0;\n}\n\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 .LT_item\n{\nclear: both;\nmargin:0px;\nborder-bottom: 1px solid #E5D8D0;\npadding:10px 10px;\n\n} \n\ndiv#w588a78173c8fafe30783c4f58f6dd760 .LT_itemLast\n{\nclear: both;\nmargin:0px;\nborder-bottom: 0px solid #E5D8D0;\npadding:10px 10px;\n\n} \n\ndiv#w588a78173c8fafe30783c4f58f6dd760 .LT_coverdisplay\n{\nborder-bottom: 0px solid #E5D8D0 !important;\n\/*padding:10px 10px;*\/\nmargin-bottom: 0px;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 .LT_cover\n{\n\t\tmargin-left: 0px;\n\t\tmargin-bottom: 10px;\n\t\tmargin-right: 10px;\n\t\tmargin-top: 0px;display: inline;\n\t\t\t\t\t\t\tfloat: left;\ncursor:pointer;\n\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 img.LT_cover\n{\nborder: 2px solid #eeeeee !important;\n\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 img.LT_rating\n{\ndisplay: block;\nmargin: 5px 0px 5px 0px;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 div.clearer\n{\nclear: both;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 div#LT_booklinksdiv\n{\nbackground-color: white;\npadding: 7px;\nborder: 2px solid #BBBBBB;\nz-index: 1000;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 img.favicon\n{\nwidth: 16px;\nheight: 16px;\nmargin: 0 5px 0 5px;\nvertical-align: middle;\n}\n\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 table.tablerow td\n{\npadding: 2px 0px 8px 0px;\ntext-align: left;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 table.tablerow b\n{\ncolor: gray;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 .tooltip\n{\nborder: 1px solid #A18C6D !important;\nbackground-color: #FCF8CB !important;\ncolor: #505050 !important;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 .LT_Preload\n{\ntext-align:center;\nmargin-bottom:5px;\npadding:5px;\nborder-bottom: 0px solid #E5D8D0;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 .LT_Preload img \n{\nbackground-color: #FFFFFF !important;\npadding: 5px;\nborder: 1px solid #E5D8D0;\n-moz-border-radius: 12px;\n\t\t\t-webkit-border-radius: 12px;\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 .nullset\n{\ntext-align:center;\nborder-bottom: 1px solid #E5D8D0;\npadding:10px 10px;\n\n}\n\ndiv#w588a78173c8fafe30783c4f58f6dd760 .by\n{\n\n}\n#LT_LB_overlay\n{\nbackground-color:#000;\ndisplay:none;\nheight:100%;\nwidth:100%;\n-moz-opacity: 0.4;\nopacity:.40;\nfilter: alpha(opacity=40);\nposition:absolute;\nleft:0px;\ntop:0px;\nright:0px;\nbottom:0px;\nz-index:5000 !important;\n}\n\n#LT_LB_overlay[id]\n{\nposition:fixed;\n}\n\n_lightboxContent\n{\nheight: 500px;\noverflow: auto;\n}\n\n_lightboxContent\n{\nmargin: 5px;\ndisplay: none;\nposition: fixed;\npadding: 20px !important;\nborder: 2px solid black !important;\nmargin:-250px 0pt 0pt -375px;\nz-index:1000 !important;\ntop:50%;\nleft:50%;\nbackground-color: white;\nwidth:750px;\nfont-size: 12px;\n}\n\n_lightboxContent *\n{\nz-index:1000 !important;\n}\n\n_lightboxContent h1, div#_lightboxContent h2\n{\nfont-size: 16px;\nmargin: 0px 0px 15px 0px; \npadding: 0px;\n}\n\n_lightboxContent h2\n{\nfont-size: 14px;\n}\n\n_lightboxContent .right\n{\nfont-size: 12px;\n}\n\n_lightboxContent img\n{\nmargin: 0px 10px 10px 0px;\nborder: 1px solid #CCC;\n}\n\n\n#LT_LB\n{\nborder: 2px solid #4A3B30 !important;\nborder: 2px solid #232323 !important;\ndisplay:none;\n\/* margin:-250px 0 0 -375px; *\/\nfont-size: 12px;\nposition: fixed;\ntop:50%;\nleft:50%;\nz-index: 5001 !important;\nheight: auto;\nwidth: 600px;\nbackground-color: white;\noverflow: auto;\noverflow-y: auto;\noverflow-x: hidden;\n\n-webkit-box-shadow: 0px 3px 10px #000;\n-moz-box-shadow: 0px 3px 10px #000;\n\/*\n-webkit-border-radius: 10px;\n-moz-border-radius: 10px;\n*\/\n}\n\n#LT_LB ul, #LT_LB p { margin:0; padding: 0; }\n\n#LT_LB ul { list-style-type: none; }\n\n#LT_LB li { margin: 10px 0px 5px 0px; }\n\n#LT_LB_loading {\npadding: 15px;\n}\n\ndiv.lightbox *\n{\nz-index:500 !important;\n}\n\n.LT_LB_content\n{\npadding: 0px !important;\n}\n\n.LT_LB_content .ajax_setsort_submit\n{\npadding: 20px;\n}\n\n#LT_LB_content .sectionTitle \n{\nmargin-top:10px;\n}\n\niframe#LT_iframe\n{\nborder-style: none;\n}\n\n","title":"","titleLink":"profile","theuser":"KamiSLO","powered":"Powered by ","uniqueKey":"w588a78173c8fafe30783c4f58f6dd760","bookcount":0,"preloader":"http:\/\/www.librarything.com\/pics\/ajax-loader.gif","showWhat":"books","loadCoverJS":0,"coverheight":"px","coverwidth":"45px"};LibraryThing.bookAPI.wrapper.makeWidgetWrapper(w588a78173c8fafe30783c4f58f6dd760widgetStructure, "w588a78173c8fafe30783c4f58f6dd760");

LibraryThing.namespace("activeWidgets");

// window.onresize is only honored in ie. trying to deal with case where its set to reload the page on resize
if (typeof window.onresize !== "undefined")
{
window.onresize = null;
}

//LibraryThing.debug = 6;
//LibraryThing.namespace("bookArea");
//LibraryThing.bookArea.debug = function(msg, cat, src) {
//	if (typeof YAHOO !== "undefined")
//		{
//		YAHOO.log(msg, cat, src);
//		}
//};
//var debug = LibraryThing.bookArea.debug;

if (typeof LibraryThing.bookAPI.widgetGetModuleLoaded === "undefined" || !LibraryThing.bookAPI.widgetGetModuleLoaded)
	{
	LibraryThing.bookAPI.widgetGetModuleLoaded = true;
	LibraryThing.activeWidgets.animated = LibraryThing.activeWidgets.animated || [];

	// this gets called after each widget loads so we can hide the preloader at the right time for different widget types
	LibraryThing.bookAPI.onDoneWidgetContents = function(id, extraHeight) {
		//debug("onDoneWidgetContents", "function start", id);
		var preload = id + "preload";
		var thePreloader = 	document.getElementById(preload);
		thePreloader.style.display = "none";				
		// this is called when the widget is being built on our site @ widget.php
		if (typeof LT_resizeParent !== "undefined")
			{
			LT_resizeParent(extraHeight);
			}
		};

	// register animated widgets so they can be built sequentially (instead of them all trying to load at once)
	// this exists mostly to handle safaris js loading issues that come up when you have more than one widget on page
	LibraryThing.bookAPI.registerAnimatedWidget = function(widgetid, userid) {	
		//debug("registerAnimatedWidget", "function start", widgetid);
		LibraryThing.activeWidgets.animated.push({
			widgetid: widgetid,
			userid: userid
			});
		};
   
	// load up next widget thats waiting to be initialized
	LibraryThing.bookAPI.loadNextWidget = function() {
		//debug("loadNextWidget (" + LibraryThing.activeWidgets.animated.length + ")", "function start");
		if (LibraryThing.activeWidgets.animated.length > 0)
			{
			var widget = LibraryThing.activeWidgets.animated.shift();
			//debug("loadNextWidget", "info", widget.widgetid);
			LibraryThing.bookAPI.loadBooks(widget.widgetid, widget.userid, true);
			}
		};

	// how many seconds to keep watching
	LibraryThing.bookAPI.watchTimeout = 120;
	// how often to watch
	LibraryThing.bookAPI.watchDelay = 3;

	// watch to make sure the widgets all load
	LibraryThing.bookAPI.watchWidgets = function() {
		//debug("watchWidgets", "function start");
		// keep track of when we started watching
		LibraryThing.bookAPI.watchWidgets.startedWatching = LibraryThing.bookAPI.watchWidgets.startedWatching || new Date().getTime();
		var timeElapsed = new Date().getTime() - LibraryThing.bookAPI.watchWidgets.startedWatching;
		//debug("watchWidgets (" + (timeElapsed >= LibraryThing.bookAPI.watchTimeout * 1000) + ")", "info");
		LibraryThing.bookAPI.loadNextWidget();
		// keep running it every X seconds until Y time has elapsed
		if (timeElapsed < LibraryThing.bookAPI.watchTimeout * 1000)
			{
			setTimeout(function() {
				LibraryThing.bookAPI.watchWidgets();
				}, LibraryThing.bookAPI.watchDelay * 1000);
			}
		};

	// show widget contents, handle whatever might be different from widget type to widget type
	LibraryThing.bookAPI.displayWidgetContents = function (theResults, theDestination)
		{
		//debug("displayWidgetContents", "function start");
		if (theResults.settings.showWhat === "covers") //condition to choose which type of widget to use
			{
			// Not sure why we need this safety net but it works, otherwise occasionally on Safari 
			// bookArea namespace isnt ready when you get here
			if (typeof LibraryThing.bookArea !== "undefined")
				{
				var display = LibraryThing.bookArea.makeWidgetBookArea(theResults, theDestination, function() {
					LibraryThing.bookAPI.onDoneWidgetContents(theResults.settings.uniqueKey);
					if (typeof LibraryThing.bookAPI.watchWidgets.startedWatching === "undefined")
						{
						LibraryThing.bookAPI.watchWidgets();
						}
					});
				}
			else
				{
				setTimeout(function() {
					LibraryThing.bookAPI.displayWidgetContents(theResults, theDestination);
					}, 250);
				}
			}
		else
			{
			LibraryThing.bookAPI.textWidget.makeBasicwidget(theResults, theDestination, function(extraHeight) {
				LibraryThing.bookAPI.onDoneWidgetContents(theResults.settings.uniqueKey, extraHeight);
				//LibraryThing.bookAPI.loadNextWidget();
				});
			}
		};

	// call this if there are not enough books or some other reason you cant show the widget in its all its glory
	LibraryThing.bookAPI.displayEmptySet = function (theResults, theDestinationID, theMessage)
		{
		LibraryThing.bookAPI.onDoneWidgetContents(theResults.settings.uniqueKey);
		theMessage = theMessage || theResults.settings.nullSetMsg;
		var theEmpty = document.createElement("div");
		theEmpty.className = "nullset";
		theEmpty.innerHTML = theMessage;
		var theDestination = document.getElementById(theDestinationID);
		theDestination.appendChild(theEmpty);
		};	
	
	// build the content of the widget
	LibraryThing.bookAPI.getWidgetContents = function(widgetid, userid, loadCoverJS)
		{
		//debug("getWidgetContents", "function start", widgetid);
		// If its animated load stuff well need before load books
		if (loadCoverJS)
			{
			// needed for multi widgets per page, if its the first widget get the dependencies 
			// and make the widget, if its not just register it and itll get made later
			//debug("getWidgetContents", "info", widgetid);
			if (typeof LibraryThing.bookAPI.covereffectsLoading === "undefined" || !LibraryThing.bookAPI.covereffectsLoading)
				{
				//debug("covereffectsLoading", "flag", widgetid);
				LibraryThing.bookAPI.covereffectsLoading = true;
				//var url;
				var requirejQuery = 1;
				if (typeof window.jQuery !== "undefined")
					{
					requirejQuery = 0;
					}
				LibraryThing.utils.loadScript(
						"http://www.librarything.com/js/bookarea-min.php?mode=widget&mutliple=1&requirejQuery=" + requirejQuery
					);
				LibraryThing.bookAPI.loadBooks(widgetid, userid, loadCoverJS);
				}
			else
				{
				LibraryThing.bookAPI.registerAnimatedWidget(widgetid, userid);
				}
			}
		else
			{
			// If its not animated go ahead and just load it
			LibraryThing.bookAPI.loadBooks(widgetid, userid, loadCoverJS);
			}
		};
		
	// get the book data from the json api
	LibraryThing.bookAPI.loadBooks = function(widgetid, userid, loadCoverJS)
		{
		//debug("loadBooks", "function start", widgetid);
		var theidS = widgetid + "LT_Content";
		var actualWidth = document.getElementById(theidS).offsetWidth;
		LibraryThing.utils.loadScript(
			"http://www.librarything.com/api_getdata.php?userid="+userid+"&actualWidth="+actualWidth+"&theID="+widgetid+"&"+""
			);
		};
	}

var isPageLoaded;
if (typeof isPageLoaded === "undefined")
	{
	if (window.addEventListener)
		{
		window.addEventListener("load", function() {
			LibraryThing.bookAPI.getWidgetContents("w588a78173c8fafe30783c4f58f6dd760", "KamiSLO", 0); }, false);
		}
	else if (window.attachEvent)
		{
		window.attachEvent("onload", function() { 
			LibraryThing.bookAPI.getWidgetContents("w588a78173c8fafe30783c4f58f6dd760", "KamiSLO", 0); });
		}
	isPageLoaded = 1;
	}
else
	{
	LibraryThing.bookAPI.getWidgetContents("w588a78173c8fafe30783c4f58f6dd760", "KamiSLO", 0); 
	}
