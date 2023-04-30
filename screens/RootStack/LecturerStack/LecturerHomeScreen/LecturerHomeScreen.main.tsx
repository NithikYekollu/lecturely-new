import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
  View,
} from "react-native";
import { Appbar, TextInput, Snackbar, Button, FAB } from "react-native-paper";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { UserStackParamList } from "../../UserStack/UserStackScreen";
import { RootStackParamList } from "../../RootStackScreen";
import { LectureStackParamList } from "../LectureStackScreen";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { LectureModel } from "../../../../models/lecture";
import { ClassModel } from "../../../../models/class";

interface Props {
  navigation: StackNavigationProp<LectureStackParamList, "LectureHome">;
}

export default function LecturerHomeScreen({ navigation }: Props) {
  const [classes, setClasses] = useState<ClassModel[]>([]);
  const auth = getAuth();
  const currentUserId = auth.currentUser!.uid;
  const db = getFirestore();
  const docRef = doc(db, "users", currentUserId);

  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const classIds = doc.data().classes as string[];
        if (classIds) {
          getClasses(classIds);
        }
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
    <SafeAreaView style={styles.view}>
      <Appbar.Header>
        <Appbar.Content title="Lecture" />
        <Appbar.Action icon="exit-to-app" onPress={() => signOut(getAuth())} />
      </Appbar.Header>
      <View style={styles.container}>
        <Text style={styles.text}> Classes </Text>
        {!classes || classes.length === 0 ? (
          <Text style={{ ...styles.text, color: "grey"}}>
            You have no classes, add a class
          </Text>
        ) : (
          <FlatList
            data={classes}
            renderItem={renderClass}
            keyExtractor={(_: any, index: number) => "key-" + index}
          />
        )}
      </View>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
            navigation.navigate("NewClass");
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    margin: 30,
  },
  text: {
    fontSize: 20,
    fontFamily: "SemiBold",
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  button: {
    marginTop: 16,
    borderRadius: 99,
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    fontFamily: "SemiBold",
    fontSize: 16,
    justifyContent: "center",
  },
  buttonLabel: {
    fontFamily: "SemiBold",
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: "center",
  },
  className: {
    fontFamily: "SemiBold",
    color: "#ffffff",
    fontSize: 16,
  },
  lecturerName: {
    fontFamily: "SemiBold",
    fontSize: 14,
    color: "#ffffff",
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: 27,
    marginBottom: 12,
    marginTop: 12,
    textAlign: "center",
  },
});
