import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Modal, Image, Alert, TouchableHighlight} from 'react-native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
// import { require } from 'yargs';

import Modalcom from  '../Post/Modal'
class Post extends Component{

    constructor(props){
        super(props)
        this.state={
            hasPermission: null,
            cameraType: Camera.Constants.Type.back,
            image: '',
            url: '',
            modalVisible: false,
            next: false
        }
    }
    async componentDidMount() {
        this.getPermissionAsync()
    }

    nextFun =()=>{
      if(this.state.image.length != 0){
        this.setState({next: true})
      }
    }
    cansel = () =>{
      this.setState({next: false})
    }

    chnageRoute =() => {
      this.props.navigation.navigate('Home')
      this.cansel()
    }
    

    getPermissionAsync = async () => {
        // Camera roll Permission 
        if (Platform.OS === 'ios') {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
        // Camera Permission
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });
      }
    
      handleCameraType=()=>{
        const { cameraType } = this.state
    
        this.setState({cameraType:
          cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
        })
      }
    
      takePicture = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync().then(res =>{
            this.setState({image: res.uri})
          })
        }
      }
    
      pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images
        }).then(res =>{
          this.setState({image: res.uri})
    
        })

      }



    
    render(){

        const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        
          <View style={styles.container}>
           
            <View>
                <View style={styles.header}>
                <TouchableOpacity style={styles.canselBtn} onPress={this.cansel}>
                  <Text style={styles.canselText}>Cansel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextBtn} onPress={this.nextFun}>
                  <Text style={styles.nextText}>Next</Text>
                </TouchableOpacity>
                </View>
            </View>
            {this.state.next ? <Modalcom  uri={this.state.image} chnageRoute={this.chnageRoute}/> : 
              <Camera style={{ flex: 1 }} type={this.state.cameraType}  ref={ref => {this.camera = ref}} autoFocus="on">
                <View style={{flex:1, flexDirection:"column",margin:20}}>
                  <View style={{flex:6, flexDirection:"row", justifyContent:"center"}} >
                  <TouchableOpacity  style={styles.camera} onPress={()=>this.takePicture()} >
                      <Ionicons name="ios-camera" size={50} color="white" />
                    </TouchableOpacity>
                  </View>
                    <View style={{flex:1, flexDirection:"row",justifyContent:"space-between"}}>  
                      <TouchableOpacity style={styles.btn} onPress={()=>this.pickImage()}>
                        <Ionicons name="ios-photos" size={30} color="white" />
                      </TouchableOpacity>

                      { this.state.image.length != 0?
                      <TouchableOpacity style={styles.takenImg}>
                        <Image source={{uri: `${this.state.image}`}}  style={{ width: 50, height: 45 }} />
                      </TouchableOpacity>: <></>
                      }
                      <TouchableOpacity style={styles.btn} onPress={()=>this.handleCameraType()}>
                        <Ionicons name="ios-reverse-camera" size={35} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Camera>
              }
      </View>
      );
    }
    }
}

const styles =  StyleSheet.create({
  container:{
      flex: 1,
      marginTop: Constants.statusBarHeight,
  },
  header:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    backgroundColor: '#e0e0e0'
  },
  canselBtn:{
    padding: 10,
    borderRadius: 10
  },
  nextBtn:{
    padding: 10,
    borderRadius: 10
  },
  canselText:{
    fontSize: 18,
    fontWeight: '600'
  },
  nextText:{
    fontSize: 18,
    fontWeight: '600'
  
  },
  camera:{
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent' 
  },
  takenImg:{
    backgroundColor: 'red',
    height: 50,
    width: 40,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  btn:{
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent' 
  }

})

export default Post;