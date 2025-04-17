declare global {
    var Matter: {
        Engine: {
            create: (options?: any) => any;
            update: (engine: any, delta: number) => void;
        };
        World: {
            add: (world: any, bodies: any) => void;
            remove: (world: any, bodies: any) => void;
            clear: (world: any) => void;
        };
        Bodies: any;
        Body: {
            scale: (body: any, scaleX: number, scaleY: number) => void;
            rotate: (body: any, angle: number) => void;
        };
        Constraint: {
            create: (options: any) => any;
        };
        Vector: {
            sub: (
                v1: { x: number; y: number },
                v2: { x: number; y: number }
            ) => { x: number; y: number };
        };
        Query: {
            point: (bodies: any[], point: { x: number; y: number }) => any[];
        };
    };

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

    // Index signature for dynamic body instances
    interface Global {
        [key: string]: MatterBody;
    }
}
