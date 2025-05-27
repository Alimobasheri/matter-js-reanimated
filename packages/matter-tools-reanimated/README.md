# matter-tools-reanimated

A companion library for [`matter-js-reanimated`](https://www.npmjs.com/package/matter-js-reanimated), providing ready-to-use UI-thread physics rendering, gesture interactions, and utilities for React Native apps using `react-native-reanimated`, `react-native-skia`, and `react-native-gesture-handler`.

---

## ✨ Features

- 🧱 **ReanimatedMatter**: Safely initializes `Matter.js` in the UI thread.
- 🔼️ **Render / SkiaRender**: Declarative real-time rendering using either SVG or Skia canvas.
- 🎮 **TouchConstraint**: Drag and manipulate physics bodies using pan gestures.
- 🤪 **Demo**: All-in-one wrapper for quickly testing simulations.
- 🔧 **Bodies** and **Constraints**: Internal SVG representations for live rendering.
- 💡 **Skia Support**: High-performance Skia-based canvas rendering with `SkiaRender` and `SkiaBodies`.
- 🔬 **Hooks**:

  - `useDerivedMatterBody` & `useDerivedMatterConstraint` for live physics state.
  - `useMatterBody` for low-level body access in the UI thread.

- 🧩 **Example Worklets**: Plug-and-play examples:

  - `initBouncingBalls`
  - `initBallPool`
  - `initAvalanche`
  - `initAnimatedDemo` (includes dynamic constraint visuals)

---

## 📦 Installation

```sh
npm install matter-js-reanimated matter-tools-reanimated
```

Peer dependencies:

- `react-native-reanimated >= 3.0.0`
- `react-native-gesture-handler >= 2.0.0`
- `react-native-svg >= 15.0.0`
- `@shopify/react-native-skia` (optional, for Skia rendering)

---

## 🧠 Core Concept

This library simplifies using `matter-js-reanimated` by abstracting rendering, input, and simulation setup into reusable components—all safely running on the UI thread.

---

## 🔌 Usage Example

```tsx
import { Demo } from 'matter-tools-reanimated';
import { initBallPool } from 'matter-tools-reanimated/examples/ballPool';

export default function App() {
  return (
    <Demo
      exampleWorklet={initBallPool}
      options={{
        render: { wireframes: false },
        touch: { enablePan: true },
        skia: true,
      }}
    />
  );
}
```

---

## 🤩 Components & Exports

### `<ReanimatedMatter />`

Initializes and safely mounts a Matter.js engine on the UI thread.

```tsx
<ReanimatedMatter
  engineId="demoEngine"
  worklet={(engine) => {
    'worklet';
  }}
>
  {...children}
</ReanimatedMatter>
```

---

### `<Demo />`

A quick wrapper for testing example worklets with rendering and touch enabled.

```tsx
<Demo
  exampleWorklet={initBallPool}
  options={{
    render: { wireframes: false },
    touch: { enablePan: true, constraint: { stiffness: 0.2, damping: 0.3 } },
    skia: true,
  }}
/>
```

---

### `<Render />` and `<SkiaRender />`

Real-time SVG or Skia rendering of physics bodies and constraints.

```tsx
<Render
  engineId="demoEngine"
  options={{
    wireframes: true,
    background: '#fff',
    showConstraints: true,
  }}
/>
```

---

### `<TouchConstraint />`

Adds drag gestures to interact with physics bodies.

```tsx
<TouchConstraint engineId="demoEngine">
  <Render engineId="demoEngine" />
</TouchConstraint>
```

---

## 🔬 Hooks

### `useDerivedMatterBody` & `useDerivedMatterConstraint`

Extract live physics data as `SharedValue`s on the UI thread.

```ts
const bodyState = useDerivedMatterBody(
  { label: 'signBody' },
  'demoEngine',
  (body) => ({ x: body.position.x, y: body.position.y })
);
```

### `useMatterBody`

Directly access any body's real-time state via `DerivedValue`.

---

## 🤪 Included Examples

- `initBouncingBalls` – Falling and bouncing balls.
- `initBallPool` – Confined dynamic pool of balls and shapes.
- `initAvalanche` – Simulated avalanche on sloped platforms.
- `initAnimatedDemo` – Renders a sign with visual constraints using body and constraint tracking.

---

## 📁 Directory Overview

```
src/
├── components/         // Core physics + rendering components
├── components/skia/    // Skia-based renderers
├── examples/           // Worklet demos
├── hooks/              // Live data hooks for Matter objects
├── screens/            // Example app screens
├── types/              // Global declarations
```

---

## 📝 License

MIT
