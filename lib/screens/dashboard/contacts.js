import React from 'react';
import FAB from 'react-native-fab';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ToastAndroid,
  Linking,
  ScrollView,
} from 'react-native';
import {Dialog} from 'react-native-simple-dialogs';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './contacts.styles';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Contacts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      kontak: [],
      // nextKey: 0,
      modalVisible: false,
      dialogVisible: false,
      namaAdd: '',
      nomorAdd: '',
      emailAdd: '',
      alamatAdd: '',
      currentKontak: {},
    };

    this.fetchKontak = this.fetchKontak.bind(this);
    this.addButtonHandler = this.addButtonHandler.bind(this);
    this.deleteKontak = this.deleteKontak.bind(this);
    this.navigation = this.props.navigation;
    // this.navigation.setOptions({
    //   headerRight: () => (
    //     <Icon.Button
    //       name="settings-outline"
    //       backgroundColor="white"
    //       color="darkblue"
    //       onPress={() => this.navigation.navigate('Profile')}
    //     />
    //   ),
    // });

    this.fetchKontak();
  }

  static navigationOptions = {
    headerRight: () => ({
      right: (
        <Icon.Button
          name="settings-outline"
          backgroundColor="white"
          color="darkblue"
          onPress={() => this.navigation.navigate('Profile')}
        />
      ),
    }),
  };

  componentDidUpdate() {
    if (this.canUpdate) this.fetchKontak();
  }
  // componentDidMount() {
  //   if (this.canUpdate) this.fetchKontak();
  // }
  // componentWillUnmount(){
  //   if (this.canUpdate) this.fetchKontak();
  // }

  async fetchKontak() {
    this.canUpdate = false;
    try {
      const kontakValue = await AsyncStorage.getItem('@kontaque_kontak');
      // const nextKeyValue = await AsyncStorage.getItem('@kontaque_key');
      let newKontak;
      if (kontakValue != null) newKontak = JSON.parse(kontakValue);
      else newKontak = [];
      newKontak.sort((a, b) => {
        if (a.nama.toLowerCase() < b.nama.toLowerCase()) return -1;
        else if (a.nama.toLowerCase() > b.nama.toLowerCase()) return 1;
        return 0;
      });
      console.log('GOT KONTAK');
      console.log(newKontak);
      // console.log('GOT KEY');
      // console.log(nextKeyValue);
      this.setState({
        kontak: newKontak,
        // nextKey: nextKeyValue != null ? parseInt(nextKeyValue) : 0,
      });
    } catch (e) {
      ToastAndroid.show(
        'Gagal mengambil data kontak',
        ToastAndroid.SHORT,
      );
    } finally {
      this.canUpdate = true;
    }
  }

  async pushKontak() {
    this.canUpdate = false;
    try {
      const kontakValue = JSON.stringify(this.state.kontak);
      console.log('Kontak to push');
      console.log(this.state.kontak);
      // console.log('Key to push');
      // console.log(this.state.nextKey);

      await AsyncStorage.setItem('@kontaque_kontak', kontakValue);
      // await AsyncStorage.setItem(
      //   '@kontaque_key',
      //   this.state.nextKey.toString(),
      // );
    } catch (e) {
      ToastAndroid.show(
        'Gagal meng-update kontak',
        ToastAndroid.SHORT,
      );
    } finally {
      this.setState({
        nama: '',
        nomor: '',
        email: '',
        alamat: '',
        modalVisible: false,
        dialogVisible: false,
      });
      this.canUpdate = true;
    }
  }

  buttonHandler(kontakPilihan) {
    this.navigation.navigate('Detail', {
      nama: kontakPilihan.nama,
      nomor: kontakPilihan.nomor,
      email: kontakPilihan.email,
      alamat: kontakPilihan.alamat,
      key: kontakPilihan.key,
      color: kontakPilihan.color,
    });
  }

  buttonLongPressHandler(kontakPilihan) {
    this.setState({
      dialogVisible: true,
      currentKontak: kontakPilihan,
    });
  }

  dialogContents() {
    const nomorButtons = () => {
      if (this.state.currentKontak.nomor)
        return (
          <View>
            <TouchableOpacity
              style={styles.dialogContent}
              onPress={async () => {
                await Linking.openURL('tel:' + this.state.currentKontak.nomor);
              }}>
              <Text>Telepon</Text>
              <Text>{this.state.currentKontak.nomor}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dialogContent}
              onPress={async () => {
                await Linking.openURL('sms:' + this.state.currentKontak.nomor);
              }}>
              <Text>SMS ke</Text>
              <Text>{this.state.currentKontak.nomor}</Text>
            </TouchableOpacity>
          </View>
        );
    };

    const emailButton = () => {
      if (this.state.currentKontak.email)
        return (
          <View>
            <TouchableOpacity
              style={styles.dialogContent}
              onPress={async () => {
                await Linking.openURL(
                  'mailto:' + this.state.currentKontak.email,
                );
              }}>
              <Text>Email ke</Text>
              <Text>{this.state.currentKontak.email}</Text>
            </TouchableOpacity>
          </View>
        );
    };
    return (
      <View>
        {nomorButtons()}
        {emailButton()}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={this.deleteKontak}
            style={styles.dialogButton}>
            <Text style={{color: 'red'}}>HAPUS</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  deleteKontak() {
    let newKontak = Array.from(this.state.kontak);
    const indexToDelete = newKontak.findIndex(
      (element) => element.key == this.state.currentKontak.key,
    );
    newKontak.splice(indexToDelete, 1);
    this.setState(
      {
        kontak: newKontak,
      },
      this.pushKontak,
    );
  }

  getRandomColor() {
    const colors = [
      'black',
      'blue',
      'blueviolet',
      'brown',
      'coral',
      'chocolate',
      'cornflowerblue',
      'darkblue',
      'darkcyan',
      'darkgreen',
      'darkmagenta',
      'darkred',
      'darkslateblue',
      'dodgerblue',
      'green',
      'magenta',
      'maroon',
      'navy',
      'orchid',
      'purple',
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  }

  makeid(length) {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async addButtonHandler() {
    if (this.state.namaAdd == '') {
      Alert.alert('Nama Kosong', 'Mohon isi form nama', [
        {
          text: 'OK',
        },
      ]);
    } else if (
      this.state.nomorAdd == '' &&
      this.state.emailAdd == '' &&
      this.state.alamatAdd == ''
    ) {
      Alert.alert('Data Tidak Lengkap', 'Mohon isi form kontak', [
        {
          text: 'OK',
        },
      ]);
    } else {
      const newKontak = [
        ...this.state.kontak,
        {
          nama: this.state.namaAdd,
          nomor: this.state.nomorAdd,
          email: this.state.emailAdd,
          alamat: this.state.alamatAdd,
          color: this.getRandomColor(),
          key: this.makeid(10),
          // key: this.state.nextKey.toString(),
        },
      ];
      this.setState(
        {
          kontak: Array.from(newKontak),
          // nextKey: this.state.nextKey + 1,
        },
        this.pushKontak,
      );
    }
  }

  kontakItem({item}) {
    const subtitle = () => {
      if (item.nomor)
        return <Text style={styles.kontakItemSubtitle}>{item.nomor}</Text>;
      else if (item.email)
        return <Text style={styles.kontakItemSubtitle}>{item.email}</Text>;
      else return <Text style={styles.kontakItemSubtitle}>{item.alamat}</Text>;
    };
    return (
      <TouchableOpacity
        style={styles.kontakItem}
        key={item.key}
        onPress={() => this.buttonHandler(item)}
        onLongPress={() => this.buttonLongPressHandler(item)}>
        <View
          style={styles.circleAvatar}
          backgroundColor={item.color ?? 'darkblue'}>
          <Text style={styles.avatarText}>{item.nama.charAt(0)}</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.kontakItemTitle}>{item.nama}</Text>
          {subtitle()}
        </View>
      </TouchableOpacity>
    );
  }

  mainComponent() {
    if (this.state.kontak.length == 0)
      return (
        <View style={styles.center}>
          <Text style={styles.centerText}>Kontak anda masih kosong</Text>
        </View>
      );
    else
      return (
        <View style={styles.listContainer}>
          <FlatList
            data={this.state.kontak}
            renderItem={(item) => this.kontakItem(item)}
          />
        </View>
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>KONTAQ</Text>
          <View style={styles.headerButton}>
            <Icon.Button
              name="settings-outline"
              color="white"
              backgroundColor="darkblue"
              size={24}
              style={{padding: 0}}
              onPress={() => this.navigation.navigate('Profile')}
            />
          </View>
        </View>
        <Dialog
          visible={this.state.dialogVisible}
          title={this.state.currentKontak.nama}
          onTouchOutside={() => this.setState({dialogVisible: false})}
          dialogStyle={{width: '80%', alignSelf: 'center'}}>
          {this.dialogContents()}
        </Dialog>
        <Modal
          animationType="slide"
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({modalVisible: false})}>
          <View style={styles.modalSheetBackground}>
            <TouchableWithoutFeedback
              onPress={() => this.setState({modalVisible: false})}>
              <View style={styles.modalDismisser}></View>
            </TouchableWithoutFeedback>
            <ScrollView style={styles.modalSheet}>
              <View style={styles.modalTitle}>
                <Text style={styles.modalTitleText}>Kontak Baru</Text>
              </View>
              <View style={styles.modalContent}>
                <Text style={styles.modalHintText}>Nama Lengkap</Text>
                <TextInput
                  style={styles.modalTextInput}
                  placeholder="co. Rizal Fauzi"
                  blurOnSubmit={false}
                  onSubmitEditing={() => this.inputNomor.focus()}
                  onChangeText={(name) => this.setState({namaAdd: name})}
                  autoCompleteType="name"
                />
                <Text style={styles.modalHintText}>Nomor Telepon</Text>
                <TextInput
                  style={styles.modalTextInput}
                  placeholder="co. 08123456789"
                  blurOnSubmit={false}
                  ref={(input) => (this.inputNomor = input)}
                  onSubmitEditing={() => this.inputEmail.focus()}
                  onChangeText={(phone) => this.setState({nomorAdd: phone})}
                  autoCompleteType="tel"
                  keyboardType="phone-pad"
                />
                <Text style={styles.modalHintText}>Alamat Email</Text>
                <TextInput
                  style={styles.modalTextInput}
                  placeholder="co. email@example.com"
                  blurOnSubmit={false}
                  ref={(input) => (this.inputEmail = input)}
                  onSubmitEditing={() => this.inputAlamat.focus()}
                  onChangeText={(email) => this.setState({emailAdd: email})}
                  autoCompleteType="email"
                  keyboardType="email-address"
                />
                <Text style={styles.modalHintText}>Alamat</Text>
                <TextInput
                  style={styles.modalTextInput}
                  placeholder="co. Jl. Tembalang No. 1"
                  blurOnSubmit={false}
                  ref={(input) => (this.inputAlamat = input)}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  onChangeText={(address) =>
                    this.setState({alamatAdd: address})
                  }
                  autoCompleteType="street-address"
                />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={this.addButtonHandler}>
                  <Text style={styles.buttonText}>ADD</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Modal>
        {this.mainComponent(this.props.navigation)}
        <FAB
          buttonColor="darkblue"
          onClickAction={() => {
            this.setState({modalVisible: true});
          }}
        />
      </View>
    );
  }
}

