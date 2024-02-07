@echo off
SET VBoxManagePath=C:\Program Files\Oracle\VirtualBox\VBoxManage.exe
SET SnapshotName=Original

echo Restoring all VMs to snapshot: %SnapshotName%...

FOR /F "tokens=1,2 delims={}" %%i IN ('"%VBoxManagePath%" list vms') DO (
    echo Powering off %%i    
    "%VBoxManagePath%" controlvm %%i poweroff
)

echo Done.
pause
