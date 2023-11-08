import axios from 'axios'
import { View, FlatList, ImageBackground, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MediaCard from '../../components/media-card/MediaCard'
import Constants from 'expo-constants'
import { Searchbar, useTheme, TextInput, Button } from 'react-native-paper';
import BottomNavigator from '../../components/navigation/BottomNavigator'
import { setIsLogin } from '../../redux/isLoginSlice'
import { updateUsernameAccount, updateUsernameAndPasswordAccount } from '../../service/authentication'

const EditAccount = ({ navigation }) => {
    const theme = useTheme()
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const [account, setAccount] = useState({username:'', newPassword:'', password:''})
    const [oldUsername, setOldUsername] = useState('')
    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    const [hidden1, setHidden1] = useState(true)
    const [hidden2, setHidden2] = useState(true)
    useEffect(()=>{
        !isLogin && navigation.navigate('SignIn')
      }, [isLogin, navigation])

      const success = (message) => {
        Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'สำเร็จ',
            textBody: message,
            button: 'ตกลง',
            onHide: () => {
                setOldUsername(account.username)
                setAccount({...account, newPassword:'', password:''})
            },
        })
    }

    const unsuccess = (message) => {
        Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'ล้มเหลว',
            textBody: message,
            button: 'ตกลง',
        })
    }

      const setUsername = (username) => {
        setAccount({...account,username:username})
      }
    
      const setPassword = (passwords) => {
        setAccount({...account,password:passwords})
      }
    
      const setNewPassword = (newPassword) => {
        setAccount({...account,newPassword:newPassword})
      }

      const fetchAccount = async() => {
        const token = await AsyncStorage.getItem('token')
        axios.get(`${process.env.EXPO_PUBLIC_API}/edit-account`, {headers: {
          'Authorization': `Bearer ${token}`
        }})
        .then((response) => {
          setOldUsername(response.data[0].username)
          setAccount({...account, username: response.data[0].username})
        })
        .catch((error) => {})
      }

      useEffect(()=>{
        fetchAccount();
      },[isLogin])
    
    const handleEditAccount = () => {
        if(account.newPassword === ''){
          updateUsernameAccount(account, success, unsuccess)
        }else{
          updateUsernameAndPasswordAccount(account, success, unsuccess)
        }
    }

    const dispatch = useDispatch();

    const handleSignOut = async () => {
        try{
            await AsyncStorage.removeItem('token')
            dispatch(setIsLogin(false))
                !isLogin &&
                Dialog.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'สำเร็จ',
                    textBody: 'ออกจากระบบสำเร็จ',
                    button: 'ตกลง',
                    onHide: () => {
                        navigation.push('SignIn')
                    },
                })
        }catch{
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'ผิดพลาด',
                textBody: 'ออกจากระบบไม่สำเร็จ',
                button: 'ตกลง',
            })
        }
    }
    return (
        <AlertNotificationRoot>
        <View style={{marginTop: Constants.statusBarHeight, padding: 20, flex: 1, backgroundColor: theme.colors.background}}>
                <ImageBackground
                source={require('../../assets/magicpattern-confetti-1699399527418.png')}
                placeholder={blurhash}
                resizeMode='cover'
                transition={1000}
                style={{flex: 1, justifyContent: 'center', alignContent: 'center', marginTop: Constants.statusBarHeight}}>
                <Image
                key={1}
                source={require('../../assets/ALICE_2_1.png')}
                style={{
                    flex: 0.4,
                    alignSelf: 'center',
                    resizeMode: 'contain',
                    backgroundColor: theme.colors.background,
                }}
                />
            <TextInput label={'นามแฝง (มีผลในการให้เพื่อนค้นหา)'} style={{marginBottom: 10}} value={account.username} onChangeText={(text) => setUsername(text)}/>
            <TextInput
                label={'เปลี่ยนรหัสผ่านใหม่'}
                secureTextEntry={hidden1}
                right={
                    <TextInput.Icon
                        onPress={() => {setHidden1(!hidden1)}} icon={hidden1 ? 'eye' : 'eye-off'}
                    />
                 }
                style={{marginBottom: 10}}
                value={account.newPassword} onChangeText={(text) => setNewPassword(text)}
            />
            {(oldUsername === account.username && account.newPassword === '') ? '' :
            <TextInput
            label={'ยืนยันรหัสผ่านเก่าเพื่อบันทึกข้อมูล'}
            secureTextEntry={hidden2}
            right={
                <TextInput.Icon
                    onPress={() => {setHidden2(!hidden2)}} icon={hidden2 ? 'eye' : 'eye-off'}
                />
             }
            style={{marginBottom: 10}}
            value={account.password} onChangeText={(text) => setPassword(text)}
        />
            }

            <Button mode="contained" style={{marginBottom: 10}} onPress={handleEditAccount}>
                บันทึกข้อมูล
            </Button>
            <Button mode="contained" buttonColor={theme.colors.secondary} style={{marginBottom: 10}} onPress={handleSignOut}>
                ออกจากระบบ
            </Button>
            </ImageBackground>
            <BottomNavigator />
        </View>
        </AlertNotificationRoot>
    )
}

export default EditAccount