import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Button, Text, View, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

interface Tarefa {
  id: string;
  texto: string;
  concluida: boolean;
};

export default function App() {
  const [text, setText] = useState('');
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  const enviarTarefa = (texto: string) => {
   if (texto == '') {
      return;
    }
   setTarefas((tarefasAtuais) => [
      ...tarefasAtuais,
      {
        id: `${Date.now().toString() + Math.random().toString()}`,
        texto: texto,
        concluida: false,
      },
    ]);
    setText('');
  };

  const alternarTarefaConcluida = (id: string) => {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TextInput
        style={styles.textInput}
        placeholder="Adicione uma nova tarefa..."
        onChangeText={setText}
        onEndEditing={() => console.log('Edição concluída')}
        autoCapitalize="none"
        autoCorrect={false}
        value={text}
      />
      <Button
        title="enviar tarefa"
        onPress={() => enviarTarefa(text)}
      />
      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tarefaItem}>
            <Text style={[item.concluida && styles.tarefaConcluida]}>
              {item.texto}
            </Text>
            <Button
              title={item.concluida ? 'desfazer' : 'tarefa feita'}
              onPress={() => alternarTarefaConcluida(item.id)}
            />
          </View>
        )}
      />
        <StatusBar style="auto" />
      </SafeAreaView >
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  tarefaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
  },
  tarefaConcluida: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
});