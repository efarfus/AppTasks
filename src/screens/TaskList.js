import React, {Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import todayImage from '../../assets/imgs/today.jpg';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import 'moment/locale/pt-br';
import CommonStyles from '../commonStyles';
import Task from '../components/Task';
import commonStyles from '../commonStyles';
import AddTask from './AddTask';

export default class TaskList extends Component {
  state = {
    showAddTasks: false,
    showDoneTasks: true,
    visibleTasks: [],
    tasks: [
      {
        id: Math.random(),
        desc: 'Comprar livro',
        estimateAt: new Date(),
        doneAt: new Date(),
      },
      {
        id: Math.random(),
        desc: 'Comprar livro 2 ',
        estimateAt: new Date(),
        doneAt: null,
      },
      {
        id: Math.random(),
        desc: 'Comprar livro 3 ',
        estimateAt: new Date(),
        doneAt: new Date(),
      },
      {
        id: Math.random(),
        desc: 'Comprar livro 4',
        estimateAt: new Date(),
        doneAt: new Date(),
      },
    ],
  };

  componentDidMount = () => {
    this.filterTasks();
  };

  toggleTask = taskId => {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.id === taskId) {
        task.doneAt = task.doneAt ? null : new Date();
      }
    });

    this.setState({tasks}, this.filterTasks);
  };

  filterTasks = () => {
    let visibleTasks = null;
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks];
    } else {
      const pending = task => task.doneAt === null;
      visibleTasks = this.state.tasks.filter(pending);
    }

    this.setState({visibleTasks});
  };

  toggleFilter = () => {
    this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks);
  };

  render() {
    const today = moment().locale('pt-br').format('dddd, D [de] MMMM');
    return (
      <View style={styles.container}>
        <AddTask
          isVisible={this.state.showAddTasks}
          onCancel={() => {
            this.setState({showAddTasks: false});
          }}></AddTask>

        <ImageBackground source={todayImage} style={styles.backgroud}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon
                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20}
                color={commonStyles.colors.secondary}></Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <Task {...item} toggleTask={this.toggleTask}></Task>
            )}></FlatList>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={() => this.setState({showAddTasks:true})} activeOpacity={0.7}>
          <Icon name='plus' size={25} color={commonStyles.colors.secondary} ></Icon>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroud: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: CommonStyles.fontFamily,
    fontSize: 50,
    color: CommonStyles.colors.secondary,
    marginLeft: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: CommonStyles.fontFamily,
    fontSize: 20,
    color: CommonStyles.colors.secondary,
    marginLeft: 20,
    marginBottom: 30,
  },
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'flex-end',
    marginTop: Platform.OS === 'ios' ? 40 : 15,
  },
  addButton:{
    borderRadius: 25,
    position:'absolute',
    right:30,
    bottom:30,
    width:50,
    height:50,
    backgroundColor:commonStyles.colors.today,
    justifyContent:'center',
    alignItems:'center',
  }
});
