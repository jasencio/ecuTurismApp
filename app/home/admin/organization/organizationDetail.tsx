import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, useTheme, IconButton } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Mock data - replace with actual API call
const getOrganization = (id: string) => ({
  id,
  name: 'Explora Sierra Nevada',
  description: 'Organización dedicada a la exploración y conservación de la Sierra Nevada.',
  adminName: 'Juan Pérez',
  adminEmail: 'juan.perez@explorasierranevada.com',
  phone: '+34 123 456 789',
  address: 'Calle Principal 123, Granada',
  status: 'active' as const,
  createdAt: '2024-01-15',
  updatedAt: '2024-03-20',
});

const OrganizationDetail = () => {
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const organization = getOrganization(id);

  const handleEdit = () => {
    router.push({
      pathname: "/home/admin/organization/organizationEdit",
      params: { id }
    });
  };

  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text variant="titleLarge" style={[styles.title, { color: theme.colors.onSurface }]}>
              {organization.name}
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: organization.status === 'active' ? '#4CAF50' : '#9E9E9E' }]}>
              <Text style={styles.statusText}>
                {organization.status === 'active' ? 'Activo' : 'Inactivo'}
              </Text>
            </View>
          </View>
          <IconButton
            icon="pencil"
            size={24}
            onPress={handleEdit}
          />
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Surface style={[styles.section, { backgroundColor: theme.colors.surface }]} elevation={1}>
            <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Información General
            </Text>
            <View style={styles.infoRow}>
              <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
                Descripción:
              </Text>
              <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.onSurface }]}>
                {organization.description}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
                Dirección:
              </Text>
              <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.onSurface }]}>
                {organization.address}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
                Teléfono:
              </Text>
              <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.onSurface }]}>
                {organization.phone}
              </Text>
            </View>
          </Surface>

          <Surface style={[styles.section, { backgroundColor: theme.colors.surface }]} elevation={1}>
            <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Administrador
            </Text>
            <View style={styles.infoRow}>
              <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
                Nombre:
              </Text>
              <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.onSurface }]}>
                {organization.adminName}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
                Email:
              </Text>
              <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.onSurface }]}>
                {organization.adminEmail}
              </Text>
            </View>
          </Surface>

          <Surface style={[styles.section, { backgroundColor: theme.colors.surface }]} elevation={1}>
            <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Información del Sistema
            </Text>
            <View style={styles.infoRow}>
              <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
                Creado:
              </Text>
              <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.onSurface }]}>
                {organization.createdAt}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
                Última actualización:
              </Text>
              <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.onSurface }]}>
                {organization.updatedAt}
              </Text>
            </View>
          </Surface>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  section: {
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  infoRow: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
  },
  value: {
    fontWeight: '500',
  },
});

export default OrganizationDetail; 