// screens/DetailScreen.tsx
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Text, Card, Button, List, Title, Avatar } from "react-native-paper";
const { height } = Dimensions.get("window");
interface CustomCardProps {
  title: string;
  subtitle: string;
}

const CustomCardRoute: React.FC<CustomCardProps> = ({ title, subtitle }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.navigate(
          {
            pathname: "/home/explorer/route/routeDetail",
            params: { title },
          }
        );
      }}
    >
      <Card.Title
        title={title}
        subtitle={subtitle}
        left={() => (
          <Avatar.Image
            size={48}
            source={{ uri: "https://picsum.photos/700" }}
          />
        )}
      />
    </TouchableOpacity>
  );
};

const DetailScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Bike Park" });
  }, [navigation]);

  const imageUrl = "https://picsum.photos/700"; // Replace with your own image URL
  const address = "Av. XYZ y Av. Abc";

  const data = {
    timeOpenWeek: "08:00",
    timeCloseWeek: "17:00",
    timeOpenSaturday: "09:00",
    timeCloseSaturday: "14:00",
    timeOpenSunday: "Closed",
    timeCloseSunday: "Closed",
    daysWeek: "Monday,Tuesday,Wednesday,Thursday,Friday",
    daysWeekDisabled: "Sunday",
  };

  const schedule = [
    {
      days: "Monday - Friday",
      open: data.timeOpenWeek,
      close: data.timeCloseWeek,
    },
    {
      days: "Saturday",
      open: data.timeOpenSaturday,
      close: data.timeCloseSaturday,
    },
    {
      days: "Sunday",
      open: data.timeOpenSunday,
      close: data.timeCloseSunday,
    },
  ];

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
              Dirección
            </Text>
            <Text variant="bodyMedium" style={styles.text}>
              {address}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.title}>
              Horario
            </Text>
            {schedule.map((item, index) => (
              <View key={index} style={styles.row}>
                <View style={styles.dayColumn}>
                  <Text variant="bodySmall" style={styles.dayText}>
                    {item.days}
                  </Text>
                </View>
                <View style={styles.timeColumn}>
                  {item.open === "Closed" ? (
                    <Text variant="bodyMedium" style={styles.closedText}>
                      Closed
                    </Text>
                  ) : (
                    <Text variant="bodyMedium" style={styles.timeText}>
                      {item.open} - {item.close}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleSmall" style={styles.title}>
              Rutas
            </Text>
            {[1, 2, 3].map((key) => {
              return (
                <CustomCardRoute
                  key={key}
                  title={`Sendero ${key}`}
                  subtitle="Detalle"
                ></CustomCardRoute>
              );
            })}
          </Card.Content>
        </Card>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    height: height * 0.2, // 40% of the screen height
    width: "90%",
    margin: 20,
  },
  content: {
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  card: {
    marginTop: 10,
    borderRadius: 12,
    elevation: 4,
  },
  title: {
    fontWeight: "bold",
  },
  text: {
    marginBottom: 12,
  },
  button: {
    borderRadius: 6,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  dayColumn: {
    flex: 1,
  },
  timeColumn: {
    flex: 1,
    alignItems: "flex-end",
  },
  dayText: {
    fontWeight: "600",
  },
  timeText: {
    color: "#4caf50",
  },
  closedText: {
    color: "#f44336",
    fontWeight: "bold",
  },
});
