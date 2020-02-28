import React from "react";
import{View, Text, StyleSheet} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import* as firebase from 'firebase'

export default class LoginScreen extends React.Component {
    state = {
        Email: "",
        Password: "",
        errorMessage: null
    };
    handleLogin = () => {
        const {Email, Password} = this.state;

        firebase
            .auth()
            .signInWithEmailAndPassword(Email, Password)
            .catch(error => this.setState({errorMessage: error.message}));
    };

    render(){
        return(
            <View style = {styles.container}> 
                <Text style={styles.greeting}>{'Hello Friend.'}</Text>

                <View style={styles.errorMessage}>
                     {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>  
                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput style={styles.input} 
                                   autoCapitalize= "none"
                                   onChangeText={Email => this.setState({Email})} 
                                   value={this.state.Email}>
                        </TextInput>
                    </View>
                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput style={styles.input} 
                                   secureTextEntry 
                                   autoCapitalize= "none"
                                   onChangeText={Password => this.setState({Password})} 
                                   value={this.state.Password}>
                        </TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={{color: "#FFF", fontWeight: "500"}}>Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                            style={{alignSelf: "center", marginTop: 32}} 
                            onPress={() =>  this.props.navigation.navigate("Register")}>

                    <Text style={{color: "#414959", fontSize: 13}}>
                        New to Personall Assistant App? <Text style={{fontWeight: "500", color: "#E9446A"}}>Sign up</Text>
                    </Text>
                </TouchableOpacity>
            </View>

        
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1   
    },
    greeting:{
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMessage:{
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error:{
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    form:{
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle:{
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input:{
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button:{
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    }
});

