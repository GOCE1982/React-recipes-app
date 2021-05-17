import { Input, Segment, Header } from 'semantic-ui-react';
import { useRef } from 'react';

const IngredientInputs = ({ ingredients, handleChange }) => {

  const inputRef = useRef(null)

  return (
      ingredients.map((val, idx) => {
        let ingId = `name-${idx}`,
          quantityId = `quantity-${idx}`,
          unitId = `unit-${idx}`;

        return (
          <div key={idx}>
            <Segment>
            <Header htmlFor={ingId}>{`Ingredient #${idx + 1}`}</Header>
              <Input
                list={'ingredients.name'}
                type="text"
                placeholder={"Choose Ingredient"}
              >
                <input
                  className="name"
                  onChange={handleChange}
                  name={ingId}
                  data-id={idx}
                  id={ingId}
                />
                <datalist
                  id="ingredients.name"
                  value={ingredients[idx].name}
                >
                  <option value="Flour">Flour</option>
                  <option value="Milk">Milk</option>
                  <option value="Oil">Oil</option>
                  <option value="Salt">Salt</option>
                  <option value="Sugar">Sugar</option>
                  <option value="Eggs">Eggs</option>
                  <option value="Potatoes">Potatoes</option>
                  <option value="Tomatoes">Tomatoes</option>  
                  <option value="Peppers">Peppers</option>
                  <option value="Cheese">Cheese</option>
                  <option value="Meat">Meat</option>
                </datalist>
                </Input>
              <Input
                type="number"
                placeholder={"quantity"}
                onChange={handleChange}
                list={ingredients[idx].quantity}
              >
                <input
                  name={quantityId}
                  data-id={idx}
                  id={quantityId}
                  type="number"
                  min={0}
                  className="quantity"
                  onChange={handleChange}
                  // value={ingredients[idx].quantity}
                />
              </Input>
              <Input
                list="unit"
                type="text"
                placeholder={'Select unit'}
              >
                <input
                  name={unitId}
                  data-id={idx}
                  id={unitId}
                  className="unit"
                  onChange={handleChange}
                  // value={ingredients[idx].unit}
                  ref={inputRef}
                />
                <datalist id="unit" >
                  <option value="pcs">pcs</option>
                  <option value="oz">oz</option>
                  <option value="ml">ml</option>
                  <option value="gr">gr</option>
                  <option value="cup">cup</option>
                </datalist>
              </Input>
            </Segment>
          </div>
          )
      })
  )
}

export default IngredientInputs;