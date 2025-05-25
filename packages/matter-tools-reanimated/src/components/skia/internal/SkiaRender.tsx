import React, { useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useFrameCallback } from 'react-native-reanimated';
//@ts-ignore
import Svg from 'react-native-svg';
import Matter from 'matter-js';
import { Canvas } from '@shopify/react-native-skia';
import { SkiaBodies } from './SkiaBodies';

export interface RenderProps {
    engineId?: string;
    options?: {
        width?: number;
        height?: number;
        background?: string;
        wireframes?: boolean;
        showConstraints?: boolean;
        showBounds?: boolean;
        showAxes?: boolean;
        showPositions?: boolean;
        showAngleIndicator?: boolean;
    };
}

export const SkiaRender: React.FC<RenderProps> = ({
    engineId = 'physicsEngine',
    options = {},
}) => {
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const width = options.width || windowWidth;
    const height = options.height || windowHeight;

    const { setActive } = useFrameCallback(() => {
        'worklet';
        if (!global.Matter || !(engineId in global)) return;
        if (!global.svgContent) global.svgContent = [];
        if (!global.svgConstraints) global.svgConstraints = [];

        const engine = (global as any)[engineId];
        if (!engine || !engine.world) return;
        // Use Composite.allBodies to get all bodies including those in nested composites
        const bodies = global.Matter.Composite.allBodies(engine.world);

        // Generate SVG elements for each body - this runs in the UI thread
        global.svgContent = bodies.map((body: Matter.Body) => ({
            id: body.id,
            type: body.circleRadius ? 'circle' : 'polygon',
            position: { ...body.position },
            angle: body.angle,
            vertices: body.vertices.map((v) => ({ ...v })),
            bounds: {
                min: { ...body.bounds.min },
                max: { ...body.bounds.max },
            },
            circleRadius: body.circleRadius,
            render: body.render,
        }));

        const constraints = global.Matter.Composite.allConstraints(
            engine.world
        );
        global.svgConstraints = constraints.map((constraint: any) => ({
            id: constraint.id,
            bodyAId: constraint.bodyA?.id,
            bodyBId: constraint.bodyB?.id,
            pointA: { x: constraint.pointA.x, y: constraint.pointA.y },
            pointB: { x: constraint.pointB.x, y: constraint.pointB.y },
            type: constraint.render.type || 'spring',
            render: {
                visible: constraint.render.visible !== false,
                strokeStyle: constraint.render.strokeStyle || '#bbb',
                lineWidth: constraint.render.lineWidth || 1,
                anchors: constraint.render.anchors || false,
            },
        }));
    });

    useEffect(() => {
        return () => {
            setActive(false);
        };
    }, []);

    return (
        <View style={[styles.container, { width, height }]}>
            <Canvas
                style={[
                    styles.svg,
                    {
                        backgroundColor: options.background || 'transparent',
                        width,
                        height,
                    },
                ]}
            >
                <SkiaBodies options={options} />
                {/* {options.showConstraints && <Constraints options={options} />} */}
            </Canvas>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    svg: {
        flex: 1,
    },
});
