import React, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import {
    useDerivedValue,
    useFrameCallback,
    useSharedValue,
} from 'react-native-reanimated';
//@ts-ignore
import Svg from 'react-native-svg';
import { BodyShape, RenderBody } from './RenderBody';

interface RenderProps {
    engineId?: string;
    options?: {
        width?: number;
        height?: number;
        background?: string;
        wireframes?: boolean;
        showBounds?: boolean;
        showAxes?: boolean;
        showPositions?: boolean;
        showAngleIndicator?: boolean;
    };
}

export const Render: React.FC<RenderProps> = ({
    engineId = 'physicsEngine',
    options = {},
}) => {
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const width = options.width || windowWidth;
    const height = options.height || windowHeight;

    // Single worklet to generate all SVG content
    const svgContent = useSharedValue<BodyShape[] | undefined>([]);

    const { setActive } = useFrameCallback(() => {
        'worklet';
        if (!global.Matter || !(engineId in global)) return;
        if (!global.svgContent) global.svgContent = [];

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
        }));
    });

    useEffect(() => {
        return () => {
            console.log('cleared svgContent');
            // Clear the SVG content when the component unmounts
            svgContent.value = undefined;
            setActive(false);
        };
    }, [svgContent]);

    return (
        <View style={[styles.container, { width, height }]}>
            <Svg
                width={width}
                height={height}
                style={[
                    styles.svg,
                    { backgroundColor: options.background || 'yellow' },
                ]}
            >
                <RenderBody bodies={svgContent} options={options} />
            </Svg>
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
