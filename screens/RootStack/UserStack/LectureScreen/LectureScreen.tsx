import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Appbar } from "react-native-paper";
import { UserStackParamList } from "../UserStackScreen";
import { styles } from "../UserHomeScreen/UserHomeScreen.styles";
import { LectureModel } from "../../../../models/lecture";
import { getDoc, getFirestore, doc } from "firebase/firestore";
import FeedbackTab from "./FeedbackTab/FeedbackTab.main";
import QATab from "./Q&ATab/Q&ATab.main";

interface Props {
  navigation: StackNavigationProp<UserStackParamList, "LectureScreen">;
  route: RouteProp<UserStackParamList, "LectureScreen">;
}

export default function LectureScreen({ route, navigation }: Props) {
  const lectureModel = route.params.lectureModel;
  const db = getFirestore();
  const [selectedTab, setSelectedTab] = useState("Feedback");

  return (
    <SafeAreaView style={{ backgroundColor: "#EBEFFF" }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Lecture" />
      </Appbar.Header>
      <View>
        <View style={{ backgroundColor: "#7D95FF" }}>
          <View style={{ flexDirection: "column", marginTop: 30, marginLeft: 30, marginRight: 30 }}>
            <Text style={{ ...styles.description, fontSize: 30 }}>
              {lectureModel?.lectureName}
            </Text>
            <Text
              style={{
                ...styles.description,
                fontSize: 25,
                fontFamily: "Medium",
              }}
            >
              Lecture {lectureModel?.lectureNumber}
            </Text>
            <Text
              style={{
                ...styles.description,
                fontSize: 25,
                fontFamily: "Medium",
                marginBottom: 30,
              }}
            >
              {lectureModel?.date}
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginLeft: -50, marginRight: -50 }}>
              <TouchableOpacity
                style={
                  selectedTab === "Feedback"
                    ? styles1.selectedTab
                    : styles1.unselectedTab
                }
                onPress={() => setSelectedTab("Feedback")}
              >
                <Text style={styles1.tabText}>Feedback</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  selectedTab === "Q&A"
                    ? styles1.selectedTab
                    : styles1.unselectedTab
                }
                onPress={() => setSelectedTab("Q&A")}
              >
                <Text style={styles1.tabText}>Q&A</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  selectedTab === "Polls"
                    ? styles1.selectedTab
                    : styles1.unselectedTab
                }
                onPress={() => setSelectedTab("Polls")}
              >
                <Text style={styles1.tabText}>Polls</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {selectedTab === "Feedback" && lectureModel && <FeedbackTab lectureModel={lectureModel}/>}
        {selectedTab === "Q&A" && lectureModel && <QATab lectureModel={lectureModel}/>}
        {selectedTab === "Polls" && <Text>Polls</Text>}
      </View>
    </SafeAreaView>
  );
}
const styles1 = StyleSheet.create({
  selectedTab: {
    paddingBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: "white",
  },
  unselectedTab: {
    padding: 0,
  },
  tabText:{
    fontSize: 20,
    fontFamily: "Medium",
    color: "white",
  }
});
