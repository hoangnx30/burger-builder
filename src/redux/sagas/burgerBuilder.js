import { put } from "redux-saga/effects";
import {
  fetchIngredientsFail,
  setIngredients,
} from "../action/burgerBuilder.action";
import axiosInstance from "../../axios-order";

export function* initIngredientSaga(action) {
  try {
    const response = yield axiosInstance.get(
      "https://burger-builder-81c53.firebaseio.com/ingredients.json"
    );
    yield put(setIngredients(response.data));
  } catch (error) {
    yield put(fetchIngredientsFail());
  }
}
