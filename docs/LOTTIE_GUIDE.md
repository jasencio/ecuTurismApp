# Lottie Animation Guide

This guide explains how to use Lottie animations in the ExploreNatureApp.

## What is Lottie?

Lottie is a library that renders After Effects animations in real-time. It allows you to use high-quality animations created in After Effects directly in your React Native app.

## Installation

Lottie has been installed in this project:
```bash
npm install lottie-react-native
```

## Available Animations

### 1. Tree Blinking Animation (`assets/animations/tree-blinking.json`) - **DEFAULT**
- Cute tree with blinking eyes and smile
- Default animation for loading screens
- Perfect for nature-themed apps
- Green leaves, brown trunk, friendly face

### 2. Basic Loading Animation (`assets/animations/loading.json`)
- Simple spinning circle animation
- Blue color scheme
- Classic loading indicator

### 3. Nature Loading Animation (`assets/animations/nature-loading.json`)
- Tree growing animation with trunk and leaves
- Green and brown color scheme
- Growth effect animation

## How to Use

### Basic Usage

```tsx
import LottieAnimation from '../components/LottieAnimation';

// Use default blinking tree animation
<LottieAnimation
  source={require('../assets/animations/tree-blinking.json')}
  width={120}
  height={120}
/>
```

### Advanced Usage

```tsx
<LottieAnimation
  source={require('../assets/animations/tree-blinking.json')}
  width={150}
  height={150}
  speed={0.8}
  loop={true}
  autoPlay={true}
/>
```

### In LoadingScreen Component

The `LoadingScreen` component now uses the blinking tree animation by default:

```tsx
// Use default blinking tree animation
<LoadingScreen message="Cargando datos..." />

// Use custom animation
<LoadingScreen 
  message="Explorando naturaleza..." 
  animationSource={require('../assets/animations/nature-loading.json')}
/>
```

## Component Props

### LottieAnimation Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `source` | `any` | Required | Lottie animation JSON file |
| `autoPlay` | `boolean` | `true` | Whether to start animation automatically |
| `loop` | `boolean` | `true` | Whether to loop the animation |
| `speed` | `number` | `1` | Animation speed multiplier |
| `style` | `StyleProp` | `undefined` | Additional styles |
| `width` | `number` | `200` | Animation width |
| `height` | `number` | `200` | Animation height |

### LoadingScreen Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | `"Cargando..."` | Loading message |
| `fullScreen` | `boolean` | `true` | Whether to show as full screen overlay |
| `animationSource` | `any` | Tree blinking animation | Custom Lottie animation |

## Finding Lottie Animations

You can find free Lottie animations from:
- [LottieFiles](https://lottiefiles.com/) - Official marketplace
- [IconScout](https://iconscout.com/lotties) - Free and premium animations
- [LottieFlow](https://lottiefiles.com/featured) - Featured animations

## Adding New Animations

1. Download the Lottie JSON file
2. Place it in `assets/animations/` directory
3. Import and use it in your components:

```tsx
const myAnimation = require('../assets/animations/my-animation.json');

<LottieAnimation source={myAnimation} />
```

## Performance Tips

1. **Optimize file size**: Compress JSON files when possible
2. **Use appropriate sizes**: Don't make animations larger than needed
3. **Limit concurrent animations**: Too many animations can impact performance
4. **Consider device capabilities**: Test on lower-end devices

## Example Usage in App

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import LoadingScreen from '../components/LoadingScreen';

const MyScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      {isLoading && (
        <LoadingScreen 
          message="Cargando mapa de naturaleza..."
          animationSource={require('../assets/animations/tree-blinking.json')}
        />
      )}
      {/* Your app content */}
    </View>
  );
};
```

## Troubleshooting

### Animation not playing
- Check if `autoPlay` is set to `true`
- Verify the JSON file is valid
- Ensure the file path is correct

### Animation too large/small
- Adjust `width` and `height` props
- Use `style` prop for additional sizing

### Performance issues
- Reduce animation complexity
- Lower the `speed` prop
- Consider using `loop={false}` for one-time animations 