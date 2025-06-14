import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, HelperText, Checkbox, Text, Menu } from 'react-native-paper';
import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useForm, Controller } from 'react-hook-form';
import { getDifficultyTranslation, Hardness, RouteUpdate } from '@/types/Route';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoadingRoute, selectLoadingRouteUpdate, selectRoute, selectSuccessRouteUpdate } from '@/selectors/adminCompanyRouteSelector';
import { AppDispatch } from '@/store';
import { sessionDataSelector } from '@/selectors/sessionSelector';
import { getRoute, updateRoute } from '@/slices/adminCompanyRouteSlice';
import LoadingScreen from '@/components/LoadingScreen';
import LoadingOverlay from '@/components/LoadingOverlay';

const RouteEditScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [menuVisible, setMenuVisible] = useState(false);
  const [imageUri, setImageUri] = React.useState<string | null>(null);
  const route = useSelector(selectRoute);
  const isLoading = useSelector(selectLoadingRoute);
  const isLoadingUpdate = useSelector(selectLoadingRouteUpdate);
  const dispatch = useDispatch<AppDispatch>();
  const sessionData = useSelector(sessionDataSelector);
  const successRouteUpdate = useSelector(selectSuccessRouteUpdate);
  
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<RouteUpdate>({
    defaultValues: {
      id: undefined,
      name: '',
      description: "",
      minutes: "",
      hardness: undefined,
      distance: "",
      isActive: undefined,
      imageBase64: null,
    },
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
        setImageUri(result.assets[0].uri);
      }
    }
  };

  const onSubmit = (data: RouteUpdate) => {
    dispatch(updateRoute(data));
  };

  
  const getRouteData = React.useCallback(() => {
    if (sessionData) {
      dispatch(getRoute(id as string));
    }
  }, [sessionData, dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      getRouteData();
    }, [getRouteData])
  );

    // Set form values when organization data is loaded
    React.useEffect(() => {
      if (route && !isLoading) {
        setValue("id", route.id);
        setValue("name", route.name);
        setValue("description", route.description);
        setValue("minutes", route.minutes);
        setValue("hardness", route.hardness);
        setValue("distance", route.distance);
        setValue("isActive", route.isActive);
        if (route.mainImage?.publicUrl) {
          setImageUri(route.mainImage.publicUrl);
        }
      }
    }, [route, isLoading, setValue, setImageUri]);

  React.useEffect(() => {
    if (successRouteUpdate) {
      router.back();
    }
  }, [successRouteUpdate]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <CustomSafeAreaView>
      <LoadingOverlay visible={isLoadingUpdate} />
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
              rules={{ required: 'El título es requerido' }}
              name="name"
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    label="Título"
                    value={value}
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
                    value={value}
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

            <Controller
              control={control}
              rules={{ required: 'La imagen es requerida' }}
              name="imageBase64"
              render={() => (
                <>
                  <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
                    { imageUri ? (
                      <Image source={{ uri: imageUri }} style={styles.image} />
                    ) : (
                      <View style={styles.imagePlaceholder}>
                        <Text>Toque para seleccionar una imagen</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  <HelperText type="error" visible={!!errors.imageBase64}>{errors.imageBase64?.message}</HelperText>
                </>
              )}
            />

            <Controller
              control={control}
              rules={{ required: 'La duración es requerida' }}
              name="minutes"
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    label="Duración en minutos"
                    value={value}
                    onChangeText={onChange}
                    style={styles.input}
                    placeholder="Ej: 30 minutos"
                    error={!!errors.minutes}
                  />
                  <HelperText type="error" visible={!!errors.minutes}>{errors.minutes?.message}</HelperText>
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
                        <Text>{getDifficultyTranslation(value) || 'Seleccionar dificultad'}</Text>
                      </TouchableOpacity>
                    }
                  >
                    {Object.values(Hardness).map((hardness) => (
                      <Menu.Item
                        key={hardness}
                        onPress={() => {
                          setValue('hardness', hardness);
                          setMenuVisible(false);
                        }}
                        title={getDifficultyTranslation(hardness)}
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
            Guardar Cambios
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

export default RouteEditScreen; 