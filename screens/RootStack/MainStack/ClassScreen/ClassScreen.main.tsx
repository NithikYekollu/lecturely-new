import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { SafeAreaView, StyleSheet, ScrollView, Text } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { getAuth, signInWithEmailAndPassword, signInWithEmailLink } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { MainStackParamList } from "../MainStackScreen";

interface Props {
    navigation: StackNavigationProp<MainStackParamList, "ClassScreen">;
}

export default function ClassScreen({ navigation }: Props) {
        
    return (
        <SafeAreaView >
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Lecture" />
            </Appbar.Header>
            <ScrollView>
                <Text> Class Screen </Text>
            </ScrollView>
        </SafeAreaView>
    );
}





