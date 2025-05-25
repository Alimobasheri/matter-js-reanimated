import Matter from 'matter-js';
type BodyIdentifier = {
    id: number;
} | {
    label: string;
};
export declare function useDerivedMatterBody<T>(identifier: BodyIdentifier, engineId: string, process: (body: Matter.Body) => T): import("react-native-reanimated").SharedValue<T | null>;
export {};
//# sourceMappingURL=useDerivedMatterBody.d.ts.map