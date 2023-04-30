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

import { LectureModel } from "../../../../../models/lecture";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";

const QATab = (props: { lectureModel: LectureModel }) => {
  const [question, setQuestion] = useState("");
  const lectureModel = props.lectureModel;
  const [qna, setQna] = useState<LectureModel["qna"]>([]);
  const auth = getAuth();
  const email = auth.currentUser!.email;
  const db = getFirestore();
  if (!lectureModel || !lectureModel.id) return <View></View>;
  const docRef = doc(db, "lectures", lectureModel.id);
  const lectureRef = doc(db, "lectures", lectureModel.id);

  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setQna(doc.data().qna);
      }
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async () => {
    if (email) {
      const name = email.split("@")[0];
      const time = new Date().toLocaleString();
      const updatedLecture = lectureModel;
      updatedLecture.qna = [
        ...qna,
        { message: question, email: name, time: time },
      ];
      updatedLecture.qna.sort((a, b) => (a.time > b.time ? 1 : -1));
      updatedLecture.qna.reverse();
      await updateDoc(lectureRef, { qna: updatedLecture.qna });
      setQuestion("");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.textInputWrapper}>
        <TextInput
          placeholder="Type your question"
          value={question}
          onChangeText={(question) => setQuestion(question)}
          style={styles.textInput1}
          underlineColor="transparent"
          multiline={true}
          numberOfLines={3}
          scrollEnabled={true}
          left={
            <TextInput.Icon
              style={styles.icon}
              icon="magnify"
              color="#BEC0C7"
            />
          }
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      <FlatList
        data={qna}
        keyExtractor={(item) => item.time}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.questionContainer}>
            <View style={styles.avatarContainer} />
            <View style={styles.questionDetailsContainer}>
              <Text style={styles.username}>{item.email}</Text>
              <Text style={styles.timestamp}>{item.time}</Text>
              <Text style={styles.questionText}>{item.message}</Text>
            </View>
          </View>
        )}
      />
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

export default QATab;
