import React from "react";
import "./NotLoggedInModal.css";

const NotLoggedInModal = () => {
  const [counter, setCounter] = React.useState(3);

  React.useEffect(() => {
    if (counter === 0) {
      window.location.href = "/login";
    }
    const timer = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div className="not-logged-in-overlay">
      <div className="not-logged-in-modal">
        <h2>You are not logged in</h2>
        <p>Redirecting to Login Page in <strong>{counter}</strong> sec...</p>
      </div>
    </div>
  );
};

export default NotLoggedInModal;
