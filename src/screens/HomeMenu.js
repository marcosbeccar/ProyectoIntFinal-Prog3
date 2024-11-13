import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet, Button } from "react-native";
import Post from "../components/Post";
import { auth, db } from "../firebase/config";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {FontAwesome} from '@expo/vector-icons'

import Profile from './Profile'
import Users from "./Users";
import NewPost from "./NewPost";

const Tab = createBottomTabNavigator();

class HomeScreen extends Component { //HomeScreen sería el home cuando hay un usuario logueado
  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <View style={styles.postContainer}>
          {this.props.posts.length !== 0 ? (
            <FlatList
              data={this.props.posts}
              keyExtractor={(post) => post.id}
              renderItem={({ item }) => (
                <Post
                  content={item.data.msg}
                  userName={item.data.user}
                  likes={`${item.data.likes}`}
                />
              )}
            />
          ) : (
            <Text>No hay posts para mostrar</Text>
          )}
        </View>
      </View>
    );
  }
}

export default class HomeMenu extends Component { //HomeMenu sería solamente el menú que verifica si hay un usuario logueado y renderiza
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      logueado: false,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => { //♠ esto es lo que se fija si hay un usuario logueado ♠
      if (user) {
        this.setState({ logueado: true });
        
        db.collection("posts").onSnapshot((docs) => {
          let posts = [];
          docs.forEach((doc) => {
            posts.push({ id: doc.id, data: doc.data() });
          });
          this.setState({ posts: posts });
        });
      } else {
        this.setState({ logueado: true });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.logueado ? (
          <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <Tab.Screen name="Home" options={{tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />}}>
              {() => <HomeScreen posts={this.state.posts}/>}
            </Tab.Screen>
            <Tab.Screen name="Users" component={Users} options={{tabBarIcon: ()=> <FontAwesome name='users' size={24} color='black'/>}}/>
            <Tab.Screen name="NewPost" component={NewPost} options={{tabBarIcon: ()=> <FontAwesome name='plus' size={24} color='black'/>}}/>
            <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: ()=> <FontAwesome name='user' size={24} color='black'/>}} />
          </Tab.Navigator>
        ) : (
          <View style={styles.authContainer}>
            <Text style={styles.welcomeText}>bienvenido a Areté</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Login"
                onPress={() => this.props.navigation.navigate("Login")}
                color="#4CAF50"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Register"
                onPress={() => this.props.navigation.navigate("Register")}
                color="#2196F3"
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  authContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff5b02",
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  buttonContainer: {
    width: "80%",
    marginVertical: 10,
  },
  postContainer: {
    flex: 1,
    width: "90%",
  },
});
