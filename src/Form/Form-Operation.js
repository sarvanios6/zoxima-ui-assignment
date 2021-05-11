import {updateFormFields} from "./Form-Action";
import {actionTypes} from "./Form-Action";
import { put, takeEvery } from "redux-saga/effects";

function* updateFields({data}) {
    yield put(updateFormFields(data));
}

export default function* watcherUpdateFormFields() {
    yield takeEvery(actionTypes.UPDATE_FORM_FIELDS_DATA, updateFields);
}
