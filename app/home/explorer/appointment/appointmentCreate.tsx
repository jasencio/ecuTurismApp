import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import CustomCalendar from "@/components/CustomCalendar";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Image, Dimensions, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Divider, Button } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";

const { height } = Dimensions.get("window");

export default function AppointmentCreate() {
  const navigation = useNavigation();
  const router = useRouter();
  const imageUrl = "https://picsum.photos/700"; // Replace with your own image URL
  const [time, setTime] = useState<string | undefined>();
  const [visitors, setVisitors] = useState<string | undefined>(undefined);

  const data = {
    location: "Bike Park",
    route: "Sendero 1",
    address: "Av. XYZ y Av. Abc",
    description:
      "Hermosa ruta de senderismo a través de un frondoso bosque y vistas al río.",
    minutes: 120,
    hardness: "Moderado",
  };
  
  const { description, minutes, hardness, location, route, address } = data;

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
            <View style={{ marginBottom: 10 }}>
              <Text variant="titleSmall" style={styles.titleScheduled}>
                Por favor elige un horario
              </Text>
              <CustomCalendar />
              <Divider style={styles.divider} />
              <Dropdown
                label="Visitantes"
                placeholder="Elige un numero de visitantes"
                value={visitors}
                onSelect={setVisitors}
                options={[
                  {
                    label: "1",
                    value: "1",
                  },
                  {
                    label: "2",
                    value: "2",
                  },
                  {
                    label: "3",
                    value: "3",
                  },
                  {
                    label: "4",
                    value: "4",
                  },
                  {
                    label: "5",
                    value: "5",
                  },
                ]}
              />
            </View>
            <Dropdown
              label="Horario"
              value={time}
              onSelect={setTime}
              options={[
                {
                  label: "10:00 a 11:00",
                  value: "1",
                },
                {
                  label: "11:00 a 12:00",
                  value: "2",
                },
              ]}
            />
            <Button
              mode="contained"
              onPress={() => {
                router.push("/home/explorer/appointment/appointmentDetail");
              }}
              style={styles.button}
            >
              Agendar
            </Button>
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
  button: {
    marginTop: 8,
    borderRadius: 6,
  },
  titleScheduled: {
    marginTop: 2,
    fontWeight: "bold",
    marginBottom: 8,
  },
  divider: {
    marginVertical: 8,
  },
});
