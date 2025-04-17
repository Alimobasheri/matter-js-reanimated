import React, { useEffect, useState } from 'react';
import { runOnJS, runOnUI } from 'react-native-reanimated';
// Import the default export which is the init function
import initMatter from 'matter-js-reanimated';

/**
 * A Higher-Order Component that ensures Matter.js is initialized on the UI thread
 * before rendering its children. This prevents race conditions and ensures Matter
 * is available in worklets.
 */
export function withMatter<P extends object>(
    WrappedComponent: React.ComponentType<P>
): React.ComponentType<P> {
    return function WithMatterComponent(props: P) {
        const [isInitialized, setIsInitialized] = useState(false);

        useEffect(() => {
            // Initialize Matter.js on the UI thread
            runOnUI(() => {
                'worklet';
                // Only initialize if not already done
                if (!global.Matter) {
                    initMatter();
                }
                runOnJS(setIsInitialized)(true);
            })();
        }, []);

        // Don't render children until Matter.js is initialized
        if (!isInitialized) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
}
