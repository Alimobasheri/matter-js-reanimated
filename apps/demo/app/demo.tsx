import { Demo } from 'matter-tools-reanimated';
import { useLocalSearchParams, router } from 'expo-router';
import {
    StyleSheet,
    useWindowDimensions,
    View,
    BackHandler,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { initAirFriction } from '@/examples/worklets/airFriction';
import { initAvalanche } from '@/examples/worklets/avalanche';
import { initBallPool } from '@/examples/worklets/ballPool';
import { initBridge } from '@/examples/worklets/bridge';
import { useEffect, useCallback } from 'react';
import { runOnUI, runOnJS } from 'react-native-reanimated';

const examples = {
    'air-friction': initAirFriction,
    avalanche: initAvalanche,
    'ball-pool': initBallPool,
    bridge: initBridge,
};

export default function DemoScreen() {
    const { example } = useLocalSearchParams();
    const insets = useSafeAreaInsets();
    const exampleWorklet = examples[example as keyof typeof examples];
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        runOnUI(() => {
            'worklet';
            global.windowWidth = width - insets.left - insets.right;
            global.windowHeight = height - insets.top - insets.bottom;
        })();
    }, [width, height, insets]);

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom }]}>
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
