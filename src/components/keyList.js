import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    SimpleForm,
    TextInput,
    Create,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    usePermissions,
    DeleteButton,
    NumberInput,
    NumberField
} from 'react-admin';


export const KeyList = () => (
    <List>
        <Datagrid bulkActionButtons={null}>
            <TextField source="name" label="Nombre" />
            <ReferenceField source="categoryId" reference="categories" label="Categoría" >
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="teamAId" reference="teams">
                <TextField source="name" label="Equipo A" />
            </ReferenceField>
            <ReferenceField source="teamBId" reference="teams">
                <TextField source="name" label="Equipo B" />
            </ReferenceField>
            <NumberField source="goalsTeamA" label="Goles equipo A" />
            <NumberField source="goalsTeamB" label="Goles equipo B" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const KeyEdit = () => {
    const { permissions } = usePermissions();
    return (
        <Edit>
            <SimpleForm defaultValue={{ role: 'Usuario' }}>
                { permissions === 'Administrador' &&
                    <>
                        <TextInput source="name" label="Nombre" />
                        <ReferenceInput source="categoryId" reference="categories">
                            <SelectInput source="name" label="Categoría" />
                        </ReferenceInput>
                        <ReferenceInput source="teamAId" reference="teams">
                            <SelectInput source="name" label="Equipo A" />
                        </ReferenceInput>
                        <ReferenceInput source="teamBId" reference="teams">
                            <SelectInput source="name" label="Equipo B" />
                        </ReferenceInput>
                    </>
                }
                { permissions === 'Encargado de Información' &&
                    <>
                        <NumberInput source="goalsTeamA" label="Goles equipo A" />
                        <NumberInput source="goalsTeamB" label="Goles equipo B" />
                    </>
                }
            </SimpleForm>
        </Edit>
    );
}

export const KeyCreate = (props) => {
    const { permissions } = usePermissions();
    return (
        <Create {...props}>
            <SimpleForm defaultValue={{ role: 'Usuario' }}>
                { permissions === 'Administrador' &&
                    <>
                        <TextInput source="name" label="Nombre" />
                        <ReferenceInput source="categoryId" reference="categories">
                            <SelectInput source="name" label="Categoría" />
                        </ReferenceInput>
                        <ReferenceInput source="teamAId" reference="teams" >
                            <SelectInput source="name" label="Equipo A"  />
                        </ReferenceInput>
                        <ReferenceInput source="teamBId" reference="teams" >
                            <SelectInput source="name" label="Equipo B" />
                        </ReferenceInput>
                    </>
                }
            </SimpleForm>
        </Create>
    )
};