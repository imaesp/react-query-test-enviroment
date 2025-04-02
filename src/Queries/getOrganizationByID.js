export function getOrganizationByID(
    client, 
    orgID
   ) {
    return client
      .from('organizations')
      .select(`
        orgID, 
        name, 
        city, 
        state, 
        address, 
        country, 
        zip, 
        email, 
        phone, 
        orgurl
      `)
      .eq('orgID', orgID)
      .throwOnError()
      .maybeSingle();
   }
   
   