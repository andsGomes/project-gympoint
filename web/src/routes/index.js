import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Students from '~/pages/Students';
import StudentForm from '~/pages/StudentForm';
import Plans from '~/pages/Plans';
import PlanForm from '~/pages/PlanForm';
import Registers from '~/pages/Registers';
import RegisterForm from '~/pages/RegisterForm';
import helpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/student" exact component={StudentForm} isPrivate />
      <Route path="/student/:id" exact component={StudentForm} isPrivate />
      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plan" exact component={PlanForm} isPrivate />
      <Route path="/plan/:id" exact component={PlanForm} isPrivate />
      <Route path="/registrations" exact component={Registers} isPrivate />
      <Route path="/registration" exact component={RegisterForm} isPrivate />
      <Route path="/helpOrders" exact component={helpOrders} isPrivate />
      <Route
        path="/registration/:id"
        exact
        component={RegisterForm}
        isPrivate
      />
    </Switch>
  );
}
