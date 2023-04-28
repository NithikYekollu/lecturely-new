import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClassScreen from "./ClassScreen/ClassScreen.main";
import LectureScreen from "../LecturerStack/LecturerHomeScreen.main";
import { ClassModel } from "../../../models/class";
import UserScreen from "./UserHomeScreen/UserHomeScreen";
 

export type UserStackParamList = {
  ClassScreen: { classModel: ClassModel | undefined };
  LectureScreen: undefined;
  UserHome: undefined;
};

const UserStack = createStackNavigator<UserStackParamList>();

export function UserStackScreen() {
  return (
    <UserStack.Navigator initialRouteName="UserHome">
      <UserStack.Screen
        name="LectureScreen"
        options={{ headerShown: false }}
        component={LectureScreen}
      />
      <UserStack.Screen
        name="ClassScreen"
        options={{ headerShown: false }}
        component={ClassScreen}
      />
      <UserStack.Screen
          name="UserHome"
          component={UserScreen}
          options={{ headerShown: false }}
        />
    </UserStack.Navigator>
  );
}