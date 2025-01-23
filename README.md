This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

# Salsa - React Native Project

> This app is designed to work seamlessly on both iOS and Android platforms, providing a consistent experience across devices.

## Project Setup

### Prerequisites

- Node.js >= 18
- JDK 17
- Android Studio and Android SDK
- React Native CLI

### Dependencies

```json
{
  "dependencies": {
    "@react-navigation/native": "6.1.9",
    "@react-navigation/native-stack": "6.9.17",
    "react": "18.2.0",
    "react-native": "0.72.17",
    "react-native-linear-gradient": "2.8.3",
    "react-native-paper": "5.13.1",
    "react-native-safe-area-context": "4.7.4",
    "react-native-screens": "4.0.0",
    "react-native-vector-icons": "10.2.0"
  },
  "devDependencies": {
    "@babel/core": "7.26.0",
    "@babel/preset-env": "7.25.3",
    "@babel/runtime": "7.26.0",
    "@react-native-community/cli": "15.0.1",
    "@react-native-community/cli-platform-android": "15.0.1",
    "@react-native-community/cli-platform-ios": "15.0.1",
    "@react-native/babel-preset": "0.77.0",
    "@react-native/gradle-plugin": "0.72.11",
    "@react-native/metro-config": "0.77.0",
    "@react-native/typescript-config": "0.77.0",
    "@types/jest": "29.5.13",
    "@types/react": "18.2.6",
    "@types/react-native": "0.72.8",
    "@types/react-test-renderer": "18.0.0",
    "jest": "29.6.3",
    "metro-react-native-babel-preset": "0.77.0",
    "prettier": "2.8.8",
    "react-test-renderer": "18.2.0",
    "typescript": "5.0.4"
  }
}
```

### Project Structure and Files

#### Directory Structure

```
Salsa/
├── android/                 # Android native code
├── src/
│   ├── assets/             # Images and other assets
│   │   ├── mountain.jpg    # Welcome screen background
│   │   ├── destination1.jpg
│   │   └── architecture.jpg
│   └── screens/            # React Native screens
│       ├── Home.js
│       ├── Events.js
│       └── Details.js
├── App.js                  # Main app component
├── index.js               # Entry point
├── app.json              # App configuration
└── package.json
```

### Installation and Setup

1. **Initial Setup**

   ```bash
   # Create parent directory and navigate into it
   mkdir REACT_NATIVE && cd REACT_NATIVE

   # Create the React Native project
   npx react-native@0.72.17 init Salsa

   cd Salsa
   ```

2. **Install Dependencies**

   ```bash
   # Install navigation dependencies
   npm install @react-navigation/native@6.1.9 @react-navigation/native-stack@6.9.17

   # Install required native dependencies
   npm install react-native-screens@4.0.0 react-native-safe-area-context@4.7.4

   # Install UI components and utilities
   npm install react-native-linear-gradient@2.8.3 react-native-paper@5.13.1 react-native-vector-icons@10.2.0
   ```

3. **Running the App (Working Command)**

   ```bash
   # Make sure you're in the Salsa directory
   cd Salsa

   # Run the Android app (this command worked successfully)
   npx react-native run-android
   ```

### Important Notes

1. **File Locations**

   - All source files are backed up at: `/home/abrah926/Desktop/TravelApp_Backup/`
   - This backup contains the exact working state of the app

2. **Running the App**

   - Always run commands from the Salsa directory
   - Use `npx react-native run-android` directly instead of npm scripts
   - No need to start Metro separately, it will start automatically

3. **Troubleshooting**
   If the app stops working:
   1. Compare your files with the backup in `/home/abrah926/Desktop/TravelApp_Backup/`
   2. Ensure you're using the exact versions specified in package.json
   3. Run from the Salsa directory using the exact command above

## Development Tips

1. **Metro Development Server**

   ```bash
   # Preferred way to start Metro
   npx react-native start --reset-cache
   ```

2. **Android Development**

   ```bash
   # Full clean build (use when having issues)
   cd android && ./gradlew clean && cd .. && npx react-native run-android
   ```

3. **Port Forwarding**
   ```bash
   # If Metro isn't connecting
   adb reverse tcp:8081 tcp:8081
   ```

## Known Issues and Solutions

1. **Navigation Type Errors**

   - Solution: Use exact versions specified in dependencies
   - Ensure all screen components have default exports

2. **Metro Bundler Warnings**

   - Ignore warnings about "server.forwardClientLogs" and "watcher.unstable_workerThreads"
   - These are known issues with Metro 0.76.9

3. **Image Loading Issues**
   - Ensure images are in the correct directory
   - Use require() syntax for local images
   - Verify image paths are correct
