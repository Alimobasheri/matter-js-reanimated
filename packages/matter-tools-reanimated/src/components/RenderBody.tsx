import React from 'react';
//@ts-ignore
import { Path, Circle, G } from 'react-native-svg';
import Animated, {
    AnimatedProps,
    DerivedValue,
    useAnimatedProps,
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

export interface ConstraintShape {
    id: string | number;
    type: 'pin' | 'spring';
    bodyAId?: string | number;
    bodyBId?: string | number;
    pointA: { x: number; y: number };
    pointB: { x: number; y: number };
    render: {
        visible: boolean;
        strokeStyle: string;
        lineWidth: number;
        anchors: boolean;
    };
}

interface RenderBodyProps {
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

export const RenderBody: React.FC<RenderBodyProps> = ({ options = {} }) => {
    const bodyPathD = useSharedValue('');
    const constraintPathD = useSharedValue('');

    useFrameCallback(() => {
        'worklet';
        let bodyPath = '';
        if (Array.isArray(global.svgContent)) {
            for (const body of global.svgContent) {
                if (body.type === 'circle' && body.circleRadius !== undefined) {
                    const x = body.position.x;
                    const y = body.position.y;
                    const r = body.circleRadius;
                    bodyPath += `M ${x - r},${y} a ${r},${r} 0 1,0 ${
                        r * 2
                    },0 a ${r},${r} 0 1,0 -${r * 2},0 `;
                } else {
                    bodyPath +=
                        body.vertices
                            .map(
                                (v, j) => `${j === 0 ? 'M' : 'L'} ${v.x} ${v.y}`
                            )
                            .join(' ') + 'Z ';
                }
            }
        }
        bodyPathD.value = bodyPath;

        let constraintPath = '';
        if (Array.isArray(global.svgConstraints)) {
            for (const constraint of global.svgConstraints) {
                if (!constraint.render.visible) continue;

                let startX = constraint.pointA.x;
                let startY = constraint.pointA.y;
                let endX = constraint.pointB.x;
                let endY = constraint.pointB.y;

                if (constraint.bodyAId) {
                    const bodyA = global.svgContent.find(
                        (b) => b.id === constraint.bodyAId
                    );
                    if (bodyA) {
                        startX = bodyA.position.x + constraint.pointA.x;
                        startY = bodyA.position.y + constraint.pointA.y;
                    }
                }

                if (constraint.bodyBId) {
                    const bodyB = global.svgContent.find(
                        (b) => b.id === constraint.bodyBId
                    );
                    if (bodyB) {
                        endX = bodyB.position.x + constraint.pointB.x;
                        endY = bodyB.position.y + constraint.pointB.y;
                    }
                }

                if (constraint.type === 'pin') {
                    constraintPath += `M ${
                        startX - 3
                    },${startY} a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;
                } else {
                    constraintPath += `M ${startX},${startY} L ${endX},${endY} `;
                    if (constraint.type === 'spring') {
                        const deltaX = endX - startX;
                        const deltaY = endY - startY;
                        const length = Math.hypot(deltaX, deltaY);
                        if (length > 0) {
                            const normal = {
                                x: -deltaY / length,
                                y: deltaX / length,
                            };
                            const coils = Math.ceil(
                                Math.min(Math.max(length / 5, 12), 20)
                            );
                            for (let j = 1; j < coils; j++) {
                                const t = j / coils;
                                const offset = j % 2 === 0 ? 1 : -1;
                                const x =
                                    startX + deltaX * t + normal.x * offset * 4;
                                const y =
                                    startY + deltaY * t + normal.y * offset * 4;
                                constraintPath += `L ${x},${y} `;
                            }
                        }
                        constraintPath += `L ${endX},${endY} `;
                    }
                }

                if (constraint.render.anchors) {
                    constraintPath += `M ${
                        startX - 3
                    },${startY} a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;
                    constraintPath += `M ${
                        endX - 3
                    },${endY} a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;
                }
            }
        }
        constraintPathD.value = constraintPath;
    });

    const bodyAnimatedProps = useAnimatedProps(
        () => ({
            d: bodyPathD.value,
            fill: options.wireframes ? 'none' : 'black',
            stroke: options.wireframes ? '#2E3440' : 'none',
            strokeWidth: 1,
        }),
        [bodyPathD, options.wireframes]
    );

    const constraintAnimatedProps = useAnimatedProps(
        () => ({
            d: constraintPathD.value,
            fill: 'none',
            stroke: options.wireframes ? '#2E3440' : '#bbb',
            strokeWidth: 1,
        }),
        [constraintPathD, options.wireframes]
    );

    return (
        <AnimatedG>
            <AnimatedPath animatedProps={bodyAnimatedProps} />
            <AnimatedPath animatedProps={constraintAnimatedProps} />
        </AnimatedG>
    );
};
