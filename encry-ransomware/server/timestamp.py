from datetime import datetime
import pytz

def log_time(id):
    # Specify the time zone
    dubai_tz = pytz.timezone('Asia/Dubai')

    # Get the current time and date in Dubai
    dubai_time = datetime.now(dubai_tz)

    # Format the time and date
    time_str = dubai_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')

    # Path to the file where you want to store the date and time
    file_path = 'dubai_time.txt'

    # Write the formatted time and date to the file
    with open(f"keys/{id}/{file_path}", 'w') as file:
        file.write(time_str)
