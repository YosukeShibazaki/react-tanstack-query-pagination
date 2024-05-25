import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import useLoading from '../hooks/useLoading';


const Loading = () => {
  const { isLoading, closeLoading } = useLoading();

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
      onClick={closeLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default Loading