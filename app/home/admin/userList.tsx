import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import React from "react";
import { View, StyleSheet } from "react-native";
import { List, Text, useTheme } from "react-native-paper";
import { useRouter, useFocusEffect } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import {
  loadingUsersListSelector,
  usersListSelector,
} from "@/selectors/usersSelectors";
import { fetchUsers } from "@/slices/usersSlice";
import { sessionDataSelector } from "@/selectors/sessionSelector";
import LoadingOverlay from "@/components/LoadingOverlay";
import { User, UserRole, roleDisplayNames } from "@/types/Users";

export const getRoleColor = (role: UserRole) => {
  switch (role) {
    case UserRole.ADMIN_SYSTEM:
      return "#FF5252"; // Red
    case UserRole.ADMIN_COMPANY:
      return "#FF9800"; // Orange
    case UserRole.TOURIST_GUIDE:
      return "#4CAF50"; // Green
    case UserRole.TOURIST:
      return "#2196F3"; // Blue
    default:
      return "#757575"; // Grey
  }
};

const UserList = () => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const usersList = useSelector(usersListSelector);
  const isLoadingUsersList = useSelector(loadingUsersListSelector);
  const sessionData = useSelector(sessionDataSelector);

  const handleUserPress = (userId: string) => {
    router.push(`/home/admin/userDetail?userId=${userId}`);
  };

  const fetchUsersData = React.useCallback(() => {
    if (sessionData) {
      dispatch(fetchUsers());
    }
  }, [sessionData, dispatch]);

  // Fetch on initial mount
  React.useEffect(() => {
    fetchUsersData();
  }, [fetchUsersData]);

  // Fetch when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchUsersData();
    }, [fetchUsersData])
  );

  return (
    <CustomSafeAreaView>
      <LoadingOverlay
        visible={isLoadingUsersList}
        message="Cargando usuarios..."
      />
      <List.Section>
        {usersList?.map((user: User) => {
          return (
            <List.Item
              key={user.id}
              title={user.name}
              description={
                <View style={styles.descriptionContainer}>
                  <Text style={styles.emailText}>{user.email}</Text>
                  <View style={styles.rolesContainer}>
                    {user?.roles?.map((role, index) => (
                      <View
                        key={index}
                        style={[
                          styles.roleContainer,
                          { backgroundColor: getRoleColor(role) },
                        ]}
                      >
                        <Text style={styles.roleText}>{roleDisplayNames[role]}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              }
              left={(props) => <List.Icon {...props} icon="account" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              style={styles.listItem}
              onPress={() => handleUserPress(user.id)}
            />
          );
        })}
      </List.Section>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  descriptionContainer: {
    flexDirection: "column",
    gap: 4,
  },
  emailText: {
    fontSize: 14,
    color: "#666",
  },
  rolesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  roleContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default UserList;
