/* Educational Inequality Lab · Chapter 01
   All empirical probabilities are transcribed from the author's existing
   School Context & Transition Explorer, 'Published adjusted predicted
   probabilities (Tables 7–9)'. Values below are percent, not fractions.
   This page intentionally focuses on the academic transition only.
   No dependencies, trackers, requests, or server are required. */
(() => {
  'use strict';
  const root = document.getElementById('eil-root');
  if (!root) return;

  const DATA = {
    female: [
      { name: 'Low', range: '0–15%', native: 71.2, nonNative: 57.2 },
      { name: 'Medium', range: '16–30%', native: 65.1, nonNative: 53.1 },
      { name: 'High', range: '31%+', native: 60.3, nonNative: 54.0 }
    ],
    male: [
      { name: 'Low', range: '0–15%', native: 71.3, nonNative: 56.0 },
      { name: 'Medium', range: '16–30%', native: 63.6, nonNative: 50.7 },
      { name: 'High', range: '31%+', native: 56.5, nonNative: 47.6 }
    ]
  };
  const STORAGE_KEY = 'educational-inequality-lab-ch1-v1';
  const INITIAL = { step: 0, gender: 'female', prediction: null, reflection: null };
  let state = { ...INITIAL };
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved && Number.isInteger(saved.step) && saved.step >= 0 && saved.step <= 5) {
      state = {
        step: saved.step,
        gender: saved.gender === 'male' ? 'male' : 'female',
        prediction: ['Low','Medium','High'].includes(saved.prediction) ? saved.prediction : null,
        reflection: ['higher', 'lower', 'causal'].includes(saved.reflection) ? saved.reflection : null
      };
      // Never resume the prediction scene already past an unanswered question.
      if (state.step > 1 && !state.prediction) state.step = 1;
    }
  } catch (_) { /* Direct file preview may disallow localStorage. */ }

  const q = sel => root.querySelector(sel);
  const qa = sel => Array.from(root.querySelectorAll(sel));
  const pct = x => x.toFixed(1) + '%';
  const pp = x => x.toFixed(1) + ' pp';
  const gap = obj => +(obj.native - obj.nonNative).toFixed(1);
  const rows = () => DATA[state.gender];
  const maxGap = () => rows().reduce((a,b) => gap(a) >= gap(b) ? a : b);
  const save = () => { try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {} };
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const arrow = ' →';

  function syncInputs() {
    qa('input[name="eil-prediction"]').forEach(input => { input.checked = input.value === state.prediction; });
    qa('input[name="eil-reflection"]').forEach(input => { input.checked = input.value === state.reflection; });
    qa('[data-gender]').forEach(btn => {
      const selected = btn.dataset.gender === state.gender;
      btn.classList.toggle('is-selected', selected);
      btn.setAttribute('aria-pressed', String(selected));
    });
    const predictBtn = q('[data-action="predict"]');
    if (predictBtn) predictBtn.disabled = !state.prediction;
    const reflectBtn = q('[data-action="reflect"]');
    if (reflectBtn) reflectBtn.disabled = !state.reflection;
  }

  function animateWidths() {
    // The frame delay lets CSS animate after a newly revealed scene is displayed.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      qa('.eil-gap-fill[data-target], .eil-tick-fill[data-target]').forEach(bar => {
        bar.style.width = bar.dataset.target + '%';
      });
    }));
  }

  function showStep(next, { focus = true } = {}) {
    state.step = Math.min(5, Math.max(0, next));
    qa('[data-scene]').forEach(scene => { scene.hidden = Number(scene.dataset.scene) !== state.step; });
    qa('.eil-dot').forEach((dot, idx) => {
      dot.classList.toggle('done', idx < state.step);
      dot.classList.toggle('current', idx === state.step - 1);
    });
    q('[data-step-count]').textContent = `${state.step} / 5`;
    q('[data-progress-name]').textContent = state.step === 0 ? 'Introduction' : state.step === 5 ? 'Discovery complete' : `Discovery · Step ${state.step}`;
    if (state.step === 2) renderGap();
    if (state.step === 3) renderLevels();
    if (state.step === 4) renderReflection();
    if (state.step === 5) renderCompletion();
    syncInputs();
    save();
    if (focus) {
      // Position at the top on long/mobile pages and focus scene heading for screen readers.
      const heading = q(`[data-scene="${state.step}"] h1, [data-scene="${state.step}"] h2`);
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
        const top = q('.eil-masthead').getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
      }
    }
  }

  function renderGap() {
    const container = q('[data-gap-chart]');
    container.replaceChildren();
    const winner = maxGap().name;
    for (const item of rows()) {
      const line = el('div', 'eil-gap-row' + (item.name === winner ? ' max' : ''));
      const label = el('div', 'eil-gap-label', item.name + ' concentration');
      label.appendChild(el('small', '', item.range + ' non-native'));
      const track = el('div', 'eil-gap-bar');
      const fill = el('span', 'eil-gap-fill');
      fill.dataset.target = String(gap(item) / 20 * 100); // Same 0–20 pp scale across genders.
      track.setAttribute('role', 'img');
      track.setAttribute('aria-label', `${item.name} concentration: ${pp(gap(item))} gap`);
      track.appendChild(fill);
      const value = el('div', 'eil-gap-value', gap(item).toFixed(1) + ' ');
      value.appendChild(el('small', '', 'pp'));
      line.append(label, track, value);
      container.appendChild(line);
    }
    const picked = rows().find(r => r.name === state.prediction);
    const match = picked && picked.name === winner;
    q('[data-prediction-feedback-title]').textContent = match ? 'Your prediction matches the largest observed gap.' : 'The largest gap is in another context.';
    q('[data-prediction-feedback-body]').textContent =
      `You selected ${state.prediction.toLowerCase()} concentration. Among ${state.gender === 'female' ? 'girls' : 'boys'}, the largest adjusted Native–Non-native gap is ${pp(gap(maxGap()))} in low-concentration schools. What happens if we examine the actual probabilities, rather than just the distance between groups?`;
    q('[data-gender-word]').textContent = state.gender === 'female' ? 'girls' : 'boys';
    animateWidths();
  }

  function renderLevels() {
    const container = q('[data-level-chart]');
    container.replaceChildren();
    const list = rows();
    for (const row of list) {
      const group = el('div', 'eil-level-row');
      const head = el('div', 'eil-level-head', row.name + ' concentration');
      head.appendChild(el('small', '', row.range + ' non-native students'));
      group.appendChild(head);
      for (const [field, title, extra] of [
        ['native', 'Native', ''], ['nonNative', 'Non-native', 'non']
      ]) {
        const line = el('div', 'eil-tick-row');
        line.appendChild(el('span', 'eil-tick-label', title));
        const track = el('div', 'eil-tick-track');
        track.setAttribute('role', 'img');
        track.setAttribute('aria-label', `${row.name} concentration, ${title}: ${pct(row[field])}`);
        const bar = el('div', 'eil-tick-fill ' + extra);
        bar.dataset.target = String(row[field]); // All bars use the same 0–100% baseline.
        track.appendChild(bar);
        line.append(track, el('span', 'eil-tick-value', pct(row[field])));
        group.appendChild(line);
      }
      container.appendChild(group);
    }
    const low = list[0], high = list[2];
    q('[data-low-gap]').textContent = pp(gap(low));
    q('[data-high-gap]').textContent = pp(gap(high));
    q('[data-low-native]').textContent = pct(low.native);
    q('[data-high-native]').textContent = pct(high.native);
    q('[data-low-nonnative]').textContent = pct(low.nonNative);
    q('[data-high-nonnative]').textContent = pct(high.nonNative);
    q('[data-gender-word-level]').textContent = state.gender === 'female' ? 'girls' : 'boys';
    animateWidths();
  }

  function renderReflection() {
    q('[data-action="reflect"]').dataset.ready = 'false';
    const feedback = q('[data-reflection-feedback]');
    feedback.hidden = true;
    const button = q('[data-action="reflect"]');
    button.textContent = 'See the interpretation →';
    button.disabled = !state.reflection;
  }

  function revealReflection() {
    const feedback = q('[data-reflection-feedback]');
    const isRight = state.reflection === 'lower';
    q('[data-reflection-head]').textContent = isRight ? 'Exactly. A gap can narrow while outcomes remain unequal.' : 'The distinction is between relative gaps and absolute opportunities.';
    q('[data-reflection-body]').textContent =
      'In these adjusted estimates, the academic-transition gap narrows as school concentration increases, but the predicted probabilities for both groups are lower in high- than low-concentration contexts. These descriptive/model-based patterns do not establish a causal effect of school composition.';
    feedback.hidden = false;
    q('[data-action="reflect"]').textContent = 'Continue to the insight →';
    q('[data-action="reflect"]').dataset.ready = 'true';
    feedback.scrollIntoView({ block: 'nearest', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }

  function renderCompletion() {
    const picked = state.reflection;
    q('[data-finish-recall]').textContent = picked === 'lower'
      ? 'You identified the key distinction between inequality gaps and overall opportunity levels.'
      : 'You have now seen why a smaller group difference does not, by itself, indicate better opportunities.';
  }

  root.addEventListener('click', ev => {
    const btn = ev.target.closest('button[data-action]');
    if (!btn || !root.contains(btn) || btn.disabled) return;
    const action = btn.dataset.action;
    if (action === 'start') showStep(1);
    else if (action === 'predict' && state.prediction) showStep(2);
    else if (action === 'levels') showStep(3);
    else if (action === 'insight') showStep(4);
    else if (action === 'reflect' && state.reflection) {
      if (btn.dataset.ready === 'true') {
        btn.dataset.ready = 'false';
        showStep(5);
      } else revealReflection();
    }
    else if (action === 'back') {
      const scene = Number(btn.closest('[data-scene]').dataset.scene);
      showStep(scene - 1);
    }
    else if (action === 'restart') {
      state = { ...INITIAL };
      q('[data-action="reflect"]').dataset.ready = 'false';
      showStep(0);
    }
  });
  root.addEventListener('change', ev => {
    const target = ev.target;
    if (target.name === 'eil-prediction') state.prediction = target.value;
    if (target.name === 'eil-reflection') {
      state.reflection = target.value;
      q('[data-action="reflect"]').dataset.ready = 'false';
      q('[data-reflection-feedback]').hidden = true;
      q('[data-action="reflect"]').textContent = 'See the interpretation →';
    }
    syncInputs();
    save();
  });
  root.addEventListener('click', ev => {
    const genderBtn = ev.target.closest('button[data-gender]');
    if (!genderBtn) return;
    state.gender = genderBtn.dataset.gender;
    syncInputs();
    if (state.step === 2) renderGap();
    if (state.step === 3) renderLevels();
    save();
  });

  showStep(state.step, { focus: false });
})();
