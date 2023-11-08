import { View, ImageBackground, Image } from 'react-native'
import { Button, TextInput, useTheme } from 'react-native-paper'
import Constants from 'expo-constants'
import { resetPassword } from '../../service/authentication'
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const SignIn = ({ navigation, route }) => {
    const theme = useTheme()
    const [account ,setAccount] = useState({email:''})
    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    useEffect(()=>{
        isLogin && navigation.navigate('Home')
      }, [isLogin, navigation])

    const success = (message) => {
        Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'สำเร็จ',
            textBody: message,
            button: 'ตกลง',
            onHide: () => {
                setAccount({email:'', password:''})
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

    const setEmail = (email) => {
        setAccount({...account,email:email})
    }
    
    const recoveryPassword = () => {
        resetPassword(account.email, success, unsuccess)
    }
    return (
        <AlertNotificationRoot>
            <View style={{flex: 1, backgroundColor: theme.colors.background}}>
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
                    flex: 1,
                    alignSelf: 'center',
                    resizeMode: 'contain',
                    backgroundColor: theme.colors.background,
                }}
                />
                <View style={{flex:2, marginHorizontal: 20, width: '90%', backgroundColor: theme.colors.background}}>
                    <TextInput label={'อีเมล'} style={{marginBottom: 10}} value={account.email} onChangeText={(text) => setEmail(text)}/>
                    <Button mode="contained" onPress={recoveryPassword} style={{marginBottom: 10}}>
                        ยืนยันอีเมล
                    </Button>
                    <Button mode='contained' buttonColor={theme.colors.createAccount} onPress={() => navigation.push('SignIn')} style={{marginBottom: 10}}>
                        ไปหน้าเข้าสู่ระบบ
                    </Button>
                </View>
                <View style={{flex:1}}></View>
                </ImageBackground>
            </View>
        </AlertNotificationRoot>
    )
}

export default SignIn