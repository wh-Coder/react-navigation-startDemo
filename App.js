import React from 'react';
import {
  AppRegistry,
  View,
  Button,
  Text,
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello, Chat App!</Text>
        <Button
          onPress={() => navigate('Chat', { user: 'Lucy1' })}
          title="Chat with Lucy"
        />
      </View>
    );
  }
}

class ChatScreen extends React.Component {
  // Nav options can be defined as a function of the screen's props:
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user}`,
  });
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Chat with {params.user}</Text>
      </View>
    );
  }
}

class RecentChatsScreen extends React.Component {
  render() {
    return <Button
      onPress={() => this.props.navigation.navigate('Chat', { user: 'Lucy1' })}
      title="Chat with Lucy1"
    />
  }
}

class AllContactsScreen extends React.Component {
  render() {
    return <Button
      onPress={() => this.props.navigation.navigate('Chat', { user: 'Lucy2' })}
      title="Chat with Lucy2"
    />
  }
}

const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
});

const SimpleApp = StackNavigator({
  Home: {
    screen: MainScreenNavigator,
    navigationOptions: {
      title: 'My Chats',
    }
  },
  Chat: { screen: ChatScreen },
});

// if you are using create-react-native-app you don't need this line
AppRegistry.registerComponent('SimpleApp', () => SimpleApp);