import React from 'react';
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
    const svgContent = useSharedValue<BodyShape[]>([]);

    useFrameCallback(() => {
        'worklet';
        if (!global.Matter || !(engineId in global)) return [];

        const engine = (global as any)[engineId];
        const bodies = engine.world.bodies;

        // Generate SVG elements for each body - this runs in the UI thread
        svgContent.value = bodies.map((body: Matter.Body) => ({
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
