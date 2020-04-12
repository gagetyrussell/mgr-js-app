import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import UserPage from "./containers/UserPage";
import UploadDataPage from "./containers/UploadDataPage";
import ReportBuilderV1 from "./containers/ReportBuilderV1";
import AssteManagement from "./containers/AssteManagement"
import ChartEditor2 from "./containers/ChartEditor2"
import Covid19Editor from "./containers/Covid19Editor"


export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AppliedRoute path="/notes/new" exact component={NewNote} appProps={appProps} />
      <AppliedRoute path="/user" exact component={UserPage} appProps={appProps} />
      <AppliedRoute path="/uploaddata" exact component={UploadDataPage} appProps={appProps} />
      <AppliedRoute path="/ReportBuilderV1" exact component={ReportBuilderV1} appProps={appProps} />
      <AppliedRoute path="/AssteManagement" exact component={AssteManagement} appProps={appProps} />
      <AppliedRoute path="/ChartEditor2" exact component={ChartEditor2} appProps={appProps} />
      <AppliedRoute path="/Covid19Editor" exact component={Covid19Editor} appProps={appProps} />

      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}
