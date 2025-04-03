import React, { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { Text, TextInput, Button } from "react-native-paper";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSendLink = () => {
    console.log("Password reset link sent to:", email);
    alert("Password reset link has been sent to your email.");
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
        ¿Olvido su contraseña?
      </Text>
      <Text style={{ color: "#666", marginBottom: 20 }}>
        Ingresa el correo asociado con tu cuenta.
      </Text>

      {/* Email Field */}
      <TextInput
        label="Correo"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={{ marginBottom: 20 }}
      />

      {/* Send Link Button */}
      <Button mode="contained" onPress={handleSendLink}>
        Enviar
      </Button>
    </View>
  );
};

export default ForgotPasswordScreen;
