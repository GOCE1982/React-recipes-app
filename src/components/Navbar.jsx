import React, { useState } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('');

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  }

  return (
      <Menu stackable>
        <Menu.Item header>Recipes App</Menu.Item>
        <Menu.Item>
          <Icon name="food"/>
        </Menu.Item>
        <Menu.Item 
          name='All Recipes' 
          as={Link}
          to='/' 
          active={activeItem === 'All Recipes'}
          onClick={handleItemClick}
        >
        </Menu.Item>
        <Menu.Item 
          name='Create A Recipe'
          as={Link} 
          to='/new' 
          active={activeItem === 'Create A Recipe'}
          onClick={handleItemClick}
        >
        </Menu.Item>
      </Menu>
  );
}

export default Navbar;