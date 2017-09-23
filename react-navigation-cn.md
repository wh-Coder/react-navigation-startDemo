# 开始 Getting Started

## Hello Mobile Navigation

让我们使用React Navigation来为Android和iOS构建一个简单的聊天应用程序。

### 开始安装

首先，确保您已经设置为使用React Native。接下来，创建一个新项目并添加反应导航：

```bash
# Create a new React Native App
react-native init SimpleApp
cd SimpleApp

# Install the latest version of react-navigation from npm
npm install --save react-navigation

# Run the new app
react-native run-android # or:
react-native run-ios
```

如果您正在使用create-react-native-app而不是react-native init，

```shell
# Create a new React Native App
create-react-native-app SimpleApp
cd SimpleApp

# Install the latest version of react-navigation from npm
npm install --save react-navigation

# Run the new app
npm start

# This will start a development server for you and print a QR code in your terminal.
```

验证您是否可以成功地看到在iOS和/或Android上运行的裸示例应用程序：

我们希望在iOS和Android上共用代码，因此可以删除index.ios.js和index.android.js的内容，并将其替换为导入'./App';

现在可以为我们的应用程序实现App.js创建新文件。

### 介绍Stack Navigator

对于我们的应用程序，我们想使用 StackNavigator，因为我们需要一个概念“堆栈”导航，其中每个新屏幕都放在堆栈的顶部，并返回从堆栈顶部移除一个屏幕。我们从一个屏幕开始：

```react
import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    return <Text>Hello, Navigation!</Text>;
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
});

// if you are using create-react-native-app you don't need this line
AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
```

屏幕的标题可以在静态 navigationOptions 上进行配置，其中可以设置许多选项来配置导航器中的屏幕显示。 现在iPhone和Android应用都会出现相同的屏幕：

### 添加新屏幕

在我们的App.js文件中，我们添加一个名为ChatScreen的新屏幕：

```react
class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };
  render() {
    return (
      <View>
        <Text>Chat with Lucy</Text>
      </View>
    );
  }
}
```

然后，我们可以使用routeName Chat向我们的HomeScreen组件添加一个链接到ChatScreen的按钮。

```react
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
          onPress={() => navigate('Chat')}
          title="Chat with Lucy"
        />
      </View>
    );
  }
}
```

我们正在使用 screen navigation prop 菜单中的导航功能转到 ChatScreen。但是，直到我们将它添加到我们的StackNavigator中，这样才能运行：

```react
const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
});
```

现在，您可以导航到新屏幕，然后返回：

### 传递参数

将名称写死到 ChatScreen 中并不理想。如果我们可以传递一个名字来改为更有用，那么让我们来做。

除了在导航功能中指定目标routeName之外，还可以传递将放入新路由的参数。首先，我们将编辑我们的HomeScreen组件，将用户参数传递到路由中

```react
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
          onPress={() => navigate('Chat', { user: 'Lucy' })}
          title="Chat with Lucy"
        />
      </View>
    );
  }
}
```

然后，我们可以编辑我们的ChatScreen组件，以显示通过路由传递的用户参数：

```react
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
```

现在，您可以在导航到聊天屏幕时看到名称。尝试在HomeScreen中更改用户参数，看看会发生什么！

## 嵌套导航 Nesting Navigators 

在移动应用中，通常会组合各种形式的导航。 React Navigation中的路由器和导航器是可组合的，它允许您为应用程序定义一个复杂的导航结构。

对于我们的聊天应用程序，我们要在第一个屏幕上放置几个选项卡，以查看最近的聊天线程或所有联系人。

### 介绍Tab Navigator

让我们在App.js中创建一个新的TabNavigator：

```react
import { TabNavigator } from "react-navigation";

class RecentChatsScreen extends React.Component {
  render() {
    return <Text>List of recent chats</Text>
  }
}

class AllContactsScreen extends React.Component {
  render() {
    return <Text>List of all contacts</Text>
  }
}

const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
});
```

如果MainScreenNavigator被渲染为顶级导航器组件，它将如下所示：

