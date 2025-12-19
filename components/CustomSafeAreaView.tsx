import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";

import { Edges } from "react-native-safe-area-context";

export interface Props {
  children: ReactNode;
  edges?: Edges;
}

const CustomSafeAreaView: React.FC<Props> = ({ children, edges }) => {
  const theme = useTheme();

  return (
    <SafeAreaView
      edges={edges}
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
