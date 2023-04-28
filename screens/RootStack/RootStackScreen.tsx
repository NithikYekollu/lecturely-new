import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MainStackScreen } from "./MainStack/MainStackScreen";
import { NavigationContainer } from "@react-navigation/native";
import UserScreen from "./UserScreen/UserScreen";

import { getFirestore, doc, getDoc } from "firebase/firestore";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import ClassScreen from "./MainStack/ClassScreen/ClassScreen.main";
import { ClassModel } from "../../models/class";
import LecturerScreen from "./LecturerScreen/LecturerScreen.main";

export type RootStackParamList = {
  LecturerScreen: undefined;
  User: undefined;
  ClassScreen: { classModel: ClassModel | undefined };
};

const RootStack = createStackNavigator<RootStackParamList>();

export function RootStackScreen() {
  const options = { headerShown: false };
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();
    const user = auth.currentUser;
    if (!user) return;
    const usersRef = doc(db, "users", user.uid);
    getDoc(usersRef).then((doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        if (userData?.userType === "student") {
          setUserType("student");
        } else if (userData?.userType === "lecturer") {
          setUserType("lecturer");
        }
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return null; // or return a loading screen
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator
        // screenOptions={{ presentation: "modal" }}
        initialRouteName={userType === "student" ? "User" : "LecturerScreen"}
      >
        <RootStack.Screen
          name="LecturerScreen"
          component={LecturerScreen}
          options={options}
        />

        <RootStack.Screen
          name="User"
          component={UserScreen}
          options={options}
        />
        <RootStack.Screen
          name="ClassScreen"
          component={ClassScreen}
          options={options}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
