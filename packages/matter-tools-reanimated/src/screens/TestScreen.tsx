import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { runOnUI } from 'react-native-reanimated';
import { Demo } from '../components/Demo';
import { initBouncingBalls } from '../examples/BouncingBalls';

export default function TestScreen() {
    const { width, height } = useWindowDimensions();

    React.useEffect(() => {
        // Make dimensions available to worklets
        runOnUI(() => {
            'worklet';
            global.windowWidth = width;
            global.windowHeight = height;
        })();
    }, [width, height]);

    return (
        <View style={styles.container}>
            <Demo
                exampleWorklet={initBouncingBalls}
                options={{
                    render: {
                        wireframes: true,
                        showBounds: true,
                        showPositions: true,
                    },
                    touch: {
                        constraint: {
                            stiffness: 0.2,
                            damping: 0.3,
                        },
                    },
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
});
