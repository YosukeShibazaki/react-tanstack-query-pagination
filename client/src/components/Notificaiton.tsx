import Snackbar from '@mui/material/Snackbar';
import useNotification from '../hooks/useNotification';

const Notificaiton = () => {
  const { isShow, message, closeNotification } = useNotification();

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={isShow}
      onClose={closeNotification}
      message={message}
    />
  )
}

export default Notificaiton