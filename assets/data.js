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
const IKEY='atvncg26-cd1-individual';
let indiv={};
try{indiv=JSON.parse(localStorage.getItem(IKEY))||{}}catch{}
const memberScore=(id,def)=>indiv[id]!==undefined?indiv[id]:def;

// ===== official house badge colors (Cong dien 1 "huy hieu 8 nha" poster) =====
const HOUSE_META={
 'my-nam':          {c0:'#6e0d1a',c1:'#c8102e',c2:'#ff6a6a',horse:'#f6f0e6'},
 'hoa-lua':         {c0:'#7a5e00',c1:'#dfb400',c2:'#ffe66a',horse:'#1a120c'},
 'soan-nhac':       {c0:'#0e2a7a',c1:'#1c4fd8',c2:'#6a9aff',horse:'#f6f0e6'},
 'vinh-quy-bai-to': {c0:'#0c524e',c1:'#19b8b0',c2:'#7af0e6',horse:'#f6f0e6'},
 'lam-manh':        {c0:'#0c4a1e',c1:'#1e9e3e',c2:'#7ae08a',horse:'#f6f0e6'},
 'dien-anh':        {c0:'#7a3a00',c1:'#f07800',c2:'#ffc266',horse:'#f6f0e6'},
 'cui-lua':         {c0:'#5e0a3e',c1:'#d81c8c',c2:'#ff7ac8',horse:'#f6f0e6'},
 'ngoai-o':         {c0:'#52430a',c1:'#b8a012',c2:'#e6d466',horse:'#f6f0e6'},
};
// tiny heraldic badge: house-color shield + rearing horse + sparkles
function houseBadge(hid,cls){
  const m=HOUSE_META[hid];if(!m)return'';
  return `<svg class="badge${cls?' '+cls:''}" viewBox="0 0 100 120" aria-hidden="true">
  <defs><linearGradient id="bdg-${hid}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${m.c2}"/><stop offset=".45" stop-color="${m.c1}"/><stop offset="1" stop-color="${m.c0}"/>
  </linearGradient></defs>
  <path d="M50,4 L90,18 V62 C90,92 73,109 50,117 C27,109 10,92 10,62 V18 Z" fill="url(#bdg-${hid})" stroke="${m.c2}" stroke-width="3"/>
  <path d="M50,12 L82,23 V61 C82,86 68,101 50,108 C32,101 18,86 18,61 V23 Z" fill="none" stroke="${m.c0}" stroke-width="2" opacity=".55"/>
  <g fill="${m.horse}" transform="translate(14,30) rotate(-14 36 40) scale(.72)">
    <ellipse cx="50" cy="52" rx="21" ry="10.5"/>
    <circle cx="66" cy="50" r="9"/>
    <circle cx="33" cy="51" r="9.5"/>
    <path d="M64,46 C69,39 73,33 78,28 L83,31 C79,37 75,44 71,50 Z"/>
    <path d="M77,25 C80,21 85,20 88,22 L95,27 L92,30 C87,31 81,30 78,29 Z"/>
    <path d="M79,22 l2.5,-5.5 l2.5,4.5 z"/>
    <path d="M12,50 C6,54 3,62 5,70 C8,64 12,58 16,55 C13,53 12,51 12,50 Z"/>
    <path d="M62,58 C68,62 74,66 80,70 L83,76 L79,77 C73,72 66,66 60,62 Z"/>
    <path d="M58,60 C60,66 60,70 57,74 L54,77 L52,74 C55,69 55,64 54,60 Z"/>
    <path d="M36,60 C30,66 24,70 17,74 L12,77 L15,71 C22,66 28,62 33,58 Z"/>
    <path d="M42,61 C40,67 38,72 38,77 L41,78 L44,72 C45,67 46,63 46,60 Z"/>
  </g>
  <path d="M27,22 l3,-6 3,6 -3,6 Z" fill="${m.horse}" opacity=".85"/>
  <path d="M71,17 l2.5,-5 2.5,5 -2.5,5 Z" fill="${m.horse}" opacity=".85"/>
</svg>`;
}
// enhance any house chip on the page with its badge
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.chip[data-house] b').forEach(b=>{
    b.insertAdjacentHTML('afterbegin',houseBadge(b.closest('.chip').dataset.house,'chip-badge'));
  });
});
