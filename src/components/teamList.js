import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Edit,
    SimpleForm,
    TextInput,
    Create,
    ReferenceInput,
    DeleteButton,
    SelectInput
} from 'react-admin';


export const TeamList = () => (
    <List>
        <Datagrid bulkActionButtons={null} >
            <TextField source="name" label="Nombre" />
            <ReferenceField source="categoryId" reference="categories">
                <TextField source="name" label="Nombre" />
            </ReferenceField>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const TeamEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" label="Nombre" />
            <ReferenceInput source="categoryId" reference="categories" >
                <SelectInput source="name" label="Categoría" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const TeamCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="Nombre" />
            <ReferenceInput source="categoryId" reference="categories" >
                <SelectInput source="name" label="Categoría" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);