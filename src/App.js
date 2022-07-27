import './App.css';
import PostIcon from '@mui/icons-material/Book';
import TeamIcon from '@mui/icons-material/Group';
import UserIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Sports';
import GameIcon from '@mui/icons-material/SportsSoccer';
import { Admin, Resource, combineDataProviders } from 'react-admin';
import { UserList, UserCreate, UserEdit } from './components/userList';
import { KeyList, KeyCreate, KeyEdit } from './components/keyList';
import { TeamList, TeamCreate, TeamEdit } from './components/teamList';
import { GameList, GameCreate, GameEdit } from './components/gameList';
import { CategoryList, CategoryCreate } from './components/categoryList';
import { authProvider } from './providers/authProvider';
import { dataProvider } from './providers/dataProvider';
import { fileProvider } from './providers/fileProvider';
import { spanishProvider } from './providers/spanishProvider';

const dataProviders = combineDataProviders((resource) => {
    switch (resource) {
        case 'users':
            return fileProvider;
        default:
            return dataProvider;
    }
});

function App() {
  return (
    <Admin authProvider={authProvider} dataProvider={ dataProviders } i18nProvider={ spanishProvider } >
      <Resource name="users" options={{ label: 'Usuarios' }} list={UserList} create={UserCreate} icon={UserIcon} />
      <Resource name="keys" options={{ label: 'Llaves' }} list={KeyList} create={KeyCreate} icon={KeyIcon} />
      <Resource name="teams" options={{ label: 'Equipos' }} list={TeamList} create={TeamCreate} icon={TeamIcon} />
      <Resource name="games" options={{ label: 'Partidos' }} list={GameList} create={GameCreate} icon={GameIcon} />
      <Resource name="categories" options={{ label: 'Categorías' }} list={CategoryList} create={CategoryCreate} icon={PostIcon} />
    </Admin>
  );
}

export default App;
