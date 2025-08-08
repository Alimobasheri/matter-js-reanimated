import Matter from '@types/matter-js';

declare function initMatter(): void;
export default initMatter;
type MatterType = typeof Matter;
export type { MatterType as MatterReanimated };
