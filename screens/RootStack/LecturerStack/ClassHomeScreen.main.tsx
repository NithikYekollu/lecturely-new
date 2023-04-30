import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Text, FlatList, View } from "react-native";
import { Appbar, TextInput, Snackbar, Button, Card } from "react-native-paper";
import { getAuth, signInWithEmailAndPassword, signInWithEmailLink, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { UserStackParamList } from "../UserStack/UserStackScreen";
import { RootStackParamList } from "../RootStackScreen";
import { LectureStackParamList } from "./LectureStackScreen";
import { collection, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { styles } from "../../AuthStack/Auth.styles";
import { LectureModel } from "../../../models/lecture";
import { ClassModel } from "../../../models/clas";


/* HOW TYPESCRIPT WORKS WITH PROPS:

  Remember the navigation-related props from Project 2? They were called `route` and `navigation`,
  and they were passed into our screen components by React Navigation automatically.  We accessed parameters 
  passed to screens through `route.params` , and navigated to screens using `navigation.navigate(...)` and 
  `navigation.goBack()`. In this project, we explicitly define the types of these props at the top of 
  each screen component.

  Now, whenever we type `navigation.`, our code editor will know exactly what we can do with that object, 
  and it'll suggest `.goBack()` as an option. It'll also tell us when we're trying to do something 
  that isn't supported by React Navigation! */

interface Props {
    navigation: StackNavigationProp<LectureStackParamList, "ClassHomeScreen">;
}

export default function ClassHomeScreen({ navigation }: Props) {
  // TODO: Initialize a list of SocialModel objects in state.
  const[obj, setObj] = useState<ClassModel[]>([]);

  /* TYPESCRIPT HINT: 
    When we call useState(), we can define the type of the state
    variable using something like this:
        const [myList, setMyList] = useState<MyModelType[]>([]); */

  /*
    TODO: In a useEffect hook, start a Firebase observer to listen to the "socials" node in Firestore.
    Read More: https://firebase.google.com/docs/firestore/query-data/listen
    
  
    Reminders:
      1. Make sure you start a listener that's attached to this node!
      2. The onSnapshot method returns a method. Make sure to return the method
          in your useEffect, so that it's called and the listener is detached when
          this component is killed. 
          Read More: https://firebase.google.com/docs/firestore/query-data/listen#detach_a_listener
      3. You'll probably want to use the .orderBy method to order by a particular key.
      4. It's probably wise to make sure you can create new socials before trying to 
          load socials on this screen.
  */
   useEffect(()=> {
     const db = getFirestore();
     const socialsRef = collection(db, "classes");

      const unsub = onSnapshot(query(socialsRef, orderBy("className", "desc")), (snapshot) =>
        {
          const newSocials: ClassModel[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            newSocials.push(data as ClassModel);
          }
          );
          setObj(newSocials);
        } );
        return unsub;
        
        
      },[obj]);



   

   

  const renderItem = ({ item }: { item: ClassModel }) => {
    // TODO: Return a Card corresponding to the social object passed in
    // to this function. On tapping this card, navigate to DetailScreen
    // and pass this social.
    return (
    <Card onPress = {() => navigation.navigate("ClassDetailScreen", {clas: item})}>
      <Card.Cover source={{}} />
      <Card.Content>
        <Card.Title title={item.className} subtitle = {`${item.lecturerName} `} />
      </Card.Content>
    </Card>
    )
  };

  const NavigationBar = () => {
    // TODO: Return an AppBar, with a title & a Plus Action Item that goes to the NewSocialScreen.
    return <Appbar.Header>
        <Appbar.Action
          icon="exit-to-app"
          onPress={() => signOut(getAuth())}
        />
      <Appbar.Content title="Classes" />
      <Appbar.Action icon = "plus" onPress={() => navigation.navigate("NewClassScreen")} />
    </Appbar.Header>
      
  };

  return (
    <>
      {NavigationBar()}
      <View style={styles.container}>
      <FlatList
        data={obj}
        renderItem={renderItem}
        keyExtractor={(item) => item.className}
      />
    </View>
    </>
  );

}