import {ActionCreatorsMapObject, bindActionCreators} from "redux";
import {useDispatch} from "react-redux";
import {useMemo} from "react";
import {AppDispatchType} from "../features/Application/types";

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useDispatch()

    return useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [actions, dispatch])
}

export const useAppDispatch = () => useDispatch<AppDispatchType>()
