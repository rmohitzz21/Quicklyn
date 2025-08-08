// utils/AxiosToastError.js
import toast from 'react-hot-toast';

const AxiosToastError = (error) => {
  // Handle validation/server errors
  if (error.response) {
    // Backend responded with a status code not in 200 range
    const message = error.response.data?.message || 'Server error';
    toast.error(message);
  } else if (error.request) {
    // The request was made but no response
    toast.error('Network error - no response from server');
  } else {
    // Something else happened
    toast.error(error.message);
  }
};

export default AxiosToastError;
