# [React-Navigation](https://reactnavigation.org/)

主要有三个功能：

- [StackNavigator](https://reactnavigation.org/docs/navigators/stack)  - 用于各个页面之间的跳转，并且记录了跳转的顺序，存入栈中
- [TabNavigator](https://reactnavigation.org/docs/navigators/tab) - 用于单个页面中标签栏的切换
- [DrawerNavigator](https://reactnavigation.org/docs/navigators/drawer) - 用于从屏幕左边滑出一个抽屉导航菜单

## StackNavigator

### 最简单的一个例子

```react
import React from 'react';
import {AppRegistry, View, Button, Text} from 'react-native';
import {StackNavigator} from 'react-navigation';

class FirstPage extends React.Component {
    static navigationOptions = {
        title: 'FirstPage',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Button
                    onPress={() => navigate('SecondPage', {info: 'from First'})}
                    title="This is FirstPage, tap to SecondPage"
                />
            </View>
        );
    }
}

class SecondPage extends React.Component {

    render() {
        const {navigate, state} = this.props.navigation;
        return (
            <View>
                <Button
                    onPress={() => navigate('FirstPage')}
                    title="This is SecondPage, tap to FirstPage"
                />
                <Text>这是来自First的消息：{state.params.info}</Text>
            </View>
        );
    }
}

const SimpleApp = StackNavigator({
    FirstPage: {screen: FirstPage},
    SecondPage: {
        screen: SecondPage,
        navigationOptions: {
            title: 'SecondPage',
        }
    },
});

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
```

1. 分别创建两个视图页面：FirstPage 和 SecondPage ：

   ```react
   class FirstPage extends React.Component {}
   class SecondPage extends React.Component {}
   ```

2. 将两个页面注册到栈导航器中，返回的是一个 React 组件，所以可以直接注册到根上

   ```react
   const SimpleApp = StackNavigator({
       FirstPage: {screen: FirstPage},
       SecondPage: {screen: SecondPage},
   });
   AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
   ```

3. 导航的头部在各个组件内部配置，也可以在 StackNavigator 中配置，并且也可以在 StackNavigator 的第二个参数中全局配置。

   ```react
   navigationOptions = {
       title: 'FirstPage',
   };
   ```

4. 每个注册到 StackNavigator 中的视图页面都会注入 navigation 属性，其中包含 navigate 方法可以用于跳转页面，并且可以跟上参数，参数通过 state.params 传递

   ```react
   const {navigate, state} = this.props.navigation;
   onPress={() => navigate('SecondPage',{info: 'from First'})}
   <Text>这是来自First的消息：{state.params.info}</Text>
   ```

