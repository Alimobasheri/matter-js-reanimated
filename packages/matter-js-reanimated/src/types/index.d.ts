import * as Matter from 'matter-js';

declare function initMatter(): void;
export default initMatter;

export namespace MatterReanimated {
    export type Axes = Matter.Axes;
    export type Bodies = Matter.Bodies;
    export type Body = Matter.Body;
    export type Bounds = Matter.Bounds;
    export type Collision = Matter.Collision;
    export type Common = Matter.Common;
    export type Composite = Matter.Composite;
    export type Composites = Matter.Composites;
    export type Constraint = Matter.Constraint;
    export type Contact = Matter.Contact;
    export type Detector = Matter.Detector;
    export type Engine = Matter.Engine;
    export type Events = Matter.Events;
    export type Pair = Matter.Pair;
    export type Pairs = Matter.Pairs;
    export type Plugin = Matter.Plugin;
    export type Query = Matter.Query;
    export type Resolver = Matter.Resolver;
    export type Sleeping = Matter.Sleeping;
    export type Vector = Matter.Vector;
    export type Vertices = Matter.Vertices;
    export type World = Matter.World;
}

interface MatterReanimatedAPI {
    Axes: typeof Matter.Axes;
    Bodies: typeof Matter.Bodies;
    Body: typeof Matter.Body;
    Bounds: typeof Matter.Bounds;
    Collision: typeof Matter.Collision;
    Common: typeof Matter.Common;
    Composite: typeof Matter.Composite;
    Composites: typeof Matter.Composites;
    Constraint: typeof Matter.Constraint;
    Contact: typeof Matter.Contact;
    Detector: typeof Matter.Detector;
    Engine: typeof Matter.Engine;
    Events: typeof Matter.Events;
    Pair: typeof Matter.Pair;
    Pairs: typeof Matter.Pairs;
    Plugin: typeof Matter.Plugin;
    Query: typeof Matter.Query;
    Resolver: typeof Matter.Resolver;
    Sleeping: typeof Matter.Sleeping;
    Vector: typeof Matter.Vector;
    Vertices: typeof Matter.Vertices;
    World: typeof Matter.World;
}

declare global {
    var MatterReanimated: MatterReanimatedAPI;
}
