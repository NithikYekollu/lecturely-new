import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ScrollView, Image, Text, View, TouchableOpacity } from "react-native";
import { Appbar } from "react-native-paper";
import { LectureStackParamList } from "./LectureStackScreen";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import firebase from "firebase/app";
import { LectureModel } from '../../../models/lecture';
import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { ClassModel } from "../../../models/clas";

interface Props {
  navigation: StackNavigationProp<LectureStackParamList, "LectureDetailScreen">;
  route: RouteProp<LectureStackParamList, "LectureDetailScreen">;
}

export default function LectureDetailScreen({ route, navigation }: Props) {
  const { lecture } = route.params;
  const classId = lecture.classID;

  

  // retrieve the list of lectures from Firebase and filter by classId
  const [lectures, setLectures] = React.useState<LectureModel[]>([]);
  React.useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(getFirestore(), "classes"),
        where("lectures", "array-contains", lecture.id)
      ),
      (snapshot: QuerySnapshot<DocumentData>) => {
        const classes = snapshot.docs.map((doc) => ({ classId: doc.id, ...doc.data() } as Partial<ClassModel>)); // make properties of ClassModel optional
        const lectureClasses = classes.filter((c) => c.id === classId);
        const lectures = lectureClasses[0]?.lectureList?.map((l) => ({ lectureId: l } as unknown as LectureModel)) || []; // use optional chaining to handle undefined properties
        setLectures(lectures);
      }
    );
    return () => unsubscribe();
  }, []);

  const Bar = () => {
    return (
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate("LectureHome")} />
        <Appbar.Content title="Lectures" />
      </Appbar.Header>
    );
  };

  return (
    <>
      <Bar />
      <ScrollView>
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
