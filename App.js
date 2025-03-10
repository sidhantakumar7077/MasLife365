import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
// Drawer Nav
import DrawerNav from './src/component/DrawerNav/Index'
// Bottom Nav
import BottomNav from './src/component/BottomNav/Index'
// Auth
import Login from './src/screens/Auth/Login/Index'
import Register from './src/screens/Auth/Register/Index'
import Forgot_password from './src/screens/Auth/Forgot_password/Index'
import Otp_verify from './src/screens/Auth/Otp_verify/Index'
import Reset_password from './src/screens/Auth/Reset_password/Index'
// New Auth
import AuthTab from './src/screens/NewAuth/AuthTab/Index'
import SignIn from './src/screens/NewAuth/SignIn/Index'
import SignUp from './src/screens/NewAuth/SignUp/Index'
// Pages
import SplashScreen from './src/screens/SplashScreen/Index'
import Home from './src/screens/Home/Index'
import Search from './src/screens/Search/Index'
import Content_details from './src/screens/Content_details/Index'
import Content_details_2 from './src/screens/Content_details_2/Index'
import ExtraVideo from './src/screens/ExtraVideo/Index'
import Cast_details from './src/screens/Cast_details/Index'
import AllContentByCategory from './src/screens/AllContentByCategory/Index'
import PlayVideo from './src/screens/PlayVideo/Index'
import Setting from './src/screens/Setting/Index'
import Categories from './src/screens/Categories/Index'
import AllOrders from './src/screens/AllOrders/Index'
import OrderDetails from './src/screens/OrderDetails/Index'
import Languages from './src/screens/Languages/Index'
import Surprises from './src/screens/Surprises/Index'
import Download from './src/screens/Download/Index'
import Profile from './src/screens/Profile/Index'
import EditProfile from './src/screens/EditProfile/Index'
import Payment from './src/screens/Payment/Index'
import Single_content_payment from './src/screens/Single_content_payment/Index'
import Support from './src/screens/Support/Index'
import TicketCreatePage from './src/screens/TicketCreatePage/Index'

const Stack = createNativeStackNavigator()

const App = () => {

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1500)
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="BottomNav" component={BottomNav} /> */}

        {showSplash ? (<Stack.Screen name="SplashScreen" component={SplashScreen} options={{ presentation: 'modal', animationTypeForReplace: 'push', animation: 'slide_from_right' }} />) : null}
        <Stack.Screen name="BottomNav" component={BottomNav} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        {/*Start New Auth */}
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        {/*End New Auth */}
        <Stack.Screen name="Forgot_password" component={Forgot_password} />
        <Stack.Screen name="Otp_verify" component={Otp_verify} />
        <Stack.Screen name="Reset_password" component={Reset_password} />
        {/* <Stack.Screen name="DrawerNav" component={DrawerNav} /> */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AuthTab" component={AuthTab} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Content_details" component={Content_details} />
        <Stack.Screen name="Content_details_2" component={Content_details_2} />
        <Stack.Screen name="ExtraVideo" component={ExtraVideo} />
        <Stack.Screen name="Cast_details" component={Cast_details} />
        <Stack.Screen name="AllContentByCategory" component={AllContentByCategory} />
        <Stack.Screen name="PlayVideo" component={PlayVideo} />
        <Stack.Screen name="Surprises" component={Surprises} />
        <Stack.Screen name="Languages" component={Languages} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="AllOrders" component={AllOrders} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="Download" component={Download} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Single_content_payment" component={Single_content_payment} />
        <Stack.Screen name="Support" component={Support} />
        <Stack.Screen name="TicketCreatePage" component={TicketCreatePage} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default App

const styles = StyleSheet.create({})