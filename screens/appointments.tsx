import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Card,
  Divider,
  IconButton,
  Menu,
  Text,
  Button,
} from "react-native-paper";
import { useRouter } from "expo-router";

const CustomCard = () => {
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <Card.Title
      title="Bosque"
      subtitle="Bosque protector"
      left={(props) => (
        <Avatar.Image size={48} source={{ uri: "https://picsum.photos/700" }} />
      )}
      right={(props) => (
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
            title="Ver"
          />
        </Menu>
      )}
    />
  );
};

const Appoinments = () => {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.tile}>
        Agendamientos
      </Text>

      {[1, 2, 3, 4].map((key) => {
        return <CustomCard key={key}></CustomCard>;
      })}
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

export default Appoinments;
