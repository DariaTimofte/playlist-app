import React, { memo, useEffect, useRef } from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { useAuthentication } from '../hooks/useAuthentication';
import { getAuth, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { config } from '../config/firebase.config';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';

initializeApp(config.firebaseConfig);
const auth = getAuth();
const Dashboard: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const { user } = useAuthentication();

    const animatedScale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        animatedScale.setValue(1);
    }, []);

    const handleOnPress = () => {
        animatedScale.setValue(0.8);
        Animated.spring(animatedScale, {
            toValue: 1,
            bounciness: 24,
            speed: 100,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Background>
            <Header>Welcome {user?.email}</Header>
            <Paragraph>
                Start editing you playlist
            </Paragraph>
            <Pressable onPress={handleOnPress}>
                <Animated.View
                    style={[style.button, { transform: [{ scale: animatedScale }] }]}>
                    <Text style={style.buttonText}
                    // onPress={() => navigation.navigate('Playlist')}
                    >Playlist</Text>
                </Animated.View>
            </Pressable>
            <Paragraph> or </Paragraph>
            <Pressable onPress={handleOnPress}>
                <Animated.View
                    style={[style.button, { transform: [{ scale: animatedScale }] }]}>
                    <Text style={style.buttonText} onPress={() => signOut(auth)}>Logout</Text>
                </Animated.View>
            </Pressable>
        </Background>
    );
};

const style = StyleSheet.create({
    button: {
        backgroundColor: 'purple',
        width: 200,
        height: 60,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 22,
    },
});

export default memo(Dashboard);