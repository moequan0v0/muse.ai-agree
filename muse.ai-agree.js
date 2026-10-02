// ==UserScript==
// @name         muse.ai agree
// @version      3.4.2
// @description  通过页面 RPC 串行处理审批请求，支持定时停止和浮球控制。
// @author       moequan
// @match        https://muse.ai/*
// @match        https://*.muse.ai/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  const AVATAR = "data:image/png;base64,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";
  const TAG = '[agree]', CFG_KEY = 'museAgreeCfg';
  const previous = window.__museAgreeInstalled;
  if (previous) (previous.dispose || previous.stopAgree).call(previous, true);
  delete window.__museAgree;
  delete window.__museAgreeInstalled;
  const G = window[Symbol.for('muse.ai.agree')] ||= window.__museAgreeGlobal || { gen: 0, seen: new Set() };
  delete window.__museAgreeGlobal;
  G.dispose?.();
  G.queue ||= Promise.resolve();
  const gen = ++G.gen, events = new AbortController();
  let run = null, epoch = 0, disposed = false, ui = null, panelTimer, feedbackTimer;
  let cachedCtx = null, scanAt = 0, lastError = '', feedback = '';
  const owns = () => !disposed && gen === G.gen;
  const message = (e) => e?.message || String(e);
  const transient = (e) => /NOT_CONNECTED|not ready|not connected|disconnect|connection|network|timeout|timed out|429|rate.?limit|too many requests|503|unavailable/i.test(`${e?.code || ''} ${message(e)}`);
  const backoff = (n) => Math.min(30000, 500 * 2 ** Math.min(n, 6));
  const jitter = (ms) => ms * (1.05 + Math.random() * 0.1);
  const number = (v, fallback, min = 0, max = Infinity) => {
    const n = Number(v);
    return v != null && v !== '' && Number.isFinite(n) && n >= min ? Math.min(n, max) : fallback;
  };
  function readCfg() {
    try {
      const v = JSON.parse(localStorage.getItem(CFG_KEY));
      return v && typeof v === 'object' && !Array.isArray(v) ? v : {};
    } catch { return {}; }
  }
  function writeCfg(patch) {
    try { localStorage.setItem(CFG_KEY, JSON.stringify({ ...readCfg(), ...patch })); }
    catch (e) { console.warn(TAG, '配置保存失败:', message(e)); }
  }
  const sleep = (ms, signal) => new Promise((resolve) => {
    if (!ms || signal?.aborted) return resolve();
    const done = () => { clearTimeout(timer); signal?.removeEventListener('abort', done); resolve(); };
    const timer = setTimeout(done, ms);
    signal?.addEventListener('abort', done, { once: true });
  });

  // React 的当前已提交树；缓存只保留 800ms，连接恢复后重新扫描。
  function rootFiber() {
    const fiberOf = (el) => el && el[Object.keys(el).find((k) => /^__react(Container|Fiber)/.test(k))];
    let fiber;
    for (const sel of ['#__next', '#root', '#app', '[data-reactroot]', 'main', 'body', 'html']) {
      fiber = fiberOf(document.querySelector(sel));
      if (fiber) break;
    }
    if (!fiber) for (const el of Array.from(document.querySelectorAll('*')).slice(0, 3000)) {
      fiber = fiberOf(el);
      if (fiber) break;
    }
    if (!fiber) return null;
    while (fiber.return) fiber = fiber.return;
    return fiber.stateNode?.current || fiber;
  }
  function contexts() {
    const out = [], visited = new Set(), stack = [rootFiber()];
    while (stack.length && visited.size < 200000) {
      const f = stack.pop();
      if (!f || visited.has(f)) continue;
      visited.add(f);
      let c = f.dependencies?.firstContext;
      for (let i = 0; c && i < 200; i++, c = c.next) out.push(c.memoizedValue);
      if (f.child) stack.push(f.child);
      if (f.sibling) stack.push(f.sibling);
    }
    return out;
  }
  const isRpc = (c) => c && typeof c.sendRequest === 'function' && typeof c.ensureLiveConnection === 'function' && 'gatewayUrl' in c;
  const usable = (c) => isRpc(c) && c.isReady === true && !['disconnected', 'connecting', 'reconnecting'].includes(c.connectionState);
  function findRpcCtx(force = false) {
    if (!force && Date.now() - scanAt < 800 && usable(cachedCtx)) return cachedCtx;
    const all = contexts().filter(isRpc);
    scanAt = Date.now();
    return cachedCtx = all.find(usable) || all[0] || null;
  }
  async function connection() {
    let ctx = findRpcCtx(true);
    if (!ctx) throw Object.assign(new Error('未找到 RPC 通道'), { code: 'NOT_CONNECTED' });
    if (!usable(ctx)) { await ctx.ensureLiveConnection(); ctx = findRpcCtx(true); }
    if (!usable(ctx)) throw Object.assign(new Error('RPC 尚未连接'), { code: 'NOT_CONNECTED' });
    return ctx;
  }
  const approvalKey = (session, id) => JSON.stringify([session.gateway, session.target, String(id)]);
  function call(method, payload = {}, state) {
    const version = epoch, active = state?.active || (() => owns() && version === epoch);
    const send = async () => {
      if (!active()) throw Object.assign(new Error('操作已停止'), { code: 'STOPPED' });
      const ctx = await connection(), target = ctx.connectionAuthority?.targetKey ?? null;
      if (!owns() || !active()) throw Object.assign(new Error('操作已停止'), { code: 'STOPPED' });
      const session = state?.session || {};
      if (session.bound && (session.target !== target || session.gateway !== ctx.gatewayUrl)) {
        throw Object.assign(new Error('连接目标已改变'), { code: 'TARGET_CHANGED' });
      }
      Object.assign(session, { bound: true, target, gateway: ctx.gatewayUrl });
      const key = method === 'egress.approval.decide' ? approvalKey(session, payload.approval_id) : null;
      if (key && G.seen.has(key)) return { skipped: true };
      const r = await ctx.sendRequest(method, payload, target === null ? {} : { expectedTargetKey: target });
      if (r?.error || r?.ok === false || r?.success === false) {
        throw Object.assign(new Error(r.error?.message || r.message || String(r.error || 'RPC 操作失败')), { code: r.error?.code || r.code });
      }
      if (key) {
        G.seen.add(key);
        if (G.seen.size > 1000) G.seen.delete(G.seen.values().next().value);
      }
      return r;
    };
    // 自动和手动处理共用串行通道；去重也在通道内完成。
    const task = G.queue.then(send);
    G.queue = task.catch(() => {});
    return task;
  }

  function pendingOf(r) {
    const list = r?.pending_approvals ?? r?.approvals?.pending ?? r?.pending ?? [];
    if (!Array.isArray(list)) throw new Error('待审批列表格式异常');
    return list;
  }
  const idOf = (a) => a?.approval_id ?? a?.approvalId ?? a?.id;
  function newState(active, signal) {
    return { active, signal, session: {}, fails: new Map() };
  }
  async function processPending(state) {
    const list = pendingOf(await call('egress.approvals', {}, state)), out = [];
    const ids = new Set(list.map(idOf));
    for (const id of state.fails.keys()) if (!ids.has(id)) state.fails.delete(id);
    for (const a of list) {
      if (!state.active()) break;
      const id = idOf(a);
      if (id == null || id === '' || G.seen.has(approvalKey(state.session, id))) continue;
      if (Date.now() < (state.fails.get(id)?.nextAt || 0)) continue;
      try {
        const r = await call('egress.approval.decide', { approval_id: id, decision: readCfg().autoStartDecision || 'allow_always' }, state);
        if (r?.skipped) continue;
        state.fails.delete(id);
        out.push({ id, ok: true });
      } catch (e) {
        if (!state.active()) break;
        if (e.code === 'TARGET_CHANGED' || transient(e)) throw e;
        const tries = (state.fails.get(id)?.tries || 0) + 1;
        state.fails.set(id, { tries, nextAt: Date.now() + backoff(tries) });
        lastError = message(e);
        out.push({ id, ok: false, error: lastError });
        console.error(TAG, id, lastError);
      }
      if (state.active()) await sleep(jitter(number(readCfg().sleepSec, 0.2, 0, 30) * 1000), state.signal);
    }
    return out;
  }
  function agreeNow() {
    const version = epoch;
    return processPending(newState(() => owns() && version === epoch));
  }
  function stopAgree(silent = false) {
    epoch++;
    const current = run;
    run = null;
    if (current) { clearTimeout(current.timer); clearTimeout(current.endTimer); current.controller.abort(); }
    if (!silent) writeCfg({ autoStart: false });
    render();
  }
  async function autoAgree() {
    if (!owns()) throw new Error('脚本实例已失效');
    stopAgree(true);
    const controller = new AbortController(), duration = number(readCfg().durMin, 10, 1, 1440) * 60000;
    const expire = () => { if (run === current) { writeCfg({ autoStart: false }); stopAgree(true); } };
    const active = () => {
      if (!owns() || run !== current) return false;
      if (Date.now() >= current.deadline) expire();
      return run === current;
    };
    const current = run = { ...newState(active, controller.signal), controller, deadline: Date.now() + duration, errors: 0 };
    current.endTimer = setTimeout(expire, duration);
    lastError = '';
    render();
    const interval = number(readCfg().autoStartInterval, 2500, 250, 60000);
    const tick = async () => {
      if (!active()) return;
      try {
        await processPending(current);
        current.errors = 0;
        if (!current.fails.size) lastError = '';
      } catch (e) {
        if (!active()) return;
        if (lastError !== message(e)) console.warn(TAG, message(e));
        lastError = message(e);
        if (e.code === 'TARGET_CHANGED') { stopAgree(); return; }
        current.errors++;
      }
      if (active()) current.timer = setTimeout(tick, jitter(Math.max(interval, current.errors ? backoff(current.errors) : 0)));
      render();
    };
    await tick();
  }
  function toggleAuto(on) {
    writeCfg({ autoStart: !!on });
    if (on) return autoAgree();
    stopAgree();
  }

  // iOS 风格图标面板；文字仅出现在编辑框、悬停提示和短反馈中。
  const ICONS = {
    power: '<path d="M12 3v9M6.35 5.65a8 8 0 1 0 11.3 0"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/>',
    gap: '<path d="M7 3h10M7 21h10M8 3v4c0 2 8 8 8 10v4M16 3v4c0 2-8 8-8 10v4"/>',
    bolt: '<path d="m13.5 3-8 10h6l-1 8 8-10h-6z"/>',
    check: '<path d="m5 12 4.5 4.5L19 7"/>',
    paw: '<ellipse cx="5" cy="8" rx="2" ry="2.5" transform="rotate(-25 5 8)"/><ellipse cx="9.5" cy="5.5" rx="2" ry="2.6"/><ellipse cx="14.5" cy="5.5" rx="2" ry="2.6"/><ellipse cx="19" cy="8" rx="2" ry="2.5" transform="rotate(25 19 8)"/><path d="M12 10.5c-2.3 0-2.7 2.1-4.2 3.8-1.1 1.2-2.3 2-2 3.6.3 1.6 1.8 2.3 3.1 1.7 1.8-.8 4.4-.8 6.2 0 1.3.6 2.8-.1 3.1-1.7.3-1.6-.9-2.4-2-3.6-1.5-1.7-1.9-3.8-4.2-3.8z"/>',
  };
  const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;
  const listen = (el, event, handler) => el.addEventListener(event, handler, { signal: events.signal });
  const clamp = (x, y, w = 38, h = 38) => ({ x: Math.max(4, Math.min(x, window.innerWidth - w - 4)), y: Math.max(4, Math.min(y, window.innerHeight - h - 4)) });
  function positionPop() {
    if (ui.pop.style.display !== 'block') return;
    const { ball, pop } = ui, r = ball.getBoundingClientRect(), w = pop.offsetWidth || 190, h = pop.offsetHeight || 64;
    const below = r.bottom + 8;
    const p = clamp(r.left + r.width / 2 - w / 2, below + h <= window.innerHeight - 4 ? below : r.top - h - 8, w, h);
    Object.assign(pop.style, { left: `${p.x}px`, top: `${p.y}px` });
  }
  function togglePop(show) {
    ui.pop.style.display = show ? 'block' : 'none';
    ui.ball.setAttribute('aria-expanded', String(show));
    if (show) render();
    else { ui.pop.querySelector('.mp-edit').hidden = true; for (const sel of ['.mp-clock', '.mp-gap']) ui.pop.querySelector(sel).setAttribute('aria-expanded', 'false'); }
  }
  function render() {
    if (!ui) return;
    ui.ball.classList.toggle('is-on', !!run);
    const auto = ui.pop.querySelector('.mp-auto'), status = ui.pop.querySelector('.mp-state'), note = ui.pop.querySelector('.mp-note');
    auto.setAttribute('aria-pressed', String(!!run));
    auto.title = run ? '关闭自动处理' : '开启自动处理';
    const left = Math.max(0, (run?.deadline || 0) - Date.now());
    status.classList.toggle('on', !!run);
    status.title = run ? (run.errors ? '重试中' : `剩余 ${String(Math.floor(left / 60000)).padStart(2, '0')}:${String(Math.floor(left / 1000) % 60).padStart(2, '0')}`) : '已暂停';
    status.setAttribute('aria-label', status.title);
    const cfg = readCfg();
    ui.pop.querySelector('.mp-clock').title = `运行时长：${number(cfg.durMin, 10, 1, 1440)} 分钟`;
    ui.pop.querySelector('.mp-gap').title = `每条间隔：${number(cfg.sleepSec, 0.2, 0, 30)} 秒`;
    note.textContent = lastError ? (/改变/.test(lastError) ? '连接已切换' : /RPC|连接|network|disconnect/i.test(lastError) ? '连接暂不可用' : '处理失败，请稍后重试') : feedback;
    note.hidden = !note.textContent;
    note.classList.toggle('error', !!lastError);
    if (ui.pop.style.display === 'block') positionPop();
  }
  function notify(text) {
    feedback = text;
    clearTimeout(feedbackTimer);
    feedbackTimer = setTimeout(() => { feedback = ''; render(); }, 3000);
    render();
  }
  function mountUI() {
    const style = document.createElement('style');
    style.id = 'muse-agree-style';
    style.textContent = `
.mp-theme-light{--bg:rgba(250,250,252,.86);--fg:#505055;--sub:#949499;--border:rgba(255,255,255,.8);--field:rgba(118,118,128,.065);--line:rgba(60,60,67,.1);--action:rgba(118,118,128,.09);--accent:#68686d;--running:#d98fa9}
.mp-theme-dark{--bg:rgba(34,34,38,.86);--fg:#d6d6da;--sub:#99999f;--border:rgba(255,255,255,.13);--field:rgba(255,255,255,.055);--line:rgba(255,255,255,.09);--action:rgba(255,255,255,.085);--accent:#c1c1c7;--running:#e7a4bb}
#muse-agree-ball,#muse-agree-pop{all:initial;box-sizing:border-box;color:var(--fg);font:400 12px/1.4 -apple-system,BlinkMacSystemFont,"SF Pro Text","PingFang SC","Microsoft YaHei UI",sans-serif;-webkit-backdrop-filter:blur(32px) saturate(160%);backdrop-filter:blur(32px) saturate(160%);user-select:none}
#muse-agree-pop *{box-sizing:border-box;font:inherit;color:inherit;letter-spacing:normal}
#muse-agree-ball{position:fixed;width:38px;height:38px;padding:2px;z-index:2147483646;border-radius:50%;cursor:grab;touch-action:none;border:1px solid var(--border);box-shadow:0 3px 12px #0003;background:var(--bg);display:grid;place-items:center}#muse-agree-ball.is-dragging{cursor:grabbing}
#muse-agree-ball img{display:block;width:100%;height:100%;border-radius:50%;object-fit:cover;pointer-events:none;-webkit-user-drag:none}#muse-agree-ball:hover{box-shadow:0 4px 16px #0004}
#muse-agree-ball:after{content:"";position:absolute;right:0;bottom:1px;width:6px;height:6px;background:var(--sub);border-radius:50%;box-shadow:0 0 0 2px var(--bg)}#muse-agree-ball.is-on:after{background:var(--running)}
#muse-agree-pop{position:fixed;display:none;z-index:2147483647;width:min(190px,calc(100vw - 20px));border-radius:18px;padding:14px 10px 10px;background:var(--bg);border:1px solid var(--border);box-shadow:0 8px 26px #00000024;animation:mp-enter .18s ease-out}
#muse-agree-pop [hidden]{display:none!important}#muse-agree-pop .mp-state{position:absolute;top:2px;right:8px;width:12px;height:12px;color:var(--sub)}#muse-agree-pop .mp-state.on{color:var(--running)}
#muse-agree-pop .mp-tools{display:flex;justify-content:space-between;gap:6px}#muse-agree-pop svg{display:block;width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.65;stroke-linecap:round;stroke-linejoin:round;pointer-events:none}
#muse-agree-pop .mp-state svg{width:12px;height:12px;fill:currentColor;stroke:none}
#muse-agree-pop .mp-icon,#muse-agree-pop .mp-apply{position:relative;display:grid;place-items:center;width:36px;height:36px;min-width:0;min-height:0;margin:0;padding:0;border:0;border-radius:13px;background:var(--field);color:var(--sub);cursor:pointer;appearance:none;transition:filter .15s,transform .18s}
#muse-agree-pop .mp-icon:hover{background:var(--action);color:var(--fg)}#muse-agree-pop .mp-icon:active{transform:scale(.95)}#muse-agree-pop .mp-auto[aria-pressed="true"]{background:#34c7591c;color:#30b957}
#muse-agree-pop .mp-icon[aria-expanded="true"]{background:var(--action);color:var(--fg)}#muse-agree-pop .mp-now{color:var(--fg)}#muse-agree-pop .mp-now svg{fill:currentColor;stroke-width:1}
#muse-agree-pop .mp-now:disabled{opacity:.6;cursor:wait}#muse-agree-pop .mp-now:disabled svg{opacity:0}#muse-agree-pop .mp-now:disabled:before{content:"";position:absolute;width:12px;height:12px;border:1.5px solid var(--line);border-top-color:var(--accent);border-radius:50%;animation:mp-spin .7s linear infinite}
#muse-agree-pop .mp-edit{display:flex;align-items:center;gap:6px;margin:9px 0 0;padding:7px 0 0;border-top:1px solid var(--line)}#muse-agree-pop .mp-value{width:0;min-width:0;flex:1;height:26px;min-height:0;margin:0;padding:3px 6px;border:0;border-radius:6px;background:var(--field);color:var(--fg);font-variant-numeric:tabular-nums;appearance:textfield}
#muse-agree-pop .mp-value::-webkit-outer-spin-button,#muse-agree-pop .mp-value::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}#muse-agree-pop .mp-unit{font-size:10px;color:var(--sub)}#muse-agree-pop .mp-apply{width:26px;height:26px;border-radius:7px;background:var(--action);color:var(--accent)}#muse-agree-pop .mp-apply svg{width:16px;height:16px}
#muse-agree-pop .mp-note{margin-top:7px;font-size:10px;color:var(--sub);text-align:right;overflow-wrap:anywhere}#muse-agree-pop .mp-note.error{color:#ff453a}
#muse-agree-ball:focus-visible,#muse-agree-pop button:focus-visible,#muse-agree-pop input:focus-visible{outline:2px solid #007aff73;outline-offset:2px}
@keyframes mp-enter{from{opacity:0;transform:translateY(5px) scale(.98)}to{opacity:1;transform:none}}@keyframes mp-spin{to{transform:rotate(360deg)}}
@media(prefers-reduced-motion:reduce){#muse-agree-pop,#muse-agree-pop *,#muse-agree-ball{animation:none!important;transition:none!important}}`;
    const ball = document.createElement('button'), pop = document.createElement('div');
    ball.id = 'muse-agree-ball'; ball.type = 'button'; ball.title = '自动审批';
    ball.setAttribute('aria-label', '自动审批'); ball.setAttribute('aria-expanded', 'false');
    ball.innerHTML = '<img src="' + AVATAR + '" alt="" draggable="false" />';
    pop.id = 'muse-agree-pop'; pop.setAttribute('role', 'dialog'); pop.setAttribute('aria-label', '自动审批设置');
    pop.innerHTML = `
<span class="mp-state" role="status">${icon('paw')}</span><div class="mp-tools">
  <button class="mp-icon mp-auto" type="button" aria-label="自动处理" aria-pressed="false">${icon('power')}</button>
  <button class="mp-icon mp-clock" type="button" aria-label="运行时长" aria-expanded="false">${icon('clock')}</button>
  <button class="mp-icon mp-gap" type="button" aria-label="每条间隔" aria-expanded="false">${icon('gap')}</button>
  <button class="mp-icon mp-now" type="button" title="立即处理" aria-label="立即处理">${icon('bolt')}</button>
</div><form class="mp-edit" hidden><input class="mp-value" type="number" required aria-label="设置数值"/><span class="mp-unit"></span><button class="mp-apply" type="submit" title="保存" aria-label="保存">${icon('check')}</button></form><div class="mp-note" aria-live="polite" hidden></div>`;
    ui = { ball, pop, style };
    document.head.appendChild(style); document.body.appendChild(ball); document.body.appendChild(pop);
    const cfg = readCfg(), p = cfg.ballPos;
    const initial = p && Number.isFinite(p.x) && Number.isFinite(p.y) ? clamp(p.x, p.y) : clamp(window.innerWidth - 52, 80);
    Object.assign(ball.style, { left: `${initial.x}px`, top: `${initial.y}px` });
    listen(pop.querySelector('.mp-auto'), 'click', () => toggleAuto(!run)?.catch((err) => console.error(TAG, message(err))));
    const form = pop.querySelector('.mp-edit'), input = pop.querySelector('.mp-value');
    let setting;
    for (const [sel, key, def, min, max, step, unit] of [['.mp-clock', 'durMin', 10, 1, 1440, 1, '分钟'], ['.mp-gap', 'sleepSec', 0.2, 0, 30, 0.1, '秒']]) {
      listen(pop.querySelector(sel), 'click', () => {
        const open = form.hidden || setting?.key !== key;
        setting = { key, def, min, max }; form.hidden = !open;
        for (const s of ['.mp-clock', '.mp-gap']) pop.querySelector(s).setAttribute('aria-expanded', String(open && s === sel));
        if (open) { Object.assign(input, { value: number(readCfg()[key], def, min, max), min, max, step }); pop.querySelector('.mp-unit').textContent = unit; input.setAttribute('aria-label', key === 'durMin' ? '运行分钟数' : '审批间隔秒数'); input.focus(); input.select(); }
        positionPop();
      });
    }
    listen(form, 'submit', (e) => {
      e.preventDefault();
      if (!setting || !input.checkValidity()) return;
      const value = number(input.value, setting.def, setting.min, setting.max);
      writeCfg({ [setting.key]: value });
      if (setting.key === 'durMin' && run) {
        const current = run; clearTimeout(current.endTimer); current.deadline = Date.now() + value * 60000;
        current.endTimer = setTimeout(() => { if (run === current) { writeCfg({ autoStart: false }); stopAgree(true); } }, value * 60000);
      }
      form.hidden = true; for (const s of ['.mp-clock', '.mp-gap']) pop.querySelector(s).setAttribute('aria-expanded', 'false'); render(); positionPop();
    });
    listen(pop.querySelector('.mp-now'), 'click', async () => {
      const btn = pop.querySelector('.mp-now');
      btn.disabled = true; btn.setAttribute('aria-busy', 'true'); lastError = '';
      try { const out = await agreeNow(), count = out.filter((r) => r.ok).length; if (!out.some((r) => r.ok === false)) notify(count ? `已处理 ${count} 项` : '暂无待办'); }
      catch (e) { lastError = message(e); console.error(TAG, lastError); }
      finally { btn.disabled = false; btn.setAttribute('aria-busy', 'false'); render(); }
    });
    let drag, dragged = false;
    listen(ball, 'pointerdown', (e) => {
      if (drag || e.button !== 0 || e.isPrimary === false) return;
      const r = ball.getBoundingClientRect();
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, left: r.left, top: r.top }; dragged = false;
      ball.setPointerCapture(e.pointerId); e.preventDefault();
    });
    listen(ball, 'pointermove', (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      dragged ||= Math.abs(dx) > 3 || Math.abs(dy) > 3;
      if (!dragged) return;
      ball.classList.toggle('is-dragging', true);
      const p = clamp(drag.left + dx, drag.top + dy);
      Object.assign(ball.style, { left: `${p.x}px`, top: `${p.y}px` }); positionPop();
    });
    const endDrag = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      if (dragged) { const r = ball.getBoundingClientRect(); writeCfg({ ballPos: clamp(r.left, r.top) }); }
      drag = null; ball.classList.toggle('is-dragging', false);
    };
    listen(ball, 'pointerup', endDrag);
    listen(ball, 'lostpointercapture', endDrag);
    listen(ball, 'pointercancel', (e) => { if (drag && e.pointerId === drag.id) { endDrag(e); dragged = false; } });
    listen(ball, 'click', (e) => { if (!dragged || e.detail === 0) togglePop(pop.style.display !== 'block'); dragged = false; });
    listen(window, 'pointerdown', (e) => { if (!ball.contains(e.target) && !pop.contains(e.target)) togglePop(false); });
    listen(window, 'keydown', (e) => { if (e.key === 'Escape') togglePop(false); });
    listen(window, 'resize', () => { const r = ball.getBoundingClientRect(), p = clamp(r.left, r.top); Object.assign(ball.style, { left: `${p.x}px`, top: `${p.y}px` }); positionPop(); });
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const theme = () => { for (const el of [ball, pop]) { el.classList.toggle('mp-theme-dark', media.matches); el.classList.toggle('mp-theme-light', !media.matches); } };
    listen(media, 'change', theme); theme(); render();
    panelTimer = setInterval(render, 1000);
  }
  function dispose() {
    disposed = true; stopAgree(true); events.abort(); clearInterval(panelTimer); clearTimeout(feedbackTimer);
    if (ui) for (const el of Object.values(ui)) el.remove();
  }
  G.dispose = dispose;
  mountUI();
  if (readCfg().autoStart !== false) autoAgree().catch((e) => console.error(TAG, message(e)));
})();
