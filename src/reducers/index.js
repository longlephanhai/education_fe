import { combineReducers } from "redux"
import { role } from "./role.reducer";
import { login } from "./login.ruducer";
import { refReducer } from "./tour.reducer";
import { tourReducer } from "./startTour.reducer";

export const allReducers = combineReducers({
    role,
    login,
    refReducer,
    tourReducer
});