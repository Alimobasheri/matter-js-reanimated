import { useSharedValue } from 'react-native-reanimated';
import { useFrameCallback } from 'react-native-reanimated';
import { useEffect } from 'react';
import type { Matter } from 'matter-js-reanimated';

type ConstraintIdentifier = { id: number } | { label: string };

export function useDerivedMatterConstraint<T>(
  identifier: ConstraintIdentifier,
  engineId: string,
  process: (constraint: Matter.Constraint) => T
) {
  const sharedValue = useSharedValue<T | null>(null);

  const frameCallback = useFrameCallback(() => {
    'worklet';
    if (!global.MatterReanimated || !(engineId in global)) return;

    const engine = (global as any)[engineId];
    if (!engine || !engine.world) return;

    const { Matter } = global;

    let constraint: Matter.Constraint | undefined;

    if ('id' in identifier) {
      constraint = Matter.Composite.get(
        engine.world,
        identifier.id,
        'constraint'
      ) as Matter.Constraint;
    } else {
      const constraints = Matter.Composite.allConstraints(engine.world);
      constraint = constraints.find((c) => c.label === identifier.label);
    }

    if (constraint) {
      sharedValue.value = process(constraint);
    }
  }, true);

  useEffect(() => {
    return () => frameCallback.setActive(false);
  }, []);

  return sharedValue;
}
