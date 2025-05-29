import { Appointment } from "@/types/Appointment";
import { useRouter } from "expo-router";
import React from "react";
import { View , StyleSheet} from "react-native";
import { Avatar, Card, Surface, useTheme, Text, Divider, Menu, IconButton } from "react-native-paper";

const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado':
        return '#4CAF50';
      case 'pendiente':
        return '#FFA000';
      default:
        return '#9E9E9E';
    }
  };

export const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
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
              label={appointment.userName.split(' ').map(n => n[0]).join('')}
              style={styles.userAvatar}
            />
            <View style={styles.userInfo}>
              <Text variant="titleMedium" style={styles.userName}>
                {appointment.userName}
              </Text>
              <Text variant="bodySmall" style={styles.userEmail}>
                {appointment.userEmail}
              </Text>
            </View>
            <View 
              style={[
                styles.statusIndicator, 
                { backgroundColor: getStatusColor(appointment.status) }
              ]} 
            />
          </View>
  
          <Divider style={styles.divider} />
  
          {/* Visit Info Section */}
          <View style={styles.visitSection}>
            <View style={styles.visitHeader}>
              <Text variant="titleSmall" style={styles.location}>
                {appointment.location}
              </Text>
              <Text variant="bodySmall" style={styles.route}>
                {appointment.route}
              </Text>
            </View>
  
            <View style={styles.visitDetails}>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <IconButton icon="calendar" size={20} />
                  <View>
                    <Text variant="bodySmall" style={styles.detailLabel}>Fecha</Text>
                    <Text variant="bodyMedium">{appointment.date}</Text>
                  </View>
                </View>
                <View style={styles.detailItem}>
                  <IconButton icon="clock-outline" size={20} />
                  <View>
                    <Text variant="bodySmall" style={styles.detailLabel}>Hora</Text>
                    <Text variant="bodyMedium">{appointment.time}</Text>
                  </View>
                </View>
              </View>
  
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <IconButton icon="account-group" size={20} />
                  <View>
                    <Text variant="bodySmall" style={styles.detailLabel}>Visitantes</Text>
                    <Text variant="bodyMedium">{appointment.visitors} personas</Text>
                  </View>
                </View>
                <View style={styles.detailItem}>
                  <IconButton icon="account-tie" size={20} />
                  <View>
                    <Text variant="bodySmall" style={styles.detailLabel}>Guía</Text>
                    <Text variant="bodyMedium">{appointment.guideName}</Text>
                  </View>
                </View>
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
                  router.push("/home/explorer/appointment/appointmentDetail");
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
      paddingTop: 16
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
      overflow: 'hidden',
    },
    userSection: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
    },
    userAvatar: {
      backgroundColor: '#E0E0E0',
    },
    userInfo: {
      flex: 1,
      marginLeft: 12,
    },
    userName: {
      fontWeight: '600',
    },
    userEmail: {
      color: '#666',
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
      fontWeight: '600',
    },
    route: {
      color: '#666',
    },
    visitDetails: {
      gap: 12,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    detailLabel: {
      color: '#666',
      marginBottom: 2,
    },
    actionSection: {
      alignItems: 'flex-end',
      marginTop: 8,
    },
    menuButton: {
      margin: 0,
    },
  });