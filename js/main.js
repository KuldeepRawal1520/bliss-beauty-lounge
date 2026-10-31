/* Friendly salon interactions. Static HTML remains complete without JavaScript. */
(function(){
"use strict";
var cfg=window.BLISS_CONFIG||{},reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches,fxOff=new URLSearchParams(location.search).get("fx")==="off";if(fxOff)document.documentElement.classList.add("fx-off");
function safe(fn){try{fn()}catch(e){console.warn("Bliss enhancement:",e)}}
function timeText(t){var a=t.split(":").map(Number),h=a[0]%12||12;return h+(a[1]?":"+String(a[1]).padStart(2,"0"):"")+(a[0]>=12?" p.m.":" a.m.")}
safe(function(){var parts=new Intl.DateTimeFormat("en-CA",{timeZone:cfg.timezone,weekday:"long",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(new Date()),v={};parts.forEach(function(x){v[x.type]=x.value});var h=cfg.hours&&cfg.hours[v.weekday.toLowerCase()];if(!h)return;var now=+v.hour*60+(+v.minute),open=+h.open.slice(0,2)*60+(+h.open.slice(3)),close=+h.close.slice(0,2)*60+(+h.close.slice(3)),s=document.getElementById("open-status"),chip=document.querySelector(".open-chip");if(s)s.textContent=now>=open&&now<close?"Open now · closes "+timeText(h.close):"Closed now · opens "+timeText(h.open);if(chip&&!(now>=open&&now<close))chip.classList.add("closed")});
safe(function(){document.querySelectorAll("[data-phone]").forEach(function(a){if(cfg.phoneHref)a.href="tel:"+cfg.phoneHref});document.querySelectorAll("[data-directions]").forEach(function(a){if(cfg.directionsUrl)a.href=cfg.directionsUrl});document.querySelectorAll("[data-address]").forEach(function(a){if(cfg.address)a.textContent=cfg.address});document.querySelectorAll("[data-phone-text]").forEach(function(a){if(cfg.phone)a.textContent=cfg.phone});document.querySelectorAll("[data-instagram]").forEach(function(a){if(cfg.socials&&cfg.socials.instagram)a.href=cfg.socials.instagram})});
safe(function(){var d=document.getElementById("hours-sheet"),b=document.getElementById("mobile-hours"),c=document.getElementById("hours-close");function show(){if(!d)return;if(d.showModal)d.showModal();else d.setAttribute("open","")}if(b)b.addEventListener("click",show);if(c)c.addEventListener("click",function(){if(d.close)d.close();else d.removeAttribute("open")});if(d)d.addEventListener("click",function(e){if(e.target===d&&d.close)d.close()})});
safe(function(){var tabs=[].slice.call(document.querySelectorAll('[role="tab"]')),panels=[].slice.call(document.querySelectorAll(".service-panel"));function select(i){tabs.forEach(function(t,n){t.setAttribute("aria-selected",String(n===i));t.tabIndex=n===i?0:-1});panels.forEach(function(p,n){p.hidden=n!==i})}tabs.forEach(function(t,i){t.addEventListener("click",function(){select(i)});t.addEventListener("keydown",function(e){if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();var n=(i+(e.key==="ArrowRight"?1:tabs.length-1))%tabs.length;tabs[n].focus();select(n)}})});if(!reduce)select(0)});
safe(function(){var strip=document.querySelector(".review-strip"),prev=document.getElementById("review-prev"),next=document.getElementById("review-next"),dots=document.querySelectorAll(".review-dots i");if(!strip||!prev||!next)return;var items=strip.querySelectorAll("blockquote");function move(dir){strip.scrollBy({left:dir*(items[0]?items[0].getBoundingClientRect().width+20:strip.clientWidth*.8),behavior:reduce?"auto":"smooth"})}prev.addEventListener("click",function(){move(-1)});next.addEventListener("click",function(){move(1)});function mark(){if(!items.length)return;var idx=Math.round(strip.scrollLeft/(items[0].offsetWidth+20));dots.forEach(function(d,i){d.classList.toggle("active",i===idx)})}strip.addEventListener("scroll",mark,{passive:true});mark()});
safe(function(){var track=document.getElementById("gallery-track"),cards=track&&[].slice.call(track.querySelectorAll(".hall-card")),prev=document.getElementById("gallery-prev"),next=document.getElementById("gallery-next"),dots=document.getElementById("gallery-dots");if(!track||!cards.length)return;function step(dir){var card=cards[0],gap=15;track.scrollBy({left:dir*(card.getBoundingClientRect().width+gap),behavior:reduce?"auto":"smooth"})}if(prev)prev.addEventListener("click",function(){step(-1)});if(next)next.addEventListener("click",function(){step(1)});if(dots){cards.forEach(function(c,i){var b=document.createElement("button");b.type="button";b.setAttribute("aria-label","Show photo "+(i+1));b.addEventListener("click",function(){cards[i].scrollIntoView({behavior:reduce?"auto":"smooth",block:"nearest",inline:"center"})});dots.appendChild(b)});var indicators=dots.querySelectorAll("button");function update(){var mid=track.scrollLeft+track.clientWidth/2,active=0,best=Infinity;cards.forEach(function(c,i){var d=Math.abs(c.offsetLeft+c.offsetWidth/2-mid);if(d<best){best=d;active=i}});cards.forEach(function(c,i){c.classList.toggle("is-centred",i===active)});indicators.forEach(function(b,i){b.classList.toggle("active",i===active)})}track.addEventListener("scroll",function(){requestAnimationFrame(update)},{passive:true});update()}});

/* Hero motion: isolated from the site's functional enhancements. */
safe(function(){
 var cluster=document.querySelector(".mirror-cluster"),stage=document.querySelector(".mirror-stage"),mirrors=[].slice.call(document.querySelectorAll(".mirror")),stars=document.querySelector(".hero-stars"),scissors=document.querySelector(".hero-scissors"),hero=document.querySelector(".hero");
 if(!cluster||!stage||!hero||!mirrors.length)return;
 var mobile=matchMedia("(max-width:760px)").matches,staticMode=reduce||fxOff||!window.gsap,loops=[];
 if(stars){for(var i=0;i<(mobile?6:12);i++){var s=document.createElement("i");s.className="hero-star "+(i%4===0?"red":"dark");s.style.left=(7+(i*37)%87)+"%";s.style.top=(8+(i*29)%82)+"%";s.style.setProperty("--star-z",[-80,0,80][i%3]+"px");stars.appendChild(s)}}
 mirrors.forEach(function(m){var edge=m.querySelector(".mirror-extrusion");if(edge){for(var n=1;n<=5;n++){var layer=document.createElement("i");layer.className="extrusion-layer";layer.style.cssText="position:absolute;inset:0;border:2px solid #1A1917;border-radius:inherit;transform:translateZ(-"+(n*2)+"px);pointer-events:none";edge.appendChild(layer)}}});
 if(staticMode)return;
 gsap.registerPlugin(ScrollTrigger);
 mirrors.forEach(function(m,i){
  var float=gsap.timeline({repeat:-1,yoyo:true,paused:true});
  float.to(m,{y:i===1?-10:10,rotateY:i===0?-14:i===2?14:4,duration:6.5+i*.8,ease:"sine.inOut"});
  loops.push(float);
  var shadow=m.querySelector(".mirror-shadow");if(shadow){var sh=gsap.to(shadow,{scaleX:.82,opacity:.3,duration:3.4+i*.35,repeat:-1,yoyo:true,ease:"sine.inOut",paused:true});loops.push(sh)}
  var glint=m.querySelector(".mirror-glint");if(glint){var shine=gsap.fromTo(glint,{xPercent:-120},{xPercent:260,duration:1.1,repeat:-1,repeatDelay:5.9,delay:i*2,ease:"sine.inOut",paused:true});loops.push(shine)}
 });
 if(scissors){
  var snip=gsap.timeline({repeat:-1,repeatDelay:2.8,paused:true});
  snip.to(scissors,{rotateY:20,rotateZ:-25,duration:2,ease:"sine.inOut"});
  snip.to(scissors.querySelector(".blade-a"),{rotation:14,duration:.12,yoyo:true,repeat:1,transformOrigin:"90px 92px",ease:"power1.inOut"},"+=.05");
  snip.to(scissors.querySelector(".blade-b"),{rotation:-14,duration:.12,yoyo:true,repeat:3,transformOrigin:"90px 92px",ease:"power1.inOut"},"<");
  snip.to(scissors,{rotateY:0,duration:2,ease:"sine.inOut"},"<");loops.push(snip);
  var spark=gsap.to(".scissor-sparkle",{scale:1,opacity:1,duration:.2,repeat:-1,yoyo:true,repeatDelay:1.5,stagger:.2,paused:true});loops.push(spark);
 }
 if(stars)stars.querySelectorAll(".hero-star").forEach(function(s,i){var tw=gsap.to(s,{opacity:i%4===0?.8:.55,scale:1.15,duration:1.4+(i%3)*.4,repeat:-1,yoyo:true,repeatDelay:.8+(i%4)*.3,ease:"sine.inOut",paused:true});var drift=gsap.to(s,{x:(i%2?7:-7)*(1+(i%3)),y:(i%2?-9:9)*(1+(i%3)),duration:8+(i%3)*3,repeat:-1,yoyo:true,ease:"sine.inOut",paused:true});loops.push(tw,drift)});
 var light=gsap.to(".hero-spotlight",{opacity:.4,duration:4,repeat:-1,yoyo:true,ease:"sine.inOut",paused:true});var scriptDrift=gsap.to(".hero-script",{x:10,y:-8,duration:12,repeat:-1,yoyo:true,ease:"sine.inOut",paused:true});loops.push(light,scriptDrift);
 document.querySelectorAll(".strand").forEach(function(p,i){gsap.to(p,{strokeDashoffset:0,duration:1.8,delay:i*.3,ease:"power1.out"});var drift=gsap.to(p,{x:i?12:-12,y:i?-8:8,duration:7+i*2,repeat:-1,yoyo:true,ease:"sine.inOut",paused:true});loops.push(drift)});
 ScrollTrigger.create({trigger:hero,start:"top top",end:"bottom top",scrub:true,onUpdate:function(self){var p=self.progress;gsap.set(".mirror-left",{rotateY:-10-28*p,transformOrigin:"left center"});gsap.set(".mirror-right",{rotateY:10+28*p,transformOrigin:"right center"});gsap.set(".mirror-main",{z:-200*p});gsap.set(".hero-copy",{y:-45*p})}});
 function active(on){hero.classList.toggle("hero-motion-active",on);loops.forEach(function(t){if(on)t.play();else t.pause()})}
 if("IntersectionObserver"in window){var observer=new IntersectionObserver(function(entries){entries.forEach(function(e){active(e.isIntersecting)})},{threshold:.12});observer.observe(hero)}else active(true);
 if(!mobile&&matchMedia("(pointer:fine)").matches){
  var tx=0,ty=0,cx=0,cy=0,raf=0;
  function easePointer(){cx+=(tx-cx)*.075;cy+=(ty-cy)*.075;gsap.set(stage,{rotateY:cx,rotateX:-cy});mirrors.forEach(function(m,i){gsap.set(m,{x:cx*(i-1)*.28})});if(Math.abs(tx-cx)>.08||Math.abs(ty-cy)>.08)raf=requestAnimationFrame(easePointer);else raf=0}
  cluster.addEventListener("pointermove",function(e){var r=cluster.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*16;ty=((e.clientY-r.top)/r.height-.5)*10;if(!raf)raf=requestAnimationFrame(easePointer)});
  cluster.addEventListener("pointerleave",function(){tx=0;ty=0;if(!raf)raf=requestAnimationFrame(easePointer)});
 }else if(mobile){var sway=gsap.to(stage,{rotateY:3,rotateX:1.5,duration:7,repeat:-1,yoyo:true,ease:"sine.inOut",paused:true});loops.push(sway);ScrollTrigger.create({trigger:hero,start:"top top",end:"bottom top",scrub:true,onUpdate:function(s){gsap.set(stage,{rotateX:4*s.progress})}})}
});
/* THE CUT intro: JS-created overlay and one choreographed GSAP timeline. */
safe(function(){
 var root=document.documentElement;if(!root.classList.contains("intro-pending")||reduce||fxOff)return;
 var overlay=document.createElement("div");overlay.className="brand-intro";
 overlay.innerHTML='<div class="intro-vignette"></div><div class="intro-flash"></div><i class="intro-paper ivory"></i><i class="intro-paper charcoal"></i><i class="intro-paper deep"></i><div class="intro-stars"></div><div class="intro-logo-wrap"><div class="intro-name">Bliss<span class="descriptor">BEAUTY LOUNGE</span></div></div><i class="intro-cutline"></i><svg class="intro-scissors" viewBox="0 0 180 180"><g class="scissor-blade blade-a"><path d="M89 91 L20 18 Q8 6 3 18 Q0 29 13 38 L83 103" fill="#F1EEDB" stroke="#1A1917" stroke-width="2"/></g><g class="scissor-blade blade-b"><path d="M91 91 L158 18 Q170 6 176 18 Q179 29 166 38 L97 103" fill="#F1EEDB" stroke="#1A1917" stroke-width="2"/></g><circle cx="90" cy="92" r="7" fill="#F02B1F" stroke="#1A1917" stroke-width="2"/></svg><div class="intro-half top"></div><div class="intro-half bottom"></div><button class="intro-skip" type="button">Skip</button>';
 document.body.appendChild(overlay);
 var papers=overlay.querySelectorAll(".intro-paper"),name=overlay.querySelector(".intro-name"),logo=overlay.querySelector(".intro-logo-wrap"),sc=overlay.querySelector(".intro-scissors"),skip=overlay.querySelector(".intro-skip"),stars=overlay.querySelector(".intro-stars"),done=false,tl=null;
 for(var i=0;i<8;i++){var star=document.createElement("i");star.className="intro-star";star.textContent="✦";star.style.left=(12+(i*29)%78)+"%";star.style.top=(18+(i*31)%62)+"%";stars.appendChild(star)}
 var hard=setTimeout(finish,4600),fallback=setTimeout(function(){if(!done){root.classList.remove("intro-pending");document.body.style.overflow=""}},4900);
 function finish(){if(done)return;done=true;clearTimeout(hard);clearTimeout(fallback);if(tl)tl.kill();overlay.classList.add("is-done");overlay.style.display="none";overlay.style.pointerEvents="none";root.classList.remove("intro-pending");document.body.style.overflow="";try{sessionStorage.setItem("introSeen","1")}catch(e){}document.removeEventListener("keydown",keySkip);
  if(window.gsap&&!reduce&&!fxOff)safe(function(){var words=document.querySelectorAll(".hero-copy .word-mask>span");gsap.fromTo(words,{yPercent:110},{yPercent:0,duration:.55,stagger:.08,ease:"power2.out"});gsap.fromTo(".mirror",{y:80,opacity:0,rotateX:18},{y:0,opacity:1,rotateX:0,duration:.75,stagger:.12,ease:"power3.out",delay:.1});gsap.fromTo(".hero-spotlight",{opacity:0},{opacity:.75,duration:.8,delay:.3});gsap.fromTo(".hero-scissors",{x:90,opacity:0,rotateY:0},{x:0,opacity:1,rotateY:20,duration:.75,ease:"power3.out",delay:.5})});
 }
 function keySkip(e){if(["Enter"," ","Escape"].indexOf(e.key)>-1){e.preventDefault();finish()}}
 skip.addEventListener("click",finish);overlay.addEventListener("click",function(e){if(e.target===overlay)finish()});document.addEventListener("keydown",keySkip);document.body.style.overflow="hidden";
 try{if(document.fonts){document.fonts.load('400 1em "Great Vibes"');document.fonts.load('500 1em "DM Sans"')}}catch(e){}var fonts=document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve();
 Promise.race([fonts,new Promise(function(resolve){setTimeout(resolve,400)})]).then(function(){
  if(done)return;if(!window.gsap){setTimeout(finish,3400);return}
  safe(function(){
   tl=gsap.timeline({onComplete:finish});
   tl.to(overlay.querySelector(".intro-flash"),{opacity:.35,duration:.12,yoyo:true,repeat:1},0);tl.to(overlay.querySelector(".intro-flash"),{opacity:.35,duration:.12,yoyo:true,repeat:1},2.05);
   for(var l=0;l<8;l++){var line=document.createElement("i");line.className="intro-line";line.style.transform="translate(-50%,-50%) rotate("+([-30,30,0,60,-60,18,-18,45][l])+"deg) scaleX(0)";overlay.appendChild(line);tl.fromTo(line,{scaleX:0,opacity:.85},{scaleX:1,opacity:0,duration:.42,ease:"power1.inOut"},.15+l*.07)}
   tl.fromTo(papers[0],{x:-innerWidth*.7,rotateY:35,opacity:0},{x:0,rotateY:12,opacity:1,duration:.8,ease:"power3.out"},.15);
   tl.fromTo(papers[1],{x:innerWidth*.7,rotateY:-35,opacity:0},{x:0,rotateY:-12,opacity:1,duration:.8,ease:"power3.out"},.22);
   tl.fromTo(papers[2],{y:innerHeight*.7,rotateX:40,opacity:0},{y:0,rotateX:15,opacity:1,duration:.8,ease:"power3.out"},.3);
   name.insertAdjacentHTML("afterbegin",'<span class="intro-glow-copy" aria-hidden="true">Bliss</span>');
   tl.fromTo(name,{scale:.8,rotateX:18,z:80,opacity:0},{scale:1,rotateX:0,z:0,opacity:1,duration:.8,ease:"power3.out"},.7);tl.to(name,{y:-4,duration:.35,repeat:1,yoyo:true,ease:"sine.inOut"},1.5);
   tl.to(name.querySelector(".intro-glow-copy"),{opacity:1,duration:.18},.82);
   tl.to(name.querySelector(".intro-glow-copy"),{opacity:.4,duration:.22},1.08);
   tl.to(name.querySelector(".intro-glow-copy"),{opacity:1,duration:.18},1.42);
   tl.to(name.querySelector(".intro-glow-copy"),{opacity:.4,duration:.22},1.68);
   tl.to(name.querySelector(".intro-glow-copy"),{opacity:1,duration:.18},2.02);
   tl.to(overlay.querySelector(".descriptor"),{opacity:1,duration:.4},1.05);
   tl.fromTo(stars,{opacity:0,scale:.5},{opacity:1,scale:1,duration:.5},.9);for(var b=0;b<4;b++){var burst=document.createElement("i");burst.className="intro-star";burst.textContent="✦";burst.style.left=(43+b*4)+"%";burst.style.top=(42+(b%2)*10)+"%";stars.appendChild(burst);tl.fromTo(burst,{scale:.2,opacity:0},{scale:1.35,opacity:1,duration:.28,yoyo:true,repeat:1},2.05+b*.04)}
   tl.fromTo(sc,{x:-innerWidth*.42,y:innerHeight*.32,rotation:-25,opacity:0},{x:innerWidth*.42,y:-innerHeight*.32,rotation:5,rotateY:18,opacity:1,duration:1.05,ease:"power1.inOut"},1.6);
   tl.to(sc.querySelector(".blade-a"),{rotation:14,duration:.08,repeat:6,yoyo:true,transformOrigin:"90px 92px"},1.65);
   tl.to(sc.querySelector(".blade-b"),{rotation:-14,duration:.08,repeat:6,yoyo:true,transformOrigin:"90px 92px"},"<");
   tl.to(overlay.querySelector(".intro-cutline"),{scaleX:1,duration:.8,ease:"power1.inOut"},1.62);
   tl.fromTo(overlay.querySelector(".intro-half.top"),{opacity:1,x:0,y:0},{x:innerWidth*.12,y:-innerHeight*.18,opacity:0,duration:.55,ease:"power2.inOut"},2.72);
   tl.fromTo(overlay.querySelector(".intro-half.bottom"),{opacity:1,x:0,y:0},{x:-innerWidth*.12,y:innerHeight*.18,opacity:0,duration:.55,ease:"power2.inOut"},2.72);
   tl.to(papers,{x:function(i){return i===0?-innerWidth:i===1?innerWidth:0},y:function(i){return i===2?innerHeight:0},rotation:function(i){return i===0?-25:i===1?25:12},opacity:0,duration:.6,stagger:.03,ease:"power2.in"},2.72);
   var word=document.querySelector(".site-header .wordmark"),target=word&&word.getBoundingClientRect(),source=logo.getBoundingClientRect();
   if(target&&target.width){var dx=target.left+target.width/2-(source.left+source.width/2),dy=target.top+target.height/2-(source.top+source.height/2),scale=Math.min(target.width/source.width,target.height/source.height);tl.to(logo,{x:dx,y:dy,scale:scale,rotateY:0,duration:.62,ease:"power3.inOut"},2.72)}else tl.to(logo,{opacity:0,duration:.35},2.72);
   tl.to(logo,{opacity:0,duration:.18},3.25);tl.to(overlay,{opacity:0,duration:.15},3.35);
  });
 });
});
})();
