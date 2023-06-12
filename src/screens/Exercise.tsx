import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";
import { TouchableOpacity } from "react-native";

import BodySvg from "@assets/body.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import SeriesSvg from "@assets/series.svg";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { formatErrorMessage } from "@utils/common";
import { useEffect, useState } from "react";

type RouteParamsProps = {
  exerciseId: string;
};

export const Exercise = () => {
  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();
  const { exerciseId } = route.params as RouteParamsProps;

  const [isLoading, setIsLoading] = useState(true);
  const [registeringExercise, setRegisteringExercise] = useState(false);
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const fetchExerciseDetails = async () => {
    try {
      setIsLoading(true);

      const { data } = await api.get(`/exercises/${exerciseId}`);

      setExercise(data);
    } catch (error) {
      const title = formatErrorMessage(
        error,
        "Não foi possível carregar os detalhes do exercício.",
      );

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExerciseHistoryRegister = async () => {
    try {
      setRegisteringExercise(true);

      await api.post("/history", { exercise_id: exerciseId });

      toast.show({
        title: "Parabéns! Exercício registrado no seu histórico.",
        placement: "top",
        bgColor: "green.500",
      });

      navigation.navigate("history");
    } catch (error) {
      const title = formatErrorMessage(
        error,
        "Não foi possível registrar o exercício.",
      );

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setRegisteringExercise(false);
    }
  };

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading
            fontFamily="heading"
            color="gray.100"
            fontSize="lg"
            flexShrink={1}
          >
            {exercise.name}
          </Heading>

          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <VStack p={8}>
            <Box rounded="lg" mb={3} overflow="hidden">
              <Image
                w="full"
                h={80}
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
                alt="Nome do exercício"
                resizeMode="cover"
              />
            </Box>

            <Box bg="gray.600" rounded="md" pb={4} px={4}>
              <HStack
                alignItems="center"
                justifyContent="space-around"
                mb={6}
                mt={5}
              >
                <HStack>
                  <SeriesSvg />
                  <Text color="gray.200" ml="2">
                    {exercise.series} séries
                  </Text>
                </HStack>
                <HStack>
                  <RepetitionsSvg />
                  <Text color="gray.200" ml="2">
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>

              <Button
                label="Marcar como realizado"
                onPress={handleExerciseHistoryRegister}
                isLoading={registeringExercise}
              />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  );
};
