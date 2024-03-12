import os
import re

def get_own_ip_addresses():
    # Capture the output of the 'ipconfig' command
    ipconfig_output = os.popen('ipconfig').read()

    # Regular expression pattern for matching IP addresses
    ip_pattern = re.compile(r'IPv4 Address.*: (\d+\.\d+\.\d+\.\d+)', re.IGNORECASE)

    # Find all occurrences of the pattern in the ipconfig output
    own_ip_addresses = ip_pattern.findall(ipconfig_output)

    return own_ip_addresses

def get_network_ip_addresses():
    # Capture the output of the 'arp -a' command
    arp_output = os.popen('arp -a').read()

    # Regular expression pattern for matching IP addresses
    ip_pattern = re.compile(r'\d+\.\d+\.\d+\.\d+')

    # Find all occurrences of the pattern in the arp output
    network_ip_addresses = ip_pattern.findall(arp_output)

    # Filter out the device's own IP addresses from the network IP addresses
    filtered_network_ips = [ip for ip in network_ip_addresses if ip not in get_own_ip_addresses()]

    # Additional filtering to remove IPs starting with specific patterns
    exclude_prefixes = ['0.', '255.', '224.', '239.']
    filtered_network_ips = [ip for ip in filtered_network_ips if not any(ip.startswith(prefix) for prefix in exclude_prefixes)]

    return filtered_network_ips
