import { Link } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const DEMOS = [
    {
        id: 'air-friction',
        title: 'Air Friction',
        description: 'Demonstrates air friction effects on falling blocks',
    },
];

export default function IndexScreen() {
    const insets = useSafeAreaInsets();
    return (
        <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
            {DEMOS.map((demo) => (
                <Link
                    key={demo.id}
                    href={`/(tabs)/demo?example=${demo.id}`}
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
            ))}
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
