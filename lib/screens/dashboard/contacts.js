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
  BackHandler,
} from 'react-native';
import {Dialog} from 'react-native-simple-dialogs';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './contacts.styles';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

export default class Contacts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      kontak: [],
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
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.navigation = this.props.navigation;
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

  // handleBackButtonClick() {
  //   this.fetchKontak();
  //   this.navigation.goBack(null);
  //   return true;
  // }
  componentDidMount() {
    this.fetchKontak();
    // BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   this.handleBackButtonClick,
    // );
  }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener(
  //     'hardwareBackPress',
  //     this.handleBackButtonClick,
  //   );
  // }

  async fetchKontak() {
    // this.canUpdate = false;
    try {
      const kontakValue = await AsyncStorage.getItem('@kontaque_kontak');
      let newKontak;
      if (kontakValue != null) newKontak = JSON.parse(kontakValue);
      else newKontak = [];
      newKontak.sort((a, b) => {
        if (a.nama.toLowerCase() < b.nama.toLowerCase()) return -1;
        else if (a.nama.toLowerCase() > b.nama.toLowerCase()) return 1;
        return 0;
      });
      this.setState({
        kontak: newKontak,
      });
    } catch (e) {
      ToastAndroid.show('Gagal mengambil data kontak', ToastAndroid.SHORT);
    }
    // finally {
    //    this.canUpdate = true;
    // }
  }

  async pushKontak() {
    // this.canUpdate = false;
    try {
      const kontakValue = JSON.stringify(this.state.kontak);
      await AsyncStorage.setItem('@kontaque_kontak', kontakValue);
    } catch (e) {
      ToastAndroid.show('Gagal meng-update kontak', ToastAndroid.SHORT);
    } finally {
      this.setState({
        nama: '',
        nomor: '',
        email: '',
        alamat: '',
        modalVisible: false,
        dialogVisible: false,
      }, this.fetchKontak);
      // this.canUpdate = true;
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
      updateKontak: this.fetchKontak,
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
        },
      ];
      this.setState(
        {
          kontak: Array.from(newKontak),
          namaAdd: '',
          nomorAdd: '',
          emailAdd: '',
          alamatAdd: '',
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
        <LinearGradient
          style={styles.header}
          colors={['#4934EF', '#5288F8']}
          start={{x: 0, y: 0}}>
          <Text style={styles.headerText}>KONTAQ</Text>
          <View style={styles.headerButton}>
            <TouchableOpacity
              onPress={() => this.navigation.navigate('Profile')}>
              <Icon
                name="settings-outline"
                color="white"
                backgroundColor="transparent"
                size={24}
                style={{padding: 16}}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
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
          buttonColor="#5288F8"
          onClickAction={() => {
            this.setState({modalVisible: true});
          }}
        />
      </View>
    );
  }
}
