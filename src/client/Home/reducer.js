import produce from "immer"

const defaultState = {
  newsList: ["yyy", "uuu", "ppp"],
  name: "frank",
  songs: [],
}

const homeReducer = produce((draft, action) => {
  if (action.type === "ADD_SONGS") {
    const data = Array.isArray(action.data) ? [...action.data] : [action.data]
    // eslint-disable-next-line no-param-reassign
    draft.songs = data
  }
  if (action.type === "ADD_NEWS") {
    const data = Array.isArray(action.data) ? [...action.data] : [action.data]
    // eslint-disable-next-line no-param-reassign
    draft.newsList.push(...data)
  }
}, defaultState)

export default homeReducer