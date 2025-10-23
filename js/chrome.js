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
      '    <span class="dot hide" id="global-hide-options" title="隐藏选项栏"></span>\n' +
      '  </div>\n' +
      '</div>\n' +
      '<div class="urlbar"><input id="global-url" type="text" aria-label="地址栏"/></div>\n' +
      '<div class="options" id="global-options">← 返回 · → 前进 · ⟳ 刷新 · ☆ 收藏</div>';
    document.body.insertBefore(root, document.body.firstChild);

    // 初始化地址栏为当前URL
    var urlInput=document.getElementById('global-url');
    if(urlInput) urlInput.value=window.location.href;

    // 选项栏显示/隐藏
    document.getElementById('global-hide-options').addEventListener('click', function(){
      var opt=document.getElementById('global-options');
      if(opt) opt.classList.toggle('hidden');
    });
    // 返回/前进/刷新/收藏（简单实现：点击选项栏文本即可）
    document.getElementById('global-options').addEventListener('click', function(e){
      var t=e.target.textContent.trim();
      if(t.includes('返回')) history.back();
      else if(t.includes('前进')) history.forward();
      else if(t.includes('刷新')) location.reload();
      else if(t.includes('收藏')) alert('模拟：已添加到收藏');
    });
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

    // 地址栏回车跳转
    urlInput && urlInput.addEventListener('keydown', function(e){
      if(e.key==='Enter'){
        var v=urlInput.value.trim();
        if(!v) return;
        if(/^[a-z]+:\/\//i.test(v) || v.startsWith('/')){
          location.href=v;
        } else {
          location.href=v; // 支持输入相对路径，如 about.html
        }
      }
    });
  }

  window.addEventListener('DOMContentLoaded', function(){
    createChrome();
  });
})();