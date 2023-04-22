import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Appbar, TextInput, Snackbar, Button, RadioButton } from "react-native-paper";
import { AuthStackParamList } from "./AuthStackScreen";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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
        console.log('User account created & signed in!');
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      backgroundColor: "#ffffff",
    },
  });

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Sign Up" />
      </Appbar.Header>
      <SafeAreaView style={{ ...styles.container, padding: 30 }}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <Text style={{ marginTop: 20 }}>Select user type:</Text>
        <RadioButton.Group onValueChange={handleUserTypeChange} value={userType}>
          <RadioButton.Item label="Student" value="student" />
          <RadioButton.Item label="Lecturer" value="lecturer" />
        </RadioButton.Group>
        <Button
          mode="contained"
          style={{ marginTop: 20 }}
          onPress={() => signUp()}
          loading={loading}
        >
          Sign Up
        </Button>
        <Button
          mode="contained"
          style={{ marginTop: 20 }}
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
