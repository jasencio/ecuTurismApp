import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { AppointmentCard } from "@/components/AppointmentCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import {
  appointmentsSelector,
  loadingAppointmentsSelector,
} from "@/selectors/adminCompanyAppoinmentsSelectors";
import { getAppointments } from "@/slices/adminCompanyAppoinmentsSlice";
import { useFocusEffect } from "expo-router";
import LoadingScreen from "@/components/LoadingScreen";

const AppoinmentList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const appointments = useSelector(appointmentsSelector);
  const loading = useSelector(loadingAppointmentsSelector);


  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAppointments());
    }, [, dispatch])
  );

  if (loading) {
    return <LoadingScreen />;
  }


  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {appointments?.map((appointment) => (
        <AppointmentCard 
          key={appointment.id} 
          appointment={appointment} 
          detailPath="/home/admin_organization/appointmentDetail"
        />
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
    paddingTop: 16,
  },
});

export default AppoinmentList;
