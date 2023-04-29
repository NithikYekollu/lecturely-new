import Slider from "@react-native-community/slider";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { styles } from "./FeedbackTab.styles";
import { LectureModel } from "../../../../../models/lecture";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

const FeedbackTab = (props: { lectureModel: LectureModel }) => {
  const lectureModel = props.lectureModel;
  const sliderMaxValue = 100;
  const sliderMinValue = 0;
  const [speedValue, setSpeedValue] = useState(50);
  const [understandingValue, setUnderstandingValue] = useState(50);
  const auth = getAuth();
  const currentUserId = auth.currentUser!.uid;
  const db = getFirestore();
  if (!lectureModel || !lectureModel.id) return <View></View>;
  const lectureId = lectureModel.id;
  const lectureRef = doc(db, "lectures", lectureId);
  console.log(lectureModel.lectureSpeed);

  useEffect(() => {
    const updateSpeed = async () => {
      const updatedLecture = lectureModel;
      let found = false;
      if (!updatedLecture.lectureSpeed) {
        updatedLecture.lectureSpeed = [];
      }
      for (const speed of updatedLecture.lectureSpeed) {
        if (speed.userID === currentUserId) {
          speed.value = speedValue;
          found = true;
          break;
        }
      }
      if (!found) {
        updatedLecture.lectureSpeed.push({
          userID: currentUserId,
          value: speedValue,
        });
      }
      await updateDoc(lectureRef, {
        lectureSpeed: updatedLecture.lectureSpeed,
      });
    };
    updateSpeed();
  }, [speedValue]);

  useEffect(() => {
    const updateUnderstanding = async () => {
      const updatedLecture = lectureModel;
      let found = false;
      if (!updatedLecture.understanding) {
        updatedLecture.understanding = [];
      }
      for (const understanding of updatedLecture.understanding) {
        if (understanding.userID === currentUserId) {
          understanding.value = understandingValue;
          found = true;
          break;
        }
      }
      if (!found) {
        updatedLecture.understanding.push({
          userID: currentUserId,
          value: understandingValue,
        });
      }
      await updateDoc(lectureRef, {
        understanding: updatedLecture.understanding,
      });
    };
    updateUnderstanding();
  }, [understandingValue]);

  //   useEffect(() => {
  //     const updateSpeed = async () => {
  //         const number = 1;
  //       const speedExists = lectureModel.lectureSpeed.find(
  //         (speed) => speed.userID === currentUserId
  //       );
  //       if (speedExists) {
  //         await updateDoc(lectureRef, {
  //           lectureSpeed: {
  //             [currentUserId]: {
  //               userID: currentUserId,
  //               value: speedValue,
  //             },
  //           },
  //         });
  //       } else {
  //         await updateDoc(lectureRef, {
  //           lectureSpeed: {
  //             [currentUserId]: {
  //               userID: currentUserId,
  //               value: speedValue,
  //             },
  //           },
  //         });
  //       }
  //     };
  //     updateSpeed();
  //   }, [speedValue]);

  //   useEffect(() => {
  //     const updateUnderstanding = async () => {
  //       const understandingExists = lectureModel.understanding.find(
  //         (understanding) => understanding.userID === currentUserId
  //       );
  //       if (understandingExists) {
  //         await updateDoc(lectureRef, {
  //           understanding: {
  //             [currentUserId]: {
  //               userID: currentUserId,
  //               value: understandingValue,
  //             },
  //           },
  //         });
  //       } else {
  //         await updateDoc(lectureRef, {
  //           understanding: {
  //             [currentUserId]: {
  //               userID: currentUserId,
  //               value: understandingValue,
  //             },
  //           },
  //         });
  //       }
  //     };
  //     updateUnderstanding();
  //   }, [understandingValue]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lecture Speed</Text>
      <Slider
        style={styles.slider}
        minimumTrackTintColor="#5271FF"
        value={speedValue}
        maximumValue={sliderMaxValue}
        minimumValue={sliderMinValue}
        onValueChange={(value) => {
          setSpeedValue(value);
          console.log("Speed Value: ", value);
          console.log(currentUserId);
        }}
      />
      <View style={styles.sliderOptionContainer}>
        <Text style={styles.sliderOptionText}>Slow Down</Text>
        <Text style={styles.sliderOptionText}>Just Right</Text>
        <Text style={styles.sliderOptionText}>Speed Up</Text>
      </View>
      <Text style={styles.text}>Understanding</Text>
      <Slider
        style={styles.slider}
        minimumTrackTintColor="#5271FF"
        value={understandingValue}
        maximumValue={sliderMaxValue}
        minimumValue={sliderMinValue}
        onValueChange={(value) => {
          setUnderstandingValue(value);
          console.log("Understanding Value: ", value);
        }}
      />
      <View style={styles.sliderOptionContainer}>
        <Text style={styles.sliderOptionText}>I'm Lost</Text>
        <Text style={styles.sliderOptionText}>All Good</Text>
      </View>
    </View>
  );
};

export default FeedbackTab;
