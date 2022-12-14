import * as React from "react";
import userRoles from '../json/userRoles';
import {
    List,
    Datagrid,
    TextField,
    Edit,
    SimpleForm,
    TextInput,
    Create,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    PasswordInput,
    DeleteButton,
    EditButton
} from 'react-admin';

const userFilters = [
    <ReferenceInput source="categoryId" reference="categories" label="Categoría" >
        <SelectInput optionText="name" />
    </ReferenceInput>,
];

export const UserList = () => (
    <List filters={ userFilters }>
        <Datagrid bulkActionButtons={null} >
            <TextField source="identification" label="Cédula"/>
            <TextField source="name" label="Nombre" />
            <TextField source="lastName" label="Apellido" />
            <TextField source="rol" label="Rol" />
            <ReferenceField source="categoryId" reference="categories" label="Categoría" >
                <TextField source="name" />
            </ReferenceField>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="lastName" label="Nombre" />
            <TextInput source="rol" label="Apellido" />
            <ReferenceInput source="categoryId" reference="categories" >
                <SelectInput source="name" label="Categoría" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="identification" label="Cédula" />
            <PasswordInput source="password" label="Contraseña" />
            <TextInput source="name" label="Nombre" />
            <TextInput source="lastName" label="Apellido" />
            <SelectInput source="rol" choices={ userRoles } label="Rol" />
            <ReferenceInput source="categoryId" reference="categories" >
                <SelectInput source="name" label="Categoría" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);