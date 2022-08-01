import * as React from "react";
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
    ImageField,
    EditButton,
    DeleteButton
} from 'react-admin';

const personFilters = [
    <ReferenceInput source="categoryId" reference="categories" label="Categoría" >
        <SelectInput optionText="name" />
    </ReferenceInput>,
];

export const PersonList = () => (
    <List filters={ personFilters }>
        <Datagrid bulkActionButtons={null}>
            <TextField source="identification" label="Cédula"/>
            <TextField source="name" label="Nombre" />
            <TextField source="lastName" label="Apellido" />
            <ReferenceField source="categoryId" reference="categories" label="Categoría" >
                <TextField source="name" />
            </ReferenceField>
            <ImageField source="picture" title="title" label="Foto" />
            <ImageField source="studyRecord" title="title" label="Certificado Estudios" />
            <ImageField source="birthCertificate" title="title" label="Partida Nacimiento" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const PersonEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="identification" label="Cédula" />
            <TextInput source="name" label="Nombre" />
            <TextInput source="lastName" label="Apellido" />
            <ReferenceInput source="teamManagerId" reference="users" >
                <SelectInput source="name" label="Entrenador" />
            </ReferenceInput>
            <ReferenceInput source="categoryId" reference="categories" >
                <SelectInput source="name" label="Categoría" />
            </ReferenceInput>
            <TextInput source="picture" label="Foto" type="url" />
            <TextInput source="studyRecord" label="Certificado Estudios" type="url" />
            <TextInput source="birthCertificate" label="Partida Nacimiento" type="url" />
        </SimpleForm>
    </Edit>
);


export const PersonCreate = props => {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="identification" label="Cédula" />
                <TextInput source="name" label="Nombre" />
                <TextInput source="lastName" label="Apellido" />
                <ReferenceInput source="teamManagerId" reference="users" >
                    <SelectInput source="name" label="Entrenador" />
                </ReferenceInput>
                <ReferenceInput source="categoryId" reference="categories" >
                    <SelectInput source="name" label="Categoría" />
                </ReferenceInput>
                <TextInput source="picture" label="Foto" type="url" />
                <TextInput source="studyRecord" label="Certificado Estudios" type="url" />
                <TextInput source="birthCertificate" label="Partida Nacimiento" type="url" />
            </SimpleForm>
        </Create>
    )
}