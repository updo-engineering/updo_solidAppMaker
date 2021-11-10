import React, { useEffect, useState } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions } from "react-native";
import { Custom_Fonts } from "../../Constants/Font";
import { Colors } from "../../Colors/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get('window');
import SignInForDetailScreen from '../BeforeRegisterScreens/SignInForDetailScreen'
import { useSelector } from "react-redux"
import firestore from '@react-native-firebase/firestore';

const InboxTabScreen = ({ navigation }) => {
    const auth = useSelector(state => state.userReducer.auth)
    const user = useSelector(state => state.userReducer.user)
    const [chats, setChats] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const usersCollection = firestore().collection('Users').doc(user._id).collection('Chats');
    useEffect(() => {
        usersCollection
            .onSnapshot((snapshot) => {
                setChats(snapshot._docs)
                setFilteredList(snapshot._docs)
                console.log(snapshot._docs)
            }, (error) => {
                console.log(error)
            });
    }, [user._id]);

    

    const Item = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('MessageScreen', { key: item._data.key, chatHeader: item._data.to, toID: item._data.toUid })} style={{ width: '92%', flexDirection: "row", backgroundColor: "white", borderRadius: 16, height: 72, marginHorizontal: 16,marginVertical:8, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, shadowOffset: { width: 0, height: 1 } }}>
           {
               item._data.toUid == 'Admin' ?  <Image style={{ resizeMode: "cover", width: 44, height: 44, borderRadius: 22, marginHorizontal: 12, marginVertical: 12, marginVertical: 14 }} source={require("../../assets/logoImg.png")}/>
:            <Image style={{ resizeMode: "cover", width: 44, height: 44, borderRadius: 22, marginHorizontal: 12, marginVertical: 12, marginVertical: 14 }} source={item._data.toProfileImg == '' ? require("../../assets/dummy.png") : { uri: item._data.toProfileImg }}/>

           }
            <View style={{ justifyContent: "center" }}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15 }}>{item._data.to}</Text>
                </View>
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 13 }}>{item._data.lastMsg}</Text>
            </View>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 13, position: 'absolute', end: 16, top: 12 }}>{item._data.date}</Text>
        </TouchableOpacity>
    );

    return (
        auth ?
            <SafeAreaView>
                <View style={{ backgroundColor: "white", height }}>
                    <Text style={{ margin: 20, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 24 }}>Inbox</Text>

                    <View style={{ flexDirection: "row", marginHorizontal: 16, marginTop: 16 }}>
                        <Image style={{ resizeMode: "center" }} source={require("../../assets/searchBtn.png")} />
                        <TextInput style={styles.pickerTitleStyle} placeholder="Search messages..." onChangeText={(t) => {
                            if (t == '') {
                                setFilteredList(chats)
                            }
                            else {
                                setFilteredList(chats.filter((data) => data._data.to.toLowerCase().includes(t.toLowerCase())))
                            }
                        }}></TextInput>
                    </View>
                    <View style={{ height: 2, backgroundColor: "grey", marginHorizontal: 16 }} />
                    <FlatList
                        style={{ marginBottom: 100, marginTop: 20 }}
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        data={filteredList}
                        renderItem={Item}
                        keyExtractor={item => item.id}
                    />
                </View>
            </SafeAreaView> : < SignInForDetailScreen title="Inbox" descrip="Sign in to check your messages. You’ll be able to contact Updoers directly with our chat function." />
    )
}

export default InboxTabScreen


const styles = StyleSheet.create({
    pickerTitleStyle: {
        color: "black",
        fontSize: 15,
        fontFamily: Custom_Fonts.Montserrat_Regular,
        marginLeft: 8
    }

});

