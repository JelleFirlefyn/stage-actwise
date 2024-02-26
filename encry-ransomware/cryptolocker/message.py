import os
import webbrowser
import requests

def create_message(server, port, id):
    html_content = f'''<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Important Message</title>
        <style>
            body {{
                background-color: #0b0c10;
                color: red;
                font-family: 'Courier New', Courier, monospace;
                text-align: center;
                margin: 0;
                padding: 0;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }}
            h1 {{
                color: #e55039;
                font-size: 2rem;
            }}
            p {{
                font-size: 1.2rem;
            }}
            .timer {{
                color: #e55039;
                font-size: 1.5rem;
                margin: 20px 0;
            }}
            .contact {{
                margin-top: 2rem;
            }}
            .contact-info {{
                background-color: #1d1e22;
                padding: 1rem;
                border-radius: 5px;
            }}
            .note {{
                color: #aaa;
                font-size: 0.8rem;
                margin-top: 2rem;
            }}
        </style>
    </head>
    <body>
        <div class="message">
            <h1>Ooops, your Files Are "Encrypted"</h1>
            <p>ID: {id}</p>
            <div id="timer" class="timer">
                Time left: <span id="time">01:00:00</span>
            </div>
            <div class="contact">
                <p>To get your files back, please send me:</p>
                <div class="contact-info">
                    <p><strong>1 Million Monopoly Dollars</strong></p>
                    <p>OR</p>
                    <p><strong>10 Curryrollen</strong></p>
                </div>
                <!-- <p class="note">(This is NOT a joke. Please do not send anything.)</p> -->
            </div>
        </div>
        <div class="footer">
            <p class="note">Remember, always install CyberArk EPM!</p>
        </div>
       <script>
            document.addEventListener('DOMContentLoaded', function() {{
                // Function to update the timer on the page
                function updateTimer(days, hours, minutes, seconds) {{
                    document.getElementById("time").innerHTML = days + "d " 
                        + (hours < 10 ? "0" + hours : hours) + "h "
                        + (minutes < 10 ? "0" + minutes : minutes) + "m " 
                        + (seconds < 10 ? "0" + seconds : seconds) + "s ";
                }}

                // Fetch the remaining time from the server
                fetch('http://{server}:{port}/time/{id}/')  // Replace with the correct server URL
                    .then(response => response.json())
                    .then(data => {{
                        if (data.message) {{
                            // The timer has expired
                            document.getElementById("time").innerHTML = data.message;
                        }} else {{
                            // Update the timer with the data returned from the server
                            updateTimer(data.days, data.hours, data.minutes, data.seconds);
                            
                            // Set an interval to update the timer every second
                            setInterval(function() {{
                                // Assuming the server provides the exact time left,
                                // we subtract one second and update the timer
                                data.seconds--;
                                if (data.seconds < 0) {{
                                    data.minutes--;
                                    data.seconds = 59;
                                }}
                                if (data.minutes < 0) {{
                                    data.hours--;
                                    data.minutes = 59;
                                }}
                                if (data.hours < 0) {{
                                    data.days--;
                                    data.hours = 23;
                                }}
                                if (data.days < 0) {{
                                    // Stop the countdown when the time is up
                                    clearInterval(timer);
                                    document.getElementById("time").innerHTML = "EXPIRED";
                                    return;
                                }}
                                updateTimer(data.days, data.hours, data.minutes, data.seconds);
                            }}, 1000);
                        }}
                    }})
                    .catch(error => {{
                        console.error('Error fetching the timer:', error);
                        document.getElementById("time").innerHTML = "Error fetching time";
                    }});
            }});
        </script>

    </body>
    </html>
    '''

    home_dir = os.path.expanduser('~')

    with open(os.path.join(home_dir, 'Desktop', 'OPEN_THIS.html'), 'w', encoding='utf-8') as file:
        file.write(html_content)

    print("HTML file created successfully!")

    webbrowser.open('file://' + os.path.join(home_dir, 'Desktop', 'OPEN_THIS.html'))


def delete_message():
    home_dir = os.path.expanduser('~')
    os.remove(os.path.join(home_dir, 'Desktop', 'OPEN_THIS.html'),)
    print('HTML file deleted successfully!')
