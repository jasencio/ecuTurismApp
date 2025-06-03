import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Searchbar, List, Text, Surface, useTheme, ActivityIndicator, Portal, IconButton } from 'react-native-paper';

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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(initialValue);

  const openModal = () => {
    setModalVisible(true);
    setSearchQuery('');
    setUsers([]);
  };

  const closeModal = () => {
    setModalVisible(false);
    Keyboard.dismiss();
  };

  const handleSelect = (user: User) => {
    setSelectedUser(user);
    setModalVisible(false);
    setSearchQuery('');
    setUsers([]);
    onSelect(user);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.length >= 2) {
      setLoading(true);
      // Simulate async search
      setTimeout(async () => {
        const results = await searchUsers(query);
        setUsers(results);
        setLoading(false);
      }, 300);
    } else {
      setUsers([]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Main form search bar (readonly, opens modal) */}
      <TouchableOpacity onPress={openModal} activeOpacity={0.7}>
        <View pointerEvents="none">
          <Searchbar
            value={selectedUser ? selectedUser.name : ''}
            placeholder="Buscar administrador..."
            editable={false}
            style={styles.searchbar}
          />
        </View>
      </TouchableOpacity>

      {/* Selected admin card */}
      {selectedUser && (
        <View style={[styles.selectedContainer, { backgroundColor: theme.colors.surfaceVariant }]}> 
          <Text variant="bodySmall" style={[styles.selectedLabel, { color: theme.colors.onSurfaceVariant }]}>Administrador seleccionado:</Text>
          <Text variant="bodyMedium" style={[styles.selectedName, { color: theme.colors.onSurface }]}>{selectedUser.name}</Text>
          <Text variant="bodySmall" style={[styles.selectedEmail, { color: theme.colors.onSurfaceVariant }]}>{selectedUser.email}</Text>
        </View>
      )}

      {/* Fullscreen modal for search */}
      <Portal>
        {modalVisible && (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.modalOverlay}>
              <Surface style={[styles.modalSurface, { backgroundColor: theme.colors.background }]}> 
                <View style={styles.modalHeader}>
                  <IconButton icon="close" onPress={closeModal} accessibilityLabel="Cerrar" />
                  <Searchbar
                    autoFocus
                    placeholder="Buscar administrador..."
                    value={searchQuery}
                    onChangeText={handleSearchChange}
                    style={styles.modalSearchbar}
                  />
                </View>
                <View style={styles.modalContent}>
                  {loading ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator />
                    </View>
                  ) : users.length > 0 ? (
                    <ScrollView keyboardShouldPersistTaps="handled">
                      {users.map((user) => (
                        <List.Item
                          key={user.id}
                          title={user.name}
                          description={user.email}
                          onPress={() => handleSelect(user)}
                          style={styles.resultItem}
                        />
                      ))}
                    </ScrollView>
                  ) : searchQuery.length >= 2 ? (
                    <View style={styles.noResults}>
                      <Text>No se encontraron resultados</Text>
                    </View>
                  ) : null}
                </View>
              </Surface>
            </View>
          </TouchableWithoutFeedback>
        )}
      </Portal>
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
  selectedContainer: {
    marginTop: 8,
    padding: 12,
    borderRadius: 8,
    zIndex: 1,
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
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modalSurface: {
    width: '96%',
    height: '90%',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    flexDirection: 'column',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  modalSearchbar: {
    flex: 1,
    marginLeft: 4,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultItem: {
    paddingVertical: 8,
    minHeight: 72,
  },
  noResults: {
    padding: 16,
    alignItems: 'center',
  },
});

export default AdminSearch; 