import { createStackNavigator } from '@react-navigation/stack';
import Login from '../containers/auth/Login';
import React from "react"

const Stack = createStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerShown: false
            }} name="Login" component={Login} />
        </Stack.Navigator>
    );
}

export default AuthStack