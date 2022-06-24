import React from "react";
import Coment from "./coment";
import _ from "lodash";
import AddComment from "./addComment";
import { useComents } from "../../../../hooks/useComents";
import Loader from "../../../ui/loader";

const CommentsList = () => {
  const { coments, isLoading, removeComent } = useComents();
  const { createComent } = useComents();

  const handleSubmit = (data) => {
    createComent(data);
  };

  const handleRemoveComent = (id) => {
    removeComent(id);
  };

  // const sertedComents = coments.sort((a, b) => a.created_at < b.created_at);
  const sortedComents = _.orderBy(coments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <AddComment onSubmit={handleSubmit} />
        </div>
      </div>
      {!isLoading ? (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {sortedComents.map((coment) => (
              <Coment
                key={coment._id}
                {...coment}
                onRemove={() => handleRemoveComent(coment._id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CommentsList;
