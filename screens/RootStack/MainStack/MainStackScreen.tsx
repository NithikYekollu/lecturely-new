import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClassScreen from "./ClassScreen/ClassScreen.main";
import LectureScreen from "./LectureScreen/LectureScreen.main";
import { ClassModel } from "../../../models/class";
import UserScreen from "../UserScreen/UserScreen";
 

export type MainStackParamList = {
  ClassScreen: { classModel: ClassModel | undefined };
  LectureScreen: undefined;
};

const MainStack = createStackNavigator<MainStackParamList>();

export function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="LectureScreen"
        options={{ headerShown: false }}
        component={LectureScreen}
      />
      <MainStack.Screen
        name="ClassScreen"
        options={{ headerShown: false }}
        component={ClassScreen}
      />
    </MainStack.Navigator>
  );
}