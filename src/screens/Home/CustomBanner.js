import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default CustomBanner = ({
  style,
  item,
  imageKey,
  onPress,
  index,
  active,
  local,
}) => {
  return (
    <>
      <TouchableOpacity
        style={styles.videoContainer}
        onPress={() => onPress(item)}>
        <View style={[styles.imageContainer, styles.shadow]}>
          <Image
            style={[styles.videoPreview, active ? {} : {height: 120}]}
            // style={{ overflow: 'hidden', resizeMode: 'contain', width: '100%', height: 230 }}
            source={{uri: item[imageKey]}}
          />
        </View>
      </TouchableOpacity>
      <View style={{backgroundColor: '#000'}}>
        <TouchableOpacity style={styles.watchBtn}>
          <FontAwesome5 name="play" size={14} color={'#fff'} />
          <Text
            style={{
              color: '#ffffff',
              fontSize: 17,
              fontFamily: 'Montserrat-Bold',
              marginLeft: 8,
            }}>
            Watch
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View>
                <TouchableOpacity style={styles.watchBtn}>
                    <FontAwesome5 name="play" size={14} color={'#fff'} />
                    <Text style={{ color: '#ffffff', fontSize: 17, fontFamily: 'Montserrat-Bold', marginLeft: 8 }}>Watch</Text>
                </TouchableOpacity>
            </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: 275,
    paddingVertical: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  videoPreview: {
    width: 275,
    height: 155,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  desc: {
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 24,
    marginTop: 18,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  watchBtn: {
    backgroundColor: '#e00024',
    width: 110,
    height: 36,
    marginLeft: 14,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 30,
    position: 'absolute',
    zIndex: 9999,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
