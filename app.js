'use strict';
const audio=document.getElementById('audio'), play=document.getElementById('play'), icon=document.getElementById('play-icon'), status=document.getElementById('play-status'), note=document.getElementById('player-note');
audio.volume=.8;
let wantsPlayback=false;
function updatePlayback(){const on=!audio.paused;document.body.classList.toggle('playing',on);icon.textContent=on?'Ⅱ':'▶';play.setAttribute('aria-label',on?'Pause FMC live radio':'Play FMC live radio');}
async function togglePlay(){if(wantsPlayback){wantsPlayback=false;audio.pause();status.textContent='Paused — come back anytime';updatePlayback();return;}wantsPlayback=true;if(!audio.getAttribute('src'))audio.src='https://stream.zeno.fm/yqkru9yv3yzuv';status.textContent='Connecting to FMC…';try{await audio.play();if(!wantsPlayback)audio.pause();}catch(error){if(error.name==='AbortError')return;wantsPlayback=false;status.textContent='The stream could not start';note.textContent='Please try play again, or check your connection.';updatePlayback();}}
play.addEventListener('click',togglePlay);audio.addEventListener('playing',()=>{status.textContent='You’re listening to FMC';note.textContent='Live from Filipino Music Central. Welcome home.';updatePlayback();});audio.addEventListener('pause',updatePlayback);audio.addEventListener('waiting',()=>{if(wantsPlayback)status.textContent='Buffering the live stream…';});audio.addEventListener('error',()=>{wantsPlayback=false;status.textContent='Stream unavailable — please retry';note.textContent='The station’s live feed could not be reached.';updatePlayback();});audio.addEventListener('ended',()=>{wantsPlayback=false;status.textContent='Stream ended — press play to reconnect';updatePlayback();});document.getElementById('volume').addEventListener('input',e=>{audio.volume=Number(e.target.value);audio.muted=false;updateMute();});const mute=document.getElementById('mute');function updateMute(){mute.textContent=audio.muted||audio.volume===0?'◖×':'◖))';mute.setAttribute('aria-label',audio.muted?'Unmute radio':'Mute radio');}mute.addEventListener('click',()=>{audio.muted=!audio.muted;updateMute();});document.getElementById('listen-again').addEventListener('click',()=>{document.getElementById('listen').scrollIntoView({block:'center',behavior:'smooth'});if(!wantsPlayback)togglePlay();});
const menu=document.querySelector('.menu-toggle'),nav=document.getElementById('navigation');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');nav.querySelectorAll('a').forEach(link=>link.classList.toggle('active',link===a));}));
let people=[];const peopleReady=fetch('people.json').then(r=>r.json()).then(data=>people=data);const staffGrid=document.getElementById('staff-grid'),staffToggle=document.getElementById('staff-toggle'),staffCards=[...staffGrid.querySelectorAll('.person-card')];
let staffExpanded=false,staffFilter='all';
function renderStaff(){
 const columns=getComputedStyle(staffGrid).gridTemplateColumns.split(' ').length,limit=window.matchMedia('(max-width:760px)').matches?3:columns*2;
 let matching=0,shown=0;
 staffCards.forEach((card,i)=>{
  const ph=people[i]?.location.includes('Philippines');
  const matches=staffFilter==='all'||(staffFilter==='philippines'?ph:!ph);
  const visible=matches&&(staffExpanded||matching<limit);
  if(matches)matching++;
  card.hidden=!visible;if(visible)shown++;
 });
 staffToggle.hidden=matching<=limit;
 staffToggle.textContent=staffExpanded?'SHOW FEWER DJS ↑':'VIEW ALL DJS ↓';
 staffToggle.setAttribute('aria-expanded',String(staffExpanded));
 document.getElementById('filter-status').textContent=shown+' of '+matching+' presenters shown';
}
staffToggle.addEventListener('click',()=>{staffExpanded=!staffExpanded;renderStaff();if(!staffExpanded)staffToggle.scrollIntoView({block:'nearest'});});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',async()=>{await peopleReady;staffFilter=button.dataset.filter;staffExpanded=false;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));});renderStaff();}));
peopleReady.then(renderStaff);window.addEventListener('resize',renderStaff);
const dialog=document.getElementById('profile');document.querySelectorAll('[data-profile]').forEach(button=>button.addEventListener('click',async()=>{await peopleReady;const p=people[Number(button.dataset.profile)];const body=document.getElementById('profile-content');body.replaceChildren();const img=document.createElement('img');img.src=p.fullImage||p.image;img.alt=p.name;const content=document.createElement('div');const label=document.createElement('p');label.className='eyebrow';label.textContent='THE VOICES OF FMC';const title=document.createElement('h2');title.textContent=p.name;dialog.setAttribute('aria-label',p.name+' presenter profile');const location=document.createElement('p');location.textContent=p.location;const link=document.createElement('a');link.href='#listen';link.className='button';link.textContent='LISTEN TO FMC ▶';link.onclick=()=>dialog.close();content.append(label,title,location,link);body.append(img,content);dialog.showModal();}));document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
document.getElementById('load-chat').addEventListener('click',()=>{const frame=document.createElement('iframe');frame.src='https://www3.cbox.ws/box/?boxid=3520187&boxtag=mgqE4L';frame.title='FMC community chat';frame.referrerPolicy='strict-origin-when-cross-origin';document.getElementById('chat-placeholder').replaceWith(frame);});


const networkGrid=document.getElementById('network-grid'),networkToggle=document.getElementById('network-toggle');
let networkExpanded=false;
function renderNetwork(){const mobile=matchMedia('(max-width:760px)').matches;[...networkGrid.children].forEach((card,i)=>card.hidden=mobile&&!networkExpanded&&i>=3);networkToggle.hidden=!mobile;networkToggle.setAttribute('aria-expanded',String(networkExpanded));networkToggle.textContent=networkExpanded?'SHOW FEWER STATIONS ↑':'VIEW ALL STATIONS ↓';}
networkToggle.addEventListener('click',()=>{networkExpanded=!networkExpanded;renderNetwork();if(!networkExpanded)networkToggle.scrollIntoView({block:'nearest'});});window.addEventListener('resize',renderNetwork);renderNetwork();
let installPrompt;const installButton=document.getElementById('install-app');
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;installButton.hidden=false;});
installButton.addEventListener('click',async()=>{if(!installPrompt)return;await installPrompt.prompt();installPrompt=null;installButton.hidden=true;});
window.addEventListener('appinstalled',()=>{installPrompt=null;installButton.hidden=true;});
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));

function updateConnection(){if(!navigator.onLine){note.textContent="You are offline. Live radio and chat need an internet connection.";}else if(!wantsPlayback){note.textContent="Press play and make yourself at home.";}}window.addEventListener("online",updateConnection);window.addEventListener("offline",updateConnection);updateConnection();

