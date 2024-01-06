
import React from 'react';
import PagesRoutes from './Routes';

function App() {
  return (
    <div className="App">
      <PagesRoutes />
    </div>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import AdminDashboard from './admin/pages/AdminDashboard';
// import AdminLogin from './admin/pages/AdminLogin';
// import AdminRegister from './admin/pages/AdminRegister';
// import UserLogin from './user/pages/UserLogin';
// import UserRegister from './user/pages/UserRegister';
// import UserDashboard from './user/pages/UserDashboard';
// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Admin Routes */}
//         <Route path="/admin" exact component={AdminDashboard} />
//         <Route path="/admin/login" component={AdminLogin} />
//         <Route path="/admin/register" component={AdminRegister} />

//         {/* User Routes */}
//         <Route path="/" component={UserDashboard} />
//         <Route path="/user/login" component={UserLogin} />
//         <Route path="/user/register" component={UserRegister} />

//         {/* Add more routes as needed */}

//         {/* Default Route (404) */}
//         {/* <Route path="/" component={() => <div>404 Not Found</div>} /> */}
//       </Routes>
//     </Router>
//   );
// };

// export default PagesRoutes;