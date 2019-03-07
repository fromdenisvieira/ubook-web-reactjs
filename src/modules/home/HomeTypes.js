import Strings from "../../assets/Strings";

export const UPDATE_CONTACTS = "UPDATE_CONTACTS";
export const IS_FETCHING_CONTACTS = "IS_FETCHING_CONTACTS";
export const IS_CREATING_CONTACT = "IS_CREATING_CONTACT";
export const CONTACT_WAS_ADDED = "CONTACT_ADDED";
export const CLEAN_CONTACT_WAS_ADDED = "CLEAN_CONTACT_WAS_ADDED";

export const AddContactFormValidators = {
  name: {
    validators: ["required"],
    errorMessages: [Strings.requiredError]
  },
  email: {
    validators: ["required", "isEmail"],
    errorMessages: [Strings.requiredError, Strings.emailRequiredError]
  },
  phoneNumber: {
    validators: ["required"],
    errorMessages: [Strings.requiredError]
  }
};