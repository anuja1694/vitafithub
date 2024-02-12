import React from "react";
import "./index.css";
import Home from "./routes/User/Home";
import Landing from "./routes/User/Landing";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Activities from "./routes/User/Activities";
import Trainers from "./routes/User/Trainers";
import Products from "./routes/User/Products";
import Kidsslot from "./routes/User/Kidsslot";
import Profile from "./routes/User/Profile";
import Membership from "./components/Home/Membership";
import Signup from "./routes/User/Signup";
import { AuthProvider } from "./Firebase/AuthContext";
import Login from "./routes/User/Login";
import PrivateRoute from "./Firebase/PrivateRoute";
import Forgotpassword from "./routes/User/Forgotpassword";
import Updateprofile from "./routes/User/Updateprofile";
import AdminRoute from "./Firebase/AdminRoute";
import users from "./routes/Admin/users";
import ProfileRedirect from "./Firebase/ProfileRedirect";
import Dashboard from "./routes/Admin/dashboard";
import Addactivities from "./routes/Admin/Addactivities";
import ListActivities from "./routes/Admin/Listactivities";
import AddTrainers from "./routes/Admin/Addtrainers";
import Listtrainers from "./routes/Admin/Listtrainers";
import Addkidslots from "./routes/Admin/Addkidsslot";
import Addproducts from "./routes/Admin/Addproducts";
import Bookedactivities from "./routes/User/Bookedactivities";
import Orders from "./routes/User/Orders";
import Bookedactivitiesadmin from "./routes/Admin/Bookedactivitiesadmin";
import Bookedkidsslot from "./routes/User/Bookedkidsslot";
import Bookedkidslotadmin from "./routes/Admin/Bookedkidslotadmin";
// import Cart from "./routes/User/Cart";
import MembershipPlansPage from "./routes/User/MembershipPlansPage";
import Bookedmembership from "./routes/Admin/Bookedmembership";
import Faq from "./components/Home/Faq";
import ContactUs from "./components/Home/contact";
import Membershippage from "./components/Home/Membershippage";
import EditTrainer from "./routes/Admin/Edittrainer";
import EditActivities from "./routes/Admin/EditActivities";
import Listproducts from "./routes/Admin/Listproducts";
import Editproducts from "./routes/Admin/Editproducts";
import Cart from "./routes/User/Cart";
import Orderlist from "./routes/Admin/Orderlist";

function App() {
  return (
    <>
      <>
        <AuthProvider>
          <Router>
            <Switch>
              {/* <Route path="/landing" component={Landing} /> */}
              <Route path="/signup" component={Signup} />
              <ProfileRedirect path="/login" component={Login} />
              <Route path="/forgotpassword" component={Forgotpassword} />
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute path="/updateprofile" component={Updateprofile} />
              <Route path="/profile" component={Profile} />
              <Route path="/activities" component={Activities} />
              <Route path="/trainers" component={Trainers} />
              <Route path="/kidsslot" component={Kidsslot} />
              <Route path="/products" component={Products} />
              <Route path="/bookedactivities" component={Bookedactivities} />
              <Route path="/bookedkidsslot" component={Bookedkidsslot} />
              {/* <Route path="/cart" component={Cart} /> */}
              <Route path="/orders" component={Orders} />
              <Route path="/membership" component={Membership} />
              <Route
                path="/membershipplanspage"
                component={MembershipPlansPage}
              />
              <Route path="/faq" component={Faq} />
              <Route path="/contactus" component={ContactUs} />
              <Route path="/membershippage" component={Membershippage} />
              <Route path="/cart" component={Cart} />
              <Route path="/edit/:trainerUid" component={EditTrainer} />
              <Route
                exact
                path="/editactivity/:activityUid"
                component={EditActivities}
              />
              <AdminRoute
                exact
                path="/editproducts/:productsUid"
                component={Editproducts}
              />
              <AdminRoute path="/users" component={users} />
              <AdminRoute path="/addactivities" component={Addactivities} />
              <AdminRoute path="/listactivities" component={ListActivities} />
              <AdminRoute path="/addtrainers" component={AddTrainers} />
              <AdminRoute path="/listtrainers" component={Listtrainers} />
              <AdminRoute path="/addkidsslots" component={Addkidslots} />
              <AdminRoute path="/addproducts" component={Addproducts} />
              <AdminRoute path="/listproducts" component={Listproducts} />
              <AdminRoute
                path="/bookedmembership"
                component={Bookedmembership}
              />
              <AdminRoute
                path="/bookedkidslotadmin"
                component={Bookedkidslotadmin}
              />
              <AdminRoute
                path="/bookedactivitiesadmin"
                component={Bookedactivitiesadmin}
              />
              <AdminRoute path="/orderlist" component={Orderlist} />
              <AdminRoute path="/dashboard" component={Dashboard} />
              <Route component={Login} />
            </Switch>
          </Router>
        </AuthProvider>
      </>
    </>
  );
}

export default App;
