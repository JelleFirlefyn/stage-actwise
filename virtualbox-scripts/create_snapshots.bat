@echo off
SET PATH=%PATH%;C:\Program Files\Oracle\VirtualBox
SET VBoxManagePath=C:\Program Files\Oracle\VirtualBox\VBoxManage.exe
SET SnapshotName=Original
SET SnapshotDescription=Original installed VM. Working AD.

echo Creating snapshots for all VMs...

FOR /F "tokens=1,2 delims={}" %%i IN ('VBoxManage list vms') DO (
    echo Snapshotting %%i...
    "%VBoxManagePath%" snapshot %%i take "%SnapshotName%" --description "%SnapshotDescription%"
    IF ERRORLEVEL 1 (
        echo Failed to create snapshot for VM: %%i
    ) ELSE (
        echo Snapshot created for VM: %%i
    )
)


pause