import { callWebApi } from '../helpers/requestHelper'
class PageService {
  getPages = () => {
    const args = { endpoint: 'http://docspace.xyz/api/pages', method: 'GET' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  getPage = (obj) => {
    const args = { endpoint: `http://docspace.xyz/api/pages/${obj.id}`, method: 'POST', body: JSON.stringify({version: obj.version}) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  createPage = (pageObj) => {
    const args = { endpoint: `/api/pages`, method: 'POST', body: JSON.stringify(pageObj) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  deletePage = (id) => {
    const args = { endpoint: `/api/pages/${id}`, method: 'DELETE' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  updatePage = (newPage) => {
    const args = { endpoint: `/api/pages/${newPage._id}`, method: 'PUT', body: JSON.stringify(newPage) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  // toAdd = true - adds LIKE , false - removes LIKE
  likePage = (pageId, userId, toAdd) => {
    const args = { endpoint: `/api/pages/like/${pageId}`, method: 'PUT', body: JSON.stringify({userId, toAdd}) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  search = (paramsObject) => {
    const args = { endpoint: `/api/pages/search`, method: 'POST', body: JSON.stringify(paramsObject) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }


  findByCriteria = (filter) => {
    const args = { endpoint: `/api/pages/search/${filter}`, method: 'GET' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  movePage = (pageId, fromSpaceId, toSpaceId) => {
    const args = { endpoint: `/api/pages/move/${pageId}`, method: 'PUT', body: JSON.stringify({fromSpaceId, toSpaceId}) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  copyPage = (pageId) => {
    const args = { endpoint: `/api/pages/copy/${pageId}`, method: 'PUT' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }
}
export default new PageService()
