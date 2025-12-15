import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import LoadingScreen from "@/components/LoadingScreen";
import GuideAssignmentModal from "@/components/GuideAssignmentModal";
import { 
  currentAppointmentSelector, 
  loadingCurrentAppointmentSelector,
  assigningGuideSelector,
  errorAssigningGuideSelector,
  successAssigningGuideSelector
} from "@/selectors/adminCompanyAppoinmentsSelectors";
import { getAppointment, assignGuideToAppointment, clearAssignGuideState } from "@/slices/adminCompanyAppoinmentsSlice";
import { AppDispatch } from "@/store";
import { getDifficultyTranslation, getDifficultyColor } from "@/types/Route";
import { AppointmentStatus } from "@/types/Appointment";
import { formatDate, formatTime } from "@/utils/dateUtils";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Dimensions, StyleSheet, ScrollView, View, Linking } from "react-native";
import {
  Text,
  Card,
  useTheme,
  IconButton,
  Surface,
  Divider,
  Button,
  Avatar,
  Snackbar,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

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

const AppointmentDetail = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const appointment = useSelector(currentAppointmentSelector);
  const loadingAppointment = useSelector(loadingCurrentAppointmentSelector);
  const assigningGuide = useSelector(assigningGuideSelector);
  const errorAssigningGuide = useSelector(errorAssigningGuideSelector);
  const successAssigningGuide = useSelector(successAssigningGuideSelector);
  
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    navigation.setOptions({ title: appointment?.route?.name || "-"});
  }, [navigation, appointment]);

  useEffect(() => {
    navigation.setOptions({ headerBackTitle: "Atrás" });
  }, [navigation]);

  useEffect(() => {
    if (!id) return;
    dispatch(getAppointment(id as string));
  }, [dispatch, id]);

  useEffect(() => {
    if (successAssigningGuide) {
      setSnackbarMessage("Guía asignado exitosamente");
      setSnackbarVisible(true);
      setShowAssignModal(false);
      dispatch(clearAssignGuideState());
    }
  }, [successAssigningGuide, dispatch]);

  useEffect(() => {
    if (errorAssigningGuide) {
      setSnackbarMessage(errorAssigningGuide);
      setSnackbarVisible(true);
      dispatch(clearAssignGuideState());
    }
  }, [errorAssigningGuide, dispatch]);

  const handleAssignGuide = (guide: any) => {
    if (!appointment?.id) return;
    dispatch(assignGuideToAppointment({
      appointmentId: appointment.id,
      guideId: guide.id
    }));
  };

  const handleSnackbarDismiss = () => {
    setSnackbarVisible(false);
  };

  if (loadingAppointment) {
    return <LoadingScreen />;
  }

  if (!appointment) {
    return (
      <CustomSafeAreaView>
        <View style={styles.errorContainer}>
          <Text variant="titleMedium">Cita no encontrada</Text>
        </View>
      </CustomSafeAreaView>
    );
  }

  const handleCallTourist = () => {
    if (appointment.tourist.phone) {
      Linking.openURL(`tel:${appointment.tourist.phone.replace(/\s/g, '')}`);
    }
  };

  const handleEmailTourist = () => {
    if (appointment.tourist.email) {
      Linking.openURL(`mailto:${appointment.tourist.email}`);
    }
  };

  const handleCallGuide = () => {
    if (appointment.touristGuide.phone) {
      Linking.openURL(`tel:${appointment.touristGuide.phone.replace(/\s/g, '')}`);
    }
  };

  const handleEmailGuide = () => {
    if (appointment.touristGuide.email) {
      Linking.openURL(`mailto:${appointment.touristGuide.email}`);
    }
  };

  return (
    <CustomSafeAreaView>
      <ScrollView style={styles.container}>
        {/* Header Image with Status */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: appointment.route?.mainImage?.publicUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.statusBadge}>
            <Text style={[styles.statusBadgeText, { color: getStatusColor(appointment.status) }]}>
              {getStatusTranslation(appointment.status)}
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
              {appointment.route?.organization?.name}
            </Text>
            <Text
              variant="titleMedium"
              style={[styles.routeTitle, { color: theme.colors.primary }]}
            >
              {appointment.route?.name}
            </Text>
          </Surface>
        </View>

        {/* Tourist Information */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={1}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <IconButton icon="account" size={24} iconColor={theme.colors.primary} />
              <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                Información del Turista
              </Text>
            </View>
            
            <View style={styles.userInfoContainer}>
              <Avatar.Text
                size={60}
                label={appointment.tourist.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
                style={styles.userAvatar}
              />
              <View style={styles.userDetails}>
                <Text variant="titleMedium" style={[styles.userName, { color: theme.colors.onSurface }]}>
                  {appointment.tourist.name}
                </Text>
                <Text variant="bodyMedium" style={[styles.userEmail, { color: theme.colors.onSurfaceVariant }]}>
                  {appointment.tourist.email}
                </Text>
                {appointment.tourist.phone && (
                  <Text variant="bodyMedium" style={[styles.userPhone, { color: theme.colors.onSurfaceVariant }]}>
                    {appointment.tourist.phone}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.contactButtons}>
              {appointment.tourist.phone && (
                <Button
                  mode="outlined"
                  icon="phone"
                  onPress={handleCallTourist}
                  style={styles.contactButton}
                >
                  Llamar
                </Button>
              )}
              <Button
                mode="outlined"
                icon="email"
                onPress={handleEmailTourist}
                style={styles.contactButton}
              >
                Email
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Guide Information */}
        {appointment?.touristGuide && (
          <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={1}>
            <Card.Content>
              <View style={styles.sectionHeader}>
                <IconButton icon="account-tie" size={24} iconColor={theme.colors.primary} />
                <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                  Información del Guía
                </Text>
              </View>
              
              <View style={styles.userInfoContainer}>
                <Avatar.Text
                  size={60}
                  label={appointment.touristGuide.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                  style={styles.guideAvatar}
                />
                <View style={styles.userDetails}>
                  <Text variant="titleMedium" style={[styles.userName, { color: theme.colors.onSurface }]}>
                    {appointment.touristGuide.name}
                  </Text>
                  <Text variant="bodyMedium" style={[styles.userEmail, { color: theme.colors.onSurfaceVariant }]}>
                    {appointment.touristGuide.email}
                  </Text>
                  {appointment.touristGuide.phone && (
                    <Text variant="bodyMedium" style={[styles.userPhone, { color: theme.colors.onSurfaceVariant }]}>
                      {appointment.touristGuide.phone}
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.contactButtons}>
                {appointment.touristGuide.phone && (
                  <Button
                    mode="outlined"
                    icon="phone"
                    onPress={handleCallGuide}
                    style={styles.contactButton}
                  >
                    Llamar
                  </Button>
                )}
                <Button
                  mode="outlined"
                  icon="email"
                  onPress={handleEmailGuide}
                  style={styles.contactButton}
                >
                  Email
                </Button>
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Assign Guide Button */}
        {appointment.status === AppointmentStatus.PENDING && (
          <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={1}>
            <Card.Content>
              <View style={styles.sectionHeader}>
                <IconButton icon="account-plus" size={24} iconColor={theme.colors.primary} />
                <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                  Asignación de Guía
                </Text>
              </View>
              
              <Text variant="bodyMedium" style={[styles.assignText, { color: theme.colors.onSurfaceVariant }]}>
                {appointment.touristGuide 
                  ? "Este agendamiento ya tiene un guía asignado."
                  : "Asigna un guía disponible para este agendamiento."
                }
              </Text>
              
              <Button
                mode="contained"
                icon={appointment.touristGuide ? "account-edit" : "account-plus"}
                onPress={() => setShowAssignModal(true)}
                style={styles.assignButton}
                loading={assigningGuide}
                disabled={assigningGuide}
              >
                {appointment.touristGuide ? "Cambiar Guía" : "Asignar Guía"}
              </Button>
            </Card.Content>
          </Card>
        )}

        {/* Appointment Details */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={1}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <IconButton icon="calendar-clock" size={24} iconColor={theme.colors.primary} />
              <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                Detalles del Agendamiento
              </Text>
            </View>

            <View style={styles.detailsGrid}>
              <View style={styles.detailRow}>
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
                      {formatDate(appointment.eventDate)}
                    </Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.detailRow}>
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
                      {formatTime(appointment.eventTimeInit)} - {formatTime(appointment.eventTimeEnd)}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.detailRow}>
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
                      {appointment.groupSize} personas
                    </Text>
                  </View>
                </View>

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
                      {appointment.route?.minutes} minutos
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <IconButton
                    icon="trending-up"
                    size={24}
                    iconColor={getDifficultyColor(appointment.route?.hardness)}
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
                            appointment.route?.hardness
                          ),
                        },
                      ]}
                    >
                      <Text style={styles.difficultyText}>
                        {getDifficultyTranslation(appointment.route?.hardness)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Route Description */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={1}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <IconButton icon="map-marker" size={24} iconColor={theme.colors.primary} />
              <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                Descripción de la Ruta
              </Text>
            </View>
            <Text
              variant="bodyMedium"
              style={[styles.routeDescription, { color: theme.colors.onSurfaceVariant }]}
            >
              {appointment.route?.description}
            </Text>
          </Card.Content>
        </Card>

        {/* Timestamps */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={1}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <IconButton icon="information" size={24} iconColor={theme.colors.primary} />
              <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                Información Adicional
              </Text>
            </View>
            
            <View style={styles.timestampContainer}>
              <View style={styles.timestampItem}>
                <Text variant="bodySmall" style={[styles.timestampLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Creado
                </Text>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
                  {formatDate(appointment.createdAt)}
                </Text>
              </View>
              
              <View style={styles.timestampItem}>
                <Text variant="bodySmall" style={[styles.timestampLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Última actualización
                </Text>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
                  {formatDate(appointment.updatedAt)}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Guide Assignment Modal */}
      <GuideAssignmentModal
        visible={showAssignModal}
        onDismiss={() => setShowAssignModal(false)}
        onAssignGuide={handleAssignGuide}
        currentGuideId={appointment.touristGuide?.id}
        loading={assigningGuide}
      />

      {/* Snackbar for feedback */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={handleSnackbarDismiss}
        duration={3000}
        style={styles.snackbar}
      >
        {snackbarMessage}
      </Snackbar>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: "relative",
    height: height * 0.25,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
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
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: "500",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  userAvatar: {
    backgroundColor: "#E3F2FD",
    marginRight: 16,
  },
  guideAvatar: {
    backgroundColor: "#E8F5E9",
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontWeight: "600",
    marginBottom: 4,
  },
  userEmail: {
    marginBottom: 2,
  },
  userPhone: {
    marginBottom: 2,
  },
  contactButtons: {
    flexDirection: "row",
    gap: 8,
  },
  contactButton: {
    flex: 1,
  },
  assignText: {
    marginBottom: 16,
    lineHeight: 20,
  },
  assignButton: {
    width: '100%',
  },
  detailsGrid: {
    gap: 16,
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
    marginRight: 8,
  },
  detailLabel: {
    marginBottom: 2,
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
  routeDescription: {
    lineHeight: 20,
  },
  timestampContainer: {
    gap: 12,
  },
  timestampItem: {
    gap: 4,
  },
  timestampLabel: {
    fontWeight: "500",
  },
  snackbar: {
    marginBottom: 16,
  },
});

export default AppointmentDetail;
