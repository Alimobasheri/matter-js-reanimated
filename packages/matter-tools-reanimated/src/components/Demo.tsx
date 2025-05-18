import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFrameCallback } from 'react-native-reanimated';
import { ReanimatedMatter } from './ReanimatedMatter';
import { Render } from './Render';
import { TouchConstraint } from './TouchConstraint';

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
            enablePan?: boolean;
        };
    };
}

export const Demo: React.FC<DemoProps> = ({ exampleWorklet, options = {} }) => {
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
            <ReanimatedMatter worklet={exampleWorklet} engineId="demoEngine">
                <TouchConstraint engineId="demoEngine" options={options.touch}>
                    <Render engineId="demoEngine" options={options.render} />
                </TouchConstraint>
            </ReanimatedMatter>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
});
