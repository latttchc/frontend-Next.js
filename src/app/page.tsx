'use client';
import Image from "next/image";
import NextLink from "next/link";
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

      <div className="flex gap-4 items-center">
        <div className="bg-white w-24 h-24 rounded-full">
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={80}
            height={80}
            className="pt-11 pl-4"
          />
        </div>
        <h3>✖️</h3>
        <div className="bg-white w-24 h-24 rounded-full">
          <Image
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rails/rails-plain-wordmark.svg"
            alt="Rails Logo"
            width={80}
            height={80}
            className="pl-3.5 pt-3"
          />
        </div>
      </div>

      <ul className="text-center w-96">
        {data?.map((user) => (
          <li className="flex border-b border-gray-800 py-4 justify-between gap-2" key={user.id}>
            <NextLink className="text-white text-bold" href={`/users/${user.id}`}>
              {user.name}
            </NextLink>
            <span className="">{user.email}</span>
            <button
              className=""
              onClick={() => deleteMutation.mutate(user)}
            >Delete</button>
          </li>
        ))}
      </ul>

      <NextLink className="bg-yellow-500 text-white rounded-md p-2 mt-4" href="/users/new">
        New User
      </NextLink>
    </main >
  );
}
