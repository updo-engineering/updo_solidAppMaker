import React from 'react';
import {
  Modal,
  StyleSheet,
  Pressable,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-crop-picker';

import { Colors } from "../Colors/Colors";

import { Custom_Fonts } from '../Constants/Font';

const CustomImagePickerModal = props => {
  const openGallery = () => {
    try {
      ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
      }).then(image => {
        props.attachments(image);
        props.pressHandler();
      });
    } catch (error) {
      Toast.show(error.message);
    }
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: false,
    }).then(image => {
      props.attachments(image);
      props.pressHandler();
    });
  };

  return (
    <Modal
      visible={props.visible}
      animationType="fade"
      transparent={true}
      {...props}>
      <Pressable onPress={props.pressHandler} style={styles.modalScreen}>
        <View style={styles.modalContanier}>
          <View style={styles.pickerContanier}>
            <Text style={styles.chooseMedia}>Choose Media</Text>
            {/* <Image
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
              }}
              source={require('../Assets/Images/peach.png')}
            /> */}
          </View>

          <View style={styles.optionsContanier}>
            <TouchableOpacity onPress={() => openGallery()}>
              <Text style={styles.options}>GALLERY</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openCamera()}>
              <Text style={styles.options}>CAMERA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalScreen: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContanier: {
    backgroundColor: 'white',
    height: '17%',
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  chooseMedia: {
    fontFamily: Custom_Fonts.Poppins_Medium,
    fontSize: 16,
  },
  options: {
    fontSize: 16,
    fontFamily: Custom_Fonts.Poppins_Medium,
    color: Colors.themeBlue,
  },
  optionsContanier: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerContanier: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default CustomImagePickerModal;
