// screens/DetailScreen.tsx
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import LoadingScreen from "@/components/LoadingScreen";
import { loadingRouteSelector, routeSelector } from "@/selectors/explorerSelector";
import { sessionDataSelector } from "@/selectors/sessionSelector";
import { getRoute } from "@/slices/explorerSlice";
import { AppDispatch } from "@/store";
import { getDifficultyTranslation, getDifficultyColor } from "@/types/Route";
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { Text, Card, Button, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

const RouteDetail: React.FC = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const sessionData = useSelector(sessionDataSelector);
  const route = useSelector(routeSelector);
  const loadingRoute = useSelector(loadingRouteSelector);
  const theme = useTheme();

  useEffect(() => {
      navigation.setOptions({ title: route?.name || "-"});
  }, [navigation, route]);

  const getRouteData = React.useCallback(() => {
    if (sessionData) {
      dispatch(getRoute(id as string));
    }
  }, [sessionData, dispatch]);

  // Fetch when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      getRouteData();
    }, [getRouteData])
  );

  if (loadingRoute) {
    return <LoadingScreen />;
  }

  return (
    <CustomSafeAreaView>
      <Image
        source={{ uri: route?.mainImage?.publicUrl }}
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
              {route?.description}
            </Text>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={20}
                color={theme.colors.primary}
                style={styles.infoIcon}
              />
              <Text variant="bodyMedium" style={styles.infoText}>
                Duración: <Text style={styles.value}>{route?.minutes} minutos de aventura</Text>
              </Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="run"
                size={20}
                color={getDifficultyColor(route?.hardness)}
                style={styles.infoIcon}
              />
              <Text variant="bodyMedium" style={styles.infoText}>
                Dificultad: <Text style={styles.value}>{getDifficultyTranslation(route?.hardness)}</Text>
              </Text>
            </View>

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
    marginTop: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    color: "#333",
  },
  value: {
    color: "#222",
    fontWeight: "bold",
  },
});
