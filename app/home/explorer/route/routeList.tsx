// screens/DetailScreen.tsx
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import LoadingScreen from "@/components/LoadingScreen";
import { loadingOrganizationRoutesSelector, loadingOrganizationSelector, organizationRoutesSelector, organizationSelector } from "@/selectors/explorerSelector";
import { sessionDataSelector } from "@/selectors/sessionSelector";
import { getOrganization, getOrganizationRoutes } from "@/slices/explorerSlice";
import { AppDispatch } from "@/store";
import { Route } from "@/types/Route";
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Text, Card, Avatar, Chip } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
const { height } = Dimensions.get("window");
interface CustomCardProps {
  route: Route;
}

const CustomCardRoute: React.FC<CustomCardProps> = ({ route}) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.navigate(
          {
            pathname: "/home/explorer/route/routeDetail",
            params: { id: route.id },
          }
        );
      }}
    >
      <Card.Title
        title={route.name}
        subtitle={route.description}
        left={() => (
          <Avatar.Image
            size={48}
            source={{ uri: route.mainImage?.publicUrl }}
          />
        )}
      />
    </TouchableOpacity>
  );
};

const RouteLoadingSkeleton = () => {
  return (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonCard}>
        <View style={styles.skeletonAvatar} />
        <View style={styles.skeletonContent}>
          <View style={styles.skeletonTitle} />
          <View style={styles.skeletonSubtitle} />
        </View>
      </View>
      <View style={styles.skeletonCard}>
        <View style={styles.skeletonAvatar} />
        <View style={styles.skeletonContent}>
          <View style={styles.skeletonTitle} />
          <View style={styles.skeletonSubtitle} />
        </View>
      </View>
    </View>
  );
};

const DetailScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useLocalSearchParams();
  const organization = useSelector(organizationSelector);
  const isLoadingOrganization = useSelector(loadingOrganizationSelector);
  const sessionData = useSelector(sessionDataSelector);
  const organizationRoutes = useSelector(organizationRoutesSelector);
  const isLoadingOrganizationRoutes = useSelector(loadingOrganizationRoutesSelector);

  useEffect(() => {
    navigation.setOptions({ title: organization?.name || "-" });
  }, [navigation, organization]);

  const getOrganizationData = React.useCallback(() => {
    if (sessionData) {
      dispatch(getOrganization(id as string));
    }
  }, [sessionData, dispatch]);

  // Fetch when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      getOrganizationData();
    }, [getOrganizationData])
  );

  useEffect(() => {
    if (organization) {
      dispatch(getOrganizationRoutes(organization.id));
    }
  }, [organization, dispatch]);

  if (isLoadingOrganization) {
    return <LoadingScreen />;
  }

  const DAYS_OF_WEEK = [
    { label: 'Lunes', value: 'Monday' },
    { label: 'Martes', value: 'Tuesday' },
    { label: 'Miércoles', value: 'Wednesday' },
    { label: 'Jueves', value: 'Thursday' },
    { label: 'Viernes', value: 'Friday' },
    { label: 'Sábado', value: 'Saturday' },
    { label: 'Domingo', value: 'Sunday' },
  ];

  const isDayEnabled = (day: string) => {
    return organization?.daysWeekEnabled?.includes(day) ?? false;
  };

  const getScheduleForDay = (day: string) => {
    if (!isDayEnabled(day)) {
      return { open: "Cerrado", close: "" };
    }

    switch (day) {
      case 'Monday':
      case 'Tuesday':
      case 'Wednesday':
      case 'Thursday':
      case 'Friday':
        return {
          open: organization?.timeOpenWeek || "No especificado",
          close: organization?.timeCloseWeek || "No especificado"
        };
      case 'Saturday':
        return {
          open: organization?.timeOpenSaturday || "No especificado",
          close: organization?.timeCloseSaturday || "No especificado"
        };
      case 'Sunday':
        return {
          open: organization?.timeOpenSunday || "No especificado",
          close: organization?.timeCloseSunday || "No especificado"
        };
      default:
        return { open: "No especificado", close: "" };
    }
  };

  return (
    <CustomSafeAreaView>
      <Image
        source={{ uri: organization?.image?.publicUrl}}
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
              {organization?.address}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.title}>
              Horario
            </Text>
            <View style={styles.daysContainer}>
              {DAYS_OF_WEEK.map((day) => (
                <Chip
                  key={day.value}
                  selected={isDayEnabled(day.value)}
                  style={isDayEnabled(day.value) ? styles.dayChipEnabled : styles.dayChipDisabled}
                  showSelectedCheck={false}
                  textStyle={styles.chipText}
                >
                  {day.label}
                </Chip>
              ))}
            </View>
            {DAYS_OF_WEEK.map((day) => {
              const schedule = getScheduleForDay(day.value);
              return (
                <View key={day.value} style={styles.scheduleRow}>
                  <View style={styles.dayColumn}>
                    <Text variant="bodySmall" style={styles.dayText}>
                      {day.label}
                    </Text>
                  </View>
                  <View style={styles.timeColumn}>
                    {!isDayEnabled(day.value) ? (
                      <Text variant="bodyMedium" style={styles.closedText}>
                        Cerrado
                      </Text>
                    ) : (
                      <Text variant="bodyMedium" style={styles.timeText}>
                        {schedule.open} - {schedule.close}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleSmall" style={styles.title}>
              Rutas
            </Text>
            {isLoadingOrganizationRoutes ? (
              <RouteLoadingSkeleton />
            ) : (
              organizationRoutes?.map((route) => {
                return (
                  <CustomCardRoute
                    key={route.id}
                    route={route}
                  ></CustomCardRoute>
                );
              })
            )}
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
    height: height * 0.2,
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
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  dayChipEnabled: {
    backgroundColor: '#4CAF50',
  },
  dayChipDisabled: {
    backgroundColor: '#9E9E9E',
  },
  chipText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scheduleRow: {
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
  loadingContainer: {
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeletonContainer: {
    paddingVertical: 8,
  },
  skeletonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  skeletonAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E0E0E0',
    marginRight: 16,
  },
  skeletonContent: {
    flex: 1,
  },
  skeletonTitle: {
    height: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 8,
    width: '70%',
  },
  skeletonSubtitle: {
    height: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    width: '90%',
  },
});
