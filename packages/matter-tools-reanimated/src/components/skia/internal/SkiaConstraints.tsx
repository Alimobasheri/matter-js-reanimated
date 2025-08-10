import React from 'react';
import {
  Canvas,
  Picture,
  Skia,
  PaintStyle,
  createPicture,
} from '@shopify/react-native-skia';
import {
  useSharedValue,
  useDerivedValue,
  runOnUI,
  useFrameCallback,
} from 'react-native-reanimated';
import { useWindowDimensions, View } from 'react-native';
import type { RenderProps } from './SkiaRender';

export const SkiaConstraints: React.FC<RenderProps> = ({
  engineId = 'defaultEngine',
  options = {},
}) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const canvasWidth = options.width || windowWidth;
  const canvasHeight = options.height || windowHeight;

  // Shared values to trigger re-render
  const frameTick = useSharedValue(0);

  useFrameCallback(() => {
    'worklet';
    let now = Date.now();
    // console.log(now - frameTick.value, 'ms since last frame');
    frameTick.value = now;
  });

  const picture = useDerivedValue(() => {
    return createPicture((canvas) => {
      if (
        !global.MatterReanimated ||
        !global.MatterToolsReanimated ||
        !(engineId in global.MatterToolsReanimated)
      )
        return;

      const engine = (global.MatterToolsReanimated as any)[engineId];
      if (!engine || !engine.world) return;

      const _ = frameTick.value; // Access the shared value to trigger re-render

      const constraints = global.MatterReanimated.Composite.allConstraints(
        engine.world
      );
      const bodies = global.MatterReanimated.Composite.allBodies(engine.world);

      const strokePaint = Skia.Paint();
      strokePaint.setStyle(PaintStyle.Stroke);
      strokePaint.setAntiAlias(true);
      strokePaint.setStrokeWidth(1);
      strokePaint.setColor(
        Skia.Color(options.wireframes ? '#2E3440' : '#bbbbbb')
      );

      const anchorPaint = Skia.Paint();
      anchorPaint.setStyle(PaintStyle.Stroke);
      anchorPaint.setAntiAlias(true);
      anchorPaint.setStrokeWidth(1);
      anchorPaint.setColor(Skia.Color('#bbbbbb'));

      for (const constraint of constraints) {
        if (constraint.render?.visible === false) continue;

        let startX = constraint.pointA.x;
        let startY = constraint.pointA.y;
        let endX = constraint.pointB.x;
        let endY = constraint.pointB.y;

        if (constraint.bodyA?.id) {
          const bodyA = bodies.find((b: any) => b.id === constraint.bodyA?.id);
          if (bodyA) {
            startX = bodyA.position.x + constraint.pointA.x;
            startY = bodyA.position.y + constraint.pointA.y;
          }
        }

        if (constraint.bodyB?.id) {
          const bodyB = bodies.find((b: any) => b.id === constraint.bodyB?.id);
          if (bodyB) {
            endX = bodyB.position.x + constraint.pointB.x;
            endY = bodyB.position.y + constraint.pointB.y;
          }
        }

        if (constraint.type === 'pin') {
          const pinPath = Skia.Path.Make();
          pinPath.addCircle(startX, startY, 3);
          canvas.drawPath(pinPath, strokePaint);
        } else {
          const springPath = Skia.Path.Make();
          springPath.moveTo(startX, startY);

          if (constraint.type === 'spring') {
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const length = Math.hypot(deltaX, deltaY);

            if (length > 0) {
              const normal = {
                x: -deltaY / length,
                y: deltaX / length,
              };

              const coils = Math.ceil(Math.min(Math.max(length / 5, 12), 20));

              for (let j = 1; j < coils; j++) {
                const t = j / coils;
                const offset = j % 2 === 0 ? 1 : -1;
                const x = startX + deltaX * t + normal.x * offset * 4;
                const y = startY + deltaY * t + normal.y * offset * 4;
                springPath.lineTo(x, y);
              }
            }
          }

          springPath.lineTo(endX, endY);
          canvas.drawPath(springPath, strokePaint);
        }

        if (constraint.render?.anchors) {
          const anchorA = Skia.Path.Make();
          anchorA.addCircle(startX, startY, 3);
          const anchorB = Skia.Path.Make();
          anchorB.addCircle(endX, endY, 3);
          canvas.drawPath(anchorA, anchorPaint);
          canvas.drawPath(anchorB, anchorPaint);
        }
      }
    });
  }, [frameTick]);

  return <Picture picture={picture} />;
};
