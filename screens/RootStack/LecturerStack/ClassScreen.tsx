import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Appbar, TextInput, Snackbar, Button, FAB } from "react-native-paper";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithEmailLink,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDoc, getFirestore, doc } from "firebase/firestore";
import { styles } from "../UserStack/UserHomeScreen/UserHomeScreen.styles";
import { LectureStackParamList } from "./LectureStackScreen";
import { LectureModel } from "../../../models/lecture";
import { ClassModel } from "../../../models/class";

interface Props {
  navigation: StackNavigationProp<LectureStackParamList, "ClassScreen">;
  route: RouteProp<LectureStackParamList, "ClassScreen">;
}

export default function ClassScreen({ route, navigation }: Props) {
  const classModel = route.params.classModel;
  const db = getFirestore();
  const [lectures, setLectures] = useState<LectureModel[]>([]);
  const auth = getAuth();
  const currentUserId = auth.currentUser!.uid;

  useEffect(() => {
    const db = getFirestore();
    const lectureIds = classModel?.lectureList;
    if (lectureIds) {
      const lecturePromises = lectureIds.map((lectureId) => {
        const lectureRef = doc(db, "lectures", lectureId);
        return getDoc(lectureRef);
      });
      Promise.all(lecturePromises).then((lectureDocs) => {
        const newLectures = lectureDocs.map((lectureDoc) => {
          const newLecture = lectureDoc.data() as LectureModel;
          newLecture.id = lectureDoc.id;
          return newLecture;
        });
        setLectures(newLectures);
      });
    }
  }, [classModel]);

  const renderLecture = ({ item }: { item: LectureModel }) => {
    const onPress = () => {
      console.log(item);
      console.log(currentUserId);
      navigation.navigate("LectureDashboard", { lectureModel: item });
    };

    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={{ backgroundColor: "white", borderRadius: 40, marginTop: 30, marginLeft: 30, marginRight: 30 }}
        >
          <View style={{ flexDirection: "column", margin: 30 }}>
            <Text
              style={{
                ...styles.description,
                fontSize: 20,
                fontFamily: "Medium",
                color: "black",
              }}
            >
              {item.lectureName}
            </Text>
            <Text
              style={{
                ...styles.description,
                fontSize: 20,
                fontFamily: "Medium",
                color: "#BEC0C7",
              }}
            >
              Lecture {item.lectureNumber} • {item.date}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#EBEFFF", flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Class" />
      </Appbar.Header>
      <View>
        <View style={{ backgroundColor: "#7D95FF" }}>
          <View style={{ flexDirection: "column", margin: 30 }}>
            <Text style={{ ...styles.description, fontSize: 30 }}>
              {classModel?.className}
            </Text>
            <Text
              style={{
                ...styles.description,
                fontSize: 25,
                fontFamily: "Medium",
              }}
            >
              Instructor: {classModel?.lecturerName}
            </Text>
            <Text
              style={{
                ...styles.description,
                fontSize: 25,
                fontFamily: "Medium",
              }}
            >
              Code: {classModel?.code}
            </Text>
          </View>
        </View>
        <Text
          style={{
            ...styles.description,
            fontSize: 30,
            color: "#7D95FF",
            marginTop: 30,
            marginLeft: 30,
          }}
        >
          Following
        </Text>
        <FlatList
          data={lectures}
          renderItem={renderLecture}
          keyExtractor={(_: any, index: number) => "key-" + index}
        />
      </View>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
            navigation.navigate("NewLecture", { classModel: classModel});
        }}
      />
    </SafeAreaView>
  );
}
