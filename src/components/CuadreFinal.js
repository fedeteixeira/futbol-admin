import React, {useState, useEffect} from 'react';
import { useWatch } from 'react-hook-form';
import { Card } from '@mui/material';
import { Title, SelectInput, SimpleForm } from 'react-admin';
import { dataProvider } from '../providers/dataProvider';
import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';

let rounds = {}
let matches = [];
let categoryId = null;

const matchesHasId = (matchId) => {
  let found = false;
  for(let matchIndex in matches) {
    let matchObj = matches[matchIndex];
    if(matchObj.id === matchId) {
      found = true;
    }
  }
  return found;
}

const getCategories = async () => {
    const params = {
        filter: {},
        meta: undefined,
        pagination: {page: 1, perPage: 100},
        sort: {field: 'id', order: 'ASC'},
    };

    const response = await dataProvider.getList('categories', params);
    return response.data;
}

const getKeys = async () => {
    const params = {
        filter: {},
        meta: undefined,
        pagination: {page: 1, perPage: 100},
        sort: {field: 'id', order: 'ASC'},
    };
    const response = await dataProvider.getList('keys', params);
    return response.data;
}

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

const BracketComponent = () => {
    let newCategoryId = useWatch({ name: 'categoryId' });
    let [keysChoices, setKeysChoices] = useState();
    let [teamsChoices, setTeamsChoices] = useState();
    if(newCategoryId !== categoryId) {
      rounds = {}
      matches = [];
      for(let keyIndex in keysChoices) {
        let keyObj = keysChoices[keyIndex];
        keyObj.examined = false;
      }
    }
    categoryId = newCategoryId;
    useEffect(() => {
        getKeys().then((result) => setKeysChoices(result));
    }, []);
    useEffect(() => {
        getTeams().then((result) => setTeamsChoices(result));
    }, []);

    keysChoices = keysChoices?.filter((key)=> key.categoryId === categoryId);
    teamsChoices = teamsChoices?.filter((team)=> team.categoryId === categoryId);

    for(let keyIndex in keysChoices) {
      let keyObj = keysChoices[keyIndex];
      if(keyObj.examined) {
        continue;
      }
      if(!rounds[keyObj.round]) {
        rounds[keyObj.round] = [keyObj];
      } else {
        rounds[keyObj.round] = [...rounds[keyObj.round], keyObj];
      }
      keyObj.examined = true;
    }

    for(let roundIndex in rounds) {
      let roundObj = rounds[roundIndex];
      for(let matchIndex in roundObj) {
        let matchObj = roundObj[matchIndex];
        let nextRoundList = rounds[+roundIndex+1];
        let nextMatch = nextRoundList?.find(matchAux => matchAux.teamA === matchObj.teamA || matchAux.teamB === matchObj.teamB);
        matchObj.nextMatchId = nextMatch?.id;
        let isWinner = matchObj.goalsTeamA > matchObj.goalsTeamB;
        if(matchesHasId(matchObj.id)) continue;
        let teamA = teamsChoices?.find((team)=> team.id === matchObj.teamAId);
        let teamB = teamsChoices?.find((team)=> team.id === matchObj.teamBId);
        matches.push({
          id: matchObj.id,
          name: matchObj.name,
          nextMatchId: matchObj.nextMatchId,
          state: "DONE",
          participants: [
            {
              id: matchObj.teamAId,
              resultText: isWinner ? "Ganó" : "Perdió",
              isWinner: isWinner,
              status: "PLAYED",
              name: teamA?.name,
            },
            {
              id: matchObj.teamBId,
              resultText: !isWinner ? "Ganó" : "Perdió",
              isWinner: isWinner,
              status: "PLAYED",
              name: teamB?.name,
            }
          ]
        })
      }
    }

    if(!categoryId) {
      return (
        <div>
          Seleccione una categoría
        </div>
      )
    }

    if(!matches.length) {
      return (
        <div>
          No se han disputado partidos para esta categoría
        </div>
      )
    }

    return (
      <>
        <SingleEliminationBracket
          matches={matches}
          matchComponent={Match}
          svgWrapper={({ children, ...auxProps }) => (
            <SVGViewer width={500} height={500} {...auxProps}>
              {children}
            </SVGViewer>
          )}
        />
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
            <Title title="Cuadre Partidos" />
                <SimpleForm toolbar={<></>}>
                    <SelectInput source="categoryId" label="Categoría" choices={categoriesChoices ?? []}/>
                    <BracketComponent />
                </SimpleForm>
        </Card>
    );
}

export default CuadreFinal;