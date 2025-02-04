import React, { Component } from 'react';
import { View, Text , StyleSheet} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const styles = StyleSheet.create({
  head: { fontSize: 20, backgroundColor: '#f1f8ff' },
  text: { fontFamily : 'Montserrat_Medium', textAlign: 'center' , fontSize: 12 },
  textHead: { fontFamily : 'Montserrat_Bold', textAlign: 'center' , fontSize: 12 },
  row: { height: 30 }
});

export default class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Código*', 'Qtn*', 'Nome' , 'Preço' , 'Incosi.'],
      tableData: [
        ['10021', '28', '', '', 'Não'],
        ['10021', '22', '', '', 'Sim'],
        ['10021', '35', 'Sal', 'R$ 1,00', 'Não'],
        ['10021', '23', 'Arroz', 'R$ 3,00', 'Sim']
      ]
    };
  }

  render() {
    const { tableHead, tableData } = this.state;
    return (
      <View>
        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.textHead} />
          <Rows data={tableData} style={styles.row} textStyle={styles.text} />
        </Table>
      </View>
    );
  }
}