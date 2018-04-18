import React from 'react';
import { View, Button, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Landing extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: "" };
  }

  render() {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style={{ width: 200, textAlign: 'center', margin: 15 }}
          placeholder="Enter Your Username"
          value={this.state.username}
          onChangeText={(text) => this.setState({ username: text })} />
        <View style={{ padding: 5, margin: 15 }}>
          <Button
            title="Start Game"
            onPress={() => {
              this.props.navigation.navigate('QuizSelection', {
                username: this.state.username,
              });
            }} />
        </View>
        <View style={{ padding: 5, margin: 15 }}>
          <Button
            title="Join Game"
            onPress={() => {
              this.props.navigation.navigate('GameSelection', {
                username: this.state.username,
              });
            }} />
        </View>
      </View>
    );
  }
}
