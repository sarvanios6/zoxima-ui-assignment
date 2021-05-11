import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./Form.css";
import moment from "moment";

import * as formActions from "./Form-Action";
import axios from "axios";

const style = {
    inputBox: {
        padding: "6px",
        margin: "6px"
    },
    inputLabel: {
        width: "130px",
        display: "inline-block"
    }
};

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: {
                mandatory: true,
                errorMsg: ""
            },
            gender: {
                mandatory: true,
                errorMsg: ""
            },
            address: {
                mandatory: true,
                errorMsg: ""
            },
            zipCode: {
                mandatory: true,
                errorMsg: ""
            },
            phone: {
                mandatory: true,
                errorMsg: ""
            },
            emailId: {
                mandatory: false,
                errorMsg: ""
            },
            date: {
                mandatory: false,
                errorMsg: ""
            }
        };
    }

    validateForm = (data) => {
        const returnValid = {
            valid: true,
            errorMessage: ""
        };
        switch (data.name) {
            case "phone":
                if (data.val.length < 10) {
                    returnValid.valid = false;
                    returnValid.errorMessage = "Invalid Phone Number";
                } else {
                    returnValid.errorMessage = "";
                }
                break;
            case "zipCode":
                if (data.val.length < 5) {
                    returnValid.valid = false;
                    returnValid.errorMessage = "Invalid Zip Code";
                } else {
                    returnValid.errorMessage = "";
                }
                break;
            case "emailId":
                const reg = /\S+@\S+\.\S+/;
                if (!reg.test(data.val) && data.val.length > 0) {
                    returnValid.valid = false;
                    returnValid.errorMessage = "Invalid e-Mail Id";
                } else {
                    returnValid.errorMessage = "";
                }
                break;
            default:
                break;
        }

        return returnValid;
    }

    restrictInValidInput = (event) => {
        event.persist();
        const inputVal = event.target.value;
        const onlyNumbers = inputVal.replace(/[^0-9]/g, "");
        let allow = false;
        switch (event.target.name) {
            case "phone":
                if (inputVal.length <= 10 && inputVal === onlyNumbers) {
                    allow = true;
                }
                break;
            case "zipCode":
                if (inputVal.length <= 5 && inputVal === onlyNumbers) {
                    allow = true;
                }
                break;
            default:
                allow = true;
                break;
        }
        return allow;
    }

    validateMandatoryFields(key, data) {
        if (data[key].mandatory) {
            if (this.props.formInput[key].length === 0) {
                data[key].errorMsg = "This is an required field";
                return true;
            } else {
                const validateFieldInput = this.validateForm({
                    name: key,
                    val: this.props.formInput[key]
                });
                if (!validateFieldInput.valid) {
                    data[key].errorMsg = validateFieldInput.errorMessage;
                    return true;
                } else {
                    data[key].errorMsg = "";
                    return false;
                }
            }
        } else {
            const validateFieldInput = this.validateForm({
                name: key,
                val: this.props.formInput[key]
            });
            if (!validateFieldInput.valid) {
                data[key].errorMsg = validateFieldInput.errorMessage;
                return true;
            } else {
                data[key].errorMsg = "";
                return false;
            }
        }
    }

    handleSubmit = () => {
        let flagError = { ...this.state };
        const validateFields = Object.keys(this.state).map(key => {
            return this.validateMandatoryFields(key, flagError);
        });
        this.setState(flagError);
        console.log(validateFields, validateFields.indexOf(true));
        if (validateFields.indexOf(true) >= 0) {
            console.log("validation failed", this.props.formInput);
        } else {
            console.log("validation success", this.props.formInput);
            axios.post('https://localhost:3000/post-form-data', this.props.formInput)
                .then(response => console.log(response))
                .catch(e => alert(e));
        }
    }

    handleOnBlur = (event) => {
        const {value, name} = event.target
        const inputVal = {
            val: value,
            name: name
        };
        const validated = this.validateForm(inputVal);
        let flagError = { ...this.state };
        flagError[inputVal.name].errorMsg = validated.errorMessage;
        console.log("incorrect", validated.errorMessage, flagError);
        this.setState(flagError);
    }

    handleChange = (event) => {
        const allowUpdate = this.restrictInValidInput(event);
        if (allowUpdate) {
            this.props.updateFormFields(event);
        }
    }

    preFillValues = () => {
        this.props.prefillFormFields({
            name: "Saravanakumar",
            gender:'male',
            address: "1, palacode, dharmapuri",
            zipCode: "0009",
            phone: "98989898989",
            emailId: "sarvan@gmail.com",
            date: moment().format('YYYY-MM-DD')
        });
    }
    render() {
        return (
            <div className='form-container'>
                <div className='form-class'>
                    <div style={style.inputBox}>
                        <label style={style.inputLabel} htmlFor="name">
                            Name{" "}
                        </label>
                        <input
                            type="text"
                            value={this.props.formInput.name}
                            onChange={this.handleChange}
                            onBlur={this.handleOnBlur}
                            name="name"
                        />
                        <span className='error-msg'>{this.state.name.errorMsg}</span>
                    </div>
                    <div style={style.inputBox}>
                        <label style={style.inputLabel} htmlFor="name">
                            Gender{" "}
                        </label>
                        <select
                            value={this.props.formInput.gender}
                            onChange={this.handleChange}
                            onBlur={this.handleOnBlur}
                            name="gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <span className='error-msg'>{this.state.name.errorMsg}</span>
                    </div>
                    <div style={style.inputBox}>
                        <label style={style.inputLabel} htmlFor="name">
                            Address{" "}
                        </label>
                        <input
                            type="text"
                            value={this.props.formInput.address}
                            name="address"
                            onChange={this.handleChange}
                            onBlur={this.handleOnBlur}
                        />
                        <span className='error-msg'>{this.state.address.errorMsg}</span>
                    </div>
                    <div style={style.inputBox}>
                        <label style={style.inputLabel} htmlFor="name">
                            Zip Code{" "}
                        </label>
                        <input
                            type="text"
                            value={this.props.formInput.zipCode}
                            name="zipCode"
                            onChange={this.handleChange}
                            onBlur={this.handleOnBlur}
                            />
                        <span className='error-msg'>{this.state.zipCode.errorMsg}</span>
                    </div>
                    <div style={style.inputBox}>
                        <label style={style.inputLabel} htmlFor="name">
                            Phone{" "}
                        </label>
                        <input
                            type="text"
                            value={this.props.formInput.phone}
                            name="phone"
                            onChange={this.handleChange}
                            onBlur={this.handleOnBlur}
                        />
                        <span className='error-msg'>{this.state.phone.errorMsg}</span>
                    </div>
                    <div style={style.inputBox}>
                        <label style={style.inputLabel} htmlFor="name">
                            Email Id{" "}
                        </label>
                        <input
                            type="text"
                            value={this.props.formInput.emailId}
                            name="emailId"
                            onChange={this.handleChange}
                            onBlur={this.handleOnBlur}
                        />
                        <span className='error-msg'>{this.state.emailId.errorMsg}</span>
                    </div>
                    <div style={style.inputBox}>
                        <label style={style.inputLabel} htmlFor="name">
                            Date{" "}
                        </label>
                        <input
                            type="date"
                            value={this.props.formInput.date}
                            onChange={this.handleChange}
                            onBlur={this.handleOnBlur}
                            name="date"
                        />
                        <span className='error-msg'>{this.state.name.errorMsg}</span>
                    </div>
                    <div className='button-container'>
                        <div style={style.inputBox}>
                            <input className='button' type="button" value="Pre-Fill Values" onClick={this.preFillValues}/>
                        </div>
                        <div style={style.inputBox}>
                            <input className='button' type="button" value="Submit" onClick={this.handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    formInput: state.formFields
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        updateFormFields: formActions.updateFormFields,
        prefillFormFields: formActions.prefillFormFields
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
