import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import { Text, TextInput, Button, useTheme, Surface, Switch, Chip } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  timeOpenWeek: z.string(),
  timeCloseWeek: z.string(),
  timeOpenSaturday: z.string(),
  timeCloseSaturday: z.string(),
  timeOpenSunday: z.string(),
  timeCloseSunday: z.string(),
  daysWeekEnabled: z.array(z.string()),
});

type OrganizationFormData = z.infer<typeof organizationSchema>;

const DAYS_OF_WEEK = [
  { label: 'Lunes', value: 'Monday' },
  { label: 'Martes', value: 'Tuesday' },
  { label: 'Miércoles', value: 'Wednesday' },
  { label: 'Jueves', value: 'Thursday' },
  { label: 'Viernes', value: 'Friday' },
  { label: 'Sábado', value: 'Saturday' },
  { label: 'Domingo', value: 'Sunday' },
];

const OrganizationCreate = () => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const successOrganizationCreate = useSelector(successOrganizationCreateSelector);
  const loadingOrganizationCreate = useSelector(loadingOrganizationCreateSelector);
  const [showTimePicker, setShowTimePicker] = useState<string | null>(null);
  const [enabledDays, setEnabledDays] = useState<string[]>(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: '',
      description: '',
      phone: '',
      address: '',
      isActive: true,
      timeOpenWeek: '09:00',
      timeCloseWeek: '18:00',
      timeOpenSaturday: '09:00',
      timeCloseSaturday: '14:00',
      timeOpenSunday: '09:00',
      timeCloseSunday: '14:00',
      daysWeekEnabled: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
  });

  // Update form value when enabledDays changes
  React.useEffect(() => {
    setValue('daysWeekEnabled', enabledDays);
  }, [enabledDays, setValue]);

  const handleDayPress = (day: string) => {
    setEnabledDays((prev: string[]) => {
      if (prev.includes(day)) {
        // Remove the day if it's already enabled
        console.log('day-remove', day);
        return prev.filter((d: string) => d !== day);
      } else {
        console.log('day-add', day);
        // Add the day back if it's not enabled
        return [...prev, day].sort((a, b) => {
          const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
          return days.indexOf(a) - days.indexOf(b);
        });
      }
    });
  };

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
    if (!data.image) {
      return; // Don't submit if no image is selected
    }
    dispatch(createOrganization({
      organization: {
        ...data,
        image: data.image, // Ensure image is included
      },
      image: data.image
    }));
  };

  const handleCancel = () => {
    router.back();
  };

  const handleTimeChange = (event: any, selectedTime: Date | undefined, field: string) => {
    setShowTimePicker(null);
    if (selectedTime && event.type !== 'dismissed') {
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      setValue(field as any, `${hours}:${minutes}`);
    }
  };

  React.useEffect(() => {
    if (successOrganizationCreate) {
      router.back();
    }
  }, [successOrganizationCreate]);

  const renderTimePicker = (field: string, label: string) => (
    <View style={styles.timePickerContainer}>
      <Text variant="bodyMedium" style={styles.timeLabel}>{label}</Text>
      <Button
        mode="outlined"
        onPress={() => setShowTimePicker(field)}
        style={styles.timeButton}
      >
        {watch(field as any)}
      </Button>
      {showTimePicker === field && (
        <DateTimePicker
          value={new Date(`2000-01-01T${watch(field as any)}`)}
          mode="time"
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => handleTimeChange(event, date, field)}
        />
      )}
    </View>
  );

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
            <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Horario de Atención
            </Text>

            <View style={styles.daysContainer}>
              {DAYS_OF_WEEK.map((day) => (
                <Chip
                  key={day.value}
                  selected={enabledDays.includes(day.value)}
                  onPress={() => handleDayPress(day.value)}
                  style={enabledDays.includes(day.value) ? styles.dayChipSelected : styles.dayChipNotSelected}
                  showSelectedCheck={false}
                  textStyle={{ color: theme.colors.onPrimary }}
                >
                  {day.label}
                </Chip>
              ))}
            </View>

            <View style={styles.timeSection}>
              <Text variant="titleSmall" style={[styles.timeSectionTitle, { color: theme.colors.onSurface }]}>
                Días de Semana (Lunes - Viernes)
              </Text>
              <View style={styles.timeRow}>
                {renderTimePicker('timeOpenWeek', 'Apertura')}
                {renderTimePicker('timeCloseWeek', 'Cierre')}
              </View>
            </View>

            <View style={styles.timeSection}>
              <Text variant="titleSmall" style={[styles.timeSectionTitle, { color: theme.colors.onSurface }]}>
                Sábado
              </Text>
              <View style={styles.timeRow}>
                {renderTimePicker('timeOpenSaturday', 'Apertura')}
                {renderTimePicker('timeCloseSaturday', 'Cierre')}
              </View>
            </View>

            <View style={styles.timeSection}>
              <Text variant="titleSmall" style={[styles.timeSectionTitle, { color: theme.colors.onSurface }]}>
                Domingo
              </Text>
              <View style={styles.timeRow}>
                {renderTimePicker('timeOpenSunday', 'Apertura')}
                {renderTimePicker('timeCloseSunday', 'Cierre')}
              </View>
            </View>
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
              style={[styles.button]}
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
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  dayChipSelected: {
    marginBottom: 8,
    backgroundColor: 'green',
  },
  dayChipNotSelected: {
    marginBottom: 8,
    backgroundColor: 'red',
  },
  timeSection: {
    marginBottom: 16,
  },
  timeSectionTitle: {
    marginBottom: 8,
    fontWeight: '600',
  },
  timeRow: {
    flexDirection: 'row',
    gap: 16,
  },
  timePickerContainer: {
    flex: 1,
  },
  timeLabel: {
    marginBottom: 4,
  },
  timeButton: {
    borderColor: '#666',
  },
});

export default OrganizationCreate; 