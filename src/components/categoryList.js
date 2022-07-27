import * as React from "react";
import { List, Datagrid, TextField, SimpleForm, Create, TextInput, ImageInput, ImageField } from 'react-admin';

export const CategoryList = () => (
    <List>
        <Datagrid>
            <TextField source="name" label="Nombre" />
        </Datagrid>
    </List>
);

export const CategoryCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="Nombre" />
        </SimpleForm>
    </Create>
);