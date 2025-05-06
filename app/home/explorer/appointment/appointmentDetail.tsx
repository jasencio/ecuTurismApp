import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, Dimensions, StyleSheet, ScrollView } from "react-native";
import { Text, Card } from "react-native-paper";

const { height } = Dimensions.get("window");

export default function AppointmentDetail() {
  const navigation = useNavigation();

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

  return (
    <CustomSafeAreaView>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleSmall" style={styles.title}>
              Ubicacion
            </Text>
            <Text variant="bodySmall" style={styles.text}>
              {location}
            </Text>
            <Text variant="titleSmall" style={styles.title}>
              Ruta
            </Text>
            <Text variant="bodySmall" style={styles.text}>
              {route}
            </Text>
            <Text variant="titleSmall" style={styles.title}>
              Direccion
            </Text>
            <Text variant="bodySmall" style={styles.text}>
              {address}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleSmall" style={styles.title}>
              Descripción
            </Text>
            <Text variant="bodySmall" style={styles.text}>
              {description}
            </Text>

            <Text variant="titleSmall" style={styles.title}>
              Duración
            </Text>
            <Text variant="bodySmall" style={styles.text}>
              {minutes} minutos
            </Text>

            <Text variant="titleSmall" style={styles.title}>
              Dificultad
            </Text>
            <Text variant="bodySmall" style={styles.text}>
              {hardness}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleSmall" style={styles.title}>
              Fecha
            </Text>
            <Text variant="bodySmall" style={styles.text}>
              {date}
            </Text>

            <Text variant="titleSmall" style={styles.title}>
              Hora
            </Text>
            <Text variant="bodySmall" style={styles.text}>
              {time}
            </Text>
            <Text variant="titleSmall" style={styles.title}>
              Visitantes
            </Text>
            <Text variant="bodySmall" style={styles.text}>
              {visitors}
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: height * 0.2,
    width: "100%",
  },
  content: {
    padding: 8,
  },
  card: {
    borderRadius: 12,
    marginBottom: 8,
  },
  title: {
    marginTop: 4,
    fontWeight: "bold",
  },
  text: {
    marginBottom: 2,
  },
});
