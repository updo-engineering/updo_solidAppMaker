import React, { useState } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking, View, TextInput } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from "react-redux";
import { setSocialLinks } from '../Redux/userDetail';
import { validURL } from "../apiSauce/HttpInteractor";

const SocialLinkUpdate = (props) => {
    let socialLinks = useSelector(state => state.userReducer).socialLinks
    let type = props.route.params?.socialType ?? 'Social Link'
    let dispatch = useDispatch()
    const [link, setLink] = useState(props.route.params?.socialLink ?? '')
    return (
        <SafeAreaView>
            <TopHeaderView title="Connect with social media" />
            <Text style={{ color: 'black', marginHorizontal: 20, fontSize: 17, fontFamily: Custom_Fonts.Montserrat_SemiBold }}>{type}</Text>

            <View style={[styles.pickerStyle, { marginHorizontal: 16 }]}>
                <TextInput style={styles.pickerTitleStyle}
                    value={link}
                    onChangeText={(text) =>
                        setLink(text)
                    }
                    placeholder="Enter link" ></TextInput>
            </View>
            <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
              if (validURL(link)){
                if (type == 'Instagram') {
                    socialLinks = {
                        ...socialLinks,
                        insta: link,
                    }
                }
                else if (type == 'Pinterest') {
                    socialLinks = {
                        ...socialLinks,
                        pinterest: link,
                    }
                }
                else if (type == 'Twitter') {
                    socialLinks = {
                        ...socialLinks,
                        twitter: link,
                    }
                }
                else {
                    socialLinks = {
                        ...socialLinks,
                        youtube: link,
                    }
                }
                dispatch(setSocialLinks(socialLinks)) 
                props.navigation.navigate('CreateYourProfile') }
                else{
                    Toast.show('Enter a valid link')
                }
            }} >
                <Text style={styles.btnTitleStyle}>Save</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

export default SocialLinkUpdate


const styles = StyleSheet.create({
    pickerStyle: {
        flexDirection: "row",
        height: 50,
        marginVertical: 28,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 25,
        alignContent: "center",
        alignItems: "center",
    },
    pickerTitleStyle: {
        width: "60%",
        color: "black",
        fontSize: 15,
        fontFamily: Custom_Fonts.Montserrat_Regular,
        marginLeft: 16
    },
    btnViewStyle: {
        width: "90%",
        flexDirection: "row",
        height: 50,
        backgroundColor: Colors.themeBlue,
        marginHorizontal: 18,
        marginVertical: 20,
        borderRadius: 25,
        justifyContent: "center"
    },
    btnTitleStyle: {
        alignSelf: "center",
        color: "white",
        fontSize: 16,
        marginHorizontal: 12,
        fontFamily: Custom_Fonts.Montserrat_SemiBold
    }
});
