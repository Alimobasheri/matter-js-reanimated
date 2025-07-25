import type * as Matter from 'matter-js';
export * from 'matter-js';
export as namespace MatterReanimated;

declare function initMatter(): void;
export = initMatter;

declare global {
  var MatterReanimated: typeof Matter;
  var Matter: typeof Matter;
}
