import { useFocusEffect, useRouter } from "expo-router";
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
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { getRoutes } from "@/slices/adminCompanyRouteSlice";
import { sessionDataSelector } from "@/selectors/sessionSelector";
import { selectLoadingRoutesList, selectRoutesList } from "@/selectors/adminCompanyRouteSelector";
import LoadingScreen from "@/components/LoadingScreen";
import { getDifficultyColor, getDifficultyTranslation, Hardness, Route } from "@/types/Route";

interface RouteCardProps {
  id: string;
  route: Route;
  onEdit: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const RouteCard = ({ 
  id, 
  route,
  onEdit, 
  onToggleStatus 
}: RouteCardProps) => {
  const router = useRouter();
  const { name,description,minutes,hardness, mainImage,isActive } = route || {};

  return (
    <Surface style={styles.card} elevation={2}>
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <Text variant="titleMedium" style={styles.cardTitle}>{name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: isActive ? '#4CAF50' : '#9E9E9E' }]}>
            <Text style={styles.statusText}>{isActive ? 'Activo' : 'Inactivo'}</Text>
          </View>
        </View>
        <IconButton
          icon={isActive? 'eye-off' : 'eye'}
          size={20}
          onPress={() => onToggleStatus(id)}
        />
      </View>

      <View style={styles.cardContent}>
        <View style={styles.imageContainer}>
          <Card.Cover source={{ uri: mainImage?.publicUrl }} style={styles.cardImage} />
          <View style={[styles.difficultyChip, { backgroundColor: getDifficultyColor(hardness || undefined) }]}>
            <Text style={styles.chipText}>{getDifficultyTranslation(hardness || undefined)}</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <Text variant="bodyMedium" style={styles.description} numberOfLines={2}>
            {description}
          </Text>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="clock-outline" size={20} color="#666" />
              <Text variant="bodySmall" style={styles.detailText}>{minutes} minutos</Text>
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

  const isLoadingRoutesList = useSelector(selectLoadingRoutesList);
  const routesList = useSelector(selectRoutesList);
  const sessionData = useSelector(sessionDataSelector);
  const dispatch = useDispatch<AppDispatch>();


  const getRoutesData = React.useCallback(() => {
    if (sessionData) {
      dispatch(getRoutes());
    }
  }, [sessionData, dispatch]);

  // Fetch when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      getRoutesData();
    }, [getRoutesData])
  );

  if (isLoadingRoutesList) {
    return <LoadingScreen />;
  }


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
          {routesList?.map((route: Route) => (
            <RouteCard
              key={route.id}
              id={route.id}
              route={route}
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
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

