import React from 'react';
import {
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
import { useWindowDimensions } from 'react-native';
import type { RenderProps } from './SkiaRender';

export const SkiaBodies: React.FC<RenderProps> = ({
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
      if (!global.Matter || !(engineId in global)) return;
      const engine = (global as any)[engineId];
      if (!engine || !engine.world) return;

      const _ = frameTick.value;

      const bodies = global.Matter.Composite.allBodies(engine.world);
      canvas.clear(Skia.Color(options.background || 'white'));

      for (const body of bodies) {
        if (body.render?.visible === false) continue;

        const skPath = Skia.Path.Make();

        if (body.type === 'circle' && body.circleRadius !== undefined) {
          skPath.addCircle(body.position.x, body.position.y, body.circleRadius);
        } else {
          const verts = body.vertices;
          if (verts && verts.length > 0) {
            skPath.moveTo(verts[0].x, verts[0].y);
            for (let j = 1; j < verts.length; j++) {
              skPath.lineTo(verts[j].x, verts[j].y);
            }
            skPath.close();
          }
        }

        const fillPaint = Skia.Paint();
        fillPaint.setAntiAlias(true);
        fillPaint.setStyle(PaintStyle.Fill);
        fillPaint.setColor(
          Skia.Color(
            options.wireframes
              ? 'transparent'
              : body.render?.fillStyle || '#000000'
          )
        );
        canvas.drawPath(skPath, fillPaint);

        if (options.wireframes || body.render?.strokeStyle) {
          const strokePaint = Skia.Paint();
          strokePaint.setStyle(PaintStyle.Stroke);
          strokePaint.setStrokeWidth(body.render?.lineWidth || 1);
          strokePaint.setColor(
            Skia.Color(body.render?.strokeStyle || '#2E3440')
          );
          canvas.drawPath(skPath, strokePaint);
        }
      }
    });
  }, [frameTick]);

  return <Picture picture={picture} />;
};
