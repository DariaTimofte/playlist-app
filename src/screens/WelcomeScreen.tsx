import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true
            }
        ).start();
    }, [fadeAnim])

    return (
        <Animated.View style={{ ...props.style, opacity: fadeAnim }}>
            {props.children}
        </Animated.View>
    );
}

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to your playlist!</Text>
            <Text style={{ marginBottom: 50 }}>Log In or Register</Text>

            <FadeInView style={styles.buttons}>
                <Button title="Sign in" buttonStyle={styles.button} onPress={() => navigation.navigate('Sign In')} />
                <Button title="Sign up" type="outline" buttonStyle={styles.button} onPress={() => navigation.navigate('Sign Up')} />
            </FadeInView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    },
    buttons: {
        flex: 1
    },
    button: {
        marginTop: 10,
        borderRadius: 50,
        width: 200
    }
});

export default WelcomeScreen;