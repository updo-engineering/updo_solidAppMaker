import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'

import Modal from 'react-native-modal'
import { Colors } from '../Colors/Colors'
import { Custom_Fonts } from "../Constants/Font"

function ConfirmedPopup({ isVisible, onBackdropPress, isConfirm }) {

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onBackdropPress}
        >
            <View style={{ width: '98%', alignSelf: 'center', borderRadius: 12, backgroundColor: 'white', padding: 16 }}>
                <View>
                    <Image source={require("../assets/logoBlue.png")} style={{ height: 160, width: 160, alignSelf: 'center' }} />
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, color: 'black', fontSize: 16, alignSelf: 'center', textAlign: 'center', marginTop: -32 }}>Are you sure you want to unsave?</Text>

                    <View style={{ marginTop: 60, marginBottom: 30, height: 40, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => {
                            isConfirm()
                        }} style={{ backgroundColor: Colors.themeBlue, width: '47%', height: 40, borderRadius: 20, justifyContent: 'center' }}>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, color: 'white', fontSize: 16, alignSelf: 'center' }}>Unsave</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            onBackdropPress()
                        }} style={{ borderColor: Colors.themeBlue, width: '47%', height: 40, borderWidth: 1, borderRadius: 20, justifyContent: 'center' }}>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, color: Colors.themeBlue, fontSize: 16, alignSelf: 'center' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>


        </Modal>
    )
}

export default ConfirmedPopup