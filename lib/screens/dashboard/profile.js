import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function Profile() {
  const buttonHandler = async () => {
      try{
        //   await AsyncStorage.multiRemove(['@kontaque_kontak', '@kontaque_key']);
          await AsyncStorage.removeItem('@kontaque_kontak');
          ToastAndroid.showWithGravity('Data berhasil dihapus', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      }
      catch (e){
        ToastAndroid.showWithGravity('Data GAGAL dihapus', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.identitas}>
        <View styles={styles.elevated}>
          <Image
            source={require('../../../images/profilepic.jpg')}
            style={styles.image}
          />
        </View>
        <Text style={styles.text}>Aplikasi ini dibuat oleh</Text>
        <Text style={styles.namanim}>Muhammad Syahrizal Fauzi</Text>
        <Text style={styles.namanim}>21120118130066</Text>
        <Text style={styles.text}>
          Sebagai tugas akhir praktikum MDP (Mobile Device Programming) jurusan
          Teknik Komputer Universitas Diponegoro
        </Text>
        <Text style={styles.text}>
          Silahkan klik tombol dibawah jika ingin menghapus semua data kontak
          pada aplikasi ini
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={buttonHandler}>
        <Text style={styles.buttonText}>HAPUS DATA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  identitas: {
    alignItems: 'center',
  },
  elevated: {
    elevation: 5,
  },
  image: {
    width: 128,
    height: 128,
    borderRadius: 64,
    marginTop: 32,
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 12,
  },
  namanim: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'red',
    padding: 12,
    marginBottom: 16,
    width: '100%',
    borderRadius: 64,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});
