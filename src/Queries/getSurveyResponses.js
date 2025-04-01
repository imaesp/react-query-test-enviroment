export function getSurveyResponses(client, user_id) {
    return client
      .from('survey_responses')
      .select(`
        user_id,
        answers
      `)
      .eq('user_id', user_id)
      .throwOnError()
      .maybeSingle();
   }
  
 