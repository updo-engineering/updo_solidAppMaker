import React, {useState} from 'react';
import {Modal, StyleSheet, View, ActivityIndicator} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
const Loader = props => {
  return (
    <Modal
      visible={props.visible}
      animationType="fade"
      transparent={true}
      {...props}>
      <View style={styles.modalScreen}>
        <BarIndicator size={20} color = {"white"} />
      </View>
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
  closeButton: {
    marginVertical: 10,
  },
});

export default Loader;