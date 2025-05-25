import React from 'react';
export type ReanimatedMatterProps = {
    children: React.ReactNode;
    worklet?: (engine: any) => void;
    engineId?: string;
};
/**
 * A component that ensures Matter.js is initialized on the UI thread
 * before rendering its children. This prevents race conditions and ensures Matter
 * is available in worklets.
 */
export declare const ReanimatedMatter: React.FC<ReanimatedMatterProps>;
//# sourceMappingURL=ReanimatedMatter.d.ts.map