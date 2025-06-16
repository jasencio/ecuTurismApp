import React, { useState, useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  TextInput,
  HelperText,
  Button,
  Text,
  IconButton,
  Portal,
  Modal,
} from "react-native-paper";
import { useForm, Controller, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { sessionDataSelector } from "@/selectors/sessionSelector";
import { fetchProfile, fetchUpdateProfile } from "@/slices/profileSlice";
import {
  profileDataSelector,
  loadingProfileSelector,
  loadingUpdateSelector,
  successUpdateSelector,
} from "@/selectors/profileSelector";
import { ProfileResponse, ProfileUpdateRequest } from "@/types/Profile";
import LoadingOverlay from "@/components/LoadingOverlay";
import LoadingScreen from "@/components/LoadingScreen";
import { useFocusEffect } from "expo-router";

// Validation Schema using Zod
const schema = z
  .object({
    name: z.string().min(1, "El nombre es requerido."),
    email: z.string().email("El correo electrónico no es válido."),
    phone: z.string().regex(/^[0-9]{9,15}$/, "El teléfono no es válido."),
    password: z.string().optional(),
    passwordConfirmation: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const password = data.password ?? "";
    const passwordConfirmation = data.passwordConfirmation ?? "";

    // Only run validation if at least one is non-empty
    if (password !== "" || passwordConfirmation !== "") {
      if (password.length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "La contraseña debe tener al menos 6 caracteres.",
          path: ["password"],
        });
      }
      if (passwordConfirmation === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "La confirmación de contraseña es requerida.",
          path: ["passwordConfirmation"],
        });
      }
      if (password === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "La contraseña es requerida.",
          path: ["password"],
        });
      }
      if (
        password &&
        passwordConfirmation &&
        password !== passwordConfirmation
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Las contraseñas no coinciden.",
          path: ["passwordConfirmation"],
        });
      }
    }
  });

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

interface ProfileProps {
  currentTab: number;
}

const ProfileField = React.memo(({ label, value }: ProfileFieldProps) => {
  return (
    <View style={styles.fieldContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
});

export default function Profile({ currentTab }: ProfileProps) {
  const dispatch = useDispatch<AppDispatch>();
  const sessionData = useSelector(sessionDataSelector);
  const profileData = useSelector(profileDataSelector) as
    | ProfileResponse
    | undefined;
  const successUpdate = useSelector(successUpdateSelector);
  const isLoadingProfile = useSelector(loadingProfileSelector);
  const isLoadingUpdateProfile = useSelector(loadingUpdateSelector);
  const isLoading = isLoadingProfile || isLoadingUpdateProfile;
  const [showSecureText, setShowSecureText] = useState(true);
  const [showSecureText2, setShowSecureText2] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const fetchProfileData = React.useCallback(() => {
    if (sessionData) {
      dispatch(fetchProfile());
    }
  }, [sessionData, dispatch]);

  // Fetch when tab changes to profile
  React.useEffect(() => {
    if (currentTab === 2) { // 2 is the index of the profile tab
      fetchProfileData();
    }
  }, [currentTab, fetchProfileData]);

  // Fetch when screen comes into focus and we're on profile tab
  useFocusEffect(
    React.useCallback(() => {
      if (currentTab === 2) {
        fetchProfileData();
      }
    }, [currentTab, fetchProfileData])
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ProfileUpdateRequest>({
    resolver: zodResolver(schema) as Resolver<ProfileUpdateRequest>,
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

  React.useEffect(() => {
    if (successUpdate) {
      setIsEditing(false);
    }
  }, [successUpdate]);

  const onSubmit = (data: ProfileUpdateRequest) => {
    dispatch(fetchUpdateProfile(data));
  };

  const fields = useMemo(
    () => [
      {
        label: "Nombre",
        name: "name" as keyof ProfileUpdateRequest,
        value: profileData?.name || formValues.name,
      },
      {
        label: "Correo",
        name: "email" as keyof ProfileUpdateRequest,
        value: profileData?.email || formValues.email,
      },
      {
        label: "Teléfono",
        name: "phone" as keyof ProfileUpdateRequest,
        value: profileData?.phone || formValues.phone,
      },
    ],
    [formValues, profileData]
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <LoadingOverlay visible={isLoading} message="Cargando perfil..." />
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
            name={field.name}
            label={field.label}
            value={field.value || ""}
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

            <ScrollView
              style={styles.modalScroll}
              contentContainerStyle={styles.modalScrollContent}
            >
              <View style={styles.formContainer}>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      mode="outlined"
                      label="Nombre"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      style={styles.input}
                      error={!!errors.name}
                    />
                  )}
                />
                {errors.name && (
                  <HelperText type="error" visible={!!errors.name}>
                    {errors.name.message}
                  </HelperText>
                )}

                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      mode="outlined"
                      label="Correo"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      style={styles.input}
                      error={!!errors.email}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  )}
                />
                {errors.email && (
                  <HelperText type="error" visible={!!errors.email}>
                    {errors.email.message}
                  </HelperText>
                )}

                <Controller
                  control={control}
                  name="phone"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      mode="outlined"
                      label="Teléfono"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      style={styles.input}
                      error={!!errors.phone}
                      keyboardType="phone-pad"
                    />
                  )}
                />
                {errors.phone && (
                  <HelperText type="error" visible={!!errors.phone}>
                    {errors.phone.message}
                  </HelperText>
                )}

                <View style={styles.passwordSection}>
                  <Text variant="titleSmall" style={styles.sectionTitle}>
                    Cambiar Contraseña
                  </Text>

                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        mode="outlined"
                        label="Contraseña"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry={showSecureText}
                        style={styles.input}
                        error={!!errors.password}
                        right={
                          <TextInput.Icon
                            icon={showSecureText ? "eye" : "eye-off"}
                            forceTextInputFocus={false}
                            onPress={() => setShowSecureText(!showSecureText)}
                          />
                        }
                      />
                    )}
                  />
                  {errors.password && (
                    <HelperText type="error" visible={!!errors.password}>
                      {errors.password.message}
                    </HelperText>
                  )}

                  <Controller
                    control={control}
                    name="passwordConfirmation"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        mode="outlined"
                        label="Confirmar Contraseña"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry={showSecureText2}
                        style={styles.input}
                        error={!!errors.passwordConfirmation}
                        right={
                          <TextInput.Icon
                            icon={showSecureText2 ? "eye" : "eye-off"}
                            forceTextInputFocus={false}
                            onPress={() => setShowSecureText2(!showSecureText2)}
                          />
                        }
                      />
                    )}
                  />
                  {errors.passwordConfirmation && (
                    <HelperText
                      type="error"
                      visible={!!errors.passwordConfirmation}
                    >
                      {errors.passwordConfirmation.message}
                    </HelperText>
                  )}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    color: "#666",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#000",
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    marginTop: 10,
    backgroundColor: "transparent",
  },
  modalContainer: {
    backgroundColor: "white",
    margin: 0,
    marginTop: "auto",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "98%",
  },
  modalContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitleContainer: {
    flex: 1,
    marginRight: 16,
  },
  modalTitle: {
    fontWeight: "600",
  },
  modalSubtitle: {
    color: "#666",
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
    borderTopColor: "#e0e0e0",
  },
  sectionTitle: {
    marginBottom: 16,
    color: "#666",
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
