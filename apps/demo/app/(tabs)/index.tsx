import { Link } from 'expo-router';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const DEMOS = [
    {
        id: 'air-friction',
        title: 'Air Friction',
        description: 'Demonstrates air friction effects on falling blocks',
    },
    {
        id: 'avalanche',
        title: 'Avalanche',
        description:
            'Simulates an avalanche of small particles cascading down slopes',
    },
    {
        id: 'ball-pool',
        title: 'Ball Pool',
        description: 'A pool of bouncing circles with polygonal obstacles',
    },
    {
        id: 'bridge',
        title: 'Bridge',
        description: 'A swaying bridge construction with falling blocks',
    },
    {
        id: 'car',
        title: 'Car',
        description: 'A composite car with wheels and constraints.',
    },
    {
        id: 'catapult',
        title: 'Catapult',
        description: 'A catapult with blocks and a ball',
    },
    {
        id: 'chains',
        title: 'Chains',
        description: 'Demonstrates different types of chains and constraints',
    },
    {
        id: 'circleStack',
        title: 'Circle Stack',
        description: 'A stack of circles that interact with each other',
    },
    {
        id: 'cloth',
        title: 'Cloth',
        description: 'A hanging cloth simulation with physics',
    },
    {
        id: 'collision-filtering',
        title: 'Collision Filtering',
        description: 'Demonstrates collision filtering using category bitmasks',
    },
    {
        id: 'composite-manipulation',
        title: 'Composite Manipulation',
        description: 'Demonstrates composite translation, rotation and scaling',
    },
    {
        id: 'compound-bodies',
        title: 'Compound Bodies',
        description: 'Demonstrates compound bodies made of multiple parts',
    },
    {
        id: 'compound-stack',
        title: 'Compound Stack',
        description: 'A stack of compound bodies with cross shapes',
    },
    {
        id: 'constraints',
        title: 'Constraints',
        description: 'Demonstrates various types of constraints between bodies',
    },
    {
        id: 'double-pendulum',
        title: 'Double Pendulum',
        description: 'A chaotic double pendulum system',
    },
    {
        id: 'events',
        title: 'Events',
        description: 'Demonstrates event handling in Matter.js',
    },
    {
        id: 'friction',
        title: 'Friction',
        description: 'Demonstrates different friction coefficients',
    },
    {
        id: 'gravity',
        title: 'Gravity',
        description: 'Objects fall upwards with reversed gravity',
    },
    {
        id: 'gyro',
        title: 'Gyroscope',
        description: 'Control gravity with device orientation',
    },
    {
        id: 'manipulation',
        title: 'Manipulation',
        description: 'Demonstrates various body manipulation techniques',
    },
    {
        id: 'mixed-shapes',
        title: 'Mixed Shapes',
        description: 'A mix of different polygon shapes with random chamfering',
    },
];

export default function IndexScreen() {
    const insets = useSafeAreaInsets();
    return (
        <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
            <FlatList<(typeof DEMOS)[0]>
                renderItem={({ item: demo }) => (
                    <Link
                        key={demo.id}
                        href={`/demo?example=${demo.id}`}
                        asChild
                    >
                        <TouchableOpacity>
                            <View style={styles.demoItem}>
                                <ThemedText style={styles.title}>
                                    {demo.title}
                                </ThemedText>
                                <ThemedText style={styles.description}>
                                    {demo.description}
                                </ThemedText>
                            </View>
                        </TouchableOpacity>
                    </Link>
                )}
                data={DEMOS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: insets.bottom }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    demoItem: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#222',
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#888',
    },
});
