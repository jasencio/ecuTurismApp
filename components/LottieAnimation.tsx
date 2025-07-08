import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

interface LottieAnimationProps {
  source: any; // Lottie animation source (require('./path/to/animation.json'))
  autoPlay?: boolean;
  loop?: boolean;
  speed?: number;
  style?: any;
  width?: number;
  height?: number;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  source,
  autoPlay = true,
  loop = true,
  speed = 1,
  style,
  width = 200,
  height = 200,
}) => {
  return (
    <View style={[styles.container, style]}>
      <LottieView
        source={source}
        autoPlay={autoPlay}
        loop={loop}
        speed={speed}
        style={{ width, height }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LottieAnimation; 