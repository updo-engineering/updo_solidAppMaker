import React, { useState,useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking, View, TextInput } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from "react-redux";
import { setSocialLinks } from '../Redux/userDetail';
import { validURL } from "../apiSauce/HttpInteractor";
import _ from 'lodash'

const SocialLinkUpdate = (props) => {
    let type = props.route.params?.socialType ?? 'Social Link'
    let socialLink = props.route.params?.socialLink ?? []
    let dispatch = useDispatch()
    const [link, setLink] = useState('')
    useEffect(() => {
        for (let index = 0; index < socialLink.length; index++) {
            const element = socialLink[index];
            if (element.media_type == type){
                setLink(element.link)
            }   
        }
      }, [socialLink])
 

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
               let dataC=_.cloneDeep(props.route.params?.socialLink)
              if (validURL(link)){
                if (type == 'Instagram') {
                    for (let index = 0; index < dataC.length; index++) {
                        const element = dataC[index];
                        if( element.media_type == 'Instagram'){
                            dataC[index].link = link
                        }
                    }
                }
                else if (type == 'Facebook') {
                    for (let index = 0; index < dataC.length; index++) {
                        const element = dataC[index];
                        if( element.media_type == 'Facebook'){
                            dataC[index].link = link
                        }
                    }
                }
                else if (type == 'Twitter') {
                    for (let index = 0; index < dataC.length; index++) {
                        const element = dataC[index];
                        if( element.media_type == 'Twitter'){
                            dataC[index].link = link
                        }
                    }
              }
                else {
                   for (let index = 0; index < dataC.length; index++) {
                        const element = dataC[index];
                        if( element.media_type == 'TikTok'){
                            dataC[index].link = link
                        }
                    }
                }
                dispatch(setSocialLinks(dataC)) 
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
