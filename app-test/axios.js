const axios = require('axios');

(async () => {
  try {
    const { data } = await axios.post('http://localhost:4000/auth/login', {
      email: 'first@gmail.com', username: 'first na d', password: 'secret password'
    })
    console.log({ data })
  } catch(err) { console.log(err) }
})()
