// ATVNCG 2026 shared data: houses, roster with official firepower scores (vi.wikipedia, sau Cong dien hoi ngo)
const HOUSES={
  'my-nam':'Nhà Mỹ Nam','cui-lua':'Nhà Củi Lửa','soan-nhac':'Nhà Soạn Nhạc','ngoai-o':'Nhà Ngoại Ô',
  'vinh-quy-bai-to':'Nhà Vinh Quy Bái Tổ','lam-manh':'Nhà Làm Mạnh','dien-anh':'Nhà Điện Ảnh','hoa-lua':'Nhà Hoa Lửa'
};
// ===== individual firepower: roster, editable scores, live house averages =====
// leader flag marks each house's thu linh; published scores pre-filled, rest user-entered
const ROSTER={
  'my-nam':[
    ['thuan-nguyen','Thuận Nguyễn',290,0],
    ['duy-khanh','Duy Khánh',460,0],
    ['le-xuan-tien','Lê Xuân Tiền',280,0],
    ['toki-thanh-tho','Toki Thành Thỏ',330,0],
    ['bb-tran','BB Trần',490,1]
  ],
  'cui-lua':[
    ["its-charles","It's Charles.",150,0],
    ['will','Will',120,0],
    ['dai-nghia','Đại Nghĩa',180,0],
    ['dinh-manh-ninh','Đinh Mạnh Ninh',290,1],
    ['trinh-thang-binh','Trịnh Thăng Bình',150,0]
  ],
  'soan-nhac':[
    ['ho-dong-quan','Hồ Đông Quan',210,0],
    ['tho-dalab','Thỏ (Da LAB)',270,0],
    ['hoang-ton','Hoàng Tôn',350,1],
    ['osad','OSAD',120,0],
    ['ha-an-huy','Hà An Huy',320,0]
  ],
  'ngoai-o':[
    ['casper-14','14 Casper',110,0],
    ['k-o','K.O',110,0],
    ['dong-hung','Đông Hùng',260,1],
    ['dung-dt','Dũng DT',130,0]
  ],
  'vinh-quy-bai-to':[
    ['mew-amazing','Mew Amazing',340,0],
    ['jun-pham','Jun Phạm',480,1],
    ['thanh-duy','Thanh Duy',390,0]
  ],
  'lam-manh':[
    ['thai-le-minh-hieu','Thái Lê Minh Hiếu',340,0],
    ['huynh-lap','Huỳnh Lập',350,1],
    ['thai-vg','Thái VG',350,0]
  ],
  'dien-anh':[
    ['tung-mint','Tùng Mint',190,0],
    ['neko-le','Neko Lê',250,1],
    ['phung-minh-cuong','Phùng Minh Cương',230,0],
    ['nguyen-van-chung','Nguyễn Văn Chung',170,0]
  ],
  'hoa-lua':[
    ['cheng','Cheng',270,0],
    ['hoang-rob','Hoàng Rob',140,0],
    ['hoang-dung','Hoàng Dũng',420,1],
    ['vuong-anh-tu','Vương Anh Tú',120,0],
    ['thom-dalab','Thơm (Da LAB)',280,0]
  ]
};
// ===== công diễn schedule: single source of truth, auto-updating =====
// Each show: id (page slug without .html), round label, name, theme/sub line,
// air date (YYYY-MM-DD, latest airing), optional forced status. Status is
// otherwise derived from today's date so the timeline updates itself as
// công diễn air — no HTML edits needed. Editing SHOWS here (or the remote
// assets/shows.json override) is the only place new data has to land.
const SHOWS=[
  {id:'cong-dien-hoi-ngo',round:'Vòng mở màn',name:'Công Diễn Hội Ngộ',
   sub:'Ngày nảy, ngày nay · Tập 1–2 · 27.06 & 04.07',date:'2026-07-04'},
  {id:'cong-dien-1',round:'Vòng 1',name:'Người Đàn Ông Trên Lưng Ngựa',
   sub:'Công diễn 1 · Từ tập 3 · 18.07',date:'2026-07-18',
   // official Công diễn 1 result: bracket is confirmed; provisional điểm hoả lực
   // per house go in `scores` once published (house-slug -> number) — the page
   // pre-fills both from here and repaints when shows.json refreshes them
   results:{
     bracket:{'bach-1':'my-nam','bach-2':'ngoai-o','bach-3':'cui-lua','bach-4':'lam-manh',
              'hac-1':'vinh-quy-bai-to','hac-2':'dien-anh','hac-3':'hoa-lua','hac-4':'soan-nhac'},
     scores:{}
   }},
  {id:'cong-dien-2',round:'Vòng 2',name:'Công Diễn 2',
   sub:'Chủ đề sắp công bố',date:'2026-07-25'},
  {id:'cong-dien-3',round:'Vòng 3',name:'Công Diễn 3',
   sub:'Chủ đề sắp công bố',date:'2026-08-01'},
  {id:'cong-dien-4',round:'Vòng 4',name:'Công Diễn 4',
   sub:'Chủ đề sắp công bố',date:'2026-08-08'},
  {id:'cong-dien-5',round:'Vòng 5',name:'Công Diễn 5',
   sub:'Chủ đề sắp công bố',date:'2026-08-15'},
  {id:'chung-ket',round:'Đêm cuối',name:'Chung Kết',
   sub:'Gia tộc toàn năng',date:'2026-08-22'}
];
// derive live status from the calendar: aired -> done, airing today -> live, else soon
function showStatus(s){
  if(s.status)return s.status;                     // explicit override wins
  if(!s.date)return'soon';
  const today=new Date().toISOString().slice(0,10);
  if(s.date<today)return'done';
  if(s.date===today)return'live';
  return'soon';
}
const STATUS_LABEL={done:'Đã phát sóng',live:'Tối nay',soon:'Sắp tới'};
const getShow=id=>SHOWS.find(s=>s.id===id);
// pull an optional remote override so data can be refreshed without touching HTML;
// merges by id, keeps order, then re-fires so any rendered view repaints
function refreshShows(){
  return fetch('assets/shows.json',{cache:'no-store'})
    .then(r=>r.ok?r.json():Promise.reject(r.status))
    .then(list=>{
      if(!Array.isArray(list))return false;
      list.forEach(u=>{
        if(!u||!u.id)return;
        const cur=getShow(u.id);
        if(cur)Object.assign(cur,u);else SHOWS.push(u);
      });
      document.dispatchEvent(new CustomEvent('shows:updated',{detail:SHOWS}));
      return true;
    })
    .catch(()=>false);                              // offline / no file: silent, keep built-ins
}

const IKEY='atvncg26-cd1-individual';
let indiv={};
try{indiv=JSON.parse(localStorage.getItem(IKEY))||{}}catch{}
const memberScore=(id,def)=>indiv[id]!==undefined?indiv[id]:def;

// ===== official house badges (embroidered crest cutouts, Cong dien 1) =====
function houseBadge(hid,cls){
  if(!HOUSES[hid])return'';
  return `<img class="badge${cls?' '+cls:''}" src="assets/badges/nha-${hid}.png" alt="" loading="lazy">`;
}
// enhance any house chip on the page with its badge
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.chip[data-house] b').forEach(b=>{
    b.insertAdjacentHTML('afterbegin',houseBadge(b.closest('.chip').dataset.house,'chip-badge'));
  });
  // kick off an automatic data refresh on every page that includes data.js
  refreshShows();
});
