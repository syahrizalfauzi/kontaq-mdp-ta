import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import Contacts from './contacts';
import Profile from './profile';

const Tab = createBottomTabNavigator();

export default function Dashboard({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName="Contacts"
      tabBarOptions={{
        activeTintColor: 'darkblue',
        inactiveTintColor: 'gray',
      }}
      screenOptions={({route}) => ({
        tabBarIcon:({focused, color, size}) =>{
          let iconName;

          if(route.name === 'Contacts')
            iconName = 'people';
          else
            iconName = 'person';
          
          if(!focused)
            iconName += '-outline';

          return <Icon name={iconName} size={size} color={color} />
        }
      })}
      >
      <Tab.Screen name="Contacts" component={Contacts} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

// import React, {useState} from 'react';
// // import ActionButton from 'react-native-action-button';
// import FAB from 'react-native-fab';
// import {
//   StyleSheet,
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Modal,
//   TextInput,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Alert,
// } from 'react-native';

// export default function Dashboard({navigation}) {
//   const [kontak, setKontak] = useState([
//     {
//       nama: 'Rizal Fauzi',
//       nomor: '08123345234',
//       email: 'rizal@domain.com',
//       alamat: 'Jalan jalan aja dulu',
//       key: '1',
//     },
//     {
//       nama: 'Ijal Pauji',
//       nomor: '0810234897',
//       email: 'ijal@domain.com',
//       alamat: 'Perumahan rumah rumahan',
//       key: '2',
//     },
//   ]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [nama, setNama] = useState('');
//   const [nomor, setNomor] = useState('');
//   const [email, setEmail] = useState('');
//   const [alamat, setAlamat] = useState('');

//   var nextKey = 3;

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
//       Alert.alert('No Name', 'Please fill out the name form', [
//         {
//           text: 'OK',
//         },
//       ]);
//     } else if (nomor == '' && email == '' && alamat == '') {
//       Alert.alert('Data Incomplete', 'Please fill out the contact form', [
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
//       setNama('');
//       setNomor('');
//       setEmail('');
//       setAlamat('');
//       nextKey++;
//       setModalVisible(false);
//     }
//   };

//   const kontakItem = ({item}) => (
//     <TouchableOpacity style={styles.kontakItem} key={item.key} onPress={() => buttonHandler(item)}>
//       <View style={styles.circleAvatar} backgroundColor="darkblue">
//         <Text style={styles.avatarText}>{item.nama.charAt(0)}</Text>
//       </View>
//       <View>
//         <Text style={styles.kontakItemTitle}>{item.nama}</Text>
//         <Text style={styles.kontakItemSubtitle}>{item.nomor}</Text>
//       </View>
//     </TouchableOpacity>
//   );

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
//       <FlatList data={kontak} renderItem={kontakItem} />
//       <FAB
//         buttonColor="deepskyblue"
//         onClickAction={() => {
//           setModalVisible(true);
//         }}
//       />
//     </View>
//   );
// }

// Dashboard.navigationOptions = {
//   title: 'plis',
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
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
