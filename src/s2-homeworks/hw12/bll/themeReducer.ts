export enum ThemeEnumAction {
  SET_THEME_ID = 'SET_THEME_ID',
}

export interface SetThemeAction {
  type: ThemeEnumAction
  themeId: number
}

export interface IThemeState {
  themeId: number
}

const initState: IThemeState = {
  themeId: 1,
}

export const themeReducer = (state = initState, action: SetThemeAction): IThemeState => {
  switch (action.type) {
    case ThemeEnumAction.SET_THEME_ID: {
      return {
        ...state,
        themeId: action.themeId,
      }
    }

    default:
      return state
  }
}

export const changeThemeId = (themeId: number): SetThemeAction => ({ type: ThemeEnumAction.SET_THEME_ID, themeId }) // fix any
