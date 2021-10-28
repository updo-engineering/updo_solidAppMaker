import React, { useState } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity, ImageBackground, FlatList } from "react-native";
import { Custom_Fonts } from "../../Constants/Font";
import { Colors } from "../../Colors/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import SignInForDetailScreen from '../BeforeRegisterScreens/SignInForDetailScreen'
import { getUpdos,completeAppointment,generatePaymentIntent } from "../../apiSauce/HttpInteractor";
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";
import { Constants } from "../../Constants/Constants";
import Loader from '../../Components/loader';
import { setAppointmentData} from "../../Redux/userDetail";
import { useStripe } from '@stripe/stripe-react-native';


const UpdosTabScreen = ({ navigation }) => {
    const auth = useSelector(state => state.userReducer.auth)
    const token = useSelector(state => state.userReducer.token)
    const user = useSelector(state => state.userReducer.user)
    let appointmentData = useSelector(state => state.userReducer).appointmentData
    let D = [{
        id: 1,
        title: 'Upcoming'
    },
    {
        id: 0,
        title: 'Requested'
    },
    {
        id: 3,
        title: 'Past'
    },
    {
        id: 2,
        title: 'Cancelled'
    }]
    const [DATA, setDATA] = useState(D);
    const [selection, setSelection] = useState(DATA[1]);
    const [updosData, setUpdosData] = useState([]);
    const [sortData, setSortData] = useState([]);
    const [loading, setLoading] = useState(false);
    let dispatch = useDispatch()
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            getUpdo()

            return () => {
                //unfocused
            };
        }, [])
    );

    const getUpdo = () =>{
        getUpdos(user.userType, token).then(response => {
            if (response.ok) {
                setLoading(false);
                if (response.data?.status === true) {
                    setUpdosData(response.data.data)
                    let data = response.data.data.filter((data) => data.status == 0)
                    let data2 = response.data.data.filter((data) => data.status == 3 && data.payment_status == 0)
                    if (user.userType == 'Customer' && data2.length > 0)
                    {
                        const newArray = [{id: 4,title: 'Action Needed'}].concat(D)
                        setDATA(newArray)
                        setSelection({
                            id: 4,
                            title: 'Action Needed'
                        })
                        setSortData(data2)
                    }
                    else if ((data.length) > 0) {
                        setDATA(D)
                        setSelection({
                            id: 0,
                            title: 'Requested'
                        })
                        setSortData(data)
                    }
                    else {
                        let a = D.filter((data) => data.id != 0)
                        setDATA(a)
                        setSelection({
                            id: 1,
                            title: 'Upcoming'
                        })
                        setSortData(response.data.data.filter((data) => data.status == 1))
                    }
                }
                else {
                    setLoading(false);
                    setUpdosData([])
                    setSortData([])
                    let a = D.filter((data) => data.id != 0)
                    setDATA(addEventListener)
                    setSelection({
                        id: 1,
                        title: 'Upcoming'
                    })
                    Toast.show(response.data.message)
                }
            } else {
                setLoading(false);
                setUpdosData([])
                setSortData([])
                let a = D.filter((data) => data.id != 0)
                setDATA(a)
                setSelection({
                    id: 1,
                    title: 'Upcoming'
                })
                Toast.show(response.problem)
            }
        });
    }

    const initializePaymentSheet = async (paymentIntent,ephemeralKey) => {
        const { error } = await initPaymentSheet({
            customerId: user._id,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
        });
        if (!error) {
            setLoading(false)
            let x= await openPaymentSheet(paymentIntent)
          
        } else {
            console.log("initializePaymentSheet => ", error)
            setLoading(false)
        }
    };

    const openPaymentSheet = async (paymentIntent) => {
        try{
        console.log(paymentIntent,'intent')
        const { error } = await presentPaymentSheet({ clientSecret: paymentIntent })
       
        if (error) {
            setLoading(false)
            console.log(`openPaymentSheet Error code: ${error.code}`, error.message);
        } else {
           console.log(paymentIntent)
           // props.navigation.navigate("HomeScreen")
        }
    }
    catch(err){
        console.log(err)
    }
    };


    const Item = ({ item }) => {
        if (selection.id == 0) {
            return (
                <View style={{ backgroundColor: "white", borderRadius: 16, margin: 15, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, shadowOffset: { width: 0, height: 1 } }}>
                    <View style={{ flexDirection: "row", padding: 16 }}>
                        <Image style={{ width: 90, height: 90, resizeMode: 'cover', borderRadius: 45 }} source={user.userType == 'Customer' ? { uri: Constants.IMG_BASE_URL + item.provider_id.profile_pic } : { uri: Constants.IMG_BASE_URL + item.customer_id.profile_pic }} />
                        <View>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 17, marginLeft: 16, marginTop: 12 }}>{user.userType == 'Customer' ? item.provider_id.name : item.customer_id.name}</Text>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 14, marginLeft: 16, marginTop: 8 }}>{moment.unix(item.appoint_start).format("MMMM DD, h:mm a")}</Text>
                        </View>
                    </View>
                    {user.userType == 'Customer' ? null :
                        <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: '#F0B752', width: '90%', alignSelf: "center", marginVertical: 20 }]} onPress={() => {
                            appointmentData = {
                                ...appointmentData,
                                id: item._id,
                                customer_id: item.customer_id._id,
                                customerName: item.customer_id.name,
                                customerImg: item.customer_id.profile_pic,
                                time: item.appoint_start,
                                location: item.customer_id.name
                            }
                            dispatch(setAppointmentData(appointmentData))
                            navigation.navigate('UpdoBuildStep1')
                        }} >
                            <Text style={[styles.btnTitleStyle, { color: "white", fontFamily: Custom_Fonts.Montserrat_SemiBold }]}>{item.is_proposed == 0 ? 'Send Proposal' : 'Edit Proposal'}</Text>
                        </TouchableOpacity>}
                </View>
            );
        }
        else if(selection.id == 4){
            return(
                <View style={{ backgroundColor: "white", borderRadius: 16, margin: 15, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, shadowOffset: { width: 0, height: 1 } }}>
                <View style={{ flexDirection: "row", padding: 16 }}>
                    <Image style={{ width: 90, height: 90, resizeMode: 'cover', borderRadius: 45 }} source={user.userType == 'Customer' ? { uri: Constants.IMG_BASE_URL + item.provider_id.profile_pic } : { uri: Constants.IMG_BASE_URL + item.customer_id.profile_pic }} />
                    <View>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 17, marginLeft: 16, marginTop: 4 }}>{user.userType == 'Customer' ? item.provider_id.name : item.customer_id.name}</Text>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 14, marginLeft: 16, marginTop: 4 }}>{moment.unix(item.appoint_start).format("MMMM DD, h:mm a")}</Text>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 13, marginLeft: 16, marginTop: 4,color:"#4D4D4D" }}>Total: ${item.proposal_id.total}</Text>

                    </View>
                </View>
                <View style={{ flexDirection:'row',alignSelf: "center"}}>
                    <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: Colors.blueText, width: '80%', alignSelf: "center", marginVertical: 20 }]} onPress={() => {
                          generatePaymentIntent(token,item._id).then(response => {
                            if (response.ok) {
                              if (response.data?.status === true) {
                                initializePaymentSheet(response.data.data.client_secret,response.data.data.emp_key)
                              }
                              else {
                                Toast.show(response.data.message)
                              }
                            } else {
                              Toast.show(response.problem)
                            }
                          });
                    }} >
                        <Text style={[styles.btnTitleStyle, { color: "white", fontFamily: Custom_Fonts.Montserrat_SemiBold }]}>Complete Payment</Text>
                    </TouchableOpacity>
                    </View>
            </View>
            )
        }
        else if (selection.id == 1) {
            { return(
                user.userType == 'Customer' ? <View style={{ backgroundColor: "white", borderRadius: 16, height: 340, margin: 16, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, shadowOffset: { width: 0, height: 1 } }}>
                    <ImageBackground style={{ height: 180, resizeMode: "stretch" }} source={user.userType == 'Customer' ? { uri: Constants.IMG_BASE_URL + item.provider_id.profile_pic } : { uri: Constants.IMG_BASE_URL + item.customer_id.profile_pic }}>
                        <View style={styles.ratingViewStyle} onPress={() => {
                            //     navigation.navigate('HomeTabScreen')
                        }} >
                            <Text style={[styles.btnTitleStyle, { color: "white" }]}>{selection.title}</Text>
                        </View>
                    </ImageBackground>
                    <Text style={{ marginLeft: 16, marginTop: 20, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 22 }}>{moment.unix(item.appoint_start).format("MMMM DD, h:mm a")}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, marginLeft: 16, marginTop: 12 }}>{item.proposal_id.services_data[0].sub_services[0].service_name}</Text>
                        {item?.proposal_id.services_data.length > 1 ? <View style={{ backgroundColor: "#F0B752", marginLeft: 16, borderRadius: 12, height: 24, marginTop: 12, alignContent: "center", justifyContent: "center" }}><Text style={{ marginHorizontal: 8 }}>+{item.proposal_id.services_data.length - 1}</Text></View>
                            : null}
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, marginLeft: 8, marginTop: 12 }}>with {user.userType == 'Customer' ? item?.customer_id.name : item?.provider_id.name}</Text>
                        <Image style={{ width: 24, height: 24, resizeMode: "contain", position: "absolute", end: 12, alignSelf: "center" }} source={require("../../assets/rightArrow.png")} />
                    </View>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15, marginLeft: 16, marginTop: 12 }}>$ {item?.proposal_id.total} due at time of service</Text>

                </View> : <View style={{ backgroundColor: "white", borderRadius: 16, margin: 15, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, shadowOffset: { width: 0, height: 1 } }}>
                <View style={{ flexDirection: "row", padding: 16 }}>
                    <Image style={{ width: 90, height: 90, resizeMode: 'cover', borderRadius: 45 }} source={user.userType == 'Customer' ? { uri: Constants.IMG_BASE_URL + item.provider_id.profile_pic } : { uri: Constants.IMG_BASE_URL + item.customer_id.profile_pic }} />
                    <View>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 17, marginLeft: 16, marginTop: 4 }}>{user.userType == 'Customer' ? item.provider_id.name : item.customer_id.name}</Text>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 14, marginLeft: 16, marginTop: 4 }}>{moment.unix(item.appoint_start).format("MMMM DD, h:mm a")}</Text>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 13, marginLeft: 16, marginTop: 4,color:"#4D4D4D" }}>Total: ${item.proposal_id.total}</Text>

                    </View>
                </View>
                <View style={{ flexDirection:'row',alignSelf: "center"}}>
                    <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: Colors.blueText, width: '30%', alignSelf: "center", marginVertical: 20 }]} onPress={() => {
                       completeAppointment(token,item._id).then(response => {
                        if (response.ok) {
                          if (response.data?.status === true) {
                            Toast.show(response.data.message)
                            getUpdo()
                          }
                          else {
                            Toast.show(response.data.message)
                          }
                        } else {
                          Toast.show(response.problem)
                        }
                      });
                    }} >
                        <Text style={[styles.btnTitleStyle, { color: "white", fontFamily: Custom_Fonts.Montserrat_SemiBold }]}>Complete</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btnViewStyle, { borderColor: Colors.themeBlue, borderWidth: 1,width: '30%', alignSelf: "center", marginVertical: 20 }]} onPress={() => {
                       
                    }} >
                        <Text style={[styles.btnTitleStyle, { color: Colors.themeBlue, fontFamily: Custom_Fonts.Montserrat_SemiBold }]}>Details</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btnViewStyle, { borderColor: Colors.themeBlue, borderWidth: 1, width: '30%', alignSelf: "center", marginVertical: 20 }]} onPress={() => {
                       
                    }} >
                        <Text style={[styles.btnTitleStyle, { color: Colors.themeBlue, fontFamily: Custom_Fonts.Montserrat_SemiBold }]}>Edit</Text>
                    </TouchableOpacity>
                    </View>
            </View>)
            }
        }
        else {
            return (
                <View style={{ backgroundColor: "white", borderRadius: 16, height: 340, margin: 16, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, shadowOffset: { width: 0, height: 1 } }}>
                    <ImageBackground style={{ height: 180, resizeMode: "stretch" }} source={user.userType == 'Customer' ? { uri: Constants.IMG_BASE_URL + item.provider_id.profile_pic } : { uri: Constants.IMG_BASE_URL + item.customer_id.profile_pic }}>
                        <View style={styles.ratingViewStyle} onPress={() => {
                            //     navigation.navigate('HomeTabScreen')
                        }} >
                            <Text style={[styles.btnTitleStyle, { color: "white" }]}>{selection.title}</Text>
                        </View>
                    </ImageBackground>
                    <Text style={{ marginLeft: 16, marginTop: 20, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 22 }}>{moment.unix(item.appoint_start).format("MMMM DD, h:mm a")}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, marginLeft: 16, marginTop: 12 }}>{item.proposal_id.services_data[0].sub_services[0].service_name}</Text>
                        {item?.proposal_id.services_data.length > 1 ? <View style={{ backgroundColor: "#F0B752", marginLeft: 16, borderRadius: 12, height: 24, marginTop: 12, alignContent: "center", justifyContent: "center" }}><Text style={{ marginHorizontal: 8 }}>+{item.proposal_id.services_data.length - 1}</Text></View>
                            : null}
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, marginLeft: 8, marginTop: 12 }}>with {user.userType == 'Customer' ? item?.customer_id.name : item?.provider_id.name}</Text>
                        <Image style={{ width: 24, height: 24, resizeMode: "contain", position: "absolute", end: 12, alignSelf: "center" }} source={require("../../assets/rightArrow.png")} />
                    </View>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15, marginLeft: 16, marginTop: 12 }}>$ {item?.proposal_id.total} due at time of service</Text>

                </View>
            )
        }
    };

    const headerItem = ({ item }) => (
        <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: selection.id == item.id ? Colors.themeBlue : "white" }]} onPress={() => {
            setSelection(item)
            if (item.id == 4){
                setSortData(updosData.filter((data) =>  data.status == 3 && data.payment_status == 0))
            }
            else if ( item.id == 3){
                setSortData(updosData.filter((data) =>  data.status == 3 && data.payment_status == 1))
            }
            else{
                setSortData(updosData.filter((data) => data.status == item.id))
            }
            
        }} >
            <Text style={[styles.btnTitleStyle, { color: selection.id == item.id ? "white" : "black", fontFamily: selection.id == item.id ? Custom_Fonts.Montserrat_SemiBold : Custom_Fonts.Montserrat_Regular }]}>{item.title}</Text>
        </TouchableOpacity>
    );
    return (
        auth ?
            <View style={{ backgroundColor: "white", height: "100%" }}>
                <SafeAreaView>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ margin: 20, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 24 }}>Updos</Text>
                        <Image style={{ width: 28, height: 28, resizeMode: "contain", marginEnd: 20 }} source={require("../../assets/calendarIcon.png")}></Image>
                    </View>

                    <FlatList
                        style={{ marginBottom: 8, marginHorizontal: 4 }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={DATA}
                        renderItem={headerItem}
                        keyExtractor={item => item.id}
                    />

                    <FlatList
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        data={sortData}
                        renderItem={Item}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
                {loading && <Loader />}
            </View>
            : < SignInForDetailScreen title="Updos" descrip="Sign in and start using updo services. Save your time and updo!" />

    )
}


