import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { auth, db } from "../firebase/config";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      userName: "",
      password: "",
      registered: false,
      errorMSG: "",
    }; 
  }

  handleSubmit = () => {

    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
       
        if (response) {
          db.collection("users")
            .add({ 
              email: this.state.email, 
              userName: this.state.userName,
              createdAt: Date.now(),
            })

            .then(this.props.navigation.navigate("Login")) 
            .catch((err) => console.log(err));

          this.setState({ registered: true, errorMSG: "" });
        }

      })

      .catch((err) => this.setState({ errorMSG: err.message }));
  };

  render() {
    const { email, userName, password } = this.state;

    return (
      <View style={styles.container}>
        <Text>Hola, esto es el register</Text>

        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="UserName"
          onChangeText={(text) => this.setState({ userName: text })}
          value={this.state.userName}
        />
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />

        {email && userName && password ? (
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        ) : null}

        

        {this.state.errorMSG && <Text>{this.state.errorMSG}</Text>}

        <Text style={styles.texto}>¿Ya tenes una cuenta?</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  texto: {
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
  loginButtonText: {
    fontSize: 16,
    color: "#2196F3",
    fontWeight: "bold",
  },
});
