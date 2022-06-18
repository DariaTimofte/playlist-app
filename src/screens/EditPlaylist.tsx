import React, { useState } from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { config } from '../config/firebase.config';
import { useAuthentication } from '../hooks/useAuthentication';
import { getDatabase, push, ref, set } from 'firebase/database';
import { Text } from 'react-native';

initializeApp(config.firebaseConfig);
const auth = getAuth();

const app = initializeApp(config.firebaseConfig);
const db = getDatabase(app);

export default function EditPlaylistScreen({ route, navigation }) {
    const { user } = useAuthentication();

    const { key, name, songLink } = route.params;

    const [songName, setSongName] = useState({ value: name, error: '' });
    const [link, setLink] = useState({ value: songLink, error: '' });
    const [registerError, setError] = useState({ value: '', error: '' });

    function onEditSong() {
        try {
            set(ref(db, '/playlists/' + key), {
                userId: user.uid,
                name: songName.value,
                link: link.value
            }).then(res => {
                alert("Song was edited successfully!");
                navigation.navigate('Playlist');
            })
        } catch (error) {
            setError({
                ...registerError,
                error: error.message,
            })
            alert(error.message)
        };
    }

    return (
        <Background>
            <Header>Edit song</Header>

            <TextInput
                label="Song name"
                returnKeyType="next"
                value={songName.value}
                onChangeText={text => setSongName({ value: text, error: '' })}
                autoCapitalize="none"
                textContentType="name"
                keyboardType="default"
            />

            <TextInput
                label="Link"
                returnKeyType="done"
                value={link.value}
                onChangeText={text => setLink({ value: text, error: '' })}
                keyboardType="url"
                selectTextOnFocus={true}
            />

            <Button mode="contained" onPress={onEditSong}>
                Save
            </Button>
            <Button mode="contained" onPress={() => navigation.navigate('Playlist')}>
                Cancel
            </Button>
        </Background>
    );
};