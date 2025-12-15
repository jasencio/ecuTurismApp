import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Text, TextInput, Button, Checkbox } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchSignup } from "@/slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { loadingSelector } from "@/selectors/sessionSelector";
import LoadingOverlay from "@/components/LoadingOverlay";
import { sessionDataSelector } from "@/selectors/sessionSelector";  

const userSchema = z
  .object({
    name: z.string().min(2, "El nombre es requerido"),
    phone: z.string().min(10, "El telefono es requerido"),
    email: z.string().email("Correo inválido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "La confirmación de la contraseña es requerida"),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "Debes aceptar los términos y condiciones" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type UserFormData = z.infer<typeof userSchema>;

const SignUpScreen = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(loadingSelector);
  const sessionData = useSelector(sessionDataSelector);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: undefined,
    },
  });

  const onSubmit = (data: UserFormData) => {
    if (!data.acceptTerms) {
      return;
    }
    const signupRequest = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };
    dispatch(fetchSignup(signupRequest));
  };

  useEffect(() => {
    if (sessionData) {
      router.replace("/home");
    }
  }, [sessionData]);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >

      <LoadingOverlay visible={isLoading} message="Espere..." />

      <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>
        Crear Cuenta
      </Text>
      <Text style={{ color: "#666", marginBottom: 20 }}>
        Crear una cuenta y empezar a usar la aplicación
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Correo"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            style={{ marginBottom: 10 }}
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}


      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Nombre"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            style={{ marginBottom: 10 }}
          />
        )}
      />
      {errors.name && (
        <Text style={styles.errorText}>{errors.name.message}</Text>
      )}

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Telefono"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            style={{ marginBottom: 10 }}
          />
        )}
      />
      {errors.phone && (
        <Text style={styles.errorText}>{errors.phone.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Contraseña"
            value={value}
            onChangeText={onChange}
            secureTextEntry={!showPassword}
            mode="outlined"
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            style={{ marginBottom: 10 }}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Confirmar contraseña"
            value={value}
            onChangeText={onChange}
            secureTextEntry={!showConfirmPassword}
            mode="outlined"
            right={
              <TextInput.Icon
                icon={showConfirmPassword ? "eye-off" : "eye"}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
            style={{ marginBottom: 10 }}
          />
        )}
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
      )}

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <Controller
          control={control}
          name="acceptTerms"
          render={({ field: { onChange, value } }) => (
            <Checkbox
              status={value ? "checked" : "unchecked"}
              onPress={() => {
                onChange(!value);
              }}
            />
          )}
        />
        <Text style={{ marginLeft: 8, fontSize: 12 }}>
          {"Acepto los términos de uso & la política de privacidad"}
        </Text>
      </View>

      {errors.acceptTerms && (
        <Text style={styles.errorText}>{errors.acceptTerms.message}</Text>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={{ marginBottom: 10 }}
      >
        Crear cuenta
      </Button>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Text>{"¿Ya tienes una cuenta? "}</Text>
        <TouchableOpacity
          onPress={() => {
            router.dismissAll();
            router.replace("/");
          }}
        >
          <Text style={{ color: "#007AFF", fontWeight: "bold" }}>
            Iniciar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
});
