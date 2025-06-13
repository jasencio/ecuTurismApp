import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Surface, Chip, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoadingRoute,
  selectRoute,
} from "@/selectors/adminCompanyRouteSelector";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import LoadingScreen from "@/components/LoadingScreen";
import { getDifficultyColor, getDifficultyTranslation } from "@/types/Route";
import { AppDispatch } from "@/store";
import { sessionDataSelector } from "@/selectors/sessionSelector";
import { getRoute } from "@/slices/adminCompanyRouteSlice";

const RouteDetailScreen = () => {
  const theme = useTheme();
  const route = useSelector(selectRoute);
  const isLoading = useSelector(selectLoadingRoute);
  const { id } = useLocalSearchParams<{ id: string }>();
  const { name, description, minutes, hardness, distance, isActive, mainImage } = route || {};
  const dispatch = useDispatch<AppDispatch>();
  const sessionData = useSelector(sessionDataSelector);

  const getRouteData = React.useCallback(() => {
    if (sessionData) {
      dispatch(getRoute(id as string));
    }
  }, [sessionData, dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      getRouteData();
    }, [getRouteData])
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <Surface style={styles.imageShadow} elevation={4}>
          <Image source={{ uri: mainImage?.publicUrl }} style={styles.image} />
        </Surface>
        <Surface style={styles.section} elevation={2}>
          <Text variant="titleLarge" style={styles.title}>
            {name}
          </Text>
          <View style={styles.chipRow}>
            <Chip
              icon={() => (
                <MaterialCommunityIcons name="run" color="white" size={18} />
              )}
              style={[
                styles.chip,
                { backgroundColor: getDifficultyColor(hardness|| undefined) },
              ]}
              textStyle={styles.chipText}
            >
              {getDifficultyTranslation(hardness || undefined)}
            </Chip>
            <Chip
              icon={() => (
                <MaterialCommunityIcons
                  name={isActive ? "check-circle" : "close-circle"}
                  color="white"
                  size={18}
                />
              )}
              style={[
                styles.chip,
                {
                  backgroundColor: isActive ? "#4CAF50" : "#9E9E9E",
                },
              ]}
              textStyle={styles.chipText}
            >
              {isActive? "Activo" : "Inactivo"}
            </Chip>
          </View>
          <Text variant="bodyMedium" style={styles.description}>
            {description}
          </Text>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={20}
              color={theme.colors.primary}
              style={styles.infoIcon}
            />
            <Text variant="bodyMedium" style={styles.infoText}>
              Duración: <Text style={styles.value}>{minutes} minutos de aventura</Text>
            </Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="run"
              size={20}
              color={getDifficultyColor(hardness || undefined)}
              style={styles.infoIcon}
            />
            <Text variant="bodyMedium" style={styles.infoText}>
                Dificultad: <Text style={styles.value}>{getDifficultyTranslation(hardness || undefined)}</Text>
              </Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name={ isActive ? "check-circle" : "close-circle"}
              size={20}
              color={ isActive ? "#4CAF50" : "#9E9E9E"}
              style={styles.infoIcon}
            />
            <Text variant="bodyMedium" style={styles.infoText}>
              Estado:{" "}
              <Text style={styles.value}>
                { isActive ? "Activo" : "Inactivo"}
              </Text>
            </Text>
          </View>
        </Surface>
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  imageShadow: {
    margin: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 16,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 24,
  },
  chipRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  chip: {
    marginRight: 8,
    borderRadius: 16,
    height: 32,
    alignItems: "center",
  },
  chipText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  description: {
    marginBottom: 16,
    color: "#444",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
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

export default RouteDetailScreen;
