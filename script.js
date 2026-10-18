const menu=document.querySelector('.menu'),nav=document.querySelector('header nav');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.textContent=open?'Close −':'Menu +';nav.classList.toggle('open',open)});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');if(menu)menu.textContent='Menu +'}));
document.querySelector('[data-contact]')?.addEventListener('click',e=>{const panel=document.querySelector('.contact-details');panel.hidden=!panel.hidden;e.currentTarget.setAttribute('aria-expanded',String(!panel.hidden))});
const viewer=document.querySelector('#viewer');document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{const img=viewer.querySelector('img');img.src=button.dataset.image;img.alt=button.dataset.alt;viewer.showModal()}));viewer?.querySelector('button').addEventListener('click',()=>viewer.close());viewer?.addEventListener('click',e=>{if(e.target===viewer)viewer.close()});
// Progressive enhancement: content remains visible when JavaScript is unavailable.
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
if(!reduceMotion.matches&&'IntersectionObserver' in window){
 const reveals=document.querySelectorAll('.about-grid,.craft-grid,.timeline article,.download-card,.screen-story');
 const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}}),{threshold:0.08});
 reveals.forEach(el=>{el.classList.add('reveal-ready');revealObserver.observe(el)});
 reduceMotion.addEventListener('change',event=>{if(event.matches){reveals.forEach(el=>el.classList.add('is-visible'));revealObserver.disconnect()}});
}
const progress=document.createElement('div');progress.className='scroll-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
let progressPending=false;
function updateProgress(){const available=document.documentElement.scrollHeight-window.innerHeight;progress.style.transform='scaleX('+Math.max(0,Math.min(1,available>0?window.scrollY/available:0))+')';progressPending=false}
window.addEventListener('scroll',()=>{if(!progressPending){progressPending=true;requestAnimationFrame(updateProgress)}},{passive:true});window.addEventListener('resize',updateProgress);updateProgress();
if('IntersectionObserver' in window){const sections=document.querySelectorAll('main>section[id]');const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('header nav a[href^="#"]').forEach(link=>{const active=link.getAttribute('href')==='#'+entry.target.id;link.classList.toggle('is-current',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')})}})},{rootMargin:'-10% 0px -55% 0px',threshold:0});sections.forEach(section=>sectionObserver.observe(section))}
