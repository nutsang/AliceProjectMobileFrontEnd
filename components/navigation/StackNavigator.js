import { createStackNavigator } from '@react-navigation/stack'
import SignIn from '../../screens/sign-in/SignIn'
import SignUp from '../../screens/sign-up/SignUp'
import ForgotPassword from '../../screens/forgot-password/ForgotPassword'
import Media from '../../screens/media/Media'
import Home from '../../screens/home/Home'
import EditAccount from '../../screens/edit-account/EditAccount'
import Preference from '../../screens/preference/Preference'

const Stack = createStackNavigator()

const StackNavigator = () => {
    const config = {
        animation: 'spring',
        config: {
          stiffness: 1000,
          damping: 500,
          mass: 3,
          overshootClamping: true,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 0.01,
        },
      };
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} >
            <Stack.Screen
            name='SignIn'
            component={SignIn}
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
                title: 'เข้าสู่ระบบ'
              }}
            />
            <Stack.Screen
            name='SignUp'
            component={SignUp}
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
                title: 'สมัครสมาชิก'
              }}
            />
            <Stack.Screen
            name='Home'
            component={Home}
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
                title: 'ยอดนิยม'
              }}
            />
            <Stack.Screen
            name='ForgotPassword'
            component={ForgotPassword}
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
                title: 'กู้คืนรหัสผ่าน'
              }}
            />
            <Stack.Screen
            name='Media'
            component={Media}
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
                title: 'เลือกตอน'
              }}
            />
            <Stack.Screen
            name='EditAccount'
            component={EditAccount}
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
                title: 'แก้ไขบัญชี'
              }}
            />
            <Stack.Screen
            name='Preference'
            component={Preference}
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
                title: 'รายการโปรด'
              }}
            />
        </Stack.Navigator>
    )
}

export default StackNavigator