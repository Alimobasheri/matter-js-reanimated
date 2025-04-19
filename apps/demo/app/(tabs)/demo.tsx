import { Demo } from 'matter-tools-reanimated';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { initAirFriction } from '@/examples/worklets/airFriction';
import { initAvalanche } from '@/examples/worklets/avalanche';
import { useEffect } from 'react';
import { runOnUI } from 'react-native-reanimated';

const examples = {
    'air-friction': initAirFriction,
    avalanche: initAvalanche,
};

export default function DemoScreen() {
    const { example } = useLocalSearchParams();
    const insets = useSafeAreaInsets();
    const exampleWorklet = examples[example as keyof typeof examples];
    const { width, height } = useWindowDimensions();
    useEffect(() => {
        runOnUI(() => {
            'worklet';
            global.windowWidth = width;
            global.windowHeight = height;
        })();
    }, [width, height]);
    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <Demo
                exampleWorklet={exampleWorklet}
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
