import React from 'react';
//@ts-ignore
import { Path, G } from 'react-native-svg';
import Animated, {
    useAnimatedProps,
    useFrameCallback,
    useSharedValue,
} from 'react-native-reanimated';
import { RenderProps } from './Render';

export interface BodyShape {
    id: string | number;
    type: 'circle' | 'polygon';
    position: { x: number; y: number };
    angle: number;
    vertices: Array<{ x: number; y: number }>;
    bounds: {
        min: { x: number; y: number };
        max: { x: number; y: number };
    };
    circleRadius?: number;
    render?: {
        fillStyle?: string;
        strokeStyle?: string;
        lineWidth?: number;
    };
}

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedG = Animated.createAnimatedComponent(G);

export const Bodies: React.FC<RenderProps> = ({ options = {} }) => {
    const pathsData = useSharedValue<
        Record<
            string,
            {
                d: string;
                fill: string;
                stroke: string;
                strokeWidth: number;
            }
        >
    >({});

    useFrameCallback(() => {
        'worklet';
        if (!Array.isArray(global.svgContent)) return;

        const newPaths: typeof pathsData.value = {};

        for (const body of global.svgContent) {
            const pathD =
                body.type === 'circle' && body.circleRadius !== undefined
                    ? `M ${body.position.x - body.circleRadius},${
                          body.position.y
                      } ` +
                      `a ${body.circleRadius},${body.circleRadius} 0 1,0 ${
                          body.circleRadius * 2
                      },0 ` +
                      `a ${body.circleRadius},${body.circleRadius} 0 1,0 -${
                          body.circleRadius * 2
                      },0`
                    : body.vertices
                          .map((v, j) => `${j === 0 ? 'M' : 'L'} ${v.x} ${v.y}`)
                          .join(' ') + 'Z';

            newPaths[body.id] = {
                d: pathD,
                fill: options.wireframes
                    ? 'none'
                    : body.render?.fillStyle || '#000000',
                stroke: options.wireframes
                    ? body.render?.strokeStyle || '#2E3440'
                    : body.render?.strokeStyle || 'none',
                strokeWidth: options.wireframes
                    ? body.render?.lineWidth || 1
                    : 0,
            };
        }

        pathsData.value = newPaths;
    }, true); // <-- Set active to true to run on every frame

    const animatedProps = useAnimatedProps(() => {
        'worklet';
        const paths = Object.values(pathsData.value);
        return {
            d: paths.map((p) => p.d).join(' '),
            fill: paths[0]?.fill || 'none',
            stroke: paths[0]?.stroke || 'none',
            strokeWidth: paths[0]?.strokeWidth || 0,
        };
    });

    return <AnimatedPath animatedProps={animatedProps} />;
};
