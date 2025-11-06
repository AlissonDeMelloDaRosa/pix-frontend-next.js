import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
}
interface ListUserProps {
  users: User[];
}
export function UserList ({ users }: ListUserProps) {
  return (
    <ul>
        {users.map((user) => (
            <li key={user.id}>
                <strong>{user.name}</strong> - {user.email}
            </li>
        ))}
    </ul>
  );
}