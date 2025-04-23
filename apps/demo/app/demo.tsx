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
import { initCar } from '@/examples/worklets/car';
import { useHeaderHeight } from '@react-navigation/elements';
import { initCatapult } from '@/examples/worklets/catapult';
import { initChains } from '@/examples/worklets/chains';
import { initCircleStack } from '@/examples/worklets/circleStack';
import { initCloth } from '@/examples/worklets/cloth';
import { initCollisionFiltering } from '@/examples/worklets/collisionFiltering';
import { initCompositeManipulation } from '@/examples/worklets/compositeManipulation';
import { initCompoundBodies } from '@/examples/worklets/compound';
import { initCompoundStack } from '@/examples/worklets/compoundStack';
import { initConstraints } from '@/examples/worklets/constraints';
import { initDoublePendulum } from '@/examples/worklets/doublePendulum';
import { initEvents } from '@/examples/worklets/events';
import { initFriction } from '@/examples/worklets/friction';
import { initGravity } from '@/examples/worklets/gravity';
import { initGyro } from '@/examples/worklets/gyro';
import { initManipulation } from '@/examples/worklets/manipulation';
import { initMixedShapes } from '@/examples/worklets/mixed';
import { initNewtonsCradle } from '@/examples/worklets/newtonsCradle';
import { initPyramid } from '@/examples/worklets/pyramid';
import { initRagdoll } from '@/examples/worklets/ragdoll';
import { initRestitution } from '@/examples/worklets/restitution';
import { initRoundedCorners } from '@/examples/worklets/rounded';
import { initSoftBody } from '@/examples/worklets/softBody';
import { initStaticFriction } from '@/examples/worklets/staticFriction';
import { initStress } from '@/examples/worklets/stress';
import { initStress2 } from '@/examples/worklets/stress2';
import { initStress3 } from '@/examples/worklets/stress3';
import { initStress4 } from '@/examples/worklets/stress4';

const examples = {
    'air-friction': initAirFriction,
    avalanche: initAvalanche,
    'ball-pool': initBallPool,
    bridge: initBridge,
    car: initCar,
    catapult: initCatapult,
    chains: initChains,
    circleStack: initCircleStack,
    cloth: initCloth,
    'collision-filtering': initCollisionFiltering,
    'composite-manipulation': initCompositeManipulation,
    'compound-bodies': initCompoundBodies,
    'compound-stack': initCompoundStack,
    constraints: initConstraints,
    'double-pendulum': initDoublePendulum,
    events: initEvents,
    friction: initFriction,
    gravity: initGravity,
    gyro: initGyro,
    manipulation: initManipulation,
    'mixed-shapes': initMixedShapes,
    newtonsCradle: initNewtonsCradle,
    pyramid: initPyramid,
    ragdoll: initRagdoll,
    restitution: initRestitution,
    'rounded-corners': initRoundedCorners,
    'soft-body': initSoftBody,
    'static-friction': initStaticFriction,
    stress: initStress,
    stress2: initStress2,
    stress3: initStress3,
    stress4: initStress4,
};

export default function DemoScreen() {
    const { example } = useLocalSearchParams();
    const insets = useSafeAreaInsets();
    const exampleWorklet = examples[example as keyof typeof examples];
    const headerHeight = useHeaderHeight();
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        runOnUI(() => {
            'worklet';
            global.windowWidth = width - insets.left - insets.right;
            global.windowHeight =
                height - insets.top - insets.bottom - headerHeight;
        })();
    }, [width, height, insets, headerHeight]);

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