// export default function Contacts({navigation}) {
//   const [kontak, setKontak] = useState([]);
//   const [nextKey, setNextKey] = useState(0);

//   const fetchKontak = async () => {
//     try {
//       console.log('fetching kontak');
//       const jsonValue = await AsyncStorage.getItem('@kontaque_kontak');
//       console.log(jsonValue);
//       setKontak(jsonValue != null ? JSON.parse(jsonValue) : []);
//       const value = await AsyncStorage.getItem('@kontaque_key');
//       setNextKey(value != null ? value : 0);
//     } catch (e) {
//       ToastAndroid.showWithGravity(
//         'Gagal mengambil data kontak',
//         ToastAndroid.SHORT,
//         ToastAndroid.BOTTOM,
//       );
//     }
//   };
//   const pushKontak = async () => {
//     try {
//       const jsonValue = JSON.stringify(kontak);
//       await AsyncStorage.setItem('@kontaque_kontak', jsonValue);
//       await AsyncStorage.setItem('@kontaque_key', nextKey);
//     } catch (e) {
//       ToastAndroid.showWithGravity(
//         'Gagal meng-update data kontak',
//         ToastAndroid.SHORT,
//         ToastAndroid.BOTTOM,
//       );
//     }
//   };
//   const [modalVisible, setModalVisible] = useState(false);
//   const [nama, setNama] = useState('');
//   const [nomor, setNomor] = useState('');
//   const [email, setEmail] = useState('');
//   const [alamat, setAlamat] = useState('');

