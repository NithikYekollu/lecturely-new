import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Text, View } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { AuthStackParamList } from "./AuthStackScreen";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithEmailLink,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { AppStyles } from "../../AppStyles";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import {styles} from "./Auth.styles";

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, "SignInScreen">;
}

export default function SignInScreen({ navigation }: Props) {
  /* Screen Requirements:
      - AppBar
      - Email & Password Text Input
      - Submit Button
      - Sign Up Button (goes to Sign Up screen)
      - Reset Password Button
      - Snackbar for Error Messages
  
    All UI components on this screen can be found in:
      https://callstack.github.io/react-native-paper/

    All authentication logic can be found at:
      https://firebase.google.com/docs/auth/web/starts
  */

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [loadingStudent, setLoadingStudent] = useState(false);
  const [loadingLecturer, setLoadingLecturer] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      SemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
      Medium: require("../../assets/fonts/Poppins-Medium.ttf"),
      Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
    });
    setFontLoaded(true);
  };
  React.useEffect(() => {
    loadFonts();
  }, []);

  const dismiss = () => setVisible(false);

  const signIn = (userType: string) => {
    if (userType === "student") {
      setLoadingStudent(true);
    } else {
      setLoadingLecturer(true);
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoadingLecturer(false);
        setLoadingStudent(false);
        const user = userCredential.user;
        const db = getFirestore();
        const usersRef = doc(db, "users", user.uid);
        getDoc(usersRef)
          .then((doc) => {
            if (doc.exists()) {
              const userTypeInDoc = doc.data().userType;
              console.log(userTypeInDoc);
              console.log(userType);
              if (userTypeInDoc === userType) {
              } else {
                throw new Error(`You're not signed in as a ${userType}.`);

                setMessage(`You're not signed in as a ${userType}.`);
              }
            }
          })
          .catch((error) => {
            navigation.navigate("SignInScreen");
            setLoadingLecturer(false);
            setLoadingStudent(false);
            setMessage(error.message);
            setVisible(true);
          });
      })
      .catch((error) => {
        setLoadingLecturer(false);
        setLoadingStudent(false);
        if (
          error.code === "auth/wrong-password" ||
          error.code === "auth/user-not-found"
        ) {
          // Incorrect email or password
          setMessage("Incorrect email or password.");
        } else {
          // Incorrect user type
          setMessage(error.message);
        }
        setVisible(true);
      });
  };

  const resetPassword = () => {
    const auth = getAuth();
    const emailAddress = email;
    sendPasswordResetEmail(auth, emailAddress)
      .then(() => {
        setMessage("Password reset email sent!");
        setVisible(true);
      })
      .catch((error) => {
        setMessage("Error sending password reset email!");
        setVisible(true);
      });
  };

  return (
    <>
      {!fontLoaded ? (
        <AppLoading />
      ) : (
        <>
          <Appbar.Header>
            <Appbar.Content title="Sign In" />
          </Appbar.Header>
          <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.description}>
              Use your .edu email to Sign In
            </Text>
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
            <Button
              mode="contained"
              onPress={() => signIn("student")}
              style={styles.button}
              loading={loadingStudent}
              labelStyle={styles.buttonLabel}
            >
              Sign in as student
            </Button>
            <Button
              mode="contained"
              onPress={() => signIn("lecturer")}
              style={styles.button}
              labelStyle={styles.buttonLabel}
              loading={loadingLecturer}
            >
              Sign in as lecturer
            </Button>
            <Button
              onPress={() => {
                navigation.navigate("SignUpScreen");
              }}
              style={{ marginTop: 16 }}
              labelStyle={styles.buttonLabel}
            >
              Sign Up
            </Button>
            <Button
              onPress={() => {
                resetPassword();
                setMessage("reset email has been sent");
                setVisible(true);
              }}
              style={{ marginTop: 16 }}
              labelStyle={styles.buttonLabel}
            >
              Reset Password
            </Button>
            <Snackbar
              duration={2000}
              visible={visible}
              onDismiss={dismiss}
              action={{
                label: "Undo",
                onPress: () => {
                  dismiss;
                },
              }}
            >
              {message}
            </Snackbar>
          </SafeAreaView>
        </>
      )}
    </>
  );
}
