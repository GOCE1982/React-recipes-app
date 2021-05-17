import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useActions } from '../hooks/use-actions';
import { Card, Button, List } from 'semantic-ui-react';
import ModalComponent from './Modal.jsx';
import isEmpty from '../helpers/isEmpty';

const RecipeShow = ({ match }) => {
  const { fetchRecipe, openModal } = useActions()
  const dispatch = useDispatch();
  const recipe = useSelector(state => state.recipes.all[match.params.recipeId]);

  useEffect(() => {
    (async() => {
      dispatch(fetchRecipe(await recipe));
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (<div className="recipe-show" style={{ position: 'absolute', margin: 'auto', top: '33%', left: '0', bottom: '33%', right: '0'}}>
    {recipe ? (
      <Card.Group centered style={{ position: 'relative'}}>
        <Card>
          <Card.Content>
            <Card.Header as="h2">{recipe.name}</Card.Header>
            {isEmpty(recipe.source) ? null : (<Card.Meta>Source: {recipe.source}</Card.Meta>)}
            <Card.Description>
              <Card.Header>Ingredients:</Card.Header>
              <List as="ul">
              {recipe.ingredients.map((ingredient, idx) => {
                return (<Card.Description as="li" key={idx}>
                  {`${ingredient.quantity} ${ingredient.unit} of ${ingredient.name}`}
                </Card.Description>)
              })}
              </List>
            </Card.Description>
          </Card.Content>
          <Card.Content>
            Preparation time: {recipe.preparation_time.hours === 0 ? (<span>{`${recipe.preparation_time.minutes} minutes`}</span>) : (<span>{`${recipe.preparation_time.hours} hours, ${recipe.preparation_time.minutes} minutes`}</span>)}
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button onClick={() => openModal('mini', 'inverted')} color="red">Delete Recipe</Button>
            </div>
            <ModalComponent recipeId={recipe.id} />
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Header>Preparation Instructions:</Card.Header>
            <Card.Description>{recipe.instructions}</Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
    ) : (
      <p>Loading...</p>
      )}
  </div>)
}

export default RecipeShow;