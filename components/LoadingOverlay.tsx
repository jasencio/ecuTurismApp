import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { Portal } from 'react-native-paper';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible, message }) => {
  if (!visible) return null;

  return (
    <Portal>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color="#0000ff" />
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default LoadingOverlay; 