import { Appointment, AppointmentStatus } from "@/types/Appointment";
import { formatDate, formatTime } from "@/utils/dateUtils";
import { useRouter } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Card,
  Surface,
  useTheme,
  Text,
  Divider,
  Menu,
  IconButton,
} from "react-native-paper";


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


export const AppointmentCard = ({
  appointment,
  detailPath = "/home/explorer/appointment/appointmentDetail",
}: {
  appointment: Appointment;
  detailPath?: string;
}) => {
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);
  const theme = useTheme();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Surface style={styles.card} elevation={1}>
      <Card.Content>
        {/* User Info Section */}
        <View style={styles.userSection}>
          <Avatar.Text
            size={40}
            label={appointment.tourist.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
            style={styles.userAvatar}
          />
          <View style={styles.userInfo}>
            <Text variant="bodySmall" style={styles.userEmail}>
              {appointment.tourist.email}
            </Text>
          </View>
          <View
            style={[
              styles.statusIndicator,
              { backgroundColor: getStatusColor(appointment.status) },
            ]}
          />
        </View>

        <Divider style={styles.divider} />

        {/* Visit Info Section */}
        <View style={styles.visitSection}>
          <View style={styles.visitHeader}>
            <Text variant="titleSmall" style={styles.location}>
              {appointment.route.name}
            </Text>
            <Text variant="bodySmall" style={styles.route}>
              {appointment.route.description}
            </Text>
          </View>

          <View style={styles.visitDetails}>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <IconButton icon="calendar" size={20} />
                <View>
                  <Text variant="bodySmall" style={styles.detailLabel}>
                    Fecha
                  </Text>
                  <Text variant="bodyMedium">{formatDate(appointment.eventDate)}</Text>
                </View>
              </View>

            </View>

            <View style={styles.detailRow}>
            <View style={styles.detailItem}>
                <IconButton icon="clock-outline" size={20} />
                <View>
                  <Text variant="bodySmall" style={styles.detailLabel}>
                    Hora
                  </Text>
                  <Text variant="bodyMedium">{formatTime(appointment.eventTimeInit)}</Text>
                </View>
              </View>
              <View style={styles.detailItem}>
                <IconButton icon="account-group" size={20} />
                <View>
                  <Text variant="bodySmall" style={styles.detailLabel}>
                    Visitantes
                  </Text>
                  <Text variant="bodyMedium">
                    {appointment.groupSize} personas
                  </Text>
                </View>
              </View>
              {appointment.status === AppointmentStatus.CONFIRMED && (
                <View style={styles.detailItem}>
                  <IconButton icon="account-tie" size={20} />
                  <View>
                    <Text variant="bodySmall" style={styles.detailLabel}>
                      Guía
                    </Text>
                    <Text variant="bodyMedium">{appointment.guide.name}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Action Menu */}
        <View style={styles.actionSection}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                icon="dots-vertical"
                onPress={openMenu}
                style={styles.menuButton}
              />
            }
          >
            <Menu.Item
              onPress={() => {
                closeMenu();
                (router as any).push(`${detailPath}?id=${appointment.id}`);
              }}
              title="Ver detalles"
              leadingIcon="eye"
            />
            <Menu.Item
              onPress={closeMenu}
              title="Cancelar"
              leadingIcon="close-circle"
            />
          </Menu>
        </View>
      </Card.Content>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 16,
    paddingTop: 16,
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
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  userAvatar: {
    backgroundColor: "#E0E0E0",
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontWeight: "600",
  },
  userEmail: {
    color: "#666",
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  divider: {
    marginVertical: 8,
  },
  visitSection: {
    paddingVertical: 8,
  },
  visitHeader: {
    marginBottom: 12,
  },
  location: {
    fontWeight: "600",
  },
  route: {
    color: "#666",
  },
  visitDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  detailLabel: {
    color: "#666",
    marginBottom: 2,
  },
  actionSection: {
    alignItems: "flex-end",
    marginTop: 8,
  },
  menuButton: {
    margin: 0,
  },
});
