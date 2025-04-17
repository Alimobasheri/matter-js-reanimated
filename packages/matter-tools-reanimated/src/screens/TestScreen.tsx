import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { runOnUI } from 'react-native-reanimated';
import { Demo } from '../components/Demo';
import { initBouncingBalls } from '../examples/BouncingBalls';

export default function TestScreen() {
    const { width, height } = useWindowDimensions();

    React.useEffect(() => {
        // Initialize Matter.js on the UI thread
        runOnUI(() => {
            'worklet';
            if (!global.Matter) return;

            // Make dimensions available to worklets
            global.windowWidth = width;
            global.windowHeight = height;

            global.bouncingBallsDemo = initBouncingBalls;
        })();
    }, [width, height]);

    return (
        <View style={styles.container}>
            <Demo
                example="bouncingBallsDemo"
                options={{
                    render: {
                        wireframes: true,
                        showBounds: true,
                        showPositions: true,
                        width: width,
                        height: height,
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
