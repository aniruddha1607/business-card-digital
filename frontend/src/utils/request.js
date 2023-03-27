import axios from "axios";




export async function createUser( username, email, password ) {
    axios
      .post('http://localhost:1337/api/auth/local/register', {
        username: {username},
        email: {email},
        password: {password},
      })
      .then(response => {
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        const token = response.data.jwt
        return token;
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
      });
}

export async function login( email, password ) {
    const response = await axios
      .post('http://localhost:1337/api/auth/local', {
        identifier: 'test@test.com',
        password: 'Test1234'
      })
      .then(response => {
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
      });
      const token = response.data.jwt
      return token;
      
      
}