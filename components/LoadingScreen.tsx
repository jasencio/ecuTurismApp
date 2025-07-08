import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import LottieAnimation from './LottieAnimation';

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
  animationSource?: any;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Cargando...", 
  fullScreen = true,
  animationSource
}) => {
  // Default blinking tree animation if none provided
  const defaultAnimation = require('../assets/animations/nature-loading.json');
  
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <LottieAnimation
        source={animationSource || defaultAnimation}
        width={120}
        height={120}
      />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
});

export default LoadingScreen; 