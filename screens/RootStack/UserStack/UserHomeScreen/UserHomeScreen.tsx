import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  FlatList,
} from "react-native";
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
import { styles } from "./UserHomeScreen.styles";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  doc,
  where,
  getDoc,
} from "firebase/firestore";
import { ClassModel } from "../../../../models/class";
import { UserStackParamList } from "../UserStackScreen";

// export type UserStackParamList = {
//   UserScreen: undefined;
//   ClassScreen: { classModel: ClassModel | undefined };
// };

interface Props {
  navigation: StackNavigationProp<UserStackParamList>;
}

export default function UserScreen({ navigation }: Props) {
  const [classes, setClasses] = useState<ClassModel[]>([]);
  const auth = getAuth();
  const currentUserId = auth.currentUser!.uid;
  const db = getFirestore();
  const docRef = doc(db, "users", currentUserId);


  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const classIds = doc.data().classes as string[];
        getClasses(classIds);
      }
    });
    return unsubscribe;
  }, []);

  const getClasses = async (classIds: string[]) => {
    var newClasses: ClassModel[] = [];
    for (const classId of classIds) {
      const classRef = doc(db, "classes", classId);
      const classDoc = await getDoc(classRef);
      const newClass = classDoc.data() as ClassModel;
      newClass.id = classDoc.id;
      newClasses.push(newClass);
    }
    setClasses(newClasses);
  };

  const renderClass = ({ item }: { item: ClassModel }) => {
    const onPress = () => {
      console.log(item);
      navigation.navigate("ClassScreen", { classModel: item });
    };

    return (
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabel}
        onPress={onPress}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.className}>{item.className}</Text>
          <Text style={styles.lecturerName}>{item.lecturerName}</Text>
        </View>
      </Button>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Student" />
        <Appbar.Action icon="exit-to-app" onPress={() => signOut(getAuth())} />
      </Appbar.Header>
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
        {/* <View style={{ ...styles.row1, marginLeft: 30, marginRight: 30 }}> */}
        <FlatList
          horizontal={true}
          contentContainerStyle={{ flexDirection: "row" }}
          data={classes}
          renderItem={renderClass}
          keyExtractor={(_: any, index: number) => "key-" + index}
        />
        {/* </View> */}
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
