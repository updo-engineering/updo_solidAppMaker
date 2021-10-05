import React,{useState} from "react";
import { Text, StyleSheet, SafeAreaView,TouchableOpacity,Image,TextInput,View } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import HeaderView from "./Header.js/HeaderView";
import OTPInputView from '@twotalltotems/react-native-otp-input'

const VerifyPhoneScreen = () => {
  const [state, setState] = useState({
    code: ""
})
  return (
    <SafeAreaView>
    <HeaderView title = "Confirm your number"/>
    <Text style={styles.descripTextStyle}>Enter the code we sent over SMS to (404) 452-1603: </Text>

    <OTPInputView
                style={{ width: '80%', height: 120,marginLeft:25 }}
                pinCount={4}
                code={state.code}
                onCodeChanged={code => { setState(code) }}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleHighLighted}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code => {
                    console.log(`Code is ${code}, you are good to go!`)
                })}
            />

<View style = {{flexDirection:"row",marginTop:8,height:60}}>
<Text style={styles.descripTextStyle}>Didn’t get an SMS? </Text>
<Text style={styles.boldTextStyle}>Send again</Text>
  </View>

    </SafeAreaView>

  );
}

export default VerifyPhoneScreen


const styles = StyleSheet.create({
  descripTextStyle: {
    fontSize: 16,
    marginLeft:18,
    fontFamily:Custom_Fonts.Montserrat_Regular
  },
    underlineStyleHighLighted: {
        backgroundColor: "#FFFFFF",
        borderRadius: 4,
        borderColor:"black",
        borderWidth:1,
        color: "black",
        width: 60,
        height: 60,
    },
    boldTextStyle: {
      fontSize: 16,
      fontFamily:Custom_Fonts.Montserrat_Bold,
      textDecorationLine:"underline"
    },
});
