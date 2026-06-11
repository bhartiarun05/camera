# CamHome Build Guide

## 🔨 Build Your Own CamHome.exe

### Prerequisites
- Node.js 18+ (Download from nodejs.org)
- npm 9+ (Comes with Node.js)
- Git
- Windows 11

### Step 1: Clone Repository

```bash
git clone https://github.com/bhartiarun05/camera.git
cd camera
```

### Step 2: Install Dependencies

```bash
npm install
```

This will download all required packages (~500MB).

### Step 3: Build Executable

**Option A: Portable EXE (Single file, no installation)**
```bash
npm run build:exe:portable
```

**Option B: Installer (Full setup wizard)**
```bash
npm run build:exe:installer
```

**Option C: Build Both**
```bash
npm run build:exe
```

Build time: 5-15 minutes depending on system

### Step 4: Find Your Files

After build completes:

```
camera/dist/installers/
├── CamHome-1.0.0.exe          ← Portable (Recommended)
├── CamHome Setup 1.0.0.exe    ← Installer
└── CamHome-1.0.0.exe.blockmap ← Integrity file
```

### Step 5: Extract to Desktop

**Via Command Line:**
```bash
copy "dist/installers/CamHome-1.0.0.exe" "%USERPROFILE%\Desktop\CamHome.exe"
```

**Via File Explorer:**
1. Open `camera\dist\installers\`
2. Copy `CamHome-1.0.0.exe`
3. Paste on Desktop
4. Rename to `CamHome.exe`

### Step 6: Run

Double-click the .exe file on your Desktop!

## 📊 Build Output

```
Portable Version:
- Size: ~200-250 MB
- Installation: None required
- Dependencies: Included
- Launch: Direct .exe execution

Installer Version:
- Size: ~150 MB installer
- Installation: Full setup wizard
- Shortcuts: Desktop & Start Menu
- Uninstaller: Included
```

## 🔧 Development Build

**Test during development:**
```bash
npm run dev:electron
```

This launches the app with hot-reload enabled.

## 📦 All Build Commands

```bash
# Development
npm run dev              # Vite dev server only
npm run dev:electron    # Full Electron app with hot reload

# Production Build
npm run build           # Build for production
npm run build:exe       # Build both portable & installer
npm run build:exe:portable    # Portable only
npm run build:exe:installer   # Installer only

# Utilities
npm run preview         # Preview built app
npm run lint           # Type checking
npm run type-check     # Full type validation
```

## 🐛 Troubleshooting Build

**Build fails with "not found"**
```bash
rm -r node_modules dist
npm install
npm run build:exe
```

**Port 3000 already in use**
```bash
# Kill process and rebuild
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Build takes too long**
- Normal: 5-15 minutes first time
- Check internet connection
- Close other applications
- Ensure 2GB free disk space

## 🎯 Optimization Tips

1. **First build is slowest** - Downloads dependencies
2. **Subsequent builds are faster** - Caches dependencies
3. **Clean build**: `npm run clean && npm run build:exe`
4. **Parallel building**: Close other apps for faster build

## 📈 File Sizes

```
Portable EXE:    ~220 MB (includes Node runtime)
Installer:       ~150 MB
Unpacked Size:   ~500 MB (after installation)
```

## ✅ Verify Build

```bash
# Check if files exist
dir dist/installers/

# Test portable version
.\dist\installers\CamHome-1.0.0.exe
```

## 🚀 Ready to Deploy!

Your built CamHome.exe is ready to:
- ✅ Share with others
- ✅ Deploy to servers
- ✅ Create installations
- ✅ Run on any Windows 11 machine

---

**Happy Building!** 🎉
