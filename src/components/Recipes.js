import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useActions } from '../hooks/use-actions';
import { Button, Header, Table, Icon } from 'semantic-ui-react';
import ModalComponent from './Modal.jsx';
import isEmpty from '../helpers/isEmpty';

const Recipes = () => {
  const { getAllRecipes, openModal } = useActions();
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes);

  useEffect(() => {
    (async () => {
      dispatch(getAllRecipes(await recipes));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell singleLine>ID</Table.HeaderCell>
          <Table.HeaderCell singleLine>Recipe Name</Table.HeaderCell>
          <Table.HeaderCell singleLine>Recipe Source</Table.HeaderCell>
          <Table.HeaderCell>Recipe Ingredients</Table.HeaderCell>
          <Table.HeaderCell>Recipe Instructions</Table.HeaderCell>
          <Table.HeaderCell singleLine>Preparation Time</Table.HeaderCell>
          <Table.HeaderCell><Icon name="attention"/></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      {recipes.all && recipes.all.map((recipe, i) => {
        const { ingredients } = recipe;
        return (
          <Table.Body key={i}>
            <Table.Row>
              <Table.Cell>
                <Header as='h4' textAlign='left'>
                  {recipe.id}
                </Header>
              </Table.Cell>
              <Table.Cell>
                <Header as={Link} to={`/${recipe.id}`} textAlign='center'>
                  {recipe.name}
                </Header>
              </Table.Cell>
              <Table.Cell singleLine>{recipe.source}</Table.Cell>
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
              <Table.Cell error>
                <Button onClick={() => dispatch(openModal('tiny', 'blurring'))} color="red" size="small">
                  Delete Recipe
                </Button>
                <ModalComponent recipeId={recipe.id} />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        )})
      }
    </Table>
  )
}

export default Recipes;
