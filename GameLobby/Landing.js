import React from 'react';
import { View, Button, TextInput, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import  {quizDatabase}  from '../QuizTest';

export default class Landing extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: "", loading: true};
  }

  async componentDidMount(){
    await quizDatabase.getQuizzes();
    console.log('halo');
    console.log(quizDatabase.quizzes);
    this.setState({
      loading: false
    });
  }

  render() {
    if (this.state.loading) 
            return (<View><Text>loading</Text></View>);
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
