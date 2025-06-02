import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ImageSourcePropType,
  useWindowDimensions,
} from "react-native";
import { Button, Card, Text, ActivityIndicator } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import all available images
const locationImages = {
  bikePark: {
    small: require('../assets/images/places/optimized/bike_park_small.jpg'),
    medium: require('../assets/images/places/optimized/bike_park_medium.jpg'),
    large: require('../assets/images/places/optimized/bike_park_large.jpg'),
  },
  sendero1: {
    small: require('../assets/images/places/optimized/sendero1_small.jpg'),
    medium: require('../assets/images/places/optimized/sendero1_medium.jpg'),
    large: require('../assets/images/places/optimized/sendero1_large.jpg'),
  },
  sendero2: {
    small: require('../assets/images/places/optimized/sendero2_small.jpg'),
    medium: require('../assets/images/places/optimized/sendero2_medium.jpg'),
    large: require('../assets/images/places/optimized/sendero2_large.jpg'),
  }
};

// Array of image keys for random selection
const imageKeys = ['bikePark', 'sendero1', 'sendero2'];

interface LocationCardProps {
  title: string;
  description: string;
  address: string;
  imageKey: keyof typeof locationImages;
}

const CustomCard = ({ title, description, address, imageKey }: LocationCardProps) => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  
  // Choose image size based on screen width
  const imageSize = useMemo(() => {
    if (width < 360) return 'small';
    if (width < 768) return 'medium';
    return 'large';
  }, [width]);

  return (
    <TouchableWithoutFeedback onPress={() => router.push("/home/explorer/route/routeList")}>
      <Card style={styles.card} mode="elevated">
        <Card.Cover 
          source={locationImages[imageKey][imageSize]} 
          style={styles.cardImage}
        />
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

type ImageKey = keyof typeof locationImages;

const Locations = () => {
  // Function to get a random image key with proper typing
  const getRandomImageKey = (): ImageKey => {
    const randomIndex = Math.floor(Math.random() * imageKeys.length);
    return imageKeys[randomIndex] as ImageKey;
  };

  const sampleLocations = [
    {
      title: "Bike Park Sierra Nevada",
      description: "Ruta de montaña con impresionantes vistas panorámicas y senderos técnicos para todos los niveles.",
      address: "Carretera de la Sierra Nevada, km 23, 18196 Monachil, Granada",
      imageKey: 'bikePark' as ImageKey
    },
    {
      title: "Sendero del Río Verde",
      description: "Paseo tranquilo junto al río, perfecto para familias y principiantes. Naturaleza exuberante y cascadas.",
      address: "Camino del Río Verde, 18196 Monachil, Granada",
      imageKey: getRandomImageKey()
    },
    {
      title: "Cumbre del Veleta",
      description: "Desafiante ruta de alta montaña con vistas espectaculares de la Sierra Nevada.",
      address: "Pradollano, 18196 Sierra Nevada, Granada",
      imageKey: getRandomImageKey()
    },
    {
      title: "Bosque de la Alhambra",
      description: "Ruta histórica a través de bosques centenarios con vistas a la Alhambra.",
      address: "Calle Real de la Alhambra, s/n, 18009 Granada",
      imageKey: getRandomImageKey()
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
