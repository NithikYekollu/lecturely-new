import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StyleSheet, ScrollView, Text } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { getAuth, signInWithEmailAndPassword, signInWithEmailLink } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { MainStackParamList } from "../MainStackScreen";
import { RootStackParamList } from "../../RootStackScreen";

interface Props {
    navigation: StackNavigationProp<RootStackParamList, "ClassScreen">;
    route: RouteProp<RootStackParamList, "ClassScreen">;
}

export default function ClassScreen({ route, navigation }: Props) {
    const classModel = route.params.classModel;

    return (
        <SafeAreaView >
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Lecture" />
            </Appbar.Header>
            <ScrollView>
                <Text> {classModel?.id} </Text>
            </ScrollView>
        </SafeAreaView>
    );
}





