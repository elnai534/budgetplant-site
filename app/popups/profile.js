import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Profile = ({ onClose }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [joined, setJoined] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  // Update localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("joined", joined);
    localStorage.setItem("targetAmount", targetAmount);
  }, [name, joined, targetAmount]);

  const handleNameChange = (e) => {
    setName(e.target.value); // Update name
  };

  const handleTargetAmountChange = (e) => {
    setTargetAmount(e.target.value); // Update target amount
  };

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
    textAlign: "center", // Center all text inside the popup
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
    textAlign: "center", // Ensure text in details is also centered
    marginBottom: "20px",
    fontSize: "18px",
    lineHeight: "1.5",
    color: "#DADADA",
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

export default Profile;
