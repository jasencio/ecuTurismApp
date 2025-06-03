import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Surface, Chip, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomSafeAreaView from '@/components/CustomSafeAreaView';

const mockRoute = {
  title: 'Ruta del Río Verde',
  description: 'Hermosa ruta de senderismo a través de un frondoso bosque y vistas al río.',
  imageUrl: 'https://picsum.photos/700',
  duration: '2 horas',
  difficulty: 'Moderado',
  status: 'active',
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'fácil': return '#4CAF50';
    case 'moderado': return '#FFC107';
    case 'difícil': return '#F44336';
    default: return '#757575';
  }
};

const RouteDetailScreen = () => {
  const theme = useTheme();
  const { title, description, imageUrl, duration, difficulty, status } = mockRoute;
  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <Surface style={styles.imageShadow} elevation={4}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </Surface>
        <Surface style={styles.section} elevation={2}>
          <Text variant="titleLarge" style={styles.title}>{title}</Text>
          <View style={styles.chipRow}>
            <Chip
              icon={() => <MaterialCommunityIcons name="run" color="white" size={18} />}
              style={[styles.chip, { backgroundColor: getDifficultyColor(difficulty) }]}
              textStyle={styles.chipText}
            >
              {difficulty}
            </Chip>
            <Chip
              icon={() => <MaterialCommunityIcons name={status === 'active' ? 'check-circle' : 'close-circle'} color="white" size={18} />}
              style={[styles.chip, { backgroundColor: status === 'active' ? '#4CAF50' : '#9E9E9E' }]}
              textStyle={styles.chipText}
            >
              {status === 'active' ? 'Activo' : 'Inactivo'}
            </Chip>
          </View>
          <Text variant="bodyMedium" style={styles.description}>{description}</Text>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="clock-outline" size={20} color={theme.colors.primary} style={styles.infoIcon} />
            <Text variant="bodyMedium" style={styles.infoText}>Duración: <Text style={styles.value}>{duration}</Text></Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="run" size={20} color={getDifficultyColor(difficulty)} style={styles.infoIcon} />
            <Text variant="bodyMedium" style={styles.infoText}>Dificultad: <Text style={styles.value}>{difficulty}</Text></Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name={status === 'active' ? 'check-circle' : 'close-circle'} size={20} color={status === 'active' ? '#4CAF50' : '#9E9E9E'} style={styles.infoIcon} />
            <Text variant="bodyMedium" style={styles.infoText}>Estado: <Text style={styles.value}>{status === 'active' ? 'Activo' : 'Inactivo'}</Text></Text>
          </View>
        </Surface>
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  imageShadow: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 16,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 24,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  chip: {
    marginRight: 8,
    borderRadius: 16,
    height: 32,
    alignItems: 'center',
  },
  chipText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  description: {
    marginBottom: 16,
    color: '#444',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    color: '#333',
  },
  value: {
    color: '#222',
    fontWeight: 'bold',
  },
});

export default RouteDetailScreen; 