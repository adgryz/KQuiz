import React from 'react';
import { View, Button, TextInput, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { quizDatabase } from '../QuizTest';
import NavButton from '../Custom/NavButton';
export default class Landing extends React.Component {

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    const username = params ? params.username : "";
    this.state = { username: username, loading: true };
  }

  async componentDidMount() {
    await quizDatabase.getQuizzes();
    //console.log('halo');
    //console.log(quizDatabase.quizzes);
    this.setState({
      loading: false
    });
  }

  render() {
    if (this.state.loading)
      return (<View style={{ flex: 1, backgroundColor: '#303030' }}><Text>loading</Text></View>);
    return (
      <View style={{ flex: 1, backgroundColor: '#303030' }}>
        <ImageBackground source={require('../Images/RiddleBg.png')} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
          <TextInput
            style={{ width: 200, textAlign: 'center', marginTop: 25, marginBottom: 10, fontWeight: 'bold', color: '#F2F2F2' }}
            placeholder="Enter Your Username"
            value={this.state.username}
            onChangeText={(text) => this.setState({ username: text })} />
          <View style={{ padding: 5, margin: 15 }}>
            <NavButton
              title="START GAME"
              disabled={this.state.username.length === 0}
              onPress={() => {
                this.props.navigation.navigate('QuizSelection', {
                  username: this.state.username,
                });
              }} />

          </View>
          <View style={{ padding: 5, margin: 15 }}>
            <NavButton
              title="JOIN GAME"
              disabled={this.state.username.length === 0}
              onPress={() => {
                this.props.navigation.navigate('GameSelection', {
                  username: this.state.username,
                });
              }} />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const answers = ['Spaghetti', 'Carbonara', 'Pizza', 'Lazagne'];