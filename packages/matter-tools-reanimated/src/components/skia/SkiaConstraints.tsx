import React from 'react';

export const SkiaConstraints = React.lazy(async () => {
  const mod = await import('./internal/SkiaConstraints');
  return { default: mod.SkiaConstraints };
});
