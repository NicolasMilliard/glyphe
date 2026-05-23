import type { RegistryItem } from '@/registry';

export const accessibilityModes = [
  'decorative',
  'status',
  'text-effect',
] as const;

export type AccessibilityMode = (typeof accessibilityModes)[number];

export type AccessibilityGuidance = {
  mode: AccessibilityMode;
  label: string;
  pattern: string;
  reducedMotion: string;
  pause: string;
  flashingRisk: string;
};

export function getAccessibilityMode(item: RegistryItem): AccessibilityMode {
  if (item.accessibility.decorative) {
    return 'decorative';
  }

  if (item.category === 'text') {
    return 'text-effect';
  }

  return 'status';
}

export function getScreenReaderLabel(item: RegistryItem) {
  return item.accessibility.defaultLabel ?? item.name;
}

export function getAccessibilityGuidance(
  item: RegistryItem,
): AccessibilityGuidance {
  const mode = getAccessibilityMode(item);

  return {
    mode,
    label: getScreenReaderLabel(item),
    pattern: getAccessibilityPattern(mode),
    reducedMotion: getReducedMotionGuidance(item),
    pause: getPauseGuidance(item),
    flashingRisk: getFlashingRiskGuidance(item),
  };
}

export function getAccessibilityPattern(mode: AccessibilityMode) {
  switch (mode) {
    case 'decorative':
      return 'Hide the animated glyphs from assistive tech and provide nearby readable context when the state matters.';
    case 'status':
      return 'Expose a stable status label and keep changing frames out of the accessibility tree.';
    case 'text-effect':
      return 'Keep the final readable text available to assistive tech and treat animated intermediate frames as visual only.';
  }
}

export function getReducedMotionGuidance(item: RegistryItem) {
  switch (item.accessibility.reducedMotion) {
    case 'first-frame':
      return 'Prefer a single static frame when reduced motion is requested.';
    case 'static-label':
      return 'Prefer a readable static label when reduced motion is requested.';
    case 'disabled':
      return 'Disable the animation when reduced motion is requested.';
    case 'slowed':
      return 'Slow the animation when reduced motion is requested.';
  }
}

export function getPauseGuidance(item: RegistryItem) {
  if (!item.loop) {
    return 'This animation ends on its own, so a persistent pause control is usually not required.';
  }

  if (item.category === 'text') {
    return 'Offer a pause or reduced-motion option when the effect appears near reading content.';
  }

  return 'Provide a pause path for long-running or prominent loading states.';
}

export function getFlashingRiskGuidance(item: RegistryItem) {
  if (item.tags.includes('glitch') || item.strategy === 'transform') {
    return 'Avoid high-contrast flashes and keep transform jitter subtle.';
  }

  return 'Keep frame changes low contrast and avoid rapid full-screen flashing.';
}
