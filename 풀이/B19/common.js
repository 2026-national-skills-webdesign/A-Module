const $ = (sel) => document.querySelector(sel);

const $title   = $('.current-year');
const $content = $('.calendar-content');
const now      = new Date();
let current  = new Date();

const DAYS = '일월화수목금토'.split('');

function render() {
  const year  = current.getFullYear();
  const month = current.getMonth();
  const isToday = (d) => now.toDateString() === new Date(year, month, d).toDateString();
  const weeks   = DAYS.map(d => `<div class="week">${d}</div>`).join('');
  const padding = '<div class="day"></div>'.repeat(new Date(year, month, 1).getDay());
  const days    = Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, i) => {
    const d = i + 1;
    return `<div class="day ${isToday(d) ? 'active' : ''}">${d}</div>`;
  }).join('');
  $title.textContent  = `${year}년 ${month + 1}월`;
  $content.innerHTML  = weeks + padding + days;
}

$('.btn-prev').addEventListener('click', () => { current.setMonth(current.getMonth() - 1); render(); });
$('.btn-next').addEventListener('click', () => { current.setMonth(current.getMonth() + 1); render(); });

render();