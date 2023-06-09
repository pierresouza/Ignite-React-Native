import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";

import { Participant } from "../../Components/Participant";

import { styles } from "./styles";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [particpantName, setParticipantName] = useState("");

  function handleParticipantAdd() {
    if (participants.includes(particpantName)) {
      return Alert.alert("Participante Existe", "Já existe um participante na lista com esse nome");
    }

    setParticipants((prevState) => [...prevState, particpantName]);
    setParticipantName("");
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Remover o participatente ${name}`, [
      {
        text: "Sim",
        onPress: () => setParticipants((prevState) => prevState.filter((participant) => participant !== name)),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome dos participantes</Text>
      <Text style={styles.eventDate}>Sexta, 4 de novembro de 2022</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Nome do Participante" placeholderTextColor="#6B6B6B" onChangeText={setParticipantName} value={particpantName} />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Participant key={item} name={item} onRemove={() => handleParticipantRemove(item)} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <Text style={styles.listEmptyText}>Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença</Text>}
      />
    </View>
  );
}
