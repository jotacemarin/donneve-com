import { useEffect, useState } from "react";
import { getAuth } from "../api/donneve";

export const useGetAuth = (userId) => {
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isCreator, setIsCreator] = useState(null);
  const [isMember, setIsMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetch(userId) {
    setIsAdmin(null);
    setIsCreator(null);
    setIsMember(null);
    setLoading(true);
    setError(null);

    try {
      const data = await getAuth(userId);
      const { username, is_admin, is_creator, is_member } = data;

      setLoading(false);
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
    username,
    isAdmin,
    isCreator,
    isMember,
    loading,
    error,
  };
};

export default useGetAuth;
