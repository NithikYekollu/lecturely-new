import { StyleSheet } from "react-native";
import {COLOR_BACKGROUND} from "../../AppStyles"

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      backgroundColor: COLOR_BACKGROUND,
      justifyContent: "center",
    },
    textInputWrapper: {
      marginTop: 16,
      marginBottom: 16,
      backgroundColor: "white",
      borderRadius: 99,
      marginLeft: 20,
      marginRight: 20,
      overflow: "hidden",
    },
    textInput: {
      backgroundColor: "transparent",
      padding: 10,
      marginLeft: 30,
      fontFamily: "SemiBold",
    },
    button: {
      marginTop: 16,
      borderRadius: 99,
      marginLeft: 20,
      marginRight: 20,
      height: 50,
      fontFamily: "SemiBold",
      fontSize: 16,
      justifyContent:"center",
    },
    buttonLabel: {
      fontFamily: "SemiBold",
      fontSize: 16,
    },
    title: {
      fontFamily: "SemiBold",
      fontSize: 27,
      marginBottom: 12,
      marginTop: 12,
      textAlign: "center",
    },
    icon: {
      marginTop: 30,
      marginRight: 30,
    },
    description: {
      fontFamily: "SemiBold",
      fontSize: 16,
      marginBottom: 24,
      marginTop: 24,
      color: "#7E8189",
      textAlign: "center",
    },
  });