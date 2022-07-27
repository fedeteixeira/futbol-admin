import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    NumberField,
    EditButton,
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    Create,
    ReferenceField,
    ReferenceInput,
    SelectInput
} from 'react-admin';


export const KeyList = () => (
    <List>
        <Datagrid>
            <TextField source="name" label="Nombre" />
            <ReferenceField source="categoryId" reference="categories" label="Categoría" >
                <TextField source="name" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>
);

export const KeyEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" label="Nombre" />
            <ReferenceInput source="categoryId" reference="categories">
                <NumberInput source="name" label="Categoría" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const KeyCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="Nombre" />
            <ReferenceInput source="categoryId" reference="categories">
                <SelectInput source="name" label="Categoría" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);