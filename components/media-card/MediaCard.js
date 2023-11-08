import { useSelector } from 'react-redux'
import { Avatar, Button, Card, Text, useTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native'
import * as Speech from 'expo-speech';

const MediaCard = ({media, media_id, mediaPreference, setMediaPreference, navigation}) => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const LeftContent = props => <TouchableOpacity onPress={() => console.log(media[media_id].title)}><Avatar.Icon {...props} icon="heart" size={38}/></TouchableOpacity>
    const RightContent = props => <TouchableOpacity onPress={() => Speech.speak(media[media_id].title)}>
        <Avatar.Icon {...props} icon="text-to-speech"  size={38}/>
    </TouchableOpacity>
    return (
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
      </TouchableOpacity>
    )
}

export default MediaCard