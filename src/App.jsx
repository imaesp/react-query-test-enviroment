import './App.css';
import { useUser } from '@clerk/clerk-react';
import useSurveyResponsesQuery from './Hooks/useSurveyResponsesQuery';
import { useUpdateSurveyResponse } from './Hooks/useUpdateSurveyResponse';
import useGetPets from './Hooks/useGetPets';
import useGetOrganizationByID from './Hooks/useGetOrganizationByID';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import { json } from "./json";
import Login from './Components/Login';

function App() {
  const { user } = useUser();
  const user_id = user?.id;

  // Survey Responses Hook
  const { data, isLoading, isError } = useSurveyResponsesQuery(user_id);
  const updateSurveyResponse = useUpdateSurveyResponse();

  // Pets Hook
  const { data: pets, isLoading: isPetsLoading, isError: isPetsError } = useGetPets();

  let testPet = null;
  let petToDisplay = null;
  if (!isPetsLoading && pets?.length > 0) {
    testPet = pets[2]?.orgID || null;
    petToDisplay = pets[2] || null;
  } else {
    console.warn("Pets data is empty or orgID missing!");
  }

  // Organization Hook (Only fetch if testPet exists)
  const {
    data: organizations,
    isLoading: isOrganizationsLoading,
    isError: isOrganizationsError
  } = useGetOrganizationByID(testPet ?? null);

  if (isOrganizationsLoading) {
    console.log("Fetching organization...");
  } else if (organizations) {
    console.log("Organization data:", organizations);
  } else {
    console.warn("No organization data found!");
  }

  const survey = new Model(json);
  survey.onComplete.add((sender) => {
    const results = sender.data;
    console.log("Survey Results:", results);
    alert("Survey completed!");
    updateSurveyResponse.mutate({ user_id, answers: results });
  });

  if (isError || isPetsError || isOrganizationsError) {
    return (
      <div className="app">
        <Login />
        <h1>Error fetching data</h1>
      </div>
    );
  }

  if (isLoading || isPetsLoading || isOrganizationsLoading) {
    return (
      <div className="app">
        <Login />
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!data || !pets) {
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
      <div className="pet">
        {petToDisplay && (
          <>
            <h2>{petToDisplay.name}</h2>
            <p><strong>Species:</strong> {petToDisplay.species}</p>
            <p><strong>Sex:</strong> {petToDisplay.sex}</p>
            <p><strong>Age:</strong> {petToDisplay.age}</p>
            <p><strong>Size:</strong> {petToDisplay.size}</p>
            <p><strong>Breed:</strong> {petToDisplay.breed}</p>
            <p><strong>Activity Level:</strong> {petToDisplay.activityLevel}</p>
            <p><strong>Energy Level:</strong> {petToDisplay.energyLevel}</p>
            <p><strong>Housetrained:</strong> {petToDisplay.housetrained}</p>
            <p><strong>Obedience Training:</strong> {petToDisplay.obedienceTraining}</p>
            <p><strong>Description:</strong> {petToDisplay.descriptionPlain}</p>
          </>
        )}
      </div>
      <div className="organization">
        <h2>{organizations?.name}</h2>
        {organizations && (
          <>
            <p><strong>ID:</strong> {organizations.orgID}</p>
            <p><strong>Address:</strong> {organizations.address}, {organizations.city}, {organizations.state} {organizations.zip}, {organizations.country}</p>
            <p><strong>Phone:</strong> {organizations.phone}</p>
            <p><strong>Email:</strong> <a href={`mailto:${organizations.email}`}>{organizations.email}</a></p>
            <p><strong>Website:</strong> <a href={`https://${organizations.orgurl}`} target="_blank" rel="noopener noreferrer">{organizations.orgurl}</a></p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
