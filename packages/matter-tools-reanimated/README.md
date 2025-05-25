# matter-tools-reanimated

`matter-tools-reanimated` is a utility toolkit built on top of [`matter-js-reanimated`](https://www.npmjs.com/package/matter-js-reanimated), a React Native port of the Matter.js physics engine for the UI thread. This package adds developer-friendly components and utilities for rendering, interaction, and experimentation with physics-based scenes in React Native apps using `react-native-reanimated` and `react-native-gesture-handler`.

---

## ✨ Features

- 🔧 `Render`: Live SVG or Skia-based physics renderer using Reanimated.
- 🎮 `Touch`: Adds drag to physics bodies.
- 🧪 `Demo`: Plug-and-play interactive physics scenes.
- 🧱 `ReanimatedMatter`: Wrapper Component for initializing Matter.js safely in the UI thread.
- 📦 Examples: Includes demo scenes like `BouncingBalls`, `BallPool`, and `Avalanche`.

---

## 📦 Installation

Ensure your project uses:

- `react-native-reanimated >= 3.0.0`
- `react-native-gesture-handler`
- `react-native-svg`
- `react-native-skia` (optional if you don't want to use Skia)

Then install:

npm install matter-js-reanimated matter-tools-reanimated

---

## 🧠 Core Concept

`matter-tools-reanimated` assumes Matter.js is used in the **UI thread**. It wraps common patterns (rendering, interaction, setup) into reusable components so you can focus on the simulation logic.

---

## 🔌 Usage

```js
import { Demo } from 'matter-tools-reanimated';
import { initBouncingBalls } from 'matter-tools-reanimated/examples/BouncingBalls';

export default function App() {
  return (
    <Demo
      exampleWorklet={initBouncingBalls}
      options={{
        render: { wireframes: true },
        touch: { constraint: { stiffness: 0.2, damping: 0.3 } },
        skia: true,
      }}
    />
  );
}
```

---

## 🧩 Exports

### `Demo`

Interactive container that sets up a Matter.js engine and runs a simulation.

```js
<Demo
  exampleWorklet={(engine) => {
    'workelt';
    /* worklet to create bodies */
  }}
  options={{
    render: {
      wireframes: true,
      background: '#fff',
      width: 400,
      height: 800,
    },
    touch: {
      enablePan: true,
      constraint: {
        stiffness: 0.2,
        damping: 0.3,
      },
    },
  }}
/>
```

---

### `Render`

Renders the current physics world using SVG and Reanimated.

```js
<Render
  engineId="demoEngine"
  options={{
    wireframes: true,
    background: '#f0f0f0',
    width: 300,
    height: 500,
  }}
/>
```

---

### `Touch`

Gesture handler that allows dragging, pinching, and rotating bodies.

```js
<Touch
  engineId="demoEngine"
  options={{
    enablePan: true,
    enablePinch: true,
    enableRotate: true,
    constraint: {
      stiffness: 0.1,
      damping: 0.2,
    },
  }}
>
  <Render engineId="demoEngine" />
</Touch>
```

---

## 🧪 Examples

The package includes the following worklet demos:

- `initBouncingBalls`
- `initBallPool`
- `initAvalanche`

You can import and use them with `<Demo />`.

---

## 📁 Folder Structure

- `src/components`: Core components (`Render`, `Demo`, `TouchConstraint`, `ReanimatedMatter`)
- `src/examples`: Prebuilt demo scenes
- `src/worklets`: Internal touch constraint utilities
- `lib`: Compiled output

---

## 📝 License

MIT
