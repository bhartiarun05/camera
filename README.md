# CamHome - Professional Network Camera Management System

A powerful Windows 11 desktop application for managing and streaming network cameras with multiple discovery methods.

![CamHome](https://img.shields.io/badge/CamHome-1.0.0-blue)
![Windows 11](https://img.shields.io/badge/Windows-11-0078d4)
![Electron](https://img.shields.io/badge/Electron-31-9feef9)
![React](https://img.shields.io/badge/React-19-61dafb)

## 🎯 Features

### 📱 Multi-Method Camera Discovery
- **QR Code Scanner** - Real-time QR code detection from camera
- **IP Address Search** - Manual IP with automatic port detection
- **Network Scan (LAN)** - Automatic local network discovery
- **Manual Entry** - Direct stream URL configuration

### 🖥️ Professional Dashboard
- Real-time camera status monitoring
- Multi-tab interface (Cameras, Recordings, Users, Activity, Notifications)
- System health overview
- Activity logging
- Responsive grid layout

### 🔧 Camera Management
- Add/remove cameras
- Duplicate configurations
- Live status indicators
- Stream preview
- Protocol support (RTSP, HTTP, MJPEG)

## 📋 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+
- Windows 11

### Installation

```bash
# Clone repository
git clone https://github.com/bhartiarun05/camera.git
cd camera

# Install dependencies
npm install

# Start development server
npm run dev:electron

# Build executable
npm run build:exe:portable       # Single .exe
npm run build:exe:installer     # Full installer
npm run build:exe              # Both
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev                    # Vite dev server
npm run dev:electron          # Full Electron app

# Building
npm run build                 # Build all
npm run build:exe             # All Windows packages
npm run build:exe:portable    # Portable .exe only
npm run build:exe:installer   # NSIS installer only

# Utilities
npm run lint                  # Type checking
npm run type-check           # Full type validation
npm run preview              # Preview built app
```

## 📁 Project Structure

```
camera/
├── src/
│   ├── components/
│   │   ├── CameraGrid.tsx
│   │   ├── AddCameraModal.tsx
│   │   ├── Sidebar.tsx
│   │   └── modals/
│   │       ├── QRScannerModal.tsx
│   │       ├── IPAddressModal.tsx
│   │       └── LANSearchModal.tsx
│   ├── types/
│   │   └── electron.d.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── electron/
│   ├── main.ts
│   ├── preload.ts
│   └── tsconfig.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── package.json
└── electron-builder.yml
```

## 🎮 Camera Discovery Guide

### 1️⃣ QR Code Scanner
1. Click "Add Camera" → "Scan QR Code"
2. Point device camera at camera's QR code
3. Auto-detected configuration added

### 2️⃣ IP Address
1. Click "Add Camera" → "Add by IP Address"
2. Enter camera IP (e.g., 192.168.1.100)
3. Click "Detect Ports"
4. Select open port
5. Add camera

### 3️⃣ Network Search
1. Click "Add Camera" → "Search Network"
2. Wait for automatic LAN scan
3. Select camera from device list
4. Auto-adds with detected port

### 4️⃣ Manual Entry
1. Click "Add Camera" → "Manual Entry"
2. Enter camera name
3. Select stream type (RTSP/HTTP/MJPEG)
4. Enter stream URL
5. Add credentials (optional)
6. Click "Add Camera"

## 🔗 Stream URL Examples

```
# RTSP (Recommended)
rtsp://username:password@192.168.1.100:554/stream

# HTTP
http://192.168.1.100:8080/video.mjpeg

# MJPEG
http://192.168.1.100/mjpeg.cgi
```

## 🛡️ Security Features

✅ Context isolation enabled
✅ Node integration disabled
✅ IPC validation
✅ Credentials stored securely
✅ HTTPS support

## 📊 System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| OS | Windows 11 | Windows 11 |
| RAM | 4GB | 8GB |
| Storage | 500MB | 2GB |
| Display | 1366x768 | 1920x1080 |
| Network | 1Mbps | 10Mbps |

## 🧰 Technology Stack

- **Frontend**: React 19 + TypeScript
- **Desktop**: Electron 31
- **UI**: Tailwind CSS 4
- **Build**: Vite 6
- **QR Scanning**: jsQR
- **Icons**: Lucide React
- **Package**: Electron Builder 25

## 🐛 Troubleshooting

### Build Issues
```bash
npm install
npm run clean
npm run build:exe
```

### Camera Not Found
- Verify IP address
- Check network connectivity
- Ensure camera is online
- Check firewall settings

### QR Scanner Not Working
- Allow camera permissions
- Ensure good lighting
- Try different angle
- Verify QR code format

## 📝 Environment Variables

Create `.env.local`:
```
GEMINI_API_KEY=your_api_key_here
```

## 🤝 Contributing

Contributions welcome! Please:
1. Fork repository
2. Create feature branch
3. Submit pull request

## 📄 License

MIT License - See LICENSE file for details

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/bhartiarun05/camera/issues)
- **Discussions**: [GitHub Discussions](https://github.com/bhartiarun05/camera/discussions)

## 🚀 Roadmap

- [ ] Video streaming playback
- [ ] Recording management
- [ ] Cloud backup integration
- [ ] Mobile app
- [ ] Multi-user authentication
- [ ] Advanced analytics
- [ ] AI motion detection

---

**Version**: 1.0.0  
**Last Updated**: June 2026  
**Author**: CamHome Team

Built with ❤️ for security professionals and home enthusiasts
