import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import MenuIcon from "react-native-vector-icons/MaterialIcons";
import QrIcon from "react-native-vector-icons/MaterialCommunityIcons";

import MainScreen from "../MainScreen/index";
import SignUpScreen from "../SignUpScreen/SignUpScreen";
import LoginScreen from "../LoginScreen/LoginScreen";
import ResetPasswordScreen from "../LoginScreen/ResetPasswordScreen";
import LoginPhoneNumberScreen from "../LoginScreen/LoginPhoneNumberScreen";
import SignUpPhoneNumberScreen from "../SignUpScreen/SignUpPhoneNumberScreen";

import FeaturedMenuScreen from "../MenuScreen/FeaturedMenuScreen";
import OrderScreen from "../MenuScreen/OrderScreen";
import AccountScreen from "../MenuScreen/AccountScreen";
import ChangePasswordScreen from "../../components/ChangePasswordScreen";
import MainMenuScreen from "../MenuScreen/MainMenuScreen";
import QrCodeScreen from "../MenuScreen/QrCodeScreen";

import VirtualQueueScreen from "../RestaurantManager/VirtualQueueScreen";
import TablesScreen from "../RestaurantManager/TablesScreen";
import MenuManagerScreen from "../RestaurantManager/MenuManagerScreen";
import QrCodeManagerScreen from "../RestaurantManager/QrCodeManagerScreen";
import AccountManagerScreen from "../RestaurantManager/AccountManagerScreen";

import AppetizerScreen from "../MenuListScreen/AppetizerScreen";
import SaladScreen from "../MenuListScreen/SaladScreen";
import MainDishScreen from "../MenuListScreen/MainDishScreen";
import WesternScreen from "../MenuListScreen/WesternScreen";
import DessertScreen from "../MenuListScreen/DessertScreen";
import DrinksScreen from "../MenuListScreen/DrinksScreen";

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
        name="Home"
        component={FeaturedMenuScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
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
            <QrIcon name="table-row" color={color} size={26} />
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
        name="QR Code Generator"
        component={QrCodeManagerScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <QrIcon name="qrcode-scan" color={color} size={26} />
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

const MaterialBottomTabsStaff = () => {
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
            <QrIcon name="table-row" color={color} size={26} />
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
        name="QR Code Generator"
        component={QrCodeManagerScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <QrIcon name="qrcode-scan" color={color} size={26} />
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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
        />
        <Stack.Screen
          name="LoginPhoneNumberScreen"
          component={LoginPhoneNumberScreen}
        />
        <Stack.Screen
          name="SignUpPhoneNumberScreen"
          component={SignUpPhoneNumberScreen}
        />
        <Stack.Screen
          name="FeaturedMenuScreen"
          component={MaterialBottomTabs}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="VirtualQueueScreen"
          component={MaterialBottomTabsManager}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen name="AppetizerScreen" component={AppetizerScreen} />
        <Stack.Screen name="SaladScreen" component={SaladScreen} />
        <Stack.Screen name="MainDishScreen" component={MainDishScreen} />
        <Stack.Screen name="WesternScreen" component={WesternScreen} />
        <Stack.Screen name="DessertScreen" component={DessertScreen} />
        <Stack.Screen name="DrinksScreen" component={DrinksScreen} />
        <Stack.Screen name="ItemScreen" component={ItemScreen} />
        <Stack.Screen name="DummyScreen" component={DummyScreen} />
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
        <Stack.Screen name="CartPageScreen" component={CartPageScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="PaymentDetailScreen" component={PaymentDetailScreen} />
        <Stack.Screen name="PaymentLoadingScreen" component={PaymentLoadingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// <Stack.Navigator screenOptions={{ headerShown: false }} // this is to hide the header but wait till the back button is implemented
// https://www.npmjs.com/package/react-native-vector-icons for icons, https://oblador.github.io/react-native-vector-icons/ for directory
