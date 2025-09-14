@echo off
echo Setting up WireGuard VPN...

REM Install WireGuard if not already installed
winget install WireGuard.WireGuard

REM Copy the config file to WireGuard directory
copy "OPENAI.conf" "%USERPROFILE%\AppData\Local\Packages\WireGuard.WireGuard_*\LocalState\configs\"

echo VPN setup complete. Please start WireGuard and connect to the VPN.
pause
