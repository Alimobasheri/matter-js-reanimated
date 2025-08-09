import Matter from '@types/matter-js';

declare function initMatter(): void;
export default initMatter;

type MatterReanimated = typeof Matter;

declare global {
  var MatterReanimated: MatterReanimated;
}

export type { MatterReanimated };
