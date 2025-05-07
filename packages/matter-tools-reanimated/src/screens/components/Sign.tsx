import { useDerivedMatterBody } from '@/src/hooks/useDerivedMatterBody';
import Matter from 'matter-js';
import { useCallback } from 'react';
import { Text, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

function getBodySize(body: Matter.Body) {
    'worklet';
    const vertices = body.vertices;

    // Get the length of the first edge (assumes rectangle)
    const width = Math.hypot(
        vertices[1].x - vertices[0].x,
        vertices[1].y - vertices[0].y
    );

    // Get the length of the second edge
    const height = Math.hypot(
        vertices[2].x - vertices[1].x,
        vertices[2].y - vertices[1].y
    );

    return { width, height };
}

export const Sign = () => {
    const processBody = useCallback((body: Matter.Body) => {
        'worklet';
        const { width, height } = getBodySize(body);
        return {
            x: body.position.x,
            y: body.position.y,
            width,
            height,
            angle: body.angle,
        };
    }, []);
    const data = useDerivedMatterBody(
        { label: 'signBody' },
        'demoEngine',
        processBody
    );
    const animatedStyle = useAnimatedStyle(() => {
        if (!data.value) return {};
        return {
            position: 'absolute',
            top: data.value.y,
            left: data.value.x,
            transform: [{ rotate: data.value.angle }],
            width: data.value.width,
            height: data.value.height,
        };
    }, [data]);
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'white',
            }}
        >
            <Animated.View
                style={[
                    animatedStyle,
                    {
                        backgroundColor: 'yellow',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                    },
                ]}
            >
                <Text>Welcome To MatterJS Reanimated!</Text>
            </Animated.View>
        </View>
    );
};
