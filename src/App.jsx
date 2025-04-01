import './App.css';
import { useUser } from '@clerk/clerk-react';
import useSurveyResponsesQuery from './Hooks/useSurveyResponsesQuery';
import { useUpdateSurveyResponse } from './Hooks/useUpdateSurveyResponse';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import { json } from "./json";
import Login from './Components/Login';

function App() {
  const { user } = useUser();
  const user_id = user?.id;
  const {
    data,
    isLoading,
    isError,
  } = useSurveyResponsesQuery(user?.id);
  const updateSurveyResponse = useUpdateSurveyResponse();

  const survey = new Model(json);
  survey.onComplete.add((sender) => {
    const results = sender.data; 
    console.log("Survey Results:", results);
    alert("Survey completed!");
    updateSurveyResponse.mutate({user_id, answers: results}) //Supabase REQUIRES for the fields passed to have the SAME name. (pass results as "answers")
  });

  if (isError) {
    return (
      <div className="app">
        <Login />
        <h1>Error</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="app">
        <Login />
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="app">
        <Login />
        <h1>No data found</h1>
      </div>
    );
  }

  return (
    <div className="app">
      <Login />
      <div className="data">
        <h1>Survey Responses</h1>
        <h2>User: {data.user_id}</h2>
        <ul>
          {Object.entries(data?.answers).map(([question, answer]) => (
            <li key={question}>
              <strong>{question}:</strong> <span>{answer}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className='survey-modal'>
        <Survey model={survey} />
      </div>
    </div>
  );
}

export default App;
