import React, { PureComponent } from "react";
import injectSheet from "react-jss";
import { emptyBookImg} from "../../../assets/Images";
import Colors from "../../../assets/Colors";
import Strings from "../../../assets/Strings";
import ContactItem from "./ContactItem"
import AddContactButton from "./AddContactButton"
import ContactListHeader from "./ContactListHeader"

class ContactList extends PureComponent {

  render() {
    const { contacts, classes } = this.props;

    return (
      <div className={classes.mainContainerStyle}>
        
        {contacts && contacts.length !== 0 ? (
          <div>
            <ContactListHeader />
            <div className={classes.contactsContainer}>
              {contacts.map((item, index) => (
                <ContactItem contact={item} key={index}/>
              ))}
            </div>
          </div>
        ) : (
            <div className={classes.noneContactContainer}>
            <img
              className={classes.emptyBookImgStyle}
              src={emptyBookImg}
              alt={Strings.noneContactCreated}
            />
            <label className={classes.noneContactLabel}>{Strings.noneContactCreated}</label>
            <AddContactButton 
              styles={styles.addContactButtonStyle}
            />
          </div>
        )}
      </div>
    );
  }
}

const styles = {
  mainContainerStyle: props => ({
    ...props.styles,

  }),
  addContactButtonStyle: {
    marginTop: "1.5em"
  },
  noneContactContainer: {
    display: "flex",
    marginTop: "7em",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  noneContactLabel: {
    marginTop: "1.5em",
    fontSize: "1em",
    color: Colors.lightBlack
  },
  emptyBookImgStyle: {
    width: "14.813em",
    height: "12.500em",
    display: "flex",
    flexDirection: "horizontal",
    marginTop: "1em"
  }
};


export default injectSheet(styles)(ContactList);
