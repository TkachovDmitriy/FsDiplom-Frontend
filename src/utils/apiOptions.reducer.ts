import { Action } from 'redux'
import { createReducer } from 'redux-create-reducer'
import { formatOptions } from '~/utils/functions'

export enum ActionsTypes {
  SET_GENERATIONS = 'dashboard::SET_GENERATIONS',
  UPDATE_OPTIONS = 'dashboard::UPDATE_OPTIONS',
  RESET_OPTIONS = 'dashboard::OPTIONS_OPTIONS'
}

// types
interface SetAction extends Action {
  type: ActionsTypes.SET_GENERATIONS
  payload?: any
}

interface UpdateAction extends Action {
  type: ActionsTypes.UPDATE_OPTIONS
  payload?: any
}

interface ResetAction extends Action {
  type: ActionsTypes.RESET_OPTIONS
}

type ActionsUnion = SetAction | UpdateAction | ResetAction

// actions
export const setGenerations = (data): SetAction => ({
  type: ActionsTypes.SET_GENERATIONS,
  payload: data
})

type UpdateData = {
  generation: string
  power: string
  engine: string
  fuel: string
}

type OptionsData = {
  generation?: [string]
  power: [string]
  engine: [string]
  fuel: [string]
}

export const updateOptions = (data: UpdateData): UpdateAction => ({
  type: ActionsTypes.UPDATE_OPTIONS,
  payload: data
})

export const resetGenerations = (): ResetAction => ({
  type: ActionsTypes.RESET_OPTIONS
})

// initialState
export type State = {
  generations: []
  generationOptions: Option[]
  engineOptions: Option[]
  powerOptions: Option[]
  fueltypeOptions: Option[]
}

export const initialState: State = {
  generations: [],
  generationOptions: [],
  engineOptions: [],
  powerOptions: [],
  fueltypeOptions: []
}

export const init = (i: State): State => i

// helpers
const getGenerationOptions = (generations): Option[] =>
  formatOptions(generations.map((generation) => generation.name))

const getModifications = (generations): [] =>
  generations.reduce((acc: [], gen: any) => {
    let result: any[] = acc

    if (gen?.modifications?.modification) {
      result = [
        ...acc,
        ...(gen.modifications.modification?.length
          ? gen.modifications.modification
          : [gen.modifications.modification])
      ]
    }

    return result as []
  }, [])

const getOptions = (modifications, data): OptionsData =>
  modifications.reduce(
    (acc: {}, mod: {}) => {
      const entries = Object.entries(data)
      const condition = entries.every(
        ([key, value]) => mod[key] === value || !value
      )
      if (condition) {
        entries.forEach(([key, value]) => {
          if (!value && !!mod[key] && !acc[key]?.includes(mod[key])) {
            acc[key].push(mod[key])
          }
        })
      }

      return acc
    },
    {
      generation: [],
      engine: [],
      power: [],
      fuel: []
    }
  )

// reducer
const dashboardReducer = createReducer<State, ActionsUnion>(initialState, {
  [ActionsTypes.SET_GENERATIONS]: (state, { payload }) => {
    const generation = payload?.data?.[0]?.generation || []
    const generations = generation?.length ? generation : [generation]

    const modifications = getModifications(generations)

    const options = modifications.reduce(
      (acc, { engine, fuel, power }) => {
        if (engine) acc.engine.push(engine)
        if (power) acc.power.push(power)
        if (fuel) acc.fuel.push(fuel)

        return acc
      },
      {
        engine: [],
        power: [],
        fuel: []
      }
    )

    return {
      ...state,
      generations: generations,
      generationOptions: getGenerationOptions(generations),
      engineOptions: formatOptions([...new Set(options.engine)] as [string]),
      powerOptions: formatOptions([...new Set(options.power)] as [string]),
      fueltypeOptions: formatOptions([...new Set(options.fuel)] as [string])
    }
  },
  [ActionsTypes.UPDATE_OPTIONS]: (state, { payload }) => {
    const modifications = getModifications(state.generations)

    const options = getOptions(modifications, payload)

    return {
      ...state,
      engineOptions: formatOptions(options.engine),
      powerOptions: formatOptions(options.power),
      fueltypeOptions: formatOptions(options.fuel),
      generationOptions: formatOptions(options.generation)
    }
  },
  [ActionsTypes.RESET_OPTIONS]: (): State => init({ ...initialState })
})

export default dashboardReducer
