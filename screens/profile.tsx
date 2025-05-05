import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { TextInput, HelperText, Button, Text } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { fetchSignup } from "@/slices/loginSlice";
import { SignupRequest } from "@/types/Session";

// Validation Schema using Zod
const schema = z
  .object({
    username: z.string().min(1, "El nombre de usuario es requerido."),
    email: z.string().email("El correo electrónico no es válido."),
    name: z.string().min(1, "El nombre es requerido."),
    phone: z.string().regex(/^[0-9]{9,15}$/, "El teléfono no es válido."),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres."),
    passwordConfirmation: z
      .string()
      .min(6, "La confirmación de contraseña es requerida."),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Las contraseñas no coinciden.",
    path: ["passwordConfirmation"],
  });

interface ProfileProps {
  loading?: boolean;
  isRegistered?: boolean;
}

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const [showSecureText, setShowSecureText] = useState(true);
  const [showSecureText2, setShowSecureText2] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupRequest>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      name: "",
      phone: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = (data: SignupRequest) => {
    console.log("Submitting:", data);
    dispatch(fetchSignup(data));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleMedium" style={styles.tile}>
        Perfil
      </Text>
      {/* Name */}
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              mode="outlined"
              label="Nombre"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {errors.name?.message && (
              <HelperText type="error">{errors.name?.message}</HelperText>
            )}
          </>
        )}
      />

      {/* Username */}
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              mode="outlined"
              label="Nombre de Usuario"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
            />
            {errors.username?.message && (
              <HelperText type="error">{errors.username?.message}</HelperText>
            )}
          </>
        )}
      />

      {/* Email */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              mode="outlined"
              label="Correo"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
            />
            {errors.email?.message && (
              <HelperText type="error">{errors.email?.message}</HelperText>
            )}
          </>
        )}
      />

      {/* Phone */}
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              mode="outlined"
              label="Teléfono"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
            />
            {errors.phone?.message && (
              <HelperText type="error">{errors.phone?.message}</HelperText>
            )}
          </>
        )}
      />

      {/* Password */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              mode="outlined"
              label="Contraseña"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={showSecureText}
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={showSecureText ? "eye" : "eye-off"}
                  forceTextInputFocus={false}
                  onPress={() => setShowSecureText(!showSecureText)}
                />
              }
            />
            {errors.password?.message && (
              <HelperText type="error">{errors.password?.message}</HelperText>
            )}
          </>
        )}
      />

      {/* Confirm Password */}
      <Controller
        control={control}
        name="passwordConfirmation"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              mode="outlined"
              label="Confirmar Contraseña"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={showSecureText2}
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={showSecureText2 ? "eye" : "eye-off"}
                  forceTextInputFocus={false}
                  onPress={() => setShowSecureText2(!showSecureText2)}
                />
              }
            />
            {errors.passwordConfirmation?.message && (
              <HelperText type="error">
                {errors.passwordConfirmation?.message}
              </HelperText>
            )}
          </>
        )}
      />

      {/* Submit Button */}
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        //disabled={loading}
      >
        {/* {isRegistered ? "Actualizar" : "Registrar"} */}
        Registrar
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  input: {
    marginTop: 10,
  },
  button: {
    marginTop: 20,
  },
  tile: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
});
