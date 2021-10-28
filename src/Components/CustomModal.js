import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

import Modal from 'react-native-modal'
import { Custom_Fonts } from '../Constants/Font'

function CustomModal({ isVisible, onBackdropPress, onPress, onChangeText, value,text }) {

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onBackdropPress}
        >

            <View style={{ backgroundColor: 'white', height: 250, width: '90%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>

                <Text style={{
                    alignSelf: "center",

                    fontSize: 17,
                    fontFamily: Custom_Fonts.Montserrat_SemiBold
                }}>{text}</Text>

                <View style={{ width: '80%', borderRadius: 50, borderWidth: .5, marginTop: 10, paddingLeft: 10 }} >

                    <TextInput
                        placeholder={'Type...'}
                        style={{
                            fontSize: 15,
                            fontFamily: Custom_Fonts.Montserrat_SemiBold
                        }}
                        onChangeText={onChangeText}
                        value={value}
                    />

                

                </View>
                <TouchableOpacity style={{
                        width: "50%",
                        flexDirection: "row",
                        height: 38,
                        backgroundColor: "#F0B752",
                        margin: 25,
                        borderRadius: 19,
                        justifyContent: "center"
                    }} onPress={onPress} >
                        <Text style={{
                            alignSelf: "center",
                            color: "white",
                            fontSize: 15,
                            fontFamily: Custom_Fonts.Montserrat_SemiBold
                        }}>Add</Text>
                    </TouchableOpacity>

            </View>


        </Modal>
    )
}

export default CustomModal