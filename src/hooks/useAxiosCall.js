import { useState, useCallback } from 'react';
import axios from 'axios';

const useAxiosMultiple = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [responses, setResponses] = useState([]);

  const makeRequests = useCallback(async (requests) => {
    setLoading(true);
    setErrors([]);
    setResponses([]);

    try {
      const results = await Promise.all(
        requests.map(async (request) => {
          try {
            const response = await axios(request);
            return { data: response.data, error: null };
          } catch (error) {
            return { data: null, error: error.response?.data || error.message };
          }
        })
      );

      const newResponses = results.map((result) => result.data).filter((data) => data !== null);
      const newErrors = results.map((result) => result.error).filter((error) => error !== null);

      setResponses(newResponses);
      setErrors(newErrors);
      return { responses: newResponses, errors: newErrors };
    } catch (err) {
      setErrors([err.message]);
      return { responses: [], errors: [err.message] };
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, errors, responses, makeRequests };
};

export default useAxiosMultiple;