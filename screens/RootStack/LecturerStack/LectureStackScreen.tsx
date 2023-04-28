import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LectureScreen from "./LecturerHomeScreen.main";
import { ClassModel } from "../../../models/class";
import LecturerHomeScreen from "./LecturerHomeScreen.main";
 

export type LectureStackParamList = {
  LectureHome: undefined;
};

const LectureStack = createStackNavigator<LectureStackParamList>();

export function LectureStackScreen() {
  return (
    <LectureStack.Navigator initialRouteName="LectureHome">
      <LectureStack.Screen
        name="LectureHome"
        options={{ headerShown: false }}
        component={LecturerHomeScreen}
      />
    </LectureStack.Navigator>
  );
}