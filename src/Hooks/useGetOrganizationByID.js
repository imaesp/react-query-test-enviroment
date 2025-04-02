import { getOrganizationByID } from "../Queries/getOrganizationByID";
import useSupabase from "../Supabase/useSupabase";
import { useQuery } from "@tanstack/react-query";

function useGetOrganizationByID(orgID) {
    const client = useSupabase(); 
    const queryKey = ["orgID", orgID]; 

    return useQuery({
        queryKey,
        queryFn: async () => {
            const result = await getOrganizationByID(client, orgID); 
            return result?.data;
        },
        staleTime: 1000 * 60 * 5, 
    });
}

export default useGetOrganizationByID;