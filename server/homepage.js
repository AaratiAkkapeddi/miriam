import fetch from 'node-fetch';
const MAX_RECORDS = 500;

exports.handler = async (event) => {
  const response = await fetch(`https://api.airtable.com/v0/apprjbiiZGRAW9lxA/homepage_carousel?maxRecords=${MAX_RECORDS}&view=Grid%20view`, { headers: new Headers({ 'Authorization': 'Bearer ' + process.env.REACT_APP_PAT })}
)
  const data = await response.text();

  return { statusCode: 200, body: data};
}
