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

interface Props {
  navigation: any;
}

export default function NewClassScreen({ navigation }: Props) {
  const [className, setClassName] = useState("");
  const [lecturerName, setLecturerName] = useState("");
  const [lectureName, setLectureName] = useState("");
  const db = getFirestore();
  const auth = getAuth();
  const currentUserId = auth.currentUser!.uid;

  const onSubmit = async () => {
    const newClass: ClassModel = {
      className,
      lecturerName,
      lectureList: [],
      code: Math.random().toString(36).substring(2, 7),
    };
    const classRef = collection(db, "classes");
    const newClassDoc = await addDoc(classRef, newClass);
    const lectureRef = collection(db, "lectures");
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "2-digit",
      year: "numeric",
    });
    const newLecture: LectureModel = {
      classID: newClassDoc.id,
      lectureName: lectureName,
      lectureSpeed: [],
      understanding: [],
      date: formattedDate,
      lectureNumber: "1",
      qna: [],
    };
    const newLectureDoc = await addDoc(lectureRef, newLecture);
    await updateDoc(doc(db, "classes", newClassDoc.id), {
      lectureList: [newLectureDoc.id],
    });

    const userRef = doc(db, "users", currentUserId);
    const userDoc = await getDoc(userRef);
    if (userDoc.data()?.classes) {
      const classes = userDoc.data()?.classes as string[];
      classes.push(newClassDoc.id);
      await updateDoc(userRef, {
        classes: classes,
      });
    } else {
      await updateDoc(userRef, {
        classes: [newClassDoc.id],
      });
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Class</Text>
      <TextInput
        style={styles.input}
        placeholder="Class Name"
        value={className}
        onChangeText={setClassName}
      />
      <TextInput
        style={styles.input}
        placeholder="Lecturer Name"
        value={lecturerName}
        onChangeText={setLecturerName}
      />
      <Text style={{...styles.title, marginTop: 30}}>First Lecture</Text>
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
