import React from 'react';
export interface RenderProps {
    engineId?: string;
    options?: {
        width?: number;
        height?: number;
        background?: string;
        wireframes?: boolean;
        showConstraints?: boolean;
        showBounds?: boolean;
        showAxes?: boolean;
        showPositions?: boolean;
        showAngleIndicator?: boolean;
    };
}
export declare const SkiaRender: React.FC<RenderProps>;
//# sourceMappingURL=SkiaRender.d.ts.map