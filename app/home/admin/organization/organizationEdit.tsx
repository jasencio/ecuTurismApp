import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Text,
  TextInput,
  Button,
  useTheme,
  Surface,
  Switch,
} from "react-native-paper";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import AdminSearch from "@/components/AdminSearch";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { fetchOrganization } from "@/slices/organizationSlice";
import { sessionDataSelector } from "@/selectors/sessionSelector";
import {
  loadingOrganizationSelector,
  organizationSelector,
} from "@/selectors/organizationSelector";
import LoadingScreen from "@/components/LoadingScreen";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface User {
  id: string;
  name: string;
  email: string;
}

// Form validation schema
const organizationSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  adminId: z.string().min(1, "El administrador es requerido"),
  adminName: z.string().min(1, "El nombre del administrador es requerido"),
  adminEmail: z.string().email("Email inválido"),
  phone: z.string().min(1, "El teléfono es requerido"),
  address: z.string().min(1, "La dirección es requerida"),
  status: z.boolean(),
});

type OrganizationFormData = z.infer<typeof organizationSchema>;



const OrganizationEdit = () => {
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const sessionData = useSelector(sessionDataSelector);
  const organization = useSelector(organizationSelector);
  const isLoadingOrganization = useSelector(loadingOrganizationSelector);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: organization?.name,
      description: organization?.description,
      adminId: organization?.adminId,
      adminName: organization?.adminName,
      adminEmail: organization?.adminEmail,
      phone: organization?.phone,
      address: organization?.address,
      status: organization?.status === "active",
    },
  });

  const fetchOrganizationData = React.useCallback(() => {
    if (sessionData) {
      dispatch(fetchOrganization(id as string));
    }
  }, [sessionData, dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      fetchOrganizationData();
    }, [fetchOrganizationData])
  );

  const handleAdminSelect = (user: User) => {
    setValue("adminId", user.id);
    setValue("adminName", user.name);
    setValue("adminEmail", user.email);
  };

  const onSubmit = (data: OrganizationFormData) => {
    console.log("Saving organization:", {
      ...data,
      status: data.status ? "active" : "inactive",
    });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  const initialAdmin = {
    id: organization?.adminId,
    name: organization?.adminName,
    email: organization?.adminEmail,
  };

  if (isLoadingOrganization) {
    return <LoadingScreen />;
  }

  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Surface
            style={[styles.section, { backgroundColor: theme.colors.surface }]}
            elevation={1}
          >
            <Text
              variant="titleMedium"
              style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
            >
              Información General
            </Text>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="Nombre de la organización"
                  value={value}
                  onChangeText={onChange}
                  style={styles.input}
                  mode="outlined"
                  error={!!errors.name}
                />
              )}
            />
            {errors.name && (
              <Text style={styles.errorText}>{errors.name.message}</Text>
            )}

            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="Descripción"
                  value={value}
                  onChangeText={onChange}
                  style={styles.input}
                  mode="outlined"
                  multiline
                  numberOfLines={3}
                  error={!!errors.description}
                />
              )}
            />
            {errors.description && (
              <Text style={styles.errorText}>{errors.description.message}</Text>
            )}

            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="Dirección"
                  value={value}
                  onChangeText={onChange}
                  style={styles.input}
                  mode="outlined"
                  error={!!errors.address}
                />
              )}
            />
            {errors.address && (
              <Text style={styles.errorText}>{errors.address.message}</Text>
            )}

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="Teléfono"
                  value={value}
                  onChangeText={onChange}
                  style={styles.input}
                  mode="outlined"
                  keyboardType="phone-pad"
                  error={!!errors.phone}
                />
              )}
            />
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone.message}</Text>
            )}
          </Surface>

          <Surface
            style={[styles.section, { backgroundColor: theme.colors.surface }]}
            elevation={1}
          >
            <Text
              variant="titleMedium"
              style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
            >
              Administrador
            </Text>

            <AdminSearch
              onSelect={handleAdminSelect}
              initialValue={initialAdmin}
            />
            {errors.adminId && (
              <Text style={styles.errorText}>{errors.adminId.message}</Text>
            )}
          </Surface>

          <Surface
            style={[styles.section, { backgroundColor: theme.colors.surface }]}
            elevation={1}
          >
            <View style={styles.statusContainer}>
              <Text
                variant="titleMedium"
                style={[styles.statusLabel, { color: theme.colors.onSurface }]}
              >
                Estado
              </Text>
              <View style={styles.switchContainer}>
                <Text
                  style={[
                    styles.statusText,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  {control._formValues.status ? "Activo" : "Inactivo"}
                </Text>
                <Controller
                  control={control}
                  name="status"
                  render={({ field: { onChange, value } }) => (
                    <Switch value={value} onValueChange={onChange} />
                  )}
                />
              </View>
            </View>
          </Surface>

          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={handleCancel}
              style={[styles.button, styles.cancelButton]}
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              style={[styles.button, styles.saveButton]}
            >
              Guardar
            </Button>
          </View>
        </ScrollView>
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  section: {
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 4,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusLabel: {
    fontWeight: "bold",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    borderColor: "#666",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
});

export default OrganizationEdit;
