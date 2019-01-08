// TimerDashboard
class TimerDashboard extends React.Component {
  //Khởi tạo constructor
  constructor(props) {
    super(props);
  }

  //render EditableTimerList và ToogleTimerForm với tham số isOpen
  render() {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          <EditableTimerList />
          <ToggleTimerForm isOpen={true} />
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
    return (
      <div id='timer'>
        <EditableTimer title='Learn React' project='Domination' elapsed='8986500' runningSince={null} editFormOpen={false} />
        <EditableTimer title='Learn extreme ironing' project='World Domination' elapsed='3890985' runningSince={null} editFormOpen={true} />
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

  //Ta render dựa vào giá trị của editFormOpen
  render() {
    //Nếu editFormOpen = true thì ta render TimerForm với 2 tham số title và project
    if (this.props.editFormOpen == true) {
      return (
        <TimerForm
          title={this.props.title}
          project={this.props.project}
        />
      )
    } 
    //Còn ngược lại, nếu editFormOpen = false ta render Timer với 4 tham số như bên dưới  
    else {
      return (
        <Timer
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
              <input type='text' defaultValue={this.props.title} />
            </div>
            <div className='field'>
              <label>Project</label>
              <input type='text' defaultValue={this.props.project} />
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

  // Ta render dựa vào tham số isOpen
  render() {
    //Nếu isOpen = true, thì render TimerForm
    if(this.props.isOpen){
      return(
        <TimerForm />
      );
    } 
    //Ngược lại, nếu isOpen = false, thì render dấu cộng
    else{
      return (
        <div className='ui basic content center aligned segment'>
          <button className='ui basic button icon'><i className='plus icon' /></button>
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
