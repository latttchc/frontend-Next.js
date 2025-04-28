'use client';
import { useQuery, useMutation } from "@tanstack/react-query";
import apiRouter from "@/api/router";


export default function Home() {
  const { data, refetch } = useQuery({
    queryKey: ['getUsers'],
    queryFn: apiRouter.users.getUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: apiRouter.users.deleteUser,
    onSuccess: () => {
      refetch();
    },
  })



  return (
    <main className="flex min-h-screen flex-col gap-4 items-center p-24">
      <ul className="text-center w-96">
        {data?.map((user) => (
          <li className="flex border-b border-gray-800 py-4 justify-between gap-2" key={user.id}>
            <span className="text-white text-bold">{user.name}</span>
            <span className="">{user.email}</span>
            <button
              className=""
              onClick={() => deleteMutation.mutate(user)}
            >Delete</button>
          </li>
        ))}
      </ul>
    </main >
  );
}
