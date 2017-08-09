import React, { Component } from 'react';
import { connect } from 'react-redux'
import {addRecipe, removeFromCalendar } from '../actions'

// note that the mapStateToProps function trnasform the calendar state from
// an object with day propertoies and embedded meal objects to
// an array of days of week with embedded object called meal

// difference between redux and react -- need an array in react to build a nice visual grid
// but in redux want to manage stae in an object
// need a transition per below to reshape the data the way we want
// ie use mapStateToProps to map state to the requirements of a specific component

class App extends Component {
  doThing = () => {
  // this.props.dispatch(addRecipe({}))    // alternative - call directly
  this.props.selectRecipe({})                // or by using mapDispatchToProps bind below and call method
  }

  render() {
    console.log(this.props)
    return (
      <div>
    Hello World
      </div>
    );
  }
}
function mapStateToProps(calendar){
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  return {
     calendar: dayOrder.map((day) => ({
       day,
       meals: Object.keys(calendar[day]).reduce((meals, meal) => {
         meals[meal] = calendar[day][meal]
           ? calendar[day][meal]
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
