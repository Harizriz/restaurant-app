# Restaurant Mobile App

A seamless restaurant mobile app that allow customers to experience a whole new level of dining experience
- Order food
- Check order status
- QR code scanner
- Contactless payment
- Virtual Queue

## Important Note
1. This software is in development mode and not yet ready for production.
2. This project is focused more on iOS instead of Android. Thus, it is recommended for you to use an iOS simulator or physical device.

## Requirements

An iOS or Android physical device or iOS simulator or Android simulator.

## Installation

### Step 1

If you want to run the project on a physical device
---
1. Use your device's mobile data by opening the device's mobile hotspot and connect it to your computer.
2. Install the Expo app, Expo Go, in your physical device, iOS or Android from the App store or Google Play Store.

If you want to run the project in a simulator
---
For iOS, you need to install Xcode in your Macbook which is only available in MacOS. (This project has not tested using Xcode)

For Android, you need to install Android Studio in your computer and create an Android Virtual Device.

---

### Step 2

To run the backend server, open the command prompt and make sure the path is at the project's root `restaurant-app`

Run these commands:

```
cd assets
```
```
cd backend
```
```
npm run dev
```
---

### Step 3

To start the project on Expo, open another window in the command prompt and make sure the path is at the project's root `restaurant-app`

Run this command:

```
expo start
```
---

### Step 4

Wait until the command opens Expo DevTools in your default browser. Once the Devtools generated a QR code on the bottom left of the website and started the Metro Bundler:

To run the project on both or iOS or Android physical device
---
1. Scan the QR code and the device will automatically opens the Expo App and run the project.

To run the project on Android simulator
---
1. Press 'a' inside the 'expo start' window command prompt.<br>
**OR**<br>
Press the 'Run on Android device/emulator' button in the Expo Devtools.<br><br>
**NOTE:** If your android virtual device have not installed the Expo App yet, it will wutomatically download it.

To run the project on iOS simulator (Not Tested)
---
1. Press the 'Run on iOS simulator' button in the Expo Devtools.

---

### Step 5

**NOTE:** Skip this step if users can sign in to the app

1. Open `settings.js` file
2. Replace the `ipAddress` to your mobile device's IP address
3. Include the `:5000` at the end of the IP address

### How to find mobile device's IP address

1. Open WiFi network
2. Click on the WiFi you are connected to
3. Click Properties
4. Look for IPv4 address
