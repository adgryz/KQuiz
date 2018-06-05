import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Landing from './GameLobby/Landing';
import QuizSelection from "./GameLobby/QuizSelection";
import GameSelection from "./GameLobby/GameSelection";
import PlayerSelection from "./GameLobby/PlayerSelection";
import Waiting from "./GameLobby/Waiting";
import QuizStart from "./GameLobby/QuizStart";
import Quiz from "./SingleQuiz/Quiz"

const RootStack = StackNavigator(
  {
    Landing: {
      screen: Landing,
    },
    QuizSelection: {
      screen: QuizSelection,
    },
    GameSelection: {
      screen: GameSelection
    },
    PlayerSelection: {
      screen: PlayerSelection
    },
    Waiting: {
      screen: Waiting
    },
    QuizStart: {
      screen: QuizStart
    },
    Quiz: {
      screen: Quiz
    }
  },
  {
    initialRouteName: 'Landing',
    navigationOptions: {
      title: 'kQuiz',
      headerLeft: null
    }
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}