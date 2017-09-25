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
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    const isInfo = state.params.mode === 'info';
    const { user } = state.params;
    return {
      title: isInfo ? `${user}'s Contact Info` : `Chat with ${state.params.user}`,
      headerRight: (
        <Button
          title={isInfo ? 'Done' : `${user}'s info`}
          onPress={() => setParams({ mode: isInfo ? 'none' : 'info' })}
        />
      ),
    };
  };
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

class NavigatorWrappingScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>SomeComponent</Text>
        <MainScreenNavigator navigation={this.props.navigation} />
      </View>
    )
  }
}
NavigatorWrappingScreen.router = MainScreenNavigator.router;

const SimpleApp = StackNavigator({
  Home: {
    screen: NavigatorWrappingScreen,
    navigationOptions: {
      title: 'My Chats',
    }
  },
  Chat: { screen: ChatScreen },
});

// if you are using create-react-native-app you don't need this line
AppRegistry.registerComponent('SimpleApp', () => SimpleApp);