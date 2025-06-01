import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme, Button, Portal, Dialog, RadioButton, Card } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Mock data - In a real app, this would come from your backend
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'Administrador' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Administrador de compania' },
  { id: '3', name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'Guia' },
  { id: '4', name: 'Alice Brown', email: 'alice.brown@example.com', role: 'Turista' },
  // ... other users
];

const getRoleColor = (role: string) => {
  switch (role) {
    case 'Administrador':
      return '#FF5252'; // Red
    case 'Administrador de compania':
      return '#FF9800'; // Orange
    case 'Guia':
      return '#4CAF50'; // Green
    case 'Turista':
      return '#2196F3'; // Blue
    default:
      return '#757575'; // Grey
  }
};

const UserDetail = () => {
  const theme = useTheme();
  const router = useRouter();
  const { userId } = useLocalSearchParams();
  const [selectedRole, setSelectedRole] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  // Find user from mock data
  const user = mockUsers.find(u => u.id === userId);

  if (!user) {
    return (
      <CustomSafeAreaView>
        <Text>User not found</Text>
      </CustomSafeAreaView>
    );
  }

  const handleSave = () => {
    // Here you would typically make an API call to update the user's role
    console.log('Saving new role:', selectedRole);
    setShowSaveDialog(false);
    // Navigate back to user list
    router.back();
  };

  const roles = [
    { value: 'Administrador', label: 'Administrador', description: 'Acceso completo al sistema' },
    { value: 'Administrador de compania', label: 'Administrador de Compañía', description: 'Gestión de compañía y guías' },
    { value: 'Guia', label: 'Guía', description: 'Gestión de rutas y turistas' },
    { value: 'Turista', label: 'Turista', description: 'Acceso a rutas y reservas' },
  ];

  return (
    <CustomSafeAreaView>
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.header}>
              <Text variant="headlineMedium" style={styles.name}>{user.name}</Text>
              <View style={[styles.roleContainer, { backgroundColor: getRoleColor(user.role) }]}>
                <Text style={styles.roleText}>{user.role}</Text>
              </View>
            </View>

            <View style={styles.infoSection}>
              <Text variant="titleMedium" style={styles.sectionTitle}>Email</Text>
              <Text style={styles.emailText}>{user.email}</Text>
            </View>

            <View style={styles.roleSection}>
              <Text variant="titleMedium" style={styles.sectionTitle}>Cambiar Rol</Text>
              <RadioButton.Group
                onValueChange={value => setSelectedRole(value)}
                value={selectedRole || user.role}
              >
                {roles.map((role) => (
                  <Card
                    key={role.value}
                    style={[
                      styles.roleCard,
                      (selectedRole || user.role) === role.value && styles.selectedRoleCard
                    ]}
                    onPress={() => setSelectedRole(role.value)}
                  >
                    <Card.Content style={styles.roleCardContent}>
                      <View style={styles.roleCardLeft}>
                        <RadioButton.Android value={role.value} />
                        <View style={styles.roleCardTextContainer}>
                          <Text variant="titleMedium" style={styles.roleLabel}>
                            {role.label}
                          </Text>
                          <Text variant="bodySmall" style={styles.roleDescription}>
                            {role.description}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={[
                          styles.roleIndicator,
                          { backgroundColor: getRoleColor(role.value) }
                        ]}
                      />
                    </Card.Content>
                  </Card>
                ))}
              </RadioButton.Group>
            </View>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={() => setShowSaveDialog(true)}
          style={styles.saveButton}
          disabled={selectedRole === user.role || !selectedRole}
        >
          Guardar Cambios
        </Button>

        <Portal>
          <Dialog visible={showSaveDialog} onDismiss={() => setShowSaveDialog(false)}>
            <Dialog.Title>Confirmar Cambio de Rol</Dialog.Title>
            <Dialog.Content>
              <Text>¿Estás seguro de que deseas cambiar el rol de {user.name} a {selectedRole}?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShowSaveDialog(false)}>Cancelar</Button>
              <Button onPress={handleSave}>Guardar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
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
  name: {
    marginBottom: 8,
  },
  roleContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  roleText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  emailText: {
    fontSize: 16,
    color: '#666',
  },
  roleSection: {
    marginBottom: 24,
  },
  roleCard: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedRoleCard: {
    borderColor: '#2196F3',
    borderWidth: 2,
  },
  roleCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roleCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  roleCardTextContainer: {
    marginLeft: 8,
    flex: 1,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  roleDescription: {
    color: '#666',
    marginTop: 2,
  },
  roleIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  saveButton: {
    marginTop: 8,
    marginBottom: 24,
  },
});

export default UserDetail; 