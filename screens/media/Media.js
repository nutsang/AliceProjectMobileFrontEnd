import Constants from 'expo-constants'
import { View, StyleSheet, Button, ImageBackground, Image, Text } from 'react-native'
import { Video, ResizeMode } from 'expo-av';
import { useEffect, useState, useRef } from 'react'
import { useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const Media = ({ navigation, route }) => {
    const { id, linked_to } = route.params
    const video = useRef(null)
    const [status, setStatus] = useState({})
    const [information, setInforamtion] = useState([])
    const [episodeList, setEpisodeList] = useState([])
    const [mediaPreference, setMediaPreference] = useState([])
    const [jwp_id, setJWP_ID] = useState('')
    const [episodeStatus, setEpisodeStatus] = useState(false)
    const isLogin = useSelector((state) => state.isLogin.isLogin)

    const fetchMedia = async() => {
        axios.get(`${process.env.EXPO_PUBLIC_API}/media/${id}/${linked_to}`)
        .then((response) => {
          setInforamtion(response.data[0])
          axios.get(`${process.env.EXPO_PUBLIC_API}/episode/${id}`)
          .then((response) => {
            setEpisodeList(response.data.episode)
            setEpisodeStatus(response.data.status)
            setJWP_ID(response.data.episode[0].jwp_id)
          }).catch((error) => {})
        })
        if(isLogin){
            const token = await AsyncStorage.getItem('token')
            axios.get(`${process.env.EXPO_PUBLIC_API}/preference`, {headers: {
              'Authorization': `Bearer ${token}`
            }})
            .then((response) => {
              setMediaPreference(response.data.map(item => item.id))
            })
            .catch((error) => {})
        }
    }
    useEffect(() => {
        fetchMedia();
      }, [id, isLogin, linked_to])

      return (
        <View style={styles.container}>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: `https://cdn.jwplayer.com/manifests/${jwp_id}.m3u8`,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
          <View style={styles.buttons}>
            <Button
              title={status.isPlaying ? 'Pause' : 'Play'}
              onPress={() =>
                status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
              }
            />
          </View>
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    video: {
      alignSelf: 'center',
      width: 320,
      height: 200,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Media