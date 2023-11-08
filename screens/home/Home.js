import axios from 'axios'
import { View, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MediaCard from '../../components/media-card/MediaCard'
import Constants from 'expo-constants'

const Home = () => {
    
    const [media, setMedia] = useState([])
    const [mediaPreference, setMediaPreference] = useState([])
    const [errorOnce, setErrorOnce] = useState(false)
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const fetchMedia = async () => {
      if(media.length <= 0){
        axios.get(`${process.env.EXPO_PUBLIC_API}/`)
        .then((response) => {
          setMedia(response.data)
        })
        .catch((error) => {
          if(!errorOnce){
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'ล้มเหลว',
              textBody: error.code === 'ERR_NETWORK' ? 'เซิฟเวอร์กำลังปรับปรุง...' : error.response.data.message,
              button: 'ตกลง',
          })
            setErrorOnce(true)
          }
        })
      }
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
      useEffect(()=>{
        fetchMedia();
      }, [isLogin, errorOnce, media.length])
    return (
        <AlertNotificationRoot>
          <View style={{marginTop: Constants.statusBarHeight}}>
          {
            (((media.length > 0) && !errorOnce) && isLogin) ?
              <FlatList
              data={media}
              renderItem={({index}) => <MediaCard key={media.id} media_id={index} media={media} mediaPreference={mediaPreference} setMediaPreference={setMediaPreference} />}
              keyExtractor={(item) => item.id}
              />
            :
            <FlatList
            data={media}
            renderItem={({index}) => <MediaCard key={media.id} media_id={index} media={media} />}
            keyExtractor={(item) => item.id}
            />
          }
          </View>
        </AlertNotificationRoot>
    )
}

export default Home