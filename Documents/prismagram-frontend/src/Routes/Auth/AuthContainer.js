import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");

  const [requestSecret] = useMutation(LOG_IN, {
    update: (_, { data }) => {
      const { requestSecret } = data;
      if (!requestSecret) {
        toast.error("You don't have an account yet. Create one");
        setTimeout(() => setAction("sign up"), 2000);
      }
    },
    variables: { email: email.value },
  });

  const createAccount = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (action === "logIn") {
      if (email !== "") {
        requestSecret();
        email.value = "";
      } else {
        toast.error("Email is required");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        createAccount();
      } else {
        toast.error("All fields are required");
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      onSubmit={onSubmit}
    />
  );
};
