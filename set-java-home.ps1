[System.Environment]::SetEnvironmentVariable('JAVA_HOME', 'C:\Program Files\Java\jdk-11', [System.EnvironmentVariableTarget]::Machine)
[System.Environment]::SetEnvironmentVariable('Path', $env:Path + ';C:\Program Files\Java\jdk-11\bin', [System.EnvironmentVariableTarget]::Machine)