export default UpdosTabScreen



const CompleteItem = ({ item }) => (
    <View style={{ backgroundColor: "white", borderRadius: 16, height: 190, margin: 16, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, shadowOffset: { width: 0, height: 1 } }}>
        <View style={{ flexDirection: "row" }}>

            <Image style={{ resizeMode: "stretch", width: 90, height: 90, borderRadius: 45, marginHorizontal: 12, marginVertical: 4 }} source={require("../../assets/dummy.png")}></Image>
            <View>
                <Text style={{ marginLeft: 16, marginTop: 20, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 17 }}>Juliana Baker</Text>
                <Text style={{ marginLeft: 16, marginTop: 4, fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 14 }}>July 8 at 4:00pm</Text>
                <Text style={{ marginLeft: 16, marginTop: 4, fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 14 }}>Total: $145.75</Text>
            </View>
        </View>
        <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: Colors.blueText, marginTop: 30 }]} onPress={() => {
         
        }} >
            <Text style={[styles.btnTitleStyle, { color: "white", fontFamily: Custom_Fonts.Montserrat_SemiBold }]}>Complete Payment</Text>
        </TouchableOpacity>

    </View>
);

const styles = StyleSheet.create({
    btnViewStyle: {
        height: 36,
        marginVertical: 12,
        marginHorizontal: 4,
        borderRadius: 25,
        justifyContent: "center"
    }
    ,
    btnTitleStyle: {
        alignSelf: "center",
        marginHorizontal: 12,
        fontSize: 15
    },
    ratingViewStyle: {
        width: "35%",
        height: 32,
        backgroundColor: Colors.themeBlue,
        marginLeft: 12,
        borderRadius: 25,
        marginTop: 16,
        justifyContent: "center"
    }
});