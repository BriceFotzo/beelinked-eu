import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import { connect } from 'react-redux';
import { setMonth } from './actions/ui/month';
import { getMonth } from './selectors/ui/month';
import AppHeader from './components/AppHeader';
import MonthlyCalendar from './components/calendar/MonthlyCalendar';
import ReminderContainer from './components/reminders/ReminderContainer';






function setNavigationBarHeightCSSVariable() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
}



class homeAlerte extends Component {

    static propTypes = {

        onSubmit: PropTypes.isRequired,
    };

    state = {
        userStatus: JSON.parse(localStorage.getItem('userCo')).Statut
    }



    componentDidMount() {
        window.addEventListener('resize', setNavigationBarHeightCSSVariable);

        if (this.props.month === null) {
            this.props.dispatch(setMonth(DateTime.local().toFormat('yyyy-MM')));
        }

    }

    componentWillUnmount() {
        window.removeEventListener('resize', setNavigationBarHeightCSSVariable);
    }

    render() {
        return (
            //<Formik onSubmit={this.handleSubmit}>

            <div>
                {/* <header className="App-header" style={{ height: 100, maxHeight: '100', overflowY: 'auto' }}>
                    <BeeNav connected={this.state.userStatus} />
                </header> */}

                <div className="h-screen-nav-fix w-screen font-montserrat overflow-hidden bg-gray-50 text-gray-900">
                    <div className="w-full h-full flex flex-col">
                
                        <AppHeader />
                        <MonthlyCalendar />
                        <ReminderContainer />
                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        ...props,
        month: getMonth(state),
    };
}

export default connect(mapStateToProps)(homeAlerte);
