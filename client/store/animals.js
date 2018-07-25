import axios from 'axios';

const GET_ANIMALS = "GET_ANIMALS";


const setAnimals = (animals) => ({
  type: GET_ANIMALS,
  animals
})

export const fetchAnimals = async (dispatch) => {
  try {
    const { data } = await axios.get('/api/animals');
    dispatch(setAnimals(data));
  }
  catch (err) {
    console.log(err);
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_ANIMALS:
      return action.animals;
    default:
      return state
  }
}