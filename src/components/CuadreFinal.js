import React, {useState, useEffect} from 'react';
import { useWatch } from 'react-hook-form';
import { Card } from '@mui/material';
import { Title, SelectInput, SimpleForm } from 'react-admin';
import { dataProvider } from '../providers/dataProvider';


const getCategories = async () => {
    const params = {
        filter: {},
        meta: undefined,
        pagination: {page: 1, perPage: 10},
        sort: {field: 'id', order: 'ASC'},
    };

    const response = await dataProvider.getList('categories', params);
    return response.data;
}

const getKeys = async () => {
    const params = {
        filter: {},
        meta: undefined,
        pagination: {page: 1, perPage: 10},
        sort: {field: 'id', order: 'ASC'},
    };
    const response = await dataProvider.getList('keys', params);
    return response.data;
}

const BracketComponent = props => {
    const categoryId = useWatch({ name: 'categoryId' });
    let [keysChoices, setKeysChoices] = useState();
    useEffect(() => {
        console.log(categoryId);
        getKeys(categoryId).then((result) => setKeysChoices(result));
    }, []);

    keysChoices = keysChoices?.filter((key)=> key.categoryId === categoryId);
    console.log(keysChoices);

    return (
        <>
            {keysChoices?.map(home => <div>{home.name}</div>)}
        </>
    )
}

const CuadreFinal = props => {
    const [categoriesChoices, setCategoriesChoices] = useState();

    useEffect(() => {
        getCategories().then((result) => setCategoriesChoices(result));
    }, []);

    return (
        <Card>
            <Title title="My Page" />
                <SimpleForm toolbar={<></>}>
                    <SelectInput source="categoryId" label="Categoría" choices={categoriesChoices ?? []}/>
                    <BracketComponent />
                </SimpleForm>
        </Card>
    );
}

export default CuadreFinal;