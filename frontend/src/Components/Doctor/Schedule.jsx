import React from 'react'
import { useState } from 'react'

function Schedule({ onSave }) {
    const [schedule, setSchedule] = useState({
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
      });

      const handleInputChange = (day, time) => {
        setSchedule((prevSchedule) => ({
          ...prevSchedule,
          [day]: time,
        }));
      };

      const handleSave = () => {
        onSave(schedule);
      };

      return (
        <div className='mt-10'>
          {/* <h2>Schedule</h2> */}
          <label>
            Monday:
            <input
            className='border border-black'
              type="text"
              value={schedule.monday}
              onChange={(e) => handleInputChange('monday', e.target.value)}
            />
          </label>
          {/* Repeat similar input fields for other days */}
          <button onClick={handleSave}>Save</button>
        </div>
      );
}

export default Schedule
