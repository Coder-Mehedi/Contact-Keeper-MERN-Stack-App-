import React, { useReducer } from 'react'
import uuid from 'uuid'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import axios from 'axios'

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
}
from '../types'


const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    }
    const [state, dispatch] = useReducer(ContactReducer, initialState)

    // Get Contacts
    const getContacts = async() => {

        try {
            const res = await axios.get('http://107.23.8.230:8080/api/contacts')
            dispatch({ type: GET_CONTACTS, payload: res.data })
        }
        catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }


    }

    // Add Contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('http://107.23.8.230:8080/api/contacts', contact, config)
            dispatch({ type: ADD_CONTACT, payload: res.data })
        }
        catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }


    }

    // Delete Contact
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id })
    }

    // Clear Contacts
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS })
    }

    // Set current Contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact })
    }

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }

    // Update The Contact
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact })
    }

    // Filter Contacts
    const filterContact = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }

    // Clear Filter Contact
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            getContacts,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContact,
            clearFilter,
            clearContacts
        }}>
            { props.children}
        </ContactContext.Provider>
    )

}

export default ContactState
