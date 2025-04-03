import React from "react";
import { View, StyleSheet} from "react-native";
import { Text } from "react-native-paper";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.tile}>
        Perfil
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tile: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
});
export default Profile;
