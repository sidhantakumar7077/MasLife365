import { } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../../screens/Home/Index';
import Categories from '../../screens/Categories/Index'
import AuthTab from '../../screens/NewAuth/AuthTab/Index';
import Favourite from '../../screens/Favourite/Index';
import Cart from '../../screens/Cart/Index';
import More from '../../screens/More/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { CallApi } from '../../../component/CallApi/index';

const Tab = createBottomTabNavigator();

export default function index() {
  const [accessToken, setAccessToken] = useState('');

  const getData = async () => {
    var ud_json = await AsyncStorage.getItem('user_details');
    const user_detail = JSON.parse(ud_json);
    // console.log('getToken', user_detail.access_token);
    setAccessToken(user_detail.access_token);
  };

  useEffect(() => {
    //  IF user token exist then redirect to home page
    getData();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e00024',
        tabBarInactiveTintColor: '#c7c7c7',
        // tabBarActiveBackgroundColor: '#1e1f1e',
        // tabBarInactiveBackgroundColor: '#1e1f1e',
        tabBarLabelStyle: { fontSize: 11, marginBottom: 10 },
        tabBarStyle: {
          height: 60,
          backgroundColor: '#141416',
          borderTopWidth: 0,
        },
      }}>

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" color={color} size={25} />
          ),
        }}
      />

      <Tab.Screen
        name="Category"
        component={Categories}
        options={{
          tabBarLabel: 'Category',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" color={color} size={22} />
          ),
        }}
      />

      {accessToken ?
        <Tab.Screen
          name="Favourite"
          component={Favourite}
          options={{
            tabBarLabel: 'Favourite',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="heart-plus-outline"
                color={color}
                size={25}
              />
            ),
          }}
        />
        :
        <Tab.Screen
          name="Favourite"
          component={AuthTab}
          options={{
            tabBarLabel: 'Favourite',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="heart-plus-outline"
                color={color}
                size={25}
              />
            ),
          }}
        />
      }

      {accessToken ?
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="cart-plus"
                color={color}
                size={25}
              />
            ),
          }}
        />
        :
        <Tab.Screen
          name="Cart"
          component={AuthTab}
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="cart-plus"
                color={color}
                size={25}
              />
            ),
          }}
        />
      }

      {accessToken ?
        <Tab.Screen
          name="More"
          component={More}
          options={{
            tabBarLabel: 'More',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="plus-circle-outline"
                color={color}
                size={25}
              />
            ),
          }}
        />
        :
        <Tab.Screen
          name="Account"
          component={AuthTab}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color, size }) => (
              <Octicons name="person" color={color} size={25} />
            ),
          }}
        />
      }
    </Tab.Navigator>
  );
}
