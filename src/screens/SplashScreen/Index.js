import {SafeAreaView, StyleSheet, Image, View} from 'react-native';
import React from 'react';

const Index = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{width: '100%', height: '100%'}}
        source={require('../../assets/SplashScreen/SpalshScreen.png')}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
