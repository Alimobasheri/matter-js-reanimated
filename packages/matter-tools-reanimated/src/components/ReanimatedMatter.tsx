import React from 'react';
import { useInitWorklet } from '../hooks/useInitWorklet';

export type ReanimatedMatterProps = {
    children: React.ReactNode;
    worklet?: (engine: any) => void;
    engineId?: string;
};

/**
 * A component that ensures Matter.js is initialized on the UI thread
 * before rendering its children. This prevents race conditions and ensures Matter
 * is available in worklets.
 */
export const ReanimatedMatter: React.FC<ReanimatedMatterProps> = ({
    children,
    worklet,
    engineId = 'defaultEngine',
}) => {
    const isInitialized = useInitWorklet(
        worklet ||
            (() => {
                'worklet';
            }), // Default empty worklet if none provided
        engineId
    );

    // Don't render children until Matter.js is initialized
    if (!isInitialized) {
        return null;
    }

    return <>{children}</>;
};
