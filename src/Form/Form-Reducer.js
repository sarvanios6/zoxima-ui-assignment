import {actionTypes} from "./Form-Action";
import moment from "moment";

const initialState = {
    formFields: {
        name: "",
        gender:"male",
        address: "",
        zipCode: "",
        phone: "",
        emailId: "",
        date: moment().format('YYYY-MM-DD')
    }
}
const reducer = (state = initialState.formFields, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_FORM_FIELDS:
            const event = action.data;
            console.log('UPDATE_FORM_FIELDS>>>', event.target.name, event.target.value)
            switch (event.target.name) {
                case "name":
                    return {
                        ...state,
                        name: event.target.value
                    };
                case "gender":
                    return {
                        ...state,
                        gender: event.target.value
                    };
                case "address":
                    return {
                        ...state,
                        address: event.target.value
                    };
                case "zipCode":
                    return {
                        ...state,
                        zipCode: event.target.value
                    };
                case "phone":
                    return {
                        ...state,
                        phone: event.target.value
                    };
                case "emailId":
                    return {
                        ...state,
                        emailId: event.target.value
                    };
                case "date":
                    return {
                        ...state,
                        date: event.target.value
                    };
                default:
                    return state;
            }
        case actionTypes.PREFILL_FORM_FIELDS:
            const data = action.data;
            return {
                ...state,
                name: data.name,
                gender: data.gender,
                address: data.address,
                zipCode: data.zipCode,
                phone: data.phone,
                emailId: data.emailId,
                date: data.date
            };
        default:
            return state;
    }
};

export default reducer;
