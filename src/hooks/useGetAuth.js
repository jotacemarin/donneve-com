import { useEffect, useState } from "react";
import { getAuth } from "../api/donneve";

export const useGetAuth = (userId) => {
  const [data, setData] = useState(null);
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isCreator, setIsCreator] = useState(null);
  const [isMember, setIsMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetch(userId) {
    setData(null);
    setIsAdmin(null);
    setIsCreator(null);
    setIsMember(null);
    setLoading(true);
    setError(null);

    try {
      const data = await getAuth(userId);
      const {
        username,
        is_member,
        is_admin,
        is_creator,
        id,
        id_tg,
        first_name,
        last_name,
        language_code,
        status,
        score,
        createdAt,
        updatedAt,
      } = data;

      const user = {
        id,
        idTg: id_tg,
        username,
        firstName: first_name,
        lastName: last_name,
        languageCode: language_code,
        status,
        score,
        createdAt,
        updatedAt,
      };

      setLoading(false);
      setData(user);
      setUsername(username);
      setIsAdmin(is_admin);
      setIsCreator(is_creator);
      setIsMember(is_member);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetch(userId);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return {
    data,
    username,
    isAdmin,
    isCreator,
    isMember,
    loading,
    error,
  };
};

export default useGetAuth;
