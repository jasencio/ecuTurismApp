import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "@/store";
import { PaperProvider } from "react-native-paper";
import { DefaultTheme } from 'react-native-paper';

export default function RootLayout() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#6200ee',
      accent: '#03dac4',
    },
  };
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen
            name="forgotpassword"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </Provider>
    </PaperProvider>
  );
}
