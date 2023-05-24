import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';
import { socket } from './../services/socketServices';
import PasswordInput from './PasswordInput';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const PasswordResetDialog = ({
  openPasswordResetDialog,
  setOpenPasswordResetDialog,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = React.useState(0);
  const [email, setEmail] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [newRepassword, setNewRepassword] = React.useState('');
  const [verificationCode, setVerificationCode] = React.useState('');
  const [enteredVerificationCode, setEnteredVerificationCode] = React.useState(
    ''
  );

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleClose = () => {
    setOpenPasswordResetDialog(false);
    setActiveStep(0);
  };

  function getStepTitle(step) {
    switch (step) {
      case 0:
        return <>Parolanızı mı unuttunuz</>;
      case 1:
        return <>5 Haneli Kodu Girin</>;
      case 2:
        return <>Şifreyi yenile</>;
      default:
        throw new Error('Unknown step');
    }
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Box m={6}>
            <DialogContentText>
              Şifreni mi unuttun? Lütfen e-mail adresinizi giriniz. E-posta
              yoluyla yeni şifre oluşturmak için bir kod alacaksınız.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="E-posta Adresi"
              type="email"
              fullWidth
              variant="standard"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Box>
        );
      case 1:
        return (
          <Box m={6}>
            <DialogContentText>
              Gerçekten siz olduğunuzdan emin olmak istiyoruz. Kimliğinizi
              doğrulamak için {email} adresine gönderilen 5 haneli
              doğrulama kodunu girin.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="enteredVerificationCode"
              label="Doğrulama Kodu"
              fullWidth
              inputProps={{ maxLength: 5 }}
              variant="standard"
              value={enteredVerificationCode}
              onChange={(event) => {
                setEnteredVerificationCode(event.target.value);
              }}
            />
          </Box>
        );
      case 2:
        return (
          <Box m={6}>
            <DialogContentText>
              Giriş yapabilmek ve tüm özelliklere erişebilmek için hesabınızın
              yeni şifresini belirleyin.
            </DialogContentText>
            <PasswordInput
              id="newPassword"
              label="Yeni Şifre"
              value={newPassword}
              setValue={setNewPassword}
            />
            <PasswordInput
              id="newRepassword"
              label="Yeni Şifre Onayla"
              value={newRepassword}
              setValue={setNewRepassword}
            />
          </Box>
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
            variant="contained"
            onClick={verifyEmailOnServer}
            sx={{ mt: 3, ml: 1 }}
          >
            Devam
          </Button>
        );
      case 1:
        return (
          <Button
            variant="contained"
            onClick={verifyVerificationCode}
            sx={{ mt: 3, ml: 1 }}
          >
            Devam
          </Button>
        );
      case 2:
        return (
          <Button
            variant="contained"
            onClick={verifyNewPasswords}
            sx={{ mt: 3, ml: 1 }}
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
          window.Email.send({
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
          }).then((message) => console.log(message));
          handleNext();
        } else {
          handleClose();
          enqueueSnackbar({
            message: 'Böyle bir email kayıtlı değildir.',
            variant: 'error',
          });
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const verifyVerificationCode = () => {
    if (verificationCode === enteredVerificationCode) {
      enqueueSnackbar({
        message: 'Doğrulama kodu eşleşti. Şifrenizi değiştirebilirsiniz.',
        variant: 'success',
      });
      handleNext();
    } else {
      enqueueSnackbar({
        message: 'Doğrulama kodunu hatalı girdiniz.',
        variant: 'error',
      });
    }
  };

  const verifyNewPasswords = () => {
    if (newPassword === newRepassword) {
      socket
        .sendRequest('CHANGE_PATIENT_PASSWORD', {
          email: email,
          newPassword: newPassword,
        })
        .then(async (data) => {
          if (data) {
            enqueueSnackbar({
              message: 'Şifreniz yeni şifrenizle değiştirildi.',
              variant: 'success',
            });
          } else {
            enqueueSnackbar({
              message: 'Şifreniz değiştirilemedi.',
              variant: 'error',
            });
          }
        })
        .catch((err) => {
          enqueueSnackbar({
            message: 'Şifreniz değiştirilemedi.',
            variant: 'error',
          });
          console.error(err.message);
        });
        handleClose();
    } else {
      enqueueSnackbar({
        message: 'Yeni şifreniz tekrar şifresiyle aynı değil.',
        variant: 'error',
      });
    }
  };

  return (
    <BootstrapDialog
      //   onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openPasswordResetDialog}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {getStepTitle(activeStep)}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{getStepContent(activeStep)}</DialogContent>
      <DialogActions>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {getStepButton(activeStep)}
        </Box>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default PasswordResetDialog;
