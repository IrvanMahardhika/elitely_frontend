import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Method } from 'axios';
import { useNavigate } from 'react-router-dom';

import { Routes } from '../../constants/routes';

import request from '../../utils/request';

import styles from './SignUp.module.scss';

const SignUp = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isSignUpButtonDisabled = !firstName || !lastName || !address;

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      const payload = {
        first_name: firstName,
        last_name: lastName,
        address
      };

      const apiConfig = {
        path: 'http://127.0.0.1:8000/users/',
        method: 'POST' as Method,
        data: payload
      };

      await request(apiConfig);

      setIsLoading(false);
      navigate(Routes.list);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerText}>Sign Up page</div>
      <div className={styles.body}>
        <input
          aria-label="input-first-name"
          type="text"
          placeholder="First name"
          className={styles.inputField}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          aria-label="input-last-name"
          type="text"
          placeholder="Last name"
          className={styles.inputField}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <textarea
          aria-label="input-address"
          placeholder="Address"
          className={styles.textAreaField}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          aria-label="signUp-button"
          className={styles.signUpButton}
          disabled={isSignUpButtonDisabled}
          onClick={handleSignUp}
        >
          {isLoading ? (
            <CircularProgress
              aria-label="circular-progress"
              size={25}
              className={styles.loader}
            />
          ) : (
            <span aria-label="signUp-button-text">Sign Up</span>
          )}
        </button>
        <button
          className={styles.listButton}
          onClick={() => navigate(Routes.list)}
        >
          List
        </button>
      </div>
    </div>
  );
};

export default SignUp;
