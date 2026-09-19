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

  // scroll reveal for Profile / Experience
  var items = document.querySelectorAll('.main .profile, .main .job');
  var lis = document.querySelectorAll('.job li');
  document.querySelectorAll('.job').forEach(function(job){
    job.querySelectorAll('li').forEach(function(li, i){ li.style.setProperty('--i', i); });
  });
  items.forEach(function(el){ if(!el.classList.contains('job')) el.classList.add('reveal'); });
  document.querySelectorAll('.job').forEach(function(el, i){ el.classList.add('reveal'); el.style.setProperty('--d', (i % 2 ? 0.05 : 0) + 's'); });
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold:0.15, rootMargin:'0px 0px -6% 0px' });
    items.forEach(function(el){ io.observe(el); });
  } else {
    items.forEach(function(el){ el.classList.add('in'); });
  }
})();
