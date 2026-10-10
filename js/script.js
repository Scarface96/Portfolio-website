(function(){
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, el=document) => el.querySelector(s);
  const $$ = (s, el=document) => Array.from(el.querySelectorAll(s));
  $('#yr').textContent = new Date().getFullYear();

  /* ---------- Theme ---------- */
  const mqDark = window.matchMedia('(prefers-color-scheme: dark)');
  try { const t = localStorage.getItem('tm-theme'); if (t === 'dark' || t === 'light') root.setAttribute('data-theme', t); } catch(e){}
  const isDark = () => root.getAttribute('data-theme') ? root.getAttribute('data-theme') === 'dark' : mqDark.matches;
  $('#themeBtn').addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('tm-theme', next); } catch(e){}
  });

  /* ---------- Mobile menu ---------- */
  const menuBtn = $('#menuBtn'), links = $('#navlinks');
  menuBtn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.textContent = open ? 'Close' : 'Menu';
  });
  $$('a', links).forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); menuBtn.textContent = 'Menu';
  }));

  /* ---------- Scroll progress + active section ---------- */
  const bar = $('#progressBar');
  let ticking = false;
  function onScroll(){
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, scrollY / h) : 0) + ')';
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, {passive:true}); onScroll();
  if ('IntersectionObserver' in window){
    const navMap = {};
    $$('.nav-links a').forEach(a => navMap[a.dataset.sec] = a);
    const so = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting){ $$('.nav-links a').forEach(a => a.classList.remove('active')); navMap[e.target.id] && navMap[e.target.id].classList.add('active'); }
    }), {rootMargin:'-45% 0px -50% 0px'});
    ['reel','work','about','toolkit','contact'].forEach(id => so.observe(document.getElementById(id)));

    /* gentle lift-in for blocks below the fold (visible at rest, transform only) */
    if (!reduce){
      const ro = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.remove('pre'); ro.unobserve(e.target); } }), {threshold:.12});
      $$('.reveal').forEach(el => { if (el.getBoundingClientRect().top > innerHeight){ el.classList.add('pre'); ro.observe(el); } });
    }
  }

  /* ---------- Role scramble ---------- */
  const roles = ['Data Analyst','BI Developer','Front-End Developer','Data Engineer (junior)'];
  const roleEl = $('#role'); let ri = 0;
  const glyphs = '01<>/_#%$={}[]';
  function scrambleTo(text){
    if (reduce){ roleEl.textContent = '"' + text + '"'; return; }
    const from = roleEl.textContent.replace(/"/g,''); const len = Math.max(from.length, text.length);
    const start = performance.now(), dur = 750;
    (function step(now){
      const p = Math.min(1, (now - start) / dur); let out = '';
      for (let i = 0; i < len; i++){
        const reveal = i / len < p * 1.15;
        out += reveal ? (text[i] || '') : (text[i] === ' ' ? ' ' : glyphs[(Math.random() * glyphs.length) | 0]);
      }
      roleEl.textContent = '"' + out + '"';
      if (p < 1) requestAnimationFrame(step); else roleEl.textContent = '"' + text + '"';
    })(start);
  }
  setInterval(() => { if (document.hidden) return; ri = (ri + 1) % roles.length; scrambleTo(roles[ri]); }, 3200);

  /* ---------- KPI count-up ---------- */
  if (!reduce){
    $$('.kpi-num').forEach((el, idx) => {
      const target = +el.dataset.count, suf = el.dataset.suffix || '';
      const start = performance.now() + 350 + idx * 120, dur = 1500;
      const render = v => el.innerHTML = v.toLocaleString('en-US') + (suf ? '<em>' + suf + '</em>' : '');
      render(0);
      (function step(now){
        const p = Math.max(0, Math.min(1, (now - start) / dur));
        render(Math.round(target * (1 - Math.pow(1 - p, 4))));
        if (p < 1) requestAnimationFrame(step);
      })(performance.now());
    });
  }

  /* ---------- Avatar fallback ---------- */
  const av = $('#avatar');
  const hideAv = () => av && av.remove();
  if (av){ av.addEventListener('error', hideAv); if (av.complete && av.naturalWidth === 0) hideAv(); }

  /* ---------- Hero scatter (Fig. 1) ---------- */
  const frame = $('#figFrame'), cv = $('#scatter'), ctx = cv.getContext('2d'), ro = $('#readout');
  let W = 0, H = 0, dpr = 1, pts = [], fit = {a:0,b:0,r:0}, t0 = performance.now(), mouse = null, running = true, colors = {};
  const PAD = {l:34, r:16, t:34, b:26};
  function readColors(){
    const cs = getComputedStyle(root);
    ['--ink','--ink-soft','--rule','--teal','--amber','--panel','--grid'].forEach(k => colors[k] = cs.getPropertyValue(k).trim());
  }
  function rng(seed){ return function(){ seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function gauss(r){ let u = 0, v = 0; while (!u) u = r(); while (!v) v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
  function build(){
    const r = rng(1996), n = W < 520 ? 260 : 520;
    pts = [];
    for (let i = 0; i < n; i++){
      const tx = r();
      let ty = .14 + .66 * tx + gauss(r) * .085 + Math.sin(tx * 6) * .02;
      if (r() < .03) ty = r();
      ty = Math.max(.02, Math.min(.98, ty));
      pts.push({tx, ty, x:r(), y:r(), ox:0, oy:0, d: r() * 900, k: .025 + r() * .035, ph: r() * 6.28, s: .7 + r() * .9});
    }
    // least-squares fit on targets
    let sx=0, sy=0, sxx=0, sxy=0, syy=0;
    pts.forEach(p => { sx+=p.tx; sy+=p.ty; sxx+=p.tx*p.tx; sxy+=p.tx*p.ty; syy+=p.ty*p.ty; });
    const b = (n*sxy - sx*sy) / (n*sxx - sx*sx), a = (sy - b*sx) / n;
    const rr = (n*sxy - sx*sy) / Math.sqrt((n*sxx - sx*sx) * (n*syy - sy*sy));
    fit = {a, b, r: rr};
    $('#figN').textContent = 'n = ' + n;
    $('#figR').textContent = 'r = ' + rr.toFixed(2);
    if (reduce) pts.forEach(p => { p.x = p.tx; p.y = p.ty; });
  }
  function size(){
    const rect = frame.getBoundingClientRect();
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = rect.width; H = rect.height;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }
  const px = x => PAD.l + x * (W - PAD.l - PAD.r);
  const py = y => H - PAD.b - y * (H - PAD.t - PAD.b);
  function draw(now){
    const el = now - t0;
    ctx.clearRect(0, 0, W, H);
    // grid + ticks
    ctx.lineWidth = 1; ctx.font = '9px ' + getComputedStyle(root).getPropertyValue('--f-mono');
    ctx.fillStyle = colors['--ink-soft']; ctx.textBaseline = 'middle';
    for (let i = 0; i <= 4; i++){
      const v = i / 4, gx = px(v), gy = py(v);
      ctx.strokeStyle = colors['--rule']; ctx.globalAlpha = i === 0 ? 1 : .55;
      ctx.beginPath(); ctx.moveTo(PAD.l, gy + .5); ctx.lineTo(W - PAD.r, gy + .5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gx + .5, PAD.t); ctx.lineTo(gx + .5, H - PAD.b); ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.textAlign = 'right'; ctx.fillText(v.toFixed(2).replace(/^0/,''), PAD.l - 6, gy);
      ctx.textAlign = 'center'; ctx.fillText(v.toFixed(2).replace(/^0/,''), gx, H - PAD.b + 13);
    }
    const mx = mouse ? mouse.x : -999, my = mouse ? mouse.y : -999, R = Math.max(54, Math.min(86, W * .13));
    let inLens = 0;
    // points
    for (const p of pts){
      if (!reduce && el > p.d){
        const wob = Math.sin(now * .0006 + p.ph) * .004;
        p.x += (p.tx - p.x) * p.k; p.y += (p.ty + wob - p.y) * p.k;
      }
      let sx = px(p.x), sy = py(p.y);
      const dx = sx - mx, dy = sy - my, d = Math.hypot(dx, dy);
      let near = false;
      if (d < R){
        near = true; inLens++;
        const f = (1 - d / R) * 16;
        p.ox += ((dx / (d || 1)) * f - p.ox) * .2; p.oy += ((dy / (d || 1)) * f - p.oy) * .2;
      } else { p.ox *= .88; p.oy *= .88; }
      sx += p.ox; sy += p.oy;
      ctx.beginPath();
      ctx.fillStyle = near ? colors['--amber'] : colors['--teal'];
      ctx.globalAlpha = near ? 1 : .55;
      ctx.arc(sx, sy, near ? 2.6 * p.s + .8 : 1.7 * p.s, 0, 6.283); ctx.fill();
    }
    ctx.globalAlpha = 1;
    // regression line, drawn once points have settled
    const lp = reduce ? 1 : Math.max(0, Math.min(1, (el - 1700) / 1300));
    if (lp > 0){
      const e = 1 - Math.pow(1 - lp, 3), x1 = .02, x2 = .02 + .96 * e;
      ctx.strokeStyle = colors['--ink']; ctx.lineWidth = 2; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(px(x1), py(fit.a + fit.b * x1)); ctx.lineTo(px(x2), py(fit.a + fit.b * x2)); ctx.stroke();
      if (lp >= 1){
        const lx = px(.98), ly = py(fit.a + fit.b * .98);
        ctx.fillStyle = colors['--ink']; ctx.beginPath(); ctx.arc(lx, ly, 4, 0, 6.283); ctx.fill();
        ctx.textAlign = 'right'; ctx.textBaseline = 'bottom'; ctx.fillText('ŷ = ' + fit.a.toFixed(2) + ' + ' + fit.b.toFixed(2) + 'x', lx - 6, ly - 10);
      }
    }
    // crosshair
    if (mouse){
      ctx.strokeStyle = colors['--amber']; ctx.globalAlpha = .7; ctx.setLineDash([3,4]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(mx + .5, PAD.t); ctx.lineTo(mx + .5, H - PAD.b); ctx.moveTo(PAD.l, my + .5); ctx.lineTo(W - PAD.r, my + .5); ctx.stroke();
      ctx.setLineDash([]); ctx.globalAlpha = .9;
      ctx.beginPath(); ctx.arc(mx, my, R, 0, 6.283); ctx.stroke(); ctx.globalAlpha = 1;
      const vx = (mx - PAD.l) / (W - PAD.l - PAD.r), vy = (H - PAD.b - my) / (H - PAD.t - PAD.b);
      ro.textContent = 'x ' + vx.toFixed(2) + '  y ' + vy.toFixed(2) + '  ·  ' + inLens + ' pts in lens';
      const rw = ro.offsetWidth;
      ro.style.left = Math.min(mx, W - rw - 24) + 'px'; ro.style.top = Math.min(my, H - 40) + 'px';
    }
  }
  function loop(now){ if (running) draw(now); requestAnimationFrame(loop); }
  readColors(); size();
  requestAnimationFrame(loop);
  addEventListener('resize', () => { clearTimeout(size.t); size.t = setTimeout(size, 150); });
  new MutationObserver(readColors).observe(root, {attributes:true, attributeFilter:['data-theme']});
  mqDark.addEventListener && mqDark.addEventListener('change', readColors);
  const setMouse = e => {
    const r = frame.getBoundingClientRect();
    mouse = {x: e.clientX - r.left, y: e.clientY - r.top}; ro.classList.add('on');
  };
  frame.addEventListener('pointermove', setMouse);
  frame.addEventListener('pointerdown', setMouse);
  frame.addEventListener('pointerleave', () => { mouse = null; ro.classList.remove('on'); });
  if ('IntersectionObserver' in window) new IntersectionObserver(es => { running = es[0].isIntersecting; }).observe(frame);

  /* ---------- Project media: autoplay in view ---------- */
  /* PROJECTS is defined in js/projects.js */
  const BY = Object.fromEntries(PROJECTS.map(p => [p.slug, p]));
  function ensureVideo(box){
    let v = box.querySelector('video');
    if (!v && box.dataset.video){
      v = document.createElement('video');
      v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'none';
      v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true');
      v.src = box.dataset.video; v.poster = box.querySelector('img').src;
      box.insertBefore(v, box.querySelector('img').nextSibling);
      const prog = box.querySelector('.m-prog');
      v.addEventListener('playing', () => box.classList.add('playing'));
      v.addEventListener('timeupdate', () => { if (prog && v.duration) prog.style.transform = 'scaleX(' + (v.currentTime / v.duration) + ')'; });
    }
    return v;
  }
  const playBox = box => { const v = ensureVideo(box); if (v) v.play().catch(() => {}); };
  const pauseBox = box => { const v = box.querySelector('video'); if (v) v.pause(); };
  const mediaBoxes = $$('.card .media');
  if (!reduce && 'IntersectionObserver' in window){
    const mo = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? playBox(e.target) : pauseBox(e.target)), {threshold:.55});
    mediaBoxes.forEach(b => b.dataset.video && mo.observe(b));
  } else {
    mediaBoxes.forEach(b => b.closest('.card').addEventListener('mouseenter', () => playBox(b)));
  }
  $$('.card').forEach(c => {
    c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px'); });
  });

  /* ---------- Case viewer ---------- */
  const lb = $('#lb'), stage = $('#lbStage'), thumbs = $('#lbThumbs');
  let cur = 0, curM = 0, items = [], lastFocus = null;
  const pad = n => String(n).padStart(2, '0');
  function itemsFor(p){
    const list = [];
    if (p.video) list.push({type:'video', src:p.video, thumb:p.cover, cap: p.vkind === 'recording' ? 'Screen recording of the live project' : 'Project reel built from the repository'});
    p.gallery.forEach(g => list.push({type:'img', src:g.src, thumb:g.src, cap:g.cap}));
    if (!list.length) list.push({type:'img', src:p.cover, thumb:p.cover, cap:'Cover'});
    return list;
  }
  function showMedia(i, anim=true){
    curM = (i + items.length) % items.length; const it = items[curM];
    $$('.swap', stage).forEach(el => { if (el.tagName === 'VIDEO') el.pause(); el.remove(); });
    let el;
    if (it.type === 'video'){
      el = document.createElement('video'); el.src = it.src; el.poster = it.thumb; el.controls = true; el.loop = true; el.muted = true; el.playsInline = true; el.setAttribute('playsinline', '');
      if (!reduce) el.autoplay = true;
    } else { el = document.createElement('img'); el.src = it.src; el.alt = it.cap; }
    el.className = anim ? 'swap' : 'swap'; stage.prepend(el);
    $('#lbCap').textContent = it.cap;
    $('#lbCount').textContent = pad(curM + 1) + ' / ' + pad(items.length);
    $$('.lb-thumb', thumbs).forEach((t, k) => t.setAttribute('aria-current', k === curM));
    const single = items.length < 2; $('#lbPrevM').hidden = single; $('#lbNextM').hidden = single;
  }
  function showProject(i){
    cur = (i + PROJECTS.length) % PROJECTS.length; const p = PROJECTS[cur];
    items = itemsFor(p);
    $('#lbKick').textContent = p.kick; $('#lbTitle').textContent = p.title; $('#lbDesc').textContent = p.desc;
    $('#lbPos').textContent = pad(cur + 1) + ' / ' + PROJECTS.length;
    $('#lbStack').innerHTML = p.stack.map(s => '<li>' + s + '</li>').join('');
    $('#lbLinks').innerHTML = '<a class="pri" href="' + p.repo + '" target="_blank" rel="noopener">View repository ↗</a>' + (p.live ? '<a href="' + p.live + '" target="_blank" rel="noopener">Live demo ↗</a>' : '');
    thumbs.innerHTML = items.map((it, k) => '<button type="button" role="listitem" class="lb-thumb" aria-label="Show ' + it.cap.replace(/"/g, '') + '"><img src="' + it.thumb + '" alt="" loading="lazy">' + (it.type === 'video' ? '<span class="pl">▶</span>' : '') + '</button>').join('');
    $$('.lb-thumb', thumbs).forEach((t, k) => t.addEventListener('click', () => showMedia(k)));
    showMedia(0, false);
  }
  function openViewer(slug, fromEl){
    lastFocus = document.activeElement;
    showProject(PROJECTS.findIndex(p => p.slug === slug));
    lb.hidden = false; document.body.classList.add('lb-open');
    $$('.card .media video').forEach(v => v.pause());
    if (window.TMReel) window.TMReel.pause();
    if (!reduce){
      const panel = $('#lbPanel');
      if (fromEl){
        const a = fromEl.getBoundingClientRect(), b = stage.getBoundingClientRect();
        const sx = a.width / b.width, sy = a.height / b.height;
        stage.animate([{transform:`translate(${a.left - b.left}px,${a.top - b.top}px) scale(${sx},${sy})`, transformOrigin:'0 0', borderRadius:'8px'}, {transform:'none', transformOrigin:'0 0'}], {duration:620, easing:'cubic-bezier(.2,.8,.2,1)'});
      }
      panel.animate([{opacity:0}, {opacity:1}], {duration:300, easing:'ease-out'});
      $('.lb-scrim', lb).animate([{opacity:0}, {opacity:1}], {duration:300});
    }
    $('.lb-btn[data-close]', lb).focus({preventScroll:true});
  }
  function closeViewer(){
    $$('video', stage).forEach(v => v.pause());
    lb.hidden = true; document.body.classList.remove('lb-open');
    if (lastFocus) lastFocus.focus({preventScroll:true});
    if (!reduce && 'IntersectionObserver' in window) mediaBoxes.forEach(b => { const r = b.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) playBox(b); });
  }
  $$('[data-open]').forEach(el => el.addEventListener('click', e => { e.preventDefault(); openViewer(el.dataset.open, el.classList.contains('media') ? el : null); }));
  $$('[data-close]', lb).forEach(el => el.addEventListener('click', closeViewer));
  $('#lbPrevP').addEventListener('click', () => showProject(cur - 1));
  $('#lbNextP').addEventListener('click', () => showProject(cur + 1));
  $('#lbPrevM').addEventListener('click', () => showMedia(curM - 1));
  $('#lbNextM').addEventListener('click', () => showMedia(curM + 1));
  document.addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeViewer();
    else if (e.key === 'ArrowRight') showMedia(curM + 1);
    else if (e.key === 'ArrowLeft') showMedia(curM - 1);
    else if (e.key === 'Tab'){ // keep focus inside the viewer
      const f = $$('button:not([hidden]), a[href], video[controls]', lb).filter(x => x.offsetParent);
      if (!f.length) return; const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  });
  let sx0 = null; // swipe between images on touch
  stage.addEventListener('touchstart', e => { sx0 = e.touches[0].clientX; }, {passive:true});
  stage.addEventListener('touchend', e => { if (sx0 == null) return; const dx = e.changedTouches[0].clientX - sx0; if (Math.abs(dx) > 50) showMedia(curM + (dx < 0 ? 1 : -1)); sx0 = null; });

  /* ---------- Archive hover preview ---------- */
  const peek = $('#peek'), peekImg = $('#peekImg');
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches){
    let pv = null, px = 0, py = 0, raf = null;
    const move = () => { peek.style.left = (px + 24) + 'px'; peek.style.top = Math.min(py - 90, innerHeight - 210) + 'px'; raf = null; };
    $$('.qtable a').forEach(a => {
      a.addEventListener('mouseenter', () => {
        peekImg.src = a.dataset.cover;
        if (pv){ pv.remove(); pv = null; }
        if (a.dataset.video && !reduce){
          pv = document.createElement('video'); pv.muted = true; pv.loop = true; pv.playsInline = true; pv.autoplay = true; pv.src = a.dataset.video; peek.appendChild(pv); pv.play().catch(() => {});
        }
        peek.classList.add('on');
      });
      a.addEventListener('mousemove', e => { px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(move); });
      a.addEventListener('mouseleave', () => { peek.classList.remove('on'); if (pv){ pv.pause(); } });
    });
  }

  /* ---------- Project filter with FLIP ---------- */
  const cards = $$('#cards .card');
  $$('.filters button').forEach(btn => btn.addEventListener('click', () => {
    $$('.filters button').forEach(b => b.setAttribute('aria-pressed', b === btn));
    const cat = btn.dataset.filter;
    const first = new Map(cards.map(c => [c, c.hidden ? null : c.getBoundingClientRect()]));
    cards.forEach(c => c.hidden = !(cat === 'all' || c.dataset.cat === cat));
    if (reduce) return;
    cards.forEach((c, i) => {
      if (c.hidden) return;
      const f = first.get(c), l = c.getBoundingClientRect();
      if (!f){ c.animate([{opacity:0, transform:'translateY(24px) scale(.97)'},{opacity:1, transform:'none'}], {duration:550, delay:i * 40, easing:'cubic-bezier(.2,.8,.2,1)', fill:'backwards'}); }
      else { const dx = f.left - l.left, dy = f.top - l.top; if (dx || dy) c.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:'none'}], {duration:600, easing:'cubic-bezier(.2,.8,.2,1)'}); }
    });
  }));

  /* ---------- Star schema links ---------- */
  const schema = $('#schema'), svg = $('#links');
  function drawLinks(){
    if (getComputedStyle(svg).display === 'none') return;
    const sr = schema.getBoundingClientRect(), fact = $('.tbl.fact', schema).getBoundingClientRect();
    const fc = {x: fact.left - sr.left + fact.width / 2, y: fact.top - sr.top + fact.height / 2};
    let html = '';
    $$('.tbl:not(.fact)', schema).forEach(t => {
      const r = t.getBoundingClientRect(), id = t.dataset.id;
      const c = {x: r.left - sr.left + r.width / 2, y: r.top - sr.top + r.height / 2};
      // anchor on the facing vertical edge of each table
      const toLeft = c.x < fc.x;
      const ax = toLeft ? r.right - sr.left : r.left - sr.left, ay = c.y;
      const bx = toLeft ? fact.left - sr.left : fact.right - sr.left, by = fc.y + (c.y - fc.y) * .35;
      const mx = (ax + bx) / 2;
      html += `<path class="lnk" data-for="${id}" d="M${ax} ${ay}C${mx} ${ay} ${mx} ${by} ${bx} ${by}"/>`;
      html += `<circle class="end" data-for="${id}" cx="${ax}" cy="${ay}" r="4"/><circle class="end" data-for="${id}" cx="${bx}" cy="${by}" r="3"/>`;
    });
    svg.setAttribute('viewBox', `0 0 ${sr.width} ${sr.height}`);
    svg.innerHTML = html;
  }
  drawLinks();
  addEventListener('resize', () => { clearTimeout(drawLinks.t); drawLinks.t = setTimeout(drawLinks, 120); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawLinks);
  $$('.tbl:not(.fact)', schema).forEach(t => {
    const id = t.dataset.id, fact = $('.tbl.fact', schema);
    const on = v => { $$(`[data-for="${id}"]`, svg).forEach(el => el.classList.toggle('on', v)); fact.classList.toggle('on', v); };
    t.addEventListener('mouseenter', () => on(true)); t.addEventListener('mouseleave', () => on(false));
  });

  /* ---------- Copy email ---------- */
  const copyBtn = $('#copyBtn'), emailEl = $('#emailText');
  copyBtn.addEventListener('click', () => {
    const done = () => { copyBtn.textContent = 'Copied'; copyBtn.classList.add('done'); setTimeout(() => { copyBtn.textContent = 'Copy address'; copyBtn.classList.remove('done'); }, 1800); };
    const fallback = () => { const range = document.createRange(); range.selectNodeContents(emailEl); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(range); copyBtn.textContent = 'Selected, press Ctrl+C'; };
    try { navigator.clipboard.writeText(emailEl.textContent.trim()).then(done, fallback); } catch(e){ fallback(); }
  });
})();
