import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import PatternLockScreen from '../screens/patten_lock';
import Dashboard from '../screens/dashboard';

const Stack = createStackNavigator();

export const StackScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}
    >
      <Stack.Screen name="screen_index" component={PatternLockScreen} />
      <Stack.Screen name="dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
};
