// TimerDashboard
class TimerDashboard extends React.Component {
  //Khởi tạo constructor
  constructor(props) {
    super(props);
  }

  //Xác định tạo state ở đây
  state = {
    timers: [
      {
        title: 'Practice squat',
        project: 'Gym Chores',
        id: uuid.v4(),
        elapsed: 5456099,
        runningSince: Date.now()
      },
      {
        title: 'Bake squash',
        project: 'Kitchen Chores',
        id: uuid.v4(),
        elapsed: 1273998,
        runningSince: null
      },
    ],
  };

  //render EditableTimerList và ToogleTimerForm với tham số isOpen
  render() {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          <EditableTimerList timers={this.state.timers} />
          <ToggleTimerForm />
        </div>
      </div>
    )
  }
} // End TimerDashboard

// EditableTimerList
// Định nghĩa EditableTimerList
class EditableTimerList extends React.Component {
  constructor(props) {
    super(props);
  }

  //Trong EditableTimerList ta render 2 EditableTimer với các tham số: 
  // title
  // project
  // runningSince
  // editFormOpen: true: form có thể edit; false: form không thể edit
  render() {
    const timers = this.props.timers.map((timer)=>(
      <EditableTimer
        key={timer.id}
        id={timer.id} 
        title={timer.title} 
        project={timer.project} 
        elapsed={timer.elapsed} 
        runningSince={timer.runningSince} />
    )); 
    return (
      <div id='timer'>
        <div id='timers'>
          {timers}
        </div>
      </div>
    )
  }
} // End EditableTimerList

// EditableTimer
// Định nghĩa EditableTimer
class EditableTimer extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    editFormOpen: false
  };

  //Ta render dựa vào giá trị của editFormOpen
  render() {
    //Nếu editFormOpen = true thì ta render TimerForm với 2 tham số title và project
    if (this.state.editFormOpen == true) {
      return (
        <TimerForm
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
        />
      )
    } 
    //Còn ngược lại, nếu editFormOpen = false ta render Timer với 4 tham số như bên dưới  
    else {
      return (
        <Timer
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
        />
      )
    }

  }
} // End EditableTimer

// TimerForm
// Định nghĩa TimerForm
class TimerForm extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    title: this.props.title || '',
    project: this.props.project || '',
  };

  handleTitleChange = (e) => {
    this.setState({title: e.target.value});
  }

  handleProjectChange = (e) => {
    this.setState({project: e.target.value});
  };

  //Ta render cấu trúc của TimerForm
  render() {
    //Tạo biến submitText dựa vào props.title 
    const submitText = this.props.title ? 'Update' : 'Create';
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Title</label>
              <input type='text' value={this.state.title} onChange={this.handleTitleChange} />
            </div>
            <div className='field'>
              <label>Project</label>
              <input type='text' value={this.state.project} onChange={this.handleProjectChange} />
            </div>
            <div className='ui two bottom attached buttons'>
              <button className='ui basic blue button'>
                {submitText}
              </button>
              <button className='ui basic red button'>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}//End TimerForm

// ToggleTimerForm
// Định nghĩa ToggleTimerForm
class ToggleTimerForm extends React.Component {
  constructor(props) {
    super(props);
  }

  state={
    isOpen: false
  };

  handleFormOpen = () => {
    this.setState({
      isOpen: true
    });
  }

  // Ta render dựa vào tham số isOpen
  render() {
    //Nếu isOpen = true, thì render TimerForm
    if(this.state.isOpen){
      return(
        <TimerForm />
      );
    } 
    //Ngược lại, nếu isOpen = false, thì render dấu cộng
    else{
      return (
        <div className='ui basic content center aligned segment'>
          <button className='ui basic button icon' onClick={this.handleFormOpen}><i className='plus icon' /></button>
        </div>
      )
    }
    
  }
} // End ToggleTimerForm

// Timer
// Định nghĩa Timer
class Timer extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    // Tạo biến elapsedString lưu thời gian
    const elapsedString = helpers.renderElapsedString(this.props.elapsed);
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>{this.props.title}</div>
          <div className='meta'>{this.props.project}</div>
          <div className='center aligned description'>
            <h2>{elapsedString}</h2>
          </div>
          <div className='extra content'>
            <span className='right floated edit icon'><i className='edit icon' /></span>
            <span className='right floated trash icon'><i className='trash icon' /></span>
          </div>
        </div>
        <div className='ui bottom attached blue basic button'>Start</div>
      </div>
    )
  }
} // End Timer

ReactDOM.render(<TimerDashboard />, document.getElementById('content'));