// Define the namespace for static methods and types
declare namespace Matter {
    interface Vector {
        x: number;
        y: number;
    }

    interface Bounds {
        min: Vector;
        max: Vector;
    }

    interface Body {
        id: number;
        position: Vector;
        angle: number;
        bounds: Bounds;
        vertices: Vector[];
        circleRadius?: number;
    }

    interface World {
        bodies: Body[];
    }

    interface Engine {
        world: World;
    }
}

// Define the global Matter interface
declare global {
    interface IMatter {
        Engine: {
            create: (options?: any) => Matter.Engine;
            update: (engine: Matter.Engine, delta: number) => void;
        };
        Composite: {
            clear: (composite: Matter.World) => void;
        };
    }

    // eslint-disable-next-line no-var
    var Matter: IMatter;
    // eslint-disable-next-line no-var
    var demoEngine: Matter.Engine | undefined;
}

export {};
