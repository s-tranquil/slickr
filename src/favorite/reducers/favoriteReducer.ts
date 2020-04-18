import {
    FavoriteActionType,
    IFavoriteAction,
    IFavoriteState
} from "favorite/contracts";

function favoriteReducer(state: IFavoriteState, action: IFavoriteAction) {
    switch (action.type) {
        case FavoriteActionType.Add:
            return {
                ...state,
                items: [
                    ...state.items,
                    action.payload
                ]
            };
        case FavoriteActionType.Remove:
            {
                const filtered = state.items.filter(item => 
                    item.id !== action.payload.id);
                
                return {
                    ...state,
                    items: filtered
                };
            }
        default:
            throw new Error();
    }
}

export { favoriteReducer };