### 在屏幕中嵌入导航器

我们希望这些标签在应用的第一个屏幕中可见，但是堆叠中的新屏幕应该覆盖选项卡。

让我们将我们的选项卡导航器作为我们在上一步中设置的顶级StackNavigator中的屏幕。

```react
const SimpleApp = StackNavigator({
  Home: { screen: MainScreenNavigator },
  Chat: { screen: ChatScreen },
});
```

因为MainScreenNavigator被用作屏幕，我们可以给它navigationOptions：

```react
const SimpleApp = StackNavigator({
  Home: { 
    screen: MainScreenNavigator,
    navigationOptions: {
      title: 'My Chats',
    },
  },
  Chat: { screen: ChatScreen },
})
```

还可以在链接到聊天的每个标签中添加一个按钮：

```react
<Button
  onPress={() => this.props.navigation.navigate('Chat', { user: 'Lucy' })}
  title="Chat with Lucy"
/>
```

现在我们将一个导航仪放在另一个导航仪中，我们可以在导航仪之间导航：

### 在组件中嵌套导航器

有时，嵌套组件中的导航器是合适的。这在导航器只占用屏幕的一部分的情况下很有用。要将子导航器连接到导航树中，需要从父导航器导航属性。

```react
const SimpleApp = StackNavigator({
  Home: { screen: NavigatorWrappingScreen },
  Chat: { screen: ChatScreen },
});
```

在这种情况下，NavigatorWrappingScreen不是导航器，而是作为其输出的一部分呈现导航器。

```react
class NavigatorWrappingScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>SomeComponent</Text>
        <MainScreenNavigator/>
      </View>
    );
  }
}
```

要将MainScreenNavigator连接到导航树中，我们将其路由器分配给包装组件。这使得NavigatorWrappingScreen“导航感知”，它告诉父导航器将导航对象向下传递。由于NavigatorWrappingScreen的路由器被子导航器的路由器覆盖，子导航器将会收到所需的导航。

```react
class NavigatorWrappingScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Text>SomeComponent</Text>
        <MainScreenNavigator navigation={this.props.navigation} />
      </View>
    )
  }
}
NavigatorWrappingScreen.router = MainScreenNavigator.router;
```

## 配置标题 Configuring the Header

标题仅适用于StackNavigator。

在前面的例子中，我们创建了一个StackNavigator来在我们的应用程序中显示几个屏幕。

导航到聊天屏幕时，我们可以通过将其提供给导航功能来指定新路由的参数。在这种情况下，我们想在聊天屏幕上提供该人的姓名：

```react
this.props.navigation.navigate('Chat', { user:  'Lucy' });
```

可以从 Chat 屏幕访问 name 参数：

```react
class ChatScreen extends React.Component {
  render() {
    const { params } = this.props.navigation.state;
    return <Text>Chat with {params.user}</Text>;
  }
}

```

### 设置头部标题

接下来，头部可以配置为使用屏幕参数：

```react
class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user}`,
  });
}
```

### 添加一个右侧的按钮

然后我们可以添加一个头部配置[navigation option](https://reactnavigation.org/docs/navigators/navigation-options#Stack-Navigation-Options)，允许我们添加一个自定义的右侧按钮：

```react
static navigationOptions = {
  headerRight: <Text>Info</Text>,
  ...
```

导航选项可以使用[navigation prop](https://reactnavigation.org/docs/navigators/navigation-prop)。让我们根据路径参数渲染一个不同的按钮，并按下按钮调用navigation.setParams。

```react
static navigationOptions = ({ navigation }) => {
  const {state, setParams} = navigation;
  const isInfo = state.params.mode === 'info';
  const {user} = state.params;
  return {
    title: isInfo ? `${user}'s Contact Info` : `Chat with ${state.params.user}`,
    headerRight: (
      <Button
        title={isInfo ? 'Done' : `${user}'s info`}
        onPress={() => setParams({ mode: isInfo ? 'none' : 'info'})}
      />
    ),
  };
};
```

现在，标题可以与屏幕路线/状态进行交互：





































