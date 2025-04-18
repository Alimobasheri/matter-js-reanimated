import React from 'react';
/**
 * A Higher-Order Component that ensures Matter.js is initialized on the UI thread
 * before rendering its children. This prevents race conditions and ensures Matter
 * is available in worklets.
 */
export declare function withMatter<P extends object>(WrappedComponent: React.ComponentType<P>): React.ComponentType<P>;
//# sourceMappingURL=withMatter.d.ts.map