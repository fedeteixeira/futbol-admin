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
    ImageInput,
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
            <TextField source="rol" label="Rol" />
            <ReferenceField source="categoryId" reference="categories" label="Categoría" >
                <TextField source="name" />
            </ReferenceField>
            <ImageField source="picture.src" title="title" label="Foto" />
            <ImageField source="studyRecord.src" title="title" label="Certificado Estudios" />
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
            <ImageInput source="picture" label="Foto" accept="image/*" >
                <ImageField source="src" title="title" />
            </ImageInput>
            <ImageInput source="studyRecord" label="Certificado Estudios" accept="image/*" >
                <ImageField source="src" title="title" />
            </ImageInput>
            <ImageInput source="birthCertificate" label="Partida Nacimiento" accept="image/*" >
                <ImageField source="src" title="title" />
            </ImageInput>
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
                <ImageInput source="picture" label="Foto" accept="image/*" >
                    <ImageField source="src" title="title" />
                </ImageInput>
                <ImageInput source="studyRecord" label="Certificado Estudios" accept="image/*" >
                    <ImageField source="src" title="title" />
                </ImageInput>
                <ImageInput source="birthCertificate" label="Partida Nacimiento" accept="image/*" >
                    <ImageField source="src" title="title" />
                </ImageInput>
            </SimpleForm>
        </Create>
    )
}