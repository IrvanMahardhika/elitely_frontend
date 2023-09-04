import React, { useState, useEffect, useCallback } from 'react';
import { CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Method } from 'axios';

import request from 'utils/request';

import { GetUserListResponse, User } from 'types/user';

import styles from './List.module.scss';

const List = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<User[]>([]);

  const getUserList = useCallback(async () => {
    try {
      setIsLoading(true);
      const apiConfig = {
        path: 'http://127.0.0.1:8000/users/',
        method: 'GET' as Method
      };
      const response = (await request(apiConfig)) as GetUserListResponse;
      setUserList(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  const deleteUser = async (id: number) => {
    try {
      setIsLoading(true);
      const deleteUserApiConfig = {
        path: `http://127.0.0.1:8000/users/${id}`,
        method: 'DELETE' as Method
      };
      await request(deleteUserApiConfig);

      const getNewUserListApiConfig = {
        path: 'http://127.0.0.1:8000/users/',
        method: 'GET' as Method
      };
      const response = (await request(
        getNewUserListApiConfig
      )) as GetUserListResponse;
      setUserList(response.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  return (
    <div className={styles.mainContainer}>
      {isLoading ? (
        <div className={styles.spinnerWrapper}>
          <CircularProgress
            aria-label="circular-progress"
            size={55}
            className={styles.loader}
          />
        </div>
      ) : (
        <div className={styles.listWrapper}>
          <div className={styles.headerText}>List page</div>
          <div className={styles.userListWrapper}>
            {userList.map((u: User) => {
              return (
                <div key={u.id.toString()} className={styles.userCard}>
                  <div>
                    {u.first_name} {u.last_name}
                  </div>
                  <div>{u.address}</div>
                  <div
                    className={styles.deleteButton}
                    onClick={() => deleteUser(u.id)}
                  >
                    <DeleteIcon />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
