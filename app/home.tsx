import Layout from "@/components/layout";
import Appoinments from "@/screens/appointments";
import Locations from "@/screens/locations";
import Profile from "@/screens/profile";
import React from "react";
import { BottomNavigation, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TAB_INDICES } from "@/constants/tabs";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useSelector } from "react-redux";
import { loadingSelector } from "@/selectors/sessionSelector";

const HomePage = () => {
  const isLoading = useSelector(loadingSelector);
  const insets = useSafeAreaInsets();
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
    appoinments: () => <Appoinments currentTab={index} />,
    locations: () => <Locations currentTab={index} />,
    profile: () => <Profile currentTab={index} />,
  });

  return (
    <Layout safeAreaEdges={['top', 'left', 'right']}>
      <LoadingOverlay visible={isLoading} message="Espere..." />
      <BottomNavigation

        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{
          backgroundColor: '#FFFFFF',
          elevation: 8,
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          outlineColor: '#E0E0E0',
        }}
        activeColor="#4CAF50"
        inactiveColor="#9E9E9E"
        labeled={false}
        compact={true}
        safeAreaInsets={{ bottom: insets.bottom }}
        theme={{ colors: { secondaryContainer: "transparent" } }}
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
