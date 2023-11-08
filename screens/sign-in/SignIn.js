import { useState } from 'react'
import { View, ImageBackground, Image } from 'react-native'
import { Button, TextInput, useTheme } from 'react-native-paper'
import Constants from 'expo-constants'
import { signInAccount } from '../../service/authentication'
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification'

const SignIn = ({ navigation }) => {
    const theme = useTheme()
    const [hidden, setHidden] = useState(true)
    const [account ,setAccount] = useState({email:'', password:''})
    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    const success = (message) => {
        Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'สำเร็จ',
            textBody: message,
            button: 'ตกลง',
            onHide: () => {
                setAccount({email:'', password:''})
                navigation.push('Home')
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
    
    const setPassword = (password) => {
        setAccount({...account,password:password})
    }

      const handleSignInAccount = () => {
        signInAccount(account, success, unsuccess)
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
                    <TextInput
                        label={'รหัสผ่าน'}
                        secureTextEntry={hidden}
                        right={
                            <TextInput.Icon
                                onPress={() => {setHidden(!hidden)}} icon={hidden ? 'eye' : 'eye-off'}
                            />
                        }
                        style={{marginBottom: 10}}
                        value={account.password} onChangeText={(text) => setPassword(text)}
                    />
                    <Button mode="contained" onPress={handleSignInAccount} style={{marginBottom: 10}}>
                        เข้าสู่ระบบ
                    </Button>
                    <Button mode="contained" onPress={() => navigation.push('ForgotPassword')} style={{marginBottom: 10, backgroundColor: theme.colors.secondary}}>
                        ลืมรหัสผ่าน
                    </Button>
                    <Button mode='contained' buttonColor={theme.colors.createAccount} onPress={() => navigation.push('SignUp')} style={{marginBottom: 10}}>
                        ไปหน้าสมัครสมาชิก
                    </Button>
                    <Button mode="contained" buttonColor={'#252525'} onPress={() => navigation.push('Home')} style={{marginBottom: 10}}>
                        เข้าสู่ระบบแบบไม่ระบุตัวตน
                    </Button>
                </View>
                <View style={{flex:1}}></View>
                </ImageBackground>
            </View>
        </AlertNotificationRoot>
    )
}

export default SignIn