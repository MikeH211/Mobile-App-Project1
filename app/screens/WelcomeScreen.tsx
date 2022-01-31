import React, { useRef, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../config/colors";
import axios from "axios";
import { Employee } from "../dtos/dtos";

function WelcomeScreen(props: { setEmployee: Function }) {
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const loginPayload = {
      username: usernameInput.current.value,
      password: passwordInput.current.value,
    };

    const response = await axios(
      "https://a347-2600-1702-1af0-13a0-d087-9bc8-f2e8-a591.ngrok.io/login",
      {
        method: "PATCH",
        data: JSON.stringify(loginPayload),
        headers: {
          "content-Type": "application/json",
        },
      }
    );

    const employee: Employee = await response.data;

    if (employee.isManager === true) {
      props.setEmployee(employee);
      await AsyncStorage.setItem(
        "employee",
        JSON.stringify({
          username: employee.username,
          isManager: employee.isManager,
          id: employee.id,
        })
      );
    }
  }

  return (
    <ImageBackground
      style={styles.background}
      source={{
        uri: "https://picsum.photos/id/1031/200/300",
      }}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo-red.png")} />
        <Text style={styles.textStyle}>Scientropics,Inc</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
          username:
          <TextInput ref={usernameInput} style={styles.input} />
        </Text>

        <Text style={styles.inputLabel}>
          password:
          <TextInput ref={passwordInput} style={styles.input} />
        </Text>
      </View>

      <TouchableOpacity style={styles.buttonsContainer}>
        <Pressable onPress={login} style={styles.loginButton}>
          <Text style={styles.text}>LOGIN</Text>
        </Pressable>
      </TouchableOpacity>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 30,
    paddingBottom: 100,
    width: "100%",
  },
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: colors.primary,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  logo: {
    width: 100,
    height: 100,
  },
  inputLabel: {
    fontSize: 18,
    color: colors.white,
    fontWeight: "bold",
  },
  input: {
    height: 41,

    borderWidth: 1,
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 2,
    marginBottom: 6,
  },
  inputContainer: {
    marginTop: 380,
    marginLeft: -20,
  },

  textStyle: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.black,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
});

export default WelcomeScreen;
