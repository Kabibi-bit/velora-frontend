/* ============ VELORA SHARED CORE ============ */
 
/* ---- Logo mark: brushed-metal chevron, black & metallic grey ---- */
function veloraMark(size){
  size = size || 28;
  return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="veloraMetal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#EEEFF1"/>
        <stop offset="35%" stop-color="#B9BBC1"/>
        <stop offset="65%" stop-color="#5A5C63"/>
        <stop offset="100%" stop-color="#1A1B1E"/>
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="38" height="38" rx="9" fill="#0C0D10" stroke="#2A2C32" stroke-width="1"/>
    <path d="M9 11 L20 29 L31 11" stroke="url(#veloraMetal)" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="20" cy="29" r="2" fill="url(#veloraMetal)"/>
  </svg>`;
}
 
/* ---- Nav, shared across every page ---- */
function renderNav(activePage){
  const links = [
    {id: 'home', label: 'Home', href: 'index.html'},
    {id: 'survey', label: 'Survey', href: 'survey.html'},
    {id: 'dashboard', label: 'Job Search', href: 'dashboard.html'},
    {id: 'metis', label: 'Metis', href: 'metis.html'},
    {id: 'inbox', label: 'Inbox', href: 'inbox.html'},
  ];
  const linksHtml = links.map(l =>
    `<a class="nav-link ${l.id===activePage?'active':''}" href="${l.href}">${l.label}</a>`
  ).join('');
 
  const watchActive = localStorage.getItem('velora_watch_active') === 'true';
 
  document.getElementById('nav-root').innerHTML = `
    <nav class="nav">
      <div class="wrap nav-inner">
        <a class="logo" href="index.html">
          ${veloraMark(28)}
          <span class="logo-word">VELORA</span>
        </a>
        <div class="nav-links">${linksHtml}</div>
        <div class="nav-status"><span class="dot ${watchActive?'live':''}"></span>Watch ${watchActive ? 'active' : 'idle'}</div>
      </div>
    </nav>
  `;
}
 
/* ---- localStorage helpers ---- */
function getProfile(){ try{ return JSON.parse(localStorage.getItem('velora_profile')); }catch(e){ return null; } }
function saveProfile(p){ localStorage.setItem('velora_profile', JSON.stringify(p)); }
 
function getMatches(){ try{ return JSON.parse(localStorage.getItem('velora_matches')) || []; }catch(e){ return []; } }
function saveMatches(m){ localStorage.setItem('velora_matches', JSON.stringify(m)); }
 
function getCycleCount(){ return parseInt(localStorage.getItem('velora_cycle_count') || '0'); }
function saveCycleCount(n){ localStorage.setItem('velora_cycle_count', String(n)); }
 
function getTrajectory(){ try{ return JSON.parse(localStorage.getItem('velora_trajectory')) || []; }catch(e){ return []; } }
function saveTrajectory(t){ localStorage.setItem('velora_trajectory', JSON.stringify(t)); }
 
function getSavedIds(){ try{ return new Set(JSON.parse(localStorage.getItem('velora_saved_ids')) || []); }catch(e){ return new Set(); } }
function saveSavedIds(s){ localStorage.setItem('velora_saved_ids', JSON.stringify([...s])); }
 
function getChatHistory(){ try{ return JSON.parse(localStorage.getItem('velora_chat_history')) || []; }catch(e){ return []; } }
function saveChatHistory(h){ localStorage.setItem('velora_chat_history', JSON.stringify(h)); }
 
function getNotifications(){ try{ return JSON.parse(localStorage.getItem('velora_notifications')) || []; }catch(e){ return []; } }
function addNotification(note){
  const list = getNotifications();
  list.unshift({ ...note, id: Date.now() + Math.random(), ts: new Date().toISOString() });
  localStorage.setItem('velora_notifications', JSON.stringify(list.slice(0, 50)));
}
 
/* ---- Mock listings dataset ---- */
const LISTINGS = [
  {id:1, type:'internship', title:'Product Analytics Intern', org:'Northlight Health', tags:['sql','python','a/b testing','analytics','product'], loc:'Remote', deadline:'Aug 22'},
  {id:2, type:'job', title:'Associate Product Manager', org:'Fernway Labs', tags:['product','sql','roadmap','stakeholder','growth'], loc:'San Francisco, CA', deadline:'Sep 3'},
  {id:3, type:'college', title:'Data & Society Summer Fellowship', org:'Ridgeline Institute', tags:['data','research','fellowship','policy'], loc:'Remote', deadline:'Aug 30'},
  {id:4, type:'internship', title:'Growth & Experimentation Intern', org:'Cobalt Systems', tags:['a/b testing','python','growth','analytics'], loc:'Remote', deadline:'Sep 10'},
  {id:5, type:'job', title:'Business Analyst, New Grad Program', org:'Delmar Financial', tags:['sql','excel','reporting','finance'], loc:'Austin, TX', deadline:'Sep 18'},
  {id:6, type:'college', title:'Undergraduate Research Grant - Applied Data Science', org:'Whitfield University', tags:['research','data','python','grant'], loc:'Remote', deadline:'Aug 25'},
  {id:7, type:'internship', title:'Product Management Intern', org:'Arclight', tags:['product','roadmap','sql','user research'], loc:'San Jose, CA', deadline:'Aug 29'},
  {id:8, type:'job', title:'Data-Focused PM (APM Program)', org:'Twin River', tags:['product','python','sql','analytics','a/b testing'], loc:'Remote', deadline:'Sep 5'},
  {id:9, type:'internship', title:'Operations Analytics Intern', org:'Foundry Retail', tags:['excel','sql','operations','reporting'], loc:'Chicago, IL', deadline:'Sep 1'},
  {id:10, type:'college', title:'Tech Policy & Data Ethics Fellowship', org:'Carrow Center', tags:['policy','research','fellowship','ethics'], loc:'Washington, DC', deadline:'Sep 12'},
  {id:11, type:'job', title:'Junior Data Analyst', org:'Portside Analytics', tags:['sql','python','dashboards','reporting'], loc:'Remote', deadline:'Aug 27'},
  {id:12, type:'internship', title:'Campus Innovation Fellows Program', org:'Alder & Finch', tags:['leadership','product','pitch','mentorship'], loc:'Remote', deadline:'Sep 8'},
  {id:13, type:'job', title:'Product Operations Associate', org:'Cinderlake', tags:['product','sql','process','stakeholder'], loc:'Remote', deadline:'Sep 15'},
  {id:14, type:'college', title:'Quant Social Science Summer Institute', org:'Marrow College', tags:['research','python','data','stats'], loc:'Boston, MA', deadline:'Aug 31'},
  {id:15, type:'internship', title:'Strategy & Analytics Intern', org:'Beacon Peak', tags:['excel','sql','strategy','analytics'], loc:'Remote', deadline:'Sep 6'},
  {id:16, type:'job', title:'Product Insights Analyst', org:'Halyard Co.', tags:['product','sql','python','user research'], loc:'Remote', deadline:'Sep 20'},
  {id:17, type:'internship', title:'Summer Data & Product Intern', org:'Milk & Ledger', tags:['product','python','analytics','a/b testing'], loc:'Remote', deadline:'Sep 4'},
  {id:18, type:'college', title:'Innovation & Entrepreneurship Grant', org:'Osprey Foundation', tags:['grant','product','pitch','leadership'], loc:'Remote', deadline:'Sep 22'},
  {id:19, type:'job', title:'Product Marketing Associate', org:'Bellwood', tags:['marketing','product','writing','positioning'], loc:'Remote', deadline:'Sep 9'},
  {id:20, type:'internship', title:'UX Research Intern', org:'Glasswing Studio', tags:['ux','research','user research','figma'], loc:'Remote', deadline:'Sep 14'},
  {id:21, type:'job', title:'Machine Learning Product Analyst', org:'Cinder & Vale', tags:['ml','python','sql','product','analytics'], loc:'Remote', deadline:'Sep 25'},
  {id:22, type:'college', title:'Women in Data Science Scholarship', org:'Halsey Trust', tags:['data','scholarship','python','mentorship'], loc:'Remote', deadline:'Sep 17'},
  {id:23, type:'internship', title:'Venture Fellows Summer Program', org:'Northbrook Capital', tags:['pitch','leadership','strategy','product'], loc:'Remote', deadline:'Sep 11'},
  {id:24, type:'job', title:'Technical Program Coordinator', org:'Fairhaven Systems', tags:['process','stakeholder','sql','operations'], loc:'Seattle, WA', deadline:'Sep 19'},
];
 
/* ---- Matching engine (shared by dashboard + metis + inbox) ---- */
function tokenize(str){ return (str.toLowerCase().match(/[a-z][a-z\-]{2,}/g) || []); }
 
