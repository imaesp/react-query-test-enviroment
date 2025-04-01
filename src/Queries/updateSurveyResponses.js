export function updateSurveyResponses(client, user_id, answers) {
    return client
      .from("survey_responses")
      .update({ answers })
      .eq("user_id", user_id)
      .select()
      .throwOnError();
   }
   