import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFrameCallback, runOnUI } from 'react-native-reanimated';
import { withMatter } from '../hoc/withMatter';
import { Render } from './Render';
// import { Touch } from './Touch';

interface DemoProps {
    exampleWorklet: (engine: any) => void;
    options?: {
        render?: {
            wireframes?: boolean;
            showBounds?: boolean;
            showAxes?: boolean;
            showPositions?: boolean;
            showAngleIndicator?: boolean;
        };
        touch?: {
            constraint?: {
                stiffness?: number;
                damping?: number;
            };
        };
    };
}

const DemoComponent: React.FC<DemoProps> = ({
    exampleWorklet,
    options = {},
}) => {
    React.useEffect(() => {
        runOnUI(() => {
            'worklet';

            if (!global.Matter) {
                console.warn(
                    'Matter.js not initialized! Run initMatter() first.'
                );
                return;
            }

            const engine = global.Matter.Engine.create({
                enableSleeping: false,
                gravity: { x: 0, y: 1, scale: 0.001 },
            });

            global.demoEngine = engine;
            exampleWorklet(engine);

            console.log('Demo example initialized');
        })();

        return () => {
            runOnUI(() => {
                'worklet';
                if (global.demoEngine) {
                    global.Matter.Composite.clear(
                        global.demoEngine.world,
                        false,
                        true
                    );
                    global.demoEngine = undefined;
                }
            })();
        };
    }, [exampleWorklet]);

    useFrameCallback(() => {
        'worklet';
        if (!global.demoEngine) return;

        global.Matter.Engine.update(
            global.demoEngine,
            16.667 // Use fixed timestep for demos
        );
    });

    return (
        <View style={styles.container}>
            {/* <Touch engineId="demoEngine" options={options.touch}> */}
            <Render engineId="demoEngine" options={options.render} />
            {/* </Touch> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
});

export const Demo = withMatter(DemoComponent);
