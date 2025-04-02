export function getPets(
    client, 
   ) {
    return client
      .from('pets')
      .select(`
        animalID, 
        name, 
        species, 
        sex, 
        activityLevel, 
        energyLevel, 
        age, 
        size, 
        breed, 
        primaryBreed, 
        secondaryBreed, 
        animalLocation, 
        pictures, 
        birthdate, 
        descriptionPlain, 
        orgID, 
        housetrained, 
        declawed, 
        specialNeeds, 
        obedienceTraining
      `)
      .throwOnError();
   }