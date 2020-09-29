import {
  MAKE_TRANSLATION_INIT,
  MAKE_TRANSLATION_SUCCESS,
  MAKE_TRANSLATION_FAILURE,
} from "../types/translationTypes";
import axios from "axios";
function translateTextRequest(message, fromLanguage, toLanguage) {
  return {
    message,
    fromLanguage,
    toLanguage: [toLanguage],
  };
}

export const translateTextAction = (
  message,
  fromLanguage,
  toLanguage
) => async (dispatch) => {
  dispatch({ type: MAKE_TRANSLATION_INIT });
  axios
    .post(
      process.env.URL_BACKEND_TRANSLATE,
      translateTextRequest(message, fromLanguage, toLanguage),
      {}
    )
    .then((response) => {
      console.log(`response API: ${response.data}`);
      dispatch({
        type: MAKE_TRANSLATION_SUCCESS,
        payload: response.data[0].translations[0],
      });
    })
    .catch((error) =>
      dispatch({ type: MAKE_TRANSLATION_FAILURE, payload: error })
    );
};
