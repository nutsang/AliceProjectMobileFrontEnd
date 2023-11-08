import { View, ImageBackground, Image } from 'react-native'
import { Button, TextInput, useTheme, Text } from 'react-native-paper'
import Constants from 'expo-constants'
import axios from 'axios';
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification'
import { signUpAccount } from '../../service/authentication'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const SignUp = ({ navigation, route }) => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    useEffect(()=>{
        isLogin && navigation.navigate('Home')
      }, [isLogin, navigation])
    const theme = useTheme()
    const [hidden1, setHidden1] = useState(true)
    const [hidden2, setHidden2] = useState(true)
    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    const atLeastOneUppercase = /[A-Z]/g
    const atLeastOneLowercase = /[a-z]/g
    const atLeastOneNumeric = /[0-9]/g
    const atLeastOneSpecialChar = /[#?!@$%^&*-]/g
    const eightCharsOrMore = /.{8,}/g
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
    
    const [passwordRequireMent, setPasswordRequireMent] = useState({minimumLength: false, alphabetLower: false, alphabetUpper: false, number: false, special: false})
    const [account ,setAccount] = useState({userName:'', email:'', password:'', confirmPassword:''})

    const setUserName = (userName) => {
        setAccount({...account,userName:userName})
    }
    
    const setEmail = (email) => {
      setAccount({...account,email:email})
    }
    
    const setPassword = (passwords) => {
      const password = passwords
      setAccount({...account,password:password})
      setPasswordRequireMent({minimumLength: password.match(eightCharsOrMore),
        alphabetLower: password.match(atLeastOneLowercase),
        alphabetUpper: password.match(atLeastOneUppercase),
        number: password.match(atLeastOneNumeric),
        special: password.match(atLeastOneSpecialChar)})
    }

    const setConfirmPassword = (confirmPassword) => {
      setAccount({...account,confirmPassword:confirmPassword})
    }

    const success = (message) => {
        Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'สำเร็จ',
            textBody: message,
            button: 'ตกลง',
            onHide: () => {
                setAccount({userName:'', email:'', password:'', confirmPassword:''})
                setPasswordRequireMent({minimumLength: false, alphabetLower: false, alphabetUpper: false, number: false, special: false})
                navigation.push('SignIn')
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

    const createAccount = () => {
        if(account.userName.length <= 0 || account.email.length <= 0 || account.password.length <= 0 || account.confirmPassword.length <= 0){
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'คำเตือน',
                textBody: (account.userName.length <= 0) ? 'กรุณากรอกนามแฝง' : (account.email.length <= 0) ? 'กรุณากรอกอีเมล' : (account.password.length <= 0) ? 'กรุณากรอกรหัสผ่าน' : (account.confirmPassword.length <= 0) && 'กรุณายืนยันรหัสผ่าน',
                button: 'ตกลง',
            })
        }else if(!account.email.match(emailRegex)){
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'คำเตือน',
                textBody: 'กรุณากรอกรูปแบบอีเมลให้ถูกต้อง',
                button: 'ตกลง',
            })
        }else if(!passwordRequireMent.minimumLength || !passwordRequireMent.alphabetLower || !passwordRequireMent.alphabetUpper || !passwordRequireMent.number || !passwordRequireMent.special){
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'คำเตือน',
                textBody: (!passwordRequireMent.minimumLength) ? 
                'ต้องการความยาวรหัสผ่านอย่างน้อย 8 ตัว' : 
                (!passwordRequireMent.alphabetLower) ? 
                'ต้องการตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว' : 
                (!passwordRequireMent.alphabetUpper) ? 
                'ต้องการตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว' : 
                (!passwordRequireMent.number) ? 
                'ต้องการตัวเลขอย่างน้อย 1 ตัว' : 
                (!passwordRequireMent.special) && 
                'ต้องการตัวอักษรพิเศษอย่างน้อย 1 ตัว',
                button: 'ตกลง',
            })
        }else if(account.password !== account.confirmPassword){
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'คำเตือน',
                textBody: 'กรุณากรอกรหัสผ่าน และ ยืนยันรหัสผ่านให้ตรงกัน',
                button: 'ตกลง',
            })
        }else{
          axios.post(`${process.env.EXPO_PUBLIC_API}/sign-up-validation`, account)
          .then((response) => {
            if(response.data.message === 'ผ่านการตรวจสอบ'){
                signUpAccount(account, success, unsuccess)
            }
          })
          .catch((error) => {
            if(error.response === undefined){
                unsuccess('สร้างบัญชีล้มเหลว')
            }
          })
        }
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
                    flex: 0.3,
                    alignSelf: 'center',
                    resizeMode: 'contain',
                    backgroundColor: theme.colors.background,
                }}
                />
                <View style={{flex:0.7, marginHorizontal: 20, width: '90%', backgroundColor: theme.colors.background}}>
                    <TextInput label={'นามแฝง'} style={{marginBottom: 10}} value={account.userName} onChangeText={(text) => setUserName(text)}/>
                    <TextInput label={'อีเมล'} style={{marginBottom: 10}} value={account.email} onChangeText={(text) => setEmail(text)}/>
                    <TextInput
                        label={'รหัสผ่าน'}
                        secureTextEntry={hidden1}
                        right={
                            <TextInput.Icon
                                onPress={() => {setHidden1(!hidden1)}} icon={hidden1 ? 'eye' : 'eye-off'}
                            />
                        }
                        style={{marginBottom: 10}}
                        value={account.password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TextInput
                        label={'ยืนยันรหัสผ่าน'}
                        secureTextEntry={hidden2}
                        right={
                            <TextInput.Icon
                                onPress={() => {setHidden2(!hidden2)}} icon={hidden2 ? 'eye' : 'eye-off'}
                            />
                        }
                        style={{marginBottom: 10}}
                        value={account.confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                    />
                    <View>
                    <Text variant='labelLarge'>ความต้องการของรหัสผ่าน:</Text>
                    <Text variant='labelLarge' style={passwordRequireMent.minimumLength ? {color: theme.colors.success} : {color: theme.colors.error}}>* ความยาวรหัสผ่านอย่างน้อย 8 ตัว</Text>
                    <Text variant='labelLarge' style={passwordRequireMent.alphabetLower ? {color: theme.colors.success} : {color: theme.colors.error}}>* มีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว</Text>
                    <Text variant='labelLarge' style={passwordRequireMent.alphabetUpper ? {color: theme.colors.success} : {color: theme.colors.error}}>* มีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว</Text>
                    <Text variant='labelLarge' style={passwordRequireMent.number ? {color: theme.colors.success} : {color: theme.colors.error}}>* มีตัวเลขอย่างน้อย 1 ตัว</Text>
                    <Text variant='labelLarge' style={passwordRequireMent.special ? {color: theme.colors.success} : {color: theme.colors.error}}>* มีเครื่องหมายพิเศษ เช่น #?!@$%^&*- อย่างน้อย 1 ตัว</Text>
                    </View>
                </View>
                <Button mode='contained' onPress={createAccount} style={{marginBottom: 10}}>สร้างบัญชี</Button>
                <Button mode='contained' buttonColor={theme.colors.createAccount} onPress={() => navigation.push('SignIn')} style={{marginBottom: 10}}>ไปหน้าเข้าสู่ระบบ</Button>
                </ImageBackground>
            </View>
        </AlertNotificationRoot>
    )
}

export default SignUp