import React, { useEffect, useState } from 'react';
import { runOnJS, runOnUI } from 'react-native-reanimated';
// Import the default export which is the init function
import initMatter from 'matter-js-reanimated';

/**
 * A Higher-Order Component that ensures Matter.js is initialized on the UI thread
 * before rendering its children. This prevents race conditions and ensures Matter
 * is available in worklets.
 */
export function withMatter(WrappedComponent) {
  return function WithMatterComponent(props) {
    const [isInitialized, setIsInitialized] = useState(false);
    useEffect(() => {
      // Initialize Matter.js on the UI thread
      runOnUI(() => {
        'worklet';

        // Only initialize if not already done
        if (!global.Matter) {
          //@ts-ignore
          initMatter();
        }
        runOnJS(setIsInitialized)(true);
      })();
    }, []);

    // Don't render children until Matter.js is initialized
    if (!isInitialized) {
      return null;
    }
    return /*#__PURE__*/React.createElement(WrappedComponent, props);
  };
}
//# sourceMappingURL=withMatter.js.map