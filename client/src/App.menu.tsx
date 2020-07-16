import Home from './containers/Home';
import Info from './containers/Info';
import Login from './containers/Login';
import Profile from './containers/Profile';
import Progress from './containers/Progress';
import Register from './containers/Register';
import Stats from './containers/Stats';

export const tabs = [
  { name: 'Progress', component: Progress, icon: 'tasks' },
  { name: 'Stats', component: Stats, icon: 'chart-line' },
  { name: 'Home', component: Home, icon: 'map-marked-alt' },
  { name: 'Profile', component: Profile, icon: 'user' },
  { name: 'Info', component: Info, icon: 'info-circle' },
];

export const tabsAuth = [
  { name: 'Log In', component: Login, icon: 'user' },
  { name: 'Register', component: Register, icon: 'user-plus' },
  { name: 'Info', component: Info, icon: 'info-circle' },
];
