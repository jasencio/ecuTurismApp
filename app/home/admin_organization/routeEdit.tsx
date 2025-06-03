import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, HelperText, Checkbox, Text, Menu } from 'react-native-paper';
import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const difficulties = ['Fácil', 'Moderado', 'Difícil'];

const mockRoute = {
  title: 'Ruta del Río Verde',
  description: 'Hermosa ruta de senderismo a través de un frondoso bosque y vistas al río.',
  imageUri: 'https://picsum.photos/700',
  duration: '2 horas',
  difficulty: 'Moderado',
  status: true,
};

const RouteEditScreen = () => {
  const router = useRouter();
  const [form, setForm] = useState({ ...mockRoute });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [menuVisible, setMenuVisible] = useState(false);

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

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
    });

    if (!result.canceled) {
      handleChange('imageUri', result.assets[0].uri);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = 'El título es requerido';
    if (!form.description.trim()) newErrors.description = 'La descripción es requerida';
    if (!form.imageUri) newErrors.imageUri = 'La imagen es requerida';
    if (!form.duration.trim()) newErrors.duration = 'La duración es requerida';
    if (!form.difficulty) newErrors.difficulty = 'La dificultad es requerida';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    // TODO: Replace with API call
    console.log('Saving route:', form);
    router.push('/home/admin_organization/routeList');
  };

  return (
    <CustomSafeAreaView>
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
            <TextInput
              label="Título"
              value={form.title}
              onChangeText={v => handleChange('title', v)}
              style={styles.input}
              error={!!errors.title}
            />
            <HelperText type="error" visible={!!errors.title}>{errors.title}</HelperText>

            <TextInput
              label="Descripción"
              value={form.description}
              onChangeText={v => handleChange('description', v)}
              style={styles.input}
              multiline
              numberOfLines={3}
              error={!!errors.description}
            />
            <HelperText type="error" visible={!!errors.description}>{errors.description}</HelperText>

            <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
              {form.imageUri ? (
                <Image source={{ uri: form.imageUri }} style={styles.image} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text>Toque para seleccionar una imagen</Text>
                </View>
              )}
            </TouchableOpacity>
            <HelperText type="error" visible={!!errors.imageUri}>{errors.imageUri}</HelperText>

            <TextInput
              label="Duración"
              value={form.duration}
              onChangeText={v => handleChange('duration', v)}
              style={styles.input}
              placeholder="Ej: 2 horas"
              error={!!errors.duration}
            />
            <HelperText type="error" visible={!!errors.duration}>{errors.duration}</HelperText>

            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <TouchableOpacity 
                  onPress={() => setMenuVisible(true)}
                  style={[styles.input, styles.dropdownButton]}
                >
                  <Text>{form.difficulty || 'Seleccionar dificultad'}</Text>
                </TouchableOpacity>
              }
            >
              {difficulties.map((diff) => (
                <Menu.Item
                  key={diff}
                  onPress={() => {
                    handleChange('difficulty', diff);
                    setMenuVisible(false);
                  }}
                  title={diff}
                />
              ))}
            </Menu>
            <HelperText type="error" visible={!!errors.difficulty}>{errors.difficulty}</HelperText>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={form.status ? 'checked' : 'unchecked'}
                onPress={() => handleChange('status', !form.status)}
              />
              <Text style={styles.checkboxLabel}>Ruta activa</Text>
            </View>
          </View>
        </ScrollView>
        
        <View style={styles.buttonContainer}>
          <Button 
            mode="contained" 
            onPress={handleSave} 
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