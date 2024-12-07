import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
// Drawer Screens
import Home from '../../screens/Home/Index';
// import Setting from '../../screens/Setting/Index'
import Download from '../../screens/Download/Index';
import Categories from '../../screens/Categories/Index';
import Languages from '../../screens/Languages/Index';
import Surprises from '../../screens/Surprises/Index';
import Watchlist from '../../screens/Watchlist/Index';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      {...props}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
          <View style={{marginTop: 8}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: 10,
              }}>
              <View style={{flexDirection: 'row', width: '80%'}}>
                <FontAwesome
                  style={{alignSelf: 'center', marginHorizontal: 5}}
                  name="user-circle-o"
                  size={30}
                  color={'#c70e17'}
                />
                <View style={{}}>
                  <Text
                    style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
                    Sidhanta rout
                  </Text>
                  <Text
                    style={{color: '#fff', fontSize: 13, fontWeight: '600'}}>
                    sidhanta@rixosys.com
                  </Text>
                </View>
              </View>
              <AntDesign
                style={{width: '20%'}}
                name="caretright"
                size={17}
                color={'#fff'}
              />
            </TouchableOpacity>
            <View
              style={{
                alignSelf: 'center',
                height: 3,
                width: '100%',
                backgroundColor: '#c70e17',
                marginVertical: 20,
              }}
            />
          </View>
          <DrawerItemList {...props} />
        </SafeAreaView>
        <View style={{alignItems: 'center', marginBottom: 9}}>
          <Text style={{color: '#fff', fontSize: 12}}>
            Rate Us | Privacy Policy | Term & Conditions
          </Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const Index = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#000',
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          headerTransparent: true,
          title: 'Home',
          drawerInactiveTintColor: '#fff',
          drawerActiveTintColor: '#fff',
          drawerIcon: ({focused, size}) => (
            <Entypo
              name="home"
              size={30}
              color={focused ? '#fff' : '#c70e17'}
            />
          ),
        }}
      />
      {/* <Drawer.Screen name="Categories" component={Categories} options={{
        headerShown: false,
        headerTransparent: true,
        title: 'Categories',
        drawerInactiveTintColor: '#fff',
        drawerActiveTintColor: '#fff',
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name='grid'
            size={28}
            color={focused ? '#fff' : '#c70e17'}
          />
        ),
      }} /> */}
      <Drawer.Screen
        name="Watchlist"
        component={Watchlist}
        options={{
          headerShown: false,
          headerTransparent: true,
          title: 'Watchlist',
          drawerInactiveTintColor: '#fff',
          drawerActiveTintColor: '#fff',
          drawerIcon: ({focused, size}) => (
            <MaterialIcons
              name="playlist-add"
              size={35}
              color={focused ? '#fff' : '#c70e17'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Downloads"
        component={Download}
        options={{
          headerShown: false,
          headerTransparent: true,
          title: 'Downloads',
          drawerInactiveTintColor: '#fff',
          drawerActiveTintColor: '#fff',
          drawerIcon: ({focused, size}) => (
            <FontAwesome
              name="download"
              size={30}
              color={focused ? '#fff' : '#c70e17'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Surprises"
        component={Surprises}
        options={{
          headerShown: false,
          headerTransparent: true,
          title: 'Surprises',
          drawerInactiveTintColor: '#fff',
          drawerActiveTintColor: '#fff',
          drawerIcon: ({focused, size}) => (
            <MaterialCommunityIcons
              name="gift"
              size={30}
              color={focused ? '#fff' : '#c70e17'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Languages"
        component={Languages}
        options={{
          headerShown: false,
          headerTransparent: true,
          title: 'Languages',
          drawerInactiveTintColor: '#fff',
          drawerActiveTintColor: '#fff',
          drawerIcon: ({focused, size}) => (
            <Entypo
              name="open-book"
              size={30}
              color={focused ? '#fff' : '#c70e17'}
            />
          ),
        }}
      />
      {/* <Drawer.Screen name="Settings" component={Setting} options={{
        headerShown: false,
        headerTransparent: true,
        title: 'Settings',
        drawerInactiveTintColor: '#fff',
        drawerActiveTintColor: '#fff',
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name='settings-sharp'
            size={30}
            color={focused ? '#fff' : '#c70e17'}
          />
        ),
      }} /> */}
    </Drawer.Navigator>
  );
};

export default Index;

const styles = StyleSheet.create({});
