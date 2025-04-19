import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Demo } from 'matter-tools-reanimated';
import { useCallback } from 'react';

export default function TabTwoScreen() {
    const initBouncingBalls = useCallback(() => {
        'worklet';
        // Initialize the bouncing balls example
        console.log('Initializing bouncing balls example');
    }, []);
    return (
        <Demo
            exampleWorklet={initBouncingBalls}
            options={{
                render: {
                    wireframes: true,
                    showBounds: true,
                    showPositions: true,
                },
            }}
        />
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});
