# Matter.js Reanimated

[![npm version](https://badge.fury.io/js/matter-js-reanimated.svg)](https://www.npmjs.com/package/matter-js-reanimated)
[![npm downloads](https://img.shields.io/npm/dw/matter-js-reanimated)](https://www.npmjs.com/package/matter-js-reanimated)
[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT)

A React Native wrapper for Matter.js physics engine using Reanimated for high-performance animations.

## Packages

This monorepo contains the following packages:

1. **matter-js-reanimated**: Core Matter.js integration with Reanimated
2. **matter-tools-reanimated**: React Native components and utilities for Matter.js
3. **demo**: Expo app demonstrating the capabilities of the library

## Features

- 🚀 High-performance physics simulation using Reanimated worklets
- 🧩 Rewritten physics examples of original matter-js (avalanche, ball pool, bridge, car, etc.)
- 📱 Native performance on both iOS and Android
- 🎮 Interactive demos with touch support

## Documentation

Head over to README sections for [matter-js-reanimted](https://github.com/Alimobasheri/matter-js-reanimated/blob/dev/packages/matter-js-reanimated/README.md).

And for [matter-tools-reanimated](https://github.com/Alimobasheri/matter-js-reanimated/blob/dev/packages/matter-tools-reanimated/README.md)

## Installation

### Installing `matter-js-reanimted`

```bash
npm i matter-js-reanimated
```

### Installing `matter-tools-reanimted`

```bash
npm i matter-tools-reanimted matter-js-reanimated react-native-reanimated react-native-gesture-handler react-native-svg
```

## Development

### Installing dependencies

```bash
# Using yarn workspaces
yarn install
```

### Running the demo app

```bash
yarn workspace demo start
```

### Building packages

```bash
yarn workspace matter-js-reanimated build
yarn workspace matter-tools-reanimated build
```

## Usage

### Import components from the published packages:

```javascript
import { Demo } from 'matter-tools-reanimated';
import { myWorklet } from './myAwesomePhysicsWorklet';

function PhysicsDemo() {
  return <Demo exampleWorklet={myWorklet} />;
}
```

## Examples

The demo app includes numerous physics examples from original `matter-js` library ported to use `matter-js-reanimated`:

- Air Friction

- Avalanche

- Ball Pool

- Bridge

- Car

- Catapult

- Chains

- Cloth

- Ragdoll

And many more...

## Contributing

Contributions are welcome! Please follow these guidelines:

- Fork the repository

- Create a feature branch

- Submit a pull request

Before contributing, please read the CONTRIBUTING.md file.

## License

This project is licensed under the same terms as the original Matter.js license.

## Demo App

The demo app is going to be available on Expo.
