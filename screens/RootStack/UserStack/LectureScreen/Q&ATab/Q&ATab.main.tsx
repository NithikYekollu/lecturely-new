import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

import { LectureModel } from "../../../../../models/lecture";

const QATab = (props: { lectureModel: LectureModel }) => {
  const [question, setQuestion] = useState("");
  const lectureModel = props.lectureModel;

  const handleSubmit = () => {
    // Add the question to the database or whatever the desired functionality is
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.questionContainer}>
        <View style={styles.avatarContainer} />
        <View style={styles.questionDetailsContainer}>
          <Text style={styles.username}>John Doe</Text>
          <Text style={styles.timestamp}>20 seconds ago</Text>
          <Text style={styles.questionText}>Hi, when is lab due?</Text>
        </View>
      </View>
    </View>
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
