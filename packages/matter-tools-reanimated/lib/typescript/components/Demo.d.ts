import React from 'react';
import { RenderProps } from './Render';
interface DemoProps {
    exampleWorklet: (engine: any) => void;
    options?: {
        render?: RenderProps['options'];
        touch?: {
            constraint?: MatterReanimated.IConstraintDefinition;
            enablePan?: boolean;
        };
        skia?: boolean;
    };
}
export declare const Demo: React.FC<DemoProps>;
export {};
//# sourceMappingURL=Demo.d.ts.map