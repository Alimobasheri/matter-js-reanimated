import React from 'react';
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
export interface ConstraintShape {
    id: string | number;
    type: 'pin' | 'spring';
    bodyAId?: string | number;
    bodyBId?: string | number;
    pointA: {
        x: number;
        y: number;
    };
    pointB: {
        x: number;
        y: number;
    };
    render: {
        visible: boolean;
        strokeStyle: string;
        lineWidth: number;
        anchors: boolean;
    };
}
interface RenderBodyProps {
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