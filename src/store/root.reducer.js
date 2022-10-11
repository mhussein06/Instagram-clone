import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { profileReducer } from "./profile/profile.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
});

export default rootReducer;
