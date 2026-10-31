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
/* THE CUT intro: CSS-driven choreography. The logo is visible immediately and does not depend on GSAP. */
safe(function(){
 var root=document.documentElement;
 if(!root.classList.contains("intro-pending")||reduce||fxOff)return;
 var overlay=document.createElement("div");
 overlay.className="brand-intro is-playing";
 overlay.setAttribute("role","dialog");
 overlay.setAttribute("aria-label","Bliss Beauty Lounge");
 overlay.innerHTML='<div class="intro-vignette"></div><div class="intro-flash"></div><i class="intro-paper ivory"></i><i class="intro-paper charcoal"></i><i class="intro-paper deep"></i><div class="intro-lines" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><div class="intro-stars" aria-hidden="true"><i>✦</i><i>✦</i><i>✦</i><i>✦</i><i>✦</i><i>✦</i><i>✦</i><i>✦</i></div><div class="intro-logo-wrap"><div class="intro-name">Bliss<span class="descriptor">BEAUTY LOUNGE</span></div></div><i class="intro-cutline" aria-hidden="true"></i><svg class="intro-scissors" viewBox="0 0 180 180" aria-hidden="true"><g class="scissor-blade blade-a"><path d="M89 91 L20 18 Q8 6 3 18 Q0 29 13 38 L83 103" fill="#F1EEDB" stroke="#1A1917" stroke-width="2"/></g><g class="scissor-blade blade-b"><path d="M91 91 L158 18 Q170 6 176 18 Q179 29 166 38 L97 103" fill="#F1EEDB" stroke="#1A1917" stroke-width="2"/></g><circle cx="90" cy="92" r="7" fill="#F02B1F" stroke="#1A1917" stroke-width="2"/></svg><div class="intro-half top"></div><div class="intro-half bottom"></div><button class="intro-skip" type="button">Skip intro</button>';
 document.body.appendChild(overlay);
 var done=false,skip=overlay.querySelector(".intro-skip"),timer=null;
 function finish(){
  if(done)return;done=true;clearTimeout(timer);
  overlay.classList.remove("is-playing");overlay.classList.add("is-done");
  root.classList.remove("intro-pending");document.body.style.overflow="";
  try{sessionStorage.setItem("introSeen","1")}catch(e){}
  document.removeEventListener("keydown",keySkip);
  setTimeout(function(){if(overlay.parentNode)overlay.parentNode.removeChild(overlay)},350);
 }
 function keySkip(e){if(e.key==="Escape"||e.key==="Enter"||e.key===" "){e.preventDefault();finish()}}
 skip.addEventListener("click",finish);
 document.addEventListener("keydown",keySkip);
 document.body.style.overflow="hidden";
 timer=setTimeout(finish,4600);
});
})();