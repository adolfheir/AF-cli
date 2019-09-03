
export default {
  namespace: 'page1',
  state: {
    text: "INIT TEXT"
  },
  effects: {
    * testActionSync({ payload }, { callAction, select }) {
      const { text } = yield select(state => state.page1)
      console.log("start testActionSync", text)
      yield callAction({ type: "page1/mockfetch" })
      const { text: newText } = yield select(state => state.page1)
      console.log("end testActionSync", newText)
    },
    * testActionSync2({ payload }, { put, take, select }) {
      const { text } = yield select(state => state.page1)
      console.log("start testActionSync", text)
      yield put({ type: 'mockfetch', })
      yield take('page1/mockfetch/@@end')
      const { text: newText } = yield select(state => state.page1)
      console.log("end testActionSync", newText)
    },
    * mockfetch({ payload }, { put, callAction, select }) {
      console.log("start mockfetch")
      let text = yield new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("CHANGE TEXT")
        }, 1000)
      })
      yield put({ type: "change", payload: { text } })
      console.log("end mockfetch")
    },
  }
}
