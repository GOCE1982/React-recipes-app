import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { useActions } from '../hooks/use-actions';
import { Button, Header, Table, Icon, Loader } from 'semantic-ui-react';
import ModalComponent from './Modal.jsx';
import isEmpty from '../helpers/isEmpty';

const Recipes = () => {
  const { getAllRecipes, openModal } = useActions();
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes);

  const [id, setId] = useState('');

  const colors = ["teal", "olive", "brown", "green", "red", "orange", "blue", "purple"]

  useEffect(() => {
    (async () => {
      getAllRecipes(await recipes);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const { all, loading } = recipes;
  let tableData;
  if (isEmpty(all) || loading) {
    tableData = (
      <Table.Row positive>
        <Table.Cell colSpan="8">
          <Loader active size="big">Getting Recipes</Loader>
        </Table.Cell>
      </Table.Row>
    )
  } else {
    tableData = all.map((recipe, i) => {
      const { ingredients } = recipe;

      return (
          <Table.Row key={i}>
            <Table.Cell>
              <Header as='h4' textAlign='left'>
                {recipe.id}
              </Header>
            </Table.Cell>
            <Table.Cell selectable>
              <Link to={`/${recipe.id}`} >
                <Header textAlign='center' color={colors[Math.floor(Math.random() * colors.length)]}>
                  {recipe.name}
                </Header>
              </Link>
            </Table.Cell>
            <Table.Cell singleLine>{recipe.source}</Table.Cell>
            <Table.Cell singleLine>{ingredients.length}</Table.Cell>
            <Table.Cell textAlign='left'>
              {ingredients.length <= 3 ?
                (ingredients.map(ingredient => (
                  <span key={ingredient.id}>{`${ingredient.quantity} ${ingredient.unit} of ${ingredient.name}, `}</span>
                  ))) :
                (
                  <>
                    <span>{`${ingredients[0].quantity} ${ingredients[0].unit} of ${ingredients[0].name}`}</span>{`, `}
                    <span>{`${ingredients[1].quantity} ${ingredients[1].unit} of ${ingredients[1].name}`}</span>{`, `}
                    <span>{`${ingredients[2].quantity} ${ingredients[2].unit} of ${ingredients[2].name}`}</span>{' '}
                    <span>(...)</span>
                  </>
                )
              }
            </Table.Cell>
            <Table.Cell textAlign='left'>
                {
                  recipe.instructions && recipe.instructions.length > 50 ? (<span>{`${recipe.instructions.slice(0, 50).split(' ').slice(0, -1).join(' ')} (...)`}</span>) : (recipe.instructions)
                }
            </Table.Cell>
            <Table.Cell>
              {isEmpty(recipe.preparation_time.hours) || recipe.preparation_time.hours === 0 ? (<span>{`${recipe.preparation_time.minutes} minutes`}</span>) : (<span>{`${recipe.preparation_time.hours} hours, ${recipe.preparation_time.minutes} minutes`}</span>)}
            </Table.Cell>
            {recipe && <Table.Cell error>
              <Button onClick={() => {
                setId(recipe.id)
                dispatch(openModal('tiny', 'blurring'))
              }} color="red" size="tiny">
                Delete Recipe
              </Button>
              <ModalComponent recipeId={id} />
            </Table.Cell>}
          </Table.Row>
      )})
  }

  return (
    <Table celled striped compact unstackable color="grey">
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell singleLine>
            ID
          </Table.HeaderCell>
          <Table.HeaderCell singleLine>
            Recipe Name
          </Table.HeaderCell>
          <Table.HeaderCell singleLine>
            Recipe Source
          </Table.HeaderCell>
          <Table.HeaderCell singleLine>
            # of Ingredients
          </Table.HeaderCell>
          <Table.HeaderCell>Ingredients</Table.HeaderCell>
          <Table.HeaderCell>Preparation Instructions</Table.HeaderCell>
          <Table.HeaderCell singleLine>Preparation Time</Table.HeaderCell>
          <Table.HeaderCell><Icon name="attention" /></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {tableData}
      </Table.Body>
    </Table>
  )
}

export default withRouter(Recipes);
