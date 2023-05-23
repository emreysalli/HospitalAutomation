import React from 'react';
import {
  Modal,
  Button,
  Input,
  Text,
  FormControl,
  useToast,
  Alert,
  HStack,
} from 'native-base';
import { socket } from '../services/SocketService';
import styles from '../constants/styles';

var Email = {
  send: function (a) {
    return new Promise(function (n, e) {
      (a.nocache = Math.floor(1e6 * Math.random() + 1)), (a.Action = 'Send');
      var t = JSON.stringify(a);
      Email.ajaxPost('https://smtpjs.com/v3/smtpjs.aspx?', t, function (e) {
        n(e);
      });
    });
  },
  ajaxPost: function (e, n, t) {
    var a = Email.createCORSRequest('POST', e);
    a.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'),
      (a.onload = function () {
        var e = a.responseText;
        null != t && t(e);
      }),
      a.send(n);
  },
  ajax: function (e, n) {
    var t = Email.createCORSRequest('GET', e);
    (t.onload = function () {
      var e = t.responseText;
      null != n && n(e);
    }),
      t.send();
  },
  createCORSRequest: function (e, n) {
    var t = new XMLHttpRequest();
    return (
      'withCredentials' in t
        ? t.open(e, n, !0)
        : 'undefined' != typeof XDomainRequest
        ? (t = new XDomainRequest()).open(e, n)
        : (t = null),
      t
    );
  },
};

