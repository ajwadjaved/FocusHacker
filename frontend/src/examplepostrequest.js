const postData = {
    entry: 'Example Entry',
    tag: 'Example Tag',
    description: 'Example Description',
    time_taken: 10,
  };
  
  fetch('http://localhost:8000/api/save-entry/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(postData),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Handle the response from the backend
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle the error
    });
  