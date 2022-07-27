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
    ReferenceInput
} from 'react-admin';


export const GameList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <ReferenceField source="trainerId" reference="users">
                <NumberField source="trainerId" />
            </ReferenceField>
            <ReferenceField source="teamAId" reference="teams">
                <NumberField source="teamAId" />
            </ReferenceField>
            <ReferenceField source="teamBId" reference="teams">
                <NumberField source="teamBId" />
            </ReferenceField>
            <TextField source="result" />
            <EditButton />
        </Datagrid>
    </List>
);

export const GameEdit = () => (
    <Edit>
        <SimpleForm>
            <TextField source="id" />
            <TextInput source="name" />
            <ReferenceInput source="trainerId" reference="users">
                <NumberInput source="trainerId" />
            </ReferenceInput>
            <ReferenceInput source="teamAId" reference="teams">
                <NumberInput source="teamAId" />
            </ReferenceInput>
            <ReferenceInput source="teamBId" reference="teams">
                <NumberInput source="teamBId" />
            </ReferenceInput>
            <TextInput source="result" />
        </SimpleForm>
    </Edit>
);

export const GameCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextField source="id" />
            <TextInput source="name" />
            <ReferenceInput source="trainerId" reference="users">
                <NumberInput source="trainerId" />
            </ReferenceInput>
            <ReferenceInput source="teamAId" reference="teams">
                <NumberInput source="teamAId" />
            </ReferenceInput>
            <ReferenceInput source="teamBId" reference="teams">
                <NumberInput source="teamBId" />
            </ReferenceInput>
            <TextInput source="result" />
        </SimpleForm>
    </Create>
);