import { useSharedValue } from 'react-native-reanimated';
import { useFrameCallback } from 'react-native-reanimated';
import { useEffect } from 'react';

type BodyIdentifier = { id: number } | { label: string };

export function useDerivedMatterBody<T>(
  identifier: BodyIdentifier,
  engineId: string,
  process: (body: Matter.Body) => T
) {
  const sharedValue = useSharedValue<T | null>(null);

  const frameCallback = useFrameCallback(() => {
    'worklet';
    if (!global.Matter || !(engineId in global)) return;

    const engine = (global as any)[engineId];
    if (!engine || !engine.world) return;

    const { Matter } = global;

    let body: Matter.Body | undefined;

    if ('id' in identifier) {
      body = Matter.Composite.get(
        engine.world,
        identifier.id,
        'body'
      ) as Matter.Body;
    } else {
      const bodies = Matter.Composite.allBodies(engine.world);
      body = bodies.find((b) => b.label === identifier.label);
    }

    if (body) {
      sharedValue.value = process(body);
    }
  }, true);

  useEffect(() => {
    return () => frameCallback.setActive(false);
  }, []);

  return sharedValue;
}
