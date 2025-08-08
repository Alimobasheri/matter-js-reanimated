/// <reference types="@types/matter-js" />
import Matter from 'matter-js';

declare function initMatter(): void;
export default initMatter;
type MatterType = typeof Matter;
export type { MatterType as Matter };
