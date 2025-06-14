import { useFocusEffect, useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { loadingOrganizationsListSelector, organizationsListSelector } from "@/selectors/explorerSelector";
import { Organization } from "@/types/Organization";
import LoadingScreen from "@/components/LoadingScreen";
import { getOrganizations } from "@/slices/explorerSlice";
import { AppDispatch } from "@/store";
import { sessionDataSelector } from "@/selectors/sessionSelector";

interface LocationCardProps {
  organization: Organization;
}

const CustomCard = ({ organization }: LocationCardProps) => {
  const router = useRouter();
  const { description, address, name, image } = organization;
  const publicUrl = image?.publicUrl;

  const handleViewDetail = () => {
    router.push({
      pathname: "/home/explorer/route/routeList",
      params: { id: organization.id }
    })
  }


  return (
    <TouchableWithoutFeedback onPress={() => router.push("/home/explorer/route/routeList")}>
      <Card style={styles.card} mode="elevated">
        <Card.Cover 
          source={{ uri: publicUrl }} 
          style={styles.cardImage}
        />
        <Card.Content style={styles.cardContent}>
          <Text variant="titleLarge" style={styles.cardTitle}>{name}</Text>
          <Text variant="bodyMedium" style={styles.description} numberOfLines={2}>
            {description}
          </Text>
          
          <View style={styles.addressContainer}>
            <MaterialCommunityIcons name="map-marker" size={20} color="#666" />
            <Text variant="bodySmall" style={styles.addressText} numberOfLines={2}>
              {address}
            </Text>
          </View>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button 
            mode="contained" 
            onPress={() => handleViewDetail()}
            style={styles.viewButton}
          >
            Ver detalles
          </Button>
        </Card.Actions>
      </Card>
    </TouchableWithoutFeedback>
  );
};

const Locations = () => {

  const organizations = useSelector(organizationsListSelector);
  const loading = useSelector(loadingOrganizationsListSelector);
  const sessionData = useSelector(sessionDataSelector);
  const dispatch = useDispatch<AppDispatch>();

  const getOrganizationsData = React.useCallback(() => {
    if (sessionData) {
      dispatch(getOrganizations());
    }
  }, [sessionData, dispatch]);

  // Fetch when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      getOrganizationsData();
    }, [getOrganizationsData])
  );

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        ¿Dónde deseas explorar hoy?
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Descubre las mejores rutas y senderos de la naturaleza
      </Text>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {organizations?.map((organization, index) => (
          <CustomCard key={index} organization={organization} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    marginHorizontal: 16,
    marginTop: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subtitle: {
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
    color: '#666',
  },
  content: {
    padding: 16,
    paddingTop: 8,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardImage: {
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#666',
    marginBottom: 12,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 8,
    backgroundColor: '#f8f8f8',
    padding: 8,
    borderRadius: 8,
  },
  addressText: {
    color: '#666',
    flex: 1,
  },
  cardActions: {
    padding: 8,
    paddingTop: 0,
  },
  viewButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default Locations;
