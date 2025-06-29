import { router, Stack } from "expo-router";
import { Provider } from "react-redux";
import store, { persistor } from "@/store";
import { PaperProvider } from "react-native-paper";
import { DefaultTheme } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';
import { useSelector } from "react-redux";
import { sessionDataSelector } from "@/selectors/sessionSelector";
import { useEffect } from "react";

function AppContent() {
  const sessionData = useSelector(sessionDataSelector);

  useEffect(() => {
    if (!sessionData) {
      router.replace("/");
    }
  }, [sessionData]);

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
          gestureEnabled: false,
          animation: 'none'
        }} 
      />
      <Stack.Screen 
        name="home" 
        options={{ 
          headerShown: false,
          gestureEnabled: false,
          animation: 'none'
        }} 
      />
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

      {/*Administrador de Organización */}
      <Stack.Screen name="home/admin_organization/organizationProfile" options={{ title: "Mi Organización" }} />
      <Stack.Screen name="home/admin_organization/organizationProfileUpdate" options={{ title: "Actualizar Organización" }} />
      <Stack.Screen name="home/admin_organization/routeList" options={{ title: "Gestión de Rutas" }} />
      <Stack.Screen name="home/admin_organization/guideList" options={{ title: "Guías" }} />
      <Stack.Screen name="home/admin_organization/guideDetail" options={{ title: "Guía" }} />
      <Stack.Screen name="home/admin_organization/appoinmentList" options={{ title: "Agendamientos" }} />
      <Stack.Screen name="home/admin_organization/routeCreate" options={{ title: "Crear Ruta" }} />
      <Stack.Screen name="home/admin_organization/routeEdit" options={{ title: "Editar Ruta" }} />
      <Stack.Screen name="home/admin_organization/routeDetail" options={{ title: "Ruta" }} />
      {/*Admin */}
      <Stack.Screen name="home/admin/userList" options={{ title: "Usuarios" }} />
      <Stack.Screen name="home/admin/userDetail" options={{ title: "Cambiar Rol" }} />
      <Stack.Screen name="home/admin/organization/organizationList" options={{ title: "Organizaciones" }} />
      <Stack.Screen name="home/admin/organization/organizationDetail" options={{ title: "Organización" }} />
      <Stack.Screen name="home/admin/organization/organizationCreate" options={{ title: "Crear Organización" }} />
      <Stack.Screen name="home/admin/organization/organizationEdit" options={{ title: "Editar Organización" }} />
    </Stack>
  );
}

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
        <PersistGate loading={null} persistor={persistor} onBeforeLift={() => {
          console.log('PersistGate: Before lift');
        }}>
          <AppContent />
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
}
