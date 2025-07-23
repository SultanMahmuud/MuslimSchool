import axios from 'axios';
import { useState } from 'react';
// import { toast } from 'react-toastify';

const useUpload = () => {
  const [file, setFile] = useState();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    // sending to the server
    const res = await axios.post(`${`${process.env.NEXT_PUBLIC_API_BASE_URL}/images`}`, formData);
    setLoading(false);
    alert('File is uploaded');
    setUrl(res.data);
  };

  return {
    handleSubmit,
    setFile,
    file,
    url,
    loading,
    setUrl
  };
};

export default useUpload;
