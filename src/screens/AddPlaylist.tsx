import React, { memo, useState } from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { Navigation } from '../types';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { config } from '../config/firebase.config';
import { useAuthentication } from '../hooks/useAuthentication';
import { getDatabase, push, ref } from 'firebase/database';

initializeApp(config.firebaseConfig);
const auth = getAuth();

type Props = {
    navigation: Navigation;
};

const app = initializeApp(config.firebaseConfig);
const db = getDatabase(app);

const AddPlaylistScreen = ({ navigation }: Props) => {
    const { user } = useAuthentication();

    const [songName, setSongName] = useState({ value: '', error: '' });
    const [link, setLink] = useState({ value: '', error: '' });
    const [registerError, setError] = useState({ value: '', error: '' });

    function onAddSong() {
        try {
            push(ref(db, '/playlists'), {
                userId: user.uid,
                name: songName.value,
                link: link.value
            }).then(res => {
                alert("Song was added successfully!");
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
            <Header>Add a new song</Header>

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
            />

            <Button mode="contained" onPress={onAddSong}>
                Add song
            </Button>
            <Button mode="contained" onPress={() => navigation.navigate('Playlist')}>
                Cancel
            </Button>
        </Background>
    );
};

export default memo(AddPlaylistScreen);