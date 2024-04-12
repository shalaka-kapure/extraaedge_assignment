import React, { useEffect } from "react";
import "./styles/style.css";
import CardComponent from "./components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./redux/UserReducer";
import Loader from "./components/Loader";

function Container() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  
  console.log("data", data);
  return (
    <>
      {data.isLoading ? (
        <Loader />
      ) : (
        <div className="main">
          {data.users.map((user, index) => {
            return <CardComponent key={index} user={user}/>;
          })}
        </div>
      )}
    </>
  );
}

export default Container;
