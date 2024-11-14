import React, { Component } from "react";
import { View, Text, FlatList, TextInput, StyleSheet } from "react-native";
import { db } from "../firebase/config";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryBusqueda: "",
      datos: [],
      filteredUsers: [],
      existeBusqueda: false,
    };
  }

  componentDidMount() {
    db.collection("users").onSnapshot((snapshot) => {
      let users = [];
      snapshot.forEach((doc) => {
        users.push({
          email: doc.data().email,
        });
      });
      this.setState({
        datos: users,
        loading: false,
      });
    });
  }

  handleSearch = (query) => {
    this.setState({ queryBusqueda: query, existeBusqueda: true });
    const filteredUsers = this.state.datos.filter(
      (user) => user.email && user.email.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ filteredUsers });
  };

  render() {
    const { queryBusqueda, filteredUsers, existeBusqueda } = this.state;
    const mostrarMensajeBusqueda = existeBusqueda && filteredUsers.length === 0;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Encontrá un email"
          placeholderTextColor="#aaa"
          value={queryBusqueda}
          onChangeText={this.handleSearch}
        />

        {queryBusqueda === "" && !existeBusqueda && (
          <Text style={styles.message}>Todavía no hay resultados, buscá un email!</Text>
        )}

        {mostrarMensajeBusqueda && (
          <Text style={styles.message}>El email buscado no existe</Text>
        )}

        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.email} // Email como clave única
          renderItem={({ item }) => (
            <View style={styles.userContainer}>
              <Text style={styles.userText}>{item.email}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginVertical: 10,
  },
  userContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    borderRadius: 8,
    marginBottom: 8,
  },
  userText: {
    fontSize: 16,
    color: "#333",
  },
});

export default Users;
