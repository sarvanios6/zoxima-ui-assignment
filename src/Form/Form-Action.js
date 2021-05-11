export const actionTypes = {
    UPDATE_FORM_FIELDS_DATA: "UPDATE_FORM_FIELDS_DATA",
    UPDATE_FORM_FIELDS: "UPDATE_FORM_FIELDS",
    PREFILL_FORM_FIELDS: "PREFILL_FORM_FIELDS"
}

export const updateFormFields = data => ({
        type: actionTypes.UPDATE_FORM_FIELDS,
        data
});

export const prefillFormFields = data => ({
    type: actionTypes.PREFILL_FORM_FIELDS,
    data
});
