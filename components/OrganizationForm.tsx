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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as ImagePicker from 'expo-image-picker';
import LoadingOverlay from "@/components/LoadingOverlay";
import { Organization } from "@/types/Organization";

// Form validation schema
const organizationSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  phone: z.string().min(1, "El teléfono es requerido"),
  address: z.string().min(1, "La dirección es requerida"),
  isActive: z.boolean({ required_error: "El estado es requerido" }),
  image: z.any().optional(),
});

export type OrganizationFormData = z.infer<typeof organizationSchema>;

interface OrganizationFormProps {
  organization?: Organization;
  isLoading: boolean;
  isLoadingUpdate: boolean;
  onSubmit: (data: OrganizationFormData) => void;
  onCancel: () => void;
  showActiveToggle?: boolean;
}

const OrganizationForm = ({
  organization,
  isLoading,
  isLoadingUpdate,
  onSubmit,
  onCancel,
  showActiveToggle = true,
}: OrganizationFormProps) => {
  const theme = useTheme();
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
    if (organization && !isLoading) {
      setValue("name", organization.name);
      setValue("description", organization.description);
      setValue("phone", organization.phone);
      setValue("address", organization.address);
      if (showActiveToggle) {
        setValue("isActive", organization.isActive);
      }
      if (organization.image?.publicUrl) {
        setImageUri(organization.image.publicUrl);
      }
    }
  }, [organization, isLoading, setValue, showActiveToggle]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImageUri(imageUri);
      setValue('image', result.assets[0]);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <LoadingOverlay visible={isLoadingUpdate} />
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

        {showActiveToggle && (
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
                  {control._formValues.isActive ? "Activo" : "Inactivo"}
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
        )}

        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={onCancel}
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
    </>
  );
};

const styles = StyleSheet.create({
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

export default OrganizationForm; 