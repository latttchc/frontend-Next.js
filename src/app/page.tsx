'use client';
import { useQuery } from "@tanstack/react-query";
import apiRouter from "@/api/router";

export default function Home() {
  const { data } = useQuery({
    queryKey: ['getUsers'],
    queryFn: apiRouter.users.getUsers,
  });

  console.log(data);

  return (
    <main className="flex min-h-screen flex-col gap-[32px] justify-between items-center p-24">
      Hello
    </main>
  );
}
