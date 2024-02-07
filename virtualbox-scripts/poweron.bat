@echo off
SET VBoxManagePath=C:\Program Files\Oracle\VirtualBox\VBoxManage.exe

echo Starting all VMs...

FOR /F "tokens=1,2 delims={}" %%i IN ('"%VBoxManagePath%" list vms') DO (
    echo Starting VM %%i...
    "%VBoxManagePath%" startvm %%i --type gui
    IF ERRORLEVEL 1 (
        echo Failed to start VM: %%i
    ) ELSE (
        echo Successfully started VM: %%i
    )
)

echo Done.
pause
