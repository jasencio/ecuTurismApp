import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import React from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import {
  Text,
  TextInput,
  Button,
  useTheme,
  Surface,
  Switch,
} from "react-native-paper";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { getOrganization, updateOrganization } from "@/slices/organizationSlice";
import { sessionDataSelector } from "@/selectors/sessionSelector";
import {
  loadingOrganizationSelector,
  loadingOrganizationUpdateSelector,
  organizationSelector,
  successOrganizationUpdateSelector,
} from "@/selectors/organizationSelector";
import LoadingScreen from "@/components/LoadingScreen";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as ImagePicker from 'expo-image-picker';
import LoadingOverlay from "@/components/LoadingOverlay";

// Form validation schema
const organizationSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  phone: z.string().min(1, "El teléfono es requerido"),
  address: z.string().min(1, "La dirección es requerida"),
  isActive: z.boolean(),
  image: z.any().optional(),
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
  const isLoadingOrganizationUpdate = useSelector(loadingOrganizationUpdateSelector);
  const successOrganizationUpdate = useSelector(successOrganizationUpdateSelector);
  const [imageUri, setImageUri] = React.useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      description: "",
      phone: "",
      address: "",
      isActive: false,
    },
  });

  // Set form values when organization data is loaded
  React.useEffect(() => {
    if (organization && !isLoadingOrganization) {
      setValue("name", organization.name);
      setValue("description", organization.description);
      setValue("phone", organization.phone);
      setValue("address", organization.address);
      setValue("isActive", organization.isActive);
    }
  }, [organization, isLoadingOrganization, setValue]);

  const fetchOrganizationData = React.useCallback(() => {
    if (sessionData) {
      dispatch(getOrganization(id as string));
    }
  }, [sessionData, dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      fetchOrganizationData();
    }, [fetchOrganizationData])
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setValue('image', result.assets[0]);
    }
  };

  const onSubmit = (data: OrganizationFormData) => {
    dispatch(updateOrganization({
      organization: {
        ...data,
        id: id as string
      },
      image: data.image
    }));
  };

  const handleCancel = () => {
    router.back();
  };

  React.useEffect(() => {
    if (successOrganizationUpdate) {
      router.push('/home/admin/organization/organizationList');
    }
  }, [successOrganizationUpdate]);

  if (isLoadingOrganization) {
    return <LoadingScreen />;
  }

  return (
    <CustomSafeAreaView>
      <LoadingOverlay visible={isLoadingOrganizationUpdate} />
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
              Imagen de la Organización
            </Text>
            
            <View style={styles.imageContainer}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
              ) : (
                <View style={[styles.imagePlaceholder, { backgroundColor: theme.colors.surfaceVariant }]}>
                  <Text style={{ color: theme.colors.onSurfaceVariant }}>Sin imagen</Text>
                </View>
              )}
              <Button
                mode="outlined"
                onPress={pickImage}
                style={styles.imageButton}
              >
                Seleccionar Imagen
              </Button>
            </View>
          </Surface>

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
                  name="isActive"
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
  imageContainer: {
    alignItems: 'center',
    gap: 12,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButton: {
    width: '100%',
  },
});

export default OrganizationEdit;
