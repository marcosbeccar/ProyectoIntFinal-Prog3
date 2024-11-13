import { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native-web'

export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: this.props.userName,
      content: this.props.content,
      likes: this.props.likes
    }
  }
  render() {
    return (
      <View style ={styles.container}>
      <Text style={styles.mainText}>{this.state.content}</Text>
      <Text>Por {this.state.userName}</Text>
      <Text>Likes: {this.state.likes}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "30%",
    height: "30%",
    margin: "10%",
    backgroundColor: "#22c6e2",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 15,
  },
  mainText: {
    fontSize: 30,
  }
});