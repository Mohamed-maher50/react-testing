import { useEffect, useState } from "react";
import { User } from "../entities";
import UserList from "./UserList";

const AllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isError, setIsError] = useState<null | Error>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/users")
      .then(async (response) => await response.json())
      .then((data) => setUsers(data))
      .catch((error) => setIsError(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error {isError?.message}</div>;

  return (
    <div>
      <UserList users={users} />
    </div>
  );
};

export default AllUsers;
