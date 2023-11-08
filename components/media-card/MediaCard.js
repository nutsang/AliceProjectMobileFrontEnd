import { useSelector } from 'react-redux'
import { Avatar, Button, Card, Text, useTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native'

const MediaCard = ({media, media_id, mediaPreference, setMediaPreference}) => {
    const theme = useTheme()
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const LeftContent = props => <Avatar.Icon {...props} icon="heart" />
    return (
        <TouchableOpacity>
        <Card>
        <Card.Title
            title={media[media_id].title}
            subtitle={`มี ${media[media_id].episode_amount} ตอน ${media[media_id].subtitle !== 'ไม่มี' ? `ซับ${media[media_id].subtitle}` : ''} ${media[media_id].dubbed !== 'ไม่มี' ? `พากย์${media[media_id].dubbed}` : ''}`}
            left={isLogin ? !mediaPreference.includes(media[media_id].id) && LeftContent : media[media_id] && LeftContent}
        />
        <Card.Cover source={{ uri: `https://drive.google.com/uc?id=${media[media_id].cover_photo}` }} />
      </Card>
      </TouchableOpacity>
    )
}

export default MediaCard