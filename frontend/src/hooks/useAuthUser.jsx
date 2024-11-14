import { useQuery } from '@tanstack/react-query'

const useAuthUser = () => {
    const { data: authUser, isLoading, isError, error } = useQuery({
        queryKey: ['authUser'],
        queryFn: async () => {
            try {
                const res = await fetch("/api/auth/check-auth", {
                    method: 'GET'
                })
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.error) || "Something went wrong"
                }
                return data
            } catch (error) {
                throw new Error(error) || "Something went wrong"
            }
        }
    })
    return { authUser, isLoading, isError, error }
}

export default useAuthUser