'use strict'

const axios = require('axios')

(async () => {

  const postData = await axios.post('http://localhost:3000/auth/register', {
    username: 'we 121 ', password: 'hello', seller: true
  })
  const getData = await axios.get('http://localhost:3000/auth', {
    headers: { authorization: `Bearer ${postData.data.token}` }
  })

  console.dir({ postData: postData.data, getData: getData.data })
})()
