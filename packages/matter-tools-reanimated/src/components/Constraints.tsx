import React from 'react';
//@ts-ignore
import { Path, G } from 'react-native-svg';
import Animated, {
    useAnimatedProps,
    useFrameCallback,
    useSharedValue,
} from 'react-native-reanimated';
import { RenderProps } from './Render';

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

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedG = Animated.createAnimatedComponent(G);

export const Constraints: React.FC<RenderProps> = ({ options = {} }) => {
    const constraintPathD = useSharedValue('');

    useFrameCallback(() => {
        'worklet';
        let constraintPath = '';
        if (Array.isArray(global.MatterReanimated.svgConstraints)) {
            for (const constraint of global.MatterReanimated.svgConstraints) {
                if (!constraint.render.visible) continue;

                let startX = constraint.pointA.x;
                let startY = constraint.pointA.y;
                let endX = constraint.pointB.x;
                let endY = constraint.pointB.y;

                if (constraint.bodyAId) {
                    const bodyA = global.MatterReanimated.svgContent?.find(
                        (b) => b.id === constraint.bodyAId
                    );
                    if (bodyA) {
                        startX = bodyA.position.x + constraint.pointA.x;
                        startY = bodyA.position.y + constraint.pointA.y;
                    }
                }

                if (constraint.bodyBId) {
                    const bodyB = global.MatterReanimated.svgContent?.find(
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
            <AnimatedPath animatedProps={constraintAnimatedProps} />
        </AnimatedG>
    );
};
