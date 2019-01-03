class TimerDashboard extends React.Component{
    constructor(props){
        super(props);
    }

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
} 

class EditableTimerList extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
      return (
          <div id='timer'>
        <EditableTimer title='Learn React' project= 'Domination' elapsed='8986500' runningSince={null} editFormOpen={false} />
        <EditableTimer title='Learn extreme ironing' project='World Domination' elapsed='3890985' runningSince={null} editFormOpen={true} />
        </div>
      )
    }
} 

class EditableTimer extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        if(this.props.editFormOpen == true){
            return (
                <TimerForm 
                    title={this.props.title}
                    project={this.props.project}
                 />
            )      
        } else {
            return(
                <TimerForm 
                    title={this.props.title} 
                    project={this.props.project} 
                    elapsed={this.props.elapsed} 
                    runningSince={this.props.runningSince} 
                />
            )
        }
      
    }
} 

class TimerForm extends React.Component {
    render() {
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
                <button className='ui basic red button'>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

ReactDOM.render(<TimerDashboard />, document.getElementById('content'));
