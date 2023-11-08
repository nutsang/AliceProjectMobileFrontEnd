import axios from 'axios'
import { View, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MediaCard from '../../components/media-card/MediaCard'
import Constants from 'expo-constants'
import { Searchbar } from 'react-native-paper';

const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('')
    const [media, setMedia] = useState([])
    const [mediaPreference, setMediaPreference] = useState([])
    const [filterResult, setFilterResult] = useState([])
    const [errorOnce, setErrorOnce] = useState(false)
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const onChangeSearch = (query) => {
      setSearchQuery(query)
      if(query.length <= 0){
        setFilterResult(media)
      }else{
        setFilterResult(media.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())))
      }
    }
    const fetchMedia = async () => {
      if(media.length <= 0){
        axios.get(`${process.env.EXPO_PUBLIC_API}/`)
        .then((response) => {
          setMedia(response.data)
          setFilterResult(response.data)
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
          <View style={{marginTop: Constants.statusBarHeight, padding: 20}}>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          {
            (((filterResult.length > 0) && !errorOnce) && isLogin) ?
              <FlatList
              data={filterResult}
              renderItem={({index}) => <MediaCard key={filterResult.id} media_id={index} media={filterResult} mediaPreference={mediaPreference} setMediaPreference={setMediaPreference} navigation={navigation}/>}
              keyExtractor={(item) => item.id}
              />
            :
            <FlatList
            data={filterResult}
            renderItem={({index}) => <MediaCard key={filterResult.id} media_id={index} media={filterResult} navigation={navigation}/>}
            keyExtractor={(item) => item.id}
            />
          }
          </View>
        </AlertNotificationRoot>
    )
}

export default Home