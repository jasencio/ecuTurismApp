import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface LocationCardProps {
  title: string;
  description: string;
  imageUrl: string;
  address: string;
}

const CustomCard = ({ title, description, imageUrl, address }: LocationCardProps) => {
  const router = useRouter();

  return (
    <TouchableWithoutFeedback onPress={() => router.push("/home/explorer/route/routeList")}>
      <Card style={styles.card} mode="elevated">
        <Card.Cover source={{ uri: imageUrl }} style={styles.cardImage} />
        <Card.Content style={styles.cardContent}>
          <Text variant="titleLarge" style={styles.cardTitle}>{title}</Text>
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
            onPress={() => router.push("/home/explorer/route/routeList")}
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
  const sampleLocations = [
    {
      title: "Bike Park Sierra Nevada",
      description: "Ruta de montaña con impresionantes vistas panorámicas y senderos técnicos para todos los niveles.",
      imageUrl: "https://picsum.photos/700",
      address: "Carretera de la Sierra Nevada, km 23, 18196 Monachil, Granada"
    },
    {
      title: "Sendero del Río Verde",
      description: "Paseo tranquilo junto al río, perfecto para familias y principiantes. Naturaleza exuberante y cascadas.",
      imageUrl: "https://picsum.photos/701",
      address: "Camino del Río Verde, 18196 Monachil, Granada"
    },
    {
      title: "Cumbre del Veleta",
      description: "Desafiante ruta de alta montaña con vistas espectaculares de la Sierra Nevada.",
      imageUrl: "https://picsum.photos/702",
      address: "Pradollano, 18196 Sierra Nevada, Granada"
    },
    {
      title: "Bosque de la Alhambra",
      description: "Ruta histórica a través de bosques centenarios con vistas a la Alhambra.",
      imageUrl: "https://picsum.photos/703",
      address: "Calle Real de la Alhambra, s/n, 18009 Granada"
    }
  ];

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
        {sampleLocations.map((location, index) => (
          <CustomCard key={index} {...location} />
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
