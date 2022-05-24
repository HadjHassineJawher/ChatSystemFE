import { View, TextInput, Pressable, Image, Platform } from "react-native";
import MessageInputStyles from "./MessageInputStyles";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMutation } from "@apollo/client";
import { CREATE_MESSAGE } from "../../graphql/mutations";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as SecureStore from "expo-secure-store";

const MessageInput = (chatRoom) => {
  const [message, setMessage] = useState("");
  const [isemojiPickerOpen, setIsemojiPickerOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [paused, setPaused] = useState(true);
  const [userId, setUserId] = useState("");

  const getUserId = async (key: any) => {
    try {
      var id = await SecureStore.getItemAsync(key);
      setUserId(id);
    } catch (error) {
      console.log("Error Retriving User Id " + error);
    }
  };

  useEffect(() => {
    getUserId("userId");
  });

  const [CreateMessage, { data, loading, error }] = useMutation(
    CREATE_MESSAGE,
    {
      onError: () => {
        console.log(error);
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const libraryResponse =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const photoResponse = await ImagePicker.requestCameraPermissionsAsync();
        const audioResponse = await Audio.requestPermissionsAsync();
        if (
          libraryResponse.status !== "granted" ||
          photoResponse.status !== "granted"
        ) {
          alert("Sorry, We need camera roll permission to make this work !");
        }
      }
    })();
  }, []);

  // ! ------ Sound Fuctions Starts HERE ------

  async function startRecording() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    if (!recording) {
      return;
    }
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);

    if (!uri) {
      return;
    }
    const { sound } = await Audio.Sound.createAsync({ uri });

    setSound(sound);
  }

  const playPauseSound = async () => {
    if (!sound) {
      return;
    }
    if (paused) {
      setPaused(false);
      await sound.playAsync();
    } else {
      setPaused(true);
      await sound.pauseAsync();
    }
  };
  // ! ------ End ------

  // ? ------ Image & Photos Fuctions Starts HERE ------
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // ? ------ End ------
  const onBrainClicked = () => {
    console.warn("Brain Clicked");
  };

  const sendMessage = async () => {
    var messageInfo = {
      from: userId,
      body: message,
      chatRoom: chatRoom.chatRoom,
    };
    await CreateMessage({
      variables: {
        body: messageInfo.body,
        chatRoom: messageInfo.chatRoom,
        from: messageInfo.from,
      },
    });
    setMessage("");
    setIsemojiPickerOpen(false);
  };

  const onPress = () => {
    if (message) {
      sendMessage();
    } else {
      onBrainClicked();
    }
  };

  return (
    <View
      style={[
        MessageInputStyles.root,
        { height: isemojiPickerOpen ? "50%" : "auto" },
      ]}
    >
      {image && (
        <>
          <View style={MessageInputStyles.sendImageContainer}>
            <Image
              source={{ uri: image }}
              style={{
                width: 140,
                height: 140,
                borderRadius: 10,
              }}
            />
            <Pressable onPress={() => setImage(null)}>
              <AntDesign
                name="close"
                size={21}
                color="#3A59F9"
                style={{ margin: 5 }}
              />
            </Pressable>
          </View>
        </>
      )}
      {sound && (
        <View style={MessageInputStyles.sendSoundContainer}>
          <Pressable onPress={playPauseSound}>
            <Feather
              name={paused ? "play" : "pause"}
              size={22}
              color="#3A59F9"
            />
          </Pressable>
          <View style={MessageInputStyles.audioProgressBg}>
            <View style={MessageInputStyles.audioProgressFg}></View>
          </View>
        </View>
      )}

      <View style={MessageInputStyles.row}>
        <View style={MessageInputStyles.inputContainer}>
          <Pressable
            onPress={() =>
              setIsemojiPickerOpen((currentValue) => !currentValue)
            }
          >
            <FontAwesome
              name="smile-o"
              size={22}
              color="#3A59F9"
              style={MessageInputStyles.icon}
            />
          </Pressable>

          <TextInput
            style={MessageInputStyles.input}
            placeholder="Send Something ... "
            value={message}
            onChangeText={setMessage}
          />
          <Pressable onPress={pickImage}>
            <Feather
              name="image"
              size={22}
              color="#3A59F9"
              style={MessageInputStyles.icon}
            />
          </Pressable>
          <Pressable onPress={takePhoto}>
            <Feather
              name="camera"
              size={22}
              color="#3A59F9"
              style={MessageInputStyles.icon}
            />
          </Pressable>
          <Pressable onPressIn={startRecording} onPressOut={stopRecording}>
            <FontAwesome5
              name={recording ? "microphone-alt-slash" : "microphone-alt"}
              size={21}
              color={recording ? "red" : "#3A59F9"}
              style={MessageInputStyles.icon}
            />
          </Pressable>
        </View>
        <Pressable onPress={onPress} style={MessageInputStyles.buttonContainer}>
          {message ? (
            <Ionicons name="send-outline" size={26} color="#3A59F9" />
          ) : (
            <MaterialCommunityIcons name="brain" size={25} color="#3A59F9" />
          )}
        </Pressable>
      </View>

      {isemojiPickerOpen && (
        <EmojiSelector
          category={Categories.symbols}
          showSearchBar={false}
          showSectionTitles={false}
          showHistory={false}
          showTabs={true}
          onEmojiSelected={(emoji) =>
            setMessage((currentMessage) => currentMessage + emoji)
          }
          columns={8}
        />
      )}
    </View>
  );
};

export default MessageInput;
