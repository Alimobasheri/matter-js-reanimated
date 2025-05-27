import React from 'react';

export const SkiaBodies = React.lazy(async () => {
    const mod = await import('./internal/SkiaBodies');
    return { default: mod.SkiaBodies };
});
