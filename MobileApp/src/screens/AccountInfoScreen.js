import React, { useContext, useState, useEffect } from 'react';
import {
  ScrollView,
  Heading,
  FormControl,
  WarningOutlineIcon,
  Button,
  Input,
  VStack,
  Center,
  Select,
  CheckIcon,
  useToast,
  Alert,
  HStack,
  Text,
  View,
  Skeleton
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-date-picker';
import { AuthContext } from '../contexts/AuthContext';
import { socket } from '../services/SocketService';
import styles from '../constants/styles';
import themeStyle from '../constants/theme.style';
import { genders, bloodGroups } from './../constants/constants';

const AccountInfoScreen = () => {
  const toast = useToast();
  const { logout } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const nameValidator = (entered = user.name) => {
    if (entered === undefined || entered === '') {
      setErrors({ ...errors, name: true });
      return false;
    }
    delete errors.name;
    return true;
  };

  const surnameValidator = (entered = user.surname) => {
    if (entered === undefined || entered === '') {
      setErrors({ ...errors, surname: true });
      return false;
    }
    delete errors.surname;
    return true;
  };

  const tcnumberValidator = (entered = user.tcnumber) => {
    if (entered === undefined || entered === '') {
      setErrors({ ...errors, tcnumber: true });
      return false;
    }
    delete errors.tcnumber;
    return true;
  };
  const phoneNumberValidator = (entered = user.phoneNumber) => {
    if (entered === undefined || entered === '') {
      setErrors({ ...errors, phoneNumber: true });
      return false;
    }
    delete errors.phoneNumber;
    return true;
  };
  const birthPlaceValidator = (entered = user.birthPlace) => {
    if (entered === undefined || entered === '') {
      setErrors({ ...errors, birthPlace: true });
      return false;
    }
    delete errors.birthPlace;
    return true;
  };
  const genderValidator = (entered = user.gender) => {
    if (entered === undefined || entered === '') {
      setErrors({ ...errors, gender: true });
      return false;
    }
    delete errors.gender;
    return true;
  };
  const bloodGroupValidator = (entered = user.bloodGroup) => {
    if (entered === undefined || entered === '') {
      setErrors({ ...errors, bloodGroup: true });
      return false;
    }
    delete errors.bloodGroup;
    return true;
  };
  const usernameValidator = (enteredUsername = user.username) => {
    if (enteredUsername === undefined || enteredUsername === '') {
      setErrors({ ...errors, username: 'Lütfen kullanıcı adı giriniz.' });
      return false;
    }
    delete errors.username;
    return true;
  };

  const passwordValidator = (enteredPassword = user.password) => {
    if (enteredPassword === undefined || enteredPassword === '') {
      setErrors({ ...errors, password: 'Lütfen şifre giriniz.' });
      return false;
    }
    delete errors.password;
    return true;
  };

  // get user information from server
  const getUserInfoFromServer = async () => {
    try {
      const idValue = await AsyncStorage.getItem('id');
      const idParsedValue = JSON.parse(idValue);

      if (idParsedValue !== null) {
        await socket
          .sendRequest('GET_PATIENT_INFO', {
            id: idParsedValue,
          })
          .then(async(data) => {
            if (data) {
              var dateTemp = new Date(data.patientInfo.birthDate);
              dateTemp.setDate(dateTemp.getDate() + 1);
              setUser(data.patientInfo);
              setDate(dateTemp);
            }
            await setIsLoaded(true);
          })
          .catch(async(err) => {
            console.error(err.message);
            await setIsLoaded(true);
          });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updatePatientInfo = async () => {
    if (
      !nameValidator() ||
      !surnameValidator() ||
      !tcnumberValidator() ||
      !phoneNumberValidator() ||
      !genderValidator() ||
      !bloodGroupValidator() ||
      !birthPlaceValidator() ||
      !usernameValidator() ||
      !passwordValidator()
    ) {
      return false;
    }
    try {
      const idValue = await AsyncStorage.getItem('id');
      const idParsedValue = JSON.parse(idValue);

      const yyyy = date.getFullYear();
      let mm = date.getMonth() + 1;
      let dd = date.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      formattedBirthDate = yyyy + '-' + mm + '-' + dd;

      let temp = { ...user, birthDate: formattedBirthDate, id: idParsedValue };

      await socket
        .sendRequest('UPDATE_PATIENT', temp)
        .then((data) => {
          if (data) {
            toast.show({
              placement: 'top',
              description: 'Kullanıcı adı veya şifre hatalı.',
              render: () => {
                return (
                  <Alert
                    maxWidth="100%"
                    mb={6}
                    alignSelf="center"
                    flexDirection="row"
                    status="success"
                  >
                    <HStack space={2} flexShrink={1} alignItems="center">
                      <Alert.Icon />
                      <Text
                        fontSize="xl"
                        fontWeight="medium"
                        flexShrink={1}
                        color="darkText"
                      >
                        Bilgiler güncellendi.
                      </Text>
                    </HStack>
                  </Alert>
                );
              },
            });
          }
        })
        .catch((err) => {
          toast.show({
            placement: 'top',
            description: 'Kullanıcı adı veya şifre hatalı.',
            render: () => {
              return (
                <Alert
                  maxWidth="100%"
                  mb={6}
                  alignSelf="center"
                  flexDirection="row"
                  status="error"
                >
                  <HStack space={2} flexShrink={1} alignItems="center">
                    <Alert.Icon />
                    <Text
                      fontSize="xl"
                      fontWeight="medium"
                      flexShrink={1}
                      color="darkText"
                    >
                      Bilgiler güncellenemedi.
                    </Text>
                  </HStack>
                </Alert>
              );
            },
          });
        });
    } catch (err) {
      console.error(err);
    }
  };

  const getInputDate = () => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    formattedBirthDate = dd + '-' + mm + '-' + yyyy;
    return formattedBirthDate;
  };

  useEffect(() => {
    getUserInfoFromServer();
  }, []);

  if (!isLoaded) {
    return (
      <View style={styles.container}>
      <Center>
        <VStack
          space={themeStyle.SPACE_BETWEEN_EACH_STACK_ITEM}
          style={styles.stackInContainer}
        >
          <Heading style={styles.heading}>Kullanıcı Bilgileri</Heading>
          <Skeleton h="70" mt="5" rounded="lg" />
          <Skeleton h="70" mt="2" rounded="lg" />
          <Skeleton h="70" mt="2" rounded="lg" />
          <Skeleton h="70" mt="2" rounded="lg" />
          <Skeleton h="70" mt="2" rounded="lg" />
          <Button size="lg" colorScheme="red" onPress={() => logout()}>
            Çıkış
          </Button>
        </VStack>
      </Center>
    </View>
    );
  }

  return (
    <ScrollView>
      <DatePicker
        modal
        title="Doğum Tarihinizi Seçiniz"
        confirmText="Onayla"
        cancelText="İptal"
        open={open}
        date={date}
        mode="date"
        maximumDate={new Date()}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Center style={styles.container}>
        <VStack
          space={themeStyle.SPACE_BETWEEN_EACH_STACK_ITEM}
          style={styles.stackInContainer}
        >
          <Heading style={styles.heading}>Kullanıcı Bilgileri</Heading>
          <FormControl isRequired isInvalid={'name' in errors}>
            <FormControl.Label>Ad</FormControl.Label>
            <Input
              style={styles.loginPhoneNumberInput}
              variant="outline"
              placeholder="Ad"
              value={user?.name}
              onChangeText={(name) => {
                setUser({ ...user, name: name });
                delete errors.name;
              }}
              onEndEditing={() => nameValidator()}
            />
            {'name' in errors ? (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Lütfen ad giriniz.
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
          <FormControl isRequired isInvalid={'surname' in errors}>
            <FormControl.Label>Soyad</FormControl.Label>
            <Input
              style={styles.loginPhoneNumberInput}
              variant="outline"
              placeholder="Soyad"
              value={user?.surname}
              onChangeText={(surname) => {
                setUser({ ...user, surname: surname });
                delete errors.surname;
              }}
              onEndEditing={() => surnameValidator()}
            />
            {'surname' in errors ? (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Lütfen soyad giriniz.
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>

          <FormControl isRequired isInvalid={'tcnumber' in errors}>
            <FormControl.Label>T.C Kimlik Numarası</FormControl.Label>
            <Input
              keyboardType="numeric"
              maxLength={11}
              style={styles.loginPhoneNumberInput}
              variant="outline"
              placeholder="T.C Kimlik Numarası"
              value={user?.tcnumber}
              onChangeText={(tcnumber) => {
                setUser({ ...user, tcnumber: tcnumber });
                delete errors.tcnumber;
              }}
              onEndEditing={() => tcnumberValidator()}
            />
            {'tcnumber' in errors ? (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Lütfen T.C Kimlik Numarası giriniz.
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>

          <FormControl isRequired isInvalid={'phoneNumber' in errors}>
            <FormControl.Label>Cep Telefonu</FormControl.Label>
            <Input
              keyboardType="numeric"
              maxLength={11}
              style={styles.loginPhoneNumberInput}
              variant="outline"
              placeholder="Cep Telefonu"
              value={user?.phoneNumber}
              onChangeText={(phoneNumber) => {
                setUser({ ...user, phoneNumber: phoneNumber });
                delete errors.phoneNumber;
              }}
              onEndEditing={() => phoneNumberValidator()}
            />
            {'phoneNumber' in errors ? (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Lütfen cep telefonu giriniz.
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>

          <FormControl isRequired isInvalid={'gender' in errors}>
            <FormControl.Label>Cinsiyet</FormControl.Label>
            <Select
              showSoftInputOnFocus={false}
              accessibilityLabel="Cinsiyetinizi Seçiniz"
              placeholder="Cinsiyetinizi Seçiniz"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="8" />,
              }}
              style={styles.loginHospitalSelect}
              variant="outline"
              selectedValue={user.gender}
              onValueChange={(selectedGender) => {
                setUser({ ...user, gender: selectedGender });
                delete errors.gender;
              }}
            >
              {genders.map((gender) => (
                <Select.Item label={gender} value={gender} key={gender} />
              ))}
            </Select>
            {'gender' in errors ? (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Lütfen cinsiyet seçiniz.
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>

          <FormControl isRequired isInvalid={'bloodGroup' in errors}>
            <FormControl.Label>Kan Grubu</FormControl.Label>
            <Select
              showSoftInputOnFocus={false}
              accessibilityLabel="Kan Grubunuzu Seçiniz"
              placeholder="Kan Grubunuzu Seçiniz"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="8" />,
              }}
              style={styles.loginHospitalSelect}
              variant="outline"
              selectedValue={user.bloodGroup}
              onValueChange={(selectedBloodGroup) => {
                setUser({ ...user, bloodGroup: selectedBloodGroup });
                delete errors.bloodGroup;
              }}
            >
              {bloodGroups.map((bloodGroup) => (
                <Select.Item
                  label={bloodGroup}
                  value={bloodGroup}
                  key={bloodGroup}
                />
              ))}
            </Select>
            {'bloodGroup' in errors ? (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Lütfen kan grubu giriniz.
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>

          <FormControl isRequired isInvalid={'birthDate' in errors}>
            <FormControl.Label>Doğum Tarihi</FormControl.Label>
            <Input
              style={styles.loginPhoneNumberInput}
              variant="outline"
              isReadOnly={true}
              InputRightElement={
                <Button
                  size="xs"
                  rounded="none"
                  w="1/6"
                  h="full"
                  onPress={() => setOpen(true)}
                >
                  Değiştir
                </Button>
              }
              placeholder="Doğum Tarihi"
              value={getInputDate()}
            />
            {'birthDate' in errors ? (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.birthDate}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>

          <FormControl isRequired isInvalid={'birthPlace' in errors}>
            <FormControl.Label>Doğum Yeri</FormControl.Label>
            <Input
              style={styles.loginPhoneNumberInput}
              variant="outline"
              placeholder="Doğum Yeri"
              value={user?.birthPlace}
              onChangeText={(birthPlace) => {
                setUser({ ...user, birthPlace: birthPlace });
                delete errors.birthPlace;
              }}
              onEndEditing={() => birthPlaceValidator()}
            />
            {'birthPlace' in errors ? (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Lütfen doğum yeri giriniz.
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
          <FormControl isRequired isInvalid={'username' in errors}>
            <FormControl.Label>Kullanıcı Adı</FormControl.Label>
            <Input
              style={styles.loginPhoneNumberInput}
              variant="outline"
              placeholder="Kullanıcı Adı"
              value={user?.username}
              onChangeText={(username) => {
                setUser({ ...user, username: username });
                delete errors.username;
              }}
              onEndEditing={() => usernameValidator()}
            />
            {'username' in errors ? (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Lütfen kullanıcı adı giriniz.
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>

          <FormControl isRequired isInvalid={'password' in errors}>
            <FormControl.Label>Şifre</FormControl.Label>
            <Input
              type={show ? 'text' : 'password'}
              style={styles.loginPhoneNumberInput}
              variant="outline"
              InputRightElement={
                <Button
                  size="xs"
                  rounded="none"
                  w="1/6"
                  h="full"
                  onPress={() => setShow(!show)}
                >
                  {show ? 'Gizle' : 'Göster'}
                </Button>
              }
              placeholder="Şifre"
              value={user?.password}
              onChangeText={(password) => {
                setUser({ ...user, password: password });
                delete errors.password;
              }}
              onEndEditing={() => passwordValidator()}
            />
            {'password' in errors ? (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.password}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
          <Button
            style={styles.loginButton}
            size={themeStyle.STANDART_BUTTON_SIZE}
            onPress={() => updatePatientInfo()}
          >
            Hesap Bilgileri Güncelle
          </Button>
          <Button
            style={styles.exitButton}
            size={themeStyle.STANDART_BUTTON_SIZE}
            onPress={() => logout()}
          >
            Çıkış
          </Button>
        </VStack>
      </Center>
    </ScrollView>
  );
};

export default AccountInfoScreen;
