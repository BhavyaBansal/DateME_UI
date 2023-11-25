import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Colors from './constants/colors';
import HomeScreen from './screens/HomeScreen';
const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: Colors.white},
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.green300,
          },
          headerTitleAlign: 'center',
          // headerTitleStyle: {
          //   fontSize: 40,
          //   fontWeight: 'bold',
          //   fontFamily: 'ElMessiri-Regular',
          // },
          // headerTintColor: '#fff',
          headerLeft: () => (
            <Image
              style={{width: 150, height: 50,marginLeft:90}}
              source={{
                uri: 'https://assets.stickpng.com/images/61f7cd2267553f0004c53e6f.png',
              }}
            />
          ),
        }}>
        <Stack.Screen
          name="Reports"
          component={HomeScreen}
          options={{title: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
