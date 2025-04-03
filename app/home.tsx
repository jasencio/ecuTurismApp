import Layout from "@/components/layout";
import Appoinments from "@/screens/appointments";
import Locations from "@/screens/locations";
import Profile from "@/screens/profile";
import React from "react";
import {
  BottomNavigation,
} from "react-native-paper";

const HomePage = () => {
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    {
      key: "appoinments",
      focusedIcon: "calendar",
      unfocusedIcon: "calendar-outline",
      title: undefined,
    },
    { key: "locations", focusedIcon: "hiking", title: undefined },
    {
      key: "profile",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
      title: undefined,
    },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    appoinments: Appoinments,
    locations: Locations,
    profile: Profile,
  });

  return (
    <Layout>
      {/* Bottom navigation */}
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ height: 50 }}
      />
    </Layout>
  );
};

export default HomePage;
