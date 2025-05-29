import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Card, Text, Chip, useTheme, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';

// Mock data - replace with your actual data
const appointments = [
  {
    id: '1',
    location: 'Bike Park',
    route: 'Sendero 1',
    date: '01/05/2025',
    time: '09:00 am',
    visitors: 10,
    status: 'confirmado',
    hardness: 'Moderado',
    minutes: 120,
  },
  {
    id: '2',
    location: 'Parque Natural',
    route: 'Ruta del Río',
    date: '02/05/2025',
    time: '10:30 am',
    visitors: 8,
    status: 'pendiente',
    hardness: 'Fácil',
    minutes: 90,
  },
  {
    id: '3',
    location: 'Montaña Verde',
    route: 'Sendero Principal',
    date: '03/05/2025',
    time: '08:00 am',
    visitors: 15,
    status: 'confirmado',
    hardness: 'Difícil',
    minutes: 180,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmado':
      return '#4CAF50';
    case 'pendiente':
      return '#FFA000';
    case 'cancelado':
      return '#F44336';
    default:
      return '#9E9E9E';
  }
};

const getHardnessColor = (hardness: string) => {
  switch (hardness.toLowerCase()) {
    case 'fácil':
      return '#4CAF50';
    case 'moderado':
      return '#FFA000';
    case 'difícil':
      return '#F44336';
    default:
      return '#9E9E9E';
  }
};

const AppointmentList = () => {
  const theme = useTheme();
  const router = useRouter();

  const handleAppointmentPress = (id: string) => {
    router.push(`/home/explorer/appointment/appointmentDetail?id=${id}`);
  };

  return (
    <CustomSafeAreaView>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {appointments.map((appointment) => (
          <Pressable
            key={appointment.id}
            onPress={() => handleAppointmentPress(appointment.id)}
          >
            <Card style={styles.card}>
              <Card.Content>
                <View style={styles.headerRow}>
                  <View style={styles.titleContainer}>
                    <Text variant="titleMedium" style={styles.location}>
                      {appointment.location}
                    </Text>
                    <Text variant="bodyMedium" style={styles.route}>
                      {appointment.route}
                    </Text>
                  </View>
                  <Chip
                    mode="flat"
                    style={[styles.statusChip, { backgroundColor: getStatusColor(appointment.status) + '20' }]}
                    textStyle={{ color: getStatusColor(appointment.status) }}
                  >
                    {appointment.status.toUpperCase()}
                  </Chip>
                </View>

                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <IconButton icon="calendar" size={20} />
                    <Text variant="bodySmall">{appointment.date}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <IconButton icon="clock-outline" size={20} />
                    <Text variant="bodySmall">{appointment.time}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <IconButton icon="account-group" size={20} />
                    <Text variant="bodySmall">{appointment.visitors} personas</Text>
                  </View>
                </View>

                <View style={styles.footerRow}>
                  <Chip
                    mode="flat"
                    style={[styles.hardnessChip, { backgroundColor: getHardnessColor(appointment.hardness) + '20' }]}
                    textStyle={{ color: getHardnessColor(appointment.hardness) }}
                  >
                    {appointment.hardness}
                  </Chip>
                  <Text variant="bodySmall" style={styles.duration}>
                    {appointment.minutes} min
                  </Text>
                </View>
              </Card.Content>
            </Card>
          </Pressable>
        ))}
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 12,
  },
  card: {
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
  },
  location: {
    fontWeight: 'bold',
  },
  route: {
    color: '#666',
  },
  statusChip: {
    height: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  hardnessChip: {
    height: 24,
  },
  duration: {
    color: '#666',
  },
});

export default AppointmentList;
