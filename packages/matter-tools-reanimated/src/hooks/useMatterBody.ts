import { DerivedValue, useDerivedValue } from 'react-native-reanimated';

export interface MatterBodyState {
    position: { x: number; y: number };
    angle: number;
    bounds: {
        min: { x: number; y: number };
        max: { x: number; y: number };
    };
    vertices: Array<{ x: number; y: number }>;
}

export function useMatterBody(bodyId: string): DerivedValue<MatterBodyState> {
    return useDerivedValue(() => {
        'worklet';
        const defaultState: MatterBodyState = {
            position: { x: 0, y: 0 },
            angle: 0,
            bounds: { min: { x: 0, y: 0 }, max: { x: 0, y: 0 } },
            vertices: [],
        };

        if (!global.Matter || !(bodyId in global)) {
            return defaultState;
        }

        //@ts-ignore
        const body: Matter.Body = (global as unknown as Global)[bodyId];
        return {
            position: { ...body.position },
            angle: body.angle,
            bounds: {
                min: { ...body.bounds.min },
                max: { ...body.bounds.max },
            },
            vertices: body.vertices.map((v) => ({ ...v })),
        };
    });
}
