import { Demo } from 'matter-tools-reanimated';
import { useLocalSearchParams, router, useNavigation } from 'expo-router';
import {
  StyleSheet,
  useWindowDimensions,
  View,
  BackHandler,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FC, useEffect, useLayoutEffect } from 'react';
import { runOnUI } from 'react-native-reanimated';
import { useHeaderHeight } from '@react-navigation/elements';
import { DEMOS, examples } from '@/constants/Demos';

export interface ICustomHeaderProps {
  title: string;
  subtitle: string;
}

const CustomHeaderTitle: FC<ICustomHeaderProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      {subtitle && (
        <Text style={styles.headerSubtitle} adjustsFontSizeToFit>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

export default function DemoScreen() {
  const { example } = useLocalSearchParams();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const exampleWorklet = examples[example as keyof typeof examples];
  const demoItem = DEMOS.find((demo) => demo.id === example);
  const headerHeight = useHeaderHeight();
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    runOnUI(() => {
      'worklet';
      global.MatterToolsReanimated.windowWidth =
        width - insets.left - insets.right;
      global.MatterToolsReanimated.windowHeight =
        height - insets.top - insets.bottom - headerHeight;
    })();
  }, [width, height, insets, headerHeight]);

  useEffect(() => {
    if (!demoItem) return;
    navigation.setOptions({
      headerTitle: (props: any) => (
        <CustomHeaderTitle
          title={demoItem?.title}
          subtitle={demoItem.description}
        />
      ),
    });
  }, [demoItem]);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Demo
        exampleWorklet={exampleWorklet}
        options={{
          render: {
            wireframes: false,
            showBounds: true,
            showPositions: true,
            showConstraints: true,
          },
          touch: {
            enablePan: true,
          },
          skia: true,
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
  headerContainer: {
    // Flex direction can be 'row' or 'column' depending on desired layout
    paddingVertical: 2,
    flexDirection: 'column',
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    // You might need to adjust width if your title is very long
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Or your desired color
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)', // Slightly lighter for subtitle
    marginTop: 2, // Small spacing between title and subtitle
    width: '100%',
  },
});
