import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CharList from './src/screens/CharList/CharList';
import CharDetail from './src/screens/CharDetail/CharDetail';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
const queryClient = new QueryClient();


export type RootStackParamList = {
  CharList: undefined;
  CharDetail: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="CharList"
              component={CharList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CharDetail"
              component={CharDetail}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
