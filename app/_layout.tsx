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
      background: "white"
    },
  };
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false, title: "Inicio"}} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen
            name="forgotpassword"
            options={{ headerShown: false }}
          />

          {/*Explorer */}
          <Stack.Screen name="home/explorer/appointment/appointmentCreate" options={{ title: "Agendamiento" }} />
          <Stack.Screen name="home/explorer/appointment/appointmentDetail" options={{ title: "Detalle Agendamiento" }} />
          <Stack.Screen name="home/explorer/route/routeList" options={{ title: "Rutas" }} />
          <Stack.Screen name="home/explorer/route/routeDetail" options={{ title: "Ruta" }} />

           {/*Guide */}
           <Stack.Screen name="home/guides/assignmentList" options={{ title: "Asignaciones" }} />

            {/*Supervisor */}
            <Stack.Screen name="home/supervisor/routeList" options={{ title: "Gestión de Rutas" }} />
            <Stack.Screen name="home/supervisor/guideList" options={{ title: "Guías" }} />
            <Stack.Screen name="home/supervisor/appoinmentList" options={{ title: "Agendamientos" }} />
            <Stack.Screen name="home/supervisor/organization" options={{ title: "Organización" }} />
            {/*Admin */}
            <Stack.Screen name="home/admin/userList" options={{ title: "Usuarios" }} />
            <Stack.Screen name="home/admin/userDetail" options={{ title: "Cambiar Rol" }} />
            <Stack.Screen name="home/admin/organization/organizationList" options={{ title: "Organizaciones" }} />
            <Stack.Screen name="home/admin/organization/organizationDetail" options={{ title: "Organización" }} />
            <Stack.Screen name="home/admin/organization/organizationCreate" options={{ title: "Crear Organización" }} />
            <Stack.Screen name="home/admin/organization/organizationEdit" options={{ title: "Editar Organización" }} />
        </Stack>
      </Provider>
    </PaperProvider>
  );
}
