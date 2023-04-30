import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";

import { getAuth } from "firebase/auth";
import { doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";
import { LectureModel } from "../../../models/lecture";

const FeedbackDashboard = (props: { lectureModel: LectureModel }) => {
  const [question, setQuestion] = useState("");
  const lectureModel = props.lectureModel;
  const [qna, setQna] = useState<LectureModel["qna"]>([]);
  const [lectureSpeed, setLectureSpeed] = useState(0);
  const [understanding, setUnderstanding] = useState(0);
  const auth = getAuth();
  const email = auth.currentUser!.email;
  const db = getFirestore();
  if (!lectureModel || !lectureModel.id) return <View></View>;
  const docRef = doc(db, "lectures", lectureModel.id);
  const lectureRef = doc(db, "lectures", lectureModel.id);

  useEffect(() => {
    const unsubscribe = onSnapshot(lectureRef, (doc) => {
      if (doc.exists()) {
        const lectureSpeedArray = doc.data().lectureSpeed;
        let totalLectureSpeed = 0;
        lectureSpeedArray.forEach((map: { value: number }) => {
          totalLectureSpeed += map.value;
        });
        setLectureSpeed(totalLectureSpeed / lectureSpeedArray.length);
        const understandingArray = doc.data().understanding;
        let totalUnderstanding = 0;
        understandingArray.forEach((map: { value: number }) => {
          totalUnderstanding += map.value;
        });
        setUnderstanding(totalUnderstanding / understandingArray.length);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text>Lecture Speed: {lectureSpeed}</Text>
      <Text>Understanding: {understanding}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  icon: {
    marginTop: 30,
    marginRight: 30,
  },
  textInputWrapper: {
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 99,
    overflow: "scroll",
  },
  textInput1: {
    backgroundColor: "transparent",
    padding: 10,
    marginLeft: 30,
    fontFamily: "SemiBold",
  },
  textInput: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#000",
  },
  submitButton: {
    padding: 10,
    backgroundColor: "#5271FF",
    borderRadius: 100,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#ffffff",
    fontFamily: "SemiBold",
  },
  questionContainer: {
    marginTop: 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 100,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#000",
    borderRadius: 100,
    marginRight: 10,
  },
  questionDetailsContainer: {
    flexDirection: "column",
  },
  username: {
    fontFamily: "SemiBold",
  },
  timestamp: {
    fontSize: 10,
    color: "#999",
    fontFamily: "Medium",
  },
  questionText: {
    marginTop: 5,
    fontFamily: "Medium",
  },
});

export default FeedbackDashboard;
