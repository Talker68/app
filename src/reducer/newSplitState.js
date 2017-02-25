import { SELECT_EXCERCISES_FOR_NEW_SPLIT, SELECT_DATE_FOR_NEW_SPLIT,
         ADD_SET_IN_NEW_SPLIT, DELETE_EXCERCISE_FROM_NEW_SPLIT, ADD_SPLIT,
         ADD, REMOVE, OPEN_EXCERCISE_SELECT, CLOSE_EXCERCISE_SELECT,
         OPEN_DATE_PICKER, CLOSE_DATE_PICKER } from '../constants'
import {} from '../helpers'
import { Record, OrderedMap } from 'immutable'

const StateModel = Record({
    'date': null,
    'selected': null,
    'excerciseSelectIsOpen': false,
    'snackBarIsOpen': false,
    'newSplitExcercises': new OrderedMap({})
})

export default (state = new StateModel({}), action) => {
    const { type, payload } = action

    switch(type) {
        case ADD_SPLIT:
            return state
                    .set('date', null)
                    .set('selected', null)
                    .set('snackBarIsOpen', true)
                    .set('newSplitExcercises', new OrderedMap({}))

        case SELECT_EXCERCISES_FOR_NEW_SPLIT:
            return state.set('selected', payload.selected)

        case SELECT_DATE_FOR_NEW_SPLIT:
            return state.set('date', payload.date)

        case ADD_SET_IN_NEW_SPLIT:
            return state
                    .updateIn(['newSplitExcercises', payload.currentExcercise], excercise => {
                        if (!excercise) return {
                                'name': payload.currentExcercise,
                                'id': payload.excerciseId,
                                'sets': [`${payload.weight}x${payload.times}`]
                            }
                        return {
                            ...excercise,
                            'sets': excercise.sets.concat(`${payload.weight}x${payload.times}`)
                        }
                    })

        case DELETE_EXCERCISE_FROM_NEW_SPLIT:
            return state
                    .deleteIn(['newSplitExcercises', payload.excercise])

        case OPEN_EXCERCISE_SELECT:
            return state.set('excerciseSelectIsOpen', true)

        case CLOSE_EXCERCISE_SELECT:
            return state.set('excerciseSelectIsOpen', false)

    }

    return state
}