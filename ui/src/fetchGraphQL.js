export default async function fetchGraphQL(query, variables = {}) {
    try {
      const response = await fetch(window.ENV.UI_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
      });
      const result = await response.json();
  
      if (result.errors) {
        const error = result.errors[0];
        alert('Error while quering - ', error);
      }
      return result.data;
    } catch (e) {
      alert(`Error in data sending -  ${e.message}`);
      return null;
    }
  }