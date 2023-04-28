import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { SafeAreaView, StyleSheet, ScrollView, Text } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { getAuth, signInWithEmailAndPassword, signInWithEmailLink, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { MainStackParamList } from "../MainStack/MainStackScreen";

interface Props {
    navigation: StackNavigationProp<MainStackParamList, "LecturerScreen">;
}

export default function LecturerScreen({ navigation }: Props) {
        
    return (
        <SafeAreaView >
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Lecture" />
                <Appbar.Action
          icon="exit-to-app"
          onPress={() => signOut(getAuth())}
        />
            </Appbar.Header>
            <ScrollView>
                <Text> Leture Screen </Text>
            </ScrollView>
        </SafeAreaView>
    );
}





