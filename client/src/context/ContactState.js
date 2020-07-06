import react, { useReducer } from "react";
import uuid from "uuid";
import contactContext from "./contactContext";
import ContactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../Types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        email: "unbeatable@hotmail.com"
      },
      {
        id: 2,
        email: "theblizzard@yahoo.com"
      },
      {
        id: 3,
        email: "redhands@resistance.com"
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //add contact

  //delete contact

  //set current contact

  //clear current contact

  //update contact

  //filter contacts

  //clear filter

  return (
    <contactContext.Provider>
      value=
      {{
        contacts: state.contacts
      }}
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
