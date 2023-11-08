import { useState } from "react"
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

const BottomNavigator = () => {
    const [value, setValue] = useState('');
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={isLogin ? [
            {
              value: 'Home',
              label: 'หน้าหลัก',
              onPress: () => navigation.push('Home')
            },
            {
              value: 'Preference',
              label: 'รายการโปรด',
              onPress: () => console.log('Preference')
            },
            {
            value: 'Account',
            label: 'บัญชีของฉัน',
            onPress: () => navigation.push('EditAccount')},
          ] :
          [
            {
              value: 'Home',
              label: 'หน้าหลัก',
              onPress: () => navigation.push('Home')
            },
            {
              value: 'Login',
              label: 'เข้าสู่ระบบ',
              onPress: () => navigation.push('SignIn')
            }
          ]}
        />
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 0.1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
  });

export default BottomNavigator