const PasswordResetDialog = ({ modalVisible, setModalVisible }) => {
  const toast = useToast();
  const [activeStep, setActiveStep] = React.useState(0);
  const [email, setEmail] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [newRepassword, setNewRepassword] = React.useState('');
  const [verificationCode, setVerificationCode] = React.useState('');
  const [enteredVerificationCode, setEnteredVerificationCode] = React.useState(
    ''
  );
  const [show, setShow] = React.useState(false);
  const [show1, setShow1] = React.useState(false);


  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleClose = () => {
    setActiveStep(0);
  };

  function getStepTitle(step) {
    switch (step) {
      case 0:
        return <Modal.Header>Parolanızı mı unuttunuz</Modal.Header>;
      case 1:
        return <Modal.Header>5 Haneli Kodu Girin</Modal.Header>;
      case 2:
        return <Modal.Header>Şifreyi yenile</Modal.Header>;
      default:
        throw new Error('Unknown step');
    }
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Modal.Body>
            Şifreni mi unuttun? Lütfen e-mail adresinizi giriniz. E-posta
            yoluyla yeni şifre oluşturmak için bir kod alacaksınız.
            <FormControl isRequired mt={3}>
              <FormControl.Label>E-posta Adresi</FormControl.Label>
              <Input
                style={styles.loginPhoneNumberInput}
                variant="outline"
                w={{
                  base: '100%',
                  md: '100%',
                }}
                placeholder="E-posta Adresinizi Giriniz"
                onChangeText={(text) => {
                  setEmail(text);
                }}
              />
            </FormControl>
          </Modal.Body>
        );
      case 1:
        return (
          <Modal.Body>
            Gerçekten siz olduğunuzdan emin olmak istiyoruz. Kimliğinizi doğrulamak için {email} adresine gönderilen 5 haneli doğrulama
            kodunu girin.
            <FormControl isRequired mt={3}>
              <FormControl.Label>Doğrulama Kodu</FormControl.Label>
              <Input
                autoFocus
                maxLength={5}
                variant="outline"
                isRequired="true"
                style={{
                  fontSize: 20,
                  letterSpacing: 14,
                  textAlign: 'center',
                }}
                onChangeText={(text) => {
                  setEnteredVerificationCode(text);
                }}
              />
            </FormControl>
          </Modal.Body>
        );
      case 2:
        return (
          <Modal.Body>
            Giriş yapabilmek ve tüm özelliklere erişebilmek için hesabınızın
            yeni şifresini belirleyin.
            <FormControl isRequired mt={3}>
            <FormControl.Label>Yeni Şifre</FormControl.Label>
            <Input
              type={show ? 'text' : 'password'}
              style={styles.loginPhoneNumberInput}
              variant="outline"
              InputRightElement={
                <Button
                  size="xs"
                  rounded="none"
                  w="1/5"
                  h="full"
                  onPress={() => setShow(!show)}
                >
                  {show ? 'Gizle' : 'Göster'}
                </Button>
              }
              placeholder="Yeni Şifrenizi Giriniz"
              onChangeText={(text) => {
                setNewPassword(text)
              }}
            />
          </FormControl>
          <FormControl isRequired mt={3}>
            <FormControl.Label>Yeni Şifre Onayla</FormControl.Label>
            <Input
              type={show1 ? 'text' : 'password'}
              style={styles.loginPhoneNumberInput}
              variant="outline"
              InputRightElement={
                <Button
                  size="xs"
                  rounded="none"
                  w="1/5"
                  h="full"
                  onPress={() => setShow1(!show1)}
                >
                  {show1 ? 'Gizle' : 'Göster'}
                </Button>
              }
              placeholder="Yeni Şifrenizi Tekrar Giriniz"
              onChangeText={(text) => {
                setNewRepassword(text)
              }}
            />
          </FormControl>
          </Modal.Body>
        );
      default:
        throw new Error('Unknown step');
    }
  }

  function getStepButton(step) {
    switch (step) {
      case 0:
        return (
          <Button
            flex="1"
            onPress={() => {
              verifyEmailOnServer()
            }}
          >
            Devam
          </Button>
        );
      case 1:
        return (
          <Button
            flex="1"
            onPress={() => {
              verifyVerificationCode();
            }}
          >
            Devam
          </Button>
        );
      case 2:
        return (
          <Button
            flex="1"
            onPress={() => {
              verifyNewPasswords(false);
            }}
          >
            Şifreyi Yenile
          </Button>
        );
      default:
        throw new Error('Unknown step');
    }
  }

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  const verifyEmailOnServer = async () => {
    socket
      .sendRequest('VERIFY_EMAIL', { email: email })
      .then(async (data) => {
        if (data.present) {
          let randomCode = await generateString(5);

          await setVerificationCode(randomCode);
          Email.send({
            Host: 'smtp.elasticemail.com',
            Username: 'kstmn.mr@gmail.com',
            Password: '095052E1C7CCC079BD761846A570816CD4B3',
            To: email,
            From: 'kstmn.mr@gmail.com',
            Subject: 'Parola Sıfırlama İsteği',
            Body: `<div style="display: flex;justify-content: center;"><div style="text-align: left;"><h3><b>Parolanız sıfırlansın mı?</b></h3><br><br>
                  <p style="font-size:16px;">${email} için şifre sıfırlama talebinde bulunduysanız,<br>
                  işlemi tamamlamak için aşağıdaki onay kodunu kullanın.<br>
                  Bu istekte bulunmadıysanız, bu e-postayı yok sayın. <br><br>
                  
                  
                  <b>${randomCode}</b></p></div></div>`,
          }).then((message) => alert(message));
          handleNext();
        } else {
          handleClose();
          toast.show({
            placement: 'top',
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
                      Böyle bir email kayıtlı değildir.
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

  const verifyVerificationCode = () => {
    if (verificationCode === enteredVerificationCode) {
      toast.show({
        placement: 'top',
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
                  Doğrulama kodu eşleşti. Şifrenizi değiştirebilirsiniz.
                </Text>
              </HStack>
            </Alert>
          );
        },
      });
      handleNext();
    } else {
      toast.show({
        placement: 'top',
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
                  Doğrulama kodunu hatalı girdiniz.
                </Text>
              </HStack>
            </Alert>
          );
        },
      });
    }
  };

  const verifyNewPasswords = () => {
    if (newPassword === newRepassword) {
      socket
        .sendRequest('CHANGE_PASSWORD_PATIENT', {
          email: email,
          newPassword: newPassword,
        })
        .then(async (data) => {
          if (data) {
            toast.show({
              placement: 'top',
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
                        Şifreniz yeni şifrenizle değiştirildi.
                      </Text>
                    </HStack>
                  </Alert>
                );
              },
            });
          } else {
            toast.show({
              placement: 'top',
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
                        Şifreniz değiştirilemedi.
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
                      Şifreniz değiştirilemedi.
                    </Text>
                  </HStack>
                </Alert>
              );
            },
          });
          console.error(err.message);
        });
      handleClose();
    } else {
      toast.show({
        placement: 'top',
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
                  Yeni şifreniz tekrar şifresiyle aynı değil.
                </Text>
              </HStack>
            </Alert>
          );
        },
      });
    }
  };

  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        size="lg"
      >
        <Modal.Content>
          <Modal.CloseButton />
          {getStepTitle(activeStep)}
          {getStepContent(activeStep)}
          <Modal.Footer>{getStepButton(activeStep)}</Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default PasswordResetDialog;
