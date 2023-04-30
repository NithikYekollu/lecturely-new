import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { ScrollView, Image, Text, View, TouchableOpacity } from "react-native";
import { Appbar } from "react-native-paper";
import { LectureStackParamList } from "./LectureStackScreen";
import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { LectureModel } from '../../../models/lecture';
import { ClassModel } from '../../../models/clas';

interface Props {
  navigation: StackNavigationProp<LectureStackParamList, "ClassDetailScreen">;
  route: RouteProp<LectureStackParamList, "ClassDetailScreen">;
}

export default function ClassDetailScreen({ route, navigation }: Props) {
  const { clas } = route.params;
  const [lectures, setLectures] = useState<LectureModel[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(getFirestore(), "lectures"),
        where("classID", "==", clas.id)
      ),
      (querySnapshot) => {
        const lectures = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as LectureModel)
        );
        setLectures(lectures);
      }
    );
    return () => unsubscribe();
  }, []);

  const Bar = () => {
    return (
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => navigation.navigate("ClassHomeScreen")}
        />
        <Appbar.Content title="Classes" />
      </Appbar.Header>
    );
  };

  return (
    <>
      <Bar />
      <ScrollView>
        <View>
          <Text>{clas.className}</Text>
          <Text>{clas.lecturerName}</Text>
        </View>
        {lectures.map((lecture) => (
          <View key={lecture.id}>
            <Text>{lecture.lectureName}</Text>
            <Text>{lecture.lectureNumber}</Text>
            <Text>{new Date(lecture.date).toLocaleString()}</Text>
          </View>
        ))}
      </ScrollView>
    </>
  );
}
