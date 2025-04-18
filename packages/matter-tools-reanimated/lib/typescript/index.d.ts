export { Render } from './components/Render';
export { Demo } from './components/Demo';
export { withMatter } from './hoc/withMatter';
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
//# sourceMappingURL=index.d.ts.map