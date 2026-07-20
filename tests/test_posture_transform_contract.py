from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]


class PostureTransformationContract(unittest.TestCase):
    def test_markup_keeps_four_native_posture_buttons(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertEqual(html.count('class="posture-step'), 4)
        self.assertIn('data-posture="Sandbox / explore"', html)
        self.assertIn('data-posture="Assisted workflow"', html)
        self.assertIn('data-posture="Controlled production"', html)
        self.assertIn('data-posture="Independent assurance review"', html)

    def test_javascript_maps_all_four_postures_to_visual_states(self):
        script = (ROOT / "app.js").read_text(encoding="utf-8")
        for state in ("explore", "assist", "control", "review"):
            self.assertIn(f"state: '{state}'", script)
        self.assertIn("board.dataset.postureState = visual.state", script)
        self.assertIn("coreMode.textContent = visual.mode", script)
        self.assertIn("coreMessage.textContent = visual.message", script)
        self.assertIn("latticeState.setAttribute('aria-live', 'polite')", script)

    def test_css_defines_all_four_visual_states_and_reduced_motion(self):
        controls = (ROOT / "posture-controls.css").read_text(encoding="utf-8")
        self.assertIn("@import url('posture-transform.css');", controls)
        css = (ROOT / "posture-transform.css").read_text(encoding="utf-8")
        for state in ("explore", "assist", "control", "review"):
            self.assertIn(f'[data-posture-state="{state}"]', css)
        self.assertIn("@media (prefers-reduced-motion: reduce)", css)
        self.assertIn("--beam-opacity", css)
        self.assertIn("--core-scale", css)
        self.assertIn(".lattice-core::after", css)


if __name__ == "__main__":
    unittest.main()