import * as React from "react";
import { List, Datagrid, TextField, SimpleForm, Create, Edit, TextInput, DeleteButton, EditButton } from 'react-admin';

export const CategoryList = () => (
    <List>
        <Datagrid bulkActionButtons={null}>
            <TextField source="name" label="Nombre" />
            <EditButton />
            <DeleteButton />
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

export const CategoryEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" label="Nombre" />
        </SimpleForm>
    </Edit>
);