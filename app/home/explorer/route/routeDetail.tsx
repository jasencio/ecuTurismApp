import Layout from "@/components/layout";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Card, IconButton, Text } from "react-native-paper";


const RouteDetail = () => {
  return (
    <Layout isHeaderAvailable={false}>
      <Text variant="titleMedium" style={styles.tile}>
        Detalle Ruta
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

export default RouteDetail;