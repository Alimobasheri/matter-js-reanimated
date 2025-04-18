import React from 'react';
interface DemoProps {
    example: string;
    options?: {
        render?: {
            wireframes?: boolean;
            showBounds?: boolean;
            showAxes?: boolean;
            showPositions?: boolean;
            showAngleIndicator?: boolean;
        };
        touch?: {
            constraint?: {
                stiffness?: number;
                damping?: number;
            };
        };
    };
}
export declare const Demo: React.ComponentType<DemoProps>;
export {};
//# sourceMappingURL=Demo.d.ts.map