import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LectureScreen from "./LecturerHomeScreen.main";
import { ClassModel } from "../../../models/clas";
import LecturerHomeScreen from "./LecturerHomeScreen.main";
import NewLectureScreen from '../NewLectureScreen';
import LectureDetailScreen from './LectureDetailScreen';
import { LectureModel } from "../../../models/lecture";
import UserLectureScreen from "../UserStack/LectureScreen/LectureScreen" 
import NewClassScreen  from "../NewClassScreen";
import ClassHomeScreen from "./ClassHomeScreen.main";
import ClassDetailScreen from "./ClassDetailScreen";
export type LectureStackParamList = {
  LectureHome: undefined;
  NewLectureScreen: undefined;
  UserLectureScreen: undefined;
  LectureDetailScreen: { lecture: LectureModel };
  NewClassScreen: undefined;
  ClassHomeScreen: undefined;
  ClassDetailScreen: { clas: ClassModel };
};

const LectureStack = createStackNavigator<LectureStackParamList>();

export function LectureStackScreen() {
  return (
    <LectureStack.Navigator initialRouteName="ClassHomeScreen">
      <LectureStack.Screen
        name="LectureHome"
        options={{ headerShown: false }}
        component={LecturerHomeScreen}
      />

      <LectureStack.Screen
        name="LectureDetailScreen"
        options={ {headerShown: false}}
        component={LectureDetailScreen}
      />

      <LectureStack.Screen
        name="ClassHomeScreen"
        options={ {headerShown: false}}
        component={ClassHomeScreen}
      />

      <LectureStack.Screen
        name="ClassDetailScreen"
        options={ {headerShown: false}}
        component={ClassDetailScreen}
      />


    </LectureStack.Navigator>
  );
}