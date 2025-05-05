import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, Card, Text } from "react-native-paper";

const CustomCard = () => {
  const router = useRouter();


  return (
    <TouchableWithoutFeedback>
      <Card style={styles.card}>
        <Card.Title title="Bike Park" />
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Actions>
          <Button onPress={ () => router.push("/home/explorer/route/routeList")}>Ver</Button>
        </Card.Actions>
      </Card>
    </TouchableWithoutFeedback>
  );
};

const Locations = () => {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.whatsNew}>
        ¿Dónde deseas ir?
      </Text>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {[1, 2, 3, 4].map((key) => {
          return <CustomCard key={key}></CustomCard>;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  whatsNew: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
  card: {
    marginBottom: 16,
  },
});
export default Locations;