//   var inputNomor;
//   var inputEmail;
//   var inputAlamat;

//   const buttonHandler = (kontak) => {
//     navigation.navigate('Detail', {
//       nama: kontak.nama,
//       nomor: kontak.nomor,
//       email: kontak.email,
//       alamat: kontak.alamat,
//     });
//   };

//   const addButtonHandler = () => {
//     if (nama == '') {
//       Alert.alert('Nama Kosong', 'Mohon isi form nama', [
//         {
//           text: 'OK',
//         },
//       ]);
//     } else if (nomor == '' && email == '' && alamat == '') {
//       Alert.alert('Data Tidak Lengkap', 'Mohon isi form kontak', [
//         {
//           text: 'OK',
//         },
//       ]);
//     } else {
//       setKontak((prevKontak) => {
//         return [
//           ...prevKontak,
//           {
//             nama: nama,
//             nomor: nomor,
//             email: email,
//             alamat: alamat,
//             key: nextKey.toString(),
//           },
//         ];
//       });
//       setNextKey((prevKey) => prevKey + 1);
//       pushKontak();
//       setNama('');
//       setNomor('');
//       setEmail('');
//       setAlamat('');
//       setModalVisible(false);
//       console.log(kontak);
//     }
//   };

//   const kontakItem = ({item}) => (
//     <TouchableOpacity
//       style={styles.kontakItem}
//       key={item.key}
//       onPress={() => buttonHandler(item)}>
//       <View style={styles.circleAvatar} backgroundColor="darkblue">
//         <Text style={styles.avatarText}>{item.nama.charAt(0)}</Text>
//       </View>
//       <View>
//         <Text style={styles.kontakItemTitle}>{item.nama}</Text>
//         <Text style={styles.kontakItemSubtitle}>{item.nomor}</Text>
//       </View>
//     </TouchableOpacity>
//   );
//   const mainComponent = () => {
//     if (kontak.length == 0)
//       return (
//         <View style={styles.center}>
//           <Text style={styles.centerText}>Kontak anda masih kosong</Text>
//         </View>
//       );
//     else return <FlatList data={kontak} renderItem={kontakItem} />;
//   };

