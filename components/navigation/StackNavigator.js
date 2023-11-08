import { createStackNavigator } from '@react-navigation/stack'
import SignIn from '../../screens/sign-in/SignIn'
import SignUp from '../../screens/sign-up/SignUp'
import Home from '../../screens/home/Home'
import ForgotPassword from '../../screens/forgot-password/ForgotPassword'
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
              }}
            />
        </Stack.Navigator>
    )
}

export default StackNavigator