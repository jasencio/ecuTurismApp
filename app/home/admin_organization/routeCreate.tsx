import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, HelperText, Checkbox, Text, Menu } from 'react-native-paper';
import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useForm, Controller } from 'react-hook-form';
import { Route, Hardness, RouteCreate } from '@/types/Route';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoadingRouteCreate, selectSuccessRouteCreate } from '@/selectors/adminCompanyRouteSelector';
import LoadingOverlay from '@/components/LoadingOverlay';
import { createRoute } from '@/slices/adminCompanyRouteSlice';
import { AppDispatch } from '@/store';

const difficulties = [
  { label: 'Fácil', value: Hardness.LOW },
  { label: 'Moderado', value: Hardness.MEDIUM },
  { label: 'Difícil', value: Hardness.HIGH }
];

const RouteCreateScreen = () => {
  const router = useRouter();
  const isLoadingRouteCreate = useSelector(selectLoadingRouteCreate);
  const successRouteCreate = useSelector(selectSuccessRouteCreate);
  const dispatch = useDispatch<AppDispatch>();
  const [menuVisible, setMenuVisible] = useState(false);
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<RouteCreate>({
    defaultValues: {
      name: '',
      description: '',
      minutes: '',
      hardness: null,
      distance: '',
      isActive: true,
      imageBase64: null,
    }
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Se necesita permiso para acceder a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      if (result.assets[0].base64) {
        setValue('imageBase64', result.assets[0].base64);
      }
    }
  };

  const onSubmit = (data: RouteCreate) => {
    dispatch(createRoute(data));
  };

  const imageBase64 = watch('imageBase64');

  React.useEffect(() => {
    if (successRouteCreate) {
      router.back();
    }
  }, [successRouteCreate]);


  return (
    <CustomSafeAreaView>
      <LoadingOverlay visible={isLoadingRouteCreate} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
            <Controller
              control={control}
              rules={{ required: 'El nombre es requerido' }}
              name="name"
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    label="Nombre"
                    value={value || ''}
                    onChangeText={onChange}
                    style={styles.input}
                    error={!!errors.name}
                  />
                  <HelperText type="error" visible={!!errors.name}>{errors.name?.message}</HelperText>
                </>
              )}
            />

            <Controller
              control={control}
              rules={{ required: 'La descripción es requerida' }}
              name="description"
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    label="Descripción"
                    value={value || ''}
                    onChangeText={onChange}
                    style={styles.input}
                    multiline
                    numberOfLines={3}
                    error={!!errors.description}
                  />
                  <HelperText type="error" visible={!!errors.description}>{errors.description?.message}</HelperText>
                </>
              )}
            />

            <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
              {imageBase64 ? (
                <Image source={{ uri: `data:image/jpeg;base64,${imageBase64}` }} style={styles.image} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text>Toque para seleccionar una imagen</Text>
                </View>
              )}
            </TouchableOpacity>
            <HelperText type="error" visible={!!errors.imageBase64}>{errors.imageBase64?.message}</HelperText>

            <Controller
              control={control}
              rules={{ required: 'La duración es requerida' }}
              name="minutes"
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    label="Duración (minutos)"
                    value={value || ''}
                    onChangeText={onChange}
                    style={styles.input}
                    keyboardType="numeric"
                    error={!!errors.minutes}
                  />
                  <HelperText type="error" visible={!!errors.minutes}>{errors.minutes?.message}</HelperText>
                </>
              )}
            />

            <Controller
              control={control}
              rules={{ required: 'La distancia es requerida' }}
              name="distance"
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    label="Distancia (km)"
                    value={value || ''}
                    onChangeText={onChange}
                    style={styles.input}
                    keyboardType="numeric"
                    error={!!errors.distance}
                  />
                  <HelperText type="error" visible={!!errors.distance}>{errors.distance?.message}</HelperText>
                </>
              )}
            />

            <Controller
              control={control}
              rules={{ required: 'La dificultad es requerida' }}
              name="hardness"
              render={({ field: { value } }) => (
                <>
                  <Menu
                    visible={menuVisible}
                    onDismiss={() => setMenuVisible(false)}
                    anchor={
                      <TouchableOpacity 
                        onPress={() => setMenuVisible(true)}
                        style={[styles.input, styles.dropdownButton]}
                      >
                        <Text>{difficulties.find(d => d.value === value)?.label || 'Seleccionar dificultad'}</Text>
                      </TouchableOpacity>
                    }
                  >
                    {difficulties.map((diff) => (
                      <Menu.Item
                        key={diff.value}
                        onPress={() => {
                          setValue('hardness', diff.value);
                          setMenuVisible(false);
                        }}
                        title={diff.label}
                      />
                    ))}
                  </Menu>
                  <HelperText type="error" visible={!!errors.hardness}>{errors.hardness?.message}</HelperText>
                </>
              )}
            />

            <Controller
              control={control}
              name="isActive"
              render={({ field: { onChange, value } }) => (
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    status={value ? 'checked' : 'unchecked'}
                    onPress={() => onChange(!value)}
                  />
                  <Text style={styles.checkboxLabel}>Ruta activa</Text>
                </View>
              )}
            />
          </View>
        </ScrollView>
        
        <View style={styles.buttonContainer}>
          <Button 
            mode="contained" 
            onPress={handleSubmit(onSubmit)} 
            style={styles.button}
          >
            Crear Ruta
          </Button>
        </View>
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  form: { 
    padding: 16,
  },
  input: { 
    marginBottom: 4,
    backgroundColor: 'white',
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  button: { 
    width: '100%',
  },
  imageContainer: {
    marginVertical: 12,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: 'white',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default RouteCreateScreen; 

function loadingRouteUpdate(state: unknown): unknown {
  throw new Error('Function not implemented.');
}
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

