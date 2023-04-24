import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Text, SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import {
  Appbar,
  TextInput,
  Snackbar,
  Button,
  RadioButton,
} from "react-native-paper";
import { AuthStackParamList } from "./AuthStackScreen";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { styles } from "./Auth.styles";

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, "SignUpScreen">;
}

export default function SignUpScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("student");

  const dismiss = () => setVisible(false);

  const signUp = () => {
    setLoading(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        console.log("User account created & signed in!");
        const user = userCredential.user;
        const db = getFirestore();
        const usersRef = doc(db, "users", user.uid);
        setDoc(usersRef, {
          email: user.email,
          userType: userType,
        });
        setLoading(false);
      })
      .catch((error) => {
        setMessage(error);
        console.log(error);
      });
  };

  const handleUserTypeChange = (value: string) => {
    setUserType(value);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Sign Up" />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Let's Get Started</Text>
        <Text style={styles.description}>Use your .edu email to Sign Up</Text>
        <View style={styles.textInputWrapper}>
          <TextInput
            placeholder="example@university.edu"
            value={email}
            onChangeText={(email) => setEmail(email)}
            style={styles.textInput}
            underlineColor="transparent"
            keyboardType="email-address"
            left={
              <TextInput.Icon
                style={styles.icon}
                icon="email-outline"
                color="#BEC0C7"
              />
            }
          />
        </View>
        <View style={styles.textInputWrapper}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(password) => setPassword(password)}
            style={styles.textInput}
            secureTextEntry
            underlineColor="transparent"
            left={
              <TextInput.Icon
                style={styles.icon}
                icon="lock-outline"
                color="#BEC0C7"
              />
            }
          />
        </View>
        <Text style={{ ...styles.description, marginTop: 20, marginBottom: 0 }}>
          Select user type:
        </Text>
        <RadioButton.Group
          onValueChange={handleUserTypeChange}
          value={userType}
        >
          <RadioButton.Item label="Student" value="student" color="#5271FF"/>
          <RadioButton.Item label="Lecturer" value="lecturer" color="#5271FF"/>
        </RadioButton.Group>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={() => signUp()}
          loading={loading}
        >
          Sign Up
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={() => navigation.navigate("SignInScreen")}
        >
          Sign In Instead
        </Button>
        <Snackbar duration={2000} visible={visible} onDismiss={dismiss}>
          {message}
        </Snackbar>
      </SafeAreaView>
    </>
  );
}
