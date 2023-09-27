import { combineReducers } from "redux";
import AuthReducer from "./auth/auth.reducer.js";
import ConfigReducer from "./config/config.reducer";
import ServicesReducer from "./services/service.reducer";
import CitiesReducer from "./cities/city.reducer";
import ServiceInfoReducer from "./serviceInfo/serviceInfo.reducer";
import OrdersReducer from "./sellList/sellList.reducer";
import RequestsReducer from "./requestList/requestList.reducer";
import UsersReducer from "./users/users.reducer";
import DiscountReducer from "./discount/discount.reducer";
import PayReducer from "./pay/pay.reducer";
import DeclarationReducer from "./declaration/declaration.reducer";
import CleaningReducer from "./cleaning/cleaning.reducer";
import ClearingsReducer from "./clearings/clearings.reducer";
import ClientReducer from "./clientList/clientList.reducer";
import SupervisorReducer from "./supervisor/supervisor.reducer";
import DriverReducer from "./driver/driver.reducer";
import RolesReducer from "./roles/roles.reducer";

export default combineReducers({
  Auth: AuthReducer,
  Config: ConfigReducer,
  Services: ServicesReducer,
  Cities: CitiesReducer,
  ServiceInfo: ServiceInfoReducer,
  Orders: OrdersReducer,
  Requests: RequestsReducer,
  Users: UsersReducer,
  Discount: DiscountReducer,
  Pay: PayReducer,
  Declaration: DeclarationReducer,
  Cleaning: CleaningReducer,
  Clearings: ClearingsReducer,
  Client: ClientReducer,
  Supervisor: SupervisorReducer,
  Driver: DriverReducer,
  Roles: RolesReducer,
});
