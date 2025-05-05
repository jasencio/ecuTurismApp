// screens/DetailScreen.tsx
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { Text, Card, Button } from "react-native-paper";

const { height } = Dimensions.get("window");

const RouteDetail: React.FC = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { title } = useLocalSearchParams();

  const imageUrl = "https://picsum.photos/700"; // Replace with your own image URL
  const description =
    "Hermosa ruta de senderismo a través de un frondoso bosque y vistas al río.";
  const minutes = 120;
  const hardness = "Moderado";

  useEffect(() => {
    navigation.setOptions({ title });
  }, [navigation]);

  return (
    <CustomSafeAreaView>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.title}>
              Descripción
            </Text>
            <Text variant="bodyMedium" style={styles.text}>
              {description}
            </Text>

            <Text variant="titleLarge" style={styles.title}>
              Duración
            </Text>
            <Text variant="bodyMedium" style={styles.text}>
              {minutes} minutes
            </Text>

            <Text variant="titleLarge" style={styles.title}>
              Dificultad
            </Text>
            <Text variant="bodyMedium" style={styles.text}>
              {hardness}
            </Text>

            <Button
              mode="contained"
              onPress={() => {
                router.navigate("/home/explorer/appointment/appointmentCreate");
              }}
              style={styles.button}
            >
              Programar Agendamiento
            </Button>
          </Card.Content>
        </Card>
      </View>
    </CustomSafeAreaView>
  );
};

export default RouteDetail;

const styles = StyleSheet.create({
  image: {
    height: height * 0.4, // 40% of the screen height
    width: "100%",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 12,
    elevation: 4,
  },
  title: {
    marginTop: 8,
    fontWeight: "bold",
  },
  text: {
    marginBottom: 12,
  },
  button: {
    borderRadius: 6,
  },
});
