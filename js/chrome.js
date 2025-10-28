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
    if(urlInput) urlInput.value=window.location.href;


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

    // 地址栏回车跳转 + 跳转按钮：将输入前追加目标域名
    var base = 'https://cuberj.github.io/';
    function navigate(v){
      if(!v) return;
      var path = (v||'').trim();
      if(path.startsWith('http://') || path.startsWith('https://')){
        // 若已是完整URL，直接跳转
        location.href = path;
        return;
      }
      // 去除开头斜杠，避免出现双斜杠
      if(path.startsWith('/')) path = path.slice(1);
      location.href = base + path;
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