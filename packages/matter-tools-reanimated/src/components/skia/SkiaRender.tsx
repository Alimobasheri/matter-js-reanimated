import React from 'react';

export const SkiaRender = React.lazy(async () => {
    const mod = await import('./internal/SkiaRender');
    return { default: mod.SkiaRender };
});
