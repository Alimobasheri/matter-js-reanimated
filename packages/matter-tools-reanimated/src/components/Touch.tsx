import React from 'react';
import { StyleSheet } from 'react-native';
import {
    GestureDetector,
    Gesture,
    GestureHandlerRootView,
    GestureUpdateEvent,
    PanGestureHandlerEventPayload,
    RotationGestureHandlerEventPayload,
    PinchGestureHandlerEventPayload,
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
                    stiffness: options.constraint?.stiffness ?? 0.2,
                    damping: options.constraint?.damping ?? 0.3,
                    length: 0,
                    angularStiffness: 1,
                    label: 'Mouse Constraint',
                });

                global.mouseConstraint = constraint;
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
                        global.mouseConstraint
                    );
                    global.mouseConstraint = null;
                }
            })();
        };
    }, [engineId, options.constraint]);

    const pan = Gesture.Pan()
        .enabled(options.enablePan ?? true)
        .onBegin((event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
            runOnUI(() => {
                'worklet';
                if (
                    !global.Matter ||
                    !(engineId in global) ||
                    !global.mouseConstraint
                )
                    return;

                const point = { x: event.absoluteX, y: event.absoluteY };
                const engine = (global as any)[engineId];
                const bodies = global.Matter.Query.point(
                    engine.world.bodies,
                    point
                );

                if (bodies.length > 0) {
                    const body = bodies[0];
                    global.mouseConstraint.bodyB = body;
                    global.mouseConstraint.pointA = point;
                    global.mouseConstraint.pointB = global.Matter.Vector.sub(
                        point,
                        body.position
                    );
                    global.activeDragBody = body;
                }
            })();
        })
        .onUpdate(
            (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
                runOnUI(() => {
                    'worklet';
                    if (!global.mouseConstraint?.bodyB) return;

                    global.mouseConstraint.pointA = {
                        x: event.absoluteX,
                        y: event.absoluteY,
                    };
                })();
            }
        )
        .onFinalize(() => {
            runOnUI(() => {
                'worklet';
                if (!global.mouseConstraint) return;

                global.mouseConstraint.bodyB = null;
                global.activeDragBody = null;
            })();
        });

    const pinch = Gesture.Pinch()
        .enabled(options.enablePinch ?? true)
        .onUpdate(
            (event: GestureUpdateEvent<PinchGestureHandlerEventPayload>) => {
                runOnUI(() => {
                    'worklet';
                    if (!global.activeDragBody) return;

                    global.Matter.Body.scale(
                        global.activeDragBody,
                        event.scale,
                        event.scale
                    );
                })();
            }
        );

    const rotate = Gesture.Rotation()
        .enabled(options.enableRotate ?? true)
        .onUpdate(
            (event: GestureUpdateEvent<RotationGestureHandlerEventPayload>) => {
                runOnUI(() => {
                    'worklet';
                    if (!global.activeDragBody) return;

                    global.Matter.Body.rotate(
                        global.activeDragBody,
                        event.rotation
                    );
                })();
            }
        );

    const gesture = Gesture.Simultaneous(pan, pinch, rotate);

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
