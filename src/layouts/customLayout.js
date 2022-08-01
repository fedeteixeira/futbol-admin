import { Layout, AppBar, Sidebar, Menu } from 'react-admin';

const MyAppBar = props => <AppBar {...props} />;

const MyLayout = props => <Layout
    {...props}
    appBar={MyAppBar}
    sidebar={Sidebar}
    menu={Menu}
/>;

export default MyLayout;