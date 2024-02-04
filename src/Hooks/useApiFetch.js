import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const useApiFetch = () => {
  const navigate = useNavigate()

  const fetchData = async (url, options) => {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (response.ok) {
        return data;
      } else if (response.status === 401) {
        if(localStorage.getItem('token')){
          message.info('Sesion Expirada')
        }
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/auth');
      }

    } catch (e) {
      console.error('error:', e);
    }
  };

  return fetchData;
};

export default useApiFetch;