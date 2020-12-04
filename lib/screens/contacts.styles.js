import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  header:{
    padding: 18,
    backgroundColor: 'darkblue',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius:  32,
    elevation: 5,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
  headerText:{
    textAlignVertical:'center',
    justifyContent:'center',
    color:'white',
    fontSize: 30,
    fontWeight: '100'
  },
  headerButton:{
    position: 'absolute',
    alignSelf:'center',
    right: 16,
  },
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  circleAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontWeight: '200',
    fontSize: 24,
    textAlign: 'center',
  },
  listContainer:{
    flex:1,
  },
  kontakItem: {
    marginBottom: 6,
    marginHorizontal: 6,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    elevation: 5,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
  kontakItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  kontakItemSubtitle: {
    fontSize: 16,
    marginLeft: 16,
    fontWeight: '200',
    color: 'gray',
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
    paddingBottom: 16,
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
  addButton: {
    backgroundColor: '#4934EF',
    padding: 12,
    marginVertical: 12,
    marginHorizontal: 0,
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
  dialogContent: {
    paddingVertical: 16,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dialogButton: {
    paddingVertical: 16,
    flex: 1,
    alignSelf: 'flex-end',
  },
});

export default styles;
