import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { SafeAreaView, StyleSheet, ScrollView, Text } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { getAuth, signInWithEmailAndPassword, signInWithEmailLink , signOut} from "firebase/auth";
import { initializeApp } from 'firebase/app';


export type UserStackParamList = {
    UserScreen: undefined;
  }; 

interface Props {
    navigation: StackNavigationProp<UserStackParamList>;
}

export default function UserScreen({ navigation }: Props) {
        
    return (
        <SafeAreaView >
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Student" />
                <Appbar.Action
          icon="exit-to-app"
          onPress={() => signOut(getAuth())}
        />
            </Appbar.Header>
            <ScrollView>
                <Text> User Screen </Text>
            </ScrollView>
        </SafeAreaView>
    );
}





