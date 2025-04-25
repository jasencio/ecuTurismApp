import React, { ReactNode, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Appbar, useTheme, Drawer } from "react-native-paper";

export interface Props {
  children: ReactNode;
  isHeaderAvailable?: boolean;
}

const Layout: React.FC<Props> = ({ children, isHeaderAvailable = true }) => {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [active, setActive] = useState("home");

  // Close drawer when clicking outside
  const handleOutsidePress = () => {
    if (isDrawerOpen) {
      setIsDrawerOpen(false);
    }
    Keyboard.dismiss(); // Hide keyboard if open
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Detects outside taps, but allows scrolling inside children */}
      <TouchableWithoutFeedback onPress={handleOutsidePress} accessible={false}>
        <View style={styles.container}>
          {/* Header with Drawer Toggle */}
          {isHeaderAvailable && (
            <Appbar.Header>
              <Appbar.Action
                icon="menu"
                onPress={() => setIsDrawerOpen(!isDrawerOpen)}
              />
              <Appbar.Content title="Explore Nature" />
            </Appbar.Header>
          )}
          {/* Ensures children can scroll while keeping touch detection */}
          <View style={styles.content}>{children}</View>

          {/* Overlay to detect clicks outside */}
          {isDrawerOpen && <View style={styles.overlay} />}

          {/* Drawer Menu (Visible when open) */}
          {isDrawerOpen && (
            <View style={styles.drawerContainer}>
              <Drawer.Section title="Administracion">
                <Drawer.Item
                  label="Usuarios"
                  icon="account-multiple"
                  active={active === "users"}
                  onPress={() => {
                    setActive("users");
                    setIsDrawerOpen(false);
                  }}
                />
              </Drawer.Section>
              <Drawer.Section title="Supervisor">
                <Drawer.Item
                  label="Rutas"
                  icon="compass"
                  active={active === "routes"}
                  onPress={() => {
                    setActive("routes");
                    setIsDrawerOpen(false);
                  }}
                />
                <Drawer.Item
                  label="Guias"
                  icon="account-multiple"
                  active={active === "guides"}
                  onPress={() => {
                    setActive("guides");
                    setIsDrawerOpen(false);
                  }}
                />
                <Drawer.Item
                  label="Agendamientos"
                  icon="calendar-blank-multiple"
                  active={active === "scheduling"}
                  onPress={() => {
                    setActive("scheduling");
                    setIsDrawerOpen(false);
                  }}
                />
              </Drawer.Section>
              <Drawer.Section title="Guia">
                <Drawer.Item
                  label="Asignaciones"
                  icon="calendar-alert"
                  active={active === "assignments"}
                  onPress={() => {
                    setActive("assignments");
                    setIsDrawerOpen(false);
                  }}
                />
              </Drawer.Section>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1, // Allows children to expand & scroll properly
  },
  drawerContainer: {
    position: "absolute",
    left: 0,
    width: 250,
    backgroundColor: "white",
    height: "100%",
    zIndex: 2,
    elevation: 4,
    paddingTop: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent background
    zIndex: 1,
  },
});

export default Layout;
