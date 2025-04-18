import React from 'react';
interface TouchProps {
    engineId?: string;
    options?: {
        constraint?: {
            stiffness?: number;
            damping?: number;
        };
        enablePan?: boolean;
        enablePinch?: boolean;
        enableRotate?: boolean;
    };
    children: React.ReactNode;
}
export declare const Touch: React.FC<TouchProps>;
export {};
//# sourceMappingURL=Touch.d.ts.map