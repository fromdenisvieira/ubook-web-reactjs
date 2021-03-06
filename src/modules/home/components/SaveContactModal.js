import React, { PureComponent } from "react";
import { connect } from "react-redux";
import * as HomeActions from "../HomeActions";
import Colors from "../../../assets/Colors";
import Strings from "../../../assets/Strings";
import injectSheet from "react-jss";
import Modal from "react-modal";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import { ValidatorForm } from "react-form-validator-core";
import { AddContactFormValidators } from "../HomeTypes";
import formatStringByPattern from "format-string-by-pattern";

class SaveContactModal extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      submitIsDisabled: true,
      name: "",
      email: "",
      phoneNumber: ""
    };
  }
  
  state = {
    submitIsDisabled: true,
    id: null,
    name: "",
    email: "",
    phoneNumber: ""
  };

  componentWillReceiveProps(props) {
    const {
      contactWasSaved,
      contact,
      closeModal,
      contactWasSavedAction
    } = props;
    
    if (contactWasSaved) {
      closeModal();
      contactWasSavedAction(null);
      this.updateField({ name: "", email: "", phoneNumber: "" });
    }

    if (contact) {
      this.setState({
        id: contact.id,
        name: contact.name,
        email: contact.email,
        phoneNumber: contact.phoneNumber,
        submitIsDisabled: false
      });
    }
  }

  onClickSubmit() {
    const { id, name, email, phoneNumber } = this.state;
    const contact = {
      id,
      name,
      email,
      phoneNumber
    };

    this.props.saveContact(contact);
  }

  updateField(fieldObject) {
    this.setState(fieldObject, async () => {
      if (this.form) {
        const formIsValid = await this.form.isFormValid();

        this.setState({
          submitIsDisabled: !formIsValid
        });
      }
    });
  }

  formatPhoneNumber = anyString => {
    const onlyNumbers = anyString.replace(/[^\d]/g, '');
  
    return formatStringByPattern('(82) 99999-9999', onlyNumbers);
  };

  render() {
    const {
      classes,
      isOpen,
      closeModal,
      isCreatingContact
    } = this.props;
    const { name, email, phoneNumber, submitIsDisabled } = this.state;
    return (
      <Modal isOpen={isOpen} style={styles.customStyles}>
        <header className={classes.addContactHeader}>
          <label className={classes.mainTitle}>
            {Strings.createANewContact}
          </label>
        </header>
        <ValidatorForm
          ref={node => (this.form = node)}
          className={classes.addContactForm}
          onSubmit={e => this.onClickSubmit(e)}
        >
          <hr />
          <div className={classes.addContactFields}>
            <InputField
              onChange={text => this.updateField({ name: text })}
              styles={styles.addContactField}
              title={Strings.name}
              name="name"
              value={name}
              {...AddContactFormValidators.name}
            />
            <InputField
              onChange={text => this.updateField({ email: text })}
              styles={styles.addContactField}
              name="email"
              value={email}
              title={Strings.email}
              {...AddContactFormValidators.email}
            />
            <InputField
              onChange={text => this.updateField({ phoneNumber: this.formatPhoneNumber(text) })}
              styles={styles.addContactField}
              name="phoneNumber"
              value={phoneNumber}
              title={Strings.phoneNumber}
              {...AddContactFormValidators.phoneNumber}
            />
          </div>
          <hr />
          <div className={classes.addContactfooter}>
            <label
              className={classes.cancelButton}
              onClick={() => closeModal()}
            >
              {Strings.cancel}
            </label>
            <Button
              textColor={Colors.white}
              color={Colors.lightPink}
              isDisabled={submitIsDisabled}
              isLoading={isCreatingContact}
              text={Strings.save}
              type="submit"
            />
          </div>
        </ValidatorForm>
      </Modal>
    );
  }
}

const styles = {
  mainTitle: {
    fontSize: "1.143em"
  },
  addContactHeader: {
    paddingTop: "1.143em",
    paddingLeft: "1.143em",
    paddingBottom: "0.893em"
  },
  addContactField: {
    marginTop: "1em"
  },
  addContactFields: {
    paddingTop: "0.393em",
    paddingBottom: "1.571em",
    paddingLeft: "1.714em",
    paddingRight: "1.714em"
  },
  addContactfooter: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: "1.071em",
    paddingBottom: "1.143em",
    paddingRight: "1.143em"
  },
  cancelButton: {
    marginRight: "1.143em",
    color: Colors.lightPink,
    cursor: "pointer"
  },
  customStyles: {
    content: {
      display: "flex",
      width: "30.857em",
      height: "27.429em",
      flexDirection: "column",
      borderRadius: "1em",
      padding: 0,
      position: "absolute",
      top: "25%",
      left: "35%",
      marginTop: "-50px",
      marginLeft: "-50px"
    }
  }
};

const mapStateToProps = state => ({
  isSavingContact: state.home.isSavingContact,
  contactWasSaved: state.home.contactWasSaved
});

const mapDispatchToProps = {
  saveContact: HomeActions.saveContact,
  contactWasSavedAction: HomeActions.contactWasSaved
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(SaveContactModal));
