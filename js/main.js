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
safe(function(){if(reduce||fxOff||!window.gsap||!window.ScrollTrigger)return;gsap.registerPlugin(ScrollTrigger);gsap.from(".hero-copy h1",{y:24,opacity:0,duration:.7,ease:"power2.out"});gsap.from(".mirror",{y:60,opacity:0,duration:.9,stagger:.12,ease:"power2.out",delay:.15});var cards=document.querySelectorAll(".hall-card");if(innerWidth>760){cards.forEach(function(card,i){gsap.fromTo(card,{rotateY:i%2?16:-16,z:-120,opacity:.85},{rotateY:0,z:0,opacity:1,ease:"none",scrollTrigger:{trigger:card,start:"top 95%",end:"center 48%",scrub:true}})})}gsap.utils.toArray(".section-heading").forEach(function(el){gsap.from(el,{y:24,opacity:0,duration:.7,ease:"power2.out",scrollTrigger:{trigger:el,start:"top 90%"}})})});

/* RYAN STYLE TEST: five-card tactile 3D coverflow. */
safe(function(){
 var stage=document.querySelector('.mirror-cluster'),track=stage&&stage.querySelector('.coverflow-track');if(!stage||!track)return;
 var cards=[].slice.call(track.querySelectorAll('.cover-card')),active=0,drag=0,startX=0,lastX=0,lastT=0,velocity=0,raf=0,dragging=false,swiped=false,pauseUntil=0,auto=null;
 var hint=stage.querySelector('.cover-swipe-hint'),prev=stage.querySelector('.cover-prev'),next=stage.querySelector('.cover-next');
 var dots=document.createElement('div');dots.className='cover-dots';dots.setAttribute('role','group');dots.setAttribute('aria-label','Choose a hair colour');
 cards.forEach(function(card,i){var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Show '+card.querySelector('.cover-label').textContent+' look');b.addEventListener('click',function(){if(Math.abs(drag)>8)return;set(i);pause()});dots.appendChild(b)});
 stage.insertAdjacentElement('afterend',dots);
 function render(){cards.forEach(function(card,i){var d=i-active-drag/ (stage.clientWidth*.58);while(d>2.5)d-=cards.length;while(d< -2.5)d+=cards.length;var a=Math.abs(d),opacity=a<.5?1:a<1.5?.85:a<2?.5:0;card.style.setProperty('--d',d.toFixed(3));card.style.setProperty('--z',(-a*90)+'px');card.style.setProperty('--scale',String(1-a*.1));card.style.setProperty('--opacity',opacity);card.style.zIndex=String(10-Math.round(a));card.classList.toggle('is-active',Math.round(d)===0&&a<.35);card.setAttribute('aria-hidden',String(a>2));card.tabIndex=a<.5?0:-1;card.style.pointerEvents=a>2?'none':'auto';card.style.willChange=(dragging||a<.5)?'transform':'auto';dots.children[i].classList.toggle('active',a<.5);dots.children[i].setAttribute('aria-pressed',String(a<.5))});}
 function set(i){active=(i+cards.length)%cards.length;drag=0;render()}
 function stop(){if(auto)clearInterval(auto);auto=null}
 function play(){stop();if(reduce||fxOff||document.hidden)return;auto=setInterval(function(){if(Date.now()>pauseUntil&&!dragging&&visible)set(active+1)},3200)}
 var visible=true,observer='IntersectionObserver'in window?new IntersectionObserver(function(entries){visible=entries[0].isIntersecting;if(visible)play();else stop()},{threshold:.2}):null;if(observer)observer.observe(stage);
 function pause(){pauseUntil=Date.now()+8000;play()}
 function schedule(){if(raf)return;raf=requestAnimationFrame(function(){raf=0;render()})}
 function down(e){if(e.pointerType==='mouse'&&e.button!==0)return;dragging=true;startX=lastX=e.clientX;lastT=performance.now();velocity=0;stage.classList.add('is-dragging');stage.setPointerCapture&&stage.setPointerCapture(e.pointerId);stop()}
 function move(e){if(!dragging)return;var now=performance.now(),dx=e.clientX-startX;velocity=(e.clientX-lastX)/Math.max(1,now-lastT);lastX=e.clientX;lastT=now;drag=dx;schedule();if(Math.abs(dx)>5&&!swiped){swiped=true;stage.classList.add('has-swiped');if(hint)hint.hidden=true}}
 function up(){if(!dragging)return;dragging=false;stage.classList.remove('is-dragging');var dx=drag,threshold=stage.clientWidth*.16;if(Math.abs(dx)>threshold||Math.abs(velocity)>.48){var step=Math.abs(velocity)>.48?1:Math.max(1,Math.round(Math.abs(dx)/threshold));set(active+(dx<0?step:-step))}else set(active);pause()}
 stage.addEventListener('pointerdown',down);stage.addEventListener('pointermove',move);stage.addEventListener('pointerup',up);stage.addEventListener('pointercancel',up);
 cards.forEach(function(card,i){card.addEventListener('click',function(e){if(Math.abs(drag)>5)return;if(i!==active){e.preventDefault();set(i);pause()}})});
 if(prev)prev.addEventListener('click',function(){set(active-1);pause()});if(next)next.addEventListener('click',function(){set(active+1);pause()});
 stage.addEventListener('keydown',function(e){if(e.key==='ArrowLeft'){set(active-1);pause()}if(e.key==='ArrowRight'){set(active+1);pause()}});
 set(0);play();document.addEventListener('visibilitychange',function(){if(document.hidden)stop();else play()});
});
/* Phone navigation and delayed sticky booking bar. */
safe(function(){
 var header=document.querySelector('.site-header'),toggle=document.querySelector('.menu-toggle'),menu=document.querySelector('#phone-menu');
 if(toggle&&menu){function close(){menu.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open menu')}
 toggle.addEventListener('click',function(){var open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu');menu.classList.toggle('is-open',open)});
 menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',close)});document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});}
 var heroButtons=document.querySelector('.hero-actions'),sticky=document.querySelector('.phone-sticky');if(!heroButtons||!sticky)return;
 if('IntersectionObserver'in window){var io=new IntersectionObserver(function(entries){sticky.classList.toggle('is-visible',!entries[0].isIntersecting)},{threshold:0});io.observe(heroButtons)}else sticky.classList.add('is-visible');
});
/* THE CUT: self-contained CSS choreography, independent of GSAP availability. */
safe(function(){
 var root=document.documentElement;
 if(!root.classList.contains("intro-pending"))return;
 if(reduce||fxOff){root.classList.remove("intro-pending");return}
 var overlay=document.createElement("div");
 overlay.className="brand-intro is-playing";
 overlay.setAttribute("role","dialog");
 overlay.setAttribute("aria-label","Bliss Beauty Lounge");
 overlay.innerHTML='<div class="classic-stage"><div class="classic-backdrop"></div><div class="classic-frame frame-outer"></div><div class="classic-frame frame-inner"></div><div class="classic-curtain curtain-left"></div><div class="classic-curtain curtain-right"></div><div class="classic-pedestal"></div><div class="intro-photo intro-photo-left"><img src="images/platinum-blonde.jpg" alt=""></div><div class="intro-photo intro-photo-right"><img src="images/caramel-highlights-waves.jpg" alt=""></div><div class="classic-logo"><div class="classic-monogram">B</div><div class="classic-wordmark">Bliss</div><div class="classic-rule"><i></i><span>✦</span><i></i></div><div class="classic-subtitle">BEAUTY LOUNGE</div><div class="intro-location">ETOBICOKE · TORONTO</div></div><div class="classic-shears" aria-hidden="true"><svg viewBox="0 0 180 180"><g class="shear-a"><path d="M88 88 22 18Q8 4 3 17 0 29 14 39L82 101" fill="url(#goldMetal)" stroke="#6e4b24" stroke-width="2"/></g><g class="shear-b"><path d="m92 88 66-70q14-14 19-1 3 12-11 22l-68 62" fill="url(#goldMetal)" stroke="#6e4b24" stroke-width="2"/></g><circle cx="90" cy="90" r="7" fill="#d8b878" stroke="#6e4b24" stroke-width="2"/><circle cx="29" cy="143" r="22" fill="none" stroke="#c9a66a" stroke-width="7"/><circle cx="151" cy="143" r="22" fill="none" stroke="#c9a66a" stroke-width="7"/><defs><linearGradient id="goldMetal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff0c8"/><stop offset=".45" stop-color="#c49a55"/><stop offset="1" stop-color="#f8e2a8"/></linearGradient></defs></svg></div><div class="classic-glint glint-one"></div><div class="classic-glint glint-two"></div></div><button class="intro-skip" type="button">Skip intro</button>'
 document.body.appendChild(overlay);
 var done=false,timer=null,skip=overlay.querySelector(".intro-skip");
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
 timer=setTimeout(finish,6500);
});
})();