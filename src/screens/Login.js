import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../firebase/config";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorMSG: "",
    };
  }

  handleSubmit = () => {
    const { email, password } = this.state;

    if (!email.includes("@")) {
      this.setState({ errorMSG: "Email mal formateado" });
      return;
    }

    if (password.length < 6) {
      this.setState({ errorMSG: "La password debe tener una longitud mínima de 6 caracteres" });
      return;
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ errorMSG: "" });
        this.props.navigation.navigate("HomeMenu"); 
      })
      .catch(() => {
        this.setState({ errorMSG: "Credenciales incorrectas" });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Hola, esto es el login</Text>

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

        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {this.state.errorMSG && <Text style={styles.errorText}>{this.state.errorMSG}</Text>}

        <Text style={styles.accountText}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={styles.loginButtonText}>Register</Text>
        </TouchableOpacity>

        <Text style={styles.accountText}>Go back</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("HomeMenu")}
        >
          <Text style={styles.loginButtonText}>Home</Text>
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
  errorText: {
    color: "red",
    marginTop: 10,
  },
  accountText: {
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
