'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import apiRouter from "@/api/router";
import CancelButton from "@/components/CancelButton";

const defaultState = {
    name: '',
    email: '',
}

export default function NewUser() {
    const [state, setState] = useState(defaultState);
    const { name, email } = state;

    const router = useRouter();

    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: apiRouter.users.createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getUsers'] });
            router.push('/');
        },
    })

    return (
        <main className="flex min-h-screen flex-col gap-4 items-center p-24">
            <h1 className="text-4xl">New User</h1>

            <form className="rounded-xl bg-gray-900 p-4 flex flex-col gap-2 justify-center w-72">
                <div className="flex flex-col">
                    <label>Name</label>
                    <input className="bg-white text-black" type="text" value={name} onChange={(e) => setState((prevState) => ({
                        ...prevState,
                        name: e.target.value,
                    }))} />
                </div>

                <div className="flex flex-col">
                    <label>Email</label>
                    <input className="bg-white text-black" type="text" value={email} onChange={(e) => setState((prevState) => ({
                        ...prevState,
                        email: e.target.value,
                    }))} />

                    <button
                        className="bg-blue-500 text-white rounded-md p-2 mt-4"
                        onClick={(e) => {
                            e.preventDefault();
                            createMutation.mutate({
                                name,
                                email,
                            });
                        }}>
                        Save
                    </button>
                </div>
            </form>
            <CancelButton />
        </main >
    );
}