//   return (
//     <View style={styles.container}>
//       <Modal
//         animationType="slide"
//         transparent
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}>
//         <View style={styles.modalSheetBackground}>
//           <TouchableWithoutFeedback onPress={() => setModalVisible('false')}>
//             <View style={styles.modalDismisser}></View>
//           </TouchableWithoutFeedback>
//           <View style={styles.modalSheet}>
//             <View style={styles.modalTitle}>
//               <Text style={styles.modalTitleText}>Kontak Baru</Text>
//             </View>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalHintText}>Nama Lengkap</Text>
//               <TextInput
//                 style={styles.modalTextInput}
//                 placeholder="co. Rizal Fauzi"
//                 blurOnSubmit={false}
//                 onSubmitEditing={() => inputNomor.focus()}
//                 onChangeText={(name) => setNama(name)}
//               />
//               <Text style={styles.modalHintText}>Nomor Telepon</Text>
//               <TextInput
//                 style={styles.modalTextInput}
//                 placeholder="co. 08123456789"
//                 blurOnSubmit={false}
//                 ref={(input) => (inputNomor = input)}
//                 onSubmitEditing={() => inputEmail.focus()}
//                 onChangeText={(phone) => setNomor(phone)}
//               />
//               <Text style={styles.modalHintText}>Alamat Email</Text>
//               <TextInput
//                 style={styles.modalTextInput}
//                 placeholder="co. email@example.com"
//                 blurOnSubmit={false}
//                 ref={(input) => (inputEmail = input)}
//                 onSubmitEditing={() => inputAlamat.focus()}
//                 onChangeText={(email) => setEmail(email)}
//               />
//               <Text style={styles.modalHintText}>Alamat</Text>
//               <TextInput
//                 style={styles.modalTextInput}
//                 placeholder="co. Jl. Tembalang No. 1"
//                 blurOnSubmit={false}
//                 ref={(input) => (inputAlamat = input)}
//                 onSubmitEditing={() => Keyboard.dismiss()}
//                 onChangeText={(address) => setAlamat(address)}
//               />
//               <TouchableOpacity
//                 style={styles.addButton}
//                 onPress={addButtonHandler}>
//                 <Text style={styles.buttonText}>ADD</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//       {mainComponent()}
//       <FAB
//         buttonColor="deepskyblue"
//         onClickAction={() => {
//           setModalVisible(true);
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignContent: 'center',
//   },
//   centerText: {
//     textAlign: 'center',
//   },
//   circleAvatar: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     justifyContent: 'center',
//   },
//   avatarText: {
//     color: 'white',
//     fontWeight: '200',
//     fontSize: 24,
//     textAlign: 'center',
//   },
//   kontakItem: {
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//     flexDirection: 'row',
//     padding: 15,
//   },
//   kontakItemTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginLeft: 16,
//   },
//   kontakItemSubtitle: {
//     fontSize: 16,
//     marginLeft: 16,
//     fontWeight: '200',
//     color: 'gray',
//   },
//   modalSheetBackground: {
//     backgroundColor: 'rgba(0,0,0,0.2)',
//     flex: 1,
//     justifyContent: 'flex-end',
//   },
//   modalDismisser: {
//     flex: 1,
//   },
//   modalSheet: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//   },
//   modalTitle: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   modalTitleText: {
//     fontSize: 18,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   modalContent: {
//     paddingHorizontal: 16,
//     paddingBottom: 16,
//   },
//   modalHintText: {
//     fontSize: 12,
//     color: 'gray',
//     marginVertical: 12,
//   },
//   modalTextInput: {
//     borderWidth: 1,
//     borderRadius: 6,
//     borderColor: 'gray',
//     padding: 8,
//   },
//   addButton: {
//     backgroundColor: 'darkblue',
//     padding: 12,
//     marginTop: 12,
//     borderRadius: 6,
//   },
//   buttonText: {
//     color: 'white',
//     textAlign: 'center',
//     fontSize: 18,
//   },
// });
