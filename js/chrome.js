(function(){
  function createChrome(){
    // 如果页面已有自带的顶部（如 supermarket 的 .top），不重复注入
    if(document.querySelector('.top')) return;
    var root=document.createElement('div');
    root.className='chrome';
    root.innerHTML = ''+
      '<div class="row">\n' +
      '  <div class="controls" title="窗口控制">\n' +
      '    <span class="dot close" id="global-close" title="关闭"></span>\n' +
      '    <span class="dot min" id="global-min" title="缩小"></span>\n' +
      '  </div>\n' +
      '</div>\n' +
      '<div class="urlbar"><input id="global-url" type="text" aria-label="地址栏"/><button id="global-jump" class="jump" type="button" title="跳转到输入的URL">跳转</button></div>';
    document.body.insertBefore(root, document.body.firstChild);

    // 初始化地址栏为当前URL
    var urlInput=document.getElementById('global-url');
    if(urlInput) urlInput.placeholder="请输入要查询的关键字......";


    // 关闭（模拟）：隐藏页面主体并提示
    document.getElementById('global-close').addEventListener('click', function(){
      var overlay=document.createElement('div');
      overlay.style.position='fixed';overlay.style.inset='0';overlay.style.background='rgba(0,0,0,.8)';overlay.style.color='#fff';overlay.style.display='flex';overlay.style.alignItems='center';overlay.style.justifyContent='center';overlay.style.zIndex='99999';
      overlay.innerHTML='<div style="text-align:center">窗口已关闭（模拟）<br/><button id="restore" style="margin-top:12px;padding:6px 12px;border-radius:6px;">恢复</button></div>';
      document.body.appendChild(overlay);
      document.getElementById('restore').onclick=function(){ overlay.remove(); };
    });
    // 缩小（模拟）：折叠主要内容容器
    document.getElementById('global-min').addEventListener('click', function(){
      var target = document.querySelector('.promo') || document.querySelector('main') || document.querySelector('.wrap') || document.querySelector('.photo-detail');
      if(!target){ alert('已最小化（模拟）'); return; }
      var hidden = target.getAttribute('data-min-hidden')==='true';
      target.style.display = hidden ? '' : 'none';
      target.setAttribute('data-min-hidden', hidden ? 'false' : 'true');
    });

    // 地址栏回车跳转 + 跳转按钮：前缀拼接 + 关键词映射
    var base = 'https://cuberj.github.io/';
    var keywordMap = {
      // 中文常用词
      '玛奇莲超市':'supermarket.html',
      '兽的临时交易市场':'TempTradeMarket.html',
      '捕兽人之家':'ForumLogin.html',
      '游戏首页':'index.html',
      '员工登录':'macellumLogin.html'
    };
    function navigate(v){
      if(!v) return;
      var input = (v||'').trim();
      if(/^https?:\/\//i.test(input)){
        // 若已是完整URL，直接跳转
        location.href = input;
        return;
      }
      // 如果看起来是路径（含 / 或 .html），直接拼接域名跳转
      if(/[\/]/.test(input) || /\.(html?|png|jpg|jpeg|gif)$/i.test(input)){
        var path = input;
        if(path.startsWith('/')) path = path.slice(1);
        location.href = base + path;
        return;
      }
      // 关键词映射（仅完全匹配，不做模糊匹配）
      var key = input.toLowerCase();
      var mapped = keywordMap[key];
      if(mapped){
        location.href = base + mapped;
      } else {
        alert('搜索无效，请重新输入');
      }
    }
    urlInput && urlInput.addEventListener('keydown', function(e){
      if(e.key==='Enter'){
        navigate(urlInput.value.trim());
      }
    });
    var jumpBtn = document.getElementById('global-jump');
    if(jumpBtn){
      jumpBtn.addEventListener('click', function(){
        navigate(urlInput ? urlInput.value.trim() : '');
      });
    }
  }

  window.addEventListener('DOMContentLoaded', function(){
    createChrome();
  });
})();