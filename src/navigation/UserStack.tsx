import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Playlist from '../screens/Playlist';
import AddPlaylist from '../screens/AddPlaylist';
import VideoPlayer from '../screens/VideoPlayer';
import EditPlaylist from '../screens/EditPlaylist';

const Drawer = createDrawerNavigator();

export default function UserStack() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Dashboard" screenOptions={{ header: () => null }}>
                <Drawer.Screen name="Dashboard" component={HomeScreen} />
                <Drawer.Screen name="Playlist" component={Playlist} />
                <Drawer.Screen name="Add song" component={AddPlaylist} />
                <Drawer.Screen name="Video Player" component={VideoPlayer} options={{
                    drawerItemStyle: {
                        display: "none",
                    },
                }} />
                <Drawer.Screen name="Edit song" component={EditPlaylist} options={{
                    drawerItemStyle: {
                        display: "none",
                    },
                }} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}