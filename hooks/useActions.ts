import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import actionsCreators from "../store/actions-creators/index";

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actionsCreators, dispatch);
}