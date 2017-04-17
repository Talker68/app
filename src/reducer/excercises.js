import { DELETE_EXCERCISE, ADD_LINK, LOAD_EXCERCISES, ERROR } from '../constants'
import { normalizedExcercises } from '../fixtures'
import { arrayToMap } from '../helpers'
import { Record, OrderedMap } from 'immutable'

const ExcerciseModel = Record({
  "id": null,
  "title": null,
  "text": null
})

const defaultState = arrayToMap(normalizedExcercises, ExcerciseModel)

export default (state = new OrderedMap({}), action) => {
    const { type, payload, randomId, excercises } = action

    switch (type) {
      case LOAD_EXCERCISES:
        return state.merge(arrayToMap(excercises, ExcerciseModel))

      case LOAD_EXCERCISES + ERROR:
        return excerciseState

      case DELETE_EXCERCISE:
        return state.delete(payload.id)

      case ADD_LINK:
        return state.updateIn([payload.excerciseId, 'comments'], comments => comments.concat(randomId))
    }

    return state
}
