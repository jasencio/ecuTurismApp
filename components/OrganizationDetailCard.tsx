import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, useTheme, IconButton } from 'react-native-paper';

export interface OrganizationDetailCardProps {
  name: string;
  description: string;
  adminName: string;
  adminEmail: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  onEdit?: () => void;
}

const OrganizationDetailCard: React.FC<OrganizationDetailCardProps> = ({
  name,
  description,
  adminName,
  adminEmail,
  phone,
  address,
  status,
  createdAt,
  updatedAt,
  onEdit,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text variant="titleLarge" style={[styles.title, { color: theme.colors.onSurface }]}> 
            {name}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: status === 'active' ? '#4CAF50' : '#9E9E9E' }]}> 
            <Text style={styles.statusText}>
              {status === 'active' ? 'Activo' : 'Inactivo'}
            </Text>
          </View>
        </View>
        {onEdit && (
          <IconButton
            icon="pencil"
            size={24}
            onPress={onEdit}
          />
        )}
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
              {description}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}> 
              Dirección:
            </Text>
            <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.onSurface }]}> 
              {address}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}> 
              Teléfono:
            </Text>
            <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.onSurface }]}> 
              {phone}
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
              {adminName}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}> 
              Email:
            </Text>
            <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.onSurface }]}> 
              {adminEmail}
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
              {createdAt}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}> 
              Última actualización:
            </Text>
            <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.onSurface }]}> 
              {updatedAt}
            </Text>
          </View>
        </Surface>
      </ScrollView>
    </View>
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

export default OrganizationDetailCard; 