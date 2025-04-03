import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import {
  Text,
  TextInput,
  Button,
  Checkbox,
} from "react-native-paper";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    console.log("Logging in with:", email, password);
    router.push("/home"); // Navigate after login
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
      <TextInput
        label="Correo"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={{ marginBottom: 10 }}
      />

      {/* Password Field */}
      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
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

      {/* Remember Me & Forgot Password */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Checkbox
            status={rememberMe ? "checked" : "unchecked"}
            onPress={() => setRememberMe(!rememberMe)}
          />
          <Text>Recuérdame</Text>
        </View>
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
        onPress={handleLogin}
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
          <Text style={{ color: "#007AFF", fontWeight: "bold" }}>{"Crear cuenta"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
