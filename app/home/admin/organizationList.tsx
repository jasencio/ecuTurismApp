import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, FAB, IconButton, Surface } from 'react-native-paper';
import { useRouter } from 'expo-router';

interface OrganizationCardProps {
  id: string;
  name: string;
  adminName: string;
  adminEmail: string;
  status: 'active' | 'inactive';
  onEdit: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const OrganizationCard = ({ 
  id, 
  name, 
  adminName, 
  adminEmail, 
  status,
  onEdit, 
  onToggleStatus 
}: OrganizationCardProps) => {
  const router = useRouter();

  return (
    <Surface style={styles.card} elevation={2}>
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <Text variant="titleMedium" style={styles.cardTitle}>{name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: status === 'active' ? '#4CAF50' : '#9E9E9E' }]}>
            <Text style={styles.statusText}>{status === 'active' ? 'Activo' : 'Inactivo'}</Text>
          </View>
        </View>
        <IconButton
          icon={status === 'active' ? 'eye-off' : 'eye'}
          size={20}
          onPress={() => onToggleStatus(id)}
        />
      </View>

      <View style={styles.cardContent}>
        <View style={styles.detailsContainer}>
          <View style={styles.adminSection}>
            <Text variant="titleSmall" style={styles.sectionTitle}>Administrador</Text>
            <Text variant="bodyMedium" style={styles.adminName}>{adminName}</Text>
            <Text variant="bodySmall" style={styles.adminEmail}>{adminEmail}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardActions}>
        <Button 
          mode="outlined" 
          onPress={() => onEdit(id)}
          style={styles.editButton}
          icon="pencil"
        >
          Editar
        </Button>
        <Button 
          mode="contained" 
          onPress={() => router.push("/home/admin/organizationList")}
          style={styles.viewButton}
        >
          Ver detalles
        </Button>
      </View>
    </Surface>
  );
};

const OrganizationList = () => {
  const router = useRouter();

  const organizations = [
    { 
      id: '1', 
      name: 'Explora Sierra Nevada', 
      adminName: 'Juan Pérez', 
      adminEmail: 'juan.perez@explorasierranevada.com',
      status: 'active' as const
    },
    { 
      id: '2', 
      name: 'Aventuras Naturales', 
      adminName: 'María García', 
      adminEmail: 'maria.garcia@aventurasnaturales.com',
      status: 'active' as const
    },
    { 
      id: '3', 
      name: 'Senderos del Sur', 
      adminName: 'Carlos Rodríguez', 
      adminEmail: 'carlos.rodriguez@senderosdelsur.com',
      status: 'inactive' as const
    },
    { 
      id: '4', 
      name: 'Montaña Viva', 
      adminName: 'Ana Martínez', 
      adminEmail: 'ana.martinez@montanaviva.com',
      status: 'active' as const
    },
    { 
      id: '5', 
      name: 'Rutas Andaluzas', 
      adminName: 'Pedro López', 
      adminEmail: 'pedro.lopez@rutasandaluzas.com',
      status: 'active' as const
    },
  ];

  const handleEdit = (id: string) => {
    // TODO: Implement edit functionality
    console.log("Edit organization:", id);
  };

  const handleToggleStatus = (id: string) => {
    // TODO: Implement status toggle functionality
    console.log("Toggle status for organization:", id);
  };

  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Administra las organizaciones registradas en la plataforma
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {organizations.map((org) => (
            <OrganizationCard
              key={org.id}
              {...org}
              onEdit={handleEdit}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </ScrollView>

        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => {
            // TODO: Implement new organization creation
            console.log("Create new organization");
          }}
          label="Nueva Organización"
        />
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
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subtitle: {
    color: '#666',
    marginTop: 4,
  },
  content: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 80, // Extra padding for FAB
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
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
  cardContent: {
    padding: 12,
  },
  detailsContainer: {
    gap: 12,
  },
  adminSection: {
    gap: 4,
  },
  sectionTitle: {
    color: '#666',
    marginBottom: 4,
  },
  adminName: {
    color: '#1a1a1a',
    fontWeight: '500',
  },
  adminEmail: {
    color: '#666',
  },
  cardActions: {
    flexDirection: 'row',
    padding: 12,
    paddingTop: 0,
    gap: 8,
  },
  editButton: {
    flex: 1,
  },
  viewButton: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default OrganizationList;
