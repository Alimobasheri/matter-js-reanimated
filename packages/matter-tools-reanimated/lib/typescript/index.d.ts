export { ReanimatedMatter } from './components/ReanimatedMatter';
export { TouchConstraint } from './components/TouchConstraint';
export { Render } from './components/Render';
export { Bodies, BodyShape } from './components/Bodies';
export { Constraints, ConstraintShape } from './components/Constraints';
export { Demo } from './components/Demo';
export { SkiaRender } from './components/skia/SkiaRender';
export { SkiaBodies } from './components/skia/SkiaBodies';
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