import { Matter } from 'matter-js';
declare global {
    // UI thread engine instance
    var demoEngine: any;
    var mouseConstraint: any;
    var activeDragBody: any;

    // Window dimensions available in worklets
    var windowWidth: number;
    var windowHeight: number;

    // Dynamic body instances
    interface MatterBody {
        id: string | number;
        position: { x: number; y: number };
        angle: number;
        bounds: {
            min: { x: number; y: number };
            max: { x: number; y: number };
        };
        vertices: Array<{ x: number; y: number }>;
        circleRadius?: number;
    }

    var demoes: {
        [key: string]: (engine: any) => void;
    };
}
