import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'

import Modal from 'react-native-modal'
import { Custom_Fonts } from '../Constants/Font'

function RewardWelcomePopup({ isVisible, onBackdropPress }) {

    return (
        <Modal
            isVisible={isVisible}
        //onBackdropPress={onBackdropPress}
        >
            <View style={{
                backgroundColor: 'white', width: "96%", alignSelf: 'center', elevation: 4, borderRadius: 12, marginBottom: 20, shadowColor: "grey",
                shadowOpacity: 0.5,
                shadowOffset: { width: 2, height: 5 }, shadowColor: "grey"
            }} >
                <TouchableOpacity onPress={() => {
                    onBackdropPress()
                }} >
                    <Image style={{ alignSelf: 'flex-end', width: 20, height: 20, resizeMode: 'cover', marginRight: 20, marginTop: 20 }} source={require('../assets/close.png')} />
                </TouchableOpacity>
                <Image style={{ alignSelf: 'center', width: 130, height: 130, resizeMode: 'cover', marginTop: -16 }} source={require('../assets/logoBlue.png')} />
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 16, alignSelf: "center", marginTop: -25 }}>Welcome to TipTop Rewards!</Text>
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 14, alignSelf: "center", marginVertical: 40, marginHorizontal: 25, textAlign: 'center' }}>As a new member of the TipTop Community, you’ve earned two complimentary points!</Text>
            </View>




        </Modal>
    )
}

export default RewardWelcomePopup