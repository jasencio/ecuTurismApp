import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import LottieAnimation from './LottieAnimation';
import { Environtments } from '@/types/Environtments';

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
  animationSource?: any;
}
const environment = process.env.EXPO_PUBLIC_ENVIRONMENT;
const LoadingScreen: React.FC<LoadingScreenProps> = ({
  fullScreen = true,
  animationSource
}) => {

  const finalSource = animationSource || require('../assets/animations/nature-loading.json');

  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      {environment === Environtments.DEVELOPMENT
        ? <Text>Cargando...</Text> :
        <LottieAnimation
          source={finalSource}
          width={120}
          height={120}
          autoPlay
          loop
        />
      }
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