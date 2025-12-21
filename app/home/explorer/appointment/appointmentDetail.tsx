import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import LoadingScreen from "@/components/LoadingScreen";
import { appointmentSelector, loadingAppointmentSelector } from "@/selectors/explorerSelector";
import { getAppointment } from "@/slices/explorerSlice";
import { AppDispatch } from "@/store";
import { getDifficultyTranslation, getDifficultyColor } from "@/types/Route";
import { AppointmentStatus } from "@/types/Appointment";
import { formatDate, formatTime } from "@/utils/dateUtils";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Dimensions, StyleSheet, ScrollView, View } from "react-native";
import {
  Text,
  Card,
  useTheme,
  IconButton,
  Surface,
  Divider,
  Button
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { resetAppointment } from "@/slices/explorerSlice";

const { height } = Dimensions.get("window");

const getStatusColor = (status: AppointmentStatus | undefined) => {
  switch (status) {
    case AppointmentStatus.PENDING:
      return "#FFA000";
    case AppointmentStatus.CONFIRMED:
      return "#4CAF50";
    case AppointmentStatus.CANCELLED:
      return "#F44336";
    case AppointmentStatus.COMPLETED:
      return "#4CAF50";
    case AppointmentStatus.FINISHED:
      return "#4CAF50";
    default:
      return "#9E9E9E";
  }
};

const getStatusTranslation = (status: AppointmentStatus | undefined) => {
  switch (status) {
    case AppointmentStatus.PENDING:
      return "Pendiente";
    case AppointmentStatus.CONFIRMED:
      return "Confirmado";
    case AppointmentStatus.CANCELLED:
      return "Cancelado";
    case AppointmentStatus.COMPLETED:
      return "Completado";
    case AppointmentStatus.FINISHED:
      return "Finalizado";
    default:
      return "Desconocido";
  }
};

export default function AppointmentDetail() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const appointment = useSelector(appointmentSelector);
  const loadingAppointment = useSelector(loadingAppointmentSelector);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerBackVisible: false
    });
  }, [navigation]);

  useEffect(() => {
    if (!id) return;
    dispatch(getAppointment(id as string));
  }, [dispatch, id]);

  if (loadingAppointment) {
    return <LoadingScreen />;
  }

  function closeAppointment() {
    router.replace("/");
    dispatch(resetAppointment());
  }

  const InfoSection = ({
    title,
    content,
    icon,
  }: {
    title: string;
    content: string;
    icon: string;
  }) => (
    <View style={styles.infoSection}>
      <View style={styles.infoHeader}>
        <IconButton icon={icon} size={20} iconColor={theme.colors.primary} />
        <Text
          variant="titleSmall"
          style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
        >
          {title}
        </Text>
      </View>
      <Text
        variant="bodySmall"
        style={[
          styles.sectionContent,
          { color: theme.colors.onSurfaceVariant },
        ]}
      >
        {content}
      </Text>
    </View>
  );

  return (
    <CustomSafeAreaView>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: appointment?.route?.mainImage?.publicUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.statusBadge}>
          <Text style={[styles.statusBadgeText, { color: getStatusColor(appointment?.status) }]}>
            {getStatusTranslation(appointment?.status)}
          </Text>
        </View>
        <Surface
          style={[
            styles.imageOverlay,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text
            variant="headlineMedium"
            style={[styles.locationTitle, { color: theme.colors.onSurface }]}
          >
            {appointment?.route?.organization?.name}
          </Text>
          <Text
            variant="titleMedium"
            style={[styles.routeTitle, { color: theme.colors.primary }]}
          >
            {appointment?.route?.name}
          </Text>
        </Surface>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Card
          style={[styles.card, { backgroundColor: theme.colors.surface }]}
          elevation={1}
        >
          <Card.Content style={styles.cardContent}>
            <InfoSection
              title="Dirección"
              content={appointment?.route?.organization?.address || ""}
              icon="map-marker"
            />
            <Divider
              style={[
                styles.divider,
                { backgroundColor: theme.colors.outlineVariant },
              ]}
            />
            <InfoSection
              title="Descripción"
              content={appointment?.route?.description || ""}
              icon="text-box"
            />
          </Card.Content>
        </Card>

        <Card
          style={[styles.card, { backgroundColor: theme.colors.surface }]}
          elevation={1}
        >
          <Card.Content style={styles.cardContent}>
            <View style={styles.detailsGrid}>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <IconButton
                    icon="clock-outline"
                    size={24}
                    iconColor={theme.colors.primary}
                    style={styles.detailIcon}
                  />
                  <View>
                    <Text
                      variant="bodySmall"
                      style={[
                        styles.detailLabel,
                        { color: theme.colors.onSurfaceVariant },
                      ]}
                    >
                      Duración
                    </Text>
                    <Text
                      variant="bodyMedium"
                      style={{ color: theme.colors.onSurface }}
                    >
                      {appointment?.route?.minutes} minutos
                    </Text>
                  </View>
                </View>

                <View style={styles.detailItem}>
                  <IconButton
                    icon="trending-up"
                    size={24}
                    iconColor={getDifficultyColor(appointment?.route?.hardness)}
                    style={styles.detailIcon}
                  />
                  <View>
                    <Text
                      variant="bodySmall"
                      style={[
                        styles.detailLabel,
                        { color: theme.colors.onSurfaceVariant },
                      ]}
                    >
                      Dificultad
                    </Text>
                    <View
                      style={[
                        styles.difficultyChip,
                        {
                          backgroundColor: getDifficultyColor(
                            appointment?.route?.hardness
                          ),
                        },
                      ]}
                    >
                      <Text style={styles.difficultyText}>
                        {getDifficultyTranslation(appointment?.route?.hardness)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card
          style={[styles.card, { backgroundColor: theme.colors.surface }]}
          elevation={1}
        >
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
                  <Text
                    variant="bodySmall"
                    style={[
                      styles.detailLabel,
                      { color: theme.colors.onSurfaceVariant },
                    ]}
                  >
                    Fecha
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{ color: theme.colors.onSurface }}
                  >
                    {formatDate(appointment?.eventDate)}
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
                  <Text
                    variant="bodySmall"
                    style={[
                      styles.detailLabel,
                      { color: theme.colors.onSurfaceVariant },
                    ]}
                  >
                    Horario
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{ color: theme.colors.onSurface }}
                  >
                    {formatTime(appointment?.eventTimeInit)} -{" "}
                    {formatTime(appointment?.eventTimeEnd)}
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
                  <Text
                    variant="bodySmall"
                    style={[
                      styles.detailLabel,
                      { color: theme.colors.onSurfaceVariant },
                    ]}
                  >
                    Visitantes
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{ color: theme.colors.onSurface }}
                  >
                    {appointment?.groupSize} personas
                  </Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => closeAppointment()}
            style={styles.button}
          >
            Cerrar
          </Button>
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
    alignItems: "center",
  },
  button: {
    width: "100%",
  },
  imageContainer: {
    position: "relative",
    height: height * 0.25,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  statusBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusBadgeText: {
    fontSize: 14,
    fontWeight: "700",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 4,
  },
  locationTitle: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  routeTitle: {
    fontWeight: "500",
  },
  content: {
    padding: 8,
    gap: 8,
  },
  card: {
    borderRadius: 12,
    overflow: "hidden",
  },
  cardContent: {
    padding: 8,
  },
  infoSection: {
    marginBottom: 4,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
  },
  sectionTitle: {
    fontWeight: "500",
  },
  sectionContent: {
    marginLeft: 40,
    lineHeight: 16,
  },
  divider: {
    marginVertical: 4,
    opacity: 0.5,
  },
  detailsGrid: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  detailIcon: {
    margin: 0,
    marginRight: 4,
  },
  detailLabel: {
    marginBottom: 0,
  },
  difficultyChip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 2,
  },
  difficultyText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  statusChip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 2,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
});
