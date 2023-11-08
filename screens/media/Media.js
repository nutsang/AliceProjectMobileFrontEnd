import Constants from 'expo-constants'
import { View, StyleSheet, FlatList, ImageBackground, Image } from 'react-native'
import { Video, ResizeMode } from 'expo-av';
import { useEffect, useState, useRef } from 'react'
import { useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useTheme, Button, Text } from 'react-native-paper';
import BottomNavigator from '../../components/navigation/BottomNavigator'
import { Rating } from 'react-native-ratings';

const Media = ({ navigation, route }) => {
    const { id, linked_to } = route.params
    const theme = useTheme()
    const video = useRef(null)
    const [status, setStatus] = useState({})
    const [information, setInforamtion] = useState([])
    const [episodeList, setEpisodeList] = useState([])
    const [mediaPreference, setMediaPreference] = useState([])
    const [jwp_id, setJWP_ID] = useState('')
    const [episodeStatus, setEpisodeStatus] = useState(false)
    const [episodeCurrent, setEpisodeCurrent] = useState(1)
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    const [rating, setRating] = useState(0)

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

      const EpisodeButton = ({episode, jwp_episode_id, jwp_id, setJWP_ID}) => {
        return (<Button style={{marginTop: 5}} mode={"contained"} buttonColor={jwp_id === jwp_episode_id ? theme.colors.primary: theme.colors.secondary} onPress={()=>{
            setJWP_ID(jwp_episode_id)
            setEpisodeCurrent(episode)
        }}>{`ตอนที่ ${episode}`}</Button>)
        }


    
    const updateRating = async() => {
      const token = await AsyncStorage.getItem('token')
      axios.post(`${process.env.EXPO_PUBLIC_API}/popularity/${id}`, {point: rating}, {headers: {
        'Authorization': `Bearer ${token}`
      }})
      .then((response) => {})
      .catch((error) => {})
    }
    useEffect(() => {
      updateRating()
    }, [rating])
      const ratingChange = (selectedRating) => {
          if(isLogin){
            setRating(selectedRating)
        }
      }
      return (
        <ImageBackground
        source={require('../../assets/magicpattern-confetti-1699399527418.png')}
        placeholder={blurhash}
        resizeMode='cover'
        transition={1000}
        style={{flex: 1, justifyContent: 'center', alignContent: 'center', marginTop: Constants.statusBarHeight}}>
        <Text style={{backgroundColor:theme.colors.primary, color:theme.colors.background, padding: 10}} variant='titleMedium'>เรื่อง {information.title} ตอนที่ {episodeCurrent}</Text>
        <Video
            ref={video}
            style={{flex: 0.4 ,alignSelf: 'center', width:'100%', height: 200}}
            source={{
              uri: `https://cdn.jwplayer.com/manifests/${jwp_id}.m3u8`,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        {isLogin && <Rating startingValue={rating} minValue={0} fractions={0} ratingCount={5} jumpValue={1} onFinishRating={(rating) => ratingChange(rating)}/>}
        <View style={{flex: 0.5}}>
        <Text variant='titleLarge' style={{marginBottom: 10, textAlign:'center', backgroundColor:theme.colors.primary, color:theme.colors.background, padding: 10}}>เลือกตอนที่นี่</Text>
          <FlatList
              data={episodeList}
              renderItem={({item, index}) => <EpisodeButton key={item.id} episode={item.episode_at} jwp_episode_id={item.jwp_id} jwp_id={jwp_id} setJWP_ID={setJWP_ID}/>}
              keyExtractor={(item) => item.id}
            />
        </View>
        <BottomNavigator/>
        </ImageBackground>
      )
}

const styles = StyleSheet.create({
    video: {
      alignSelf: 'center',
      width: '100%',
      height: '50%',
    }
  });

export default Media