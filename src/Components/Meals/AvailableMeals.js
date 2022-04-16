import { useEffect, useState } from 'react';
import Card from '../UserInterface/card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';


const AvailableMeals =() => {
  const [meals, setMeals] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMenu = async () => {
      const response = await fetch('https://eggciting-63c92-default-rtdb.firebaseio.com/Breakfast.json');
      
      if(!response.ok){
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id:key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

  
    fetchMenu().catch ((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    })
    

  },[]);

    if (isLoading){
      return (
        <section className={classes.mealsLoading}>
          <p> Loading...</p>
        </section>
      )
    }

    if(httpError){
      return (<section className={classes.mealsError}>
        <p> Failed to fetch!</p>
      </section>);
    }

    const mealsList = meals.map(meal=>(
    <MealItem
        id={meal.id}
        key = {meal.id}
        name = {meal.name}
        description = {meal.description}
        price = {meal.price}
    />));
return <section className={classes.meals}>
    <Card>
        <ul>
            {mealsList}
        </ul>
    </Card>
</section>
}
export default AvailableMeals;