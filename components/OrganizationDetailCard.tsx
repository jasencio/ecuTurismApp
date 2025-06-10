import { Organization } from '@/types/Organization';
import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Surface, useTheme, IconButton } from 'react-native-paper';

export interface OrganizationDetailCardProps {
  organization?: Organization;
  onEdit?: () => void;
}

const OrganizationDetailCard: React.FC<OrganizationDetailCardProps> = ({
  organization,
  onEdit,
}) => {
  const theme = useTheme();
  const { name, description, phone, address, isActive, createdAt, updatedAt, image } = organization ?? {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text variant="titleLarge" style={[styles.title, { color: theme.colors.onSurface }]}> 
            {name}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: isActive ? '#4CAF50' : '#9E9E9E' }]}> 
            <Text style={styles.statusText}>
              {isActive ? 'Activo' : 'Inactivo'}
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
        {image?.publicUrl && (
          <Surface style={[styles.imageContainer, { backgroundColor: theme.colors.surface }]} elevation={1}>
            <Image
              source={{ uri: image.publicUrl }}
              style={styles.organizationImage}
              resizeMode="cover"
            />
          </Surface>
        )}

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
    alignItems: 'flex-start',
    padding: 16,
    paddingBottom: 8,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginRight: 8,
  },
  title: {
    fontWeight: 'bold',
    flexShrink: 1,
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
  imageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  organizationImage: {
    width: '100%',
    height: 200,
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