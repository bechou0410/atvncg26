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
