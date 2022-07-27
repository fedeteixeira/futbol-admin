import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Edit,
    SimpleForm,
    NumberField,
    TextInput,
    Create,
    NumberInput,
    ReferenceInput,
} from 'react-admin';


export const TeamList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <ReferenceField source="categoryId" reference="categories">
                <NumberField source="categoryId" />
            </ReferenceField>
            <ReferenceField source="keyId" reference="keys">
                <NumberField source="keyId" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>
);

export const TeamEdit = () => (
    <Edit>
        <SimpleForm>
            <TextField source="id" />
            <TextInput source="name" />
            <ReferenceInput source="categoryId" reference="categories">
                <NumberInput source="categoryId" />
            </ReferenceInput>
            <ReferenceInput source="keyId" reference="keys">
                <NumberInput source="keyId" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const TeamCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextField source="id" />
            <TextInput source="name" />
            <ReferenceInput source="categoryId" reference="categories">
                <NumberInput source="categoryId" />
            </ReferenceInput>
            <ReferenceInput source="keyId" reference="keys">
                <NumberInput source="keyId" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);