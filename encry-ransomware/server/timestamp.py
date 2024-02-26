from datetime import datetime
import pytz
from datetime import datetime, timedelta

TIMESTAMP_FORMAT = '%Y-%m-%d %H:%M:%S %z'

def log_time(id):
    # Specify the time zone
    dubai_tz = pytz.timezone('Asia/Dubai')

    # Get the current time and date in Dubai
    dubai_time = datetime.now(dubai_tz)

    # Format the time and date
    time_str = dubai_time.strftime(TIMESTAMP_FORMAT)

    # Name of file storing time
    file_name = 'timestamp.txt'

    # Write the formatted time and date to the file
    with open(f"keys/{id}/{file_name}", 'w') as file:
        file.write(time_str)

def get_time_left(id):
    # Name of file storing time
    file_name = 'timestamp.txt'

    with open(f"keys/{id}/{file_name}", 'r') as file:
        timestamp_str = file.read()

    # Convert the timestamp string to a datetime object
    # Assume the timestamp is stored in the format '%Y-%m-%d %H:%M:%S %Z%z'
    # If there's no timezone information in your string, you should remove the '%Z%z' part
    timestamp = datetime.strptime(timestamp_str, TIMESTAMP_FORMAT)

    # Set end time
    end_time = timestamp + timedelta(hours=48)

    # Calculate the current time in Dubai
    dubai_tz = pytz.timezone('Asia/Dubai')
    dubai_time = datetime.now(dubai_tz)
    
    # Calculate the remaining time
    remaining_time = end_time - dubai_time
    
    # Check if the time is up
    if remaining_time.total_seconds() <= 0:
        return {'message': "The timer has expired."}
    
    # Format the remaining time
    hours, remainder = divmod(remaining_time.seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    
    # Create a response object
    time_left = {
        "days": remaining_time.days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds
    }

    return time_left
    