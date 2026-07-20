# Posture Lattice Transformation Design

## Purpose

Make the four assurance-posture controls explain the operating model visually. The same selected AI use case remains in the center while the surrounding assurance lattice changes from an open experiment to increasingly constrained, monitored, and independently governed operation.

## Interaction model

The posture rail contains four native buttons: Explore, Assist, Control, and Independent review. Clicking a posture changes only the governance posture; it does not replace the selected use case or its six evidence dimensions. Selecting a scenario still applies that scenario's recommended posture. Reset returns to Engineering knowledge assistant in Assist posture.

Each click updates:

- the lattice board's `data-posture-state` value;
- the selected button's `aria-pressed` value;
- the visible posture label in the assurance-case panel;
- the lattice state announcement;
- the core mode label and posture-specific operating message;
- the geometry, enclosure, opacity, and emphasis of the lattice.

## Four visual states

### Explore

The system is visibly open and incomplete. The core becomes smaller and light, evidence beams retract toward the perimeter, assembly brackets pull away, and evidence tags soften. Copy: “Bounded experiment. No operational reliance.” This communicates learning without production dependence.

### Assist

The existing balanced composition becomes the human-authoritative baseline. The core is dark blue, the assurance pieces partially assemble around it, and evidence remains visible without fully enclosing the work. Copy: “Human-authoritative support. Engineer decides.”

### Control

The geometry tightens around the core. Beams move inward, assembly brackets close, a cyan monitoring frame appears, evidence tags strengthen, and the core gains a controlled-production treatment. Copy: “Validated, monitored, and recoverable.”

### Independent review

The lattice becomes maximally enclosed. A distinct outer review perimeter appears, the inner geometry closes, evidence tags are fully emphasized, and the core receives an independent-authority frame. Copy: “Independent approval and explicit stop rights.”

## Motion and accessibility

Transitions should explain increasing governance burden rather than decorate the page. Geometry, opacity, background, and shadow changes use short CSS transitions. Native buttons retain keyboard activation and visible focus. `aria-pressed` identifies the selected posture, and the state label is an `aria-live="polite"` announcement. Under `prefers-reduced-motion: reduce`, all state changes occur without animated movement.

## Responsive behavior

The posture rail remains four equal controls at desktop sizes and preserves the existing compact typography on small screens. Transformations must stay inside the lattice board with no horizontal overflow at 320 pixels.

## Acceptance criteria

1. Every posture click produces a visibly distinct lattice configuration while preserving the selected use case.
2. The four configurations map coherently to increasing assurance burden.
3. Exactly one button has `aria-pressed="true"` after every interaction.
4. Scenario buttons restore their recommended posture and visual state.
5. Reset restores Engineering knowledge assistant in Assist posture.
6. Keyboard activation, focus visibility, reduced motion, desktop, and mobile layouts remain functional.
7. No console errors are introduced.