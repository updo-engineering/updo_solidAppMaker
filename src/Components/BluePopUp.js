import React from 'react'
import { Text, View } from 'react-native'

import Modal from 'react-native-modal'
import { Custom_Fonts } from '../Constants/Font'
import { Colors } from '../Colors/Colors'

function BluePopUp({ isVisible, onBackdropPress, titleStr, msg }) {

    return (
        <Modal
            isVisible={isVisible}
            msg={msg}
            titleStr={titleStr}
            onBackdropPress={onBackdropPress}
        >
            <View style={{ width: '98%', alignSelf: 'center', borderColor: Colors.themeBlue, borderRadius: 12, backgroundColor: '#F1FBFF', borderWidth: 1, marginVertical: 20, padding: 16 }}>
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: 'black', fontSize: 16 }}>{titleStr}</Text>
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: 'black', fontSize: 13, marginVertical: 12 }}>{msg}</Text>
            </View>


        </Modal>
    )
}

export default BluePopUp