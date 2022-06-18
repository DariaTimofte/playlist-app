import React from 'react';
import Background from '../components/Background';
import { Video } from 'expo-av';
import { StyleSheet, Share } from 'react-native';
import { Button } from 'react-native-paper';

export default function VideoPlayer({ route, navigation }) {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const { link } = route.params;

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: 'A cute video for you',
                url: '/Users/dariatimofte/Downloads/laborator-react-native-master/assets/big_buck_bunny.mp4'
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                    alert("Copied")
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Background>
            <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                }}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            <Button style={{ marginTop: 20 }} mode="contained" onPress={onShare}>
                Share
            </Button>
        </Background>
    );
};

const styles = StyleSheet.create({
    video: {
        alignSelf: 'center',
        width: 320,
        height: 400,
    },
});