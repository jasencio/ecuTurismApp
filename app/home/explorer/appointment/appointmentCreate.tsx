import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import CustomCalendar from "@/components/CustomCalendar";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Image, Dimensions, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Divider, Button, useTheme } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { useSelector } from "react-redux";
import { routeSelector } from "@/selectors/explorerSelector";
import { getDifficultyTranslation, getDifficultyColor } from "@/types/Route";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const { height } = Dimensions.get("window");

const appointmentSchema = z.object({
  date: z.string().min(1, "Por favor selecciona una fecha"),
  time: z.string().min(1, "Por favor selecciona un horario"),
  visitors: z.string().min(1, "Por favor selecciona el número de visitantes"),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

export default function AppointmentCreate() {
  const navigation = useNavigation();
  const router = useRouter();
  const [timeSlots, setTimeSlots] = useState<{ label: string; value: string; }[]>([]);
  const route = useSelector(routeSelector);
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    mode: "onChange",
  });

  const selectedDate = watch("date");

  useEffect(() => {
    navigation.setOptions({ headerBackTitle: "Atrás", title: route?.name || "-" });
  }, [navigation, route]);

  useEffect(() => {
    if (timeSlots.length === 0) {
      setValue("time", "");
    }
  }, [timeSlots, setValue]);

  const onSubmit = (data: AppointmentFormData) => {
    console.log("Form data:", data);
    router.push("/home/explorer/appointment/appointmentDetail");
  };

  return (
    <CustomSafeAreaView>
      <Image
        source={{ uri: route?.mainImage?.publicUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.organizationContainer}>
              <Image
                source={{ uri: route?.organization?.image?.publicUrl }}
                style={styles.organizationImage}
                resizeMode="cover"
              />
              <View style={styles.organizationInfo}>
                <Text variant="bodySmall" style={styles.title}>
                  {route?.organization?.name}
                </Text>
                <View style={styles.addressContainer}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={16}
                    color={theme.colors.primary}
                    style={styles.addressIcon}
                  />
                  <Text variant="bodySmall" style={styles.text}>
                    {route?.organization?.address}
                  </Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleSmall" style={styles.title}>
              Descripción
            </Text>
            <Text variant="bodySmall" style={styles.text}>
              {route?.description}
            </Text>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={20}
                color={theme.colors.primary}
                style={styles.infoIcon}
              />
              <Text variant="bodySmall" style={styles.infoText}>
                Duración: <Text style={styles.value}>{route?.minutes} minutos</Text>
              </Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="run"
                size={20}
                color={getDifficultyColor(route?.hardness)}
                style={styles.infoIcon}
              />
              <Text variant="bodySmall" style={styles.infoText}>
                Dificultad: <Text style={styles.value}>{getDifficultyTranslation(route?.hardness)}</Text>
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={{ marginBottom: 10 }}>
              <Text variant="titleSmall" style={styles.titleScheduled}>
                Por favor elige un horario
              </Text>
              <Controller
                control={control}
                name="date"
                render={({ field: { onChange, value } }) => (
                  <CustomCalendar 
                    daysWeekEnabled={route?.organization?.daysWeekEnabled || []}
                    timeOpenWeek={route?.organization?.timeOpenWeek}
                    timeCloseWeek={route?.organization?.timeCloseWeek}
                    timeOpenSaturday={route?.organization?.timeOpenSaturday}
                    timeCloseSaturday={route?.organization?.timeCloseSaturday}
                    timeOpenSunday={route?.organization?.timeOpenSunday}
                    timeCloseSunday={route?.organization?.timeCloseSunday}
                    routeMinutes={Number(route?.minutes) || 60}
                    onTimeSlotsChange={setTimeSlots}
                    onDayPress={(date) => {
                      onChange(date);
                      setValue("time", "");
                    }}
                    selectedDate={value}
                  />
                )}
              />
              {errors.date && (
                <Text style={styles.errorText}>{errors.date.message}</Text>
              )}
              <Divider style={styles.divider} />
              <Controller
                control={control}
                name="visitors"
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    label="Visitantes"
                    placeholder="Elige un numero de visitantes"
                    value={value}
                    onSelect={onChange}
                    options={[
                      { label: "1", value: "1" },
                      { label: "2", value: "2" },
                      { label: "3", value: "3" },
                      { label: "4", value: "4" },
                      { label: "5", value: "5" },
                    ]}
                  />
                )}
              />
              {errors.visitors && (
                <Text style={styles.errorText}>{errors.visitors.message}</Text>
              )}
            </View>
            <Controller
              control={control}
              name="time"
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  label="Horario"
                  value={value}
                  onSelect={onChange}
                  options={timeSlots}
                />
              )}
            />
            {errors.time && (
              <Text style={styles.errorText}>{errors.time.message}</Text>
            )}
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              style={styles.button}
              disabled={!isValid}
            >
              Agendar
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: height * 0.2,
    width: "100%",
  },
  content: {
    padding: 8,
  },
  card: {
    borderRadius: 12,
    marginBottom: 8,
  },
  title: {
    marginTop: 4,
    fontWeight: "bold",
  },
  text: {
    marginBottom: 2,
  },
  button: {
    marginTop: 8,
    borderRadius: 6,
  },
  titleScheduled: {
    marginTop: 2,
    fontWeight: "bold",
    marginBottom: 8,
  },
  divider: {
    marginVertical: 8,
  },
  organizationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  organizationImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  organizationInfo: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    color: '#333',
  },
  value: {
    color: '#222',
    fontWeight: 'bold',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  addressIcon: {
    marginRight: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
