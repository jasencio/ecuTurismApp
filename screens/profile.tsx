import React, { useState, useMemo } from "react";
import { ScrollView, StyleSheet, View, Animated, Dimensions } from "react-native";
import { TextInput, HelperText, Button, Text, IconButton, Portal, Modal } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { fetchSignup } from "@/slices/loginSlice";
import { SignupRequest } from "@/types/Session";
import { sessionDataSelector } from "@/selectors/sessionSelector";
import { fetchProfile } from "@/slices/profileSlice";
import { profileDataSelector, loadingSelector } from "@/selectors/profileSelector";
import { ProfileResponse } from "@/types/Profile";
import LoadingScreen from "@/components/LoadingScreen";

type ProfileUpdateRequest = {
  name: string;
  email: string;
  phone: string;
  password?: string;
  passwordConfirmation?: string;
};

// Validation Schema using Zod
const schema = z
  .object({
    name: z.string().min(1, "El nombre es requerido."),
    email: z.string().email("El correo electrónico no es válido."),
    phone: z.string().regex(/^[0-9]{9,15}$/, "El teléfono no es válido."),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres.")
      .optional(),
    passwordConfirmation: z
      .string()
      .min(6, "La confirmación de contraseña es requerida.")
      .optional(),
  })
  .refine((data) => {
    if (data.password || data.passwordConfirmation) {
      return data.password === data.passwordConfirmation;
    }
    return true;
  }, {
    message: "Las contraseñas no coinciden.",
    path: ["passwordConfirmation"],
  });

interface ProfileProps {
  loading?: boolean;
  isRegistered?: boolean;
}

interface ProfileFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  control: any;
  name: keyof ProfileUpdateRequest;
  errors: any;
  isPassword?: boolean;
  showSecureText?: boolean;
  setShowSecureText?: (show: boolean) => void;
}

const ProfileField = React.memo(({ 
  label, 
  value, 
  isEditing, 
  control, 
  name, 
  errors, 
  isPassword = false, 
  showSecureText = true, 
  setShowSecureText = () => {} 
}: ProfileFieldProps) => {
  return (
    <View style={styles.fieldContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
});

const EditField = React.memo(({ 
  label, 
  value, 
  control, 
  name, 
  errors, 
  isPassword = false, 
  showSecureText = true, 
  setShowSecureText = () => {} 
}: Omit<ProfileFieldProps, 'isEditing'>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <TextInput
            mode="outlined"
            label={label}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={isPassword && showSecureText}
            style={styles.input}
            right={
              isPassword ? (
                <TextInput.Icon
                  icon={showSecureText ? "eye" : "eye-off"}
                  forceTextInputFocus={false}
                  onPress={() => setShowSecureText(!showSecureText)}
                />
              ) : null
            }
          />
          {errors[name]?.message && (
            <HelperText type="error">{errors[name]?.message}</HelperText>
          )}
        </>
      )}
    />
  );
});

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const sessionData = useSelector(sessionDataSelector);
  const profileData = useSelector(profileDataSelector) as ProfileResponse | undefined;
  const isLoading = useSelector(loadingSelector);
  const [showSecureText, setShowSecureText] = useState(true);
  const [showSecureText2, setShowSecureText2] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  React.useEffect(() => {
    if (sessionData) {
      dispatch(fetchProfile());
    }
  }, [sessionData]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ProfileUpdateRequest>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: profileData?.email || "",
      name: profileData?.name || "",
      phone: profileData?.phone || "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const formValues = watch();

  // Reset form with current values when opening edit mode
  React.useEffect(() => {
    if (isEditing && profileData) {
      reset({
        email: profileData.email,
        name: profileData.name,
        phone: profileData.phone,
        password: "",
        passwordConfirmation: "",
      });
    }
  }, [isEditing, profileData]);

  const onSubmit = (data: ProfileUpdateRequest) => {
    console.log("Submitting:", data);
    // TODO: Implement profile update action
    setIsEditing(false);
  };

  const fields = useMemo(() => [
    { label: "Nombre", name: "name" as keyof ProfileUpdateRequest, value: profileData?.name || formValues.name },
    { label: "Correo", name: "email" as keyof ProfileUpdateRequest, value: profileData?.email || formValues.email },
    { label: "Teléfono", name: "phone" as keyof ProfileUpdateRequest, value: profileData?.phone || formValues.phone },
  ], [formValues, profileData]);

  const passwordFields = useMemo(() => [
    {
      label: "Contraseña",
      name: "password" as keyof ProfileUpdateRequest,
      value: formValues.password || "",
      isPassword: true,
      showSecureText,
      setShowSecureText,
    },
    {
      label: "Confirmar Contraseña",
      name: "passwordConfirmation" as keyof ProfileUpdateRequest,
      value: formValues.passwordConfirmation || "",
      isPassword: true,
      showSecureText: showSecureText2,
      setShowSecureText: setShowSecureText2,
    },
  ], [formValues, showSecureText, showSecureText2]);

  return (
    <>
      {isLoading && <LoadingScreen message="Cargando perfil..." />}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.title}>
            Perfil
          </Text>
          <IconButton
            icon="pencil"
            onPress={() => setIsEditing(true)}
            disabled={isLoading}
          />
        </View>

        {fields.map((field) => (
          <ProfileField
            key={field.name}
            {...field}
            isEditing={false}
            control={control}
            errors={errors}
          />
        ))}
      </ScrollView>

      <Portal>
        <Modal
          visible={isEditing}
          onDismiss={() => setIsEditing(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleContainer}>
                <Text variant="titleLarge" style={styles.modalTitle}>
                  Editar Perfil
                </Text>
                <Text variant="bodySmall" style={styles.modalSubtitle}>
                  Actualiza tu información personal
                </Text>
              </View>
              <IconButton
                icon="close"
                size={24}
                onPress={() => setIsEditing(false)}
                disabled={isLoading}
              />
            </View>

            <ScrollView style={styles.modalScroll} contentContainerStyle={styles.modalScrollContent}>
              <View style={styles.formContainer}>
                {fields.map((field) => (
                  <EditField
                    key={field.name}
                    {...field}
                    control={control}
                    errors={errors}
                  />
                ))}

                <View style={styles.passwordSection}>
                  <Text variant="titleSmall" style={styles.sectionTitle}>
                    Cambiar Contraseña
                  </Text>
                  {passwordFields.map((field) => (
                    <EditField
                      key={field.name}
                      {...field}
                      control={control}
                      errors={errors}
                    />
                  ))}
                </View>

                <Button
                  mode="contained"
                  onPress={handleSubmit(onSubmit)}
                  style={styles.button}
                  contentStyle={styles.buttonContent}
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Guardar Cambios
                </Button>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  fieldContainer: {
    marginVertical: 1,
  },
  labelContainer: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#000',
  },
  input: {
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 0,
    marginTop: 'auto',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '98%',
  },
  modalContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitleContainer: {
    flex: 1,
    marginRight: 16,
  },
  modalTitle: {
    fontWeight: '600',
  },
  modalSubtitle: {
    color: '#666',
    marginTop: 4,
  },
  modalScroll: {
    flex: 1,
  },
  modalScrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  passwordSection: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#666',
  },
  button: {
    marginTop: 32,
    marginBottom: 16,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
