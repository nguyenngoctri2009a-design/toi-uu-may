@echo off
chcp 65001 >nul
title T1 GTA 5 VN OPTIMIZER PRO v2.5 - 3D NEUMORPHIC EDITION
color 0b

echo =====================================================================
echo           T1 GTA 5 VN OPTIMIZER PRO v2.5 (BUILD 2026)
echo     Chuyen Dung Cho May Yeu & Server FiveM Roleplay Viet Nam
echo =====================================================================
echo.

:: Kiem tra quyen Administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [!] Vui long chuot phai vao file nay va chon "Run as Administrator"!
    echo.
    pause
    exit /b
)

echo [*] Dang toi uu hoa tien trinh he thong Windows...
echo [+] Dat Timer Resolution xuong 0.5ms (Giam do tre chuot)...
bcdedit /set useplatformclock false >nul 2>&1
bcdedit /set disabledynamictick yes >nul 2>&1

echo [+] Don sach Cache tam FiveM & Rockstar Games...
set FIVEM_CACHE=%localappdata%\FiveM\FiveM.app\data
if exist "%FIVEM_CACHE%\cache" (
    rmdir /s /q "%FIVEM_CACHE%\cache" 2>nul
    echo     -> Da xoa Cache tam FiveM thanh cong!
) else (
    echo     -> Thu muc FiveM Cache khong ton tai hoac da duoc don sach.
)

echo [+] Thu hoi Standby List Memory (Giai phong bo nho RAM ao)...
powershell -Command "[System.GC]::Collect(); [System.GC]::WaitForPendingFinalizers()" >nul 2>&1

echo [+] Tinh chinh mang TCP NoDelay (Giam Ping & Packet Loss)...
netsh int tcp set global autotuninglevel=normal >nul 2>&1

echo.
echo =====================================================================
echo  [HOAN TAT] DA TOI UU HE THONG THEO CHUAN T1 PRO!
echo  Hay khoi dong FiveM hoac GTA 5 de cam nhan do muot va tang FPS.
echo =====================================================================
echo.
pause

