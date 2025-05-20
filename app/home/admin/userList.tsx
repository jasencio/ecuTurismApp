import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Text, useTheme } from 'react-native-paper';

// Mock data for demonstration - replace with your actual data
const users = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'Administrador' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Guia' },
  { id: '3', name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'Turista' },
  { id: '4', name: 'Alice Brown', email: 'alice.brown@example.com', role: 'Guia' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie.wilson@example.com', role: 'Turista' },
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

const UserList = () => {
  const theme = useTheme();

  return (
    <CustomSafeAreaView>
      {/* <Text variant="headlineMedium" style={styles.title}>Usuarios</Text> */}
      <List.Section>
        {users.map((user) => (
          <List.Item
            key={user.id}
            title={user.name}
            description={
              <View style={styles.descriptionContainer}>
                <Text style={styles.emailText}>{user.email}</Text>
                <View style={[styles.roleContainer, { backgroundColor: getRoleColor(user.role) }]}>
                  <Text style={styles.roleText}>{user.role}</Text>
                </View>
              </View>
            }
            left={props => <List.Icon {...props} icon="account" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            style={styles.listItem}
          />
        ))}
      </List.Section>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  descriptionContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  emailText: {
    fontSize: 14,
    color: '#666',
  },
  roleContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  roleText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default UserList;
