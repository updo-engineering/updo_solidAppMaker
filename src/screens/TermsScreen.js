import React,{useEffect,useState} from "react";
import { Text, SafeAreaView,View, ScrollView} from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import TopHeaderView from "./TopHeader/TopHeaderView";
import { getTerms } from "../apiSauce/HttpInteractor";
import Loader from '../Components/loader'

const TermsScreen = ({navigation,route}) => {

  const [termsData, setTermsData] = useState("");
  const [loading, setLoading] = useState(false)

  let isPrivacy = route.params?.isPrivacy ?? false;
  useEffect(() => {
   
    getTerms(isPrivacy).then(response => {
      if (response.ok) {
       
        if (response.data?.status === true) {
          setTermsData(isPrivacy ? response.data?.data.privacy_policy:response.data?.data.term_content)
        }
        else {
          Toast.show(response.data.message)
        }
      } else {
       
        Toast.show(response.problem)
      }
    });


  }, []);
    return (
      <View style={{width: '100%', height: '100%',backgroundColor: 'white'}}>

        <SafeAreaView>
        <TopHeaderView title = {isPrivacy ? 'Privacy Policy' :"Terms and conditions"}/>

        <ScrollView style={{ width: "100%", height: "100%" }}
      horizontal={false}
      scrollEventThrottle={16}
      bounces={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

            <Text style = {{fontFamily:Custom_Fonts.Montserrat_Medium,marginHorizontal:20}}>{termsData}</Text>
        </ScrollView>
       
        </SafeAreaView>
        {loading && <Loader />}
        </View>
    );
  }
  
  export default TermsScreen