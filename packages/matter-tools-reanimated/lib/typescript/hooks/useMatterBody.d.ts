import { DerivedValue } from 'react-native-reanimated';
export interface MatterBodyState {
    position: {
        x: number;
        y: number;
    };
    angle: number;
    bounds: {
        min: {
            x: number;
            y: number;
        };
        max: {
            x: number;
            y: number;
        };
    };
    vertices: Array<{
        x: number;
        y: number;
    }>;
}
export declare function useMatterBody(bodyId: string): DerivedValue<MatterBodyState>;
//# sourceMappingURL=useMatterBody.d.ts.map