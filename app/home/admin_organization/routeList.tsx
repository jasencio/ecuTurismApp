import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { Text, Card, Button, FAB, IconButton, Surface } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomSafeAreaView from "@/components/CustomSafeAreaView";

interface RouteCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  difficulty: string;
  status: 'active' | 'inactive';
  onEdit: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const RouteCard = ({ 
  id, 
  title, 
  description, 
  imageUrl, 
  duration, 
  difficulty, 
  status,
  onEdit, 
  onToggleStatus 
}: RouteCardProps) => {
  const router = useRouter();

  const getDifficultyColor = (level: string) => {
    switch(level.toLowerCase()) {
      case 'fácil': return '#4CAF50';
      case 'moderado': return '#FFC107';
      case 'difícil': return '#F44336';
      default: return '#757575';
    }
  };

  return (
    <Surface style={styles.card} elevation={2}>
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <Text variant="titleMedium" style={styles.cardTitle}>{title}</Text>
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
        <View style={styles.imageContainer}>
          <Card.Cover source={{ uri: imageUrl }} style={styles.cardImage} />
          <View style={[styles.difficultyChip, { backgroundColor: getDifficultyColor(difficulty) }]}>
            <Text style={styles.chipText}>{difficulty}</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <Text variant="bodyMedium" style={styles.description} numberOfLines={2}>
            {description}
          </Text>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="clock-outline" size={20} color="#666" />
              <Text variant="bodySmall" style={styles.detailText}>{duration}</Text>
            </View>
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
          onPress={() => router.push(`/home/admin_organization/routeDetail?id=${id}`)}
          style={styles.viewButton}
        >
          Vista previa
        </Button>
      </View>
    </Surface>
  );
};

const AdminOrganizationRouteList = () => {
  const router = useRouter();

  const sampleRoutes = [
    {
      id: "1",
      title: "Ruta del Río Verde",
      description: "Hermosa ruta de senderismo a través de un frondoso bosque y vistas al río.",
      imageUrl: "https://picsum.photos/700",
      duration: "2 horas",
      difficulty: "Moderado",
      status: 'active' as const
    },
    {
      id: "2",
      title: "Sendero de la Alhambra",
      description: "Paseo histórico por los jardines y bosques que rodean la Alhambra.",
      imageUrl: "https://picsum.photos/701",
      duration: "1.5 horas",
      difficulty: "Fácil",
      status: 'active' as const
    },
    {
      id: "3",
      title: "Cumbre del Veleta",
      description: "Desafiante ruta de alta montaña con vistas espectaculares de la Sierra Nevada.",
      imageUrl: "https://picsum.photos/702",
      duration: "4 horas",
      difficulty: "Difícil",
      status: 'inactive' as const
    }
  ];

  const handleEdit = (id: string) => {
    router.push(`/home/admin_organization/routeEdit?id=${id}`);
  };

  const handleToggleStatus = (id: string) => {
    // TODO: Implement status toggle functionality
    console.log("Toggle status for route:", id);
  };

  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Administra las rutas disponibles para los exploradores
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {sampleRoutes.map((route) => (
            <RouteCard
              key={route.id}
              {...route}
              onEdit={handleEdit}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </ScrollView>

        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => {
            router.push('/home/admin_organization/routeCreate');
          }}
          label="Nueva Ruta"
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
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  cardImage: {
    height: 160,
    borderRadius: 8,
  },
  difficultyChip: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  chipText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  detailsContainer: {
    gap: 8,
  },
  description: {
    color: '#666',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
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

export default AdminOrganizationRouteList;
