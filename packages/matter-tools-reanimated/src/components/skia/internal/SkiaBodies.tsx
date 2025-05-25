import React, { useEffect } from 'react';
import {
    Canvas,
    Image,
    PaintStyle,
    Skia,
    useCanvasRef,
} from '@shopify/react-native-skia';
import { useWindowDimensions } from 'react-native';
import {
    useSharedValue,
    runOnUI,
    useFrameCallback,
} from 'react-native-reanimated';
import type { SkImage } from '@shopify/react-native-skia';
import type { RenderProps } from './SkiaRender';

export const SkiaBodies: React.FC<RenderProps> = ({ options = {} }) => {
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const width = options.width || windowWidth;
    const height = options.height || windowHeight;

    const image = useSharedValue<SkImage | null>(null);

    const drawScene = (imgRef: typeof image) => {
        'worklet';
        const surface = Skia.Surface.MakeOffscreen(width, height);
        if (!surface) return;
        const canvas = surface.getCanvas();

        canvas.clear(Skia.Color(options.background || 'white'));

        if (!Array.isArray(global.svgContent)) {
            imgRef.value = surface.makeImageSnapshot();
            return;
        }

        for (const body of global.svgContent) {
            const skPath = Skia.Path.Make();

            if (body.type === 'circle' && body.circleRadius !== undefined) {
                skPath.addCircle(
                    body.position.x,
                    body.position.y,
                    body.circleRadius
                );
            } else {
                const verts = body.vertices;
                if (verts.length > 0) {
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

            // Optional stroke
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

        surface.flush();
        imgRef.value = surface.makeImageSnapshot();
    };

    useFrameCallback(() => {
        'worklet';
        drawScene(image);
    });

    return <Image image={image} x={0} y={0} width={width} height={height} />;
};
