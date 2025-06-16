import Layout from "@/components/layout";
import Appoinments from "@/screens/appointments";
import Locations from "@/screens/locations";
import Profile from "@/screens/profile";
import React from "react";
import { BottomNavigation, useTheme } from "react-native-paper";
import { TAB_INDICES } from "@/constants/tabs";

const HomePage = () => {
  const theme = useTheme();
  const [index, setIndex] = React.useState(TAB_INDICES.LOCATIONS);
  const [routes] = React.useState([
    {
      key: "appoinments",
      focusedIcon: "calendar",
      unfocusedIcon: "calendar-outline",
      title: undefined,
    },
    { 
      key: "locations", 
      focusedIcon: "compass", 
      unfocusedIcon: "compass-outline",
      title: undefined 
    },
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
    profile: () => <Profile currentTab={index} />,
  });

  return (
    <Layout>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ 
          height: 60,
          backgroundColor: '#FFFFFF',
          elevation: 8,
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
        }}
        activeColor="#4CAF50"
        inactiveColor="#9E9E9E"
        labeled={false}
        compact={true}
        safeAreaInsets={{ bottom: 0 }}
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        }}
      />
    </Layout>
  );
};

export default HomePage;
