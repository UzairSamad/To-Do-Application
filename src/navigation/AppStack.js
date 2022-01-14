import { createStackNavigator } from '@react-navigation/stack';
import React from "react"
import AllTask from '../containers/app/AllTasks';
import CreateTask from '../containers/app/CreateTask';
import TaskDetail from '../containers/app/TaskDetail';
import TodoList from '../containers/app/TodoList';

const Stack = createStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerShown: false
            }} name="TodoList" component={TodoList} />
            <Stack.Screen options={{
                headerShown: false
            }} name="CreateTask" component={CreateTask} />
            <Stack.Screen options={{
                headerShown: false
            }} name="AllTask" component={AllTask} />
            <Stack.Screen options={{
                headerShown: false
            }} name="TaskDetail" component={TaskDetail} />
        </Stack.Navigator>
    );
}

export default AuthStack