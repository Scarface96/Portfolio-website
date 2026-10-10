/* Showreel: muted teaser loop -> full reel with sound, waveform scrubber, chapters, ambient glow, mini player. */
(function(){
  const $ = (s, el=document) => el.querySelector(s);
  const box = $('#reelBox'); if (!box) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const teaser = $('#reelTeaser'), main = $('#reelMain'), screen = $('#reelScreen'), stage = $('#reelStage');
  const glow = $('#reelGlow'), gctx = glow.getContext('2d');
  const wave = $('#reelWave'), barsEl = $('#reelBars'), ticksEl = $('#reelTicks'), tip = $('#reelTip');
  const timeEl = $('#reelTime'), toggle = $('#reelToggle'), muteBtn = $('#reelMute'), fullBtn = $('#reelFull');
  const playBtn = $('#reelPlay'), endEl = $('#reelEnd'), replay = $('#reelReplay'), undock = $('#reelUndock'), chapList = $('#reelChapters');

  const DUR = 120;
  const CHAPTERS = [
    {t:0,  n:'Intro'},
    {t:13, n:'The challenge'},
    {t:28, n:'Data & dashboards'},
    {t:40, n:'Web development'},
    {t:53, n:'Automation'},
    {t:66, n:'How I work'},
    {t:81, n:'Outcomes'},
    {t:97, n:"Let's talk"}
  ];
  /* loudness of the reel's soundtrack, one bar per second (measured from the audio) */
  const LEVELS = [0.49,0.86,0.77,0.31,0.3,0.93,0.61,0.73,0.56,0.85,0.57,0.82,0.8,0.76,0.86,0.65,0.53,0.5,0.69,0.56,0.21,0.93,0.24,0.83,0.69,0.66,0.72,0.51,0.61,0.72,0.34,0.9,0.72,0.69,0.69,0.8,0.64,0.34,0.42,0.5,0.55,0.76,0.42,0.94,0.87,0.73,0.54,0.92,0.57,0.42,0.47,0.49,0.4,0.96,0.7,0.71,0.41,0.9,0.67,0.39,0.84,0.69,0.59,0.58,0.71,0.54,0.87,0.57,0.96,0.31,0.69,0.69,0.61,0.97,0.28,0.49,1,0.84,0.37,0.89,0.73,0.34,0.97,0.99,0.72,0.6,0.38,0.93,0.3,0.71,0.82,0.38,0.83,0.46,0.37,0.39,0.71,0.86,0.34,0.73,0.58,0.64,0.87,0.64,0.95,0.65,0.72,0.7,0.72,0.73,0.76,0.41,0.43,0.48,0.48,0.45,0.54,0.43,0.19,0.05];

  const pad2 = n => String(n).padStart(2, '0');
  const fmt = s => { s = Math.max(0, Math.floor(s)); return pad2(Math.floor(s / 60)) + ':' + pad2(s % 60); };
  const dur = () => (main.duration && isFinite(main.duration)) ? main.duration : DUR;
  const chapterAt = t => { let i = 0; CHAPTERS.forEach((c, k) => { if (t >= c.t - 0.05) i = k; }); return i; };

  /* ---- build waveform, chapter ticks and chapter list ---- */
  barsEl.innerHTML = LEVELS.map(v => '<span style="--h:' + Math.max(.14, v).toFixed(2) + '"></span>').join('');
  const bars = Array.from(barsEl.children);
  ticksEl.innerHTML = CHAPTERS.slice(1).map(c => '<span style="left:' + (c.t / DUR * 100) + '%"></span>').join('');
  chapList.innerHTML = CHAPTERS.map((c, i) =>
    '<li><button type="button" class="chap" data-i="' + i + '" aria-label="Chapter ' + (i + 1) + ': ' + c.n.replace(/"/g, '') + ', starts at ' + fmt(c.t) + '">' +
    '<span class="chap-th"><img src="media/showreel/ch' + (i + 1) + '.webp" alt="" loading="lazy" decoding="async" width="480" height="270"><i></i></span>' +
    '<span class="chap-n">' + pad2(i + 1) + ' · ' + fmt(c.t) + '</span><span class="chap-t">' + c.n + '</span></button></li>'
  ).join('');
  const chaps = Array.from(chapList.querySelectorAll('.chap'));

  /* ---- state + render ---- */
  let live = false, lastBar = -1, lastChap = -1, pendingSeek = null, holdDock = 0, raf = null, frame = 0;
  function render(){
    const t = main.currentTime || 0, d = dur(), p = Math.min(1, t / d);
    const nb = Math.round(p * bars.length);
    if (nb !== lastBar){ bars.forEach((b, i) => b.classList.toggle('on', i < nb)); lastBar = nb; }
    box.style.setProperty('--p', p.toFixed(4));
    timeEl.textContent = fmt(t) + ' / ' + fmt(d);
    const ci = chapterAt(t);
    wave.setAttribute('aria-valuenow', Math.round(t));
    wave.setAttribute('aria-valuetext', fmt(t) + ' of ' + fmt(d) + ', ' + CHAPTERS[ci].n);
    if (ci !== lastChap){
      chaps.forEach((c, k) => { c.classList.toggle('active', k === ci); c.classList.toggle('done', k < ci); if (k !== ci) c.style.setProperty('--cp', 0); });
      chaps[ci].setAttribute('aria-current', 'step');
      chaps.forEach((c, k) => { if (k !== ci) c.removeAttribute('aria-current'); });
      lastChap = ci;
    }
    const c = CHAPTERS[ci], next = CHAPTERS[ci + 1] ? CHAPTERS[ci + 1].t : d;
    chaps[ci].style.setProperty('--cp', Math.max(0, Math.min(1, (t - c.t) / (next - c.t))).toFixed(3));
  }

  /* ambient glow: paint the current frame into a tiny canvas that CSS blurs behind the screen */
  function loop(){
    const v = live ? main : teaser;
    if (live) render();
    if (!reduce && (frame++ % 3 === 0) && v.readyState >= 2 && !box.classList.contains('is-docked')){
      try { gctx.drawImage(v, 0, 0, glow.width, glow.height); box.classList.add('has-glow'); } catch(e){}
    }
    raf = !v.paused ? requestAnimationFrame(loop) : null;
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

  /* ---- playback ---- */
  function seek(t){
    t = Math.max(0, Math.min(dur() - 0.1, t));
    if (main.readyState >= 1) main.currentTime = t; else pendingSeek = t;
    render();
  }
  function start(t){
    if (!live){
      live = true; box.classList.add('is-live');
      teaser.pause();
      if (main.preload !== 'auto') { main.preload = 'auto'; }
    }
    endEl.hidden = true;
    if (t != null) seek(t);
    const pr = main.play();
    if (pr && pr.catch) pr.catch(() => { main.muted = true; syncMute(); main.play().catch(() => {}); });
  }
  main.addEventListener('loadedmetadata', () => { if (pendingSeek != null){ main.currentTime = pendingSeek; pendingSeek = null; } render(); });
  main.addEventListener('play', () => { box.classList.add('is-playing'); toggle.setAttribute('aria-label', 'Pause'); kick(); });
  main.addEventListener('pause', () => { box.classList.remove('is-playing'); toggle.setAttribute('aria-label', 'Play'); render(); });
  main.addEventListener('timeupdate', () => { if (main.paused) render(); });
  main.addEventListener('seeked', render);
  main.addEventListener('ended', () => { endEl.hidden = false; setDock(false); render(); });
  teaser.addEventListener('play', kick);

  function syncMute(){ muteBtn.setAttribute('aria-pressed', main.muted); muteBtn.setAttribute('aria-label', main.muted ? 'Unmute' : 'Mute'); }

  playBtn.addEventListener('click', e => { e.stopPropagation(); start(0); });
  replay.addEventListener('click', e => { e.stopPropagation(); start(0); });
  endEl.addEventListener('click', e => e.stopPropagation());
  toggle.addEventListener('click', () => { if (!live) start(0); else if (main.paused) start(main.ended ? 0 : null); else main.pause(); });
  muteBtn.addEventListener('click', () => { main.muted = !main.muted; syncMute(); });
  screen.addEventListener('click', () => {
    if (box.classList.contains('is-docked')){ stage.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block: 'center'}); return; }
    if (!live) start(0); else if (main.paused) start(main.ended ? 0 : null); else main.pause();
  });
  chaps.forEach(c => c.addEventListener('click', () => start(CHAPTERS[+c.dataset.i].t)));

  /* full screen: native controls while in full screen */
  fullBtn.addEventListener('click', () => {
    if (!live) start(0);
    if (main.requestFullscreen) main.requestFullscreen().catch(() => {});
    else if (main.webkitEnterFullscreen) main.webkitEnterFullscreen();
  });
  document.addEventListener('fullscreenchange', () => { main.controls = document.fullscreenElement === main; });

  /* ---- waveform scrubber ---- */
  const tAt = x => { const r = wave.getBoundingClientRect(); return Math.max(0, Math.min(1, (x - r.left) / r.width)) * dur(); };
  let dragging = false, hovIdx = -1;
  function hover(x){
    const r = wave.getBoundingClientRect(), t = tAt(x);
    tip.textContent = fmt(t) + ' · ' + pad2(chapterAt(t) + 1) + ' ' + CHAPTERS[chapterAt(t)].n;
    const tw = tip.offsetWidth, left = Math.max(tw / 2, Math.min(r.width - tw / 2, x - r.left));
    tip.style.left = left + 'px'; tip.classList.add('on');
    const i = Math.min(bars.length - 1, Math.floor(t / dur() * bars.length));
    if (i !== hovIdx){ if (bars[hovIdx]) bars[hovIdx].classList.remove('hov'); bars[i].classList.add('hov'); hovIdx = i; }
  }
  function unhover(){ tip.classList.remove('on'); if (bars[hovIdx]) bars[hovIdx].classList.remove('hov'); hovIdx = -1; }
  wave.addEventListener('pointerdown', e => {
    dragging = true; wave.setPointerCapture(e.pointerId);
    const t = tAt(e.clientX);
    if (!live) start(t); else seek(t);
    hover(e.clientX);
  });
  wave.addEventListener('pointermove', e => { if (e.pointerType === 'mouse' || dragging) hover(e.clientX); if (dragging) seek(tAt(e.clientX)); });
  wave.addEventListener('pointerup', () => { dragging = false; if (!matchMedia('(hover:hover)').matches) unhover(); });
  wave.addEventListener('pointercancel', () => { dragging = false; unhover(); });
  wave.addEventListener('pointerleave', () => { if (!dragging) unhover(); });
  wave.addEventListener('keydown', e => {
    const t = main.currentTime || 0; let n = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') n = t + 5;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') n = t - 5;
    else if (e.key === 'PageUp') n = CHAPTERS[Math.min(CHAPTERS.length - 1, chapterAt(t) + 1)].t;
    else if (e.key === 'PageDown') n = CHAPTERS[Math.max(0, chapterAt(t) - 1)].t;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = dur() - 0.5;
    else if (e.key === ' ' || e.key === 'Enter'){ e.preventDefault(); toggle.click(); return; }
    if (n == null) return;
    e.preventDefault();
    if (!live){ live = true; box.classList.add('is-live'); teaser.pause(); }
    seek(n);
  });

  /* ---- teaser plays only while the section is on screen ---- */
  if ('IntersectionObserver' in window){
    new IntersectionObserver(es => {
      const vis = es[0].isIntersecting;
      if (!live && !reduce){ if (vis) teaser.play().catch(() => {}); else teaser.pause(); }
      /* mini player: keep the reel going in a corner when you scroll away */
      if (live && !main.paused && !vis && Date.now() > holdDock) setDock(true);
      if (vis) setDock(false);
    }, {threshold: 0}).observe(stage);
  }
  function setDock(on){
    if (box.classList.contains('is-docked') === on) return;
    box.classList.toggle('is-docked', on);
  }
  undock.addEventListener('click', e => { e.stopPropagation(); main.pause(); setDock(false); });

  /* hero button: scroll down and roll the reel with sound */
  document.querySelectorAll('[data-play-reel]').forEach(a => a.addEventListener('click', () => { holdDock = Date.now() + 1600; start(0); }));

  window.TMReel = { pause: () => { if (live) main.pause(); } };
  syncMute(); render();
  if (reduce) box.classList.remove('has-glow');
})();
