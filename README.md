# Tesla and NVIDIA Bases Map

## Project Overview
This project visualizes the locations of Tesla and NVIDIA bases on an interactive map using Leaflet.js. It includes features such as tooltips with additional information and profile redirects.

## Owner
- **Name**: Niladri Das
- **X (Twitter)**: [@bniladridas](https://x.com/bniladridas)
- **GitHub**: [bniladridas](https://github.com/bniladridas)

## Table of Contents
- [Project Overview](#project-overview)
- [Owner](#owner)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [Architecture](#architecture)
- [License](#license)

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/bniladridas/tesla-map-project.git
    ```
2. Navigate to the project directory:
    ```bash
    cd tesla-map-project
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage
1. Start the server:
    ```bash
    npm start
    ```
2. Open your browser and navigate to:
    ```
    http://localhost:3000
    ```

## Features
- Interactive map displaying Tesla and NVIDIA bases.
- Tooltips with additional information about each base.
- Profile redirects on logo hover.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript, Leaflet.js
- **Backend**: Node.js, Express.js
- **Other**: Git, GitHub

## Deployment
To deploy this project on Vercel:
1. Install the Vercel CLI:
    ```bash
    npm install -g vercel
    ```
2. Deploy the project:
    ```bash
    vercel
    ```

## Architecture
```mermaid
graph TD
    User([User]) --> Browser([Web Browser])
    
    subgraph Frontend
        Browser --> Interface[HTML/CSS/JS Interface]
        Interface --> LeafletJS[Leaflet.js Map]
        Interface --> Interactions[User Interactions]
    end
    
    subgraph Backend ["Backend (Node.js/Express.js)"]
        API[API Routes]
        StaticServer[Static File Server]
        DataHandler[Data Handler]
    end
    
    subgraph Data ["Data Layer"]
        MapData[(Map Data)]
        ProfileData[(Profile Data)]
        Assets[(Static Assets)]
    end
    
    Interface --> API
    LeafletJS --> API
    Interactions --> API
    
    API --> DataHandler
    DataHandler --> MapData
    DataHandler --> ProfileData
    
    StaticServer --> Assets
    Browser --> StaticServer
    
    style Frontend fill:#e6f3ff,stroke:#0066cc
    style Backend fill:#f0ffe6,stroke:#339900
    style Data fill:#fff0f0,stroke:#cc0000
```

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
