import React, { useState } from 'react';
import { useNavigation, Link } from '@react-navigation/native';
import {
  Center,
  Select,
  Stack,
  CheckIcon,
  Input,
  Button,
  FormControl,
  WarningOutlineIcon,
  ScrollView,
  Image,
  Text,
  useToast,
  Alert,
  HStack,
} from 'native-base';
import DatePicker from 'react-native-date-picker';
import { socket } from '../services/SocketService';
import themeStyle from '../constants/theme.style';
import styles from '../constants/styles';
import { genders, bloodGroups } from './../constants/constants';

const SignUpScreen = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

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

  const patientSignUp = async () => {
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

    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; 
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    formattedBirthDate = yyyy+ '-' + mm + '-' + dd;

    let temp = { ...user, birthDate: formattedBirthDate };
    try {
      await socket
        .sendRequest('ADD_PATIENT', temp)
        .then(async (data) => {
          if (data) {
            toast.show({
              placement: 'top',
              description: 'Kaydınız oluşturuldu. Lütfen giriş yapın.',
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
                        Kaydınız oluşturuldu. Lütfen giriş yapın. 
                      </Text>
                    </HStack>
                  </Alert>
                );
              },
            });

            navigation.navigate({
              name: 'Login',
            });
          }
        })
        .catch((err) => {
          toast.show({
            placement: 'top',
            description: 'Kaydınız oluşturulamadı.',
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
                      Kaydınız oluşturulamadı.
                    </Text>
                  </HStack>
                </Alert>
              );
            },
          });
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <ScrollView>
        <Center style={{ ...styles.container, marginBottom: 200 }}>
          <Image
            source={require('../assets/logos/login.png')}
            alt="login-icon"
            style={{
              width: '65%',
              height: '20%',
              marginBottom: '8%',
            }}
            mt={200}
          />
          <Stack
            space={themeStyle.SPACE_BETWEEN_EACH_STACK_ITEM}
            style={styles.stackInContainer}
          >
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

            <Button
                style={styles.loginButton}
                size={themeStyle.STANDART_BUTTON_SIZE}
                onPress={() => setOpen(true)}
              >
                Doğum Tarihinizi Seçiniz
              </Button>
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

            <FormControl isRequired isInvalid={'birthPlace' in errors} style={{marginTop:"-3%"}}>
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
              onPress={() => patientSignUp()}
            >
              KAYIT OL
            </Button>
            <Text
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'indigo.500',
              }}
              alignSelf="center"
              mt="2"
            >
              {' '}
              Zaten Üyeyim{' '}
              <Link to={{ screen: 'Login' }} style={{ color: '#0891B3' }}>
                Giriş Yap
              </Link>
            </Text>
          </Stack>
        </Center>
      </ScrollView>
    </>
  );
};

export default SignUpScreen;
