import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Searchbar, List, Text, Surface, useTheme, ActivityIndicator } from 'react-native-paper';

// Mock data - replace with actual API call
const searchUsers = async (query: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const mockUsers = [
    { id: '1', name: 'Juan Pérez', email: 'juan.perez@example.com' },
    { id: '2', name: 'María García', email: 'maria.garcia@example.com' },
    { id: '3', name: 'Carlos Rodríguez', email: 'carlos.rodriguez@example.com' },
    { id: '4', name: 'Ana Martínez', email: 'ana.martinez@example.com' },
    { id: '5', name: 'Pedro López', email: 'pedro.lopez@example.com' },
  ];

  return mockUsers.filter(user => 
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.email.toLowerCase().includes(query.toLowerCase())
  );
};

interface User {
  id: string;
  name: string;
  email: string;
}

interface AdminSearchProps {
  onSelect: (user: User) => void;
  initialValue?: User;
}

const AdminSearch = ({ onSelect, initialValue }: AdminSearchProps) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(initialValue);

  useEffect(() => {
    const search = async () => {
      if (searchQuery.length < 2) {
        setUsers([]);
        return;
      }

      setLoading(true);
      try {
        const results = await searchUsers(searchQuery);
        setUsers(results);
      } catch (error) {
        console.error('Error searching users:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(search, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSelect = (user: User) => {
    setSelectedUser(user);
    setSearchQuery(user.name);
    setShowResults(false);
    onSelect(user);
  };

  const handleSearchFocus = () => {
    if (searchQuery.length >= 2) {
      setShowResults(true);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setShowResults(true);
    if (query.length < 2) {
      setUsers([]);
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar administrador..."
        onChangeText={handleSearchChange}
        onFocus={handleSearchFocus}
        value={searchQuery}
        style={styles.searchbar}
      />

      {showResults && (searchQuery.length >= 2) && (
        <Surface style={[styles.resultsContainer, { backgroundColor: theme.colors.surface }]} elevation={4}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator />
            </View>
          ) : users.length > 0 ? (
            <ScrollView style={styles.resultsList} keyboardShouldPersistTaps="handled">
              {users.map((user) => (
                <List.Item
                  key={user.id}
                  title={user.name}
                  description={user.email}
                  onPress={() => handleSelect(user)}
                  style={[
                    styles.resultItem,
                    selectedUser?.id === user.id && { backgroundColor: theme.colors.surfaceVariant }
                  ]}
                />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.noResults}>
              <Text>No se encontraron resultados</Text>
            </View>
          )}
        </Surface>
      )}

      {selectedUser && (
        <View style={styles.selectedContainer}>
          <Text variant="bodySmall" style={[styles.selectedLabel, { color: theme.colors.onSurfaceVariant }]}>
            Administrador seleccionado:
          </Text>
          <Text variant="bodyMedium" style={[styles.selectedName, { color: theme.colors.onSurface }]}>
            {selectedUser.name}
          </Text>
          <Text variant="bodySmall" style={[styles.selectedEmail, { color: theme.colors.onSurfaceVariant }]}>
            {selectedUser.email}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  searchbar: {
    marginBottom: 8,
  },
  resultsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    maxHeight: 200,
    borderRadius: 4,
    zIndex: 2,
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
  },
  resultsList: {
    maxHeight: 200,
  },
  resultItem: {
    paddingVertical: 8,
  },
  noResults: {
    padding: 16,
    alignItems: 'center',
  },
  selectedContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  selectedLabel: {
    marginBottom: 4,
  },
  selectedName: {
    fontWeight: '500',
  },
  selectedEmail: {
    marginTop: 2,
  },
});

export default AdminSearch; 