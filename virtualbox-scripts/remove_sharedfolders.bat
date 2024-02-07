@echo off
SET VBoxManagePath="C:\Program Files\Oracle\VirtualBox\VBoxManage.exe"

echo Removing all shared folders from all VMs...

FOR /F "tokens=2 delims={}" %%i IN ('"%VBoxManagePath%" list vms') DO (
    FOR /F "tokens=*" %%j IN ('"%VBoxManagePath%" showvminfo "%%i" --machinereadable ^| find "SharedFolderNameMachineMapping"') DO (
        SET SharedFolder=%%j
        FOR /F "tokens=2 delims==" %%k IN ("!SharedFolder!") DO (
            echo Removing shared folder: %%k from VM "%%i"...
            "%VBoxManagePath%" sharedfolder remove "%%i" --name %%k
            IF ERRORLEVEL 1 (
                echo Failed to remove shared folder: %%k from VM: %%i
            ) ELSE (
                echo Successfully removed shared folder: %%k from VM: %%i
            )
        )
    )
)

echo Done.
pause
