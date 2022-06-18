import React, { memo, useEffect, useState } from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import { config } from '../config/firebase.config';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useAuthentication } from '../hooks/useAuthentication';
import { Navigation } from '../types';

const app = initializeApp(config.firebaseConfig);
const db = getDatabase(app);

type Props = {
    navigation: Navigation;
};

const PlaylistScreen = ({ navigation }: Props) => {
    const { user } = useAuthentication();
    const [playlist, setPlaylist] = useState({});
    const playlistKeys = Object.keys(playlist);
    const [registerError, setError] = useState({ value: '', error: '' });

    useEffect(() => {
        try {
            return onValue(ref(db, '/playlists'), querySnapShot => {
                let data = querySnapShot.val() || {};
                let playlist = { ...data };
                setPlaylist(playlist);
            });
        } catch (error) {
            setError({
                ...registerError,
                error: error.message,
            })
            alert(error.message)
        };
    }, []);

    function clearPlaylist() {
        try {
            remove(ref(db, '/playlists'));
        } catch (error) {
            setError({
                ...registerError,
                error: error.message,
            })
            alert(error.message)
        };
    }

    function deletePlaylistItem(key) {
        try {
            remove(ref(db, '/playlists/' + key));
        } catch (error) {
            setError({
                ...registerError,
                error: error.message,
            })
            alert(error.message)
        };
    }

    function onPress(link) {
        navigation.navigate(
            'Video Player',
            { link },
        );
    }

    function editPlaylist(key, name, link) {
        navigation.navigate(
            'Edit song',
            {
                key: key,
                name: name,
                songLink: link
            },
        );
    }

    return (
        <Background>
            <Header>Your playlist</Header>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainerStyle}>
                <View>
                    {playlistKeys.length > 0 ? (
                        playlistKeys.map(key => (
                            <View>
                                <View style={styles.playlistItem}>
                                    <Text style={[styles.songText]}>
                                        {playlist[key].name}
                                    </Text>
                                    <Text style={[styles.linkText]}
                                        onPress={() => onPress(playlist[key].link)}>
                                        {playlist[key].link}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <Button style={{ "width": 100 }} mode="outlined" onPress={() => editPlaylist(key, playlist[key].name, playlist[key].link)}>
                                        Edit
                                    </Button>
                                    <Button style={{ "width": 100 }} mode="outlined" onPress={() => deletePlaylistItem(key)}>
                                        Delete
                                    </Button>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text>No todo item</Text>
                    )}
                </View>

                <Button mode="outlined" onPress={() => navigation.navigate('Add song')}>
                    Add a new song
                </Button>
                <Button mode="outlined" onPress={() => clearPlaylist()}>
                    Clear playlist
                </Button>
            </ScrollView>
        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 12
    },
    contentContainerStyle: {
        padding: 0
    },
    playlistItem: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',
    },
    songText: {
        paddingHorizontal: 5,
        fontSize: 16,
        marginRight: 20,
    },
    linkText: {
        paddingHorizontal: 5,
        fontSize: 16,
        marginRight: 20,
        color: 'blue',
        fontStyle: 'italic',
        textDecorationLine: 'underline'
    },
});

export default memo(PlaylistScreen);
