import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import React from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import {
  Text,
  Button,
  FAB,
  IconButton,
  Surface,
} from "react-native-paper";
import { useFocusEffect, useRouter } from "expo-router";
import { fetchOrganizations } from "@/slices/organizationSlice";
import { useDispatch, useSelector } from "react-redux";
import { sessionDataSelector } from "@/selectors/sessionSelector";
import { AppDispatch } from "@/store";
import { loadingOrganizationsListSelector, organizationsListSelector } from "@/selectors/organizationSelector";
import LoadingScreen from "@/components/LoadingScreen";
import { Organization } from "@/types/Organization";

interface OrganizationCardProps {
  organization: Organization;
  onEdit: (id: string, event: any) => void;
  onToggleStatus: (id: string) => void;
}

const OrganizationCard = ({
  organization,
  onEdit,
  onToggleStatus,
}: OrganizationCardProps) => {
  
  const router = useRouter();
  const { id, name, address, image, isActive } = organization ?? {};

  const handleOrganizationDetail = () => {
    router.push({
      pathname: "/home/admin/organization/organizationDetail",
      params: { id: organization.id },
    });
  };

  return (
    <Surface style={styles.card} elevation={2}>
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <Text variant="titleMedium" style={styles.cardTitle}>
            {name}
          </Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: isActive ? "#4CAF50" : "#9E9E9E" },
            ]}
          >
            <Text style={styles.statusText}>
              {isActive ? "Activo" : "Inactivo"}
            </Text>
          </View>
        </View>
        <IconButton
          icon={isActive ? "eye-off" : "eye"}
          size={20}
          onPress={() => onToggleStatus(id)}
        />
      </View>

      <View style={styles.cardContent}>
        <View style={styles.detailsContainer}>
          {image?.publicUrl && (
            <Image
              source={{ uri: image.publicUrl }}
              style={styles.organizationImage}
              resizeMode="cover"
            />
          )}
          <View style={styles.addressSection}>
            <Text variant="titleSmall" style={styles.sectionTitle}>
              Dirección
            </Text>
            <Text variant="bodyMedium" style={styles.addressText}>
              {address}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.cardActions}>
        <Button
          mode="outlined"
          onPress={(event) => onEdit(id, event)}
          style={styles.editButton}
          icon="pencil"
        >
          Editar
        </Button>
        <Button
          mode="contained"
          onPress={handleOrganizationDetail}
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
  const dispatch = useDispatch<AppDispatch>();
  const sessionData = useSelector(sessionDataSelector);
  const isLoadingOrganizationsList = useSelector(loadingOrganizationsListSelector);
  const organizationsList = useSelector(organizationsListSelector);

  const fetchUsersData = React.useCallback(() => {
    if (sessionData) {
      dispatch(fetchOrganizations());
    }
  }, [sessionData, dispatch]);

  // Fetch when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchUsersData();
    }, [fetchUsersData])
  );

  if (isLoadingOrganizationsList) {
    return <LoadingScreen />;
  }

  const handleOrganizationPress = (orgId: string) => {
    router.push({
      pathname: "/home/admin/organization/organizationDetail",
      params: { id: orgId },
    });
  };

  const handleEditPress = (orgId: string, event: any) => {
    event.stopPropagation();
    router.push({
      pathname: "/home/admin/organization/organizationEdit",
      params: { id: orgId },
    });
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
          {organizationsList?.map((org) => (
            <OrganizationCard
              key={org.id}
              organization={org}
              onEdit={handleEditPress}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </ScrollView>

        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => {
            router.push("/home/admin/organization/organizationCreate");
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
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  subtitle: {
    color: "#666",
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
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardTitle: {
    fontWeight: "bold",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  cardContent: {
    padding: 12,
  },
  detailsContainer: {
    gap: 12,
  },
  organizationImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  addressSection: {
    gap: 4,
  },
  sectionTitle: {
    color: "#666",
    marginBottom: 4,
  },
  addressText: {
    color: "#1a1a1a",
    fontWeight: "500",
  },
  cardActions: {
    flexDirection: "row",
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
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default OrganizationList;
