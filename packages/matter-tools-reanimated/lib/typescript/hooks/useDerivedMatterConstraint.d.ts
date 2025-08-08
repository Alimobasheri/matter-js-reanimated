type ConstraintIdentifier = {
    id: number;
} | {
    label: string;
};
export declare function useDerivedMatterConstraint<T>(identifier: ConstraintIdentifier, engineId: string, process: (constraint: Matter.Constraint) => T): import("react-native-reanimated").SharedValue<T | null>;
export {};
//# sourceMappingURL=useDerivedMatterConstraint.d.ts.map