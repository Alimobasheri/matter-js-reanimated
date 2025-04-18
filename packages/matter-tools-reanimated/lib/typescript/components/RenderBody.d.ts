import React from 'react';
import { DerivedValue } from 'react-native-reanimated';
export interface BodyShape {
    id: string | number;
    type: 'circle' | 'polygon';
    position: {
        x: number;
        y: number;
    };
    angle: number;
    vertices: Array<{
        x: number;
        y: number;
    }>;
    bounds: {
        min: {
            x: number;
            y: number;
        };
        max: {
            x: number;
            y: number;
        };
    };
    circleRadius?: number;
}
interface RenderBodyProps {
    bodies: DerivedValue<BodyShape[]>;
    options?: {
        wireframes?: boolean;
        showBounds?: boolean;
        showAxes?: boolean;
        showPositions?: boolean;
        showAngleIndicator?: boolean;
    };
}
export declare const RenderBody: React.FC<RenderBodyProps>;
export {};
//# sourceMappingURL=RenderBody.d.ts.map