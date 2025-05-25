import Matter from 'matter-js';
import React from 'react';
interface TouchConstraintProps {
    engineId?: string;
    options?: {
        constraint?: {
            stiffness?: number;
            damping?: number;
        };
    };
    enabled?: boolean;
    children: React.ReactNode;
}
export interface TouchConstraintType {
    type: 'touchConstraint';
    constraint: Matter.Constraint;
    body: Matter.Body | null;
    collisionFilter: {
        category: number;
        mask: number;
        group: number;
    };
}
/**
 * A component that adds a touch constraint to the engine.
 *
 * When the user touches the screen, it will try to find a body to drag.
 * The body is found by checking if the touch point is inside the body's bounds.
 * If the body is found, it will be assigned to the constraint and the constraint
 * will be updated to follow the user's touch.
 *
 * The touch constraint is created with a stiffness of 0.1 and a length of 0.01.
 * These values can be changed by passing an options object with the constraint
 * properties.
 *
 * The component uses the `GestureDetector` from `react-native-gesture-handler`
 * to handle the gesture events.
 *
 * @param {Object} props The props object.
 * @param {string} [props.engineId='defaultEngine'] The ID of the engine.
 * @param {Object} [props.options={}] The options object.
 * @param {Object} [props.options.constraint={}] The constraint properties.
 * @param {number} [props.options.constraint.stiffness=0.1] The stiffness of the constraint.
 * @param {number} [props.options.constraint.length=0.01] The length of the constraint.
 * @param {boolean} [props.enabled=true] Whether the constraint is enabled.
 * @param {React.ReactNode} props.children The children of the component.
 *
 * @return {JSX.Element} The component.
 */
export declare const TouchConstraint: React.FC<TouchConstraintProps>;
export {};
//# sourceMappingURL=TouchConstraint.d.ts.map