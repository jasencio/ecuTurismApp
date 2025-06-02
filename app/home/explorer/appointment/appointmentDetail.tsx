import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, Dimensions, StyleSheet, ScrollView, View } from "react-native";
import { Text, Card, useTheme, IconButton, Surface, Divider } from "react-native-paper";

const { height } = Dimensions.get("window");

export default function AppointmentDetail() {
  const navigation = useNavigation();
  const theme = useTheme();

  const imageUrl = "https://picsum.photos/700"; // Replace with your own image URL

  const data = {
    location: "Bike Park",
    route: "Sendero 1",
    address: "Av. XYZ y Av. Abc",
    description:
      "Hermosa ruta de senderismo a través de un frondoso bosque y vistas al río.",
    minutes: 120,
    hardness: "Moderado",
    date: "01/05/2025",
    time: "09:00 am",
    visitors: 10,
  };
  const {
    description,
    minutes,
    hardness,
    location,
    route,
    address,
    date,
    time,
    visitors,
  } = data;

  useEffect(() => {
    navigation.setOptions({ headerBackTitle: "Atras" });
  }, [navigation]);

  const InfoSection = ({ title, content, icon }: { title: string; content: string; icon: string }) => (
    <View style={styles.infoSection}>
      <View style={styles.infoHeader}>
        <IconButton icon={icon} size={24} iconColor={theme.colors.primary} />
        <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
          {title}
        </Text>
      </View>
      <Text variant="bodyMedium" style={[styles.sectionContent, { color: theme.colors.onSurfaceVariant }]}>
        {content}
      </Text>
    </View>
  );

  return (
    <CustomSafeAreaView>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <Surface style={[styles.imageOverlay, { backgroundColor: theme.colors.surface }]}>
          <Text variant="headlineMedium" style={[styles.locationTitle, { color: theme.colors.onSurface }]}>
            {location}
          </Text>
          <Text variant="titleMedium" style={[styles.routeTitle, { color: theme.colors.primary }]}>
            {route}
          </Text>
        </Surface>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={1}>
          <Card.Content style={styles.cardContent}>
            <InfoSection 
              title="Dirección" 
              content={address} 
              icon="map-marker"
            />
            <Divider style={[styles.divider, { backgroundColor: theme.colors.outlineVariant }]} />
            <InfoSection 
              title="Descripción" 
              content={description} 
              icon="text-box"
            />
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={1}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <IconButton 
                  icon="clock-outline" 
                  size={24} 
                  iconColor={theme.colors.primary}
                  style={styles.detailIcon}
                />
                <View>
                  <Text variant="bodySmall" style={[styles.detailLabel, { color: theme.colors.onSurfaceVariant }]}>
                    Duración
                  </Text>
                  <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
                    {minutes} minutos
                  </Text>
                </View>
              </View>

              <View style={styles.detailItem}>
                <IconButton 
                  icon="trending-up" 
                  size={24} 
                  iconColor={theme.colors.primary}
                  style={styles.detailIcon}
                />
                <View>
                  <Text variant="bodySmall" style={[styles.detailLabel, { color: theme.colors.onSurfaceVariant }]}>
                    Dificultad
                  </Text>
                  <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
                    {hardness}
                  </Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={1}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <IconButton 
                  icon="calendar" 
                  size={24} 
                  iconColor={theme.colors.primary}
                  style={styles.detailIcon}
                />
                <View>
                  <Text variant="bodySmall" style={[styles.detailLabel, { color: theme.colors.onSurfaceVariant }]}>
                    Fecha
                  </Text>
                  <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
                    {date}
                  </Text>
                </View>
              </View>

              <View style={styles.detailItem}>
                <IconButton 
                  icon="clock" 
                  size={24} 
                  iconColor={theme.colors.primary}
                  style={styles.detailIcon}
                />
                <View>
                  <Text variant="bodySmall" style={[styles.detailLabel, { color: theme.colors.onSurfaceVariant }]}>
                    Hora
                  </Text>
                  <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
                    {time}
                  </Text>
                </View>
              </View>

              <View style={styles.detailItem}>
                <IconButton 
                  icon="account-group" 
                  size={24} 
                  iconColor={theme.colors.primary}
                  style={styles.detailIcon}
                />
                <View>
                  <Text variant="bodySmall" style={[styles.detailLabel, { color: theme.colors.onSurfaceVariant }]}>
                    Visitantes
                  </Text>
                  <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
                    {visitors} personas
                  </Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    height: height * 0.3,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 4,
  },
  locationTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  routeTitle: {
    fontWeight: '500',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 16,
  },
  infoSection: {
    marginBottom: 16,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: '600',
  },
  sectionContent: {
    marginLeft: 48,
    lineHeight: 20,
  },
  divider: {
    marginVertical: 16,
    opacity: 0.5,
  },
  detailsGrid: {
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    margin: 0,
    marginRight: 8,
  },
  detailLabel: {
    marginBottom: 2,
  },
});
