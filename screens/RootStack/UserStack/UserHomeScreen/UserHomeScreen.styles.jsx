import { StyleSheet } from "react-native";
import { COLOR_BACKGROUND } from "../../../../AppStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: COLOR_BACKGROUND,
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  row1: {
    // flex: 3,
    // padding: 30,
    marginLeft: 20,
    marginRight: 30,
    marginTop: 10,
    // marginBottom: 10,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: "#ffffff",
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
    justifyContent: "center",
  },
  buttonLabel: {
    fontFamily: "SemiBold",
    fontSize: 16,
  },
  buttonContainer: {
    // alignItems: 'center',
    // padding: 10,
    justifyContent: 'center',
  },
  className: {
    // marginTop: 16,
    fontFamily: "SemiBold",
    color: "#ffffff",
    fontSize: 16,
  },
  lecturerName: {
    fontFamily: "SemiBold",
    fontSize: 14,
    color: '#ffffff',
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
    color: "#ffffff",
  },
});
