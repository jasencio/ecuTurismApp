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
import { useRouter } from "expo-router";

interface Appointment {
  id: string;
  location: string;
  route: string;
  date: string;
  time: string;
  status: 'confirmado' | 'pendiente';
  image: string;
}

// Mock data - replace with your actual data
const appointments: Appointment[] = [
  {
    id: '1',
    location: 'Bosque Protector',
    route: 'Sendero Principal',
    date: '01/05/2025',
    time: '09:00',
    status: 'confirmado',
    image: 'https://picsum.photos/700',
  },
  {
    id: '2',
    location: 'Parque Natural',
    route: 'Ruta del Río',
    date: '02/05/2025',
    time: '10:30',
    status: 'pendiente',
    image: 'https://picsum.photos/701',
  },
  {
    id: '3',
    location: 'Montaña Verde',
    route: 'Sendero de Aventura',
    date: '03/05/2025',
    time: '08:00',
    status: 'confirmado',
    image: 'https://picsum.photos/702',
  },
];

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

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);
  const theme = useTheme();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Surface style={styles.card} elevation={1}>
      <Card.Title
        title={appointment.location}
        subtitle={appointment.route}
        left={(props) => (
          <Avatar.Image 
            size={48} 
            source={{ uri: appointment.image }} 
            style={styles.avatar}
          />
        )}
        right={(props) => (
          <View style={styles.rightContent}>
            <View 
              style={[
                styles.statusIndicator, 
                { backgroundColor: getStatusColor(appointment.status) }
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
        )}
      />
      <View style={styles.dateTimeContainer}>
        <View style={styles.dateTimeItem}>
          <IconButton icon="calendar" size={20} />
          <Text variant="bodySmall">{appointment.date}</Text>
        </View>
        <View style={styles.dateTimeItem}>
          <IconButton icon="clock-outline" size={20} />
          <Text variant="bodySmall">{appointment.time}</Text>
        </View>
      </View>
    </Surface>
  );
};

const Appoinments = () => {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text variant="titleMedium" style={styles.title}>
        Agendamientos
      </Text>
      {appointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </ScrollView>
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
    overflow: 'hidden',
  },
  avatar: {
    marginRight: 8,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  dateTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
});

export default Appoinments;
