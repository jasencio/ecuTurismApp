import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { Text, TextInput, Button, Checkbox } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginRequest } from "@/types/Session";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { fetchLogin } from "@/slices/loginSlice";
import { sessionDataSelector } from "@/selectors/sessionSelector";

// Define the form schema with Zod
const loginSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  rememberMe: z.boolean(),
});

const LoginScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sessionData = useSelector(sessionDataSelector);
  const router = useRouter();
  
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      if (sessionData) {
        router.replace("/home");
      }
    }, [sessionData])
  );

  const onSubmit = async (data: LoginRequest) => {
    try {
      await dispatch(fetchLogin(data)).unwrap();
      router.replace("/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      {/* Title */}
      <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>
        Iniciar sesión
      </Text>
      <Text style={{ color: "#666", marginBottom: 20 }}>
        Inicia sesión para empezar a usar la aplicación
      </Text>

      {/* Email Field */}
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
            error={!!errors.email}
          />
        )}
      />
      {errors.email && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          {errors.email.message}
        </Text>
      )}

      {/* Password Field */}
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
            error={!!errors.password}
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
        <Text style={{ color: "red", marginBottom: 10 }}>
          {errors.password.message}
        </Text>
      )}

      {/* Remember Me & Forgot Password */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Controller
          control={control}
          name="rememberMe"
          render={({ field: { onChange, value } }) => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox
                status={value ? "checked" : "unchecked"}
                onPress={() => onChange(!value)}
              />
              <Text>Recuérdame</Text>
            </View>
          )}
        />
        <TouchableOpacity
          onPress={() => {
            router.push("/forgotpassword");
          }}
        >
          <Text style={{ color: "#007AFF", fontWeight: "bold" }}>
            ¿Olvido su contraseña?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={{ marginBottom: 10 }}
      >
        Iniciar sesión
      </Button>

      {/* Sign-up Link */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Text>{"¿No tienes una cuenta? "}</Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/signup");
          }}
        >
          <Text style={{ color: "#007AFF", fontWeight: "bold" }}>
            {"Crear cuenta"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
