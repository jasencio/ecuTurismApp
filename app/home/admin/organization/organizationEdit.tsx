import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, useTheme, Surface, Switch } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AdminSearch from '@/components/AdminSearch';

interface User {
  id: string;
  name: string;
  email: string;
}

// Mock data - replace with actual API call
const getOrganization = (id: string) => ({
  id,
  name: 'Explora Sierra Nevada',
  description: 'Organización dedicada a la exploración y conservación de la Sierra Nevada.',
  adminId: '1',
  adminName: 'Juan Pérez',
  adminEmail: 'juan.perez@explorasierranevada.com',
  phone: '+34 123 456 789',
  address: 'Calle Principal 123, Granada',
  status: 'active' as const,
});

const OrganizationEdit = () => {
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const initialData = getOrganization(id);

  const [formData, setFormData] = useState({
    name: initialData.name,
    description: initialData.description,
    adminId: initialData.adminId,
    adminName: initialData.adminName,
    adminEmail: initialData.adminEmail,
    phone: initialData.phone,
    address: initialData.address,
    status: initialData.status === 'active',
  });

  const handleAdminSelect = (user: User) => {
    setFormData(prev => ({
      ...prev,
      adminId: user.id,
      adminName: user.name,
      adminEmail: user.email,
    }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving organization:', { ...formData, status: formData.status ? 'active' : 'inactive' });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  const initialAdmin = {
    id: initialData.adminId,
    name: initialData.adminName,
    email: initialData.adminEmail,
  };

  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Surface style={[styles.section, { backgroundColor: theme.colors.surface }]} elevation={1}>
            <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Información General
            </Text>
            
            <TextInput
              label="Nombre de la organización"
              value={formData.name}
              onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label="Descripción"
              value={formData.description}
              onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
              style={styles.input}
              mode="outlined"
              multiline
              numberOfLines={3}
            />

            <TextInput
              label="Dirección"
              value={formData.address}
              onChangeText={(text) => setFormData(prev => ({ ...prev, address: text }))}
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label="Teléfono"
              value={formData.phone}
              onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
              style={styles.input}
              mode="outlined"
              keyboardType="phone-pad"
            />
          </Surface>

          <Surface style={[styles.section, { backgroundColor: theme.colors.surface }]} elevation={1}>
            <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Administrador
            </Text>

            <AdminSearch onSelect={handleAdminSelect} initialValue={initialAdmin} />
          </Surface>

          <Surface style={[styles.section, { backgroundColor: theme.colors.surface }]} elevation={1}>
            <View style={styles.statusContainer}>
              <Text variant="titleMedium" style={[styles.statusLabel, { color: theme.colors.onSurface }]}>
                Estado
              </Text>
              <View style={styles.switchContainer}>
                <Text style={[styles.statusText, { color: theme.colors.onSurfaceVariant }]}>
                  {formData.status ? 'Activo' : 'Inactivo'}
                </Text>
                <Switch
                  value={formData.status}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                />
              </View>
            </View>
          </Surface>

          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={handleCancel}
              style={[styles.button, styles.cancelButton]}
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              onPress={handleSave}
              style={[styles.button, styles.saveButton]}
              disabled={!formData.adminId}
            >
              Guardar
            </Button>
          </View>
        </ScrollView>
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  section: {
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    borderColor: '#666',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
});

export default OrganizationEdit; 