import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import {
  Avatar,
  Card,
  Text,
} from "react-native-paper";
import { useRouter } from "expo-router";

interface CustomCardProps {
  title: string;
  subtitle: string;
}

const CustomCardRoute: React.FC<CustomCardProps> = ({ title, subtitle }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.navigate ("/home/explorer/route/routeDetail");
      }}
    >
      <Card.Title
        title={title}
        subtitle={subtitle}
        left={() => (
          <Avatar.Image
            size={48}
            source={{ uri: "https://picsum.photos/700" }}
          />
        )}
      />
    </TouchableOpacity>
  );
};

const RouteList = () => {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.tile}>
        Rutas de Senderismo
      </Text>

      <ScrollView  keyboardShouldPersistTaps="handled">
        {[1, 2, 3].map((key) => {
          return (
            <CustomCardRoute
              key={key}
              title={`Sendero ${key}`}
              subtitle="Detalle"
            ></CustomCardRoute>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  tile: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
});

export default RouteList;
