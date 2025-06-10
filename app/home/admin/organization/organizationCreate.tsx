import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, TextInput, Button, useTheme, Surface, Switch } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as ImagePicker from 'expo-image-picker';
import { AppDispatch } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { createOrganization } from '@/slices/organizationSlice';
import LoadingOverlay from '@/components/LoadingOverlay';
import { loadingOrganizationCreateSelector, successOrganizationCreateSelector } from '@/selectors/organizationSelector';

// Form validation schema
const organizationSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  phone: z.string().min(1, "El teléfono es requerido"),
  address: z.string().min(1, "La dirección es requerida"),
  isActive: z.boolean(),
  image: z.any().refine((val) => val !== undefined && val !== null, {
    message: "La imagen es requerida"
  }),
});

type OrganizationFormData = z.infer<typeof organizationSchema>;


const OrganizationCreate = () => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const successOrganizationCreate = useSelector(successOrganizationCreateSelector);
  const loadingOrganizationCreate = useSelector(loadingOrganizationCreateSelector);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: '',
      description: '',
      phone: '',
      address: '',
      isActive: true
    },
  });

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
    dispatch(createOrganization({
      organization: {
        ...data,
      },
      image: data.image
    }));
  };

  const handleCancel = () => {
    router.back();
  };

  React.useEffect(() => {
    if (successOrganizationCreate) {
      router.push('/home/admin/organization/organizationList');
    }
  }, [successOrganizationCreate]);

  return (
    <CustomSafeAreaView>
      <LoadingOverlay visible={loadingOrganizationCreate} />
      <View style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Surface style={[styles.section, { backgroundColor: theme.colors.surface }]} elevation={1}>
            <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
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
              {errors.image && (
                <Text style={styles.errorText}>La imagen es requerida</Text>
              )}
            </View>
          </Surface>

          <Surface style={[styles.section, { backgroundColor: theme.colors.surface }]} elevation={1}>
            <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
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

          <Surface style={[styles.section, { backgroundColor: theme.colors.surface }]} elevation={1}>
            <View style={styles.statusContainer}>
              <Text variant="titleMedium" style={[styles.statusLabel, { color: theme.colors.onSurface }]}>
                Estado
              </Text>
              <View style={styles.switchContainer}>
                <Text style={[styles.statusText, { color: theme.colors.onSurfaceVariant }]}>
                  {control._formValues.isActive ? 'Activo' : 'Inactivo'}
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
              style={[styles.button, styles.createButton]}
            >
              Crear
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
    backgroundColor: '#f5f5f5',
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
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    borderColor: '#666',
  },
  createButton: {
    backgroundColor: '#4CAF50',
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

export default OrganizationCreate; 