(function(){
  function setMailState(){
    document.body.dataset.hasMail = localStorage.getItem('hasMail')==='true' ? 'true' : 'false';
  }
  function createTaskbar(){
    var tb=document.createElement('div');
    tb.className='taskbar';
    tb.innerHTML = [
      '<a href="user.html" aria-label="用户信息">👤 用户信息</a>',
      '<a href="news.html" aria-label="每日新闻">📰 每日新闻</a>',
      '<a href="supermarket.html" aria-label="超市主页">🏬 超市主页</a>',
      '<a href="mail.html" class="mail" aria-label="邮件">\n  <span class="none">📭 邮件</span>\n  <span class="has">📬 有未读邮件</span>\n</a>'
    ].join('');
    document.body.appendChild(tb);
  }
  window.addEventListener('DOMContentLoaded', function(){
    setMailState();
    createTaskbar();
  });
})();