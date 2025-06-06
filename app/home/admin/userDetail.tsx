import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Text,
  useTheme,
  Button,
  Portal,
  Dialog,
  Card,
  Checkbox,
} from "react-native-paper";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { sessionDataSelector } from "@/selectors/sessionSelector";
import { fetchUser, updateUser } from "@/slices/usersSlice";
import {
  loadingUserSelector,
  loadingUserUpdateSelector,
  successUpdateUserSelector,
  userSelector,
} from "@/selectors/usersSelectors";
import LoadingScreen from "@/components/LoadingScreen";
import { roleDisplayNames, UserRole, User } from "@/types/Users";
import { getRoleColor } from "./userList";
import { useForm, Controller } from "react-hook-form";
import LoadingOverlay from "@/components/LoadingOverlay";

const UserDetail = () => {
  const theme = useTheme();
  const router = useRouter();
  const { userId } = useLocalSearchParams();
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const sessionData = useSelector(sessionDataSelector);
  const isLoadingUser = useSelector(loadingUserSelector);
  const isLoadingUserUpdate = useSelector(loadingUserUpdateSelector);
  const user = useSelector(userSelector);
  const successUpdateUser = useSelector(successUpdateUserSelector);

  const { control, handleSubmit, setValue, watch } = useForm<User>({
    defaultValues: {
      roles: [],
      id: userId as string,
    },
  });

  const selectedRoles = watch("roles");

  // Initialize selected roles when user data is loaded
  React.useEffect(() => {
    if (user?.roles) {
      setValue("roles", user.roles);
    }
  }, [user, setValue]);

  const fetchUsersData = React.useCallback(() => {
    if (sessionData) {
      dispatch(fetchUser(userId as string));
    }
  }, [sessionData, dispatch]);

  // Fetch on initial mount
  React.useEffect(() => {
    fetchUsersData();
  }, [fetchUsersData]);

  // Fetch when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchUsersData();
    }, [fetchUsersData])
  );

  React.useEffect(() => {
    if (successUpdateUser) {
      router.back();
    }
  }, [successUpdateUser]);

  if (isLoadingUser) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <CustomSafeAreaView>
        <Text>Usuario no encontrado</Text>
      </CustomSafeAreaView>
    );
  }

  const onSubmit = (data: User) => {
    console.log("Saving new roles:", data.roles);
    setShowSaveDialog(true);
  };

  const handleSave = () => {
    dispatch(updateUser(watch()));
    setShowSaveDialog(false);
  };

  const roles = [
    {
      value: UserRole.ADMIN_SYSTEM,
      label: roleDisplayNames[UserRole.ADMIN_SYSTEM],
      description: "Acceso completo al sistema",
    },
    {
      value: UserRole.ADMIN_COMPANY,
      label: roleDisplayNames[UserRole.ADMIN_COMPANY],
      description: "Gestión de compañía y guías",
    },
    {
      value: UserRole.TOURIST_GUIDE,
      label: roleDisplayNames[UserRole.TOURIST_GUIDE],
      description: "Gestión de rutas y turistas",
    },
    {
      value: UserRole.TOURIST,
      label: roleDisplayNames[UserRole.TOURIST],
      description: "Acceso a rutas y reservas",
    },
  ];

  return (
    <CustomSafeAreaView>
      <LoadingOverlay visible={isLoadingUserUpdate} message="Actualizando..." />
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.header}>
              <Text variant="headlineMedium" style={styles.name}>
                {user?.name}
              </Text>
              {user?.roles?.map((role, index) => (
                <View
                  key={index}
                  style={[
                    styles.roleContainer,
                    { backgroundColor: getRoleColor(role) },
                  ]}
                >
                  <Text style={styles.roleText}>{roleDisplayNames[role]}</Text>
                </View>
              ))}
            </View>

            <View style={styles.infoSection}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Email
              </Text>
              <Text style={styles.emailText}>{user?.email}</Text>
            </View>

            <View style={styles.roleSection}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Cambiar Roles
              </Text>
              {roles?.map((role) => (
                <Controller
                  key={role.value}
                  control={control}
                  name="roles"
                  render={({ field: { onChange, value } }) => (
                    <Card
                      style={[
                        styles.roleCard,
                        value?.includes(role.value) && styles.selectedRoleCard,
                      ]}
                      onPress={() => {
                        const newRoles = value?.includes(role.value)
                          ? value.filter((r) => r !== role.value)
                          : [...(value || []), role.value];
                        onChange(newRoles);
                      }}
                    >
                      <Card.Content style={styles.roleCardContent}>
                        <View style={styles.roleCardLeft}>
                          <Checkbox
                            status={
                              value?.includes(role.value)
                                ? "checked"
                                : "unchecked"
                            }
                            onPress={() => {
                              const newRoles = value?.includes(role.value)
                                ? value.filter((r) => r !== role.value)
                                : [...(value || []), role.value];
                              onChange(newRoles);
                            }}
                          />
                          <View style={styles.roleCardTextContainer}>
                            <Text
                              variant="titleMedium"
                              style={styles.roleLabel}
                            >
                              {role.label}
                            </Text>
                            <Text
                              variant="bodySmall"
                              style={styles.roleDescription}
                            >
                              {role.description}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={[
                            styles.roleIndicator,
                            { backgroundColor: getRoleColor(role.value) },
                          ]}
                        />
                      </Card.Content>
                    </Card>
                  )}
                />
              ))}
            </View>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={styles.saveButton}
          disabled={selectedRoles?.length === 0}
        >
          Guardar Cambios
        </Button>

        <Portal>
          <Dialog
            visible={showSaveDialog}
            onDismiss={() => setShowSaveDialog(false)}
          >
            <Dialog.Title>Confirmar Cambio de Roles</Dialog.Title>
            <Dialog.Content>
              <Text>
                ¿Estás seguro de que deseas cambiar los roles de {user?.name} a{" "}
                {selectedRoles
                  ?.map((role) => roleDisplayNames[role])
                  .join(", ")}
                ?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShowSaveDialog(false)}>Cancelar</Button>
              <Button onPress={() => handleSave()}>Guardar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  header: {
    marginBottom: 24,
  },
  name: {
    marginBottom: 8,
  },
  roleContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  roleText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  emailText: {
    fontSize: 16,
    color: "#666",
  },
  roleSection: {
    marginBottom: 24,
  },
  roleCard: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  selectedRoleCard: {
    borderColor: "#2196F3",
    borderWidth: 2,
  },
  roleCardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  roleCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  roleCardTextContainer: {
    marginLeft: 8,
    flex: 1,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  roleDescription: {
    color: "#666",
    marginTop: 2,
  },
  roleIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  saveButton: {
    marginTop: 8,
    marginBottom: 24,
  },
});

export default UserDetail;
