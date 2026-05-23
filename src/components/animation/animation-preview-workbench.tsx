import { useState } from 'react';
import { Button, Input, SegmentedControl } from '@/components/ui';
import type { RegistryItem } from '@/registry';
import { AnimationPreview } from './animation-preview';

type AnimationPreviewWorkbenchProps = {
  item: RegistryItem;
};

export function AnimationPreviewWorkbench({
  item,
}: AnimationPreviewWorkbenchProps) {
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [monospace, setMonospace] = useState(
    item.compatibility.requiresMonospace,
  );
  const [speed, setSpeed] = useState(item.duration);

  return (
    <div className="grid gap-4">
      <AnimationPreview
        item={item}
        speed={speed}
        paused={paused}
        reducedMotion={reducedMotion}
        monospace={monospace}
      />

      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant={paused ? 'primary' : 'secondary'}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? 'Resume' : 'Pause'}
        </Button>

        <SegmentedControl
          label="Font mode"
          value={monospace ? 'mono' : 'sans'}
          onValueChange={(value) => setMonospace(value === 'mono')}
          items={[
            { label: 'Mono', value: 'mono' },
            { label: 'Sans', value: 'sans' },
          ]}
        />

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
