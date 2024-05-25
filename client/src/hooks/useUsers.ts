import { useEffect } from "react";
import { useAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/user";
import * as userAtoms from "../atoms/user";
import useNotification from "./useNotification";
import useLoading from "./useLoading";

export default function useUsers() {
  const [users, setUsers] = useAtom(userAtoms.users);
  const [filter, setFilter] = useAtom(userAtoms.filter);
  const [sortModel, setSortModel] = useAtom(userAtoms.sortModel);
  const [pagination, setPagination] = useAtom(userAtoms.pagination);
  const { showNotification } = useNotification();
  const { showLoading, closeLoading, isLoading } = useLoading();

  const key = ["users"];
  const { refetch } = useQuery({
    queryKey: key,
    queryFn: () => {
      const params = {
        ...filter,
        sortBy: sortModel.field,
        sortType: sortModel.sort,
        ...pagination,
      }
      return getUsers(params);
    },
    enabled: false,
  });


  useEffect(() => {
    fetchUsers();
  }, [pagination.page, pagination.take, sortModel.field, sortModel.sort]);

  const fetchUsers = async () => {
    showLoading();
    const { data: response, isError, isSuccess, error } = await refetch();
    if (isSuccess) {
      setUsers(response.data ?? []);
      setPagination((prev) => ({ ...prev, totalItems: response.totalItems }));
    }
    if (isError) {
      showNotification(error.message);
    }
    closeLoading();
  };

  const resetSortModel = () => {
    setSortModel(userAtoms.DEFAULT_SORT_MODEL);
  }

  return {
    isLoadingUser: isLoading,
    getUsers: fetchUsers,
    users,
    usersFilter: filter,
    setUsersFilter: setFilter,
    usersSort: sortModel,
    setUsersSort: setSortModel,
    resetSortModel,
    usersPagination: pagination,
    setUsersPagination: setPagination,
    usersSortModel: sortModel,
  }
}