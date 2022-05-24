import * as SecureStore from "expo-secure-store";

  /**
 * Store the Token in the SecureStore.
 */
  const storeToken = async (key: any, value: any) => {
      try {
        // console.log("Your Key is : "+ key)
        return await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.log("Error storing token" + err);
    }
};
  
/**
 * Get the Token from the SecureStore.
 */

 const getToken = async (key: any) => {
    try {
      return await SecureStore.getItemAsync(key)
    } catch (error) {
      console.log("Error Retriving Token" + error);
    }
  };

/**
 * Remove the Token from the SecureStore.
 */
  const removeToken = async (key: any) => {
    try {
      return await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.log("Error in Removing Token" + error);
    }
  };

  /**
 * Store the User Id in the SecureStore.
 */
  const storeUserId = async (key: any, value: any) => {
    try {
        return await SecureStore.setItemAsync(key, value);
    } catch (err) {
        console.log("Error storing User Id " + err);
      }

  };

/**
 * Get the UserId from the SecureStore.
 */

 const getUserId = async (key: any) => {
    try {
      return await SecureStore.getItemAsync(key)
    } catch (error) {
      console.log("Error Retriving User Id " + error);
    }
 };
  
export {
    storeToken,
    getToken,
    removeToken,
    storeUserId,
    getUserId 
}