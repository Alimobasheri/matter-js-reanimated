export { Render } from './components/Render';
export { Touch } from './components/Touch';
export { Demo } from './components/Demo';
export { useMatterBody } from './hooks/useMatterBody';

export interface MatterToolsOptions {
    render?: {
        width?: number;
        height?: number;
        background?: string;
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
        enablePan?: boolean;
        enablePinch?: boolean;
        enableRotate?: boolean;
    };
}

export interface MatterExample {
    name: string;
    init: (engine: any) => void;
}
