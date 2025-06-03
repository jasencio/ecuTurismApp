import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, Text, useTheme, Surface } from 'react-native-paper';
import { useRouter } from 'expo-router';

// Mock data for demonstration - replace with your actual data
const guides = [
  { 
    id: '1', 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    phone: '+34 612 345 678',
    role: 'Guia',
    status: 'Disponible'
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    phone: '+34 623 456 789',
    role: 'Guia',
    status: 'En ruta'
  },
  { 
    id: '3', 
    name: 'Bob Johnson', 
    email: 'bob.johnson@example.com', 
    phone: '+34 634 567 890',
    role: 'Guia',
    status: 'Disponible'
  },
  { 
    id: '4', 
    name: 'Alice Brown', 
    email: 'alice.brown@example.com', 
    phone: '+34 645 678 901',
    role: 'Guia',
    status: 'No disponible'
  },
  { 
    id: '5', 
    name: 'Charlie Wilson', 
    email: 'charlie.wilson@example.com', 
    phone: '+34 656 789 012',
    role: 'Guia',
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

const GuideList = () => {
  const theme = useTheme();
  const router = useRouter();

  const handleGuidePress = (guideId: string) => {
    router.push(`/home/admin_organization/guideDetail?guideId=${guideId}`);
  };

  return (
    <CustomSafeAreaView>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <List.Section>
          {guides.map((guide) => (
            <Surface
              key={guide.id}
              style={styles.listItemContainer}
              elevation={0}
            >
              <List.Item
                title={
                  <View style={styles.titleContainer}>
                    <Text style={styles.nameText}>{guide.name}</Text>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(guide.status) }]} />
                  </View>
                }
                description={
                  <View style={styles.descriptionContainer}>
                    <View style={styles.contactContainer}>
                      <Text style={styles.contactText}>{guide.email}</Text>
                      <Text style={styles.contactText}>{guide.phone}</Text>
                    </View>
                  </View>
                }
                right={props => (
                  <List.Icon {...props} icon="chevron-right" color="#666" />
                )}
                style={styles.listItem}
                onPress={() => handleGuidePress(guide.id)}
              />
            </Surface>
          ))}
        </List.Section>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  listItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: 'white',
  },
  listItem: {
    paddingVertical: 4,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '500',
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  contactContainer: {
    flex: 1,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  contactText: {
    fontSize: 13,
    color: '#666',
  },
});

export default GuideList;