import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./Private";
import LoadingSplash from "../components/loading/LoadingSplash";
import Sidebar from "../layout/sidebar/Sidebar";
// Pages
import DashBoard from "../pages/dashboard/DashBoard";
import DiscountCode from "../pages/discountCode/DiscountCode";
import Login from "../pages/loginPage/Login";
import MasterStatisticalReport from "../pages/masterStatisticalReport/MasterStatisticalReport";
import MasterTransaction from "../pages/masterTransaction/MasterTransaction";
import PaymentList from "../pages/paymentList/PaymentList";
import RequestList from "../pages/requestList/RequestList";
import SellList from "../pages/sellList/SellList";
import ServiceInfo from "../pages/serviceInfo/ServiceInfo";
import ServiceList from "../pages/serviceList/ServiceList";
import SystemSetting from "../pages/SystemSetting/SystemSetting";
import TransactionList from "../pages/transactionList/TransactionList";
import UsersList from "../pages/usersList/UsersList";
import NotFound from "../pages/404/NotFound";
import AddDiscountCode from "../pages/addDiscountCode/AddDiscountCode";
import AddOrder from "../pages/addOrder/AddOrder";
import AddService from "../pages/addService/AddService";
import AppSetting from "../pages/appSetting/AppSetting";
// path
import * as paths from "./path";
import { useDispatch, useSelector } from "react-redux";
import { CheckSession } from "../store/auth/auth.action";
import SupervisorList from "../pages/supervisorList/SupervisorList";
import DriverList from "../pages/driverList/DriverList";
import MasterStatus from "../pages/masterStatus/MasterStatus";
import AddMaster from "../pages/addMaster/AddMaster";
import DriverDetail from "../pages/driverDetail/DriverDetail";
import RoleUser from "../pages/roleUser/RoleUser";
import UserDetail from "../pages/userDetail/UserDetail";
import sellDetail from "../pages/sellDetail/sellDetail";

export default function Routes() {
  const [Loading, setLoading] = useState(true);
  const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CheckSession());
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [Auth?.profile?.status]);
  return (
    <>
      {Loading ? (
        <LoadingSplash />
      ) : (
        <Switch>
          <PrivateRoute path={paths.DashBoard} component={DashBoard} />
          <PrivateRoute path={paths.ServiceList} component={ServiceList} />
          <PrivateRoute path={paths.AddService} component={AddService} />
          <PrivateRoute path={paths.ServiceInfo} component={ServiceInfo} />
          <PrivateRoute path={paths.SellList} component={SellList} />
          <PrivateRoute path={paths.sellDetail} component={sellDetail} />
          <PrivateRoute path={paths.RequestList} component={RequestList} />
          <PrivateRoute path={paths.AddOrder} component={AddOrder} />
          <PrivateRoute path={paths.DiscountCode} component={DiscountCode} />
          <PrivateRoute path={paths.AddDiscountCode} component={AddDiscountCode}/>
          <PrivateRoute path={paths.SystemSetting} component={SystemSetting} />
          <PrivateRoute path={paths.AppSetting} component={AppSetting} />
          <PrivateRoute path={paths.MasterTransaction} component={MasterTransaction}/>
          <PrivateRoute path={paths.TransactionList} component={TransactionList}/>
          <PrivateRoute path={paths.MasterStatisticalReport} component={MasterStatisticalReport}/>
          <PrivateRoute path={paths.PaymentList} component={PaymentList} />
          <PrivateRoute path={paths.ClientList} component={UsersList} />
          <PrivateRoute path={paths.SupervisorList} component={SupervisorList}/>
          <PrivateRoute path={paths.DriverList} component={DriverList} />
          <PrivateRoute path={paths.MasterStatus} component={MasterStatus} />
          <PrivateRoute path={paths.AddMaster} component={AddMaster} />
          <PrivateRoute path={paths.DriverDetail} component={DriverDetail} />
          <PrivateRoute path={paths.MasterDetail} component={UserDetail} />
          <PrivateRoute path={paths.RoleUser} component={RoleUser} />
          
          <Route exact path={paths.baseUrl}>
            <Redirect to={paths.LoginPage} />
          </Route>
          <Route exact path={paths.LoginPage} component={Login} />
          <Route path={paths.NotFound} component={NotFound} />
          <Redirect from="*" to={paths.NotFound} />
        </Switch>
      )}
    </>
  );
}
