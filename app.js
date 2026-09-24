const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let motionEnabled = !reducedMotion.matches;
const motionButton = document.getElementById('motion-toggle');
function updateMotion() {
 document.documentElement.classList.toggle('js-motion', motionEnabled);
 document.documentElement.classList.toggle('motion-off', !motionEnabled);
 motionButton.textContent = `Motion: ${motionEnabled ? 'on' : 'off'}`;
 motionButton.setAttribute('aria-pressed', String(!motionEnabled));
}
updateMotion();
motionButton.addEventListener('click', () => {motionEnabled = !motionEnabled;updateMotion();});
reducedMotion.addEventListener('change', e => {motionEnabled=!e.matches;updateMotion();});
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
 if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}
}),{threshold:.09});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const craftObserver = new IntersectionObserver(entries => entries.forEach(entry=>entry.target.classList.toggle('active',entry.isIntersecting)),{rootMargin:'-15% 0px -15% 0px',threshold:.45});
document.querySelectorAll('.craft-item').forEach(el=>craftObserver.observe(el));
let ticking=false;
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-window.innerHeight;document.querySelector('.reading-progress').style.transform=`scaleX(${max>0?window.scrollY/max:0})`;ticking=false;});ticking=true;}},{passive:true});
if(window.matchMedia('(hover: hover) and (pointer: fine)').matches){
 document.querySelectorAll('[data-tilt]').forEach(card=>{
 card.addEventListener('pointermove',e=>{if(!motionEnabled)return;const b=card.getBoundingClientRect();const x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;card.style.transform=`perspective(1200px) rotateX(${-y*2}deg) rotateY(${x*2}deg) translateY(-3px)`;});
 card.addEventListener('pointerleave',()=>card.style.transform='');
 });
}
const projects={
 walmart:{category:'Professional work · Walmart Global Tech',title:'Confidence. Beyond checkout.',intro:'As an iOS Developer on Walmart’s PHTS team, I contribute to the protection plan experience across shopping and post-purchase journeys.',tags:['Swift','SwiftUI','UIKit','MVVM','XCTest','XCUITest'],heading:'My contributions',points:['Built new screens and reusable MVVM components for protection plan flows across Cart and the Thank You Page.','Collaborated with offshore engineers on TYP implementation, code reviews, integration, and defect resolution.','Improved Voice Control support, VoiceOver labels, and Dynamic Type behavior for more accessible navigation.','Created unit and UI tests, investigated defects with QA, and supported regression testing.','Worked with Core Data persistence and supported build distribution through Fastlane and TestFlight.'],note:'Professional contribution summary. This portfolio is independent and is not affiliated with or endorsed by Walmart. No proprietary code or product screenshots are shown.'},
 retail:{category:'Personal project · Smart Retail',title:'A smarter cart. A smoother shop.',intro:'A native SwiftUI shopping app that brings product browsing, search, category filters, details, and a shared cart together through MVVM.',tags:['SwiftUI','MVVM','URLSession','async/await','Codable','Core Data'],heading:'Inside the build',points:['Integrated a REST product catalog with loading states, HTTP error handling, and JSON decoding.','Persisted catalog and cart snapshots with Core Data, restoring saved products when network requests failed.','Implemented stock limits, quantity updates, item removal, and Decimal-based totals; reconciled the cart with refreshed catalog data.','Added five XCTest cases covering search, monetary calculations, Core Data snapshots, cart rules, and offline fallback.','Published setup documentation and configured GitHub Actions to build and run iOS tests.'],note:'Independent learning project. Source repositories are available from my GitHub profile.',github:true},
 bank:{category:'Personal project · PocketBank',title:'Banking, thoughtfully connected.',intro:'A UIKit banking prototype with login, account summaries, transaction history, pull-to-refresh, and sign-out—backed by an interchangeable demo service or local Python API.',tags:['UIKit','Auto Layout','Keychain','REST APIs','Python','async/await'],heading:'Inside the build',points:['Used protocols to support simulated data and a REST service through the same interface.','Implemented bearer-token authentication, Keychain session storage, session restoration, expiry handling, and logout.','Created a Python mock backend with login, account, transaction, and logout endpoints, validating tokens for protected requests.','Handled loading states, errors, ISO-8601 dates, and integer-cent monetary values.','Added four Swift tests and eight Python HTTP integration tests for credentials, sessions, API contracts, expiry, and logout; configured GitHub Actions.'],note:'A banking prototype for learning and demonstration; it does not connect to real financial accounts.',github:true}
};
const dialog=document.getElementById('project-dialog');
let lastTrigger;
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
 const p=projects[button.dataset.project];lastTrigger=button;
 const container=document.getElementById('dialog-body');container.replaceChildren();
 function element(tag,txt,cls){const el=document.createElement(tag);el.textContent=txt;if(cls)el.className=cls;return el;}
 container.append(element('p',p.category,'eyebrow'));
 const title=element('h2',p.title);title.id='dialog-title';container.append(title,element('p',p.intro));
 const tags=element('div','','chips');p.tags.forEach(tag=>tags.append(element('span',tag)));container.append(tags,element('h3',p.heading));
 const list=element('ul','');p.points.forEach(point=>list.append(element('li',point)));container.append(list);
 if(p.github){const link=element('a','Explore my GitHub ↗','button primary');link.href='https://github.com/Sandeepralla484';link.target='_blank';link.rel='noopener noreferrer';container.append(link);}
 container.append(element('p',p.note,'project-note'));dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';
}));
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close();});
dialog.addEventListener('close',()=>{document.body.style.overflow='';lastTrigger?.focus({preventScroll:true});});
document.getElementById('copy-email').addEventListener('click',async()=>{
 const status=document.getElementById('copy-status');
 try{await navigator.clipboard.writeText('rallabandisandeep81@gmail.com');status.textContent='Email copied. Let’s build something great.';}
 catch{status.textContent='Please select and copy the email address above.';}
});
document.getElementById('year').textContent=new Date().getFullYear();
