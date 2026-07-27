import { Stage, CameraRig, InteractiveSurface, bioluminescent } from "easy-3dkit";

/**
 * Bioluminescent shader field used as the hero backdrop.
 *
 * Sizing: Stage's default camera sits at z=6 with a 50deg fov, so it frames
 * ~5.6 world units of height and ~5.6 * aspect of width. A 20x20 plane stays
 * full-bleed out to a 3.5:1 aspect, which covers ultrawide desktops. `scale`
 * is doubled against the kit's 10x10 default because the shader samples UVs
 * (0..1 across the plane) -- a bigger plane at the same `scale` would render
 * proportionally bigger cells.
 *
 * Default-exported so the hero can lazy-load it and keep three.js out of the
 * initial bundle. The theme preset lives here rather than in the caller so the
 * lazy boundary only has to hand over a string.
 */
const PARAMS = {
  // Hot red cores blown out over near-black, against the dark theme's #0a0a0a.
  dark: { glow: "#ca5454", base: "#290303", scale: 2, breath: 0.6, intensity: 4 },
  // The shader adds glow onto the base, so it can only ever brighten. On a light
  // theme that means the base has to sit far enough below white for the cores to
  // stay distinguishable, and `intensity` has to drop from 4 to stop every cell
  // clipping to flat white. Same glow hue keeps the red brand accent.
  light: { glow: "#a49797", base: "#a41b19", scale: 2, breath: 0.6, intensity: 5 },
} as const;

export type BioluminescentSceneProps = {
  theme: keyof typeof PARAMS;
};

const BioluminescentScene = ({ theme }: BioluminescentSceneProps) => (
  // defaultLights: the surface is a raw ShaderMaterial and ignores scene lights.
  // fallback: HeroBackground already renders a CSS field underneath this.
  <Stage background={null} defaultLights={false} fallback={null}>
    <InteractiveSurface material={bioluminescent} size={[20, 20]} params={PARAMS[theme]} />
    <CameraRig />
  </Stage>
);

export default BioluminescentScene;
