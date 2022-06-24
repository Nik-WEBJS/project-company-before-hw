import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";
import comentsService from "../services/coment.srvice";
import { toast } from "react-toastify";

const ComentsContext = React.createContext();

export const useComents = () => {
  return useContext(ComentsContext);
};

export const ComentsProvider = ({ children }) => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [coments, setComents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getComents();
  }, [id]);
  async function createComent(data) {
    const coment = {
      ...data,
      pageId: id,
      created_at: Date.now(),
      userId: currentUser._id,
      _id: nanoid()
    };
    try {
      const { content } = await comentsService.createComent(coment);
      setComents((prevState) => [...prevState, content]);
    } catch (error) {
      errorCather(error);
    }
  }

  async function getComents() {
    try {
      const { content } = await comentsService.getComments(id);
      setComents(content);
    } catch (error) {
      errorCather(error);
    } finally {
      setLoading(false);
    }
  }

  async function removeComent(id) {
    try {
      const { content } = await comentsService.removeComment(id);
      if (content === null) {
        setComents((prevState) => prevState.filter((c) => c._id !== id));
      }
    } catch (error) {
      errorCather(error);
    }
  }

  function errorCather(error) {
    const { message } = error.response.data;
    setError(message);
  }

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  });
  return (
    <ComentsContext.Provider
      value={{ coments, createComent, isLoading, removeComent }}
    >
      {children}
    </ComentsContext.Provider>
  );
};

ComentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
