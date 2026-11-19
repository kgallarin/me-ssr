export const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
  wide: { width: 1920, height: 1080 },
} as const;

export type ViewportPreset = keyof typeof VIEWPORTS;

export function setViewport(
  presetOrWidth: ViewportPreset | number,
  height = 800,
): void {
  let width = 1280;

  if (typeof presetOrWidth === 'string') {
    const preset = VIEWPORTS[presetOrWidth];
    if (preset) {
      width = preset.width;
      height = preset.height;
    }
  } else {
    width = presetOrWidth;
  }

  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event('resize'));
}
