import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, Text, useTheme, Chip } from 'react-native-paper';

// Mock data for demonstration - replace with your actual data
const users = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'Guia' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Guia' },
  { id: '3', name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'Guia' },
  { id: '4', name: 'Alice Brown', email: 'alice.brown@example.com', role: 'Guia' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie.wilson@example.com', role: 'Guia' },
  { id: '6', name: 'María García', email: 'maria.garcia@example.com', role: 'Guia' },
  { id: '7', name: 'Carlos Rodríguez', email: 'carlos.rodriguez@example.com', role: 'Guia' },
  { id: '8', name: 'Laura Martínez', email: 'laura.martinez@example.com', role: 'Guia' },
  { id: '9', name: 'David Fernández', email: 'david.fernandez@example.com', role: 'Guia' },
  { id: '10', name: 'Ana López', email: 'ana.lopez@example.com', role: 'Guia' },
];

const getRoleColor = (role: string) => {
  switch (role) {
    case 'Administrador':
      return '#FF5252'; // Red
    case 'Guia':
      return '#4CAF50'; // Green
    case 'Turista':
      return '#2196F3'; // Blue
    default:
      return '#757575'; // Grey
  }
};

const GuideList = () => {
  const theme = useTheme();
  // Filter only guides
  const guides = users.filter(user => user.role === 'Guia');

  return (
    <CustomSafeAreaView>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <List.Section>
          {guides.map((guide) => (
            <List.Item
              key={guide.id}
              title={guide.name}
              description={
                <View style={styles.descriptionContainer}>
                  <Text style={styles.emailText}>{guide.email}</Text>
                  <View style={styles.roleContainer}>
                  </View>
                </View>
              }
              left={props => <List.Icon {...props} icon="hiking" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              style={styles.listItem}
            />
          ))}
        </List.Section>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
    marginLeft: 16,
    color: '#2E7D32', // Dark green color for guide theme
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  descriptionContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  emailText: {
    fontSize: 14,
    color: '#666',
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  roleChip: {
    alignSelf: 'flex-start',
  },
});

export default GuideList;