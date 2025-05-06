import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import {
  Card,
  Text,
} from "react-native-paper";
import { useRouter } from "expo-router";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";

const { height } = Dimensions.get("window");

const CustomCard = () => {
  const router = useRouter();
  const imageUrl = "https://picsum.photos/700"; // Replace with your own image URL

  return (
    <TouchableWithoutFeedback onPress={()=>{
        router.navigate("/home/explorer/appointment/appointmentDetail");
    }} accessible={false}>
      <Card style={styles.card}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <Card.Content>
          <Text variant="titleSmall" style={styles.title}>
            Ubicacion
          </Text>
          <Text variant="bodySmall" style={styles.text}>
            Bike Park
          </Text>
        </Card.Content>
      </Card>
    </TouchableWithoutFeedback>
  );
};

const AssignmentList = () => {
  return (
    <CustomSafeAreaView>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {[1, 2,].map((key) => {
          return <CustomCard key={key}></CustomCard>;
        })}
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
  card: {
    marginTop: 10,
    //marginBottom: 16,
  },
  image: {
    height: height * 0.2,
    width: "100%",
    borderRadius: 15
  },
  title: {
    marginTop: 4,
    fontWeight: "bold",
  },
  text: {
    marginBottom: 2,
  },
});

export default AssignmentList;
