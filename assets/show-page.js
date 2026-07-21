// Auto-fills a công diễn page from the shared SHOWS data (assets/data.js).
// The page identifies itself by filename; hero + status repaint on first load
// and again whenever refreshShows() pulls new data — so an announced theme or a
// changed air date shows up here without editing this HTML.
function paintShowPage(){
  const id=(location.pathname.split('/').pop()||'').replace('.html','');
  const s=typeof getShow==='function'&&getShow(id);
  if(!s)return;
  const st=showStatus(s), aired=st!=='soon';
  const set=(sel,html)=>{const el=document.querySelector(sel);if(el)el.innerHTML=html;};
  set('.hero-kicker .tag',s.round);
  set('.hero h1',s.name);
  // status line under the placeholder art, driven by the calendar
  const soon=document.querySelector('.soon p');
  if(soon){
    const dmy=s.date?s.date.split('-').reverse().join('.'):'';
    soon.innerHTML=aired
      ? `Đã lên sóng ${dmy?'· '+dmy:''} — chủ đề, đội hình và kết quả <em>đang được cập nhật</em>.<br>Theo dõi VTV3 · 20:00 thứ bảy hằng tuần.`
      : `Chưa phát sóng${dmy?' · dự kiến '+dmy:''} — chủ đề, đội hình và luật chơi <em>sẽ cập nhật ngay khi công bố</em>.<br>Theo dõi lịch phát sóng VTV3 · 20:00 thứ bảy hằng tuần.`;
  }
}
document.addEventListener('DOMContentLoaded',paintShowPage);
document.addEventListener('shows:updated',paintShowPage);
