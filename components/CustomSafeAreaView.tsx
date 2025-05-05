import React, { ReactNode } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";

export interface Props {
  children: ReactNode;
}

const CustomSafeAreaView: React.FC<Props> = ({ children }) => {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomSafeAreaView;
