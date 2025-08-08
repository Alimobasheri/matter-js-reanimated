import { TouchConstraintType } from './components/TouchConstraint';
import { BodyShape } from './components/Bodies';
import { ConstraintShape } from './components/Constraints';
import type { MatterReanimated } from 'matter-js-reanimated';
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
type MatterType = MatterReanimated & {
    touchConstraint: TouchConstraintType | null;
    runner?: MatterReanimated['Runner'] | null;
    __lastDrawConstraintsTime?: number | null;
    __lastDrawBodiesTime?: number | null;
    demoEngine?: any;
    mouseConstraint?: any;
    activeDragBody?: any;
    windowWidth?: number;
    windowHeight?: number;
    svgContent?: BodyShape[];
    svgConstraints?: ConstraintShape[];
    demoes?: {
        [key: string]: (engine: any) => void;
    };
    [key: string]: any;
};
declare global {
    var MatterReanimated: MatterType;
    interface MatterBody {
        id: string | number;
        position: {
            x: number;
            y: number;
        };
        angle: number;
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
        vertices: Array<{
            x: number;
            y: number;
        }>;
        circleRadius?: number;
    }
}
//# sourceMappingURL=index.d.ts.map