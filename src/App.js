import './App.css';
import PostIcon from '@mui/icons-material/Book';
import TeamIcon from '@mui/icons-material/Group';
import UserIcon from '@mui/icons-material/Person';
import GameIcon from '@mui/icons-material/SportsSoccer';
import PersonIcon from '@mui/icons-material/Sports';
import { Admin, Resource, Login } from 'react-admin';
import { Route } from "react-router-dom";
import { UserList, UserCreate, UserEdit } from './components/userList';
import { PersonList, PersonCreate, PersonEdit } from './components/personList';
import { KeyList, KeyCreate, KeyEdit } from './components/keyList';
import { TeamList, TeamCreate, TeamEdit } from './components/teamList';
import { CategoryList, CategoryCreate, CategoryEdit } from './components/categoryList';
import { authProvider } from './providers/authProvider';
import { dataProvider } from './providers/dataProvider';
import { spanishProvider } from './providers/spanishProvider';
import MyLayout from './layouts/customLayout';
import CuadreFinal from './components/CuadreFinal';

const MyLoginPage = () => (
    <Login backgroundImage="/images/football_bg.jpg" />
);

function App() {
  return (
    <Admin dashboard={CuadreFinal} authProvider={authProvider} dataProvider={ dataProvider } i18nProvider={ spanishProvider } layout={ MyLayout } loginPage={MyLoginPage} >
      { permissions => (
        <>
        { (permissions === "Administrador") &&
          <Resource name="users" options={{ label: 'Usuarios' }} list={UserList} create={UserCreate} edit={UserEdit} icon={UserIcon} />
      }
        { (permissions === "Administrador" || permissions === "Encargado de Equipo") &&
          <Resource name="persons" options={{ label: 'Jugadores' }} list={PersonList} create={PersonCreate} edit={PersonEdit} icon={PersonIcon} />
        }
        { (permissions === "Administrador" || permissions === "Encargado de Información") &&
          <Resource name="keys" options={{ label: 'Llaves' }} list={KeyList} create={ permissions === "Administrador" ? KeyCreate : null} edit={KeyEdit} icon={GameIcon} />
        }
        { (permissions === "Administrador") &&
          <>
            <Resource name="teams" options={{ label: 'Equipos' }} list={TeamList} create={TeamCreate} edit={TeamEdit} icon={TeamIcon} />
            <Resource name="categories" options={{ label: 'Categorías' }} list={CategoryList} create={CategoryCreate} edit={CategoryEdit} icon={PostIcon} />
          </>
        }
        </>
      )}
    </Admin>
  );
}

export default App;
