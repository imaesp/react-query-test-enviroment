import { getSurveyResponses } from "../Queries/getSurveyResponses";
import useSupabase from "../Supabase/useSupabase";
import { useQuery } from "@tanstack/react-query";


function useSurveyResponsesQuery(user_id) {
   const client = useSupabase();
   const queryKey = ["userSurveyResponses", user_id];


   return useQuery({
       queryKey,
       queryFn: async () => {
           if (!user_id) return null;
           const result = await getSurveyResponses(client, user_id);
           return result?.data || null;
       },
       //Only fetch when user_id is True
       enabled: !!user_id,
       //Cache data for 5 minutes before re-fetching
       staleTime: 1000 * 60 * 5,
       //Rules go here
   });
}


export default useSurveyResponsesQuery;