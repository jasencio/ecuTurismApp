import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  Menu,
  Text,
  useTheme,
  Surface,
} from "react-native-paper";
import { useFocusEffect, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { cancelAppointment, getAppointments } from "@/slices/explorerSlice";
import { AppDispatch } from "@/store";
import {
  appointmentsSelector,
  cancellingAppointmentSelector,
  loadingAppointmentsSelector,
  successCancellingAppointmentSelector,
} from "@/selectors/explorerSelector";
import LoadingScreen from "@/components/LoadingScreen";
import { Appointment, AppointmentStatus } from "@/types/Appointment";
import { TAB_INDICES } from "@/constants/tabs";
import { formatDate, formatTime } from "@/utils/dateUtils";
import LoadingOverlay from "@/components/LoadingOverlay";

interface AppointmentsProps {
  currentTab: number;
}

const getStatusColor = (status: AppointmentStatus) => {
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

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Surface style={styles.card} elevation={1}>
      <Card.Title
        title={appointment.route.name}
        subtitle={appointment.route.organization.name}
        left={() => (
          <Avatar.Image
            size={48}
            source={{ uri: appointment.route.mainImage?.publicUrl }}
            style={styles.avatar}
          />
        )}
        right={() => (
          <View style={styles.rightContent}>
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: getStatusColor(appointment.status) },
              ]}
            />
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
            >
              <Menu.Item
                onPress={() => {
                  closeMenu();
                  router.navigate({
                    pathname: "/home/explorer/appointment/appointmentDetail",
                    params: { id: appointment.id },
                  });
                }}
                title="Ver detalles"
                leadingIcon="eye"
              />
              {appointment.status === AppointmentStatus.PENDING && (
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                    dispatch(cancelAppointment(appointment.id));
                  }}
                  title="Cancelar"
                  leadingIcon="close-circle"
                />
              )}
            </Menu>
          </View>
        )}
      />
      <View style={styles.dateTimeContainer}>
        <View style={styles.dateTimeItem}>
          <IconButton icon="calendar" size={20} />
          <Text variant="bodySmall">{formatDate(appointment.eventDate)}</Text>
        </View>
        <View style={styles.dateTimeItem}>
          <IconButton icon="clock-outline" size={20} />
          <Text variant="bodySmall">
            {formatTime(appointment.eventTimeInit)}
          </Text>
        </View>
      </View>
    </Surface>
  );
};

const Appoinments = ({ currentTab }: AppointmentsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const appointments = useSelector(appointmentsSelector);
  const loading = useSelector(loadingAppointmentsSelector);
  const cancelling = useSelector(cancellingAppointmentSelector);
  const successCancelling = useSelector(successCancellingAppointmentSelector);

  useFocusEffect(
    React.useCallback(() => {
      if (currentTab === TAB_INDICES.APPOINTMENTS) {
        dispatch(getAppointments());
      }
    }, [currentTab, dispatch])
  );

  //Fetch when tab changes to profile
  React.useEffect(() => {
    if (currentTab === TAB_INDICES.APPOINTMENTS) {
      dispatch(getAppointments());
    }
  }, [currentTab, dispatch]);

  React.useEffect(() => {
    if (successCancelling) {
      dispatch(getAppointments());
    }
  }, [successCancelling, dispatch]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <LoadingOverlay
        visible={cancelling}
        message="Cancelando agendamiento..."
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text variant="titleMedium" style={styles.title}>
          Agendamientos
        </Text>
        {appointments?.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 16,
  },
  title: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  avatar: {
    marginRight: 8,
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dateTimeContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  dateTimeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
});

export default Appoinments;
