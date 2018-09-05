import { AsyncStorage } from 'react-native'

export async function callWebApi (args) {
  const result = await fetch(args.endpoint, getFetchArgs(args))
  return result
}

const getToken = async () => {
  try {
    return await AsyncStorage.getItem('token')
  } catch(error) {
    console.warn('error with get token',error)
  }
}

const token = getToken()

function getFetchArgs (args) {
  const headers = !args.hasOwnHeaders
    ? {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    : {
      'Authorization': `Bearer ${token}`
    }
  console.log('in helper', headers)
  const { body, method } = args

  return {
    method,
    headers,
    body
  }
}
