import { useDerivedMatterBody } from '@/src/hooks/useDerivedMatterBody';
import { useDerivedMatterConstraint } from '@/src/hooks/useDerivedMatterConstraint';
import type { Matter } from 'matter-js-reanimated';
import { Text, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

function getBodySize(body: Matter.Body) {
  'worklet';
  const vertices = body.vertices;
  const width = Math.hypot(
    vertices[1].x - vertices[0].x,
    vertices[1].y - vertices[0].y
  );
  const height = Math.hypot(
    vertices[2].x - vertices[1].x,
    vertices[2].y - vertices[1].y
  );
  return { width, height };
}

function getTopLeftPosition(body: Matter.Body) {
  'worklet';
  const { width, height } = getBodySize(body);
  return {
    x: body.position.x - width / 2,
    y: body.position.y - height / 2,
  };
}

const processBody = (body: Matter.Body) => {
  'worklet';
  const { width, height } = getBodySize(body);
  const { x, y } = getTopLeftPosition(body);
  return {
    x,
    y,
    width,
    height,
    angle: body.angle,
  };
};

const processConstraint = (constraint: Matter.Constraint) => {
  'worklet';
  const pointAWorld = constraint.pointA;

  let pointBWorld = constraint.pointB;

  if (constraint.bodyB) {
    const bodyBPosition = constraint.bodyB.position;
    const bodyBAngle = constraint.bodyB.angle;

    const rotatedPoint = global.Matter.Vector.rotate(
      constraint.pointB,
      bodyBAngle
    );

    pointBWorld = global.Matter.Vector.add(bodyBPosition, rotatedPoint);
  }

  return {
    x: pointAWorld.x,
    y: pointAWorld.y,
    x2: pointBWorld.x,
    y2: pointBWorld.y,
  };
};

const ConstraintLine = ({
  constraint,
}: {
  constraint: ReturnType<
    typeof useDerivedMatterConstraint<ReturnType<typeof processConstraint>>
  >;
}) => {
  const lineStyle = useAnimatedStyle(() => {
    if (!constraint.value) return {};

    const startX = constraint.value.x;
    const startY = constraint.value.y;
    const endX = constraint.value.x2;
    const endY = constraint.value.y2;

    const length = Math.hypot(endX - startX, endY - startY);
    const angle = Math.atan2(endY - startY, endX - startX);

    return {
      position: 'absolute',
      left: startX,
      top: startY,
      width: length,
      height: 2,
      backgroundColor: 'red',
      transform: [{ rotate: `${angle}rad` }],
      transformOrigin: '0% 50%',
    };
  });

  return <Animated.View style={lineStyle} />;
};

export const Sign = () => {
  const data = useDerivedMatterBody(
    { label: 'signBody' },
    'demoEngine',
    processBody
  );

  const constraint1 = useDerivedMatterConstraint(
    { label: 'signConstraint1' },
    'demoEngine',
    processConstraint
  );

  const constraint2 = useDerivedMatterConstraint(
    { label: 'signConstraint2' },
    'demoEngine',
    processConstraint
  );

  const animatedStyle = useAnimatedStyle(() => {
    if (!data.value) return { position: 'absolute' };
    return {
      position: 'absolute',
      top: data.value.y, // Removed the extra subtraction
      left: data.value.x, // Removed the extra subtraction
      transform: [{ rotate: `${data.value.angle}rad` }],
      width: data.value.width,
      height: data.value.height,
    };
  }, [data]);

  return (
    <View style={{ position: 'relative', flex: 1, backgroundColor: 'white' }}>
      <ConstraintLine constraint={constraint1} />
      <ConstraintLine constraint={constraint2} />

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
