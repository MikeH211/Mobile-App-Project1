import React, { useRef, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginView(props: { updateUser: Function }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  async function login() {
    await AsyncStorage.setItem(
      "user",
      JSON.stringify({ username, role: "Temp" })
    );
    props.updateUser({ username, role: "Temp" });
  }

  return (
    <View>
      <Text>Username</Text>
      <TextInput onChangeText={(t) => setUsername(t)} placeholder="username" />
      <Text>Password</Text>
      <TextInput onChangeText={(t) => setPassword(t)} placeholder="password" />
      <Button onPress={login} title="Login" />
    </View>
  );
}
