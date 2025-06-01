import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import React from 'react';
import { View, StyleSheet, ScrollView, Linking } from 'react-native';
import { Text, useTheme, Card, Button, IconButton } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Mock data - In a real app, this would come from your backend
const mockGuides = [
  { 
    id: '1', 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    phone: '+34 612 345 678',
    role: 'Guia',
    specialties: ['Senderismo', 'Montañismo'],
    experience: '5 años',
    languages: ['Español', 'Inglés'],
    status: 'Disponible'
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    phone: '+34 623 456 789',
    role: 'Guia',
    specialties: ['Escalada', 'Espeleología'],
    experience: '3 años',
    languages: ['Español', 'Francés'],
    status: 'En ruta'
  },
  { 
    id: '3', 
    name: 'Bob Johnson', 
    email: 'bob.johnson@example.com', 
    phone: '+34 634 567 890',
    role: 'Guia',
    specialties: ['Ciclismo', 'Kayak'],
    experience: '7 años',
    languages: ['Español', 'Inglés', 'Alemán'],
    status: 'Disponible'
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Disponible':
      return '#4CAF50'; // Green
    case 'En ruta':
      return '#FF9800'; // Orange
    case 'No disponible':
      return '#F44336'; // Red
    default:
      return '#757575'; // Grey
  }
};

const GuideDetail = () => {
  const theme = useTheme();
  const router = useRouter();
  const { guideId } = useLocalSearchParams();

  // Find guide from mock data
  const guide = mockGuides.find(g => g.id === guideId);

  if (!guide) {
    return (
      <CustomSafeAreaView>
        <Text>Guía no encontrado</Text>
      </CustomSafeAreaView>
    );
  }

  const handleCall = () => {
    Linking.openURL(`tel:${guide.phone.replace(/\s/g, '')}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${guide.email}`);
  };

  return (
    <CustomSafeAreaView>
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.header}>
              <View style={styles.nameContainer}>
                <Text variant="headlineMedium" style={styles.name}>{guide.name}</Text>
                <View style={[styles.statusContainer, { backgroundColor: getStatusColor(guide.status) }]}>
                  <Text style={styles.statusText}>{guide.status}</Text>
                </View>
              </View>
            </View>

            <View style={styles.contactSection}>
              <View style={styles.contactItem}>
                <IconButton icon="phone" size={24} onPress={handleCall} />
                <View style={styles.contactTextContainer}>
                  <Text variant="titleSmall">Teléfono</Text>
                  <Text style={styles.contactText}>{guide.phone}</Text>
                </View>
              </View>

              <View style={styles.contactItem}>
                <IconButton icon="email" size={24} onPress={handleEmail} />
                <View style={styles.contactTextContainer}>
                  <Text variant="titleSmall">Email</Text>
                  <Text style={styles.contactText}>{guide.email}</Text>
                </View>
              </View>
            </View>

            <View style={styles.infoSection}>
              <Text variant="titleMedium" style={styles.sectionTitle}>Información Profesional</Text>
              
              <View style={styles.infoItem}>
                <Text variant="titleSmall">Experiencia</Text>
                <Text style={styles.infoText}>{guide.experience}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text variant="titleSmall">Especialidades</Text>
                <View style={styles.chipContainer}>
                  {guide.specialties.map((specialty, index) => (
                    <View key={index} style={styles.chip}>
                      <Text style={styles.chipText}>{specialty}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.infoItem}>
                <Text variant="titleSmall">Idiomas</Text>
                <View style={styles.chipContainer}>
                  {guide.languages.map((language, index) => (
                    <View key={index} style={[styles.chip, styles.languageChip]}>
                      <Text style={styles.chipText}>{language}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  header: {
    marginBottom: 24,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  name: {
    flex: 1,
  },
  statusContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  contactSection: {
    marginBottom: 24,
    gap: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactTextContainer: {
    flex: 1,
  },
  contactText: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    gap: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  infoItem: {
    gap: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  languageChip: {
    backgroundColor: '#E8F5E9',
  },
  chipText: {
    color: '#1976D2',
    fontSize: 14,
  },
});

export default GuideDetail; 