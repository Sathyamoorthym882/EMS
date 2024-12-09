import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";

const AgreementContext = createContext();

const API_BASE_URL = "http://localhost:5000/agreements";

const initialState = {
  agreements: [],
  loading: true,
  error: null,
};

const agreementReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, agreements: action.payload, loading: false };
    case "CREATE_SUCCESS":
      return { ...state, agreements: [...state.agreements, action.payload] };
    case "UPDATE_SUCCESS":
      return {
        ...state,
        agreements: state.agreements.map((agreement) =>
          agreement.id === action.payload.id ? action.payload : agreement
        ),
      };
    case "DELETE_SUCCESS":
      return {
        ...state,
        agreements: state.agreements.filter((agreement) => agreement.id !== action.payload),
      };
    case "SET_LOADING":
      return { ...state, loading: true };
    case "FETCH_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const AgreementProvider = ({ children }) => {
  const [state, dispatch] = useReducer(agreementReducer, initialState);

  const loadAgreements = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.get(API_BASE_URL);
      dispatch({ type: "FETCH_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };

  const addAgreement = async (agreement) => {
    try {
      const response = await axios.post(API_BASE_URL, agreement);
      dispatch({ type: "CREATE_SUCCESS", payload: response.data });
    } catch (error) {
      console.error("Error adding agreement:", error);
    }
  };

  const editAgreement = async (id, updatedAgreement) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, updatedAgreement);
      dispatch({ type: "UPDATE_SUCCESS", payload: response.data });
    } catch (error) {
      console.error("Error updating agreement:", error);
    }
  };

  const deleteAgreement = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      dispatch({ type: "DELETE_SUCCESS", payload: id });
    } catch (error) {
      console.error("Error deleting agreement:", error);
    }
  };

  return (
    <AgreementContext.Provider
      value={{
        ...state,
        loadAgreements,
        addAgreement,
        editAgreement,
        deleteAgreement,
      }}
    >
      {children}
    </AgreementContext.Provider>
  );
};

export const useAgreementContext = () => useContext(AgreementContext);