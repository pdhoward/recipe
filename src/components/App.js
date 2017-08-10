import React, { Component } from 'react';
import { connect } from 'react-redux'
import {addRecipe, removeFromCalendar } from '../actions'
import { capitalize } from '../utils/helpers'
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o'

// note that the mapStateToProps function trnasform the calendar state from
// an object with day propertoies and embedded meal objects to
// an array of days of week with embedded object called meal

// difference between redux and react -- need an array in react to build a nice visual grid
// but in redux want to manage stae in an object
// need a transition per below to reshape the data the way we want
// ie use mapStateToProps to map state to the requirements of a specific component

/*
// explanation of our state obects -- calendar and pizza
// pizza is an object with information about the food item
// calendar now makes reference to the food item pizza via a label
{
  pizza: {
    info
  }
}
{monday: {
  breakfast: 'pizza'
}}
*/

class App extends Component {
  /*
  doThing = () => {
  // this.props.dispatch(addRecipe({}))    // alternative - call directly
  this.props.selectRecipe({})                // or by using mapDispatchToProps bind below and call method
  }
*/
  render() {
    const { calendar, remove } = this.props
    const mealOrder = ['breakfast', 'lunch', 'dinner']
    return (
      <div className='calendar'>
          <div className='days'>
            {calendar.map(({ day }) => <h3 key={day} className='subheader'>{capitalize(day)}</h3>)}
          </div>
          <div className='icon-grid'>
            {calendar.map(({ day, meals }) => (
              <ul key={day}>
                {mealOrder.map((meal) => (
                  <li key={meal} className='meal'>
                    {meals[meal]
                      ? <div className='food-item'>
                          <img src={meals[meal].image} alt={meals[meal].label}/>
                          <button onClick={() => remove({meal, day})}>Clear</button>
                        </div>
                      : <button className='icon-btn'>
                          <CalendarIcon size={30}/>
                        </button>}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
    );
  }
}

function mapStateToProps({calendar, food}){
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  return {
     calendar: dayOrder.map((day) => ({
       day,
       meals: Object.keys(calendar[day]).reduce((meals, meal) => {
         meals[meal] = calendar[day][meal]
           ? food[calendar[day][meal]]
           : null

         return meals
       }, {})
     })),
  }
}

function mapDispatchToProps (dispatch) {
  return{
    selectRecipe: (data) => dispatch(addRecipe(data)),
    remove: (data) => dispatch(removeFromCalendar(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
