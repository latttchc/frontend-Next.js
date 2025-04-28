'use client'
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import apiRouter from "@/api/router";
import CancelButton from "@/components/CancelButton";

const defaultState = {
    name: '',
    email: '',
}

export default function EditUser() {
    const params = useParams<{ userId: any }>();
    const userId = params.userId;

    const router = useRouter();

    const [state, setState] = useState(defaultState);
    const { name, email } = state;

    const { data, isLoading, status } = useQuery({
        queryKey: ['getUsers', userId],
        queryFn: () => apiRouter.users.getUser(userId),
    });

    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: apiRouter.users.updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getUsers',] });
            router.push('/');
        },
    })

    useEffect(() => {
        if (status === 'success') {
            setState({
                name: data?.name || '',
                email: data?.email || '',
            })
        }
    }, [status])


    return (
        <main className="flex min-h-screen flex-col gap-4 items-center p-24">
            <h1 className="text-4xl">{data?.name}</h1>

            {!isLoading && (
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
                                updateMutation.mutate({
                                    id: data?.id,
                                    name,
                                    email,
                                })
                            }}>
                            Save
                        </button>
                    </div>
                </form>
            )}
            <CancelButton />
        </main >
    );
}