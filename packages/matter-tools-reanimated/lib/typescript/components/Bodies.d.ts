import React from 'react';
import { RenderProps } from './Render';
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
    render?: {
        visible?: boolean;
        fillStyle?: string;
        strokeStyle?: string;
        lineWidth?: number;
    };
}
export declare const Bodies: React.FC<RenderProps>;
//# sourceMappingURL=Bodies.d.ts.map