(() => {
  const menu = document.querySelector('.mobile-menu');
  const nav = document.querySelector('.site-nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
  }

  const scenarios = {
    engineering: {
      title: 'Engineering knowledge assistant',
      posture: 'Assisted workflow',
      core: 'Engineering knowledge assistant',
      authority: 'Engineer remains the named decision authority; cited source material is visible at the point of use.',
      measure: 'Time to locate approved knowledge, citation completeness, correction patterns, adoption by workflow.',
      rows: [
        ['Mission & boundary','bound','Bound','Retrieve and synthesize approved technical knowledge; no autonomous engineering decision.'],
        ['Data pedigree','ready','Ready','Approved corpora, source ownership, document status, lineage, and citation behavior.'],
        ['Model evidence','bound','Bound','Grounded-answer tests, hallucination probes, retrieval coverage, and change-control checks.'],
        ['Human authority','ready','Ready','Engineer accepts, rejects, or corrects the output before it affects work.'],
        ['Security & compliance','bound','Bound','Role-based access, export-control handling, data-loss controls, and audit logging.'],
        ['Outcome telemetry','bound','Bound','Use, correction, retrieval success, and workflow outcome signals return to the assurance case.']
      ]
    },
    licensing: {
      title: 'Licensing document co-author',
      posture: 'Controlled production',
      core: 'Licensing document co-author',
      authority: 'Qualified licensing and legal reviewers retain authorship, approval, and submission authority.',
      measure: 'Review cycle time, source traceability, rework, exception aging, and reviewer acceptance patterns.',
      rows: [
        ['Mission & boundary','bound','Bound','Draft and compare regulated content; never submit or approve independently.'],
        ['Data pedigree','ready','Ready','Controlled source set, revision lineage, jurisdiction, and citation provenance.'],
        ['Model evidence','bound','Bound','Section-level trace tests, omission checks, contradiction tests, and version replay.'],
        ['Human authority','ready','Ready','Named qualified reviewer signs every disposition and submission decision.'],
        ['Security & compliance','ready','Ready','Access, retention, export control, records management, and legal privilege controls.'],
        ['Outcome telemetry','bound','Bound','Rework, reviewer overrides, trace defects, and cycle-time evidence inform reuse.']
      ]
    },
    inspection: {
      title: 'Visual inspection model',
      posture: 'Independent assurance review',
      core: 'Visual inspection model',
      authority: 'Qualified inspectors and quality authorities retain final disposition and stop-work authority.',
      measure: 'False-negative/false-positive behavior, drift, inspection escapes, override rationale, and recovery time.',
      rows: [
        ['Mission & boundary','bound','Bound','Detect or prioritize indications; no autonomous release or quality disposition.'],
        ['Data pedigree','ready','Ready','Equipment, lot, environment, labeling method, image quality, and chain of custody.'],
        ['Model evidence','ready','Ready','Performance by condition, uncertainty, challenge sets, drift, and failure-mode testing.'],
        ['Human authority','ready','Ready','Inspector validates findings; quality function retains independent decision rights.'],
        ['Security & compliance','ready','Ready','Validated environment, access controls, version lock, audit trail, and incident response.'],
        ['Outcome telemetry','ready','Ready','Escapes, overrides, retraining triggers, calibration outcomes, and field feedback.']
      ]
    },
    workforce: {
      title: 'Workforce and HR AI',
      posture: 'Controlled production',
      core: 'Workforce and HR AI',
      authority: 'Accountable people leaders and HR retain decision authority; affected employees have a clear review path.',
      measure: 'Decision consistency, disparate-impact signals, appeal outcomes, adoption, and process quality.',
      rows: [
        ['Mission & boundary','bound','Bound','Support workforce planning or recommendations; no unreviewed employment decision.'],
        ['Data pedigree','bound','Bound','Purpose limitation, sensitive-data handling, retention, representativeness, and consent basis.'],
        ['Model evidence','ready','Ready','Bias testing, subgroup performance, explainability, stability, and adverse-impact review.'],
        ['Human authority','ready','Ready','Named manager/HR owner reviews and documents the decision and appeal route.'],
        ['Security & compliance','ready','Ready','Privacy, access, labor, regional, records, and EU high-risk obligations where applicable.'],
        ['Outcome telemetry','bound','Bound','Appeals, overrides, subgroup outcomes, adoption, and unintended-consequence signals.']
      ]
    }
  };
  const buttons = [...document.querySelectorAll('[data-scenario]')];
  if (!buttons.length) return;
  const title = document.querySelector('#case-title');
  const posture = document.querySelector('#case-posture');
  const core = document.querySelector('#lattice-core-title');
  const authority = document.querySelector('#authority-readout');
  const measure = document.querySelector('#measure-readout');
  const rows = [...document.querySelectorAll('.evidence-row')];
  const postureSteps = [...document.querySelectorAll('.posture-step')];
  const latticeState = document.querySelector('.lattice-state');
  const postureLabels = new Map([
    ['Sandbox / explore', 'Explore'],
    ['Assisted workflow', 'Assist'],
    ['Controlled production', 'Control'],
    ['Independent assurance review', 'Independent review']
  ]);

  function setPosture(selectedPosture, preview = false) {
    posture.textContent = selectedPosture;
    postureSteps.forEach(step => {
      const active = step.dataset.posture === selectedPosture;
      step.classList.toggle('active', active);
      step.setAttribute('aria-pressed', String(active));
    });
    if (latticeState) {
      latticeState.textContent = preview
        ? `Posture preview · ${postureLabels.get(selectedPosture) ?? selectedPosture}`
        : 'Illustrative baseline';
    }
    if (preview) {
      document.querySelector('.lattice-board')?.animate(
        [{filter:'brightness(.94)'},{filter:'brightness(1)'}],
        {duration:320}
      );
    }
  }

  function setScenario(key) {
    const data = scenarios[key];
    buttons.forEach(b => b.setAttribute('aria-selected', String(b.dataset.scenario === key)));
    title.textContent = data.title;
    core.textContent = data.core;
    authority.textContent = data.authority;
    measure.textContent = data.measure;
    rows.forEach((row, i) => {
      const [label, cls, status, detail] = data.rows[i];
      row.querySelector('.evidence-label').textContent = label;
      const statusNode = row.querySelector('.evidence-status');
      statusNode.className = `evidence-status ${cls}`;
      statusNode.textContent = status;
      row.querySelector('.evidence-detail').textContent = detail;
      row.animate([{opacity:.35, transform:'translateY(5px)'},{opacity:1, transform:'none'}], {duration:260, delay:i*35, fill:'both'});
    });
    setPosture(data.posture);
    document.querySelector('.lattice-board')?.animate([{filter:'brightness(.94)'},{filter:'brightness(1)'}], {duration:420});
  }

  buttons.forEach(button => button.addEventListener('click', () => setScenario(button.dataset.scenario)));
  postureSteps.forEach(step => step.addEventListener('click', () => setPosture(step.dataset.posture, true)));
  document.querySelector('#reset-scenario')?.addEventListener('click', () => setScenario('engineering'));
  setScenario('engineering');
})();