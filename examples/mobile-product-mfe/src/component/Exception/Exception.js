/* eslint-disable no-return-assign */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import {
  Alert, Modal, StyleSheet, Text, Pressable, View,
} from 'react-native';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const Exception = (props) => {
  console.log('[Exception]');
  const { err } = props;
  // eslint-disable-next-line prefer-const
  let [errorModalVisible, setErrorModalVisible] = useState(true);
  const renderCount = useRef(0);
  console.log("render count")
  console.log(renderCount.current);

  useEffect(() => {
    if (renderCount.current === 4) {
      console.log("render count")
      console.log(renderCount.current);
    
      renderCount.current = 0;
      console.log("render count")
      console.log(renderCount.current);
    
      setErrorModalVisible(true);
    }
    console.log(errorModalVisible);
  
    renderCount.current = renderCount.current + 1;
  })

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent
        visible={errorModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setErrorModalVisible(!errorModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {err.map((obj) => (
                <>
                  <h2>Error</h2>
                  <div>{obj.Message}</div>
                </>
              ))}
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setErrorModalVisible(!errorModalVisible);
              }}
            >
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Exception;
