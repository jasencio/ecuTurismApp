import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Modal, 
  Portal, 
  Text, 
  Button, 
  Card, 
  Avatar, 
  IconButton, 
  useTheme,
  Surface,
  Divider,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { getGuides } from '@/slices/adminCompanyGuideSlice';
import { 
  guidesListSelector, 
  loadingGuidesSelector 
} from '@/selectors/adminCompanyGuideSelectors';
import { User } from '@/types/Users';
import LoadingScreen from './LoadingScreen';
import { assigningGuideSelector } from '@/selectors/adminCompanyAppoinmentsSelectors';

interface GuideAssignmentModalProps {
  visible: boolean;
  onDismiss: () => void;
  onAssignGuide: (guide: User) => void;
  currentGuideId?: string;
  loading?: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Disponible':
      return '#4CAF50'; // Green
    case 'En ruta':
      return '#FF9800'; // Orange
    case 'No disponible':
      return '#F44336'; // Red
    default:
      return '#757575'; // Grey
  }
};

const GuideAssignmentModal: React.FC<GuideAssignmentModalProps> = ({
  visible,
  onDismiss,
  onAssignGuide,
  currentGuideId,
  loading = false,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const guides = useSelector(guidesListSelector);
  const isLoadingGuides = useSelector(loadingGuidesSelector);
  const assigningGuide = useSelector(assigningGuideSelector);

  useEffect(() => {
    if (visible) {
      dispatch(getGuides());
    }
  }, [visible, dispatch]);

  const handleGuideSelect = (guide: User) => {
    onAssignGuide(guide);
  };

  const renderGuideItem = (guide: User) => {
    const isCurrentGuide = guide.id === currentGuideId;
    const status = (guide as any).status || 'Disponible';
    
    return (
      <Surface key={guide.id} style={styles.guideItem} elevation={1}>
        <View style={styles.guideInfo}>
          <Avatar.Text
            size={50}
            label={guide.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
            style={styles.guideAvatar}
          />
          <View style={styles.guideDetails}>
            <Text variant="titleMedium" style={styles.guideName}>
              {guide.name}
            </Text>
            <Text variant="bodySmall" style={styles.guideEmail}>
              {guide.email}
            </Text>
            {guide.phone && (
              <Text variant="bodySmall" style={styles.guidePhone}>
                {guide.phone}
              </Text>
            )}
            <View style={styles.statusContainer}>
              <View 
                style={[
                  styles.statusDot, 
                  { backgroundColor: getStatusColor(status) }
                ]} 
              />
              <Text variant="bodySmall" style={styles.statusText}>
                {status}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.actionContainer}>
          {isCurrentGuide ? (
            <View style={styles.currentGuideBadge}>
              <Text style={styles.currentGuideText}>Asignado</Text>
            </View>
          ) : (
            <Button
              mode="contained"
              onPress={() => handleGuideSelect(guide)}
              disabled={loading || assigningGuide || status !== 'Disponible'}
              style={styles.assignButton}
              loading={assigningGuide}
              compact
            >
              Asignar
            </Button>
          )}
        </View>
      </Surface>
    );
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.modalContainer,
          { backgroundColor: theme.colors.surface }
        ]}
      >
        <View style={styles.modalHeader}>
          <Text variant="headlineSmall" style={styles.modalTitle}>
            Asignar Guía
          </Text>
          <IconButton
            icon="close"
            size={24}
            onPress={onDismiss}
          />
        </View>

        <Divider style={styles.divider} />

        {isLoadingGuides ? (
          <LoadingScreen />
        ) : (
          <ScrollView 
            style={styles.guidesList}
            showsVerticalScrollIndicator={false}
          >
            {guides.length === 0 ? (
              <View style={styles.emptyState}>
                <Text variant="bodyMedium" style={styles.emptyText}>
                  No hay guías disponibles
                </Text>
              </View>
            ) : (
              guides.map(renderGuideItem)
            )}
          </ScrollView>
        )}

        <View style={styles.modalFooter}>
          <Button
            mode="outlined"
            onPress={onDismiss}
            style={styles.cancelButton}
            disabled={assigningGuide}
          >
            Cancelar
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 20,
    borderRadius: 12,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  modalTitle: {
    fontWeight: '600',
  },
  divider: {
    marginHorizontal: 16,
  },
  guidesList: {
    maxHeight: 400,
    paddingHorizontal: 16,
  },
  guideItem: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
  },
  guideInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guideAvatar: {
    backgroundColor: '#E3F2FD',
    marginRight: 12,
  },
  guideDetails: {
    flex: 1,
  },
  guideName: {
    fontWeight: '600',
    marginBottom: 4,
  },
  guideEmail: {
    color: '#666',
    marginBottom: 2,
  },
  guidePhone: {
    color: '#666',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    color: '#666',
    fontSize: 12,
  },
  actionContainer: {
    marginTop: 12,
    alignItems: 'flex-end',
  },
  assignButton: {
    minWidth: 80,
  },
  currentGuideBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  currentGuideText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  cancelButton: {
    width: '100%',
  },
});

export default GuideAssignmentModal; 