import React, { useState, useContext } from 'react';
import { Link } from '@react-navigation/native';
import {
  Center,
  Stack,
  Input,
  Button,
  FormControl,
  WarningOutlineIcon,
  InputGroup,
  Image,
  useToast,
  Text,
  Alert,
  HStack,
} from 'native-base';
import { AuthContext } from '../contexts/AuthContext';
import { socket } from '../services/SocketService';
import themeStyle from '../constants/theme.style';
import styles from '../constants/styles';

const LoginScreen = ({ navigation }) => {
  const toast = useToast();
  const { login } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = React.useState({});

  const usernameValidator = (enteredUsername = userData.username) => {
    if (enteredUsername === undefined || enteredUsername === '') {
      setErrors({ ...errors, username: 'Lütfen kullanıcı adı giriniz.' });
      return false;
    }
    delete errors.username;
    return true;
  };

  const passwordValidator = (enteredPassword = userData.password) => {
    if (enteredPassword === undefined || enteredPassword === '') {
      setErrors({ ...errors, password: 'Lütfen şifre giriniz.' });
      return false;
    }
    delete errors.password;
    return true;
  };

  const loginUser = async () => {
    if (!usernameValidator() || !passwordValidator()) {
      return false;
    }

    await socket
      .sendRequest('PATIENT_LOGIN', userData)
      .then(async (data) => {
        if (data?.userPresent) {
          await login(data?.id);
        } else {
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
                      Kullanıcı adı veya şifre hatalı.
                    </Text>
                  </HStack>
                </Alert>
              );
            },
          });
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <>
      <Center style={styles.container}>
        <Image
          source={require('../assets/logos/login.png')}
          alt="login-icon"
          style={{ width: '65%', height: '25%', marginTop: '-20%', marginBottom:"8%" }}
        />
        <Stack
          space={themeStyle.SPACE_BETWEEN_EACH_STACK_ITEM}
          style={styles.stackInContainer}
        >
          <FormControl isRequired isInvalid={'username' in errors}>
            <FormControl.Label>Kullanıcı Adı</FormControl.Label>
            <InputGroup>
              <Input
                style={styles.loginPhoneNumberInput}
                variant="outline"
                w={{
                  base: '100%',
                  md: '100%',
                }}
                placeholder="Kullanıcı Adınızı Giriniz"
                onChangeText={(text) => {
                  setUserData({ ...userData, username: text });
                  delete errors.username;
                }}
                onEndEditing={() => usernameValidator()}
              />
            </InputGroup>
            {'username' in errors ? (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.username}
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
              placeholder="Şifrenizi Giriniz"
              onChangeText={(text) => {
                setUserData({ ...userData, password: text });
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
            onPress={() => loginUser()}
          >
            GİRİŞ YAP
          </Button>
          <Text
            _text={{
              fontSize: 'xs',
              fontWeight: '500',
              color: 'indigo.500',
            }}
            alignSelf="center"
            mt={2}
          >
            {' '}
            Hesabınız yok mu?{' '}
            <Link to={{ screen: 'SignUp' }} style={{ color: '#0891B3' }}>
              Üye Ol
            </Link>
          </Text>
        </Stack>
      </Center>
    </>
  );
};

export default LoginScreen;
