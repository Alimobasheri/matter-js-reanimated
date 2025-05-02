import React from 'react';
import { StyleSheet } from 'react-native';
import {
    GestureDetector,
    Gesture,
    GestureHandlerRootView,
    GestureUpdateEvent,
    PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { runOnUI } from 'react-native-reanimated';

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

export const Touch: React.FC<TouchProps> = ({
    engineId = 'physicsEngine',
    options = {},
    children,
}) => {
    React.useEffect(() => {
        runOnUI(() => {
            'worklet';
            if (!global.Matter || !(engineId in global)) return;

            const engine = (global as any)[engineId];

            if (!global.mouseConstraint) {
                const constraint = global.Matter.Constraint.create({
                    pointA: { x: 0, y: 0 },
                    pointB: { x: 0, y: 0 },
                    length: 0.01,
                    stiffness: options.constraint?.stiffness ?? 0.1,
                    label: 'Mouse Constraint',
                });

                global.mouseConstraint = {
                    type: 'mouseConstraint',
                    constraint: constraint,
                    body: null,
                    collisionFilter: {
                        category: 0x0001,
                        mask: 0xffffffff,
                        group: 0,
                    },
                };

                global.Matter.World.add(engine.world, constraint);
            }
        })();

        return () => {
            runOnUI(() => {
                'worklet';
                if (global.mouseConstraint) {
                    const engine = (global as any)[engineId];
                    global.Matter.World.remove(
                        engine.world,
                        global.mouseConstraint.constraint
                    );
                    global.mouseConstraint = null;
                }
            })();
        };
    }, [engineId, options.constraint]);

    const pan = Gesture.Pan()
        .enabled(options.enablePan ?? true)
        .onBegin((event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
            'worklet';
            if (
                !global.Matter ||
                !(engineId in global) ||
                !global.mouseConstraint
            )
                return;

            const engine = (global as any)[engineId];
            const point = { x: event.absoluteX, y: event.absoluteY };
            const bodies = global.Matter.Composite.allBodies(engine.world);
            const mouseConstraint = global.mouseConstraint;
            const constraint = mouseConstraint.constraint;

            // Reset previous body
            constraint.bodyB = mouseConstraint.body = null;
            constraint.pointB = null;

            // Find new body to drag
            for (let i = 0; i < bodies.length; i++) {
                const body = bodies[i];

                if (
                    global.Matter.Bounds.contains(body.bounds, point) &&
                    global.Matter.Detector.canCollide(
                        body.collisionFilter,
                        mouseConstraint.collisionFilter
                    )
                ) {
                    // Check parts (for compound bodies)
                    for (
                        let j = body.parts.length > 1 ? 1 : 0;
                        j < body.parts.length;
                        j++
                    ) {
                        const part = body.parts[j];
                        if (
                            global.Matter.Vertices.contains(
                                part.vertices,
                                point
                            )
                        ) {
                            constraint.pointA = point;
                            constraint.bodyB = mouseConstraint.body = body;
                            constraint.pointB = {
                                x: point.x - body.position.x,
                                y: point.y - body.position.y,
                            };
                            constraint.angleB = body.angle;

                            global.Matter.Sleeping.set(body, false);
                            break;
                        }
                    }

                    if (constraint.bodyB) break;
                }
            }
        })
        .onUpdate(
            (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
                'worklet';
                if (!global.mouseConstraint) return;

                const constraint = global.mouseConstraint.constraint;
                const body = constraint.bodyB;

                if (body) {
                    constraint.pointA = {
                        x: event.absoluteX,
                        y: event.absoluteY,
                    };
                    global.Matter.Sleeping.set(body, false);
                }
            }
        )
        .onEnd(() => {
            'worklet';
            if (!global.mouseConstraint) return;

            const constraint = global.mouseConstraint.constraint;
            const body = constraint.bodyB;

            if (body) {
                constraint.bodyB = global.mouseConstraint.body = null;
                constraint.pointB = null;
            }
        });

    const gesture = Gesture.Simultaneous(pan);

    return (
        <GestureHandlerRootView style={styles.container}>
            <GestureDetector gesture={gesture}>{children}</GestureDetector>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
