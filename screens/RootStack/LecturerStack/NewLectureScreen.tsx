import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ClassModel } from "../../../models/class";
import { getAuth } from "firebase/auth";
import { LectureModel } from "../../../models/lecture";
import { StackNavigationProp } from "@react-navigation/stack";
import { LectureStackParamList } from "./LectureStackScreen";
import { RouteProp } from "@react-navigation/native";

interface Props {
    navigation: StackNavigationProp<LectureStackParamList, "NewLecture">;
    route: RouteProp<LectureStackParamList, "NewLecture">;
}

export default function NewLectureScreen({ route, navigation }: Props) {
const classData = route.params.classModel;
const classModel = classData ? classData : { id: "", className: "", lecturerName: "", lectureList: [], code: "" };
  const [className, setClassName] = useState("");
  const [lecturerName, setLecturerName] = useState("");
  const [lectureName, setLectureName] = useState("");
  const db = getFirestore();

  const onSubmit = async () => {
    const lectureRef = collection(db, "lectures");
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "2-digit",
      year: "numeric",
    });
    const newLecture: LectureModel = {
      classID: classModel.id ? classModel.id : "",
      lectureName: lectureName,
      lectureSpeed: [],
      understanding: [],
      date: formattedDate,
      lectureNumber: classModel.lectureList.length + 1 + "",
      qna: [],
    };
    const newLectureDoc = await addDoc(lectureRef, newLecture);
    classModel.lectureList.push(newLectureDoc.id);
    await updateDoc(doc(db, "classes", classModel.id ? classModel.id : ""), {
      lectureList: classModel.lectureList,
    });
    console.log(classModel);
    navigation.navigate("ClassScreen", { classModel: classModel });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Lecture</Text>
      <TextInput
        style={styles.input}
        placeholder="Lecture Name"
        value={lectureName}
        onChangeText={setLectureName}
      />
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#5271FF",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
