import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { socket } from '../services/socketServices';

const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (user.name?.trim() === '') {
            reject();
          } else {
            resolve(user);
          }
        }, 200);
      }),
    []
  );
};

function computeMutation(newRow, oldRow) {
  if (newRow.name !== oldRow.name) {
    return `'${oldRow.name}' olan Adı '${newRow.name}' olarak değiştirilecektir.`;
  }
  if (newRow.surname !== oldRow.surname) {
    return `'${oldRow.surname}' olan Soyadı '${newRow.surname}' olarak değiştirilecektir.`;
  }
  if (newRow.tcnumber !== oldRow.tcnumber) {
    return `'${oldRow.tcnumber}' olan T.C. Kimlik No '${newRow.tcnumber}' olarak değiştirilecektir.`;
  }
  if (newRow.username !== oldRow.username) {
    return `'${oldRow.username}' olan Kullanıcı Adı '${newRow.username}' olarak değiştirilecektir.`;
  }
  if (newRow.polyclinic !== oldRow.polyclinic) {
    return `'${oldRow.polyclinic}' olan poliklinik '${newRow.polyclinic}' olarak değiştirilecektir.`;
  }
  if (newRow.polyclinicName !== oldRow.polyclinicName) {
    return `'${oldRow.polyclinicName}' olan poliklinik '${newRow.polyclinicName}' olarak değiştirilecektir.`;
  }
  if (newRow.gender !== oldRow.gender) {
    return `'${oldRow.gender}' olan cinsiyet '${newRow.gender}' olarak değiştirilecektir.`;
  }
  if (newRow.bloodGroup !== oldRow.bloodGroup) {
    return `'${oldRow.bloodGroup}' olan kan grubu '${newRow.bloodGroup}' olarak değiştirilecektir.`;
  }
  if (newRow.birthplace !== oldRow.birthplace) {
    return `'${oldRow.birthplace}' olan doğum yeri '${newRow.birthplace}' olarak değiştirilecektir.`;
  }
  if (newRow.birthdate !== oldRow.birthdate) {
    return `'${oldRow.birthdate}' olan doğum tarihi '${newRow.birthdate}' olarak değiştirilecektir.`;
  }
  if (newRow.phoneNumber !== oldRow.phoneNumber) {
    return `'${oldRow.phoneNumber}' olan telefon numarası '${newRow.phoneNumber}' olarak değiştirilecektir.`;
  }
  if (newRow.address !== oldRow.address) {
    return `'${oldRow.address}' olan adres '${newRow.address}' olarak değiştirilecektir.`;
  }
  return null;
}

export default function AskConfirmationBeforeSave({
  rows,
  columns,
  selectionModel,
  setSelectionModel,
  socketUpdateMethodName,
}) {
  const mutateRow = useFakeMutation();
  const noButtonRef = React.useRef(null);
  const [promiseArguments, setPromiseArguments] = React.useState(null);

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = React.useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    []
  );

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      socket
        .sendRequest(socketUpdateMethodName, newRow)
        .then(async (data) => {
          if (data) {
            const response = await mutateRow(newRow);
            setSnackbar({
              children: 'Başarıyla kaydedildi',
              severity: 'success',
            });
            resolve(response);
            setPromiseArguments(null);
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
      // Make the HTTP request to save in the backend
    } catch (error) {
      setSnackbar({ children: 'Boş olamaz', severity: 'error' });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleEntered = () => {
    // The `autoFocus` is not used because, if used, the same Enter that saves
    // the cell triggers "No". Instead, we manually focus the "No" button once
    // the dialog is fully open.
    // noButtonRef.current?.focus();
  };
  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={true}
      >
        <DialogTitle>Emin misin?</DialogTitle>
        <DialogContent dividers>{`'Evet'e basmak, ${mutation}`}</DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            Hayır
          </Button>
          <Button onClick={handleYes}>Evet</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      {renderConfirmDialog()}
      <DataGrid
        sx={{ height: 400, width: '100%' }}
        rows={rows}
        columns={columns}
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
      />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}
