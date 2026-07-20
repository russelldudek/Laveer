# Posture Lattice Transformation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing AI Assurance Lattice into four visually and semantically distinct governance states while preserving one selected use case.

**Architecture:** JavaScript owns posture state and applies a single `data-posture-state` value to `.lattice-board`, plus posture-specific copy. A focused stylesheet maps each state to geometry, enclosure, opacity, and emphasis changes. Existing scenario selection remains the source of recommended posture values.

**Tech Stack:** Static HTML, CSS custom properties and transitions, vanilla JavaScript, Python contract tests, Chromium/CDP interaction validation.

## Global Constraints

- Keep the same selected use case when a posture button is clicked.
- Preserve native buttons, visible focus, `aria-pressed`, and reduced-motion behavior.
- Preserve the existing scenario controls and reset behavior.
- Do not introduce third-party runtime dependencies.
- Keep every transformation inside the lattice board with no horizontal overflow at 320px.
- Hover and keyboard-focus treatments remain white.

---

### Task 1: Define the posture-state contract

**Files:**
- Create: `tests/test_posture_transform_contract.py`
- Modify: `index.html`

**Interfaces:**
- Consumes: four existing `.posture-step` buttons and `.lattice-board`.
- Produces: `data-posture-state`, `#lattice-core-mode`, `#lattice-core-message`, and an `aria-live` state label.

- [ ] **Step 1: Write the failing contract test**

```python
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def test_lattice_exposes_posture_state_targets():
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    assert 'data-posture-state="assist"' in html
    assert 'id="lattice-core-mode"' in html
    assert 'id="lattice-core-message"' in html
    assert 'class="lattice-state" aria-live="polite"' in html
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `python -m unittest tests/test_posture_transform_contract.py -v`

Expected: FAIL because the state attribute and copy targets do not exist yet.

- [ ] **Step 3: Add the minimal HTML state targets**

Update the lattice board to begin with `data-posture-state="assist"`, make `.lattice-state` a polite live region, and add IDs to the core mode and message nodes.

- [ ] **Step 4: Run the test and verify it passes**

Run: `python -m unittest tests/test_posture_transform_contract.py -v`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add index.html tests/test_posture_transform_contract.py
git commit -m "Define lattice posture state contract"
```

### Task 2: Implement posture state and operating copy

**Files:**
- Modify: `app.js`
- Modify: `tests/test_posture_transform_contract.py`

**Interfaces:**
- Consumes: `setPosture(selectedPosture, preview)` and the HTML targets from Task 1.
- Produces: `postureVisuals`, `board.dataset.postureState`, mode copy, message copy, and synchronized `aria-pressed` state.

- [ ] **Step 1: Extend the failing contract test**

```python
def test_javascript_maps_all_four_postures_to_visual_states():
    script = (ROOT / "app.js").read_text(encoding="utf-8")
    for state in ("explore", "assist", "control", "review"):
        assert f"state: '{state}'" in script
    assert "board.dataset.postureState = visual.state" in script
    assert "coreMode.textContent = visual.mode" in script
    assert "coreMessage.textContent = visual.message" in script
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `python -m unittest tests/test_posture_transform_contract.py -v`

Expected: FAIL because the visual-state mapping is absent.

- [ ] **Step 3: Add the posture visual map and state updates**

Define exact mappings:

```javascript
const postureVisuals = new Map([
  ['Sandbox / explore', {
    state: 'explore',
    mode: 'Explore',
    message: 'Bounded experiment. No operational reliance.',
    announcement: 'Explore posture · open sandbox with minimum operational dependence'
  }],
  ['Assisted workflow', {
    state: 'assist',
    mode: 'Assist',
    message: 'Human-authoritative support. Engineer decides.',
    announcement: 'Assist posture · human-authoritative workflow support'
  }],
  ['Controlled production', {
    state: 'control',
    mode: 'Control',
    message: 'Validated, monitored, and recoverable.',
    announcement: 'Control posture · monitored production with recovery controls'
  }],
  ['Independent assurance review', {
    state: 'review',
    mode: 'Independent review',
    message: 'Independent approval and explicit stop rights.',
    announcement: 'Independent review posture · qualified approval and stop rights'
  }]
]);
```

Update `setPosture()` to apply the board dataset, mode, message, announcement, active class, and `aria-pressed` values without changing scenario content.

- [ ] **Step 4: Run the test and verify it passes**

Run: `python -m unittest tests/test_posture_transform_contract.py -v`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app.js tests/test_posture_transform_contract.py
git commit -m "Drive lattice from posture state"
```

### Task 3: Build four distinct lattice geometries

**Files:**
- Create: `posture-transform.css`
- Modify: `index.html`
- Modify: `tests/test_posture_transform_contract.py`

**Interfaces:**
- Consumes: `.lattice-board[data-posture-state]` and existing lattice elements.
- Produces: four CSS state systems plus reduced-motion overrides.

- [ ] **Step 1: Extend the failing contract test**

```python
def test_css_defines_all_four_visual_states_and_reduced_motion():
    css = (ROOT / "posture-transform.css").read_text(encoding="utf-8")
    for state in ("explore", "assist", "control", "review"):
        assert f'[data-posture-state="{state}"]' in css
    assert "@media (prefers-reduced-motion: reduce)" in css
    assert "--beam-opacity" in css
    assert "--core-scale" in css
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `python -m unittest tests/test_posture_transform_contract.py -v`

Expected: FAIL because `posture-transform.css` does not exist.

- [ ] **Step 3: Implement the state stylesheet**

Use CSS custom properties on the board for core scale/background, beam opacity and placement, bracket offsets, evidence opacity, halo treatment, and review perimeter. Provide materially distinct values for all four states. Keep button hover/focus white and add no runtime dependencies.

- [ ] **Step 4: Link the stylesheet and run the test**

Run: `python -m unittest tests/test_posture_transform_contract.py -v`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add index.html posture-transform.css tests/test_posture_transform_contract.py
git commit -m "Animate assurance burden across postures"
```

### Task 4: Validate interaction and responsive behavior

**Files:**
- Create temporarily outside repository: `/tmp/laveer-posture-qa.mjs`
- No production source changes unless validation exposes a defect.

**Interfaces:**
- Consumes: locally served campaign.
- Produces: assertion output and desktop/mobile screenshots.

- [ ] **Step 1: Start a local static server**

Run: `python -m http.server 8000 --directory .`

Expected: the campaign loads at `http://127.0.0.1:8000/`.

- [ ] **Step 2: Run Chromium interaction checks**

For each button, click and assert:

```javascript
{
  explore: ['explore', 'Explore', 'Bounded experiment. No operational reliance.'],
  assist: ['assist', 'Assist', 'Human-authoritative support. Engineer decides.'],
  control: ['control', 'Control', 'Validated, monitored, and recoverable.'],
  review: ['review', 'Independent review', 'Independent approval and explicit stop rights.']
}
```

Also assert exactly one `aria-pressed="true"`, scenario selection restores the scenario posture, reset returns to Assist, and no runtime exceptions occur.

- [ ] **Step 3: Capture desktop and mobile evidence**

Capture 1440×900 and 390×844 screenshots after selecting Independent review and Explore respectively. Confirm no clipping or horizontal overflow.

- [ ] **Step 4: Run static tests again**

Run: `python -m unittest tests/test_posture_transform_contract.py -v`

Expected: all tests PASS.

- [ ] **Step 5: Commit any required correction and report**

If no correction is required, do not commit temporary QA files. Report the final production commit and the interaction results.