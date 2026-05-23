import { useState } from 'react';
import { Button, Input, SegmentedControl, Select } from '@/components/ui';
import {
  getPreviewFontFamily,
  getUnicodeCompatibilityGuidance,
  previewFontStackOptions,
} from '@/lib/unicode-compatibility';
import type { RecommendedFontStack, RegistryItem } from '@/registry';
import { AnimationPreview } from './animation-preview';

type AnimationPreviewWorkbenchProps = {
  item: RegistryItem;
};

export function AnimationPreviewWorkbench({
  item,
}: AnimationPreviewWorkbenchProps) {
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [fontStack, setFontStack] = useState<RecommendedFontStack>(
    getUnicodeCompatibilityGuidance(item).recommendedFontStack,
  );
  const [speed, setSpeed] = useState(item.duration);
  const fontFamily = getPreviewFontFamily(fontStack);
  const monospace = fontStack === 'monospace';

  return (
    <div className="grid gap-4">
      <AnimationPreview
        item={item}
        speed={speed}
        paused={paused}
        reducedMotion={reducedMotion}
        monospace={monospace}
        fontFamily={fontFamily}
        loopPreview
      />

      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant={paused ? 'primary' : 'secondary'}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? 'Resume' : 'Pause'}
        </Button>

        <label className="text-muted-foreground grid gap-1 text-sm">
          Font stack
          <Select
            value={fontStack}
            onChange={(event) =>
              setFontStack(event.target.value as RecommendedFontStack)
            }
            className="w-36"
          >
            {previewFontStackOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </label>

        <SegmentedControl
          label="Motion mode"
          value={reducedMotion ? 'reduced' : 'motion'}
          onValueChange={(value) => setReducedMotion(value === 'reduced')}
          items={[
            { label: 'Motion', value: 'motion' },
            { label: 'Reduced', value: 'reduced' },
          ]}
        />

        <label className="text-muted-foreground grid gap-1 text-sm">
          Speed
          <Input
            type="number"
            min={item.options.speed?.min ?? 100}
            max={item.options.speed?.max ?? 5000}
            step={50}
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
            className="w-28"
          />
        </label>
      </div>
    </div>
  );
}
