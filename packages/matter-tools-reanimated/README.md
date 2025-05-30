# `matter-tools-reanimated`

[![npm version](https://badge.fury.io/js/my-awesome-package.svg)](https://www.npmjs.com/package/matter-tools-reanimated)
[![npm downloads](https://img.shields.io/npm/dw/my-awesome-package)](https://www.npmjs.com/package/matter-tools-reanimated)
[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT)

A companion library for [`matter-js-reanimated`](https://github.com/Alimobasheri/matter-js-reanimated/tree/dev/packages/matter-js-reanimated), providing ready-to-use UI-thread physics rendering, gesture interactions, and utilities for React Native apps using `react-native-reanimated`, `react-native-skia`, and `react-native-gesture-handler`.

## ✨ Features

- 🧱 ReanimatedMatter: Safely initializes Matter.js on the UI thread, ensuring the physics engine is ready before your components attempt to use it.

- 🎨 Render / SkiaRender: Declarative real-time rendering of physics bodies and constraints. Choose between:

  `Render`: Uses `react-native-svg` for rendering.

  `SkiaRender`: Leverages `@shopify/react-native-skia` for potentially higher performance canvas-based rendering.

- 🤏 TouchConstraint: Enables intuitive drag-and-manipulate interactions with physics bodies using pan gestures, powered by react-native-gesture-handler.

- 🚀 Runner: A dedicated component to drive the Matter.js engine update loop efficiently using useFrameCallback from Reanimated.

- 🧩 Demo: An all-in-one wrapper component for quickly setting up and testing physics simulations with rendering and touch interactions enabled. Ideal for prototyping and showcasing examples.

- 🖼️ Bodies / SkiaBodies: Internal components that handle the visual representation of Matter.js bodies for SVG and Skia renderers respectively.

- 🔗 Constraints / SkiaConstraints: Internal components for visualizing Matter.js constraints in SVG and Skia.

- 🪝 Hooks for Live Physics Data:

  `useInitWorklet`: Hook to manage the initialization of your Matter.js engine on the UI side and custom setup logic within a Reanimated worklet.

  `useDerivedMatterBody`: Access and react to live properties (position, angle, etc.) of a specific Matter.js body as a Reanimated SharedValue.

  `useDerivedMatterConstraint`: Similar to useDerivedMatterBody, but for tracking live properties of a specific Matter.js constraint.

  `useMatterBody`: A lower-level hook to get a DerivedValue representing the state of a Matter.js body, useful for more complex scenarios.

## 📦 Installation

First, ensure you have the main `matter-js-reanimated` library installed:

```sh
npm install matter-js-reanimated
# or
yarn add matter-js-reanimated
```

Then, install `matter-tools-reanimated`:

```sh
npm install matter-tools-reanimated
# or
yarn add matter-tools-reanimated
```

### Peer Dependencies

This library relies on several peer dependencies which you need to install and configure in your project:

- `react-native-reanimated` >= 3.0.0

- `react-native-gesture-handler` >= 2.0.0

- `react-native-svg` >= 15.0.0 (if using the Render component)

- `@shopify/react-native-skia` (optional, required if using SkiaRender components)

Follow the installation instructions for each of these libraries in their respective documentation.

## 🧠 Core Concept

`matter-tools-reanimated` aims to bridge the powerful `matter-js-reanimated` core (which runs `Matter.js` on the UI thread) with practical `React Native` components. It abstracts away the complexities of setting up **rendering, handling touch input for physics interactions, and managing the engine's update loop**, allowing you to focus on building your physics-based experiences. All physics calculations and rendering updates are designed to run **smoothly** on the UI thread, **minimizing frame drops** on the JS thread.

## 📖 Documentation & Guides

### 1. Getting Started: Basic Setup

Here's how to set up a simple physics scene using the Demo component:

`setupWorldWorklet.tsx`:

```tsx
export const setupWorldWorklet = (
  engine: Matter.Engine,
  width: number = 800,
  height: numebr = 800
) => {
  'worklet';
  // Access Matter Modules from `global.Matter`, registered by `matter-js-reanimated`.
  const { Bodies, Composites, World } = global.Matter;

  // Add bodies
  // Create stack of circles with low friction and restitution
  const stack = Composites.stack(
    20,
    20,
    20,
    5,
    0,
    0,
    (x: number, y: number) => {
      return Bodies.circle(x, y, Math.random() * (20 - 10) + 10, {
        friction: 0.00001,
        restitution: 0.5,
        density: 0.001,
      });
    }
  );

  World.add(engine.world, stack);

  // Set gravity
  engine.gravity.y = 1;

  // You can add more custom bodies, constraints, etc., here
  // For example, adding a static ground:
  // const ground = global.Matter.Bodies.rectangle(width / 2, height - 30, width, 60, { isStatic: true });
  // World.add(engine.world, ground);
};
```

`App.tsx`:

```tsx
import React, { useCallback } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Demo } from 'matter-tools-reanimated';
import { setupWorldWorklet } from './setupWorldWorklet';
import Matter from 'matter-js';

export default function App() {
  const { width, height } = useWindowDimensions();

  // This worklet will be executed on the UI thread to set up your Matter.js world.
  const setupPhysicsWorld = useCallback(
    (engine: Matter.Engine) => {
      'worklet';
      // Initialize your custom setup
      initBallPool(engine, width, height);
    },
    [width, height]
  );

  return (
    <View style={styles.container}>
      <Demo
        exampleWorklet={setupPhysicsWorld}
        options={{
          render: {
            // Options for the renderer
            wireframes: false, // Set to true to see body outlines
            background: '#f0f0f0',
            // width: width, // Optional: defaults to window width
            // height: height, // Optional: defaults to window height
          },
          touch: {
            // Options for touch interactions
            enablePan: true, // Enable dragging bodies
            constraint: { stiffness: 0.2, damping: 0.1 }, // Properties for the touch constraint
          },
          skia: true, // Set to true to use SkiaRender, false for SVG Render
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Fallback background
  },
});
```

### 2. Core Components

#### `<ReanimatedMatter />`

The foundation for using `matter-js-reanimated`. It ensures `Matter.js` is initialized on the UI thread and creates a `Matter.js` engine instance.

Props:

- engineId (string, optional, default: 'defaultEngine'): A unique ID for the Matter.js engine instance. Useful if you need multiple physics simulations.

- worklet ((engine: Matter.Engine) => void, optional): A Reanimated worklet function that receives the initialized Matter.js engine. This is where you define your physics world (add bodies, constraints, set gravity, etc.).

children: React.ReactNode.

Usage:

```tsx
import { ReanimatedMatter } from 'matter-tools-reanimated';
import Matter from 'matter-js'; // For type

const myPhysicsSetup = (engine: Matter.Engine) => {
  'worklet';
  // Add bodies, constraints, etc. to engine.world
  const box = global.Matter.Bodies.rectangle(100, 100, 80, 80);
  global.Matter.World.add(engine.world, box);
};

// ...
<ReanimatedMatter engineId="myCustomEngine" worklet={myPhysicsSetup}>
  {/* Rendering and interaction components go here */}
</ReanimatedMatter>;
```

#### `<Runner />`

Drives the `Matter.js` engine's update loop. It uses `useFrameCallback` to update the engine on each frame, ensuring smooth animation. This component is typically used internally by Render and SkiaRender but can be used standalone if you manage rendering yourself.

Props:

- engineId (string): The ID of the engine to run.

- options (RunnerOptions, optional): Configuration for the runner (e.g., delta, enabled).

- enabled (boolean, default: true): Whether the runner should update the engine.

See [src/components/Runner.tsx](https://github.com/Alimobasheri/matter-js-reanimated/blob/dev/packages/matter-tools-reanimated/src/components/Runner.tsx) for more `RunnerOptions`.

Note: The `Demo`, `Render`, and `SkiaRender` components automatically include and manage a `Runner`.

#### `<Render />` (SVG-based)

Renders the physics bodies and constraints from the specified `Matter.js` engine using `react-native-svg`.

Props:

- engineId (string, default: 'physicsEngine'): The ID of the Matter.js engine to render.

- options (RenderProps['options'], optional): Rendering options.

- width (number, optional): Width of the render canvas (default: window width).

- height (number, optional): Height of the render canvas (default: window height).

- background (string, optional): Background color (default: 'transparent').

- wireframes (boolean, optional, default: true): Render bodies as wireframes.

- showConstraints (boolean, optional, default: false): Whether to render constraints.

- [! NOT IMPLEMENTED YET]: showBounds, showAxes, showPositions, showAngleIndicator (booleans, optional): More debug visuals (Note: these might need explicit implementation or are part of Matter.js's own render options not fully exposed here).

Usage:

```tsx
<ReanimatedMatter worklet={myPhysicsSetup} engineId="scene1">
  <Render
    engineId="scene1"
    options={{ wireframes: false, background: 'lightblue' }}
  />
</ReanimatedMatter>
```

#### `<SkiaRender />` (Skia-based)

Similar to `Render`, but uses `@shopify/react-native-skia` for rendering. This offers better performance for complex scenes.

Props: Same as `<Render />`.

Usage:

```tsx
// Ensure @shopify/react-native-skia is installed and configured
<ReanimatedMatter worklet={myPhysicsSetup} engineId="scene1">
  <SkiaRender
    engineId="scene1"
    options={{ wireframes: false, background: 'lightgreen' }}
  />
</ReanimatedMatter>
```

Note: `SkiaRender` and its sub-components (`SkiaBodies`, `SkiaConstraints`) use `React.lazy`. Ensure you have a `React.Suspense` fallback if needed.

#### `<TouchConstraint />`

Adds touch-based interaction (dragging) to bodies in the physics simulation. It creates a `Touch Constraint` taht is similar to `Matter.js` mouse constraint that follows user gestures. Uses `react-native-gesture-handler` for best performance on UI thread.

Props:

- engineId (string, default: 'defaultEngine'): The ID of the engine to apply touch interactions to.

- options (object, optional):

constraint (Matter.IConstraintDefinition, optional): Custom properties for the underlying Matter.js constraint (e.g., stiffness, damping).

enabled (boolean, optional, default: true): Enable or disable touch interactions.

children: React.ReactNode (typically your Render or SkiaRender component).

Usage:

```tsx
<ReanimatedMatter worklet={myPhysicsSetup} engineId="interactiveScene">
  <TouchConstraint
    engineId="interactiveScene"
    options={{ constraint: { stiffness: 0.1 } }}
  >
    <SkiaRender engineId="interactiveScene" />
  </TouchConstraint>
</ReanimatedMatter>
```

Important: `<TouchConstraint>` must wrap your rendering component. It uses `GestureHandlerRootView` internally.

#### `<Demo />`

A convenience component that bundles `ReanimatedMatter`, a renderer (`Render` or `SkiaRender` based on passed props), `TouchConstraint`, and `Runner`. Perfect for quickly testing examples.

Props:

- exampleWorklet ((engine: Matter.Engine) => void): The worklet function to set up the physics scene.

- options (object, optional):

render (RenderProps['options'], optional): Options passed to the renderer.

touch (object, optional): Options for TouchConstraint.

constraint (Matter.IConstraintDefinition, optional).

enablePan (boolean, optional, default: true).

skia (boolean, optional, default: false): If true, uses SkiaRender; otherwise, uses Render.

### 3. Hooks for Live Data

These hooks allow you to get live data from your physics simulation on the UI thread and use it to drive other Reanimated animations or UI updates.

#### `useInitWorklet(worklet, engineId)`

Manages the initialization of your Matter.js engine and runs your setup worklet.

Parameters:

- worklet ((engine: Matter.Engine) => void, optional): Your physics setup function.

- engineId (string, optional, default: 'defaultEngine'): ID for the engine.

Returns: boolean - true once the worklet has been executed and the engine is initialized.

Usage: Often used internally by `ReanimatedMatter` or if you need to control initialization sequence.

#### `useDerivedMatterBody(identifier, engineId, process)`

Tracks a specific body and extracts data from it as a `SharedValue`.

Parameters:

- identifier ({ id: number } | { label: string }): How to find the body (by its Matter.js `id` or `label`).

- engineId (string): The engine ID.

- process ((body: Matter.Body) => T): A worklet function that takes the Matter.js body and returns the data you want to track (e.g., { x: body.position.x, y: body.position.y }).

Returns: SharedValue<T | null> - A shared value containing the processed data.

Example: See [src/screens/components/Sign.tsx](https://github.com/Alimobasheri/matter-js-reanimated/blob/dev/packages/matter-tools-reanimated/src/screens/components/Sign.tsx) for animating a React Native `<View>` based on a physics body's position and angle.

#### `useDerivedMatterConstraint(identifier, engineId, process)`

Similar to `useDerivedMatterBody`, but for tracking Matter.js constraints.

Parameters:

- identifier ({ id: number } | { label: string }): How to find the constraint.

- engineId (string): The engine ID.

- process ((constraint: Matter.Constraint) => T): A worklet function to extract data from the constraint.

Returns: SharedValue<T | null>.

Example: See [src/screens/components/Sign.tsx](https://github.com/Alimobasheri/matter-js-reanimated/blob/dev/packages/matter-tools-reanimated/src/screens/components/Sign.tsx) for drawing lines representing constraints.

#### `useMatterBody(bodyId)`

A lower-level hook providing a DerivedValue of a body's state.

Parameters:

bodyId (string): The (global) ID under which the body is registered (less common usage pattern).

Returns: DerivedValue<MatterBodyState> - Contains position, angle, bounds, vertices.

### 4. Writing Your Own Physics Worklets

A "worklet" in this context is a JavaScript function that you annotate with 'worklet';. Reanimated can then run this function on the UI thread.

```tsx
import Matter from 'matter-js'; // For types

// This function will run on the UI thread.
export const myCustomPhysicsSetup = (engine: Matter.Engine) => {
  'worklet';

  // Access screen dimensions (if set globally, e.g., in the component calling Demo/ReanimatedMatter)
  const width = global.windowWidth || 800;
  const height = global.windowHeight || 600;

  // Access Matter.js modules via `global.Matter`
  const { Bodies, World, Composite } = global.Matter;

  // Create bodies
  const ground = Bodies.rectangle(width / 2, height - 30, width, 60, {
    isStatic: true,
    label: 'ground',
  });
  const boxA = Bodies.rectangle(width / 2 - 50, height / 2, 80, 80, {
    label: 'boxA',
  });
  const circleB = Bodies.circle(width / 2 + 50, height / 2 - 100, 40, {
    restitution: 0.9,
    label: 'circleB',
  });

  // Add bodies to the world
  World.add(engine.world, [ground, boxA, circleB]);

  // Set engine gravity
  engine.gravity.y = 1;
  engine.gravity.scale = 0.001; // Adjust as needed

  // You can also add constraints, composites, etc.
  // const constraint = global.Matter.Constraint.create({ ... });
  // World.add(engine.world, constraint);
};
```

Key points for worklets:

- 'worklet'; Directive: Must be the first statement in the function body.

- global.Matter: Access Matter.js modules (Bodies, World, Constraint, etc.) through `global.Matter`.

- global.windowWidth, global.windowHeight: If you need screen dimensions, pass them from your component to these global variables before the worklet runs. The Demo component and examples often do this.

No React Native Components/APIs: You cannot directly use React Native components or most React Native APIs (like StyleSheet or useState) inside a worklet because it runs on a different thread. Use hooks like `useDerivedMatterBody` to bridge data back to the React component tree. You can use `react-native-reanimated` built-in hooks like `useDerivedValue` and `useAnimatedStyle`, or `useFrameCallback` to access Matter.js from `global.Matter`.

#### 5. Performance Considerations

- Skia vs. SVG: For scenes with a large number of bodies or complex shapes, SkiaRender generally offers better performance than Render (SVG). Profile your app to determine the best choice.

- Body Complexity: Simpler shapes (circles, rectangles) are less computationally intensive than complex polygons.

- Number of Bodies: Fewer bodies will naturally lead to better performance.

- Collision Detection: Optimize collision filters (body.collisionFilter) to prevent unnecessary collision checks.

- Sleeping: Matter.js's sleeping mechanism (engine.enableSleeping = true) can significantly improve performance by putting static or slow-moving bodies to "sleep," reducing computations. The `Runner` component enables this by default in the engine creation.

- Wireframes: Rendering wireframes is generally faster than rendering filled shapes with styles.

## 🛠️ Potential Missing Features & Future Development

This library provides a solid foundation, but here are areas that could be expanded or features that could be added in the future:

- Advanced Collision Event Handling: While matter-js-reanimated core handles collisions, dedicated hooks or component props within matter-tools-reanimated to easily subscribe to collision events (onCollisionStart, onCollisionActive, onCollisionEnd) directly from the UI thread could be beneficial.

- Sensor Components/Utilities: Helpers for creating and managing Matter.js sensor bodies (bodies that detect collisions but don't have a physical response).

- Enhanced Debugging Tools: Beyond basic wireframes, more advanced visual debugging options like:

- Displaying center of mass.

- Visualizing velocity vectors.

- Showing contact points.

- Rendering the broad-phase collision detection grid.

- Time Manipulation Controls: Components or hooks to easily control the simulation's time scale (slow-motion, fast-forward, pause/resume) by interacting with the `Runner` or `Engine`.

- Camera/Viewport Controls: Utilities or components for implementing pan and zoom functionality for the physics view, especially if the simulation world is larger than the screen.

- Declarative Composite Body Components: While Matter.js provides Composites (e.g., stack, chain, car), React components that allow declarative creation of these common structures could simplify scene setup.

Example: `<Composite type="stack" x={100} y={100} columns={5} rows={5} ... />`

- Granular Body Interactions: Beyond dragging with TouchConstraint, support for other touch events on individual bodies (e.g., tap, long-press) with corresponding hooks or callbacks.

- State Serialization/Deserialization Helpers: Utilities to simplify saving and loading the state of the Matter.js world, making it easier to implement features like game saves or level persistence.

- Pre-styled/Behavioral Body Components: Higher-level components like <PlatformBody>, <BouncyBall>, <StaticBoundary> that come with pre-configured Matter.js options and rendering styles.

- Haptic Feedback Integration: Options to easily trigger haptic feedback on collisions or interactions via expo-haptics or similar.

- Improved Documentation for Advanced Scenarios: More examples and guides for complex physics interactions, custom rendering techniques, and optimization strategies for very large scenes.

- Automated Testing Utilities: Helper functions or a testing framework tailored for matter-js-reanimated to make it easier to write unit and integration tests for physics-based interactions.

## 🤪 Included Examples

Explore the src/examples/ directory for various worklet setups:

initBouncingBalls: Simple bouncing balls.

initBallPool: A pool of balls and polygons.

initAvalanche: Stacked circles creating an avalanche effect.

initCloth: A basic cloth simulation.

initConstraints: Demonstrates different types of constraints.

initAnimatedDemo: Shows how to link animated UI elements to physics bodies and constraints using the provided hooks.

To run these, you can modify the exampleWorklet prop in the Demo component within src/screens/TestScreen.tsx or your own application.

## 📁 Directory Overview

src/
├── components/ # Core React components (ReanimatedMatter, Render, TouchConstraint, etc.)
│ └── skia/ # Skia-specific rendering components
│ └── internal/ # Internal implementations for lazy-loaded Skia components
├── examples/ # Ready-to-use worklet functions for various physics demos
├── hooks/ # Reanimated hooks for interacting with Matter.js (useInitWorklet, useDerivedMatterBody, etc.)
├── screens/ # Example screens used for testing/demonstrating the library (internal to the package for dev)
├── types/ # Global TypeScript declarations used within the package
└── index.ts # Main export file for the library

## 🤝 Contributing

Contributions are welcome! Please refer to the main CONTRIBUTING.md in the root of the monorepo. When contributing to this package:

- Ensure your code runs efficiently on the UI thread.

- Write clear documentation for new components or hooks.

- Add examples if you introduce new significant features.

- Maintain consistency with the existing architecture.

📝 License
MIT. See the LICENSE file in the `matter-js-reanimated` package for more details.
