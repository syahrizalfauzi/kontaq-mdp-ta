import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  ToastAndroid,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

export default function Detail({navigation, route}) {
  //Untuk display
  const [nama, setNama] = useState(route.params.nama);
  const [nomor, setNomor] = useState(route.params.nomor);
  const [email, setEmail] = useState(route.params.email);
  const [alamat, setAlamat] = useState(route.params.alamat);
  //Untuk edit
  const [namaEdit, setNamaEdit] = useState(route.params.nama);
  const [nomorEdit, setNomorEdit] = useState(route.params.nomor);
  const [emailEdit, setEmailEdit] = useState(route.params.email);
  const [alamatEdit, setAlamatEdit] = useState(route.params.alamat);
  const [modalVisible, setModalVisible] = useState(false);

  var inputNomor, inputEmail, inputAlamat;

  const callHandler = async () => {
    await Linking.openURL('tel:' + nomor);
  };
  const messageHandler = async () => {
    await Linking.openURL('sms:' + nomor);
  };
  const emailHandler = async () => {
    await Linking.openURL('mailto:' + email);
  };
  const copyNomor = () => {
    Clipboard.setString(nomor);
    ToastAndroid.show('Nomor disalin', ToastAndroid.SHORT);
  };
  const copyEmail = () => {
    Clipboard.setString(email);
    ToastAndroid.show('Email disalin', ToastAndroid.SHORT);
  };
  const copyAlamat = () => {
    Clipboard.setString(alamat);
    ToastAndroid.show('Alamat disalin', ToastAndroid.SHORT);
  };

  const editButtonHandler = () => {
    setModalVisible(true);
    setNamaEdit(nama);
    setNomorEdit(nomor);
    setEmailEdit(email);
    setAlamatEdit(alamat);
  };

  const updateButtonHandler = async () => {
    if (namaEdit == '') {
      Alert.alert('Nama Kosong', 'Mohon isi form nama', [
        {
          text: 'OK',
        },
      ]);
    } else if (nomorEdit == '' && emailEdit == '' && alamatEdit == '') {
      Alert.alert('Data Tidak Lengkap', 'Mohon isi form kontak', [
        {
          text: 'OK',
        },
      ]);
    } 
    //Cek form kontak ngga kosong
    else if (
      namaEdit != nama ||
      nomorEdit != nomor ||
      emailEdit != email ||
      alamatEdit != alamat
    ) {
      //Ubah data jadi di yang text box edit
      setNama(namaEdit);
      setNomor(nomorEdit);
      setEmail(emailEdit);
      setAlamat(alamatEdit);

      //Bikin object untuk kontak yang datanya baru
      const updatedKontak = {
        nama: namaEdit,
        nomor: nomorEdit,
        email: emailEdit,
        alamat: alamatEdit,
        key: route.params.key,
        color: route.params.color,
      };

      //Ambil semua kontak
      const allKontakValue = await AsyncStorage.getItem('@kontaque_kontak');
      let allKontak = JSON.parse(allKontakValue);
      //Cari index yang mau diupdate
      const indexToUpdate = allKontak.findIndex(
        (element) => element.key == route.params.key,
      );
      //Update elemen di index yang mau diupdate
      allKontak[indexToUpdate] = updatedKontak;
      //Convert semua kontak yang terupdate jadi string
      const updatedAllKontak = JSON.stringify(allKontak);
      //Push ke storage
      await AsyncStorage.setItem('@kontaque_kontak', updatedAllKontak);
      setModalVisible(false);
    } else {
      setModalVisible(false);
    }
  };

  const nomorButton = () => {
    if (nomor)
      return (
        <View>
          <TouchableOpacity
            style={styles.listItem}
            onLongPress={copyNomor}
            onPress={callHandler}>
            <Text style={styles.listItemText}>{nomor}</Text>
            <Icon name="call-outline" size={30} color="#5288F8" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listItem}
            onLongPress={copyNomor}
            onPress={messageHandler}>
            <Text style={styles.listItemText}>{nomor}</Text>
            <Icon
              name="chatbubble-ellipses-outline"
              size={30}
              color="#5288F8"
            />
          </TouchableOpacity>
        </View>
      );
  };

  const emailButton = () => {
    if (email)
      return (
        <View>
          <TouchableOpacity
            style={styles.listItem}
            onLongPress={copyEmail}
            onPress={emailHandler}>
            <Text style={styles.listItemText}>{email}</Text>
            <Icon name="mail-outline" size={30} color="#5288F8" />
          </TouchableOpacity>
        </View>
      );
  };

  const alamatButton = () => {
    if (alamat)
      return (
        <View>
          <TouchableOpacity style={styles.listItem} onPress={copyAlamat}>
            <Text style={styles.listItemText}>{alamat}</Text>
            <Icon
              name="location-outline"
              size={30}
              color="#5288F8"
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
        </View>
      );
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalSheetBackground}>
          <TouchableWithoutFeedback onPress={() => setModalVisible('false')}>
            <View style={styles.modalDismisser}></View>
          </TouchableWithoutFeedback>
          <ScrollView style={styles.modalSheet}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalTitleText}>Edit Kontak</Text>
            </View>
            <View style={styles.modalContent}>
              <Text style={styles.modalHintText}>Nama Lengkap</Text>
              <TextInput
                style={styles.modalTextInput}
                placeholder="co. Rizal Fauzi"
                blurOnSubmit={false}
                onSubmitEditing={() => inputNomor.focus()}
                onChangeText={(name) => setNamaEdit(name)}
                value={namaEdit}
                autoCompleteType="name"
              />
              <Text style={styles.modalHintText}>Nomor Telepon</Text>
              <TextInput
                style={styles.modalTextInput}
                placeholder="co. 08123456789"
                blurOnSubmit={false}
                ref={(input) => (inputNomor = input)}
                onSubmitEditing={() => inputEmail.focus()}
                onChangeText={(phone) => setNomorEdit(phone)}
                value={nomorEdit}
                autoCompleteType="tel"
                keyboardType="phone-pad"
              />
              <Text style={styles.modalHintText}>Alamat Email</Text>
              <TextInput
                style={styles.modalTextInput}
                placeholder="co. email@example.com"
                blurOnSubmit={false}
                ref={(input) => (inputEmail = input)}
                onSubmitEditing={() => inputAlamat.focus()}
                onChangeText={(email) => setEmailEdit(email)}
                value={emailEdit}
                autoCompleteType="email"
                keyboardType="email-address"
              />
              <Text style={styles.modalHintText}>Alamat</Text>
              <TextInput
                style={styles.modalTextInput}
                placeholder="co. Jl. Tembalang No. 1"
                blurOnSubmit={false}
                ref={(input) => (inputAlamat = input)}
                onSubmitEditing={() => Keyboard.dismiss()}
                onChangeText={(address) => setAlamatEdit(address)}
                value={alamatEdit}
                autoCompleteType="street-address"
              />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={updateButtonHandler}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
      <View style={styles.avatarContainer}>
        <View
          style={styles.circleAvatar}
          backgroundColor={route.params.color ?? 'darkblue'}>
          <Text style={styles.avatarText}>{nama.charAt(0)}</Text>
        </View>
        <Text style={styles.namaText}>{nama}</Text>
      </View>
      <ScrollView style={{flex:1}}>
        {nomorButton()}
        {emailButton()}
        {alamatButton()}
        <TouchableOpacity style={styles.addButton} onPress={editButtonHandler}>
          <Text style={styles.buttonText}>EDIT</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'stretch',
  },
  avatarContainer: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    elevation: 5,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
  circleAvatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    justifyContent: 'center',
    margin: 18,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
  avatarText: {
    color: 'white',
    fontWeight: '200',
    fontSize: 60,
    textAlign: 'center',
  },
  namaText: {
    textAlign: 'left',
    fontSize: 24,
    marginHorizontal: 32,
    marginBottom: 16,
  },
  listItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 48,
    elevation: 5,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    marginTop: 4,
    marginHorizontal: 12,
  },
  listItemText: {
    fontSize: 16,
    flex: 4,
    marginRight: 8,
    alignSelf: 'center',
  },
  listItemSuffix: {
    fontSize: 18,
    flex: 1,
    textAlign: 'right',
  },
  addButton: {
    backgroundColor: '#4934EF',
    padding: 12,
    marginVertical: 12,
    marginHorizontal: 12,
    borderRadius: 32,
    elevation: 5,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  modalSheetBackground: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalDismisser: {
    flex: 1,
  },
  modalSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: 330,
  },
  modalTitle: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalTitleText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalContent: {
    paddingHorizontal: 16,
  },
  modalHintText: {
    fontSize: 12,
    color: 'gray',
    marginVertical: 12,
  },
  modalTextInput: {
    borderWidth: 1,
    borderRadius: 32,
    borderColor: 'gray',
    paddingHorizontal: 16,
  },
});
