# Documentation for MyWebsite.internal

## Overview
`phishing-site` is an internally accessible web application hosted within a Docker container running NGINX. This site is intended for use within a virtual network and is not accessible externally. This site is a copy of the financial institute of Belgium. Every link redirects to download `BelastingsTool.exe`. Do not use this site with malicious intent. This site may only be used in a controlled environment. This is only for simulation.

## Infrastructure Requirements
- **Server**: Unix server with Docker installed.
- **DNS**: Internal DNS server (Windows Server 2019) configured with A records for `whateverdomain.youwant`.

## Docker Container Setup
- **Image**: Custom NGINX image built from the official NGINX Alpine image.
- **Ports**: Container ports 80 and 443 are mapped to host ports 8080 and 443, respectively.
- **Volumes**: No external volumes are required as the site content is baked into the image.

## DNS Configuration
- A records for `whateverdomain.youwant` are pointing to the internal IP of the Docker host.
- Clients' hosts files are updated for direct resolution, or DNS queries are resolved via the internal DNS server.

## Site Content
- **Location**: Site content is located in `/usr/share/nginx/html` within the container.
- **Static Content**: The site serves static HTML, CSS, and JavaScript files.
- **Executable**: Currently every `<a>` tag downloads `BelastingsTool.exe`. When adjusting the name of the .exe make sure to replace the value of all `href=` links in the index.html file.

## Setup
- **Build container**: `docker build -t mywebsite:latest .`
- **Run container**: `docker run -d -p 80:80 443:443 mywebsite:latest`

## Security
- **Firewalls**: The host machine should be configured with a firewall allowing traffic only on ports 8080 and 443.

## Accessing the Site
- The site can be accessed from a web browser via `http://whateverdomain.youwant`.
- If the site does not load, ensure the hosts file or DNS settings are correctly configured.

## Maintenance
- **Container Management**: Use Docker commands to manage the lifecycle of the container.
- **Updates**: Site updates require a new Docker image to be built and deployed.
- **Monitoring**: Basic monitoring is handled by Docker. For advanced monitoring, integrate with tools like Prometheus.

## Troubleshooting
- **Logs**: Check container logs using `docker logs <container_id>` for errors.
- **Restart**: If issues arise, restart the container. For persistent issues, check the NGINX and Docker configurations.

## Contact
- **Support**: For support, contact the internal IT team.
- **Documentation**: This document is the primary source of information for `mywebsite.internal`.

# Disclaimer

This website, is established for internal use only and strictly prohibits any form of malicious intent or usage. The site may not, under any circumstances, be used for any unlawful activities including but not limited to phishing, fraud, or any other action that could be considered deceptive or harmful.
