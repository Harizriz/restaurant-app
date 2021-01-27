import React, {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import keys from "./constants/keys";
import Parse from "parse/react-native";

import AppNavigation from "./assets/screens/AppNavigation/AppNavigation";

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(keys.applicationId, keys.javascriptKey);
Parse.serverURL = keys.serverURL;

export default function App() {

  useEffect(() => {
    const createInstallation = async () => {
      const Installation = Parse.Object.extend(Parse.Installation);
      const installation = new Installation();
  
      installation.set("deviceType", Platform.OS);
  
      await installation.save();
    }

    createInstallation();
  }, []);

  return <AppNavigation />;
}
