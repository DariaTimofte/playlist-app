import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Header from '../components/Header';
import { theme } from '../core/theme';
// import { Navigation } from '../types';
import {
    emailValidator,
    passwordValidator,
} from '../core/utils';
import { initializeApp } from "firebase/app";
import { StackScreenProps } from '@react-navigation/stack';
import 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Constants from 'expo-constants';
import { config } from '../config/firebase.config';

initializeApp(config.firebaseConfig);
const auth = getAuth();

const SignUpScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [registerError, setError] = useState({ value: '', error: '' });

    async function _onSignUpPressed() {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);

        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email.value, password.value);
            navigation.navigate('Sign In');
        } catch (error) {
            setError({
                ...registerError,
                error: error.message,
            });
            alert(error.message);
        }
    };

    return (
        <Background>
            <Header>Create Account</Header>

            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />

            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={text => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />

            <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
                Sign Up
            </Button>

            <View style={styles.row}>
                <Text style={styles.label}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    label: {
        color: theme.colors.secondary,
    },
    button: {
        marginTop: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});

export default SignUpScreen;