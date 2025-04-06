# 🎮 matter-js-reanimated

A **UI-thread-safe**, functional port of [Matter.js](https://github.com/liabru/matter-js), purpose-built to run inside [Reanimated 3](https://docs.swmansion.com/react-native-reanimated/) **worklets** on React Native.

> This is not a renderer.  
> This is not for the browser.  
> This is Matter.js, re-imagined for headless, high-performance React Native physics.

---

## 🚀 Why This Exists

`matter-js-reanimated` is a fork of Matter.js rewritten for the **UI thread** in React Native using **Reanimated 3’s JS runtime and shared memory model**. It enables deterministic, frame-synchronous 2D physics simulations directly inside worklets — perfect for Skia, SVG, or declarative game engines.

---

## 🧠 Key Differences from Matter.js

-   🔄 All classes rewritten as pure functions
-   🎭 Runs inside `runOnUI` worklets
-   🧱 No rendering, no DOM, no Canvas
-   📦 Headless and side-effect-free
-   ⏱ Manually driven via `useFrameCallback`
-   🌐 Injected via `global.Matter` for worklet access
-   📉 Based on Matter.js core but stripped of deprecated or browser-specific APIs

---

## 🧪 Example Usage

```ts
// 1. Inject Matter modules on the UI thread (run this ONCE before anything else)
runOnUI(() => {
    initMatter(); // defines global.Matter
})();

// 2. Ensure global.Matter is initialized before using it
// This must be called AFTER the above runOnUI has completed
runOnUI(() => {
    'worklet';

    if (!global.Matter) {
        console.warn('Matter not initialized yet!');
        return;
    }

    const engine = global.Matter.Engine.create();
    const ball = global.Matter.Bodies.circle(100, 100, 20);

    global.physicsEngine = engine;
    global.ball = ball;

    global.Matter.World.add(engine.world, [ball]);
})();
```

```ts
// 3. Advance physics manually each frame (typically from a frame callback)
useFrameCallback((frame) => {
    runOnUI(() => {
        'worklet';
        global.Matter.Engine.update(global.physicsEngine, frame.delta);
    })();
});
```

```ts
// 4. Access body position from any UI-thread worklet (e.g., derived value, Skia draw, etc.)
const position = useDerivedValue(() => {
    'worklet';
    return {
        x: global.ball.position.x,
        y: global.ball.position.y,
    };
});
```

> 💡 You can also read `global.ball.position` from **any other worklet** (Skia drawing loop, touch gesture, animation, etc). It’s just shared memory.

---

## ✅ What's Implemented

-   [x] `Engine`, `World`, `Body`, `Composite`, `Vector`, `Bounds`, `Sleeping`, etc.
-   [x] Gravity, collision resolution, compound bodies, sleeping
-   [x] Worklet-safe structure using `global.Matter`
-   [x] Hermes-compatible
-   [x] Functional, CommonJS-style output

---

## 🚫 What’s Not Included (Yet)

-   ❌ Rendering (Canvas, DOM, WebGL, etc.)
-   ❌ MatterTools, Events, or mouse support
-   ❌ Lifecycle helpers or automatic tick systems
-   ❌ Plugin system
-   ❌ ESM build or tree-shaking support
-   ❌ Declarative React components (`<PhysicsWorld />`, `<RigidBody />`)

---

## 🧩 Planned Features

-   🧠 Declarative `<RigidBody />`, `<PhysicsWorld />` bindings
-   ⚙️ Skia or SVG bindings via `useBodyTransform()`
-   ⛓ Constraint hooks like `useDistanceConstraint()`
-   🔁 Deterministic stepping and time scaling
-   🔌 Worklet-safe plugin registration

---

## 🛠 Installation

This package is not yet published to npm.

Until then:

```sh
# Copy the JS build file into your RN app
# Add it directly into your source and run `initMatter()` from the UI thread
```

---

## 📦 Build Info

-   Output: CommonJS `.js` file (via Matter.js UMD Webpack config)
-   Works on: React Native + Hermes + Reanimated 3
-   No bundler-specific config yet (e.g., Metro plugin)

---

## 📖 Based On

-   Original [Matter.js](https://github.com/liabru/matter-js) by Liam Brummitt
-   Reanimated 3 worklet runtime
-   Custom internal game engine (WIP)

---

## 📄 License

MIT (Same as original Matter.js)
