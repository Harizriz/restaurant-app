import React from "react";
import { Button } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import MenuIcon from "react-native-vector-icons/MaterialIcons";
import QrIcon from "react-native-vector-icons/MaterialCommunityIcons";
import ListIcon from "react-native-vector-icons/Octicons";

import MainScreen from "../MainScreen/index";
import SignUpScreen from "../SignUpScreen/SignUpScreen";
import LoginScreen from "../LoginScreen/LoginScreen";
import ResetPasswordScreen from "../LoginScreen/ResetPasswordScreen";
import LoginPhoneNumberScreen from "../LoginScreen/LoginPhoneNumberScreen";
import SignUpPhoneNumberScreen from "../SignUpScreen/SignUpPhoneNumberScreen";

import OrderScreen from "../MenuScreen/OrderScreen";
import AccountScreen from "../MenuScreen/AccountScreen";
import ChangePasswordScreen from "../../components/ChangePasswordScreen";
import MainMenuScreen from "../MenuScreen/MainMenuScreen";
import QrCodeScreen from "../MenuScreen/QrCodeScreen";
import DishesScreen from "../MenuScreen/DishesScreen";
import DishDetailsScreen from "../MenuScreen/DishDetailsScreen";
import CartScreen from "../MenuScreen/CartScreen";

import VirtualQueueScreen from "../RestaurantManager/VirtualQueueScreen";
import TablesScreen from "../RestaurantManager/TablesScreen";
import MenuManagerScreen from "../RestaurantManager/MenuManagerScreen";
import QrCodeManagerScreen from "../RestaurantManager/QrCodeManagerScreen";
import AccountManagerScreen from "../RestaurantManager/AccountManagerScreen";
import EditTableScreen from "../RestaurantManager/EditTableScreen";
import DishesManagerScreen from "../RestaurantManager/DishesManagerScreen";
import AddDishScreen from "../RestaurantManager/AddDishScreen";
import EditDishScreen from "../RestaurantManager/EditDishScreen";

import KitchenOrderScreen from "../RestaurantStaff/KitchenOrderScreen";
import VirtualQueueStaffScreen from "../RestaurantStaff/VirtualQueueStaffScreen";
import OrderListScreen from "../RestaurantStaff/OrderListScreen";
import CheckoutTableScreen from "../RestaurantStaff/CheckoutTableScreen";
import AccountStaffScreen from "../RestaurantStaff/AccountStaffScreen";

import PaymentScreen from "../CheckoutScreen/PaymentScreen";
import PaymentDetailScreen from "../CheckoutScreen/PaymentDetailScreen";
import PaymentLoadingScreen from "../CheckoutScreen/PaymentLoadingScreen";

import ItemScreen from "../../components/ItemScreen";
import DummyScreen from "../../components/DummyScreen";
import CartPageScreen from "../../components/CartPageScreen";

const BottomTab = createBottomTabNavigator();
const MaterialBottomTabs = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Menu"
        component={MainMenuScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MenuIcon name="menu" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="QR Code Scanner"
        component={QrCodeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <QrIcon name="qrcode-scan" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Order Status"
        component={OrderScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MenuIcon name="shopping-cart" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MenuIcon name="account-circle" color={color} size={26} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const MaterialBottomTabsStaff = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Kitchen Order"
        component={KitchenOrderScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <QrIcon name="chef-hat" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Virtual Queue"
        component={VirtualQueueStaffScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MenuIcon name="people" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Order List"
        component={OrderListScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <ListIcon name="list-ordered" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Checkout Table"
        component={CheckoutTableScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <QrIcon name="chair-school" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={AccountStaffScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MenuIcon name="account-circle" color={color} size={26} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const MaterialBottomTabsManager = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Virtual Queue"
        component={VirtualQueueScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MenuIcon name="people" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Tables"
        component={TablesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <QrIcon name="chair-school" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Menu"
        component={MenuManagerScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MenuIcon name="menu" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={AccountManagerScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MenuIcon name="account-circle" color={color} size={26} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginPhoneNumberScreen"
          component={LoginPhoneNumberScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpPhoneNumberScreen"
          component={SignUpPhoneNumberScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainMenuScreen"
          component={MaterialBottomTabs}
          options={{gestureEnabled: false, headerShown: false}}
        />
        <Stack.Screen
          name="VirtualQueueScreen"
          component={MaterialBottomTabsManager}
          options={{gestureEnabled: false, headerShown: false}}
        />
        <Stack.Screen
          name="KitchenOrderScreen"
          component={MaterialBottomTabsStaff}
          options={{gestureEnabled: false, headerShown: false}}
        />
        <Stack.Screen name="DishesScreen" component={DishesScreen} options={{ title: "", headerBackTitle: "Back", headerTransparent: true }}/>
        <Stack.Screen name="DishDetailsScreen" component={DishDetailsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ItemScreen" component={ItemScreen} />
        <Stack.Screen name="DummyScreen" component={DummyScreen} />
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="CartPageScreen" component={CartPageScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="PaymentDetailScreen" component={PaymentDetailScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="PaymentLoadingScreen" component={PaymentLoadingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="QrCodeManagerScreen" component={QrCodeManagerScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="EditTableScreen" component={EditTableScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="DishesManagerScreen" component={DishesManagerScreen} options={{ title: "", headerBackTitle: "Back", headerTransparent: true }}/>
        <Stack.Screen name="AddDishScreen" component={AddDishScreen} options={{ title: "", headerBackTitle: "Back", headerTransparent: true }}/>
        <Stack.Screen name="EditDishScreen" component={EditDishScreen} options={{ title: "", headerBackTitle: "Back", headerTransparent: true }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// <Stack.Navigator screenOptions={{ headerShown: false }} // this is to hide the header but wait till the back button is implemented
// https://www.npmjs.com/package/react-native-vector-icons for icons, https://oblador.github.io/react-native-vector-icons/ for directory
