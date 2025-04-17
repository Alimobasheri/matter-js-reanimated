import React from 'react';
import { Path, Circle, G } from 'react-native-svg';
import Animated, {
    DerivedValue,
    useAnimatedProps,
    useDerivedValue,
    useFrameCallback,
    useSharedValue,
} from 'react-native-reanimated';

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
}

interface RenderBodyProps {
    bodies: DerivedValue<BodyShape[]>;
    options?: {
        wireframes?: boolean;
        showBounds?: boolean;
        showAxes?: boolean;
        showPositions?: boolean;
        showAngleIndicator?: boolean;
    };
}

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedG = Animated.createAnimatedComponent(G);

export const RenderBody: React.FC<RenderBodyProps> = ({
    bodies,
    options = {},
}) => {
    const pathD = useSharedValue('');

    useFrameCallback(() => {
        'worklet';
        let completePath = '';

        for (let i = 0; i < bodies.value.length; i++) {
            const body = bodies.value[i];

            if (body.type === 'circle' && body.circleRadius !== undefined) {
                const x = body.position.x;
                const y = body.position.y;
                const r = body.circleRadius;
                completePath += `M ${x - r},${y} a ${r},${r} 0 1,0 ${
                    r * 2
                },0 a ${r},${r} 0 1,0 -${r * 2},0 `;
            } else {
                completePath +=
                    body.vertices
                        .map((v, j) => `${j === 0 ? 'M' : 'L'} ${v.x} ${v.y}`)
                        .join(' ') + 'Z ';
            }
        }

        pathD.value = completePath;
    });
    const animatedProps = useAnimatedProps(() => {
        return {
            d: pathD.value,
        };
    });
    return (
        <AnimatedG>
            <AnimatedPath
                animatedProps={animatedProps}
                fill={options.wireframes ? 'none' : 'black'}
                stroke={options.wireframes ? '#2E3440' : 'none'}
                strokeWidth={1}
            />
        </AnimatedG>
    );
};
