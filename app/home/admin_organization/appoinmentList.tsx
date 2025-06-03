import React from "react";
import {  StyleSheet, ScrollView } from "react-native";
import { Appointment } from "@/types/Appointment";
import { AppointmentCard } from "@/components/AppointmentCard";

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
    userName: 'María García',
    userEmail: 'maria.garcia@email.com',
    visitors: 4,
    guideName: 'Juan Pérez',
  },
  {
    id: '2',
    location: 'Parque Natural',
    route: 'Ruta del Río',
    date: '02/05/2025',
    time: '10:30',
    status: 'pendiente',
    image: 'https://picsum.photos/701',
    userName: 'Carlos Rodríguez',
    userEmail: 'carlos.rodriguez@email.com',
    visitors: 2,
    guideName: 'Ana Martínez',
  },
  {
    id: '3',
    location: 'Montaña Verde',
    route: 'Sendero de Aventura',
    date: '03/05/2025',
    time: '08:00',
    status: 'confirmado',
    image: 'https://picsum.photos/702',
    userName: 'Laura Sánchez',
    userEmail: 'laura.sanchez@email.com',
    visitors: 6,
    guideName: 'Pedro López',
  },
];

const AppoinmentList = () => {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
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
    paddingTop: 16
  },
});

export default AppoinmentList;
