import { AsyncStorage } from 'react-native'

export async function callWebApi (args) {
  const token = await _retrieveData()
  console.log('GET TOKEN:', token)
  const result = await fetch(`http://docspace.xyz/api${args.endpoint}`, getFetchArgs({token,...args}))
  return result
}

_retrieveData = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      return token
    }
   } catch (error) {
     console.log('error with get token',error)
   }
}

function getFetchArgs (args) {
  let headers
  if (args.login) {
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  } else {
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${args.token}`
      }
  }
  const { body, method } = args

  return {
    method,
    headers,
    body
  }
}
