import os


def create_message():
    html_content = '''<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Important Message</title>
        <style>
            body {
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
            }
            h1 {
                color: #e55039;
                font-size: 2rem;
            }
            p {
                font-size: 1.2rem;
            }
            .timer {
                color: #e55039;
                font-size: 1.5rem;
                margin: 20px 0;
            }
            .contact {
                margin-top: 2rem;
            }
            .contact-info {
                background-color: #1d1e22;
                padding: 1rem;
                border-radius: 5px;
            }
            .note {
                color: #aaa;
                font-size: 0.8rem;
                margin-top: 2rem;
            }
        </style>
    </head>
    <body>
        <div class="message">
            <h1>Ooops, your Files Are "Encrypted"</h1>
            <!-- <p>Don't worry, this is just a test message. Your files are safe.</p> -->
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
            // Set the date we're counting down to
            var countDownDate = new Date();
            countDownDate.setHours(countDownDate.getHours() + 48); // Set the countdown to 48 hours

            // Update the countdown every 1 second
            var timer = setInterval(function() {
                // Get today's date and time
                var now = new Date().getTime();
                
                // Find the time remaining
                var timeRemaining = countDownDate - now;
                
                // Time calculations for days, hours, minutes, and seconds
                var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                var hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
                
                // Output the result in an element with id="time"
                document.getElementById("time").innerHTML = days + "d " 
                    + (hours < 10 ? "0" + hours : hours) + "h "
                    + (minutes < 10 ? "0" + minutes : minutes) + "m " 
                    + (seconds < 10 ? "0" + seconds : seconds) + "s ";
                
                // If the countdown is over, write some text 
                if (timeRemaining < 0) {
                    clearInterval(timer);
                    document.getElementById("time").innerHTML = "EXPIRED";
                }
            }, 1000);
        </script>
    </body>
    </html>
    '''

    home_dir = os.path.expanduser('~')

    with open(os.path.join(home_dir, 'Desktop', 'OPEN_THIS.html'), 'w', encoding='utf-8') as file:
        file.write(html_content)

    print("HTML file created successfully!")


def delete_message():
    home_dir = os.path.expanduser('~')
    os.remove(os.path.join(home_dir, 'Desktop', 'OPEN_THIS.html'),)
    print('HTML file deleted successfully!')
