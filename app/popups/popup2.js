import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Popup2 = ({ onClose }) => {
  const [user, setUser] = useState(null);
  const [targetAmount, setTargetAmount] = useState(
    localStorage.getItem("targetAmount") || ""
  );

  // Listen for authentication state changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  // Save the target amount to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("targetAmount", targetAmount);
  }, [targetAmount]);

  const handleTargetChange = (e) => {
    setTargetAmount(e.target.value); // Update the target amount state
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        {user ? (
          <>
            <img
              src={
                user.photoURL ||
                "https://cdn4.iconfinder.com/data/icons/rounded-black-basic-ui/139/Profile01-RoundedBlack-512.png"
              }
              alt="Profile Icon"
              style={styles.profilePicture}
            />
            <h2 style={styles.heading}>Profile</h2>
            <div style={styles.details}>
              <p>
                <strong>Name:</strong> {user.displayName || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Joined:</strong> {user.metadata?.creationTime || "N/A"}
              </p>
            </div>
            <div style={styles.details}>
              <p>
                <strong>Set Your Spending Target:</strong>
              </p>
              <input
                type="number"
                value={targetAmount}
                onChange={handleTargetChange}
                style={styles.input}
                placeholder="Enter amount"
              />
              {targetAmount && (
                <p style={{ marginTop: "10px" }}>
                  <strong>Current Target:</strong> ${targetAmount}
                </p>
              )}
            </div>
          </>
        ) : (
          <p style={styles.details}>Loading user information...</p>
        )}
        <button style={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "#3E364A",
    padding: "30px",
    border: "5px solid #9083A5",
    borderRadius: "15px",
    textAlign: "center",
    fontFamily: "VT323, serif",
    color: "#f5eed5",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    width: "400px",
    maxWidth: "90%",
  },
  profilePicture: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "20px",
    border: "3px solid #FFFDED",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
  },
  details: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "18px",
    lineHeight: "1.5",
    color: "#DADADA",
  },
  input: {
    marginTop: "10px",
    padding: "8px",
    borderRadius: "5px",
    border: "2px solid #FFFDED",
    width: "100%",
    fontFamily: "VT323, serif",
    fontSize: "18px",
    textAlign: "center",
  },
  closeButton: {
    marginTop: "20px",
    backgroundColor: "#FFC0CB",
    border: "2px solid #9083A5",
    padding: "10px 25px",
    borderRadius: "5px",
    fontFamily: "VT323, serif",
    fontSize: "20px",
    color: "#FFFDED",
    cursor: "pointer",
  },
};

export default Popup2;
