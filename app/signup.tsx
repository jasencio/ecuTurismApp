import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import {
  Text,
  TextInput,
  Button,
  Checkbox,
} from "react-native-paper";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const router = useRouter();

  const handleSignUp = () => {
    if (!acceptTerms) {
      alert("Please accept the Terms of Use & Privacy Policy");
      return;
    }
    console.log("Signing up with:", email, password);
    router.push("/home"); // Navigate after sign-up
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
        Crear Cuenta
      </Text>
      <Text style={{ color: "#666", marginBottom: 20 }}>
        Crear una cuenta y empezar a usar la aplicación
      </Text>

      {/* Email Field */}
      <TextInput
        label="Correo"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={{ marginBottom: 10 }}
      />

      {/* Name Field */}
      <TextInput
        label="Nombre"
        value={name}
        onChangeText={setName}
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

      {/* Confirm Password Field */}
      <TextInput
        label="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
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

      {/* Terms & Conditions Checkbox */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <Checkbox
          status={acceptTerms ? "checked" : "unchecked"}
          onPress={() => setAcceptTerms(!acceptTerms)}
        />
        <Text style={{ marginLeft: 8, fontSize: 12 }}>
          {"Acepto los términos de uso & la política de privacidad"}
        </Text>
      </View>

      {/* Sign-up Button */}
      <Button
        mode="contained"
        onPress={handleSignUp}
        style={{ marginBottom: 10 }}
      >
        Crear cuenta
      </Button>

      {/* Login Link */}
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
