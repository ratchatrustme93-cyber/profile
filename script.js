(function(){
  // scroll progress bar
  var fill = document.getElementById('scroll-progress');
  function updateProgress(){
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    if(fill) fill.style.width = pct + '%';
  }
  document.addEventListener('scroll', updateProgress, { passive:true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  // sidebar cursor spotlight
  var sidebar = document.querySelector('.sidebar');
  if(sidebar){
    sidebar.addEventListener('mousemove', function(e){
      var r = sidebar.getBoundingClientRect();
      sidebar.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      sidebar.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  }

  // click-to-copy contact info
  document.querySelectorAll('.copy-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var text = btn.getAttribute('data-copy');
      var toast = btn.closest('.row').querySelector('.copy-toast');
      var done = function(){
        if(!toast) return;
        toast.classList.add('show');
        clearTimeout(toast._t);
        toast._t = setTimeout(function(){ toast.classList.remove('show'); }, 1400);
      };
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(done).catch(done);
      } else {
        done();
      }
    });
  });
})();
