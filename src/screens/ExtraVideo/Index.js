import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, BackHandler } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import moment from 'moment';

const Index = (props) => {

    const navigation = useNavigation();
    const [extraVideo, setExtraVideo] = useState({});
    const [fullScreen, setFullScreen] = useState(false);
    const ref = useRef(null);
    const [showPoster, setShowPoster] = useState(false);
    const [isExtraVideoActive, setIsExtraVideoActive] = useState(false);
    const [clickedExtraVideo, setClickedExtraVideo] = useState(true);
    const [pausedExtraVideo, setPausedExtraVideo] = useState(false);
    const [progressExtraVideo, setProgressExtraVideo] = useState({
        currentTime: 0,
        seekableDuration: 0,
        // other properties if needed
    });
    const [mutedExtraVideo, setMutedExtraVideo] = useState(false);

    const toggleExtraVideoView = () => {
        setIsExtraVideoActive(!isExtraVideoActive);
        setClickedExtraVideo(true);
        setTimeout(() => {
            setClickedExtraVideo(false);
          }, 2000)
    };

    const toggleMuteExtraVideo = () => {
        setMutedExtraVideo(!mutedExtraVideo);
    };

    const toggleFullScreen = () => {
        if (fullScreen) {
            Orientation.lockToPortrait();
        } else {
            Orientation.lockToLandscape();
        }
        setFullScreen(!fullScreen);
    }

    const format = (seconds) => {
        const duration = moment.duration(seconds, 'seconds');
        return `${duration.minutes()}:${duration.seconds()}`;
    };

    const handleBackWhenFullScreen = () => {
        Orientation.lockToPortrait();
        setFullScreen(!fullScreen);
        // navigation.goBack();
        console.log("object-=-=-=");
    }

    useEffect(() => {
        const backAction = () => {
            if (fullScreen) {
                setFullScreen(false); // Exit full screen if back button is pressed while in full screen
                Orientation.lockToPortrait();
                return true; // Prevent default behavior
            }
            return false; // Default behavior for other screens
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, [fullScreen]);

    useEffect(() => {
        console.log('Extra video-=-=', props.route.params);
        setExtraVideo(props.route.params);

        StatusBar.setHidden(true);
        return () => {
            StatusBar.setHidden(false);
        };
    }, [props.route.params]);


    return (
        <SafeAreaView style={styles.container}>
            {!fullScreen &&
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginLeft: 15 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <FontAwesome name="angle-left" color={'#fff'} size={28} />
                    </TouchableOpacity>
                    {fullScreen ?
                        <Text style={{ color: '#fff', fontSize: 15, fontWeight: '400', marginLeft: 10 }}>{extraVideo?.title}</Text>
                        :
                        <Text style={{ color: '#fff', fontSize: 15, fontWeight: '400', marginLeft: 10 }}>
                            {extraVideo?.title?.length > 40 ? extraVideo?.title?.slice(0, 35) + '...' : extraVideo?.title}
                        </Text>
                    }
                </View>
            }
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: fullScreen ? '100%' : '95%', height: fullScreen ? '100%' : 260, backgroundColor: '#fff', alignSelf: 'center' }}>
                    <TouchableOpacity activeOpacity={1} animation={false} onPress={() => { toggleExtraVideoView() }}>
                        {showPoster && (
                            <Image
                                source={{ uri: extraVideo.image_path + "/" + extraVideo.image }}
                                style={{ width: '100%', height: '100%', position: 'absolute' }}
                            />
                        )}

                        <Video
                            paused={pausedExtraVideo}
                            onProgress={x => {
                                setProgressExtraVideo(x);
                                if (showPoster) setShowPoster(false);
                            }}
                            source={{
                                uri: extraVideo?.video,
                            }}
                            ref={ref}
                            repeat={true}
                            muted={mutedExtraVideo}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode={'cover'}
                            onLoad={() => setShowPoster(false)}
                            onBuffer={() => setShowPoster(true)}
                        />

                        {clickedExtraVideo &&
                            <TouchableOpacity onPress={() => setClickedExtraVideo(!clickedExtraVideo)} style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'rgba(0,0,0,.5)', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => { ref.current.seek(parseInt(progressExtraVideo.currentTime) - 10) }}>
                                        <MaterialIcons name="replay-10" color={'#fff'} size={30} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setPausedExtraVideo(!pausedExtraVideo) }}>
                                        <MaterialIcons
                                            style={{ borderRadius: 100, marginLeft: 50 }}
                                            name={
                                                pausedExtraVideo
                                                    ? 'play-circle-outline'
                                                    : 'pause-circle-outline'
                                            }
                                            color={'#fff'}
                                            size={40}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { ref.current.seek(parseInt(progressExtraVideo.currentTime) + 10) }}>
                                        <MaterialIcons style={{ borderRadius: 100, marginLeft: 50 }} name="forward-10" color={'#fff'} size={30} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', bottom: 10, paddingLeft: 20, paddingRight: 20 }}>
                                    <Text style={{ color: 'white', fontSize: 12 }}>{progressExtraVideo && progressExtraVideo.currentTime && format(progressExtraVideo.currentTime)} </Text>
                                    <Slider
                                        style={{ width: fullScreen ? '93%' : '80%', height: 40 }}
                                        minimumValue={0}
                                        maximumValue={progressExtraVideo.seekableDuration}
                                        minimumTrackTintColor="#fff"
                                        maximumTrackTintColor="#fff"
                                        thumbTintColor="#fff"
                                        value={progressExtraVideo.currentTime}
                                        onSlidingComplete={x => {
                                            ref.current.seek(x);
                                        }}
                                    />
                                    <Text style={{ color: 'white', fontSize: 12 }}> {progressExtraVideo?.seekableDuration && format(progressExtraVideo.seekableDuration)} </Text>
                                </View>
                                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', top: 15, paddingHorizontal: 10 }}>
                                    {fullScreen ?
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableOpacity onPress={handleBackWhenFullScreen}>
                                                <FontAwesome name="angle-left" color={'#fff'} size={28} />
                                            </TouchableOpacity>
                                            <Text style={{ color: '#fff', fontSize: 15, fontWeight: '400', marginLeft: 10 }}>{extraVideo?.title}</Text>
                                        </View>
                                        :
                                        <View></View>
                                    }
                                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                                        <TouchableOpacity style={{ marginRight: 10 }} onPress={toggleMuteExtraVideo}>
                                            <MaterialIcons name={mutedExtraVideo ? 'volume-off' : 'volume-up'} color={'#fff'} size={25} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={toggleFullScreen}>
                                            <MaterialIcons name={fullScreen ? 'fullscreen-exit' : 'fullscreen'} color={'#fff'} size={27} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    }
})