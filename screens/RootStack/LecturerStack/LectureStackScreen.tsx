import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LecturerHomeScreen from "./LecturerHomeScreen/LecturerHomeScreen.main";
import NewClassScreen from "./NewClassScreen";
import { ClassModel } from "../../../models/class";
import ClassScreen from "./ClassScreen";
import { LectureModel } from "../../../models/lecture";
import LectureDashboard from "./LectureDashboard";
import NewLectureScreen from "./NewLectureScreen";
export type LectureStackParamList = {
  LectureHome: undefined;
  NewClass: undefined;
  LectureDashboard: { lectureModel: LectureModel | undefined };
  ClassScreen: { classModel: ClassModel | undefined };
  NewLecture: { classModel: ClassModel | undefined};
};

const LectureStack = createStackNavigator<LectureStackParamList>();

export function LectureStackScreen() {
  return (
    <LectureStack.Navigator initialRouteName="LectureHome">
      <LectureStack.Group>
        <LectureStack.Screen
          name="LectureHome"
          options={{ headerShown: false }}
          component={LecturerHomeScreen}
        />
        <LectureStack.Screen
          name="ClassScreen"
          options={{ headerShown: false }}
          component={ClassScreen}
        />
        <LectureStack.Screen
          name="LectureDashboard"
          options={{ headerShown: false }}
          component={LectureDashboard}
        />
      </LectureStack.Group>
      <LectureStack.Group screenOptions={{ presentation: "modal" }}>
        <LectureStack.Screen
          name="NewClass"
          options={{
            headerShown: false,
          }}
          component={NewClassScreen}
        />
        <LectureStack.Screen
          name="NewLecture"
          options={{
            headerShown: false,
          }}
          component={NewLectureScreen}
        />
      </LectureStack.Group>
    </LectureStack.Navigator>
  );
}
