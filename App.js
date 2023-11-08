import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import StackNavigator from './components/navigation/StackNavigator'
import { PaperProvider, DefaultTheme } from 'react-native-paper'

const App = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#e11d48',
        secondary: '#0f172a',
        background: 'white',
        surface: 'white',
        surfaceVariant: 'white',
        createAccount: '#4f46e5',
        success: 'green',
        error: 'red',
    }
}
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  )
}

export default App