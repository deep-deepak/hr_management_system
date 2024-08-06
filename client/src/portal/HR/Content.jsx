import React from 'react';
import Header from './Header';

const Content = ({ selectedItem, onLogout, onMenuItemClick }) => {


    const renderContent = () => {
        switch (selectedItem) {
            case 'Home':
                return "Home";
            case 'DailyAttendance':
                return "<DailyAttendance />";
            case 'MonthlyAttendance':
                return "<MonthlyAttendance />";
            case 'LeaveList':
                return "<Leave />";
            case 'ChangePassword':
                return "<ChangePassword />";
            case 'Settings':
                return "<Setting />";
            default:
                return "test"; // Default content
        }
    };

    return (
        <>
            <Header onLogout={onLogout} onMenuItemClick={onMenuItemClick} />
            <div className='content_rendor'>
                {renderContent()}
            </div>
        </>
    );
};

export default Content;
