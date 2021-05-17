import React, { createRef } from 'react';
import { createRecipe } from '../app/actions/recipeActions';
import { updateRecipeFormData, addIngredient, setCurrentIngredient, resetRecipeForm } from '../app/actions/recipeForm';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input, Button, Form, TextArea, Segment, Divider, Header } from 'semantic-ui-react';
import IngredientInputs from './IngredientsInputs';
import isEmpty from '../helpers/isEmpty'

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      source: '',
      ingredients: [
        {
          name: '',
          quantity: '',
          unit: '',
          id: 0
        },
      ],
      preparation_time: {
        hours: '',
        minutes: ''
      },
      instructions: '',
      currentIngredient: null,
      id: null
    }
  }

  inputRef = createRef();

  componentDidMount() {
    if (this.state.currentIngredient !== null) {
      this.props.setCurrentIngredient(this.state.currentIngredient)
    } else {
      this.props.setCurrentIngredient({
        name: '',
        quantity: '',
        unit: '',
        id: 0
      })
    }

    this.setState({ ingredient: { name: '', quantity: '', unit: '', id: 0 } });
    this.inputRef.current.focus();
  }

  getNextId(lastId) {
    return lastId+1;
  }

  handleAddIngredients = e => {
    e.preventDefault();
    const { ingredient } = this.state;
    if (isEmpty(ingredient.name) || isEmpty(ingredient.quantity) || isEmpty(ingredient.unit)) {
      return;
    }
    this.props.addIngredient(ingredient);
    this.props.setCurrentIngredient(ingredient);
    // this.props.setCurrentIngredient({id: this.getNextId(this.state.ingredient.id)})
    setTimeout(() => {
      this.setState({ ingredient: {name: '', quantity: '', unit: '', id: null}})
      this.setState((prevState) => ({
        ingredients: [...prevState.ingredients, {...this.state.ingredient}],
      }))
    }, 500)
  }

  handleOnChange = e => {
    if (["name", "quantity", "unit"].includes(e.target.className) ) {
      let ingredients = [...this.state.ingredients]
      ingredients[e.target.dataset.id][e.target.className] = e.target.value
      // this.setState({ ingredients }, () => console.log(this.state.ingredients))
      this.setState({ ingredient: {...this.state.ingredient, [e.target.className]: e.target.value} });
    } else {
        this.setState({ [e.target.name]: e.target.value })
    }

    if (["hours", "minutes"].includes(e.target.className) && e.target.value.length) {
      this.setState({ preparation_time: { ...this.state.preparation_time, [e.target.className]: e.target.value } }, () => console.log(this.state.preparation_time));
    }
  }

  handleOnSubmit = e => {
    e.preventDefault();

    const { createRecipe, history } = this.props;
    const recipeData = {
      name: this.state.name,
      source: this.state.source,
      ingredients: this.props.recipeFormData.ingredients,
      preparation_time: this.state.preparation_time,
      instructions: this.state.instructions,
    };
    if (this.state.ingredients.length < 1) {
      alert('Must add at least one ingredient!');
      return;
    } else {
      createRecipe(recipeData, history);
      resetRecipeForm();
    }
  }

  render() {
    const { name, source, ingredients, instructions, preparation_time } = this.state;
    
    return (
      <div>
        <h1>Add a new Recipe</h1>
        <Form onSubmit={this.handleOnSubmit}>
          <Segment>
            {/* <label htmlFor="name">Recipe Name</label> */}
            <Input
              labelPosition="left"
              label="Recipe Name"
              type="text"
              name="name"
              value={name}
              onChange={this.handleOnChange}
              required
              ref={this.inputRef}
            />
            </Segment>
          <Segment>
            {/* <label htmlFor="source">Recipe Source</label> */}
            <Input
              labelPosition="left"
              label="Recipe Source"
              size="small"
              type="text"
              name="source"
              value={source}
              onChange={this.handleOnChange}
            />
          </Segment>
          <Divider hidden />
          <IngredientInputs ingredients={ingredients} handleChange={this.handleOnChange} />
          <div style={{margin: '1vh 0'}}>
            <Button color="green" size="medium" onClick={this.handleAddIngredients}>Add To Ingredients</Button>
          </div>
          <Segment>
            {/* <label htmlFor="preparation_time">Preparation Time</label> */}
            <Header>Preparation Time</Header>
            <Input
              type="number"
              size="large"
              name="preparation_time.hours"
              // value={preparation_time.hours}
              onChange={this.handleOnChange}
            >
              <input className="hours" onChange={this.handleOnChange} placeholder="hrs" type="number" min={0} max={24} pattern="([0-1]{1}[0-9]{1}|20|21|22|23)" id="hours" defaultValue={0} />
            </Input>
            <Input
              type="number"
              size="large"
              name="preparation_time.minutes"
              value={(preparation_time.minutes)}
              onChange={this.handleOnChange}
            >
              <input className="minutes" onChange={this.handleOnChange} placeholder="mins" type="number" min={0} max={59} pattern="[0-5]{1}[0-9]{1}" id="minutes" />
            </Input>
          </Segment>
          <div> 
            <label htmlFor="instructions">Instructions:</label>
            <TextArea
              type="text"
              style={{ minHeight: 200 }}
              name="instructions"
              value={instructions}
              onChange={this.handleOnChange}
              required
            />
          </div>
          <div style={{marginTop: '1vh'}}>
            <button type="submit">Add Recipe</button>
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipeFormData: state.recipeForm,
    ingredients: state.ingredients,
    currentIngredient: state.currentIngredient,
    preparation_time: state.preparation_time
  }
}

export default connect(mapStateToProps, { updateRecipeFormData, resetRecipeForm, createRecipe, addIngredient, setCurrentIngredient})(withRouter(RecipeForm));
