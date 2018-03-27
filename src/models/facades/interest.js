import axios from 'axios/lib/axios'
export default (config) => {
  let app = config.app_options.development
  let path = `${app.app_protocol}${app.interestjs_base_path}${app.interestjs_interest_path}`

  return {
    list: (listId) => {
      return axios.get(`${path}?account_list_id=$eq.${listId}`)
    },
    get_interest: (interestId) => {
      return axios.get(`${path}/list?id=${interestId}`)
    },
    add_interest: (featureId, interest) => {
      return axios({
        method: 'post',
        url: `${path}/add`,
        data: {
          feature_id: featureId,
          account_customer_id: interest.account_customer_id,
          entity_id: interest.entity_id,
          metadata: interest.metadata
        },
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json'
        }
      })
    },
    update: (interestId, interest) => {
      return axios.put(`${path}/update`, {
        id: interestId,
        metadata: interest.metadata
      })
    },
    remove: (interestId) => {
      return axios.delete(`${path}/remove?id=${interestId}`)
    }
  }
}
