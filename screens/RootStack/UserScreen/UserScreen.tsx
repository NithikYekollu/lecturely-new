import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { SafeAreaView, StyleSheet, ScrollView, Text, View } from "react-native";
import {
  Appbar,
  TextInput,
  Snackbar,
  Button,
  IconButton,
} from "react-native-paper";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { styles } from "./UserScreen.styles";

export type UserStackParamList = {
  UserScreen: undefined;
};

interface Props {
  navigation: StackNavigationProp<UserStackParamList>;
}

export default function UserScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Student" />
        <Appbar.Action icon="exit-to-app" onPress={() => signOut(getAuth())} />
      </Appbar.Header> */}
      <ScrollView>
        <View style={{ backgroundColor: "#7D95FF" }}>
          <View style={styles.row1}>
            <View style={{ flexDirection: "column", marginRight: 130 }}>
              <Text style={{ ...styles.description, fontFamily: "Medium" }}>
                Welcome Back
              </Text>
              <Text style={styles.description}>Aldrin Ong</Text>
            </View>

            <IconButton
              size={55}
              icon="account"
              color="#7D95FF"
              style={styles.iconButton}
            />
          </View>
          <View style={{ ...styles.row1, marginBottom: 10 }}>
            <View style={{ ...styles.textInputWrapper, width: "75%" }}>
              <TextInput
                placeholder="Enter Lecture Code"
                style={styles.textInput}
                underlineColor="transparent"
                left={
                  <TextInput.Icon
                    style={styles.icon}
                    icon="magnify"
                    color="#BEC0C7"
                  />
                }
              />
            </View>
            <IconButton
              size={55}
              icon="arrow-right"
              color="#7D95FF"
              style={styles.iconButton}
            />
          </View>
        </View>
        <View
          style={{
            ...styles.row1,
            justifyContent: "space-between",
            marginLeft: 30,
            marginRight: 30,
            marginTop: 30,
          }}
        >
          <Text style={{ ...styles.description, color: "#090F24" }}>
            Following
          </Text>
          <Text
            style={{
              ...styles.description,
              fontFamily: "Medium",
              color: "#7E95FE",
            }}
          >
            See All
          </Text>
        </View>
        <View style={{ ...styles.row1, marginLeft: 30, marginRight: 30 }}>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            CS61B
          </Button>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            CS61B
          </Button>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            CS61B
          </Button>
        </View>
        <View
          style={{
            ...styles.row1,
            justifyContent: "space-between",
            marginLeft: 30,
            marginRight: 30,
            marginTop: 30,
          }}
        >
          <Text style={{ ...styles.description, color: "#090F24" }}>
            Recent Lectures
          </Text>
          <Text
            style={{
              ...styles.description,
              fontFamily: "Medium",
              color: "#7E95FE",
            }}
          >
            See All
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
