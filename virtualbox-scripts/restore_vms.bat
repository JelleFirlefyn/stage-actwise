@echo off
SET VBoxManagePath=C:\Program Files\Oracle\VirtualBox\VBoxManage.exe
SET SnapshotName=Original

echo Restoring all VMs to snapshot: %SnapshotName%...

FOR /F "tokens=1,2 delims={}" %%i IN ('"%VBoxManagePath%" list vms') DO (
    echo Powering off %%i    
    "%VBoxManagePath%" controlvm %%i poweroff
    timeout /t 5 /nobreak > NUL
    echo Restoring VM %%i to snapshot...
    "%VBoxManagePath%" snapshot %%i restore "%SnapshotName%"
    IF ERRORLEVEL 1 (
        echo Failed to restore VM: %%i to snapshot %SnapshotName%
    ) ELSE (
        echo Successfully restored VM: %%i to snapshot %SnapshotName%
    )
)

echo Done.
pause
