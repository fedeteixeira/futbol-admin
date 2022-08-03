import React, {useState, useEffect} from 'react';
import { useWatch } from 'react-hook-form';
import { dataProvider } from '../providers/dataProvider';
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
        <Datagrid bulkActionButtons={null} >
            <TextField source="name" label="Nombre" />
            <ReferenceField source="categoryId" reference="categories" label="Categoría" >
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="teamAId" reference="teams" label="Equipo A" >
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="teamBId" reference="teams" label="Equipo B" >
                <TextField source="name" />
            </ReferenceField>
            <NumberField source="goalsTeamA" label="Goles equipo A" />
            <NumberField source="goalsTeamB" label="Goles equipo B" />
            <NumberField source="round" label="Ronda" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

const getTeams = async () => {
    const params = {
        filter: {},
        meta: undefined,
        pagination: {page: 1, perPage: 100},
        sort: {field: 'id', order: 'ASC'},
    };
    const response = await dataProvider.getList('teams', params);
    return response.data;
}

const TeamAComponent = props => {
    const categoryId = useWatch({ name: 'categoryId' });
    const teamBId = useWatch({ name: 'teamBId' });
    let [teamsChoices, setTeamsChoices] = useState();
    useEffect(() => {
        getTeams().then((result) => setTeamsChoices(result));
    }, []);

    teamsChoices = teamsChoices?.filter((team)=> team.categoryId === categoryId && team.id !== teamBId && team.status === "Activo");

    return (
        <>
            <SelectInput source="teamAId" label="Equipo A" choices={teamsChoices ?? []} />
        </>
    )
}

const TeamBComponent = props => {
    const categoryId = useWatch({ name: 'categoryId' });
    const teamAId = useWatch({ name: 'teamAId' });
    let [teamsChoices, setTeamsChoices] = useState();
    useEffect(() => {
        getTeams().then((result) => setTeamsChoices(result));
    }, []);

    teamsChoices = teamsChoices?.filter((team)=> team.categoryId === categoryId && team.id !== teamAId && team.status === "Activo");

    return (
        <>
            <SelectInput source="teamBId" label="Equipo B" choices={teamsChoices ?? []} />
        </>
    )
}

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
                        <TeamAComponent />
                        <TeamBComponent />
                    </>
                }
                { permissions === 'Encargado de Información' &&
                    <>
                        <NumberInput source="goalsTeamA" label="Goles equipo A" min={0} />
                        <NumberInput source="goalsTeamB" label="Goles equipo B" min={0} />
                        <NumberInput source="round" label="Ronda" min={1} />
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
                        <TeamAComponent />
                        <TeamBComponent />
                    </>
                }
            </SimpleForm>
        </Create>
    )
};