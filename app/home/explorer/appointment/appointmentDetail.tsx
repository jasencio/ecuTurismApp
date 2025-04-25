import Layout from "@/components/layout";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Card, IconButton, Text } from "react-native-paper";


const AppoinmentDetail = () => {
  return (
    <Layout isHeaderAvailable={false}>
      <Text variant="titleMedium" style={styles.tile}>
        Detalle Agendamiento
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  tile: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
});

export default AppoinmentDetail;
