import React from 'react';
import { RenderProps } from './Render';
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
export declare const Constraints: React.FC<RenderProps>;
//# sourceMappingURL=Constraints.d.ts.map