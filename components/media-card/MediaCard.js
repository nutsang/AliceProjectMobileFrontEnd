import { useSelector } from 'react-redux'
import { Avatar, Button, Card, Text, useTheme, Dialog, Portal } from 'react-native-paper';
import { TouchableOpacity } from 'react-native'
import * as Speech from 'expo-speech';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ALERT_TYPE, Dialog as DialogAlert, AlertNotificationRoot } from 'react-native-alert-notification'
import axios from 'axios'
const MediaCard = ({media, media_id, mediaPreference, setMediaPreference, navigation}) => {
    const [visible, setVisible] = useState(false)
    const hideDialog = () => setVisible(false);

    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const LeftContent = props => <TouchableOpacity onPress={() => setVisible(true)}><Avatar.Icon {...props} icon="heart" size={38}/></TouchableOpacity>
    const RightContent = props => <TouchableOpacity onPress={() => Speech.speak(media[media_id].title)}>
        <Avatar.Icon {...props} icon="text-to-speech"  size={38}/>
    </TouchableOpacity>

    const success = (message) => {
        DialogAlert.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'สำเร็จ',
            textBody: message,
            button: 'ตกลง',
            onHide: () => {
                hideDialog()
                navigation.navigate('Preference')
            },
        })
    }

    const unsuccess = (message) => {
        DialogAlert.show({
            type: ALERT_TYPE.DANGER,
            title: 'ล้มเหลว',
            textBody: message,
            button: 'ตกลง',
        })
    }

    const addPreference = async () => {
        const token = await AsyncStorage.getItem('token')
        axios.post(`${process.env.EXPO_PUBLIC_API}/preference`, {id:media[media_id].id}, {headers: {
            'Authorization': `Bearer ${token}`
          }})
          .then((response) => {
            setMediaPreference([...mediaPreference, media_id])
            success(response.data.message)
          })
          .catch((error) => {
            unsuccess(error.response.message)
          })
    }
    return (
        <AlertNotificationRoot>
        <TouchableOpacity style={{marginTop: 20}} onPress={() => navigation.navigate('Media', {
            id: media[media_id].id,
            linked_to: media[media_id].linked_to
        })}>
        <Card>
        <Card.Title
            title={media[media_id].title}
            subtitle={`มี ${media[media_id].episode_amount} ตอน ${media[media_id].subtitle !== 'ไม่มี' ? `ซับ${media[media_id].subtitle}` : ''} ${media[media_id].dubbed !== 'ไม่มี' ? `พากย์${media[media_id].dubbed}` : ''}`}
            left={isLogin && !mediaPreference.includes(media[media_id].id) && LeftContent}
            right={RightContent}
        />
        <Card.Cover source={{ uri: `https://drive.google.com/uc?id=${media[media_id].cover_photo}` }} />
      </Card>
      <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Icon icon="alert" />
        <Dialog.Title style={{textAlign: 'center'}}>ยืนยันการเพิ่มรายการโปรด</Dialog.Title>
        <Dialog.Actions>
          <Button onPress={addPreference}>เพิ่มเข้ารายการโปรด</Button>
          <Button onPress={hideDialog}>ยกเลิก</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
      </TouchableOpacity>
      </AlertNotificationRoot>
    )
}

export default MediaCard